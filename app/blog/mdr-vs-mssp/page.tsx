import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArticleShell, type TocEntry } from "@/components/blog/article-shell";
import { Bullets, DataTable, H2, H3, Numbered, P, Strong } from "@/components/blog/prose";
import { Button } from "@/components/ui/button";
import { FaqAccordion, type FaqItem } from "@/components/ui/faq";
import { breadcrumbLd, faqLd } from "@/lib/jsonld";
import { breadcrumbLabel, postBySlug, postPath } from "@/lib/blog";
import { CTA_HREF, ROBOTS, SITE } from "@/lib/site";
import { ogImage, ogImageLd } from "@/lib/og";

const post = postBySlug("mdr-vs-mssp")!;
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
  { id: "quick-answer", label: "MDR vs MSSP In Brief" },
  { id: "key-differences", label: "Key Differences" },
  { id: "mssp", label: "How An MSSP Handles Threats" },
  { id: "mdr", label: "What Is MDR?" },
  { id: "overlap", label: "How They Overlap" },
  { id: "pros-cons", label: "Pros And Cons" },
  { id: "who-does-what", label: "Who Does What" },
  { id: "cost", label: "Cost" },
  { id: "in-house", label: "vs In-House SOC" },
  { id: "siem", label: "MDR vs MSSP vs SIEM" },
  { id: "socaas", label: "SOC-As-A-Service" },
  { id: "best-fit", label: "Which Is Better For You" },
  { id: "together", label: "Using Both Together" },
  { id: "real-mdr", label: "Spotting Real MDR" },
  { id: "faq", label: "FAQs" },
];

const FAQS: FaqItem[] = [
  {
    q: "Is MDR Better Than MSSP?",
    a: "MDR is better if you need someone to stop threats for you. An MSSP is better if you need tools managed and compliance handled, and your team can respond to alerts. For many businesses the best answer is both, or one provider that offers MSSP services with MDR included.",
  },
  {
    q: "Which Is Cheaper, MDR Or An MSSP?",
    a: "An MSSP is usually cheaper per device, because it relies more on automation and less on human analysts. MDR costs more but includes investigation and response. Once you add an incident response retainer to an MSSP contract, the gap often narrows.",
  },
  {
    q: "What Is The Difference Between MSP, MSSP And MDR?",
    a: "An MSP (managed service provider) runs your general IT: devices, networks, help desk. An MSSP focuses only on security tools and monitoring. MDR is a specific service that detects and responds to threats, and it can be delivered by an MSSP or a specialist provider.",
  },
  {
    q: "Is SOAR The Same As An MSSP?",
    a: "No. SOAR (security orchestration, automation and response) is software that automates security workflows. An MSSP is a service provider. MSSPs and MDR providers often use SOAR tools behind the scenes to respond faster.",
    aNode: (
      <>
        No.{" "}
        <Link
          href="/blog/what-is-soar"
          className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
        >
          SOAR (security orchestration, automation and response)
        </Link>{" "}
        is software that automates security workflows. An MSSP is a service
        provider. MSSPs and MDR providers often use SOAR tools behind the
        scenes to respond faster.
      </>
    ),
  },
  {
    q: "Do I Need An MSSP If I Have MDR?",
    a: "Not always. If your MDR provider or platform also covers firewall management, patching and compliance logging, you may not need both. If you have complex infrastructure or strict audit needs, an MSSP can still add value alongside MDR.",
  },
  {
    q: "Does Cyber Insurance Require MDR?",
    a: "Not by name, but many insurers now ask whether you have 24/7 detection and response in place when they set coverage and premiums. MDR is one of the simplest ways to show you do. Check your insurer's questionnaire for its exact requirements.",
  },
  {
    q: "What Is The Difference Between MDR, EDR And MSSP?",
    a: "EDR (endpoint detection and response) is a tool that records and flags activity on devices. MDR is a service where analysts use tools like EDR to hunt for and stop threats. An MSSP is a provider that manages a wider set of security tools and sends you alerts.",
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
    inLanguage: "en-US",
    isPartOf: { "@id": `${SITE.url}/#website` },
    author: { "@id": `${SITE.url}/#organization` },
    publisher: { "@id": `${SITE.url}/#organization` },
    about: [
      { "@type": "Thing", name: "Managed detection and response" },
      { "@type": "Thing", name: "Managed security service provider" },
    ],
    image: ogImageLd(PATH),
    articleSection: post.cluster,
    keywords: post.topics.join(", "),
  };
}

/* ------------------------------------------------- page-local design blocks */

const EYEBROW =
  "font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-accent";

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

/** Small MDR / MSSP pill set before a term. */
function Tag({ kind }: { kind: "MDR" | "MSSP" }) {
  return (
    <span
      className={`mr-2 inline-block rounded-[4px] px-1.5 py-1 align-[2px] font-mono text-[10px] font-semibold leading-none tracking-[0.1em] ${
        kind === "MDR" ? "bg-accent/10 text-accent" : "bg-warn/10 text-warn"
      }`}
    >
      {kind}
    </span>
  );
}

