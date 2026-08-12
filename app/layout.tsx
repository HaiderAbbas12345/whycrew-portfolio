import type { Metadata } from "next";
import Script from "next/script";
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollTop } from "@/components/ScrollTop";
import { JsonLd } from "@/components/JsonLd";
import { siteSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const GA_MEASUREMENT_ID = "G-BNMPZB5NQN";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-display",
  display: "swap",
});
const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "WhyCrew — Security & AI engineering partner for MSSPs",
    template: "%s — WhyCrew",
  },
  description:
    "WhyCrew is a security and AI engineering partner for MSSPs and teams where sensitive data is the whole problem. We automate SOC operations, integrate tooling, deploy AI agents, and build owned security platforms.",
  icons: { icon: "/icon.jpeg", apple: "/icon.jpeg" },
  verification: {
    google: "TYYuh-ev2DxwW0Of-KVoqFbn-RkdU6BojgN0dW5lXrg",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "WhyCrew",
    title: "WhyCrew — Engineering for systems you can't get wrong.",
    description:
      "Security, AI, and integrations for MSSPs and teams where sensitive data is the whole problem. Built by security people.",
    images: ["/logo.jpeg"],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className="font-body text-[17px] leading-[1.6] text-text">
        {/* Canonical Organization + WebSite entities, referenced by @id site-wide */}
        <JsonLd schema={siteSchema} />
        <div className="bg-canvas" />
        <div className="bg-grid" />
        <div className="bg-grain" />
        <Nav />
        <main>{children}</main>
        <Footer />
        <ScrollTop />
      </body>
    </html>
  );
}
