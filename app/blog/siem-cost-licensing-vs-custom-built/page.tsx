import type { Metadata } from "next";
import { ArticleShell, type TocEntry } from "@/components/blog/article-shell";
import {
  DataTable,
  H2,
  H3,
  KeyTakeaways,
  P,
  QuickAnswer,
  Ref,
  Strong,
} from "@/components/blog/prose";
import { FaqAccordion } from "@/components/ui/faq";
import { breadcrumbLd, faqLd, type Faq } from "@/lib/jsonld";
import { postBySlug } from "@/lib/blog";
import { SITE } from "@/lib/site";

const post = postBySlug("siem-cost-licensing-vs-custom-built")!;
const PATH = `/blog/${post.slug}`;

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
  },
  twitter: {
    card: "summary_large_image",
    title: post.metaTitle,
    description: post.metaDescription,
  },
};

const TOC: TocEntry[] = [
  { id: "key-takeaways", label: "Key takeaways" },
  { id: "at-a-glance", label: "Licensed vs. custom-built at a glance" },
  { id: "licensing-costs", label: "What drives SIEM licensing costs?" },
  { id: "hidden-costs", label: "What hidden costs do teams overlook?" },
  { id: "which-costs-less", label: "Which model costs less?" },
  { id: "who-benefits", label: "Who benefits most from custom-built?" },
  { id: "real-world-savings", label: "What cost reduction to expect" },
  { id: "which-model", label: "Which model fits your situation?" },
  { id: "bottom-line", label: "The bottom line" },
  { id: "faq", label: "Frequently asked questions" },
];

const GLANCE = {
  head: ["Factor", "Licensed SIEM", "Custom-Built SIEM"],
  rows: [
    ["Upfront cost", "Low to moderate", "High (engineering investment)"],
    ["Ongoing cost", "High (recurring license + overage)", "Low (infrastructure only)"],
    ["Pricing model", "Per GB ingested, per user, or per asset", "Infrastructure cost only"],
    ["Scalability cost", "Increases with data volume", "Largely fixed after build"],
    ["Time to deploy", "Weeks", "Months"],
    ["Customization", "Limited by vendor roadmap", "Fully configurable"],
    ["Multi-tenancy", "Add-on or unavailable", "Native"],
    ["Compliance control", "Vendor-dependent", "Full ownership"],
    ["Break-even point", "N/A", "Typically 18–36 months"],
  ],
};

const FIT = {
  head: ["If your situation looks like this…", "Consider this model"],
  rows: [
    ["Under 50 GB/day ingestion, limited engineering resources", "Licensed SIEM"],
    ["Rapid deployment needed (weeks, not months)", "Licensed SIEM"],
    ["Budget is primarily OpEx-driven", "Licensed SIEM"],
    ["100 GB/day+ ingestion with growth trajectory", "Custom-built SIEM"],
    ["Managing 5+ tenants as an MSSP", "Custom-built SIEM"],
    ["Strict data residency or retention control required", "Custom-built SIEM"],
    ["Existing engineering team available for ownership", "Custom-built SIEM"],
    ["Long-term budget certainty is a priority", "Custom-built SIEM"],
  ],
};

