import { CaretDownIcon } from "@/shared/ui/icons/CaretDownIcon";
import style from "./style.module.scss";

type ContentItem = {
    id: number;
    label: string;
    description: string;
    href: string;
};

type ContentMenuData = {
    label: string;
    items: ContentItem[];
};

type ContentMenuProps = {
    data: ContentMenuData;
};

export const ContentMenu = ({ data }: ContentMenuProps) => {
    return (
        <div className={style.content}>
            <button type="button" className={style.trigger} aria-haspopup="true">
                <span className={style.label}>{data.label}</span>
                <CaretDownIcon className={style.chevron} />
            </button>
            <div className={style.panel} role="menu" aria-label={data.label}>
                {data.items.map((item) => (
                    <a className={style.item} href={item.href} key={item.id} role="menuitem">
                        <span className={style.itemLabel}>{item.label}</span>
                        <span className={style.itemDescription}>{item.description}</span>
                    </a>
                ))}
            </div>
        </div>
    );
};
