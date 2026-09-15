import type { Metadata } from "next";
import { ArticleShell, type TocEntry } from "@/components/blog/article-shell";
import {
  Bullets,
  DataTable,
  H2,
  H3,
  KeyTakeaways,
  Numbered,
  P,
  QuickAnswer,
  Ref,
  Strong,
} from "@/components/blog/prose";
import { FaqAccordion } from "@/components/ui/faq";
import { breadcrumbLd, faqLd, type Faq } from "@/lib/jsonld";
import { breadcrumbLabel, postBySlug } from "@/lib/blog";
import { CTA_HREF, EXTERNAL_REL, OG_IMAGE, SITE } from "@/lib/site";

const post = postBySlug("nca-ecc-vs-sama-csf")!;
const PATH = `/blog/${post.slug}`;

export const metadata: Metadata = {
  // `absolute` keeps the title exactly as specified in the content doc — the
  // root layout's "%s | WhyCrew" template would push it past the SERP cutoff.
  title: { absolute: post.metaTitle },
  description: post.metaDescription,
  alternates: { canonical: PATH },
  openGraph: {
    type: "article",
    title: post.metaTitle,
    description: post.metaDescription,
    url: `${SITE.url}${PATH}`,
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified ?? post.datePublished,
    images: OG_IMAGE,
  },
  twitter: {
    card: "summary_large_image",
    title: post.metaTitle,
    description: post.metaDescription,
  },
};

const TOC: TocEntry[] = [
  { id: "key-takeaways", label: "Key takeaways" },
  { id: "overview", label: "Two regulators, two oversight models" },
  { id: "quick-comparison", label: "NCA ECC vs SAMA CSF at a glance" },
  { id: "nca-ecc", label: "Understanding NCA ECC" },
  { id: "sama-csf", label: "Understanding SAMA CSF" },
  { id: "dual-compliance", label: "Dual compliance scenarios" },
  { id: "three-step-check", label: "The three-step check" },
  { id: "key-differences", label: "Key differences" },
  { id: "common-errors", label: "Common compliance errors" },
  { id: "shared-requirements", label: "Shared core requirements" },
  { id: "whycrew-approach", label: "How WhyCrew approaches this" },
  { id: "faq", label: "Frequently asked questions" },
];

const COMPARISON_TABLE = {
  head: ["Feature", "NCA ECC", "SAMA CSF"],
  rows: [
    ["Who created it", "National Cybersecurity Authority", "Saudi Central Bank"],
    [
      "Applicable entities",
      "Government, critical infrastructure, many businesses",
      "Banks, insurers, fintechs, payment firms",
    ],
    ["Control structure", "108 main controls + 92 sub-controls", "32 subdomains"],
    [
      "System monitoring requirement",
      "Control 2-12: SIEM plus continuous log review",
      "Subdomain 3.14: SIEM plus 24/7 SOC",
    ],
    [
      "Log retention period",
      "12 months (18 for critical systems)",
      "Risk-class dependent, no fixed duration",
    ],
    ["Assessment methodology", "Pass/fail determination", "Six-point scale (0–5)"],
    [
      "Special licensing",
      "Tier 1 or Tier 2 MSOC license required",
      "No specific license — responsibility stays with the organization",
    ],
    ["Regulatory integration", "Operates independently", "Operates independently"],
    ["Unified assessment", "No combined evaluation", "No combined evaluation"],
  ],
};

const MATURITY_TABLE = {
  head: ["Level", "Classification", "Characteristics"],
  rows: [
    ["0", "Non-existent", "Zero implemented controls"],
    ["1", "Initial", "Unstructured, ad hoc approach"],
    ["2", "Developing", "Partial controls lacking consistency"],
    [
      "3",
      "Defined",
      "Documented, consistent implementation (minimum passing level)",
    ],
    ["4", "Managed", "Regularly monitored and evaluated"],
    ["5", "Optimizing", "Continuous improvement orientation"],
  ],
};

