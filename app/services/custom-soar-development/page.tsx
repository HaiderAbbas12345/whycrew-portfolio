import type { Metadata } from "next";
import Link from "next/link";
import { ServiceCta, ServiceHero } from "@/components/sections/service-shell";
import { Button } from "@/components/ui/button";
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

const LINK =
  "text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent";

/** Even 2-up grid of bordered chips, so short and long labels line up. */
function ChipGrid({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((t) => (
        <li
          key={t}
          className="flex items-center gap-3 rounded-lg border border-line/70 bg-surface/75 px-5 py-4 text-[14px] font-medium text-bright"
        >
          <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent" />
          {t}
        </li>
      ))}
    </ul>
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

      <ServiceHero
        eyebrow="SOAR Engineering Services"
        title="Custom SOAR Development: Turn Manual Triage Into Automated Playbooks"
        highlight={["Automated", "Playbooks"]}
        intro={
          <p>
            WhyCrew builds custom SOAR playbooks around your actual
            escalation paths, ticketing system, chat tools, and enrichment
            sources, then hands you the full automation library to own and
            extend, instead of locking it inside a licensed SOAR platform&apos;s
            proprietary logic. Most teams see Tier-1 handling time drop by
            70–80% once the first playbooks go live.
          </p>
        }
        primaryCta={{ label: "Book a Free Automation Audit", href: CTA_HREF }}
        secondaryCta={{ label: "Talk to an Engineer", href: "/contact" }}
        stats={HERO_STATS}
        breadcrumbName={svc.navLabel}
        breadcrumbPath={svc.href}
      />

      {/* ============================================ THE PROBLEM */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>The Alert Volume Problem</Eyebrow>
            <Heading>The Same Decision, Made a Hundred Times a Shift</Heading>
          </div>
          <Reveal className="space-y-4 text-[15px] leading-relaxed text-body">
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
              <Link href="/blog/what-is-soar" className={LINK}>
                What SOAR actually automates, and why most implementations
                stall →
              </Link>
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ============================================ ONE PLAYBOOK */}
      <Section className="border-y border-line/40 bg-ink/40">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <Eyebrow tone="brand">One Playbook, Start to Finish</Eyebrow>
            <Heading>From Alert to Resolution in Under Five Minutes</Heading>
            <Reveal className="mt-6 space-y-4 text-[15px] leading-relaxed text-body">
              <p>
                This is what&apos;s actually being delivered, not a feature on
                a slide. Phishing response, start to finish:
              </p>
            </Reveal>
            <Reveal className="mt-4 text-[15px] leading-relaxed text-body">
              <p>
                That&apos;s one playbook: what used to take 45–90 minutes end
                to end now closes in under five. We build four other playbook
                types the same way, each solving a different repetitive
                task.{" "}
                <Link href="/blog/soar-playbooks-explained" className={LINK}>
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
          </div>

          <Reveal delay={0.1}>
            <Card className="p-7 sm:p-9" interactive={false}>
              <ol>
                {PLAYBOOK_STEPS.map((s, i) => (
                  <li key={s.title} className="relative flex gap-5 pb-8 last:pb-0">
                    {i < PLAYBOOK_STEPS.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute left-[17px] top-10 bottom-1 w-px bg-line"
                      />
                    )}
                    <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-md border border-brand/35 bg-brand/12 font-mono text-xs font-bold text-brand-hi">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="pt-1.5">
                      <h3 className="text-[15px] font-semibold leading-snug text-bright">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                        {s.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* ============================================ WHERE THIS PAYS OFF */}
      <Section>
        <Heading>Where This Pays Off</Heading>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PAYOFF_CARDS.map((c, i) => (
            <StaggerItem key={c.title}>
              <Card className="group h-full p-7">
                <span className="font-mono text-[11px] font-bold tracking-[0.14em] text-brand-hi transition-colors duration-400 group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[15px] font-semibold leading-snug">
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
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Heading>Built to Work With What You Already Run</Heading>
            <Reveal className="mt-6 text-[15px] leading-relaxed text-body">
              <p>
                A custom SOAR layer doesn&apos;t replace your SIEM, your
                ticketing system, or your chat tool. It sits across them and
                automates the handoffs between them. We integrate with
                what&apos;s already in your stack rather than asking you to
                replatform around one vendor&apos;s supported-integrations
                list.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ChipGrid items={STACK_TAGS} />
          </Reveal>
        </div>
      </Section>

      {/* ============================================ LICENSED VS CUSTOM-BUILT */}
      <Section>
        <Heading>Licensed SOAR Platforms vs. Custom-Built</Heading>
        <Reveal className="mt-12">
          <CompareTable
            head={COMPARE_TABLE.head}
            rows={COMPARE_TABLE.rows}
            highlightCol={2}
          />
        </Reveal>
      </Section>

      {/* ============================================ SCOPED TO YOUR ENVIRONMENT */}
      <Section className="border-y border-line/40 bg-ink/40">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Eyebrow tone="brand">What Determines Price</Eyebrow>
            <Heading>Scoped to Your Environment, Not a Published Band</Heading>
            <Reveal className="mt-6 text-[15px] leading-relaxed text-body">
              <p>
                Playbook count and integration complexity vary far more
                between organizations than log volume does, so every SOAR
                engagement is scoped individually.
              </p>
            </Reveal>
          </div>
          <div>
            <Reveal delay={0.1}>
              <ChipGrid items={PRICE_TAGS} />
            </Reveal>
            <Reveal className="mt-6 text-[14px] leading-relaxed text-body">
              <p>
                Most engagements scope and quote within a week of the
                automation audit.
              </p>
            </Reveal>
            <Reveal className="mt-6">
              <Button href={CTA_HREF}>Get a Fixed-Price Quote</Button>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ============================================ WHAT CHANGES IN 90 DAYS */}
      <Section id="results">
        <Heading>What Changes in the First 90 Days</Heading>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-3">
          {DAYS_90_STATS.map((s) => (
            <StaggerItem key={s.label}>
              <Card className="h-full p-7">
                <div className="text-2xl font-semibold tracking-tight text-gradient sm:text-[1.75rem]">
                  {s.value}
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                  {s.label}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ============================================ HOW WE BUILD IT */}
      <Section id="process" className="border-y border-line/40 bg-ink/40">
        <Heading>How We Build It</Heading>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-3">
          {BUILD_PHASES.map((p, i) => (
            <StaggerItem key={p.phase}>
              <Card className="group h-full p-7">
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-md border border-brand/35 bg-brand/12 font-mono text-xs font-bold text-brand-hi transition-all duration-500 group-hover:border-accent/50 group-hover:bg-accent/12 group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-line to-transparent" />
                </div>
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

      {/* ============================================ FAQ */}
      <Section id="faq">
        <Heading>Frequently Asked Questions</Heading>
        <div className="mt-10">
          <FaqAccordion faqs={FAQS} />
        </div>
      </Section>

      {/* ============================================ READY TO AUTOMATE CTA */}
      <ServiceCta
        title="Ready to Automate"
        highlight="the Repetitive 80%?"
        body="No cost, no obligation. Just an honest look at which of your repetitive alerts are worth automating first, and what it would take."
        primary={{ label: "Book a Free Automation Audit", href: CTA_HREF }}
      />
    </>
  );
}
