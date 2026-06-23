import { Activity, RequestIn } from "@/entities/request";
import { sendRequest } from "@/entities/request/api";
import { useReducer } from "react";

type ConsentField = "personalDataConsent" | "privacyPolicyAccepted";

type FormState = {
    fields: RequestIn;
    errors: {
        name?: string;
        phone?: string;
        email?: string;
        activity?: string;
        company?: string;
        inn?: string;
        message?: string;
        personalDataConsent?: string;
        privacyPolicyAccepted?: string;
    };
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string | null;
};

type FormAction =
    | { type: "SET_FIELD"; field: keyof RequestIn; value: string }
    | { type: "SET_CONSENT"; field: ConsentField; value: boolean }
    | { type: "SET_ERROR"; field: keyof FormState["errors"]; error: string }
    | { type: "SET_LOADING" }
    | { type: "SET_SUCCESS" }
    | { type: "SET_ERROR_MESSAGE"; message: string }
    | { type: "RESET" };

const initialState: FormState = {
    fields: {
        name: "",
        phone: "",
        email: "",
        activity: Activity.Engineering,
        company: "",
        inn: "",
        message: "",
        personalDataConsent: false,
        privacyPolicyAccepted: false,
    },
    errors: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: null,
};

const reducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
        case "SET_FIELD":
            return {
                ...state,
                fields: { ...state.fields, [action.field]: action.value },
                errors: { ...state.errors, [action.field]: undefined },
            };
        case "SET_CONSENT":
            return {
                ...state,
                fields: { ...state.fields, [action.field]: action.value },
                errors: { ...state.errors, [action.field]: undefined },
            };
        case "SET_ERROR":
            return { ...state, errors: { ...state.errors, [action.field]: action.error } };
        case "SET_LOADING":
            return { ...state, isLoading: true, isError: false, errorMessage: null };
        case "SET_SUCCESS":
            return { ...state, isSuccess: true, isLoading: false };
        case "SET_ERROR_MESSAGE":
            return { ...state, isError: true, isLoading: false, errorMessage: action.message };
        case "RESET":
            return initialState;
        default:
            return state;
    }
};

const validate = (fields: RequestIn): FormState["errors"] => {
    const errors: FormState["errors"] = {};
    if (!fields.name.trim()) errors.name = "Введите имя";
    if (fields.phone.replace(/\D/g, "").length < 10) errors.phone = "Введите корректный телефон";
    if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
        errors.email = "Введите корректный email";
    }
    if (!fields.personalDataConsent) {
        errors.personalDataConsent = "Необходимо дать согласие на обработку персональных данных";
    }
    if (!fields.privacyPolicyAccepted) {
        errors.privacyPolicyAccepted = "Необходимо принять политику обработки персональных данных";
    }
    return errors;
};

export const useSendRequest = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleChange = (field: keyof RequestIn, value: string) => {
        dispatch({ type: "SET_FIELD", field, value });
    };

    const handleConsentChange = (field: ConsentField, value: boolean) => {
        dispatch({ type: "SET_CONSENT", field, value });
    };

    const handleSubmit = async () => {
        const errors = validate(state.fields);
        if (Object.keys(errors).length > 0) {
            Object.entries(errors).forEach(([field, error]) => {
                dispatch({ type: "SET_ERROR", field: field as keyof FormState["errors"], error: error! });
            });
            return;
        }
        dispatch({ type: "SET_LOADING" });
        try {
            await sendRequest(state.fields);
            dispatch({ type: "SET_SUCCESS" });
        } catch (error) {
            dispatch({
                type: "SET_ERROR_MESSAGE",
                message: error instanceof Error ? error.message : "Неизвестная ошибка",
            });
        }
    };

    const reset = () => {
        dispatch({ type: "RESET" });
    };

    return { state, handleChange, handleConsentChange, handleSubmit, reset };
};
