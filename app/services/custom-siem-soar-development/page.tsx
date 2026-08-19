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
  Quote,
  Section,
} from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import {
  breadcrumbLd,
  faqLd,
  serviceLd,
  type Faq,
} from "@/lib/jsonld";
import { CTA_HREF, serviceBySlug } from "@/lib/site";

const svc = serviceBySlug("custom-siem-soar-development");

export const metadata: Metadata = {
  // `absolute` bypasses the root layout's "%s | WhyCrew" template so the title
  // renders exactly as specified — appending the brand would push it past the
  // ~60 character SERP cutoff and add a third pipe.
  title: { absolute: svc.metaTitle },
  description: svc.metaDescription,
  alternates: { canonical: svc.href },
  openGraph: {
    title: svc.metaTitle,
    description: svc.metaDescription,
    url: svc.href,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: svc.metaTitle,
    description: svc.metaDescription,
  },
};

const STATS = [
  { value: "40–70%", label: "SIEM TCO Reduction" },
  { value: "0 hrs", label: "Migration Downtime" },
  { value: "12 wks", label: "To Full Production" },
  { value: "12–18 mo", label: "Typical Breakeven" },
];

const DELIVERABLES = [
  {
    n: "01",
    title: "Security Data Lake Architecture",
    body: "Custom schema on Elasticsearch or OpenSearch, designed around your real query patterns, not a vendor's generic model. Full-text search, fast aggregation, no per-GB licensing.",
  },
  {
    n: "02",
    title: "SIEM Ingestion Optimization",
    body: "We rebuild your pipeline to filter noise at the source and tier retention by value, cutting 30–50% of raw ingestion volume in a single pass.",
  },
  {
    n: "03",
    title: "Custom Detection Logic",
    body: "Correlation rules mapped to your actual threat model, fully documented and MITRE ATT&CK-aligned. No generic rulesets.",
  },
  {
    n: "04",
    title: "Custom SOAR Playbooks",
    body: "Automation built around your real escalation paths: ticketing, chat, compliance reporting. Clients typically cut Tier-1 handling time by 70–80%.",
  },
  {
    n: "05",
    title: "Multi-Tenant Platform Design",
    body: "For MSSPs: tenant isolation built in from day one, with separated data, RBAC, per-tenant retention, independent detection rules. Cost per new client drops as you scale.",
  },
  {
    n: "06",
    title: "Zero-Downtime Migration",
    body: "Parallel-run validation from Splunk, Sentinel, QRadar, or any existing SIEM. No data loss. No visibility gaps. Detection parity validated before cutover.",
  },
  {
    n: "07",
    title: "Open Source Foundations",
    body: "Built on Elasticsearch, OpenSearch, and Wazuh, with no licensing traps and full infrastructure control. For European clients, this delivers a cleaner NIS2 and DORA compliance story than any foreign-hosted SaaS.",
  },
  {
    n: "08",
    title: "Documentation & Training",
    body: "Full API docs, deployment runbooks, and hands-on engineering training. Platform, infrastructure, and roadmap are yours from day one.",
  },
];

const BUILD_WHEN = [
  "Ingestion volume has outgrown per-GB pricing",
  "You need multi-tenant isolation a shared SaaS can't reliably provide",
  "Compliance obligations require data residency control your vendor can't meet",
  "Annual licensing could fund platform ownership within 12–18 months",
];

const BUY_WHEN = [
  "Ingestion volume is low and likely to stay that way",
  "Your team has no capacity to operate a custom platform",
  "A SaaS platform already covers your compliance requirements",
];

const VENDOR_TABLE = {
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
      "Microsoft-hosted with limited infrastructure control",
      "IBM-hosted or on-prem with vendor dependency",
      "Fully transferred: code, infrastructure, and roadmap",
    ],
    [
      "Flexibility",
      "Proprietary SPL",
      "KQL, Azure-coupled",
      "Proprietary AQL",
      "Open formats, no lock-in",
    ],
    [
      "Compliance",
      "Splunk-constrained residency",
      "Limited GDPR/NIS2 control",
      "Vendor-dependent deployment model",
      "Full control over location, retention, and logging",
    ],
    [
      "3-Year Cost",
      "+15–30% annually",
      "Scales with consumption",
      "Rises with license tiers",
      "Flat after build",
    ],
  ],
};

