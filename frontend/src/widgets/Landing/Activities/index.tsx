"use client";

import { Button } from "@/shared/ui/Button";
import style from "./style.module.scss";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

type ActivitiesProps = {
    kicker: string;
    title: string;
    highlight: string;
    description: string;
    buttonText: string;
    activities: {
        id: number;
        number: string;
        title: string;
        description: string;
    }[];
}

export const ActivitiesSlider = ({ activities }: { activities: { id: number; number: string; title: string; description: string; }[] }) => {
    const [sliderRef] = useKeenSlider({
        loop: false,
        slides: {
            perView: 1.1,
            spacing: 10,
        },
        breakpoints: {
            "(min-width: 768px)": {
                slides: {
                    perView: 1.8,
                    spacing: 10,
                },
            },
            "(min-width: 1200px)": {
                slides: {
                    perView: 3,
                    spacing: 10,
                },
            },
        },
    });
    return (
      <div ref={sliderRef} className={`keen-slider ${style.activitiesSlider}`}>
        {activities.map((activity) => (
            <div className={`keen-slider__slide ${style.activitySlide}`} key={activity.id}>
                <div className={style.activityCard}>
                    <div className={style.activityCardContent}>
                        <div className={style.activityNumber}>{activity.number}</div>
                        <div className={style.activityCardTexts}>
                            <div className={style.activityTitle}>{activity.title}</div>
                            <div className={style.activityDescription}>{activity.description}</div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
      </div>
    );
  };


export const Activities = ({ kicker, title, highlight, description, buttonText, activities }: ActivitiesProps) => {
    return (
        <section className={style.activitiesContainer}>
            <div className={style.activitiesContent}>
                <div className={style.activitiesKicker}>{kicker}</div>
                <div className={style.activitiesTexts}>
                    <h1 className={style.activitiesTitle}>
                        <span className={style.activitiesTitleText}>{title}</span>
                        <span className={style.activitiesHighlight}>{highlight}</span>
                    </h1>
                    <p className={style.activitiesDescription}>{description}</p>
                </div>
                <div className={style.activitiesButton}>
                    <Button text={buttonText} variant="outline-dark" />
                </div>
            <ActivitiesSlider activities={activities} />
            </div>
        </section>
    );
}
