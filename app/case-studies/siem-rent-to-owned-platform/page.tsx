import type { Metadata } from "next";
import { CaseStudyShell } from "@/components/case-study/case-study-shell";
import { Bullets, H2, P } from "@/components/blog/prose";
import { breadcrumbLd } from "@/lib/jsonld";
import { breadcrumbLabel, caseStudyBySlug } from "@/lib/case-studies";
import { CTA_HREF, OG_IMAGE, SITE } from "@/lib/site";

const study = caseStudyBySlug("siem-rent-to-owned-platform")!;
const PATH = `/case-studies/${study.slug}`;

export const metadata: Metadata = {
  // `absolute` keeps the title exactly as specified in the content doc — the
  // root layout's "%s | WhyCrew" template would push it past the SERP cutoff.
  title: { absolute: study.metaTitle },
  description: study.metaDescription,
  alternates: { canonical: PATH },
  openGraph: {
    type: "article",
    title: study.metaTitle,
    description: study.metaDescription,
    url: `${SITE.url}${PATH}`,
    publishedTime: study.datePublished,
    modifiedTime: study.dateModified ?? study.datePublished,
    images: OG_IMAGE,
  },
  twitter: {
    card: "summary_large_image",
    title: study.metaTitle,
    description: study.metaDescription,
  },
};

function caseStudyLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE.url}${PATH}#article`,
    headline: study.title,
    name: study.metaTitle,
    description: study.metaDescription,
    url: `${SITE.url}${PATH}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}${PATH}` },
    datePublished: study.datePublished,
    dateModified: study.dateModified ?? study.datePublished,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE.url}/#website` },
    author: { "@id": `${SITE.url}/#organization` },
    publisher: { "@id": `${SITE.url}/#organization` },
    image: `${SITE.url}/WhyCrew.jpeg`,
    articleSection: "Case Study",
    keywords: study.topics.join(", "),
  };
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Case Studies", path: "/case-studies" },
              { name: breadcrumbLabel(study.slug), path: PATH },
            ])
          ),
        }}
      />

      <CaseStudyShell
        study={study}
        cta={{
          heading: "See what a phased migration looks like for your stack",
          body: "If your SIEM costs are rising faster than your customer base, it may be time to evaluate whether your current licensing model still supports your margins. Talk to our team about what a phased migration could look like for your environment.",
          label: "Book an Architecture Audit",
          href: CTA_HREF,
        }}
      >
        <P>
          A growing managed security services provider (MSSP) was facing rising
          costs from a tiered commercial SIEM priced by log ingestion volume. As
          the business expanded, every new customer increased the platform bill,
          putting pressure on margins and making growth more expensive.
        </P>
        <P>
          To solve the problem, WhyCrew designed and deployed a fully owned,
          multi-tenant security operations platform that allowed the MSSP to
          scale more predictably while maintaining operational continuity.
        </P>

        <H2 id="the-challenge">The Challenge</H2>
        <P>
          The MSSP&apos;s detection stack was running on a commercial SIEM with
          tiered pricing tied to ingestion volume. While workable at a smaller
          scale, the model became increasingly expensive as customer growth
          accelerated.
        </P>
        <P>
          Each new client added more log volume, which pushed the company
          further up a pricing curve it did not control. By the time the MSSP
          engaged WhyCrew, projected annual software costs had exceeded
          $180,000, with additional vendor price increases expected over time.
        </P>
        <P>
          This meant growth was no longer improving profitability. Instead, it
          was increasing the cost of the platform supporting each deal.
        </P>

        <H2 id="the-approach">The WhyCrew Approach</H2>
        <P>
          WhyCrew designed and deployed a fully owned, multi-tenant security
          operations platform built around the MSSP&apos;s actual ingestion
          profile and operational needs.
        </P>
        <P>
          The migration was structured to reduce risk and deliver value early:
        </P>
        <Bullets
          items={[
            "The new platform ran in parallel with the legacy SIEM",
            "Customers were migrated progressively, one at a time",
            "High-volume, high-cost log pipelines were moved first to accelerate savings",
            "AI-assisted triage was embedded into the telemetry workflow to reduce repetitive analyst investigation",
            "The MSSP gained full operational control of the platform, its data, and supporting code protections",
          ]}
        />

        <H2 id="the-outcome">The Outcome</H2>
        <P>
          The MSSP realized $110,000 in direct savings in Year 1, with an
          additional $160,000 in projected savings in Year 2 — a total of
          $270,000 across 24 months.
        </P>
        <P>
          Just as importantly, the business eliminated the per-gigabyte vendor
          pricing model that had caused costs to rise in step with growth. The
          platform could now scale without the same licensing pressure.
        </P>

        <H2 id="why-it-matters">Why This Matters for Growing MSSPs</H2>
        <P>
          Many MSSPs eventually hit the same ceiling: the platform that worked
          well at an earlier stage becomes a drag on margin as customer volume
          grows.
        </P>
        <P>
          In this case, the answer was not simply to optimize the existing SIEM.
          It was to move to a platform ownership model that aligned
          infrastructure economics more closely with business growth.
        </P>
      </CaseStudyShell>
    </>
  );
}
