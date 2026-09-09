import { NextRequest } from "next/server";
import { proxyAdmin, proxyAdminJson } from "@/shared/api/backend";

export const dynamic = "force-dynamic";

export const GET = async () => proxyAdmin("/admin/tags");

export const POST = async (request: NextRequest) => proxyAdminJson("/admin/tags", "POST", request);
