import { Button } from "@/shared/ui/Button";
import { ActivitiesSlider } from "@/widgets/Landing/Activities/ActivitiesSlider";
import type { NumberedCard } from "@/shared/types/content";
import style from "./style.module.scss";

export type ActivitiesProps = {
    kicker: string;
    title: string;
    highlight: string;
    description: string;
    buttonText: string;
    activities: NumberedCard[];
};

export const Activities = ({ kicker, title, highlight, description, buttonText, activities }: ActivitiesProps) => {
    return (
        <section className={style.activitiesContainer}>
            <div className={style.activitiesContent}>
                <div className={style.activitiesHeader}>
                    <div className={style.activitiesHeaderTexts}>
                        <div className={style.activitiesKicker}>{kicker}</div>
                        <div className={style.activitiesTexts}>
                            <h2 className={style.activitiesTitle}>
                                <span className={style.activitiesTitleText}>{title}</span>{" "}
                                <span className={style.activitiesHighlight}>{highlight}</span>
                            </h2>
                            <p className={style.activitiesDescription}>{description}</p>
                        </div>
                    </div>
                    <div className={style.activitiesButton}>
                        <Button text={buttonText} variant="outline-dark" />
                    </div>
                </div>
                <div className={style.activitiesSliderWrapper}>
                    <ActivitiesSlider activities={activities} />
                </div>
            </div>
        </section>
    );
};
