import type { Metadata } from "next";
import { ServiceCta, ServiceHero } from "@/components/sections/service-shell";
import { FaqAccordion } from "@/components/ui/faq";
import {
  ArrowList,
  Card,
  CheckList,
  CompareTable,
  Eyebrow,
  Heading,
  ProcessSteps,
  Section,
} from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { breadcrumbLd, faqLd, serviceLd, type Faq } from "@/lib/jsonld";
import { CTA_HREF, OG_IMAGE, serviceBySlug } from "@/lib/site";

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
  { value: "108", label: "NCA ECC Main Controls" },
  { value: "32", label: "SAMA CSF Subdomains" },
  { value: "12–18 mo", label: "NCA Log Retention" },
  { value: "Level 4", label: "SAMA Maturity Target" },
];

const WHO = [
  {
    title: "Organizations in scope under NCA ECC",
    body: "Government entities, critical infrastructure operators, and the many private-sector organizations covered by ECC-2:2024.",
  },
  {
    title: "Financial institutions under SAMA CSF",
    body: "Banks, insurers, financing companies, payment providers, exchange houses, credit bureaus, and licensed fintechs supervised by the Saudi Central Bank.",
  },
  {
    title: "MSSPs holding or pursuing NCA MSOC licensing",
    body: "Especially those serving SAMA-regulated clients, who must also satisfy Subdomain 3.14 on top of their own license tier.",
  },
  {
    title: "Organizations under both frameworks",
    body: "Critical-infrastructure-designated financial institutions — the case dual compliance was built for, and the one most bought platforms aren't.",
  },
];

const FRAMEWORK_TABLE = {
  head: ["", "NCA ECC", "SAMA CSF"],
  rows: [
    ["Issued by", "National Cybersecurity Authority", "Saudi Central Bank (SAMA)"],
    [
      "Applies to",
      "Government, critical infrastructure, many private businesses",
      "Banks, insurers, fintechs, payment and financing firms",
    ],
    [
      "Control structure",
      "108 main controls + 92 sub-controls (ECC-2:2024)",
      "32 subdomains across 4 domains",
    ],
    [
      "Monitoring requirement",
      "Control 2-12: SIEM + continuous log review",
      "Subdomain 3.14: SIEM + 24/7 SOC",
    ],
    [
      "Log retention",
      "12 months (18 for critical systems)",
      "Risk-based, no fixed duration",
    ],
    ["Assessment model", "Pass/fail", "0–5 maturity scale"],
    [
      "MSSP licensing",
      "NCA MSOC license (Tier 1 or Tier 2)",
      "No separate license — accountability stays with the organization",
    ],
  ],
};

const DUAL_CASES = [
  {
    title: "Critical-infrastructure-designated financial institutions",
    body: "A bank or insurer that NCA has also designated as critical infrastructure must satisfy SAMA CSF and NCA ECC controls at the same time, on the same platform.",
  },
  {
    title: "MSSPs serving SAMA-regulated clients",
    body: "An MSSP holding NCA MSOC licensure must make sure its platform architecture supports SAMA CSF Subdomain 3.14 whenever it onboards a SAMA-regulated client — a requirement its own MSOC license doesn't cover on its own.",
  },
];

const WORKFLOWS = [
  {
    title: "Continuous SIEM Log Aggregation",
    body: "Control 2-12 and Subdomain 3.14 both require centralized log collection and ongoing review. One data lake ingests and correlates everything from day one — not two overlapping systems.",
  },
  {
    title: "24/7 SOC-Ready Detection",
    body: "Subdomain 3.14's round-the-clock response requirement is built into detection logic and escalation paths from the start, not bolted onto a platform designed for something else.",
  },
  {
    title: "Retention Mapped to Both Clocks",
    body: "NCA's 12/18-month fixed minimums and SAMA's risk-based retention run as separate, correctly-scoped policies on the same underlying data — no manual reconciliation between two storage tiers.",
  },
  {
    title: "Audit Evidence, Two Formats",
    body: "NCA's pass/fail evidence packs and SAMA's 0–5 maturity documentation both generate from the same logs and control mappings, so proving compliance to one regulator doesn't mean rebuilding the case for the other.",
  },
  {
    title: "NCA MSOC Licensing Readiness",
    body: "For MSSPs, the architecture and documentation are built to satisfy MSOC Tier 1 or Tier 2 licensing requirements from the start — not retrofitted once an application stalls.",
  },
  {
    title: "Third-Party and Vendor Oversight",
    body: "Control mapping for both frameworks' third-party risk requirements runs through one assessment workflow, not a duplicated questionnaire for each regulator.",
  },
];

