import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/blog";
import { SERVICES, SITE } from "@/lib/site";

const now = new Date();
const BASE_URL = SITE.url.replace(/\/+$/, "");

function safeDate(value: unknown): Date {
  if (!value) return now;
  const d = new Date(value as string);
  return isNaN(d.getTime()) ? now : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...SERVICES.filter((s) => Boolean(s.href)).map((s) => ({
      url: `${BASE_URL}${s.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${BASE_URL}/resources`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...POSTS.filter((p) => Boolean(p.slug)).map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      lastModified: safeDate(p.dateModified ?? p.datePublished),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/careers`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/support`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
