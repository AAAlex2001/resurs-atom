import { NextRequest } from "next/server";
import { proxyVisitor } from "@/shared/api/backend";

export const dynamic = "force-dynamic";

type RouteContext = {
    params: Promise<{ slug: string }>;
};

export const PUT = async (request: NextRequest, { params }: RouteContext) => {
    const { slug } = await params;

    return proxyVisitor(request, `/articles/${encodeURIComponent(slug)}/reaction`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: await request.text(),
    });
};

export const DELETE = async (request: NextRequest, { params }: RouteContext) => {
    const { slug } = await params;

    return proxyVisitor(request, `/articles/${encodeURIComponent(slug)}/reaction`, { method: "DELETE" });
};
