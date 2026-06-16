import type { ReactNode } from "react";
import style from "./style.module.scss";

type ButtonProps = {
    text?: string;
    variant: "outline" | "filled" | "header-outline" | "header-filled";
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    icon?: ReactNode;
};

export const Button = ({ text = "", variant, onClick, className, type = "button", icon }: ButtonProps) => {
    return (
        <button
            className={`${style.button} ${style[variant]} ${className}`}
            onClick={onClick}
            type={type}
        >
            {icon && <span className={style.icon}>{icon}</span>}
            {text}
        </button>
    );
};
