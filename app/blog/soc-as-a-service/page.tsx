import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArticleShell, type TocEntry } from "@/components/blog/article-shell";
import { DataTable, Figure, H2, H3, Numbered, P, Strong } from "@/components/blog/prose";
import { Button } from "@/components/ui/button";
import { FaqAccordion, type FaqItem } from "@/components/ui/faq";
import { breadcrumbLd, faqLd } from "@/lib/jsonld";
import { breadcrumbLabel, postBySlug, postPath } from "@/lib/blog";
import { ROBOTS, SITE } from "@/lib/site";
import { ogImage, ogImageLd } from "@/lib/og";
import { authorLd } from "@/lib/authors";

const post = postBySlug("soc-as-a-service")!;
const PATH = postPath(post);
const IMG = "/blog/soc-as-a-service";

export const metadata: Metadata = {
  // `absolute` keeps the title exactly as specified — the root layout's
  // "%s | WhyCrew" template would push it past the SERP cutoff.
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
  { id: "what-does-soc-as-a-service-mean", label: "What Does SOC As A Service Mean?" },
  { id: "how-does-soc-as-a-service-work", label: "How Does SOC As A Service Work?" },
  { id: "key-functions-of-soc-as-a-service", label: "Key Functions Of SOCaaS" },
  { id: "what-tools-does-soc-as-a-service-use", label: "What Tools Does A SOCaaS Provider Use?" },
  { id: "soc-as-a-service-roles-and-responsibilities", label: "Roles And Responsibilities In A SOCaaS Team" },
  { id: "who-uses-soc-as-a-service", label: "Who Needs SOCaaS?" },
  { id: "benefits-of-soc-as-a-service", label: "Benefits Of SOC As A Service" },
  { id: "challenges-of-soc-as-a-service", label: "What Are The Disadvantages Of SOCaaS?" },
  { id: "soc-as-a-service-vs-in-house-soc", label: "SOC As A Service Vs In-House SOC" },
  { id: "how-much-does-soc-as-a-service-cost", label: "How Much Does SOC As A Service Cost?" },
  { id: "how-to-choose-a-soc-as-a-service-provider", label: "How To Choose A SOCaaS Provider" },
  { id: "faq", label: "Frequently Asked Questions" },
];

