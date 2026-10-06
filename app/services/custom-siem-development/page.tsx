import type { Metadata } from "next";
import Link from "next/link";
import { ServiceCta, ServiceHero } from "@/components/sections/service-shell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CompareTable,
  Eyebrow,
  Heading,
  ProcessSteps,
  Section,
} from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
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

const ENGAGEMENT_STEPS = [
  {
    title: "Architecture Audit",
    body: "We map your current log volume, detection needs, and compliance scope. No cost, no obligation.",
  },
  {
    title: "Fixed-Price Proposal",
    body: "Scoped to your actual environment, not a generic tier.",
  },
  {
    title: "Build & Parallel Migration",
    body: "Your existing SIEM keeps running while we build and validate the new one.",
  },
  {
    title: "Cutover & Handover",
    body: "Full documentation and training delivered alongside the production cutover.",
  },
];

const CASE_METRICS = [
  { value: "62%", label: "cost reduction" },
  { value: "€340K", label: "saved per year" },
  { value: "0", label: "hours downtime" },
  { value: "100%", label: "platform ownership" },
];

const LINK =
  "text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent";

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

      <ServiceHero
        eyebrow="SIEM Engineering Services"
        title="Custom SIEM Development: Build and Own Your Security Data Platform"
        highlight={["Own", "Your"]}
        intro={
          <p>
            WhyCrew&apos;s SIEM engineering team builds a security platform
            around your actual log volume, detection needs, and compliance
            scope, then hands you full ownership instead of licensing it
            back as a subscription. A security data lake, custom detection
            logic, and a zero-downtime migration off your current
            platform, typically live in 12 weeks.
          </p>
        }
        primaryCta={{ label: "Book a Free Architecture Audit", href: CTA_HREF }}
        secondaryCta={{ label: "Talk to an Engineer", href: "/contact" }}
        stats={HERO_STATS}
        breadcrumbName={svc.navLabel}
        breadcrumbPath={svc.href}
      />

      {/* ============================================ STOP RENTING */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center lg:gap-16">
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
                <Link href="/blog/what-is-siem" className={LINK}>
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
            <Card className="p-8" interactive={false}>
              <div className="border-b border-line-soft pb-6">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint">
                  Licensed SIEM
                </p>
                <p className="mt-2 text-xl font-semibold text-danger">
                  Cost ↑ with volume
                </p>
              </div>
              <div className="pt-6">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint">
                  WhyCrew Custom-Built
                </p>
                <p className="mt-2 text-xl font-semibold text-accent">
                  Flat after build
                </p>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* ============================================ WHAT WE BUILD */}
      <Section className="border-y border-line/40 bg-ink/40">
        <Eyebrow tone="brand">What We Build</Eyebrow>
        <Heading sub="WhyCrew's SIEM Engineering Services cover four core components, each scoped to your actual environment instead of a generic template:">
          Four Core Components, Built by Our SIEM Engineering Team
        </Heading>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2">
          {BUILD_CARDS.map((c) => (
            <StaggerItem key={c.n}>
              <Card className="group h-full p-7 sm:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-md border border-brand/35 bg-brand/12 font-mono text-xs font-bold text-brand-hi transition-all duration-500 group-hover:border-accent/50 group-hover:bg-accent/12 group-hover:text-accent">
                    {c.n.padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-line to-transparent" />
                </div>
                <h3 className="text-[15px] font-semibold leading-snug">
                  {c.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                  {c.body}
                </p>
                {c.link && (
                  <Link
                    href={c.link.href}
                    className={`mt-5 inline-block text-[13px] font-semibold ${LINK}`}
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
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <Reveal>
            <Card className="h-full p-8">
              <h3 className="text-lg font-semibold">MSSPs</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                Running dozens of client environments, where tenant
                isolation, per-client branding, and data residency
                can&apos;t be afterthoughts, they have to be architected in
                from day one.
              </p>
              <Link
                href="/blog/multi-tenant-siem-architecture-mssps"
                className={`mt-5 inline-block text-[13px] font-semibold ${LINK}`}
              >
                See the multi-tenant architecture pattern →
              </Link>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="h-full p-8">
              <h3 className="text-lg font-semibold">Regulated Operators</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                Where log retention and audit evidence requirements shape
                the platform from the ground up, whichever specific
                framework governs you.
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* ============================================ OPEN SOURCE */}
      <Section className="border-y border-line/40 bg-ink/40">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <Heading>Open-Source Foundations, Fully Owned</Heading>
          <div>
            <Reveal className="text-[15px] leading-relaxed text-body">
              <p>
                We build on open-source components wherever they&apos;re the
                right engineering choice, not proprietary black boxes
                you&apos;d need us forever to maintain. That means no mystery
                licensing buried in a dependency, and a platform your own
                engineers can actually read, modify, and extend after
                handover.
              </p>
            </Reveal>
            <Reveal className="mt-6">
              <Link
                href="/blog/open-source-vs-custom-built-siem"
                className={`text-[14px] font-semibold ${LINK}`}
              >
                Full comparison: open-source vs. fully custom-built →
              </Link>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ============================================ VENDOR COMPARISON */}
      <Section id="comparison">
        <Heading>Splunk, Sentinel, and QRadar vs. Custom-Built SIEM</Heading>
        <Reveal className="mt-12">
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
      <Section id="cost" className="border-y border-line/40 bg-ink/40">
        <Eyebrow tone="brand">What This Costs</Eyebrow>
        <Heading sub="Pick your daily log volume for an instant estimate, no form to fill in.">
          Estimate Your Cost
        </Heading>

        <Reveal className="mt-12">
          <CostEstimator tiers={COST_TIERS} />
        </Reveal>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <Reveal className="max-w-2xl text-[14px] leading-relaxed text-body">
            <p>
              Most clients reach breakeven within 12–18 months, and the
              savings compound every year after since the cost doesn&apos;t
              scale with data volume the way a license does.{" "}
              <Link href="/blog/siem-cost-licensing-vs-custom-built" className={LINK}>
                Full pricing logic and licensed-vendor comparison →
              </Link>
            </p>
          </Reveal>
          <Reveal className="shrink-0">
            <Button href={CTA_HREF}>Get a Fixed-Price Proposal</Button>
          </Reveal>
        </div>
      </Section>

      {/* ============================================ HANDOVER */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <Heading>Documentation, Training, and Full Handover</Heading>
          <Reveal className="text-[15px] leading-relaxed text-body">
            <p>
              Every engagement ends the same way: complete API documentation,
              deployment runbooks, and hands-on engineering training, so your
              own team can run and extend the platform without needing us.
              You own the source code and the infrastructure. There&apos;s no
              support contract you&apos;re locked into to keep the lights on.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ============================================ CASE STUDY */}
      <Section id="results" className="border-y border-line/40 bg-ink/40">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:gap-16">
          <div>
            <Eyebrow>Proven in Production</Eyebrow>
            <Heading>
              A German MSSP Cut SIEM Costs 62% With Zero Downtime
            </Heading>
            <Reveal className="mt-6 max-w-2xl text-[15px] leading-relaxed text-body">
              <p>
                A German MSSP running 40+ enterprise clients was paying
                €45,000 a month in SIEM licensing. WhyCrew&apos;s SIEM
                engineering team replaced it with a custom-built
                Elasticsearch data lake, migrated 18 months of historical
                logs with zero downtime, and trained their engineering team
                in four weeks.
              </p>
            </Reveal>
            <Reveal className="mt-6">
              <Link
                href="/case-studies"
                className={`text-[14px] font-semibold ${LINK}`}
              >
                See the full case study →
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <Card className="p-8" interactive={false}>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
                {CASE_METRICS.map((m) => (
                  <div key={m.label}>
                    <dt className="text-2xl font-semibold tracking-tight text-gradient sm:text-3xl">
                      {m.value}
                    </dt>
                    <dd className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                      {m.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* ============================================ HOW AN ENGAGEMENT WORKS */}
      <Section id="process">
        <Heading>How an Engagement Works</Heading>
        <div className="mt-12">
          <ProcessSteps steps={ENGAGEMENT_STEPS} />
        </div>
      </Section>

      {/* ============================================ FAQ */}
      <Section id="faq" className="border-y border-line/40 bg-ink/40">
        <Heading>Frequently Asked Questions</Heading>
        <div className="mt-10">
          <FaqAccordion faqs={FAQS} />
        </div>
      </Section>

      {/* ============================================ READY TO OWN CTA */}
      <ServiceCta
        title="Ready to Own"
        highlight="Your SIEM?"
        body="No cost, no obligation, just an honest look at what a custom-built platform would cost and save in your specific environment."
        primary={{ label: "Book a Free Architecture Audit", href: CTA_HREF }}
      />
    </>
  );
}