const COST_TABLE = {
  head: ["Cost Factor", "Subscription SIEM", "Custom-Built SIEM"],
  rows: [
    ["Licensing", "Scales with ingestion, increases yearly", "One-time build, no per-GB fee"],
    ["Lock-in", "High, proprietary formats", "None, full platform ownership"],
    ["Scaling cost", "Rises with data volume", "Infrastructure cost only"],
    ["Compliance control", "Limited to vendor hosting", "Full data residency control"],
    ["3-year trend", "Up 15–30% annually", "Flat after build"],
  ],
};

const PROCESS = [
  {
    title: "Architecture Audit",
    body: "We review ingestion volume, alert backlog, detection coverage, and compliance obligations. You receive a fixed-price proposal. No hourly billing. No scope creep.",
  },
  {
    title: "Architecture Design",
    body: "A full technical blueprint: data lake schema, detection logic framework, SOAR playbook design, and migration plan. You approve every component before we write a line.",
  },
  {
    title: "Sprint-Based Build",
    body: "Working software in your staging environment every two weeks. You test against real data and shape the next sprint. No black-box development.",
  },
  {
    title: "Parallel Run & Validation",
    body: "Your new platform runs alongside your legacy SIEM until detection parity is validated. If parity isn't reached, we don't cut over. We keep iterating at our cost.",
  },
];

const INVESTMENT = [
  { tier: "Single tenant, <500 GB/day", range: "€60K–€100K" },
  { tier: "Multi-tenant MSSP, 500 GB–2 TB/day", range: "€100K–€250K" },
  { tier: "Regulated operator, 2 TB+/day", range: "€250K–€400K" },
];

const OBJECTIONS = [
  {
    q: "Our engineers don't know Elasticsearch.",
    a: "Hands-on training and full runbooks are included as standard. Most SOC engineers are productive within two weeks. Analysts adapt quickly to the new query workflows, and we provide translation guidance and hands-on training throughout the transition.",
  },
  {
    q: "Our detection engineers prefer Splunk SPL.",
    a: "We map your existing detection logic 1:1 during migration, then train your team on the new query syntax. Nothing is lost in transition.",
  },
  {
    q: "How do we handle open-source support?",
    a: "We design for supportability and document your exact version, configuration, and escalation paths before handover. Elasticsearch and OpenSearch both have robust commercial support options.",
  },
  {
    q: "What if we need a feature the open-source stack doesn't have?",
    a: "We architect for extensibility. If you need a capability the open core doesn't cover, we evaluate commercial plugins or custom development, always with full ownership of the result.",
  },
  {
    q: "What happens after handover if something breaks?",
    a: "An optional post-handover retainer gives you direct access to the WhyCrew engineers who built your system. No ticket queues. No offshore L1.",
  },
];

const BUYER_TYPES = [
  "MSSPs: High-volume, multi-tenant environments requiring strict client data isolation and scalable architecture",
  "Financial Services: DORA-regulated operators demanding full ICT risk control and audit-ready infrastructure",
  "Healthcare: GDPR-bound organizations that cannot compromise on data residency or patient data sovereignty",
  "Critical Infrastructure: Operators where data sovereignty and unbroken audit trails are non-negotiable",
  "SaaS & Cloud-Native Businesses: Scaling teams where per-GB licensing has become a structural cost problem",
];

const REGIONS = [
  "Europe: Primary focus on NIS2, DORA, and GDPR environments where foreign-hosted SaaS creates compliance risk",
  "North America: MSSPs and regulated operators that require full infrastructure ownership and control",
  "Middle East & Asia-Pacific: Same engineering standard, deployed where you need it",
];

