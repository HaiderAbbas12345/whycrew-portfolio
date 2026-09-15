import type { Metadata } from "next";
import { ServiceCta, ServiceHero } from "@/components/sections/service-shell";
import { FaqAccordion } from "@/components/ui/faq";
import {
  Card,
  CompareTable,
  Eyebrow,
  Heading,
  Section,
} from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { breadcrumbLd, faqLd, serviceLd, type Faq } from "@/lib/jsonld";
import { CTA_HREF, OG_IMAGE, serviceBySlug } from "@/lib/site";
import { FrameworkTabs, type FrameworkPanel } from "./framework-tabs";

const svc = serviceBySlug("nca-ecc-sama-csf-compliance");

export const metadata: Metadata = {
  // `absolute` bypasses the root layout's "%s | WhyCrew" template so the title
  // renders exactly as specified — the brand is already in the string.
  title: { absolute: svc.metaTitle },
  description: svc.metaDescription,
  alternates: { canonical: svc.href },
  openGraph: {
    title: svc.metaTitle,
    description: svc.metaDescription,
    url: svc.href,
    type: "website",
    images: OG_IMAGE,
  },
  // Without this the page inherits the root layout's site-wide Twitter card.
  twitter: {
    card: "summary_large_image",
    title: svc.metaTitle,
    description: svc.metaDescription,
  },
};

const STATS = [
  { value: "100%", label: "You own the platform and the code when we hand it over" },
  { value: "12 wks", label: "Typical time to launch" },
  {
    value: "12–18 mo",
    label:
      "NCA ECC log retention, built in from day one — 12 months base, 18 for critical systems under CSCC",
  },
  { value: "0", label: "Ongoing per-GB fees" },
];

const FRAMEWORK_PANELS: FrameworkPanel[] = [
  {
    key: "nca-ecc",
    label: "NCA ECC Compliance",
    heading: "Why Control 2-12 Changes Everything for Saudi MSSPs",
    paragraphs: [
      "If you hold — or are working toward — an NCA Tier 1 or Tier 2 MSOC license in Saudi Arabia, Control 2-12 is the rule your platform has to meet.",
      "Here's what it actually requires: your platform must run real SIEM tools, watch every log around the clock, and hold that log data for at least 12 months. If you monitor national critical systems, CSCC raises that retention window to 18 months.",
      "WhyCrew builds that platform for you, engineered around Control 2-12 from day one — not adapted from something built for another market. At the end of the build, you get the full platform and the source code. This is real engineering work, not a checkbox to tick for your license.",
    ],
  },
  {
    key: "sama-csf",
    label: "SAMA CSF Compliance",
    heading: "Why SAMA CSF 3.14 Changes Everything for Saudi Financial Institutions",
    paragraphs: [
      "If SAMA, the Saudi Central Bank, regulates your organization — banks, insurers, financing companies, payment providers, money exchangers, credit bureaus, and fintechs all fall under this — its Cyber Security Framework (CSF) is the rulebook you follow.",
      "The framework covers four domains and 32 subdomains in total. The one that matters most for a SIEM is subdomain 3.14, Cyber Security Event Management. It expects a centralized SIEM to capture your events, a SOC to correlate and triage them 24/7, and log retention that meets SAMA's regulatory bar.",
      "Most SAMA-regulated entities need to reach at least Level 3 maturity across the framework — and Level 4 specifically for event management, the highest standard SAMA sets for most areas.",
      "WhyCrew builds that platform for you, engineered around subdomain 3.14 from day one — not bolted on as an afterthought. At the end of the build, you get the full platform and the source code, with no license fee continuing after handover.",
    ],
  },
];

