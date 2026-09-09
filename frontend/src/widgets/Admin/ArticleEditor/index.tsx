import { ArticleForm } from "@/widgets/Admin/ArticleForm";
import style from "./style.module.scss";

type TagItem = {
    id: number;
    slug: string;
    title: string;
};

type ArticleData = {
    id: number;
    slug: string;
    section: "blog" | "news";
    title: string;
    description: string | null;
    cover_image: string | null;
    content: string;
    toc: { id: string; title: string }[];
    published_at: string | null;
    created_at: string;
    updated_at: string;
    views_count: number;
    likes_count: number;
    dislikes_count: number;
    seo_title: string | null;
    seo_description: string | null;
    seo_keywords: string | null;
    tags: TagItem[];
};

type ArticleEditorData = {
    article: ArticleData | null;
    tags: TagItem[];
    section: "blog" | "news";
    error: string | null;
};

type ArticleEditorProps = {
    data: ArticleEditorData;
};

export const ArticleEditor = ({ data }: ArticleEditorProps) => {
    return (
        <div className={style.page}>
            <div className={style.header}>
                <div className={style.headerInner}>
                    <span className={style.title}>{data.article ? "Редактирование статьи" : "Новая статья"}</span>
                </div>
            </div>

            <div className={style.body}>
                {data.error ? (
                    <div className={style.error}>{data.error}</div>
                ) : (
                    <ArticleForm data={{ article: data.article, tags: data.tags, section: data.section }} />
                )}
            </div>
        </div>
    );
};
