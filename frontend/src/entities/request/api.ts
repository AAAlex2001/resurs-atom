import { RequestIn } from "./model";

export const sendRequest = async (request: RequestIn) => {
    const response = await fetch("/api/request", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Не удалось отправить запрос");
    }
    return response.json();
};
