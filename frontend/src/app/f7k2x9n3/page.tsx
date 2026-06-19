import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { RequestsTable } from "@/widgets/Admin/RequestsTable";

export default async function AdminPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin-token");

    if (token?.value !== "authenticated") {
        redirect("/");
    }

    const response = await fetch(`${process.env.BACKEND_URL}/request/get-requests`, {
        headers: { "X-API-Key": process.env.API_KEY! },
        cache: "no-store",
    });

    const requests = response.ok ? await response.json() : [];

    return <RequestsTable requests={requests} />;
}
