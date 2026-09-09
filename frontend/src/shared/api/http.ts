export const readErrorMessage = async (response: Response): Promise<string> => {
    try {
        const body = await response.json();

        if (typeof body.detail === "string") return body.detail;
        if (typeof body.message === "string") return body.message;
    } catch {
        return `Ошибка ${response.status}`;
    }

    return `Ошибка ${response.status}`;
};

export const requestJson = async <T>(url: string, init?: RequestInit): Promise<T> => {
    const response = await fetch(url, init);

    if (!response.ok) {
        throw new Error(await readErrorMessage(response));
    }

    const data: T = await response.json();

    return data;
};

export const requestEmpty = async (url: string, init?: RequestInit): Promise<void> => {
    const response = await fetch(url, init);

    if (!response.ok) {
        throw new Error(await readErrorMessage(response));
    }
};

export const jsonBody = (method: string, payload: unknown): RequestInit => ({
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
});
