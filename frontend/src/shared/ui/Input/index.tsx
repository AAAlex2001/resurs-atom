"use client";

import { useState, type InputHTMLAttributes } from "react";
import style from "./style.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    format?: (value: string) => string;
    onValueChange?: (value: string) => void;
};

export const Input = ({ format, className, onChange, onValueChange, ...rest }: InputProps) => {
    const [value, setValue] = useState("");
    const classes = `${style.input} ${className ?? ""}`;

    if (!format) {
        return <input className={classes} onChange={onChange} {...rest} />;
    }

    return (
        <input
            className={classes}
            value={value}
            onChange={(event) => {
                const formatted = format(event.target.value);
                setValue(formatted);
                onValueChange?.(formatted);
                onChange?.(event);
            }}
            {...rest}
        />
    );
};
