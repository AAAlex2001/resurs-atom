import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: "https://atom-plus.pro/sitemap.xml",
        host: "https://atom-plus.pro",
    };
}
