import { NextRequest, NextResponse } from "next/server";
import { sendRequest } from "@/entities/request/api";

export async function POST(request: NextRequest) {
    const { name, phone, email, activity, company, message } = await request.json();
    try {
        await sendRequest({ name, phone, email, activity, company, message });
        return NextResponse.json({ message: "Запрос успешно отправлен" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Не удалось отправить запрос" }, { status: 500 });
    }
}