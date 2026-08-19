/**
 * Blog registry.
 *
 * Posts live at /blog/<slug> as their own route folder under app/blog/, and
 * register their metadata here so the Resources hub, the sitemap, and the
 * article JSON-LD all read from one place.
 *
 * To publish a post:
 *   1. add an entry to POSTS below
 *   2. create app/blog/<slug>/page.tsx using <ArticleShell>
 *   3. add a matching { type: "Blog", status: "live" } entry in lib/resources.ts
 */

export interface BlogPost {
  slug: string;
  /** <h1> on the page. */
  title: string;
  /** Exact <title> from the content doc. */
  metaTitle: string;
  /** Exact meta description from the content doc. */
  metaDescription: string;
  /** Card summary on the Resources hub. */
  summary: string;
  /** ISO date. */
  datePublished: string;
  dateModified?: string;
  readTime: string;
  topics: string[];
  /** Content cluster this belongs to, used for related-post grouping. */
  cluster: string;
}

export const POSTS: BlogPost[] = [
  {
    slug: "siem-cost-licensing-vs-custom-built",
    title: "How Much Does a SIEM Cost? Licensing vs. Custom-Built",
    metaTitle: "SIEM Cost: Licensed vs. Custom-Built Compared",
    metaDescription:
      "Licensed SIEMs cost €50K–€500K+ per year. Custom-built SIEMs cut long-term spend but require upfront investment. Find out which model fits your environment.",
    summary:
      "Licensed SIEMs charge on ingestion, retention, and feature tiers. Custom-built platforms trade that for upfront engineering. Where the break-even actually falls, and which model fits which environment.",
    datePublished: "2026-08-18",
    dateModified: "2026-08-19",
    readTime: "9 min read",
    topics: ["SIEM & SOAR", "Platform Ownership"],
    cluster: "Custom SIEM & SOAR Development",
  },
];

export const postBySlug = (slug: string) => POSTS.find((p) => p.slug === slug);

/* ---------------------------------------------------------------------------
 * Internal link registry
 *
 * The content docs reference sibling articles across the cluster, several of
 * which aren't written yet. Resolving them through this map means an
 * unpublished target renders as plain text instead of a link to a 404 — which
 * would leak crawl budget and hand Google a broken internal link.
 *
 * Publishing a target is one line: add its path here.
 * ------------------------------------------------------------------------- */

export const INTERNAL_LINKS: Record<string, string | null> = {
  /**
   * Live service pages. Only map an anchor here when it genuinely refers to
   * the service page — "…development services", "…partner services". An anchor
   * that says "guide" means a content article, and pointing it at a service
   * page sends the reader somewhere they weren't promised.
   */
  "custom-siem-soar-services": "/services/custom-siem-soar-development",
  "mssp-engineering-partner": "/services/mssp-engineering-partner",

  /**
   * Planned articles. `null` renders the anchor as plain text, so nothing
   * links to a page that doesn't exist yet. Set the path once each is live.
   */
  "nis2-dora-compliance-guide": null,
  "soar-playbooks-guide": null,
  "multi-tenant-siem-architecture": null,
  "open-source-vs-custom-siem": null,
  "siem-migration-guide": null,
};

export const resolveLink = (key: string): string | null =>
  INTERNAL_LINKS[key] ?? null;
