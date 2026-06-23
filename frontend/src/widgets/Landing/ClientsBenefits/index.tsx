import { BenefitsSlider } from "@/widgets/Landing/ClientsBenefits/BenefitsSlider";
import { BenefitsOrbit } from "@/widgets/Landing/ClientsBenefits/BenefitsOrbit";
import style from "./style.module.scss";

type Benefit = {
    id: number;
    number: string;
    title: string;
    description?: string;
};

type ClientsBenefitsData = {
    kicker: string;
    title: string;
    description: string;
    orbitHint: {
        title: string;
        description: string;
    };
    benefits: Benefit[];
};

type ClientsBenefitsProps = {
    data: ClientsBenefitsData;
};

export const ClientsBenefits = ({ data }: ClientsBenefitsProps) => {
    return (
        <section className={style.benefitsContainer}>
            <div className={style.benefitsContent}>
                <div className={style.benefitsHeader}>
                    <div className={style.benefitsKicker}>{data.kicker}</div>
                    <div className={style.benefitsTexts}>
                        <h2 className={style.benefitsTitle}>{data.title}</h2>
                        <p className={style.benefitsDescription}>{data.description}</p>
                    </div>
                </div>
                <div className={style.benefitsSlider}>
                    <BenefitsSlider benefits={data.benefits} />
                </div>
                <div className={style.benefitsOrbit}>
                    <BenefitsOrbit benefits={data.benefits} hint={data.orbitHint} />
                </div>
            </div>
        </section>
    );
};
