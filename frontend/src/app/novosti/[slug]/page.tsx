import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ActivitiesData, ContactData, FooterData, HeaderData, NewsPageData } from "@/app/data";
import { NOT_FOUND_METADATA, articlePath, buildArticleMetadata } from "@/entities/article";
import { getArticle, getRelatedArticles } from "@/entities/article/api";
import { ArticleSection } from "@/widgets/Blog/ArticleSection";
import { RelatedArticles } from "@/widgets/Blog/RelatedArticles";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { Activities } from "@/widgets/Landing/Activities";
import { Contact } from "@/widgets/Landing/Contact";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) return NOT_FOUND_METADATA;

    return buildArticleMetadata(article);
}

export default async function NewsArticlePage({ params }: { params: Params }) {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) notFound();
    if (article.section !== "news") permanentRedirect(articlePath(article));

    const related = await getRelatedArticles(slug, 10);

    return (
        <>
            <Header data={HeaderData} />
            <ArticleSection
                data={{
                    article,
                    reactionLabel: NewsPageData.reactionLabel,
                    tocTitle: NewsPageData.tocTitle,
                }}
                middle={<Activities data={ActivitiesData} />}
            />
            <Contact data={ContactData} />
            {related.length > 0 && (
                <RelatedArticles data={{ title: NewsPageData.relatedTitle, articles: related }} />
            )}
            <Footer data={FooterData} />
        </>
    );
}
