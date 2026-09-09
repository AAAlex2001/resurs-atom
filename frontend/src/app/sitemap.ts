import { MetadataRoute } from "next";
import { LEGAL_URLS } from "@/app/legal/config";
import { articlePath } from "@/entities/article";
import { getAllArticleCards } from "@/entities/article/api";

const SITE_URL = "https://atom-plus.pro";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const lastModified = new Date();

    const pages: MetadataRoute.Sitemap = [
        {
            url: SITE_URL,
            lastModified,
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${SITE_URL}/blog`,
            lastModified,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/novosti`,
            lastModified,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: LEGAL_URLS.privacyPolicy,
            lastModified,
            changeFrequency: "yearly",
            priority: 0.5,
        },
        {
            url: LEGAL_URLS.personalDataConsent,
            lastModified,
            changeFrequency: "yearly",
            priority: 0.5,
        },
    ];

    const articles = await getAllArticleCards();

    const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
        url: `${SITE_URL}${articlePath(article)}`,
        lastModified: new Date(article.updated_at),
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    return [...pages, ...articlePages];
}
