import type { NextConfig } from "next";

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
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
