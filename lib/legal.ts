/**
 * Policy-page registry and the cookie inventory behind the consent banner.
 *
 * The three policy documents cross-reference each other and all carry the same
 * "Last updated" date and contact block, so those live here rather than being
 * retyped in each page. Revising a policy is a one-line date change.
 */

export interface LegalPage {
  slug: string;
  /** <h1> on the page. */
  title: string;
  /** Exact <title> from the policy document. */
  metaTitle: string;
  /** Exact meta description from the policy document. */
  metaDescription: string;
  /** Footer label — shorter than the <h1> where the heading is a sentence. */
  navLabel: string;
  /** ISO date, rendered as "Last updated". */
  lastUpdated: string;
}

export const LEGAL_PAGES: LegalPage[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    metaTitle: "Privacy Policy - WhyCrew",
    metaDescription:
      "How WhyCrew collects, uses, and protects personal data, and the rights you have under GDPR.",
    navLabel: "Privacy Policy",
    lastUpdated: "2026-09-04",
  },
  {
    slug: "terms-of-use",
    title: "Terms of Use",
    metaTitle: "Terms of Use - WhyCrew",
    metaDescription:
      "The terms that govern your use of whycrew.com and WhyCrew's services.",
    navLabel: "Terms of Use",
    lastUpdated: "2026-09-04",
  },
  {
    slug: "cookie-policy",
    title: "How WhyCrew Uses Cookies",
    metaTitle: "How WhyCrew Uses Cookies - WhyCrew",
    metaDescription:
      "What cookies whycrew.com uses, why, and how to manage your preferences.",
    navLabel: "Cookie Policy",
    lastUpdated: "2026-09-04",
  },
];

export const legalBySlug = (slug: string) =>
  LEGAL_PAGES.find((p) => p.slug === slug);

/* ---------------------------------------------------------------------------
 * Cookie inventory
 *
 * Section 3 of the Cookie Policy promises this list lives in the preference
 * centre rather than in the policy text, "so it always reflects what's
 * actually running on the Site". That promise is only kept if this array is
 * updated whenever a tag is added or removed — it is the published inventory,
 * not documentation of one.
 * ------------------------------------------------------------------------- */

export type CookieCategory = "necessary" | "analytics" | "functional";

export interface CookieEntry {
  name: string;
  provider: string;
  purpose: string;
  expiry: string;
}

export interface CookieGroup {
  id: CookieCategory;
  title: string;
  body: string;
  /** Strictly necessary cookies cannot be switched off, per the policy. */
  required: boolean;
  cookies: CookieEntry[];
}

export const COOKIE_GROUPS: CookieGroup[] = [
  {
    id: "necessary",
    title: "Strictly necessary",
    body: "Required for the Site to function — basic security, load balancing, and remembering this cookie choice itself. These do not require consent and cannot be switched off.",
    required: true,
    cookies: [
      {
        name: "wc_cookie_consent",
        provider: "WhyCrew (whycrew.com)",
        purpose:
          "Stores your cookie choice so the banner is not shown again on every page.",
        expiry: "12 months",
      },
    ],
  },
  {
    id: "analytics",
    title: "Performance and analytics",
    body: "Help us understand how visitors use the Site — which pages are read, how long people stay, and whether pages load correctly. Not strictly necessary, and only set with your consent.",
    required: false,
    cookies: [
      {
        name: "_ga, _ga_*",
        provider: "Google Analytics 4 (Google LLC)",
        purpose:
          "Distinguishes visitors and sessions to produce aggregated traffic reports.",
        expiry: "Up to 24 months",
      },
      {
        name: "_clck, _clsk",
        provider: "Microsoft Clarity (Microsoft Corporation)",
        purpose:
          "Records how pages are used — heatmaps and session replay — to find layout and usability problems.",
        expiry: "1 day to 12 months",
      },
      {
        name: "Container-managed tags",
        provider: "Google Tag Manager (Google LLC)",
        purpose:
          "Loads the measurement tags above. The container itself sets no cookie, but the tags it loads do.",
        expiry: "Varies by tag",
      },
    ],
  },
  {
    id: "functional",
    title: "Functional",
    body: "Remember choices you have made on the Site, such as display preferences. We do not currently set any cookie in this category.",
    required: false,
    cookies: [],
  },
];

/**
 * Targeting and advertising cookies get a paragraph in the policy but no
 * toggle, because the policy states plainly that none are used and that the
 * consent options will change before any is set. A switch for a category that
 * does not exist would be the sort of thing it promises not to do.
 */
export const ADVERTISING_NOTE =
  "We do not currently use targeting or advertising cookies on whycrew.com. If that changes, we will update this policy and our consent options before any such cookie is set.";

/** localStorage key holding the visitor's choice. */
export const CONSENT_KEY = "wc_cookie_consent";

/** Bumped when the categories change, which re-asks everyone. */
export const CONSENT_VERSION = 1;

export interface ConsentState {
  version: number;
  analytics: boolean;
  functional: boolean;
  /** ISO timestamp of the choice, so the record shows when it was given. */
  decidedAt: string;
}
