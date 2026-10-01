import { NextResponse } from "next/server";
import { adminFetch, isAdminAuthenticated } from "@/shared/api/backend";

export async function GET() {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ message: "Не авторизован" }, { status: 401 });
    }
    try {
        const response = await adminFetch("/request/export");
        if (!response.ok) {
            return NextResponse.json({ message: "Не удалось выгрузить заявки" }, { status: 502 });
        }
        return new NextResponse(await response.arrayBuffer(), {
            headers: {
                "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "Content-Disposition": 'attachment; filename="requests.docx"',
                "Cache-Control": "no-store",
            },
        });
    } catch {
        return NextResponse.json({ message: "Бэкенд недоступен" }, { status: 502 });
    }
}
