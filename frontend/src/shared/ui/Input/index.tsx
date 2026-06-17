"use client";

import { useState, type InputHTMLAttributes } from "react";
import style from "./style.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    format?: (value: string) => string;
};

export const Input = ({ format, className, onChange, ...rest }: InputProps) => {
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
                setValue(format(event.target.value));
                onChange?.(event);
            }}
            {...rest}
        />
    );
};
