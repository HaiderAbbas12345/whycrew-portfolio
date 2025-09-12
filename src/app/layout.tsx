import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title:
    "WhyCrew - Cybersecurity & AI Development Company | Enterprise Solutions",
  description:
    "Leading cybersecurity and AI development company specializing in mission-critical enterprise platforms. Expert team builds SIEM, threat detection, and AI-powered security solutions for global organizations.",
  keywords:
    "cybersecurity development company, AI development services, SIEM development, threat detection platform, cybersecurity consulting, enterprise security solutions, AI cybersecurity, security platform development, cybersecurity experts, AI specialists",
  authors: [{ name: "WhyCrew" }],
  creator: "WhyCrew",
  publisher: "WhyCrew",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "https://whycrew.com"),
  openGraph: {
    title:
      "WhyCrew - Cybersecurity & AI Development Company | Enterprise Solutions",
    description:
      "Leading cybersecurity and AI development company specializing in mission-critical enterprise platforms.",
    url: "/",
    siteName: "WhyCrew",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WhyCrew - Elite Tech Talent",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "WhyCrew - Cybersecurity & AI Development Company | Enterprise Solutions",
    description:
      "Leading cybersecurity and AI development company specializing in mission-critical enterprise platforms.",
    images: ["/og-image.jpg"],
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
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  );
}
