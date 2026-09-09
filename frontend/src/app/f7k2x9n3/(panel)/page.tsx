import { adminFetch, requireAdmin } from "@/shared/api/backend";
import { RequestsTable } from "@/widgets/Admin/RequestsTable";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
    await requireAdmin();

    let requests = [];
    try {
        const response = await adminFetch("/request/get-requests");
        if (response.ok) requests = await response.json();
    } catch {
        requests = [];
    }

    return <RequestsTable requests={requests} />;
}
