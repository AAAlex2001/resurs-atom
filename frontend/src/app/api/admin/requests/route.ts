import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const GET = async (request: NextRequest) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin-token");

    if (token?.value !== "authenticated") {
        return NextResponse.json({ message: "Не авторизован" }, { status: 401 });
    }

    const response = await fetch(`${process.env.BACKEND_URL}/request/get-requests`, {
        headers: {
            "X-API-Key": process.env.API_KEY!,
        },
    });

    if (!response.ok) {
        return NextResponse.json({ message: "Не удалось получить запросы" }, { status: 500 });
    }

    return NextResponse.json(await response.json(), { status: 200 });
};


export const DELETE = async (request: NextRequest) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin-token");

    if (token?.value !== "authenticated") {
        return NextResponse.json({ message: "Не авторизован" }, { status: 401 });
    }

    const response = await fetch(`${process.env.BACKEND_URL}/request/delete-all-requests`, {
        method: "DELETE",
        headers: {
            "X-API-Key": process.env.API_KEY!,
        },
    });

    if (!response.ok) {
        return NextResponse.json({ message: "Не удалось удалить запросы" }, { status: 500 });
    }

    return new NextResponse(null, { status: 204 });
};