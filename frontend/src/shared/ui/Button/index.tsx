import type { ReactNode } from "react";
import style from "./style.module.scss";

type ButtonProps = {
    text?: string;
    variant: "outline" | "filled" | "filled-dark" | "outline-dark" | "header-outline" | "header-filled" | "transparent";
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    icon?: ReactNode;
    href?: string;
};

export const Button = ({ text = "", variant, onClick, className, type = "button", icon, href }: ButtonProps) => {
    const classNames = `${style.button} ${style[variant]} ${className ?? ""}`;

    if (href) {
        return (
            <a href={href} className={classNames} onClick={onClick}>
                {icon && <span className={style.icon}>{icon}</span>}
                <span className={style.buttonText}>{text}</span>
            </a>
        );
    }

    return (
        <button className={classNames} onClick={onClick} type={type}>
            {icon && <span className={style.icon}>{icon}</span>}
            <span className={style.buttonText}>{text}</span>
        </button>
    );
};
