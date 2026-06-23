import { RequestIn } from "./model";

export const sendRequest = async (request: RequestIn) => {
    const response = await fetch("/api/request", {
        method: "POST",
        body: JSON.stringify({
            name: request.name,
            phone: request.phone,
            email: request.email,
            activity: request.activity,
            inn: request.inn ? Number(request.inn) : null,
            company: request.company || null,
            message: request.message || null,
            personal_data_consent: request.personalDataConsent,
            privacy_policy_accepted: request.privacyPolicyAccepted,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Не удалось отправить запрос");
    }
    return response.json();
};
