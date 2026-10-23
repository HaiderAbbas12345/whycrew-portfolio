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
  /** Privacy, terms, and cookie enquiries — the address the policy pages give. */
  legalEmail: "legal@whycrew.com",
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
 * robots / googlebot for every indexable page.
 *
 * Set per page rather than once in app/layout.tsx, because the 404 page
 * inherits the root layout's metadata: with this in the layout, every unknown
 * URL served Next's own `noindex` alongside "index, follow" and a googlebot
 * line — two contradictory directives on one page. The same goes for the
 * canonical and og:url, which each page also declares itself.
 */
export const ROBOTS = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
  },
};

/*
 * Link-preview images (og:image, twitter:image) are per page — see lib/og.ts.
 */

export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || "";

/**
 * The rel for every link that leaves whycrew.com.
 *
 * nofollow because an outbound link is not an endorsement — none of ours are
 * editorial recommendations we mean to pass ranking signal to, and the Terms
 * of Use say exactly that: "We do not control, endorse, or take responsibility
 * for the content, accuracy, or practices of any third-party site."
 *
 * noopener noreferrer because a page opened with target="_blank" can otherwise
 * reach back through window.opener and navigate the tab it came from.
 *
 * Anything rendering an off-site anchor should use this rather than spelling
 * the value out, so a link cannot be added later that quietly skips nofollow.
 */
export const EXTERNAL_REL = "nofollow noopener noreferrer";

/** WhyCrew's Microsoft Bookings page — the default CTA destination. */
const OUTLOOK_BOOKING_URL =
  "https://bookings.cloud.microsoft/bookwithme/user/fc18944866164d86b10284f39503c65e@whycrew.com/meetingtype/9MYETObQEEGGKKO1yo4Bag2?bookingcode=473be50e-ed05-4c93-8378-0175bed3d856&anonymous&ismsaljsauthenabled&ep=mlink";

/**
 * The calendar itself. Offered inside the booking popup once the visitor's
 * details are in, for anyone who wants to pick a slot straight away.
 *
 * NEXT_PUBLIC_BOOKING_URL still wins when it is set, so a Cal.com or Calendly
 * link can replace the Bookings page from the environment without a code change.
 */
export const BOOKING_PAGE_URL = BOOKING_URL || OUTLOOK_BOOKING_URL;

/**
 * Where every "Book a call" CTA points.
 *
 * With JavaScript running, BookingModalProvider intercepts any click on a link
 * to this href and opens the booking popup in place — the visitor never leaves
 * the page. Without it, the link still lands on the contact form, so the CTA
 * is never dead.
 *
 * Use this constant for every booking CTA rather than spelling the path out:
 * the popup matches on the exact href.
 */
export const CTA_HREF = "/contact#form";

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

/**
 * Bing Webmaster Tools ownership token, rendered as
 * <meta name="msvalidate.01">. Bing re-checks this periodically, so it has to
 * stay on the page after verification, not just until it passes.
 */
export const BING_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ||
  "CAA8F38C34158D4E79236F1ADADCAF0A";

export const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL || "";
export const FOUNDER_LINKEDIN = process.env.NEXT_PUBLIC_FOUNDER_LINKEDIN || "";

export type ServiceKey =
  | "custom-siem-development"
  | "custom-soar-development"
  | "ai-powered-soc-automation"
  | "mssp-engineering-partner"
  | "nis2-dora-compliance-automation"
  | "nca-ecc-sama-csf-compliance";

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
    slug: "custom-siem-development",
    href: "/services/custom-siem-development",
    name: "Custom SIEM Development",
    navLabel: "Custom SIEM Development",
    short: "Stop renting your SIEM capability",
    blurb:
      "A security data lake, custom detection logic tuned to your environment, and zero-downtime migration off Splunk, Sentinel, or QRadar — delivered as a platform you own outright, typically live in 12 weeks.",
    metaTitle: "Custom SIEM Development & Migration | WhyCrew",
    metaDescription:
      "Custom SIEM development around your log sources, retention, and compliance needs, with zero-downtime migration off Splunk, Sentinel, or QRadar.",
  },
  {
    slug: "custom-soar-development",
    href: "/services/custom-soar-development",
    name: "Custom SOAR Development",
    navLabel: "Custom SOAR Development",
    short: "Turn manual triage into automated playbooks",
    blurb:
      "SOAR playbooks built around your actual escalation paths, ticketing system, and chat tools — handed over as an automation library you own and extend, not a licensed platform.",
    metaTitle: "Custom SOAR Development & Integration | WhyCrew",
    metaDescription:
      "Custom SOAR development with playbooks and connectors built for your SIEM, EDR, and ticketing tools, plus audit trails ready for NIS2 and DORA.",
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
  {
    slug: "nca-ecc-sama-csf-compliance",
    href: "/services/nca-ecc-sama-csf-compliance",
    name: "NCA ECC & SAMA CSF Compliance",
    navLabel: "NCA ECC & SAMA CSF",
    short: "Own the SIEM your NCA ECC and SAMA CSF audit runs on",
    blurb:
      "A SIEM and SOC platform built to satisfy NCA ECC Control 2-12 and SAMA CSF Subdomain 3.14 — owned outright, audit-ready, with zero ongoing licensing fees.",
    metaTitle: "NCA ECC & SAMA CSF Compliance: Own Your SIEM | WhyCrew",
    metaDescription:
      "Stop licensing a SIEM for NCA ECC and SAMA CSF compliance. WhyCrew builds one you own outright, audit-ready, with zero ongoing fees.",
  },
];

export const serviceBySlug = (slug: ServiceKey) =>
  SERVICES.find((s) => s.slug === slug)!;

export const PRIMARY_NAV = [
  { label: "Services", href: "/services", hasMenu: true },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "Case Studies", href: "/case-studies" },
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
