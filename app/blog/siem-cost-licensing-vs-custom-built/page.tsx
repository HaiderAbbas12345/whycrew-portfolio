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
  Strong,
} from "@/components/blog/prose";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/ui/faq";
import { breadcrumbLd, faqLd, type Faq } from "@/lib/jsonld";
import { breadcrumbLabel, postBySlug, postPath } from "@/lib/blog";
import { ROBOTS, SITE } from "@/lib/site";
import { ogImage, ogImageLd } from "@/lib/og";
import { SiemCostCalculator } from "./siem-cost-calculator";
import { authorLd } from "@/lib/authors";

const post = postBySlug("siem-cost-licensing-vs-custom-built")!;
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
  { id: "quick-answer", label: "How Much Does A SIEM Cost?" },
  { id: "calculator", label: "Calculate Your Own SIEM Cost" },
  { id: "by-size", label: "What Small, Mid-Size And Large Companies Pay For A SIEM" },
  { id: "pricing-models", label: "How SIEM Vendors Charge You" },
  { id: "vendor-prices", label: "What Top SIEM Vendors Charge In 2026" },
  { id: "included", label: "What's Included In The Price And What Costs Extra" },
  { id: "cost-drivers", label: "What Makes Your SIEM Bill Go Up?" },
  { id: "tco", label: "The Full Cost Of Running A SIEM, Beyond The License" },
  { id: "worth-it", label: "Is A SIEM Worth The Cost?" },
  { id: "pricing-fit", label: "Which Pricing Model Fits Your Company?" },
  { id: "managed-siem-pricing", label: "How Much Does A Managed SIEM Pricing?" },
  { id: "budgeting", label: "How To Budget For A Managed SIEM Service" },
  { id: "owning", label: "When Owning Your SIEM Costs Less" },
  { id: "reduce-cost", label: "How To Lower Your SIEM Bill Without Losing Visibility" },
  { id: "faq", label: "Frequently Asked Questions About SIEM Pricing" },
];

const FAQS: Faq[] = [
  {
    q: "Is SIEM Billed Monthly Or Yearly?",
    a: "It depends on the vendor. Cloud SIEMs usually bill usage every month, but many charge less if you commit for a year. Datadog Cloud SIEM, for example, lists $5 per GB analyzed on annual billing and $7.50 per GB on demand. Self-hosted licenses such as Graylog Enterprise are sold per year. Managed SIEM providers bill a monthly fee, usually on a fixed-term contract.",
  },
  {
    q: "Do Managed SIEM Providers Charge For Data Overages?",
    a: "Many do. Per-GB and hybrid contracts usually include a log allowance, and anything above it is billed at an overage rate. Before you sign, ask three things: the overage price per GB, whether a spike during an incident counts against you, and whether usage is measured each month or averaged over the year. Averaging over the year is almost always cheaper for you.",
  },
  {
    q: "Can You Lower Your SIEM Bill After You Sign?",
    a: "On pay-as-you-go plans, yes. Filter out noisy logs and the next invoice drops. Committed plans are harder to change, because a commitment tier usually can't be reduced for at least a month and annual licenses stay fixed until renewal. Measure your real log volume during a trial before you commit, not after.",
  },
  {
    q: "Does A Managed SOC Cost More Than Managed SIEM?",
    a: "Usually, because it covers more. Managed SIEM is mainly the platform plus alert monitoring, and it typically runs $5,000 to $15,000 a month for a mid-market company. A managed SOC adds incident response, threat hunting and often endpoint detection, so quotes for the same company tend to be higher. Compare what each provider is allowed to do during an incident, not just the service name.",
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
    author: authorLd(post.author),
    publisher: { "@id": `${SITE.url}/#organization` },
    image: ogImageLd(PATH),
    articleSection: post.cluster,
    keywords: post.topics.join(", "),
  };
}

/* ------------------------------------------------- page-local design blocks */

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

/** The TCO formula, set apart from the body text as in the content doc. */
function Formula() {
  return (
    <p className="mt-4 rounded-lg border border-line/70 bg-surface/50 px-5 py-4 font-mono text-[14px] leading-[1.9] text-body">
      <Strong>Annual SIEM TCO</Strong> = license or ingestion fees + retention
      storage + feature add-ons + deployment (year one) + integrations and
      tuning + staff + overage and egress
    </p>
  );
}

