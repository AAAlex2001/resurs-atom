import { articlePath, splitContent, SECTION_PATH, SECTION_TITLE, type Article } from "@/entities/article";
import { formatDate } from "@/shared/lib/date";
import { Breadcrumbs } from "@/shared/ui/Breadcrumbs";
import { ShareButton } from "@/shared/ui/ShareButton";
import { ReactionBar } from "@/widgets/Blog/ReactionBar";
import type { ReactNode } from "react";
import style from "./style.module.scss";

type ArticleSectionData = {
    article: Article;
    reactionLabel: string;
    tocTitle: string;
};

type ArticleSectionProps = {
    data: ArticleSectionData;
    middle?: ReactNode;
};

const SITE_URL = "https://atom-plus.pro";

export const ArticleSection = ({ data, middle }: ArticleSectionProps) => {
    const sectionPath = SECTION_PATH[data.article.section];
    const [firstPart, secondPart] = middle ? splitContent(data.article) : [data.article.content, ""];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: data.article.title,
        description: data.article.description ?? undefined,
        image: data.article.cover_image ? `${SITE_URL}${data.article.cover_image}` : undefined,
        datePublished: data.article.published_at ?? undefined,
        dateModified: data.article.updated_at,
        inLanguage: "ru-RU",
        articleSection: data.article.tags.map((tag) => tag.title),
        keywords: data.article.seo_keywords ?? undefined,
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: `${SITE_URL}${articlePath(data.article)}`,
    };

    return (
        <section className={style.section}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className={style.inner}>
                <Breadcrumbs
                    items={[
                        { label: "Главная", href: "/" },
                        { label: SECTION_TITLE[data.article.section], href: sectionPath },
                        { label: data.article.title },
                    ]}
                />

                <article className={style.article}>
                    <header className={style.header}>
                        <div className={style.meta}>
                            {data.article.tags.map((tag) => (
                                <a key={tag.slug} href={`${sectionPath}?tag=${tag.slug}`} className={style.tag}>
                                    {tag.title}
                                </a>
                            ))}
                            <time className={style.date} dateTime={data.article.published_at ?? undefined}>
                                {formatDate(data.article.published_at)}
                            </time>
                        </div>

                        <h1 className={style.title}>{data.article.title}</h1>

                        {data.article.description && <p className={style.lead}>{data.article.description}</p>}
                    </header>

                    {data.article.cover_image && (
                        <div className={style.cover}>
                            <img
                                src={data.article.cover_image}
                                alt={data.article.title}
                                width={1200}
                                height={675}
                                fetchPriority="high"
                                className={style.coverImage}
                            />
                        </div>
                    )}

                    <div className={style.layout}>
                        {data.article.toc.length > 0 && (
                            <aside className={style.aside}>
                                <nav className={style.toc} aria-label={data.tocTitle}>
                                    <p className={style.tocTitle}>{data.tocTitle}</p>
                                    <ol className={style.tocList}>
                                        {data.article.toc.map((item, index) => (
                                            <li key={item.id}>
                                                <a href={`#${item.id}`} className={style.tocLink}>
                                                    <span className={style.tocNumber}>
                                                        {String(index + 1).padStart(2, "0")}
                                                    </span>
                                                    {item.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ol>
                                </nav>
                            </aside>
                        )}

                        <div className={style.main}>
                            <div className={style.content} dangerouslySetInnerHTML={{ __html: firstPart }} />
                        </div>
                    </div>

                    {middle && <div className={style.middle}>{middle}</div>}

                    <div className={style.layout}>
                        {data.article.toc.length > 0 && <div className={style.asideSpacer} />}

                        <div className={style.main}>
                            {secondPart && (
                                <div className={style.content} dangerouslySetInnerHTML={{ __html: secondPart }} />
                            )}

                            <div className={style.actions}>
                                <ShareButton />
                            </div>

                            <ReactionBar
                                data={{
                                    slug: data.article.slug,
                                    label: data.reactionLabel,
                                    initial: {
                                        views_count: data.article.views_count,
                                        likes_count: data.article.likes_count,
                                        dislikes_count: data.article.dislikes_count,
                                        my_reaction: null,
                                    },
                                }}
                            />
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
};
