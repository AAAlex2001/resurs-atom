import { Button } from "@/shared/ui/Button";
import style from "./style.module.scss";

type Reason = {
    id: number;
    title: string;
    description: string;
};

type WhyUsData = {
    kicker: string;
    title: string;
    description: string;
    buttonText: string;
    reasons: Reason[];
};

type WhyUsProps = {
    data: WhyUsData;
};

export const WhyUs = ({ data }: WhyUsProps) => {
    return (
        <section className={style.whyUs}>
            <div className={style.content}>
                <div className={style.intro}>
                    <div className={style.header}>
                        <div className={style.kicker}>{data.kicker}</div>
                        <div className={style.texts}>
                            <h2 className={style.title}>{data.title}</h2>
                            <p className={style.description}>{data.description}</p>
                        </div>
                    </div>
                    <Button text={data.buttonText} variant="header-filled" className={style.cta} />
                </div>
                <ul className={style.cards}>
                    {data.reasons.map((item) => (
                        <li className={style.card} key={item.id}>
                            <div className={style.cardTexts}>
                                <span className={style.cardTitle}>{item.title}</span>
                                <span className={style.cardDescription}>{item.description}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