const VENDOR_TABLE = {
  head: ["", "Licensed SIEM / Managed SOC", "WhyCrew (Owned Platform)"],
  rows: [
    [
      "Pricing",
      "Per-GB or per-seat, rises with your log volume",
      "One-time build, no ongoing licensing fee",
    ],
    [
      "NCA ECC & SAMA CSF fit",
      "Generic monitoring, retrofitted to controls after the fact",
      "Purpose-built to Control 2-12 and Subdomain 3.14",
    ],
    [
      "Data residency",
      "Often hosted outside the Kingdom",
      "Deployed where your regulator requires it",
    ],
    [
      "Retention policy",
      "One fixed tier, rarely matching both frameworks' clocks",
      "NCA's fixed minimums and SAMA's risk-based retention run side by side",
    ],
    [
      "MSOC licensing support",
      "Rarely addressed",
      "Architecture documented for Tier 1/Tier 2 licensing",
    ],
    ["Ownership at year three", "Still renting", "Fully yours"],
  ],
};

const ERRORS = [
  {
    title: "Assuming financial proximity means SAMA oversight",
    body: "Payment processors, lenders, and buy-now-pay-later platforms adjacent to financial services often assume SAMA CSF applies to them by default. It doesn't, absent direct licensing — though that same activity may still bring them under NCA ECC.",
  },
  {
    title: "Treating one framework as sufficient for both",
    body: "There's no crossover credit. An NCA ECC certification doesn't satisfy SAMA CSF, and the reverse is also true. Each regulator runs its own independent assessment.",
  },
  {
    title: "Believing outsourcing removes accountability",
    body: "Handing SIEM or SOC operations to a vendor moves the day-to-day execution, not the responsibility. Both frameworks hold your organization accountable regardless of who operates the tooling.",
  },
];

const PROVE = [
  "Continuous SIEM log aggregation and review, satisfying NCA ECC Control 2-12",
  "24/7 SOC monitoring capability, documented against SAMA CSF Subdomain 3.14",
  "Retention evidence held to both NCA's fixed minimums and SAMA's risk-based standard",
  "One audit trail that serves a pass/fail NCA assessment and a 0–5 SAMA maturity review, without duplicate systems",
  "Full platform ownership — no vendor contract standing between you and your own evidence",
];

const PROCESS = [
  {
    title: "Framework identification",
    body: "We run the three-step check against your organization — SAMA oversight, NCA critical-infrastructure designation, and MSOC licensing status — so you know exactly which framework, or both, applies before any build starts.",
  },
  {
    title: "Platform build, mapped to both clocks",
    body: "Data lake, detection logic, and SOC workflows engineered to Control 2-12's continuous monitoring and Subdomain 3.14's 24/7 SOC requirement, with retention policies for both frameworks running natively.",
  },
  {
    title: "Handover and audit-ready evidence",
    body: "Full ownership transfers to your team: infrastructure, documentation, and reporting formats for both an NCA pass/fail review and a SAMA maturity assessment.",
  },
];

