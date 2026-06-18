"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@/shared/ui/icons/ChevronDownIcon";
import style from "./style.module.scss";

type SelectProps = {
    options: string[];
    placeholder?: string;
    onChange?: (value: string) => void;
};

export const Select = ({ options, placeholder, onChange }: SelectProps) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClick);

        return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    const choose = (option: string) => {
        setValue(option);
        setOpen(false);
        onChange?.(option);
    };

    return (
        <div className={style.select} ref={ref}>
            <button
                className={`${style.control} ${open ? style.controlOpen : ""}`}
                type="button"
                onClick={() => setOpen((current) => !current)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className={`${style.value} ${value ? "" : style.placeholder}`}>
                    {value ?? placeholder}
                </span>
                <ChevronDownIcon className={`${style.icon} ${open ? style.iconOpen : ""}`} />
            </button>
            {open && (
                <ul className={style.menu} role="listbox">
                    {options.map((option) => (
                        <li key={option}>
                            <button
                                className={`${style.option} ${option === value ? style.optionActive : ""}`}
                                type="button"
                                onClick={() => choose(option)}
                                role="option"
                                aria-selected={option === value}
                            >
                                {option}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
