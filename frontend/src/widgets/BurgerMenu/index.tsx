"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/shared/ui/Button";
import { LogoBig } from "@/shared/ui/icons/LogoBig";
import { LogoSmall } from "@/shared/ui/icons/LogoSmall";
import { PhoneIcon } from "@/shared/ui/icons/PhoneIcon";
import style from "./style.module.scss";

type NavLink = {
    id: number;
    label: string;
    href: string;
};

type BurgerMenuProps = {
    navLinks: NavLink[];
    phone: string;
    consultationText: string;
};

export const BurgerMenu = ({ navLinks, phone, consultationText }: BurgerMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    const closeMenu = () => setIsOpen(false);

    const overlay =
        isMounted && isOpen
            ? createPortal(
                  <div className={style.overlay} id="burger-menu" role="dialog" aria-modal="true" aria-label="Меню">
                      <div className={style.overlayPanel}>
                          <div className={style.overlayHeader}>
                              <a className={style.logoLink} href="/" aria-label="Ресурс-Атом">
                                  <span className={style.logoSmall}>
                                      <LogoSmall />
                                  </span>
                                  <span className={style.logoBig}>
                                      <LogoBig />
                                  </span>
                              </a>
                              <Button
                                  className={style.closeButton}
                                  text="Закрыть"
                                  variant="transparent"
                                  onClick={closeMenu}
                              />
                          </div>

                          <nav className={style.overlayNav} aria-label="Мобильная навигация">
                              {navLinks.map((link) => (
                                  <a className={style.overlayLink} href={link.href} key={link.id} onClick={closeMenu}>
                                      <span>{link.label}</span>
                                  </a>
                              ))}
                          </nav>

                          <div className={style.overlayButtons}>
                              <Button text={phone} variant="header-outline" icon={<PhoneIcon />} />
                              <Button text={consultationText} variant="header-filled" />
                          </div>
                      </div>
                  </div>,
                  document.body,
              )
            : null;

    return (
        <div className={style.burgerMenu}>
            <button
                className={style.openButton}
                type="button"
                onClick={() => setIsOpen(true)}
                aria-controls="burger-menu"
                aria-expanded={isOpen}
            >
                <span className={style.openIcon} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </span>
                <span className={style.openText}>Меню</span>
            </button>
            {overlay}
        </div>
    );
};
