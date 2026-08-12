import type { Metadata } from "next";
import { SITE_URL } from "./site";

/**
 * Shared root metadata. Every route group has its own root layout, and each one
 * must export this — otherwise the group loses metadataBase, the title
 * template, and the OG defaults.
 */
export const baseMetadata: Metadata = {
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
