import style from "./style.module.scss";

type Testimonial = {
    id: number;
    quote: string;
    author: string;
};

type TestimonialsData = {
    kicker: string;
    title: string;
    description: string;
    testimonials: Testimonial[];
};

type TestimonialsProps = {
    data: TestimonialsData;
};

export const Testimonials = ({ data }: TestimonialsProps) => {
    return (
        <section className={style.testimonials}>
            <div className={style.content}>
                <div className={style.header}>
                    <div className={style.kicker}>{data.kicker}</div>
                    <div className={style.texts}>
                        <h2 className={style.title}>{data.title}</h2>
                        <p className={style.description}>{data.description}</p>
                    </div>
                </div>
                <ul className={style.cards}>
                    {data.testimonials.map((item) => (
                        <li className={style.card} key={item.id}>
                            <div className={style.cardTexts}>
                                <p className={style.quote}>{item.quote}</p>
                                <span className={style.author}>{item.author}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
