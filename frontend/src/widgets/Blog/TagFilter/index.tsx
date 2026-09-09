"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@/shared/ui/icons/ChevronDownIcon";
import { CheckCircleIcon } from "@/shared/ui/icons/CheckCircleIcon";
import style from "./style.module.scss";

type Tag = {
    slug: string;
    title: string;
};

type TagFilterData = {
    basePath: string;
    tags: Tag[];
    activeTag: string | null;
    allLabel: string;
};

type TagFilterProps = {
    data: TagFilterData;
};

export const TagFilter = ({ data }: TagFilterProps) => {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    const selected = data.tags.find((tag) => tag.slug === data.activeTag);
    const title = selected ? selected.title : data.allLabel;

    useEffect(() => {
        if (!open) return;

        const closeOnClickOutside = (event: MouseEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
        };

        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };

        document.addEventListener("mousedown", closeOnClickOutside);
        document.addEventListener("keydown", closeOnEscape);

        return () => {
            document.removeEventListener("mousedown", closeOnClickOutside);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [open]);

    return (
        <div className={style.root} ref={rootRef}>
            <button
                type="button"
                className={`${style.control} ${open ? style.controlOpen : ""} ${selected ? style.controlActive : ""}`}
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen((current) => !current)}
            >
                <span className={style.controlText}>{title}</span>
                <ChevronDownIcon className={`${style.chevron} ${open ? style.chevronOpen : ""}`} />
            </button>

            {open && (
                <ul className={style.list} role="listbox" aria-label="Темы">
                    <li>
                        <a
                            href={data.basePath}
                            className={`${style.option} ${selected ? "" : style.optionActive}`}
                            onClick={() => setOpen(false)}
                        >
                            <span>{data.allLabel}</span>
                            {!selected && <CheckCircleIcon className={style.check} />}
                        </a>
                    </li>

                    {data.tags.map((tag) => {
                        const active = tag.slug === data.activeTag;

                        return (
                            <li key={tag.slug}>
                                <a
                                    href={`${data.basePath}?tag=${tag.slug}`}
                                    className={`${style.option} ${active ? style.optionActive : ""}`}
                                    onClick={() => setOpen(false)}
                                >
                                    <span>{tag.title}</span>
                                    {active && <CheckCircleIcon className={style.check} />}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};
