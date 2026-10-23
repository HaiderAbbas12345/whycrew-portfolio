import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArticleShell, type TocEntry } from "@/components/blog/article-shell";
import { Bullets, DataTable, H2, H3, P, Strong } from "@/components/blog/prose";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/ui/faq";
import { breadcrumbLd, faqLd, type Faq } from "@/lib/jsonld";
import { breadcrumbLabel, postBySlug, postPath } from "@/lib/blog";
import { CTA_HREF, ROBOTS, SITE } from "@/lib/site";
import { ogImage, ogImageLd } from "@/lib/og";
import { MsspPricingCalculator } from "./mssp-pricing-calculator";

const post = postBySlug("mssp-pricing")!;
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
  { id: "quick-answer", label: "Typical MSSP Pricing" },
  { id: "price-list", label: "2026 Price List" },
  { id: "by-size", label: "Cost by Company Size" },
  { id: "why-quotes-differ", label: "Why Quotes Differ" },
  { id: "pricing-models", label: "Pricing Models" },
  { id: "vendor-rates", label: "Published Vendor Rates" },
  { id: "included", label: "What's Included vs Extra" },
  { id: "cost-factors", label: "Key Cost Factors" },
  { id: "calculator", label: "MSSP Pricing Calculator" },
  { id: "in-house", label: "MSSP vs In-House SOC" },
  { id: "for-mssps", label: "For MSSPs" },
  { id: "budget", label: "Budgeting and Comparing Quotes" },
  { id: "faq", label: "FAQ" },
];

const FAQS: Faq[] = [
  {
    q: "How Much Does an MSSP Cost Per Month?",
    a: "Most small and mid-size US businesses pay $2,000 to $25,000 a month for an MSSP in 2026. Companies with up to 100 employees typically pay $2,000 to $7,000, those with 100 to 1,000 employees pay $7,000 to $25,000, and large enterprises often pay $25,000 to more than $100,000 a month.",
  },
  {
    q: "How Much Do MSSPs Charge Per User?",
    a: "A full MSSP usually charges $50 to $200 or more per user a month. Published MDR-only rates are much lower, from about $5 to $28 per user, because they cover endpoint detection and response rather than full security management, compliance reporting and tool administration.",
  },
  {
    q: "How Much Do MSSPs Charge Per Endpoint?",
    a: "MDR typically costs $8 to $30 per endpoint a month. Industry benchmarks put the average MSSP price at $45 per endpoint for basic services and $73 per endpoint for premium services, while servers and firewalls are usually priced higher than laptops.",
  },
  {
    q: "What Is the Most Common MSSP Pricing Model?",
    a: "Per-user and per-device pricing are the most common MSSP pricing models, followed by tiered packages. Per-user suits companies where each person has several devices, and per-device suits server-heavy sites with few staff. To compare them, multiply the per-endpoint price by the number of endpoints per user.",
  },
  {
    q: "How Much Does a Managed SOC Cost?",
    a: "Managed SOC pricing usually follows MSSP rates of $50 to $200 per user or $8 to $30 per endpoint a month. Cyberuptive puts a 50-person company with 75 endpoints at roughly $4,000 to $15,000 a month, while a fully staffed enterprise SOC built in-house can cost $2 million to $4 million a year.",
  },
  {
    q: "What Is the Average Monthly Cost of Security Monitoring?",
    a: "Monitoring with a vendor SOC can start at around $20 per user a month when you buy managed tools, while a full 24/7 managed security service usually runs $50 to $200 per user. Business-hours monitoring costs less than true 24/7/365 coverage, which needs about five analysts per seat.",
  },
  {
    q: "Are There Onboarding Fees for Managed Security Services?",
    a: "Often, yes. One-time onboarding fees range from $0 to $5,000 or more, depending on how many systems need connecting and how much tuning is required. Some vendors, including Huntress and Field Effect, say they charge no setup fee, so it's worth asking every provider.",
  },
  {
    q: "Is Incident Response Included in an MSSP Contract?",
    a: "Sometimes. Many contracts include triage and escalation but bill hands-on response by the hour, often $150 to $400 an hour according to published pricing guides. Check how many response hours are included before you compare monthly fees.",
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
    about: { "@type": "Thing", name: "Managed security services pricing" },
    image: ogImageLd(PATH),
    articleSection: post.cluster,
    keywords: post.topics.join(", "),
  };
}

/** The calculator, as the design declares it. */
function calculatorLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "MSSP Pricing Calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    url: `${SITE.url}${PATH}#calculator`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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

