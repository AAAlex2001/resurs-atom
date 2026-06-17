import style from "./style.module.scss";

type StatsData = {
    stats: {
        id: number;
        number: string;
        text: string;
    }[];
};

type StatsProps = {
    data: StatsData;
};

export const Stats = ({ data }: StatsProps) => {
    return (
        <section className={style.statsContainer}>
            <div className={style.statsContent}>
                {data.stats.map((stat) => (
                    <div className={style.stat} key={stat.id}>
                        <div className={style.statNumber}>{stat.number}</div>
                        <div className={style.statText}>{stat.text}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};
