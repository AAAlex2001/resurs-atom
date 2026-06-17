import type { ReactNode } from "react";
import style from "./style.module.scss";

type ButtonProps = {
    text?: string;
    variant: "outline" | "filled" | "outline-dark" | "header-outline" | "header-filled" | "transparent";
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    icon?: ReactNode;
};

export const Button = ({ text = "", variant, onClick, className, type = "button", icon }: ButtonProps) => {
    return (
        <button
            className={`${style.button} ${style[variant]} ${className ?? ""}`}
            onClick={onClick}
            type={type}
        >
            {icon && <span className={style.icon}>{icon}</span>}
            <span className={style.buttonText}>{text}</span>
        </button>
    );
};