const FAQS: Faq[] = [
  {
    q: "Can one organization need to comply with both NCA ECC and SAMA CSF?",
    a: "Yes — particularly critical-infrastructure-designated financial institutions and MSSPs serving SAMA-regulated clients. Each regulator assesses independently, so the platform has to satisfy both on its own terms.",
  },
  {
    q: "Is SAMA CSF just NCA ECC adapted for banks?",
    a: "No. Different regulators, different control structures, and different assessment models — pass/fail for NCA ECC, a 0–5 maturity scale for SAMA CSF.",
  },
  {
    q: "Does an NCA ECC certification satisfy SAMA CSF requirements?",
    a: "No. Each framework requires independent verification. Meeting one gives you no credit toward the other.",
  },
  {
    q: "How many controls does NCA ECC actually have?",
    a: "The current version, ECC-2:2024, has 108 main controls plus 92 sub-controls. The retired ECC-1:2018 had 114 — if you're being quoted 114, you're looking at the old version.",
  },
  {
    q: "What does SAMA CSF's Subdomain 3.14 actually require?",
    a: "SIEM infrastructure that aggregates security events, a SOC team providing round-the-clock response, and log storage that meets SAMA's retention standard. It typically requires Level 4 maturity — SAMA's highest bar for most domains.",
  },
  {
    q: "Which retention period wins if we're under both frameworks?",
    a: "They run as separate policies on the same data, not a single compromise setting. NCA ECC sets fixed minimums — 12 months, 18 for critical systems. SAMA CSF ties retention to your risk classification. We build one platform that satisfies both clocks natively.",
  },
  {
    q: "Do you handle NCA MSOC licensing?",
    a: "We architect and document your platform to meet MSOC Tier 1 or Tier 2 licensing requirements. The license itself is issued by the NCA to your organization — we build the platform that supports the application.",
  },
  {
    q: "Do we own this the way we own WhyCrew's other SIEM builds?",
    a: "Yes. This is a one-time platform build, not a managed subscription. At handover, the SIEM, SOC workflows, documentation, and all your compliance evidence are yours outright. No ongoing fees, no vendor lock-in.",
  },
  {
    q: "Where should we confirm what actually applies to us?",
    a: "Start with the three-step check we run during the Architecture Audit, then confirm against official NCA and SAMA documentation before finalizing a compliance program.",
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
        title="NCA ECC and SAMA CSF Both Require a SIEM. Stop Renting One."
        highlight={["Renting", "One."]}
        lead="Compliance doesn't rent well. Own the platform your audit runs on."
        intro={
          <>
            <p>
              WhyCrew builds the SIEM and SOC platform that satisfies NCA ECC
              Control 2-12 and SAMA CSF Subdomain 3.14, owned outright, not
              licensed. Whether one framework applies to you or both, you get
              one platform, audit-ready evidence in the format each regulator
              expects, and zero ongoing fees once it's handed over.
            </p>
            <ArrowList
              items={[
                "Meets NCA ECC Control 2-12 and SAMA CSF Subdomain 3.14 out of the box",
                "One platform whether one framework applies to you or both",
                "Full ownership at handover — no per-GB fees, no license renewal",
                "Architecture documented for NCA MSOC licensing and Level 4 SAMA maturity",
              ]}
            />
          </>
        }
        primaryCta={{
          label: "Book Your Compliance Architecture Audit",
          href: CTA_HREF,
        }}
        secondaryCta={{
          label: "See How the Frameworks Compare",
          href: "#frameworks",
        }}
        stats={STATS}
        breadcrumbName={svc.navLabel}
        breadcrumbPath={svc.href}
      />

      {/* ------------------------------------------------ who */}
      <Section>
        <Eyebrow>Who this is for</Eyebrow>
        <Heading sub="If your team is trying to work out whether NCA ECC, SAMA CSF, or both apply, and what a compliant SIEM actually has to do, this is where that gets resolved.">
          Who This Is For
        </Heading>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2">
          {WHO.map((w) => (
            <StaggerItem key={w.title}>
              <Card className="h-full p-7">
                <h3 className="text-[15px] font-semibold leading-snug">
                  {w.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                  {w.body}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ------------------------------------------------ frameworks */}
      <Section id="frameworks" className="border-y border-line/40 bg-ink/40">
        <Eyebrow>Two regulators, two independent frameworks</Eyebrow>
        <Heading sub="The National Cybersecurity Authority and the Saudi Central Bank operate without coordination. Satisfying one regulator's requirements gives you no assurance of compliance with the other's.">
          NCA ECC vs SAMA CSF, at a Glance
        </Heading>
        <Reveal className="mt-10">
          <CompareTable head={FRAMEWORK_TABLE.head} rows={FRAMEWORK_TABLE.rows} />
        </Reveal>

        <Reveal className="mt-10">
          <h3 className="mb-6 text-xl font-semibold">
            Where Dual Compliance Shows Up
          </h3>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {DUAL_CASES.map((c) => (
            <Reveal key={c.title}>
              <Card className="h-full p-7">
                <h3 className="text-[15px] font-semibold leading-snug">
                  {c.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                  {c.body}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="max-w-3xl text-[14px] leading-relaxed text-body">
            Not sure which case you're in? We cover the full three-step
            identification process — and the compliance errors that cost
            organizations the most time — in{" "}
            <a
              href="/blog/nca-ecc-vs-sama-csf"
              className="text-accent underline-offset-4 hover:underline"
            >
              NCA ECC vs SAMA CSF: Which One Applies to You?
            </a>
            .
          </p>
        </Reveal>
      </Section>

      {/* ------------------------------------------------ workflows */}
      <Section id="workflows">
        <Eyebrow tone="brand">What the platform actually does</Eyebrow>
        <Heading sub="Not a generic SIEM with a compliance label attached. Every workflow below is built against a specific control number or subdomain.">
          Six Requirements, One Platform
        </Heading>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2">
          {WORKFLOWS.map((w, i) => (
            <StaggerItem key={w.title}>
              <Card className="group h-full p-7">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] font-bold tracking-[0.14em] text-brand-hi transition-colors duration-400 group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[15px] font-semibold leading-snug">
                    {w.title}
                  </h3>
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                  {w.body}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ------------------------------------------------ vs licensed */}
      <Section className="border-y border-line/40 bg-ink/40">
        <Eyebrow tone="brand">Versus a licensed SIEM</Eyebrow>
        <Heading>WhyCrew vs Renting a SIEM for This</Heading>
        <Reveal className="mt-10">
          <CompareTable
            head={VENDOR_TABLE.head}
            rows={VENDOR_TABLE.rows}
            highlightCol={2}
          />
        </Reveal>
        <Reveal className="mt-6">
          <p className="max-w-3xl text-[14px] leading-relaxed text-body">
            A licensed SIEM or managed SOC contract can technically check the
            box for both frameworks. It rarely does so cleanly, and it never
            stops billing. One MSSP moved off exactly that kind of per-GB
            pricing onto an owned platform and{" "}
            <a
              href="/case-studies/siem-rent-to-owned-platform"
              className="text-accent underline-offset-4 hover:underline"
            >
              recovered $270K over 24 months
            </a>{" "}
            — the same economics apply whether the driver is cost, control, or
            a compliance deadline.
          </p>
        </Reveal>
      </Section>

      {/* ------------------------------------------------ common errors */}
      <Section>
        <Eyebrow tone="danger">Where programs go wrong</Eyebrow>
        <Heading sub="These three assumptions account for most of the wasted time we see before a build even starts.">
          Common Compliance Errors
        </Heading>

        <Stagger className="mt-12 grid gap-4">
          {ERRORS.map((e) => (
            <StaggerItem key={e.title}>
              <div className="group flex flex-col gap-2 rounded-md border border-line/50 bg-surface/35 p-6 transition-colors duration-400 hover:border-danger/30 sm:flex-row sm:gap-8">
                <h3 className="shrink-0 text-[14px] font-semibold text-bright sm:w-64">
                  {e.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-muted">
                  {e.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ------------------------------------------------ prove */}
      <Section className="border-y border-line/40 bg-ink/40">
        <Eyebrow>What you can prove</Eyebrow>
        <Heading>What WhyCrew Helps You Prove to Both Regulators</Heading>
        <Reveal className="mt-10">
          <Card className="p-8">
            <CheckList items={PROVE} />
          </Card>
        </Reveal>
      </Section>

      {/* ------------------------------------------------ process */}
      <Section id="process">
        <Eyebrow>Getting started</Eyebrow>
        <Heading sub="Three steps from framework identification to a platform your team owns outright.">
          Our 3-Step Process
        </Heading>
        <div className="mt-12">
          <ProcessSteps steps={PROCESS} />
        </div>
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
        title="Your Regulator Doesn't Rent Evidence."
        highlight="Neither Should You."
        body="Whether NCA ECC, SAMA CSF, or both apply to you, the SIEM and SOC platform behind your compliance program should be something you own, not something you pay for every month it exists."
        primary={{
          label: "Book Your Compliance Architecture Audit",
          href: CTA_HREF,
        }}
        secondary={{
          label: "See Custom SIEM & SOAR Development",
          href: "/services/custom-siem-soar-development",
        }}
        footnote="Purpose-built for NCA ECC & SAMA CSF · Full platform ownership · Zero ongoing fees"
      />
    </>
  );
}
