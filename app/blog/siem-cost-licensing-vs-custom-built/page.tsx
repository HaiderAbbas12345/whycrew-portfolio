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
    modifiedTime: post.dateModified ?? post.datePublished,
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
    ["Break-even point", "N/A", "Typically 12 to 18 months"],
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
    a: "In general, annual costs vary by vendor, data volume, and feature tier. For instance, entry-level deployments start around €50,000 per year. However, large enterprise or MSSP environments can exceed €500,000 annually. On top of that, storage overruns, professional services, and tier upgrades push totals to the high end.",
  },
  {
    q: "What is the main cost driver for licensed SIEMs?",
    a: "Above all, ingestion volume dominates the bill. Measured in gigabytes per day, it is therefore the primary driver for Splunk, Microsoft Sentinel, and most commercial SIEMs. In addition, retention period and feature-tier access act as secondary drivers that substantially raise total cost.",
  },
  {
    q: "How long does it take to build a custom SIEM?",
    a: "Typically, a custom build takes several months to design, build, integrate, and validate. Moreover, complex multi-tenant environments take longer. By comparison, licensed platforms can be deployed in weeks, which is indeed the main trade-off.",
  },
  {
    q: "Is a custom-built SIEM right for small security teams?",
    a: "No, custom builds require dedicated engineering capacity. As a result, small teams without that capacity find the operational burden offsets the licensing savings. Instead, a licensed platform with managed services usually fits better.",
  },
  {
    q: "What hidden costs should I budget for with a licensed SIEM?",
    a: "First, budget for ongoing tuning and analyst time. Next, add professional services for deployment and migrations. In addition, expect storage overage charges when ingestion spikes. Finally, account for data egress fees when exporting logs for archiving or compliance. All told, these categories add an estimated 30-50 percent to base fees.",
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
          body: "So, to move forward, book an Architecture Audit and we will map the cost comparison for your specific situation — current spend, growth trajectory, and internal capacity.",
          label: "Book an Architecture Audit",
          href: "/contact",
        }}
      >
        <QuickAnswer>
          Licensed SIEMs typically cost €50,000 to €500,000+ per year, and in
          most cases, ingestion volume, retention, and feature tiers drive that
          price. Custom-built SIEMs, by contrast, cost more upfront; however,
          they remove per-GB pricing and recurring license fees. As a result,
          high-volume, multi-tenant environments gain far more value from a
          custom build at scale.
        </QuickAnswer>

        <div className="mt-10">
          <KeyTakeaways
            items={[
              "First of all, licensed SIEMs charge based on ingestion volume, retention, and feature tiers; consequently, costs grow fast as data volumes rise.",
              "Custom-built SIEMs, on the other hand, swap recurring license fees for upfront engineering investment, and as a result, high-volume environments typically break even within 12 to 18 months.",
              "Moreover, hidden costs often run 30% to 50% above published pricing, because tuning, professional services, storage overruns, and data egress all add up.",
              "In addition, multi-tenant operators get the strongest return; therefore, MSSPs and large enterprises benefit most.",
              "Finally, four factors decide the right model: namely, data volume, engineering capacity, compliance needs, and growth trajectory.",
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
          To begin with, licensed SIEM pricing is based on four measurable
          inputs. Let&apos;s walk through each one in turn.
        </P>

        <H3>Ingestion volume</H3>
        <P>
          For example, Splunk, Microsoft Sentinel, and IBM QRadar are all priced
          based on data volume. Specifically, rates range from €1 to €4 per GB
          per day. As a result, at 100 GB per day or more, this line item
          accounts for the majority of total spend.
        </P>

        <H3>Retention periods</H3>
        <P>
          Similarly, standard licensed plans include 30 to 90 days of hot
          storage. However, NIS2 and DORA mandate longer log retention windows,
          as our{" "}
          <Ref to="nis2-dora-compliance-guide">
            NIS2 and DORA compliance guide
          </Ref>{" "}
          explains. Because of this, extended retention activates additional
          storage tiers, and in turn, each tier raises the annual cost.
        </P>

        <H3>Feature tiers</H3>
        <P>
          In addition, core detection, SOAR integration, behavioral analytics,
          and threat intelligence feeds are available only on higher-cost plans.
          Consequently, teams on entry-level licenses hit a ceiling fast.
          Therefore, they upgrade when advanced correlation or automated
          response becomes necessary. For more detail, our{" "}
          <Ref to="soar-playbooks-guide">SOAR playbooks guide</Ref> covers what
          response automation involves at each tier.
        </P>

        <H3>Tenant count</H3>
        <P>
          Finally, per-tenant licensing sharply increases costs for MSSPs and
          enterprises with multiple business units. Unfortunately, most licensed
          platforms were not built for true multi-tenancy. As a result, each new
          tenant requires a separate instance, a separate license, and separate
          overhead. To see how this plays out in practice, our{" "}
          <Ref to="multi-tenant-siem-architecture">
            multi-tenant SIEM architecture guide
          </Ref>{" "}
          breaks it down.
        </P>

        <H2 id="hidden-costs">What Hidden SIEM Costs Do Teams Overlook?</H2>
        <P>
          Beyond the sticker price, published pricing rarely reflects total cost
          of ownership. In fact, security teams hit four hidden costs that never
          appear in a vendor proposal.
        </P>
        <P>
          <Strong>Tuning and maintenance.</Strong> To start with, out-of-the-box
          rules generate substantial false positives. As a result, analysts
          adjust thresholds, refine detection logic, and update parsers on an
          ongoing basis. Unfortunately, most teams underestimate this time
          during procurement.
        </P>
        <P>
          <Strong>Professional services.</Strong> Additionally, initial setup,
          data source integration, and legacy migration require vendor
          consultants or third parties. Consequently, engagements range from
          tens of thousands to six figures, depending on environmental
          complexity.
        </P>
        <P>
          <Strong>Storage overruns.</Strong> Moreover, security incidents,
          audits, and new data sources push ingestion above contracted tiers.
          When that happens, vendors bill overages at rates well above the base
          per-GB cost.
        </P>
        <P>
          <Strong>Data egress.</Strong> On top of that, cloud-hosted SIEMs
          charge for data egress from the platform. Therefore, teams exporting
          logs for analysis, archiving, or compliance accumulate egress fees
          year-round.
        </P>
        <P>
          Taken together, these four categories add an estimated 30-50 percent
          to the base licensing fees. That said, actual figures vary by
          environment and vendor.
        </P>

        <H2 id="which-costs-less">
          Licensed SIEM vs. Custom-Built: Which Model Costs Less?
        </H2>
        <P>
          Ultimately, the answer depends on data volume and time horizon. To
          make the comparison clear, let&apos;s look at each model in turn.
        </P>

        <H3>How licensed SIEMs work financially</H3>
        <P>
          To begin with, costs start on day one. On the surface, the structure
          is predictable; however, the actual bill is not. In practice, a
          growing environment produces a growing bill. On the plus side,
          licensed platforms deploy in weeks with no upfront engineering
          investment.
        </P>

        <H3>How custom-built SIEMs work financially</H3>
        <P>
          In contrast, a custom-built SIEM requires significant upfront
          engineering effort to design, build, and integrate. After that initial
          phase, however, ongoing costs cover infrastructure only. In other
          words, compute, storage, and maintenance replace per-GB licensing
          fees. For a fuller picture, our{" "}
          <Ref to="custom-siem-soar-services">
            custom SIEM and SOAR development service
          </Ref>{" "}
          outlines what this work involves.
        </P>
        <P>
          Alternatively, open-source components offer a different path to cost
          control. That said, this route carries its own trade-offs, all of
          which are covered in our{" "}
          <Ref to="open-source-vs-custom-siem">
            open-source vs. custom-built SIEM guide
          </Ref>
          .
        </P>

        <H3>Where the break-even point falls</H3>
        <P>
          Generally speaking, for most high-volume environments, the
          custom-built total cost drops below licensed spend within 18 to 36
          months. However, organizations under 50 GB per day rarely reach that
          crossover fast enough to justify the build. In contrast, those at 100
          GB per day or more see a clear financial case within the window.
          Furthermore, MSSPs with multiple clients reach it fastest of all.
        </P>

        <H2 id="who-benefits">Who Benefits Most From a Custom-Built SIEM?</H2>
        <P>
          As a general rule, custom-built SIEMs deliver the strongest return in
          four specific scenarios. Let&apos;s consider each one.
        </P>
        <P>
          <Strong>MSSPs managing multiple tenants.</Strong> First and foremost,
          licensing costs multiply with each client on most commercial
          platforms. By comparison, a custom architecture with native
          multi-tenancy removes per-tenant licensing and, in turn, shares
          infrastructure across clients. To understand how this works, our{" "}
          <Ref to="mssp-engineering-partner">
            MSSP engineering partner services
          </Ref>{" "}
          overview explains it in detail.
        </P>
        <P>
          <Strong>High-volume enterprise environments.</Strong> Similarly,
          organizations ingesting hundreds of gigabytes daily face compounding
          per-GB costs. Because of this, a fixed-cost infrastructure model grows
          more favorable at this scale.
        </P>
        <P>
          <Strong>Regulated industries with strict data control.</Strong> In
          addition, sectors under NIS2, DORA, HIPAA, or similar frameworks need
          granular control over data residency, retention architecture, and
          audit trails. Unfortunately, commercial platforms often cannot fully
          deliver that.
        </P>
        <P>
          <Strong>Teams with existing engineering capacity.</Strong> Finally,
          the model works best when the organization owns ongoing development
          and maintenance. Otherwise, without that capacity, operational costs
          erode the financial advantage.
        </P>

        <H2 id="real-world-savings">
          What Real-World Cost Reduction Can You Expect?
        </H2>
        <P>
          To be clear, exact figures depend on current spend, data volumes, and
          environment complexity. As a result, any vendor quoting specific
          percentages without an architecture review is simply not working from
          your numbers.
        </P>
        <P>
          Nevertheless, organizations migrating from high-volume licensed
          deployments to custom architectures consistently report meaningful
          reductions in annual security operations spend. In most cases, savings
          appear once the platform reaches steady state. Above all, eliminating
          per-GB ingestion fees and per-tenant licensing overhead drives the
          biggest gains.
        </P>
        <P>
          Of course, migration carries real risk. For that reason, our{" "}
          <Ref to="siem-migration-guide">zero-downtime migration guide</Ref>{" "}
          walks through how to move without a coverage gap.
        </P>

        <H2 id="which-model">Which SIEM Model Fits Your Situation?</H2>
        <P>To simplify the decision, use the quick reference below.</P>
        <DataTable
          caption="Guidance on choosing between licensed and custom-built SIEM by environment profile"
          head={FIT.head}
          rows={FIT.rows}
          highlightCol={1}
        />

        <H2 id="bottom-line">The Bottom Line</H2>
        <P>
          On the one hand, licensed SIEMs offer speed and a lower upfront cost.
          Therefore, for teams early in their security journey or running modest
          data volumes, that is a real advantage. On the other hand, the per-GB
          model creates a structural problem; specifically, a growing
          environment generates a growing bill, often outpacing improvements in
          security posture.
        </P>
        <P>
          By contrast, custom-built SIEMs require patience and upfront
          engineering investment. Even so, for MSSPs, high-volume enterprises,
          and regulated operators, the investment pays off within two to three
          years. Moreover, the cost curve flattens sharply after that point.
        </P>
        <P>
          In the end, which model costs less depends on where you stand today
          and where you are headed. Consequently, a clear look at current spend,
          growth trajectory, and internal capacity gives you the answer.
        </P>

        <H2 id="faq">Frequently Asked Questions</H2>
        <div className="mt-6">
          <FaqAccordion faqs={FAQS} columns={1} />
        </div>
      </ArticleShell>
    </>
  );
}
