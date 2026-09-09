import type { ArticleStats } from "@/entities/article";
import { jsonBody, requestJson } from "@/shared/api/http";

const articleUrl = (slug: string) => `/api/articles/${encodeURIComponent(slug)}`;

export const registerView = (slug: string) =>
    requestJson<ArticleStats>(`${articleUrl(slug)}/view`, { method: "POST" });

export const setReaction = (slug: string, value: 1 | -1) =>
    requestJson<ArticleStats>(`${articleUrl(slug)}/reaction`, jsonBody("PUT", { value }));

export const removeReaction = (slug: string) =>
    requestJson<ArticleStats>(`${articleUrl(slug)}/reaction`, { method: "DELETE" });
