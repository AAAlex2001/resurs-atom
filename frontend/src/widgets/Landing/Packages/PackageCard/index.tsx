import { Button } from "@/shared/ui/Button";
import { CheckCircleIcon } from "@/shared/ui/icons/CheckCircleIcon";
import { ClockIcon } from "@/shared/ui/icons/ClockIcon";
import style from "./style.module.scss";

export type PackageCardData = {
    id: number;
    name: string;
    title: string;
    description: string;
    features: string[];
    duration: string;
    buttonText: string;
    badge?: string;
};

type PackageCardProps = {
    item: PackageCardData;
    highlighted: boolean;
    onMouseEnter?: () => void;
};

export const PackageCard = ({ item, highlighted, onMouseEnter }: PackageCardProps) => {
    return (
        <div
            className={`${style.card} ${highlighted ? style.cardHighlight : ""}`}
            onMouseEnter={onMouseEnter}
        >
            {item.badge && <span className={style.badge}>{item.badge}</span>}
            <div className={style.top}>
                <span className={style.name}>{item.name}</span>
                <div className={style.texts}>
                    <span className={style.title}>{item.title}</span>
                    <span className={style.description}>{item.description}</span>
                </div>
                <ul className={style.features}>
                    {item.features.map((feature, index) => (
                        <li className={style.feature} key={index}>
                            <CheckCircleIcon className={style.featureIcon} />
                            <span className={style.featureText}>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={style.duration}>
                <ClockIcon className={style.durationIcon} />
                <span className={style.durationText}>{item.duration}</span>
            </div>
            <Button text={item.buttonText} variant="filled" className={style.cardButton} href="#contact" />
        </div>
    );
};
