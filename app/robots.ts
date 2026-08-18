import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * Everything is open to crawlers, and deliberately so: the AI answer engines
 * that matter here (ChatGPT, Perplexity, Claude, Google AI Overviews) can only
 * cite pages their crawlers are allowed to fetch. The API route is excluded
 * because it has nothing to index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
