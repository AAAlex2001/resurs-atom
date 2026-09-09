import type { ArticleSection, TagAdmin } from "@/entities/article";
import { loadAdmin, requireAdmin } from "@/shared/api/backend";
import { ArticleEditor } from "@/widgets/Admin/ArticleEditor";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ section?: string }>;

export default async function NewArticlePage({ searchParams }: { searchParams: SearchParams }) {
    await requireAdmin();

    const { section } = await searchParams;
    const tags = await loadAdmin<TagAdmin[]>("/admin/tags", []);

    let initialSection: ArticleSection = "blog";
    if (section === "news") initialSection = "news";

    return (
        <ArticleEditor
            data={{
                article: null,
                tags: tags.data,
                section: initialSection,
                error: tags.error,
            }}
        />
    );
}
