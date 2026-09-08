import type { Metadata } from "next";
import { CaseStudyShell } from "@/components/case-study/case-study-shell";
import { Bullets, H2, P } from "@/components/blog/prose";
import { breadcrumbLd } from "@/lib/jsonld";
import { breadcrumbLabel, caseStudyBySlug } from "@/lib/case-studies";
import { CTA_HREF, OG_IMAGE, SITE } from "@/lib/site";

const study = caseStudyBySlug("in-house-dark-web-monitoring")!;
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
          heading:
            "See what in-house identity monitoring looks like for your environment",
          body: "If a vendor's API caps and delayed alerts are limiting what your team can see, a proprietary collection pipeline can remove the ceiling entirely.",
          label: "Book an Architecture Audit",
          href: CTA_HREF,
        }}
      >
        <P>
          A cybersecurity provider paid $15,000 a month — $180,000 a year —
          for dark-web monitoring, but faced hard vendor constraints: capped
          API calls, delayed breach notifications, and limited access to the
          raw telemetry underneath the alerts. The provider was paying for a
          capability it didn&apos;t actually control.
        </P>
        <P>
          WhyCrew built a proprietary reconnaissance pipeline covering
          underground forums, paste sites, breach sources, and encrypted
          channels, deployed directly inside the client&apos;s own
          environment.
        </P>

        <H2 id="the-challenge">The Challenge</H2>
        <P>
          The vendor&apos;s pricing tier capped how many API calls the
          provider could make in a given period, which meant coverage was
          throttled by contract terms rather than by what actually needed
          monitoring. Breach notifications also lagged, arriving after the
          exposure window that mattered most had already passed.
        </P>
        <P>
          Because the raw telemetry stayed on the vendor&apos;s side, the
          provider had no way to inspect the underlying collection, tune what
          it watched for, or verify a match without going back through the
          vendor&apos;s own interface.
        </P>

        <H2 id="the-approach">The WhyCrew Approach</H2>
        <P>
          WhyCrew built a proprietary reconnaissance pipeline covering
          underground forums, paste sites, breach sources, and encrypted
          channels, with collection infrastructure deployed directly inside
          the client&apos;s own environment rather than a third party&apos;s.
        </P>
        <Bullets
          items={[
            "Collection runs continuously across forums, paste sites, breach dumps, and encrypted channels, with no per-call ceiling",
            "Indexed matching flags exposed credentials, API keys, and corporate tokens as they surface",
            "Raw telemetry stays inside the client's own environment, so the team can inspect and tune what it watches for directly",
          ]}
        />
        <P>
          The transition ran with one senior engineer and completed in six
          weeks, replacing the vendor contract rather than running alongside
          it.
        </P>

        <H2 id="the-outcome">The Outcome</H2>
        <P>
          The provider eliminated the $180,000 annual vendor bill entirely.
          Collection and telemetry are now fully owned, with no API caps
          limiting coverage, and detection runs near real time rather than on
          the vendor&apos;s notification schedule.
        </P>
        <P>
          The six-week transition also meant the provider was never left
          without coverage during the switch — the new pipeline was
          validated before the vendor contract was cut.
        </P>

        <H2 id="why-it-matters">Why This Matters Beyond Dark-Web Monitoring</H2>
        <P>
          The pattern here isn&apos;t specific to dark-web monitoring. It
          applies to any proprietary SaaS dependency that caps what a team can
          see, delays what it can act on, or keeps the underlying data out of
          reach.
        </P>
        <P>
          Moving that capability in-house is a strategic move whenever a
          vendor&apos;s contract terms — not the actual threat — are what&apos;s
          limiting visibility or control.
        </P>
      </CaseStudyShell>
    </>
  );
}
