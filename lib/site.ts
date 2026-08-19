export const SITE = {
  name: "WhyCrew",
  legalName: "WhyCrew",
  /**
   * Canonical origin — `www`, no trailing slash. The apex 308-redirects here,
   * so this is the host every canonical URL, OG tag, sitemap entry, and
   * schema.org @id must name. Pointing them at the apex sends crawlers through
   * a redirect to reach the real page.
   */
  url: "https://www.whycrew.com",
  tagline: "The Engineering Partner Behind Independent Security Teams",
  description:
    "MSSP engineering partner building custom SIEM platforms you own. No vendor lock-in, no subscriptions. Global delivery, EU-proven. Book a strategy call.",
  email: "hello@whycrew.com",
  incidentEmail: "incident@whycrew.com",
  pressEmail: "press@whycrew.com",
  locale: "en_US",
} as const;

/**
 * Where every "Book a call" CTA points. Set NEXT_PUBLIC_BOOKING_URL to a
 * Cal.com / Calendly link and the buttons go straight there; unset, they fall
 * back to the on-site contact form. Same convention as the previous site, so
 * the existing Vercel env var works unchanged.
 */
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || "";
export const CTA_HREF = BOOKING_URL || "/contact";
export const IS_EXTERNAL_CTA = Boolean(BOOKING_URL);

/** GA4 property carried over from the previous deployment. */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-BNMPZB5NQN";

/** Search Console ownership token carried over from the previous deployment. */
export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  "TYYuh-ev2DxwW0Of-KVoqFbn-RkdU6BojgN0dW5lXrg";

export const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL || "";
export const FOUNDER_LINKEDIN = process.env.NEXT_PUBLIC_FOUNDER_LINKEDIN || "";

export type ServiceKey =
  | "custom-siem-soar-development"
  | "ai-powered-soc-automation"
  | "mssp-engineering-partner"
  | "nis2-dora-compliance-automation";

export interface ServiceSummary {
  slug: ServiceKey;
  href: string;
  name: string;
  short: string;
  navLabel: string;
  blurb: string;
  metaTitle: string;
  metaDescription: string;
}

/**
 * Slugs come straight from the content docs — the MSSP page specifies
 * /services/mssp-engineering-partner, so every service sits flat under
 * /services/ for consistency.
 */
export const SERVICES: ServiceSummary[] = [
  {
    slug: "custom-siem-soar-development",
    href: "/services/custom-siem-soar-development",
    name: "Custom SIEM & SOAR Development",
    navLabel: "Custom SIEM & SOAR",
    short: "Own the platform your SOC runs on",
    blurb:
      "Multi-tenant data lake architecture, custom detection engines, SOAR playbook development, and zero-downtime migration off any legacy or vendor-locked platform.",
    metaTitle: "Custom SIEM & SOAR Development | Cut Costs 40-70%",
    metaDescription:
      "Stop renting your SIEM. WhyCrew builds custom SIEM & SOAR platforms you own outright — zero-downtime migration, 40-70% cost cut. Book a free audit.",
  },
  {
    slug: "ai-powered-soc-automation",
    href: "/services/ai-powered-soc-automation",
    name: "AI-Powered SOC Automation",
    navLabel: "AI SOC Automation",
    short: "AI agents that never leave your perimeter",
    blurb:
      "Private LLM agents deployed inside your environment. All inference stays within your perimeter. No alert data leaves your infrastructure.",
    metaTitle: "AI-Powered SOC Automation | Cut Tier-1 Alerts 80%",
    metaDescription:
      "Deploy AI SOC Automation inside your infrastructure — zero external API calls, 70-80% less Tier-1 workload, full platform ownership. Book a consultation.",
  },
  {
    slug: "mssp-engineering-partner",
    href: "/services/mssp-engineering-partner",
    name: "MSSP Engineering Partner",
    navLabel: "MSSP Engineering Partner",
    short: "Stop reselling a platform. Start owning one.",
    blurb:
      "White-label SOC platforms for MSSPs, VARs, and managed security operators who want to own their stack outright, not rent it from a vendor.",
    metaTitle: "White-Label SOC Platform | MSSP Partner | WhyCrew",
    metaDescription:
      "WhyCrew is your MSSPs engineering partner — we build a white-label SOC platform you own outright. Full ownership, no reseller fees, no lock-in.",
  },
  {
    slug: "nis2-dora-compliance-automation",
    href: "/services/nis2-dora-compliance-automation",
    name: "NIS2 & DORA Compliance Automation",
    navLabel: "NIS2 & DORA Compliance",
    short: "Compliance that runs without you holding it together",
    blurb:
      "Automated incident reporting, ICT risk management, gap assessment, third-party risk, and audit evidence — running continuously as a managed program.",
    metaTitle: "NIS2 & DORA Compliance Automation for MSSPs | WhyCrew",
    metaDescription:
      "WhyCrew automates NIS2 & DORA compliance for essential entities, financial operators, and MSSPs — incident reporting, ICT risk, and audit-ready evidence.",
  },
];

export const serviceBySlug = (slug: ServiceKey) =>
  SERVICES.find((s) => s.slug === slug)!;

export const PRIMARY_NAV = [
  { label: "Services", href: "/services", hasMenu: true },
  { label: "Resources", href: "/resources" },
  { label: "Results", href: "/#results" },
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Contact", href: "/contact" },
] as const;

export const TRUST_STRIP = [
  "Elasticsearch",
  "OpenSearch",
  "Wazuh",
  "Splunk migration",
  "Microsoft Sentinel migration",
  "IBM QRadar migration",
  "Llama 3",
  "Mistral",
  "MITRE ATT&CK",
  "NIS2",
  "DORA",
  "GDPR",
] as const;
