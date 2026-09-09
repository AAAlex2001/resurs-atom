import { NextRequest } from "next/server";
import { proxyVisitor } from "@/shared/api/backend";

export const dynamic = "force-dynamic";

type RouteContext = {
    params: Promise<{ slug: string }>;
};

export const POST = async (request: NextRequest, { params }: RouteContext) => {
    const { slug } = await params;

    return proxyVisitor(request, `/articles/${encodeURIComponent(slug)}/view`, { method: "POST" });
};
