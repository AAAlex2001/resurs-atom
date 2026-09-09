"use client";

import { useReducer } from "react";
import type {
    ArticleAdmin,
    ArticleAdminCard,
    ArticlePayload,
    ArticleSection,
    TagAdmin,
} from "@/entities/article";
import { toDateTimeInput } from "@/shared/lib/date";
import { createArticle, createTag, deleteArticle, deleteTag, updateArticle, uploadImage } from "./api";

export type EditorFields = {
    title: string;
    slug: string;
    section: ArticleSection;
    description: string;
    cover_image: string;
    content: string;
    tag_ids: number[];
    published: boolean;
    published_at: string;
    seo_title: string;
    seo_description: string;
    seo_keywords: string;
};

type EditorStatus = "idle" | "saving" | "saved" | "error";

type EditorState = {
    fields: EditorFields;
    status: EditorStatus;
    uploading: boolean;
    error: string | null;
};

type EditorAction =
    | { type: "SET_FIELD"; field: keyof EditorFields; value: string | boolean }
    | { type: "TOGGLE_TAG"; id: number }
    | { type: "UPLOAD_START" }
    | { type: "UPLOAD_DONE"; url: string }
    | { type: "UPLOAD_ERROR"; message: string }
    | { type: "SAVE_START" }
    | { type: "SAVE_DONE" }
    | { type: "SAVE_ERROR"; message: string };

const editorReducer = (state: EditorState, action: EditorAction): EditorState => {
    switch (action.type) {
        case "SET_FIELD":
            return {
                ...state,
                status: "idle",
                fields: { ...state.fields, [action.field]: action.value },
            };
        case "TOGGLE_TAG": {
            const has = state.fields.tag_ids.includes(action.id);
            const tag_ids = has
                ? state.fields.tag_ids.filter((id) => id !== action.id)
                : [...state.fields.tag_ids, action.id];

            return { ...state, status: "idle", fields: { ...state.fields, tag_ids } };
        }
        case "UPLOAD_START":
            return { ...state, uploading: true, error: null };
        case "UPLOAD_DONE":
            return {
                ...state,
                uploading: false,
                fields: { ...state.fields, cover_image: action.url },
            };
        case "UPLOAD_ERROR":
            return { ...state, uploading: false, error: action.message };
        case "SAVE_START":
            return { ...state, status: "saving", error: null };
        case "SAVE_DONE":
            return { ...state, status: "saved" };
        case "SAVE_ERROR":
            return { ...state, status: "error", error: action.message };
        default:
            return state;
    }
};

const toFields = (article: ArticleAdmin | null, section: ArticleSection): EditorFields => ({
    title: article?.title ?? "",
    slug: article?.slug ?? "",
    section: article?.section ?? section,
    description: article?.description ?? "",
    cover_image: article?.cover_image ?? "",
    content: article?.content ?? "",
    tag_ids: article?.tags.map((tag) => tag.id) ?? [],
    published: Boolean(article?.published_at),
    published_at: toDateTimeInput(article?.published_at),
    seo_title: article?.seo_title ?? "",
    seo_description: article?.seo_description ?? "",
    seo_keywords: article?.seo_keywords ?? "",
});

const toPayload = (fields: EditorFields): ArticlePayload => {
    let publishedAt: string | null = null;
    if (fields.published_at) {
        publishedAt = new Date(fields.published_at).toISOString();
    }

    return {
        title: fields.title.trim(),
        slug: fields.slug.trim() || null,
        section: fields.section,
        description: fields.description.trim() || null,
        cover_image: fields.cover_image.trim() || null,
        content: fields.content,
        tag_ids: fields.tag_ids,
        published: fields.published,
        published_at: publishedAt,
        seo_title: fields.seo_title.trim() || null,
        seo_description: fields.seo_description.trim() || null,
        seo_keywords: fields.seo_keywords.trim() || null,
    };
};

const errorText = (error: unknown, fallback: string) =>
    error instanceof Error ? error.message : fallback;

