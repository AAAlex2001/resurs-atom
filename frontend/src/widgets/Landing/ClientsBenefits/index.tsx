import { BenefitsSlider } from "@/widgets/Landing/ClientsBenefits/BenefitsSlider";
import { BenefitsOrbit } from "@/widgets/Landing/ClientsBenefits/BenefitsOrbit";
import type { NumberedCard, OrbitHint } from "@/shared/types/content";
import style from "./style.module.scss";

export type ClientsBenefitsProps = {
    kicker: string;
    title: string;
    description: string;
    orbitHint: OrbitHint;
    benefits: NumberedCard[];
};

export const ClientsBenefits = ({ kicker, title, description, orbitHint, benefits }: ClientsBenefitsProps) => {
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
                <div className={style.benefitsSlider}>
                    <BenefitsSlider benefits={benefits} />
                </div>
                <div className={style.benefitsOrbit}>
                    <BenefitsOrbit benefits={benefits} hint={orbitHint} />
                </div>
            </div>
        </section>
    );
};
