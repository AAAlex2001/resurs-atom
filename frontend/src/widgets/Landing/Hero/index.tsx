import Image from "next/image";
import style from "./style.module.scss";
import { Button } from "@/shared/ui/Button";

type HeroData = {
    titlePrefix: string;
    highlight: string;
    titleSuffix: string;
    subtitle: string;
    buttonFilledText: string;
    buttonOutlineText: string;
    image: string;
    imageAlt: string;
};

type HeroProps = {
    data: HeroData;
};

export const Hero = ({ data }: HeroProps) => {
    return (
        <section className={style.hero}>
            <div className={style.heroInner}>
                <div className={style.heroContent}>
                    <div className={style.heroTexts}>
                        <h1 className={style.title}>
                            {data.titlePrefix}{" "}
                            <span className={style.highlight}>{data.highlight}</span>{" "}
                            {data.titleSuffix}
                        </h1>
                        <p className={style.subtitle}>{data.subtitle}</p>
                    </div>
                    <div className={style.heroButtons}>
                        <Button text={data.buttonFilledText} variant="filled" href="#contact" />
                        <Button text={data.buttonOutlineText} variant="outline" href="#contact" />
                    </div>
                </div>
            </div>
            <Image
                src={data.image}
                alt={data.imageAlt}
                className={style.image}
                width={1680}
                height={1120}
                sizes="(min-width: 1440px) 50vw, 100vw"
                quality={70}
                priority
            />
        </section>
    );
};
