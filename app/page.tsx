import type { Metadata } from "next";
import Link from "next/link";
import { Backdrop } from "@/components/ui/backdrop";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/ui/faq";
import {
  ArrowList,
  Card,
  Eyebrow,
  Heading,
  Hairline,
  ProcessSteps,
  Quote,
  Section,
  StatBar,
} from "@/components/ui/primitives";
import {
  Marquee,
  Parallax,
  Reveal,
  Stagger,
  StaggerItem,
  WordsUp,
} from "@/components/motion";
import { faqLd, serviceListLd, type Faq } from "@/lib/jsonld";
import { CASE_STUDIES } from "@/lib/case-studies";
import { CTA_HREF, OG_IMAGE, SERVICES, SITE, TRUST_STRIP } from "@/lib/site";

export const metadata: Metadata = {
  // `absolute` opts out of the root layout's "%s | WhyCrew" title template.
  title: { absolute: "Own Your SIEM & SOC Platform | Custom Build for MSSPs" },
  description:
    "Stop renting your SIEM. WhyCrew builds a custom SIEM & SOC platform for MSSPs that you own — no per-GB fees, no lock-in, NIS2/DORA-ready. Book a call.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Own Your SIEM & SOC Platform | Custom Build for MSSPs",
    description:
      "Stop renting your SIEM. WhyCrew builds a custom SIEM & SOC platform for MSSPs that you own — no per-GB fees, no lock-in, NIS2/DORA-ready. Book a call.",
    url: SITE.url,
    images: OG_IMAGE,
  },
  twitter: {
    card: "summary_large_image",
    images: OG_IMAGE,
    title: "Own Your SIEM & SOC Platform | Custom Build for MSSPs",
    description:
      "Stop renting your SIEM. WhyCrew builds a custom SIEM & SOC platform for MSSPs that you own — no per-GB fees, no lock-in, NIS2/DORA-ready. Book a call.",
  },
};

/* ------------------------------------------------------------------ data */

const HERO_STATS = [
  { value: "40–70%", label: "SIEM Cost Cut" },
  { value: "24h", label: "NIS2 Reporting" },
  { value: "100%", label: "Platform Yours" },
  { value: "12 wks", label: "Call to Live" },
];

const DELIVERABLES = [
  {
    title: "Own Your SIEM Platform",
    body: "Multi-tenant platforms you fully own, with no per-GB licensing and no vendor dependency.",
  },
  {
    title: "Run AI Security Agents In-House",
    body: "Private LLM agents that keep every alert, investigation, and inference entirely within your own infrastructure.",
  },
  {
    title: "Go to Market Under Your Brand",
    body: "A rebrandable SOC platform that gets you to market fast, without building from scratch.",
  },
  {
    title: "Stay Audit-Ready for EU Regulators",
    body: "Stay audit-ready across NIS2 and DORA, without the manual overhead.",
  },
];

const MARGIN_FACTS = [
  {
    value: "40–70%",
    label:
      "Typical SIEM cost reduction after migration to a custom data lake",
  },
  {
    value: "Per-GB Pricing",
    label: "A structural margin problem for multi-tenant MSSPs",
  },
  {
    value: "12 weeks",
    label: "Standard timeline for zero-downtime SIEM migration",
  },
];

const SERVICE_DETAIL: Record<
  string,
  { intro: string; bullets: string[]; cta: string }
