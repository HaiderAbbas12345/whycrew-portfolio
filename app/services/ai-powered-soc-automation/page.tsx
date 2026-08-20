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
import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { breadcrumbLd, faqLd, serviceLd, type Faq } from "@/lib/jsonld";
import { CTA_HREF, OG_IMAGE, serviceBySlug } from "@/lib/site";

const svc = serviceBySlug("ai-powered-soc-automation");

export const metadata: Metadata = {
  // `absolute` bypasses the root layout's "%s | WhyCrew" template so the title
  // renders exactly as specified and stays inside the SERP cutoff.
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

const STATS = [
  { value: "70–80%", label: "Tier-1 Load Cut" },
  { value: "12 min", label: "Alert to Resolution" },
  { value: "100%", label: "On-Premise" },
  { value: "0", label: "External API Calls" },
];

const BREAKS = [
  "Tier-1 analysts burn most of their shift triaging low-value alerts",
  "False positives pile up, wearing down teams and eroding trust in the alerting system",
  "Manual SOAR playbooks demand constant tuning, then buckle under volume",
  "Investigations stretch into hours while attackers keep moving",
  "Inconsistent response documentation leaves regulated teams exposed at audit time",
  "For MSSPs, every new client adds cost in a straight line",
];

const SHIFTS = [
  "Only real threats reach your analysts. The noise is filtered out before it ever lands",
  "Tier-1 work gets absorbed, no extra headcount needed",
  "Responses run end-to-end, the same way every time, with no manual steps",
  "Investigations that once ate hours now wrap up in minutes",
  "Every action is logged automatically, ready for NIS2, DORA, and GDPR",
  "Client data stays walled off across every deployment",
];

const HOW = [
  {
    n: "01",
    title: "Triage That Filters the Noise First",
    body: "Every incoming alert is scored, enriched with threat context, and correlated across your environment. Only the alerts worth your team's attention make it through.",
  },
  {
    n: "02",
    title: "Your AI Runs On-Site, With Zero External Calls",
    body: "Pick Llama 3, Mistral, or any open-weight model. WhyCrew installs and configures it inside your infrastructure. Your team holds full control from day one. Nothing crosses your boundary.",
  },
  {
    n: "03",
    title: "Responses That Adapt in Real Time",
    body: "Rather than following rigid playbooks, AI agents reason through the context of each incident and choose the right path forward. Containment, notification, and ticketing all happen on their own, no analyst required.",
  },
  {
    n: "04",
    title: "Investigations That Close in Minutes",
    body: "When an alert escalates, the AI agent pulls logs, connects the dots on entity behavior, and delivers a structured report. Work that used to take hours is done in minutes.",
  },
  {
    n: "05",
    title: "Threats Caught Before They Escalate",
    body: "WhyCrew hunts continuously for behavioral anomalies and indicators of compromise that slip past rule-based systems, surfacing slow-moving threats early.",
  },
  {
    n: "06",
    title: "Low-Risk Scenarios That Resolve Themselves",
    body: "For pre-approved cases such as credential lockout abuse, known malware variants, and isolated endpoint compromise, the platform contains the threat on its own. Dwell time drops without anyone waiting on an available analyst.",
  },
];

const COPILOT_TABLE = {
  head: ["", "Cloud Security Copilot", "WhyCrew On-Premise AI SOC"],
  rows: [
    [
      "API Dependency",
      "Every inference request routed through external endpoints",
      "All inference runs locally, with no outbound API calls",
    ],
    [
      "Tenant Risk",
      "Client data handled in shared or semi-isolated cloud environments",
      "Your data never leaves your perimeter, and tenants stay fully separated",
    ],
    [
      "Auditability",
      "Minimal insight into how the model handles your data",
      "Every decision and action logged in full, queryable detail",
    ],
    [
      "Model Control",
      "Vendor dictates model versions, updates, and end-of-life",
      "Your team sets the configuration and owns the update schedule",
    ],
  ],
};

const ENGAGEMENT = [
  {
    title: "AI That Lives in Your Infrastructure, Not Ours",
    body: "Deploy your preferred open-weight model, whether that's Llama 3, Mistral, or something else, configured inside your own infrastructure. Model weights, configuration, and the full inference pipeline transfer to you at handover.",
  },
  {
    title: "Triage That Stops Noise at the Source",
    body: "A purpose-built triage layer scores, filters, and enriches every incoming alert before an analyst ever sees it. Your team only looks at what actually matters.",
  },
  {
    title: "Response Workflows That Bend, Not Break",
    body: "These workflows reason their way through each incident and adapt as conditions shift. No brittle playbook trees that fall apart the moment reality changes.",
  },
  {
    title: "A Compliance-Ready Audit Trail, Built In",
    body: "Every agent action, decision, and escalation lands in a structured log that meets NIS2, DORA, and GDPR requirements on its own. No separate tooling to bolt on.",
  },
  {
    title: "Full Ownership at Handover",
    body: "Source code and model configuration transfer to your team when the project closes. Extend it, retrain it, or reshape it entirely, all without coming back to us.",
  },
];

const OUTCOMES = [
  ["Lighter Tier-1 load.", "AI classifies and prioritizes every alert, so manual first-pass review disappears."],
  ["Fewer false positives.", "Behavioral context suppresses low-fidelity alerts before they eat into analyst time."],
  ["Earlier catches on lateral movement.", "The agent connects authentication and network telemetry to spot an attacker pivoting."],
  ["Ransomware caught in the staging phase.", "Persistent threat hunting surfaces the setup activity long before encryption starts."],
  ["Insider threats flagged as they happen.", "Behavioral baselines reveal anomalous access patterns in real time."],
  ["Faster documentation.", "Structured investigation reports generate themselves, ready for DORA and audit submission."],
  ["Safe tenant isolation.", "Fully segmented deployments keep one client's data from ever touching another's."],
  ["Hands-off low-risk response.", "Credential abuse and known-variant containment run without pulling in an analyst."],
];

const PROCESS = [
  {
    title: "Review",
    body: "We look closely at your alert volumes, SIEM stack, SOAR maturity, data classification needs, and compliance obligations. That picture shapes model selection, agent architecture, and deployment boundaries.",
  },
  {
    title: "Design",
    body: "We map out the deployment topology, workflow logic, triage scoring framework, and audit trail schema, each one tailored to your environment and regulatory context.",
  },
  {
    title: "Build & Test",
    body: "We deploy the full platform inside your infrastructure, wire it into your existing tooling, and run structured testing across live alert scenarios before any autonomous action goes live.",
  },
  {
    title: "Handover",
    body: "Full ownership moves to your team, including source code, model configuration, documentation, and training. No ongoing dependency on WhyCrew.",
  },
];

const AUDIENCES = [
  {
    title: "MSSPs & Multi-Tenant SOC Teams",
    body: "Run fully isolated AI SOC deployments for each client. Scale Tier-1 capacity without scaling headcount, and turn measurable MTTR gains into a real competitive edge.",
  },
  {
    title: "Banks, Fintechs & Capital Markets Firms",
    body: "Meet DORA incident response requirements with audit-ready reports generated automatically. Every piece of data stays inside your regulated infrastructure boundary.",
  },
  {
    title: "Hospitals, Health Systems & Clinical Networks",
    body: "Process patient-adjacent security telemetry entirely on-premise. It's GDPR-compliant by architecture, so nothing ever leaves your perimeter.",
  },
  {
    title: "OT/IT-Converged & Industrial Operators",
    body: "Run threat hunting and autonomous response in air-gapped or near-air-gapped environments, even where cloud connectivity is off the table.",
  },
  {
    title: "Regulated Operators Across the EU",
    body: "Meet NIS2, DORA, and GDPR obligations with a platform built for data sovereignty from the ground up. No foreign cloud processing, no third-party AI model dependencies.",
  },
];

const FAQS: Faq[] = [
  {
    q: "Does any data leave our environment?",
    a: "No. Every component runs inside your perimeter, from model inference and alert processing to investigation data and audit logs. Nothing ever reaches an external endpoint.",
  },
  {
    q: "How is this different from Microsoft Security Copilot or other cloud AI SOC tools?",
    a: "Cloud copilots route your alert data through external APIs and shared inference layers. WhyCrew makes zero external API calls. You own the model, the source code, and the audit trail. A cloud copilot is a subscription you rent. WhyCrew is a platform you keep.",
  },
  {
    q: "Do we own the platform after handover?",
    a: "Yes. Source code, model weights, workflow configuration, and documentation all transfer to your team. No recurring licensing fees, and no ongoing dependency on WhyCrew.",
  },
  {
    q: "Do our analysts stay in control of what the AI does?",
    a: "Yes. Every autonomous action is governed by configurable confidence thresholds and risk classifications. Analysts can restrict, pause, or override AI responses at any time, and human review is always preserved for high-severity cases.",
  },
  {
    q: "How quickly can WhyCrew deploy?",
    a: "Deployment moves through four phases: Review, Design, Build & Test, and Handover. The Netherlands MSSP case went from scoping to production in seven weeks.",
  },
  {
    q: "Is this viable for MSSPs and regulated operators under NIS2, DORA, and GDPR?",
    a: "Yes. Each client deployment is fully isolated with no shared inference layer. Audit-ready documentation generates automatically for every agent action. NIS2, DORA, and GDPR compliance is built into the architecture, not bolted on.",
  },
  {
    q: "Will this work alongside our existing SIEM and SOAR stack?",
    a: "Yes. WhyCrew integrates with your existing tooling instead of replacing it. The platform is configured and tested against your live alert environment before any autonomous action is enabled.",
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
              serviceType: "On-premise AI SOC automation engineering",
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
        title="AI-Powered SOC Automation"
        highlight={["Automation"]}
        lead="Your SOC, Running on AI Agents You Actually Own"
        intro={
          <p>
            Most AI-powered SOC tools route your sensitive alerts through
            external APIs and cloud infrastructure you don&apos;t control.
            WhyCrew deploys autonomous AI agents directly inside your
            environment, on your hardware, running models you own. No cloud
            dependency. No data exposure. No recurring AI licensing fees.
          </p>
        }
        primaryCta={{
          label: "Book a Technical Consultation",
          href: CTA_HREF,
        }}
        secondaryCta={{ label: "See Real Results", href: "#results" }}
        stats={STATS}
        breadcrumbName={svc.navLabel}
        breadcrumbPath={svc.href}
      />

      {/* ------------------------------------------------ before / after */}
      <Section>
        <Eyebrow>The SOC that runs itself</Eyebrow>
        <Heading sub="Where things break without AI SOC automation — and what shifts the day you deploy WhyCrew.">
          Two versions of the same shift
        </Heading>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full p-8" interactive={false}>
              <h3 className="mb-6 flex items-center gap-2.5 text-[13px] font-mono font-semibold uppercase tracking-[0.2em] text-danger">
                <span className="size-1.5 rounded-full bg-danger" />
                Without automation
              </h3>
              <ul className="space-y-3.5">
                {BREAKS.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 text-[13.5px] leading-relaxed text-muted"
                  >
                    <span className="mt-[3px] font-mono text-danger/70" aria-hidden>
                      ✕
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="h-full p-8">
              <h3 className="mb-6 flex items-center gap-2.5 font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-accent">
                <span className="size-1.5 rounded-full bg-accent" />
                With WhyCrew
              </h3>
              <CheckList items={SHIFTS} />
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------ how it works */}
      <Section id="how" className="border-y border-line/40 bg-ink/40">
        <Eyebrow tone="brand">How it works</Eyebrow>
        <Heading sub="Six mechanics that take the manual first pass out of your SOC entirely.">
          From raw alert to closed investigation
        </Heading>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HOW.map((h) => (
            <StaggerItem key={h.n}>
              <Card className="group h-full p-7">
                <span className="font-mono text-[11px] font-bold tracking-[0.14em] text-brand-hi transition-colors duration-400 group-hover:text-accent">
                  {h.n}
                </span>
                <h3 className="mt-3 text-[15px] font-semibold leading-snug">
                  {h.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                  {h.body}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ------------------------------------------------ vs copilot */}
      <Section>
        <Eyebrow>On-premise vs. cloud copilot</Eyebrow>
        <Heading sub="Cloud copilots promise AI-assisted SOC operations. But for MSSPs, regulated operators, and organizations under NIS2, DORA, or GDPR, that same architecture creates the very risks you set out to eliminate.">
          Why On-Premise Beats a Security Copilot
        </Heading>
        <Reveal className="mt-10">
          <CompareTable
            head={COPILOT_TABLE.head}
            rows={COPILOT_TABLE.rows}
            highlightCol={2}
          />
        </Reveal>
      </Section>

      {/* ------------------------------------------------ engagement scope */}
      <Section className="border-y border-line/40 bg-ink/40">
        <Eyebrow tone="brand">Built into every engagement</Eyebrow>
        <Heading sub="Every WhyCrew engagement delivers the same core scope. Nothing below is an upsell.">
          What ships with the platform
        </Heading>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ENGAGEMENT.map((e) => (
            <StaggerItem key={e.title}>
              <Card className="h-full p-7">
                <h3 className="text-[15px] font-semibold leading-snug">
                  {e.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                  {e.body}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ------------------------------------------------ outcomes */}
      <Section>
        <Eyebrow>Where teams see results first</Eyebrow>
        <Heading>Eight things that change in week one</Heading>
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2">
          {OUTCOMES.map(([bold, rest]) => (
            <StaggerItem key={bold}>
              <div className="flex gap-3.5 rounded-md border border-line/50 bg-surface/35 p-5 transition-colors duration-400 hover:border-accent/30">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-accent" />
                <p className="text-[13.5px] leading-relaxed text-muted">
                  <strong className="font-semibold text-bright">{bold}</strong>{" "}
                  {rest}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ------------------------------------------------ results */}
      <Section id="results" className="border-y border-line/40 bg-ink/40">
        <Eyebrow>Real results</Eyebrow>
        <Heading sub="Across WhyCrew deployments, clients consistently hit a 70–80% reduction in Tier-1 alert handling volume, all without adding security headcount.">
          Deployments, measured
        </Heading>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full p-8">
              <h3 className="text-lg font-semibold">Netherlands-Based MSSP</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
                Deployed WhyCrew across their Tier-1 SOC function. Within seven
                weeks of going into production:
              </p>
              <dl className="mt-6 grid grid-cols-3 gap-4">
                {[
                  { v: 78, s: "%", l: "Tier-1 workload drop" },
                  { v: 12, s: " min", l: "MTTR, triaged alerts" },
                  { v: 7, s: " wks", l: "Full deployment" },
                ].map((m) => (
                  <div key={m.l}>
                    <dt className="text-xl font-semibold text-accent">
                      <CountUp to={m.v} suffix={m.s} />
                    </dt>
                    <dd className="mt-1.5 font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.14em] text-faint">
                      {m.l}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="h-full p-8">
              <h3 className="text-lg font-semibold">
                UK Fintech — DORA Compliance Deployment
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
                Brought in WhyCrew to automate incident investigation and produce
                audit-ready documentation:
              </p>
              <dl className="mt-6 grid grid-cols-3 gap-4">
                {[
                  { v: 63, s: "%", l: "Less investigation time" },
                  { v: 100, s: "%", l: "DORA-compliant reports" },
                  { v: 8, s: " wks", l: "Platform handed over" },
                ].map((m) => (
                  <div key={m.l}>
                    <dt className="text-xl font-semibold text-accent">
                      <CountUp to={m.v} suffix={m.s} />
                    </dt>
                    <dd className="mt-1.5 font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.14em] text-faint">
                      {m.l}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------ process */}
      <Section id="process">
        <Eyebrow>How we build it</Eyebrow>
        <Heading>Four phases, one owner at the end</Heading>
        <div className="mt-12">
          <ProcessSteps steps={PROCESS} />
        </div>
      </Section>

      {/* ------------------------------------------------ audiences */}
      <Section className="border-y border-line/40 bg-ink/40">
        <Eyebrow tone="brand">Who this is for</Eyebrow>
        <Heading>Built for Teams That Can&apos;t Compromise on Data Control</Heading>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCES.map((a) => (
            <StaggerItem key={a.title}>
              <Card className="h-full p-7">
                <h3 className="text-[15px] font-semibold leading-snug">
                  {a.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                  {a.body}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ------------------------------------------------ faq */}
      <Section id="faq">
        <Eyebrow>Frequently asked questions</Eyebrow>
        <Heading>AI SOC automation, answered</Heading>
        <div className="mt-10">
          <FaqAccordion faqs={FAQS} />
        </div>
      </Section>

      <ServiceCta
        title="Stop Triaging Manually."
        highlight="Start Automating Intelligently."
        body="Your analysts should be hunting threats, not working through alert queues. WhyCrew deploys inside your infrastructure and hands you a platform you own outright."
        primary={{ label: "Book a Technical Consultation", href: CTA_HREF }}
        secondary={{ label: "Explore Custom SIEM & SOAR", href: "/services/custom-siem-soar-development" }}
        footnote="Fixed-price engagement · GDPR-aligned by architecture · Fully self-contained · You speak with engineers, not sales"
      />
    </>
  );
}
