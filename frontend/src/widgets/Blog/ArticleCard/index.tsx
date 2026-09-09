import { articlePath } from "@/entities/article";
import { formatDate } from "@/shared/lib/date";
import { ArrowRightIcon } from "@/shared/ui/icons/ArrowRightIcon";
import { EyeIcon } from "@/shared/ui/icons/EyeIcon";
import { ThumbDownIcon } from "@/shared/ui/icons/ThumbDownIcon";
import { ThumbUpIcon } from "@/shared/ui/icons/ThumbUpIcon";
import style from "./style.module.scss";

type ArticleCardTag = {
    slug: string;
    title: string;
};

export type ArticleCardData = {
    slug: string;
    section: "blog" | "news";
    title: string;
    description: string | null;
    cover_image: string | null;
    published_at: string | null;
    updated_at: string;
    views_count: number;
    likes_count: number;
    dislikes_count: number;
    tags: ArticleCardTag[];
};

type ArticleCardProps = {
    item: ArticleCardData;
};

export const ArticleCard = ({ item }: ArticleCardProps) => {
    const tag = item.tags[0];

    return (
        <a href={articlePath(item)} className={style.card}>
            <div className={style.cover}>
                {item.cover_image ? (
                    <img
                        src={item.cover_image}
                        alt={item.title}
                        width={1200}
                        height={675}
                        className={style.image}
                        loading="lazy"
                    />
                ) : (
                    <div className={style.placeholder} />
                )}
                {tag && <span className={style.tag}>{tag.title}</span>}
            </div>

            <div className={style.body}>
                <h3 className={style.title}>{item.title}</h3>

                {item.description && <p className={style.description}>{item.description}</p>}

                <div className={style.meta}>
                    <time className={style.date} dateTime={item.published_at ?? undefined}>
                        {formatDate(item.published_at)}
                    </time>
                    <span className={style.read}>
                        Читать <ArrowRightIcon className={style.readIcon} />
                    </span>
                </div>

                <div className={style.stats}>
                    <span className={style.stat}>
                        <ThumbUpIcon className={style.statIcon} />
                        {item.likes_count}
                    </span>
                    <span className={style.stat}>
                        <ThumbDownIcon className={style.statIcon} />
                        {item.dislikes_count}
                    </span>
                    <span className={`${style.stat} ${style.views}`}>
                        <EyeIcon className={style.statIcon} />
                        {item.views_count}
                    </span>
                </div>
            </div>
        </a>
    );
};
