import { notFound } from "next/navigation";
import type { ArticleAdmin, TagAdmin } from "@/entities/article";
import { loadAdmin, parseId, requireAdmin } from "@/shared/api/backend";
import { ArticleEditor } from "@/widgets/Admin/ArticleEditor";

export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;

export default async function EditArticlePage({ params }: { params: Params }) {
    await requireAdmin();

    const { id } = await params;
    const articleId = parseId(id);

    if (articleId === null) notFound();

    const [article, tags] = await Promise.all([
        loadAdmin<ArticleAdmin | null>(`/admin/articles/${articleId}`, null),
        loadAdmin<TagAdmin[]>("/admin/tags", []),
    ]);

    if (article.error === "Бэкенд ответил 404") notFound();

    return (
        <ArticleEditor
            data={{
                article: article.data,
                tags: tags.data,
                section: article.data?.section ?? "blog",
                error: article.error ?? tags.error,
            }}
        />
    );
}
