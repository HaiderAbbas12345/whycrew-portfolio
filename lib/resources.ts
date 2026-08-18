/**
 * Central resource library — structure only.
 *
 * Categories mirror the approved site architecture: the Content Hub
 * (blog, case studies, whitepapers, technical guides) and the Resource Hub
 * (SOC templates, ROI calculators, compliance checklists, API docs) merged
 * into one browsable index.
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

export const RESOURCE_TYPES = [
  "Blog & Insights",
  "Case Studies",
  "White Papers",
  "Technical Guides",
  "SOC Templates",
  "ROI Calculators",
  "Compliance Checklists",
  "API Docs",
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

/** Empty by design — see the note at the top of this file. */
export const RESOURCES: Resource[] = [];

/* ------------------------------------------------------------------ helpers */

export const countByType = (items: Resource[]) => {
  const counts = new Map<string, number>();
  for (const r of items) counts.set(r.type, (counts.get(r.type) ?? 0) + 1);
  return counts;
};

export const liveResources = (items: Resource[]) =>
  items.filter((r) => r.status === "live");
