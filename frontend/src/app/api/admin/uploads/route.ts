import { NextRequest } from "next/server";
import { proxyAdmin } from "@/shared/api/backend";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
    const form = await request.formData();

    return proxyAdmin("/admin/uploads", { method: "POST", body: form });
};
