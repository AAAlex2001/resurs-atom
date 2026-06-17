"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/shared/ui/icons/ChevronDownIcon";
import style from "./style.module.scss";

type FaqItem = {
    id: number;
    question: string;
    answer: string;
};

type FaqData = {
    kicker: string;
    title: string;
    items: FaqItem[];
};

type FaqProps = {
    data: FaqData;
};

export const Faq = ({ data }: FaqProps) => {
    const [openId, setOpenId] = useState<number | null>(null);

    const toggle = (id: number) => {
        setOpenId((current) => (current === id ? null : id));
    };

    return (
        <section id="questions" className={style.faq}>
            <div className={style.content}>
                <div className={style.header}>
                    <div className={style.kicker}>{data.kicker}</div>
                    <div className={style.texts}>
                        <h2 className={style.title}>{data.title}</h2>
                    </div>
                </div>
                <div className={style.list}>
                    {data.items.map((item) => {
                        const isOpen = openId === item.id;

                        return (
                            <div className={`${style.item} ${isOpen ? style.itemOpen : ""}`} key={item.id}>
                                <button
                                    className={style.question}
                                    type="button"
                                    onClick={() => toggle(item.id)}
                                    aria-expanded={isOpen}
                                >
                                    <span className={style.questionText}>{item.question}</span>
                                    <ChevronDownIcon className={style.icon} />
                                </button>
                                <div className={style.answerWrap}>
                                    <div className={style.answer}>
                                        <p className={style.answerText}>{item.answer}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
