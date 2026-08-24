import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The admin panel and the contact endpoint have no business being crawled.
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
