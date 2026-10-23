import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BookingModalProvider } from "@/components/booking-modal";
import { Analytics } from "@/components/analytics";
import { CookieConsent } from "@/components/cookie-consent";
import { organizationLd, websiteLd } from "@/lib/jsonld";
import { BING_SITE_VERIFICATION, GOOGLE_SITE_VERIFICATION, SITE } from "@/lib/site";
import { ogImage } from "@/lib/og";
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
  // No alternates.canonical, openGraph.url or robots here. The 404 page
  // inherits this object, and those three made every unknown URL claim to be
  // the indexable homepage. Each page declares its own (robots via ROBOTS in
  // lib/site.ts).
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    title: "Custom Security Platform Development for MSSPs | WhyCrew",
    description: SITE.description,
    images: ogImage("/"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Security Platform Development for MSSPs | WhyCrew",
    description: SITE.description,
    images: ogImage("/"),
  },
  icons: {
    icon: "/WhyCrew.jpeg",
    apple: "/WhyCrew.jpeg",
  },
  category: "technology",
  // Carried over from the previous deployment so Search Console ownership and
  // the existing property survive the cutover.
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
    // `other` is how the Metadata API emits a name/content pair verbatim —
    // there is no first-class `bing` key, and msvalidate.01 must render with
    // that exact name for Bing to match it.
    other: { "msvalidate.01": BING_SITE_VERIFICATION },
  },
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
        <BookingModalProvider />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd()) }}
        />

        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
