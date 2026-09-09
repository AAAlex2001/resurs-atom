"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAdminAuth } from "@/features/admin-auth";
import { Button } from "@/shared/ui/Button";
import style from "./style.module.scss";

const LINKS = [
    { label: "Заявки", href: "/f7k2x9n3", prefix: null },
    { label: "Статьи", href: "/f7k2x9n3/articles", prefix: "/f7k2x9n3/articles" },
] as const;

export const AdminNav = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { handleLogout } = useAdminAuth();

    const onLogout = async () => {
        await handleLogout();
        router.push("/f7k2x9n3/login");
    };

    const activeHref =
        LINKS.find((link) => link.prefix && pathname.startsWith(link.prefix))?.href ?? "/f7k2x9n3";

    return (
        <nav className={style.nav} aria-label="Разделы админки">
            <div className={style.inner}>
                <div className={style.left}>
                    <span className={style.brand}>Панель управления</span>
                    <div className={style.links}>
                        {LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={`${style.link} ${activeHref === link.href ? style.linkActive : ""}`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
                <Button text="Выйти" variant="transparent" onClick={onLogout} />
            </div>
        </nav>
    );
};
