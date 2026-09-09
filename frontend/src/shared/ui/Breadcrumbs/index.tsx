import style from "./style.module.scss";

type Crumb = {
    label: string;
    href?: string;
};

type BreadcrumbsProps = {
    items: Crumb[];
};

const SITE_URL = "https://atom-plus.pro";

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <nav className={style.breadcrumbs} aria-label="Хлебные крошки">
                <ol className={style.list}>
                    {items.map((item, index) => {
                        const isLast = index === items.length - 1;

                        return (
                            <li className={style.item} key={`${item.label}-${index}`}>
                                {item.href && !isLast ? (
                                    <a className={style.crumb} href={item.href}>
                                        {item.label}
                                    </a>
                                ) : (
                                    <span
                                        className={`${style.crumb} ${isLast ? style.current : ""}`}
                                        aria-current={isLast ? "page" : undefined}
                                    >
                                        {item.label}
                                    </span>
                                )}
                                {!isLast && (
                                    <svg
                                        className={style.arrow}
                                        width="15"
                                        height="15"
                                        viewBox="0 0 15 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden
                                    >
                                        <path
                                            d="M5.75 3.5L9.75 7.5L5.75 11.5"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
};
