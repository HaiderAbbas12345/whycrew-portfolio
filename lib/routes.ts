/**
 * Single source of truth for every indexable route. Used by the sitemap and by
 * the breadcrumb helpers, so a new page can't quietly go missing from either.
 */
export type Route = {
  path: string;
  /** Sitemap priority — the flagship and pillar pages carry the weight. */
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
};

export const ROUTES: Route[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/for-mssps", priority: 0.95, changeFrequency: "weekly" },
  { path: "/best-soc-platform-builders-mssps-2025", priority: 0.9, changeFrequency: "monthly" },
  { path: "/case-studies", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/ai-workflows", priority: 0.7, changeFrequency: "monthly" },
  { path: "/security-products", priority: 0.7, changeFrequency: "monthly" },
  { path: "/integrations", priority: 0.6, changeFrequency: "monthly" },
  { path: "/workflow-automation", priority: 0.6, changeFrequency: "monthly" },
];
