import type { ArticleAdminCard, ArticleSection, TagAdmin } from "@/entities/article";
import { loadAdmin, requireAdmin } from "@/shared/api/backend";
import { ArticlesPanel } from "@/widgets/Admin/ArticlesPanel";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ section?: string }>;

export default async function AdminArticlesPage({ searchParams }: { searchParams: SearchParams }) {
    await requireAdmin();

    const { section } = await searchParams;

    let activeSection: ArticleSection | null = null;
    if (section === "blog" || section === "news") activeSection = section;

    let listPath = "/admin/articles";
    if (activeSection) listPath = `${listPath}?section=${activeSection}`;

    const [articles, tags] = await Promise.all([
        loadAdmin<ArticleAdminCard[]>(listPath, []),
        loadAdmin<TagAdmin[]>("/admin/tags", []),
    ]);

    return (
        <ArticlesPanel
            data={{
                articles: articles.data,
                tags: tags.data,
                section: activeSection,
                error: articles.error ?? tags.error,
            }}
        />
    );
}
