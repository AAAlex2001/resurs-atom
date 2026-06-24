"use client";

import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/Button";
import style from "./style.module.scss";

const COOKIE_NAME = "cookies_accepted";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const CookiesBanner = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const accepted = document.cookie.split(";").some((c) => c.trim().startsWith(`${COOKIE_NAME}=`));
        if (!accepted) setVisible(true);
    }, []);

    const accept = () => {
        document.cookie = `${COOKIE_NAME}=true; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className={style.wrap} role="dialog" aria-label="Использование cookies">
            <div className={style.card}>
                <p className={style.text}>
                    Мы используем cookie-файлы для улучшения работы сайта. Продолжая использование, вы соглашаетесь с{" "}
                    <a href="/politika-pd" className={style.link}>политикой обработки персональных данных</a>.
                </p>
                <Button text="Принять" variant="filled" onClick={accept} className={style.button} />
            </div>
        </div>
    );
};
