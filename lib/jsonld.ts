import { SITE, SERVICES } from "./site";

export interface Faq {
  q: string;
  a: string;
}

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: {
    "@type": "ImageObject",
    url: `${SITE.url}/WhyCrew.jpeg`,
    width: 800,
    height: 800,
  },
  image: `${SITE.url}/WhyCrew.jpeg`,
  description: SITE.description,
  email: SITE.email,
  slogan: "Stop renting. Start owning.",
  // Entity disambiguation — carried over from the previous site's schema.
  sameAs: [
    "https://www.linkedin.com/company/whycrew",
    "https://twitter.com/whycrew",
  ],
  knowsAbout: [
    "SIEM development",
    "SOAR automation",
    "AI SOC automation",
    "MSSP platform engineering",
    "NIS2 compliance",
    "DORA compliance",
    "GDPR data residency",
  ],
  areaServed: [
    { "@type": "Place", name: "Europe" },
    { "@type": "Place", name: "North America" },
    { "@type": "Place", name: "Middle East" },
    { "@type": "Place", name: "Asia-Pacific" },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SITE.email,
      availableLanguage: ["English"],
    },
    {
      "@type": "ContactPoint",
      contactType: "emergency",
      email: SITE.incidentEmail,
      availableLanguage: ["English"],
    },
  ],
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  publisher: { "@id": `${SITE.url}/#organization` },
});

export const serviceListLd = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "WhyCrew engineering services",
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.name,
    url: `${SITE.url}${s.href}`,
  })),
});

export const serviceLd = (opts: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: opts.name,
  description: opts.description,
  serviceType: opts.serviceType,
  url: `${SITE.url}${opts.path}`,
  provider: { "@id": `${SITE.url}/#organization` },
  areaServed: ["Europe", "North America", "Middle East", "Asia-Pacific"],
  audience: {
    "@type": "BusinessAudience",
    audienceType:
      "MSSPs, VARs, financial services, healthcare, and critical infrastructure operators",
  },
});

export const faqLd = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const breadcrumbLd = (trail: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    item: `${SITE.url}${t.path}`,
  })),
});