const FAQS: Faq[] = [
  {
    q: "Can a single organization require compliance with both frameworks?",
    a: "Yes, particularly for critical-infrastructure-designated financial institutions and MSSPs serving SAMA-regulated clients. Each regulator conducts an independent assessment.",
  },
  {
    q: "Does SAMA CSF represent NCA ECC specifically adapted for banking?",
    a: "No. Two distinct regulators developed these frameworks using different architectural approaches and evaluation methodologies.",
  },
  {
    q: "Does NCA ECC certification automatically satisfy SAMA CSF requirements?",
    a: "No. Each framework requires independent verification and certification. There's no crossover credit between them.",
  },
  {
    q: "Does NCA ECC contain 108 or 114 controls?",
    a: "The current version, ECC-2:2024, contains 108 main controls plus 92 sub-controls. The retired ECC-1:2018 contained 114 controls.",
  },
  {
    q: "Which framework imposes stricter log retention requirements?",
    a: "NCA ECC specifies absolute minimums — 12 months, 18 for critical systems. SAMA CSF delegates the duration to your risk classification, which makes a direct comparison hard to draw.",
  },
  {
    q: "Which rules govern MSSPs with SAMA-regulated clients?",
    a: "NCA MSOC licensing covers the provider's own infrastructure. The platform must additionally meet SAMA CSF Subdomain 3.14 whenever it serves a SAMA-regulated client.",
  },
  {
    q: "Where should organizations verify their applicable requirements?",
    a: "Consult official NCA documentation and SAMA framework guidance directly before structuring a compliance program. This guide is a starting point for orientation, not a substitute for that review.",
  },
];

function articleLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE.url}${PATH}#article`,
    headline: post.title,
    name: post.metaTitle,
    description: post.metaDescription,
    url: `${SITE.url}${PATH}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}${PATH}` },
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE.url}/#website` },
    author: { "@id": `${SITE.url}/#organization` },
    publisher: { "@id": `${SITE.url}/#organization` },
    image: `${SITE.url}/WhyCrew.jpeg`,
    articleSection: post.cluster,
    keywords: post.topics.join(", "),
  };
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: breadcrumbLabel(post.slug), path: PATH },
            ])
          ),
        }}
      />

      <ArticleShell
        post={post}
        toc={TOC}
        cta={{
          heading: "Find out which framework actually applies to you",
          body: "We'll run the three-step check against your organization, map the gap between what you have and what Control 2-12 or Subdomain 3.14 requires, and show you what a platform built to satisfy both would look like.",
          label: "Book a Compliance Architecture Audit",
          href: CTA_HREF,
        }}
      >
        <QuickAnswer>
          Saudi Arabia maintains two separate cybersecurity frameworks. NCA
          ECC, from the National Cybersecurity Authority, applies to
          government entities, critical infrastructure, and many businesses.
          SAMA CSF, from the Saudi Central Bank, applies specifically to
          financial institutions. Meeting one does not satisfy the other —
          building to the wrong one can cost you months.
        </QuickAnswer>

        <div className="mt-10">
          <KeyTakeaways
            items={[
              <>
                <Strong>They're independent:</Strong> NCA ECC and SAMA CSF are
                run by different regulators with different control counts,
                retention rules, and assessment models.
              </>,
              <>
                <Strong>Both require a SIEM:</Strong> NCA ECC's Control 2-12
                and SAMA CSF's Subdomain 3.14 each mandate SIEM-based
                monitoring — with different scope and maturity expectations.
              </>,
              <>
                <Strong>Dual compliance is real:</Strong> critical-
                infrastructure-designated financial institutions and MSSPs
                serving SAMA-regulated clients need both, at once.
              </>,
              <>
                <Strong>A three-step check</Strong> settles which framework
                applies before you build anything against the wrong one.
              </>,
            ]}
          />
        </div>

        <H2 id="overview">Two Regulators, Two Independent Oversight Models</H2>
        <P>
          The National Cybersecurity Authority (NCA) provides comprehensive
          cybersecurity governance across Saudi Arabia. The Saudi Central Bank
          (SAMA) focuses exclusively on financial-sector security. These
          entities operate without coordination, maintaining separate
          regulatory frameworks and assessment processes.
        </P>
        <P>
          That independence is the part worth sitting with. Satisfying one
          regulator's requirements provides no assurance of compliance with
          the other's standards — even when the underlying control (a SIEM,
          continuous monitoring, log retention) looks similar on paper.
        </P>

        <H2 id="quick-comparison">NCA ECC vs SAMA CSF at a Glance</H2>
        <DataTable
          caption="Quick comparison of NCA ECC and SAMA CSF"
          head={COMPARISON_TABLE.head}
          rows={COMPARISON_TABLE.rows}
        />

        <H2 id="nca-ecc">Understanding NCA ECC</H2>
        <P>
          NCA ECC (Essential Cybersecurity Controls) establishes minimum
          security requirements across Saudi Arabia. The current version,
          ECC-2:2024, addresses four principal domains:
        </P>
        <Numbered
          items={[
            <>
              <Strong>Cybersecurity Governance</Strong> — organizational
              accountability and risk management structures.
            </>,
            <>
              <Strong>Cyber Defense</Strong> — protective technical
              mechanisms.
            </>,
            <>
              <Strong>Cybersecurity Resilience</Strong> — continuity during
              disruptions.
            </>,
            <>
              <Strong>Third-Party and Cloud Security</Strong> — vendor and
              cloud platform oversight.
            </>,
          ]}
        />

        <H3>Additional NCA Frameworks That May Apply</H3>
        <P>
          Depending on your sector and systems, one or more of these can layer
          on top of ECC:
        </P>
        <Bullets
          items={[
            <>
              <Strong>CSCC</Strong> — critical systems, requiring 18-month log
              retention and continuous monitoring.
            </>,
            <>
              <Strong>CCC</Strong> — cloud service security.
            </>,
            <>
              <Strong>OTCC</Strong> — operational technology security.
            </>,
            <>
              <Strong>DCC</Strong> — data protection.
            </>,
            <>
              <Strong>TCC</Strong> — remote workforce security.
            </>,
          ]}
        />

        <H3>NCA ECC System Monitoring Requirements</H3>
        <P>
          Control 2-12 mandates continuous SIEM-based log gathering,
          persistent monitoring activity, and log preservation spanning a
          minimum of 12 months — extended to 18 months for systems designated
          as critical.
        </P>

        <H3>MSSP and MSOC Considerations</H3>
        <P>
          Organizations providing managed security services must obtain NCA
          MSOC licensing. If you're running detection for multiple clients
          under that license, tenant isolation and cost management stop being
          optional — see{" "}
          <Ref to="multi-tenant-siem-architecture">
            our guide to multi-tenant SIEM architecture
          </Ref>{" "}
          for how that gets built.
        </P>

        <H2 id="sama-csf">Understanding SAMA CSF</H2>
        <P>
          SAMA CSF (Cyber Security Framework) applies exclusively to
          financial-sector entities under Saudi Central Bank supervision.
        </P>

        <H3>Entities Subject to SAMA CSF</H3>
        <Bullets
          items={[
            "Conventional and Islamic banking institutions",
            "Insurance and reinsurance providers",
            "Financing organizations",
            "Payment service providers",
            "Currency exchange businesses",
            "Credit bureaus",
            "Licensed fintech companies",
          ]}
        />

        <H3>SAMA CSF Structural Components</H3>
        <P>
          The framework organizes into four primary domains containing 32
          subdomains:
        </P>
        <Numbered
          items={[
            <>
              <Strong>Leadership and Governance</Strong> — 7 subdomains.
            </>,
            <>
              <Strong>Risk Management and Compliance</Strong> — 5 subdomains.
            </>,
            <>
              <Strong>Operations and Technology</Strong> — 17 subdomains.
            </>,
            <>
              <Strong>Third-Party Cyber Security</Strong> — 3 subdomains.
            </>,
          ]}
        />

        <H3>System Monitoring: Subdomain 3.14</H3>
        <P>
          Cyber Security Event Management requires SIEM infrastructure
          aggregating security events, SOC team deployment providing
          round-the-clock response capabilities, and log storage meeting
          regulatory specifications.
        </P>

        <H3>SAMA's Maturity Assessment Model</H3>
        <DataTable
          caption="SAMA's six-point maturity scale"
          head={MATURITY_TABLE.head}
          rows={MATURITY_TABLE.rows}
        />
        <P>
          Subdomain 3.14 typically requires Level 4 maturity — SAMA's highest
          standard for most domains.
        </P>

        <H2 id="dual-compliance">Dual Compliance Scenarios</H2>
        <H3>Case 1: Financial Institution With Critical Infrastructure Designation</H3>
        <P>
          A banking organization designated as critical infrastructure by NCA
          must satisfy both SAMA CSF requirements and NCA ECC controls
          simultaneously.
        </P>
        <H3>Case 2: MSSPs Serving Financial Clients</H3>
        <P>
          An MSSP holding NCA MSOC licensure must ensure its platform
          architecture supports SAMA CSF Subdomain 3.14 whenever it serves
          SAMA-regulated clients.
        </P>

        <H2 id="three-step-check">
          A Three-Step Framework Identification Process
        </H2>
        <Numbered
          items={[
            <>
              <Strong>Step 1 — Does SAMA oversee your organization?</Strong>{" "}
              (banks, insurers, payment firms, SAMA-licensed fintechs.) Yes →
              go to Step 2. No → go to Step 3.
            </>,
            <>
              <Strong>
                Step 2 — Has NCA classified any organizational systems as
                critical infrastructure?
              </Strong>{" "}
              Yes → both frameworks apply; plan for dual compliance. No → SAMA
              CSF is your primary obligation.
            </>,
            <>
              <Strong>
                Step 3 — Does your organization provide managed security
                services?
              </Strong>{" "}
              Serving SAMA-regulated clients → NCA MSOC licensing applies to
              your operations, and your platform must additionally satisfy
              SAMA Subdomain 3.14. General MSOC operations → NCA ECC applies
              with the appropriate licensing tier. Neither → NCA ECC likely
              applies if you're operating within Saudi Arabia.
            </>,
          ]}
        />

        <H2 id="key-differences">Critical Distinctions Between Frameworks</H2>
        <P>
          <Strong>Regulatory objectives.</Strong> NCA ECC addresses
          national-level security across multiple sectors. SAMA CSF narrowly
          focuses on financial-system protection.
        </P>
        <P>
          <Strong>Performance metrics.</Strong> NCA ECC employs binary
          compliance assessment. SAMA CSF uses graduated maturity scoring
          across six levels.
        </P>
        <P>
          <Strong>Data retention standards.</Strong> NCA ECC specifies exact
          retention periods. SAMA CSF delegates that determination to
          organizational risk classification.
        </P>
        <P>
          <Strong>Vendor accountability.</Strong> Both frameworks agree on one
          thing: primary responsibility stays with the implementing
          organization regardless of which third party runs the tooling.
        </P>

        <H2 id="common-errors">Common Compliance Errors</H2>
        <P>
          <Strong>Financial proximity does not equal SAMA jurisdiction.</Strong>{" "}
          Organizations operating adjacent to financial services — payment
          processors, lending platforms, buy-now-pay-later providers — may
          fall outside SAMA oversight absent direct licensing.
        </P>
        <P>
          <Strong>Single-framework sufficiency is a myth.</Strong> No
          crossover compliance exists between the two. Each regulator
          maintains independent evaluation criteria.
        </P>
        <P>
          <Strong>Outsourcing does not eliminate accountability.</Strong>{" "}
          Delegating SIEM or SOC functions to an external vendor transfers
          operational execution, not organizational accountability.
        </P>

        <H2 id="shared-requirements">Shared Core Requirements</H2>
        <P>Both frameworks demand:</P>
        <Bullets
          items={[
            "Centralized log aggregation through SIEM architecture",
            "Dedicated security operations capability providing rapid response",
            "Auditable log retention infrastructure",
          ]}
        />
        <P>
          Organizations frequently run into escalating expenses through
          per-gigabyte SIEM pricing models built for a different market
          entirely. Platform ownership instead of vendor rental can generate
          substantial savings — one MSSP{" "}
          <Ref to="siem-rent-to-owned-case-study">
            recovered $270,000 over 24 months
          </Ref>{" "}
          by making that switch.
        </P>

        <H2 id="whycrew-approach">
          How WhyCrew Approaches NCA ECC and SAMA CSF
        </H2>
        <P>
          Most compliance vendors sell a generic monitoring product and leave
          you to map it onto Control 2-12 or Subdomain 3.14 yourself. WhyCrew
          builds{" "}
          <Ref to="nca-ecc-sama-csf-compliance">
            the SIEM and SOC platform itself
          </Ref>{" "}
          purpose-built to both, whichever one — or both — apply to you, then
          hands over full ownership. No per-GB pricing, no license renewal,
          and no dependency on a vendor's roadmap when a regulator asks for
          something new.
        </P>
        <P>
          Not sure yet which framework applies to you?{" "}
          <a
            href={CTA_HREF}
            target="_blank"
            rel={EXTERNAL_REL}
            className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
          >
            Book a 20-minute call
          </a>{" "}
          and we'll run the three-step check with you.
        </P>

        <H2 id="faq">Frequently Asked Questions</H2>
        <div className="mt-6">
          <FaqAccordion faqs={FAQS} columns={1} />
        </div>
      </ArticleShell>
    </>
  );
}
