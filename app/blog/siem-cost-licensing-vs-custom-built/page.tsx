import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArticleShell, type TocEntry } from "@/components/blog/article-shell";
import {
  Bullets,
  DataTable,
  H2,
  H3,
  Lead,
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
import { SiemCostCalculator } from "./siem-cost-calculator";

const post = postBySlug("siem-cost-licensing-vs-custom-built")!;
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
  { id: "quick-answer", label: "How Much Does a SIEM Cost?" },
  { id: "calculator", label: "SIEM Cost Calculator" },
  { id: "by-size", label: "Cost by Organization Size" },
  { id: "pricing-models", label: "Pricing Models Explained" },
  { id: "vendor-prices", label: "2026 Vendor Prices" },
  { id: "cost-drivers", label: "What Drives SIEM Cost" },
  { id: "tco", label: "Total Cost of Ownership (TCO)" },
  { id: "managed-siem-pricing", label: "Managed SIEM Pricing" },
  { id: "budgeting", label: "Budgeting Managed SIEM" },
  { id: "compare-vendors", label: "Comparing Managed SIEM Vendors" },
  { id: "cost-benefit", label: "In-House vs. Managed vs. Custom" },
  { id: "reduce-cost", label: "Reducing SIEM Cost" },
  { id: "low-cost", label: "Low-Cost SIEM Options" },
  { id: "mssp", label: "For MSSPs" },
  { id: "glossary", label: "Pricing Terms" },
  { id: "faq", label: "FAQ" },
];

const FAQS: Faq[] = [
  {
    q: "How Much Does a SIEM Cost?",
    a: "A SIEM costs about $30,000 to $200,000 a year for a small organization, $150,000 to $800,000 a year for a mid-market team and $1 million to over $5 million a year for large enterprises, including staff. The license alone is usually the smaller share. Your cost depends mainly on daily log volume, retention and whether you staff the SIEM yourself.",
  },
  {
    q: "How Much Does Managed SIEM Cost?",
    a: "Managed SIEM typically costs $3,000 to $15,000 per month for small and mid-size businesses and $15,000 to $50,000+ per month for enterprises. Per-unit pricing usually runs $8 to $50 per endpoint per month or $12 to $21 per employee per month. Check whether the SIEM license, incident response and extra retention are included.",
  },
  {
    q: "What Are the Main SIEM Pricing Models?",
    a: "The main SIEM pricing models are per-GB ingestion, GB/day capacity, events per second, per asset, per user or employee, per data source and flat subscription tiers. Per-GB is the most common. Per-user and per-asset models are the most predictable.",
  },
  {
    q: "How Do Storage and Retention Policies Impact Long-Term SIEM Costs?",
    a: "Retention compounds SIEM cost: each month you pay to store new logs while still keeping older ones. Keeping 12 months of logs in hot, searchable storage can cost several times more than keeping 90 days hot and archiving the rest. Match the searchable window to your compliance requirements and move older data to a cheaper tier.",
  },
  {
    q: "How Do You Calculate Managed SIEM Cost for Budgeting?",
    a: "Count your endpoints, employees and daily log volume, choose business-hours or 24/7 coverage and set your retention requirement. Multiply your units by each provider's rate, add excluded items such as extra retention and incident response hours, then re-run the totals at +30% and +50% growth.",
  },
  {
    q: "How Do You Compare Pricing Models for Managed SIEM Vendors?",
    a: "Give every provider the same inputs and compare total three-year cost, not unit price. Ask how each defines a billing unit, what happens when log volume spikes, what retention and response hours are included, whether the SIEM license is included and who owns detections and data if you leave.",
  },
  {
    q: "How Can You Reduce SIEM Complexity and Costs?",
    a: "Send less low-value data to the expensive analytics tier: filter logs in a data pipeline, route high-volume sources to a data lake, move to a commitment tier, shorten hot retention to what you need and consolidate overlapping tools. Pipeline filtering alone has cut ingestion by 25% to 35% in published case studies.",
  },
  {
    q: "What Do a SIEM and a SOC Cost Together?",
    a: "A self-run SIEM with a 24/7 SOC typically costs well over $1 million a year, because round-the-clock coverage of one analyst seat takes about five analysts, roughly $920,000 a year at US median pay. Managed SIEM bundles both for $3,000 to $50,000+ per month, depending on size.",
  },
  {
    q: "Is Open-Source SIEM Cheaper Than Commercial SIEM?",
    a: "Open-source SIEM has no license fee, so it is cheaper upfront, but you pay for infrastructure and engineers to deploy, tune and maintain it. For teams without that engineering capacity, a commercial or managed SIEM often has a lower total cost.",
  },
  {
    q: "What Is SIEM as a Service Pricing?",
    a: "SIEM as a service is usually priced per GB ingested, per endpoint or per user each month. When monitoring is included, it is priced like managed SIEM, typically $3,000 to $15,000 per month for small and mid-size businesses.",
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

function Meters({ items }: { items: { k: string; v: string; unit: string }[] }) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line/70 bg-line/70 sm:grid-cols-4">
      {items.map((m) => (
        <div key={m.k} className="flex flex-col gap-1.5 bg-surface-2 p-3.5">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-faint">
            {m.k}
          </span>
          <span className="text-[1.1rem] font-bold tabular-nums tracking-tight text-bright">
            {m.v}
            <small className="ml-0.5 text-[12px] font-medium text-muted">
              {m.unit}
            </small>
          </span>
        </div>
      ))}
    </div>
  );
}

