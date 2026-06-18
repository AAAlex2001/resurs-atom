import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (request: NextRequest) => {
    const cookieStore = await cookies();
    cookieStore.delete("admin-token");
    return NextResponse.json({ message: "Успешно выполнен" }, { status: 200 });
}