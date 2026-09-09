import type { ArticleAdmin, ArticleAdminCard, ArticlePayload, TagAdmin } from "@/entities/article";
import { jsonBody, requestEmpty, requestJson } from "@/shared/api/http";

const BASE = "/api/admin";

export const fetchArticles = () =>
    requestJson<ArticleAdminCard[]>(`${BASE}/articles`, { cache: "no-store" });

export const createArticle = (payload: ArticlePayload) =>
    requestJson<ArticleAdmin>(`${BASE}/articles`, jsonBody("POST", payload));

export const updateArticle = (id: number, payload: Partial<ArticlePayload>) =>
    requestJson<ArticleAdmin>(`${BASE}/articles/${id}`, jsonBody("PATCH", payload));

export const deleteArticle = (id: number) =>
    requestEmpty(`${BASE}/articles/${id}`, { method: "DELETE" });

export const uploadImage = (file: File) => {
    const form = new FormData();
    form.append("file", file);

    return requestJson<{ url: string }>(`${BASE}/uploads`, { method: "POST", body: form });
};

export const fetchTags = () => requestJson<TagAdmin[]>(`${BASE}/tags`, { cache: "no-store" });

export const createTag = (title: string) =>
    requestJson<TagAdmin>(`${BASE}/tags`, jsonBody("POST", { title }));

export const deleteTag = (id: number) => requestEmpty(`${BASE}/tags/${id}`, { method: "DELETE" });