const PROBLEMS = [
  {
    title: "Per-GB pricing costs more right when Control 2-12 makes you keep more data.",
    body: "12 months of logs, minimum — 18 if critical systems are in scope. A platform billed by data size punishes you for doing the rule right.",
  },
  {
    title: "Generic SIEM products bolt on ECC as an afterthought.",
    body: "Most SIEM platforms in this market were built for the world first. Saudi rules got mapped on top, later — not built for Control 2-12 from day one.",
  },
  {
    title: "If you're the MSOC provider, you can't outsource your own platform.",
    body: "Outsourcing the platform behind your own licensed service just moves the \"rent, not own\" problem up one level.",
  },
  {
    title: "Outsourcing your event management platform doesn't shift who SAMA holds accountable.",
    body: "SAMA's rules apply entity-wide, including for what your third parties do on your behalf. If an outsourced platform falls short of subdomain 3.14, that risk stays yours — not your vendor's.",
  },
];

const COST_TABLE = {
  head: ["", "Licensed SIEM Product", "Outsourced / White-Label", "WhyCrew (Owned)"],
  rows: [
    ["Who owns it", "The vendor", "The platform provider", "You"],
    [
      "Pricing model",
      "Per-GB, scales with log volume",
      "Recurring platform fee",
      "Fixed build cost, no recurring license",
    ],
    [
      "Built for Control 2-12 / SAMA 3.14",
      "Mapped on afterward",
      "Depends on provider",
      "Engineered around it directly",
    ],
    ["Roadmap control", "Vendor's roadmap", "Provider's roadmap", "Yours"],
    [
      "Retention cost as you scale",
      "Grows with data volume",
      "Often capped or tiered",
      "Fixed infrastructure you control",
    ],
    [
      "Exit",
      "Re-platform and migrate",
      "Re-platform and migrate",
      "Nothing to exit — you already own it",
    ],
  ],
};

const GET_STARTED = [
  {
    tag: "Build New",
    title: "Starting From Scratch?",
    body: "For Saudi MSSPs building a custom SIEM for a first Tier 1 or Tier 2 MSOC license, or for SAMA-regulated financial institutions building out subdomain 3.14 event management capability from scratch. We build it around Control 2-12 or SAMA CSF, whichever applies to you, from the ground up — no off-the-shelf product, adapted after the fact.",
  },
  {
    tag: "Migrate",
    title: "Already Running a Licensed SIEM?",
    body: "Splunk, Microsoft Sentinel, IBM QRadar, or similar — if you want to move to a platform you own without breaking your log history or your audit trail, we run the new platform next to your old one during the move. Your retention window stays whole through the switch.",
  },
];

const HOW_IT_WORKS = [
  {
    title: "Get a fixed price before anything starts",
    body: "We map your log volume, retention needs, and license or regulatory status against Control 2-12 or SAMA CSF 3.14, whichever applies to you. No surprises later.",
  },
  {
    title: "Approve the blueprint, not a black box",
    body: "You review and approve the architecture, detection logic, and retention plan — including how the platform will prove compliance for your own audits.",
  },
  {
    title: "See it work on real data first",
    body: "The platform runs on a live account before the full switch. Problems surface early, not after go-live.",
  },
  {
    title: "Walk away owning everything",
    body: "We hand over the full platform, the source code, and the records. Nothing stays licensed back to WhyCrew.",
  },
];

