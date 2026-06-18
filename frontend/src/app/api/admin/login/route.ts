import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST= async (request: NextRequest) => {
    const { login, password } = await request.json();
    if (login !== process.env.ADMIN_LOGIN || password !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json ({ message: "Неверный логин или пароль" }, { status: 401 });
    }

    const cookieStore = await cookies();
    cookieStore.set("admin-token", "authenticated", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
    });

    return NextResponse.json({ message: "Успешно авторизован" }, { status: 200 });
};