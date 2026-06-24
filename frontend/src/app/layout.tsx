import type { Metadata } from "next";
import Script from "next/script";
import { ActivitiesData, FooterData, LicensingData, SeoTextData } from "@/app/data";
import { CookiesBanner } from "@/widgets/CookiesBanner";
import { toTelHref } from "@/shared/lib/phone";
import "./globals.scss";

const organizationPhone = toTelHref(FooterData.phone).replace(/^tel:/, "");

export const metadata: Metadata = {
    title: "Атомные лицензии Ростехнадзора под ключ | Атом-Плюс",
    description:
        "Лицензии Ростехнадзора в области использования атомной энергии под ключ: аудит готовности, лицензионная документация, обоснование безопасности, сопровождение до получения.",
    keywords: [
        "лицензия Ростехнадзора",
        "лицензия в области использования атомной энергии",
        "лицензирование деятельности в атомной энергии",
        "получение атомной лицензии",
        "лицензия на эксплуатацию ядерной установки",
        "лицензирование источников ионизирующего излучения",
        "обоснование безопасности ядерной установки",
        "аудит готовности к лицензированию",
        "подготовка лицензионной документации Ростехнадзора",
        "лицензия на обращение с радиоактивными отходами",
        "лицензия по ФЗ-170 об использовании атомной энергии",
        "программа обеспечения качества НП-090",
        "сопровождение лицензирования атомных объектов",
        "конструирование оборудования для атомных станций лицензия",
        "экспертиза безопасности ядерного объекта",
    ],
    authors: [{ name: "Атом-Плюс" }],
    creator: "Атом-Плюс",
    publisher: "Атом-Плюс",
    applicationName: "Атом-Плюс",
    category: "Лицензирование и консалтинг в атомной отрасли",
    metadataBase: new URL("https://atom-plus.pro"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        locale: "ru_RU",
        url: "https://atom-plus.pro",
        siteName: "Атом-Плюс",
        title: "Атомные лицензии Ростехнадзора под ключ | Атом-Плюс",
        description:
            "Сопровождение лицензирования в области использования атомной энергии под ключ: аудит готовности, документация, обоснование безопасности.",
        images: [
            {
                url: "/og-image.jpg",
                width: 3750,
                height: 1969,
                alt: "Атом-Плюс — атомные лицензии Ростехнадзора",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Атомные лицензии Ростехнадзора под ключ | Атом-Плюс",
        description:
            "Сопровождение лицензирования в области использования атомной энергии под ключ: аудит готовности, документация, обоснование безопасности.",
        images: ["/og-image.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": "https://atom-plus.pro/#organization",
            name: "Атом-Плюс",
            url: "https://atom-plus.pro",
            telephone: organizationPhone,
            email: FooterData.email,
            description:
                "Сопровождение получения атомных лицензий Ростехнадзора под ключ: аудит готовности, подготовка документации, обоснование безопасности.",
            areaServed: "RU",
            address: {
                "@type": "PostalAddress",
                addressLocality: "Кемерово",
                addressCountry: "RU",
            },
            contactPoint: {
                "@type": "ContactPoint",
                telephone: organizationPhone,
                email: FooterData.email,
                contactType: "customer service",
                areaServed: "RU",
                availableLanguage: "Russian",
            },
            knowsAbout: [
                "Лицензирование атомных объектов",
                "Обоснование безопасности ядерных установок",
                "Подготовка документации для Ростехнадзора",
                "Источники ионизирующего излучения",
                "Радиационная безопасность",
            ],
        },
        {
            "@type": "WebSite",
            "@id": "https://atom-plus.pro/#website",
            url: "https://atom-plus.pro",
            name: "Атом-Плюс",
            publisher: { "@id": "https://atom-plus.pro/#organization" },
            inLanguage: "ru-RU",
        },
        {
            "@type": "WebPage",
            "@id": "https://atom-plus.pro/#webpage",
            url: "https://atom-plus.pro",
            name: "Атомные лицензии Ростехнадзора — Атом-Плюс",
            isPartOf: { "@id": "https://atom-plus.pro/#website" },
            about: { "@id": "https://atom-plus.pro/#organization" },
            description:
                "Получение атомных лицензий Ростехнадзора под ключ: аудит готовности, подготовка документации, сопровождение до выдачи лицензии.",
            inLanguage: "ru-RU",
        },
        {
            "@type": "ProfessionalService",
            "@id": "https://atom-plus.pro/#service",
            name: "Сопровождение атомного лицензирования",
            provider: { "@id": "https://atom-plus.pro/#organization" },
            areaServed: "RU",
            hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Виды деятельности, требующие лицензии",
                itemListElement: ActivitiesData.activities.map((activity) => ({
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: activity.title,
                        description: activity.description,
                    },
                })),
            },
        },
        {
            "@type": "HowTo",
            "@id": "https://atom-plus.pro/#licensing-process",
            name: "Процесс лицензирования в области использования атомной энергии",
            inLanguage: "ru-RU",
            step: LicensingData.steps.map((step, index) => ({
                "@type": "HowToStep",
                position: index + 1,
                name: step.title,
            })),
        },
        {
            "@type": "Article",
            "@id": "https://atom-plus.pro/#about-licensing",
            headline: SeoTextData.title,
            inLanguage: "ru-RU",
            isPartOf: { "@id": "https://atom-plus.pro/#webpage" },
            mainEntityOfPage: { "@id": "https://atom-plus.pro/#webpage" },
            author: { "@id": "https://atom-plus.pro/#organization" },
            publisher: { "@id": "https://atom-plus.pro/#organization" },
            about: "Лицензирование в области использования атомной энергии",
            articleSection: SeoTextData.blocks
                .filter((block) => block.heading)
                .map((block) => block.heading),
            articleBody: SeoTextData.blocks
                .map((block) => (block.heading ? `${block.heading}. ${block.text}` : block.text))
                .join("\n\n"),
        },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <head>
                <link
                    rel="preload"
                    href="/fonts/TTFirsNeue-Regular.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/TTFirsNeue-Medium.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body>
                {children}
                <CookiesBanner />
                <Script id="yandex-metrika" strategy="afterInteractive">
                    {`
                        (function(m,e,t,r,i,k,a){
                            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                            m[i].l=1*new Date();
                            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                        })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=109927382', 'ym');
                        ym(109927382, 'init', {
                            ssr: true,
                            webvisor: true,
                            clickmap: true,
                            ecommerce: "dataLayer",
                            referrer: document.referrer,
                            url: location.href,
                            accurateTrackBounce: true,
                            trackLinks: true
                        });
                    `}
                </Script>
                <noscript>
                    <div>
                        <img
                            src="https://mc.yandex.ru/watch/109927382"
                            style={{ position: "absolute", left: "-9999px" }}
                            alt=""
                        />
                    </div>
                </noscript>
            </body>
        </html>
    );
}
