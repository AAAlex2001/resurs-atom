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

    let ogImages: { url: string; width: number; height: number; alt: string }[] | undefined;
    let twitterImages: string[] | undefined;
    if (article.cover_image) {
        const coverUrl = `${SITE_URL}${article.cover_image}`;
        ogImages = [{ url: coverUrl, width: 1200, height: 675, alt: article.title }];
        twitterImages = [coverUrl];
    }

    return {
        title,
        description,
        keywords,
        authors: [{ name: SITE_NAME }],
        alternates: { canonical: url },
        openGraph: {
            type: "article",
            url,
            siteName: SITE_NAME,
            locale: "ru_RU",
            title: article.title,
            description,
            publishedTime: article.published_at ?? undefined,
            modifiedTime: article.updated_at,
            section: article.tags[0]?.title,
            tags: article.tags.map((tag) => tag.title),
            images: ogImages,
        },
        twitter: {
            card: article.cover_image ? "summary_large_image" : "summary",
            title: article.title,
            description,
            images: twitterImages,
        },
    };
};
