"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowRightIcon } from "@/shared/ui/icons/ArrowRightIcon";
import { LicensingCard, type LicensingCardData } from "@/widgets/Landing/Licensing/LicensingCard";
import style from "./style.module.scss";

type LicensingData = {
    kicker: string;
    title: string;
    highlight: string;
    description: string;
    steps: {
        id: number;
        number: string;
        title: string;
    }[];
    stepsCard: LicensingCardData[];
};

type LicensingProps = {
    data: LicensingData;
};

export const Licensing = ({ data }: LicensingProps) => {
    const [activeStep, setActiveStep] = useState<number | null>(1);
    const activeCard = data.stepsCard.find((card) => card.id === activeStep);

    const toggle = (id: number) => {
        setActiveStep((current) => (current === id ? null : id));
    };

    return (
        <section className={style.licensingContainer}>
            <div className={style.licensingContent}>
                <div className={style.licensingHeader}>
                    <div className={style.licensingKicker}>{data.kicker}</div>
                    <div className={style.licensingTexts}>
                        <h2 className={style.licensingTitle}>
                            {data.title}{" "}
                            <span className={style.licensingHighlight}>{data.highlight}</span>
                        </h2>
                        <p className={style.licensingDescription}>{data.description}</p>
                    </div>
                </div>
                <div className={style.licensingBody}>
                    <div className={style.licensingSteps}>
                        {data.steps.map((step) => (
                            <button
                                className={`${style.licensingStep} ${activeStep === step.id ? style.active : ""}`}
                                key={step.id}
                                onClick={() => toggle(step.id)}
                                type="button"
                            >
                                <span className={style.licensingStepNumber}>{step.number}</span>
                                <span className={style.licensingStepTitle}>{step.title}</span>
                                <ArrowRightIcon className={style.licensingStepIcon} />
                            </button>
                        ))}
                    </div>
                    <div className={style.licensingCards}>
                        <AnimatePresence mode="wait">
                            {activeCard && (
                                <motion.div
                                    className={style.licensingCardMotion}
                                    key={activeStep}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -16 }}
                                    transition={{ duration: 0.28, ease: "easeOut" }}
                                >
                                    <LicensingCard card={activeCard} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};
