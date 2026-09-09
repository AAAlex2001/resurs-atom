"use client";

import { useArticleStats } from "@/features/article-reactions";
import { EyeIcon } from "@/shared/ui/icons/EyeIcon";
import { ThumbDownIcon } from "@/shared/ui/icons/ThumbDownIcon";
import { ThumbUpIcon } from "@/shared/ui/icons/ThumbUpIcon";
import style from "./style.module.scss";

type ReactionBarData = {
    slug: string;
    label: string;
    initial: {
        views_count: number;
        likes_count: number;
        dislikes_count: number;
        my_reaction: 1 | -1 | null;
    };
};

type ReactionBarProps = {
    data: ReactionBarData;
};

export const ReactionBar = ({ data }: ReactionBarProps) => {
    const { stats, pending, error, react } = useArticleStats(data.slug, data.initial);

    return (
        <div className={style.wrap}>
            <div className={style.bar}>
                <span className={style.label}>{data.label}</span>

                <button
                    type="button"
                    className={`${style.button} ${stats.my_reaction === 1 ? style.active : ""}`}
                    aria-pressed={stats.my_reaction === 1}
                    aria-label="Полезно"
                    disabled={pending}
                    onClick={() => void react(1)}
                >
                    <ThumbUpIcon className={style.icon} />
                    {stats.likes_count}
                </button>

                <button
                    type="button"
                    className={`${style.button} ${stats.my_reaction === -1 ? style.active : ""}`}
                    aria-pressed={stats.my_reaction === -1}
                    aria-label="Не полезно"
                    disabled={pending}
                    onClick={() => void react(-1)}
                >
                    <ThumbDownIcon className={style.icon} />
                    {stats.dislikes_count}
                </button>

                <span className={style.views}>
                    <EyeIcon className={style.icon} />
                    {stats.views_count}
                </span>
            </div>

            {error && <p className={style.error}>{error}</p>}
        </div>
    );
};