const RESULTS = [
  {
    tags: ["SIEM & SOAR", "MSSP & White-Label"],
    title: "Scaling MSSP Engineering Without Scaling Headcount",
    metrics: [
      { value: "8×", label: "Engineering output vs. one hire" },
      { value: "10 days", label: "To first production ship" },
    ],
    body: "A growing MSSP had one engineer covering work that realistically needed three or four. An embedded WhyCrew engineering pod consolidated detection, ingestion, and automation under one team, shipping production work in 10 days.",
    href: "/case-studies/mssp-engineering-capacity-pod",
  },
  {
    tags: ["SIEM & SOAR", "Platform Ownership"],
    title: "Replacing a Rented Threat-Intel Feed With an Owned Pipeline",
    metrics: [
      { value: "$40K", label: "Annual licensing eliminated" },
      { value: "80%", label: "Reduction in manual triage" },
    ],
    body: "A regional SOC paid $40K a year for a commercial threat-intel feed that still left analysts checking domains and hashes by hand. An owned ingestion and enrichment pipeline cut manual triage by 80%.",
    href: "/case-studies/owned-threat-intelligence-pipeline",
  },
  {
    tags: ["Platform Ownership", "SIEM & SOAR"],
    title: "Bringing Identity Monitoring In-House to Escape a Capped Vendor",
    metrics: [
      { value: "$180K", label: "Annual vendor bill eliminated" },
      { value: "6 wks", label: "Transition timeline" },
    ],
    body: "A cybersecurity provider paid $180K a year for dark-web monitoring capped by API limits and delayed alerts. A proprietary collection pipeline, deployed in six weeks, removed the caps entirely.",
    href: "/case-studies/in-house-dark-web-monitoring",
  },
  {
    tags: ["SIEM & SOAR", "Platform Ownership"],
    title: "From SIEM Rent to an Owned Security Platform",
    metrics: [
      { value: "$270K", label: "Saved across 24 months" },
      { value: "$110K", label: "Year-1 direct savings" },
    ],
    body: "A growing MSSP was paying more for its SIEM with every client it won. Moving to an owned, multi-tenant platform removed the per-gigabyte pricing curve and returned $270K across 24 months.",
    href: "/case-studies/siem-rent-to-owned-platform",
  },
];

