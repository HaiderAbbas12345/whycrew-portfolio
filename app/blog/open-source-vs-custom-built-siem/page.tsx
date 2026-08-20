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
import { OG_IMAGE, SITE } from "@/lib/site";

const post = postBySlug("open-source-vs-custom-built-siem")!;
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
    images: OG_IMAGE,
  },
  twitter: {
    card: "summary_large_image",
    title: post.metaTitle,
    description: post.metaDescription,
  },
};

const TOC: TocEntry[] = [
  { id: "key-takeaways", label: "Key takeaways" },
  { id: "at-a-glance", label: "Open-source vs. custom-built at a glance" },
  { id: "open-source-cost", label: "What does open-source SIEM cost?" },
  { id: "what-is-custom-built", label: "What is a custom-built SIEM?" },
  { id: "mssp-scale", label: "Can open-source scale for MSSPs?" },
  { id: "regulated", label: "Performance in regulated environments" },
  { id: "detection-quality", label: "Comparing detection quality" },
  { id: "setup-maintenance", label: "Where each model places the burden" },
  { id: "decision-table", label: "Decision support table" },
  { id: "bottom-line", label: "What your team can actually support" },
  { id: "faq", label: "Frequently asked questions" },
];

const GLANCE = {
  head: ["Factor", "Open-Source SIEM", "Custom-Built SIEM"],
  rows: [
    ["Licensing cost", "None", "None"],
    ["Engineering cost", "High (implementation + ongoing)", "High upfront, lower ongoing"],
    ["Platform ownership", "Implementation only", "Full platform + roadmap"],
    ["Roadmap control", "Community-driven", "Fully internal"],
    ["Multi-tenancy", "Limited / requires significant rework", "Native"],
    ["Compliance control", "Partial", "Full"],
    ["Detection quality", "Community rules + custom effort", "Purpose-built, maintained"],
    ["Scalability", "Infrastructure-dependent", "Architecture-driven"],
    ["Time to production", "Months", "Months"],
    ["Maintenance burden", "High (team-owned)", "Controlled (engineering team)"],
  ],
};

const DECISION = {
  head: ["If your situation looks like this…", "Consider this model"],
  rows: [
    ["Small team, limited budget, low data volume", "Open-source SIEM"],
    ["Proof-of-concept or internal research environment", "Open-source SIEM"],
    ["Engineering team comfortable with ongoing platform ops", "Open-source SIEM"],
    ["Managing 5+ tenants with strict data isolation requirements", "Custom-built SIEM"],
    ["Operating in regulated sectors (NIS2, DORA, HIPAA)", "Custom-built SIEM"],
    ["Needing full roadmap control and retention architecture ownership", "Custom-built SIEM"],
    ["Scaling MSSP operations with SLA-driven reporting requirements", "Custom-built SIEM"],
    ["Current open-source deployment is becoming operationally unsustainable", "Custom-built SIEM"],
  ],
};

