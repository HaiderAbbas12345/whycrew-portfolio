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
  {
    slug: "open-source-vs-custom-built-siem",
    title: "Open-Source vs. Custom-Built SIEM: The Real Trade-off",
    metaTitle: "Open-Source vs. Custom-Built SIEM: Key Facts",
    metaDescription:
      "Open-source SIEMs cut licensing costs but shift the burden to your team. Custom-built SIEMs offer full platform ownership. See the breakdown.",
    summary:
      "Open-source SIEMs remove licensing fees but move the cost to engineering, infrastructure, and maintenance. Where multi-tenancy, compliance, and detection quality separate the two models — and which fits which environment.",
    datePublished: "2026-08-20",
    readTime: "8 min read",
    topics: ["SIEM & SOAR", "Platform Ownership", "MSSP & White-Label"],
    cluster: "Custom SIEM & SOAR Development",
  },
  {
    slug: "siem-migration-guide-zero-downtime",
    title: "SIEM Migration Guide: Move Off Legacy With Zero Downtime",
    metaTitle: "SIEM Migration: Move Off Legacy With Zero Downtime",
    metaDescription:
      "Migrating a SIEM feels risky but does not have to be. Learn a zero-downtime approach that protects coverage, data, and detection during the switch.",
    summary:
      "A zero-downtime switch means running both systems on live traffic until the new one catches the same threats. The seven phases, the three risks that break migrations, and why MSSPs should move one client at a time.",
    datePublished: "2026-08-21",
    readTime: "8 min read",
    topics: ["SIEM & SOAR", "Migration", "Platform Ownership"],
    cluster: "Custom SIEM & SOAR Development",
  },
  {
    slug: "multi-tenant-siem-architecture-mssps",
    title: "Multi-Tenant SIEM for MSSPs: A Full Guide",
    metaTitle: "Multi-Tenant SIEM Architecture for MSSP: A Full Guide",
    metaDescription:
      "Learn how multi-tenant SIEM helps MSSPs manage all clients from one platform, cut costs, and keep data fully separate, without the chaos.",
    summary:
      "One platform serving every client, with each tenant's data, rules, and dashboards fully separated. How isolation, layered detection, branding, and data residency should be designed — and when a custom build beats a vendor platform.",
    datePublished: "2026-08-25",
    readTime: "9 min read",
    topics: ["SIEM & SOAR", "MSSP & White-Label", "Multi-Tenancy"],
    cluster: "Custom SIEM & SOAR Development",
  },
  {
    slug: "siem-nis2-dora-compliance",
    title: "SIEM for NIS2 & DORA Compliance: What Your Platform Must Deliver",
    metaTitle: "SIEM for NIS2 & DORA Compliance: A Guide",
    metaDescription:
      "Does your SIEM meet NIS2 and DORA requirements? See the 5 things a compliant platform must deliver, and where most tools fall short.",
    summary:
      "NIS2 gives you 24 hours to file a first report; DORA gives you 4. The five capabilities a compliant platform needs — rule-tied detection, automated reporting, tamper-proof records, EU residency, and test evidence — and the three gaps that show up repeatedly in bought SIEMs.",
    datePublished: "2026-08-27",
    readTime: "9 min read",
    topics: ["SIEM & SOAR", "NIS2", "DORA"],
    cluster: "Custom SIEM & SOAR Development",
  },
  {
    slug: "soar-playbooks-explained",
    title: "What Are SOAR Playbooks? Use Cases, Examples, and MSSP Scale",
    metaTitle: "What Are SOAR Playbooks? Examples, Uses & MSSP Scale",
    metaDescription:
      "See how SOAR playbooks work, real use cases, and where they break down as MSSPs scale. Practical examples, ROI, and what to fix first.",
    summary:
      "A playbook turns a detection into a logged response in seconds. Which alerts to automate first, the four playbook types that pay off, where fixed branches break down, and what changes when you run them across many client environments.",
    datePublished: "2026-09-01",
    readTime: "15 min read",
    topics: ["SIEM & SOAR", "AI SOC Automation", "MSSP & White-Label"],
    cluster: "Custom SIEM & SOAR Development",
  },
  {
    slug: "what-is-soar",
    title: "What Is SOAR? Security Orchestration, Automation, and Response Explained",
    metaTitle: "What Is SOAR? Simple Guide to Security Automation",
    metaDescription:
      "SOAR meaning, made simple: security software that connects your tools and handles alerts fast. See how SOAR works, with real examples.",
    summary:
      "SOAR turns a detection into a logged response in seconds by orchestrating your existing tools with predefined playbooks. What it automates, where it breaks down in practice, and what separates a SOAR license from a SOAR program that actually cuts workload.",
    datePublished: "2026-09-10",
    dateModified: "2026-09-11",
    readTime: "11 min read",
    topics: ["SIEM & SOAR", "AI SOC Automation", "NIS2", "DORA"],
    cluster: "Custom SIEM & SOAR Development",
  },
  {
    slug: "what-is-siem",
    title: "What Is SIEM? How It Works and What It Costs",
    metaTitle: "What Is SIEM? Meaning, Cost & How It Works",
    metaDescription:
      "What is SIEM? A clear guide covering how it works, real cost numbers, and when building your own makes more sense than renting.",
    summary:
      "The four steps every SIEM runs, what it changes for the team using it, and where it sits next to SOAR and EDR. Plus the cost split between licensing a vendor platform and owning one.",
    datePublished: "2026-09-07",
    readTime: "10 min read",
    topics: ["SIEM & SOAR", "Platform Ownership", "NIS2", "DORA"],
    cluster: "Custom SIEM & SOAR Development",
  },
];

export const postBySlug = (slug: string) => POSTS.find((p) => p.slug === slug);

/**
 * A slug as breadcrumb text. The hyphens read as punctuation in a crumb, so
 * they come out as spaces; the crumb is CSS-uppercased where it renders.
 *
 * Used by both the visible trail and the BreadcrumbList JSON-LD, which have
 * to carry the same string or Google treats the structured data as not
 * matching the page.
 */
export const breadcrumbLabel = (slug: string) => slug.replace(/-/g, " ");

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

  /** Published articles. */
  "siem-cost-licensing": "/blog/siem-cost-licensing-vs-custom-built",
  "open-source-vs-custom-siem": "/blog/open-source-vs-custom-built-siem",
  "siem-migration-guide": "/blog/siem-migration-guide-zero-downtime",
  "multi-tenant-siem-architecture":
    "/blog/multi-tenant-siem-architecture-mssps",
  "nis2-dora-compliance-guide": "/blog/siem-nis2-dora-compliance",
  "soar-playbooks-guide": "/blog/soar-playbooks-explained",
  "what-is-siem": "/blog/what-is-siem",
  "what-is-soar": "/blog/what-is-soar",
};

export const resolveLink = (key: string): string | null =>
  INTERNAL_LINKS[key] ?? null;
