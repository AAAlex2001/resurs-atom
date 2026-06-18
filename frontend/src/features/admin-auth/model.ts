"use client";

import { useReducer } from "react";

type AuthState = {
    login: string;
    password: string;
    isLoading: boolean;
    error: string | null;
};

type AuthAction =
    | { type: "SET_LOGIN"; value: string }
    | { type: "SET_PASSWORD"; value: string }
    | { type: "SET_LOADING" }
    | { type: "SET_ERROR"; message: string }
    | { type: "RESET" };

const initialState: AuthState = {
    login: "",
    password: "",
    isLoading: false,
    error: null,
};

const reducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "SET_LOGIN":
            return { ...state, login: action.value, error: null };
        case "SET_PASSWORD":
            return { ...state, password: action.value, error: null };
        case "SET_LOADING":
            return { ...state, isLoading: true, error: null };
        case "SET_ERROR":
            return { ...state, isLoading: false, error: action.message };
        case "RESET":
            return initialState;
        default:
            return state;
    }
};

export const useAdminAuth = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleLogin = async (): Promise<boolean> => {
        dispatch({ type: "SET_LOADING" });
        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ login: state.login, password: state.password }),
            });
            if (!response.ok) {
                const data = await response.json();
                dispatch({ type: "SET_ERROR", message: data.message });
                return false;
            }
            return true;
        } catch {
            dispatch({ type: "SET_ERROR", message: "Ошибка подключения" });
            return false;
        }
    };

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
    };

    return { state, dispatch, handleLogin, handleLogout };
};
