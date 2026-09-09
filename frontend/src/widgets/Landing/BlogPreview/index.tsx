import { getPreviewArticles } from "@/entities/article/api";
import { Button } from "@/shared/ui/Button";
import { ArticlesSlider } from "@/widgets/Blog/ArticlesSlider";
import style from "./style.module.scss";

type BlogPreviewData = {
    title: string;
    highlight: string;
    description: string;
    blogButtonText: string;
    newsButtonText: string;
    limit: number;
};

type BlogPreviewProps = {
    data: BlogPreviewData;
};

export const BlogPreview = async ({ data }: BlogPreviewProps) => {
    const articles = await getPreviewArticles(data.limit);

    if (articles.length === 0) return null;

    return (
        <section id="blog" className={style.blog}>
            <div className={style.inner}>
                <div className={style.header}>
                    <h2 className={style.title}>
                        {data.title} <span className={style.highlight}>{data.highlight}</span>
                    </h2>
                    <p className={style.description}>{data.description}</p>
                </div>

                <ArticlesSlider data={{ articles, ariaLabel: `${data.title} ${data.highlight}` }} />

                <div className={style.actions}>
                    <Button text={data.blogButtonText} variant="outline-dark" className={style.button} href="/blog" />
                    <Button text={data.newsButtonText} variant="outline-dark" className={style.button} href="/novosti" />
                </div>
            </div>
        </section>
    );
};
