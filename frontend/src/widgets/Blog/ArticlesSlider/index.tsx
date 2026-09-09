"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { ArticleCard, type ArticleCardData } from "@/widgets/Blog/ArticleCard";
import style from "./style.module.scss";

type ArticlesSliderData = {
    articles: ArticleCardData[];
    ariaLabel: string;
};

type ArticlesSliderProps = {
    data: ArticlesSliderData;
};

const Chevron = ({ direction }: { direction: "left" | "right" }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
            d={direction === "left" ? "M14 6L8 12L14 18" : "M10 6L16 12L10 18"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const ArticlesSlider = ({ data }: ArticlesSliderProps) => {
    const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
        mode: "snap",
        slides: { perView: 1.1, spacing: 16 },
        breakpoints: {
            "(min-width: 768px)": { slides: { perView: 2.2, spacing: 20 } },
            "(min-width: 1440px)": { slides: { perView: 3, spacing: 30 } },
        },
    });

    return (
        <div className={style.root} aria-label={data.ariaLabel}>
            <div className={style.controls}>
                <button
                    type="button"
                    className={style.button}
                    aria-label="Предыдущие статьи"
                    onClick={() => slider.current?.prev()}
                >
                    <Chevron direction="left" />
                </button>
                <button
                    type="button"
                    className={style.button}
                    aria-label="Следующие статьи"
                    onClick={() => slider.current?.next()}
                >
                    <Chevron direction="right" />
                </button>
            </div>

            <div ref={sliderRef} className={`keen-slider ${style.viewport}`}>
                {data.articles.map((article) => (
                    <div key={article.slug} className={`keen-slider__slide ${style.slide}`}>
                        <ArticleCard item={article} />
                    </div>
                ))}
            </div>
        </div>
    );
};
