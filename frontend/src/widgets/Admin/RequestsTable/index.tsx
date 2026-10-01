"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { toTelHref } from "@/shared/lib/phone";
import style from "./style.module.scss";

const deleteRequest = async (id: number): Promise<void> => {
    const response = await fetch(`/api/admin/requests/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Не удалось удалить заявку");
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
    const [exporting, setExporting] = useState(false);
    const [exportError, setExportError] = useState("");

    const onExport = async () => {
        setExporting(true);
        setExportError("");
        try {
            const response = await fetch("/api/admin/requests/export", { cache: "no-store" });
            if (!response.ok) throw new Error("Не удалось выгрузить заявки. Попробуйте ещё раз.");
            const url = URL.createObjectURL(await response.blob());
            const link = document.createElement("a");
            link.href = url;
            link.download = "requests.docx";
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        } catch {
            setExportError("Не удалось выгрузить заявки. Попробуйте ещё раз.");
        } finally {
            setExporting(false);
        }
    };

    const onDelete = async (id: number) => {
        await deleteRequest(id);
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
                <div className={style.headerInner}>
                    <span className={style.title}>Заявки</span>
                    <span className={style.count}>{requests.length}</span>
                    <button className={style.exportButton} onClick={onExport} disabled={exporting}>
                        {exporting ? "Выгрузка…" : "Выгрузить в Word"}
                    </button>
                </div>
                {exportError && <p className={style.exportError} role="alert">{exportError}</p>}
            </div>

            <div className={style.body}>
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
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((req) => (
                                    <tr key={req.id}>
                                        <td>{req.id}</td>
                                        <td>{req.name}</td>
                                        <td>
                                            <a href={toTelHref(req.phone)}>{req.phone}</a>
                                        </td>
                                        <td>{req.email}</td>
                                        <td>{req.activity ?? "—"}</td>
                                        <td>{req.company ?? "—"}</td>
                                        <td>{req.inn ?? "—"}</td>
                                        <td className={style.message}>{req.message ?? "—"}</td>
                                        <td className={style.date}>{formatDate(req.created_at)}</td>
                                        <td>
                                            <Button
                                                text="Удалить"
                                                variant="transparent"
                                                onClick={() => onDelete(req.id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};
