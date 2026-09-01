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
  /**
   * E.164 for `tel:` hrefs and schema.org `telephone` — no spaces, no dashes.
   * `phoneDisplay` is the human-readable form; never put the spaced version in
   * an href, some dialers drop the call.
   */
  phone: "+12894830388",
  phoneDisplay: "+1 289 483 0388",
  locale: "en_US",
} as const;

/**
 * Registered office. Split into parts rather than one string because
 * schema.org PostalAddress wants them separately — a single blob is ignored by
 * Google's structured-data parser, and re-splitting one later is guesswork.
 *
 * `country` is the ISO 3166-1 alpha-2 code the schema expects; `countryName`
 * is what gets rendered.
 */
export const ADDRESS = {
  street: "105 Consumers Drive, Unit #2",
  locality: "Whitby",
  region: "ON",
  postalCode: "L1N 1C4",
  country: "CA",
  countryName: "Canada",
} as const;

/** One-line form, for meta text and anywhere a block layout won't fit. */
export const ADDRESS_ONE_LINE = `${ADDRESS.street}, ${ADDRESS.locality}, ${ADDRESS.region} ${ADDRESS.postalCode}, ${ADDRESS.countryName}`;

/**
 * The link-preview image — og:image and twitter:image.
 *
 * Defined once and spread into every page's `openGraph`, because Next.js
 * *overwrites* the openGraph object rather than deep-merging it: a page that
 * declares its own openGraph without `images` drops the one inherited from
 * app/layout.tsx, and the page ends up with no og:image at all.
 *
 * The URL is absolute. Relative paths resolve against metadataBase, but
 * several scrapers (WhatsApp and older LinkedIn among them) do not follow
 * that, and simply skip the tag.
 *
 * NOTE: WhyCrew.jpeg is the 800x800 square logo, so it is letterboxed or
 * centre-cropped in the 1.91:1 slot `summary_large_image` expects. Replacing
 * it with a purpose-made 1200x630 image is the remaining task here — swap the
 * three values below and every page follows.
 */
export const OG_IMAGE = [
  {
    url: "https://www.whycrew.com/WhyCrew.jpeg",
    width: 800,
    height: 800,
    alt: "WhyCrew — the engineering partner behind independent security teams",
  },
];

export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || "";

/**
 * Where every "Book a call" CTA points.
 *
 * These open the phone dialler, so the number behind every CTA is the same one
 * printed in the footer — one number to change, in SITE.phone.
 *
 * NEXT_PUBLIC_BOOKING_URL is deliberately bypassed. If a Cal.com / Calendly
 * link is set in Vercel it no longer reaches these buttons. To hand the CTAs
 * back to the booking flow, restore:
 *
 *   export const CTA_HREF = BOOKING_URL || "/contact";
 *   export const IS_EXTERNAL_CTA = Boolean(BOOKING_URL);
 */
export const CTA_HREF = `tel:${SITE.phone}`;
export const IS_EXTERNAL_CTA = false;

/** GA4 property carried over from the previous deployment. */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-BNMPZB5NQN";

/**
 * Microsoft Clarity project — session recordings and heatmaps, alongside GA4.
 * Unset the env var to an empty string to switch it off without a code change;
 * the tag is skipped entirely rather than loaded with no project.
 */
export const CLARITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "y7w4w5shbx";

/**
 * Google Tag Manager container. Tags added in the GTM UI then ship without a
 * deploy. Set the env var to an empty string to switch it off without a code
 * change; both halves of the snippet (the loader in components/analytics.tsx
 * and the <noscript> iframe in app/layout.tsx) are skipped entirely.
 *
 * NOTE: GA4 above is loaded directly by the page. If a GA4 tag for the same
 * property is also configured inside this container, every pageview is counted
 * twice — load GA4 in one place, not both.
 */
export const GTM_CONTAINER_ID =
  process.env.NEXT_PUBLIC_GTM_CONTAINER_ID ?? "GTM-PVSVFHH3";

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
  { label: "Blog", href: "/blog" },
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
