import Link from "next/link";
import type { ReactNode } from "react";
import { LEGAL_SITE_URL } from "./config";

const LINK_PATTERN =
    /(https?:\/\/[^\s<]+[^\s<.,;:!?)"]|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

type LinkifyOptions = {
    linkClassName?: string;
};

export const linkifyLegalText = (text: string, options?: LinkifyOptions): ReactNode[] => {
    const linkClassName = options?.linkClassName;
    const parts = text.split(LINK_PATTERN);

    return parts.map((part, index) => {
        if (!part) {
            return null;
        }

        if (part.startsWith("http://") || part.startsWith("https://")) {
            if (part.startsWith(LEGAL_SITE_URL)) {
                const path = part.slice(LEGAL_SITE_URL.length) || "/";

                return (
                    <Link className={linkClassName} href={path} key={index}>
                        {part}
                    </Link>
                );
            }

            return (
                <a className={linkClassName} href={part} key={index} rel="noopener noreferrer" target="_blank">
                    {part}
                </a>
            );
        }

        if (part.includes("@")) {
            return (
                <a className={linkClassName} href={`mailto:${part}`} key={index}>
                    {part}
                </a>
            );
        }

        return part;
    });
};
