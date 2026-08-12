import type { Metadata } from "next";
import { RootShell } from "@/components/RootShell";
import { JsonLd } from "@/components/JsonLd";
import { faqPageSchema } from "@/lib/schema";
import { baseMetadata } from "@/lib/metadata";
import { HOME_FAQS } from "@/lib/faqs";

export const metadata: Metadata = baseMetadata;

/** Root layout for the home page. Its <head> carries the home FAQPage node. */
export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootShell headExtra={<JsonLd schema={faqPageSchema(HOME_FAQS)} />}>{children}</RootShell>
  );
}
