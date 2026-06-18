import { RequestIn } from "@/entities/request";
import { Activity } from "@/entities/request";
import { useReducer } from "react";
import { sendRequest } from "@/entities/request/api";


type FormState ={
    fields: RequestIn;
    errors: {
        name?: string;
        phone?: string;
        email?: string;
        activity?: string;
        company?: string;
        message?: string;
    };
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string | null;
}

type FormAction = 
    | { type: "SET_FIELD"; field: keyof RequestIn; value: string }
    | { type: "SET_ERROR"; field: keyof RequestIn; error: string }
    | { type: "SET_LOADING" }
    | { type: "SET_SUCCESS" }
    | { type: "SET_ERROR_MESSAGE"; message: string }
    | { type: "RESET" }


const initialState: FormState ={
    fields: {
        name: "",
        phone: "",
        email: "",
        activity: Activity.Engineering,
        company: "",
        message: "",
    },
    errors: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: null,
}

const reducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, fields: { ...state.fields, [action.field]: action.value } };
        case "SET_ERROR":
            return { ...state, errors: { ...state.errors, [action.field]: action.error } };
        case "SET_LOADING":
            return { ...state, isLoading: true };
        case "SET_SUCCESS":
            return { ...state, isSuccess: true, isLoading: false };
        case "SET_ERROR_MESSAGE":
            return { ...state, isError: true, isLoading: false, errorMessage: action.message };
        case "RESET":
            return initialState;
        default:
            return state;
    }
}

export const useSendRequest = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleChange = (field: keyof RequestIn, value: string) => {
        dispatch({ type: "SET_FIELD", field, value });
    }

    const handleSubmit = async () => {
        dispatch({ type: "SET_LOADING" });
        try {
            await sendRequest(state.fields);
            dispatch({ type: "SET_SUCCESS", });
            dispatch({ type: "SET_LOADING" });
        } catch (error) {
            dispatch({ type: "SET_ERROR_MESSAGE", message: error instanceof Error ? error.message : "Неизвестная ошибка" });
        }
    }

    const reset = () => {
        dispatch({ type: "RESET" });
    }

    return {
        state,
        handleChange,
        handleSubmit,
        reset,
    }
}

