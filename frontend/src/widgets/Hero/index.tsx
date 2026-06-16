import style from "./style.module.scss";
import { Button } from "@/shared/ui/Button";

type HeroProps ={
    title?: string;
    subtitle?: string;
    image?: string;
    buttonOutlineText?: string;
    buttonFilledText?: string;
}

export const Hero = (
    {
        title,
        subtitle,
        image,
        buttonOutlineText,
        buttonFilledText,
    }: HeroProps) => {
        return (
            <div className={style.hero}>
                <h1 className={style.title}>{title}</h1>
                <p className={style.subtitle}>{subtitle}</p>
                <img src={image} alt={title} className={style.image} />
                <Button text={buttonOutlineText} variant="outline" />
                <Button text={buttonFilledText} variant="filled" />
            </div>
        )
    };