> = {
  "custom-siem-soar-development": {
    intro:
      "We build custom SIEM platforms to fit your exact operations: multi-tenant data lake architecture, custom detection engines, SOAR playbook development, and zero-downtime migration from any legacy or vendor-locked platform. Every component is engineered to your spec and delivered as a fully owned, production-ready platform.",
    bullets: [
      "Zero-downtime migration from legacy and vendor-locked SIEM platforms",
      "Multi-tenant data lake architecture",
      "Custom detection logic and correlation rules",
      "SOAR playbook engineering",
      "A fully deployed platform delivered as a permanent, owned asset, with no ongoing licensing required",
    ],
    cta: "Explore SIEM Engineering",
  },
  "ai-powered-soc-automation": {
    intro:
      "We deploy private LLM agents (Llama 3, Mistral, or your preferred open-weight model) directly inside your environment. All inference stays within your perimeter. No alert data leaves your infrastructure. The typical outcome is a 70–80% reduction in Tier-1 alert handling time.",
    bullets: [
      "On-premise LLM deployment with no external API dependency",
      "Automated alert triage and contextual enrichment",
      "Agentic SOAR workflows that adapt to your playbooks",
      "Perimeter-contained deployment architecture",
    ],
    cta: "Explore AI SOC Automation",
  },
  "mssp-engineering-partner": {
    intro:
      "Your customers see your logo, your domain, your brand. We provide the engineering, and everything we build is yours to own, including the source code. Production-ready in 12 weeks.",
    bullets: [
      "100% white-label interface and tenant portal",
      "Full source code ownership, everything we build is yours",
      "Customer relationships stay fully under your brand",
      "12-week deployment to production",
    ],
    cta: "Explore White-Label Partnership",
  },
  "nis2-dora-compliance-automation": {
    intro:
      "We automate NIS2 Article 21 risk management, 24-hour incident reporting, and DORA ICT resilience testing. We collect evidence automatically, format reports for regulators, and keep audit trails ready for supervisory review, with full EU data residency and regional hosting control.",
    bullets: [
      "Automated NIS2 incident reporting workflows",
      "DORA ICT risk management and resilience testing",
      "Evidence collection and audit trail automation",
      "EU data residency and regional hosting control",
    ],
    cta: "Explore Compliance Automation",
  },
  "nca-ecc-sama-csf-compliance": {
    intro:
      "We build the SIEM and SOC platform that satisfies NCA ECC Control 2-12 and SAMA CSF Subdomain 3.14, whether one framework applies to you or both. Owned outright at handover, with audit-ready evidence in the format each regulator expects and zero ongoing licensing fees.",
    bullets: [
      "Meets NCA ECC Control 2-12 and SAMA CSF Subdomain 3.14 out of the box",
      "One platform for organizations under either framework, or both",
      "Architecture documented for NCA MSOC licensing",
      "Full platform ownership at handover, no recurring fees",
    ],
    cta: "Explore NCA ECC & SAMA CSF Compliance",
  },
};

const RESULTS = [
  {
    metric: "€340K",
    unit: "Saved per year",
    body: "A German MSSP with 40+ enterprise clients migrated from a legacy SIEM platform to a custom-built Elasticsearch data lake. Zero downtime, delivered over 6 weeks.",
  },
  {
    metric: "12 min",
    unit: "Average alert-to-resolution time",
    body: "A Netherlands-based SOC handling 12,000 daily alerts deployed our on-premise LLM triage agents. Tier-1 analyst workload dropped by 78%.",
  },
  {
    metric: "3 wks",
    unit: "NIS2 audit readiness",
    body: "A French financial services firm (€2B AUM) used WhyCrew to map, document, and automate all 10 NIS2 Article 21 measures before a supervisory audit.",
  },
];

/**
 * The four studies surfaced on the homepage, in the order the section is meant
 * to read, each paired with the one figure its card leads on.
 *
 * `metric` names a label from that study's own `metrics` in the registry, and
 * the value is looked up rather than repeated here, so a figure can never
 * drift between the card and the study page. It is a label and not an index
 * because the lead figure is not always the study's first metric — the
 * threat-intel study leads on triage reduction, not the licence saving — and
 * because a wrong label fails the build instead of silently showing the wrong
 * number.
 */
const FEATURED_STUDIES = [
  { slug: "mssp-engineering-capacity-pod", metric: "Engineering output vs. one hire" },
  { slug: "owned-threat-intelligence-pipeline", metric: "Reduction in manual triage" },
  { slug: "in-house-dark-web-monitoring", metric: "Annual vendor bill eliminated" },
  { slug: "siem-rent-to-owned-platform", metric: "Saved across 24 months" },
].map(({ slug, metric }) => {
  const study = CASE_STUDIES.find((c) => c.slug === slug);
  if (!study) throw new Error(`Unknown case study slug: ${slug}`);
  const lead = study.metrics.find((m) => m.label === metric);
  if (!lead) throw new Error(`${slug} has no metric labelled "${metric}"`);
  return { slug, title: study.title, lead };
});

