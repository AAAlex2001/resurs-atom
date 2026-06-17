import style from "./style.module.scss";

export type CasesCardData = {
    id: number;
    stage: string;
    title: string;
    subtitle: string;
    details: {
        id: number;
        title: string;
        description: string;
    }[];
};

type CasesCardProps = {
    card: CasesCardData;
};

export const CasesCard = ({ card }: CasesCardProps) => {
    return (
        <div className={style.card}>
            <div className={style.kicker}>{card.stage}</div>
            <div className={style.texts}>
                <span className={style.title}>{card.title}</span>
                <span className={style.subtitle}>{card.subtitle}</span>
            </div>
            <div className={style.details}>
                {card.details.map((detail) => (
                    <div className={style.detail} key={detail.id}>
                        <span className={style.detailTitle}>{detail.title}</span>
                        <span className={style.detailDescription}>{detail.description}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
