"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useState } from "react";
import { ArrowRightIcon } from "@/shared/ui/icons/ArrowRightIcon";
import { Button } from "@/shared/ui/Button";
import { CasesCard, type CasesCardData } from "@/widgets/Landing/Cases/CasesCard";
import style from "./style.module.scss";

type CasesData = {
    kicker: string;
    title: string;
    highlight: string;
    description: string;
    buttonText: string;
    steps: {
        id: number;
        number: string;
        title: string;
    }[];
    stepsCard: CasesCardData[];
};

type CasesProps = {
    data: CasesData;
};

export const Cases = ({ data }: CasesProps) => {
    const [activeStep, setActiveStep] = useState<number | null>(1);

    const toggle = (id: number) => {
        setActiveStep((current) => (current === id ? null : id));
    };

    return (
        <section id="cases" className={style.casesContainer}>
            <div className={style.casesContent}>
                <div className={style.casesIntro}>
                    <div className={style.casesHeader}>
                        <div className={style.casesKicker}>{data.kicker}</div>
                        <div className={style.casesTexts}>
                            <h2 className={style.casesTitle}>
                                {data.title}{" "}
                                <span className={style.casesHighlight}>{data.highlight}</span>
                            </h2>
                            <p className={style.casesDescription}>{data.description}</p>
                        </div>
                    </div>
                    <Button text={data.buttonText} variant="filled" className={style.casesButton} href="#contact" />
                </div>
                <div className={style.casesSteps}>
                    {data.steps.map((step) => {
                        const card = data.stepsCard.find((item) => item.id === step.id);
                        const isActive = activeStep === step.id;

                        return (
                            <Fragment key={step.id}>
                                <button
                                    className={`${style.casesStep} ${isActive ? style.active : ""}`}
                                    onClick={() => toggle(step.id)}
                                    type="button"
                                >
                                    <span className={style.casesStepNumber}>{step.number}</span>
                                    <span className={style.casesStepTitle}>{step.title}</span>
                                    <ArrowRightIcon className={style.casesStepIcon} />
                                </button>
                                <AnimatePresence initial={false}>
                                    {isActive && card && (
                                        <motion.div
                                            className={style.casesCardWrap}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.28, ease: "easeOut" }}
                                        >
                                            <CasesCard card={card} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
