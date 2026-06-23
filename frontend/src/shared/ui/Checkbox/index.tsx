"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import style from "./style.module.scss";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> & {
    label: ReactNode;
    error?: string;
    onCheckedChange?: (checked: boolean) => void;
};

export const Checkbox = ({
    label,
    error,
    className,
    checked,
    onCheckedChange,
    id,
    ...rest
}: CheckboxProps) => {
    return (
        <div className={`${style.wrapper} ${className ?? ""}`}>
            <label className={style.label} htmlFor={id}>
                <input
                    checked={checked}
                    className={style.input}
                    id={id}
                    onChange={(event) => onCheckedChange?.(event.target.checked)}
                    type="checkbox"
                    {...rest}
                />
                <span className={style.box} aria-hidden="true">
                    <span className={style.check} />
                </span>
                <span className={style.text}>{label}</span>
            </label>
            {error && <span className={style.error}>{error}</span>}
        </div>
    );
};
