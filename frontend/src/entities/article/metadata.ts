import type { Metadata } from "next";
import { articlePath, type Article } from "./model";

const SITE_URL = "https://atom-plus.pro";
const SITE_NAME = "Атом-Плюс";

export const NOT_FOUND_METADATA: Metadata = {
    title: "Статья не найдена | Атом-Плюс",
    robots: { index: false },
};

export const buildArticleMetadata = (article: Article): Metadata => {
    const url = `${SITE_URL}${articlePath(article)}`;
    const description = article.seo_description ?? article.description ?? undefined;
    const title = `${article.seo_title ?? article.title} | ${SITE_NAME}`;

    let keywords: string[] | undefined;
    if (article.seo_keywords) {
        keywords = article.seo_keywords
            .split(",")
            .map((word) => word.trim())
            .filter(Boolean);
    }

    let images: string[] | undefined;
    if (article.cover_image) {
        images = [`${SITE_URL}${article.cover_image}`];
    }

    return {
        title,
        description,
        keywords,
        alternates: { canonical: url },
        openGraph: {
            type: "article",
            url,
            siteName: SITE_NAME,
            locale: "ru_RU",
            title: article.title,
            description,
            publishedTime: article.published_at ?? undefined,
            images,
        },
        twitter: {
            card: article.cover_image ? "summary_large_image" : "summary",
            title: article.title,
            description,
            images,
        },
    };
};
