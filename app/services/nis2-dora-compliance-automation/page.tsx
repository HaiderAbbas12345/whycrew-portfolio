import type { Metadata } from "next";
import { ServiceCta, ServiceHero } from "@/components/sections/service-shell";
import { FaqAccordion } from "@/components/ui/faq";
import {
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
import { CTA_HREF, serviceBySlug } from "@/lib/site";

const svc = serviceBySlug("nis2-dora-compliance-automation");

export const metadata: Metadata = {
  title: "NIS2 & DORA Compliance Automation",
  description: svc.metaDescription,
  alternates: { canonical: svc.href },
  openGraph: {
    title: svc.metaTitle,
    description: svc.metaDescription,
    url: svc.href,
  },
};

const STATS = [
  { value: "24h / 4h", label: "NIS2 / DORA Reporting" },
  { value: "30 days", label: "To Gap Report" },
  { value: "10", label: "Article 21 Domains" },
  { value: "€10M", label: "Max NIS2 Exposure" },
];

const WHO = [
  {
    title: "Essential entities under NIS2",
    body: "Energy, transport, healthcare, banking, digital infrastructure, and MSPs in scope since October 2024.",
  },
  {
    title: "Financial entities and ICT service providers under DORA",
    body: "Banks, insurers, investment firms, and critical technology suppliers in scope since January 2025.",
  },
  {
    title: "MSSPs managing compliance for regulated clients",
    body: "One team handling compliance across multiple organizations at once.",
  },
  {
    title: "Organizations under both frameworks",
    body: "The most common scenario, and the one most compliance tools aren't designed for.",
  },
];

const PRESSURE = [
  {
    title: "NIS2 24-hour incident reporting",
    body: "Demands real-time detection, structured evidence, and routed notifications — not an on-call escalation chain you're scrambling to activate at 2 am.",
  },
  {
    title: "DORA register of information",
    body: "Must stay current and regulator-ready at all times — not assembled under pressure in the weeks before a review.",
  },
  {
    title: "NIS2 Article 21 controls",
    body: "Span ten security domains, each requiring mapped controls, documented evidence, and continuous monitoring.",
  },
  {
    title: "DORA third-party risk",
    body: "Calls for structured supplier assessments, contractual clause tracking, and ongoing monitoring of critical ICT providers.",
  },
  {
    title: "NIS2 penalty fines",
    body: "Reach €10 million or 2% of global annual turnover per violation — with personal liability for senior management.",
  },
];

const WORKFLOWS = [
  {
    title: "Automated Incident Reporting",
    body: "Every incident notification is detected, structured, timestamped, and routed to the correct competent authority — automatically, without exception. NIS2's 24-hour window and DORA's 4-hour initial alert requirement are met every time.",
  },
  {
    title: "ICT Risk Management",
    body: "Your risk register is mapped directly to DORA ICT risk requirements and NIS2 Article 21 controls — scored continuously, monitored in real time, and always audit-ready.",
  },
  {
    title: "NIS2 Gap Assessment",
    body: "Controls are benchmarked against NIS2 Article 21, gaps are identified, and a prioritized remediation roadmap is delivered within 30 days of onboarding.",
  },
  {
    title: "NIS2 Article 21 Control Mapping",
    body: "All ten security domains are mapped, documented, and evidenced inside the platform: policies, incident handling, business continuity, supply chain, procurement, access control, cryptography, human resources, asset management, and MFA.",
  },
  {
    title: "Supply Chain & Third-Party Risk",
    body: "Structured supplier questionnaires, continuous vendor scoring, and ongoing monitoring run automatically, covering NIS2 supply chain and DORA third-party risk requirements in one workflow.",
  },
  {
    title: "DORA Register of Information",
    body: "Maintained automatically and kept structured for regulatory review — available the moment a regulator asks, never assembled under last-minute pressure.",
  },
  {
    title: "DORA Resilience Testing",
    body: "Your resilience testing program, including TLPT scoping and execution under DORA Article 26, is planned, tracked, and documented inside the platform. Every requirement stays accounted for without manual coordination.",
  },
  {
    title: "Always Audit-Ready",
    body: "Regulator-ready evidence packs, control documentation, and board-level compliance summaries are generated on schedule or on demand, whenever you need them, without delay.",
  },
];

const FRAMEWORK_TABLE = {
  head: ["", "NIS2", "DORA"],
  rows: [
    [
      "Scope",
      "Essential entities across 18+ sectors: energy, transport, healthcare, banking, and digital infrastructure",
      "Financial entities and their critical ICT third-party providers: banks, insurers, investment firms, and technology suppliers",
    ],
    [
      "Incident reporting",
      "24-hour initial notification. 72-hour detailed report to competent authority",
      "4-hour initial alert. Full incident report within 24 hours",
    ],
    [
      "Risk management focus",
      "Organization-wide cybersecurity risk controls across all operational domains",
      "ICT-specific risk governance and operational continuity",
    ],
    [
      "Third-party obligations",
      "Supply chain security and vendor oversight requirements",
      "Mandatory supplier assessments, contractual controls, and ongoing ICT provider monitoring",
    ],
    [
      "Resilience testing",
      "General business continuity and resilience testing",
      "Threat-led penetration testing (TLPT) under DORA Article 26",
    ],
    [
      "Penalties",
      "Up to €10M or 2% of global annual turnover, with personal liability for senior management",
      "Up to €5M for individuals; up to 1% of daily global turnover for each day of violation",
    ],
    ["In force since", "October 2024", "January 17, 2025"],
  ],
};

const GRC_TABLE = {
  head: ["", "Manual Compliance Programs", "Generic GRC Platforms", "WhyCrew"],
  rows: [
    ["NIS2 & DORA specific coverage", "Partial", "Template-based", "Purpose-built"],
    ["Automated incident reporting", "No", "No", "Yes"],
    ["Continuous risk monitoring", "No", "Limited", "Yes"],
    ["DORA register of information", "Manual", "Manual", "Automated"],
    ["NIS2 Article 21 control mapping", "Manual", "Template-based", "Automated"],
    ["Audit-ready evidence generation", "Manual", "Partial", "On-demand"],
    ["Multi-framework evidence reuse", "No", "No", "Yes"],
    ["Built for MSSPs and essential entities", "No", "No", "Yes"],
  ],
};

const PROVE = [
  "Incident notifications routed and delivered within NIS2 and DORA reporting windows — automatically, every time",
  "DORA register of information kept current and ready for regulatory review at any point",
  "NIS2 Article 21 controls fully documented and evidenced across all ten security domains",
  "Third-party supplier risk scored and monitored under both frameworks through a single workflow",
  "Gap assessment and prioritized remediation roadmap delivered within 30 days of onboarding",
  "Audit preparation time reduced from weeks to hours",
  "Board-level compliance reporting generated on schedule or on demand",
];

const PROCESS = [
  {
    title: "Assessment and gap mapping",
    body: "We onboard your environment, run your NIS2 gap assessment and DORA readiness review, and deliver a prioritized gap report within 30 days — so you know exactly where you stand before a regulator asks.",
  },
  {
    title: "Workflow automation",
    body: "We configure automated workflows for incident detection and reporting, ICT risk scoring, register of information maintenance, and third-party risk assessment. Every recurring workflow runs independently, with no manual hand-off required.",
  },
  {
    title: "Continuous monitoring and reporting",
    body: "We track your compliance posture in real time and generate audit evidence packs, board summaries, and regulator-ready reports — on schedule or on demand — so your team is never caught off guard.",
  },
];

const FAQS: Faq[] = [
  {
    q: "Who does NIS2 apply to?",
    a: "NIS2 covers essential entities across 18+ EU sectors, including energy, transport, healthcare, banking, and managed service providers. Organizations with 50+ employees and over €10M annual turnover are typically in scope.",
  },
  {
    q: "What is the difference between NIS2 and DORA?",
    a: "NIS2 is a broad cybersecurity directive for essential entities across industries. DORA focuses on financial entities and their critical ICT providers. Many organizations fall under both. WhyCrew manages them together, covering every requirement across both frameworks without duplication.",
  },
  {
    q: "What are the NIS2 penalty fines?",
    a: "Essential entities face fines up to €10M or 2% of global annual turnover. Important entities face up to €7M or 1.4%. Senior management can also be held personally liable.",
  },
  {
    q: "How quickly can WhyCrew close our compliance gaps?",
    a: "Most organizations have their gap assessment, remediation roadmap, and automated workflows operational within 30 days of onboarding.",
  },
  {
    q: "Does WhyCrew handle both NIS2 and DORA at once?",
    a: "Yes. Controls, evidence workflows, and compliance requirements across both frameworks are mapped together. No duplication, no parallel programs to maintain.",
  },
  {
    q: "Is WhyCrew suitable for MSSPs?",
    a: "Yes. The platform supports multi-tenant environments, so MSSPs can manage compliance across their entire client base from a single interface.",
  },
  {
    q: "Do we own this the way we own WhyCrew's SIEM or AI SOC builds?",
    a: "Not in the same sense — and that's intentional. Our SIEM, SOAR, and AI SOC engagements are one-time platform handovers: we build, you own, no ongoing dependency. Compliance automation works differently. NIS2 and DORA obligations don't end when a project closes — they run continuously for as long as you're in scope, so we run with them as an ongoing managed program. What stays constant across every engagement is this: your data and evidence are always yours, there's no lock-in, and you can export everything and leave at any time.",
  },
  {
    q: "What is NIS2 Article 21?",
    a: "NIS2 Article 21 defines the ten cybersecurity risk management measures that essential entities must implement and document. WhyCrew maps all ten domains automatically.",
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
              serviceType: "NIS2 and DORA compliance automation",
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
        title="NIS2 and DORA Don't Wait for Your Team to Catch Up."
        highlight={["Catch", "Up."]}
        lead="Compliance that runs without you holding it together."
        intro={
          <>
            <p>
              WhyCrew is a compliance automation partner for organizations
              operating under NIS2, DORA, or both. We automate the requirements
              directly — incident reporting, ICT risk management, gap
              assessment, third-party risk, and audit evidence. Everything runs
              continuously, so your team can focus on exceptions, decisions, and
              remediation instead of recurring compliance admin.
            </p>
          </>
        }
        primaryCta={{ label: "Book a Compliance Assessment", href: CTA_HREF }}
        secondaryCta={{ label: "Compare NIS2 vs DORA", href: "#frameworks" }}
        stats={STATS}
        breadcrumbName={svc.navLabel}
        breadcrumbPath={svc.href}
      />

      {/* ------------------------------------------------ who */}
      <Section>
        <Eyebrow>Who this is for</Eyebrow>
        <Heading sub="If your team is managing NIS2 incident reporting, DORA ICT risk, or cross-framework audit prep through spreadsheets or disconnected GRC tools, this is where the manual work stops.">
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

        <Reveal className="mt-8">
          <Card className="p-7" interactive={false}>
            <p className="text-[13.5px] leading-relaxed text-body">
              This engagement works differently from our SIEM, SOAR, and AI SOC
              builds — those are platforms we build once, hand over completely,
              and walk away from. Compliance automation can&apos;t follow that
              model. NIS2 and DORA obligations don&apos;t end when a project
              closes — they run for as long as you&apos;re in scope, so we run
              with them as an ongoing managed program.
            </p>
            <p className="mt-4 text-[13.5px] leading-relaxed text-body">
              <strong className="font-semibold text-bright">
                What stays constant across every engagement is this:
              </strong>{" "}
              your data and evidence are always yours. There&apos;s no lock-in,
              and you can export everything and leave at any time.
            </p>
          </Card>
        </Reveal>
      </Section>

      {/* ------------------------------------------------ pressure */}
      <Section className="border-y border-line/40 bg-ink/40">
        <Eyebrow tone="danger">Where programs break</Eyebrow>
        <Heading sub="Most organizations don't fail compliance audits because they ignored the regulations. They fail because the operational weight of keeping up across reporting windows, evidence requirements, and vendor oversight eventually outpaces what any team can sustain.">
          Where Compliance Programs Break Under Pressure
        </Heading>

        <Stagger className="mt-12 grid gap-4">
          {PRESSURE.map((p) => (
            <StaggerItem key={p.title}>
              <div className="group flex flex-col gap-2 rounded-md border border-line/50 bg-surface/35 p-6 transition-colors duration-400 hover:border-danger/30 sm:flex-row sm:gap-8">
                <h3 className="shrink-0 text-[14px] font-semibold text-bright sm:w-64">
                  {p.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-muted">
                  {p.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-8">
          <p className="text-[14px] leading-relaxed text-body">
            Most teams know exactly what NIS2 and DORA require. Delivering it
            consistently, at the pace regulators expect, is where programs break
            down.
          </p>
        </Reveal>
      </Section>

      {/* ------------------------------------------------ workflows */}
      <Section id="workflows">
        <Eyebrow tone="brand">The compliance workflows we automate</Eyebrow>
        <Heading sub="WhyCrew replaces manual compliance workflows with purpose-built automation, designed for NIS2 and DORA from the ground up, not adapted from a generic GRC template.">
          Eight workflows that stop being manual
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

      {/* ------------------------------------------------ frameworks */}
      <Section id="frameworks" className="border-y border-line/40 bg-ink/40">
        <Eyebrow>NIS2 vs DORA</Eyebrow>
        <Heading sub="NIS2 and DORA differ in scope, reporting timelines, and enforcement, but both require incident reporting, third-party risk management, and compliance documentation. For organizations subject to both, WhyCrew manages the overlap in one place, under one program.">
          Key Differences and Where They Overlap
        </Heading>
        <Reveal className="mt-10">
          <CompareTable head={FRAMEWORK_TABLE.head} rows={FRAMEWORK_TABLE.rows} />
        </Reveal>
        <Reveal className="mt-6">
          <p className="max-w-3xl text-[14px] leading-relaxed text-body">
            Where those requirements intersect, WhyCrew maps evidence once and
            satisfies both frameworks. No duplication, no conflicting workflows,
            and no need to maintain two separate programs.
          </p>
        </Reveal>
      </Section>

      {/* ------------------------------------------------ vs GRC */}
      <Section>
        <Eyebrow tone="brand">Versus generic GRC</Eyebrow>
        <Heading>WhyCrew Automates What GRC Platforms Leave to You</Heading>
        <Reveal className="mt-10">
          <CompareTable
            head={GRC_TABLE.head}
            rows={GRC_TABLE.rows}
            highlightCol={3}
          />
        </Reveal>
        <Reveal className="mt-6">
          <p className="max-w-3xl text-[14px] leading-relaxed text-body">
            WhyCrew isn&apos;t a framework overlay. It&apos;s a compliance
            automation engine built for the specific regulatory demands that
            NIS2 and DORA place on essential entities, financial operators, and
            the MSSPs that serve them.
          </p>
        </Reveal>
      </Section>

      {/* ------------------------------------------------ prove */}
      <Section className="border-y border-line/40 bg-ink/40">
        <Eyebrow>What you can prove</Eyebrow>
        <Heading>What WhyCrew Helps You Prove to Regulators</Heading>
        <Reveal className="mt-10">
          <Card className="p-8">
            <CheckList items={PROVE} />
          </Card>
        </Reveal>
      </Section>

      {/* ------------------------------------------------ process */}
      <Section id="process">
        <Eyebrow>Getting started</Eyebrow>
        <Heading sub="Three steps from onboarding to a compliance program that runs itself.">
          Our 3-Step Process
        </Heading>
        <div className="mt-12">
          <ProcessSteps steps={PROCESS} />
        </div>
      </Section>

      {/* ------------------------------------------------ faq */}
      <Section id="faq" className="border-t border-line/40 bg-ink/40">
        <Eyebrow>Frequently asked questions</Eyebrow>
        <Heading>NIS2 &amp; DORA, answered</Heading>
        <div className="mt-10">
          <FaqAccordion faqs={FAQS} />
        </div>
      </Section>

      <ServiceCta
        title="Your Regulators"
        highlight="Are Not Waiting."
        body="NIS2 is enforceable now. DORA has been in force since January 2025. Every week your program runs on manual processes, your exposure grows — and your team absorbs work that automation should be doing."
        primary={{
          label: "Book Your NIS2 & DORA Compliance Assessment",
          href: "/contact",
        }}
        secondary={{ label: "Talk to a Compliance Specialist", href: "/contact" }}
        footnote="Purpose-built for NIS2 and DORA · Your evidence stays yours · Export and leave at any time"
      />
    </>
  );
}