const FAQS: Faq[] = [
  {
    q: "How much does a licensed SIEM typically cost per year?",
    a: "Annual licensed SIEM costs vary widely by vendor, data volume, and feature tier. Entry-level deployments for smaller environments can start around $50,000 per year. Large enterprise or MSSP environments with high ingestion volumes can exceed $500,000 annually once storage overruns, professional services, and feature tier upgrades are factored in.",
  },
  {
    q: "What is the main cost driver for licensed SIEMs?",
    a: "Ingestion volume measured in gigabytes per day is the primary cost driver for most commercial SIEMs, including Splunk and Microsoft Sentinel. Retention period and feature tier access are secondary drivers that can substantially increase total cost.",
  },
  {
    q: "How long does it take to build a custom SIEM?",
    a: "A custom-built SIEM typically takes several months to design, build, integrate, and validate — longer for complex multi-tenant environments. This is the primary trade-off against licensed platforms, which can be deployed in weeks.",
  },
  {
    q: "Is a custom-built SIEM right for small security teams?",
    a: "Generally, no. Custom-built SIEMs require dedicated engineering capacity to build and maintain. Small teams without that capacity often find that the operational burden offsets the licensing savings. A licensed platform with managed services is typically more appropriate.",
  },
  {
    q: "What hidden costs should I budget for with a licensed SIEM?",
    a: "Plan for tuning and analyst time (ongoing), professional services for deployment and migrations, storage overage charges for ingestion spikes, and data egress fees if you export logs for archiving or compliance purposes. These costs can add an estimated 30–50% on top of base licensing fees in some environments.",
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
    image: `${SITE.url}/logo.jpeg`,
    articleSection: post.cluster,
    keywords: post.topics.join(", "),
  };
}

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
              { name: "Resources", path: "/resources" },
              { name: post.title, path: PATH },
            ])
          ),
        }}
      />

      <ArticleShell
        post={post}
        toc={TOC}
        cta={{
          heading: "Ready to find out which model fits your environment?",
          body: "Book an Architecture Audit and we'll map out the cost comparison for your specific situation — current spend, growth trajectory, and internal capacity.",
          label: "Book an Architecture Audit",
          href: "/contact",
        }}
      >
        <QuickAnswer>
          Licensed SIEMs typically cost $50,000–$500,000+ per year, driven by
          ingestion volume, retention, and feature tiers. Custom-built SIEMs
          carry higher upfront engineering costs but eliminate per-GB pricing
          and recurring license fees, making them significantly more
          cost-effective for high-volume or multi-tenant environments at scale.
        </QuickAnswer>

        <div className="mt-10">
          <KeyTakeaways
            items={[
              "Licensed SIEMs charge primarily on ingestion volume, retention, and feature tiers — costs that compound quickly as data volumes grow.",
              "Custom-built SIEMs replace recurring license fees with upfront engineering investment, often breaking even within 18–36 months for high-volume environments.",
              "Hidden costs — tuning, professional services, storage overruns, and data egress — frequently add 30–50% on top of published SIEM pricing.",
              "Multi-tenant operators (MSSPs and large enterprises) typically see the strongest ROI from custom-built architectures.",
              "The right model depends on your data volume, in-house engineering capacity, compliance requirements, and growth trajectory.",
            ]}
          />
        </div>

        <H2 id="at-a-glance">Licensed vs. Custom-Built SIEM at a Glance</H2>
        <DataTable
          caption="Comparison of licensed and custom-built SIEM across cost, deployment, and control factors"
          head={GLANCE.head}
          rows={GLANCE.rows}
          highlightCol={2}
        />

        <H2 id="licensing-costs">What Drives SIEM Licensing Costs?</H2>
        <P>
          Understanding where licensed SIEM pricing comes from is the first step
          to evaluating whether the model fits your budget long-term.
        </P>

        <H3>Ingestion volume</H3>
        <P>
          Most enterprise SIEMs — including Splunk, Microsoft Sentinel, and IBM
          QRadar — price primarily on how much data you send them. Rates
          typically fall somewhere between $1 and $4 per GB per day, though
          published rates vary by vendor and contract size. For organizations
          managing 100 GB/day or more, this line item alone can represent the
          bulk of total spend.
        </P>

        <H3>Retention periods</H3>
        <P>
          Standard licensed SIEM plans often include 30 to 90 days of hot
          storage. Extending retention to meet regulatory requirements — NIS2
          and DORA both mandate longer log retention windows, as detailed in our{" "}
          <Ref to="nis2-dora-compliance">NIS2 and DORA compliance guide</Ref> —
          triggers additional storage tiers that can meaningfully increase
          annual costs.
        </P>

        <H3>Feature tiers</H3>
        <P>
          Core detection, SOAR integration, behavioral analytics, and threat
          intelligence feeds are frequently gated behind higher-tier plans.
          Teams that start on entry-level licenses often find themselves
          upgrading once they need SOAR playbook capabilities or advanced
          correlation. See our{" "}
          <Ref to="soar-playbooks-guide">SOAR playbooks guide</Ref> for a
          breakdown of what&apos;s typically included at each tier.
        </P>

        <H3>Tenant count</H3>
        <P>
          For MSSPs and enterprises managing multiple business units, per-tenant
          licensing multiplies cost significantly. Most licensed platforms were
          not architected for true multi-tenancy — each additional tenant often
          means a separate instance, separate license, and separate overhead.
          Our{" "}
          <Ref to="multi-tenant-siem-architecture">
            multi-tenant SIEM architecture guide
          </Ref>{" "}
          covers how this plays out in practice.
        </P>

        <H2 id="hidden-costs">What Hidden SIEM Costs Do Teams Overlook?</H2>
        <P>
          Published pricing rarely reflects total cost of ownership. Security
          teams routinely encounter four categories of costs that don&apos;t
          appear in vendor proposals.
        </P>
        <P>
          <Strong>Tuning and maintenance.</Strong> Out-of-the-box SIEM rules
          generate substantial false positives. Ongoing tuning — adjusting
          thresholds, refining detection logic, updating parsers — requires
          dedicated analyst time that most teams don&apos;t fully account for
          during procurement.
        </P>
        <P>
          <Strong>Professional services.</Strong> Initial deployment,
          integration with existing data sources, and migration from legacy
          systems typically require vendor professional services or third-party
          consultants. These engagements frequently range from tens of thousands
          to six figures depending on environment complexity.
        </P>
        <P>
          <Strong>Storage overruns.</Strong> Ingestion spikes from security
          incidents, audits, or new data source onboarding can push volume above
          contracted tiers. Overage charges are billed at rates that are often
          significantly higher than the base per-GB cost.
        </P>
        <P>
          <Strong>Data egress.</Strong> Cloud-hosted SIEMs charge for data
          leaving the platform. Teams that export logs for secondary analysis,
          long-term archiving, or compliance reporting can face egress fees that
          add meaningfully to annual spend.
        </P>
        <P>
          Taken together, these hidden costs can add an estimated 30–50% on top
          of base licensing fees — though actual figures vary significantly by
          environment and vendor.
        </P>

        <H2 id="which-costs-less">
          Licensed SIEM vs. Custom-Built: Which Model Costs Less?
        </H2>
        <P>
          The answer depends almost entirely on data volume and time horizon.
        </P>

        <H3>How licensed SIEMs work financially</H3>
        <P>
          With a licensed SIEM, you pay from day one. Costs are predictable in
          structure but variable in practice: as your environment grows, so does
          your bill. The advantage is speed — licensed platforms deploy in weeks
          and require no upfront engineering investment.
        </P>

        <H3>How custom-built SIEMs work financially</H3>
        <P>
          A custom-built SIEM requires meaningful engineering investment upfront
          to design, build, and integrate a purpose-built detection platform.
          That investment is front-loaded. Ongoing costs are largely
          infrastructure-based — compute, storage, and maintenance — rather than
          per-GB licensing fees. Our{" "}
          <Ref to="custom-siem-soar-services">
            custom SIEM and SOAR development services
          </Ref>{" "}
          page outlines what this typically involves.
        </P>
        <P>
          If you&apos;re also weighing open-source components as a path to cost
          control, the tradeoffs differ significantly from a fully custom
          approach — a comparison we cover in detail in our{" "}
          <Ref to="open-source-vs-custom-siem">
            open-source vs. custom-built SIEM
          </Ref>{" "}
          analysis.
        </P>

        <H3>Where the break-even point falls</H3>
        <P>
          For most high-volume environments, the crossover point where
          custom-built total cost of ownership falls below licensed SIEM spend
          typically occurs somewhere between 18 and 36 months. Organizations
          ingesting under 50 GB/day may not reach break-even quickly enough to
          justify the build. Those managing 100 GB/day or more, especially MSSPs
          handling multiple clients, generally see a clear financial case within
          that window.
        </P>

        <H2 id="who-benefits">Who Benefits Most From a Custom-Built SIEM?</H2>
        <P>
          Not every organization should build. Custom-built SIEMs deliver the
          strongest ROI in specific scenarios.
        </P>
        <P>
          <Strong>MSSPs managing multiple tenants.</Strong> Licensing costs
          multiply with each client on most commercial platforms. A custom-built
          architecture with native multi-tenancy eliminates per-tenant licensing
          and enables shared infrastructure. Read more in our{" "}
          <Ref to="mssp-engineering-partner">
            MSSP engineering partner services
          </Ref>{" "}
          overview.
        </P>
        <P>
          <Strong>High-volume enterprise environments.</Strong> Organizations
          ingesting hundreds of gigabytes of log data daily face compounding
          per-GB costs. A fixed-cost infrastructure model becomes increasingly
          favorable at this scale.
        </P>
        <P>
          <Strong>Regulated industries with strict data control requirements.</Strong>{" "}
          Sectors subject to NIS2, DORA, HIPAA, or similar frameworks often need
          granular control over data residency, retention architecture, and
          audit trails — control that commercial platforms may not fully
          provide.
        </P>
        <P>
          <Strong>Teams with existing engineering capacity.</Strong> The
          custom-built model works best when the organization can own ongoing
          development and maintenance. Without that capacity, operational costs
          may erode the financial advantage.
        </P>

        <H2 id="real-world-savings">
          What Real-World Cost Reduction Can You Expect?
        </H2>
        <P>
          Specific figures depend heavily on current spend, data volumes, and
          environment complexity. Any vendor quoting exact percentages without
          an architecture review should be treated skeptically.
        </P>
        <P>
          That said, organizations migrating from high-volume licensed SIEM
          deployments to custom-built architectures commonly report meaningful
          reductions in annual security operations spend once the platform
          reaches steady state. The most significant savings typically come from
          eliminating per-GB ingestion fees and per-tenant licensing overhead.
        </P>
        <P>
          For a zero-downtime migration approach, see our{" "}
          <Ref to="siem-migration-guide">SIEM migration guide</Ref>.
        </P>

        <H2 id="which-model">Which SIEM Model Fits Your Situation?</H2>
        <DataTable
          caption="Guidance on choosing between licensed and custom-built SIEM by environment profile"
          head={FIT.head}
          rows={FIT.rows}
          highlightCol={1}
        />

        <H2 id="bottom-line">The Bottom Line</H2>
        <P>
          Licensed SIEMs offer speed and lower upfront cost. For teams early in
          their security maturity journey, or operating at modest data volumes,
          that&apos;s a legitimate advantage. But the per-GB pricing model
          creates a structural problem: as your environment scales, so does your
          bill — often faster than your security posture improves.
        </P>
        <P>
          Custom-built SIEMs require patience and upfront engineering
          investment. For MSSPs, high-volume enterprises, and organizations in
          regulated sectors, that investment typically pays off within two to
          three years, and the cost curve flattens significantly after that.
        </P>
        <P>
          The honest answer to &ldquo;which costs less&rdquo; is: it depends on
          where you are today and where you&apos;re headed. Getting that answer
          right requires an honest look at your current spend, your growth
          trajectory, and your internal capacity.
        </P>

        <H2 id="faq">Frequently Asked Questions</H2>
        <div className="mt-6">
          <FaqAccordion faqs={FAQS} columns={1} />
        </div>
      </ArticleShell>
    </>
  );
}
