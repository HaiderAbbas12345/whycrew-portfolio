import type { Metadata } from "next";
import Link from "next/link";
import { Backdrop } from "@/components/ui/backdrop";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  Card,
  CompareTable,
  Eyebrow,
  Heading,
  Section,
} from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem, WordsUp } from "@/components/motion";
import { FaqAccordion } from "@/components/ui/faq";
import { breadcrumbLd, faqLd, serviceLd, type Faq } from "@/lib/jsonld";
import { CTA_HREF, OG_IMAGE, serviceBySlug } from "@/lib/site";
import { CostEstimator, type CostTier } from "./cost-estimator";

const svc = serviceBySlug("custom-siem-development");

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
  { value: "40–70%", label: "lower cost" },
  { value: "12 weeks", label: "to deployment" },
  { value: "Zero", label: "migration downtime" },
  { value: "100%", label: "source code owned" },
];

const BUILD_CARDS = [
  {
    n: "1",
    title: "Security Data Lake Architecture",
    body: "Your logs land in an open-format data lake (commonly Elasticsearch or ClickHouse under the hood) instead of a proprietary vendor format. You can query it with standard tools, export it freely, and it never locks you into one company's ecosystem.",
  },
  {
    n: "2",
    title: "SIEM Ingestion Optimization",
    body: "Raw log volume isn't the same as useful signal. We tune ingestion pipelines to normalize, enrich, and de-duplicate at the source, so storage costs and noise both drop before a single detection rule even runs.",
  },
  {
    n: "3",
    title: "Custom Detection Logic",
    body: "Generic, out-of-the-box detection rules are built for the average customer, not yours. We write detection logic against your actual environment, asset inventory, and identity provider, so alerts reflect real risk.",
  },
  {
    n: "4",
    title: "Zero-Downtime Migration",
    body: "Moving off Splunk, Sentinel, or QRadar doesn't mean a gap in coverage. Migrations run in parallel with your existing platform until the new one is validated, then you cut over.",
    link: { label: "Full migration guide →", href: "/blog/siem-migration-guide-zero-downtime" },
  },
];

const COMPARE_TABLE = {
  head: ["Factor", "Splunk", "Microsoft Sentinel", "IBM QRadar", "Custom-Built (WhyCrew)"],
  rows: [
    [
      "Pricing",
      "Per-GB, rises with volume",
      "Per-GB via Log Analytics",
      "Per-event or capacity tier",
      "One-time build, no ongoing fees",
    ],
    [
      "Ownership",
      "Licensed access only",
      "Microsoft-hosted, limited control",
      "IBM-hosted or on-prem, vendor-dependent",
      "Fully transferred: code, infra, roadmap",
    ],
    [
      "Flexibility",
      "Proprietary SPL",
      "KQL, Azure-coupled",
      "Proprietary AQL",
      "Open formats, no lock-in",
    ],
    [
      "3-Year Cost Trend",
      "+15–30% annually",
      "Scales with consumption",
      "Rises with license tiers",
      "Flat after build",
    ],
  ],
};

const COST_TIERS: CostTier[] = [
  {
    key: "under-500gb",
    label: "Under 500 GB/day",
    buildCost: "€60,000–€100,000",
    buildNote: "Single tenant tier",
    licensedCost: "€100,000–€333,333",
    licensedNote: "vs. a per-GB license",
  },
  {
    key: "500gb-2tb",
    label: "500 GB–2 TB/day",
    buildCost: "€100,000–€250,000",
    buildNote: "Multi-tenant MSSP tier",
    licensedCost: "€166,667–€833,333",
    licensedNote: "vs. a per-GB license",
  },
  {
    key: "2tb-plus",
    label: "2 TB+/day",
    buildCost: "€250,000–€400,000",
    buildNote: "Regulated operator tier",
    licensedCost: "€416,667–€1,333,333",
    licensedNote: "vs. a per-GB license",
  },
];

