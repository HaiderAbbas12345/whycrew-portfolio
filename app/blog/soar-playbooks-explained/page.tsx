import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArticleShell, type TocEntry } from "@/components/blog/article-shell";
import {
  Bullets,
  DataTable,
  H2,
  Numbered,
  P,
  QuickAnswer,
  Strong,
} from "@/components/blog/prose";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/ui/faq";
import { breadcrumbLd, faqLd, type Faq } from "@/lib/jsonld";
import { breadcrumbLabel, postBySlug, postPath } from "@/lib/blog";
import { OG_IMAGE, SITE } from "@/lib/site";

const post = postBySlug("soar-playbooks-explained")!;
const PATH = postPath(post);

export const metadata: Metadata = {
  // `absolute` keeps the title exactly as specified in the content doc — the
  // root layout's "%s | WhyCrew" template would push it past the SERP cutoff.
  title: { absolute: post.metaTitle },
  description: post.metaDescription,
  alternates: { canonical: PATH },
  openGraph: {
    type: "article",
    title: post.metaTitle,
    description: post.metaDescription,
    url: `${SITE.url}${PATH}`,
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified ?? post.datePublished,
    images: OG_IMAGE,
  },
  twitter: {
    card: "summary_large_image",
    title: post.metaTitle,
    description: post.metaDescription,
  },
};

const TOC: TocEntry[] = [
  { id: "what-is", label: "SOAR Playbook Definition" },
  { id: "how-it-works", label: "How It Works" },
  { id: "vs-runbook", label: "Playbook vs Runbook vs Rule" },
  { id: "types", label: "Types of Playbooks" },
  { id: "use-cases", label: "Top Use Cases" },
  { id: "examples", label: "12 Examples" },
  { id: "automate-first", label: "What to Automate First" },
  { id: "benefits", label: "Benefits" },
  { id: "build", label: "How to Build One" },
  { id: "best-practices", label: "Best Practices" },
  { id: "break-down", label: "Where Playbooks Break" },
  { id: "measure", label: "Measuring Performance" },
  { id: "platforms", label: "Types of SOAR Platforms" },
  { id: "xdr", label: "XDR and Playbooks" },
  { id: "ai", label: "AI-Powered Playbooks" },
  { id: "mssp", label: "For MSSPs" },
  { id: "custom", label: "When Off-the-Shelf Isn't Enough" },
  { id: "whycrew", label: "Where WhyCrew Fits" },
  { id: "faq", label: "FAQ" },
];

const FAQS: Faq[] = [
  {
    q: "What's the Difference Between SOAR and SIEM?",
    a: "A SIEM finds problems and a SOAR platform acts on them. The SIEM collects and correlates logs and raises an alert when a rule matches. SOAR picks up that alert and runs a playbook to enrich it, decide what to do and act across your tools. Most mature SOCs use both, and many vendors now sell them as a single platform.",
  },
  {
    q: "Are Low-Code SOAR Playbooks Enough, or Do You Need Code?",
    a: "Low-code is enough for most playbooks, including enrichment, triage, phishing response and standard containment. Teams usually add code for custom parsing, unusual APIs or calculations the visual builder can't express. A common pattern is low-code for the overall flow, with small scripts for the hard steps.",
  },
  {
    q: "How Long Does It Take to Build and Deploy a SOAR Playbook?",
    a: "A simple enrichment playbook can be built in days. A phishing or containment playbook usually takes several weeks once you include integration work, testing on past alerts and a recommend-only trial period. The build itself is the short part. Testing, tuning and approvals take most of the time.",
  },
  {
    q: "How Much Does a SOAR Platform Cost?",
    a: "It depends on the pricing model, which may be per user, per asset, per action or bundled with a SIEM or XDR license. The license is rarely the biggest cost. Integration upkeep and the engineering time to build and maintain playbooks often cost more over three years, so compare total cost of ownership, not list price.",
  },
  {
    q: "What Is MTTR, and How Much Can SOAR Reduce It?",
    a: "MTTR, or mean time to respond, is the average time from an alert to containment. SOAR reduces it most for routine, high-volume alerts, where a playbook replaces manual lookups and clicks. In our deployments, phishing shows the largest drop, as described in the phishing example above. Results depend on how much of each process can be automated.",
  },
  {
    q: "Can SOAR Playbooks Run Without Human Approval?",
    a: "Yes, for low-risk work such as enrichment, deduplication, known-bad blocking and closing confirmed false positives. Steps with real business impact, such as isolating a production server or disabling an executive's account, should wait for a named approver. Most teams run a semi-automated model, keeping full automation for predictable, reversible steps.",
  },
  {
    q: "What Happens When a SOAR Playbook Fails?",
    a: "It stops safely and hands the case to a person. A good playbook alerts its owner and opens a task so an analyst can finish the job using the written runbook. Any half-finished containment is rolled back or confirmed. The failure is logged too, which helps the owner track down the cause (often a changed API or data field) before the next run.",
  },
  {
    q: "What Skills Does a Team Need to Build SOAR Playbooks?",
    a: "A team needs incident response knowledge to define the right steps, integration skills to work with APIs and data formats, and testing discipline to catch edge cases. Scripting, usually Python, helps with custom logic, and fluency in your SIEM's query language makes enrichment steps much easier to build.",
  },
  {
    q: "Can a Small SOC Benefit From SOAR Playbooks?",
    a: "Yes. Start with two or three playbooks, such as phishing triage and alert enrichment, then add containment behind approval gates once those run reliably and the team trusts the results. Keep the first playbooks simple enough that one person can maintain them alongside their analyst work.",
  },
  {
    q: "How Do SOAR Playbooks Support Compliance?",
    a: "SOAR playbooks support compliance by producing a timestamped record of each response as it happens. That record shows auditors your handling was consistent and on time, without relying on analysts' notes. For EU entities, the same records can feed NIS2 and DORA incident reporting.",
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
    image: `${SITE.url}/WhyCrew.jpeg`,
    articleSection: post.cluster,
    keywords: post.topics.join(", "),
  };
}

/* ------------------------------------------------- page-local design blocks */

/*
 * Colour key, as in the design: accent (teal) = automation doing the work;
 * warn (amber) = a human gate or a risk.
 */

const EYEBROW =
  "font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-accent";
const MICRO =
  "block font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-faint";

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

