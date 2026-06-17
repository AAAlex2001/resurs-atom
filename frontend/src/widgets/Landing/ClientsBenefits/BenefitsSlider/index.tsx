"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import style from "./style.module.scss";

type Benefit = {
    id: number;
    number: string;
    title: string;
    description: string;
};

type BenefitsSliderProps = {
    benefits: Benefit[];
};

export const BenefitsSlider = ({ benefits }: BenefitsSliderProps) => {
    const [sliderRef] = useKeenSlider({
        loop: false,
        range: {
            min: 0,
            max: Math.max(0, benefits.length - 1),
            align: true,
        },
        slides: {
            perView: 1.1,
            spacing: 10,
        },
        breakpoints: {
            "(min-width: 768px)": {
                slides: {
                    perView: 1.5,
                    spacing: 10,
                },
            },
            "(min-width: 1440px)": {
                slides: {
                    perView: 4,
                    spacing: 10,
                },
            },
        },
    });

    return (
        <div ref={sliderRef} className={`keen-slider ${style.slider}`}>
            {benefits.map((benefit) => (
                <div className={`keen-slider__slide ${style.slide}`} key={benefit.id}>
                    <div className={style.card}>
                        <div className={style.cardContent}>
                            <div className={style.number}>{benefit.number}</div>
                            <div className={style.cardTexts}>
                                <div className={style.title}>{benefit.title}</div>
                                <div className={style.description}>{benefit.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
