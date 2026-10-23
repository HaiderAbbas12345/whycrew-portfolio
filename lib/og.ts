import { POSTS, postPath } from "./blog";
import { CASE_STUDIES } from "./case-studies";
import { LEGAL_PAGES } from "./legal";
import { SERVICES, SITE } from "./site";

/**
 * Link-preview images — og:image, twitter:image and the Article `image`.
 *
 * Every indexable page gets its own 1200x630 card, rendered at build time by
 * app/og/[...path]/route.tsx from the entry below: an eyebrow and the page
 * title on the brand background. The square 800x800 logo the site used to
 * share everywhere was letterboxed or centre-cropped in the 1.91:1 slot that
 * `summary_large_image` expects.
 *
 * A page registers here by path; posts, case studies, services and policy
 * pages register themselves from their own registries. A path missing from
 * this map has no card (the route 404s), so a new static page needs a line in
 * STATIC_PAGES.
 */

export interface OgCard {
  eyebrow: string;
  title: string;
}

const STATIC_PAGES: Record<string, OgCard> = {
  "/": { eyebrow: "WhyCrew", title: "Own Your SIEM & SOC Platform" },
  "/about": {
    eyebrow: "About",
    title: "The Engineering Partner Behind Independent Security Teams",
  },
  "/services": {
    eyebrow: "Services",
    title: "Security Platforms You Own Outright",
  },
  "/resources": {
    eyebrow: "Resources",
    title: "Guides, Case Studies and Tools for Security Teams",
  },
  "/blog": {
    eyebrow: "Blog",
    title: "Engineering Guides on SIEM, SOAR, AI SOC and MSSP Economics",
  },
  "/case-studies": {
    eyebrow: "Case Studies",
    title: "Measured Results From Completed Engagements",
  },
  "/contact": { eyebrow: "Contact", title: "Talk to an Engineer, Not a Sales Rep" },
  "/careers": { eyebrow: "Careers", title: "Engineering Roles, No Sales Team" },
  "/support": {
    eyebrow: "Client Support",
    title: "Platform Support and 24/7 Incident Line",
  },
};

export const OG_CARDS: Record<string, OgCard> = {
  ...STATIC_PAGES,
  ...Object.fromEntries(
    SERVICES.map((s) => [s.href, { eyebrow: "Service", title: s.name }])
  ),
  ...Object.fromEntries(
    POSTS.map((p) => [
      postPath(p),
      { eyebrow: p.section === "resources" ? "Guide" : "Blog", title: p.title },
    ])
  ),
  ...Object.fromEntries(
    CASE_STUDIES.map((c) => [
      `/case-studies/${c.slug}`,
      { eyebrow: "Case Study", title: c.title },
    ])
  ),
  ...Object.fromEntries(
    LEGAL_PAGES.map((l) => [`/${l.slug}`, { eyebrow: "Policy", title: l.title }])
  ),
};

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

/** Absolute URL of a page's card. The homepage's file is /og/home.png. */
export const ogImageUrl = (path: string) =>
  `${SITE.url}/og${path === "/" ? "/home" : path}.png`;

/**
 * The `images` value for a page's openGraph and twitter metadata. Absolute,
 * because several scrapers (WhatsApp and older LinkedIn among them) don't
 * resolve relative URLs against metadataBase and simply skip the tag.
 */
export const ogImage = (path: string) => [
  {
    url: ogImageUrl(path),
    width: OG_WIDTH,
    height: OG_HEIGHT,
    alt: OG_CARDS[path]?.title ?? SITE.name,
  },
];

/** The schema.org `image` for an Article on this path. */
export const ogImageLd = (path: string) => ({
  "@type": "ImageObject",
  url: ogImageUrl(path),
  width: OG_WIDTH,
  height: OG_HEIGHT,
});
