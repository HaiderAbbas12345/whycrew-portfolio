import type { Metadata } from "next";
import Link from "next/link";
import { Backdrop } from "@/components/ui/backdrop";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/ui/faq";
import {
  Breadcrumb,
  Card,
  CompareTable,
  Eyebrow,
  Heading,
  Section,
} from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem, WordsUp } from "@/components/motion";
import { breadcrumbLd, faqLd, serviceLd, type Faq } from "@/lib/jsonld";
import { CTA_HREF, OG_IMAGE, serviceBySlug } from "@/lib/site";

const svc = serviceBySlug("custom-soar-development");

export const metadata: Metadata = {
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
  twitter: {
    card: "summary_large_image",
    title: svc.metaTitle,
    description: svc.metaDescription,
  },
};

const HERO_STATS = [
  { value: "70–80%", label: "less Tier-1 handling time" },
  { value: "Built-in", label: "around your existing tools" },
  { value: "Zero", label: "platform lock-in" },
  { value: "100%", label: "playbook ownership" },
];

const PLAYBOOK_STEPS = [
  {
    title: "Alert lands",
    body: "A reported phishing email hits the queue.",
  },
  {
    title: "Enrichment runs automatically",
    body: "Sender reputation, attachment sandboxing, and URL detonation happen with no analyst click required.",
  },
  {
    title: "The playbook decides",
    body: "If every signal comes back clean, it closes the ticket itself. If anything's ambiguous, it hands off to a Tier-1 analyst with the enrichment already attached.",
  },
  {
    title: "Containment, if confirmed",
    body: "The message is pulled from every inbox it reached and the sender is blocked, automatically.",
  },
];

const PAYOFF_CARDS = [
  {
    title: "High Alert Volume",
    body: "Teams fielding thousands of alerts a day, where the same triage decision repeats hundreds of times a shift, see the fastest payback from automation.",
  },
  {
    title: "Multi-Tool Handoffs",
    body: "SOCs running a SIEM, a ticketing system, and a chat tool with nothing wired together, so analysts manually copy context between them for every case.",
  },
  {
    title: "MSSPs Running Playbooks Across Clients",
    body: "Each client's escalation path, tools, and reporting format differ, so a single shared library needs per-client scoping built in from the start.",
  },
];

const STACK_TAGS = ["Your SIEM", "ServiceNow", "Slack", "Your ticketing platform"];

const COMPARE_TABLE = {
  head: ["Factor", "Cortex XSOAR · Splunk SOAR · Sentinel Automation", "WhyCrew Custom-Built"],
  rows: [
    [
      "Licensing",
      "Per-automation or per-integration, scales with usage",
      "One-time build, no per-automation fees",
    ],
    [
      "Ownership",
      "Playbooks locked inside the vendor's platform",
      "Playbooks owned outright, fully documented",
    ],
    [
      "Switching cost",
      "Rebuilt from scratch on a new platform",
      "Portable logic that moves with your stack",
    ],
    [
      "Customization",
      "Limited to the vendor's supported actions and integrations",
      "Built around your exact escalation paths and tools",
    ],
  ],
};

const PRICE_TAGS = [
  "Number of playbooks",
  "Integration count",
  "Alert volume",
  "Single vs. multi-tenant",
];

const DAYS_90_STATS = [
  {
    value: "70–80%",
    label: "less Tier-1 handling time once playbooks go live",
  },
  { value: "78%", label: "workload cut for teams on high alert volumes" },
  { value: "45–90min → <5min", label: "phishing playbook response time" },
];

const BUILD_PHASES = [
  {
    phase: "Phase 1",
    title: "Map",
    body: "We audit your current escalation paths, tools, and the alerts eating the most analyst time. No cost, no obligation.",
  },
  {
    phase: "Phase 2",
    title: "Build",
    body: "Playbooks and integrations are built and tested against your real environment, not a demo environment.",
  },
  {
    phase: "Phase 3",
    title: "Operate & Extend",
    body: "Full documentation and training on handover, plus a clear path for your team to add new playbooks after we're gone.",
  },
];

