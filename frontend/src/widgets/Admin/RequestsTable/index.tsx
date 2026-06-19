"use client";

import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/features/admin-auth";
import { Button } from "@/shared/ui/Button";
import style from "./style.module.scss";

const deleteAllRequests = async (): Promise<void> => {
    const response = await fetch("/api/admin/requests", { method: "DELETE" });
    if (!response.ok) throw new Error("Не удалось удалить запросы");
};

type Request = {
    id: number;
    name: string;
    phone: string;
    email: string;
    activity: string | null;
    company: string | null;
    inn: number | null;
    message: string | null;
    created_at: string;
};

type RequestsTableProps = {
    requests: Request[];
};

export const RequestsTable = ({ requests }: RequestsTableProps) => {
    const router = useRouter();
    const { handleLogout } = useAdminAuth();

    const onLogout = async () => {
        await handleLogout();
        router.push("/f7k2x9n3/login");
    };

    const onDeleteAll = async () => {
        await deleteAllRequests();
        router.refresh();
    };

    const formatDate = (iso: string) =>
        new Date(iso).toLocaleString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    return (
        <div className={style.page}>
            <div className={style.header}>
                <div className={style.headerLeft}>
                    <span className={style.title}>Заявки</span>
                    <span className={style.count}>{requests.length}</span>
                </div>
                <Button text="Выйти" variant="transparent" onClick={onLogout} />
                <Button text="Удалить все запросы" variant="transparent" onClick={onDeleteAll} />
            </div>

            <div className={style.tableWrap}>
                {requests.length === 0 ? (
                    <div className={style.empty}>Заявок пока нет</div>
                ) : (
                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Имя</th>
                                <th>Телефон</th>
                                <th>Email</th>
                                <th>Деятельность</th>
                                <th>Компания</th>
                                <th>ИНН</th>
                                <th>Сообщение</th>
                                <th>Дата</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req.id}>
                                    <td>{req.id}</td>
                                    <td>{req.name}</td>
                                    <td>{req.phone}</td>
                                    <td>{req.email}</td>
                                    <td>{req.activity ?? "—"}</td>
                                    <td>{req.company ?? "—"}</td>
                                    <td>{req.inn ?? "—"}</td>
                                    <td className={style.message}>{req.message ?? "—"}</td>
                                    <td className={style.date}>{formatDate(req.created_at)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};
