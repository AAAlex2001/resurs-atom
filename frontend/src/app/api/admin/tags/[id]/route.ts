import { NextRequest, NextResponse } from "next/server";
import { parseId, proxyAdmin } from "@/shared/api/backend";

export const dynamic = "force-dynamic";

type RouteContext = {
    params: Promise<{ id: string }>;
};

export const DELETE = async (_request: NextRequest, { params }: RouteContext) => {
    const id = parseId((await params).id);

    if (id === null) {
        return NextResponse.json({ detail: "Некорректный id" }, { status: 400 });
    }

    return proxyAdmin(`/admin/tags/${id}`, { method: "DELETE" });
};
