import type { Metadata } from "next";
import { ArticleShell, type TocEntry } from "@/components/blog/article-shell";
import {
  Bullets,
  Checklist,
  DataTable,
  H2,
  KeyTakeaways,
  Numbered,
  P,
  QuickAnswer,
  Ref,
  Strong,
} from "@/components/blog/prose";
import { FaqAccordion } from "@/components/ui/faq";
import { breadcrumbLd, faqLd, type Faq } from "@/lib/jsonld";
import { breadcrumbLabel, postBySlug } from "@/lib/blog";
import { CTA_HREF, OG_IMAGE, SITE } from "@/lib/site";

const post = postBySlug("multi-tenant-siem-architecture-mssps")!;
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
  { id: "what-is-it", label: "What is a multi-tenant SIEM?" },
  { id: "vs-single-tenant", label: "Multi-tenant vs. single-tenant" },
  { id: "vendor-gaps", label: "Why vendor platforms fall short" },
  { id: "data-separation", label: "How client data stays separate" },
  { id: "detection-rules", label: "How detection rules work per client" },
  { id: "dashboards", label: "Client dashboards and reports" },
  { id: "scaling", label: "Growing without costs spiralling" },
  { id: "compliance", label: "Compliance and data laws" },
  { id: "custom-vs-vendor", label: "Custom-built vs. vendor" },
  { id: "checklist", label: "Architecture checklist" },
  { id: "faq", label: "Frequently asked questions" },
];

const TENANCY = {
  head: ["Feature", "Single-Tenant", "Multi-Tenant"],
  rows: [
    ["Data separation", "One system per client", "Clients kept apart by design"],
    ["Detection rules", "Copied for each client", "Managed in one place"],
    ["Dashboards", "Separate per client", "Branded per client"],
    ["Cost", "Grows with every client", "Scales more efficiently"],
    ["Management work", "High", "Much lower"],
    ["Compliance setup", "Hard to customise", "Easy to set per client"],
    ["Upgrades", "One per system", "One for all"],
  ],
};

const COMPLIANCE = {
  head: ["Framework", "Who It Covers", "What Your SIEM Must Do"],
  rows: [
    ["HIPAA", "US healthcare", "Log patient data access; encrypt data"],
    ["PCI DSS", "Payment card processors", "Keep logs 12 months; control access"],
    [
      "SOC 2",
      "Technology companies",
      "Show uptime, confidentiality, and change management",
    ],
    [
      "GDPR",
      "Organizations handling EU residents' data",
      "Store data in-region; allow deletion; report breaches fast",
    ],
    [
      "ISO 27001",
      "General enterprise",
      "Run a full security management system with audit trails",
    ],
  ],
};

const BUILD_VS_BUY = {
  head: ["Factor", "Vendor Platform", "Custom-Built Platform"],
  rows: [
    ["Time to launch", "Faster (weeks)", "Slower (months)"],
    ["Upfront cost", "Lower", "Higher"],
    ["Ongoing cost", "Grows with each new client", "More predictable"],
    ["Client separation", "Often limited", "Built to your exact needs"],
    ["Branding", "Restricted", "Fully configurable"],
    ["Detection tuning", "Limited by vendor", "Full control"],
    ["Full ownership", "No", "Yes"],
    ["Vendor lock-in", "High", "None"],
  ],
};

