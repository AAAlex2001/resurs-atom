"use client";

import { useEffect, useReducer } from "react";
import type { ArticleStats } from "@/entities/article";
import { registerView, removeReaction, setReaction } from "./api";

type State = {
    stats: ArticleStats;
    pending: boolean;
    error: string | null;
};

type Action =
    | { type: "STATS_LOADED"; stats: ArticleStats }
    | { type: "REACTION_START" }
    | { type: "REACTION_ERROR"; message: string };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "STATS_LOADED":
            return { stats: action.stats, pending: false, error: null };
        case "REACTION_START":
            return { ...state, pending: true, error: null };
        case "REACTION_ERROR":
            return { ...state, pending: false, error: action.message };
        default:
            return state;
    }
};

export const useArticleStats = (slug: string, initial: ArticleStats) => {
    const [state, dispatch] = useReducer(reducer, {
        stats: initial,
        pending: false,
        error: null,
    });

    useEffect(() => {
        let cancelled = false;

        const loadStats = async () => {
            try {
                const stats = await registerView(slug);
                if (!cancelled) dispatch({ type: "STATS_LOADED", stats });
            } catch {
                return;
            }
        };

        void loadStats();

        return () => {
            cancelled = true;
        };
    }, [slug]);

    const react = async (value: 1 | -1) => {
        dispatch({ type: "REACTION_START" });

        try {
            const stats =
                state.stats.my_reaction === value
                    ? await removeReaction(slug)
                    : await setReaction(slug, value);

            dispatch({ type: "STATS_LOADED", stats });
        } catch (error) {
            dispatch({
                type: "REACTION_ERROR",
                message: error instanceof Error ? error.message : "Не удалось сохранить реакцию",
            });
        }
    };

    return { ...state, react };
};
