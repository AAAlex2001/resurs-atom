from fastapi import APIRouter, Depends, HTTPException, Query, status

from dependencies import get_visitor_id
from schemas.articles import (
    ArticleCardSchema,
    ArticleListSchema,
    ArticleSchema,
    ArticleStatsSchema,
    ReactionInSchema,
    Section,
    TagSchema,
)
from services.articles import ArticleService
from services.exceptions import ArticleNotFoundError

router = APIRouter(tags=["articles"])


@router.get("/articles", response_model=ArticleListSchema, summary="Список опубликованных статей")
async def get_articles(
    section: Section | None = Query(None, description="Раздел: blog или news"),
    tag: str | None = Query(None, description="Slug тега для фильтрации"),
    limit: int = Query(12, ge=1, le=50),
    offset: int = Query(0, ge=0),
    service: ArticleService = Depends(),
) -> ArticleListSchema:
    articles, total = await service.list_published(section, tag, limit, offset)

    return ArticleListSchema(
        articles=[ArticleCardSchema.model_validate(article) for article in articles],
        total=total,
    )


@router.get("/tags", response_model=list[TagSchema], summary="Все теги")
async def get_tags(service: ArticleService = Depends()) -> list[TagSchema]:
    tags = await service.list_tags()

    return [TagSchema.model_validate(tag) for tag in tags]


@router.get("/articles/{slug}", response_model=ArticleSchema, summary="Статья целиком")
async def get_article(slug: str, service: ArticleService = Depends()) -> ArticleSchema:
    try:
        article = await service.get_published(slug)
    except ArticleNotFoundError as error:
        raise HTTPException(status.HTTP_404_NOT_FOUND, str(error)) from error

    return ArticleSchema.model_validate(article)


@router.get(
    "/articles/{slug}/related",
    response_model=list[ArticleCardSchema],
    summary="Похожие статьи",
)
async def get_related_articles(
    slug: str,
    limit: int = Query(10, ge=1, le=20),
    service: ArticleService = Depends(),
) -> list[ArticleCardSchema]:
    try:
        article = await service.get_published(slug)
    except ArticleNotFoundError as error:
        raise HTTPException(status.HTTP_404_NOT_FOUND, str(error)) from error

    related = await service.get_related(article, limit)

    return [ArticleCardSchema.model_validate(item) for item in related]


@router.post(
    "/articles/{slug}/view",
    response_model=ArticleStatsSchema,
    summary="Засчитать просмотр",
)
async def register_view(
    slug: str,
    visitor_id: str = Depends(get_visitor_id),
    service: ArticleService = Depends(),
) -> ArticleStatsSchema:
    try:
        article = await service.get_published(slug)
    except ArticleNotFoundError as error:
        raise HTTPException(status.HTTP_404_NOT_FOUND, str(error)) from error

    await service.register_view(article, visitor_id)
    stats = await service.get_stats(article.id, visitor_id)

    return ArticleStatsSchema.model_validate(stats)


@router.put(
    "/articles/{slug}/reaction",
    response_model=ArticleStatsSchema,
    summary="Поставить лайк или дизлайк",
)
async def set_reaction(
    slug: str,
    payload: ReactionInSchema,
    visitor_id: str = Depends(get_visitor_id),
    service: ArticleService = Depends(),
) -> ArticleStatsSchema:
    try:
        article = await service.get_published(slug)
    except ArticleNotFoundError as error:
        raise HTTPException(status.HTTP_404_NOT_FOUND, str(error)) from error

    await service.set_reaction(article, visitor_id, payload.value)
    stats = await service.get_stats(article.id, visitor_id)

    return ArticleStatsSchema.model_validate(stats)


@router.delete(
    "/articles/{slug}/reaction",
    response_model=ArticleStatsSchema,
    summary="Снять свою реакцию",
)
async def remove_reaction(
    slug: str,
    visitor_id: str = Depends(get_visitor_id),
    service: ArticleService = Depends(),
) -> ArticleStatsSchema:
    try:
        article = await service.get_published(slug)
    except ArticleNotFoundError as error:
        raise HTTPException(status.HTTP_404_NOT_FOUND, str(error)) from error

    await service.remove_reaction(article, visitor_id)
    stats = await service.get_stats(article.id, visitor_id)

    return ArticleStatsSchema.model_validate(stats)
