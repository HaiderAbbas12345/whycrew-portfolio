import { SITE } from "@/lib/site";

/**
 * Served as a route rather than app/robots.ts because the MetadataRoute.Robots
 * object has no field for Content-Signal, the line that says how AI systems
 * may use the content. The Host line the old file emitted is gone: only
 * Yandex ever read it, and it has since dropped it too.
 */

export const dynamic = "force-static";

const BODY = `User-Agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=yes
Allow: /
Disallow: /api/
Disallow: /admin

Sitemap: ${SITE.url}/sitemap.xml
`;

export function GET() {
  return new Response(BODY, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
