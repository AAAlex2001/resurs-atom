import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8000";

export const ADMIN_PATH = "/f7k2x9n3";

export const backendFetch = (path: string, init?: RequestInit) =>
    fetch(`${BACKEND_URL}${path}`, init);

export const adminFetch = (path: string, init: RequestInit = {}) =>
    fetch(`${BACKEND_URL}${path}`, {
        ...init,
        cache: "no-store",
        headers: {
            "X-API-Key": process.env.API_KEY ?? "",
            ...((init.headers as Record<string, string> | undefined) ?? {}),
        },
    });

export const isAdminAuthenticated = async (): Promise<boolean> => {
    const cookieStore = await cookies();
    return cookieStore.get("admin-token")?.value === "authenticated";
};

export const requireAdmin = async (): Promise<void> => {
    if (!(await isAdminAuthenticated())) {
        redirect(`${ADMIN_PATH}/login`);
    }
};

export type Loaded<T> = {
    data: T;
    error: string | null;
};

export const loadAdmin = async <T,>(path: string, fallback: T): Promise<Loaded<T>> => {
    try {
        const response = await adminFetch(path);

        if (!response.ok) {
            return { data: fallback, error: `Бэкенд ответил ${response.status}` };
        }

        const data: T = await response.json();

        return { data, error: null };
    } catch {
        return { data: fallback, error: "Бэкенд недоступен" };
    }
};

const unauthorized = () => NextResponse.json({ detail: "Не авторизован" }, { status: 401 });

export const proxyAdmin = async (path: string, init?: RequestInit) => {
    if (!(await isAdminAuthenticated())) return unauthorized();

    try {
        const response = await adminFetch(path, init);

        if (response.status === 204) {
            return new NextResponse(null, { status: 204 });
        }

        const body = await response.text();

        return new NextResponse(body, {
            status: response.status,
            headers: { "Content-Type": "application/json" },
        });
    } catch {
        return NextResponse.json({ detail: "Бэкенд недоступен" }, { status: 502 });
    }
};

export const proxyAdminJson = async (path: string, method: string, request: Request) =>
    proxyAdmin(path, {
        method,
        headers: { "Content-Type": "application/json" },
        body: await request.text(),
    });

export const proxyVisitor = async (request: Request, path: string, init: RequestInit = {}) => {
    const headers: Record<string, string> = {
        ...((init.headers as Record<string, string> | undefined) ?? {}),
    };

    const cookie = request.headers.get("cookie");
    if (cookie) headers.cookie = cookie;

    try {
        const response = await backendFetch(path, { ...init, headers, cache: "no-store" });
        const body = await response.text();

        const result = new NextResponse(body, {
            status: response.status,
            headers: { "Content-Type": "application/json" },
        });

        for (const value of response.headers.getSetCookie()) {
            result.headers.append("Set-Cookie", value);
        }

        return result;
    } catch {
        return NextResponse.json({ detail: "Бэкенд недоступен" }, { status: 502 });
    }
};

export const parseId = (value: string): number | null => {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
};
