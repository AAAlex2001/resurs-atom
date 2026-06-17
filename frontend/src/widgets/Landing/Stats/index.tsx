import style from "./style.module.scss";

type StatsProps = {
    stats: {
        id: number;
        number: string;
        text: string;
    }[];
};

export const Stats = ({ stats }: StatsProps) => {
    return (
        <section className={style.statsContainer}>
            <div className={style.statsContent}>
                {stats.map((stat) => (
                    <div className={style.stat} key={stat.id}>
                        <div className={style.statNumber}>{stat.number}</div>
                        <div className={style.statText}>{stat.text}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};