import type { Metadata } from "next";
import { CaseStudyShell } from "@/components/case-study/case-study-shell";
import { Bullets, H2, P } from "@/components/blog/prose";
import { breadcrumbLd } from "@/lib/jsonld";
import { breadcrumbLabel, caseStudyBySlug } from "@/lib/case-studies";
import { CTA_HREF, OG_IMAGE, SITE } from "@/lib/site";

const study = caseStudyBySlug("owned-threat-intelligence-pipeline")!;
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
          heading: "See what an owned threat-intel pipeline would replace",
          body: "If your team is still paying for a feed that leaves analysts doing manual lookups, an owned ingestion and enrichment pipeline usually pays for itself in reduced analyst time alone.",
          label: "Book an Architecture Audit",
          href: CTA_HREF,
        }}
      >
        <P>
          A regional security operations center (SOC) paid $40,000 a year for
          a commercial threat-intelligence aggregator that provided minimal
          context. Analysts still manually verified domains, checked hashes,
          and looked up IP ranges individually before acting on alerts.
        </P>
        <P>
          WhyCrew replaced the single vendor feed with an owned ingestion and
          enrichment pipeline built directly into the SOC&apos;s existing
          workflows.
        </P>

        <H2 id="the-challenge">The Challenge</H2>
        <P>
          The commercial feed the SOC was paying for aggregated indicators
          from third-party sources but added little context of its own. An
          alert would arrive with a bare domain, hash, or IP address, and it
          was still on the analyst to manually verify what it actually was
          before deciding whether to act on it.
        </P>
        <P>
          That manual verification step — checking WHOIS records, passive DNS
          history, and known threat-actor infrastructure one indicator at a
          time — consumed a large share of every analyst&apos;s day, on top
          of the $40,000 annual license for the feed that was supposed to be
          doing that work.
        </P>

        <H2 id="the-approach">The WhyCrew Approach</H2>
        <P>
          WhyCrew built an owned ingestion and enrichment pipeline directly
          into the SOC&apos;s existing workflows, replacing the single vendor
          feed rather than adding a second one alongside it.
        </P>
        <Bullets
          items={[
            "The pipeline pulls from open, government, and curated industry sources instead of a single paid aggregator",
            "Every indicator is enriched in real time through WHOIS, passive DNS, and MITRE ATT&CK mapping before it reaches an analyst",
            "Enrichment happens automatically inside the existing alert workflow, with no separate tool or tab for analysts to check",
          ]}
        />
        <P>
          Because enrichment runs automatically before an alert reaches a
          human, analysts see context immediately instead of building it
          themselves indicator by indicator.
        </P>

        <H2 id="the-outcome">The Outcome</H2>
        <P>
          The SOC eliminated the $40,000 annual license for the commercial
          feed. Indicator enrichment now completes in under 3 seconds per
          alert, and manual analyst triage dropped by 80% as a result.
        </P>
        <P>
          The pipeline is now owned infrastructure rather than a rented data
          source, so the SOC controls what it ingests and how it is enriched
          going forward, instead of being limited to whatever the vendor
          chooses to include in the next contract renewal.
        </P>

        <H2 id="why-it-matters">Why This Matters for SOC Teams</H2>
        <P>
          A threat-intelligence subscription is only as useful as the context
          it hands an analyst. A feed that surfaces raw indicators without
          enrichment shifts the real work back onto the team paying for it.
        </P>
        <P>
          Owning the pipeline instead of renting the data source usually pays
          for itself in reduced analyst time alone, on top of removing the
          licensing cost entirely.
        </P>
      </CaseStudyShell>
    </>
  );
}
