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
  {
    slug: "mssp-engineering-capacity-pod",
    title: "Scaling MSSP Engineering Without Scaling Headcount",
    metaTitle: "How an MSSP Got 8× Engineering Output Without New Hires",
    metaDescription:
      "A real-world case study showing how an embedded WhyCrew engineering pod let a growing MSSP consolidate detection, ingestion, and automation work — shipping production work in 10 days without a four-person hire.",
    summary:
      "A growing MSSP had one engineer covering work that realistically needed three or four. An embedded WhyCrew engineering pod consolidated detection, ingestion, and automation under one team, shipping production work in 10 days.",
    datePublished: "2026-09-08",
    readTime: "3 min read",
    topics: ["SIEM & SOAR", "MSSP & White-Label"],
    metrics: [
      { value: "8×", label: "Engineering output vs. one hire" },
      { value: "10 days", label: "To first production ship" },
      { value: "1 pod", label: "Detection, ingestion & automation unified" },
    ],
  },
  {
    slug: "owned-threat-intelligence-pipeline",
    title: "Replacing a Rented Threat-Intel Feed With an Owned Pipeline",
    metaTitle:
      "How a SOC Cut 80% of Manual Triage With an Owned Threat-Intel Pipeline",
    metaDescription:
      "A real-world case study showing how a regional SOC replaced a $40K/year threat-intelligence subscription with an owned ingestion and enrichment pipeline, cutting manual triage by 80%.",
    summary:
      "A regional SOC paid $40K a year for a commercial threat-intel feed that still left analysts checking domains and hashes by hand. An owned ingestion and enrichment pipeline cut manual triage by 80%.",
    datePublished: "2026-09-08",
    readTime: "3 min read",
    topics: ["SIEM & SOAR", "Platform Ownership"],
    metrics: [
      { value: "$40K", label: "Annual licensing eliminated" },
      { value: "80%", label: "Reduction in manual triage" },
      { value: "<3 sec", label: "Indicator enrichment time" },
    ],
  },
  {
    slug: "in-house-dark-web-monitoring",
    title: "Bringing Identity Monitoring In-House to Escape a Capped Vendor",
    metaTitle:
      "How a Security Provider Cut a $180K Vendor Bill With In-House Monitoring",
    metaDescription:
      "A real-world case study showing how a cybersecurity provider replaced a capped, $180K/year dark-web monitoring vendor with an owned collection pipeline in six weeks.",
    summary:
      "A cybersecurity provider paid $180K a year for dark-web monitoring capped by API limits and delayed alerts. A proprietary collection pipeline, deployed in six weeks, removed the caps entirely.",
    datePublished: "2026-09-08",
    readTime: "3 min read",
    topics: ["Platform Ownership", "SIEM & SOAR"],
    metrics: [
      { value: "$180K", label: "Annual vendor bill eliminated" },
      { value: "6 wks", label: "Transition timeline" },
      { value: "0", label: "API call caps" },
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
