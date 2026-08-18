/**
 * Central resource library.
 *
 * Categories mirror the approved site architecture: the Content Hub
 * (blog, case studies, whitepapers, technical guides) and the Resource Hub
 * (SOC templates, ROI calculators, compliance checklists, API docs) merged
 * into one browsable index.
 *
 * ---------------------------------------------------------------------------
 * ADDING REAL CONTENT
 * ---------------------------------------------------------------------------
 * Every entry below is a placeholder: `status: "planned"`. They render as
 * clearly-marked "Coming soon" cards and are deliberately NOT clickable, so
 * nothing looks published before it exists.
 *
 * To publish one:
 *   1. set `status: "live"`
 *   2. add `href` (an internal route, or an external/gated asset URL)
 *   3. optionally add `date` (ISO) and `featured: true`
 *
 * The page picks everything else up automatically — filters, counts, search,
 * and the featured strip.
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
  /** Promotes into the featured strip at the top of the page. */
  featured?: boolean;
  /** Marks the item as requiring an email to download. */
  gated?: boolean;
}

export const RESOURCES: Resource[] = [
  /* ------------------------------------------------ Blog & Insights */
  {
    id: "blog-per-gb-margin",
    type: "Blog & Insights",
    topics: ["SIEM & SOAR", "MSSP & White-Label"],
    title: "Why per-GB SIEM licensing breaks MSSP margin at scale",
    summary:
      "The unit economics of reselling a vendor platform, and the point at which building your own becomes cheaper than renting.",
    format: "6 min read",
    status: "planned",
  },
  {
    id: "blog-onprem-vs-copilot",
    type: "Blog & Insights",
    topics: ["AI SOC Automation", "GDPR"],
    title: "On-premise AI agents vs. cloud security copilots",
    summary:
      "What actually changes for a regulated operator when inference leaves your perimeter — and what auditors ask about it.",
    format: "8 min read",
    status: "planned",
  },
  {
    id: "blog-detection-parity",
    type: "Blog & Insights",
    topics: ["Migration", "SIEM & SOAR"],
    title: "Detection parity: the only migration metric that matters",
    summary:
      "How to prove a new SIEM catches everything the old one did, before you cut over.",
    format: "7 min read",
    status: "planned",
  },
  {
    id: "blog-nis2-article-21",
    type: "Blog & Insights",
    topics: ["NIS2"],
    title: "NIS2 Article 21, domain by domain",
    summary:
      "All ten risk-management measures, what evidence a supervisory authority expects for each, and where teams usually fall short.",
    format: "12 min read",
    status: "planned",
  },

  /* ------------------------------------------------ Case Studies */
  {
    id: "case-nordsec",
    type: "Case Studies",
    topics: ["SIEM & SOAR", "Migration", "Multi-Tenancy"],
    title: "NordSec GmbH: €340K/year saved migrating 40+ tenants off Splunk",
    summary:
      "A German MSSP replaced vendor-licensed SIEM with an owned Elasticsearch data lake. Zero downtime, six weeks to production, 62% cost reduction.",
    format: "PDF",
    status: "planned",
  },
  {
    id: "case-uk-fintech-dora",
    type: "Case Studies",
    topics: ["DORA", "Migration", "SIEM & SOAR"],
    title: "UK fintech: full DORA data residency after leaving Sentinel",
    summary:
      "OpenSearch-based SIEM with complete audit logging and isolated tenants for payment processing and retail banking. 48% lower annual spend.",
    format: "PDF",
    status: "planned",
  },
  {
    id: "case-netherlands-soc",
    type: "Case Studies",
    topics: ["AI SOC Automation"],
    title: "Netherlands SOC: 78% less Tier-1 load with on-premise LLM triage",
    summary:
      "12,000 daily alerts, 12-minute average alert-to-resolution, seven weeks from scoping to production.",
    format: "PDF",
    status: "planned",
  },

  /* ------------------------------------------------ White Papers */
  {
    id: "wp-mssp-nis2-guide",
    type: "White Papers",
    topics: ["NIS2", "MSSP & White-Label"],
    title: "The MSSP's Guide to NIS2",
    summary:
      "Scope, reporting windows, Article 21 controls, and supply-chain obligations — written for the team that has to operationalise them.",
    format: "PDF",
    status: "planned",
    gated: true,
  },
  {
    id: "wp-build-vs-buy",
    type: "White Papers",
    topics: ["SIEM & SOAR", "Platform Ownership"],
    title: "Build vs. buy: a costing model for custom SIEM",
    summary:
      "Ingestion volume, tenancy, retention and compliance modelled against three years of subscription pricing.",
    format: "PDF",
    status: "planned",
    gated: true,
  },
  {
    id: "wp-mssp-build-buy-brief",
    type: "White Papers",
    topics: ["MSSP & White-Label", "Platform Ownership"],
    title: "The MSSP build-vs-buy brief",
    summary:
      "Reseller economics compared against owning the platform outright, including margin projections as client count grows.",
    format: "PDF",
    status: "planned",
    gated: true,
  },

  /* ------------------------------------------------ Technical Guides */
  {
    id: "guide-multi-tenant-datalake",
    type: "Technical Guides",
    topics: ["Multi-Tenancy", "SIEM & SOAR"],
    title: "Designing a multi-tenant security data lake",
    summary:
      "Index strategy, per-tenant retention, RBAC boundaries, and the isolation guarantees a compliance auditor will actually test.",
    format: "15 min read",
    status: "planned",
  },
  {
    id: "guide-zero-downtime-migration",
    type: "Technical Guides",
    topics: ["Migration", "SIEM & SOAR"],
    title: "Running a zero-downtime SIEM migration",
    summary:
      "Parallel-run architecture, detection-logic mapping from SPL/KQL/AQL, and the validation gate before cutover.",
    format: "18 min read",
    status: "planned",
  },
  {
    id: "guide-llm-soc-deployment",
    type: "Technical Guides",
    topics: ["AI SOC Automation"],
    title: "Deploying open-weight LLM agents inside a SOC perimeter",
    summary:
      "Model selection, inference topology, confidence thresholds, and the human-review gates for high-severity cases.",
    format: "14 min read",
    status: "planned",
  },
  {
    id: "guide-soar-playbooks",
    type: "Technical Guides",
    topics: ["SIEM & SOAR", "AI SOC Automation"],
    title: "Writing SOAR playbooks that survive real escalation paths",
    summary:
      "Why rigid playbook trees break under volume, and how to structure automation around how your analysts actually work.",
    format: "11 min read",
    status: "planned",
  },

  /* ------------------------------------------------ SOC Templates */
  {
    id: "tpl-ir-runbook",
    type: "SOC Templates",
    topics: ["AI SOC Automation", "NIS2"],
    title: "Incident response runbook template",
    summary:
      "Severity matrix, escalation paths, and notification timelines pre-mapped to NIS2 and DORA reporting windows.",
    format: "DOCX",
    status: "planned",
    gated: true,
  },
  {
    id: "tpl-detection-catalogue",
    type: "SOC Templates",
    topics: ["SIEM & SOAR"],
    title: "Detection rule catalogue template",
    summary:
      "MITRE ATT&CK-aligned tracker for rule coverage, tuning history, and false-positive rates across tenants.",
    format: "XLSX",
    status: "planned",
    gated: true,
  },
  {
    id: "tpl-tenant-onboarding",
    type: "SOC Templates",
    topics: ["Multi-Tenancy", "MSSP & White-Label"],
    title: "Tenant onboarding checklist",
    summary:
      "Everything to provision, isolate, and validate before a new client's first alert reaches your SOC.",
    format: "DOCX",
    status: "planned",
    gated: true,
  },

  /* ------------------------------------------------ ROI Calculators */
  {
    id: "calc-siem-tco",
    type: "ROI Calculators",
    topics: ["SIEM & SOAR", "Platform Ownership"],
    title: "SIEM TCO calculator",
    summary:
      "Model three years of per-GB licensing against a one-time build, using your own ingestion volume and growth rate.",
    format: "Interactive",
    status: "planned",
  },
  {
    id: "calc-mssp-margin",
    type: "ROI Calculators",
    topics: ["MSSP & White-Label", "Platform Ownership"],
    title: "MSSP margin calculator",
    summary:
      "Compare reseller per-tenant fees against owned-platform economics as your client count scales.",
    format: "Interactive",
    status: "planned",
  },
  {
    id: "calc-tier1-automation",
    type: "ROI Calculators",
    topics: ["AI SOC Automation"],
    title: "Tier-1 automation savings calculator",
    summary:
      "Translate alert volume and analyst cost into the headcount impact of automated triage.",
    format: "Interactive",
    status: "planned",
  },

  /* ------------------------------------------------ Compliance Checklists */
  {
    id: "chk-nis2-readiness",
    type: "Compliance Checklists",
    topics: ["NIS2"],
    title: "NIS2 readiness checklist",
    summary:
      "All ten Article 21 domains with the evidence required for each, formatted for supervisory review.",
    format: "PDF",
    status: "planned",
    gated: true,
  },
  {
    id: "chk-dora-ict",
    type: "Compliance Checklists",
    topics: ["DORA"],
    title: "DORA ICT risk & resilience checklist",
    summary:
      "Register of information, third-party oversight, and TLPT scoping under Article 26.",
    format: "PDF",
    status: "planned",
    gated: true,
  },
  {
    id: "chk-gdpr-residency",
    type: "Compliance Checklists",
    topics: ["GDPR"],
    title: "GDPR data residency checklist for security tooling",
    summary:
      "Where telemetry lives, who processes it, and what to document when your SIEM is foreign-hosted.",
    format: "PDF",
    status: "planned",
    gated: true,
  },

  /* ------------------------------------------------ API Docs */
  {
    id: "api-platform-reference",
    type: "API Docs",
    topics: ["SIEM & SOAR", "Platform Ownership"],
    title: "Platform API reference",
    summary:
      "Endpoint reference for ingestion, detection management, and tenant administration on a WhyCrew-built platform.",
    format: "Docs",
    status: "planned",
  },
  {
    id: "api-agent-config",
    type: "API Docs",
    topics: ["AI SOC Automation"],
    title: "AI agent configuration reference",
    summary:
      "Confidence thresholds, risk classifications, autonomous-action scoping, and audit-log schema.",
    format: "Docs",
    status: "planned",
  },
  {
    id: "api-integration-guides",
    type: "API Docs",
    topics: ["SIEM & SOAR"],
    title: "Integration guides",
    summary:
      "Wiring a WhyCrew platform into ServiceNow, Slack, Jira, and existing ticketing and chat workflows.",
    format: "Docs",
    status: "planned",
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
