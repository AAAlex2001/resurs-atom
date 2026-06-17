import Image from "next/image";
import style from "./style.module.scss";
import { Button } from "@/shared/ui/Button";

export type HeroProps = {
    titlePrefix: string;
    highlight: string;
    titleSuffix: string;
    subtitle: string;
    buttonFilledText: string;
    buttonOutlineText: string;
    image: string;
    imageAlt: string;
};

export const Hero = ({
    imageAlt,
    subtitle,
    image,
    buttonOutlineText,
    buttonFilledText,
    highlight,
    titleSuffix,
    titlePrefix,
}: HeroProps) => {
    return (
        <section className={style.hero}>
            <div className={style.heroInner}>
                <div className={style.heroContent}>
                    <div className={style.heroTexts}>
                        <h1 className={style.title}>
                            {titlePrefix}{" "}
                            <span className={style.highlight}>{highlight}</span>{" "}
                            {titleSuffix}
                        </h1>
                        <p className={style.subtitle}>{subtitle}</p>
                    </div>
                    <div className={style.heroButtons}>
                        <Button text={buttonFilledText} variant="filled" />
                        <Button text={buttonOutlineText} variant="outline" />
                    </div>
                </div>
            </div>
            <Image
                src={image}
                alt={imageAlt}
                className={style.image}
                width={1680}
                height={1120}
                sizes="(min-width: 1440px) 50vw, 100vw"
                priority
            />
        </section>
    );
};
