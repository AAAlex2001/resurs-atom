"use client";

import { useArticlesList } from "@/features/articles-admin";
import { formatDate, isFutureDate } from "@/shared/lib/date";
import { EyeIcon } from "@/shared/ui/icons/EyeIcon";
import { ThumbDownIcon } from "@/shared/ui/icons/ThumbDownIcon";
import { ThumbUpIcon } from "@/shared/ui/icons/ThumbUpIcon";
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

type ArticlesTableData = {
    items: ArticleRow[];
};

type ArticlesTableProps = {
    data: ArticlesTableData;
};

const SECTION_LABEL = { blog: "Блог", news: "Новости" } as const;

export const ArticlesTable = ({ data }: ArticlesTableProps) => {
    const { state, remove } = useArticlesList(data.items);

    if (state.items.length === 0) {
        return <div className={style.empty}>Статей пока нет — создайте первую</div>;
    }

    return (
        <div className={style.root}>
            {state.error && <div className={style.error}>{state.error}</div>}

            <div className={style.tableWrap}>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Статья</th>
                            <th>Раздел</th>
                            <th>Статус</th>
                            <th>Дата</th>
                            <th>Статистика</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.items.map((article) => {
                            const pending = state.pendingId === article.id;
                            const editHref = `/f7k2x9n3/articles/${article.id}`;

                            let statusClass = style.statusDraft;
                            let statusText = "Черновик";
                            if (isFutureDate(article.published_at)) {
                                statusClass = style.statusScheduled;
                                statusText = "Запланирована";
                            } else if (article.published_at) {
                                statusClass = style.statusPublished;
                                statusText = "Опубликована";
                            }

                            return (
                                <tr key={article.id} className={pending ? style.rowPending : ""}>
                                    <td>
                                        <a href={editHref} className={style.thumb}>
                                            {article.cover_image && (
                                                <img src={article.cover_image} alt="" className={style.thumbImage} />
                                            )}
                                        </a>
                                    </td>
                                    <td className={style.info}>
                                        <a href={editHref} className={style.title}>
                                            {article.title}
                                        </a>
                                        {article.tags.length > 0 && (
                                            <div className={style.tags}>
                                                {article.tags.map((tag) => (
                                                    <span key={tag.id} className={style.tag}>
                                                        #{tag.title}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        <span className={style.section}>{SECTION_LABEL[article.section]}</span>
                                    </td>
                                    <td>
                                        <span className={`${style.status} ${statusClass}`}>{statusText}</span>
                                    </td>
                                    <td className={style.date}>
                                        {formatDate(article.published_at ?? article.created_at)}
                                    </td>
                                    <td>
                                        <div className={style.stats}>
                                            <span className={style.stat}>
                                                <EyeIcon className={style.statIcon} />
                                                {article.views_count}
                                            </span>
                                            <span className={style.stat}>
                                                <ThumbUpIcon className={style.statIcon} />
                                                {article.likes_count}
                                            </span>
                                            <span className={style.stat}>
                                                <ThumbDownIcon className={style.statIcon} />
                                                {article.dislikes_count}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={style.actions}>
                                            <a href={editHref} className={style.edit}>
                                                Редактировать
                                            </a>
                                            <button
                                                type="button"
                                                className={style.delete}
                                                disabled={pending}
                                                onClick={() => {
                                                    if (window.confirm(`Удалить статью «${article.title}»?`)) {
                                                        void remove(article.id);
                                                    }
                                                }}
                                            >
                                                {pending ? "Удаляем…" : "Удалить"}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
