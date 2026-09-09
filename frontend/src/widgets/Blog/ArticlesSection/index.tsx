import Link from "next/link";
import { pluralize } from "@/shared/lib/date";
import { Breadcrumbs } from "@/shared/ui/Breadcrumbs";
import { ArticleCard, type ArticleCardData } from "@/widgets/Blog/ArticleCard";
import { TagFilter } from "@/widgets/Blog/TagFilter";
import style from "./style.module.scss";

type Tag = {
    slug: string;
    title: string;
};

type ArticlesSectionData = {
    basePath: string;
    title: string;
    subtitle: string;
    emptyText: string;
    allTagsLabel: string;
    moreText: string;
    articles: ArticleCardData[];
    total: number;
    tags: Tag[];
    activeTag: string | null;
    page: number;
};

type ArticlesSectionProps = {
    data: ArticlesSectionData;
};

const buildMoreHref = (basePath: string, tag: string | null, page: number) => {
    const params = new URLSearchParams();
    if (tag) params.set("tag", tag);
    params.set("page", String(page));

    return `${basePath}?${params}`;
};

export const ArticlesSection = ({ data }: ArticlesSectionProps) => {
    const hasMore = data.articles.length < data.total;
    const countText = `${data.total} ${pluralize(data.total, ["материал", "материала", "материалов"])}`;

    return (
        <section className={style.section}>
            <div className={style.inner}>
                <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: data.title }]} />

                <div className={style.head}>
                    <h1 className={style.title}>{data.title}</h1>
                    <p className={style.subtitle}>{data.subtitle}</p>
                </div>

                {(data.tags.length > 0 || data.total > 0) && (
                    <div className={style.toolbar}>
                        {data.tags.length > 0 && (
                            <TagFilter
                                data={{
                                    basePath: data.basePath,
                                    tags: data.tags,
                                    activeTag: data.activeTag,
                                    allLabel: data.allTagsLabel,
                                }}
                            />
                        )}
                        {data.total > 0 && <span className={style.count}>{countText}</span>}
                    </div>
                )}

                {data.articles.length === 0 ? (
                    <p className={style.empty}>{data.emptyText}</p>
                ) : (
                    <ul className={style.grid}>
                        {data.articles.map((article) => (
                            <li key={article.slug} className={style.cell}>
                                <ArticleCard item={article} />
                            </li>
                        ))}
                    </ul>
                )}

                {hasMore && (
                    <div className={style.more}>
                        <Link
                            href={buildMoreHref(data.basePath, data.activeTag, data.page + 1)}
                            scroll={false}
                            className={style.moreButton}
                        >
                            <span className={style.moreText}>{data.moreText}</span>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};