/** Quick-answer box at the top of the article. */
function Answer() {
  const defs: { kind: "MDR" | "MSSP"; term: string; def: string }[] = [
    {
      kind: "MSSP",
      term: "Managed Security Service Provider",
      def: "Runs and monitors your security tools, then alerts your team to fix the problem.",
    },
    {
      kind: "MDR",
      term: "Managed Detection And Response",
      def: "Analysts investigate the threat and contain it for you, such as isolating an infected laptop.",
    },
  ];
  const meters: { k: string; v: string; unit?: string }[] = [
    { k: "MDR on a threat", v: "Contains it" },
    { k: "MSSP on a threat", v: "Alerts you" },
    { k: "Typical MDR rate", v: "$20–$30", unit: "/user/mo" },
    { k: "24/7 seat in-house", v: "4+", unit: "analysts" },
  ];
  return (
    <div
      id="quick-answer"
      className="scroll-mt-28 rounded-lg border border-line bg-surface p-5 sm:p-[26px]"
    >
      <p className={EYEBROW}>Quick answer</p>
      <p className="mt-3 text-[16.5px] leading-[1.65] text-body sm:text-[17px]">
        MDR vs MSSP comes down to one thing: who responds when a threat appears.
      </p>
      <dl className="mt-3 grid gap-3 sm:grid-cols-2">
        {defs.map((d) => (
          <div
            key={d.kind}
            className="min-w-0 rounded-md border border-line/70 bg-surface-2/60 px-4 py-3.5"
          >
            <dt className="text-[15px] font-semibold text-bright">
              <Tag kind={d.kind} />
              {d.term}
            </dt>
            <dd className="mt-1.5 text-[15px] leading-[1.55] text-body">{d.def}</dd>
          </div>
        ))}
      </dl>
      <div
        aria-label="MDR and MSSP at a glance"
        className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line/70 bg-line/70 sm:grid-cols-4"
      >
        {meters.map((m) => (
          <div key={m.k} className="flex flex-col gap-1.5 bg-surface-2 p-3.5">
            <span className="font-mono text-[10.5px] uppercase leading-tight tracking-[0.08em] text-faint">
              {m.k}
            </span>
            <span className="text-[1.15rem] font-bold tabular-nums tracking-tight text-bright">
              {m.v}
              {m.unit && (
                <small className="ml-0.5 text-[12px] font-medium text-faint">
                  {m.unit}
                </small>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** "Key points" list under the quick answer. */
function Takeaways() {
  return (
    <div className="my-8 border-l-2 border-accent py-1 pl-[22px]">
      <p className={EYEBROW}>Key points: MSSP vs MDR</p>
      <Bullets
        items={[
          <>
            <Strong>MSSP:</Strong> broad coverage of firewalls, patching, logs
            and compliance.
          </>,
          <>
            <Strong>MDR:</Strong> deep focus on threat hunting and active
            response.
          </>,
          <>
            <Strong>Overlap:</Strong> many MSSPs now offer MDR as one of their
            services.
          </>,
        ]}
      />
    </div>
  );
}

/** Four attribute cards under the comparison table. */
function AttrGrid() {
  const cards: { label: string; mdr: string; mssp: string }[] = [
    {
      label: "Primary Focus",
      mdr: "Threat detection, threat hunting and hands-on incident response.",
      mssp: "Prevention, infrastructure management, firewalls and compliance.",
    },
    {
      label: "Response Capability",
      mdr: "Takes direct action, such as isolating hosts or ending malicious processes.",
      mssp: "Validates alerts and escalates them to your internal team to fix.",
    },
    {
      label: "Data Sources & Technology",
      mdr: "Endpoint, identity and cloud telemetry, analyzed with behavioral analytics and AI-assisted triage.",
      mssp: "Firewall logs, SIEM data and rule-based alerts.",
    },
    {
      label: "Best Suited For",
      mdr: "Organizations without a 24/7 security operations center (SOC) or incident response team.",
      mssp: "Organizations that want tool upkeep and compliance handled, and have staff who can act on alerts.",
    },
  ];
  return (
    <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
      {cards.map((c) => (
        <div
          key={c.label}
          className="flex min-w-0 flex-col gap-2.5 rounded-lg border border-line/70 bg-surface/50 p-4"
        >
          <p className={EYEBROW}>{c.label}</p>
          <p className="text-[14.5px] leading-[1.55] text-body">
            <Tag kind="MDR" />
            {c.mdr}
          </p>
          <p className="text-[14.5px] leading-[1.55] text-body">
            <Tag kind="MSSP" />
            {c.mssp}
          </p>
        </div>
      ))}
    </div>
  );
}

type ListCol = {
  label: string;
  tone: "accent" | "warn";
  mark: string;
  items: ReactNode[];
};

/** Two framed lists side by side: pros and cons, or hidden extras. */
function TwoLists({ cols }: { cols: ListCol[] }) {
  return (
    <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
      {cols.map((c) => {
        const tone = c.tone === "accent" ? "text-accent" : "text-warn";
        return (
          <div
            key={c.label}
            className="min-w-0 rounded-lg border border-line/70 bg-surface/50 px-4 pt-4 pb-1.5"
          >
            <p
              className={`font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] ${tone}`}
            >
              {c.label}
            </p>
            <ul className="mt-2.5">
              {c.items.map((it, i) => (
                <li
                  key={i}
                  className="flex gap-2.5 border-t border-line-soft py-1.5 text-[14.5px] leading-relaxed text-body first:border-0"
                >
                  <span aria-hidden className={`font-mono font-semibold ${tone}`}>
                    {c.mark}
                  </span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/** Pros list (✓) beside a cons list (+). */
function ProsCons({ pros, cons }: { pros: ReactNode[]; cons: ReactNode[] }) {
  return (
    <TwoLists
      cols={[
        { label: "Pros", tone: "accent", mark: "✓", items: pros },
        { label: "Cons", tone: "warn", mark: "+", items: cons },
      ]}
    />
  );
}

/** Responsibility matrix: cells in `p` are tasks the provider takes on. */
function Matrix() {
  const head = ["Task", "You (No Provider)", "With An MSSP", "With MDR"];
  const rows: [string, string, string, string, number[]][] = [
    ["Firewall and device management", "You", "MSSP", "You (or your MSSP)", [2]],
    ["Patching and vulnerability scans", "You", "MSSP", "You (or your MSSP)", [2]],
    ["24/7 monitoring", "You", "MSSP", "MDR provider", [2, 3]],
    ["Alert triage and validation", "You", "MSSP (basic)", "MDR provider (deep)", [2, 3]],
    ["Threat hunting", "You", "Usually no one", "MDR provider", [3]],
    ["Containment (isolate, disable, block)", "You", "You", "MDR provider", [3]],
    ["Remediation and recovery", "You", "You (or paid IR retainer)", "Shared, provider guides", []],
    ["Compliance reports and log retention", "You", "MSSP", "Partial, often you", [2]],
  ];
  return (
    <figure className="mt-6">
      <div className="overflow-x-auto rounded-lg border border-line/70 bg-surface/50">
        <table className="w-full min-w-[560px] border-collapse text-left text-[14px]">
          <thead>
            <tr className="border-b border-line/70 bg-surface-2/50">
              {head.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-5 py-3.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-faint"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const hi = r[4];
              return (
                <tr
                  key={r[0]}
                  className="border-b border-line-soft/70 transition-colors last:border-0 hover:bg-brand/5"
                >
                  {r.slice(0, 4).map((cell, ci) => (
                    <td
                      key={ci}
                      className={`px-5 py-3.5 align-top leading-relaxed ${
                        ci === 0
                          ? "font-medium text-bright"
                          : hi.includes(ci)
                            ? "bg-accent/10 text-accent"
                            : "text-muted"
                      }`}
                    >
                      {cell as string}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

/** Platform, relationship and outcome layers in the SIEM section. */
function Layers({ rows }: { rows: { k: string; body: ReactNode }[] }) {
  return (
    <ol className="mt-5 overflow-hidden rounded-lg border border-line/70">
      {rows.map((r, i) => {
        const last = i === rows.length - 1;
        return (
          <li
            key={r.k}
            className={`grid gap-1 border-b border-line/70 px-4 py-4 last:border-0 sm:grid-cols-[120px_minmax(0,1fr)] sm:items-baseline sm:gap-4 ${
              last ? "bg-accent/10" : "bg-surface/50"
            }`}
          >
            <span
              className={`font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] ${
                last ? "text-accent" : "text-faint"
              }`}
            >
              {r.k}
            </span>
            <span className="text-[15px] leading-[1.7] text-body">{r.body}</span>
          </li>
        );
      })}
    </ol>
  );
}

/** Business-type cards with the recommended model on top. */
function FitCards() {
  const cards: {
    pick: string;
    tone: "mdr" | "mssp" | "both";
    title: string;
    body: string;
  }[] = [
    {
      pick: "MDR",
      tone: "mdr",
      title: "Small Business With No Security Team",
      body: "For most small businesses, MDR is the better fit. If no one can respond to a breach outside office hours, a stream of MSSP alerts won't protect you. MDR puts trained analysts on call without new hires. Look for endpoint-based pricing that fits a small fleet.",
    },
    {
      pick: "MSSP first, then MDR",
      tone: "mssp",
      title: "Growing Mid-Market Company",
      body: "An MSSP can be a sensible first step while you build a security function, especially if IT runs security alongside other work. As you grow, add MDR before your risk outpaces your team's ability to respond.",
    },
    {
      pick: "Both",
      tone: "both",
      title: "Regulated Industries (Healthcare, Finance, Legal)",
      body: "Regulated firms usually need both. Compliance requirements call for the log retention and audit reports an MSSP provides. Breach rules also demand fast, documented incident response, which MDR delivers. Check exactly what evidence your provider can produce for your framework.",
    },
    {
      pick: "MSSP + MDR as overflow",
      tone: "both",
      title: "Enterprises With An In-House SOC",
      body: "If you already run a SOC, an MSSP can take routine tool management and compliance logging off your analysts' plates. MDR then works as overflow or after-hours coverage, so your team can focus on the hardest cases.",
    },
  ];
  const pill = {
    mdr: "bg-accent/10 text-accent",
    mssp: "bg-warn/10 text-warn",
    both: "border border-line bg-surface-2 text-bright",
  };
  return (
    <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
      {cards.map((c) => (
        <div
          key={c.title}
          className="min-w-0 rounded-lg border border-line/70 bg-surface/50 p-4"
        >
          <p
            className={`mb-3 inline-block rounded-[4px] px-2 py-1.5 font-mono text-[10.5px] font-semibold uppercase leading-none tracking-[0.12em] ${pill[c.tone]}`}
          >
            {c.pick}
          </p>
          <h3 className="text-[16px] font-semibold leading-snug text-bright">
            {c.title}
          </h3>
          <p className="mt-2 text-[14.5px] leading-[1.6] text-body">{c.body}</p>
        </div>
      ))}
    </div>
  );
}

/** Shared frame for the inline CTA cards: copy left, proof panel right. */
function CtaCard({
  label,
  eyebrow,
  title,
  body,
  side,
  children,
}: {
  label: string;
  eyebrow: string;
  title: string;
  body: string;
  side: ReactNode;
  children: ReactNode;
}) {
  return (
    <aside
      aria-label={label}
      className="relative mt-10 grid items-center gap-6 rounded-lg border border-accent/30 bg-gradient-to-br from-accent/8 via-surface/60 to-surface/60 p-6 sm:p-7 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]"
    >
      <span aria-hidden className="absolute -top-px left-7 h-0.5 w-14 bg-accent" />
      <div className="min-w-0">
        <p className={EYEBROW}>{eyebrow}</p>
        <h3 className="mt-3 text-[1.4rem] font-semibold leading-tight tracking-tight text-bright">
          {title}
        </h3>
        <p className="mt-3 text-[14.5px] leading-relaxed text-body">{body}</p>
        <div className="mt-5 flex flex-wrap gap-2.5">{children}</div>
      </div>
      {side}
    </aside>
  );
}

function LedgerLine({
  k,
  v,
  tone,
}: {
  k: string;
  v: string;
  tone?: "up" | "flat";
}) {
  return (
    <p className="flex items-baseline gap-2 py-1 text-body">
      <span className="whitespace-nowrap">{k}</span>
      <i
        aria-hidden
        className="min-w-3 flex-1 -translate-y-[3px] border-b border-dotted border-line"
      />
      <span
        className={`whitespace-nowrap ${
          tone === "up"
            ? "text-warn"
            : tone === "flat"
              ? "text-accent"
              : "text-bright"
        }`}
      >
        {v}
        {tone === "up" && <span aria-hidden> ↑</span>}
      </span>
    </p>
  );
}

function Ledger() {
  return (
    <div
      aria-label="Licensed platform compared with an owned platform"
      className="min-w-0 rounded-md border border-line/70 bg-void p-4 font-mono text-[12.5px] leading-snug"
    >
      <p className="pb-1.5 text-[10.5px] uppercase tracking-[0.14em] text-faint">
        Rented SIEM and SOC platform
      </p>
      <LedgerLine k="Year 1" v="license + per-GB" tone="up" />
      <LedgerLine k="Year 2" v="+ client log growth" tone="up" />
      <LedgerLine k="Year 3" v="+ renewal increase" tone="up" />
      <p className="mt-2 border-t border-dashed border-line pt-3.5 pb-1.5 text-[10.5px] uppercase tracking-[0.14em] text-accent">
        Owned platform (WhyCrew)
      </p>
      <LedgerLine k="Build" v="one-time, fixed price" />
      <LedgerLine k="Per-GB license" v="$0" tone="flat" />
      <LedgerLine k="Source code" v="yours" tone="flat" />
    </div>
  );
}

function MarginChart() {
  return (
    <div
      aria-label="Platform cost per tenant as you add clients"
      className="min-w-0 rounded-md border border-line/70 bg-void px-3.5 pt-3.5 pb-2.5"
    >
      <svg
        viewBox="0 0 240 130"
        role="img"
        aria-label="Licensed platform cost rises with each tenant; owned platform cost flattens"
        className="block h-auto w-full"
      >
        <line x1="20" y1="110" x2="232" y2="110" className="stroke-line" />
        <line x1="20" y1="110" x2="20" y2="12" className="stroke-line" />
        <polyline
          points="20,100 70,84 120,64 170,42 220,18"
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-warn"
        />
        <polyline
          points="20,70 70,74 120,76 170,77 220,78"
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-accent"
        />
        <circle cx="220" cy="18" r="3.5" className="fill-warn" />
        <circle cx="220" cy="78" r="3.5" className="fill-accent" />
        <text
          x="126"
          y="126"
          textAnchor="middle"
          className="fill-faint font-mono text-[9px]"
        >
          tenants →
        </text>
      </svg>
      <p className="mt-1.5 flex flex-wrap gap-4 font-mono text-[11.5px] text-faint">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="inline-block h-0.5 w-3.5 bg-warn" />
          Licensed, per GB
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="inline-block h-0.5 w-3.5 bg-accent" />
          Owned platform
        </span>
      </p>
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
        // One item, so the shell adds no "·" separators: the design spaces
        // its byline items with a gap only.
        byline={[
          <span key="b" className="flex flex-wrap gap-x-4 gap-y-2">
            <span>
              By <span className="font-semibold text-body">WhyCrew Engineers</span>
            </span>
            <time dateTime={post.datePublished}>Published October 26, 2026</time>
            <span>{post.readTime}</span>
          </span>,
        ]}
      >
        <Answer />
        <Takeaways />

        <H2 id="key-differences">Key Differences Between MDR And MSSP</H2>
        <P>
          The main difference between MDR and an MSSP is who acts during an
          attack. An MSSP manages and monitors your security tools, then
          escalates alerts to your team to fix. An MDR provider investigates the
          threat and contains it for you. They also differ in focus, the data
          they watch and the businesses they suit, as the table below shows.
        </P>
        <H3>MDR vs MSSP Comparison Table</H3>
        <DataTable
          head={["Feature", "MDR", "MSSP"]}
          rows={[
            ["What it is", "A detection and response service", "A provider of managed security services"],
            ["What happens when a threat hits", "Analysts investigate and contain it", "You get an alert or ticket"],
            ["Internal staff required", "Low; the provider does the heavy lifting", "High; your team investigates and fixes"],
            ["Approach", "Proactive and reactive", "Mostly preventive and reactive"],
            ["Threat hunting", "Standard", "Rare or an add-on"],
            ["Compliance reporting", "Some, focused on incidents", "Strong, audit-ready"],
            ["Typical pricing", "Per endpoint or user", "Per device, data volume or bundle"],
            ["Cost level", "Higher", "Lower"],
          ]}
        />
        <AttrGrid />

        <H2 id="mssp">How Does An MSSP Handle Threats?</H2>
        <P>
          An MSSP (managed security service provider) is a third-party company
          that runs and monitors your security tools for a monthly fee, often
          around the clock. Its main job is to keep your defenses working and
          flag suspicious activity. It usually does not step in to stop an
          attack in progress.
        </P>
        <P>
          Beyond the basics of{" "}
          <A href="/blog/what-is-an-mssp">what an MSSP is</A>, what matters for
          this comparison is how it handles a threat. It manages your firewalls,
          patching, vulnerability scans, SIEM monitoring and compliance
          reporting. When something looks wrong, it validates the alert and
          passes it to your team by ticket, email or portal. Investigation and
          containment usually stay with you, which is the gap managed detection
          and response was built to close.
        </P>

        <H2 id="mdr">What Is MDR?</H2>
        <P>
          MDR (managed detection and response) is a security service where an
          outside team of analysts watches your environment 24/7, investigates
          suspicious activity and takes action to contain real threats. Its main
          job is to stop attacks, not just report them.
        </P>
        <P>
          MDR grew because alerts alone weren&apos;t enough. According to
          IBM&apos;s Cost of a Data Breach Report 2024, breaches took an average
          of 258 days to identify and contain. MDR exists to shrink that window
          from months to minutes or hours.
        </P>
        <H3>What MDR Includes</H3>
        <Bullets
          items={[
            <>
              <Strong>24/7 monitoring:</Strong> analysts watch telemetry from
              endpoints, identity, cloud workloads and the network, usually
              through EDR or XDR tools.
            </>,
            <>
              <Strong>Threat hunting:</Strong> people actively search for
              attackers who haven&apos;t triggered an alert yet, using behavioral
              analysis and frameworks like MITRE ATT&amp;CK rather than known
              signatures.
            </>,
            <>
              <Strong>Investigation:</Strong> each alert is checked, so your team
              sees confirmed incidents instead of a flood of false positives.
            </>,
            <>
              <Strong>Containment:</Strong> isolating an infected device,
              disabling a hijacked account or blocking a malicious connection.
            </>,
            <>
              <Strong>Remediation guidance:</Strong> steps to clean up, recover
              and prevent the same attack again.
            </>,
          ]}
        />
        <H3>Full Response vs Guided Response</H3>
        <P>
          Not every MDR service acts the same way. <Strong>Full response</Strong>{" "}
          means the provider takes containment actions itself, within limits you
          agree in advance. <Strong>Guided response</Strong> means it
          investigates and tells your team exactly what to do, but your team
          clicks the button. Always ask which one you&apos;re buying, because
          many providers use the MDR label for both.
        </P>

        <H2 id="overlap">How Do MDR And MSSP Overlap?</H2>
        <P>
          MSSP and MDR are not opposites. Both act as outside security partners
          for teams that can&apos;t staff security around the clock. They share
          four things:
        </P>
        <Bullets
          items={[
            <>
              <Strong>24/7 monitoring</Strong> of networks, endpoints or logs.
            </>,
            <>
              <Strong>Alert generation,</Strong> filtering noise into
              notifications you can use.
            </>,
            <>
              <Strong>Outsourced security operations</Strong> for businesses that
              can&apos;t build an in-house SOC.
            </>,
            <>
              <Strong>Market convergence:</Strong> many MSSPs now sell MDR, and
              some MDR providers take on wider management tasks.
            </>,
          ]}
        />
        <P>
          That last point matters most. MDR describes <Strong>what</Strong> a
          service does, while MSSP describes <Strong>who</Strong> delivers it.
          So the real question is not &quot;MDR or MSSP?&quot; but &quot;does
          my provider actually respond?&quot;
        </P>

        <CtaCard
          label="For MSSPs: rent versus own"
          eyebrow="Running an MSSP?"
          title="Add MDR Without Renting Your Platform."
          body="Many MSSPs now sell MDR, but running it on a licensed, per-GB SIEM squeezes your margin as client logs grow. WhyCrew builds the SIEM and SOC platform you own: one fixed-price build, then infrastructure cost instead of license fees."
          side={<Ledger />}
        >
          <Button href={CTA_HREF}>Get a fixed-price platform estimate</Button>
        </CtaCard>

        <H2 id="pros-cons">What Are The Pros And Cons Of MDR And MSSP?</H2>
        <P>
          MDR wins on speed and depth of response; an MSSP wins on breadth, cost
          and compliance. Here are the trade-offs side by side.
        </P>
        <H3>MDR Pros And Cons</H3>
        <ProsCons
          pros={[
            <>
              <Strong>Active response:</Strong> analysts contain threats instead
              of just reporting them.
            </>,
            <>
              <Strong>Human-led 24/7 coverage:</Strong> threat hunters work
              alongside EDR or XDR tools around the clock.
            </>,
            <>
              <Strong>Fills the skills gap:</Strong> you get experienced
              specialists without building a SOC.
            </>,
            <>
              <Strong>Faster containment:</Strong> less dwell time means less
              lateral movement and damage.
            </>,
          ]}
          cons={[
            <>
              <Strong>Higher cost:</Strong> continuous human analysis is priced
              in.
            </>,
            <>
              <Strong>Narrow scope:</Strong> it rarely manages firewalls,
              patching or general device upkeep.
            </>,
            <>
              <Strong>Lighter compliance support:</Strong> it&apos;s not built
              for full audit documentation on its own.
            </>,
            <>
              <Strong>Tool requirements:</Strong> you may need the
              provider&apos;s agents or platform for it to work well.
            </>,
          ]}
        />
        <H3>MSSP Pros And Cons</H3>
        <ProsCons
          pros={[
            <>
              <Strong>Broad coverage:</Strong> firewalls, VPNs, patching, log
              collection and vulnerability scanning in one contract.
            </>,
            <>
              <Strong>Lower cost:</Strong> more automation and less hands-on
              analysis keep prices down.
            </>,
            <>
              <Strong>Strong compliance support:</Strong> audit reports and log
              retention for HIPAA, PCI-DSS, SOC 2 and GDPR.
            </>,
            <>
              <Strong>Predictable operations:</Strong> steady upkeep of the
              controls that prevent attacks.
            </>,
          ]}
          cons={[
            <>
              <Strong>Reactive alerting:</Strong> you&apos;re told something is
              wrong, but the fixing is yours.
            </>,
            <>
              <Strong>Alert fatigue:</Strong> raw or lightly triaged alerts can
              swamp a small team.
            </>,
            <>
              <Strong>Limited response:</Strong> containment and host isolation
              are rarely in a standard contract.
            </>,
            <>
              <Strong>Fragmented handoffs:</Strong> a serious breach often means
              buying a separate incident response retainer.
            </>,
          ]}
        />

        <H2 id="who-does-what">Who Does What? A Shared Responsibility Matrix</H2>
        <P>
          Most buyers find out who owns each task only during their first
          incident. This matrix shows the usual split, so you can see which jobs
          stay with your team under each model.
        </P>
        <Matrix />
        <p className="mt-2.5 font-mono text-[12px] leading-relaxed text-faint">
          Highlighted cells are tasks the provider takes off your team.
        </p>
        <P>
          Exact splits vary by contract, so ask any provider to fill in this
          table before you sign.
        </P>

        <H2 id="cost">How Much Do MDR And MSSP Cost?</H2>
        <P>
          MDR usually costs more than an MSSP for the same number of devices,
          because you&apos;re paying for people who investigate and respond. But
          the MSSP figure rarely includes incident response, so the gap is often
          smaller than it looks.
        </P>
        <H3>How MSSPs Price</H3>
        <P>
          <A href="/blog/mssp-pricing">MSSP pricing</A> usually runs per device,
          by data volume or as tiered bundles, and incident response is often
          sold separately on top.
        </P>
        <H3>How MDR Is Priced</H3>
        <P>
          MDR is usually priced per endpoint or per user each month, with the
          level of response (guided or full) and threat hunting setting the
          tier. One industry estimate from Heimdal put typical MDR pricing at{" "}
          <Strong>$20–$30 per user or device per month</Strong> in 2023. Treat
          that as a starting point, not a quote.
        </P>
        <H3>Worked Example: A 500-Employee Company</H3>
        <P>
          Here&apos;s what that range means for a company with about 500
          protected users or devices:
        </P>
        <DataTable
          head={["MDR cost", "Low estimate (USD)", "High estimate (USD)"]}
          rows={[
            ["Per user, per month", "$20", "$30"],
            ["Monthly total (500 users)", "$10,000", "$15,000"],
            [
              <Strong key="y">Yearly total</Strong>,
              <Strong key="l">$120,000</Strong>,
              <Strong key="h">$180,000</Strong>,
            ],
          ]}
        />
        <P>
          Volume discounts, multi-year terms and the tools you already own can
          move these numbers a lot. When you compare MDR services pricing, ask
          each provider to quote the same 500-seat scope with the same response
          level, so you&apos;re comparing like for like.
        </P>
        <H3>The Hidden Costs Of Each</H3>
        <TwoLists
          cols={[
            {
              label: "MSSP extras",
              tone: "warn",
              mark: "+",
              items: [
                "Incident response retainers",
                "Overage on log ingestion",
                "Staff hours spent chasing escalated alerts",
              ],
            },
            {
              label: "MDR extras",
              tone: "warn",
              mark: "+",
              items: [
                "Onboarding fees",
                "Replacing tools to fit the provider's platform",
                "Add-ons for cloud or identity coverage",
              ],
            },
          ]}
        />

        <H2 id="in-house">MDR vs MSSP vs In-House SOC: The Real Cost</H2>
        <P>
          Building your own security operations center gives you the most
          control, but round-the-clock coverage of even one seat takes more than
          four full-time analysts once shifts, leave and training are counted.
        </P>
        <P>
          Hiring is the hard part. The ISC2 2025 Cybersecurity Workforce Study
          found that 33% of organizations lack the resources to staff their
          security teams properly.
        </P>
        <DataTable
          head={["Option", "Who does the work", "Upfront effort", "Best for"]}
          rows={[
            ["In-house SOC", "Your hired analysts", "High: hiring, tools, shifts", "Large enterprises with budget and talent"],
            ["MSSP", "Provider runs tools; you respond", "Low", "Teams that can act on alerts"],
            ["MDR", "Provider detects and responds", "Low to medium", "Teams without 24/7 analysts"],
            ["MSSP + MDR", "Split by task", "Medium", "Teams needing breadth and fast response"],
          ]}
        />
        <P>
          For most small and mid-sized businesses, MDR or a hybrid model costs
          far less than staffing a SOC.
        </P>

        <H2 id="siem">MDR vs MSSP vs SIEM: How The Three Fit Together</H2>
        <P>
          A SIEM, an MSSP and MDR are three different layers of security: a{" "}
          <Strong>technology platform</Strong>, an{" "}
          <Strong>outsourcing relationship</Strong> and a{" "}
          <Strong>managed service outcome</Strong>. They are often used
          together, not instead of each other.
        </P>
        <Layers
          rows={[
            {
              k: "Platform",
              body: (
                <>
                  <Strong>
                    <A href="/blog/what-is-siem">
                      SIEM (security information and event management)
                    </A>
                    :
                  </Strong>{" "}
                  software that collects and correlates logs from servers,
                  firewalls, endpoints and cloud apps, and keeps them for
                  compliance.
                </>
              ),
            },
            {
              k: "Relationship",
              body: (
                <>
                  <Strong>MSSP:</Strong> the outside partner that often runs that
                  SIEM for you, manages your security tools and sends you alerts.
                </>
              ),
            },
            {
              k: "Outcome",
              body: (
                <>
                  <Strong>MDR:</Strong> the service that uses that data, plus its
                  own tools, to hunt for attackers and stop them.
                </>
              ),
            },
          ]}
        />
        <DataTable
          head={["Feature", "SIEM", "MSSP", "MDR"]}
          rows={[
            ["What it is", "Technology platform", "Outsourcing relationship", "Managed service outcome"],
            ["Who operates it", "Your team or a provider", "The MSSP's staff", "The MDR provider's SOC analysts"],
            ["Main focus", "Log collection, correlation, compliance", "Infrastructure, firewalls, alerts", "Threat hunting, triage, containment"],
            ["Incident response", "None; it raises alerts", "Usually limited to notifying you", "Investigates and contains"],
            ["Best for", "Teams with an in-house SOC", "Teams that need tools run for them", "Teams without a 24/7 security staff"],
          ]}
        />
        <H3>Does MDR Replace A SIEM?</H3>
        <P>
          No, MDR does not generally replace a SIEM, because they do different
          jobs. MDR is built to detect and stop active threats. A SIEM is built
          for broad log collection, long-term retention and compliance evidence.
        </P>
        <P>
          If your only goal is stopping attacks, MDR can reduce how much you
          rely on your SIEM day to day. But if you need audit logs for HIPAA,
          PCI-DSS or SOC 2, you&apos;ll still want a SIEM or a provider that
          keeps those logs for you. Many companies run both: the SIEM for
          visibility and records, MDR for fast response.
        </P>
        <H3>Managed SIEM vs MDR</H3>
        <P>
          A <Strong>managed SIEM</Strong> is a SIEM that a provider, often an
          MSSP, runs and tunes for you. It improves detection from your logs,
          but your team usually still investigates and responds.{" "}
          <Strong>MDR</Strong> takes on that investigation and response. If you
          already{" "}
          <A href="/blog/siem-cost-licensing-vs-custom-built">
            pay for a managed SIEM
          </A>
          , adding MDR with that SIEM&apos;s data feeding into it is a common
          upgrade path.
        </P>

        <H2 id="socaas">How Does SOC-As-A-Service Compare To MDR And MSSP?</H2>
        <P>
          SOC-as-a-Service (SOCaaS) rents you a full outsourced security
          operations center, usually with the provider&apos;s platform, analysts
          and processes. It sits between an MSSP and MDR: broader than MDR, more
          hands-on than a classic MSSP.
        </P>
        <DataTable
          head={["Model", "Scope", "Response", "Team you need"]}
          rows={[
            ["MSSP", "Wide: tools, devices, compliance", "Alerts and escalation", "Staff to investigate and fix"],
            ["MDR", "Focused: detection and response", "Investigates and contains", "Small team for decisions"],
            ["SOC-as-a-Service", "Full SOC workflow", "Investigates and recommends, sometimes acts", "Small team; check the contract"],
          ]}
        />
        <P>
          The labels blur in practice. When you compare MSSP vs SOC providers,
          ask the same question every time: who takes action when a real threat
          is confirmed?
        </P>

        <H2 id="best-fit">Which Is Better For Your Business: MDR Or MSSP?</H2>
        <P>
          It depends on who can act on an alert. For most small businesses with
          no security staff, MDR is the better fit because it investigates and
          stops threats for you. Companies that already have people to respond,
          or that mainly need compliance support, often get more value from an
          MSSP. Here&apos;s how it breaks down by business type.
        </P>
        <FitCards />

        <H2 id="together">Can You Use MDR And MSSP Together?</H2>
        <P>
          Yes, and many organizations do. The most common setup is a layered
          model:
        </P>
        <Numbered
          items={[
            <>
              <Strong>The MSSP handles foundational hygiene:</Strong> managing
              firewalls, patching systems, collecting logs and meeting compliance
              needs.
            </>,
            <>
              <Strong>MDR acts as the rapid-response unit:</Strong> hunting for
              attackers, investigating anomalies and cutting off active breaches.
            </>,
          ]}
        />
        <P>
          To make this work, write down who owns each task (use the matrix
          above), connect both providers to the same data, and agree who calls
          whom during an incident. A co-managed SIEM, where you and the providers
          share access to one log platform, keeps everyone working from the same
          evidence. Some providers offer both services under one contract, which
          removes the handoff entirely.
        </P>

        <H2 id="real-mdr">How Can You Tell If A Provider Offers Real MDR?</H2>
        <P>
          Plenty of providers now use the MDR label, but not all of them
          actually respond to threats. Some still just forward alerts, the way a
          traditional MSSP does. The quickest way to tell the difference is to
          ask what happens after detection.
        </P>
        <P>
          A real MDR provider can name the actions its analysts take without
          calling you first, such as isolating a device or disabling an account.
          If every step needs your approval, or incident response is sold only
          as a separate retainer, the response is still in your hands.
        </P>
        <P>Before you sign, ask these five questions:</P>
        <Numbered
          items={[
            "Which actions can your analysts take without calling us first?",
            "What are your guaranteed times to detect, respond and contain (MTTD and MTTR)?",
            "How often do your analysts hunt for threats, and what did they find last quarter?",
            "Which data sources do you monitor: endpoint, identity, cloud or network?",
            "Who owns our logs and incident records if we leave?",
          ]}
        />

        <CtaCard
          label="For MSSPs"
          eyebrow="For MSSPs"
          title="Offer Real Response On A Platform You Own."
          body="Adding MDR means more telemetry from every client, and on a per-GB license each new tenant raises your bill. WhyCrew builds multi-tenant SIEM, SOAR and SOC platforms for MSSPs, then hands over the code and infrastructure."
          side={<MarginChart />}
        >
          <Button href={CTA_HREF}>Talk to an engineer</Button>
        </CtaCard>

        <H2 id="faq">FAQs</H2>
        <div className="mt-6">
          <FaqAccordion faqs={FAQS} columns={1} />
        </div>
      </ArticleShell>
    </>
  );
}
