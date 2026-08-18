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
  Pill,
  ProcessSteps,
  Quote,
  Section,
  StatBar,
} from "@/components/ui/primitives";
import {
  CountUp,
  Marquee,
  Parallax,
  Reveal,
  Stagger,
  StaggerItem,
  WordsUp,
} from "@/components/motion";
import { faqLd, serviceListLd, type Faq } from "@/lib/jsonld";
import { CTA_HREF, SERVICES, SITE, TRUST_STRIP } from "@/lib/site";

export const metadata: Metadata = {
  title: "Custom Security Platform Development for MSSPs",
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Custom Security Platform Development for MSSPs | WhyCrew",
    description: SITE.description,
    url: SITE.url,
  },
};

/* ------------------------------------------------------------------ data */

const HERO_STATS = [
  { value: "60%", label: "SIEM Cost Cut" },
  { value: "24h", label: "NIS2 Reporting" },
  { value: "100%", label: "Source Code Yours" },
  { value: "12 wks", label: "Call to Live" },
];

const DELIVERABLES = [
  {
    title: "Own Your SIEM Platform",
    body: "Multi-tenant platforms you fully own, with no per-GB licensing and no vendor dependency.",
  },
  {
    title: "Deploy AI Agents In-House",
    body: "Private LLM agents that keep every alert, investigation, and inference entirely within your own infrastructure.",
  },
  {
    title: "Go to Market Under Your Brand",
    body: "A rebrandable SOC platform that gets you to market fast, without building from scratch.",
  },
  {
    title: "Automate EU Compliance",
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
    value: "6–8 weeks",
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

const PROJECT_RESULTS = [
  { to: 62, suffix: "%", label: "SIEM Cost Reduction" },
  { to: 0, suffix: " hours", label: "Migration Downtime" },
  { to: 6, suffix: " weeks", label: "Time to Production" },
  { to: 100, suffix: "%", label: "Platform Ownership" },
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
    body: "You receive a fully owned platform, complete with API docs, runbooks, and hands-on training. We stay available for upgrades and support, but the platform is yours to run and evolve. You set the roadmap. You decide what comes next.",
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
    a: "Projects are scoped and priced individually based on log volume, retention requirements, and integration complexity. Most clients see a 40–70% reduction in total SIEM cost within the first 12 months. You receive a fixed-price proposal after the initial architecture audit.",
  },
  {
    q: "Do you own the platform WhyCrew builds for you?",
    a: "Yes. Everything we build is yours: the platform, the source code, and all underlying components. We provide the engineering, and you own the output outright. That means you control the infrastructure, the roadmap, and the data, with no ongoing licensing and no vendor dependency. Every engagement includes API documentation, deployment runbooks, and hands-on engineering training so your team can run and evolve it independently.",
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
    a: "Standard SIEM migration and platform builds take 8 to 12 weeks from kickoff to production. White-label MSSP platforms deploy in 8 weeks. NIS2 compliance automation typically takes 4 to 6 weeks depending on integration depth.",
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
            <Reveal duration={0.7}>
              <Pill>Engineering Partner for MSSPs &amp; Regulated Operators</Pill>
            </Reveal>

            <h1 className="mt-8 text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.9rem]">
              <WordsUp
                text="The Engineering Partner Behind"
                delay={0.15}
              />
              <br className="hidden sm:block" />{" "}
              <WordsUp text="Independent Security Teams" delay={0.42} gradient />
            </h1>

            <Reveal delay={0.85} distance={16}>
              <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-relaxed text-body sm:text-base">
                We build custom security platforms, AI agents, and compliance
                automation for MSSPs and regulated operators — with a track
                record across Europe&apos;s most demanding regulatory
                environments, including NIS2, DORA, and GDPR. No subscriptions.
                No vendor lock-in. We design your architecture, build the
                platform, deliver it as a fully owned asset, and train your
                team. You cut licensing costs, own the roadmap, and keep
                complete control of your data.
              </p>
            </Reveal>

            <Reveal delay={1} distance={14}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Button href={CTA_HREF}>Book a 20-Min Strategy Call</Button>
                <Button href="/#results" variant="ghost">
                  See SIEM Migration Results
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={1.15} className="mx-auto mt-16 max-w-4xl">
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
          What We Deliver, At a Glance
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
        <Eyebrow tone="brand">
          Why MSSPs move away from vendor-locked SIEM tools
        </Eyebrow>
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
          Vendor licensing scales — your pricing usually doesn&apos;t
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
        <Heading sub="Four core engineering services, each delivered as a fully owned asset with source code, documentation, and training included.">
          Four core engineering services
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
        <Heading sub="Europe's toughest regulatory environments are where we've built our track record. The same architecture and ownership model applies everywhere else.">
          Europe&apos;s toughest regulatory environments — proven track record
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
          <div className="grid grid-cols-2 divide-line/60 overflow-hidden rounded-lg border border-line/70 bg-surface/40 sm:grid-cols-4 sm:divide-x">
            {PROJECT_RESULTS.map((p) => (
              <div key={p.label} className="px-5 py-7 text-center">
                <div className="text-2xl font-semibold text-bright sm:text-3xl">
                  <CountUp to={p.to} suffix={p.suffix} />
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                  {p.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ============================================ PROCESS */}
      <Section id="how-it-works">
        <Eyebrow>How it works</Eyebrow>
        <Heading sub="One fixed price. Four stages. You approve every decision, and you walk away owning everything.">
          Live in 8 Weeks, Not 18 Months
        </Heading>
        <div className="mt-12">
          <ProcessSteps steps={PROCESS} />
        </div>
      </Section>

      {/* ============================================ FAQ */}
      <Section id="faq" className="border-y border-line/40 bg-ink/40">
        <Eyebrow>Frequently asked questions</Eyebrow>
        <Heading>Everything you need to know</Heading>
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
              <Button href="/services/nis2-dora-compliance-automation" variant="ghost">
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
