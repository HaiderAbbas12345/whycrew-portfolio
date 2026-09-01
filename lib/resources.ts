/**
 * Central resource library — structure only.
 *
 * Currently scoped to Blog. Case Studies and White Papers were removed while
 * they had no entries: an empty tab is a thin, contentless view for crawlers.
 * They — and the wider set from the site architecture (Technical Guides, SOC
 * Templates, ROI Calculators, Compliance Checklists, API Docs) — come back by
 * adding them to RESOURCE_TYPES and RESOURCE_TAB_SLUGS below, once there is
 * something to put in them.
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
 *     type: "Blog",                          // must be one of RESOURCE_TYPES
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
 * To add a whole new category, add it to RESOURCE_TYPES and give it a slug in
 * RESOURCE_TAB_SLUGS; the tab, its count, and its filter appear automatically.
 * Same for RESOURCE_TOPICS.
 * ---------------------------------------------------------------------------
 */

/**
 * Live categories. Only categories that actually have entries belong here —
 * a tab with a zero count is an empty page for a crawler to index.
 */
export const RESOURCE_TYPES = ["Blog"] as const;

export type ResourceType = (typeof RESOURCE_TYPES)[number];

/* --------------------------------------------------------------- tab URLs */

/**
 * Query parameter mirroring the active type tab on /resources.
 *
 * "All" is the default and carries no parameter, so the unfiltered page stays
 * a bare /resources — which is also its canonical URL.
 */
export const RESOURCE_TAB_PARAM = "resources_tab";

/**
 * Public slug per category. Kept separate from the display name so a tab can
 * be renamed without breaking links people have already shared.
 */
export const RESOURCE_TAB_SLUGS: Record<ResourceType, string> = {
  Blog: "blog_posts",
};

/**
 * Resolves a `?resources_tab=` value to a tab. Anything unrecognised — a typo,
 * or a link to a category that has since been removed — falls back to "All"
 * rather than showing an empty grid.
 */
export const tabSlugToType = (slug: string | null): ResourceType | "All" => {
  if (!slug) return "All";
  const match = (Object.keys(RESOURCE_TAB_SLUGS) as ResourceType[]).find(
    (t) => RESOURCE_TAB_SLUGS[t] === slug
  );
  return match ?? "All";
};

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
  {
    id: "blog-multi-tenant-siem-architecture-mssps",
    type: "Blog",
    topics: ["SIEM & SOAR", "MSSP & White-Label", "Multi-Tenancy"],
    title: "Multi-Tenant SIEM for MSSPs: A Full Guide",
    summary:
      "One platform serving every client, with each tenant's data, rules, and dashboards fully separated. How isolation, layered detection, branding, and data residency should be designed — and when a custom build beats a vendor platform.",
    format: "9 min read",
    status: "live",
    href: "/blog/multi-tenant-siem-architecture-mssps",
    date: "2026-08-25",
  },
  {
    id: "blog-siem-nis2-dora-compliance",
    type: "Blog",
    topics: ["SIEM & SOAR", "NIS2", "DORA"],
    title: "SIEM for NIS2 & DORA Compliance: What Your Platform Must Deliver",
    summary:
      "NIS2 gives you 24 hours to file a first report; DORA gives you 4. The five capabilities a compliant platform needs — rule-tied detection, automated reporting, tamper-proof records, EU residency, and test evidence — and the three gaps that show up repeatedly in bought SIEMs.",
    format: "9 min read",
    status: "live",
    href: "/blog/siem-nis2-dora-compliance",
    date: "2026-08-27",
  },
  {
    id: "blog-soar-playbooks-explained",
    type: "Blog",
    topics: ["SIEM & SOAR", "AI SOC Automation", "MSSP & White-Label"],
    title: "What Are SOAR Playbooks? Use Cases, Examples, and MSSP Scale",
    summary:
      "A playbook turns a detection into a logged response in seconds. Which alerts to automate first, the four playbook types that pay off, where fixed branches break down, and what changes when you run them across many client environments.",
    format: "15 min read",
    status: "live",
    href: "/blog/soar-playbooks-explained",
    date: "2026-09-01",
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
