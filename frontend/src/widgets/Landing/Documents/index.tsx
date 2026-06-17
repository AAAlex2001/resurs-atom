"use client";

import { useEffect, useState } from "react";
import style from "./style.module.scss";

type DocItem = {
    id: number;
    doc: string;
    title: string;
    description: string;
};

type DocumentsProps = {
    kicker: string;
    title: string;
    description: string;
    docs: DocItem[];
};

export const Documents = ({ kicker, title, description, docs }: DocumentsProps) => {
    const [activeId, setActiveId] = useState<number | null>(docs[0]?.id ?? null);
    const [canHover, setCanHover] = useState(false);

    useEffect(() => {
        const query = window.matchMedia("(hover: hover)");
        const update = () => setCanHover(query.matches);

        update();
        query.addEventListener("change", update);

        return () => query.removeEventListener("change", update);
    }, []);

    const toggle = (id: number) => {
        setActiveId((current) => (current === id ? null : id));
    };

    return (
        <section className={style.documents}>
            <div className={style.content}>
                <div className={style.header}>
                    <div className={style.kicker}>{kicker}</div>
                    <div className={style.texts}>
                        <h2 className={style.title}>{title}</h2>
                        <p className={style.description}>{description}</p>
                    </div>
                </div>
                <ul
                    className={style.list}
                    onMouseLeave={() => {
                        if (canHover) {
                            setActiveId(null);
                        }
                    }}
                >
                    {docs.map((item) => {
                        const isActive = item.id === activeId;

                        return (
                            <li key={item.id}>
                                <button
                                    className={`${style.card} ${isActive ? style.cardActive : ""}`}
                                    type="button"
                                    onClick={() => toggle(item.id)}
                                    onMouseEnter={() => {
                                        if (canHover) {
                                            setActiveId(item.id);
                                        }
                                    }}
                                    aria-expanded={isActive}
                                >
                                    {isActive ? (
                                        <>
                                            <span className={style.docLabelActive}>{item.doc}</span>
                                            <span className={style.cardBody}>
                                                <span className={style.cardTitleActive}>{item.title}</span>
                                                <span className={style.cardDescription}>{item.description}</span>
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span className={style.docLabel}>{item.doc}</span>
                                            <span className={style.cardTitle}>{item.title}</span>
                                        </>
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};
