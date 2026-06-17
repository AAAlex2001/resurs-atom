"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowRightIcon } from "@/shared/ui/icons/ArrowRightIcon";
import { LicensingCard, type LicensingCardData } from "@/widgets/Landing/Licensing/LicensingCard";
import style from "./style.module.scss";

type LicensingProps = {
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

export const Licensing = ({ kicker, title, highlight, description, steps, stepsCard }: LicensingProps) => {
    const [activeStep, setActiveStep] = useState(1);
    const activeCard = stepsCard.find((card) => card.id === activeStep) ?? stepsCard[0];

    if (!activeCard) {
        return null;
    }

    return (
        <section className={style.licensingContainer}>
            <div className={style.licensingContent}>
                <div className={style.licensingHeader}>
                    <div className={style.licensingKicker}>{kicker}</div>
                    <div className={style.licensingTexts}>
                        <h1 className={style.licensingTitle}>
                            {title}
                            <span className={style.licensingHighlight}>{highlight}</span>
                        </h1>
                        <p className={style.licensingDescription}>{description}</p>
                    </div>
                </div>
                <div className={style.licensingBody}>
                    <div className={style.licensingSteps}>
                        {steps.map((step) => (
                            <button
                                className={`${style.licensingStep} ${activeStep === step.id ? style.active : ""}`}
                                key={step.id}
                                onClick={() => setActiveStep(step.id)}
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
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};
