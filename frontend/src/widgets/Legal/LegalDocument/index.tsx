import type { LegalDocumentData } from "@/app/legal/content";
import { linkifyLegalText } from "@/app/legal/linkify";
import style from "./style.module.scss";

type LegalDocumentProps = {
    data: LegalDocumentData;
};

export const LegalDocument = ({ data }: LegalDocumentProps) => {
    return (
        <article className={style.document}>
            <div className={style.inner}>
                <header className={style.header}>
                    <div className={style.kicker}>{data.kicker}</div>
                    <h1 className={style.title}>{data.title}</h1>
                    <p className={style.updated}>Дата актуализации: {data.updatedAt}</p>
                </header>
                <div className={style.content}>
                    {data.sections.map((section, index) => (
                        <section className={style.section} key={index}>
                            {section.heading && <h2 className={style.heading}>{section.heading}</h2>}
                            {section.paragraphs.map((paragraph, paragraphIndex) => (
                                <p className={style.paragraph} key={paragraphIndex}>
                                    {linkifyLegalText(paragraph, { linkClassName: style.link })}
                                </p>
                            ))}
                        </section>
                    ))}
                </div>
            </div>
        </article>
    );
};
