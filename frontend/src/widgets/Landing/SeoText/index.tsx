"use client";

import { useState } from "react";
import style from "./style.module.scss";

type SeoBlock = {
    heading?: string;
    text: string;
};

type SeoTextData = {
    title: string;
    moreText: string;
    lessText: string;
    blocks: SeoBlock[];
};

type SeoTextProps = {
    data: SeoTextData;
};

export const SeoText = ({ data }: SeoTextProps) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <section className={style.seo}>
            <div className={style.inner}>
                <h2 className={style.title}>{data.title}</h2>
                <div className={`${style.body} ${expanded ? style.expanded : ""}`}>
                    {data.blocks.map((block, index) => (
                        <div className={style.block} key={index}>
                            {block.heading && <h3 className={style.heading}>{block.heading}</h3>}
                            <p className={style.text}>{block.text}</p>
                        </div>
                    ))}
                </div>
                <button className={style.toggle} type="button" onClick={() => setExpanded((value) => !value)}>
                    {expanded ? data.lessText : data.moreText}
                </button>
            </div>
        </section>
    );
};
