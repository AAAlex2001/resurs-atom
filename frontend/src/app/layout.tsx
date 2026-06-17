import type { Metadata } from "next";
import Script from "next/script";
import { FaqData, FooterData, PackagesData } from "@/app/data";
import "./globals.scss";

export const metadata: Metadata = {
    title: "Атомные лицензии Ростехнадзора | Атом-Плюс — сопровождение под ключ",
    description:
        "Получение атомных лицензий Ростехнадзора под ключ. 120+ проектов, 10 лет в атомном надзоре, 94% одобренной документации. Аудит готовности, лицензионная документация, обоснование безопасности.",
    keywords: [
        "атомная лицензия",
        "лицензия Ростехнадзора",
        "лицензирование в атомной энергии",
        "получение лицензии на ядерную деятельность",
        "обоснование безопасности ядерного объекта",
        "лицензия на радиационную деятельность",
        "ядерные установки лицензирование",
        "радиоактивные материалы лицензия",
        "НП-090 ОКК атомная энергия",
        "сопровождение лицензирования атомных объектов",
        "Ростехнадзор атомный надзор",
        "лицензия на эксплуатацию ядерной установки",
        "лицензирование источников ионизирующего излучения",
        "подготовка документации для Ростехнадзора",
        "gap-анализ ядерный объект",
    ],
    authors: [{ name: "Атом-Плюс" }],
    creator: "Атом-Плюс",
    publisher: "Атом-Плюс",
    metadataBase: new URL("https://atom-plus.pro"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        locale: "ru_RU",
        url: "https://atom-plus.pro",
        siteName: "Атом-Плюс",
        title: "Атомные лицензии Ростехнадзора | Атом-Плюс",
        description:
            "Сопровождение лицензирования в атомной отрасли под ключ. 120+ проектов, 94% одобренной документации.",
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
        title: "Атомные лицензии Ростехнадзора | Атом-Плюс",
        description:
            "Сопровождение лицензирования в атомной отрасли под ключ. 120+ проектов, 94% одобренной документации.",
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
            telephone: "+79990018000",
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
                telephone: "+79990018000",
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
                "Получение атомных лицензий Ростехнадзора под ключ. 120+ проектов, 10 лет в атомном надзоре, 94% одобренной документации.",
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
                name: "Пакеты услуг лицензирования",
                itemListElement: PackagesData.packages.map((pkg) => ({
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: pkg.title,
                        description: pkg.description,
                        serviceType: pkg.name,
                    },
                    eligibleDuration: {
                        "@type": "QuantitativeValue",
                        description: pkg.duration,
                    },
                })),
            },
        },
        {
            "@type": "FAQPage",
            "@id": "https://atom-plus.pro/#faq",
            inLanguage: "ru-RU",
            mainEntity: FaqData.items.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer,
                },
            })),
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
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body>
                {children}
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
