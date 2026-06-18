import { RequestIn } from "./model";


export const sendRequest = async (request: RequestIn) => {
    const response = await fetch("/request/send-request", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (!response.ok) {
        throw new Error("Не удалось отправить запрос");
    }
    return response.json();
}

export const getRequests = async () => {
    const response = await fetch("/request/get-requests", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (!response.ok) {
        throw new Error("Не удалось получить запросы");
    }
    return response.json();
}