const FAQS: Faq[] = [
  {
    q: "How long does custom SIEM development take?",
    a: "Most engagements go live in 12 weeks from kickoff, scaling up for larger multi-tenant or highly regulated deployments.",
  },
  {
    q: "Is a custom-built SIEM actually cheaper than Splunk or Microsoft Sentinel?",
    a: "In almost every case, yes, over a 3-year horizon, because licensed SIEMs scale with data volume while a custom build doesn't. Most clients see a 40–70% cost reduction.",
  },
  {
    q: "Do you migrate our existing data, or do we start from zero?",
    a: "Your historical logs migrate with you. Migrations run in parallel with your existing platform until the new one is validated, so there's no coverage gap during cutover.",
  },
  {
    q: "Can a custom SIEM handle multi-tenant MSSP operations?",
    a: "Yes, tenant isolation, per-client branding, and data residency are architected in from the start for MSSP engagements.",
  },
  {
    q: "Do we need an in-house team to run it after handover?",
    a: "You need someone who can operate infrastructure, which most MSSPs and regulated operators already have. We provide full documentation, runbooks, and hands-on training.",
  },
  {
    q: "Will this hold up to a regulatory audit, no matter which framework applies to us?",
    a: "Yes. Retention periods, audit evidence, and incident-reporting capability are built into the architecture from day one. The same architecture and ownership model applies everywhere, including the US.",
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
              serviceType: "Custom SIEM platform engineering",
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

          <Eyebrow tone="brand">SIEM Engineering Services</Eyebrow>

          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.07] sm:text-5xl lg:text-[3.4rem]">
            <WordsUp
              text="Custom SIEM Development: Build and Own Your Security Data Platform"
              delay={0.12}
            />
          </h1>

          <Reveal delay={0.6} distance={14} mount>
            <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-body">
              WhyCrew&apos;s SIEM engineering team builds a security platform
              around your actual log volume, detection needs, and compliance
              scope, then hands you full ownership instead of licensing it
              back as a subscription. A security data lake, custom detection
              logic, and a zero-downtime migration off your current
              platform, typically live in 12 weeks.
            </p>
          </Reveal>

          <Reveal delay={0.72} distance={12} mount>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href={CTA_HREF}>Book a Free Architecture Audit</Button>
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

      {/* ============================================ STOP RENTING */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
          <div>
            <Heading>Stop Renting Your SIEM Capability</Heading>
            <Reveal className="mt-6 max-w-2xl space-y-4 text-[15px] leading-relaxed text-body">
              <p>
                A SIEM you license is rented capability, priced by the
                gigabyte, forever. A SIEM WhyCrew engineers is built once,
                around your actual environment, and handed over as something
                you own outright, no per-GB meter running for the rest of
                the relationship.
              </p>
              <p>
                That&apos;s the entire pitch. Not what a SIEM does
                generically (our{" "}
                <Link
                  href="/blog/what-is-siem"
                  className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
                >
                  complete guide to what SIEM is
                </Link>{" "}
                covers that), but what changes when it&apos;s engineered
                specifically for you instead of rented from a vendor.
              </p>
            </Reveal>
            <Reveal className="mt-8">
              <Button href="/contact" variant="ghost">
                Talk to an Engineer
              </Button>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <Card className="p-6" interactive={false}>
              <div className="flex items-center justify-between gap-4 border-b border-line-soft pb-4">
                <span className="text-[13px] text-muted">Licensed SIEM</span>
                <span className="text-[13.5px] font-semibold text-danger">
                  Cost ↑ with volume
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 pt-4">
                <span className="text-[13px] text-muted">
                  WhyCrew Custom-Built
                </span>
                <span className="text-[13.5px] font-semibold text-accent">
                  Flat after build
                </span>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* ============================================ WHAT WE BUILD */}
      <Section className="border-y border-line/40 bg-ink/40">
        <Eyebrow>What We Build</Eyebrow>
        <Heading sub="WhyCrew's SIEM Engineering Services cover four core components, each scoped to your actual environment instead of a generic template:">
          Four Core Components, Built by Our SIEM Engineering Team
        </Heading>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BUILD_CARDS.map((c) => (
            <StaggerItem key={c.n}>
              <Card className="h-full p-6">
                <span className="grid size-8 place-items-center rounded-md bg-brand font-mono text-[13px] font-bold text-white">
                  {c.n}
                </span>
                <h3 className="mt-4 text-[15px] font-semibold leading-snug">
                  {c.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                  {c.body}
                </p>
                {c.link && (
                  <Link
                    href={c.link.href}
                    className="mt-4 inline-block text-[13px] font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
                  >
                    {c.link.label}
                  </Link>
                )}
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ============================================ WHO THIS IS BUILT FOR */}
      <Section>
        <Heading>Who This Is Built For</Heading>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-lg bg-brand p-7">
              <h3 className="text-lg font-semibold text-white">MSSPs</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/80">
                Running dozens of client environments, where tenant
                isolation, per-client branding, and data residency
                can&apos;t be afterthoughts, they have to be architected in
                from day one.
              </p>
              <Link
                href="/blog/multi-tenant-siem-architecture-mssps"
                className="mt-5 inline-block text-[13px] font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
              >
                See the multi-tenant architecture pattern →
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-lg bg-brand p-7">
              <h3 className="text-lg font-semibold text-white">
                Regulated Operators
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/80">
                Where log retention and audit evidence requirements shape
                the platform from the ground up, whichever specific
                framework governs you.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ============================================ OPEN SOURCE */}
      <Section className="border-t border-line/40 bg-ink/40">
        <Heading>Open-Source Foundations, Fully Owned</Heading>
        <Reveal className="mt-6 max-w-2xl text-[15px] leading-relaxed text-body">
          <p>
            We build on open-source components wherever they&apos;re the
            right engineering choice, not proprietary black boxes
            you&apos;d need us forever to maintain. That means no mystery
            licensing buried in a dependency, and a platform your own
            engineers can actually read, modify, and extend after handover.
          </p>
        </Reveal>
        <Reveal className="mt-4">
          <Link
            href="/blog/open-source-vs-custom-built-siem"
            className="text-[14px] font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
          >
            Full comparison: open-source vs. fully custom-built →
          </Link>
        </Reveal>
      </Section>

      {/* ============================================ VENDOR COMPARISON */}
      <Section id="comparison">
        <Heading>Splunk, Sentinel, and QRadar vs. Custom-Built SIEM</Heading>
        <Reveal className="mt-10">
          <CompareTable
            head={COMPARE_TABLE.head}
            rows={COMPARE_TABLE.rows}
            highlightCol={4}
          />
        </Reveal>
        <Reveal className="mt-6 text-[14px] leading-relaxed text-body">
          <p>
            That&apos;s the shape of it at a glance, full cost math and
            3-year totals are below.
          </p>
        </Reveal>
      </Section>

      {/* ============================================ COST ESTIMATOR */}
      <section className="relative overflow-hidden py-24 sm:py-28">
        <Backdrop />
        <div className="container-page">
          <Eyebrow tone="brand">What This Costs</Eyebrow>
          <Heading sub="Pick your daily log volume for an instant estimate, no form to fill in.">
            Estimate Your Cost
          </Heading>

          <Reveal className="mt-10">
            <CostEstimator tiers={COST_TIERS} />
          </Reveal>

          <Reveal className="mt-8 max-w-2xl text-[14px] leading-relaxed text-body">
            <p>
              Most clients reach breakeven within 12–18 months, and the
              savings compound every year after since the cost doesn&apos;t
              scale with data volume the way a license does.{" "}
              <Link
                href="/blog/siem-cost-licensing-vs-custom-built"
                className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
              >
                Full pricing logic and licensed-vendor comparison →
              </Link>
            </p>
          </Reveal>

          <Reveal className="mt-8">
            <Button href={CTA_HREF}>Get a Fixed-Price Proposal</Button>
          </Reveal>
        </div>
      </section>

      {/* ============================================ HANDOVER */}
      <Section className="bg-ink/40">
        <Heading>Documentation, Training, and Full Handover</Heading>
        <Reveal className="mt-6 max-w-2xl text-[15px] leading-relaxed text-body">
          <p>
            Every engagement ends the same way: complete API documentation,
            deployment runbooks, and hands-on engineering training, so your
            own team can run and extend the platform without needing us. You
            own the source code and the infrastructure. There&apos;s no
            support contract you&apos;re locked into to keep the lights on.
          </p>
        </Reveal>
      </Section>

      {/* ============================================ CASE STUDY */}
      <Section>
        <Eyebrow>Proven in Production</Eyebrow>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-[2.5rem]">
              A German MSSP Cut SIEM Costs 62% With Zero Downtime
            </h2>
            <p className="mt-6 max-w-2xl text-[14.5px] leading-relaxed text-muted">
              A German MSSP running 40+ enterprise clients was paying
              €45,000 a month in SIEM licensing. WhyCrew&apos;s SIEM
              engineering team replaced it with a custom-built Elasticsearch
              data lake, migrated 18 months of historical logs with zero
              downtime, and trained their engineering team in four weeks.
            </p>
            <Link
              href="/case-studies"
              className="mt-5 inline-block text-[14px] font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
            >
              See the full case study →
            </Link>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-lg bg-ink p-7">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "62%", label: "cost reduction" },
                  { value: "€340K", label: "saved per year" },
                  { value: "0", label: "hours downtime" },
                  { value: "100%", label: "platform ownership" },
                ].map((m) => (
                  <div key={m.label}>
                    <div className="text-2xl font-semibold text-white sm:text-3xl">
                      {m.value}
                    </div>
                    <p className="mt-1.5 text-[12.5px] text-white/60">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ============================================ HOW AN ENGAGEMENT WORKS */}
      <Section className="bg-ink/40">
        <Heading>How an Engagement Works</Heading>
        <Stagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              n: "01",
              title: "Architecture Audit",
              body: "We map your current log volume, detection needs, and compliance scope. No cost, no obligation.",
            },
            {
              n: "02",
              title: "Fixed-Price Proposal",
              body: "Scoped to your actual environment, not a generic tier.",
            },
            {
              n: "03",
              title: "Build & Parallel Migration",
              body: "Your existing SIEM keeps running while we build and validate the new one.",
            },
            {
              n: "04",
              title: "Cutover & Handover",
              body: "Full documentation and training delivered alongside the production cutover.",
            },
          ].map((s) => (
            <StaggerItem key={s.n}>
              <div>
                <span className="font-mono text-3xl font-bold text-line">
                  {s.n}
                </span>
                <h3 className="mt-3 text-[15px] font-semibold leading-snug">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
                  {s.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ============================================ READY TO OWN CTA */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <Backdrop />
        <div className="container-page relative text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.8rem]">
              Ready to Own Your SIEM?
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-body">
              No cost, no obligation, just an honest look at what a
              custom-built platform would cost and save in your specific
              environment.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button href={CTA_HREF}>Book a Free Architecture Audit</Button>
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
    </>
  );
}
