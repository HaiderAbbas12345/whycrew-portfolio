import { SITE } from "./site";

/**
 * schema.org builders. AI answer engines lean on structured data to work out
 * what an entity *is* and whether to cite it, so these carry real weight for
 * AEO — not just for classic rich results.
 */

const ORG_ID = `${SITE.url}/#organization`;

export function organizationSchema() {
  const sameAs = [SITE.linkedin].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.jpeg`,
    description:
      "WhyCrew is a security and AI engineering partner for MSSPs. We build owned, multi-tenant, AI-native security platforms so providers can stop renting Splunk, Sentinel, or QRadar.",
    email: SITE.email,
    founder: {
      "@type": "Person",
      "@id": `${SITE.url}/about#yasir-abbas`,
      name: "Yasir Abbas",
      jobTitle: "Founder",
    },
    ...(sameAs.length ? { sameAs } : {}),
    knowsAbout: [
      "Security Information and Event Management",
      "Managed Security Service Providers",
      "SOC platform engineering",
      "Multi-tenant security architecture",
      "Agentic AI for security operations",
      "Malware research",
      "Threat intelligence",
      "Data sovereignty and residency",
    ],
    areaServed: [
      { "@type": "Place", name: "Europe" },
      { "@type": "Place", name: "United States" },
      { "@type": "Place", name: "Middle East" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SITE.email,
      url: `${SITE.url}/contact`,
      availableLanguage: ["English"],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function serviceSchema({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: `${SITE.url}${path}`,
    provider: { "@id": ORG_ID },
    areaServed: ["Europe", "United States", "Middle East"],
    audience: {
      "@type": "BusinessAudience",
      name: "Managed Security Service Providers",
    },
  };
}

/**
 * Person schema for named leadership. This is the entity signal the audit found
 * missing entirely — with no named people, "malware-research & threat-intel
 * engineers" was a claim nothing could corroborate.
 */
export function personSchema(p: {
  name: string;
  role: string;
  photo?: string;
  lede: string;
  focus?: string[];
  linkedin?: string;
}) {
  const sameAs = [p.linkedin].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.url}/about#${p.name.toLowerCase().replace(/\s+/g, "-")}`,
    name: p.name,
    jobTitle: p.role,
    description: p.lede,
    url: `${SITE.url}/about`,
    ...(p.photo ? { image: `${SITE.url}${p.photo}` } : {}),
    worksFor: { "@id": ORG_ID },
    ...(p.focus?.length ? { knowsAbout: p.focus } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: `${SITE.url}${step.path === "/" ? "" : step.path}`,
    })),
  };
}
