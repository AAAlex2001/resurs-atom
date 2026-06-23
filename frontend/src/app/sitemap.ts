import { MetadataRoute } from "next";
import { LEGAL_URLS } from "@/app/legal/config";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://atom-plus.pro",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: LEGAL_URLS.privacyPolicy,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.5,
        },
        {
            url: LEGAL_URLS.personalDataConsent,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.5,
        },
    ];
}