const PROJECT_RESULTS = [
  { value: "62%", label: "SIEM Cost Reduction" },
  { value: "0 hours", label: "Migration Downtime" },
  { value: "6 weeks", label: "Time to Production" },
  { value: "100%", label: "Platform Ownership" },
];

const PROCESS = [
  {
    title: "We Review Your Current Environment",
    body: "Share your SIEM bills, alert backlog, and compliance gaps. We assess your existing setup, pinpoint where you're losing money and time, and deliver a fixed-price proposal. No hourly billing, no scope creep.",
  },
  {
    title: "We Design Your Architecture",
    body: "You get a full blueprint: data lake schema, AI agent workflows, and compliance rules. Every component is reviewed and approved by you before we write a single line of code.",
  },
  {
    title: "We Build in 2-Week Sprints",
    body: "Every two weeks, you see working software deployed to your staging environment and tested with real data. We iterate fast. No black-box development, no surprises.",
  },
  {
    title: "We Hand You the Keys",
    body: "You receive a fully owned platform, ready for your team to run, with full technical handover included. We stay available for upgrades and support, but the platform is yours to run and evolve. You set the roadmap. You decide what comes next.",
  },
];

const FAQS: Faq[] = [
  {
    q: "What is the difference between WhyCrew and a subscription SIEM vendor?",
    a: "Subscription vendors sell access to their platform under per-GB licensing. WhyCrew builds a custom platform and transfers full ownership to you. You control the roadmap, the data, and the economics. We're an engineering partner, not a SaaS provider.",
  },
  {
    q: "Do you only work with European MSSPs?",
    a: "No. Our strongest track record is in Europe, across NIS2, DORA, and GDPR, but the same architecture and ownership model applies to MSSPs and regulated operators everywhere.",
  },
  {
    q: "How much does a typical SIEM migration cost?",
    a: "It depends on your ingestion volume, retention needs, and integration complexity. Most clients see a 40–70% cost reduction within the first 12 months. You’ll get a fixed-price proposal after an initial architecture audit.",
  },
  {
    q: "Do you own the platform WhyCrew builds for you?",
    a: "Yes. Every engagement transfers full ownership — the platform, the source code, and all underlying infrastructure to you. You control the roadmap and the data, with no ongoing licensing and no vendor dependency. You also get API documentation, deployment runbooks, and hands-on engineering training, so your team can run and evolve it independently.",
  },
  {
    q: "Is the AI SOC automation truly on-premise?",
    a: "Yes. We deploy open-weight LLMs directly on your infrastructure or your own cloud tenant. No external AI services. No data leaves your perimeter, ever.",
  },
  {
    q: "Can you help us meet NIS2 Article 21 requirements?",
    a: "Yes. We implement NIS2 Article 21 as a structured engineering service, covering incident detection, 24-hour reporting, evidence collection, and supervisory notification. One French financial services client was fully audit-ready in three weeks.",
  },
  {
    q: "How long does implementation take?",
    a: "Standard SIEM migration and platform builds take 12 weeks from kickoff to production. White-label MSSP platforms deploy in 12 weeks as well. NIS2 compliance automation typically takes 4 to 6 weeks depending on integration depth.",
  },
];