const FAQS: Faq[] = [
  {
    q: "Is open-source SIEM actually free?",
    a: "Open-source SIEM software carries no licensing cost, but the total cost of ownership is rarely low. Engineering effort for deployment, infrastructure provisioning, and ongoing maintenance represents real costs that teams frequently underestimate during initial evaluation.",
  },
  {
    q: "What is the main difference between open-source and custom-built SIEM?",
    a: "Open-source gives you control over your implementation of a community-maintained platform. Custom-built gives you control over the entire platform — including its architecture, roadmap, and evolution over time. In an open-source deployment, the core platform develops on a community timeline; in a custom-built deployment, that timeline is entirely internal.",
  },
  {
    q: "Can open-source SIEMs handle enterprise-scale log volumes?",
    a: "They can, but infrastructure costs and operational complexity scale accordingly. Open-source platforms don't charge per GB, but storage and compute costs at high ingestion volumes can approach or exceed mid-market commercial alternatives — without the operational abstraction that managed platforms provide.",
  },
  {
    q: "Which SIEM model is better for compliance with NIS2 or DORA?",
    a: "Custom-built SIEMs typically offer stronger compliance positioning because retention architecture, audit trail controls, and data residency can be designed to specification from the ground up. Open-source platforms can meet these requirements, but often require custom development to fill gaps in native compliance capabilities.",
  },
  {
    q: "How long does it take to deploy an open-source SIEM vs. a custom-built one?",
    a: "Both typically require several months to reach production for complex environments. Open-source deployments can move slightly faster for basic configurations, but customization and integration work often extend timelines significantly. Custom-built platforms require longer upfront design phases but are built to specification from the start.",
  },
  {
    q: "At what point should an MSSP move from open-source to a custom-built SIEM?",
    a: "The inflection point is typically when the operational overhead of maintaining a retrofitted multi-tenant architecture begins to consume more resources than building a purpose-built one would have. For most MSSPs, this becomes apparent somewhere between five and fifteen active tenants, though it depends heavily on client complexity and SLA requirements.",
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
          heading: "Not sure which model your environment can realistically support?",
          body: "Book an Architecture Audit to map out the right approach for your data volumes, team capacity, and compliance requirements.",
          label: "Book an Architecture Audit",
          href: "/contact",
        }}
      >
        <QuickAnswer>
          Open-source SIEMs like Wazuh and OpenSearch eliminate licensing fees
          but shift high costs to engineering, infrastructure, and ongoing
          maintenance. Custom-built SIEMs go further, delivering a purpose-built
          platform with native multi-tenancy, controlled retention architecture,
          and a roadmap that belongs entirely to your organization rather than a
          community consensus.
        </QuickAnswer>

        <div className="mt-10">
          <KeyTakeaways
            items={[
              "Open-source SIEMs have no licensing fees, but total cost of ownership is rarely low once you account for engineering effort, infrastructure, and maintenance.",
              "The key distinction between open-source and custom-built is platform ownership: open-source gives you control over your implementation; custom-built gives you control over the entire platform roadmap.",
              "Multi-tenancy is a critical gap in most open-source SIEMs; architectures designed for single tenants require significant rework to serve multiple clients.",
              "Regulated environments (NIS2, DORA, HIPAA) often expose compliance gaps in open-source deployments around retention architecture and audit trail control.",
              "Detection quality depends on rule maintenance and integration depth, areas where custom-built platforms typically hold a structural advantage.",
            ]}
          />
        </div>

        <H2 id="at-a-glance">Open-Source vs. Custom-Built SIEM at a Glance</H2>
        <DataTable
          caption="Comparison of open-source and custom-built SIEM across cost, ownership, and operational factors"
          head={GLANCE.head}
          rows={GLANCE.rows}
          highlightCol={2}
        />

        <H2 id="open-source-cost">
          What Does Open-Source SIEM Actually Cost in Practice?
        </H2>
        <P>
          The appeal of open-source is straightforward: no vendor contract, no
          per-GB pricing, no license negotiation. For teams evaluating platforms
          like Wazuh, OpenSearch, or Graylog, that starting point is genuinely
          attractive.
        </P>
        <P>
          But &ldquo;free software&rdquo; and &ldquo;low cost&rdquo; are not the
          same thing.
        </P>

        <H3>Engineering effort</H3>
        <P>
          Deploying an open-source SIEM to production requires substantial
          engineering time. Parsing log sources, building detection rules,
          configuring alerting pipelines, and integrating with ticketing or SOAR
          systems are all tasks the team must own. For a moderately complex
          environment, initial deployment commonly requires several months of
          dedicated engineering effort.
        </P>

        <H3>Hidden infrastructure costs</H3>
        <P>
          Open-source platforms require you to provision and manage your own
          infrastructure — compute, storage, networking, and redundancy. At
          meaningful log volumes, storage costs alone can approach or exceed the
          fees charged by some mid-market licensed SIEMs, without the
          operational abstraction that a managed platform provides.
        </P>

        <H3>Ongoing maintenance</H3>
        <P>
          Open-source SIEM maintenance is continuous. Teams must evaluate, test,
          and apply community updates. Detection rules degrade as attacker
          behavior evolves. Parser libraries need to be updated as log formats
          change. Without a dedicated team, the platform&apos;s effectiveness
          erodes over time, often gradually enough that teams don&apos;t notice
          until a detection gap becomes visible.
        </P>

        <H2 id="what-is-custom-built">
          What Is a Custom-Built SIEM, and How Does It Differ From Open-Source?
        </H2>
        <P>
          Both open-source and custom-built SIEMs move away from commercial
          licensing. The distinction lies in what you control.
        </P>
        <P>
          With an open-source SIEM, your team controls how the platform is
          configured, deployed, and tuned. The underlying platform itself,
          however, evolves on a community timeline. Updates, architectural
          decisions, and core feature development happen upstream, and your
          ability to influence them is limited.
        </P>
        <P>
          With a custom-built SIEM, the platform roadmap is fully yours.
          Architectural decisions, data pipeline design, retention tiers,
          detection logic, multi-tenancy structure, and compliance controls are
          made internally and evolve based on your organization&apos;s needs,
          not a community consensus or vendor product cycle.
        </P>
        <P>
          That distinction matters most when your requirements diverge from what
          the community is building toward, which is exactly the situation MSSPs
          and regulated enterprises tend to find themselves in.
        </P>
        <P>
          Our{" "}
          <Ref to="custom-siem-soar-services">
            custom SIEM development service
          </Ref>{" "}
          describes how this model is typically structured.
        </P>

        <H2 id="mssp-scale">Can Open-Source SIEM Scale for MSSPs?</H2>
        <P>
          Multi-tenancy is where open-source SIEMs most consistently fall short
          for managed service providers.
        </P>
        <P>
          Platforms like Wazuh were designed with single-tenant architectures.
          Adapting them to serve multiple clients with strict data isolation,
          per-tenant alerting, per-tenant retention, and separate dashboards
          requires significant custom engineering. The result is often a fragile
          architecture that works at a small scale but becomes difficult to
          operate reliably as client count grows.
        </P>
        <P>
          The challenges of multi-tenancy go beyond data isolation. MSSPs need
          to onboard new tenants quickly, apply tenant-specific detection rules
          without disrupting others, and report on per-client SLA metrics. These
          capabilities are rarely native in open-source platforms.
        </P>
        <P>
          Custom-built architectures designed with multi-tenancy as a core
          requirement, rather than a retrofit, handle these operational
          realities much better. See our{" "}
          <Ref to="multi-tenant-siem-architecture">
            multi-tenant SIEM architecture guide
          </Ref>{" "}
          for MSSPs for a detailed breakdown.
        </P>

        <H2 id="regulated">
          Why Does Custom-Built SIEM Perform Better in Regulated Environments?
        </H2>
        <P>
          Compliance requirements create specific architectural demands that
          open-source platforms weren&apos;t always designed to meet.
        </P>

        <H3>Compliance gaps in open-source deployments</H3>
        <P>
          NIS2 and DORA both mandate specific log retention periods, audit trail
          integrity, and incident reporting capabilities. Meeting these
          requirements with an open-source SIEM is possible, but it requires
          custom development to address gaps the core platform doesn&apos;t
          handle natively. Our{" "}
          <Ref to="nis2-dora-compliance-guide">
            NIS2 and DORA compliance resource
          </Ref>{" "}
          outlines the specific requirements organizations need to account for.
        </P>

        <H3>Retention architecture</H3>
        <P>
          Regulators care not just about whether logs are retained, but also
          about immutability, chain of custody, and access controls. Open-source
          platforms vary significantly in how well they support these controls
          out of the box. Custom-built platforms can be designed from the ground
          up to meet retention requirements precisely, without workarounds.
        </P>

        <H2 id="detection-quality">
          How Do Open-Source and Custom-Built SIEMs Compare on Detection
          Quality?
        </H2>
        <P>
          Detection quality is a function of rule coverage, maintenance cadence,
          and integration depth, not platform origin.
        </P>
        <P>
          Open-source SIEMs benefit from community-maintained rule sets, which
          can be extensive. The challenge is that community rules are generic by
          design. They&apos;re written for broad applicability, not for the
          specific data sources, log formats, and threat patterns relevant to
          your environment. Adapting them requires ongoing analyst effort.
        </P>
        <P>
          Custom-built platforms can be built with detection logic tuned
          specifically to the environments they monitor. Rules are developed
          against actual data sources, validated against known threat patterns,
          and maintained by engineers who understand the specific architecture.
          False positive rates tend to be lower; detection coverage for
          environment-specific threats tends to be higher.
        </P>
        <P>
          The gap is most pronounced in specialized environments, such as OT/ICS
          networks, heavily regulated industries, or multi-cloud architectures,
          where generic community rules provide limited coverage.
        </P>

        <H2 id="setup-maintenance">
          Setup and Maintenance: Where Each Model Places the Burden
        </H2>
        <P>
          Both open-source and custom-built SIEMs require significant
          engineering involvement. The difference is in where that burden falls
          over time.
        </P>
        <P>
          <Strong>Open-source SIEMs</Strong> front-load some effort but
          distribute the maintenance burden indefinitely. Every version upgrade,
          every new log source, and every detection gap that emerges requires
          team intervention. There&apos;s no vendor to call. The platform is
          yours to operate — and yours to fix.
        </P>
        <P>
          <Strong>Custom-built SIEMs</Strong> require concentrated upfront
          investment in design and build. After that, maintenance is structured
          around the platform&apos;s own roadmap — one that your engineering
          team controls. Changes are planned and intentional rather than
          reactive to upstream community decisions.
        </P>
        <P>
          For teams planning a migration from a commercial or open-source
          platform, our{" "}
          <Ref to="siem-migration-guide">
            zero-downtime SIEM migration guide
          </Ref>{" "}
          covers how to structure the transition.
        </P>

        <H2 id="decision-table">Decision Support Table</H2>
        <DataTable
          caption="Guidance on choosing between open-source and custom-built SIEM by environment profile"
          head={DECISION.head}
          rows={DECISION.rows}
          highlightCol={1}
        />

        <H2 id="bottom-line">
          The Decision Comes Down to What Your Team Can Actually Support
        </H2>
        <P>
          Open-source SIEMs are a legitimate choice. For resource-constrained
          teams in the early stages of security maturity, they provide a
          functional detection platform without licensing overhead.
        </P>
        <P>
          The honest limitation is operational: open-source platforms require
          your team to own not just the implementation but also the ongoing work
          of keeping the platform effective. Rule maintenance, version upgrades,
          integration updates, and infrastructure scaling are all team
          responsibilities.
        </P>
        <P>
          Custom-built SIEMs shift that model. You invest heavily upfront to
          build a platform that matches your requirements precisely — and then
          you own the roadmap. For MSSPs growing their client base, enterprises
          managing regulated data, or any organization where generic community
          rules and retrofitted multi-tenancy aren&apos;t sufficient, the
          custom-built approach removes the structural limitations that
          open-source platforms eventually hit.
        </P>
        <P>
          If you&apos;re operating an MSSP or building toward one, our{" "}
          <Ref to="mssp-engineering-partner">
            MSSP engineering partner services
          </Ref>{" "}
          outline how this partnership typically works.
        </P>

        <H2 id="faq">Frequently Asked Questions</H2>
        <div className="mt-6">
          <FaqAccordion faqs={FAQS} columns={1} />
        </div>
      </ArticleShell>
    </>
  );
}