const FAQS: Faq[] = [
  {
    q: "Is this a one-time build, or an ongoing subscription?",
    a: "One-time build. You pay for the engineering, not a recurring per-automation license, and you own the playbook library outright once it's handed over.",
  },
  {
    q: "How long does it take to build a playbook library?",
    a: "The first playbooks typically go live within a few weeks of the automation audit, with additional playbooks added after launch as priorities are confirmed.",
  },
  {
    q: "Does this replace our existing SIEM, or sit alongside it?",
    a: "Neither gets replaced. It sits alongside your existing SIEM and automates what happens after an alert fires, nothing in your current setup needs to change.",
  },
  {
    q: "Can playbooks work across multiple client environments for an MSSP?",
    a: "Yes. Tenant isolation, per-client escalation paths, and per-client audit trails are built in from the start, with a central library you maintain once.",
  },
  {
    q: "What tools do you integrate with?",
    a: "Whatever you're already running, your SIEM, ticketing system (we've built on ServiceNow before), and chat tools like Slack, rather than a fixed list of vendor-supported integrations.",
  },
  {
    q: "Do we need an existing SOC team to use this?",
    a: "You need someone to own the playbooks day to day, usually your existing Tier-1/Tier-2 team. We provide documentation and training so they can run and extend the library independently.",
  },
];

const RELATED_RESOURCES = [
  { label: "What Is SOAR?", href: "/blog/what-is-soar" },
  { label: "SOAR Playbooks Explained", href: "/blog/soar-playbooks-explained" },
  { label: "What Is an AI SOC?", href: "/blog/what-is-ai-soc" },
];

