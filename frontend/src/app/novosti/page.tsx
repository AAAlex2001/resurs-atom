import type { Metadata } from "next";
import { FooterData, HeaderData, NewsPageData } from "@/app/data";
import { getArticles, getTags } from "@/entities/article/api";
import { ArticlesSection } from "@/widgets/Blog/ArticlesSection";
import { ContactCard } from "@/widgets/Blog/ContactCard";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: NewsPageData.seo.title,
    description: NewsPageData.seo.description,
    alternates: {
        canonical: "/novosti",
    },
    openGraph: {
        type: "website",
        locale: "ru_RU",
        url: "https://atom-plus.pro/novosti",
        siteName: "Атом-Плюс",
        title: NewsPageData.seo.title,
        description: NewsPageData.seo.description,
        images: ["/og-image.jpg"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

type SearchParams = Promise<{ tag?: string; page?: string }>;

export default async function NewsPage({ searchParams }: { searchParams: SearchParams }) {
    const { tag, page } = await searchParams;
    const pageNumber = Math.max(1, Number(page) || 1);

    const [list, tags] = await Promise.all([
        getArticles({ section: "news", tag, page: pageNumber }),
        getTags("news"),
    ]);

    return (
        <>
            <Header data={HeaderData} />
            <ArticlesSection
                data={{
                    basePath: "/novosti",
                    title: NewsPageData.title,
                    subtitle: NewsPageData.subtitle,
                    emptyText: NewsPageData.emptyText,
                    allTagsLabel: NewsPageData.allTagsLabel,
                    moreText: NewsPageData.moreText,
                    articles: list.articles,
                    total: list.total,
                    tags,
                    activeTag: tag ?? null,
                    page: pageNumber,
                }}
            />
            <ContactCard />
            <Footer data={FooterData} />
        </>
    );
}