const FAQS: Faq[] = [
  {
    q: "What is multi-tenant SIEM architecture?",
    a: "It's one platform that handles security for many clients at once. Each client's data stays separate, rules are set per client, and reports are isolated. No separate system needed per client.",
  },
  {
    q: "How many clients can a multi-tenant SIEM support?",
    a: "It depends on how the system is built. Well-designed custom platforms can handle hundreds of clients. Vendor platforms vary, some cap the number at the workspace or subscription level.",
  },
  {
    q: "What's the difference between logical and physical data isolation?",
    a: "Logical isolation splits client data inside shared systems using access rules and filters. Physical isolation stores each client's data separately. Physical gives stronger compliance proof. Logical costs less when done right.",
  },
  {
    q: "Can MSSPs use Microsoft Sentinel as a multi-tenant SIEM?",
    a: "Yes, through Azure Lighthouse. But per-workspace costs, limited branding, and restricted rule tuning make it better for smaller MSSP operations than large, varied client portfolios.",
  },
  {
    q: "How does multi-tenant SIEM connect to SOAR automation?",
    a: "Each alert should trigger a response for the right client only. An alert from Client A should never start an action in Client B's environment. This requires a SOAR tool that handles client context by design, not as an add-on.",
  },
  {
    q: "What should MSSPs look for in a multi-tenant SIEM vendor?",
    a: "Look for built-in client separation, per-client detection rules, API-level access control, regional data routing, branded dashboards, and pricing that doesn't jump with every new client. Full platform ownership is a major plus for MSSPs with growing or specialized needs.",
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
              { name: "Blog", path: "/blog" },
              { name: breadcrumbLabel(post.slug), path: PATH },
            ])
          ),
        }}
      />

      <ArticleShell
        post={post}
        toc={TOC}
        cta={{
          heading: "Ready to check your SIEM setup?",
          body: "A SIEM that works well at 10 clients often struggles at 25 — not because it failed, but because it was never built for that size. A structured audit finds the gaps before they become client problems.",
          label: "Book an Architecture Audit",
          href: CTA_HREF,
        }}
      >
        <QuickAnswer>
          A multi-tenant SIEM lets you run security for many clients from one
          platform. Each client&apos;s data and alerts stay fully separate. It
          saves money, reduces work, and keeps you in control.
        </QuickAnswer>

        <P>
          (New to the term? A SIEM collects security logs, spots threats, and
          sends alerts. Think of it as a security watchdog for your
          clients&apos; networks.)
        </P>

        <div className="mt-10">
          <KeyTakeaways
            items={[
              "One SIEM for all clients beats running a separate one for each.",
              "Shared detection rules don't work. Every client needs their own.",
              "Branded dashboards help you look professional and protect client relationships.",
              "Data laws vary by country and industry. Your setup must handle this from the start.",
              "Custom-built platforms give you full control. Vendor platforms are faster to launch but harder to scale.",
            ]}
          />
        </div>

        <H2 id="what-is-it">What Is a Multi-Tenant SIEM?</H2>
        <P>
          A multi-tenant SIEM is one platform that serves many clients at the
          same time.
        </P>
        <P>
          Each client is called a &ldquo;tenant.&rdquo; Every tenant gets their
          own data, rules, dashboards, and alerts. Nothing from one client leaks
          into another.
        </P>
        <P>
          Without this, you need a separate SIEM for every client. That works
          fine for five clients. At 20 clients, you&apos;re running 20 platforms
          and paying 20 bills. Costs grow fast. Revenue doesn&apos;t keep up.
        </P>
        <P>
          A multi-tenant SIEM fixes this. One platform. All clients. Each one
          fully separated.
        </P>

        <H2 id="vs-single-tenant">Multi-Tenant vs. Single-Tenant SIEM</H2>
        <DataTable
          caption="Single-tenant and multi-tenant SIEM compared across seven operational factors"
          head={TENANCY.head}
          rows={TENANCY.rows}
          highlightCol={2}
        />
        <P>
          Single-tenant setups cost more as you grow. Multi-tenant setups let
          you add clients without costs jumping every time.
        </P>

        <H2 id="vendor-gaps">Why Vendor SIEM Platforms Fall Short for MSSPs</H2>
        <P>
          Most SIEMs were built for big companies. They were not built for MSSPs
          running dozens of clients.
        </P>
        <P>Here&apos;s where they fall short:</P>
        <Bullets
          items={[
            <>
              <Strong>Per-client fees:</Strong> Every new client adds to your
              vendor bill.
            </>,
            <>
              <Strong>Weak client separation:</Strong> Many platforms add this
              as an afterthought, not a core feature.
            </>,
            <>
              <Strong>Rigid rules:</Strong> Tuning alerts per client is clunky
              and doesn&apos;t scale.
            </>,
            <>
              <Strong>Limited branding:</Strong> Adding your logo often needs
              custom development.
            </>,
            <>
              <Strong>Vendor lock-in:</Strong> You&apos;re stuck with their
              roadmap. What you need may never arrive.
            </>,
          ]}
        />
        <P>These problems get worse as your client list grows.</P>

        <H2 id="data-separation">How Should Client Data Stay Separate?</H2>
        <P>
          Keeping client data apart is a must. If Client A&apos;s logs appear in
          Client B&apos;s view, you have a serious problem both legally and with
          trust.
        </P>
        <P>
          <Strong>Two ways to do it:</Strong>
        </P>
        <Bullets
          items={[
            <>
              <Strong>Logical isolation:</Strong> Splits data within shared
              systems using client IDs and access rules. Costs less. Works well
              if done correctly.
            </>,
            <>
              <Strong>Physical isolation:</Strong> Stores each client&apos;s
              data separately. Costs more. Stronger proof for regulated
              industries.
            </>,
          ]}
        />
        <P>
          <Strong>Best practices:</Strong>
        </P>
        <Bullets
          items={[
            "Tag every record with a client ID as soon as it arrives. Don't do this later.",
            <>
              Set access rules at the API level.{" "}
              <em className="text-muted">
                (An API is how two systems talk to each other. Rules here
                can&apos;t be bypassed.)
              </em>
            </>,
            "Log every time anyone views data across clients, including your own team.",
            "Test your data separation regularly. Not just at setup.",
          ]}
        />

        <H2 id="detection-rules">How Should Detection Rules Work Per Client?</H2>
        <P>
          One shared rule set won&apos;t work. Clients are in different
          industries with different tools and different risks.
        </P>
        <P>You need three layers:</P>
        <Numbered
          items={[
            <>
              <Strong>Global rules,</Strong> basic checks for all clients.
              Failed logins, logins from unusual places, and known bad IP
              addresses. You manage these in one place.
            </>,
            <>
              <Strong>Industry rules,</Strong> tuned to what each client does.
              Healthcare clients need alerts for unusual access to patient
              records. Financial clients need alerts for after-hours transfers.
            </>,
            <>
              <Strong>Per-client overrides</Strong> fix for one specific client.
              If Client X scans its own network every Thursday, that should not
              trigger an alert for that client only.
            </>,
          ]}
        />
        <P>
          To make this work, track rule versions, log per-client changes, and
          push global updates without wiping local settings.
        </P>
        <P>
          Want to know how detections trigger automatic responses? See our guide
          to <Ref to="soar-playbooks-guide">SOAR playbooks at MSSP</Ref> scale.
        </P>

        <H2 id="dashboards">
          What Should Client Dashboards and Reports Look Like?
        </H2>
        <P>
          For most clients, the dashboard is the product. It&apos;s how they
          judge your service.
        </P>
        <P>Every per-client dashboard should have:</P>
        <Bullets
          items={[
            <>
              <Strong>Your branding,</Strong> not the tool vendor&apos;s name or
              logo.
            </>,
            <>
              <Strong>The right view for each user,</Strong> simple summaries
              for executives, alert queues for analysts.
            </>,
            <>
              <Strong>Scheduled and on-demand reports,</Strong> branded, scoped
              to that client only.
            </>,
            <>
              <Strong>Performance metrics,</Strong> how fast you spot and fix
              threats, are shown per client.
            </>,
          ]}
        />
        <P>
          White-labeling also protects your business. If clients use your
          vendor&apos;s interface directly, they may build loyalty to the
          vendor, not to you.
        </P>

        <H2 id="scaling">How Can MSSPs Grow Without Costs Spiraling?</H2>
        <P>
          Many MSSPs look fine at 10 clients and start struggling at 30. Costs
          grow faster than revenue. Multi-tenant architecture helps in four key
          ways:
        </P>
        <Bullets
          items={[
            <>
              <Strong>One shared data pipeline,</Strong> not one per client.
            </>,
            <>
              <Strong>One central rules library,</Strong> with per-client
              tweaks, not dozens of separate copies.
            </>,
            <>
              <Strong>Predictable storage costs,</Strong> you set retention and
              storage per client, so cost matches what they pay.
            </>,
            <>
              <Strong>Flexible capacity,</Strong> adding a client doesn&apos;t
              mean adding new infrastructure.
            </>,
          ]}
        />
        <P>
          This is where{" "}
          <Ref to="mssp-engineering-partner">WhyCrew&apos;s MSSP partner</Ref>{" "}
          program helps you plan for growth before costs force a painful
          rebuild.
        </P>

        <H2 id="compliance">What Compliance and Data Laws Apply?</H2>
        <P>
          Compliance rules apply per client, not to your MSSP overall. Different
          clients follow different rules.
        </P>
        <DataTable
          caption="Compliance frameworks an MSSP's clients commonly fall under, and what each requires from the SIEM"
          head={COMPLIANCE.head}
          rows={COMPLIANCE.rows}
          highlightCol={2}
        />
        <P>
          <Strong>Data residency</Strong> means where data is physically stored.
          A US-only SIEM cannot legally hold EU clients&apos; data. A good
          multi-tenant platform routes each client&apos;s data to the right
          region, all from one control point.
        </P>

        <H2 id="custom-vs-vendor">
          Custom-Built vs. Vendor SIEM: Which Is Right for You?
        </H2>
        <DataTable
          caption="Vendor and custom-built multi-tenant SIEM platforms compared across eight decision factors"
          head={BUILD_VS_BUY.head}
          rows={BUILD_VS_BUY.rows}
          highlightCol={2}
        />
        <P>
          <Strong>Choose a vendor platform</Strong> if you&apos;re just
          starting, need to move fast, and manage fewer than 15&ndash;20 clients
          with similar compliance needs.
        </P>
        <P>
          <Strong>
            Choose a{" "}
            <Ref to="custom-siem-soar-services">custom built platform</Ref>
          </Strong>{" "}
          if you manage 20 or more clients, deal with complex compliance rules,
          need strong branding, or want full control over your roadmap.
        </P>
        <P>
          For MSSPs in the second group, a purpose-built multi-tenant SIEM
          removes vendor limits and gives you a foundation that grows with your
          business.
        </P>

        <H2 id="checklist">Architecture Checklist: Are You Ready?</H2>
        <P>
          Before you deploy or switch to a multi-tenant SIEM, confirm all of
          these:
        </P>
        <Checklist
          items={[
            "Data separation is enforced when data first enters the system, not just in the dashboard.",
            "Access rules are set at the API level, scoped per client.",
            "Detection rules support global, industry, and per-client layers.",
            "Branded dashboards can be set up per client without writing code.",
            "Regional data routing is available for clients with data residency needs.",
            "All analyst actions, including cross-client access, are logged.",
            "Adding a new client needs no new infrastructure.",
            "Compliance report templates exist for your most common frameworks.",
            "Response time metrics are tracked and shown per client.",
            "Detections connect directly to automated response workflows.",
          ]}
        />
        <P>
          Getting this right from the start saves you from costly fixes later,
          when your 30th client asks for something your 5th client never needed.
        </P>
        <P>
          Weighing the build itself? The{" "}
          <Ref to="siem-cost-licensing">SIEM licensing cost breakdown</Ref> and{" "}
          <Ref to="open-source-vs-custom-siem">
            the open-source comparison
          </Ref>{" "}
          cover the two decisions that usually come next, and the{" "}
          <Ref to="siem-migration-guide">zero-downtime migration guide</Ref>{" "}
          covers moving clients across once you&apos;ve chosen.
        </P>

        <H2 id="faq">Frequently Asked Questions</H2>
        <div className="mt-6">
          <FaqAccordion faqs={FAQS} columns={1} />
        </div>
      </ArticleShell>
    </>
  );
}
