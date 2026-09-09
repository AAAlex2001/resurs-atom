import { NextRequest } from "next/server";
import { proxyAdmin, proxyAdminJson } from "@/shared/api/backend";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
    const section = request.nextUrl.searchParams.get("section");
    const path = section ? `/admin/articles?section=${encodeURIComponent(section)}` : "/admin/articles";

    return proxyAdmin(path);
};

export const POST = async (request: NextRequest) => proxyAdminJson("/admin/articles", "POST", request);
