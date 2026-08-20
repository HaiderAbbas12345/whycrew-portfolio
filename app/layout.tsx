import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Analytics } from "@/components/analytics";
import { organizationLd, websiteLd } from "@/lib/jsonld";
import { GOOGLE_SITE_VERIFICATION, OG_IMAGE, SITE } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jb",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Custom Security Platform Development for MSSPs | WhyCrew",
    template: "%s | WhyCrew",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "MSSP engineering partner",
    "custom SIEM development",
    "SOAR development",
    "AI SOC automation",
    "white-label MSSP platform",
    "NIS2 compliance automation",
    "DORA compliance automation",
    "Splunk migration",
    "Microsoft Sentinel migration",
    "QRadar migration",
    "multi-tenant SIEM",
    "security data lake",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE.url,
    title: "Custom Security Platform Development for MSSPs | WhyCrew",
    description: SITE.description,
    images: OG_IMAGE,
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Security Platform Development for MSSPs | WhyCrew",
    description: SITE.description,
    images: OG_IMAGE,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/WhyCrew.jpeg",
    apple: "/WhyCrew.jpeg",
  },
  category: "technology",
  // Carried over from the previous deployment so Search Console ownership and
  // the existing property survive the cutover.
  verification: { google: GOOGLE_SITE_VERIFICATION },
};

export const viewport: Viewport = {
  themeColor: "#04060d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="wc-noise antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>

        <Nav />
        <main id="main">{children}</main>
        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd()) }}
        />

        <Analytics />
      </body>
    </html>
  );
}
