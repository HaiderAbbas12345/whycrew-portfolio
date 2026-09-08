import type { Metadata } from "next";
import { CaseStudyShell } from "@/components/case-study/case-study-shell";
import { Bullets, H2, P } from "@/components/blog/prose";
import { breadcrumbLd } from "@/lib/jsonld";
import { breadcrumbLabel, caseStudyBySlug } from "@/lib/case-studies";
import { CTA_HREF, OG_IMAGE, SITE } from "@/lib/site";

const study = caseStudyBySlug("mssp-engineering-capacity-pod")!;
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
            "See what embedded engineering capacity looks like for your team",
          body: "If one engineer is covering work that realistically needs three or four, an embedded WhyCrew pod can consolidate detection, ingestion, and automation into shipped production work — without a four-person hire.",
          label: "Book an Architecture Audit",
          href: CTA_HREF,
        }}
      >
        <P>
          A growing managed security services provider (MSSP) had one
          security engineer managing log parsers, onboarding automation,
          detection rules, and pipeline maintenance — work that realistically
          required multiple people. Hiring three or four additional engineers
          wasn&apos;t financially feasible for a lean organization.
        </P>
        <P>
          To solve the problem, WhyCrew embedded a security engineering pod
          directly into the MSSP&apos;s roadmap, focused on shipped production
          work rather than billable hours.
        </P>

        <H2 id="the-challenge">The Challenge</H2>
        <P>
          The MSSP&apos;s single engineer was stretched across four distinct
          disciplines at once: parsing and normalizing incoming logs,
          automating client onboarding, writing and tuning detection content,
          and keeping ingestion pipelines running. Each discipline alone was
          close to a full-time job.
        </P>
        <P>
          Traditional hiring would have meant recruiting, onboarding, and
          managing three or four additional engineers — a fixed cost the
          business would carry regardless of how the workload fluctuated
          month to month. For a lean organization, that overhead wasn&apos;t
          financially feasible at this stage of growth.
        </P>
        <P>
          The MSSP had also been supplementing the gap with disconnected
          contractors, which added coordination overhead of its own: work
          handed between people with no shared context on the platform or its
          roadmap.
        </P>

        <H2 id="the-approach">The WhyCrew Approach</H2>
        <P>
          WhyCrew embedded a security engineering pod directly into the
          MSSP&apos;s roadmap, structured around shipped production work
          rather than billable hours.
        </P>
        <Bullets
          items={[
            "Detection engineering, ingestion, and automation work were unified under one team instead of split across disconnected contractors",
            "Work was scoped and prioritized against the MSSP's actual roadmap, not a generic statement of work",
            "The pod shipped incrementally, with production-ready work landing inside the first two weeks",
          ]}
        />
        <P>
          Consolidating the work under one team removed the coordination tax
          that comes with handing pieces of the same platform to different
          contractors — everyone building against the same context, the same
          codebase, and the same roadmap.
        </P>

        <H2 id="the-outcome">The Outcome</H2>
        <P>
          The MSSP shipped its first production work in 10 days from kickoff.
          Across the engagement, the pod delivered roughly 8× the engineering
          output of a single onshore hire, at the cost of one.
        </P>
        <P>
          Detection engineering, ingestion, and automation now run under one
          coordinated team rather than a patchwork of disconnected
          contractors, and the MSSP&apos;s roadmap keeps moving without the
          business having staffed up a team it couldn&apos;t yet afford.
        </P>

        <H2 id="why-it-matters">Why This Matters for Growing MSSPs</H2>
        <P>
          Platform ownership requires continuous engineering work — detection
          content needs tuning, pipelines need maintenance, and onboarding
          automation needs to keep pace with every new client. Growing MSSPs
          often can&apos;t justify traditional hiring for that work well
          before they actually need a full internal team.
        </P>
        <P>
          Embedded engineering capacity closes that gap: the roadmap keeps
          moving, work ships as production rather than billable hours, and
          the business scales its engineering effort with its actual
          workload instead of a fixed headcount decision made too early.
        </P>
      </CaseStudyShell>
    </>
  );
}
