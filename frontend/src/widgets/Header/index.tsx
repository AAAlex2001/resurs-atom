import style from "./style.module.scss";
import { BurgerMenu } from "@/widgets/BurgerMenu";
import { PartnersMenu } from "@/widgets/Header/PartnersMenu";
import { Button } from "@/shared/ui/Button";
import { LogoBig } from "@/shared/ui/icons/LogoBig";
import { LogoSmall } from "@/shared/ui/icons/LogoSmall";
import { PhoneIcon } from "@/shared/ui/icons/PhoneIcon";
import { toTelHref } from "@/shared/lib/phone";

type NavLink = {
    id: number;
    label: string;
    href: string;
};

type PartnerItem = {
    id: number;
    icon: string;
    name: string;
    description: string;
    href?: string;
};

type HeaderData = {
    phone: string;
    consultationText: string;
    partners: {
        label: string;
        items: PartnerItem[];
    };
    navLinks: NavLink[];
};

type HeaderProps = {
    data: HeaderData;
};

export const Header = ({ data }: HeaderProps) => {
    return (
        <>
            <header className={style.header}>
                <div className={style.headerContent}>
                    <a className={style.headerLogoLink} href="/" aria-label="Атом-Плюс — на главную">
                        <span className={style.headerLogoSmall}>
                            <LogoSmall />
                        </span>
                        <span className={style.headerLogoBig}>
                            <LogoBig />
                        </span>
                    </a>
                    <nav className={style.headerNav} aria-label="Основная навигация">
                        {data.navLinks.map((link) => (
                            <a className={style.headerNavLink} href={link.href} key={link.id}>
                                <span>{link.label}</span>
                            </a>
                        ))}
                    </nav>
                    <div className={style.headerButtons}>
                        <PartnersMenu partners={data.partners} />
                        <div className={style.headerButtonOutline}>
                            <Button
                                text={data.phone}
                                variant="header-outline"
                                icon={<PhoneIcon />}
                                href={toTelHref(data.phone)}
                            />
                        </div>
                        <div className={style.headerButtonFilled}>
                            <Button text={data.consultationText} variant="header-filled" href="/#contact" />
                        </div>
                    </div>
                </div>
            </header>
            <BurgerMenu data={data} />
        </>
    );
};
