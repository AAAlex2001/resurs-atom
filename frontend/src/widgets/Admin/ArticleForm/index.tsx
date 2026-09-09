"use client";

import { useRouter } from "next/navigation";
import { useArticleEditor } from "@/features/articles-admin";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import style from "./style.module.scss";

type TagItem = {
    id: number;
    slug: string;
    title: string;
};

type ArticleData = {
    id: number;
    slug: string;
    section: "blog" | "news";
    title: string;
    description: string | null;
    cover_image: string | null;
    content: string;
    toc: { id: string; title: string }[];
    published_at: string | null;
    created_at: string;
    updated_at: string;
    views_count: number;
    likes_count: number;
    dislikes_count: number;
    seo_title: string | null;
    seo_description: string | null;
    seo_keywords: string | null;
    tags: TagItem[];
};

type ArticleFormData = {
    article: ArticleData | null;
    tags: TagItem[];
    section: "blog" | "news";
};

type ArticleFormProps = {
    data: ArticleFormData;
};

const SECTIONS = [
    { key: "blog", label: "Блог", path: "/blog" },
    { key: "news", label: "Новости", path: "/novosti" },
] as const;

export const ArticleForm = ({ data }: ArticleFormProps) => {
    const router = useRouter();
    const { state, changeField, toggleTag, uploadCover, save } = useArticleEditor(data.article, data.section);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const saved = await save();

        if (saved && !data.article) {
            router.push(`/f7k2x9n3/articles/${saved.id}`);
        }
    };

    const publicPath = SECTIONS.find((item) => item.key === data.article?.section)?.path;

    return (
        <form className={style.form} onSubmit={(event) => void handleSubmit(event)}>
            <div className={style.columns}>
                <div className={style.main}>
                    <label className={style.field}>
                        <span className={style.label}>Заголовок *</span>
                        <Input
                            type="text"
                            required
                            maxLength={255}
                            value={state.fields.title}
                            onChange={(event) => changeField("title", event.target.value)}
                        />
                    </label>

                    <label className={style.field}>
                        <span className={style.label}>Slug (адрес страницы)</span>
                        <Input
                            type="text"
                            placeholder="Оставьте пустым — соберётся из заголовка"
                            maxLength={255}
                            value={state.fields.slug}
                            onChange={(event) => changeField("slug", event.target.value.toLowerCase())}
                        />
                    </label>

                    <label className={style.field}>
                        <span className={style.label}>Краткое описание</span>
                        <textarea
                            className={style.textarea}
                            rows={3}
                            maxLength={400}
                            placeholder="Текст для карточки и сниппета в поиске, до 400 символов"
                            value={state.fields.description}
                            onChange={(event) => changeField("description", event.target.value)}
                        />
                    </label>

                    <label className={style.field}>
                        <span className={style.label}>Текст статьи (HTML) *</span>
                        <textarea
                            className={`${style.textarea} ${style.code}`}
                            rows={24}
                            required
                            placeholder="<h2>Заголовок раздела</h2>&#10;<p>Абзац текста…</p>"
                            value={state.fields.content}
                            onChange={(event) => changeField("content", event.target.value)}
                        />
                        <span className={style.hint}>
                            Оглавление собирается из тегов &lt;h2&gt;. Скрипты, стили и лишние атрибуты вырезаются
                            при сохранении.
                        </span>
                    </label>
                </div>

                <aside className={style.side}>
                    <div className={style.panel}>
                        <span className={style.label}>Раздел</span>
                        <div className={style.chips}>
                            {SECTIONS.map((item) => (
                                <label
                                    key={item.key}
                                    className={`${style.chip} ${state.fields.section === item.key ? style.chipActive : ""}`}
                                >
                                    <input
                                        type="radio"
                                        name="section"
                                        checked={state.fields.section === item.key}
                                        onChange={() => changeField("section", item.key)}
                                    />
                                    {item.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className={style.panel}>
                        <span className={style.label}>Обложка</span>

                        <div className={style.cover}>
                            {state.fields.cover_image ? (
                                <img src={state.fields.cover_image} alt="" className={style.coverImage} />
                            ) : (
                                <span className={style.coverEmpty}>Нет изображения</span>
                            )}
                        </div>

                        <label className={style.upload}>
                            {state.uploading ? "Загружаем…" : "Загрузить файл"}
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                disabled={state.uploading}
                                onChange={(event) => {
                                    const file = event.target.files?.[0];
                                    if (file) void uploadCover(file);
                                    event.target.value = "";
                                }}
                            />
                        </label>

                        <label className={style.field}>
                            <span className={style.label}>Или путь к картинке</span>
                            <Input
                                type="text"
                                placeholder="/media/articles/…"
                                maxLength={500}
                                value={state.fields.cover_image}
                                onChange={(event) => changeField("cover_image", event.target.value)}
                            />
                        </label>
                    </div>

                    <div className={style.panel}>
                        <span className={style.label}>Теги</span>

                        {data.tags.length === 0 ? (
                            <span className={style.hint}>Тегов ещё нет — добавьте их в списке статей.</span>
                        ) : (
                            <div className={style.chips}>
                                {data.tags.map((tag) => {
                                    const checked = state.fields.tag_ids.includes(tag.id);

                                    return (
                                        <label
                                            key={tag.id}
                                            className={`${style.chip} ${checked ? style.chipActive : ""}`}
                                        >
                                            <input type="checkbox" checked={checked} onChange={() => toggleTag(tag.id)} />
                                            {tag.title}
                                        </label>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className={style.panel}>
                        <span className={style.label}>SEO</span>

                        <label className={style.field}>
                            <span className={style.sublabel}>Title для поисковика</span>
                            <Input
                                type="text"
                                placeholder="Пусто — берётся заголовок статьи"
                                maxLength={255}
                                value={state.fields.seo_title}
                                onChange={(event) => changeField("seo_title", event.target.value)}
                            />
                        </label>

                        <label className={style.field}>
                            <span className={style.sublabel}>Meta description</span>
                            <textarea
                                className={style.textarea}
                                rows={3}
                                maxLength={300}
                                placeholder="Пусто — берётся краткое описание. Оптимально 120–160 символов"
                                value={state.fields.seo_description}
                                onChange={(event) => changeField("seo_description", event.target.value)}
                            />
                        </label>

                        <label className={style.field}>
                            <span className={style.sublabel}>Ключевые слова</span>
                            <Input
                                type="text"
                                placeholder="через запятую"
                                maxLength={500}
                                value={state.fields.seo_keywords}
                                onChange={(event) => changeField("seo_keywords", event.target.value)}
                            />
                        </label>
                    </div>

                    <div className={style.panel}>
                        <label className={style.checkbox}>
                            <input
                                type="checkbox"
                                checked={state.fields.published}
                                onChange={(event) => changeField("published", event.target.checked)}
                            />
                            Опубликована на сайте
                        </label>

                        <label className={style.field}>
                            <span className={style.sublabel}>Дата публикации</span>
                            <Input
                                type="datetime-local"
                                value={state.fields.published_at}
                                onChange={(event) => changeField("published_at", event.target.value)}
                            />
                        </label>
                        <span className={style.hint}>
                            Пусто — публикуется сейчас. Дата в будущем — статья выйдет сама в этот момент.
                        </span>

                        {data.article?.published_at && publicPath && (
                            <a
                                href={`${publicPath}/${data.article.slug}`}
                                target="_blank"
                                rel="noopener"
                                className={style.link}
                            >
                                Открыть на сайте ↗
                            </a>
                        )}
                    </div>
                </aside>
            </div>

            {state.error && <div className={style.error}>{state.error}</div>}

            <div className={style.actions}>
                <div className={style.submit}>
                    <Button
                        text={state.status === "saving" ? "Сохраняем…" : data.article ? "Сохранить" : "Создать статью"}
                        variant="header-filled"
                        type="submit"
                        disabled={state.status === "saving" || state.uploading}
                    />
                </div>

                {state.status === "saved" && <span className={style.saved}>Сохранено</span>}

                <a href="/f7k2x9n3/articles" className={style.back}>
                    К списку статей
                </a>
            </div>
        </form>
    );
};
