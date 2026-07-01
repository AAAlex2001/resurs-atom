import type { ComponentType } from "react";
import { CaretDownIcon } from "@/shared/ui/icons/CaretDownIcon";
import { PartnerResursPlusIcon } from "@/shared/ui/icons/PartnerResursPlusIcon";
import { PartnerNedraIcon } from "@/shared/ui/icons/PartnerNedraIcon";
import style from "./style.module.scss";

type PartnerItem = {
    id: number;
    icon: string;
    name: string;
    description: string;
    href?: string;
};

type PartnersData = {
    label: string;
    items: PartnerItem[];
};

type PartnersMenuProps = {
    partners: PartnersData;
};

const partnerIcons: Record<string, ComponentType<{ className?: string }>> = {
    "resurs-plus": PartnerResursPlusIcon,
    nedra: PartnerNedraIcon,
};

export const PartnersMenu = ({ partners }: PartnersMenuProps) => {
    return (
        <div className={style.partners}>
            <button type="button" className={style.partnersTrigger} aria-haspopup="true">
                <span className={style.partnersLabel}>{partners.label}</span>
                <CaretDownIcon className={style.partnersChevron} />
            </button>
            <div className={style.partnersPanel} role="menu" aria-label={partners.label}>
                {partners.items.map((item) => {
                    const Icon = partnerIcons[item.icon];
                    const content = (
                        <>
                            <span className={style.partnerIcon}>{Icon ? <Icon /> : null}</span>
                            <span className={style.partnerText}>
                                <span className={style.partnerName}>{item.name}</span>
                                <span className={style.partnerDescription}>{item.description}</span>
                            </span>
                        </>
                    );

                    if (item.href) {
                        return (
                            <a
                                className={style.partnerItem}
                                href={item.href}
                                key={item.id}
                                rel="noopener noreferrer"
                                role="menuitem"
                                target="_blank"
                            >
                                {content}
                            </a>
                        );
                    }

                    return (
                        <div className={style.partnerItem} key={item.id} role="menuitem">
                            {content}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
