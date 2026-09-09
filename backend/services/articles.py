from dataclasses import dataclass

from fastapi import Depends
from sqlalchemy import and_, func, select, update
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models.articles import Article, ArticleReaction, ArticleView, Tag
from schemas.articles import ArticleCreateSchema, ArticleUpdateSchema
from services.content import make_slug, prepare_content
from services.exceptions import ArticleNotFoundError, TagNotFoundError

LIKE = 1
DISLIKE = -1

PUBLISHED = and_(
    Article.published_at.is_not(None),
    Article.published_at <= func.now(),
)


@dataclass(frozen=True)
class ArticleStats:
    views_count: int
    likes_count: int
    dislikes_count: int
    my_reaction: int | None


class ArticleService:
    def __init__(self, db: AsyncSession = Depends(get_db)) -> None:
        self.db = db

    async def list_published(
        self, section: str | None, tag_slug: str | None, limit: int, offset: int
    ) -> tuple[list[Article], int]:
        articles_stmt = select(Article).where(PUBLISHED)
        count_stmt = select(func.count()).select_from(Article).where(PUBLISHED)

        if section:
            articles_stmt = articles_stmt.where(Article.section == section)
            count_stmt = count_stmt.where(Article.section == section)

        if tag_slug:
            has_tag = Article.tags.any(Tag.slug == tag_slug)
            articles_stmt = articles_stmt.where(has_tag)
            count_stmt = count_stmt.where(has_tag)

        articles_stmt = (
            articles_stmt.order_by(Article.published_at.desc()).limit(limit).offset(offset)
        )

        result = await self.db.execute(articles_stmt)
        articles = list(result.scalars().all())

        total = await self.db.scalar(count_stmt)
        if total is None:
            total = 0

        return articles, total

    async def get_published(self, slug: str) -> Article:
        stmt = select(Article).where(Article.slug == slug, PUBLISHED)
        result = await self.db.execute(stmt)
        article = result.scalar_one_or_none()

        if article is None:
            raise ArticleNotFoundError(f"Статья «{slug}» не найдена")

        return article

    async def get_related(self, article: Article, limit: int) -> list[Article]:
        stmt = (
            select(Article)
            .where(PUBLISHED, Article.section == article.section, Article.id != article.id)
            .order_by(func.random())
            .limit(limit)
        )

        result = await self.db.execute(stmt)

        return list(result.scalars().all())

    async def list_tags(self) -> list[Tag]:
        stmt = select(Tag).order_by(Tag.title)

        result = await self.db.execute(stmt)

        return list(result.scalars().all())

    async def register_view(self, article: Article, visitor_id: str) -> None:
        already_viewed = await self.db.get(ArticleView, (article.id, visitor_id))
        if already_viewed is not None:
            return

        self.db.add(ArticleView(article_id=article.id, visitor_id=visitor_id))

        try:
            await self.db.flush()
        except IntegrityError:
            await self.db.rollback()
            return

        await self.db.execute(
            update(Article)
            .where(Article.id == article.id)
            .values(views_count=Article.views_count + 1)
        )
        await self.db.commit()

    async def set_reaction(self, article: Article, visitor_id: str, value: int) -> None:
        reaction = await self.db.get(ArticleReaction, (article.id, visitor_id))

        if reaction is None:
            await self.create_reaction(article, visitor_id, value)
        elif reaction.value != value:
            await self.switch_reaction(article, reaction, value)

    async def remove_reaction(self, article: Article, visitor_id: str) -> None:
        reaction = await self.db.get(ArticleReaction, (article.id, visitor_id))
        if reaction is None:
            return

        if reaction.value == LIKE:
            await self.update_counters(article.id, likes=-1)
        else:
            await self.update_counters(article.id, dislikes=-1)

        await self.db.delete(reaction)
        await self.db.commit()

    async def get_stats(self, article_id: int, visitor_id: str) -> ArticleStats:
        stmt = select(
            Article.views_count, Article.likes_count, Article.dislikes_count
        ).where(Article.id == article_id)
        result = await self.db.execute(stmt)
        counters = result.one()

        reaction = await self.db.get(ArticleReaction, (article_id, visitor_id))
        my_reaction = None
        if reaction is not None:
            my_reaction = reaction.value

        return ArticleStats(
            views_count=counters.views_count,
            likes_count=counters.likes_count,
            dislikes_count=counters.dislikes_count,
            my_reaction=my_reaction,
        )

    async def list_all(self, section: str | None) -> list[Article]:
        stmt = select(Article).order_by(Article.created_at.desc())

        if section:
            stmt = stmt.where(Article.section == section)

        result = await self.db.execute(stmt)

        return list(result.scalars().all())

    async def get_by_id(self, article_id: int) -> Article:
        article = await self.db.get(Article, article_id)

        if article is None:
            raise ArticleNotFoundError(f"Статья с ID {article_id} не найдена")

        return article

    async def create(self, data: ArticleCreateSchema) -> Article:
        content, toc = prepare_content(data.content)
        wanted_slug = data.slug or make_slug(data.title)
        slug = await self.unique_slug(wanted_slug)
        tags = await self.tags_by_ids(data.tag_ids)

        article = Article(
            slug=slug,
            section=data.section,
            title=data.title,
            description=data.description,
            cover_image=data.cover_image,
            content=content,
            toc=toc,
            seo_title=data.seo_title,
            seo_description=data.seo_description,
            seo_keywords=data.seo_keywords,
            tags=tags,
        )

        self.apply_published(article, data.published)
        if data.published_at is not None:
            article.published_at = data.published_at

        self.db.add(article)
        await self.db.commit()

        return await self.reload(article.id)

    async def update(self, article: Article, data: ArticleUpdateSchema) -> Article:
        changes = data.model_dump(exclude_unset=True)

        if changes.get("title"):
            article.title = changes["title"]

        if changes.get("section"):
            article.section = changes["section"]

        if "description" in changes:
            article.description = changes["description"]

        if "cover_image" in changes:
            article.cover_image = changes["cover_image"]

        if "seo_title" in changes:
            article.seo_title = changes["seo_title"]

        if "seo_description" in changes:
            article.seo_description = changes["seo_description"]

        if "seo_keywords" in changes:
            article.seo_keywords = changes["seo_keywords"]

        if changes.get("content"):
            article.content, article.toc = prepare_content(changes["content"])

        if "slug" in changes:
            wanted = changes["slug"] or make_slug(article.title)
            article.slug = await self.unique_slug(wanted, exclude_id=article.id)

        if "tag_ids" in changes:
            article.tags = await self.tags_by_ids(changes["tag_ids"] or [])

        if "published" in changes:
            self.apply_published(article, changes["published"])

        if changes.get("published_at") is not None:
            article.published_at = changes["published_at"]

        await self.db.commit()

        return await self.reload(article.id)

    async def delete(self, article: Article) -> None:
        await self.db.delete(article)
        await self.db.commit()

    async def create_tag(self, title: str) -> Tag:
        wanted_slug = make_slug(title, max_length=90)
        slug = await self.unique_tag_slug(wanted_slug)

        tag = Tag(slug=slug, title=title)
        self.db.add(tag)
        await self.db.commit()
        await self.db.refresh(tag)

        return tag

    async def delete_tag(self, tag_id: int) -> None:
        tag = await self.db.get(Tag, tag_id)

        if tag is None:
            raise TagNotFoundError(f"Тег с ID {tag_id} не найден")

        await self.db.delete(tag)
        await self.db.commit()

    async def create_reaction(self, article: Article, visitor_id: str, value: int) -> None:
        self.db.add(
            ArticleReaction(article_id=article.id, visitor_id=visitor_id, value=value)
        )

        try:
            await self.db.flush()
        except IntegrityError:
            await self.db.rollback()
            return

        if value == LIKE:
            await self.update_counters(article.id, likes=1)
        else:
            await self.update_counters(article.id, dislikes=1)

        await self.db.commit()

    async def switch_reaction(
        self, article: Article, reaction: ArticleReaction, value: int
    ) -> None:
        reaction.value = value

        if value == LIKE:
            await self.update_counters(article.id, likes=1, dislikes=-1)
        else:
            await self.update_counters(article.id, likes=-1, dislikes=1)

        await self.db.commit()

    async def update_counters(self, article_id: int, likes: int = 0, dislikes: int = 0) -> None:
        await self.db.execute(
            update(Article)
            .where(Article.id == article_id)
            .values(
                likes_count=Article.likes_count + likes,
                dislikes_count=Article.dislikes_count + dislikes,
            )
        )

    @staticmethod
    def apply_published(article: Article, published: bool | None) -> None:
        if published and article.published_at is None:
            article.published_at = func.now()
        elif published is False:
            article.published_at = None

    async def reload(self, article_id: int) -> Article:
        stmt = (
            select(Article)
            .where(Article.id == article_id)
            .execution_options(populate_existing=True)
        )

        result = await self.db.execute(stmt)

        return result.scalar_one()

    async def unique_slug(self, wanted: str, exclude_id: int | None = None) -> str:
        slug = wanted
        suffix = 2

        while True:
            stmt = select(Article.id).where(Article.slug == slug)
            if exclude_id is not None:
                stmt = stmt.where(Article.id != exclude_id)

            taken = await self.db.scalar(stmt)
            if taken is None:
                return slug

            slug = f"{wanted}-{suffix}"
            suffix += 1

    async def unique_tag_slug(self, wanted: str) -> str:
        slug = wanted
        suffix = 2

        while True:
            stmt = select(Tag.id).where(Tag.slug == slug)

            taken = await self.db.scalar(stmt)
            if taken is None:
                return slug

            slug = f"{wanted}-{suffix}"
            suffix += 1

    async def tags_by_ids(self, tag_ids: list[int]) -> list[Tag]:
        if not tag_ids:
            return []

        wanted_ids = set(tag_ids)
        stmt = select(Tag).where(Tag.id.in_(wanted_ids))
        result = await self.db.execute(stmt)
        tags = list(result.scalars().all())

        if len(tags) != len(wanted_ids):
            raise TagNotFoundError("Некоторые теги не найдены")

        return tags