export const useArticleEditor = (article: ArticleAdmin | null, section: ArticleSection) => {
    const [state, dispatch] = useReducer(editorReducer, {
        fields: toFields(article, section),
        status: "idle",
        uploading: false,
        error: null,
    });

    const changeField = (field: keyof EditorFields, value: string | boolean) =>
        dispatch({ type: "SET_FIELD", field, value });

    const toggleTag = (id: number) => dispatch({ type: "TOGGLE_TAG", id });

    const uploadCover = async (file: File) => {
        dispatch({ type: "UPLOAD_START" });

        try {
            const { url } = await uploadImage(file);
            dispatch({ type: "UPLOAD_DONE", url });
        } catch (error) {
            dispatch({ type: "UPLOAD_ERROR", message: errorText(error, "Не удалось загрузить файл") });
        }
    };

    const save = async (): Promise<ArticleAdmin | null> => {
        dispatch({ type: "SAVE_START" });

        try {
            const payload = toPayload(state.fields);

            let saved: ArticleAdmin;
            if (article) {
                saved = await updateArticle(article.id, payload);
            } else {
                saved = await createArticle(payload);
            }

            dispatch({ type: "SAVE_DONE" });
            return saved;
        } catch (error) {
            dispatch({ type: "SAVE_ERROR", message: errorText(error, "Не удалось сохранить статью") });
            return null;
        }
    };

    return { state, changeField, toggleTag, uploadCover, save };
};

type ListState = {
    items: ArticleAdminCard[];
    pendingId: number | null;
    error: string | null;
};

type ListAction =
    | { type: "DELETE_START"; id: number }
    | { type: "DELETE_DONE"; id: number }
    | { type: "DELETE_ERROR"; message: string };

const listReducer = (state: ListState, action: ListAction): ListState => {
    switch (action.type) {
        case "DELETE_START":
            return { ...state, pendingId: action.id, error: null };
        case "DELETE_DONE":
            return {
                ...state,
                pendingId: null,
                items: state.items.filter((item) => item.id !== action.id),
            };
        case "DELETE_ERROR":
            return { ...state, pendingId: null, error: action.message };
        default:
            return state;
    }
};

export const useArticlesList = (initialItems: ArticleAdminCard[]) => {
    const [state, dispatch] = useReducer(listReducer, {
        items: initialItems,
        pendingId: null,
        error: null,
    });

    const remove = async (id: number) => {
        dispatch({ type: "DELETE_START", id });

        try {
            await deleteArticle(id);
            dispatch({ type: "DELETE_DONE", id });
        } catch (error) {
            dispatch({ type: "DELETE_ERROR", message: errorText(error, "Не удалось удалить статью") });
        }
    };

    return { state, remove };
};

type TagsState = {
    items: TagAdmin[];
    draft: string;
    pending: boolean;
    error: string | null;
};

type TagsAction =
    | { type: "SET_DRAFT"; value: string }
    | { type: "REQUEST_START" }
    | { type: "CREATE_DONE"; tag: TagAdmin }
    | { type: "DELETE_DONE"; id: number }
    | { type: "REQUEST_ERROR"; message: string };

const tagsReducer = (state: TagsState, action: TagsAction): TagsState => {
    switch (action.type) {
        case "SET_DRAFT":
            return { ...state, draft: action.value, error: null };
        case "REQUEST_START":
            return { ...state, pending: true, error: null };
        case "CREATE_DONE":
            return {
                ...state,
                pending: false,
                draft: "",
                items: [...state.items, action.tag].sort((a, b) => a.title.localeCompare(b.title, "ru")),
            };
        case "DELETE_DONE":
            return {
                ...state,
                pending: false,
                items: state.items.filter((tag) => tag.id !== action.id),
            };
        case "REQUEST_ERROR":
            return { ...state, pending: false, error: action.message };
        default:
            return state;
    }
};

export const useTags = (initialItems: TagAdmin[]) => {
    const [state, dispatch] = useReducer(tagsReducer, {
        items: initialItems,
        draft: "",
        pending: false,
        error: null,
    });

    const changeDraft = (value: string) => dispatch({ type: "SET_DRAFT", value });

    const add = async () => {
        const title = state.draft.trim();
        if (title.length < 2) return;

        dispatch({ type: "REQUEST_START" });

        try {
            const tag = await createTag(title);
            dispatch({ type: "CREATE_DONE", tag });
        } catch (error) {
            dispatch({ type: "REQUEST_ERROR", message: errorText(error, "Не удалось создать тег") });
        }
    };

    const remove = async (id: number) => {
        dispatch({ type: "REQUEST_START" });

        try {
            await deleteTag(id);
            dispatch({ type: "DELETE_DONE", id });
        } catch (error) {
            dispatch({ type: "REQUEST_ERROR", message: errorText(error, "Не удалось удалить тег") });
        }
    };

    return { state, changeDraft, add, remove };
};
