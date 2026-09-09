import { getLatestArticles } from "@/entities/article/api";
import { Button } from "@/shared/ui/Button";
import { ArticleCard } from "@/widgets/Blog/ArticleCard";
import style from "./style.module.scss";

type BlogPreviewData = {
    kicker: string;
    title: string;
    highlight: string;
    description: string;
    buttonText: string;
    limit: number;
};

type BlogPreviewProps = {
    data: BlogPreviewData;
};

export const BlogPreview = async ({ data }: BlogPreviewProps) => {
    const articles = await getLatestArticles("blog", data.limit);

    if (articles.length === 0) return null;

    return (
        <section id="blog" className={style.blog}>
            <div className={style.inner}>
                <div className={style.header}>
                    <div className={style.kicker}>{data.kicker}</div>
                    <div className={style.texts}>
                        <h2 className={style.title}>
                            {data.title} <span className={style.highlight}>{data.highlight}</span>
                        </h2>
                        <p className={style.description}>{data.description}</p>
                    </div>
                </div>

                <ul className={style.grid}>
                    {articles.map((article) => (
                        <li key={article.slug} className={style.cell}>
                            <ArticleCard item={article} />
                        </li>
                    ))}
                </ul>

                <Button text={data.buttonText} variant="outline-dark" className={style.button} href="/blog" />
            </div>
        </section>
    );
};
