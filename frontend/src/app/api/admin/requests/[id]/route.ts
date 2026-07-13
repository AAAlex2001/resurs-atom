import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const DELETE = async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin-token");

    if (token?.value !== "authenticated") {
        return NextResponse.json({ message: "Не авторизован" }, { status: 401 });
    }

    const { id } = await params;

    const response = await fetch(`${process.env.BACKEND_URL}/request/delete-request/${id}`, {
        method: "DELETE",
        headers: {
            "X-API-Key": process.env.API_KEY!,
        },
    });

    if (!response.ok) {
        return NextResponse.json({ message: "Не удалось удалить заявку" }, { status: 500 });
    }

    return new NextResponse(null, { status: 204 });
};