const FAQS: FaqItem[] = [
  {
    q: "What Does SOCaaS Stand For?",
    a: "SOCaaS stands for Security Operations Center as a Service. It describes a subscription model where an outside provider delivers the monitoring, detection and response work of a SOC.",
  },
  {
    q: "What Is The Difference Between A SOC And SOC As A Service?",
    a: "A SOC is a security operations function an organization builds and staffs itself. SOC as a service delivers the same function through a third-party provider for a recurring fee, so you skip building the infrastructure and hiring the team.",
  },
  {
    q: "Does SOCaaS Replace A SIEM?",
    a: "Not exactly. Most SOCaaS offerings include a SIEM, either the provider's own or one you already have. The service adds the people and processes that turn SIEM alerts into investigated incidents and response actions.",
  },
  {
    q: "Is A Managed SOC Right For A Small Business?",
    a: "Often, yes. Small businesses rarely have the budget for a 24/7 security team, and an outsourced SOC gives them round-the-clock monitoring and expert response for a predictable monthly fee.",
  },
  {
    q: "Can A SOCaaS Provider Respond To Incidents?",
    a: "Yes, but the level varies. Some providers contain threats directly, for example by isolating devices or disabling accounts, while others investigate and guide your team. The contract should list exactly which actions the provider may take.",
  },
  {
    q: "How Long Does SOCaaS Onboarding Take?",
    a: "Most onboarding takes from a few days to a few weeks. The timeline depends on how many data sources need connecting, how complex your environment is and how quickly your team shares asset lists and access.",
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
    author: authorLd(post.author),
    publisher: { "@id": `${SITE.url}/#organization` },
    about: [
      { "@type": "Thing", name: "SOC as a service" },
      { "@type": "Thing", name: "Security operations center" },
    ],
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

/** Diagram from the article. The article's alt text is used as the image alt. */
function Fig({ file, height, alt }: { file: string; height: number; alt: string }) {
  return <Figure src={`${IMG}/${file}`} alt={alt} width={1344} height={height} />;
}

/** Inline CTA card, same frame as the other posts. */
function CtaCard({
  title,
  body,
  children,
}: {
  title: string;
  body: ReactNode;
  children: ReactNode;
}) {
  return (
    <aside
      aria-label={title}
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

      <ArticleShell post={post} toc={TOC}>
        <P>
          SOC as a service (SOCaaS) is a cloud-based subscription model where a
          third-party provider runs a Security Operations Center for your
          business. Its analysts and tools monitor your networks, endpoints,
          cloud, applications and logs 24/7, detect and triage threats,
          investigate incidents, help contain attacks and produce compliance
          reports for standards such as ISO 27001, HIPAA, PCI DSS and GDPR. You
          get the work of an in-house SOC without building the infrastructure or
          hiring a full security team. The main benefits are lower costs,
          round-the-clock expertise and faster response. The trade-offs are
          possible vendor lock-in, less direct control over tools and the need
          to share security data with an outside team.
        </P>
        <Fig
          file="soc-as-a-service-overview.webp"
          height={594}
          alt="SOC as a service overview: your environment sends logs to the SOCaaS provider's SIEM, analysts and automation, which return confirmed incidents, response actions and compliance reports"
        />

        <H2 id="what-does-soc-as-a-service-mean">What Does SOC As A Service Mean?</H2>
        <P>
          A Security Operations Center (SOC) is the team, processes and
          technology that watch an organization&apos;s systems for attacks and
          respond when something goes wrong. &quot;As a service&quot; means you
          rent that whole function instead of building it. The provider
          supplies the analysts, the security platform and the playbooks, and
          you pay a recurring fee.
        </P>
        <P>
          In practice, the provider connects to your environment, collects
          security data from it and works through alerts around the clock. Your
          team receives confirmed incidents, response actions and regular
          reports instead of a flood of raw alerts.
        </P>
        <P>
          Some providers deliver the service from their own cloud platform.
          Others work inside tools you already own, such as an existing SIEM or
          endpoint protection product. Both models count. The difference is who
          owns and runs the technology.
        </P>
        <H3>Is It The Same As A SOC 2 Report?</H3>
        <P>
          The service is often confused with SOC 1, SOC 2 and SOC 3 reports
          because they share the same three letters. Those reports are audits
          of System and Organization Controls that check how a service provider
          protects customer data. A SOCaaS provider can help you collect the
          logs and evidence an auditor asks for, but the service itself is
          security operations, not an audit.
        </P>

        <H2 id="how-does-soc-as-a-service-work">How Does SOC As A Service Work?</H2>
        <P>
          SOC as a service works as a continuous loop. Your systems send
          security data to the provider, analysts and automation turn it into a
          small number of real incidents, and the provider responds and reports
          back. Most services follow six steps.
        </P>
        <Numbered
          items={[
            <>
              <Strong>Connect data sources.</Strong> Endpoints, servers,
              firewalls, cloud accounts, identity providers, email and business
              applications are connected through agents, APIs or log forwarders.
            </>,
            <>
              <Strong>Collect and correlate.</Strong> Logs flow into a central
              platform, usually a SIEM, where correlation rules link related
              events into alerts.
            </>,
            <>
              <Strong>Triage alerts.</Strong> Automation removes duplicates and
              known false positives, then Tier 1 analysts review what is left.
            </>,
            <>
              <Strong>Investigate.</Strong> Confirmed alerts go to senior
              analysts, who trace the scope, root cause and affected assets.
            </>,
            <>
              <Strong>Respond or escalate.</Strong> The provider contains the
              threat within agreed permissions, such as isolating a device or
              disabling an account, or escalates to your team with clear next
              steps.
            </>,
            <>
              <Strong>Report and tune.</Strong> You receive incident reports and
              regular summaries, and detection rules are tuned to cut noise and
              catch new attack patterns.
            </>,
          ]}
        />
        <Fig
          file="soc-as-a-service-workflow.webp"
          height={530}
          alt="SOC as a service workflow in six steps: connect data sources, collect and correlate, triage alerts, investigate, respond or escalate, report and tune"
        />
        <H3>Onboarding And Tuning</H3>
        <P>
          Onboarding usually takes from a few days to several weeks, depending
          on how many data sources need to be connected. During this stage the
          provider maps your assets, sets a baseline of normal activity and
          agrees escalation contacts and response permissions with you.
        </P>
        <P>
          Expect more alerts in the first weeks. Tuning brings the volume down
          as the provider learns what normal looks like in your environment.
        </P>

        <H2 id="key-functions-of-soc-as-a-service">Key Functions Of SOCaaS</H2>
        <P>
          A SOCaaS provider covers five core functions. Together they replace
          the daily work of an in-house security operations team.
        </P>
        <H3>24/7 Threat Monitoring</H3>
        <P>
          Analysts and automated systems watch your networks, endpoints, cloud
          infrastructure, applications and logs every hour of the year. Attacks
          often start at night, on weekends or during holidays, when internal
          teams are offline. Round-the-clock coverage is the main reason many
          organizations buy the service.
        </P>
        <H3>Threat Detection And Triage</H3>
        <P>
          Detection uses correlation rules, threat intelligence and behavioral
          analytics to spot signs of attacks such as malware, phishing,
          credential theft, ransomware and insider threats. Triage is where
          analysts separate real threats from false positives, so your team
          only hears about the alerts that matter.
        </P>
        <Fig
          file="soc-as-a-service-alert-triage-funnel.webp"
          height={628}
          alt="Alert triage funnel: all security events narrowed by SIEM correlation, automated filtering, Tier 1 triage and Tier 2 investigation into confirmed incidents"
        />
        <H3>Incident Response And Containment</H3>
        <P>
          When an incident is confirmed, the provider investigates what
          happened, how far it spread and which systems are affected. Depending
          on the contract, it can contain the threat directly, for example by
          isolating a device, blocking an IP address or disabling a compromised
          account. Other providers guide your team through each step instead.
          Always check which actions the provider may take without asking first.
        </P>
        <H3>Threat Hunting</H3>
        <P>
          Threat hunting is the proactive search for attackers who have slipped
          past automated detection. Hunters start from a hypothesis, such as
          unusual use of admin tools, and search your data for evidence. What
          they find becomes new detection rules, so the service gets better over
          time.
        </P>
        <H3>Compliance And Reporting</H3>
        <P>
          Most providers keep security logs for a set retention period and
          produce dashboards, incident reports and audit-ready evidence. This
          supports frameworks and regulations such as ISO 27001, HIPAA, PCI DSS
          and GDPR, which expect continuous monitoring and a documented incident
          response process.
        </P>

        <CtaCard
          title="Cut Alert Noise Before It Reaches Your Analysts"
          body="WhyCrew builds AI SOC automation that enriches, scores and closes routine alerts inside your own infrastructure, so your analysts spend their shifts on real incidents."
        >
          <Button href="/services/ai-powered-soc-automation">
            AI-Powered SOC Automation
          </Button>
          <Button href="/contact" variant="ghost">
            Talk To An Engineer
          </Button>
        </CtaCard>

        <H2 id="what-tools-does-soc-as-a-service-use">What Tools Does A SOCaaS Provider Use?</H2>
        <P>
          A SOCaaS provider uses a set of security tools to collect data, detect
          threats and automate response, and most providers include these tools
          in the subscription. At the center of most services is a{" "}
          <A href="/blog/what-is-siem">
            security information and event management (SIEM) platform
          </A>
          , which gathers logs from every source and correlates them into
          alerts.
        </P>
        <DataTable
          head={["Technology", "What It Does In The Service"]}
          rows={[
            ["SIEM", "Collects, stores and correlates logs from across your environment and raises alerts"],
            ["EDR / XDR", "Watches endpoints (and, with XDR, cloud, email and identity) and lets analysts isolate devices"],
            ["SOAR", "Automates repeatable steps such as enrichment, ticketing and containment through playbooks"],
            ["Threat intelligence", "Adds known malicious IPs, domains, file hashes and attacker techniques to detection"],
            ["Log storage", "Keeps security data for investigations and for compliance retention periods"],
            ["Case management", "Tracks each incident from first alert to closure, with notes and evidence"],
          ]}
        />
        <P>
          Some providers bring their own stack, while others operate the tools
          you already pay for. Ask which applies, because it affects cost,
          onboarding time and what you keep if you change providers.
        </P>

        <H2 id="soc-as-a-service-roles-and-responsibilities">
          Roles And Responsibilities In A SOCaaS Team
        </H2>
        <P>
          Behind every managed SOC is a tiered team. Each tier handles a
          different depth of work, so simple alerts are cleared quickly and
          complex incidents reach the most experienced people.
        </P>
        <DataTable
          head={["Role", "Main Responsibilities"]}
          rows={[
            ["Tier 1 analyst", "Monitors alerts, triages them, closes false positives and escalates real threats"],
            ["Tier 2 analyst (investigator)", "Investigates escalated alerts, finds scope and root cause, starts containment"],
            ["Tier 3 analyst (threat hunter)", "Hunts for hidden threats, handles complex incidents, writes new detections"],
            ["Incident responder", "Leads containment, eradication and recovery during serious incidents"],
            ["Security engineer", "Maintains the SIEM and integrations, tunes rules and onboards new data sources"],
            ["SOC manager", "Runs the team and owns SLAs, reporting and communication with your organization"],
          ]}
        />
        <Fig
          file="soc-as-a-service-escalation-path.webp"
          height={544}
          alt="SOC escalation path: Tier 1 analyst triages, real threats go to Tier 2 and Tier 3, confirmed incidents reach your team, false positives are closed and tuned"
        />

        <H2 id="who-uses-soc-as-a-service">Who Needs SOCaaS?</H2>
        <P>
          SOCaaS fits any organization that needs 24/7 security operations but
          cannot, or does not want to, staff them in-house. Three groups use it
          most.
        </P>
        <H3>Small And Midsize Businesses</H3>
        <P>
          One seat watched every hour of the week is 168 hours, which takes more
          than four full-time analysts before holidays, sick days and turnover.
          In practice, 24/7 coverage needs five to six analysts, plus tools and
          a manager. Most small and midsize businesses cannot justify that cost.
          An outsourced SOC gives them experienced analysts and enterprise-grade
          monitoring for a predictable fee.
        </P>
        <H3>Organizations With Existing Security Teams</H3>
        <P>
          Companies that already have security staff use a provider to extend
          their coverage, not to replace people. Common setups include
          after-hours and weekend monitoring, Tier 1 alert triage so internal
          staff can focus on projects, and access to specialist skills such as
          threat hunting. This shared setup is often called a co-managed SOC.
        </P>
        <H3>Regulated And Cloud-Heavy Organizations</H3>
        <P>
          Healthcare, finance, retail and other regulated sectors need
          continuous monitoring and audit-ready records to meet rules such as
          HIPAA, PCI DSS and GDPR. Businesses running across AWS, Azure, Google
          Cloud and many SaaS apps need visibility across all of them at once. A
          good provider brings the integrations and reporting both groups depend
          on.
        </P>

        <H2 id="benefits-of-soc-as-a-service">Benefits Of SOC As A Service</H2>
        <P>
          The main benefits are lower cost, constant coverage and fast access to
          security expertise.
        </P>
        <H3>Lower Cost Than An In-House SOC</H3>
        <P>
          Building a SOC means buying a SIEM and other tools, paying for log
          storage and hiring a 24/7 team. For many smaller companies, an
          internal SOC costs $500,000 to $750,000 a year or more. A subscription
          spreads those costs across many customers, so each one pays a
          fraction.
        </P>
        <H3>Round-The-Clock Expert Coverage</H3>
        <P>
          The provider staffs every shift with trained analysts, so nights,
          weekends and holidays are covered. You also gain skills that are hard
          to hire, such as incident response, malware analysis and threat
          hunting.
        </P>
        <H3>Faster Detection And Response</H3>
        <P>
          Providers see attacks across many customers, so they recognize new
          techniques quickly and roll out detections everywhere. Automation and
          tested playbooks shorten the time from first alert to containment.
        </P>
        <H3>Fast Setup And Easy Scaling</H3>
        <P>
          A provider can usually start monitoring within weeks, while building a
          SOC takes many months. Coverage grows or shrinks with your assets,
          users and log volume, without new hiring.
        </P>
        <H3>Less Alert Fatigue For Internal IT</H3>
        <P>
          Your IT team no longer has to chase thousands of low-value alerts. It
          receives a short list of confirmed incidents with clear next steps.
        </P>

        <H2 id="challenges-of-soc-as-a-service">What Are The Disadvantages Of SOCaaS?</H2>
        <P>
          Outsourcing your SOC also has downsides. Knowing them up front helps
          you choose the right provider and negotiate a better contract.
        </P>
        <H3>Vendor Lock-In</H3>
        <P>
          If the provider runs its own platform, your detection rules, alert
          history and workflows live in its system. Moving to another provider
          can mean rebuilding them. Check in advance which data, rules and
          reports you can export when the contract ends.
        </P>
        <H3>Less Direct Control Over Tools And Workflows</H3>
        <P>
          The provider decides how rules are written, how alerts are prioritized
          and how quickly custom changes happen. Unusual business workflows may
          take longer to support than they would with your own team.
        </P>
        <H3>Integration Effort</H3>
        <P>
          Legacy systems, custom applications and on-premises tools may need
          extra connectors or log parsing. Any data source left out becomes a
          blind spot for the analysts.
        </P>
        <H3>Data Privacy And Residency</H3>
        <P>
          Using an outside SOC means sending security data, which can include
          user names, IP addresses and email details, to a third party. Confirm
          where the data is stored, who can access it and how the provider meets
          your regulatory requirements.
        </P>
        <H3>Log Ingestion Costs</H3>
        <P>
          When pricing is based on data volume, bills climb as your environment
          grows. More cloud services, users and log sources all add to the
          monthly cost.
        </P>
        <H3>Limited Business Context</H3>
        <P>
          An outside team does not know your business the way your staff do.
          Without accurate asset lists, contact details and notes on critical
          systems, analysts may misjudge what is normal or how urgent an
          incident is.
        </P>

        <H2 id="soc-as-a-service-vs-in-house-soc">SOC As A Service Vs In-House SOC</H2>
        <P>
          The choice between SOC as a service and an in-house SOC comes down to
          cost, speed and control. An outsourced SOC is faster and cheaper to
          start, while an in-house SOC gives you the most control and business
          context.
        </P>
        <DataTable
          head={["Factor", "SOCaaS", "In-House SOC"]}
          rows={[
            ["Setup time", "Days to weeks", "Many months, often a year or more"],
            ["Upfront cost", "Low, mainly onboarding", "High: tools, infrastructure and hiring"],
            ["Ongoing cost", "Predictable subscription", "Salaries, licenses, storage and training"],
            ["Staffing", "Provided by the vendor", "You hire and retain 24/7 analysts"],
            ["Coverage", "24/7 included", "24/7 only if every shift is staffed"],
            ["Control and customization", "Shared with the provider", "Full control"],
            ["Business context", "Built up over time", "Strong from day one"],
            ["Scaling", "Change the subscription", "Hire more people and add tools"],
          ]}
        />
        <P>
          Many organizations land in the middle. The provider handles 24/7
          monitoring and triage, while the internal team keeps ownership of
          business decisions and critical systems.
        </P>
        <Fig
          file="soc-as-a-service-shared-responsibility.webp"
          height={670}
          alt="Shared responsibility between a SOCaaS provider and your team: the provider handles monitoring, triage, hunting, containment and reports while your team keeps business decisions, approvals, asset lists and system changes"
        />

        <H2 id="how-much-does-soc-as-a-service-cost">How Much Does SOC As A Service Cost?</H2>
        <P>
          SOC as a service typically costs about $2,000 to $7,000 per month for
          small businesses, $7,000 to $25,000 per month for mid-sized
          organizations and $25,000 to $100,000 or more per month for large
          enterprises. Per-unit prices commonly fall between $10 and $20 per
          monitored asset per month, or $8 to $30 per endpoint per month.
        </P>
        <P>
          Providers usually price in one of four ways: per asset or endpoint,
          per user, by data volume (GB per day or events per second) or as
          tiered packages. Data-volume pricing follows the same logic as{" "}
          <A href="/blog/siem-cost-licensing-vs-custom-built">SIEM costs</A>, so
          the bill grows as you add log sources. The biggest cost drivers are
          the number of assets, log volume, retention period, response scope,
          compliance reporting and add-on fees for onboarding or incident
          response retainers.
        </P>

        <CtaCard
          title="Delivering SOC As A Service To Clients? Own The Platform Behind It"
          body="WhyCrew builds MSSPs their own multi-tenant SIEM and SOC platform for one fixed price, then hands over full ownership. Your platform costs stop rising with every new client."
        >
          <Button href="/services/mssp-engineering-partner">
            White Label SOC Platform
          </Button>
          <Button href="/services/custom-siem-development" variant="ghost">
            Custom SIEM Development
          </Button>
        </CtaCard>

        <H2 id="how-to-choose-a-soc-as-a-service-provider">How To Choose A SOCaaS Provider</H2>
        <P>
          The right provider is the one whose scope, response authority and
          contract fit your risks. Use this checklist when you compare
          providers.
        </P>
        <DataTable
          head={["What To Check", "Questions To Ask"]}
          rows={[
            ["Coverage", "Is monitoring truly 24/7/365, including holidays? Which data sources are included?"],
            ["Tool compatibility", "Does it work with your existing SIEM, EDR, cloud and identity tools?"],
            ["Response authority", "Which actions can analysts take without approval? Who makes the final call?"],
            ["Service levels (SLAs)", "What are the guaranteed times for triage, escalation and containment?"],
            ["Compliance support", "Which frameworks do reports cover? How long are logs retained?"],
            ["Data residency and privacy", "Where is your data stored and processed? Who can access it?"],
            ["Onboarding", "How long until full monitoring starts? What does your team need to provide?"],
            ["Reporting", "What do daily, monthly and executive reports include?"],
            ["Exit terms", "Which data, rules and reports do you keep if you leave?"],
          ]}
        />

        <CtaCard
          title="Want A SOC Platform You Fully Control?"
          body="Tell us how many data sources and how much log volume you handle, and we will send a fixed-price plan for a SIEM and SOC platform you own outright."
        >
          <Button href="/contact">Get A Fixed-Price Estimate</Button>
          <Button href="/services/custom-siem-development" variant="ghost">
            Custom SIEM Development
          </Button>
        </CtaCard>

        <H2 id="faq">Frequently Asked Questions</H2>
        <div className="mt-6">
          <FaqAccordion faqs={FAQS} columns={1} />
        </div>
      </ArticleShell>
    </>
  );
}
