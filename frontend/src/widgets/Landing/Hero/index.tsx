import style from "./style.module.scss";
import { Button } from "@/shared/ui/Button";

type HeroProps ={
    imageAlt?: string;
    subtitle?: string;
    image?: string;
    buttonOutlineText?: string;
    buttonFilledText?: string;
    hilightText?: string;
    titleSuffix?: string;
    titlePrefix?: string;
}

export const Hero = (
    {
        imageAlt,
        subtitle,
        image,
        buttonOutlineText,
        buttonFilledText,
        hilightText,
        titleSuffix,
        titlePrefix,
    }: HeroProps) => {
        return (
            <section className={style.hero}>
                <div className={style.heroInner}>
                    <div className={style.heroContent}>
                        <div className={style.heroTexts}>
                            <h1 className={style.title}>
                                {titlePrefix}
                                <span className={style.hilightText}>{hilightText}</span> 
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
                <img src={image} alt={imageAlt} className={style.image} />
            </section>
        )
    };