import style from "./style.module.scss";
import { BurgerMenu } from "@/widgets/BurgerMenu";
import { Button } from "@/shared/ui/Button";
import { LogoBig } from "@/shared/ui/icons/LogoBig";
import { LogoSmall } from "@/shared/ui/icons/LogoSmall";
import { PhoneIcon } from "@/shared/ui/icons/PhoneIcon";

type NavLink = {
    id: number;
    label: string;
    href: string;
};

type HeaderProps = {
    phone: string;
    consultationText: string;
    navLinks: NavLink[];
};

export const Header = ({ phone, consultationText, navLinks }: HeaderProps) => {
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
                        {navLinks.map((link) => (
                            <a className={style.headerNavLink} href={link.href} key={link.id}>
                                <span>{link.label}</span>
                            </a>
                        ))}
                    </nav>
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
            <BurgerMenu navLinks={navLinks} phone={phone} consultationText={consultationText} />
        </>
    );
};
