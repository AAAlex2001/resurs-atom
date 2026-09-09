"use client";

import { useState } from "react";
import style from "./style.module.scss";

export const ShareButton = () => {
    const [copied, setCopied] = useState(false);

    const copyLink = async () => {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button type="button" className={style.button} onClick={() => void copyLink()}>
            <span className={style.text}>{copied ? "Ссылка скопирована" : "Поделиться"}</span>
        </button>
    );
};
