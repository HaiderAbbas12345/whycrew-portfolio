import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArticleShell, type TocEntry } from "@/components/blog/article-shell";
import { Bullets, H2, P, QuickAnswer, Strong } from "@/components/blog/prose";
import { Button } from "@/components/ui/button";
import { FaqAccordion, type FaqItem } from "@/components/ui/faq";
import { breadcrumbLd, faqLd } from "@/lib/jsonld";
import { breadcrumbLabel, postBySlug, postPath } from "@/lib/blog";
import { ROBOTS, SITE } from "@/lib/site";
import { ogImage, ogImageLd } from "@/lib/og";
import { ArchitectureDiagram } from "./architecture-diagram";

const post = postBySlug("what-is-siem")!;
const PATH = postPath(post);

export const metadata: Metadata = {
  // `absolute` keeps the title exactly as specified in the content doc — the
  // root layout's "%s | WhyCrew" template would push it past the SERP cutoff.
  title: { absolute: post.metaTitle },
  description: post.metaDescription,
  alternates: { canonical: PATH },
  robots: ROBOTS,
  openGraph: {
    type: "article",
    title: post.metaTitle,
    description: post.metaDescription,
    url: `${SITE.url}${PATH}`,
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified ?? post.datePublished,
    images: ogImage(PATH),
  },
  twitter: {
    card: "summary_large_image",
    title: post.metaTitle,
    description: post.metaDescription,
    images: ogImage(PATH),
  },
};

const TOC: TocEntry[] = [
  { id: "quick-answer", label: "Quick Answer" },
  { id: "what-is-siem", label: "What Is SIEM?" },
  { id: "stand-for", label: "What SIEM Stands For" },
  { id: "how-it-works", label: "How SIEM Works" },
  { id: "architecture", label: "SIEM Architecture" },
  { id: "capabilities", label: "Capabilities and Use Cases" },
  { id: "comparison", label: "SIEM vs SOC, SOAR, XDR, EDR" },
  { id: "tools", label: "SIEM Tools and Platforms" },
  { id: "who-needs", label: "Who Needs a SIEM" },
  { id: "limitations", label: "Limitations and Rollout" },
  { id: "mssp", label: "SIEM for MSSPs" },
  { id: "faq", label: "FAQ" },
];

const FAQS: FaqItem[] = [
  {
    q: "What Is SIEM?",
    a: "SIEM is security software that reads logs from all your systems in one place. It links related events, warns your team when they look like an attack, and keeps the records for investigations and audits.",
  },
  {
    q: "What Does SIEM Stand for in Cyber Security?",
    a: "SIEM stands for Security Information and Event Management. It combines Security Information Management (storing and analyzing log history) and Security Event Management (real-time monitoring and alerting) in one platform.",
  },
  {
    q: "What Is a SIEM Solution?",
    a: "A SIEM solution is a platform that collects, normalizes, correlates, and stores security data from across an IT environment. It gives a SOC one console for threat detection, investigation, and compliance reporting.",
  },
  {
    q: "What Is an Example of a SIEM Tool?",
    a: "Microsoft Sentinel, Splunk Enterprise Security, IBM QRadar, Google Security Operations, and Elastic Security are common SIEM tools. Wazuh is a widely used open-source option.",
  },
  {
    q: "Is a SIEM the Same as a SOC?",
    a: "No. A SIEM is software. A SOC (Security Operations Center) is the team and processes that monitor and respond to threats, usually using a SIEM as their main tool.",
  },
  {
    q: "What Is the Difference Between SIEM and SOAR?",
    a: "A SIEM detects threats by correlating log data. SOAR (Security Orchestration, Automation, and Response) acts on those detections by running automated playbooks, such as disabling an account or blocking an IP.",
  },
  {
    q: "What Is the Difference Between SIEM and XDR?",
    a: "XDR detects and responds using one vendor's own endpoint, email, and cloud sensors. A SIEM ingests logs from any vendor and keeps them long term. Many organizations run both.",
  },
  {
    q: "Do I Need a SIEM If I Have EDR?",
    a: "EDR covers endpoints only. A SIEM adds identity, network, cloud, and SaaS logs and correlates them with endpoint data, which is where multi-stage attacks show up. Small teams often start with EDR and add a SIEM as their environment and compliance needs grow.",
  },
  {
    q: "What Is Replacing SIEM?",
    a: "SIEM is evolving rather than being replaced. Next-gen SIEM adds built-in analytics and automation, security data lakes change how logs are stored, and AI agents now triage many alerts before an analyst sees them.",
  },
  {
    q: "Can I Build My Own SIEM?",
    a: "Yes. Many MSSPs and large enterprises build their own SIEM, and the choice between open-source and custom-built SIEM comes down to control, engineering effort, and licensing.",
    aNode: (
      <>
        Yes. Many MSSPs and large enterprises build their own SIEM, and the
        choice between{" "}
        <A href="/blog/open-source-vs-custom-built-siem">
          open-source and custom-built SIEM
        </A>{" "}
        comes down to control, engineering effort, and licensing.
      </>
    ),
  },
];

function articleLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE.url}${PATH}#article`,
    headline: post.title,
    name: post.metaTitle,
    description: post.metaDescription,
    url: `${SITE.url}${PATH}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}${PATH}` },
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE.url}/#website` },
    author: { "@id": `${SITE.url}/#organization` },
    publisher: { "@id": `${SITE.url}/#organization` },
    image: ogImageLd(PATH),
    articleSection: post.cluster,
    keywords: post.topics.join(", "),
  };
}

/* ------------------------------------------------- page-local design blocks */

/*
 * Colour key, as in the design: accent (teal) = owned / detection;
 * warn (amber) = rented / noise.
 */

const EYEBROW =
  "font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-accent";
const LABEL =
  "font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-accent";

/** In-body link to a site route. */
function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
    >
      {children}
    </Link>
  );
}

/** Sub-heading with its own anchor, as the design gives every H3 an id. */
function H3({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h3
      id={id}
      className="scroll-mt-28 pt-8 text-[17px] font-semibold leading-snug text-bright"
    >
      {children}
    </h3>
  );
}

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded border border-line/70 bg-surface-2 px-1.5 py-px font-mono text-[0.88em] font-medium text-bright">
      {children}
    </code>
  );
}

function Mono({ children }: { children: ReactNode }) {
  return (
    <span className="whitespace-nowrap font-mono text-[13px] font-medium text-bright">
      {children}
    </span>
  );
}

function Meters({ items }: { items: { k: string; v: string }[] }) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line/70 bg-line/70 sm:grid-cols-4">
      {items.map((m) => (
        <div key={m.k} className="flex min-w-0 flex-col gap-1.5 bg-surface-2 p-3.5">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-faint">
            {m.k}
          </span>
          <span className="text-[17px] font-bold tracking-tight text-bright">
            {m.v}
          </span>
        </div>
      ))}
    </div>
  );
}

function Takeaways({ items }: { items: ReactNode[] }) {
  return (
    <div className="mt-8 border-l-2 border-accent py-1 pl-5 sm:pl-6">
      <p className="text-[17px] font-semibold leading-snug text-bright">
        Key Takeaways
      </p>
      <Bullets items={items} />
    </div>
  );
}

/**
 * Table with the design's highlighted row (teal wash and left rule), which
 * the shared DataTable has no slot for.
 */
