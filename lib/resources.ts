/**
 * Central resource library — structure only.
 *
 * Currently scoped to the three Content Hub categories: Blog, Case Studies,
 * and White Papers. The wider set from the site architecture (Technical
 * Guides, SOC Templates, ROI Calculators, Compliance Checklists, API Docs) can
 * be reinstated by adding them to RESOURCE_TYPES below.
 *
 * ---------------------------------------------------------------------------
 * ADDING CONTENT
 * ---------------------------------------------------------------------------
 * `RESOURCES` is intentionally empty. The page renders the full layout from it
 * — tabs, topic filters, search, counts and pagination all derive from this
 * array, so adding an entry is the only step needed to populate the page.
 *
 * Minimum viable entry:
 *
 *   {
 *     id: "wp-mssp-guide-nis2",              // unique, stable, kebab-case
 *     type: "White Papers",                  // must be one of RESOURCE_TYPES
 *     topics: ["NIS2", "MSSP & White-Label"],// zero or more RESOURCE_TOPICS
 *     title: "The MSSP's Guide to NIS2",
 *     summary: "One or two sentences shown on the card.",
 *     format: "PDF",                         // "8 min read" | "XLSX" | "Interactive" | …
 *     status: "live",                        // "planned" renders a non-clickable
 *     href: "/resources/mssp-guide-nis2",    //   "Coming soon" card and needs no href
 *   }
 *
 * Optional: `date` (ISO, shown on live items), `gated: true` (marks it as
 * requiring an email), `featured: true` (reserved — see note on the field).
 *
 * To add a whole new category, add it to RESOURCE_TYPES; the tab, its count,
 * and its filter appear automatically. Same for RESOURCE_TOPICS.
 * ---------------------------------------------------------------------------
 */

/**
 * Live categories. The architecture diagram also allows for Technical Guides,
 * SOC Templates, ROI Calculators, Compliance Checklists, and API Docs — adding
 * any of them back is a one-line change here and the tab, count, and filter
 * appear on their own.
 */
export const RESOURCE_TYPES = [
  "Blog",
  "Case Studies",
  "White Papers",
] as const;

export type ResourceType = (typeof RESOURCE_TYPES)[number];

export const RESOURCE_TOPICS = [
  "SIEM & SOAR",
  "AI SOC Automation",
  "MSSP & White-Label",
  "NIS2",
  "DORA",
  "GDPR",
  "Migration",
  "Multi-Tenancy",
  "Platform Ownership",
] as const;

export type ResourceTopic = (typeof RESOURCE_TOPICS)[number];

export interface Resource {
  id: string;
  type: ResourceType;
  topics: ResourceTopic[];
  title: string;
  summary: string;
  /** "8 min read", "PDF", "XLSX", "Interactive" — shown next to the type label */
  format: string;
  status: "live" | "planned";
  /** Required once status is "live". */
  href?: string;
  /** ISO date, shown on live items. */
  date?: string;
  /**
   * Reserved for a featured strip above the grid. Nothing renders it yet —
   * setting it today has no effect.
   */
  featured?: boolean;
  /** Marks the item as requiring an email to download. */
  gated?: boolean;
}

/**
 * Published resources. Blog entries mirror `POSTS` in lib/blog.ts — the article
 * itself lives at app/blog/<slug>/page.tsx and this entry is what surfaces it
 * on the hub.
 */
export const RESOURCES: Resource[] = [
  {
    id: "blog-siem-cost-licensing-vs-custom-built",
    type: "Blog",
    topics: ["SIEM & SOAR", "Platform Ownership"],
    title: "How Much Does a SIEM Cost? Licensing vs. Custom-Built",
    summary:
      "Licensed SIEMs charge on ingestion, retention, and feature tiers. Custom-built platforms trade that for upfront engineering. Where the break-even actually falls, and which model fits which environment.",
    format: "9 min read",
    status: "live",
    href: "/blog/siem-cost-licensing-vs-custom-built",
    date: "2026-08-18",
  },
  {
    id: "blog-open-source-vs-custom-built-siem",
    type: "Blog",
    topics: ["SIEM & SOAR", "Platform Ownership", "MSSP & White-Label"],
    title: "Open-Source vs. Custom-Built SIEM: The Real Trade-off",
    summary:
      "Open-source SIEMs remove licensing fees but move the cost to engineering, infrastructure, and maintenance. Where multi-tenancy, compliance, and detection quality separate the two models — and which fits which environment.",
    format: "8 min read",
    status: "live",
    href: "/blog/open-source-vs-custom-built-siem",
    date: "2026-08-20",
  },
  {
    id: "blog-siem-migration-guide-zero-downtime",
    type: "Blog",
    topics: ["SIEM & SOAR", "Migration", "Platform Ownership"],
    title: "SIEM Migration Guide: Move Off Legacy With Zero Downtime",
    summary:
      "A zero-downtime switch means running both systems on live traffic until the new one catches the same threats. The seven phases, the three risks that break migrations, and why MSSPs should move one client at a time.",
    format: "8 min read",
    status: "live",
    href: "/blog/siem-migration-guide-zero-downtime",
    date: "2026-08-21",
  },
];

/* ------------------------------------------------------------------ helpers */

export const countByType = (items: Resource[]) => {
  const counts = new Map<string, number>();
  for (const r of items) counts.set(r.type, (counts.get(r.type) ?? 0) + 1);
  return counts;
};

export const liveResources = (items: Resource[]) =>
  items.filter((r) => r.status === "live");
