"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { ArticleCard, type ArticleCardData } from "@/widgets/Blog/ArticleCard";
import style from "./style.module.scss";

type RelatedArticlesData = {
    title: string;
    articles: ArticleCardData[];
};

type RelatedArticlesProps = {
    data: RelatedArticlesData;
};

export const RelatedArticles = ({ data }: RelatedArticlesProps) => {
    const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
        mode: "snap",
        slides: { perView: 1.1, spacing: 16 },
        breakpoints: {
            "(min-width: 768px)": { slides: { perView: 2.2, spacing: 20 } },
            "(min-width: 1440px)": { slides: { perView: 3, spacing: 30 } },
        },
    });

    return (
        <section className={style.section} aria-label={data.title}>
            <div className={style.inner}>
                <div className={style.head}>
                    <h2 className={style.title}>{data.title}</h2>

                    <div className={style.controls}>
                        <button
                            type="button"
                            className={style.button}
                            aria-label="Предыдущие"
                            onClick={() => slider.current?.prev()}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
                                <path
                                    d="M14 6L8 12L14 18"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className={style.button}
                            aria-label="Следующие"
                            onClick={() => slider.current?.next()}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
                                <path
                                    d="M10 6L16 12L10 18"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div ref={sliderRef} className={`keen-slider ${style.viewport}`}>
                    {data.articles.map((article) => (
                        <div key={article.slug} className={`keen-slider__slide ${style.slide}`}>
                            <ArticleCard item={article} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
