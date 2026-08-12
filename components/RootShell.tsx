import Script from "next/script";
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "@/app/globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollTop } from "@/components/ScrollTop";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, reviewSchema, websiteSchema } from "@/lib/schema";

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

/**
 * The single <html> shell, shared by every route group's root layout.
 *
 * The app is split into route groups so that each group gets its own root
 * layout and therefore its own <head> — that is the only way a page-specific
 * node like FAQPage can be emitted into <head>, since the root layout renders
 * before the page and cannot otherwise know what the page contains. Groups pass
 * their page-specific structured data in through `headExtra`.
 *
 * Trade-off this buys: navigating between two route groups is a full document
 * load rather than a client-side transition.
 */
export function RootShell({
  children,
  headExtra,
}: {
  children: React.ReactNode;
  headExtra?: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        {/* Site-wide structured data. Organization and Review share one @id and
            merge into a single entity; WebSite points back at it via publisher. */}
        <JsonLd schema={organizationSchema} />
        <JsonLd schema={reviewSchema} />
        <JsonLd schema={websiteSchema} />
        {headExtra}

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
