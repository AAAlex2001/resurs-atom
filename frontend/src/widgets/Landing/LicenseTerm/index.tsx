import { ExclamationIcon } from "@/shared/ui/icons/ExclamationIcon";
import style from "./style.module.scss";

type Term = {
    id: number;
    term: string;
    description: string;
};

type LicenseTermData = {
    kicker: string;
    title: string;
    highlight: string;
    description: string;
    warning: {
        prefix: string;
        emphasis: string;
        suffix: string;
    };
    termsKicker: string;
    terms: Term[];
    termsNote: string;
};

type LicenseTermProps = {
    data: LicenseTermData;
};

export const LicenseTerm = ({ data }: LicenseTermProps) => {
    return (
        <section className={style.term}>
            <div className={style.termContent}>
                <div className={style.intro}>
                    <div className={style.header}>
                        <div className={style.kicker}>{data.kicker}</div>
                        <div className={style.texts}>
                            <h2 className={style.title}>
                                <span className={style.titleText}>{data.title}</span>{" "}
                                <span className={style.highlight}>{data.highlight}</span>
                            </h2>
                            <p className={style.description}>{data.description}</p>
                        </div>
                    </div>
                    <div className={style.warning}>
                        <span className={style.warningIcon}>
                            <ExclamationIcon />
                        </span>
                        <p className={style.warningText}>
                            {data.warning.prefix}
                            <strong className={style.warningEmphasis}>{data.warning.emphasis}</strong>
                            {data.warning.suffix}
                        </p>
                    </div>
                </div>
                <div className={style.guide}>
                    <div className={style.guideKicker}>{data.termsKicker}</div>
                    <div className={style.guideBody}>
                        <ul className={style.terms}>
                            {data.terms.map((item) => (
                                <li className={style.termItem} key={item.id}>
                                    <span className={style.termValue}>{item.term}</span>
                                    <span className={style.termLabel}>{item.description}</span>
                                </li>
                            ))}
                        </ul>
                        <p className={style.note}>{data.termsNote}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
