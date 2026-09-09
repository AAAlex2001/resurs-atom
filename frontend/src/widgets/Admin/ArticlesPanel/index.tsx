import { Button } from "@/shared/ui/Button";
import { ArticlesTable } from "@/widgets/Admin/ArticlesTable";
import { TagManager } from "@/widgets/Admin/TagManager";
import style from "./style.module.scss";

type ArticleRow = {
    id: number;
    slug: string;
    section: "blog" | "news";
    title: string;
    description: string | null;
    cover_image: string | null;
    published_at: string | null;
    created_at: string;
    updated_at: string;
    views_count: number;
    likes_count: number;
    dislikes_count: number;
    tags: { id: number; slug: string; title: string }[];
};

type TagItem = {
    id: number;
    slug: string;
    title: string;
};

type ArticlesPanelData = {
    articles: ArticleRow[];
    tags: TagItem[];
    section: "blog" | "news" | null;
    error: string | null;
};

type ArticlesPanelProps = {
    data: ArticlesPanelData;
};

const FILTERS = [
    { key: null, label: "Все" },
    { key: "blog", label: "Блог" },
    { key: "news", label: "Новости" },
] as const;

export const ArticlesPanel = ({ data }: ArticlesPanelProps) => {
    const listPath = "/f7k2x9n3/articles";

    let newHref = `${listPath}/new`;
    if (data.section) newHref = `${listPath}/new?section=${data.section}`;

    return (
        <div className={style.page}>
            <div className={style.header}>
                <div className={style.headerInner}>
                    <span className={style.title}>Статьи</span>
                    <span className={style.count}>{data.articles.length}</span>
                </div>
            </div>

            <div className={style.body}>
                <div className={style.toolbar}>
                    <nav className={style.filters} aria-label="Раздел">
                        {FILTERS.map((item) => (
                            <a
                                key={item.key ?? "all"}
                                href={item.key ? `${listPath}?section=${item.key}` : listPath}
                                className={`${style.pill} ${item.key === data.section ? style.pillActive : ""}`}
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                    <div className={style.newButton}>
                        <Button text="Новая статья" variant="header-filled" href={newHref} />
                    </div>
                </div>

                {data.error ? (
                    <div className={style.error}>{data.error}</div>
                ) : (
                    <>
                        <TagManager data={{ items: data.tags }} />
                        <ArticlesTable data={{ items: data.articles }} />
                    </>
                )}
            </div>
        </div>
    );
};
