"use client";

import { useEffect, useState } from "react";
import style from "./style.module.scss";

type DocItem = {
    id: number;
    doc: string;
    title: string;
    description: string;
};

type DocumentsData = {
    kicker: string;
    title: string;
    description: string;
    docs: DocItem[];
};

type DocumentsProps = {
    data: DocumentsData;
};

export const Documents = ({ data }: DocumentsProps) => {
    const [activeId, setActiveId] = useState<number | null>(data.docs[0]?.id ?? null);
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
                    <div className={style.kicker}>{data.kicker}</div>
                    <div className={style.texts}>
                        <h2 className={style.title}>{data.title}</h2>
                        <p className={style.description}>{data.description}</p>
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
                    {data.docs.map((item) => {
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
