import style from "./style.module.scss";
import { Button } from "@/shared/ui/Button";
import { LogoBig } from "@/shared/ui/icons/LogoBig";
import { LogoSmall } from "@/shared/ui/icons/LogoSmall";
import { PhoneIcon } from "@/shared/ui/icons/PhoneIcon";

type HeaderProps = {
    phone: string;
    consultationText: string;
};

export const Header = ({ phone, consultationText }: HeaderProps) => {
    return (
        <header className={style.header}>
            <div className={style.headerContent}>
                <div className={style.headerLogoSmall}>
                    <LogoSmall />
                </div>
                <div className={style.headerLogoBig}>
                    <LogoBig />
                </div>
                <div className={style.headerButtons}>
                    <div className={style.headerButtonOutline}>
                        <Button text={phone} variant="header-outline" icon={<PhoneIcon />} />
                    </div>
                    <div className={style.headerButtonFulled}>
                        <Button text={consultationText} variant="header-filled" />
                    </div>
                </div>
            </div>
        </header>
    );
};
