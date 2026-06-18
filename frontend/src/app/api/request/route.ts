import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const response = await fetch(`${process.env.BACKEND_URL}/request/send-request`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
        return NextResponse.json({ message: "Не удалось отправить запрос" }, { status: 500 });
    }
    return NextResponse.json(await response.json(), { status: 201 });
}
