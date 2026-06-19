import { Button } from "@/shared/ui/Button";
import { ActivitiesSlider } from "@/widgets/Landing/Activities/ActivitiesSlider";
import style from "./style.module.scss";

type ActivitiesData = {
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
};

type ActivitiesProps = {
    data: ActivitiesData;
};

export const Activities = ({ data }: ActivitiesProps) => {
    return (
        <section id="services" className={style.activitiesContainer}>
            <div className={style.activitiesContent}>
                <div className={style.activitiesHeader}>
                    <div className={style.activitiesHeaderTexts}>
                        <div className={style.activitiesKicker}>{data.kicker}</div>
                        <div className={style.activitiesTexts}>
                            <h2 className={style.activitiesTitle}>
                                <span className={style.activitiesTitleText}>{data.title}</span>{" "}
                                <span className={style.activitiesHighlight}>{data.highlight}</span>
                            </h2>
                            <p className={style.activitiesDescription}>{data.description}</p>
                        </div>
                    </div>
                    <div className={style.activitiesButton}>
                        <Button text={data.buttonText} variant="outline-dark" href="#contact" />
                    </div>
                </div>
                <div className={style.activitiesSliderWrapper}>
                    <ActivitiesSlider activities={data.activities} />
                </div>
            </div>
        </section>
    );
};
