"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import style from "./style.module.scss";

type Activity = {
    id: number;
    number: string;
    title: string;
    description: string;
};

type ActivitiesSliderProps = {
    activities: Activity[];
};

export const ActivitiesSlider = ({ activities }: ActivitiesSliderProps) => {
    const [sliderRef] = useKeenSlider({
        loop: false,
        range: {
            min: 0,
            max: Math.max(0, activities.length - 1),
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
                    perView: 3,
                    spacing: 10,
                },
            },
        },
    });

    return (
        <div ref={sliderRef} className={`keen-slider ${style.slider}`}>
            {activities.map((activity) => (
                <div className={`keen-slider__slide ${style.slide}`} key={activity.id}>
                    <div className={style.card}>
                        <div className={style.cardContent}>
                            <div className={style.number}>{activity.number}</div>
                            <div className={style.cardTexts}>
                                <div className={style.title}>{activity.title}</div>
                                <div className={style.description}>{activity.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
