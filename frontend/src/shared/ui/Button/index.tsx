import style from "./style.module.scss";

type ButtonProps = {
    text?: string;
    variant: "outline" | "filled";
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
};

export const Button = ({ text = "", variant, onClick, className, type = "button" }: ButtonProps) => {
    return (
        <button 
            className={`${style.button} ${style[variant]} ${className}`} 
            onClick={onClick} type={type}>{text}
        </button>
    )
};