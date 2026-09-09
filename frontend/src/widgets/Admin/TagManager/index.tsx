"use client";

import { useTags } from "@/features/articles-admin";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import style from "./style.module.scss";

type TagItem = {
    id: number;
    slug: string;
    title: string;
};

type TagManagerData = {
    items: TagItem[];
};

type TagManagerProps = {
    data: TagManagerData;
};

export const TagManager = ({ data }: TagManagerProps) => {
    const { state, changeDraft, add, remove } = useTags(data.items);

    return (
        <section className={style.root}>
            <span className={style.title}>Теги</span>

            <form
                className={style.form}
                onSubmit={(event) => {
                    event.preventDefault();
                    void add();
                }}
            >
                <div className={style.inputWrap}>
                    <Input
                        type="text"
                        placeholder="Новый тег, например «Лицензирование»"
                        maxLength={100}
                        value={state.draft}
                        onChange={(event) => changeDraft(event.target.value)}
                    />
                </div>
                <Button
                    text="Добавить"
                    variant="header-filled"
                    type="submit"
                    disabled={state.pending || state.draft.trim().length < 2}
                />
            </form>

            {state.error && <span className={style.error}>{state.error}</span>}

            {state.items.length === 0 ? (
                <span className={style.empty}>Тегов пока нет</span>
            ) : (
                <ul className={style.list}>
                    {state.items.map((tag) => (
                        <li key={tag.id} className={style.chip}>
                            {tag.title}
                            <button
                                type="button"
                                className={style.remove}
                                aria-label={`Удалить тег ${tag.title}`}
                                disabled={state.pending}
                                onClick={() => {
                                    if (window.confirm(`Удалить тег «${tag.title}»? Он снимется со всех статей.`)) {
                                        void remove(tag.id);
                                    }
                                }}
                            >
                                ×
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};
