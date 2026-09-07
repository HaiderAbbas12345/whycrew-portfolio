/**
 * Case study registry.
 *
 * Mirrors lib/blog.ts: studies live at /case-studies/<slug> as their own route
 * folder, and register their metadata here so the index, the Resources hub and
 * the sitemap all read from one place.
 *
 * To publish a case study:
 *   1. add an entry to CASE_STUDIES below
 *   2. create app/case-studies/<slug>/page.tsx using <CaseStudyShell>
 *   3. add a matching { type: "Case Study", status: "live" } entry in
 *      lib/resources.ts
 */

export interface CaseStudyMetric {
  /** The figure itself — kept as a string so "$270K" and "100%" both work. */
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  /** <h1> on the page. */
  title: string;
  /** Exact <title> from the content doc. */
  metaTitle: string;
  /** Exact meta description from the content doc. */
  metaDescription: string;
  /** Card summary on the index and the Resources hub. */
  summary: string;
  /** ISO date. */
  datePublished: string;
  dateModified?: string;
  readTime: string;
  topics: string[];
  /** Headline figures, rendered as a band under the title. */
  metrics: CaseStudyMetric[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "siem-rent-to-owned-platform",
    title: "From SIEM Rent to an Owned Security Platform",
    metaTitle: "How a Growing MSSP Saved $270K in 24 Months",
    metaDescription:
      "A real-world MSSP case study showing how moving away from per-GB SIEM pricing unlocked $270K in savings over 24 months.",
    summary:
      "A growing MSSP was paying more for its SIEM with every client it won. Moving to an owned, multi-tenant platform removed the per-gigabyte pricing curve and returned $270K across 24 months.",
    datePublished: "2026-09-07",
    readTime: "4 min read",
    topics: ["SIEM & SOAR", "Platform Ownership", "MSSP & White-Label"],
    metrics: [
      { value: "$270K", label: "Saved across 24 months" },
      { value: "$110K", label: "Year-1 direct savings" },
      { value: "100%", label: "Owned platform" },
    ],
  },
];

export const caseStudyBySlug = (slug: string) =>
  CASE_STUDIES.find((c) => c.slug === slug);

/**
 * A slug as breadcrumb text — the same treatment the blog gives its last
 * crumb, so both sections read the same way. Re-exported from lib/blog rather
 * than reimplemented: the visible trail and the BreadcrumbList JSON-LD have to
 * carry an identical string, and one implementation is what guarantees that.
 */
export { breadcrumbLabel } from "@/lib/blog";
