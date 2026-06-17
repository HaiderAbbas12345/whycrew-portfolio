import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollTop } from "@/components/ScrollTop";

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
  metadataBase: new URL("https://whycrew.com"),
  title: {
    default: "WhyCrew — Security & AI engineering partner for MSSPs",
    template: "%s — WhyCrew",
  },
  description:
    "WhyCrew is a security and AI engineering partner for MSSPs and teams where sensitive data is the whole problem. We automate SOC operations, integrate tooling, deploy AI agents, and build owned security platforms.",
  icons: { icon: "/icon.jpeg", apple: "/icon.jpeg" },
  openGraph: {
    type: "website",
    url: "https://whycrew.com",
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
