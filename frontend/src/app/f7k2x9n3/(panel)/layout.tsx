import { requireAdmin } from "@/shared/api/backend";
import { AdminNav } from "@/widgets/Admin/AdminNav";
import style from "./layout.module.scss";

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
    await requireAdmin();

    return (
        <div className={style.panel}>
            <AdminNav />
            {children}
        </div>
    );
}