function Table({
  head,
  rows,
  hl = -1,
}: {
  head: string[];
  rows: ReactNode[][];
  /** Index of the row to highlight. */
  hl?: number;
}) {
  return (
    <div className="mt-6 overflow-x-auto rounded-lg border border-line/70 bg-surface/50">
      <table className="w-full min-w-[560px] border-collapse text-left text-[14px] leading-normal">
        <thead>
          <tr className="border-b border-line bg-surface-2/50">
            {head.map((h) => (
              <th
                key={h}
                scope="col"
                className="whitespace-nowrap px-4 py-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-faint"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr
              key={ri}
              className={`border-b border-line-soft/70 transition-colors last:border-0 ${
                ri === hl ? "bg-accent/10" : "hover:bg-brand/5"
              }`}
            >
              {r.map((cell, ci) => (
                <td
                  key={ci}
                  className={`px-4 py-3 align-top ${
                    ci === 0
                      ? `font-medium text-bright ${
                          ri === hl ? "shadow-[inset_2px_0_0_var(--color-accent)]" : ""
                        }`
                      : "text-body"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Priority pill in the data-sources table. */
function Pri({ level }: { level: "Start here" | "High" | "Medium" }) {
  const tone =
    level === "Start here"
      ? "border-accent/40 bg-accent/10 text-accent"
      : level === "High"
        ? "border-warn/40 bg-warn/10 text-warn"
        : "border-line text-muted";
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full border px-2 py-1 font-mono text-[10px] font-semibold uppercase leading-none tracking-[0.08em] ${tone}`}
    >
      {level}
    </span>
  );
}

/** A real sequence: numbered 01, 02, … in one bordered stack. */
function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="mt-5 mb-1 grid overflow-hidden rounded-lg border border-line/70">
      {items.map((it, i) => (
        <li
          key={i}
          className="grid grid-cols-[40px_minmax(0,1fr)] items-baseline gap-3.5 border-b border-line/70 bg-surface px-[18px] py-4 text-[15px] leading-[1.7] text-body last:border-0 sm:grid-cols-[56px_minmax(0,1fr)]"
        >
          <span aria-hidden className="font-mono text-[17px] font-semibold leading-tight text-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="min-w-0">{it}</span>
        </li>
      ))}
    </ol>
  );
}

function Rule() {
  const kw = "font-semibold text-accent";
  return (
    <pre
      aria-label="Example correlation rule"
      className="mt-4 overflow-x-auto rounded-lg border border-line/70 bg-surface px-5 py-[18px] font-mono text-[13.5px] font-medium leading-[1.85] text-body"
    >
      <span className={kw}>IF</span>
      {"   failed_logins(user, src_ip) >= 20 within 10 minutes\n"}
      <span className={kw}>AND</span>
      {"  successful_login(user, same src_ip) within 5 minutes after\n"}
      <span className={kw}>AND</span>
      {"  (privileged_group_change(user) OR large_file_read(user)) within 60 minutes\n"}
      <span className={kw}>THEN</span>{" "}
      <span className="text-warn">
        raise HIGH alert &quot;Possible account takeover&quot; for user
      </span>
    </pre>
  );
}

function Cap({
  kind,
  title,
  children,
}: {
  kind: "Find" | "Act";
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0 rounded-lg border border-line/70 bg-surface px-[18px] py-4">
      <p
        className={`mb-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] ${
          kind === "Find" ? "text-accent" : "text-warn"
        }`}
      >
        {kind}
      </p>
      <h3 className="mb-1.5 text-[16px] font-semibold leading-snug text-bright">
        {title}
      </h3>
      <p className="text-[14.5px] leading-[1.6] text-body">{children}</p>
    </div>
  );
}

/* ---------------------------------------------------------------- CTAs */

/** Shared frame for the four inline CTA cards. */
function CtaCard({
  label,
  children,
  side,
  sideFirst = false,
}: {
  label: string;
  children: ReactNode;
  side: ReactNode;
  /** The case-study card puts its proof figure on the left. */
  sideFirst?: boolean;
}) {
  return (
    <aside
      aria-label={label}
      className={`relative mt-10 grid items-center gap-6 rounded-lg border border-accent/30 bg-gradient-to-br from-accent/8 via-surface/60 to-surface/60 p-6 sm:p-7 ${
        sideFirst
          ? "md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]"
          : "md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]"
      }`}
    >
      <span aria-hidden className="absolute -top-px left-7 h-0.5 w-14 bg-accent" />
      {sideFirst && side}
      <div className="min-w-0">{children}</div>
      {!sideFirst && side}
    </aside>
  );
}

function CtaHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <>
      <p className={EYEBROW}>{eyebrow}</p>
      <h3 className="mt-3 text-[1.4rem] font-semibold leading-tight tracking-tight text-bright">
        {title}
      </h3>
    </>
  );
}

function CtaBody({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 text-[14.5px] leading-relaxed text-body">{children}</p>
  );
}

const LEDGER = [
  ["Source code", "yours"],
  ["Detection rules", "yours"],
  ["Log data", "your environment"],
  ["Per-GB license", "$0"],
];

function Ledger() {
  return (
    <div
      aria-label="What you own after handover"
      className="min-w-0 rounded-md border border-line/70 bg-void p-4 font-mono text-[12.5px] leading-snug"
    >
      <p className="pb-1.5 text-[10.5px] uppercase tracking-[0.14em] text-accent">
        After handover, you own
      </p>
      {LEDGER.map(([k, v]) => (
        <p key={k} className="flex items-baseline gap-2 py-1 text-body">
          <span className="whitespace-nowrap">{k}</span>
          <i
            aria-hidden
            className="min-w-3 flex-1 -translate-y-[3px] border-b border-dotted border-line"
          />
          <span className="whitespace-nowrap text-accent">{v}</span>
        </p>
      ))}
    </div>
  );
}

function ProofFigure() {
  return (
    <div className="flex flex-col gap-1.5 rounded-lg border border-line/70 bg-void p-[22px]">
      <span className="text-[clamp(2.4rem,6vw,3.4rem)] font-bold leading-none tracking-[-0.04em] text-accent">
        $270K
      </span>
      <span className="font-mono text-[11.5px] uppercase leading-snug tracking-[0.1em] text-faint">
        saved over 24 months
      </span>
    </div>
  );
}

const FUNNEL = [
  { b: "Every SIEM alert", s: "all rule and UEBA matches", cls: "w-full border-warn/35", t: "text-warn" },
  { b: "Enriched and auto-triaged", s: "context added, known-good closed", cls: "w-[82%] border-line/70", t: "text-bright" },
  { b: "Analyst queue", s: "only what needs a person", cls: "w-[62%] border-accent/45 bg-accent/10", t: "text-accent" },
];

function Funnel() {
  return (
    <div aria-label="Alert triage flow" className="grid min-w-0 gap-2">
      {FUNNEL.map((f) => (
        <div
          key={f.b}
          className={`flex flex-col rounded-md border bg-void px-3.5 py-2.5 leading-snug ${f.cls}`}
        >
          <b className={`text-[14px] font-semibold ${f.t}`}>{f.b}</b>
          <small className="font-mono text-[11px] tracking-[0.03em] text-faint">
            {f.s}
          </small>
        </div>
      ))}
    </div>
  );
}

function Tenants() {
  return (
    <div
      aria-label="Several isolated clients on one owned platform"
      className="grid min-w-0 gap-2.5 rounded-md border border-line/70 bg-void p-4"
    >
      <div className="grid grid-cols-3 gap-2">
        {[
          ["Client A", "own rules"],
          ["Client B", "own data"],
          ["Client C", "own reports"],
        ].map(([c, t]) => (
          <span
            key={c}
            className="rounded-md border border-line bg-surface px-1 py-2 text-center font-mono text-[12px] leading-tight text-bright"
          >
            {c}
            <small className="mt-0.5 block text-[10px] text-faint">{t}</small>
          </span>
        ))}
      </div>
      <div
        aria-hidden
        className="text-center font-mono text-[11px] tracking-[0.1em] text-faint"
      >
        ↓ isolated tenants ↓
      </div>
      <div className="rounded-md border border-accent/45 bg-accent/10 p-3 text-center font-mono text-[13px] font-semibold leading-snug text-accent">
        Your SIEM platform
        <small className="mt-0.5 block text-[10.5px] font-medium tracking-[0.04em] text-faint">
          owned code · no per-GB license
        </small>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- page */

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd()) }}
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
              { name: "Blog", path: "/blog" },
              { name: breadcrumbLabel(post.slug), path: PATH },
            ])
          ),
        }}
      />

      <ArticleShell
        post={post}
        toc={TOC}
        tocLabel="Contents"
        tocNumbered
        tocCta={false}
        byline={[
          <>
            By <Strong>WhyCrew Engineers</Strong>
          </>,
          <time key="updated" dateTime={post.dateModified}>
            Updated October 15, 2026
          </time>,
          post.readTime,
        ]}
      >
        <div id="quick-answer" className="scroll-mt-28">
          <QuickAnswer block>
            <p className="text-[16.5px] leading-[1.7] text-body">
              <Strong>
                SIEM (Security Information and Event Management) is a
                cybersecurity platform that collects log and event data from
                across an organization&apos;s IT environment, normalizes it into
                one format, correlates related events, and alerts security
                analysts to threats in real time.
              </Strong>{" "}
              It also stores that data for investigations and compliance audits.
            </p>
            <Meters
              items={[
                { k: "Built from", v: "SIM + SEM" },
                { k: "Core pipeline", v: "5 steps" },
                { k: "Term coined", v: "2005" },
                { k: "Run by", v: "The SOC" },
              ]}
            />
          </QuickAnswer>
        </div>

        <p className="mt-5 border-y border-line/70 py-3.5 text-[14px] leading-relaxed text-muted">
          <span className={`${LABEL} mr-2`}>This guide is for</span> security
          leaders, IT managers, SOC analysts, MSSPs, and anyone new to SIEM who
          needs a clear picture of what it does before choosing or building one.
        </p>

        <H2 id="what-is-siem">What Is SIEM?</H2>
        <p className="mt-4 text-[16.5px] leading-[1.7] text-body sm:text-[17px]">
          In cyber security, SIEM is the system a Security Operations Center
          (SOC) watches all day. Firewalls, servers, endpoints, cloud accounts,
          and identity systems each record what happens on them. On its own,
          each log shows one small piece. A SIEM puts the pieces together, so a
          failed login on one server and a large file transfer on another can be
          seen as one attack.
        </p>

        <Takeaways
          items={[
            "It does five jobs: collect, normalize, correlate, alert, and retain data.",
            "Correlation is the core: it links events from different systems into one detection.",
            "A SIEM is a tool. A SOC is the team that uses it.",
            "Detection quality depends on which data sources you connect and how well rules are tuned.",
          ]}
        />

        <H2 id="stand-for">What Does SIEM Stand for in Cyber Security?</H2>
        <P>
          SIEM stands for <Strong>Security Information and Event Management</Strong>.
          That is the SIEM full form, and it is pronounced &quot;sim&quot;. The
          name joins two older tool categories that security teams used to buy
          separately.
        </P>
        <Table
          head={["Part", "Stands for", "What it does", "Time frame"]}
          hl={2}
          rows={[
            [<Mono key="m">SIM</Mono>, "Security Information Management", "Collects, stores, and searches log history for audits, reporting, and forensics", "Months to years back"],
            [<Mono key="m">SEM</Mono>, "Security Event Management", "Watches events as they arrive, correlates them, and raises alerts", "Seconds to minutes"],
            [<Mono key="m">SIEM</Mono>, "Security Information and Event Management", "Does both in one platform, on the same data", "Real time plus history"],
          ]}
        />
        <P>
          Gartner coined the term SIEM in 2005, when vendors began merging log
          management with real-time monitoring. Since then, SIEM has added user
          behavior analytics, threat intelligence feeds, and cloud deployment.
          The core idea has not changed.
        </P>

        <H2 id="how-it-works">How Does SIEM Work? Step by Step</H2>
        <P>
          A SIEM turns raw logs into alerts in five steps. Each step depends on
          the one before it, so a gap early on (a missing log source, a broken
          parser) means missed detections later.
        </P>
        <Steps
          items={[
            <>
              <Strong>Collect.</Strong> Agents, syslog, and APIs aggregate logs
              and telemetry from firewalls, servers, endpoints, identity
              providers, and cloud accounts into the SIEM.
            </>,
            <>
              <Strong>Normalize.</Strong> Every vendor writes logs differently.
              Parsers map each log to common fields, such as user, source IP,
              host, action, and result, so events from different tools can be
              compared.
            </>,
            <>
              <Strong>Enrich.</Strong> The SIEM adds context: the asset&apos;s
              owner and criticality, the user&apos;s department, the IP&apos;s
              country, and whether threat intelligence lists it as malicious.
            </>,
            <>
              <Strong>Correlate and analyze.</Strong> Correlation rules and
              behavior analytics look for patterns across sources and over time.
              This is where single events become detections.
            </>,
            <>
              <Strong>Alert and investigate.</Strong> Matches become alerts with
              a severity score. Analysts triage the alert, search the stored
              history, and decide whether it is a real incident.
            </>,
          ]}
        />
        <P>
          Throughout, the SIEM keeps the normalized data in searchable storage,
          which supports forensics weeks later and audit reports months later.
        </P>

        <H3 id="worked-example">Worked Example: Catching a Brute-Force Login</H3>
        <P>No single log below is alarming. Together, they describe an account takeover.</P>
        <Table
          head={["Time", "Source", "Event"]}
          rows={[
            [<Mono key="t">02:10–02:14</Mono>, "VPN gateway", <>52 failed logins for user <Code>j.smith</Code> from one IP in Eastern Europe</>],
            [<Mono key="t">02:15</Mono>, "VPN gateway", <>Successful login for <Code>j.smith</Code> from the same IP</>],
            [<Mono key="t">02:21</Mono>, "Active Directory", <><Code>j.smith</Code> added to the Domain Admins group</>],
            [<Mono key="t">02:30</Mono>, "File server", <>4 GB read from the finance share by <Code>j.smith</Code></>],
          ]}
        />
        <P>A correlation rule written in plain logic looks like this:</P>
        <Rule />
        <P>
          The VPN, Active Directory, and file server each saw one part. Only the
          SIEM saw the sequence, because it holds all three logs in one format
          with one clock. That is the value of correlation.
        </P>

        <CtaCard label="Custom SIEM development" side={<Ledger />}>
          <CtaHead
            eyebrow="Custom SIEM development"
            title="Run Your Correlation Rules on a Platform You Own."
          />
          <CtaBody>
            WhyCrew engineers build SIEM platforms around your log sources and
            detection rules, then hand over the source code, infrastructure, and
            documentation. Your detections and your data stay yours, with no
            per-GB license.
          </CtaBody>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button href="/services/custom-siem-development">
              See custom SIEM development
            </Button>
          </div>
        </CtaCard>

        <H2 id="architecture">SIEM Architecture: What a SIEM Solution Is Made Of</H2>
        <P>
          Every SIEM solution, commercial or custom-built, has the same six
          layers: collection, parsing, storage, analytics, threat intelligence,
          and the analyst workspace. Vendors differ in how they build each
          layer, not in whether it exists.
        </P>
        <ArchitectureDiagram />

        <H3 id="data-sources">Which Data Sources Feed a SIEM</H3>
        <P>
          A SIEM can only detect what it can see. Start with the sources that
          cover identity, network edge, and endpoints, then add the rest.
        </P>
        <Table
          head={["Data source", "Example logs", "What it lets the SIEM detect", "Priority"]}
          rows={[
            ["Identity (Active Directory, Entra ID, Okta)", "Logins, MFA prompts, group changes", "Brute force, impossible travel, privilege escalation", <Pri key="p" level="Start here" />],
            ["Endpoints (EDR, Windows events, Sysmon)", "Process launches, PowerShell, file changes", "Malware, ransomware, lateral movement", <Pri key="p" level="Start here" />],
            ["Firewalls and VPN", "Allowed and blocked connections", "Scanning, command-and-control traffic, VPN abuse", <Pri key="p" level="Start here" />],
            ["Cloud (AWS CloudTrail, Azure, Google Cloud)", "API calls, role changes, storage access", "Exposed buckets, stolen keys, cloud privilege abuse", <Pri key="p" level="High" />],
            ["Email security", "Phishing verdicts, attachment detonations", "Phishing that led to a login or a payload", <Pri key="p" level="High" />],
            ["DNS and web proxy", "Domain lookups, URLs visited", "Malicious domains, data exfiltration over DNS", <Pri key="p" level="Medium" />],
            ["Servers and databases", "Auth logs, queries, admin actions", "Insider misuse, data theft", <Pri key="p" level="Medium" />],
            ["SaaS apps (Microsoft 365, Google Workspace)", "File shares, mailbox rules", "Business email compromise, data leaks", <Pri key="p" level="Medium" />],
          ]}
        />
        <P>
          If you can connect only three sources first, make them identity,
          endpoint, and firewall or VPN logs. Together they show how an attacker
          gets in, moves around, and leaves.
        </P>

        <H2 id="capabilities">Key SIEM Capabilities and Use Cases</H2>
        <P>
          A SIEM&apos;s value comes down to six capabilities. The first three
          find threats; the last three help people act on them and prove it
          later.
        </P>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Cap kind="Find" title="Centralized Visibility">
            One search across every connected system, instead of logging in to
            ten consoles.
          </Cap>
          <Cap kind="Find" title="Real-Time Correlation">
            Rules that link events across sources and time, like the
            brute-force example above.
          </Cap>
          <Cap kind="Find" title="User and Entity Behavior Analytics (UEBA)">
            Baselines of normal behavior for each user and host, so unusual
            activity stands out even when no rule matches.
          </Cap>
          <Cap kind="Act" title="Threat Intelligence Matching">
            Known-bad IPs, domains, and file hashes checked against your logs as
            they arrive.
          </Cap>
          <Cap kind="Act" title="Investigation and Forensics">
            Months of searchable history to trace how an attacker got in and
            what they touched.
          </Cap>
          <Cap kind="Act" title="Compliance Reporting">
            Audit trails and ready-made reports for PCI DSS (Requirement 10
            covers logging and monitoring), HIPAA (audit controls), SOX, and
            GDPR, while newer EU rules such as{" "}
            <A href="/blog/siem-nis2-dora-compliance">NIS2 and DORA</A> add their
            own logging and reporting duties.
          </Cap>
        </div>

        <H3 id="mitre">Common SIEM Detection Use Cases, Mapped to MITRE ATT&amp;CK</H3>
        <P>
          MITRE ATT&amp;CK is the public catalog of attacker techniques. Mapping
          each rule to a technique shows which attacks your SIEM covers and
          which it misses.
        </P>
        <Table
          head={["Use case", "What the SIEM correlates", "MITRE ATT&CK technique"]}
          rows={[
            ["Brute-force and password spraying", "Many failed logins, then a success", <><Mono>T1110</Mono> Brute Force</>],
            ["Compromised account use", "Login from a new country or impossible travel", <><Mono>T1078</Mono> Valid Accounts</>],
            ["Privilege escalation", "User added to an admin group outside a change window", <><Mono>T1098</Mono> Account Manipulation</>],
            ["Malicious PowerShell", "Encoded or downloaded PowerShell on an endpoint", <><Mono>T1059.001</Mono> PowerShell</>],
            ["Lateral movement", "One account logging in to many hosts over RDP or SMB", <><Mono>T1021</Mono> Remote Services</>],
            ["Phishing to compromise", "Email click, then a new login or process on that user's device", <><Mono>T1566</Mono> Phishing</>],
            ["Mailbox takeover", "New inbox rule forwarding mail outside the company", <><Mono>T1114.003</Mono> Email Forwarding Rule</>],
            ["Data exfiltration", "Unusual outbound volume or long DNS queries to a rare domain", <><Mono>T1048</Mono> Exfiltration Over Alternative Protocol</>],
            ["Ransomware", "Mass file renames and shadow copy deletion", <><Mono>T1486</Mono> Data Encrypted for Impact</>],
          ]}
        />

        <H2 id="comparison">SIEM vs SOC, SOAR, XDR, EDR, and Log Management</H2>
        <P>
          These terms get mixed up because they work together. The short
          version: log management stores data, SIEM detects threats in it, SOAR
          automates the response, EDR guards individual endpoints, XDR detects
          across one vendor&apos;s own sensors, and the SOC is the team running
          all of it.
        </P>
        <Table
          head={["Term", "What it is", "Main job", "How it relates to SIEM"]}
          hl={0}
          rows={[
            ["SIEM", "Software platform", "Detect threats across all log sources", "—"],
            ["SOC (Security Operations Center)", "A team and its processes", "Monitor, investigate, respond", "The SOC uses the SIEM as its main console"],
            ["SOAR", "Automation platform", "Run playbooks to respond to alerts", "Takes SIEM alerts and acts on them automatically"],
            ["XDR", "Detection across a vendor's own endpoint, email, and cloud tools", "Detect and respond within one ecosystem", "Deeper on its own sensors; a SIEM covers any vendor's logs"],
            ["EDR", "Agent software on laptops and servers", "Detect and stop threats on each endpoint", "Sends endpoint telemetry into the SIEM; sees devices, not identity, network, or cloud"],
            ["Log management", "Storage and search", "Keep and search logs", "Has no correlation or alerting; a SIEM is built on top of it"],
          ]}
        />
        <P>
          <Strong>Is a SIEM the same as a SOC?</Strong> No. A SIEM is the tool; a
          SOC is the people. For most SOCs, the SIEM is the core of their
          visibility, and a SIEM without people to work its alerts produces
          noise nobody acts on. Inside the SOC,{" "}
          <A href="/blog/soc-analyst-tiers-tier-1-2-3">
            tier 1, 2, and 3 analysts
          </A>{" "}
          split the work of triaging and investigating SIEM alerts.
        </P>
        <P>
          <Strong>SIEM vs SOAR.</Strong> SIEM finds the threat;{" "}
          <A href="/blog/what-is-soar">SOAR</A> runs the response steps, such as
          disabling an account or isolating a host. Many teams connect the two.
        </P>
        <P>
          <Strong>Is a SIEM a firewall?</Strong> No. A firewall blocks traffic. A
          SIEM reads the firewall&apos;s logs, together with everything else, to
          spot attacks the firewall alone cannot see.
        </P>

        <H2 id="tools">Examples of SIEM Tools and Platforms</H2>
        <P>
          Common SIEM platforms in 2026 fall into four groups. This list
          explains what each type is; it is not a ranking.
        </P>
        <Table
          head={["Type", "Examples", "Typical fit"]}
          rows={[
            ["Cloud-native SIEM", "Microsoft Sentinel, Google Security Operations", "Organizations already on that cloud"],
            ["Established enterprise SIEM", "Splunk Enterprise Security, IBM QRadar", "Large SOCs with many custom data sources"],
            ["Next-gen SIEM / analytics-led", "CrowdStrike Falcon Next-Gen SIEM, Exabeam, Securonix", "Teams that want UEBA and automation built in"],
            ["Open-source SIEM", "Wazuh, Elastic Security", "Teams with engineers to run and tune it"],
          ]}
        />
        <P>
          Teams with engineers to spare often start with{" "}
          <A href="/blog/open-source-siem">open-source SIEM tools</A> like Wazuh.
          MSSPs that outgrow per-client licensing usually end up weighing{" "}
          <A href="/blog/open-source-vs-custom-built-siem">
            open-source against custom-built SIEM
          </A>
          .
        </P>

        <H3 id="deployment">Cloud, Self-Hosted, Hybrid, or Managed SIEM</H3>
        <P>
          The same SIEM functions can run in four deployment models. The choice
          decides who runs the infrastructure and where your log data lives.
        </P>
        <Table
          head={["Deployment model", "Who runs it", "Where data lives", "Best fit"]}
          rows={[
            ["Cloud-native SIEM", "The vendor", "Vendor's cloud", "Cloud-first companies with small platform teams"],
            ["Self-hosted SIEM", "Your team", "Your servers or private cloud", "Organizations with strict data residency or control needs"],
            ["Hybrid SIEM", "Shared", "Collectors on-premises, analytics in the cloud", "Companies moving from on-premises to cloud"],
            ["Managed SIEM", "A service provider", "Provider's or your environment", "Teams without in-house SOC staff"],
          ]}
        />

        <H3 id="replacing">Is Anything Replacing SIEM?</H3>
        <P>Nothing is replacing SIEM outright. The category is changing in three ways:</P>
        <Bullets
          items={[
            <>
              <Strong>Next-gen SIEM.</Strong> Built-in UEBA, automation, and AI
              triage, so fewer alerts reach a human.
            </>,
            <>
              <Strong>Security data lakes.</Strong> Logs stored in cheaper object
              storage, with detection running on top, instead of everything in
              one hot index.
            </>,
            <>
              <Strong>AI-assisted SOC.</Strong> AI agents that triage and
              summarize alerts before an analyst opens them, the model behind an{" "}
              <A href="/blog/what-is-ai-soc">AI SOC</A>.
            </>,
          ]}
        />
        <P>
          XDR is sometimes called a SIEM replacement. In practice, most teams
          still need a SIEM for log sources outside the XDR vendor&apos;s own
          products, and for long-term retention.
        </P>

        <CtaCard label="Case study" side={<ProofFigure />} sideFirst>
          <CtaHead
            eyebrow="Case study · MSSP"
            title="From Renting a SIEM to Owning One."
          />
          <CtaBody>
            An MSSP moved off per-GB SIEM licensing onto a platform it owns,
            with the same detections and every client carried over. See how the
            move worked and what changed after it.
          </CtaBody>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button href="/case-studies/siem-rent-to-owned-platform">
              Read the case study
            </Button>
          </div>
        </CtaCard>

        <H2 id="who-needs">Who Needs a SIEM in Cyber Security?</H2>
        <P>
          You need a SIEM when you have more security logs than people can read,
          or a regulator who wants proof you monitor them. In practice that
          means:
        </P>
        <Bullets
          items={[
            <>
              <Strong>Regulated organizations</Strong> in finance, healthcare,
              retail (card data), and government, where log monitoring is an
              audit requirement.
            </>,
            <>
              <Strong>Mid-size and large companies</Strong> with hybrid or
              multi-cloud environments and a security team, in-house or
              outsourced.
            </>,
            <>
              <Strong>MSSPs and MDR providers</Strong>, who run a SIEM as the
              core of the service they sell.
            </>,
          ]}
        />
        <P>
          Small companies with a handful of systems are often better served
          first by EDR and a managed detection service, which brings a SIEM with
          it. Budget is part of that decision, since{" "}
          <A href="/blog/siem-cost-licensing-vs-custom-built">SIEM pricing</A>{" "}
          usually grows with the volume of data you send in.
        </P>

        <H2 id="limitations">SIEM Limitations and How to Avoid Them</H2>
        <P>
          Most SIEM projects that fail do so for operational reasons, not
          technical ones. These five problems come up in nearly every
          deployment.
        </P>
        <Table
          head={["Problem", "Why it happens", "How to avoid it"]}
          rows={[
            ["Alert fatigue", "Default rules fire on normal activity", "Tune rules weekly; score alerts by risk; suppress known-good behavior"],
            ["False positives", "Rules lack context about users and assets", "Enrich with asset criticality and identity data before alerting"],
            ["Blind spots", "Key sources never connected or parsers broken", "Map sources to MITRE ATT&CK and track coverage gaps"],
            ["Data overload", <>Every log ingested &quot;just in case&quot;</>, "Ingest by use case; send low-value logs to cheaper storage"],
            ["Skills gap", "Detection engineering (rules and parsers) needs engineers, not only analysts", "Budget engineering time or use a partner for content and tuning"],
          ]}
        />
        <P>
          One rule of thumb: a new SIEM should start with a short list of
          well-tuned detections on high-priority sources, not hundreds of
          default rules on everything.
        </P>

        <H3 id="rollout">SIEM Rollout Checklist</H3>
        <Steps
          items={[
            "Write down the threats and audit requirements the SIEM must cover.",
            "Connect identity, endpoint, and firewall or VPN logs first.",
            "Check that parsers map every source to the same field names.",
            "Map each detection rule to a MITRE ATT&CK technique and note the gaps.",
            "Tune rules on real traffic before turning on paging alerts.",
            "Define who triages each alert severity and how fast.",
            "Review alert quality monthly: false positive rate, time to triage, missed detections.",
          ]}
        />

        <CtaCard label="AI-powered SOC automation" side={<Funnel />}>
          <CtaHead
            eyebrow="AI-powered SOC automation"
            title="Cut Alert Fatigue Before It Reaches Your Analysts."
          />
          <CtaBody>
            WhyCrew builds AI triage into your SOC workflow. Routine alerts are
            enriched and closed automatically, and your analysts see the ones
            that need a person, with the context already attached.
          </CtaBody>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button href="/services/ai-powered-soc-automation">
              See AI-powered SOC automation
            </Button>
          </div>
        </CtaCard>

        <H2 id="mssp">SIEM for MSSPs: Rent the Platform or Own It</H2>
        <P>
          For an MSSP, the SIEM is not a tool used by the business; it is the
          business. Every client&apos;s logs, detections, and reports run through
          it. That raises questions a single company never faces: separating
          client data, onboarding new tenants quickly, and keeping margins when
          licensing grows with every client.
        </P>
        <P>Two things matter most:</P>
        <Bullets
          items={[
            <>
              <Strong>Multi-tenancy.</Strong> Each client needs isolated data,
              its own rules, and its own reports on shared infrastructure, which
              is the core of{" "}
              <A href="/blog/multi-tenant-siem-architecture-mssps">
                multi-tenant SIEM architecture
              </A>
              .
            </>,
            <>
              <Strong>Ownership.</Strong> A licensed SIEM is rented. A platform
              you own stays yours as you add clients.
            </>,
          ]}
        />
        <P>
          For MSSPs and large security teams, the bigger decision is often not
          whether to use a SIEM, but whether to rent one through vendor
          licensing or run a platform they control. That makes SIEM
          architecture a strategic choice, not just a tooling one.
        </P>
        <P>
          WhyCrew engineers build{" "}
          <A href="/services/custom-siem-development">custom SIEM platforms</A>{" "}
          that MSSPs own outright, for a fixed price, with full handover.
        </P>

        <CtaCard label="For MSSPs" side={<Tenants />}>
          <CtaHead
            eyebrow="For MSSPs"
            title="One Platform. Every Client Isolated."
          />
          <CtaBody>
            WhyCrew builds multi-tenant SIEM platforms for MSSPs: separate data,
            rules, and reports for each client on infrastructure you own, with
            the code handed over when we finish.
          </CtaBody>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button href="/services/mssp-engineering-partner">
              See the MSSP engineering partner service
            </Button>
            <Button href="/contact" variant="ghost">
              Talk to an engineer
            </Button>
          </div>
        </CtaCard>

        <H2 id="faq">Frequently Asked Questions</H2>
        <div className="mt-6">
          <FaqAccordion faqs={FAQS} columns={1} />
        </div>
      </ArticleShell>
    </>
  );
}
