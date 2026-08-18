import type { Metadata } from "next";
import { SITE } from "./site";

/**
 * Builds per-page metadata with a canonical URL and page-specific Open Graph
 * tags. Without this every route inherits the root layout's OG block, so every
 * shared link renders as the homepage regardless of what was actually shared.
 */
export function pageMeta({
  path,
  title,
  description,
  ogTitle,
  keywords,
}: {
  path: string;
  title: string;
  description: string;
  /** Defaults to `title — WhyCrew`, matching the browser title template. */
  ogTitle?: string;
  keywords?: string[];
}): Metadata {
  const url = `${SITE.url}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url,
      siteName: SITE.name,
      title: ogTitle ?? `${title} — ${SITE.name}`,
      description,
      images: ["/logo.jpeg"],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? `${title} — ${SITE.name}`,
      description,
    },
  };
}
