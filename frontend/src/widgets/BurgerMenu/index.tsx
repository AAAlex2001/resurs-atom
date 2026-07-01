"use client";

import type { ComponentType } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/shared/ui/Button";
import { LogoBig } from "@/shared/ui/icons/LogoBig";
import { LogoSmall } from "@/shared/ui/icons/LogoSmall";
import { PhoneIcon } from "@/shared/ui/icons/PhoneIcon";
import { PartnerResursPlusIcon } from "@/shared/ui/icons/PartnerResursPlusIcon";
import { PartnerNedraIcon } from "@/shared/ui/icons/PartnerNedraIcon";
import { toTelHref } from "@/shared/lib/phone";
import style from "./style.module.scss";

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

type BurgerMenuData = {
    navLinks: NavLink[];
    phone: string;
    consultationText: string;
    partners: {
        label: string;
        items: PartnerItem[];
    };
};

const partnerIcons: Record<string, ComponentType<{ className?: string }>> = {
    "resurs-plus": PartnerResursPlusIcon,
    nedra: PartnerNedraIcon,
};

type BurgerMenuProps = {
    data: BurgerMenuData;
};

export const BurgerMenu = ({ data }: BurgerMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const openButtonRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const getFocusable = () => {
            const panel = panelRef.current;

            if (!panel) {
                return [];
            }

            return Array.from(
                panel.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
                ),
            );
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
                return;
            }

            if (event.key !== "Tab") {
                return;
            }

            const focusable = getFocusable();

            if (focusable.length === 0) {
                event.preventDefault();
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);
        getFocusable()[0]?.focus();

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
            openButtonRef.current?.focus();
        };
    }, [isOpen]);

    const closeMenu = () => setIsOpen(false);

    const overlay =
        isMounted && isOpen
            ? createPortal(
                  <div className={style.overlay} id="burger-menu" role="dialog" aria-modal="true" aria-label="Меню">
                      <div className={style.overlayPanel} ref={panelRef}>
                          <div className={style.overlayHeader}>
                              <a className={style.logoLink} href="/" aria-label="Атом-Плюс">
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
                              {data.navLinks.map((link) => (
                                  <a className={style.overlayLink} href={link.href} key={link.id} onClick={closeMenu}>
                                      <span>{link.label}</span>
                                  </a>
                              ))}
                          </nav>

                          <div className={style.overlayPartners}>
                              <span className={style.overlayPartnersTitle}>{data.partners.label}</span>
                              <div className={style.overlayPartnersList}>
                                  {data.partners.items.map((item) => {
                                      const Icon = partnerIcons[item.icon];
                                      const content = (
                                          <>
                                              <span className={style.overlayPartnerIcon}>
                                                  {Icon ? <Icon /> : null}
                                              </span>
                                              <span className={style.overlayPartnerText}>
                                                  <span className={style.overlayPartnerName}>{item.name}</span>
                                                  <span className={style.overlayPartnerDescription}>
                                                      {item.description}
                                                  </span>
                                              </span>
                                          </>
                                      );

                                      if (item.href) {
                                          return (
                                              <a
                                                  className={style.overlayPartnerItem}
                                                  href={item.href}
                                                  key={item.id}
                                                  onClick={closeMenu}
                                                  rel="noopener noreferrer"
                                                  target="_blank"
                                              >
                                                  {content}
                                              </a>
                                          );
                                      }

                                      return (
                                          <div className={style.overlayPartnerItem} key={item.id}>
                                              {content}
                                          </div>
                                      );
                                  })}
                              </div>
                          </div>

                          <div className={style.overlayButtons}>
                              <Button
                                  text={data.phone}
                                  variant="header-outline"
                                  icon={<PhoneIcon />}
                                  href={toTelHref(data.phone)}
                              />
                              <Button text={data.consultationText} variant="header-filled" href="/#contact" onClick={closeMenu} />
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
                ref={openButtonRef}
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
