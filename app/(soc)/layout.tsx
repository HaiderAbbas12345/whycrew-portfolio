import type { Metadata } from "next";
import { RootShell } from "@/components/RootShell";
import { JsonLd } from "@/components/JsonLd";
import { faqPageSchema } from "@/lib/schema";
import { baseMetadata } from "@/lib/metadata";
import { SOC_FAQS } from "@/lib/faqs";

export const metadata: Metadata = baseMetadata;

/** Root layout for the SOC buyer's guide. Its <head> carries that page's FAQPage node. */
export default function SocLayout({ children }: { children: React.ReactNode }) {
  return <RootShell headExtra={<JsonLd schema={faqPageSchema(SOC_FAQS)} />}>{children}</RootShell>;
}