const FAQS: Faq[] = [
  {
    q: "Does this cover SAMA CSF, or only NCA ECC?",
    a: "Both. WhyCrew builds SIEM platforms engineered around NCA ECC's Control 2-12 and around SAMA CSF's subdomain 3.14, Cyber Security Event Management. They are two separate frameworks with their own domains and controls, and WhyCrew scopes your build against whichever one applies to you — or both, if your organization sits under both regulators.",
  },
  {
    q: "Which organizations does SAMA CSF apply to?",
    a: "SAMA CSF applies to entities the Saudi Central Bank directly supervises — conventional and Islamic banks, insurers and reinsurers, financing companies, payment service providers, money exchange businesses, credit bureaus, and SAMA-licensed fintechs. Firms operating near financial services without a SAMA license usually fall outside its scope, though NCA ECC may still apply.",
  },
  {
    q: "What does SAMA CSF require for SIEM and SOC monitoring?",
    a: "Subdomain 3.14, Cyber Security Event Management, requires a SIEM that aggregates every security event in one place, a SOC team providing round-the-clock response, and log storage that meets SAMA's retention expectations. SAMA typically holds this subdomain to Level 4 on its 0-to-5 maturity scale — its highest bar for most domains.",
  },
  {
    q: "Does this platform meet NCA ECC Control 2-12 out of the box?",
    a: "Yes. Every platform WhyCrew builds under this service is engineered around Control 2-12 from day one — continuous SIEM-based log monitoring and a minimum 12-month retention window, extended to 18 months for systems in scope under CSCC — rather than a generic SIEM with Saudi controls mapped on afterward.",
  },
  {
    q: "Do we need an NCA MSOC license before working with WhyCrew?",
    a: "No. We build the platform whether you already hold a Tier 1 or Tier 2 MSOC license or are still working toward one. The license itself is issued by the NCA directly to your organization — WhyCrew builds the platform your application and your audits depend on.",
  },
  {
    q: "Can you migrate us off Splunk, Sentinel, or QRadar without breaking our audit trail?",
    a: "Yes. We run the new platform alongside your existing one during the move, so your retention window and log history stay intact throughout the switch. Nothing in your audit trail goes dark while the migration is in progress.",
  },
  {
    q: "Is retention always 12 months, or does it change for critical systems?",
    a: "12 months is the NCA ECC baseline. If NCA has designated any of your systems as critical infrastructure, CSCC raises that requirement to 18 months. SAMA CSF doesn't set a fixed number — it ties retention to your risk classification instead.",
  },
  {
    q: "Where is the platform hosted?",
    a: "Wherever your data residency requirements call for. WhyCrew engineers the platform around your infrastructure rather than routing your logs through a vendor's own hosting, so there's no compromise on where your data actually sits.",
  },
  {
    q: "How long does a build or migration take?",
    a: "12 weeks is the typical timeline from kickoff to a platform in production, whether you're building new or migrating off an existing SIEM. Exact timing depends on log volume and how many systems are in scope.",
  },
  {
    q: "What do we actually own at the end?",
    a: "Everything: the platform, the full source code, the detection logic, and the compliance records generated along the way. Nothing stays licensed back to WhyCrew, and there's no recurring fee tied to keeping it running.",
  },
];

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceLd({
              name: svc.name,
              description: svc.metaDescription,
              path: svc.href,
              serviceType: "NCA ECC and SAMA CSF compliance SIEM engineering",
            })
          ),
        }}
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
              { name: "Services", path: "/services" },
              { name: svc.navLabel, path: svc.href },
            ])
          ),
        }}
      />

      <ServiceHero
        title="Own Your SIEM Solution for NCA ECC & SAMA CSF Compliance"
        highlight={["Own", "Your"]}
        lead="Most enterprise SIEMs are built for generic global frameworks — your team ends up spending months retrofitting detection rules just to pass a local audit."
        intro={
          <>
            <p>
              WhyCrew engineers fully owned SIEM architectures, pre-mapped to
              NCA ECC&apos;s Control 2-12 and SAMA CSF&apos;s subdomain 3.14
              from day one. Custom log parsers, regulatory-aligned detection
              logic, audit-ready dashboards — built to your exact data
              requirements, not adapted from a template made for another
              market.
            </p>
            <p>
              No recurring license bloat. No data sovereignty compromises.
              You own the infrastructure, the pipelines, and the detection
              code outright.
            </p>
          </>
        }
        primaryCta={{ label: "Book a Technical Consultation", href: CTA_HREF }}
        secondaryCta={{ label: "See the Case Studies", href: "#results" }}
        stats={STATS}
        breadcrumbName={svc.navLabel}
        breadcrumbPath={svc.href}
      />

      {/* ------------------------------------------------ framework tabs */}
      <Section>
        <Eyebrow>Built for the rule that applies to you</Eyebrow>
        <Heading sub="Same owned-platform approach, engineered around whichever framework governs your organization.">
          Built for the Rule That Applies to You
        </Heading>
        <div className="mt-10">
          <FrameworkTabs panels={FRAMEWORK_PANELS} />
        </div>
      </Section>

      {/* ------------------------------------------------ why generic fails */}
      <Section className="border-y border-line/40 bg-ink/40">
        <Eyebrow tone="danger">Where generic platforms fail</Eyebrow>
        <Heading>Why Generic SIEM Platforms Fail NCA ECC and SAMA CSF</Heading>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2">
          {PROBLEMS.map((p, i) => (
            <StaggerItem key={p.title}>
              <Card className="group h-full p-7">
                <span className="font-mono text-[11px] font-bold tracking-[0.14em] text-brand-hi transition-colors duration-400 group-hover:text-accent">
                  PROBLEM {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[15px] font-semibold leading-snug">
                  {p.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                  {p.body}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ------------------------------------------------ cost comparison */}
      <Section>
        <Eyebrow tone="brand">The real cost</Eyebrow>
        <Heading>Rent, Outsource, or Own: Compare the Real Cost</Heading>
        <Reveal className="mt-10">
          <CompareTable
            head={COST_TABLE.head}
            rows={COST_TABLE.rows}
            highlightCol={3}
          />
        </Reveal>
      </Section>

      {/* ------------------------------------------------ two ways to start */}
      <Section className="border-y border-line/40 bg-ink/40">
        <Eyebrow>Getting started</Eyebrow>
        <Heading>Two Ways to Get Started</Heading>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {GET_STARTED.map((g) => (
            <Reveal key={g.title}>
              <Card className="h-full p-8">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                  {g.tag}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{g.title}</h3>
                <p className="mt-4 text-[13.5px] leading-relaxed text-muted">
                  {g.body}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------ how it works */}
      <Section id="process">
        <Eyebrow>How it works</Eyebrow>
        <Heading sub="Build a new platform, or move an old one — for NCA ECC, SAMA CSF, or both. Either way, the steps are the same.">
          How It Works
        </Heading>

        <Stagger className="mt-12 grid gap-4">
          {HOW_IT_WORKS.map((s, i) => (
            <StaggerItem key={s.title}>
              <div className="group flex flex-col gap-2 rounded-md border border-line/50 bg-surface/35 p-6 transition-colors duration-400 hover:border-accent/30 sm:flex-row sm:items-start sm:gap-8">
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-accent/30 bg-accent/8 font-mono text-[11px] font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[14.5px] font-semibold text-bright">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
                    {s.body}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ------------------------------------------------ results */}
      <Section id="results" className="border-y border-line/40 bg-ink/40">
        <Eyebrow>Global track record</Eyebrow>
        <Heading sub="WhyCrew works with MSSPs worldwide — every result below is a real, published case study, not a projection.">
          Real Results From Real MSSPs
        </Heading>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {RESULTS.map((r) => (
            <Reveal key={r.title}>
              <Card className="h-full p-8">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
                  {r.tags.join(" · ")}
                </p>
                <h3 className="mt-3 text-lg font-semibold leading-snug">
                  {r.title}
                </h3>
                <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                  {r.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="text-xl font-semibold text-gradient">
                        {m.value}
                      </div>
                      <div className="mt-1 text-[11.5px] text-faint">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-[13.5px] leading-relaxed text-muted">
                  {r.body}
                </p>
                <a
                  href={r.href}
                  className="mt-6 inline-block font-mono text-[12px] font-semibold text-accent underline-offset-4 hover:underline"
                >
                  Read the case study →
                </a>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------ what's not included */}
      <Section>
        <Eyebrow tone="danger">Said plainly</Eyebrow>
        <Heading>What&apos;s Not Included</Heading>
        <Reveal className="mt-10">
          <Card
            className="border-l-2 border-l-danger/60 p-7 sm:p-8"
            interactive={false}
          >
            <p className="text-[13.5px] leading-relaxed text-body">
              WhyCrew builds the platform.{" "}
              <strong className="font-semibold text-bright">
                WhyCrew does not hold, grant, or apply for your NCA MSOC
                license, and does not act as your SAMA-regulated
                entity&apos;s compliance officer or auditor.
              </strong>{" "}
              The NCA and SAMA each issue their own approvals directly.
            </p>
            <p className="mt-4 text-[13.5px] leading-relaxed text-body">
              The request, the audit, and the approval stay between you and
              your regulator. WhyCrew builds the platform that meets the
              rules — like Control 2-12 or SAMA CSF subdomain 3.14 — that
              those approvals depend on.
            </p>
          </Card>
        </Reveal>
      </Section>

      {/* ------------------------------------------------ faq */}
      <Section id="faq" className="border-t border-line/40 bg-ink/40">
        <Eyebrow>Frequently asked questions</Eyebrow>
        <Heading>NCA ECC &amp; SAMA CSF, answered</Heading>
        <div className="mt-10">
          <FaqAccordion faqs={FAQS} />
        </div>
      </Section>

      <ServiceCta
        title="Own Your SIEM. Stop"
        highlight="Retrofitting Someone Else's."
        body="Talk to WhyCrew's engineers about a build or a move for your MSSP or SAMA-regulated institution in Saudi Arabia — fixed price, before any work starts."
        primary={{ label: "Book a Technical Consultation", href: CTA_HREF }}
        secondary={{ label: "See All Services", href: "/services" }}
        footnote="Fixed price before any work starts · Full platform ownership at handover"
      />
    </>
  );
}