function Meters({ items }: { items: { k: string; v: string }[] }) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line/70 bg-line/70 sm:grid-cols-4">
      {items.map((m) => (
        <div key={m.k} className="flex flex-col gap-1.5 bg-surface-2 p-3.5">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-faint">
            {m.k}
          </span>
          <span className="text-[15px] font-bold tracking-tight text-bright">
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
      <h3 className="text-[17px] font-semibold leading-snug text-bright">
        Key Takeaways
      </h3>
      <Bullets items={items} />
    </div>
  );
}

const KEY_TERMS = [
  ["SOAR", "Security Orchestration, Automation, and Response: software that connects security tools and runs automated response workflows"],
  ["SIEM", "Security Information and Event Management: collects logs and raises alerts"],
  ["XDR", "Extended Detection and Response: detection and response across endpoint, identity, email and cloud in one platform"],
  ["EDR", "Endpoint Detection and Response: monitors and acts on laptops and servers"],
  ["IOC", "Indicator of Compromise: a known-bad IP, domain, file hash or URL"],
  ["TDIR", "Threat Detection, Investigation, and Response: the full detect-to-contain process"],
  ["ITSM", "IT Service Management: the ticketing system IT teams work from"],
  ["MSSP", "Managed Security Service Provider: runs security operations for many client organizations"],
  ["MTTR", "Mean Time to Respond: average time from alert to containment"],
];

function KeyTerms() {
  return (
    <dl className="mt-4 grid gap-px overflow-hidden rounded-lg border border-line/70 bg-line/70 sm:grid-cols-2">
      {KEY_TERMS.map(([term, def]) => (
        <div key={term} className="bg-surface px-4 py-4">
          <dt className="mb-1 font-mono text-[13.5px] font-semibold text-bright">
            {term}
          </dt>
          <dd className="text-[14.5px] leading-relaxed text-body">{def}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Diagram frame: title, optional subtitle, optional source line. */
function Diagram({
  label,
  title,
  sub,
  caption,
  inset = false,
  children,
}: {
  label: string;
  title: string;
  sub?: string;
  caption?: string;
  /** Smaller, darker frame for a diagram that sits inside an example card. */
  inset?: boolean;
  children: ReactNode;
}) {
  return (
    <figure
      role="img"
      aria-label={label}
      className={`rounded-lg border border-line/70 ${
        inset ? "mt-4 mb-2 bg-void p-4" : "mt-8 bg-surface/50 p-4 sm:p-5"
      }`}
    >
      <p className="text-[16px] font-bold leading-snug text-bright">{title}</p>
      {sub && (
        <p className="mt-1 font-mono text-[12px] leading-relaxed text-faint">
          {sub}
        </p>
      )}
      <div className={sub ? "mt-4" : "mt-3"}>{children}</div>
      {caption && (
        <figcaption className="mt-3.5 font-mono text-[11.5px] leading-relaxed text-faint">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

const ANATOMY = [
  { t: "Trigger", d: "SIEM alert, EDR detection, reported email, schedule", safe: false },
  { t: "Logic and enrichment", d: "threat intel, assets, identity, then branch", safe: false },
  { t: "Actions", d: "quarantine, isolate, block, disable, ticket", safe: false },
  { t: "Approval gate", d: "a named analyst signs off on risky steps", safe: true },
  { t: "Audit trail", d: "every input, output and approval on the case", safe: true },
];

function Anatomy() {
  return (
    <>
      <div className="grid gap-3 md:grid-cols-5 md:gap-2.5">
        {ANATOMY.map((a, i) => (
          <div
            key={a.t}
            className={`relative min-w-0 rounded-md border border-line/70 border-t-[3px] bg-void px-3 pt-3 pb-3.5 ${
              a.safe ? "border-t-warn" : "border-t-accent"
            }`}
          >
            <span
              aria-hidden
              className="mb-2 block font-mono text-[10.5px] font-semibold text-faint"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <b className="block text-[14px] font-semibold leading-tight text-bright">
              {a.t}
            </b>
            <span className="mt-1.5 block font-mono text-[11.5px] leading-snug text-faint">
              {a.d}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2.5 grid grid-cols-2 gap-2.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] md:grid-cols-[3fr_2fr]">
        <span className="rounded-md bg-accent/10 px-2.5 py-2 text-center text-accent">
          Does the work
        </span>
        <span className="rounded-md bg-warn/10 px-2.5 py-2 text-center text-warn">
          Makes it safe in production
        </span>
      </div>
    </>
  );
}

function Arrow() {
  return (
    <i aria-hidden className="font-mono not-italic text-accent">
      →
    </i>
  );
}

function Layers() {
  const steps = [
    { kind: "automated", t: "Isolate the host" },
    { kind: "manual", t: "Call the user to confirm" },
    { kind: "automated", t: "Close as benign, log reason" },
  ];
  return (
    <div className="grid gap-3.5 md:grid-cols-[minmax(0,1fr)_13rem]">
      <div className="min-w-0">
        <div className="rounded-md border border-accent/40 bg-gradient-to-br from-accent/15 to-accent/5 p-3.5">
          <small className={`${MICRO} mb-2 text-accent`}>
            SOAR playbook · decision layer
          </small>
          <div className="flex flex-wrap items-center gap-2">
            {["Read alert", "Enrich", "Choose a path"].map((s, i) => (
              <span key={s} className="contents">
                {i > 0 && <Arrow />}
                <span className="rounded border border-line/70 bg-void px-2.5 py-1.5 text-[13.5px] font-semibold leading-tight text-bright">
                  {s}
                </span>
              </span>
            ))}
          </div>
        </div>
        <div aria-hidden className="hidden h-[18px] grid-cols-3 md:grid">
          <i className="ml-[50%] border-l border-dashed border-line" />
          <i className="ml-[50%] border-l border-dashed border-line" />
          <i className="ml-[50%] border-l border-dashed border-line" />
        </div>
        <div className="mt-2 grid gap-2 md:mt-0 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.t}
              className={`min-w-0 rounded-md border bg-void px-3 py-2.5 ${
                s.kind === "manual" ? "border-warn/40" : "border-line/70"
              }`}
            >
              <small
                className={`${MICRO} mb-2 ${
                  s.kind === "manual" ? "text-warn" : ""
                }`}
              >
                Runbook step · {s.kind}
              </small>
              <b className="text-[13.5px] font-semibold leading-snug text-bright">
                {s.t}
              </b>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 rounded-md border border-dashed border-line bg-void p-3.5">
        <small className={MICRO}>Automation rule</small>
        <b className="text-[15px] font-semibold leading-snug text-bright">
          When X happens, do Y
        </b>
        <span className="rounded bg-surface-2 p-2 font-mono text-[12px] leading-snug text-body">
          sender on block list <Arrow /> delete email
        </span>
        <span className="mt-auto font-mono text-[11.5px] leading-snug text-faint">
          One condition, one action, usually one tool
        </span>
      </div>
    </div>
  );
}

function StatBar({
  label,
  pct,
  tone = "accent",
}: {
  label: string;
  pct: number;
  tone?: "accent" | "soft" | "warn";
}) {
  const fill =
    tone === "warn" ? "bg-warn" : tone === "soft" ? "bg-accent/65" : "bg-accent";
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_2.75rem] items-center gap-x-3 gap-y-1 sm:grid-cols-[13rem_minmax(0,1fr)_2.75rem]">
      <span className="col-span-2 text-[13px] font-medium leading-snug text-bright sm:col-span-1 sm:text-[13.5px]">
        {label}
      </span>
      <span className="h-3.5 overflow-hidden rounded border border-line/70 bg-void">
        <i className={`block h-full ${fill}`} style={{ width: `${pct}%` }} />
      </span>
      <span className="text-right font-mono text-[15px] font-bold tabular-nums text-bright">
        {`${pct}%`}
      </span>
    </div>
  );
}

function AutomationStats() {
  return (
    <div className="grid gap-2.5">
      <StatBar label="Phishing response" pct={52} />
      <StatBar label="Vulnerability management" pct={43} />
      <StatBar label="Data enrichment" pct={42} />
      <div className="my-1 border-t border-dashed border-line" />
      <StatBar label="Integrated automated response" pct={64} tone="soft" />
      <StatBar label="Fully automated response" pct={16} tone="warn" />
    </div>
  );
}

function PhishFlow() {
  const line = [
    "Reported email",
    "Extract IOCs",
    "Threat intel + sandbox",
    "Search all mailboxes",
  ];
  const outcomes = [
    {
      k: "Malicious",
      v: "Quarantine every copy, block sender and URLs, P1/P2 ticket",
      cls: "border-l-danger",
      txt: "text-danger",
    },
    {
      k: "Someone clicked",
      v: "Hand off to the credential threat playbook",
      cls: "border-l-warn",
      txt: "text-warn",
    },
    {
      k: "Safe",
      v: "Close, thank the reporter, tune the filter",
      cls: "border-l-accent",
      txt: "text-accent",
    },
  ];
  const node =
    "rounded border bg-surface px-2.5 py-1.5 text-[12.5px] font-semibold leading-tight";
  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center gap-1.5">
        {line.map((s) => (
          <span key={s} className="contents">
            <span className={`${node} border-line/70 text-bright`}>{s}</span>
            <Arrow />
          </span>
        ))}
        <span className={`${node} border-accent/50 text-accent`}>Classify</span>
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {outcomes.map((o) => (
          <div
            key={o.k}
            className={`min-w-0 rounded-md border border-l-[3px] border-line/70 bg-surface px-3 py-2.5 ${o.cls}`}
          >
            <small
              className={`mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-[0.12em] ${o.txt}`}
            >
              {o.k}
            </small>
            <b className="text-[13px] font-medium leading-snug text-bright">
              {o.v}
            </b>
          </div>
        ))}
      </div>
    </div>
  );
}

const QUADRANTS = [
  {
    k: "Rare and unclear",
    t: "Keep with people",
    d: "Novel techniques, brand-new alert types, heavy context",
    cls: "border-line/70 bg-void",
    title: "text-bright",
  },
  {
    k: "Frequent but unclear",
    t: "AI investigates, people decide",
    d: "The agent gathers evidence, then a playbook runs the approved response",
    cls: "border-dashed border-line bg-void",
    title: "text-bright",
  },
  {
    k: "Rare but scripted",
    t: "Gated containment",
    d: "Ransomware containment, built early and kept behind approval gates",
    cls: "border-warn/40 bg-void",
    title: "text-warn",
  },
  {
    k: "Frequent and predictable",
    t: "Automate first",
    d: "Phishing triage, alert enrichment, IOC lookups, brute-force alerts",
    cls: "border-accent/55 bg-gradient-to-br from-accent/20 to-accent/5",
    title: "text-accent",
  },
];

function PriorityMatrix() {
  return (
    <div className="grid gap-2 sm:grid-cols-[22px_minmax(0,1fr)]">
      <span className="hidden rotate-180 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-faint [writing-mode:vertical-rl] sm:block">
        More judgment needed ↑
      </span>
      <div className="grid min-w-0 gap-2 sm:grid-cols-2">
        {QUADRANTS.map((q) => (
          <div key={q.k} className={`min-w-0 rounded-md border p-3.5 ${q.cls}`}>
            <small className="mb-1.5 block font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-faint">
              {q.k}
            </small>
            <b className={`mb-1.5 block text-[16px] font-bold leading-tight ${q.title}`}>
              {q.t}
            </b>
            <span className="block text-[13px] leading-snug text-body">
              {q.d}
            </span>
          </div>
        ))}
      </div>
      <span className="text-right font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-faint sm:col-start-2">
        More alert volume →
      </span>
    </div>
  );
}

const CHAIN = [
  { k: "AI agent", t: "Investigate", d: "gathers evidence, recommends a verdict", cls: "border-dashed border-accent/50 bg-void", title: "text-bright" },
  { k: "Analyst", t: "Approve", d: "required for any action with business impact", cls: "border-warn/50 bg-void", title: "text-warn" },
  { k: "Playbook", t: "Execute", d: "quarantine, isolate, ticket, suspend", cls: "border-accent/45 bg-gradient-to-br from-accent/15 to-accent/5", title: "text-accent" },
  { k: "Case", t: "Record", d: "AI reasoning, evidence and every action", cls: "border-line/70 bg-void", title: "text-bright" },
];

function AiChain() {
  return (
    <div className="grid items-stretch gap-1 md:grid-cols-[minmax(0,1fr)_18px_minmax(0,1fr)_18px_minmax(0,1fr)_18px_minmax(0,1fr)]">
      {CHAIN.map((c, i) => (
        <span key={c.k} className="contents">
          {i > 0 && (
            <i
              aria-hidden
              className="rotate-90 self-center text-center font-mono not-italic text-accent md:rotate-0"
            >
              →
            </i>
          )}
          <div className={`min-w-0 rounded-md border p-3 ${c.cls}`}>
            <small className={`${MICRO} mb-1.5`}>{c.k}</small>
            <b className={`block text-[16px] font-bold leading-tight ${c.title}`}>
              {c.t}
            </b>
            <span className="mt-1.5 block font-mono text-[11.5px] leading-snug text-faint">
              {c.d}
            </span>
          </div>
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------- example cards */

function Example({
  id,
  title,
  trigger,
  steps,
  intro,
  children,
}: {
  id: string;
  title: string;
  trigger: ReactNode;
  steps: ReactNode[];
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="min-w-0 rounded-lg border border-line/70 bg-surface/60 px-4 pt-1 pb-4 sm:px-6 sm:pb-5">
      <h3
        id={id}
        className="mt-5 mb-2.5 scroll-mt-28 text-[17px] font-semibold leading-snug text-bright"
      >
        {title}
      </h3>
      {intro && (
        <p className="text-[15px] leading-[1.75] text-body">{intro}</p>
      )}
      <p className="mt-3 flex flex-wrap items-baseline gap-2.5 text-[14.5px] leading-[1.65] text-bright">
        <span className="shrink-0 -translate-y-px rounded bg-accent px-2 py-1 font-mono text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-void">
          Trigger
        </span>
        {trigger}
      </p>
      <ol className="mt-3 mb-3.5 ml-[11px] border-l border-line">
        {steps.map((s, i) => (
          <li
            key={i}
            className="relative py-1.5 pl-6 text-[14.5px] leading-[1.65] text-body"
          >
            <span
              aria-hidden
              className="absolute top-[7px] -left-3 flex size-[22px] items-center justify-center rounded-full border border-line bg-surface-2 font-mono text-[10.5px] font-semibold text-accent"
            >
              {i + 1}
            </span>
            {s}
          </li>
        ))}
      </ol>
      {children}
    </div>
  );
}

function ExP({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-[15px] leading-[1.75] text-body">{children}</p>;
}

/* ---------------------------------------------------------------- CTAs */

/** Shared frame for the four inline CTA cards. */
function CtaCard({
  label,
  children,
  side,
  final = false,
}: {
  label: string;
  children: ReactNode;
  side: ReactNode;
  /** Amber variant for the closing audit card. */
  final?: boolean;
}) {
  return (
    <aside
      aria-label={label}
      className={`relative mt-10 grid items-center gap-6 rounded-lg border bg-gradient-to-br to-surface/60 p-6 sm:p-7 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] ${
        final
          ? "border-warn/35 from-warn/6 via-surface/60"
          : "border-accent/30 from-accent/8 via-surface/60"
      }`}
    >
      <span
        aria-hidden
        className={`absolute -top-px left-7 h-0.5 w-14 ${
          final ? "bg-warn" : "bg-accent"
        }`}
      />
      <div className="min-w-0">{children}</div>
      {side}
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

const FIRST_PLAYBOOKS = [
  ["01 Phishing response", "automate"],
  ["02 Alert enrichment", "automate"],
  ["03 IOC enrichment", "automate"],
  ["04 EDR triage", "gated"],
  ["05 Credential threats", "gated"],
];

function FirstPlaybooks() {
  return (
    <div
      aria-label="Suggested first playbooks"
      className="min-w-0 rounded-md border border-line/70 bg-void p-4 font-mono text-[12.5px] leading-snug"
    >
      <p className="pb-1.5 text-[10.5px] uppercase tracking-[0.14em] text-faint">
        Good playbooks to build first
      </p>
      {FIRST_PLAYBOOKS.map(([k, v]) => (
        <p key={k} className="flex items-baseline gap-2 py-1 text-body">
          <span className="whitespace-nowrap">{k}</span>
          <i
            aria-hidden
            className="min-w-3 flex-1 -translate-y-[3px] border-b border-dotted border-line"
          />
          <span
            className={`whitespace-nowrap ${
              v === "automate" ? "text-accent" : "text-bright"
            }`}
          >
            {v}
          </span>
        </p>
      ))}
    </div>
  );
}

function Ticks({
  label,
  items,
  warn = false,
}: {
  label: string;
  items: [string, string][];
  warn?: boolean;
}) {
  return (
    <ul aria-label={label} className="grid min-w-0 gap-2">
      {items.map(([b, s]) => (
        <li
          key={b}
          className="relative rounded-md border border-line/70 bg-void py-2.5 pr-3 pl-10"
        >
          <span
            aria-hidden
            className={`absolute top-2.5 left-3.5 font-mono text-[13.5px] font-bold ${
              warn ? "text-warn" : "text-accent"
            }`}
          >
            {warn ? "!" : "✓"}
          </span>
          <b className="block text-[14px] font-semibold leading-snug text-bright">
            {b}
          </b>
          <span className="block font-mono text-[11.5px] leading-snug text-faint">
            {s}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Tenants() {
  return (
    <div
      role="img"
      aria-label="A central versioned playbook library applies per-client settings at runtime; each client runs in its own lane with its own SLA tier and audit log."
      className="grid min-w-0 gap-2 rounded-md border border-line/70 bg-void p-3.5"
    >
      <div className="rounded border border-accent/45 bg-gradient-to-br from-accent/18 to-accent/5 p-2.5 text-center">
        <small className={`${MICRO} text-accent`}>Core library</small>
        <b className="text-[14px] font-semibold text-bright">
          Versioned and tested once
        </b>
      </div>
      <div className="py-1 text-center font-mono text-[11px] leading-snug text-faint">
        <span aria-hidden className="text-accent">
          ↓{"  "}
        </span>
        per-client settings applied at runtime
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[
          ["Client A", "Tier 1 SLA"],
          ["Client B", "Tier 2 SLA"],
          ["Client C", "Tier 3 SLA"],
        ].map(([c, t]) => (
          <div
            key={c}
            className="flex min-w-0 flex-col gap-0.5 rounded border border-dashed border-line p-2 text-center"
          >
            <b className="text-[13px] font-semibold text-bright">{c}</b>
            <span className="font-mono text-[10.5px] leading-snug text-faint">
              {t}
            </span>
            <span className="font-mono text-[10.5px] leading-snug text-faint">
              own audit log
            </span>
          </div>
        ))}
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
            Updated October 9, 2026
          </time>,
          "Stats checked October 2026",
          post.readTime,
        ]}
      >
        <QuickAnswer block>
          <p className="text-[16.5px] leading-[1.7] text-body">
            A SOAR playbook is an automated incident response workflow that
            runs when a security trigger occurs, such as a SIEM alert, an EDR
            detection, or a reported phishing email. It gathers context,
            applies decision logic, executes response actions across connected
            tools, and records every step for analysts, audits, and compliance.
          </p>
          <Meters
            items={[
              { k: "Runs on", v: "A trigger" },
              { k: "Does", v: "Enrich · decide · act" },
              { k: "Pauses for", v: "Approval gates" },
              { k: "Leaves", v: "An audit trail" },
            ]}
          />
        </QuickAnswer>

        <P>
          In a working SOC, the playbook is what ties your SIEM, XDR, EDR,
          identity provider, threat intel feeds and case management together.
          Set up well, it cuts alert fatigue, brings mean time to respond down
          and gives regulated teams the audit trail auditors ask for.
        </P>
        <P>
          Most SOCs we walk into don&apos;t have a detection problem. The alert
          fired. Nobody got to it in time. That&apos;s the gap a playbook
          closes.
        </P>

        <Takeaways
          items={[
            <>
              <Strong>What it is:</Strong> a SOAR playbook runs a predefined
              response the moment an alert fires and logs every step it takes.
            </>,
            <>
              <Strong>Build these first:</Strong> phishing triage, alert
              enrichment and IOC lookups, followed by EDR triage and credential
              threats.
            </>,
            <>
              <Strong>Who it&apos;s for:</Strong> SOC teams buried in
              repetitive alerts, MSSPs running many clients, regulated
              operators who need response evidence, and teams comparing SOAR
              options.
            </>,
            <>
              <Strong>Keep a human in the loop</Strong> for any action that can
              disrupt the business.
            </>,
            <>
              <Strong>Give every playbook an owner,</Strong> because APIs, data
              formats and detection rules change.
            </>,
          ]}
        />

        <H3 id="key-terms">Key Terms</H3>
        <P>These are the abbreviations used throughout this guide.</P>
        <KeyTerms />

        <H2 id="what-is">SOAR Playbook Definition</H2>
        <P>
          A SOAR playbook is a response procedure written as a workflow that
          your SOAR platform can run by itself. Once the trigger fires, it
          works through a fixed set of steps across your security tools,
          branches based on what it finds, and logs what it did.
        </P>
        <P>
          Picture the checklist your analysts already follow, running at 3
          a.m. with nobody at the keyboard. It checks the IP, pulls the
          user&apos;s sign-in history, quarantines the email, isolates the
          laptop and opens the ticket.
        </P>
        <P>
          The word comes from incident response. SOC teams kept a written
          playbook for each incident type, and SOAR platforms turned those
          documents into workflows that actually run. Most of them do four
          jobs: enrichment, triage, response and record keeping.
        </P>

        <H2 id="how-it-works">How a SOAR Playbook Works</H2>
        <P>
          A SOAR playbook moves an alert from trigger to closed case through
          five parts: trigger, logic and enrichment, actions, approval gate,
          and audit trail. The first three do the work. The last two are what
          let you switch it on in production without worrying that one bad run
          takes a server offline or locks your CFO out of email.
        </P>
        <Numbered
          items={[
            <>
              <Strong>Trigger.</Strong> The event that starts the run: a
              high-severity SIEM alert, an EDR detection, an identity provider
              alert, a user-reported phishing email, or a schedule.
            </>,
            <>
              <Strong>Logic and enrichment.</Strong> The playbook pulls context
              from threat intelligence feeds, the asset inventory, the identity
              provider and logs. Conditional branches then pick the path: Is
              the hash known bad? Is the sender domain younger than 30 days? Is
              the host a server or a laptop?
            </>,
            <>
              <Strong>Actions.</Strong> The playbook acts through integrations
              (also called apps or connectors): quarantine an email, isolate an
              endpoint, block an IP at the firewall, disable an account, or
              open an ITSM ticket.
            </>,
            <>
              <Strong>Approval gate.</Strong> A pause before any action that
              could disrupt the business, such as isolating a production server
              or disabling an executive&apos;s account. The playbook prepares
              the evidence and waits for a named analyst.
            </>,
            <>
              <Strong>Audit trail.</Strong> Every step, input, output and
              approval is saved to the case. That record supports
              investigations, client reporting and compliance evidence.
            </>,
          ]}
        />
        <Diagram
          label="Anatomy of a SOAR playbook: trigger, logic and enrichment, and actions do the work; the approval gate and audit trail make it safe to run in production."
          title="Anatomy of a SOAR Playbook"
          sub="Five parts, from the alert that starts it to the record it leaves"
        >
          <Anatomy />
        </Diagram>

        <H2 id="vs-runbook">SOAR Playbook vs Runbook vs Automation Rule</H2>
        <P>
          A runbook explains how to complete one task, such as resetting MFA or
          restoring a server. A playbook defines how to handle a whole incident
          scenario, including decisions, escalation paths, approvals, and
          automated actions. An automation rule performs a single action when a
          condition is met. In a SOAR platform, a playbook often runs several
          runbook steps.
        </P>
        <DataTable
          head={["Compare", "Automation rule", "Runbook", "SOAR playbook"]}
          highlightCol={3}
          rows={[
            ["Question it answers", "\"When X happens, do Y\"", "\"How do I do task X?\"", "\"How do we handle situation Y?\""],
            ["Scope", "One action", "One task or procedure", "A whole incident type"],
            ["Logic", "Single condition", "Linear steps", "Branching decisions"],
            ["Run by", "The tool that holds the rule", "A person or a script", "The SOAR platform, with people at approval gates"],
            ["Tool coverage", "Usually one tool", "One system or task", "Many tools in one flow"],
            ["Rollback", "Rarely", "Sometimes documented", "Can be built in"],
          ]}
        />
        <P>
          Here&apos;s how we explain it to new analysts. The playbook is the{" "}
          <Strong>decision layer</Strong> and runbooks are the{" "}
          <Strong>task layer</Strong>. The playbook reads the alert, enriches it
          and picks a path. Each branch then calls a runbook step. Some steps
          are automated, like isolating a host. Others are manual, like phoning
          the user to check. If the automation breaks, or a call needs human
          judgment, the analyst falls back to the written runbook.
        </P>
        <Diagram
          label="The playbook is the decision layer: it reads the alert, enriches it and picks a path. Each branch calls a runbook step, automated or manual. An automation rule is a single condition and a single action."
          title="How Playbooks, Runbooks and Rules Fit Together"
          sub="The playbook decides, runbook steps do the work, and a rule handles one simple case"
        >
          <Layers />
        </Diagram>
        <P>
          People mix the two words up, and it&apos;s easy to see why. In plenty
          of SOCs, &quot;runbook&quot; means the written procedure someone
          follows by hand and &quot;playbook&quot; means the automated version.
          Teams usually write the runbook first and automate the boring parts
          later, so both meanings are in use and neither is wrong.
        </P>

        <H2 id="types">Types of SOAR Playbooks</H2>
        <P>
          You can sort SOAR playbooks two ways: by how much they automate, and
          by the job they do. Real playbooks rarely do only one job. A phishing
          playbook enriches the alert, triages it, contains the threat and
          tells the right people, all before it closes the case.
        </P>
        <DataTable
          head={["Automation level", "What it does", "Good fit"]}
          rows={[
            ["Manual (guided)", "Lists the steps as tasks; an analyst runs each one", "New or rare incident types, high-judgment cases"],
            ["Semi-automated", "Automates enrichment and preparation; a human approves the response", "Containment, account actions, anything with business impact"],
            ["Fully automated", "Runs end to end with no human step", "High-volume, low-risk work: enrichment, known-bad blocking, false-positive closure"],
          ]}
        />
        <P>By function, most playbooks do one or more of these jobs:</P>
        <DataTable
          head={["Function", "Typical job"]}
          rows={[
            ["Enrichment", "Reputation, asset, identity and location context added to every alert"],
            ["Triage and routing", "Severity scoring, deduplication, auto-close or escalate"],
            ["Containment and response", "Isolate, quarantine, block, disable, reset"],
            ["Forensic", "Capture memory, process lists and logs before containment"],
            ["Identity and access", "Session revocation, MFA reset, account disable"],
            ["Vulnerability", "Prioritize CVEs by exploitation and asset value, open patch tickets"],
            ["Compliance and reporting", "Collect evidence, build incident reports, track SLAs"],
            ["Notification", "Page on-call, update chat channels, notify asset owners"],
          ]}
        />

        <H2 id="use-cases">Top SOAR Playbook Use Cases</H2>
        <P>
          The most common SOAR playbook use cases are phishing response, alert
          enrichment, vulnerability management, malware containment and
          identity response. In the SANS Institute&apos;s 2024 State of
          Automation in Security Operations survey, 52% of organizations said
          they already automate phishing response, 43% vulnerability management
          and 42% data enrichment.
        </P>
        <P>
          Most teams have started. Few have finished. In the SANS
          Institute&apos;s 2024 Detection and Response survey, 64% of
          organizations had integrated automated response, but only 16% had
          fully automated it.
        </P>
        <P>
          Libraries also stay smaller than people expect. Forrester principal
          analyst Allie Mellen wrote in 2022 that teams often implement a
          maximum of 5 to 10 playbooks in their first several years with SOAR.
          That isn&apos;t a failure. These use cases work because the response
          can be mapped out before the alert ever fires, and only a handful of
          security workflows are that predictable.
        </P>
        <Diagram
          label="SANS 2024 survey data: 52 percent automate phishing response, 43 percent vulnerability management, 42 percent data enrichment. 64 percent have integrated automated response but only 16 percent have fully automated it."
          title="What Teams Already Automate"
          sub="Share of organizations, SANS Institute surveys, 2024"
          caption="Top three: The State of Automation in Security Operations (June 2024). Bottom two: 2024 Detection and Response Survey."
        >
          <AutomationStats />
        </Diagram>
        <P>
          The table below maps each use case to what the playbook automates and
          what usually triggers it.
        </P>
        <DataTable
          head={["Use case", "What the playbook automates", "Typical trigger"]}
          rows={[
            ["Phishing triage and remediation", "IOC extraction, reputation checks, mailbox search, quarantine", "User report, email gateway alert"],
            ["Malware and ransomware containment", "Process tree, host isolation, C2 blocking, evidence capture", "EDR or SIEM detection"],
            ["EDR alert triage", "Hash checks, false-positive filtering, prioritization", "EDR alert"],
            ["Credential threat response", "Session revocation, password reset, MFA enforcement", "Brute force, password spray, MFA fatigue"],
            ["Identity anomaly (impossible travel)", "Location and VPN checks, user confirmation, escalation", "Identity provider alert"],
            ["SIEM alert enrichment and triage", "Identity, asset, location and history context; risk score", "Any SIEM alert"],
            ["Threat intelligence enrichment", "IP, domain, hash and URL reputation", "Any alert with an IOC"],
            ["Domain intelligence", "WHOIS age, DNS, lookalike and reputation checks", "New or suspicious domain"],
            ["Vulnerability prioritization", "Exploitation status, asset value, ticket routing", "Scanner finding, new CVE"],
            ["Cloud policy enforcement", "Revert misconfiguration, log violation, notify owner", "Cloud posture alert"],
            ["Threat hunting", "Hunt queries across SIEM, EDR and cloud logs", "Schedule, new threat advisory"],
            ["Compliance auditing and reporting", "Evidence collection, incident reports, SLA tracking", "Case closure, schedule"],
          ]}
        />

        <H2 id="examples">12 SOAR Playbook Examples, Step by Step</H2>
        <P>
          Below are 12 SOAR playbook examples we&apos;ve built for real SOC and
          MSSP clients. Each one opens with the trigger, then walks through the
          steps in the order the playbook runs them. Your tools and thresholds
          won&apos;t match ours exactly, so change them to fit.
        </P>
        <div className="mt-6 grid gap-3.5">
          <Example
            id="1-phishing-response-soar-playbook"
            title="1. Phishing Response SOAR Playbook"
            intro="If you only build one playbook this year, make it this one."
            trigger="a user reports an email, or the email gateway flags one."
            steps={[
              "Take in the reported email and its full headers.",
              "Extract URLs, attachments, sender address, reply-to and sending IPs.",
              "Check each indicator against threat intelligence and detonate attachments in a sandbox.",
              "Search every mailbox for the same message, including copies nobody reported.",
              "Classify the case: credential phishing, malware, business email compromise or vishing.",
              "If malicious: quarantine all copies, block the sender domain and URLs, warn affected users, open a P1 or P2 ticket.",
              "If anyone clicked: hand off to the credential threat playbook (example 4).",
              "If safe: close the ticket, thank the reporter, log the false positive and tune the filter.",
            ]}
          >
            <Diagram
              inset
              label="Phishing response flow: reported email, extract indicators, threat intel and sandbox, search all mailboxes, classify. Malicious leads to quarantine, block and ticket. Clicked leads to the credential threat playbook. Safe leads to close and tune the filter."
              title="The Phishing Playbook as a Flow"
            >
              <PhishFlow />
            </Diagram>
            <ExP>
              Step 5 is where analysts lose most of their time. Across WhyCrew
              client deployments, automating it cut phishing response time from
              45–90 minutes to under 5 minutes.
            </ExP>
          </Example>

          <Example
            id="2-ransomware-containment-soar-playbook"
            title="2. Ransomware Containment SOAR Playbook"
            trigger="a malware alert from EDR or a SIEM rule."
            steps={[
              "Pull the process tree, parent process and signs of lateral movement from EDR.",
              "If ransomware behavior appears, isolate the device at once.",
              "Capture memory and the running process list before isolation completes.",
              "Hash the sample and check it against threat intelligence.",
              "Block command-and-control IPs and domains at the firewall and proxy.",
              "Review sign-in logs for the user and machine over the past 24 hours.",
              "Open a P1 ticket with all context filled in.",
              "Alert the incident response lead, the system owner and, if needed, a compliance officer.",
              "Start a backup integrity check for affected systems.",
            ]}
          >
            <ExP>
              An analyst takes over at step 7. By then, the host is already
              contained.
            </ExP>
          </Example>

          <Example
            id="3-edr-triage-soar-playbook"
            title="3. EDR Triage SOAR Playbook"
            trigger="any EDR alert. EDR tools are noisy, and most of what they flag is harmless, so this playbook does the first pass."
            steps={[
              "Pull file hash, process path, command line and signer.",
              "Check the hash against threat intelligence and your allow list.",
              "Look up the device: owner, criticality, last patch date.",
              "Correlate with SIEM logs for the same host over the past 72 hours.",
              "Score the alert and set priority.",
              "Auto-close known benign activity with a logged reason.",
              "For high scores, run the containment playbook (example 2) behind an approval gate.",
            ]}
          />

          <Example
            id="4-credential-threat-soar-playbook-brute-force-password-spray"
            title="4. Credential Threat SOAR Playbook (Brute Force, Password Spray, MFA Fatigue)"
            trigger="many failed sign-ins for one account, failed sign-ins across many accounts from one source, repeated MFA push denials, or leaked credentials found in a breach feed."
            steps={[
              "Identify the pattern: brute force, password spray, MFA fatigue or leaked credentials.",
              "Check the source IP against threat intelligence, Tor and hosting-provider lists.",
              "Check whether any attempt succeeded.",
              "If none succeeded: block the source IP and add the accounts to a watch list.",
              "If one succeeded: revoke all active sessions and tokens for that user.",
              "Force a password reset and re-register MFA, preferring a phishing-resistant method.",
              "For privileged or executive accounts, require approval before disabling the account.",
              "Search for follow-on activity: new inbox rules, OAuth grants, MFA device changes.",
              "Notify the user and their manager through a known-good channel.",
            ]}
          />

          <Example
            id="5-impossible-travel-soar-playbook"
            title="5. Impossible Travel SOAR Playbook"
            trigger="sign-ins for one user from two distant locations within a short window."
            steps={[
              "Check whether either location matches a company office or one of your VPN exit points.",
              "Compare the MFA outcome, device health and browser for each sign-in.",
              "Pull the user's normal sign-in pattern for the past 30 days.",
              "Message the user to confirm the activity.",
              "If confirmed, close with a note. If not, or no reply in a set time, escalate.",
              "On escalation, revoke sessions and run the credential threat playbook.",
            ]}
          >
            <ExP>
              Expect to tune this one more than any other. VPNs, business trips
              and mobile networks all throw location data off.
            </ExP>
          </Example>

          <Example
            id="6-siem-enrichment-soar-playbook"
            title="6. SIEM Enrichment SOAR Playbook"
            trigger="any SIEM alert above a set severity. Many alerts don't need a response, only context."
            steps={[
              "Check the asset list: managed device? High-value user?",
              "Pull identity data from the directory: role, department, manager.",
              "Pull recent sign-in history and device details.",
              "Check the source IP against threat intelligence and location data.",
              "Look for related alerts on the same user or host over the past 72 hours.",
              "Score the alert: low, medium or high likelihood of a real threat.",
              "Route it: auto-close if low, assign if medium, escalate now if high.",
            ]}
          >
            <ExP>
              Across WhyCrew client deployments, this saved 15 to 20 minutes of
              manual lookups per alert.
            </ExP>
          </Example>

          <Example
            id="7-ioc-enrichment-soar-playbook"
            title="7. IOC Enrichment SOAR Playbook"
            trigger="any alert containing an IP, domain, file hash or URL."
            steps={[
              "Query your threat intelligence sources, such as VirusTotal, AlienVault OTX or MISP.",
              "Collect reputation scores, tags (botnet, C2, phishing, scanner) and past sightings.",
              "Write that context onto the alert in the SIEM.",
              "If clearly malicious, raise severity and route to an analyst.",
              "If unclear, log the result and keep severity as is.",
              "If not found anywhere, flag for review rather than treating it as safe.",
            ]}
          />

          <Example
            id="8-domain-intelligence-soar-playbook"
            title="8. Domain Intelligence SOAR Playbook"
            trigger="a new domain seen in email, proxy or DNS logs, or a domain extracted by another playbook. Newly registered and lookalike domains have no reputation yet, so this playbook judges them on other evidence."
            steps={[
              "Look up WHOIS registration date, registrar and privacy status.",
              "Check DNS records (A, MX, NS) and recent changes.",
              "Check TLS certificate age and issuer.",
              "Compare the name to your own brands to catch lookalikes and typosquats.",
              "Query reputation and passive DNS sources.",
              "Score risk: a domain under 30 days old that imitates your brand is high risk.",
              "If high risk: block at DNS and proxy, add to the email gateway block list, and alert the brand team.",
            ]}
          />

          <Example
            id="9-vulnerability-prioritization-soar-playbook"
            title="9. Vulnerability Prioritization SOAR Playbook"
            trigger="a scanner reports a new critical or high finding, or a new CVE is published."
            steps={[
              "Check whether the CVE is exploited in the wild, for example against the CISA Known Exploited Vulnerabilities catalog.",
              "Look up the asset: internet-facing? Business-critical? Who owns it?",
              "Calculate a priority from severity, exploitation and asset value.",
              "Open a ticket for the right patching team with the fix and deadline.",
              "Track the ticket and escalate if the deadline passes.",
            ]}
          />

          <Example
            id="10-cloud-policy-enforcement-soar-playbook"
            title="10. Cloud Policy Enforcement SOAR Playbook"
            trigger="a cloud posture tool flags a misconfiguration, such as a public storage bucket."
            steps={[
              "Confirm the resource and its owner from tags.",
              "Check whether the resource holds sensitive data.",
              "Revert to the secure baseline, with an approval gate for production resources.",
              "Record the violation for audit.",
              "Notify the owning DevOps team which policy was broken and what fix was applied.",
            ]}
          />

          <Example
            id="11-threat-hunting-soar-playbook"
            title="11. Threat Hunting SOAR Playbook"
            trigger="a schedule, or a new threat advisory with indicators and techniques."
            steps={[
              "Extract indicators and techniques from the advisory.",
              "Run hunt queries across SIEM, EDR and cloud logs in parallel.",
              "Merge and deduplicate hits.",
              "Open a case for each confirmed hit with the raw evidence attached.",
              "Turn repeat hunts into new detection rules.",
            ]}
          />

          <Example
            id="12-compliance-reporting-soar-playbook"
            title="12. Compliance Reporting SOAR Playbook"
            trigger="a case closes, or a reporting deadline approaches."
            steps={[
              "Collect the case timeline, actions taken and approvals.",
              "Check the response against the SLA and regulatory deadlines.",
              <>
                Build the incident report in the format the framework expects,
                such as{" "}
                <A href="/blog/siem-nis2-dora-compliance">NIS2 or DORA</A> for
                EU entities.
              </>,
              "Route it for sign-off and store it with a retention tag.",
            ]}
          />
        </div>

        <CtaCard label="Custom SOAR development" side={<FirstPlaybooks />}>
          <CtaHead
            eyebrow="Custom SOAR development"
            title="Want These Playbooks Running on Your Stack?"
          />
          <CtaBody>
            WhyCrew builds playbooks around the tools, approval paths and
            clients you actually have. We wire them into your SIEM, test them
            on your past alerts, then hand over the code.
          </CtaBody>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button href="/services/custom-soar-development">
              See custom SOAR development
            </Button>
            <Button href="/contact" variant="ghost">
              Talk to an engineer
            </Button>
          </div>
        </CtaCard>

        <H2 id="automate-first">Which Alerts Should You Automate First?</H2>
        <P>
          Automate high-volume, repetitive, low-ambiguity alerts first. For
          most SOC teams, that means phishing triage, alert enrichment, IOC
          lookups, brute-force alerts and routine identity checks. They pay for
          themselves fastest, and if one misfires, the damage is small.
        </P>
        <Diagram
          label="Automation priority matrix. High volume and low ambiguity: automate first. Low volume and low ambiguity: gated containment playbook. High ambiguity: AI-assisted triage or keep with people."
          title="Where Each Alert Type Belongs"
          sub="Alert volume against how much judgment the response needs"
        >
          <PriorityMatrix />
        </Diagram>
        <P>
          We also suggest building one gated containment playbook early, even
          though it&apos;ll rarely run. Leadership knows a serious incident
          will get a fast, approved response, and you get to test your approval
          process before a real emergency tests it for you. Vague, brand-new or
          context-heavy alerts are better left with people for now.
        </P>

        <H2 id="benefits">Benefits of SOAR Playbooks</H2>
        <P>
          The biggest benefit of SOAR playbooks is speed. Routine alerts get
          handled in seconds instead of waiting in a queue, and mean time to
          respond (MTTR) drops with them. You also get the same response every
          time, and you can take on more alerts without hiring.
        </P>
        <P>
          Small teams notice it first. Analysts stop spending their shift on
          copy-and-paste lookups and get time back for real investigation and
          threat hunting. The night shift handles a phishing report exactly the
          way the day shift does.
        </P>

        <H2 id="build">How to Build a SOAR Playbook</H2>
        <P>
          Building a SOAR playbook usually follows seven steps: choose the use
          case, define the trigger, list data sources, map decisions, place
          approval gates, test, and deploy with an owner. Start with one
          process your analysts already follow and work through the steps
          below.
        </P>
        <Numbered
          items={[
            <>
              <Strong>Pick one use case.</Strong> Choose a high-volume alert
              with a stable response, such as phishing. Write down how analysts
              handle it today. That runbook is your starting point.
            </>,
            <>
              <Strong>Define the trigger and scope.</Strong> Which alert types
              start it? Which assets, users or clients are in scope, and which
              are not?
            </>,
            <>
              <Strong>List the data and enrichment sources.</Strong> Name every
              data element the playbook handles (IP, domain, hash, user, host)
              and the tool that enriches each one.
            </>,
            <>
              <Strong>Map the decision logic.</Strong> Write each branch with
              its threshold: what closes the alert, what escalates it, what
              triggers containment.
            </>,
            <>
              <Strong>Place approval gates.</Strong> Mark every high-impact
              step, such as isolating a server or disabling an account, and
              require a named approver.
            </>,
            <>
              <Strong>Build and test.</Strong> Build in the platform&apos;s
              editor, then replay real past alerts, including edge cases and
              malformed data, in a test environment.
            </>,
            <>
              <Strong>Deploy in stages and assign an owner.</Strong> Run in
              recommend-only mode for two to four weeks, review the results,
              then let it act.
            </>,
          ]}
        />

        <H3 id="map-your-playbook-to-the-nist-incident-response-lifecycle">
          Map Your Playbook to the NIST Incident Response Lifecycle
        </H3>
        <P>
          The phases below follow NIST Special Publication 800-61 Revision 2
          (2012). NIST&apos;s Revision 3, published in April 2025, aligns
          incident response to the Cybersecurity Framework (CSF) 2.0 functions,
          but these phases still map cleanly.
        </P>
        <DataTable
          head={["NIST phase", "What a SOAR playbook automates"]}
          rows={[
            ["Preparation", "Little: this is people, policy and tooling. Playbooks encode the plan."],
            ["Detection and analysis", "Enrichment, deduplication, correlation, severity scoring"],
            ["Containment, eradication and recovery", "Isolation, blocking, account actions, credential resets, backup checks"],
            ["Post-incident activity", "Case reports, metrics, lessons-learned tickets, detection tuning"],
          ]}
        />

        <H2 id="best-practices">SOAR Playbook Best Practices</H2>
        <P>
          Most SOAR playbook best practices come down to two things: every
          playbook has an owner, and every change is controlled. Ten playbooks
          with owners will beat fifty without them. These are the habits we see
          in teams whose playbooks still work two years later:
        </P>
        <Bullets
          items={[
            <>
              <Strong>Give every playbook an owner</Strong> who is responsible
              for its logic, integrations and retirement.
            </>,
            <>
              <Strong>Version every change</Strong> with a log of what changed,
              who approved it and why.
            </>,
            <>
              <Strong>Review quarterly</Strong> and after any tool, API or
              detection change.
            </>,
            <>
              <Strong>Fail loudly.</Strong> Treat a null or missing field as an
              error, not a pass.
            </>,
            <>
              <Strong>Prefer stable interfaces.</Strong> Integrations built on
              open standards tend to survive vendor updates better than ones
              built on a product&apos;s private API.
            </>,
            <>
              <Strong>Make actions reversible</Strong> with a tested rollback
              for every containment step.
            </>,
            <>
              <Strong>Standardize enrichment</Strong> so the same alert types
              always get the same context.
            </>,
          ]}
        />

        <H2 id="break-down">Where SOAR Playbooks Break Down</H2>
        <Bullets
          items={[
            <>
              <Strong>Branch sprawl.</Strong> Every new condition multiplies
              the paths a playbook has to handle. Combine asset type, severity,
              user role and location, and the decision tree grows faster than
              anyone can test it, so the odd combinations end up back in an
              analyst&apos;s queue.
            </>,
            <>
              <Strong>API and schema drift.</Strong> Vendors change field names
              and formats without much warning. The playbook doesn&apos;t
              crash. It reads an empty value, takes the default branch and
              reports success. Silent failures like this are the hardest to
              spot.
            </>,
            <>
              <Strong>Detection logic drift.</Strong> When detection engineers
              tune a rule, the alert it produces can start to mean something
              different. A playbook written for the old rule keeps making
              decisions on assumptions that are no longer true.
            </>,
            <>
              <Strong>Long-tail alerts.</Strong> Rare alert types never earn
              the engineering time a playbook takes, so they stay manual.
              Because nobody has a routine for them, they are often the slowest
              alerts to close.
            </>,
            <>
              <Strong>Novel threats.</Strong> Fixed logic can only recognize
              what someone anticipated. A new technique that resembles a known
              benign pattern can be routed straight to auto-close.
            </>,
            <>
              <Strong>Maintenance burden.</Strong> Each integration is a
              dependency that can break with the next vendor release. Upkeep
              grows with the size of the library and rarely appears in the
              original business case.
            </>,
          ]}
        />

        <H2 id="measure">How to Measure SOAR Playbook Performance</H2>
        <P>
          Measure SOAR playbook performance by comparing response times and
          analyst workload before and after automation. Start tracking on day
          one. If you wait, you&apos;ll have no baseline to compare against.
        </P>
        <DataTable
          head={["Metric", "What it shows"]}
          rows={[
            ["MTTR (mean time to respond)", "Time from alert to containment, with and without the playbook"],
            ["MTTC (mean time to contain)", "Time from detection until the threat can no longer spread, such as a host isolated or an account disabled"],
            ["Analyst time saved", "Minutes saved per alert type; phishing and triage are easiest to measure"],
            ["Alert reduction rate", "Share of alerts closed without analyst review"],
            ["False-positive handling", "Alerts auto-closed correctly versus incorrectly"],
            ["Escalation rate", "How often a run needs human intervention"],
            ["Playbook success rate", "Runs that finish without errors or manual overrides"],
            ["SLA adherence", "Share of alerts that meet their deadline, per client tier"],
          ]}
        />

        <H3 id="pre-launch-checklist">Pre-Launch Checklist</H3>
        <P>
          A playbook that misfires can do more damage than the threat it was
          meant to stop. Before go-live, check five things:
        </P>
        <Bullets
          items={[
            <>
              <Strong>Trigger accuracy.</Strong> It fires on the right alert
              types, and only those.
            </>,
            <>
              <Strong>Branching logic.</Strong> Each path gives the right
              result across your test cases.
            </>,
            <>
              <Strong>Integration reliability.</Strong> Every tool responds
              correctly, even under API rate limits.
            </>,
            <>
              <Strong>Rollback.</Strong> The rollback path runs cleanly when
              triggered.
            </>,
            <>
              <Strong>Audit output.</Strong> Every action produces a complete,
              correct log entry.
            </>,
          ]}
        />
        <P>
          If a{" "}
          <A href="/blog/siem-migration-guide-zero-downtime">SIEM migration</A>{" "}
          is in progress, plan the order carefully. Adding response automation
          while the detection layer changes can break flows mid-cutover in ways
          that are hard to trace.
        </P>

        <H2 id="platforms">Types of SOAR Platforms (2026)</H2>
        <P>
          SOAR platforms today fall into four broad groups. Almost all of them
          ship with pre-built playbooks and a low-code builder, so that&apos;s
          not where they differ. What matters more is where the platform sits
          in your stack, because that decides which actions are easy and which
          take extra work.
        </P>
        <DataTable
          head={[
            "Platform type",
            "How playbooks are built",
            "Pre-built content",
            "Strengths",
            "Watch out for",
          ]}
          rows={[
            ["SIEM-native SOAR", "Playbooks inside the SIEM, triggered by its alerts and automation rules", "Templates for common SOC use cases", "One console; detection and response share the same data", "Weaker on actions outside the vendor's ecosystem"],
            ["XDR-native SOAR", "No-code workflows inside the XDR console", "Endpoint, identity and email response workflows", "Fast containment on the vendor's own agents", "Cross-vendor ticketing and email actions may need extra work"],
            ["Standalone SOAR", "Visual editor plus scripting, with a large integration library", "Marketplaces of playbooks and content packs", "Works across many vendors; deep customization", "Needs engineers to maintain; a separate license"],
            ["AI SOC platforms", "Few fixed playbooks; agents choose the investigation path for each alert", "Coverage by alert type rather than fixed playbooks", "Covers long-tail alerts that never got a playbook", "Needs clear limits on autonomous actions"],
          ]}
        />
        <P>
          Before you buy, ask three questions. Does it support the exact
          actions you need on your EDR, identity, email and ticketing tools?
          Can analysts edit without code while engineers can still write code?
          Can it replay real alerts before go-live? Then add maintenance time
          to the cost, and run the bundled phishing playbook against a week of
          your own reported emails.
        </P>

        <H2 id="xdr">Can XDR Execute SOAR Playbooks?</H2>
        <P>
          Yes. Many XDR platforms now include a SOAR engine, so the same
          console can detect, investigate and run playbooks for threat
          detection, investigation and response (TDIR). Because the XDR agent
          already sits on the endpoint, a playbook can isolate a host or stop a
          process as soon as its logic calls for it.
        </P>
        <P>
          Gartner&apos;s 2024 Hype Cycle research suggested that standalone
          SOAR is losing prominence as SIEM, XDR and adjacent platforms absorb
          more of its core features. The strengths and limits of XDR-native
          playbooks are compared in the platform types table above.
        </P>

        <H2 id="ai">AI-Powered SOAR Playbooks and the Agentic SOC</H2>
        <P>
          AI-powered SOAR combines AI investigation with deterministic
          automation. The AI agent takes the messy alerts, the ones that are
          unclear or new, gathers evidence and suggests a verdict. A rule-based
          playbook then carries out the approved response, quickly and with
          every step logged.
        </P>
        <Diagram
          label="AI and playbooks: an AI agent investigates and recommends a verdict, an analyst approves actions with business impact, a deterministic playbook executes, and the audit trail records reasoning and actions."
          title="How AI and Playbooks Share the Work"
          sub="The AI finds out what happened, people approve, and the playbook acts"
        >
          <AiChain />
        </Diagram>
        <P>
          AI doesn&apos;t replace playbooks. The agent works out what happened,
          and the playbook quarantines, isolates, opens tickets and suspends
          accounts. Some platforms can also draft a playbook from a
          plain-language description for an engineer to review and test.
        </P>
        <P>
          Want to see how AI agents are set up, controlled and audited inside a
          SOC? Read our guide on{" "}
          <A href="/blog/what-is-ai-soc">
            what an AI SOC is and how it works
          </A>
          .
        </P>

        <H3 id="best-practices-for-ai-powered-ir-playbooks">
          Best Practices for AI-Powered IR Playbooks
        </H3>
        <Bullets
          items={[
            "Route AI verdicts into existing playbooks as a new trigger, rather than giving the agent its own response actions.",
            "Keep approval gates on every action with business impact, even when AI suggests it.",
            "Log the AI's reasoning and evidence with the case.",
            "Start AI on read-only work: enrichment, summaries, triage scores.",
            "Measure AI verdict accuracy against analyst decisions before widening its scope.",
          ]}
        />

        <CtaCard
          label="AI-powered SOC automation"
          side={
            <Ticks
              label="How we roll AI out"
              items={[
                ["Read-only first", "enrichment, summaries, triage scores"],
                ["Gated actions", "AI recommends; people approve"],
                ["Reasoning logged", "every verdict saved with the case"],
                ["Measured", "verdicts checked against analysts"],
              ]}
            />
          }
        >
          <CtaHead
            eyebrow="AI-powered SOC automation"
            title="Cover the Alerts No One Wrote a Playbook For"
          />
          <CtaBody>
            We add AI investigation on top of your existing playbooks, so
            long-tail alerts get a verdict and an evidence trail while every
            response still runs through your approval gates.
          </CtaBody>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button href="/services/ai-powered-soc-automation">
              Explore AI-powered SOC automation
            </Button>
          </div>
        </CtaCard>

        <H2 id="mssp">SOAR Playbooks for MSSPs: What Changes at Scale</H2>
        <P>
          MSSP playbooks have to handle multi-tenancy, contract SLAs, each
          client&apos;s own tools and per-client audit trails. An in-house SOC
          almost never deals with all of that. Get it wrong and the time you
          saved turns into a security and compliance problem. Four design
          choices make the difference.
        </P>
        <P>
          <Strong>Client-scoped execution.</Strong> Every action must stay
          inside the client it came from. Cross-client access, even by
          accident, is a security incident. Playbook logic should use each
          client&apos;s own asset list, contacts and escalation tree, not
          shared defaults.
        </P>
        <P>
          <Strong>Central library with per-client settings.</Strong> A
          separate playbook set per client falls apart quickly. Keep one
          versioned, tested core library and apply client settings at runtime,
          so a fix reaches every client at once.
        </P>
        <P>
          <Strong>SLA-aware escalation.</Strong> Playbooks should know each
          client&apos;s SLA tier. A critical alert for a Tier 1 client takes a
          different path than the same alert for a Tier 3 client.
        </P>
        <P>
          <Strong>Per-client audit trails.</Strong> Every action needs a
          client-level log for reporting, investigation and contract evidence.
          For regulated clients, the same records feed{" "}
          <A href="/blog/siem-nis2-dora-compliance">NIS2 and DORA reporting</A>
          .
        </P>
        <P>
          Response is easier to get right when your{" "}
          <A href="/blog/multi-tenant-siem-architecture-mssps">
            multi-tenant SIEM architecture
          </A>{" "}
          already isolates logging, alerting and data routing per client.
        </P>

        <CtaCard label="For MSSPs" side={<Tenants />}>
          <CtaHead
            eyebrow="For MSSPs"
            title="Share One Playbook Library Without Mixing Client Data"
          />
          <CtaBody>
            Running playbooks across many clients? We design client-scoped
            execution, per-client SLAs and per-client audit trails into the
            platform, so a fix to the core library reaches every tenant at
            once.
          </CtaBody>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button href="/services/mssp-engineering-partner">
              See how we design for client isolation
            </Button>
          </div>
        </CtaCard>

        <H2 id="custom">When Off-the-Shelf SOAR Is Not Enough</H2>
        <P>
          Off-the-shelf SOAR stops being enough when your environment or
          obligations go beyond what the product was designed for. At that
          point, a{" "}
          <A href="/services/custom-soar-development">custom SOAR layer</A>{" "}
          gives you full control over logic, connectors and evidence. The signs
          are usually these:
        </P>
        <Bullets
          items={[
            <>
              <Strong>Unsupported tools.</Strong> A proprietary EDR, in-house
              ticketing or legacy systems need connectors the platform does not
              ship.
            </>,
            <>
              <Strong>Complex logic.</Strong> Deep branching, stateful flows
              and multi-stage approvals push past what low-code builders handle
              well.
            </>,
            <>
              <Strong>Weak client isolation.</Strong> A shared engine with poor
              client separation creates risk at scale.
            </>,
            <>
              <Strong>Fixed audit formats.</Strong> Regulators or clients
              require evidence in a set format, which is far easier to produce
              when it is designed into the workflow from the start.
            </>,
          ]}
        />
        <P>
          Cost matters too. Off-the-shelf SOAR often means a second license on
          top of your SIEM, plus the ongoing work of keeping the two in sync.
        </P>

        <H2 id="whycrew">Where WhyCrew Fits</H2>
        <P>
          WhyCrew builds custom SOAR environments for MSSPs and regulated
          operators that need tighter control over logic, tenancy, and evidence
          than off-the-shelf tools usually provide. We design playbooks around
          the tools, approval paths and clients you actually have, and build
          response directly into your SIEM.
        </P>
        <Bullets
          items={[
            <>
              <Strong>Custom playbooks</Strong> for your exact tools, logic and
              approval paths
            </>,
            <>
              <Strong>Multi-tenant isolation</Strong> with client-scoped
              execution and per-client audit trails
            </>,
            <>
              <Strong>NIS2 and DORA evidence</Strong> built into every workflow
            </>,
            <>
              <Strong>No per-seat SOAR license:</Strong> you own the code and
              the platform
            </>,
          ]}
        />
        <P>
          If you need only a few standard playbooks, a SIEM-native or
          XDR-native SOAR will serve you better. Learn more about{" "}
          <A href="/services/custom-soar-development">
            custom SOAR development
          </A>{" "}
          and{" "}
          <A href="/services/ai-powered-soc-automation">
            AI-powered SOC automation
          </A>
          .
        </P>

        <CtaCard
          label="Architecture audit"
          final
          side={
            <Ticks
              label="What we check"
              warn
              items={[
                ["Branch sprawl", "paths nobody has tested"],
                ["API and schema drift", "empty fields read as success"],
                ["Detection drift", "rules that changed under the playbook"],
                ["Maintenance load", "integrations one release from breaking"],
              ]}
            />
          }
        >
          <CtaHead
            eyebrow="Architecture audit"
            title="See Where Your Response Flows Break Under Real Load"
          />
          <CtaBody>
            We review your SIEM-to-SOAR path, your playbooks and your
            integrations, then show you which flows fail without anyone
            noticing, which need approval gates and which are worth automating
            next.
          </CtaBody>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button href="/contact">Book an Architecture Audit</Button>
          </div>
        </CtaCard>

        <H2 id="faq">Frequently Asked Questions About SOAR Playbooks</H2>
        <div className="mt-6">
          <FaqAccordion faqs={FAQS} columns={1} />
        </div>
      </ArticleShell>
    </>
  );
}
