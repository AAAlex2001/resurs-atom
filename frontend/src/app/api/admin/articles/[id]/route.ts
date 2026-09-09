import { NextRequest, NextResponse } from "next/server";
import { parseId, proxyAdmin, proxyAdminJson } from "@/shared/api/backend";

export const dynamic = "force-dynamic";

type RouteContext = {
    params: Promise<{ id: string }>;
};

const badId = () => NextResponse.json({ detail: "Некорректный id" }, { status: 400 });

export const GET = async (_request: NextRequest, { params }: RouteContext) => {
    const id = parseId((await params).id);
    if (id === null) return badId();

    return proxyAdmin(`/admin/articles/${id}`);
};

export const PATCH = async (request: NextRequest, { params }: RouteContext) => {
    const id = parseId((await params).id);
    if (id === null) return badId();

    return proxyAdminJson(`/admin/articles/${id}`, "PATCH", request);
};

export const DELETE = async (_request: NextRequest, { params }: RouteContext) => {
    const id = parseId((await params).id);
    if (id === null) return badId();

    return proxyAdmin(`/admin/articles/${id}`, { method: "DELETE" });
};
