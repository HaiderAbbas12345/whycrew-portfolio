import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/blog";
import { SERVICES, SITE } from "@/lib/site";

/**
 * Hand-maintained last-modified dates, one per static route.
 *
 * These used to be `new Date()` — the build timestamp — which meant every
 * deploy told Google that all nine static pages had just changed, whether or
 * not a word of their content moved. Google's documented response to a lastmod
 * it judges unreliable is to ignore the field entirely, so the churn bought
 * nothing and cost the signal. Blog posts are exempt: they carry real
 * dateModified/datePublished values in lib/blog.ts and are read from there.
 *
 * Dates are the last commit that changed what the page actually renders, not
 * the last commit that touched its file. A footer or analytics edit reaches
 * every page in the build but changes nothing a reader or crawler cares about,
 * so it must NOT bump these — that is precisely the unreliability Google
 * penalises. Bump a date by hand when the page's own copy changes.
 *
 * A route with no entry here ships without a lastmod, which is correct:
 * omitting the field says "unknown", while inventing one says something false.
 */
const LAST_MODIFIED: Record<string, string> = {
  "/": "2026-08-25",
  "/services": "2026-08-25",
  "/services/custom-siem-soar-development": "2026-08-20",
  "/services/ai-powered-soc-automation": "2026-08-20",
  "/services/mssp-engineering-partner": "2026-08-20",
  "/services/nis2-dora-compliance-automation": "2026-08-20",
  "/resources": "2026-08-27",
  "/contact": "2026-08-27",
  "/careers": "2026-08-25",
  "/support": "2026-08-25",
};

const lastModified = (path: string): Date | undefined => {
  const date = LAST_MODIFIED[path];
  return date ? new Date(`${date}T00:00:00.000Z`) : undefined;
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: lastModified("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE.url}/services`,
      lastModified: lastModified("/services"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...SERVICES.map((s) => ({
      url: `${SITE.url}${s.href}`,
      lastModified: lastModified(s.href),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${SITE.url}/resources`,
      lastModified: lastModified("/resources"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...POSTS.map((p) => ({
      url: `${SITE.url}/blog/${p.slug}`,
      lastModified: new Date(p.dateModified ?? p.datePublished),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${SITE.url}/contact`,
      lastModified: lastModified("/contact"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/careers`,
      lastModified: lastModified("/careers"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE.url}/support`,
      lastModified: lastModified("/support"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
