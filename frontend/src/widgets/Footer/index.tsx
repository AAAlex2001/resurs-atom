import { LogoBig } from "@/shared/ui/icons/LogoBig";
import { PhoneIcon } from "@/shared/ui/icons/PhoneIcon";
import { MailIcon } from "@/shared/ui/icons/MailIcon";
import { LocationIcon } from "@/shared/ui/icons/LocationIcon";
import { toTelHref } from "@/shared/lib/phone";
import style from "./style.module.scss";

type FooterData = {
    description: string;
    servicesTitle: string;
    services: {
        label: string;
        href: string;
    }[];
    contactsTitle: string;
    phone: string;
    email: string;
    location: string;
    copyright: string;
    note: string;
};

type FooterProps = {
    data: FooterData;
};

export const Footer = ({ data }: FooterProps) => {
    return (
        <footer className={style.footer}>
            <div className={style.main}>
                <div className={style.brand}>
                    <span className={style.logo}>
                        <LogoBig />
                    </span>
                    <p className={style.description}>{data.description}</p>
                </div>
                <div className={style.column}>
                    <div className={style.columnTitle}>{data.servicesTitle}</div>
                    <ul className={style.links}>
                        {data.services.map((service) => (
                            <li key={service.label}>
                                <a className={style.link} href={service.href}>
                                    {service.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={style.column}>
                    <div className={style.columnTitle}>{data.contactsTitle}</div>
                    <ul className={style.contacts}>
                        <li className={style.contact}>
                            <span className={style.contactIcon}>
                                <PhoneIcon />
                            </span>
                            <a className={style.contactLink} href={toTelHref(data.phone)}>
                                {data.phone}
                            </a>
                        </li>
                        <li className={style.contact}>
                            <span className={style.contactIcon}>
                                <MailIcon />
                            </span>
                            <a className={style.contactLink} href={`mailto:${data.email}`}>
                                {data.email}
                            </a>
                        </li>
                        <li className={style.contact}>
                            <span className={style.contactIcon}>
                                <LocationIcon />
                            </span>
                            <span className={style.contactText}>{data.location}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={style.bottom}>
                <p className={style.copyright}>{data.copyright}</p>
                <p className={style.note}>{data.note}</p>
            </div>
        </footer>
    );
};
