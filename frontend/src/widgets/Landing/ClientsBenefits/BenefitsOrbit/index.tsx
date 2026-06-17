"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { HoverPointerIcon } from "@/shared/ui/icons/HoverPointerIcon";
import style from "./style.module.scss";

type Benefit = {
    id: number;
    number: string;
    title: string;
    description: string;
};

type BenefitsOrbitProps = {
    benefits: Benefit[];
    hint: {
        title: string;
        description: string;
    };
};

type Ring = "outer" | "middle" | "inner";

type OrbitItem = {
    benefitIndex: number;
    ring: Ring;
    x: string;
    y: string;
};

const orbitItems: OrbitItem[] = [
    { benefitIndex: 0, ring: "outer", x: "100%", y: "50%" },
    { benefitIndex: 1, ring: "outer", x: "75%", y: "6.7%" },
    { benefitIndex: 2, ring: "outer", x: "25%", y: "6.7%" },
    { benefitIndex: 3, ring: "middle", x: "100%", y: "50%" },
    { benefitIndex: 4, ring: "middle", x: "75%", y: "6.7%" },
    { benefitIndex: 5, ring: "middle", x: "25%", y: "6.7%" },
    { benefitIndex: 6, ring: "inner", x: "85.35%", y: "85.35%" },
    { benefitIndex: 7, ring: "inner", x: "14.65%", y: "14.65%" },
];

const ringClassNames: Record<Ring, string> = {
    outer: style.outerRing,
    middle: style.middleRing,
    inner: style.innerRing,
};

const ringDurations: Record<Ring, number> = {
    outer: 46,
    middle: 36,
    inner: 28,
};

const ringDirections: Record<Ring, number> = {
    outer: 360,
    middle: -360,
    inner: 360,
};

export const BenefitsOrbit = ({ benefits, hint }: BenefitsOrbitProps) => {
    const [activeBenefit, setActiveBenefit] = useState<Benefit | null>(null);
    const shouldReduceMotion = useReducedMotion();
    const isOrbitPaused = Boolean(activeBenefit) || shouldReduceMotion;

    const rings: Ring[] = ["outer", "middle", "inner"];

    return (
        <div className={style.orbitWrapper}>
            <div className={style.orbit}>
                <div className={`${style.circle} ${style.outerCircle}`} />
                <div className={`${style.circle} ${style.middleCircle}`} />
                <div className={`${style.circle} ${style.innerCircle}`} />

                {rings.map((ring) => {
                    const duration = ringDurations[ring];
                    const direction = ringDirections[ring];

                    return (
                        <motion.div
                            animate={isOrbitPaused ? undefined : { rotate: direction }}
                            className={`${style.ringLayer} ${ringClassNames[ring]}`}
                            key={ring}
                            transition={{ duration, ease: "linear", repeat: Infinity }}
                        >
                            {orbitItems
                                .filter((item) => item.ring === ring)
                                .map((item) => {
                                    const benefit = benefits[item.benefitIndex];

                                    if (!benefit) {
                                        return null;
                                    }

                                    return (
                                        <motion.button
                                            animate={isOrbitPaused ? undefined : { rotate: -direction }}
                                            className={style.orbitNumber}
                                            key={benefit.id}
                                            onBlur={() => setActiveBenefit(null)}
                                            onFocus={() => setActiveBenefit(benefit)}
                                            onHoverEnd={() => setActiveBenefit(null)}
                                            onHoverStart={() => setActiveBenefit(benefit)}
                                            style={{
                                                left: item.x,
                                                top: item.y,
                                            }}
                                            transition={{ duration, ease: "linear", repeat: Infinity }}
                                            type="button"
                                            whileHover={{ scale: 1.08 }}
                                        >
                                            {benefit.number}
                                        </motion.button>
                                    );
                                })}
                        </motion.div>
                    );
                })}

                <AnimatePresence mode="wait">
                    {activeBenefit && (
                        <motion.div
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className={style.infoCard}
                            exit={{ opacity: 0, scale: 0.96, y: 8 }}
                            initial={{ opacity: 0, scale: 0.96, y: 8 }}
                            key={activeBenefit.id}
                            transition={{ duration: 0.2 }}
                        >
                            <div className={style.infoTitle}>{activeBenefit.title}</div>
                            <div className={style.infoDescription}>{activeBenefit.description}</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className={style.orbitHint}>
                <HoverPointerIcon className={style.hintIcon} gradientId="benefits-hover-icon-hint" />
                <div className={style.hintTexts}>
                    <div className={style.hintTitle}>{hint.title}</div>
                    <div className={style.hintDescription}>{hint.description}</div>
                </div>
            </div>
        </div>
    );
};