/* ------------------------------------------------------------------ page */

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListLd()) }}
      />

      {/* ============================================ HERO */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">
        <Backdrop />
        <div className="container-page">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.9rem]">
              <WordsUp text="Own Your SIEM & SOC Platform" delay={0.15} />
              <br className="hidden sm:block" />{" "}
              <WordsUp
                text="Built for MSSPs, Not Rented From Vendors"
                delay={0.42}
                gradient
              />
            </h1>

            <Reveal delay={0.85} distance={16} mount>
              <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-relaxed text-body sm:text-base">
                Your SIEM shouldn&apos;t be a subscription. We design, build,
                and hand you a custom SIEM and SOC platform powered by in-house
                AI agents, fully yours, with no per-GB fees and no vendor
                lock-in, engineered for MSSPs and regulated operators across
                Europe&apos;s and Saudi Arabia&apos;s toughest regulatory
                environments (NIS2, DORA, GDPR, NCA ECC, SAMA CSF). You own the
                roadmap, cut licensing costs for good, and keep complete control
                of your data.
              </p>
            </Reveal>

            <Reveal delay={1} distance={14} mount>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Button href={CTA_HREF}>Book a 20-Min Strategy Call</Button>
                <Button href="/case-studies" variant="ghost">
                  Read the Case Studies
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={1.15} className="mx-auto mt-16 max-w-4xl" mount>
            <StatBar stats={HERO_STATS} />
          </Reveal>
        </div>
      </section>

      {/* ============================================ TRUST MARQUEE */}
      <div className="relative border-y border-line/50 bg-ink/60 py-4">
        <Marquee items={TRUST_STRIP} />
      </div>

      {/* ============================================ AT A GLANCE */}
      <Section id="deliver">
        <Eyebrow>What we deliver — at a glance</Eyebrow>
        <Heading sub="One engineering partner. Full ownership at every layer.">
          Custom SIEM, SOC &amp; Compliance Platforms At a Glance
        </Heading>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DELIVERABLES.map((d) => (
            <StaggerItem key={d.title}>
              <Card className="group h-full p-6">
                <span className="mb-5 grid size-9 place-items-center rounded-md border border-accent/30 bg-accent/10 text-accent transition-all duration-500 group-hover:scale-110 group-hover:border-accent/60">
                  <svg viewBox="0 0 16 16" className="size-3.5" fill="none">
                    <path
                      d="M8 1.5l1.9 4.1 4.6.5-3.4 3.1.9 4.4L8 11.4l-4 2.2.9-4.4L1.5 6.1l4.6-.5L8 1.5z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <h3 className="text-[15px] font-semibold leading-snug">
                  {d.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
                  {d.body}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ============================================ MARGIN PROBLEM */}
      <Section className="border-y border-line/40 bg-ink/40">
        <Backdrop variant="section" />
        <Eyebrow tone="brand">The licensing problem</Eyebrow>
        <Heading
          sub={
            <>
              Vendor SIEM licensing scales with ingestion volume, retention
              periods, and feature tiers. For MSSPs managing multiple tenants,
              that model creates real margin pressure. Your costs grow with
              every new client, but your service pricing usually stays fixed.
              Custom SIEM development breaks that dependency. You own the
              infrastructure, control the roadmap, and eliminate per-GB
              licensing.
            </>
          }
        >
          Why MSSPs Move Away From Vendor-Locked SIEM Tools
        </Heading>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {MARGIN_FACTS.map((f) => (
            <StaggerItem key={f.value}>
              <Card className="h-full p-7 text-center">
                <div className="text-2xl font-semibold text-gradient sm:text-[1.75rem]">
                  {f.value}
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-muted">
                  {f.label}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ============================================ SERVICES */}
      <Section id="services">
        <Eyebrow>We build it. You own it.</Eyebrow>
        <Heading sub="Each service includes fully owned platform source code, documentation, and training.">
          Security Platform Engineering Services for MSSPs
        </Heading>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {SERVICES.map((s, i) => {
            const d = SERVICE_DETAIL[s.slug];
            return (
              <Reveal key={s.slug} delay={i * 0.08}>
                <Card className="group flex h-full flex-col p-7 sm:p-8">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold leading-snug text-bright transition-colors duration-400 group-hover:text-accent-hi sm:text-xl">
                      {s.name}
                    </h3>
                    <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="text-[13.5px] leading-relaxed text-body">
                    {d.intro}
                  </p>

                  <div className="my-6">
                    <Hairline />
                  </div>

                  <ArrowList items={d.bullets} />

                  <div className="mt-7 pt-1">
                    <Button href={s.href} variant="quiet">
                      {d.cta}
                    </Button>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ============================================ RESULTS */}
      <Section id="results" className="border-y border-line/40 bg-ink/40">
        <Backdrop variant="section" />
        <Eyebrow>Real results from real deployments</Eyebrow>
        <Heading sub="No projections, no rounded-up numbers — just what actually happened after they switched.">
          What Teams Save When They Stop Renting.
        </Heading>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {RESULTS.map((r) => (
            <StaggerItem key={r.metric}>
              <Card className="h-full p-7">
                <div className="text-2xl font-semibold text-accent sm:text-3xl">
                  {r.metric}
                </div>
                <div className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint">
                  {r.unit}
                </div>
                <p className="mt-5 text-[13.5px] leading-relaxed text-muted">
                  {r.body}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-8">
          <Quote author="Marcus Weber" role="CTO, NordSec GmbH, Hamburg, Germany">
            We were paying €45,000 per month in SIEM licensing. WhyCrew built a
            replacement data lake, migrated 18 months of logs with zero
            downtime, and trained our engineering team in four weeks.
          </Quote>
        </Reveal>

        <Reveal className="mt-8">
          {/* These are the NordSec engagement's own measured figures, not a
              site-wide average. Labelling them keeps the 62% here from reading
              as a contradiction of the 40–70% typical range quoted above. */}
          <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint">
            NordSec GmbH engagement
          </p>
          <div className="grid grid-cols-2 divide-line/60 overflow-hidden rounded-lg border border-line/70 bg-surface/40 sm:grid-cols-4 sm:divide-x">
            {PROJECT_RESULTS.map((p) => (
              <div key={p.label} className="px-5 py-7 text-center">
                <div className="text-2xl font-semibold text-bright sm:text-3xl">
                  {p.value}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                  {p.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* -------------------------------------- case studies */}
        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2">
          {FEATURED_STUDIES.map((c) => (
            <StaggerItem key={c.slug}>
              <Link
                href={`/case-studies/${c.slug}`}
                className="group flex h-full flex-col rounded-lg border border-line/70 bg-surface/75 p-7 transition-colors duration-500 hover:border-accent/40"
              >
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-faint">
                  Case study
                </p>

                {/*
                  h3, not h2: these sit under the section's own h2, the same
                  level the results cards above them occupy.
                */}
                <h3 className="mt-4 text-[15px] font-semibold leading-snug text-bright transition-colors duration-400 group-hover:text-accent-hi">
                  {c.title}
                </h3>

                <p className="mt-5 flex flex-wrap items-baseline gap-2.5">
                  <span className="text-2xl font-semibold text-accent">
                    {c.lead.value}
                  </span>
                  <span className="text-[13.5px] leading-relaxed text-muted">
                    {c.lead.label}
                  </span>
                </p>

                <span className="mt-auto pt-6 text-[13px] font-semibold text-accent">
                  Read the case study{" "}
                  <span className="inline-block transition-transform duration-400 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10 flex justify-center">
          <Button href="/case-studies">View All Case Studies</Button>
        </Reveal>
      </Section>

      {/* ============================================ PROCESS */}
      <Section id="how-it-works">
        <Eyebrow>How it works</Eyebrow>
        <Heading sub="One fixed price. Four stages. You approve every decision, and you walk away owning everything.">
          Deploy Your Custom SIEM in 12 Weeks, Not 18 Months
        </Heading>
        <div className="mt-12">
          <ProcessSteps steps={PROCESS} />
        </div>
      </Section>

      {/* ============================================ FAQ */}
      <Section id="faq" className="border-y border-line/40 bg-ink/40">
        <Eyebrow>Before you book a call</Eyebrow>
        <Heading>
          Frequently Asked Questions About Custom SIEM &amp; SOC Platforms
        </Heading>
        <div className="mt-10">
          <FaqAccordion faqs={FAQS} />
        </div>
      </Section>

      {/* ============================================ CLOSING CTA */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <Backdrop />
        <Parallax amount={40} className="container-page relative text-center">
          <Reveal>
            <h2 className="text-3xl font-semibold leading-tight sm:text-5xl">
              Stop Renting. <span className="text-gradient">Start Owning.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-body">
              Book a 20-minute call. We review your current environment, model
              your savings, and show you exactly what we&apos;d build. No pitch
              deck, just engineering.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button href={CTA_HREF}>Book Your Free Strategy Call</Button>
              <Button
                href="/whycrew-mssp-guide-to-nis2.pdf"
                variant="ghost"
                download
              >
                Download: &ldquo;The MSSP&apos;s Guide to NIS2&rdquo;
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-8 font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">
              Engineering-led team · GDPR-aligned deployment options · NIS2
              reporting built in · No sales team, you talk to engineers
            </p>
          </Reveal>
        </Parallax>
      </section>
    </>
  );
}