const FAQS: Faq[] = [
  {
    q: "What is Custom SIEM & SOAR Development?",
    a: "We engineer a SIEM and SOAR platform around your operations, not a licensed product. You receive custom data lake architecture, ingestion pipelines, detection logic, and SOAR automation, with full documentation and hands-on training included.",
  },
  {
    q: "Do you own the platform outright?",
    a: "Yes. Everything transfers to you at handover: infrastructure, roadmap, and all platform data. Nothing stays dependent on WhyCrew.",
  },
  {
    q: "Can you migrate us off Splunk, Sentinel, or QRadar without downtime?",
    a: "Yes. We run your new platform in parallel until detection parity is validated, then cut over. We've completed zero-downtime migrations off all three platforms.",
  },
  {
    q: "How much will this reduce our SIEM TCO?",
    a: "Most clients see a 40–70% reduction within the first 12 months, with breakeven typically reached within 12–18 months. Savings compound every year after.",
  },
  {
    q: "What is the typical investment?",
    a: "€60K–€250K for most builds, depending on tenant count, ingestion volume, and compliance complexity. Enterprise deployments may reach €400K. Fixed-price proposal delivered after the Architecture Audit, with no hourly billing and no scope creep.",
  },
  {
    q: "Do you build multi-tenant SIEM platforms for MSSPs?",
    a: "Yes, with clean tenant isolation, per-client retention policies, and a white-label layer so your clients see your brand.",
  },
  {
    q: "Do you build on open source?",
    a: "Typically yes: Elasticsearch, OpenSearch, or Wazuh. No proprietary formats, no licensing traps.",
  },
  {
    q: "Should you build or buy?",
    a: "It depends on ingestion volume, engineering capacity, and compliance obligations. We give every prospective client an honest recommendation, including when the right answer is to stay with your current vendor.",
  },
  {
    q: "Do you work outside Europe?",
    a: "Yes. Same engineering standard delivered to MSSPs and regulated operators worldwide. You choose where the infrastructure lives.",
  },
  {
    q: "Is there ongoing support after handover?",
    a: "An optional retainer covers upgrades, detection tuning, and engineering support, but the platform, infrastructure, and roadmap are yours from day one. No mandatory ongoing fees.",
  },
  {
    q: "What is SOAR and how does it reduce Tier-1 workload?",
    a: "SOAR automates repetitive SOC tasks: alert enrichment, threat intelligence lookups, ticket creation, and containment actions. Our custom playbooks are built around your real escalation paths, typically cutting Tier-1 handling time by 70–80%.",
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
              serviceType: "Custom SIEM and SOAR platform engineering",
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
        title="Custom SIEM & SOAR Development for MSSPs and Regulated Operators"
        highlight={["Development"]}
        lead="Stop renting your security stack. Own it."
        intro={
          <>
            <p>
              Per-GB licensing scales against you. Tenant isolation breaks down.
              Compliance exposure compounds. WhyCrew builds custom SIEM and SOAR
              platforms around your exact ingestion volume, tenancy model, and
              regulatory requirements, then hands the finished platform to your
              team, fully owned, zero vendor dependency.
            </p>
            <ArrowList
              items={[
                "Zero-downtime migration from Splunk, Sentinel, or QRadar",
                "No per-GB licensing. No vendor lock-in. No recurring license cycle.",
                "Full platform ownership from day one",
                "Breakeven typically within 12–18 months",
              ]}
            />
          </>
        }
        primaryCta={{
          label: "Book Your Architecture Audit",
          href: CTA_HREF,
        }}
        secondaryCta={{ label: "See Client Results", href: "#results" }}
        stats={STATS}
        breadcrumbName={svc.navLabel}
        breadcrumbPath={svc.href}
      />

      {/* ------------------------------------------------ deliverables */}
      <Section id="deliverables">
        <Eyebrow>What you get</Eyebrow>
        <Heading sub="Every engagement covers the same core scope. Nothing below is an upsell.">
          Full Deliverables, Every Engagement
        </Heading>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2">
          {DELIVERABLES.map((d) => (
            <StaggerItem key={d.n}>
              <Card className="group h-full p-7">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] font-bold tracking-[0.14em] text-brand-hi transition-colors duration-400 group-hover:text-accent">
                    {d.n}
                  </span>
                  <h3 className="text-[15px] font-semibold leading-snug">
                    {d.title}
                  </h3>
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                  {d.body}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ------------------------------------------------ build vs buy */}
      <Section className="border-y border-line/40 bg-ink/40">
        <Eyebrow tone="brand">Build vs. buy</Eyebrow>
        <Heading sub="We run a full build vs. buy analysis before we recommend anything.">
          Is a Custom SIEM Worth It?
        </Heading>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full p-8">
              <h3 className="mb-5 flex items-center gap-2.5 text-[15px] font-semibold text-accent">
                <span className="size-1.5 rounded-full bg-accent" />
                Build when
              </h3>
              <CheckList items={BUILD_WHEN} />
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="h-full p-8">
              <h3 className="mb-5 flex items-center gap-2.5 text-[15px] font-semibold text-muted">
                <span className="size-1.5 rounded-full bg-muted" />
                Stay on subscription when
              </h3>
              <ArrowList items={BUY_WHEN} />
            </Card>
          </Reveal>
        </div>

        <Reveal className="mt-8">
          <p className="text-[14px] leading-relaxed text-body">
            Not sure? Book a 20-minute Architecture Audit. We&apos;ll model your
            costs and give you a straight answer.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <h3 className="mb-6 text-xl font-semibold">
            Splunk, Sentinel, and QRadar vs. Custom-Built SIEM
          </h3>
          <CompareTable
            head={VENDOR_TABLE.head}
            rows={VENDOR_TABLE.rows}
            highlightCol={4}
          />
        </Reveal>
      </Section>

      {/* ------------------------------------------------ process */}
      <Section id="process">
        <Eyebrow>Our process</Eyebrow>
        <Heading sub="Typical timeline: 12 weeks to full production. Zero downtime throughout.">
          How We Deliver Your Platform
        </Heading>
        <div className="mt-12">
          <ProcessSteps steps={PROCESS} />
        </div>
        <Reveal className="mt-6">
          <Card className="p-6" interactive={false}>
            <h3 className="text-[15px] font-semibold">
              Step 5. Handover &amp; Ownership
            </h3>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
              Full API docs, runbooks, and hands-on engineering training. Your
              team takes complete control of the platform, infrastructure, and
              roadmap.
            </p>
          </Card>
        </Reveal>
      </Section>

      {/* ------------------------------------------------ investment */}
      <Section className="border-y border-line/40 bg-ink/40">
        <Eyebrow tone="brand">Investment &amp; ROI</Eyebrow>
        <Heading>What This Costs, And What It Saves</Heading>

        <Reveal className="mt-10">
          <CompareTable
            head={COST_TABLE.head}
            rows={COST_TABLE.rows}
            highlightCol={2}
          />
        </Reveal>

        <Reveal className="mt-10">
          <h3 className="mb-5 text-[15px] font-semibold">
            Typical Investment Range
          </h3>
        </Reveal>
        <Stagger className="grid gap-5 md:grid-cols-3">
          {INVESTMENT.map((i) => (
            <StaggerItem key={i.tier}>
              <Card className="h-full p-7">
                <div className="text-xl font-semibold text-gradient">
                  {i.range}
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-muted">
                  {i.tier}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-8">
          <p className="max-w-3xl text-[14px] leading-relaxed text-body">
            Most clients reach breakeven within 12–18 months. Because you own
            the platform, savings compound every year as volume and client base
            grow. We can also package this as a multi-tenant, white-label SIEM
            deployment under your brand — see our{" "}
            <a
              href="/services/mssp-engineering-partner"
              className="text-accent underline-offset-4 hover:underline"
            >
              MSSP Engineering Partner
            </a>{" "}
            service for details.
          </p>
        </Reveal>
      </Section>

      {/* ------------------------------------------------ results */}
      <Section id="results">
        <Eyebrow>Case studies</Eyebrow>
        <Heading>Client Results</Heading>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full p-8">
              <h3 className="text-lg font-semibold">NordSec GmbH, Hamburg, Germany</h3>
              <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
                German MSSP · 40+ Enterprise Clients · Migrated from Splunk
              </p>
              <p className="mt-5 text-[13.5px] leading-relaxed text-muted">
                40+ enterprise clients. €45,000/month Splunk bill. Detection
                logic locked in proprietary SPL. WhyCrew built a replacement
                Elasticsearch data lake, full SOAR playbook suite, and
                multi-tenant isolation in six weeks.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                <li>62% cost reduction</li>
                <li>€340K annual savings</li>
                <li>0 hours downtime</li>
                <li>6 weeks to production</li>
              </ul>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="h-full p-8">
              <h3 className="text-lg font-semibold">
                UK Fintech, Regulated Under DORA
              </h3>
              <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
                Migrated from Microsoft Sentinel
              </p>
              <p className="mt-5 text-[13.5px] leading-relaxed text-muted">
                Sentinel consumption pricing was unpredictable and couldn&apos;t
                meet DORA data residency requirements. WhyCrew delivered an
                OpenSearch-based SIEM with full audit logging, SOAR integration
                with ServiceNow and Slack, and isolated tenants for payment
                processing and retail banking.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                <li>48% reduction in annual SIEM spend</li>
                <li>Full DORA compliance</li>
                <li>8 weeks to handover</li>
              </ul>
            </Card>
          </Reveal>
        </div>

        <Reveal className="mt-8">
          <Quote
            author="Head of Security Operations"
            role="UK Fintech (name available under NDA)"
          >
            We needed to prove to our regulator that we controlled our entire
            security data lifecycle. WhyCrew delivered a platform we own, host,
            and audit ourselves.
          </Quote>
        </Reveal>
      </Section>

      {/* ------------------------------------------------ objections */}
      <Section className="border-y border-line/40 bg-ink/40">
        <Eyebrow tone="danger">Common concerns</Eyebrow>
        <Heading>Objections, Answered Directly</Heading>
        <div className="mt-10">
          <FaqAccordion
            faqs={OBJECTIONS.map((o) => ({ q: `“${o.q}”`, a: o.a }))}
            columns={1}
          />
        </div>
      </Section>

      {/* ------------------------------------------------ who we build for */}
      <Section>
        <Eyebrow>Who we build for, by profile, region &amp; fit</Eyebrow>
        <Heading>Who We Build For</Heading>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full p-8">
              <h3 className="mb-5 text-[15px] font-semibold text-accent">
                Buyer Types
              </h3>
              <ArrowList items={BUYER_TYPES} />
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="h-full p-8">
              <h3 className="mb-5 text-[15px] font-semibold text-accent">
                Regions Served
              </h3>
              <ArrowList items={REGIONS} />
              <h3 className="mb-5 mt-8 text-[15px] font-semibold text-accent">
                Best Fit Environments
              </h3>
              <CheckList
                items={[
                  "Ingestion volume has outgrown per-GB pricing models",
                  "Multi-tenant client isolation is a hard compliance or contractual requirement",
                  "Data residency control cannot be delegated to a SaaS vendor",
                  "Annual licensing spend could fund full platform ownership within 12–18 months",
                ]}
              />
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------ faq */}
      <Section id="faq" className="border-t border-line/40 bg-ink/40">
        <Eyebrow>Frequently asked questions</Eyebrow>
        <Heading>Custom SIEM &amp; SOAR, answered</Heading>
        <div className="mt-10">
          <FaqAccordion faqs={FAQS} />
        </div>
      </Section>

      <ServiceCta
        title="Stop renting your security stack."
        highlight="Own it."
        body="Book a 20-minute Architecture Audit. We review ingestion volume, alert backlog, detection coverage, and compliance obligations, then deliver a fixed-price proposal."
        primary={{ label: "Book Your Architecture Audit", href: CTA_HREF }}
        secondary={{ label: "See All Services", href: "/services" }}
        footnote="Fixed-price proposal · No hourly billing · No scope creep"
      />
    </>
  );
}