const MORE_READING = [
  { label: "SOC Analyst Burnout", href: "/blog/soc-analyst-burnout" },
  { label: "SOC Analyst Tiers: Tier 1, 2, 3", href: "/blog/soc-analyst-tiers-tier-1-2-3" },
];

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-brand px-4 py-2 text-[13px] font-semibold text-white">
      {children}
    </span>
  );
}

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
              serviceType: "Custom SOAR playbook engineering",
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

      {/* ============================================ HERO */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <Backdrop />
        <div className="container-page">
          <Breadcrumb
            trail={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: svc.navLabel, path: svc.href },
            ]}
          />

          <Eyebrow tone="brand">SOAR Engineering Services</Eyebrow>

          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.07] sm:text-5xl lg:text-[3.4rem]">
            <WordsUp
              text="Custom SOAR Development: Turn Manual Triage Into Automated Playbooks"
              delay={0.12}
            />
          </h1>

          <Reveal delay={0.6} distance={14} mount>
            <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-body">
              WhyCrew builds custom SOAR playbooks around your actual
              escalation paths, ticketing system, chat tools, and enrichment
              sources, then hands you the full automation library to own and
              extend, instead of locking it inside a licensed SOAR platform&apos;s
              proprietary logic. Most teams see Tier-1 handling time drop by
              70–80% once the first playbooks go live.
            </p>
          </Reveal>

          <Reveal delay={0.72} distance={12} mount>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href={CTA_HREF}>Book a Free Automation Audit</Button>
              <Button href="/contact" variant="ghost">
                Talk to an Engineer
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.85} className="mt-10 border-t border-line/60 pt-8" mount>
            <div className="flex flex-wrap gap-x-14 gap-y-6">
              {HERO_STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-semibold text-bright sm:text-[1.65rem]">
                    {s.value}
                  </div>
                  <p className="mt-1.5 text-[12.5px] text-faint">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================ THE PROBLEM */}
      <Section>
        <Eyebrow>The Alert Volume Problem</Eyebrow>
        <Heading>The Same Decision, Made a Hundred Times a Shift</Heading>
        <Reveal className="mt-6 max-w-3xl space-y-4 text-[15px] leading-relaxed text-body">
          <p>
            A Tier-1 analyst fielding thousands of alerts a day spends most
            of a shift making the same handful of decisions over and over:
            is this phishing, is this a false positive, does this need to go
            to Tier 2. None of that requires judgment. It requires speed, and
            speed is exactly what gets lost when every decision involves
            opening four tools and copying context between them by hand.
          </p>
          <p>
            That repetition is also what burns analysts out, and what a
            generic, out-of-the-box SOAR platform doesn&apos;t actually fix,
            since its default playbooks assume a generic environment that
            isn&apos;t yours.{" "}
            <Link
              href="/blog/what-is-soar"
              className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
            >
              What SOAR actually automates, and why most implementations
              stall →
            </Link>
          </p>
        </Reveal>
      </Section>

      {/* ============================================ ONE PLAYBOOK */}
      <Section className="border-y border-line/40 bg-ink/40">
        <Eyebrow>One Playbook, Start to Finish</Eyebrow>
        <Heading>From Alert to Resolution in Under Five Minutes</Heading>
        <Reveal className="mt-6 max-w-3xl text-[15px] leading-relaxed text-body">
          <p>
            This is what&apos;s actually being delivered, not a feature on a
            slide. Phishing response, start to finish:
          </p>
        </Reveal>

        <div className="mt-10 max-w-2xl">
          {PLAYBOOK_STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="relative">
              <div className="relative flex gap-5 pb-9 last:pb-0">
                {i < PLAYBOOK_STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-[15px] top-9 bottom-0 w-px bg-line"
                  />
                )}
                <span className="relative z-10 grid size-8 shrink-0 place-items-center rounded-full bg-brand font-mono text-[12.5px] font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-bright">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
                    {s.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-4 max-w-3xl text-[15px] leading-relaxed text-body">
          <p>
            That&apos;s one playbook: what used to take 45–90 minutes end to
            end now closes in under five. We build four other playbook types
            the same way, each solving a different repetitive task.{" "}
            <Link
              href="/blog/soar-playbooks-explained"
              className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
            >
              See the other playbook types and how MSSPs run them across
              client environments →
            </Link>
          </p>
        </Reveal>

        <Reveal className="mt-8">
          <Button href="/contact" variant="ghost">
            Talk to an Engineer
          </Button>
        </Reveal>
      </Section>

      {/* ============================================ WHERE THIS PAYS OFF */}
      <Section>
        <Heading>Where This Pays Off</Heading>
        <Stagger className="mt-12 grid gap-5 lg:grid-cols-3">
          {PAYOFF_CARDS.map((c) => (
            <StaggerItem key={c.title}>
              <Card className="h-full p-7">
                <h3 className="text-[15px] font-semibold leading-snug">
                  {c.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                  {c.body}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ============================================ BUILT TO WORK WITH WHAT YOU RUN */}
      <Section className="border-y border-line/40 bg-ink/40">
        <Heading>Built to Work With What You Already Run</Heading>
        <Reveal className="mt-6 max-w-2xl text-[15px] leading-relaxed text-body">
          <p>
            A custom SOAR layer doesn&apos;t replace your SIEM, your
            ticketing system, or your chat tool. It sits across them and
            automates the handoffs between them. We integrate with
            what&apos;s already in your stack rather than asking you to
            replatform around one vendor&apos;s supported-integrations list.
          </p>
        </Reveal>
        <Reveal className="mt-6 flex flex-wrap gap-2.5">
          {STACK_TAGS.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </Reveal>
      </Section>

      {/* ============================================ LICENSED VS CUSTOM-BUILT */}
      <Section>
        <Heading>Licensed SOAR Platforms vs. Custom-Built</Heading>
        <Reveal className="mt-10">
          <CompareTable
            head={COMPARE_TABLE.head}
            rows={COMPARE_TABLE.rows}
            highlightCol={2}
          />
        </Reveal>
      </Section>

      {/* ============================================ SCOPED TO YOUR ENVIRONMENT */}
      <section className="relative overflow-hidden py-24 sm:py-28">
        <Backdrop />
        <div className="container-page">
          <Eyebrow tone="brand">What Determines Price</Eyebrow>
          <Heading>Scoped to Your Environment, Not a Published Band</Heading>
          <Reveal className="mt-6 max-w-2xl text-[15px] leading-relaxed text-body">
            <p>
              Playbook count and integration complexity vary far more between
              organizations than log volume does, so every SOAR engagement
              is scoped individually.
            </p>
          </Reveal>
          <Reveal className="mt-6 flex flex-wrap gap-2.5">
            {PRICE_TAGS.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </Reveal>
          <Reveal className="mt-6 text-[14px] leading-relaxed text-body">
            <p>
              Most engagements scope and quote within a week of the
              automation audit.
            </p>
          </Reveal>
          <Reveal className="mt-8">
            <Button href={CTA_HREF}>Get a Fixed-Price Quote</Button>
          </Reveal>
        </div>
      </section>

      {/* ============================================ WHAT CHANGES IN 90 DAYS */}
      <Section>
        <Eyebrow>What Changes in the First 90 Days</Eyebrow>
        <Stagger className="mt-10 grid gap-8 sm:grid-cols-3">
          {DAYS_90_STATS.map((s) => (
            <StaggerItem key={s.label}>
              <div className="border-l-2 border-accent pl-5">
                <div className="text-2xl font-semibold text-bright sm:text-[1.6rem]">
                  {s.value}
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  {s.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ============================================ HOW WE BUILD IT */}
      <Section className="border-t border-line/40 bg-ink/40">
        <Heading>How We Build It</Heading>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-3">
          {BUILD_PHASES.map((p) => (
            <StaggerItem key={p.phase}>
              <Card className="h-full p-7">
                <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-accent">
                  {p.phase}
                </p>
                <h3 className="mt-2 text-[15px] font-semibold leading-snug">
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

      {/* ============================================ READY TO AUTOMATE CTA */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <Backdrop />
        <div className="container-page relative text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.8rem]">
              Ready to Automate the Repetitive 80%?
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-body">
              No cost, no obligation. Just an honest look at which of your
              repetitive alerts are worth automating first, and what it
              would take.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button href={CTA_HREF}>Book a Free Automation Audit</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================ FAQ */}
      <Section id="faq">
        <Heading>Frequently Asked Questions</Heading>
        <div className="mt-10">
          <FaqAccordion faqs={FAQS} columns={1} />
        </div>
      </Section>

      {/* ============================================ RELATED LINKS */}
      <section className="relative overflow-hidden border-t border-line/60 bg-ink">
        <div className="container-page py-16">
          <div className="grid gap-10 sm:grid-cols-[minmax(200px,280px)_1fr]">
            <div>
              <span className="text-base font-semibold tracking-tight text-bright">
                Why<span className="text-brand-hi">Crew</span>
              </span>
              <p className="mt-4 text-[13.5px] leading-relaxed text-muted">
                Engineering-led SIEM, SOAR, and AI SOC platforms, built once
                and fully owned.
              </p>
            </div>

            <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
              <nav aria-label="Related Resources">
                <p className="mb-4 font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-accent">
                  Related Resources
                </p>
                <ul className="space-y-2.5">
                  {RELATED_RESOURCES.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-[13px] text-muted underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-bright"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <nav aria-label="More Reading">
                <p className="mb-4 font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-accent">
                  More Reading
                </p>
                <ul className="space-y-2.5">
                  {MORE_READING.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-[13px] text-muted underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-bright"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          <p className="mt-12 border-t border-line-soft pt-6 text-[12px] text-faint">
            WhyCrew · whycrew.com
          </p>
        </div>
      </section>
    </>
  );
}
