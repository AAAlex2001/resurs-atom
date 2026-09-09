import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8000";

const backendFetch = (path: string, init?: RequestInit) => fetch(`${BACKEND_URL}${path}`, init);

type RouteContext = {
    params: Promise<{ path: string[] }>;
};

export const GET = async (_request: NextRequest, { params }: RouteContext) => {
    const { path } = await params;
    const target = path.map((segment) => encodeURIComponent(segment)).join("/");

    try {
        const upstream = await backendFetch(`/media/${target}`, { cache: "no-store" });

        if (!upstream.ok) {
            return new NextResponse(null, { status: upstream.status });
        }

        return new NextResponse(upstream.body, {
            status: 200,
            headers: {
                "Content-Type": upstream.headers.get("content-type") ?? "application/octet-stream",
                "Cache-Control": "public, max-age=2592000, immutable",
            },
        });
    } catch {
        return new NextResponse(null, { status: 502 });
    }
};
