import { SITE, SITE_URL, TESTIMONIALS, abs } from "./site";

/**
 * schema.org structured data.
 *
 * One canonical Organization node lives in the root layout under a stable @id.
 * Every other node on every other page references it by that @id instead of
 * repeating the organization inline, so crawlers resolve one entity rather than
 * a dozen look-alikes.
 *
 * The site-wide nodes are emitted as separate <script> tags rather than one
 * @graph. Organization and Review are two documents sharing the ORG_ID @id;
 * JSON-LD merges same-@id nodes across scripts into a single entity, so the
 * review still attaches to the same organization Google resolves from the
 * first script.
 */

export const ORG_ID = abs("/#organization");
export const WEBSITE_ID = abs("/#website");

/** Reference to the canonical Organization node. Use anywhere an org is expected. */
export const ORG_REF = { "@id": ORG_ID } as const;

/** Built from the same array the home page renders, so markup matches the page. */
const reviews = TESTIMONIALS.map((t) => ({
  "@type": "Review",
  reviewRating: { "@type": "Rating", ratingValue: String(t.rating), bestRating: "5" },
  author: {
    "@type": "Person",
    name: t.author,
    jobTitle: t.role,
    worksFor: { "@type": "Organization", name: t.company },
  },
  reviewBody: t.quote,
  itemReviewed: ORG_REF,
}));

/** Averaged over the same TESTIMONIALS the page renders, so the two can't drift. */
const aggregateRating = {
  "@type": "AggregateRating",
  ratingValue: (
    TESTIMONIALS.reduce((sum, t) => sum + t.rating, 0) / TESTIMONIALS.length
  ).toFixed(1),
  bestRating: "5",
  ratingCount: String(TESTIMONIALS.length),
  reviewCount: String(TESTIMONIALS.length),
};

/** Script 1 — the canonical Organization entity. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE.name,
  legalName: SITE.name,
  url: `${SITE_URL}/`,
  logo: {
    "@type": "ImageObject",
    "@id": abs("/#logo"),
    url: abs("/logo.jpeg"),
    width: 512,
    height: 512,
  },
  image: { "@id": abs("/#logo") },
  description:
    "WhyCrew is an engineering partner that builds custom SIEM platforms, AI-powered SOC automation, white-label MSSP platforms, and NIS2/DORA compliance automation, and delivers each one as a fully owned asset to MSSPs and regulated infrastructure operators.",
  foundingLocation: {
    "@type": "Place",
    address: { "@type": "PostalAddress", addressCountry: "EU" },
  },
  areaServed: { "@type": "Place", name: "Worldwide" },
  knowsAbout: [
    "SIEM Development",
    "SOAR Automation",
    "AI SOC Agents",
    "NIS2 Compliance",
    "DORA Compliance",
    "MSSP Engineering",
    "Cybersecurity Platform Development",
  ],
  sameAs: ["https://www.linkedin.com/company/whycrew", "https://twitter.com/whycrew"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: SITE.email,
    url: abs("/#contact"),
    availableLanguage: ["English"],
  },
};

/** Script 2 — reviews, merged onto the Organization above by shared @id. */
export const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE.name,
  review: reviews,
  aggregateRating,
};

/** Script 3 — the WebSite entity, published by the Organization above. */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE.name,
  description: SITE.tagline,
  publisher: ORG_REF,
  inLanguage: "en",
};

export function faqPageSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  };
}

export function articleSchema({
  headline,
  description,
  path,
}: {
  headline: string;
  description: string;
  path: string;
}) {
  return {
    "@type": "Article",
    headline,
    description,
    author: ORG_REF,
    publisher: ORG_REF,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: abs(path),
  };
}

/** Wraps page-level nodes into a single @context-carrying graph. */
export const graph = (...nodes: object[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});
