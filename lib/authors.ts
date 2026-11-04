import { POSTS, postPath } from "./blog";
import { CASE_STUDIES } from "./case-studies";
import { SITE } from "./site";

/**
 * Author registry. Each author gets a page at /author/<slug>, and every
 * article's byline links there.
 *
 * Posts and case studies name their author by slug (`author` in lib/blog.ts
 * and lib/case-studies.ts); leaving it out means DEFAULT_AUTHOR. To add an
 * author: add an entry here, then set `author: "<slug>"` on their posts.
 */

export interface Author {
  slug: string;
  name: string;
  role: string;
  /** Under public/. */
  avatar: string;
  linkedin: string;
  bio: string;
}

export const AUTHORS: Author[] = [
  {
    slug: "whycrew-engineers",
    name: "WhyCrew Engineers",
    role: "SIEM, SOAR & AI SOC Engineering Team",
    avatar: "/WhyCrew.jpeg",
    linkedin: "https://www.linkedin.com/company/whycrew",
    bio: "WhyCrew is an engineering firm that builds custom SIEM, SOAR, and AI-powered SOC platforms, then hands full ownership over to the client instead of renting it back as a subscription. The team works with MSSPs and regulated operators across Europe, Saudi Arabia, and North America, building in compliance for NIS2, DORA, and NCA ECC/SAMA CSF from day one, with deployments typically live in 12 weeks.",
  },
];

export const DEFAULT_AUTHOR = "whycrew-engineers";

export const authorPath = (slug: string) => `/author/${slug}`;

export function authorBySlug(slug: string = DEFAULT_AUTHOR): Author {
  const a = AUTHORS.find((x) => x.slug === slug);
  if (!a) throw new Error(`Unknown author: ${slug}`);
  return a;
}

/** schema.org author for an Article's JSON-LD, pointing at the author page. */
export function authorLd(slug: string = DEFAULT_AUTHOR) {
  const a = authorBySlug(slug);
  return {
    "@type": "Organization",
    "@id": `${SITE.url}${authorPath(a.slug)}#author`,
    name: a.name,
    url: `${SITE.url}${authorPath(a.slug)}`,
  };
}

export interface AuthoredItem {
  kind: "Blog" | "Guide" | "Case Study";
  title: string;
  summary: string;
  path: string;
  datePublished: string;
  readTime: string;
  topic: string;
}

/** Everything an author wrote — posts, guides and case studies — newest first. */
export function itemsByAuthor(slug: string): AuthoredItem[] {
  const posts = POSTS.filter((p) => (p.author ?? DEFAULT_AUTHOR) === slug).map(
    (p): AuthoredItem => ({
      kind: p.section === "resources" ? "Guide" : "Blog",
      title: p.title,
      summary: p.summary,
      path: postPath(p),
      datePublished: p.datePublished,
      readTime: p.readTime,
      topic: p.topics[0] ?? p.cluster,
    })
  );
  const studies = CASE_STUDIES.filter(
    (c) => (c.author ?? DEFAULT_AUTHOR) === slug
  ).map(
    (c): AuthoredItem => ({
      kind: "Case Study",
      title: c.title,
      summary: c.summary,
      path: `/case-studies/${c.slug}`,
      datePublished: c.datePublished,
      readTime: c.readTime,
      topic: c.topics[0] ?? "Case Study",
    })
  );
  return [...posts, ...studies].sort((a, b) =>
    b.datePublished.localeCompare(a.datePublished)
  );
}
