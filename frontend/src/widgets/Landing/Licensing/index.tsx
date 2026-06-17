"use client";

import { useState } from "react";
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
    const [activeStep, setActiveStep] = useState<number | null>(null);

    return (
        <section className={style.licensingContainer}>
            <div className={style.licensingContent}>
                <div className={style.licensingHeader}>
                    <div className={style.licemsingKicker}>{kicker}</div>
                    <div className={style.licensingTexts}>
                        <h1 className={style.licensingTitle}>
                            {title}
                            <span className={style.licensingHighlight}>{highlight}</span>
                        </h1>
                        <p className={style.licensingDescription}>{description}</p>
                    </div>
                </div>
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
                        </button>
                    ))}
                </div>
                <div className={style.licensingCards}>
                    {stepsCard.map((card) => (
                        <LicensingCard card={card} key={card.id} />
                    ))}
                </div>
            </div>
        </section>
    );
};