function CtaCard({
  label,
  title,
  body,
  children,
}: {
  label: string;
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <aside
      aria-label={label}
      className="relative mt-10 rounded-lg border border-accent/30 bg-gradient-to-br from-accent/8 via-surface/60 to-surface/60 p-6 sm:p-7"
    >
      <span aria-hidden className="absolute -top-px left-7 h-0.5 w-14 bg-accent" />
      <h3 className="text-[1.4rem] font-semibold leading-tight tracking-tight text-bright">
        {title}
      </h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-body">{body}</p>
      <div className="mt-5 flex flex-wrap gap-2.5">{children}</div>
    </aside>
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
        notes={["Prices checked November 2026"]}
      >
        <Lead>
          SIEM cost in 2026 runs about $30,000 to $200,000 a year for a small
          business, $150,000 to $800,000 for a mid-market organization and $1
          million to $5 million+ for an enterprise, including the staff to run
          it. Cloud SIEM list prices range from $0.09 to $5.95 per GB of logs
          ingested, and a managed SIEM service typically costs $3,000 to
          $15,000 a month for small and mid-size businesses.
        </Lead>
        <P>
          Most SIEM quotes show one number the license. The real cost also
          includes storage, deployment and the people who watch the alerts,
          and together those lines usually add up to more than the license
          itself.
        </P>
        <P>
          A{" "}
          <A href="/blog/what-is-siem">
            SIEM (security information and event management)
          </A>{" "}
          platform collects, stores and analyzes security logs so a team can
          detect threats, investigate incidents and pass audits.
        </P>
        <P>
          Last updated November 11, 2026. Every price below comes from the
          vendor&apos;s own pricing page or its AWS Marketplace listing. SIEM
          vendors change their billing meters often, so many prices still
          quoted online are out of date.
        </P>

        {/* ------------------------------------------------------------ 1 */}
        <H2 id="quick-answer">How Much Does A SIEM Cost?</H2>
        <P>
          Those totals are built from a few unit costs that show up on almost
          every SIEM quote:
        </P>
        <DataTable
          head={["Question", "Short answer (2026, USD)", "Basis"]}
          rows={[
            [
              "SIEM cost per GB",
              "$0.09 to $5.95 per GB ingested",
              "Vendor pricing pages and AWS Marketplace listings, Nov 2026",
            ],
            [
              "SIEM cost per employee",
              "$12 to $21 per employee a month",
              "Vendor pricing pages, Nov 2026",
            ],
            [
              "Cost of one security analyst",
              "$129,180 median salary; about $185,000 with benefits",
              "U.S. Bureau of Labor Statistics, May 2025",
            ],
          ]}
        />

        {/* ------------------------------------------------------------ 2 */}
        <H2 id="calculator">Calculate Your Own SIEM Cost</H2>
        <P>
          We built this because nearly every pricing question we get comes
          down to five inputs: how many GB a day, how long you keep logs
          searchable, how many employees, how many endpoints, and who&apos;s
          watching the alerts.
        </P>
        <P>
          Enter yours, and you&apos;ll see an annual estimate for four common
          pricing models side by side, with and without the cost of your own
          analysts. It uses the same vendor list prices and BLS analyst pay we
          quote below. Treat the result as a budgeting range, not a quote.
        </P>
        <SiemCostCalculator />

        <H3>What A 300-Person Company Would Pay At 50 GB A Day</H3>
        <P>
          We priced one example company: 300 employees, 50 GB of logs a day,
          90 days searchable. We priced the platform alone, then added two
          in-house analysts at about $184,500 each fully loaded.
        </P>
        <DataTable
          head={[
            "Option (list price, Nov 2026)",
            "Platform per year",
            "With 2 analysts",
          ]}
          rows={[
            [
              "Elastic Security Serverless, Complete ($0.11/GB ingest + $0.019/GB-month kept)",
              "$3,034",
              "$372,119",
            ],
            [
              "Splunk Enterprise term license, self-managed ($961.40 per GB/day a year; license only)",
              "$48,070",
              "$417,156",
            ],
            [
              "Per-employee SIEM at $16/employee/month (Blumira Respond)",
              "$57,600",
              "$426,686",
            ],
            [
              "Microsoft Sentinel, 50 GB promotional commitment tier ($161.25/day)",
              "$58,856",
              "$427,942",
            ],
            [
              "Microsoft Sentinel, pay-as-you-go ($4.30/GB, East US)",
              "$78,475",
              "$447,561",
            ],
            [
              "Datadog Cloud SIEM ($5/GB analyzed, annual billing)",
              "$91,250",
              "$460,336",
            ],
            [
              "CrowdStrike Falcon Next-Gen SIEM ($5.95/GB, pay-as-you-go)",
              "$108,588",
              "$477,673",
            ],
          ]}
        />
        <P>
          The most expensive platform costs about 36 times the cheapest. Add
          two analysts and every option lands between $372,000 and $478,000.
          For most teams, the staffing decision moves the budget far more than
          the vendor decision does.
        </P>
        <P>
          Keep in mind that the cheapest per-GB rate leaves more detection
          engineering to you, and the analyst column only covers business
          hours. Round-the-clock coverage changes the math completely, as the
          staffing section below shows.
        </P>

        <H3>What You&apos;ll Pay Per Month At 5, 20, 50 And 100 GB A Day</H3>
        <P>
          Most small and mid-size teams send somewhere between 5 and 50 GB of
          logs a day. The table shows the monthly platform cost at each
          volume, based on vendor list prices for a 30-day month.
        </P>
        <DataTable
          head={[
            "Daily log volume",
            "Elastic Security Serverless, Complete (ingest only)",
            "Microsoft Sentinel, pay-as-you-go",
            "Microsoft Sentinel, commitment tier",
            "Datadog Cloud SIEM",
            "CrowdStrike Falcon Next-Gen SIEM",
          ]}
          rows={[
            ["5 GB", "$17", "$645", "Not offered below 50 GB", "$750", "$893"],
            ["20 GB", "$66", "$2,580", "Not offered below 50 GB", "$3,000", "$3,570"],
            ["50 GB", "$165", "$6,450", "$4,838 (promotional tier)", "$7,500", "$8,925"],
            ["100 GB", "$330", "$12,900", "$8,880", "$15,000", "$17,850"],
          ]}
        />
        <P>
          Commitment discounts only start at 50 GB a day, so smaller teams pay
          the full pay-as-you-go rate. The cheapest column also leaves out
          retention charges, so it isn&apos;t a like-for-like total.
        </P>
        <P>
          Don&apos;t estimate your volume from headcount. Two companies with
          the same number of staff can log very different amounts, depending
          on their firewalls and cloud workloads. Some cloud SIEMs offer a free
          trial long enough to measure it (one major vendor offers 31 days at
          up to 10 GB a day), so run your real sources through one and price
          what you actually measure.
        </P>

        {/* ------------------------------------------------------------ 3 */}
        <H2 id="by-size">
          What Small, Mid-Size And Large Companies Pay For A SIEM
        </H2>
        <P>
          SIEM cost scales with two things: how much log data you produce and
          whether you staff the platform yourself. These ranges are WhyCrew
          estimates for US organizations in 2026, built from current vendor
          list prices and BLS analyst pay.
        </P>
        <DataTable
          head={[
            "Organization size",
            "Typical log volume",
            "SIEM platform only (per year)",
            "All-in with your own staff (per year)",
          ]}
          rows={[
            [
              "Small business (under 250 employees, under 100 endpoints)",
              "5 to 25 GB/day",
              "$15,000 to $60,000",
              "$30,000 to $200,000",
            ],
            [
              "Mid-market (250 to 1,000 employees)",
              "25 to 200 GB/day",
              "$60,000 to $300,000",
              "$150,000 to $800,000",
            ],
            [
              "Enterprise (1,000 to 10,000 employees)",
              "200 GB to 1 TB/day",
              "$300,000 to $2.5M",
              "$1M to $5M+",
            ],
            [
              "Large enterprise or MSSP (10,000+ endpoints or many tenants)",
              "1 TB+/day",
              "$1M+",
              "$3M+",
            ],
          ]}
        />
        <P>
          &quot;Platform only&quot; is what the vendor charges (license or
          consumption, plus storage), assuming you already have people to run
          it. &quot;All-in&quot; adds those people at US market pay. The low
          end assumes a small team working business hours; the high end
          assumes someone is watching 24/7.
        </P>

        {/* ------------------------------------------------------------ 4 */}
        <H2 id="pricing-models">How SIEM Vendors Charge You</H2>
        <P>
          SIEM vendors bill on at least nine different meters: GB ingested, GB
          analyzed, GB/day capacity, scans, events per second, servers,
          assets, employees and agents. Managed SIEM providers usually wrap one
          of these in a monthly service fee.
        </P>
        <P>
          For each one, ask what makes the bill go up. With per-GB it&apos;s
          your logs. With per-asset it&apos;s your devices. With per-employee
          it&apos;s your headcount. Pick the meter that grows slowest in your
          business.
        </P>
        <DataTable
          head={[
            "Pricing model",
            "What you pay for",
            "Example price (Nov 2026)",
            "Predictability",
          ]}
          rows={[
            [
              "Per GB ingested",
              "Each GB of logs sent to the SIEM",
              "$0.09/GB (Elastic Essentials) to $5.95/GB (CrowdStrike)",
              "Low: rises with log growth",
            ],
            [
              "Per GB analyzed",
              "Each GB the detection engine processes",
              "$5/GB, annual billing (Datadog Cloud SIEM)",
              "Low to medium",
            ],
            [
              "GB/day capacity",
              "A license for a daily volume ceiling",
              "Graylog Enterprise from $15,000/year at 10 GB/day; Splunk Enterprise at $961 per GB/day a year in the 50 to 99 GB band",
              "Medium: overage risk at peaks",
            ],
            [
              "Scans or credits",
              "$0 to ingest; you pay when you search",
              "Sumo Logic Flex (no public dollar rate)",
              "Medium: depends on how often you query",
            ],
            [
              "Events per second plus flows",
              "Sustained event and network flow throughput",
              "IBM QRadar usage model, by quote",
              "Medium: spikes during incidents",
            ],
            [
              "Per server",
              "Physical, virtual and cloud servers, unlimited log events",
              "IBM QRadar enterprise model, by quote",
              "High",
            ],
            [
              "Per asset",
              "Each monitored device",
              "Rapid7 Incident Command, by quote",
              "High",
            ],
            [
              "Per employee",
              "Headcount, with data volume off the meter",
              "$12 to $21/employee/month (Blumira)",
              "High",
            ],
            [
              "Per agent tier",
              "A band of monitored agents",
              "Wazuh Cloud from $571/month for up to 100 agents",
              "High within the tier",
            ],
          ]}
        />

        <H3>Paying Per GB Of Logs</H3>
        <P>
          Per-GB pricing charges you for every gigabyte of logs the SIEM takes
          in. It&apos;s the most common model, and it&apos;s behind most of the
          surprise invoices we see.
        </P>
        <P>
          Pay-as-you-go rates are the highest. Commitment tiers, where you
          reserve a daily volume, cut the effective rate as volume grows. On
          one large cloud SIEM, the rate falls from $4.30 per GB pay-as-you-go
          to $2.96 at 100 GB a day and $2.48 at 1,000 GB, a saving of up to
          52%. Most commitments can&apos;t be downgraded for at least a month.
        </P>
        <P>
          Log volume rarely grows in a straight line. Turn on a new firewall,
          move a workload to the cloud or have one bad week with an incident,
          and ingestion can jump overnight. Your budget, set 12 months earlier,
          doesn&apos;t move with it.
        </P>

        <H3>Paying By Event Rate Or Server Count</H3>
        <P>
          Throughput licensing counts events per second (EPS), and sometimes
          network flows per minute (FPM). Server-based licensing counts every
          physical, virtual and cloud server instead and lets you ingest
          unlimited log events. Some on-premises SIEMs still offer perpetual
          licenses alongside subscriptions.
        </P>
        <P>
          EPS works fine in stable environments. But during an incident, a
          flood of events from noisy sources can push you past your licensed
          rate at exactly the moment you can least afford a throttled SIEM.
          Server-based licensing removes that risk and replaces it with a
          server count you have to keep accurate.
        </P>

        <H3>Paying Per Device Or Per Employee</H3>
        <P>
          Asset pricing charges a flat rate per monitored device, so the bill
          follows your infrastructure rather than your logs. Asset-priced SIEMs
          usually come in tiers and rarely show dollar prices.
        </P>
        <P>
          Employee pricing takes data volume off the meter entirely. For a
          small company with chatty firewalls and a modest headcount, this is
          often the most predictable bill you can get.
        </P>

        <H3>Paying Only When You Search Or Analyze</H3>
        <P>
          Some vendors now price the work instead of the storage. One model
          charges nothing to ingest and bills on scan volume. Another bills on
          the data its detection engine analyzes, with retention bundled in.
        </P>
        <P>
          These models reward teams that query less often. If your analysts
          run broad hunts all day, model the scan volume before you sign.
        </P>

        {/* ------------------------------------------------------------ 5 */}
        <H2 id="vendor-prices">What Top SIEM Vendors Charge In 2026</H2>
        <P>
          Eight of the 13 SIEM vendors below show a dollar price. The other
          five only explain how they charge, so you&apos;ll need a quote for
          those. The last row is WhyCrew, listed for comparison: we build SIEMs
          that you own rather than license one, so we quote a one-time build
          fee for each project instead of a monthly or per-GB rate.
        </P>
        <DataTable
          head={[
            "Vendor",
            "Pricing model",
            "Price (USD)",
            "Best for",
            "What else to know",
          ]}
          rows={[
            [
              "Elastic Security Serverless",
              "Per GB ingested plus per GB retained",
              "Essentials from $0.09/GB ingest and $0.017/GB-month retained; Complete from $0.11 and $0.019",
              "Engineering-heavy teams that build their own detections",
              "50 GB egress free, then $0.05/GB",
            ],
            [
              "Microsoft Sentinel",
              "Per GB, analytics tier plus data lake tier",
              "$4.30/GB pay-as-you-go (East US); $296/day for 100 GB ($2.96/GB)",
              "Microsoft 365 and Azure shops",
              "Data lake tier billed separately; managed only in the Defender portal after March 31, 2027",
            ],
            [
              "Datadog Cloud SIEM",
              "Per GB analyzed",
              "$5/GB on annual billing; $7.50/GB on demand",
              "Teams already on Datadog",
              "12 months of analysis and retention included",
            ],
            [
              "CrowdStrike Falcon Next-Gen SIEM",
              "Per GB of non-Falcon data",
              "$0.00595 per MB, which is $5.95/GB",
              "Existing Falcon endpoint customers",
              "13-month retention included",
            ],
            [
              "Blumira",
              "Per employee",
              "$12, $16 or $21 per employee/month by edition",
              "Small and mid-size businesses without a SOC",
              "Required one-time onboarding fee of $250 or $500",
            ],
            [
              "Wazuh Cloud",
              "Per active-agent tier",
              "From $571/month for up to 100 agents",
              "Budget-conscious teams with engineering time",
              "1 month indexed, 3 months archived at that tier",
            ],
            [
              "Graylog",
              "Daily volume or annual consumption",
              "Enterprise from $15,000/year; Security from $18,000/year (from 10 GB/day)",
              "Teams that start from log management",
              "Paid editions start at 10 GB a day",
            ],
            [
              "Splunk",
              "Per GB/day license, workload or quote",
              "Splunk Enterprise term license: $575 to $2,277 per GB/day a year on AWS Marketplace ($961 at 50 to 99 GB/day); Splunk Cloud by quote",
              "Large, mature SOCs with high log volume",
              "Self-managed platform license only; Enterprise Security is priced on top; the per-GB/day rate falls as volume grows",
            ],
            [
              "Sumo Logic Cloud SIEM",
              "Flex: $0 ingest, billed on scans",
              "No public dollar rate",
              "Cloud-native teams that search selectively",
              "Unlimited users on Flex",
            ],
            [
              "IBM QRadar SIEM",
              "EPS plus flows per minute, or per managed virtual server",
              "Quote only",
              "Compliance-heavy enterprises on premises",
              "Subscription or perpetual licenses on premises",
            ],
            [
              "Rapid7 Incident Command",
              "Per asset, three tiers",
              "Quote only",
              "Mid-market teams consolidating tools",
              "90 days of log retention, 13 months of alerts; more retention is an add-on",
            ],
            [
              "Google SecOps",
              "Ingestion-based subscription",
              "Quote only",
              "Enterprises with very high log volume",
              "No public US rate",
            ],
            [
              "Exabeam (now includes LogRhythm)",
              "Per GB ingested per day",
              "Quote only",
              "Teams focused on insider threats and user behavior analytics",
              "LogRhythm merged into Exabeam in July 2024; its self-hosted SIEM is licensed separately",
            ],
            [
              <>
                WhyCrew (
                <A href="/services/custom-siem-development">
                  custom-built SIEM
                </A>{" "}
                you own)
              </>,
              "One-time fixed-price build; source code and infrastructure handed over",
              "Quote only; a fixed price agreed before the build starts",
              "MSSPs and teams above 500 GB a day",
              "No per-GB license after the build; you still pay for infrastructure and the people who run it; about 12 weeks to production",
            ],
          ]}
        />
        <P>
          Use this table to sanity-check a quote, not to replace one. List
          prices are a ceiling: most enterprise contracts are negotiated, and
          multi-year or volume deals usually land lower.
        </P>

        {/* ------------------------------------------------------------ 6 */}
        <H2 id="included">
          What&apos;s Included In The Price And What Costs Extra
        </H2>
        <P>
          Two SIEMs with similar headline rates can end up far apart once
          retention, long-term storage, AI features and onboarding are added.
          The table shows what each vendor includes in the base price and what
          it bills separately.
        </P>
        <DataTable
          head={["Vendor", "Included in the base price", "Billed separately"]}
          rows={[
            [
              "Microsoft Sentinel",
              "Analytics tier ingestion and detections; up to 5 MB per user per day free for key security logs",
              "Data lake ingestion ($0.05/GB), processing ($0.10/GB), storage ($0.026/GB-month) and queries ($0.005/GB); advanced data insights ($0.15/compute hour); graph ($3/compute hour)",
            ],
            [
              "Datadog Cloud SIEM",
              "800+ maintained detection rules; built-in threat intelligence; 100 free AI investigations per TB analyzed (minimum 50 a month)",
              "Workflows triggered by anything other than security findings",
            ],
            [
              "Elastic Security Serverless",
              "Security analytics at your tier",
              "Cloud posture management from $0.65/asset/month; managed LLM at $4.50 per million input tokens",
            ],
            [
              "Rapid7 Incident Command",
              "SIEM, attack surface management and SOAR across three tiers; 90 days of logs; 13 months of alerts; Quickstart deployment in year one",
              "Longer log retention; some features, such as ransomware prevention, are sold as add-ons",
            ],
          ]}
        />
        <P>
          Before you sign, ask every vendor the same three questions. How long
          is data searchable at the quoted price? What does the next tier of
          retention cost? Which detection, automation and AI features are in
          the quote and which are add-ons? Price the tier you&apos;ll need in
          year two, because asking for an upgrade mid-contract leaves you very
          little room to negotiate.
        </P>

        {/* ------------------------------------------------------------ 7 */}
        <H2 id="cost-drivers">What Makes Your SIEM Bill Go Up?</H2>
        <P>
          SIEM cost is driven by four things: how much data you ingest, how
          long you keep it searchable, which feature tier you need and how many
          tenants or business units you run.
        </P>

        <H3>How Much Log Data You Send</H3>
        <P>
          On per-GB platforms, ingestion is usually the biggest line on the
          bill. The noisiest sources (firewall, DNS, proxy, NetFlow, verbose
          Windows events) tend to produce the fewest useful detections. You end
          up paying premium rates to store data you rarely query.
        </P>

        <H3>Which Logs Cost The Most To Keep</H3>
        <P>
          Not every log source costs the same to send, and volume rarely lines
          up with detection value. That&apos;s why moving noisy sources to
          cheaper storage usually saves the most.
        </P>
        <DataTable
          head={[
            "Log source",
            "Typical volume",
            "Detection value",
            "Where it usually belongs",
          ]}
          rows={[
            [
              "Firewall, DNS, web proxy and NetFlow",
              "Very high",
              "Low per event",
              "Filter first; keep raw copies in a data lake or archive tier",
            ],
            [
              "Raw endpoint telemetry (the full EDR event stream)",
              "High",
              "Medium; the alerts carry most of the value",
              "Alerts in the analytics tier; raw events in a cheaper tier for hunting",
            ],
            [
              "Identity sign-in and audit logs",
              "Moderate",
              "High",
              "Analytics tier",
            ],
            [
              "Cloud platform activity and productivity-suite audit logs",
              "Low to moderate",
              "High",
              "Analytics tier; often free when the SIEM comes from the same vendor",
            ],
            [
              "Logs kept only for auditors",
              "Varies",
              "Rarely queried",
              "Data lake or archive tier",
            ],
          ]}
        />
        <P>
          One thing to check: some SIEMs ingest a security product&apos;s
          alerts for free but bill the raw telemetry behind those alerts at the
          normal rate. Check exactly which data types a free allowance covers
          before you switch on a connector.
        </P>

        <H3>How Long You Keep Logs Searchable</H3>
        <P>
          Retention raises long-term SIEM cost because stored data compounds.
          In month one you pay to keep one month of logs. By month 12
          you&apos;re paying for 12. Most teams only notice it on the
          second-year invoice.
        </P>
        <P>
          Where you keep old logs matters as much as how long. On one large
          cloud SIEM, a GB sent to a data lake tier can cost $0.15 to ingest
          and process, against $4.30 for the analytics tier on pay-as-you-go. A
          full year of 50 GB-a-day logs in the lake costs about $475 a month to
          store at $0.026 per GB.
        </P>
        <P>In the US, a few rules usually set the minimum:</P>
        <Bullets
          items={[
            "PCI DSS Requirement 10.5.1: at least 12 months of audit logs, with the latest three months immediately available.",
            "OMB M-21-31 (federal agencies and contractors): 12 months in active storage plus 18 months in cold storage.",
            "HIPAA, SOX and state laws add their own expectations, so check with your compliance team before you size retention.",
          ]}
        />
        <P>
          Vendors handle retention very differently, which is why two quotes
          for &quot;the same&quot; SIEM can be far apart. Included retention
          ranges from 90 days to 13 months, depending on the vendor.
        </P>

        <H3>Which Features You Need</H3>
        <P>
          UEBA, threat intelligence, SOAR automation and AI assistants tend to
          live in higher tiers or come as add-ons. Some vendors now bill AI
          features per million tokens on top of ingest and retention.
        </P>

        <H3>How Many Tenants You Run, And Where</H3>
        <P>
          If you run several business units, or you&apos;re an MSSP with
          dozens of clients, per-workspace or per-instance pricing multiplies
          fast, so your{" "}
          <A href="/blog/multi-tenant-siem-architecture-mssps">
            multi-tenant SIEM architecture
          </A>{" "}
          shapes the bill as much as your log volume does. Cloud SIEM gets rid
          of hardware but adds metered storage, query and egress fees.
          On-premises SIEM moves those costs to servers and the people who keep
          them running.
        </P>

        {/* ------------------------------------------------------------ 8 */}
        <H2 id="tco">The Full Cost Of Running A SIEM, Beyond The License</H2>
        <P>
          SIEM total cost of ownership is the license plus storage,
          deployment, integrations, detection tuning and the people who run it,
          measured over the contract term, usually three years. For a self-run
          SIEM, the license is often less than half of that.
        </P>
        <P>As a formula:</P>
        <Formula />

        <H3>Why Staff Is The Biggest Cost</H3>
        <P>
          Staff costs more than any other part of a SIEM. This is how the cost
          of 24/7 coverage adds up, using US government pay data:
        </P>
        <Numbered
          items={[
            "A year has 8,760 hours. A full-time analyst works roughly 1,800 productive hours once leave and training are taken out.",
            "So keeping one seat staffed around the clock takes about five analysts.",
            "The median US information security analyst earned $129,180 in May 2025 (BLS). Wages are about 70% of what employers pay per worker once benefits are counted (BLS Employer Costs for Employee Compensation), which puts each analyst at about $184,500 fully loaded.",
            "Five analysts cost about $922,700 a year. That's before a SIEM engineer, a manager or the software.",
          ]}
        />
        <P>
          When a team tells us they plan to run their SIEM in-house, 24/7, with
          two people, this is the math we walk through. Two people can cover
          business hours well. They can&apos;t cover nights, weekends, holidays
          and sick days too. It&apos;s the main reason managed SIEM exists.
        </P>

        <H3>Costs That Never Appear On The Quote</H3>
        <P>
          These line items don&apos;t appear on any vendor&apos;s pricing page,
          but they show up in your budget within the first year. The ranges are
          typical figures from 2025 and 2026 SIEM total-cost studies.
        </P>
        <DataTable
          head={["Hidden cost", "Typical range", "When it hits"]}
          rows={[
            [
              "Deployment and professional services",
              "$15,000 to $200,000",
              "One time, year one",
            ],
            [
              "Custom integrations and parsers",
              "$10,000 to $50,000 per connector",
              "Year one, then as sources change",
            ],
            [
              "Consultant time for compliance dashboards",
              "$150 to $300 an hour",
              "Before each audit",
            ],
            [
              "Training and certifications",
              "$5,000 to $15,000 per admin a year",
              "Every year",
            ],
            [
              "Detection tuning and content",
              "Ongoing analyst or engineer time",
              "Every year",
            ],
            [
              "Commercial threat intelligence feeds",
              "Priced separately by most vendors; built into some higher tiers",
              "Every year",
            ],
            [
              "Overage, peak traffic and egress",
              "Set by your contract",
              "During incidents, audits and migrations",
            ],
          ]}
        />
        <P>
          The same studies found that first-year SIEM costs commonly run 40% to
          60% over the original estimate. In our experience, integrations are
          the usual culprit: every in-house app and legacy system needs a
          parser, and nobody counted them during procurement.
        </P>

        <H3>Why Year One Costs More Than Year Two</H3>
        <P>
          Year one carries every one-time cost in the table above: deployment,
          the first wave of parsers and initial tuning. Years two and three
          drop by those amounts, but two things push the other way. Log volume
          grows, and on per-GB pricing the license grows with it. Renewal terms
          can add an increase on top. That&apos;s why a three-year projection
          at +30% log growth tells you more than a year-one quote.
        </P>

        {/* ------------------------------------------------------------ 9 */}
        <H2 id="worth-it">Is A SIEM Worth The Cost?</H2>
        <P>
          For most US organizations that handle regulated data, yes, but the
          case rests on breach exposure and compliance, not on the SIEM paying
          for itself in a spreadsheet.
        </P>
        <P>
          IBM&apos;s 2026 Cost of a Data Breach Report, released in July, put
          the average US breach at $11.5 million and the global average at a
          record $4.99 million, up 12% in a year. Catching an attack earlier is
          the main thing a SIEM buys you against numbers like these.
        </P>
        <P>
          Keep the limits of that number in mind. The report&apos;s figure is
          an average across 602 breached organizations worldwide, and costly
          sectors pull it up: healthcare breaches averaged $6.6 million. A
          200-person company won&apos;t face a $10 million breach by default,
          and it can&apos;t justify a $500,000-a-year SIEM program on that
          number alone.
        </P>
        <P>
          Compliance is the firmer argument. If a regulation already makes you
          keep and review logs, as card payments and federal contracts do, a
          log platform isn&apos;t optional, and the real decision is which
          pricing model hurts least.
        </P>

        <H3>When You Don&apos;t Need To Pay For A SIEM Yet</H3>
        <P>
          A SIEM is a poor buy for some small companies. If your whole business
          runs on one productivity suite, every laptop already has endpoint
          protection and you pay for managed detection and response, a SIEM
          mostly repeats what you already have. Put that budget into MFA and
          response coverage first.
        </P>
        <P>It&apos;s time to budget for one when any of these is true:</P>
        <Bullets
          items={[
            "You take card payments, and PCI DSS Requirement 10 expects you to review audit logs.",
            "You're working toward CMMC Level 2, which applies the NIST SP 800-171 audit and accountability controls.",
            "Your cyber insurer asks how you collect and review logs centrally.",
            "You run more separate systems than any single security tool can watch.",
          ]}
        />

        {/* ----------------------------------------------------------- 10 */}
        <H2 id="pricing-fit">Which Pricing Model Fits Your Company?</H2>
        <P>
          This table matches common buyer types to the pricing model that
          usually suits them.
        </P>
        <DataTable
          head={["If you are...", "Look first at", "Why"]}
          rows={[
            [
              "A Microsoft 365 or Azure shop",
              "Microsoft Sentinel",
              "Free ingestion for key Microsoft security logs and native Defender integration",
            ],
            [
              "A small business with noisy logs and under 250 people",
              "A per-employee SIEM or managed SIEM",
              "Per-employee pricing takes log volume off the bill; managed SIEM adds the analysts you don't have",
            ],
            [
              "An engineering-heavy team",
              "Elastic Security Serverless",
              "The lowest per-GB rates, if you have engineers to build detections",
            ],
            [
              "Already a CrowdStrike endpoint customer",
              "Falcon Next-Gen SIEM",
              "Adds SIEM on the endpoint agent you already run",
            ],
            [
              "Already a Datadog customer",
              "Datadog Cloud SIEM",
              "Adds SIEM to the monitoring tool your engineers already use",
            ],
            [
              "A compliance-heavy enterprise running on premises",
              "IBM QRadar or Splunk Enterprise Security",
              "Server-based or perpetual licensing (QRadar) and deep compliance content; budget for a quote-driven negotiation",
            ],
            [
              "An MSSP or anyone above 500 GB a day",
              "A custom-built platform you own",
              "Per-GB licenses multiply with every tenant; at this scale, owning the platform usually wins (we build these, so weigh that)",
            ],
          ]}
        />
        <P>
          A rule of thumb: if your log volume per employee is high (a small
          company with heavy firewall or cloud logging), favor per-employee or
          per-asset pricing. If it&apos;s low (a large office workforce with
          modest infrastructure), per-GB pricing is usually cheaper.
        </P>

        {/* ----------------------------------------------------------- 11 */}
        <H2 id="managed-siem-pricing">
          How Much Does A Managed SIEM Pricing?
        </H2>
        <P>
          A managed SIEM service usually costs $3,000 to $5,000 a month for a
          small business and $5,000 to $15,000 a month for a mid-market
          company. The price depends on endpoints, log volume and how much of
          the night shift the provider covers, and the table below breaks it
          down by company size.
        </P>
        <P>
          With a managed service you pay for the SIEM, the people watching it
          and some level of response, and in exchange most of the staffing
          problem described earlier goes away. For a lot of small and mid-size
          teams, that trade is worth it.
        </P>

        <H3>Monthly Cost By Company Size</H3>
        <DataTable
          head={[
            "Organization size",
            "Endpoints",
            "Typical monthly cost",
            "Typical annual cost",
            "Usual coverage",
          ]}
          rows={[
            [
              "Small business",
              "Under 100",
              "$3,000 to $5,000",
              "$36,000 to $60,000",
              "Often business hours",
            ],
            [
              "Mid-market",
              "100 to 1,000",
              "$5,000 to $15,000",
              "$60,000 to $180,000",
              "Usually 24/7 triage",
            ],
            [
              "Enterprise",
              "1,000 to 10,000",
              "$15,000 to $50,000+",
              "$180,000 to $600,000+",
              "24/7 with dedicated analysts",
            ],
            [
              "Large enterprise",
              "10,000+",
              "$50,000 to $150,000+",
              "$600,000 to $1.8M+",
              "Dedicated SOC capacity",
            ],
          ]}
        />
        <P>
          These are WhyCrew estimates from provider rate cards and the projects
          we see; your quote will depend on retention, response hours and how
          many custom log sources you bring.
        </P>

        <H3>Managed SIEM Vs. Building Your Own 24/7 Team</H3>
        <P>
          To judge a managed SIEM quote, compare it with what the same coverage
          would cost if you built it yourself. This comparison is for one
          mid-market company sending 50 GB of logs a day and needing
          round-the-clock monitoring.
        </P>
        <DataTable
          head={["Option", "What you pay for", "Estimated annual cost"]}
          rows={[
            [
              "Run it all in-house",
              "A cloud SIEM at a 50 GB commitment tier ($58,856) plus five analysts to cover every hour ($922,714)",
              "About $981,600",
            ],
            [
              "Hybrid (co-managed)",
              "The same SIEM, one in-house analyst ($184,543) and a provider retainer of $5,000 to $10,000 a month for nights, weekends and tuning",
              "About $303,400 to $423,400",
            ],
            [
              "Fully managed",
              "A provider retainer of $5,000 to $15,000 a month; check whether the SIEM license is included or passed through",
              "About $60,000 to $180,000",
            ],
          ]}
        />
        <P>
          These are WhyCrew estimates based on current list prices and BLS pay
          data. The gap is mostly people: a provider spreads its night shift
          across many clients, while an in-house team carries the whole cost
          alone. The trade-off is control. With a fully managed service, the
          detection rules, tuning history and sometimes the data itself live
          with the provider, which is why exit terms matter as much as the
          monthly price.
        </P>

        <H3>How Providers Bill For Managed SIEM</H3>
        <DataTable
          head={[
            "Managed SIEM pricing model",
            "Typical 2026 rate",
            "Works best for",
          ]}
          rows={[
            [
              "Per endpoint or asset",
              "$8 to $50 per endpoint a month",
              "Device-heavy environments",
            ],
            [
              "Per GB of data",
              "$0.50 to $2.00 per GB ingested",
              "Low-volume, high-endpoint environments",
            ],
            [
              "Per employee",
              "$12 to $21 per employee a month",
              "Organizations with several devices per person",
            ],
            [
              "Flat monthly retainer",
              "$3,000 to $50,000+ a month",
              "Teams that want one fixed number",
            ],
            ["Hybrid", "Per asset plus a per-GB overage", "Mixed environments"],
          ]}
        />

        <H3>Paying By The Hour Or Sharing The Work</H3>
        <P>
          Not every team needs a provider to run everything. Co-managed SIEM
          splits the work: you keep the platform and some of the monitoring,
          and the provider handles tuning, detection engineering or
          after-hours coverage.
        </P>
        <P>
          Hourly rates start around $50 an hour for SIEM professional
          services, $65 for co-managed SIEM and $140 for SIEM as a service with
          the tool included. Hourly pricing suits a defined scope, such as
          onboarding new log sources or cutting false positives. For
          round-the-clock monitoring, a monthly retainer is usually cheaper.
        </P>

        <H3>Your SIEM Or Theirs: How Ownership Changes The Price</H3>
        <P>
          Before you compare managed SIEM quotes, find out whose SIEM
          you&apos;d be using. It changes both the price and what happens if
          you leave.
        </P>
        <DataTable
          head={[
            "Setup",
            "How you're billed",
            "What happens if you switch providers",
          ]}
          rows={[
            [
              "Provider's SIEM",
              "One monthly fee that bundles the license, hosting and analysts",
              "Your detection rules and log history may stay behind unless the contract says otherwise",
            ],
            [
              "Your SIEM, their analysts",
              "You pay the SIEM license directly; the provider charges for monitoring and tuning",
              "You keep the platform, the rules and the data; only the service changes",
            ],
          ]}
        />
        <P>
          The provider-owned option is usually the easiest to start with and
          the hardest to leave. If you expect to grow, or you&apos;re an{" "}
          <A href="/blog/what-is-an-mssp">MSSP</A>, price the exit before you
          sign.
        </P>

        <H3>What&apos;s Usually Included, And What Usually Isn&apos;t</H3>
        <P>
          This is where managed SIEM quotes stop being comparable. Two
          providers can quote the same monthly price and deliver very different
          things, and you usually find out which one you bought during your
          first real incident.
        </P>
        <P>Usually included:</P>
        <Bullets
          items={[
            "SIEM license and hosting",
            "Onboarding for standard log sources",
            "Alert triage (business hours or 24/7)",
            "Monthly or compliance reporting",
          ]}
        />
        <P>Often costs extra:</P>
        <Bullets
          items={[
            "Custom detection rules and heavy tuning",
            "Incident response beyond the first triage",
            "Threat hunting",
            "Retention past the default window (commonly 90 days to a year)",
            "Integrations for in-house or legacy apps",
          ]}
        />
        <P>Get the exclusions in writing before you compare anything.</P>
        <P>
          Also ask what happens when an alert fires at night or over a weekend.
          Some providers only log a ticket for your team to pick up in the
          morning. Others will isolate the device, revoke the session or
          disable the account straight away. Cheaper 24/7 plans often stop at
          the ticket, so get response authority and response times written
          into the contract.
        </P>

        {/* ----------------------------------------------------------- 12 */}
        <H2 id="budgeting">How To Budget For A Managed SIEM Service</H2>
        <P>
          To budget for managed SIEM, count your endpoints, users and daily log
          volume, choose the coverage level you need, then multiply by each
          provider&apos;s pricing unit and add exclusions and growth. In
          practice, it goes like this:
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
              <Strong>Set retention to the longest requirement you face.</Strong>
            </>,
            <>
              <Strong>Apply each provider&apos;s unit price.</Strong> For
              example, 400 endpoints at $25 is $10,000 a month. Or 60 GB a day
              at $1.50 per GB for 30 days is $2,700 a month.
            </>,
            <>
              <Strong>Add the exclusions:</Strong> extra retention, custom
              detections, incident response hours and onboarding.
            </>,
            <>
              <Strong>Stress-test for growth.</Strong> Rerun everything at +30%
              and +50% volume. Some pricing models hold up; others fall apart.
            </>,
          ]}
        />

        {/* ----------------------------------------------------------- 13 */}
        <H2 id="owning">When Owning Your SIEM Costs Less</H2>
        <P>
          Full disclosure: building custom SIEM platforms is what we do, so
          weigh our opinion accordingly. For most small teams, a custom build
          is the wrong answer, and we&apos;ll tell you that on the first call.
        </P>
        <P>
          Where it does make sense is at scale. At 500 GB a day, a cloud SIEM
          commitment tier can cost $1,265 a day. Over three years that&apos;s
          about $1.39 million in license fees alone. A platform you own
          replaces that with a one-time build, quoted for your log volume and
          tenants, and no per-GB license afterward. Both options still need
          analysts and infrastructure, so compare those lines too. One MSSP
          that moved off per-GB SIEM pricing to a platform it owns{" "}
          <A href="/case-studies/siem-rent-to-owned-platform">
            saved $270,000 over 24 months
          </A>
          .
        </P>
        <CtaCard
          label="Build with WhyCrew"
          title="Stop Renting Your SIEM. Own The One That Replaces It."
          body="WhyCrew engineers a SIEM around your log sources, your tenants and your compliance rules, then hands over the source code, infrastructure and documentation. Every build is quoted at a fixed price for your log volume and tenants, reaches production in about 12 weeks and carries no per-GB license afterward. Send us your daily log volume and tenant count for a fixed-price estimate."
        >
          <Button href="/contact">Get a fixed-price estimate</Button>
          <Button href="/services/custom-siem-development" variant="ghost">
            How the build works
          </Button>
        </CtaCard>

        {/* ----------------------------------------------------------- 14 */}
        <H2 id="reduce-cost">
          How To Lower Your SIEM Bill Without Losing Visibility
        </H2>
        <P>
          The most reliable way to reduce SIEM cost is to send less low-value
          data to the expensive analytics tier, not to collect less data.
          Cutting what you collect saves money but leaves blind spots, and
          you&apos;ll only find them when an investigation needs the logs you
          dropped. Moving what you collect to cheaper storage saves money and
          keeps the evidence.
        </P>
        <P>These are the cost cuts we&apos;d try first, roughly in order:</P>
        <Numbered
          items={[
            <>
              <Strong>Filter and route data in a pipeline.</Strong> A security
              data pipeline strips duplicate fields and noisy events before
              they hit the SIEM, and sends the raw copy to cheap storage.
            </>,
            <>
              <Strong>Tier your data.</Strong> Send each log source to the tier
              the log table above suggests, so only data your detections read
              pays analytics-tier rates.
            </>,
            <>
              <Strong>Right-size your commitments.</Strong> Once daily volume
              is stable, a commitment tier is the easiest saving available.
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
            </>,
          ]}
        />
        <P>
          One habit keeps year two from creeping up: price every new log source
          before you connect it, because a source added after signing is billed
          at whatever rate your contract allows.
        </P>

        <H3>When A Security Data Lake Costs Less</H3>
        <P>
          At high volumes, a security data lake with detections running on top
          can cost far less than a traditional SIEM that keeps everything in
          hot storage. It does take more engineering to run, though. The
          savings are only real if you have, or can hire, the people to operate
          it.
        </P>

        {/* ----------------------------------------------------------- 15 */}
        <H2 id="faq">Frequently Asked Questions About SIEM Pricing</H2>
        <div className="mt-6">
          <FaqAccordion faqs={FAQS} columns={1} />
        </div>
      </ArticleShell>
    </>
  );
}
