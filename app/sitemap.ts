import type { MetadataRoute } from "next";
import { POSTS, postPath } from "@/lib/blog";
import { CASE_STUDIES } from "@/lib/case-studies";
import { LEGAL_PAGES } from "@/lib/legal";
import { SERVICES, SITE } from "@/lib/site";

const BASE_URL = SITE.url.replace(/\/+$/, "");

/**
 * When each static page's content last changed. lastmod used to be the build
 * time, so it moved on every deploy whether anything changed or not, and
 * Google learns to ignore dates that do that. Bump a page's date here when
 * you change what it says (not when you restyle it).
 */
const PAGE_UPDATED = {
  "/": "2026-10-05",
  "/about": "2026-09-08",
  "/services": "2026-10-05",
  "/contact": "2026-08-27",
  "/careers": "2026-08-25",
  "/support": "2026-08-25",
} as const;

/** Per service, keyed by href. */
const SERVICE_UPDATED: Record<string, string> = {
  "/services/custom-siem-development": "2026-10-23",
  "/services/custom-soar-development": "2026-10-06",
  "/services/ai-powered-soc-automation": "2026-10-23",
  "/services/mssp-engineering-partner": "2026-10-23",
  "/services/nis2-dora-compliance-automation": "2026-10-05",
  "/services/nca-ecc-sama-csf-compliance": "2026-10-05",
};

/** Fallback for an entry with no date: the newest static page date. */
const FALLBACK = "2026-10-23";

function safeDate(value: unknown): Date {
  const d = new Date((value as string) || FALLBACK);
  return isNaN(d.getTime()) ? new Date(FALLBACK) : d;
}

/** The latest of several dates — an index page changes when its newest item does. */
function newest(dates: (string | undefined)[]): Date {
  return new Date(
    Math.max(...dates.map((d) => safeDate(d).getTime()))
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const postDates = POSTS.map((p) => p.dateModified ?? p.datePublished);
  const caseDates = CASE_STUDIES.map((c) => c.dateModified ?? c.datePublished);

  return [
    {
      url: BASE_URL,
      lastModified: safeDate(PAGE_UPDATED["/"]),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: safeDate(PAGE_UPDATED["/about"]),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: safeDate(PAGE_UPDATED["/services"]),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...SERVICES.filter((s) => Boolean(s.href)).map((s) => ({
      url: `${BASE_URL}${s.href}`,
      lastModified: safeDate(SERVICE_UPDATED[s.href]),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${BASE_URL}/resources`,
      lastModified: newest([...postDates, ...caseDates]),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: newest(postDates),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...POSTS.filter((p) => Boolean(p.slug)).map((p) => ({
      url: `${BASE_URL}${postPath(p)}`,
      lastModified: safeDate(p.dateModified ?? p.datePublished),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${BASE_URL}/case-studies`,
      lastModified: newest(caseDates),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...CASE_STUDIES.filter((c) => Boolean(c.slug)).map((c) => ({
      url: `${BASE_URL}/case-studies/${c.slug}`,
      lastModified: safeDate(c.dateModified ?? c.datePublished),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    {
      url: `${BASE_URL}/contact`,
      lastModified: safeDate(PAGE_UPDATED["/contact"]),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/careers`,
      lastModified: safeDate(PAGE_UPDATED["/careers"]),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/support`,
      lastModified: safeDate(PAGE_UPDATED["/support"]),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    // Policy pages. Low priority and rarely changed, but they must be
    // crawlable: a consent banner that cites a Cookie Policy Google has never
    // seen is a policy the visitor cannot verify either.
    ...LEGAL_PAGES.map((l) => ({
      url: `${BASE_URL}/${l.slug}`,
      lastModified: safeDate(l.lastUpdated),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