/** Shared frame for the four inline CTA cards. */
function CtaCard({
  label,
  children,
  side,
  sideFirst = false,
  footer,
}: {
  label: string;
  children: ReactNode;
  side: ReactNode;
  /** Proof panel on the left, in a narrower column (the case-study card). */
  sideFirst?: boolean;
  /** Buttons row spanning both columns, below copy and panel. */
  footer?: ReactNode;
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
      <span
        aria-hidden
        className="absolute -top-px left-7 h-0.5 w-14 bg-accent"
      />
      {sideFirst ? (
        <>
          {side}
          <div className="min-w-0">{children}</div>
        </>
      ) : (
        <>
          <div className="min-w-0">{children}</div>
          {side}
        </>
      )}
      {footer && (
        <div className="flex flex-wrap gap-2.5 md:col-span-2">{footer}</div>
      )}
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
      aria-label="Licensed SIEM compared with an owned platform"
      className="min-w-0 rounded-md border border-line/70 bg-void p-4 font-mono text-[12.5px] leading-snug"
    >
      <p className="pb-1.5 text-[10.5px] uppercase tracking-[0.14em] text-faint">
        Licensed SIEM
      </p>
      <LedgerLine k="Year 1" v="license + per-GB" tone="up" />
      <LedgerLine k="Year 2" v="+ log growth" tone="up" />
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

const BANDS = [
  { scope: "Single tenant", vol: "under 500 GB/day", price: "$60K–$100K" },
  { scope: "Multi-tenant MSSP", vol: "500 GB–2 TB/day", price: "$100K–$250K" },
  { scope: "Regulated operator", vol: "2 TB+/day", price: "$250K–$400K" },
];

function Bands() {
  return (
    <div
      role="table"
      aria-label="WhyCrew build price bands"
      className="grid min-w-0 gap-2"
    >
      {BANDS.map((b) => (
        <div
          key={b.scope}
          role="row"
          className="flex items-center justify-between gap-3 rounded-md border border-line/70 bg-void px-3.5 py-3"
        >
          <span
            role="cell"
            className="flex flex-col text-[14px] font-semibold leading-snug text-bright"
          >
            {b.scope}
            <small className="font-mono text-[11px] font-normal tracking-wide text-faint">
              {b.vol}
            </small>
          </span>
          <span
            role="cell"
            className="whitespace-nowrap font-mono text-[14.5px] font-semibold tabular-nums text-accent"
          >
            {b.price}
          </span>
        </div>
      ))}
    </div>
  );
}

function MarginChart() {
  return (
    <div
      aria-label="Cost per tenant as you add clients"
      className="min-w-0 rounded-md border border-line/70 bg-void px-3.5 pt-3.5 pb-2.5"
    >
      <svg
        viewBox="0 0 240 130"
        role="img"
        aria-label="Licensed SIEM cost rises with each tenant; owned platform cost flattens"
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

/* Bar charts: 720×236 viewBox, same geometry as the design. */

function ChartFrame({
  children,
  caption,
}: {
  children: ReactNode;
  caption: string;
}) {
  return (
    <figure className="mt-8 rounded-lg border border-line/70 bg-surface/50 px-4 pt-4 pb-3.5 sm:px-5">
      {children}
      <figcaption className="mt-2 font-mono text-[12px] leading-relaxed text-faint">
        {caption}
      </figcaption>
    </figure>
  );
}

const CH_HEAD = "fill-bright text-[17px] font-bold";
const CH_TICK = "fill-faint font-mono text-[11px]";
const CH_LABEL = "fill-body text-[13px] font-medium";
const CH_VALUE = "fill-bright text-[14px] font-bold";

function Grid({ ticks }: { ticks: { x: number; label: string }[] }) {
  return (
    <>
      {ticks.map((t, i) => (
        <g key={t.label}>
          <line x1={t.x} y1="72" x2={t.x} y2="206" className="stroke-line" />
          <text
            x={t.x}
            y="224"
            textAnchor={i === 0 ? "start" : "middle"}
            className={CH_TICK}
          >
            {t.label}
          </text>
        </g>
      ))}
    </>
  );
}

function SameCompanyChart() {
  return (
    <ChartFrame caption="Annual cost for a 300-person company logging 50 GB a day, from the calculator above (US list prices, BLS median analyst pay plus benefits).">
      <svg
        viewBox="0 0 720 236"
        role="img"
        aria-labelledby="ch-t ch-d"
        className="block h-auto w-full overflow-visible"
      >
        <title id="ch-t">Same company, same logs: about 8 times apart</title>
        <desc id="ch-d">
          Annual SIEM cost for a 300-person company at 50 GB of logs a day.
          Per-user SIEM, platform only: $57,600. Per-GB SIEM with two in-house
          analysts: $447,561, of which $78,475 is the platform and $369,086 is
          analyst pay.
        </desc>
        <text x="20" y="22" className={CH_HEAD}>
          Same company, same logs: about 8× apart
        </text>
        <rect x="20" y="36" width="12" height="12" rx="2" className="fill-accent/75" />
        <text x="38" y="46" className={CH_TICK}>
          SIEM platform
        </text>
        <rect x="150" y="36" width="12" height="12" rx="2" className="fill-warn/80" />
        <text x="168" y="46" className={CH_TICK}>
          2 in-house analysts
        </text>
        <Grid
          ticks={[
            { x: 20, label: "$0" },
            { x: 156, label: "$100K" },
            { x: 292, label: "$200K" },
            { x: 428, label: "$300K" },
            { x: 564, label: "$400K" },
            { x: 700, label: "$500K" },
          ]}
        />
        <text x="20" y="88" className={CH_LABEL}>
          Per-user SIEM, platform only
        </text>
        <path
          d="M20.0 96H94.3Q98.3 96 98.3 100V120Q98.3 124 94.3 124H20.0Z"
          className="fill-accent/75"
        >
          <title>Per-user SIEM platform: $57,600 a year</title>
        </path>
        <text x="106.3" y="115" className={CH_VALUE}>
          $57,600
        </text>
        <text x="20" y="150" className={CH_LABEL}>
          Per-GB SIEM run by 2 in-house analysts
        </text>
        <rect x="20" y="158" width="106.7" height="28" className="fill-accent/75">
          <title>Per-GB SIEM platform: $78,475 a year</title>
        </rect>
        <path
          d="M128.7 158H624.7Q628.7 158 628.7 162V182Q628.7 186 624.7 186H128.7Z"
          className="fill-warn/80"
        >
          <title>Two in-house analysts: $369,086 a year</title>
        </path>
        <text x="636.7" y="177" className={CH_VALUE}>
          $447,561
        </text>
      </svg>
    </ChartFrame>
  );
}

function MsspScaleChart() {
  return (
    <ChartFrame caption="License at $2.96/GB (the 100 GB/day commitment rate; larger commitments can cost less). WhyCrew multi-tenant build price as published. Excludes analysts, which both options need, and the owned platform's infrastructure.">
      <svg
        viewBox="0 0 720 236"
        role="img"
        aria-labelledby="ch2-t ch2-d"
        className="block h-auto w-full overflow-visible"
      >
        <title id="ch2-t">
          At MSSP scale: three years of license fees vs. owning the platform
        </title>
        <desc id="ch2-d">
          At 500 GB of logs a day, three years of per-GB SIEM license fees come
          to about $1.62 million. A WhyCrew multi-tenant platform build is a
          one-time $100,000 to $250,000, with no per-GB license. Analysts and
          the owned platform&apos;s infrastructure are not included.
        </desc>
        <text x="20" y="22" className={CH_HEAD}>
          At MSSP scale: 3 years of rent vs. owning
        </text>
        <rect x="20" y="36" width="12" height="12" rx="2" className="fill-warn/80" />
        <text x="38" y="46" className={CH_TICK}>
          Per-GB license (rent)
        </text>
        <rect x="190" y="36" width="12" height="12" rx="2" className="fill-accent/75" />
        <text x="208" y="46" className={CH_TICK}>
          WhyCrew build (own)
        </text>
        <Grid
          ticks={[
            { x: 20, label: "$0" },
            { x: 171.1, label: "$400K" },
            { x: 322.2, label: "$800K" },
            { x: 473.3, label: "$1.2M" },
            { x: 624.4, label: "$1.6M" },
          ]}
        />
        <text x="20" y="88" className={CH_LABEL}>
          Per-GB SIEM license, 500 GB/day for 3 years
        </text>
        <path
          d="M20.0 96H628.2Q632.2 96 632.2 100V120Q632.2 124 628.2 124H20.0Z"
          className="fill-warn/80"
        >
          <title>Per-GB license over 3 years: about $1,620,600</title>
        </path>
        <text x="624.2" y="115" textAnchor="end" className="fill-void text-[14px] font-bold">
          $1.62M
        </text>
        <text x="20" y="150" className={CH_LABEL}>
          WhyCrew owned platform, one-time build
        </text>
        <rect x="20" y="158" width="37.8" height="28" className="fill-accent/75">
          <title>Build price, low end: $100,000</title>
        </rect>
        <path
          d="M57.8 158H110.4Q114.4 158 114.4 162V182Q114.4 186 110.4 186H57.8Z"
          className="fill-accent/40"
        >
          <title>Build price range up to $250,000</title>
        </path>
        <text x="122.4" y="177" className={CH_VALUE}>
          $100K–$250K one-time · no per-GB license
        </text>
      </svg>
    </ChartFrame>
  );
}

function Formula() {
  const terms = [
    "retention storage",
    "feature add-ons",
    "deployment (year one)",
    "integrations and tuning",
    "staff",
    "overage and egress",
  ];
  return (
    <div
      role="math"
      aria-label="Annual SIEM TCO formula"
      className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1 rounded-lg border border-line/70 bg-surface/50 px-5 py-4 font-mono text-[14px] leading-[1.9]"
    >
      <span className="font-semibold text-bright">Annual SIEM TCO =</span>
      <span className="inline-flex flex-col border-b border-dashed border-line leading-tight text-bright">
        license or ingestion fees
        <em className="text-[10px] not-italic uppercase tracking-[0.12em] text-faint">
          on the quote
        </em>
      </span>
      {terms.map((t) => (
        <span key={t} className="contents">
          <span className="text-faint">+</span>
          <span className="border-b border-dashed border-warn/40 text-warn">
            {t}
          </span>
        </span>
      ))}
    </div>
  );
}

function StaffMath({ rows }: { rows: { n: string; body: ReactNode }[] }) {
  return (
    <ol className="mt-5 overflow-hidden rounded-lg border border-line/70">
      {rows.map((r, i) => {
        const last = i === rows.length - 1;
        return (
          <li
            key={r.n}
            className={`grid gap-1 border-b border-line/70 px-4 py-4 last:border-0 sm:grid-cols-[120px_minmax(0,1fr)] sm:items-baseline sm:gap-4 ${
              last ? "bg-warn/10" : "bg-surface/50"
            }`}
          >
            <span
              className={`font-mono text-[1.1rem] font-semibold tabular-nums ${
                last ? "text-warn" : "text-bright"
              }`}
            >
              {r.n}
            </span>
            <span className="text-[15px] leading-[1.7] text-body">{r.body}</span>
          </li>
        );
      })}
    </ol>
  );
}

function Included() {
  const cols = [
    {
      label: "Normally included",
      mark: "✓",
      tone: "text-accent",
      items: [
        "SIEM license and hosting",
        "Onboarding for standard log sources",
        "Alert triage (business hours or 24/7)",
        "Monthly or compliance reporting",
      ],
    },
    {
      label: "Often costs extra",
      mark: "+",
      tone: "text-warn",
      items: [
        "Custom detection rules and heavy tuning",
        "Incident response beyond the first triage",
        "Threat hunting",
        "Retention past the default window (commonly 90 days to a year)",
        "Integrations for in-house or legacy apps",
      ],
    },
  ];
  return (
    <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
      {cols.map((c) => (
        <div
          key={c.label}
          className="min-w-0 rounded-lg border border-line/70 bg-surface/50 px-4 pt-4 pb-1.5"
        >
          <p className={`font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] ${c.tone}`}>
            {c.label}
          </p>
          <ul className="mt-2.5">
            {c.items.map((it) => (
              <li
                key={it}
                className="flex gap-2.5 border-t border-line-soft py-1.5 text-[14.5px] leading-relaxed text-body first:border-0"
              >
                <span aria-hidden className={`font-mono font-semibold ${c.tone}`}>
                  {c.mark}
                </span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

const GLOSSARY = [
  ["GB/day", "Licensed daily ingestion capacity, common in Splunk contracts."],
  ["EPS / MPS", "Events or messages per second, a throughput-based license meter."],
  ["Hot, warm and cold retention", "Fast searchable storage, slower storage and low-cost archive, each priced differently."],
  ["Commitment tier", "A reserved daily volume in exchange for a lower per-GB rate."],
  ["Security data pipeline", "Software that filters, transforms and routes logs before they reach the SIEM."],
  ["Security data lake", "Low-cost storage for security logs that can still be queried."],
  ["TCO (total cost of ownership)", "License plus infrastructure, people, deployment and services over the contract term."],
  ["Managed SIEM / SOC as a service", "A provider runs and monitors the SIEM for a monthly fee."],
];

function Glossary() {
  return (
    <dl className="mt-4 grid gap-px overflow-hidden rounded-lg border border-line/70 bg-line/70 sm:grid-cols-2">
      {GLOSSARY.map(([term, def]) => (
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
        showUpdated
        notes={["Prices checked October 2026"]}
      >
        <Lead>
          A{" "}
          <Strong>
            SIEM (security information and event management) platform
          </Strong>{" "}
          collects, normalizes, stores and analyzes security logs from across
          your environment. Teams use it to detect threats, investigate
          incidents and meet compliance requirements. In 2026,{" "}
          <Strong>
            SIEM cost ranges from about $30,000 a year for a small organization
            to more than $5 million a year for a large enterprise
          </Strong>{" "}
          once software, storage and staffing are included.
        </Lead>
        <P>
          SIEM quotes are hard to compare, and the difficulty is built in.
          Vendors bill on different meters, such as gigabytes, devices,
          employees or data sources. Most quotes also leave out the two costs
          that grow fastest: storage and people. This guide puts all of it on
          one page so you can see the real number before you sign anything.
        </P>
        <p className="mt-5 border-y border-line-soft py-3.5 text-[14px] leading-relaxed text-muted">
          <span className={`${EYEBROW} mr-2`}>This guide is for</span>
          security leaders, IT directors, SOC managers, MSSPs and procurement
          teams comparing SIEM software, managed SIEM and custom-built
          alternatives.
        </p>

        <H2 id="quick-answer">How Much Does a SIEM Cost?</H2>
        <div className="mt-5">
          <QuickAnswer block>
            <p className="text-[16px] leading-[1.7] text-body">
              A SIEM typically costs about{" "}
              <Strong>$30,000 to $200,000 a year</Strong> for a small business,{" "}
              <Strong>$150,000 to $800,000 a year</Strong> for a mid-market
              organization and <Strong>$1 million to $5 million+ a year</Strong>{" "}
              for an enterprise, including staff. Managed SIEM typically costs{" "}
              <Strong>$3,000 to $15,000 per month</Strong> for small and
              mid-size businesses and{" "}
              <Strong>$15,000 to $50,000+ per month</Strong> for enterprises.
              SIEM pricing depends mostly on how much log data you ingest and
              whether you staff the platform yourself.
            </p>
            <Meters
              items={[
                { k: "Small business", v: "$30K–$200K", unit: "/yr" },
                { k: "Mid-market", v: "$150K–$800K", unit: "/yr" },
                { k: "Enterprise", v: "$1M–$5M+", unit: "/yr" },
                { k: "Managed SIEM", v: "$3K–$50K+", unit: "/mo" },
              ]}
            />
          </QuickAnswer>
        </div>
        <P>
          The range is wide for a reason. Two companies of the same size can
          pay very different amounts depending on how much they log and who
          watches the alerts.
        </P>
        <DataTable
          head={["Question", "Short answer (2026, USD)"]}
          rows={[
            ["Small business SIEM cost", "$30,000–$200,000 per year all-in"],
            ["Mid-market SIEM cost", "$150,000–$800,000 per year all-in"],
            ["Enterprise SIEM cost", "$1M–$5M+ per year all-in"],
            ["Managed SIEM cost", "$3,000–$50,000+ per month"],
            ["SIEM cost per GB", "About $0.10–$6 per GB ingested"],
            ["SIEM cost per asset", "$5–$25 per asset per month"],
            ["SIEM cost per employee", "$12–$21 per employee per month"],
            ["Biggest hidden cost", "Staffing, which is roughly 61%–72% of self-run SIEM TCO"],
            ["Cost of 24/7 in-house monitoring", "About $920,000 a year for one seat covered around the clock"],
            ["Typical negotiated discount", "20%–40% below list price"],
          ]}
        />
        <aside className="mt-8 rounded-lg border border-line/70 bg-surface/60 p-6 sm:p-7">
          {/* An h3, not the shared KeyTakeaways label: the design makes it a heading. */}
          <h3 className="mb-5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-brand-hi">
            Key Takeaways
          </h3>
          <Bullets
            items={[
              <>
                <Strong>The billing model matters as much as the rate.</Strong>{" "}
                A cheap per-GB rate on logs that keep growing can cost more than
                a pricier per-user plan.
              </>,
              <>
                <Strong>Log ingestion drives most per-GB bills.</Strong>{" "}
                Retention, feature tiers and tenant count come next.
              </>,
              <>
                <Strong>People cost more than software.</Strong> Staffing makes
                up roughly 61% to 72% of a self-run SIEM&apos;s three-year cost.
              </>,
              <>
                <Strong>24/7 coverage takes about five analysts per seat</Strong>
                , which comes to roughly $920,000 a year at US median pay. That
                math is why so many teams buy managed SIEM.
              </>,
              <>
                <Strong>The cheapest rate card is rarely the cheapest SIEM.</Strong>{" "}
                Compare three-year total cost, not the price per GB on page one
                of the proposal.
              </>,
            ]}
          />
        </aside>

        <H2 id="calculator">SIEM Cost Calculator</H2>
        <P>
          We built this because nearly every pricing question we get boils
          down to the same five inputs: how many GB a day, how long you keep
          logs searchable, how many people, how many endpoints and who&apos;s
          watching the alerts.
        </P>
        <P>
          Enter yours and you&apos;ll see an annual estimate for four common
          pricing models side by side, with and without the cost of your own
          analysts. The rates are list prices, either published by the vendors
          or reported in third-party pricing research. Negotiated deals often
          land 20% to 40% below list, so treat the output as a budgeting range
          rather than a quote.
        </P>
        <SiemCostCalculator />

        <CtaCard label="Rent versus own" side={<Ledger />}>
          <CtaHead
            eyebrow="Stop renting. Start owning."
            title="That Number Renews Every Year."
          />
          <CtaBody>
            Every platform figure in the calculator is rent. It comes back at
            renewal, and on per-GB pricing it grows with every new log source.
            WhyCrew builds the SIEM platform you own instead: one fixed-price
            build, then you pay for infrastructure, not a license.
          </CtaBody>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button href="/contact">
              Compare renting vs. owning for my numbers
            </Button>
          </div>
        </CtaCard>

        <H2 id="by-size">SIEM Cost by Organization Size</H2>
        <P>
          <Strong>
            SIEM cost scales mainly with two things: how much log data you
            produce and whether you staff the platform yourself.
          </Strong>{" "}
          Here&apos;s what that typically looks like for US organizations in
          2026.
        </P>
        <DataTable
          head={[
            "Organization size",
            "Typical log volume",
            "SIEM platform only (per year)",
            "All-in with your own staff (per year)",
            "Managed SIEM (per month)",
          ]}
          rows={[
            [
              <>
                <Strong>Small business</Strong> (under 250 employees, under 100
                endpoints)
              </>,
              "5–25 GB/day",
              "$15,000–$60,000",
              "$30,000–$200,000",
              "$3,000–$5,000",
            ],
            [
              <>
                <Strong>Mid-market</Strong> (250–1,000 employees)
              </>,
              "25–200 GB/day",
              "$60,000–$300,000",
              "$150,000–$800,000",
              "$5,000–$15,000",
            ],
            [
              <>
                <Strong>Enterprise</Strong> (1,000–10,000 employees)
              </>,
              "200 GB–1 TB/day",
              "$300,000–$2.5M",
              "$1M–$5M+",
              "$15,000–$50,000+",
            ],
            [
              <>
                <Strong>Large enterprise / MSSP</Strong> (10,000+ endpoints or
                many tenants)
              </>,
              "1 TB+/day",
              "$1M+",
              "$3M+",
              "$50,000–$150,000+",
            ],
          ]}
        />
        <P>
          A quick guide to the columns. &quot;Platform only&quot; is what the
          vendor charges you (license or consumption plus storage), assuming
          you already have people to run it. &quot;All-in&quot; adds those
          people at US market pay: the low end assumes a small team working
          business hours; the high end assumes someone is watching 24/7. The
          managed SIEM column already includes the provider&apos;s analysts,
          which is why it looks so different.
        </P>
        <P>
          The widest gap is in the middle. A 300-person company at 50 GB a day
          might spend about $58,000 a year on a per-user SIEM, or about
          $450,000 a year running a per-GB SIEM with two in-house analysts.
          (You can reproduce both numbers with the calculator above.) Same
          company. Same logs. An eightfold difference. Most of the time, the
          pricing model and the staffing decision move your bill far more than
          which vendor&apos;s logo is on the dashboard.
        </P>
        <SameCompanyChart />

        <H2 id="pricing-models">SIEM Pricing Models Explained</H2>
        <P>
          <Strong>
            SIEM vendors use seven main pricing models: per-GB ingestion,
            GB/day capacity, events per second, per asset, per user, per data
            source and flat subscription tiers.
          </Strong>{" "}
          Managed SIEM providers usually wrap one of these in a monthly service
          fee.
        </P>
        <P>
          The question to ask of each one is simple: what makes the bill go up?
          With per-GB it&apos;s your logs. With per-asset it&apos;s your
          devices. With per-user it&apos;s your headcount. Pick the meter that
          grows slowest in your business.
        </P>
        <DataTable
          head={[
            "Pricing model",
            "What you pay for",
            "Typical 2026 price",
            "Predictability",
            "Example vendors",
          ]}
          rows={[
            [<Strong key="m">Per-GB ingestion</Strong>, "Each GB of log data sent to the SIEM", "$0.10–$6 per GB ingested", "Low; rises with log growth", "Microsoft Sentinel, Elastic, CrowdStrike"],
            [<Strong key="m">GB/day capacity</Strong>, "An annual license for a daily volume ceiling", "Roughly $1,800–$2,700 per GB/day per year (list)", "Medium; overage risk at peaks", "Splunk"],
            [<Strong key="m">Events per second (EPS)</Strong>, "Sustained event throughput", "Quote-based", "Medium; spikes during incidents", "IBM QRadar, legacy LogRhythm (MPS)"],
            [<Strong key="m">Per asset or device</Strong>, "Each monitored endpoint, server or device", "$5–$25 per asset per month", "High", "Rapid7, many MSSPs"],
            [<Strong key="m">Per user or employee</Strong>, "Headcount, usually with unlimited data", "$12–$21 per employee per month", "High", "Sophos, ConnectWise"],
            [<Strong key="m">Per data source</Strong>, "Each connected log source", "About $4 per source per month", "High", "Managed SIEM providers for SMBs"],
            [<Strong key="m">Flat subscription or tiers</Strong>, "A fixed fee for a volume band or feature set", "Varies widely", "High within the tier", "Google SecOps, Wazuh Cloud"],
          ]}
        />
        <H3>Per-GB Ingestion: The Default, and the One That Bites</H3>
        <P>
          Per-GB pricing charges you for every gigabyte of logs the SIEM takes
          in, a bit like paying for electricity by the kilowatt-hour. It&apos;s
          the most common model, and it&apos;s behind most of the surprise
          invoices we see.
        </P>
        <P>The published rates look reasonable on their own:</P>
        <Bullets
          items={[
            <>
              <Strong>Microsoft Sentinel</Strong> costs about{" "}
              <Strong>$4.30 per GB</Strong> pay-as-you-go in East US. Commit to
              100 GB/day and the effective rate drops to about{" "}
              <Strong>$2.96 per GB</Strong>; Microsoft says commitment tiers
              save up to 52%.
            </>,
            <>
              <Strong>Elastic Security Serverless</Strong> publishes rates from{" "}
              <Strong>$0.09 to $0.11 per GB</Strong> ingested, plus{" "}
              <Strong>$0.017 to $0.019 per GB per month</Strong> for what you
              keep.
            </>,
            <>
              <Strong>CrowdStrike Falcon Next-Gen SIEM</Strong> runs about{" "}
              <Strong>$5.95 per GB</Strong> pay-as-you-go on AWS Marketplace.
              If you already run Falcon Insight XDR, you get 10 GB/day of
              third-party data free.
            </>,
          ]}
        />
        <P>
          The trouble is that log volume doesn&apos;t grow politely. Turn on a
          new firewall, move a workload to the cloud or have one bad week with
          an incident, and ingestion can jump overnight. Your budget, set 12
          months earlier, doesn&apos;t move with it.
        </P>
        <H3>Events per Second (EPS)</H3>
        <P>
          EPS licenses throughput instead of volume. It works fine in stable
          environments. But during an incident, a flood of alerts from noisy
          sources can push you past your licensed rate at exactly the moment
          you can least afford a throttled SIEM. That&apos;s a hard thing to
          size for in advance.
        </P>
        <H3>Per-Asset and Per-User Pricing</H3>
        <P>
          Asset pricing charges a flat rate per monitored device, so the bill
          follows your infrastructure rather than your logs. Rapid7 InsightIDR
          lists at about $5.89 per asset per month, with a 500-asset minimum.
        </P>
        <P>
          User pricing charges per employee and usually includes unlimited
          data. Published plans run $12, $16 and $21 per employee per month.
          For a small company with chatty firewalls and a modest headcount,
          this is often the most predictable bill you can get.
        </P>
        <H3>Managed and As-a-Service Pricing</H3>
        <P>
          Managed SIEM bundles the platform with people who monitor, tune and
          respond. Some providers sell it as &quot;SOC as a service.&quot;
          &quot;SIEM as a service&quot; usually means hosting only, which we
          compare below. Providers usually price it per endpoint, per user or
          per data source each month, or as a flat retainer. Full rates are in
          the <A href="#managed-siem-pricing">Managed SIEM Pricing</A> section.
        </P>

        <H2 id="vendor-prices">SIEM Pricing Comparison: 2026 Vendor Prices</H2>
        <P>
          <Strong>
            Published SIEM pricing ranges from about $0.10 per GB (Elastic) to
            about $6 per GB (CrowdStrike pay-as-you-go), while Splunk, Google
            SecOps and Exabeam sell mainly on quotes.
          </Strong>
        </P>
        <DataTable
          head={[
            "Vendor",
            "Pricing model",
            "2026 price point (USD)",
            "Source type",
            "Typical fit",
          ]}
          rows={[
            ["Microsoft Sentinel", "Per GB, analytics tier + data lake tier", "~$4.30/GB pay-as-you-go (East US); ~$2.96/GB at 100 GB/day commitment", "Vendor structure; third-party rate analysis", "Microsoft 365 and Azure shops"],
            ["Splunk Enterprise Security", "Per GB/day capacity or workload pricing", "Roughly $1,800–$2,700 per GB/day per year list; ES add-on on top", "Third-party deal data", "Large hybrid enterprises"],
            ["Elastic Security Serverless", "Per GB ingested + per GB retained", "From $0.09–$0.11/GB ingest; $0.017–$0.019/GB-month retention", "Vendor-published", "Teams with engineering capacity"],
            ["Google SecOps", "Ingestion-based subscription", "Quote only; 12 months of hot retention included", "Vendor-published structure", "High-volume, long-retention needs"],
            ["CrowdStrike Falcon Next-Gen SIEM", "Per GB; free tier with Insight XDR", "~$5.95/GB PAYG; 10 GB/day free for Insight XDR", "Vendor and AWS Marketplace", "CrowdStrike endpoint customers"],
            ["Rapid7 InsightIDR", "Per asset", "~$5.89/asset/month, 500-asset minimum", "Third-party review site", "Mid-market teams"],
            ["Wazuh Cloud", "Per active-agent tier", "From $571/month (up to 100 agents)", "Third-party listing", "Budget-conscious teams"],
            ["Sophos Next-Gen SIEM", "Per user and server", "Quote via partners; 1-year default retention", "Vendor structure", "Sophos XDR/MDR customers"],
            ["ConnectWise SIEM", "Per user with daily data allowance", "Quote", "Third-party listing", "MSPs on ConnectWise"],
            ["Exabeam (incl. LogRhythm)", "Ingestion, sources, feature tier", "Quote only", "Analyst data", "UEBA-focused enterprises"],
          ]}
        />
        <P>
          One caution about this table: pricing transparency varies a lot.
          Where a price isn&apos;t marked vendor-published, it comes from deal
          data or third-party research. Use it to sanity-check a quote, not to
          replace one. Prices were checked in October 2026.
        </P>
        <H3>Open-Source vs. Commercial SIEM Pricing</H3>
        <P>
          <Strong>
            Open-source SIEMs such as Wazuh and OpenSearch have no license fee,
            but you pay for infrastructure and the engineers who run them.
          </Strong>{" "}
          Commercial SIEMs charge for the license and ship with more
          vendor-maintained detection content. Which one ends up cheaper
          depends almost entirely on whether you have the people. For a related
          comparison, see our guide to{" "}
          <A href="/blog/open-source-vs-custom-built-siem">
            open-source vs. custom-built SIEM
          </A>
          .
        </P>

        <H2 id="cost-drivers">What Drives SIEM Cost?</H2>
        <P>
          <Strong>
            SIEM cost is driven by four things: how much data you ingest, how
            long you keep it searchable, which feature tier you need and how
            many tenants or business units you run.
          </Strong>
        </P>
        <H3>1. Log Ingestion Volume</H3>
        <P>
          On per-GB platforms, ingestion is usually the biggest line on the
          bill. And the irony is that the noisiest sources (firewall, DNS,
          proxy, NetFlow, verbose Windows events) tend to produce the fewest
          useful detections. You end up paying premium rates to store data you
          rarely query.
        </P>
        <H3>2. Storage and Retention Policies</H3>
        <P>
          <Strong>
            Storage and retention policies raise long-term SIEM cost because
            stored data compounds: every month you pay to keep new logs while
            still paying for old ones.
          </Strong>
        </P>
        <P>
          It&apos;s the cost people underestimate most, because it creeps. In
          month 1 you pay to store one month of logs. By month 12 you&apos;re
          paying for 12 months of logs. Keeping a full year searchable can cost
          several times more than keeping 90 days searchable and archiving the
          rest, and nobody notices until the second-year invoice. In the US, a
          few rules usually set the minimum:
        </P>
        <Bullets
          items={[
            <>
              <Strong>PCI DSS (Requirement 10.5.1):</Strong> at least 12 months
              of audit logs, with the latest three months immediately
              available.
            </>,
            <>
              <Strong>OMB M-21-31 (federal agencies and contractors):</Strong>{" "}
              12 months in active storage plus 18 months in cold storage.
            </>,
            <>
              <Strong>HIPAA, SOX and state laws</Strong> add their own
              expectations, so check with your compliance team before you size
              retention.
            </>,
          ]}
        />
        <P>
          Vendors handle this very differently, which is why two quotes for
          &quot;the same&quot; SIEM can be far apart. Google SecOps includes 12
          months of hot retention in its ingestion price. Some per-employee
          SIEMs include 365 days. Microsoft Sentinel keeps 90 days in its
          analytics tier and sells a separate, much cheaper data lake tier for
          the long tail.
        </P>
        <H3>3. Feature Tiers</H3>
        <P>
          UEBA, threat intelligence, SOAR automation and AI assistants tend to
          live in higher tiers or come as add-ons. It&apos;s tempting to sign
          for the entry tier and upgrade later. Don&apos;t, unless you&apos;re
          sure. Price the tier you&apos;ll need in year two, because asking for
          an upgrade mid-contract is about the weakest negotiating position
          there is.
        </P>
        <H3>4. Tenant Count and Deployment Model</H3>
        <P>
          If you run several business units, or you&apos;re an MSSP with
          dozens of clients, per-workspace or per-instance pricing multiplies
          fast. Cloud SIEM gets rid of hardware but adds metered storage, query
          and egress fees. On-premises SIEM moves those costs to servers and
          the people who keep them running. Our{" "}
          <A href="/blog/multi-tenant-siem-architecture-mssps">
            multi-tenant SIEM architecture guide
          </A>{" "}
          goes deeper on how tenancy changes the math.
        </P>

        <H2 id="tco">SIEM Total Cost of Ownership (TCO)</H2>
        <P>
          <Strong>
            SIEM total cost of ownership is the license plus storage,
            deployment, integrations, detection tuning and the people who run
            it, measured over the contract term, usually three years.
          </Strong>{" "}
          For a self-run SIEM, the license is often less than half of that.
        </P>
        <P>If you want it as a formula:</P>
        <Formula />
        <P>
          The first term is the one on the quote. Everything after the first
          plus sign is where budgets go wrong.
        </P>
        <H3>The Cost of Security Staff</H3>
        <P>
          People are the most expensive part of a SIEM, and it isn&apos;t
          close. In one published three-year comparison for a 200-employee
          organization, staffing made up roughly <Strong>61% to 72%</Strong>{" "}
          of total cost for enterprise and cloud SIEMs.
        </P>
        <P>
          Here&apos;s why 24/7 coverage gets expensive so quickly. We worked
          this out from government pay data:
        </P>
        <StaffMath
          rows={[
            {
              n: "8,760 h",
              body: (
                <>
                  A year has <Strong>8,760 hours</Strong>. A full-time analyst
                  works roughly <Strong>1,800 productive hours</Strong> once you
                  take out leave and training.
                </>
              ),
            },
            {
              n: "× 5",
              body: (
                <>
                  So keeping <Strong>one</Strong> seat staffed around the clock
                  takes about <Strong>five</Strong> analysts.
                </>
              ),
            },
            {
              n: "$185K",
              body: (
                <>
                  The median US information security analyst earned{" "}
                  <Strong>$129,180</Strong> in May 2025 (BLS). Wages are about{" "}
                  <Strong>70%</Strong> of what employers actually pay per
                  worker once benefits are counted (BLS, June 2026), which puts
                  each analyst at about <Strong>$185,000</Strong> fully loaded.
                </>
              ),
            },
            {
              n: "$920K",
              body: (
                <>
                  Five analysts cost roughly <Strong>$920,000 a year</Strong>.
                  And that&apos;s before a SIEM engineer, a manager or the
                  software.
                </>
              ),
            },
          ]}
        />
        <P>
          So when a team tells us they plan to run their SIEM in-house, 24/7,
          with two people, this is the math we walk through. Two people can
          cover business hours well. They can&apos;t cover nights, weekends,
          holidays and sick days too. It&apos;s also why managed SIEM exists.
        </P>
        <H3>Deployment Cost and the Hidden Extras</H3>
        <DataTable
          head={["Hidden cost", "Typical range", "When it hits"]}
          rows={[
            ["Deployment and professional services", "$15,000–$200,000", "One-time, year one"],
            ["Custom integrations and parsers", "$10,000–$50,000 per connector", "Year one, then as sources change"],
            ["Detection tuning and content", "Ongoing analyst or engineer time", "Every year"],
            ["Training and certifications", "$5,000–$15,000 per admin per year", "Every year"],
            ["Overage, peak traffic and egress", "Varies by contract", "During incidents, audits and migrations"],
            ["Renewal increases", "Often several percent a year", "At each renewal"],
          ]}
        />
        <P>
          These ranges come from a published 2026 SIEM TCO analysis, which
          also found that first-year SIEM costs commonly run{" "}
          <Strong>40% to 60%</Strong> over the original estimate. In our
          experience, integrations are the usual culprit: every in-house app
          and legacy system needs a parser, and nobody counted them during
          procurement.
        </P>

        <CtaCard
          label="Case study"
          sideFirst
          side={
            <div className="flex flex-col gap-1.5 rounded-md border border-line/70 bg-void p-5">
              <span className="text-[clamp(2.4rem,6vw,3.2rem)] font-bold leading-none tracking-tight text-accent tabular-nums">
                $270K
              </span>
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-faint">
                saved over 24 months
              </span>
            </div>
          }
        >
          <CtaHead
            eyebrow="Case study · MSSP"
            title="The Hidden Extras Stop When the License Does."
          />
          <CtaBody>
            An MSSP moved off per-GB SIEM pricing onto a platform it owns. No
            more overage at peak, no more renewal increases, no more paying
            extra each time a client logs more. Here&apos;s how the move worked
            and what it cost.
          </CtaBody>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button href="/case-studies/siem-rent-to-owned-platform">
              Read the case study
            </Button>
          </div>
        </CtaCard>

        <H2 id="managed-siem-pricing">Managed SIEM Pricing</H2>
        <P>
          <Strong>
            Managed SIEM pricing typically ranges from $3,000 to $15,000 per
            month for small and mid-size businesses and $15,000 to $50,000+ per
            month for enterprises, depending on endpoints, log volume and
            analyst coverage.
          </Strong>
        </P>
        <P>
          Think of it as renting the platform and the night shift together.
          You pay for the SIEM, the people watching it and some level of
          response, and in exchange most of the staffing problem from the last
          section goes away. For a lot of small and mid-size teams, that trade
          is worth it.
        </P>
        <H3>Managed SIEM Cost by Organization Size</H3>
        <DataTable
          head={[
            "Organization size",
            "Endpoints",
            "Typical monthly cost",
            "Typical annual cost",
            "Usual coverage",
          ]}
          rows={[
            ["Small business", "Under 100", "$3,000–$5,000", "$36,000–$60,000", "Often business hours"],
            ["Mid-market", "100–1,000", "$5,000–$15,000", "$60,000–$180,000", "Usually 24/7 triage"],
            ["Enterprise", "1,000–10,000", "$15,000–$50,000+", "$180,000–$600,000+", "24/7 with dedicated analysts"],
            ["Large enterprise", "10,000+", "$50,000–$150,000+", "$600,000–$1.8M+", "Dedicated SOC capacity"],
          ]}
        />
        <H3>How Managed SIEM Vendors Price the Service</H3>
        <DataTable
          head={["Managed SIEM pricing model", "Typical 2026 rate", "Works best for"]}
          rows={[
            ["Per endpoint or asset", "$8–$50 per endpoint per month", "Device-heavy environments"],
            ["Per GB of data", "$0.50–$2.00 per GB ingested", "Low-volume, high-endpoint environments"],
            ["Per employee", "$12–$21 per employee per month", "Organizations with several devices per person"],
            ["Per data source", "~$4 per source per month", "A small number of well-defined log sources"],
            ["Flat monthly tier or retainer", "$3,000–$50,000+ per month; $5,000–$25,000 for mid-market retainers", "Teams that want one fixed number"],
            ["Hybrid", "Per asset plus a per-GB overage", "Mixed environments"],
          ]}
        />
        <H3>What&apos;s Usually Included, and What Usually Isn&apos;t</H3>
        <P>
          This is where managed SIEM quotes stop being comparable. Two
          providers can quote the same monthly price and deliver very different
          things, and you usually find out which one you bought during your
          first real incident.
        </P>
        <Included />
        <P>Get the exclusions in writing before you compare anything.</P>
        <H3>Managed SIEM vs. MDR vs. SIEM as a Service</H3>
        <P>These three get used interchangeably, but they aren&apos;t the same thing:</P>
        <Bullets
          items={[
            <>
              <Strong>Managed SIEM:</Strong> a provider runs a SIEM (theirs or
              sometimes yours) and monitors it for you.
            </>,
            <>
              <Strong>MDR (managed detection and response):</Strong> response
              comes first. It usually runs on the provider&apos;s own endpoint
              or XDR tooling and cares less about long-term log retention.
            </>,
            <>
              <Strong>SIEM as a service:</Strong> a cloud-hosted SIEM platform.
              Some vendors include monitoring; many just host the software.
            </>,
          ]}
        />

        <H2 id="budgeting">How to Calculate Managed SIEM Cost for Budgeting</H2>
        <P>
          <Strong>
            To budget for managed SIEM, count your endpoints, users and daily
            log volume, choose the coverage level you need, then multiply by
            each provider&apos;s pricing unit and add exclusions and growth.
          </Strong>{" "}
          In practice, it goes like this:
        </P>
        <Numbered
          items={[
            <>
              <Strong>Count your billing units.</Strong> Endpoints, servers,
              cloud workloads, employees and log sources. Measure your average
              and peak daily log volume in GB; the peak matters more than
              you&apos;d think.
            </>,
            <>
              <Strong>Decide on coverage.</Strong> Business-hours coverage
              (8x5) is much cheaper than 24/7, but most regulated organizations
              can&apos;t get away with it.
            </>,
            <>
              <Strong>Set retention</Strong> to the longest requirement you
              face. For anyone handling card data, that&apos;s 12 months under
              PCI DSS.
            </>,
            <>
              <Strong>Apply each provider&apos;s unit price.</Strong> For
              example: 400 endpoints × $25 = $10,000 a month. Or 60 GB/day ×
              $1.50 × 30 days = $2,700 a month.
            </>,
            <>
              <Strong>Add the exclusions:</Strong> extra retention, custom
              detections, incident response hours, onboarding.
            </>,
            <>
              <Strong>Stress-test for growth.</Strong> Re-run everything at
              +30% and +50% volume. Some pricing models hold up; others fall
              apart.
            </>,
          ]}
        />

        <H2 id="compare-vendors">
          How to Compare Pricing Models for Managed SIEM Vendors
        </H2>
        <P>
          <Strong>
            Compare managed SIEM vendors on total three-year cost at your
            expected growth, not on the headline unit price.
          </Strong>{" "}
          Give every provider the same inputs, then ask each of them these
          questions:
        </P>
        <DataTable
          head={["Question to ask", "Why it matters"]}
          rows={[
            ["What is the billing unit, and what counts as one?", "\"Endpoint\" and \"user\" mean different things to different providers"],
            ["What happens when log volume spikes?", "The overage terms decide your worst-case bill"],
            ["What retention is included, and what does more cost?", "Retention is the most common add-on"],
            ["Is the SIEM license included or passed through?", "Some providers bill the platform separately"],
            ["How many incident response hours are included?", "Triage-only services stop at the alert"],
            ["Who owns the detection rules and data if you leave?", "This is your exit cost"],
            ["What's the cap on renewal increases?", "It protects years two and three"],
          ]}
        />
        <P>If a provider hesitates on the last two, take note.</P>

        <H2 id="cost-benefit">
          In-House vs. Managed vs. Custom-Built SIEM: Cost-Benefit Analysis
        </H2>
        <P>
          <Strong>
            A managed SIEM is usually cheapest for small teams, a licensed SIEM
            run in-house suits mid-size teams with security staff, and a
            custom-built SIEM becomes cost-effective at high log volumes or for
            MSSPs with many tenants.
          </Strong>
        </P>
        <DataTable
          head={[
            "Factor",
            "In-house licensed SIEM",
            "Managed SIEM",
            "Custom-built, owned SIEM",
          ]}
          rows={[
            ["Upfront cost", "Low to moderate", "Low", "High (engineering build)"],
            ["Ongoing cost", "License + staff; grows with data", "Monthly fee; grows with endpoints or data", "Infrastructure + staff; no per-GB license"],
            ["Staffing", "You hire and run the team", "Provider's analysts", "You run it, or a partner supports it"],
            ["Time to deploy", "Weeks to months", "Weeks", "About 3 months"],
            ["Control and data residency", "Vendor-dependent", "Provider-dependent", "Full"],
            ["Best fit", "Mature teams, moderate volume", "Small and mid-size teams without a SOC", "MSSPs and high-volume, regulated operators"],
          ]}
        />
        <P>
          Full disclosure: building custom SIEM platforms is what we do, so
          weigh our opinion accordingly. For most small teams, a custom build
          is the wrong answer, and we&apos;ll tell you that on the first call.
          Where it does make sense is at scale. In one of our published case
          studies, an MSSP that moved off per-GB SIEM pricing to a platform it
          owned{" "}
          <A href="/case-studies/siem-rent-to-owned-platform">
            saved $270,000 over 24 months
          </A>
          . Our{" "}
          <A href="/services/custom-siem-development">
            custom SIEM development page
          </A>{" "}
          lists our build price bands if you want to compare.
        </P>
        <MsspScaleChart />

        <H2 id="reduce-cost">How to Reduce SIEM Complexity and Costs</H2>
        <P>
          <Strong>
            The most reliable way to reduce SIEM cost is to send less low-value
            data to the expensive analytics tier, not to collect less data.
          </Strong>{" "}
          Cutting what you collect saves money but leaves blind spots, and
          you&apos;ll only discover them when an investigation needs the logs
          you dropped. Moving what you collect to cheaper storage saves money
          and keeps the evidence. The same steps cut complexity too: fewer
          overlapping tools, fewer parsers to maintain and fewer noisy alerts
          to triage.
        </P>
        <P>
          These are the cost optimizations we&apos;d try first, roughly in
          order:
        </P>
        <Numbered
          items={[
            <>
              <Strong>Filter and route data in a pipeline.</Strong> A security
              data pipeline strips duplicate fields and noisy events before
              they hit the SIEM, and sends the raw copy to cheap storage.
              Events DC cut SIEM ingestion by 30–35% this way, and a US
              retailer brought its Splunk license down from 1 TB/day to 750
              GB/day (both are vendor-published case studies, so treat them as
              examples).
            </>,
            <>
              <Strong>Tier your data.</Strong> Identity, endpoint and alert
              data belongs in the analytics tier. Firewall, proxy and flow logs
              can usually live in a data lake tier at a fraction of the price.
            </>,
            <>
              <Strong>Right-size your commitments.</Strong> Once daily volume
              is stable, a commitment tier is the easiest saving available.
              Sentinel&apos;s commitment tiers save up to 52% over
              pay-as-you-go.
            </>,
            <>
              <Strong>Match retention to the actual requirement.</Strong> Keep
              the searchable window as short as your regulations and
              investigations allow. Archive the rest.
            </>,
            <>
              <Strong>Check detections against sources.</Strong> If no
              detection rule or investigation ever touches a log source, ask
              why it&apos;s in the SIEM at all.
            </>,
            <>
              <Strong>Consolidate tools.</Strong> Running two or three
              overlapping SIEM, log and XDR tools means paying twice for
              licenses and twice for the people who manage them.
            </>,
            <>
              <Strong>Negotiate properly.</Strong> Ask for multi-year rate
              locks, a cap on renewal increases and written overage terms.
              Third-party pricing research suggests 20% to 40% off list is
              common on negotiated deals.
            </>,
          ]}
        />
        <H3>Security Data Lake vs. Traditional SIEM Cost</H3>
        <P>
          At high volumes, a security data lake with detections running on top
          can cost a lot less than a traditional SIEM that keeps everything in
          hot storage. The catch is that it takes more engineering to run. The
          savings are only real if you have, or can hire, the people to operate
          it.
        </P>

        <H2 id="low-cost">Low-Cost SIEM Solutions: What You Get at Each Price</H2>
        <P>
          <Strong>
            Low-cost SIEM options include Wazuh Cloud from about $571 a month,
            Elastic Security from about $0.10 per GB ingested, per-employee
            SIEMs from $12 per employee a month and CrowdStrike&apos;s 10 GB/day
            free tier for its endpoint customers.
          </Strong>
        </P>
        <Bullets
          items={[
            <>
              <Strong>Free or open-source (Wazuh, OpenSearch):</Strong> no
              license at all, but you need engineers to deploy, tune and
              maintain it.
            </>,
            <>
              <Strong>Low per-GB rates (Elastic Serverless):</Strong> the
              cheapest published per-GB pricing, with more of the detection
              engineering left to you.
            </>,
            <>
              <Strong>Per-employee SIEM:</Strong> predictable and often the
              most cost-effective option for SMBs with heavy log volume.
            </>,
            <>
              <Strong>Managed SIEM for small businesses:</Strong> a low entry
              price with SOC monitoring included.
            </>,
          ]}
        />
        <P>
          The most cost-effective SIEM isn&apos;t the one with the lowest
          license fee. It&apos;s the one with the lowest three-year total for
          the coverage you actually need. A free SIEM that needs two extra
          hires to run is, in practice, a $370,000-a-year SIEM.
        </P>

        <CtaCard
          label="Build your own SIEM platform"
          side={<Bands />}
          footer={
            <>
              <Button href="/services/custom-siem-development">
                Get a fixed-price estimate
              </Button>
              <Button href="/contact" variant="ghost">
                Talk to an engineer
              </Button>
            </>
          }
        >
          <CtaHead
            eyebrow="Build your own platform"
            title="Leave the Expensive SIEM. Own the One That Replaces It."
          />
          <CtaBody>
            WhyCrew engineers a SIEM around your log sources, your tenants and
            your compliance rules, then hands it over: source code,
            infrastructure and documentation. It&apos;s a fixed price, about 12
            weeks to production, with no per-GB license after that.
          </CtaBody>
        </CtaCard>

        <H2 id="mssp">For MSSPs: Pricing Managed SIEM to Your Clients</H2>
        <P>
          If you run an MSSP, you&apos;re on both sides of this problem. You
          pay your SIEM vendor per GB, and you charge your clients per endpoint
          or per user.
        </P>
        <P>
          That mismatch is where margin quietly disappears. Your vendor bill
          grows with each client&apos;s log volume, but what you charge them
          stays flat per endpoint. One noisy client (a chatty firewall, a
          misconfigured app, a busy month) can wipe out the margin on that
          account without anyone noticing until the invoice arrives.
        </P>
        <P>
          What helps: per-tenant ingestion limits, data tiering and client
          pricing tiers that account for log volume, not just endpoint count.
          Our guide to{" "}
          <A href="/blog/mssp-infrastructure-optimization">
            MSSP infrastructure optimization
          </A>{" "}
          walks through each of these in practice. The structural fix is
          owning the platform, so a new client adds infrastructure cost rather
          than a per-GB license. That&apos;s the model behind our{" "}
          <A href="/services/mssp-engineering-partner">
            MSSP engineering partner service
          </A>
          .
        </P>

        <CtaCard label="For MSSPs" side={<MarginChart />}>
          <CtaHead
            eyebrow="For MSSPs"
            title="Add Clients Without Adding License Cost."
          />
          <CtaBody>
            On a platform you own, a new tenant adds infrastructure cost, not a
            per-GB invoice, and a noisy client stops eating your margin.
            WhyCrew builds multi-tenant SIEM platforms for MSSPs, then hands
            over the code and infrastructure so the platform is yours.
          </CtaBody>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button href="/services/mssp-engineering-partner">
              See the MSSP engineering partner service
            </Button>
          </div>
        </CtaCard>

        <H2 id="glossary">Key Pricing Terms</H2>
        <Glossary />

        <H2 id="faq">Frequently Asked Questions</H2>
        <div className="mt-6">
          <FaqAccordion faqs={FAQS} columns={1} />
        </div>
      </ArticleShell>
    </>
  );
}
