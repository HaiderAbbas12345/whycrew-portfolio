import type { Metadata } from "next";
import { RootShell } from "@/components/RootShell";
import { baseMetadata } from "@/lib/metadata";

export const metadata: Metadata = baseMetadata;

/** Root layout for every page without an FAQ section — no FAQPage node. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <RootShell>{children}</RootShell>;
}
