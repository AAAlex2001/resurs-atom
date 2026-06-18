"use client";

import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/features/admin-auth";
import style from "./style.module.scss";

export default function AdminLoginPage() {
    const router = useRouter();
    const { state, dispatch, handleLogin } = useAdminAuth();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const ok = await handleLogin();
        if (ok) router.push("/f7k2x9n3");
    };

    return (
        <div className={style.page}>
            <div className={style.card}>
                <div className={style.head}>
                    <span className={style.title}>Панель управления</span>
                    <span className={style.subtitle}>Атом-Плюс</span>
                </div>
                <form className={style.form} onSubmit={onSubmit}>
                    <div className={style.field}>
                        <label className={style.label}>Логин</label>
                        <input
                            className={style.input}
                            type="text"
                            placeholder="Введите логин"
                            value={state.login}
                            onChange={(e) => dispatch({ type: "SET_LOGIN", value: e.target.value })}
                            autoComplete="username"
                        />
                    </div>
                    <div className={style.field}>
                        <label className={style.label}>Пароль</label>
                        <input
                            className={style.input}
                            type="password"
                            placeholder="Введите пароль"
                            value={state.password}
                            onChange={(e) => dispatch({ type: "SET_PASSWORD", value: e.target.value })}
                            autoComplete="current-password"
                        />
                    </div>
                    {state.error && <span className={style.error}>{state.error}</span>}
                    <button className={style.button} type="submit" disabled={state.isLoading}>
                        {state.isLoading ? "Вход..." : "Войти"}
                    </button>
                </form>
            </div>
        </div>
    );
}
