import type { Metadata } from "next";
import { BlogPageData, ContactData, FooterData, HeaderData } from "@/app/data";
import { getArticles, getTags } from "@/entities/article/api";
import { ArticlesSection } from "@/widgets/Blog/ArticlesSection";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { Contact } from "@/widgets/Landing/Contact";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: BlogPageData.seo.title,
    description: BlogPageData.seo.description,
    alternates: {
        canonical: "/blog",
    },
    openGraph: {
        type: "website",
        locale: "ru_RU",
        url: "https://atom-plus.pro/blog",
        siteName: "Атом-Плюс",
        title: BlogPageData.seo.title,
        description: BlogPageData.seo.description,
        images: ["/og-image.jpg"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

type SearchParams = Promise<{ tag?: string; page?: string }>;

export default async function BlogPage({ searchParams }: { searchParams: SearchParams }) {
    const { tag, page } = await searchParams;
    const pageNumber = Math.max(1, Number(page) || 1);

    const [list, tags] = await Promise.all([
        getArticles({ section: "blog", tag, page: pageNumber }),
        getTags(),
    ]);

    return (
        <>
            <Header data={HeaderData} />
            <ArticlesSection
                data={{
                    basePath: "/blog",
                    kicker: BlogPageData.kicker,
                    title: BlogPageData.title,
                    subtitle: BlogPageData.subtitle,
                    emptyText: BlogPageData.emptyText,
                    allTagsLabel: BlogPageData.allTagsLabel,
                    moreText: BlogPageData.moreText,
                    articles: list.articles,
                    total: list.total,
                    tags,
                    activeTag: tag ?? null,
                    page: pageNumber,
                }}
            />
            <Contact data={ContactData} />
            <Footer data={FooterData} />
        </>
    );
}