/** Quick-answer box under the first heading. */
function Answer() {
  const items: [string, string][] = [
    ["Up to 100 employees:", "$2,000 to $7,000 a month"],
    ["100 to 1,000 employees:", "$7,000 to $25,000 a month"],
    ["Enterprises:", "$25,000 to $100,000+ a month"],
    ["Full MSSP:", "$50 to $200 per user a month"],
    ["MDR only:", "$8 to $30 per endpoint a month"],
  ];
  return (
    <div className="mt-5 rounded-lg border border-line bg-surface p-5 sm:p-[26px]">
      <p className={EYEBROW}>Quick answer</p>
      <p className="mt-3 text-[16.5px] leading-[1.65] text-body sm:text-[17px]">
        In 2026, managed security services pricing for most small and mid-size
        US businesses runs $2,000 to $25,000 a month. Here&apos;s how that
        breaks down:
      </p>
      <ul className="mt-3 grid gap-1 pl-[1.15em]">
        {items.map(([k, val]) => (
          <li
            key={k}
            className="list-disc text-[15.5px] leading-[1.7] text-body marker:text-accent"
          >
            <Strong>{k}</Strong> {val}
          </li>
        ))}
      </ul>
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

/* Service-level bar chart: 720×290 viewBox, same geometry as the design. */

const CH_HEAD = "fill-bright text-[17px] font-bold";
const CH_TICK = "fill-faint font-mono text-[11px]";
const CH_LABEL = "fill-body text-[13px] font-medium";
const CH_VALUE = "fill-bright text-[14px] font-bold";
const PLAT = "fill-[#0d9488] hover:opacity-85";
const STAFF = "fill-[#c2702c] hover:opacity-85";

function ServiceLevelChart() {
  const ticks = [
    { x: 20, label: "$0" },
    { x: 175, label: "$10K" },
    { x: 330, label: "$20K" },
    { x: 485, label: "$30K" },
    { x: 640, label: "$40K" },
  ];
  const bars = [
    { label: "Managed tools", y: 62, x: 46.6, w: 6, rx: 3, cls: PLAT, title: "Managed tools: $1,909 a month", vx: 61.6, value: "$1,909" },
    { label: "MDR", y: 112, x: 38.6, w: 51.1, rx: 4, cls: PLAT, title: "MDR: $1,200–$4,500 a month", vx: 97.8, value: "$1,200–$4,500" },
    { label: "Full MSSP", y: 162, x: 97.5, w: 232.5, rx: 4, cls: STAFF, title: "Full MSSP: $5,000–$20,000 a month", vx: 338.0, value: "$5,000–$20,000" },
    { label: "MSSP + managed IT", y: 212, x: 175.0, w: 387.5, rx: 4, cls: STAFF, title: "MSSP + managed IT: $10,000–$35,000 a month", vx: 570.5, value: "$10,000–$35,000" },
  ];
  return (
    <figure className="mt-8 rounded-lg border border-line/70 bg-surface/50 px-4 pt-4 pb-3.5 sm:px-5">
      <svg
        viewBox="0 0 720 290"
        role="img"
        aria-labelledby="lv-t lv-d"
        className="block h-auto w-full overflow-visible"
      >
        <title id="lv-t">Monthly cost by service level for a 100-person company</title>
        <desc id="lv-d">
          Managed tools about $1,909 a month; MDR $1,200 to $4,500; full MSSP
          $5,000 to $20,000; MSSP bundled with managed IT $10,000 to $35,000.
        </desc>
        <text x="20" y="22" className={CH_HEAD}>
          Same 100-person company, four service levels
        </text>
        {ticks.map((t, i) => (
          <g key={t.label}>
            <line x1={t.x} y1="44" x2={t.x} y2="256" className="stroke-line" />
            <text
              x={t.x}
              y="276"
              textAnchor={i === 0 ? "start" : "middle"}
              className={CH_TICK}
            >
              {t.label}
            </text>
          </g>
        ))}
        {bars.map((b) => (
          <g key={b.label}>
            <text x="20" y={b.y} className={CH_LABEL}>
              {b.label}
            </text>
            <rect x={b.x} y={b.y + 8} width={b.w} height="22" rx={b.rx} className={b.cls}>
              <title>{b.title}</title>
            </rect>
            <text x={b.vx} y={b.y + 24} className={CH_VALUE}>
              {b.value}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-2 font-mono text-[12px] leading-relaxed text-faint">
        Monthly estimate for 100 users and 150 endpoints. Managed tools from
        Huntress list rates; other levels from the per-user and per-endpoint
        ranges in this article.
      </figcaption>
    </figure>
  );
}

function Included() {
  const cols = [
    {
      label: "Usually in the monthly fee",
      mark: "✓",
      tone: "text-accent",
      items: [
        "24/7 or business-hours monitoring",
        "Alert triage and escalation",
        "Standard log sources",
        "Monthly reports",
        "Default log retention, often 90 days to 1 year",
      ],
    },
    {
      label: "Often billed separately",
      mark: "+",
      tone: "text-warn",
      items: [
        "Onboarding, $0 to $5,000+",
        "Tool licenses, when not bundled",
        "Incident response hours, $150 to $400 an hour",
        "Extra log retention and custom connectors",
        "vCISO, pen testing and compliance audits",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorLd()) }}
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
            <time dateTime={post.datePublished}>Published October 21, 2026</time>
            <span>Prices checked October 2026</span>
            <span>{post.readTime}</span>
          </span>,
        ]}
      >
        <H2 id="quick-answer">Typical MSSP Pricing for US Businesses</H2>
        <Answer />
        <P>
          Those ranges are wide because the scope of the service varies so much.
          Three things move the price most:
        </P>
        <Bullets
          items={[
            "Who watches your systems at 3 a.m.",
            "Whether they fix problems or only report them",
            "How much log data they have to process",
          ]}
        />
        <P>
          Below, we price a real 100-person company using published vendor
          rates. Each service level covers a bigger share of{" "}
          <A href="/blog/what-is-an-mssp">what an MSSP does day to day</A>, and
          that&apos;s what the price reflects.
        </P>

        <H2 id="price-list">MSSP Price List for 2026</H2>
        <P>
          Most MSSPs don&apos;t publish a managed security services price list,
          so we pulled one together from vendor rate cards and the pricing
          guides providers publish themselves. Treat it as a planning guide, not
          a quote.
        </P>
        <DataTable
          head={["Service", "Typical price (USD)", "How it's billed"]}
          rows={[
            ["Managed security tools with a vendor SOC", "About $20 per user a month", "Per user, endpoint or identity"],
            ["MDR from published vendor rate cards", "$5 to $28 per user, or $8 to $15 per endpoint a month", "Per user or per endpoint"],
            ["Average MSSP, basic services", "$45 per endpoint a month", "Per endpoint"],
            ["Average MSSP, premium services", "$73 per endpoint a month", "Per endpoint"],
            ["Full MSSP service", "$50 to $200+ per user a month", "Per user"],
            ["Security bundled with managed IT", "$100 to $350 per user a month", "Per user"],
            ["One-time onboarding", "$0 to $5,000+", "Flat fee"],
            ["Incident response beyond what's included", "$150 to $400 an hour", "Hourly"],
            ["Virtual CISO retainer", "$3,000 to $10,000+ a month", "Monthly retainer"],
          ]}
        />

        <H2 id="by-size">Average Cost of an MSSP by Company Size</H2>
        <P>
          The average cost of an MSSP is about $2,000 to $7,000 a month for a
          company with up to 100 employees and $7,000 to $25,000 a month for one
          with 100 to 1,000 employees. Headcount is still the best single
          predictor of the bill, and two publishers that track the US market,
          MSSPProviders.io and Meriplex, give planning ranges that mostly agree.
        </P>
        <DataTable
          head={["Company size", "Monthly range (USD)", "Annual equivalent (USD)", "Published by"]}
          rows={[
            ["Up to 100 employees", "$2,000 to $7,000", "$24,000 to $84,000", "MSSPProviders.io"],
            ["50 to 100 users", "$4,000 to $12,000", "$48,000 to $144,000", "Meriplex"],
            ["100 to 250 users", "$8,000 to $30,000", "$96,000 to $360,000", "Meriplex"],
            ["100 to 1,000 employees", "$7,000 to $25,000", "$84,000 to $300,000", "MSSPProviders.io"],
            ["250 to 750 users", "$20,000 to $100,000+", "$240,000 to $1.2M+", "Meriplex"],
            ["Over 1,000 employees", "$25,000 to $100,000+", "$300,000 to $1.2M+", "MSSPProviders.io"],
          ]}
        />
        <P>
          You&apos;ll also see a tighter version quoted, $2,000 to $5,000 a month
          for small businesses and $5,000 to $20,000 for mid-size ones. It comes
          from the same publisher&apos;s FAQ and sits inside the ranges above.
          Either way, treat these as directional estimates. Cyberuptive, for
          example, puts a 50-person company with 75 endpoints at roughly $4,000
          to $15,000 a month for managed SOC coverage, which shows how much one
          size band can stretch.
        </P>
        <P>
          Two companies with the same headcount can still land at opposite ends
          of a band. A 60-person accounting firm running laptops and Microsoft
          365 is a very different job from a 60-person manufacturer with three
          plants, a dozen servers and machines on the factory floor network.
        </P>

        <H2 id="why-quotes-differ">Why Two MSSP Quotes Can Differ by Ten Times</H2>
        <P>
          MSSP quotes for the same company can differ by ten times because
          &quot;managed security&quot; covers at least four different services
          sold under one name. Once you know which one a quote describes, most
          of the pricing confusion goes away.
        </P>
        <P>Here&apos;s what each level includes and costs:</P>
        <Bullets
          items={[
            <>
              <Strong>Managed tools (about $20 per user):</Strong> endpoint,
              identity and SIEM tools with a vendor SOC watching alerts. Works if
              your own IT team can act on them.
            </>,
            <>
              <Strong>MDR ($8 to $30 per endpoint):</Strong> a team that
              investigates and contains threats on your devices, with less
              attention on cloud, network and compliance.
            </>,
            <>
              <Strong>Full MSSP ($50 to $200 per user):</Strong> 24/7 monitoring
              of everything, tool management and audit reports. It&apos;s what
              most companies without security staff need.
            </>,
            <>
              <Strong>MSSP plus managed IT ($100 to $350 per user, per VC3):</Strong>{" "}
              security bundled with help desk and device management. It isn&apos;t
              a fair comparison if you already have an IT provider.
            </>,
          ]}
        />
        <P>
          The easiest way to place a quote on this ladder is to ask who responds
          when an alert turns out to be real. If the answer is &quot;we notify
          you,&quot; you&apos;re buying the bottom rung, whatever the proposal
          calls it.
        </P>
        <ServiceLevelChart />

        <H2 id="pricing-models">Common Pricing Models for Managed Security Services</H2>
        <P>
          MSSP pricing models decide how security services, monitoring and tools
          are billed, and most providers use one of six: per user, per device,
          tiered packages, usage-based, monitoring-only or per incident. The
          model matters as much as the rate, because it decides what makes your
          bill grow.
        </P>
        <DataTable
          head={["Pricing model", "You pay for", "Typical price (USD)", "Your bill grows when"]}
          rows={[
            ["Per user or seat", "Each employee, with all their devices covered", "$50 to $200+ per user a month", "You hire"],
            ["Per device or endpoint", "Each laptop, server, firewall or cloud workload", "$8 to $30 for MDR; $45 to $73 on average for MSSP services", "You add hardware or workloads"],
            ["Tiered package", "A basic, standard or premium bundle", "Entry tiers from about $2,000 a month", "You move up a tier"],
            ["Usage-based (GB or EPS)", "Log volume ingested, or events per second", "Scoped per client", "Your log volume grows"],
            ["Monitoring-only", "Watching and alerting, with response billed separately", "Lower monthly fee", "An incident happens"],
            ["Per incident", "Investigation or response when something goes wrong", "$150 to $400 an hour", "Incidents happen"],
          ]}
        />
        <H3>Per-User Pricing</H3>
        <P>
          Per-user pricing is the most common model for full MSSP services. You
          pay for each employee, and all their devices are covered, so your bill
          grows when you hire. It suits office-based companies where everyone
          has a laptop, a phone and a cloud identity. Before you compare, check
          how the provider counts contractors, service accounts and shared
          mailboxes, since they can quietly inflate the user count.
        </P>
        <H3>Per-Device or Per-Endpoint Pricing</H3>
        <P>
          Per-device pricing is typical for MDR and endpoint-focused services. It
          suits server-heavy or industrial sites with few staff. The MSSP Alert
          pricing benchmark puts the average at $45 per endpoint a month for
          basic services and $73 for premium ones. Ask for a rate per device
          type, because servers and firewalls usually cost a lot more than
          laptops.
        </P>
        <H3>Tiered or Bundled Pricing</H3>
        <P>
          Tiered packages, often sold as good, better and best, make buying easy
          but hide where the value is. Tiers usually differ in log retention and
          support hours. TrustNet&apos;s four tiers, for instance, range from 15
          days of hot storage with 8/5 support up to 180 days of hot storage
          with 24/7 support, and the company quotes a starting price of $2,275 a
          month for a business with 25 IPs. Response and threat hunting are
          often saved for the top tier, so a cheaper tier may just be an
          alerting service.
        </P>
        <H3>Usage-Based Pricing</H3>
        <P>
          Usage-based pricing charges per gigabyte of log data ingested, per log
          source, or per event per second (EPS). It&apos;s common for SIEM-led
          services, and it&apos;s the model most likely to surprise you at
          renewal. Log volume grows every time you add a cloud app or a noisy
          firewall, even if headcount stays flat. Over a three-year contract,{" "}
          <A href="/blog/siem-cost-licensing-vs-custom-built">
            per-GB SIEM licensing costs
          </A>{" "}
          can grow much faster than the business they protect.
        </P>
        <H3>Monitoring-Only and Per-Incident Pricing</H3>
        <P>
          Monitoring-only plans charge a lower flat rate to watch your systems
          and send alerts, while hands-on response is billed per incident,
          usually by the hour at roughly $150 to $400. That&apos;s cheaper in a
          quiet month and expensive in a bad one. If an attacker takes over an
          account and investigating it takes 40 hours, response adds $6,000 to
          $16,000 to that month&apos;s bill. Per-incident pricing rarely works as
          a main plan, but it&apos;s common as an add-on. A good test for any
          provider is to ask: if you see ransomware on one of our laptops at 2
          a.m., what do you do in the first 15 minutes, and does it cost extra?
        </P>
        <P>
          Whatever the model, co-managed and fully managed setups sit at
          different points in a provider&apos;s range. With co-managed, your team
          handles part of the work, often during business hours, and the
          provider covers nights and weekends. It&apos;s usually cheaper. Fully
          managed means the provider runs security end to end, and it&apos;s
          priced at the top of the range. Many providers also mix models, for
          example a per-user base rate with a log-volume allowance on top.
        </P>

        <H2 id="vendor-rates">What Published Vendor Rates Tell Us About MSSP Prices</H2>
        <P>
          A handful of security vendors publish their prices, and those rate
          cards are the closest thing the market has to a price floor. Most
          MSSPs don&apos;t publish theirs, which is why buyers have a hard time
          judging whether a quote is reasonable.
        </P>
        <DataTable
          head={["Vendor and product", "Published price (USD)", "Unit and notes"]}
          rows={[
            ["Huntress Managed EDR", "$8.99 list; $7.99 at 100 units", "Per endpoint a month, 24/7 SOC included"],
            ["Huntress Managed ITDR", "$4.80 list; $3.60 at volume", "Per identity a month"],
            ["Huntress Managed SIEM", "$4.00 list; $3.50 at volume", "Per data source a month, 50-seat minimum"],
            ["Huntress Security Awareness Training", "$2.08 list; $1.75 at volume", "Per learner a month"],
            ["eSentire MDR", "$17 to $28", "Per user a month, 10 to 100 users"],
            ["Field Effect MDR", "$5 to $25", "Per user a month"],
            ["UnderDefense MDR", "From $11", "Per device a month"],
            ["CrowdStrike Falcon Go / Pro / Enterprise", "$7.99 / $14.99 / $19.99", "Per device a month; managed tier is quote-only"],
            ["Microsoft Defender for Business", "$3", "Per user a month, billed yearly, up to 300 users"],
          ]}
        />
        <P>
          Now let&apos;s price a typical company with Huntress&apos;s published
          numbers. Say it has 100 employees, 150 endpoints across laptops and
          servers, 100 user identities and about 20 log sources.
        </P>
        <DataTable
          head={["Line item", "Quantity", "Rate (USD)", "Monthly cost (USD)"]}
          rows={[
            ["Managed EDR", "150 endpoints", "$7.99", "$1,198.50"],
            ["Managed identity threat detection", "100 identities", "$3.60", "$360.00"],
            ["Managed SIEM", "50 sources (seat minimum)", "$3.50", "$175.00"],
            ["Security awareness training", "100 learners", "$1.75", "$175.00"],
            [<Strong key="t">Total</Strong>, "", "", <Strong key="v">$1,908.50</Strong>],
          ]}
        />
        <P>
          That works out to about $19 per user, or roughly $22,900 a year.
          Huntress says deployment, integration and day-to-day management
          aren&apos;t included, and that detail matters more than the total.
        </P>
        <H3>Where the Rest of an MSSP&apos;s Fee Goes</H3>
        <P>
          A full MSSP serving the same company might quote $4,000 to $12,000 a
          month. That&apos;s two to six times the tool stack, and it&apos;s easy
          to assume the difference is profit. In our experience building
          platforms for providers, it mostly isn&apos;t.
        </P>
        <P>The extra money pays for work a rate card leaves out:</P>
        <Bullets
          items={[
            <>
              <Strong>Onboarding and tuning:</Strong> connecting your systems and
              tuning detection rules so analysts aren&apos;t buried in false
              alarms.
            </>,
            <>
              <Strong>Hands-on response:</Strong> isolating a laptop, locking a
              compromised account and cleaning up afterwards.
            </>,
            <>
              <Strong>Tool management:</Strong> patching and configuring
              firewalls, VPNs, email filters and vulnerability scanners.
            </>,
            <>
              <Strong>Compliance evidence:</Strong> the reports auditors and
              cyber insurers ask for.
            </>,
            <>
              <Strong>A named contact:</Strong> someone who knows your business
              and shows up to quarterly reviews.
            </>,
          ]}
        />

        <H2 id="included">What a Managed Security Contract Includes and What Costs Extra</H2>
        <P>
          The monthly fee usually covers monitoring, alert triage, a standard
          set of log sources, monthly reports and a default log retention
          period, often somewhere between 90 days and a year. What it leaves out
          is just as predictable, and these extras are where real budgets go
          wrong.
        </P>
        <Included />
        <P>
          Onboarding is the first one. Published figures range from nothing at
          all, since Huntress and Field Effect both say they charge no setup
          fee, to $0 to $5,000 or more in Cyberuptive&apos;s guide, and eSentire
          charges a $2,500 annual launch fee. Tool licenses may be passed
          through separately if they aren&apos;t bundled. Custom connectors for
          in-house or legacy apps, longer log retention and incident response
          beyond the first triage are often billed on top. Project work costs
          more again: Corsica Technologies puts virtual CISO retainers at $3,000
          to $10,000 or more a month, penetration testing at $10,000 to $30,000
          a year and compliance audit fees at $15,000 to $50,000.
        </P>
        <P>Contract terms decide the rest. Before you sign, check these:</P>
        <Bullets
          items={[
            <>
              <Strong>Term length:</Strong> 12 months is standard; 24 or 36
              months, or paying a year upfront, often earns a 10% to 20%
              discount.
            </>,
            <>
              <Strong>Seat minimums:</Strong> Huntress, for example, requires 50
              seats per product for direct buyers.
            </>,
            <>
              <Strong>Billable units:</Strong> a virtual machine, container host
              or shared mailbox can each count, so the same company might be 100
              units to one provider and 300 to another.
            </>,
            <>
              <Strong>Incident response hours:</Strong> how many are included,
              and what each extra hour costs.
            </>,
            <>
              <Strong>Renewal increases:</Strong> whether there&apos;s a cap.
            </>,
            <>
              <Strong>Exit terms:</Strong> whether you can take your logs,
              detection rules and reports with you.
            </>,
          ]}
        />

        <H2 id="cost-factors">Key Factors That Affect Managed Security Pricing</H2>
        <P>
          Seven things set most of the price: unit count, coverage hours,
          response scope, who owns the technology, cloud footprint, log volume
          and retention, and compliance. Change any one and the quote moves.
        </P>
        <Bullets
          items={[
            <>
              <Strong>Unit count:</Strong> servers, cloud workloads and network
              devices usually cost more than laptops.
            </>,
            <>
              <Strong>Coverage hours:</Strong> real 24/7/365 staffing needs
              several analysts per seat, so it costs far more than 8/5 business
              hours with someone on call.
            </>,
            <>
              <Strong>Response scope:</Strong> a provider that can isolate hosts
              and disable accounts on its own charges more, but stops threats
              much faster at night.
            </>,
            <>
              <Strong>Technology ownership:</Strong> some providers bring their
              own agents and SIEM, which is simpler but ties you to them. Others
              build on tools you already license, such as Microsoft Defender or
              CrowdStrike, which lowers the fee but keeps those licenses on your
              bill. Buyers miss this one most often.
            </>,
            <>
              <Strong>Cloud footprint:</Strong> every AWS, Azure or Google Cloud
              account, and every SaaS platform like Microsoft 365, Google
              Workspace or Salesforce, adds log sources to watch.
            </>,
            <>
              <Strong>Log volume and retention:</Strong> more data kept for
              longer means more storage and processing, and providers pass that
              cost on.
            </>,
            <>
              <Strong>Compliance:</Strong> covered in the next section.
            </>,
          ]}
        />
        <H3>How Compliance Requirements Show Up on the Bill</H3>
        <P>
          Compliance rarely adds a neat percentage to a quote. It adds specific
          work, and every piece of that work costs something. Huntress notes
          that healthcare and financial services firms commonly see 20% to 40%
          premiums for compliance-ready services.
        </P>
        <DataTable
          head={["Rule", "What it requires", "Where it shows up in the price"]}
          rows={[
            ["PCI DSS v4.0.1", "Audit logs kept for at least 12 months, with the last 3 immediately available", "Longer retention and log review"],
            ["HIPAA Security Rule", "Audit logging and access controls, plus a signed Business Associate Agreement", "Logging scope, BAA, reporting"],
            ["SOC 2 Type II", "Evidence that security controls work over an audit period, often 3 to 12 months", "Continuous evidence collection and reports"],
            ["ISO 27001", "A documented information security management system with ongoing monitoring", "Policy support, monitoring records"],
            ["CMMC and NIST SP 800-171", "Protection of controlled unclassified information for defense contractors", "Logging scope, assessment evidence"],
            ["DFARS 252.204-7012", "Cyber incidents reported to the DoD within 72 hours", "Faster incident documentation"],
            ["SEC cybersecurity disclosure rule", "Form 8-K within four business days of deciding an incident is material", "Investigation speed and evidence"],
            ["Federal bank notification rule", "Regulator notified within 36 hours of a significant incident", "Escalation SLAs and documentation"],
          ]}
        />
        <P>
          If any of these apply to you, mention it in your first call with a
          provider. A quote that ignores compliance will look cheaper and then
          grow. Healthcare, finance and defense buyers usually see the most line
          items, because{" "}
          <A href="/blog/what-is-an-mssp">
            MSSPs that support US compliance frameworks
          </A>{" "}
          have to price in retention, reporting and audit evidence from day one.
        </P>

        <H2 id="calculator">How to Calculate Your Own MSSP Cost</H2>
        <P>
          To estimate your own MSSP cost, multiply your users or endpoints by a
          provider&apos;s rate, add one-time and add-on fees, then divide the
          total by your device count to find the effective rate. Here&apos;s how
          that looks for a 100-person company with 150 endpoints, no dedicated
          security staff and nobody on call overnight. That profile points to a
          full MSSP.
        </P>
        <P>
          The MSSP pricing calculator below runs these numbers for your own
          company. Enter your users, endpoints and log sources, pick a service
          level, coverage model, industry and contract type, and it shows a
          monthly and annual range, your effective cost per user and per
          endpoint, and how all four service levels compare.
        </P>
        <MsspPricingCalculator />
        <DataTable
          head={["Pricing approach", "Calculation", "Monthly (USD)", "Annual (USD)"]}
          rows={[
            ["Per user", "100 users × $50 to $200", "$5,000 to $20,000", "$60,000 to $240,000"],
            ["Per endpoint, MDR level", "150 endpoints × $8 to $30", "$1,200 to $4,500", "$14,400 to $54,000"],
            ["Per endpoint, MSSP average", "150 endpoints × $45 to $73", "$6,750 to $10,950", "$81,000 to $131,400"],
            ["Managed tools only", "Vendor price stack above", "About $1,900", "About $22,900"],
          ]}
        />
        <P>
          On top of the monthly fee, ask for onboarding as a separate one-time
          line, and price any extra retention, response hours or testing you
          know you&apos;ll need. Then divide the full monthly total by your
          device count. That effective per-device rate is the number to compare
          across providers, and it&apos;s often noticeably higher than the
          advertised base rate. Finally, rerun the numbers at the size you
          expect to be in a year, since headcount and log volume both tend to
          grow during a contract.
        </P>
        <H3>Comparing a Per-User Quote With a Per-Endpoint Quote</H3>
        <P>
          Providers quote in different units, which makes comparing them harder
          than it should be. The fix is one simple conversion: multiply the
          per-endpoint price by the number of endpoints per user. With 150
          endpoints and 100 users, that&apos;s 1.5 endpoints per person, so a
          $45 per-endpoint quote is really $67.50 per user, and a $73 quote is
          $109.50. Now both sit on the same scale as a per-user offer. Before you
          convert, check what each provider counts as an endpoint. Servers,
          virtual machines and cloud workloads are where definitions differ
          most.
        </P>

        <CtaCard
          label="For MSSPs: rent versus own"
          eyebrow="Running an MSSP?"
          title="Your Platform Bill Shouldn't Grow Faster Than Your Clients."
          body="Every figure in that calculator is what your clients pay you. If your own SIEM bill rises per gigabyte while they pay per user, your margin shrinks with every noisy tenant. WhyCrew builds the white-label platform you own: one fixed-price build, then infrastructure cost instead of license fees."
          side={<Ledger />}
        >
          <Button href={CTA_HREF}>Get a fixed-price platform estimate</Button>
        </CtaCard>

        <H2 id="in-house">Is an MSSP Cheaper Than Building an In-House SOC?</H2>
        <P>
          For most companies under about 1,000 employees, an MSSP is cheaper
          than an in-house SOC by a wide margin. It comes down to the math of
          round-the-clock staffing.
        </P>
        <StaffMath
          rows={[
            { n: "8,760", body: "hours in a year that one 24/7 seat has to cover" },
            { n: "~1,800", body: "productive hours one full-time analyst works after leave and training" },
            { n: "≈ 5", body: "analysts needed to keep one seat staffed around the clock" },
            { n: "$129,180", body: "median US information security analyst pay, May 2025 (BLS)" },
            { n: "$645,900", body: "base pay for five analysts per year, before benefits, tools or a manager" },
          ]}
        />
        <P>
          A year has 8,760 hours. A full-time analyst puts in roughly 1,800
          productive hours after leave, training and sick days, so staffing one
          seat around the clock takes about five people. The US Bureau of Labor
          Statistics put median pay for an information security analyst at
          $129,180 in May 2025. Five analysts at that rate cost $645,900 a year
          in base pay alone, before benefits, a manager, training or a single
          security tool. A full MSSP for a 100-person company typically costs
          $60,000 to $240,000 a year. At enterprise scale the gap gets bigger
          still: Cyberuptive estimates a fully staffed, enterprise-grade SOC at
          $2 million to $4 million a year once salaries, tooling and management
          are included.
        </P>
        <P>
          Hiring is slow, too. The BLS expects jobs for these analysts to grow
          21% between 2025 and 2035, much faster than average, so experienced
          people stay hard to find and harder to keep. Benefits, tools and
          turnover push the real cost well past salary.
        </P>
        <P>
          An in-house team still makes sense once you&apos;re big enough to keep
          analysts busy, need deep knowledge of unusual internal systems, or
          face rules that demand tight control over where data lives. Plenty of
          mid-size companies split the difference with co-managed security,
          keeping one or two security people on staff and buying overnight
          coverage.
        </P>

        <H2 id="for-mssps">For MSSPs: The Cost Problem Behind These Prices</H2>
        <P>
          Many MSSPs bill clients per user but pay their SIEM vendor per
          gigabyte of logs, so when a client adds a cloud app or a chatty
          firewall, the provider&apos;s costs rise while the invoice stays flat.
          That&apos;s a big reason prices climb at renewal. Providers protect
          their margin by adding a log-volume allowance to per-user pricing,
          filtering logs before they reach expensive analytics, and{" "}
          <A href="/blog/mssp-infrastructure-optimization">
            cutting MSSP infrastructure cost per client
          </A>
          .
        </P>
        <P>
          The longer-term fix is owning the platform instead of renting it, so a
          new client adds infrastructure cost rather than another license tier.
          WhyCrew&apos;s engineers build white-label SIEM and SOC platforms for
          MSSPs for a one-time, fixed price and hand over the source code, and
          an{" "}
          <A href="/services/mssp-engineering-partner">
            MSSP engineering partner
          </A>{" "}
          can build that platform alongside your team. We don&apos;t sell
          managed security services to end clients, so the buyer advice in this
          article is provider-neutral.
        </P>

        <CtaCard
          label="For MSSPs"
          eyebrow="For MSSPs"
          title="Add Clients Without Adding License Cost."
          body="On a platform you own, a new tenant adds infrastructure cost, not a per-GB invoice, and a noisy client stops eating your margin. WhyCrew builds multi-tenant SIEM and SOC platforms for MSSPs, then hands over the code and infrastructure."
          side={<MarginChart />}
        >
          <Button href={CTA_HREF}>Talk to an engineer</Button>
        </CtaCard>

        <H2 id="budget">How to Budget and Compare MSSP Quotes</H2>
        <P>
          Start with the level of service you need, then hold every quote to
          that level. For most small and mid-size US companies, that&apos;s a
          full MSSP somewhere between $2,000 and $25,000 a month, depending on
          headcount, coverage hours and how much hands-on response you want
          included.
        </P>
        <P>When you request quotes:</P>
        <Bullets
          items={[
            "Send every provider the same brief: users, endpoints by type, cloud accounts, log sources, compliance rules, coverage hours and whether you need active response.",
            "Ask for prices per user, with every exclusion priced separately.",
            "Compare three-year totals, not first-month fees.",
            "Get mean time to detect (MTTD) and mean time to respond (MTTR) commitments in writing.",
            "Confirm the SOC is staffed 24/7 by the provider's own people.",
            "Ask who owns your logs if you leave.",
          ]}
        />
        <P>Before you ask for quotes, spend ten minutes on three questions:</P>
        <Bullets
          items={[
            "Who on your team would handle a critical alert at 2 a.m. on a Sunday?",
            "Which regulators, insurers or customers expect proof of continuous monitoring?",
            "Which security tools are you already paying for, and are they actually set up?",
          ]}
        />
        <P>
          Your answers place you on the price ladder above and make every
          proposal much easier to compare. If you&apos;re still deciding whether
          to outsource at all, knowing{" "}
          <A href="/blog/what-is-an-mssp">
            when a business actually needs an MSSP
          </A>{" "}
          will settle it faster than any price list.
        </P>

        <H2 id="faq">Frequently Asked Questions</H2>
        <div className="mt-6">
          <FaqAccordion faqs={FAQS} columns={1} />
        </div>
      </ArticleShell>
    </>
  );
}
