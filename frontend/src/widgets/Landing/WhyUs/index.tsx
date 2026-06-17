import { Button } from "@/shared/ui/Button";
import style from "./style.module.scss";

type Reason = {
    id: number;
    title: string;
    description: string;
};

type WhyUsProps = {
    kicker: string;
    title: string;
    description: string;
    buttonText: string;
    reasons: Reason[];
};

export const WhyUs = ({ kicker, title, description, buttonText, reasons }: WhyUsProps) => {
    return (
        <section className={style.whyUs}>
            <div className={style.content}>
                <div className={style.intro}>
                    <div className={style.header}>
                        <div className={style.kicker}>{kicker}</div>
                        <div className={style.texts}>
                            <h2 className={style.title}>{title}</h2>
                            <p className={style.description}>{description}</p>
                        </div>
                    </div>
                    <Button text={buttonText} variant="header-filled" className={style.cta} />
                </div>
                <ul className={style.cards}>
                    {reasons.map((item) => (
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
