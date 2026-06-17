"use client";

import { useEffect, useState } from "react";
import { PackageCard, type PackageCardData } from "@/widgets/Landing/Packages/PackageCard";
import style from "./style.module.scss";

type PackagesData = {
    kicker: string;
    title: string;
    description: string;
    packages: PackageCardData[];
};

type PackagesProps = {
    data: PackagesData;
};

export const Packages = ({ data }: PackagesProps) => {
    const popularId = data.packages.find((item) => item.badge)?.id ?? null;
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [canHover, setCanHover] = useState(false);

    useEffect(() => {
        const query = window.matchMedia("(hover: hover)");
        const update = () => setCanHover(query.matches);

        update();
        query.addEventListener("change", update);

        return () => query.removeEventListener("change", update);
    }, []);

    const activeId = canHover ? hoveredId ?? popularId : popularId;

    return (
        <section id="packages" className={style.packages}>
            <div className={style.content}>
                <div className={style.header}>
                    <div className={style.kicker}>{data.kicker}</div>
                    <div className={style.texts}>
                        <h2 className={style.title}>{data.title}</h2>
                        <p className={style.description}>{data.description}</p>
                    </div>
                </div>
                <div className={style.cards} onMouseLeave={() => setHoveredId(null)}>
                    {data.packages.map((item) => (
                        <PackageCard
                            item={item}
                            highlighted={item.id === activeId}
                            onMouseEnter={canHover ? () => setHoveredId(item.id) : undefined}
                            key={item.id}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
