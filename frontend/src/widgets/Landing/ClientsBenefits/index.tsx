import { BenefitsSlider } from "@/widgets/Landing/ClientsBenefits/BenefitsSlider";
import style from "./style.module.scss";

type Benefit = {
    id: number;
    number: string;
    title: string;
    description: string;
};

type ClientsBenefitsProps = {
    kicker: string;
    title: string;
    description: string;
    benefits: Benefit[];
};

export const ClientsBenefits = ({ kicker, title, description, benefits }: ClientsBenefitsProps) => {
    return (
        <section className={style.benefitsContainer}>
            <div className={style.benefitsContent}>
                <div className={style.benefitsHeader}>
                    <div className={style.benefitsKicker}>{kicker}</div>
                    <div className={style.benefitsTexts}>
                        <h2 className={style.benefitsTitle}>{title}</h2>
                        <p className={style.benefitsDescription}>{description}</p>
                    </div>
                </div>
                <BenefitsSlider benefits={benefits} />
            </div>
        </section>
    );
};
