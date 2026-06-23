import style from "./style.module.scss";

export type LicensingCardData = {
    id: number;
    stage: string;
    title: string;
    subtitle: string;
    details?: {
        id: number;
        title: string;
        description: string;
    }[];
};

type LicensingCardProps = {
    card: LicensingCardData;
};

export const LicensingCard = ({ card }: LicensingCardProps) => {
    const hasDetails = Boolean(card.details?.length);

    return (
        <div className={style.card}>
            <div className={style.kicker}>{card.stage}</div>
            <div className={style.texts}>
                <span className={style.title}>{card.title}</span>
                {card.subtitle && <span className={style.subtitle}>{card.subtitle}</span>}
            </div>
            {hasDetails && (
                <div className={style.details}>
                    {card.details?.map((detail) => (
                        <div className={style.detail} key={detail.id}>
                            <span className={style.detailTitle}>{detail.title}</span>
                            <span className={style.detailDescription}>{detail.description}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
