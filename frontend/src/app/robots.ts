import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: "/f7k2x9n3/",
            },
        ],
        sitemap: "https://atom-plus.pro/sitemap.xml",
        host: "https://atom-plus.pro",
    };
}
