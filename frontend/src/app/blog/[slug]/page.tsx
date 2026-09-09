import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { BlogPageData, FooterData, HeaderData } from "@/app/data";
import { NOT_FOUND_METADATA, articlePath, buildArticleMetadata } from "@/entities/article";
import { getArticle, getRelatedArticles } from "@/entities/article/api";
import { ArticleSection } from "@/widgets/Blog/ArticleSection";
import { ContactCard } from "@/widgets/Blog/ContactCard";
import { RelatedArticles } from "@/widgets/Blog/RelatedArticles";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) return NOT_FOUND_METADATA;

    return buildArticleMetadata(article);
}

export default async function BlogArticlePage({ params }: { params: Params }) {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) notFound();
    if (article.section !== "blog") permanentRedirect(articlePath(article));

    const related = await getRelatedArticles(slug, 10);

    return (
        <>
            <Header data={HeaderData} />
            <ArticleSection
                data={{
                    article,
                    reactionLabel: BlogPageData.reactionLabel,
                    tocTitle: BlogPageData.tocTitle,
                }}
            />
            {related.length > 0 && (
                <RelatedArticles data={{ title: BlogPageData.relatedTitle, articles: related }} />
            )}
            <ContactCard />
            <Footer data={FooterData} />
        </>
    );
}
