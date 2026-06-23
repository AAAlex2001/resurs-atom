import style from "./style.module.scss";
import { BurgerMenu } from "@/widgets/BurgerMenu";
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

type HeaderData = {
    phone: string;
    consultationText: string;
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
                    <div className={style.headerLogoSmall}>
                        <LogoSmall />
                    </div>
                    <div className={style.headerLogoBig}>
                        <LogoBig />
                    </div>
                    <nav className={style.headerNav} aria-label="Основная навигация">
                        {data.navLinks.map((link) => (
                            <a className={style.headerNavLink} href={link.href} key={link.id}>
                                <span>{link.label}</span>
                            </a>
                        ))}
                    </nav>
                    <div className={style.headerButtons}>
                        <div className={style.headerButtonOutline}>
                            <Button
                                text={data.phone}
                                variant="header-outline"
                                icon={<PhoneIcon />}
                                href={toTelHref(data.phone)}
                            />
                        </div>
                        <div className={style.headerButtonFilled}>
                            <Button text={data.consultationText} variant="header-filled" href="#contact" />
                        </div>
                    </div>
                </div>
            </header>
            <BurgerMenu data={data} />
        </>
    );
};
