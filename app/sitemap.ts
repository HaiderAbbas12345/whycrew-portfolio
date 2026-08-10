import type { MetadataRoute } from "next";

const BASE_URL = "https://whycrew.com";

const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/for-mssps", priority: 0.9 },
  { path: "/security-products", priority: 0.8 },
  { path: "/workflow-automation", priority: 0.8 },
  { path: "/ai-workflows", priority: 0.8 },
  { path: "/integrations", priority: 0.8 },
  { path: "/case-studies", priority: 0.8 },
  { path: "/best-soc-platform-builders-mssps-2025", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
