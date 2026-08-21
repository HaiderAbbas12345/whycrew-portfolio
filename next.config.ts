import type { NextConfig } from "next";

/**
 * Content Security Policy.
 *
 * Scope note: this constrains what the *browser* may load. Server-side calls —
 * Resend in lib/email.ts, MongoDB in lib/leads-mongo.ts — are made by Node, not
 * the page, so no CSP directive can block them. Only things the browser
 * fetches need to appear below.
 *
 * What the site actually loads, and why each directive is here:
 *   script-src   GA4 (components/analytics.tsx) pulls gtag from
 *                googletagmanager.com and it beacons to google-analytics.com.
 *   style-src    'unsafe-inline' — Next injects critical CSS inline, and
 *                framer-motion writes inline styles on every animated element.
 *   font-src     'self' is enough: next/font/google self-hosts Inter and
 *                JetBrains Mono at build time, so nothing is fetched from
 *                fonts.gstatic.com at runtime.
 *   img-src      https: is broad, but OG/blog imagery may come from anywhere.
 *   connect-src  'self' covers the contact form POST and the /admin server
 *                actions. vercel-insights is listed so enabling Speed Insights
 *                later does not silently start failing.
 *
 * 'unsafe-inline' in script-src is required by the inline gtag bootstrap and
 * the JSON-LD blocks. The stricter fix is a per-request nonce, but that forces
 * dynamic rendering and would cost the static prerendering every page here
 * currently gets — not a good trade for a marketing site.
 */
const isDev = process.env.NODE_ENV !== "production";

const CSP = [
  "default-src 'self'",
  // 'unsafe-eval' is only needed by the dev-server's hot reload; production
  // runs without it.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://vitals.vercel-insights.com",
  "frame-ancestors 'self'",
  // Not in the original draft, all cheap and worth having:
  "base-uri 'self'", // blocks an injected <base> rewriting every relative URL
  "form-action 'self'", // stops a posted form being retargeted off-site
  "object-src 'none'", // no Flash/applet plugin surface
]
  .join("; ")
  .concat(";");

/**
 * Report-Only until proven clean.
 *
 * In this mode the browser reports violations to the console but blocks
 * nothing, so a directive that is too tight cannot take the site down. Watch
 * the console on the homepage, /contact (submit the form), and /admin (sign
 * in). When there are no reports, set CSP_ENFORCE=true in the environment to
 * switch to the enforcing header — no code change needed.
 */
const CSP_HEADER =
  process.env.CSP_ENFORCE === "true"
    ? "Content-Security-Policy"
    : "Content-Security-Policy-Report-Only";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  /**
   * Permanent redirects from the previous site's URLs. Every one of these was
   * live and indexed before the v2 cutover — without them they 404 and any
   * accumulated ranking and backlinks are lost. Each points at the closest
   * equivalent page rather than dumping everything on the homepage, which
   * preserves far more link equity.
   */
  async redirects() {
    return [
      { source: "/for-mssps", destination: "/services/mssp-engineering-partner", permanent: true },
      {
        source: "/best-soc-platform-builders-mssps-2025",
        destination: "/services/mssp-engineering-partner",
        permanent: true,
      },
      { source: "/security-products", destination: "/services/custom-siem-soar-development", permanent: true },
      { source: "/integrations", destination: "/services/custom-siem-soar-development", permanent: true },
      { source: "/ai-workflows", destination: "/services/ai-powered-soc-automation", permanent: true },
      { source: "/workflow-automation", destination: "/services/ai-powered-soc-automation", permanent: true },
      { source: "/case-studies", destination: "/#results", permanent: true },
      // /blog has no index of its own — Resources is the hub.
      { source: "/blog", destination: "/resources", permanent: false },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Kept alongside frame-ancestors below: the CSP directive is what
          // modern browsers obey, this is the fallback for older ones.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: CSP_HEADER, value: CSP },
        ],
      },
    ];
  },
};

export default nextConfig;
