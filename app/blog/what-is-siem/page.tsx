import type { Metadata } from "next";
import { ArticleShell, type TocEntry } from "@/components/blog/article-shell";
import {
  Bullets,
  DataTable,
  ExtRef,
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
import { breadcrumbLabel, postBySlug } from "@/lib/blog";
import { CTA_HREF, OG_IMAGE, SITE } from "@/lib/site";

const post = postBySlug("what-is-siem")!;
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

/* ---------------------------------------------------------------------------
 * Outbound citations.
 *
 * Regulations are cited to their EUR-Lex ELI record rather than a summary
 * page: the ELI URL is the permanent identifier for the consolidated text, so
 * it survives the periodic reorganisation of europa.eu.
 *
 * Every one renders through <ExtRef>, which takes its rel from EXTERNAL_REL —
 * nofollow is not written out per link and so cannot be missed on one.
 * ------------------------------------------------------------------------- */

const SOURCES = {
  wikipedia:
    "https://en.wikipedia.org/wiki/Security_information_and_event_management",
  /** Directive (EU) 2022/2555 — NIS2. */
  nis2: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj",
  /** Regulation (EU) 2022/2554 — DORA. */
  dora: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj",
  /** Regulation (EU) 2016/679 — GDPR. */
  gdpr: "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
};

const TOC: TocEntry[] = [
  { id: "key-takeaways", label: "Key takeaways" },
  { id: "what-siem-stands-for", label: "What SIEM stands for" },
  { id: "how-siem-works", label: "How does SIEM work?" },
  { id: "what-it-does", label: "What it does for a team" },
  { id: "vs-related-tools", label: "SIEM vs. related tools" },
  { id: "who-uses-siem", label: "Who actually uses SIEM" },
  { id: "cost-reality", label: "The cost reality" },
  { id: "compliance", label: "NIS2, DORA and GDPR" },
  { id: "faq", label: "Frequently asked questions" },
];

const TOOL_COMPARISON = {
  head: ["Dimension", "SIEM", "SOAR", "EDR/XDR"],
  rows: [
    [
      "What it does",
      "Collects, connects, and reports on security events",
      "Automates the response once an alert fires",
      "Detects and contains threats at the endpoint or across layers",
    ],
    [
      "Data scope",
      "Broad: firewalls, cloud, identity, apps, network",
      "Works on top of SIEM/EDR alerts, not raw logs",
      "Narrow but deep: endpoint or device-level data",
    ],
    [
      "Main output",
      "Connected alerts and compliance reports",
      "Automated response actions (isolate, disable, block)",
      "Endpoint-level detections and containment",
    ],
    [
      "Best for",
      "Full visibility and audit-ready evidence",
      "Cutting response time after detection",
      "Deep endpoint or cross-layer threat detection",
    ],
    [
      "Works alongside",
      "Pulls in data from SOAR and EDR/XDR",
      "Reads alerts from SIEM",
      "Feeds data into SIEM",
    ],
  ],
};

const COST_COMPARISON = {
  head: ["Dimension", "Vendor SIEM (licensed)", "Custom-built SIEM (owned)"],
  rows: [
    [
      "Pricing model",
      "Scales with data volume, often per GB or per tenant",
      "Fixed engineering cost upfront, then flat to run",
    ],
    [
      "Cost as you grow",
      "Rises with every new client or data source",
      "Stays predictable no matter the tenant count",
    ],
    [
      "Source code and roadmap",
      "Controlled by the vendor",
      "Fully owned by your team",
    ],
    [
      "Multi-tenant fit (MSSPs)",
      "Often bolted on, not built for it",
      "Designed for it from day one",
    ],
    [
      "Time to first value",
      "Fast to deploy, slower to fully customise",
      "Slower initial build, full control after",
    ],
    [
      "Typical cost impact",
      "Baseline",
      "40 to 70 percent lower total cost, per the operator data above",
    ],
  ],
};

const FAQS: Faq[] = [
  {
    q: "Is SIEM the same as a SOC?",
    a: "No. SIEM (Security Information and Event Management) is the tool. A SOC (Security Operations Center) is the team that uses it, usually alongside other tools like SOAR and EDR.",
  },
  {
    q: "Do small companies need a SIEM?",
    a: "Not always. It comes down to how much log data you generate and whether a rule requires you to keep and report on it. A small startup with no legal obligations can usually wait. A fast-growing company handling regulated data usually needs one sooner than it expects.",
  },
  {
    q: "What is the difference between SIEM and SOAR?",
    a: "SIEM finds and connects events. SOAR automates what happens next. They are built to work together, not compete.",
  },
  {
    q: "Can I build my own SIEM instead of buying one?",
    a: "Yes. For MSSPs and regulated companies hitting the ceiling on per-GB vendor pricing, it is often the smarter move long-term. You own the code, you control the roadmap, and no vendor can change your price overnight.",
  },
  {
    q: "How much does a SIEM cost?",
    a: "It depends on your data volume, how long you keep logs, and whether you license a vendor platform or build your own. The two models scale very differently, so it is worth comparing directly instead of guessing.",
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
          heading: "Put these numbers against your own environment",
          body: "We will map your log sources, model licensed cost against a build, and show you where the break-even actually falls for your client count.",
          label: "Book an Architecture Audit",
          href: CTA_HREF,
        }}
      >
        <QuickAnswer>
          SIEM stands for Security Information and Event Management. It collects
          security data from your firewalls, servers, cloud accounts, identity
          systems, and apps. It looks for patterns in that data. The patterns
          that matter become alerts and audit-ready reports.
        </QuickAnswer>

        <P>
          Security systems generate data constantly. A missed login. A strange
          file transfer. On their own, these events look harmless. Together,
          they can signal an attack already underway. That is exactly what a
          SIEM is built to catch.
        </P>
        <P>
          This guide covers what a SIEM is, how it works, who actually needs
          one, and what it costs to run versus build.
        </P>

        <div className="mt-10">
          <KeyTakeaways
            items={[
              "SIEM (Security Information and Event Management) pulls security data from across your systems and turns the patterns that matter into alerts and reports.",
              "The process runs in four steps: collect the logs, connect them, score and alert on what matters, then keep everything on record for reporting.",
              "MSSPs and regulated companies that build their own SIEM instead of licensing one usually cut total costs by 40 to 70 percent.",
              "Operating in the EU changes the calculus too. Under NIS2, DORA, and GDPR, SIEM is no longer optional — it is a legal requirement.",
              "SIEM does not work alone. It sits alongside SOAR, EDR, and XDR, and most security teams run more than one of these together.",
            ]}
          />
        </div>

        <P>
          The rest of this guide walks through each of these in more depth, plus
          who actually needs a SIEM and how the cost comparison holds up in
          practice.
        </P>

        <H2 id="what-siem-stands-for">What Does SIEM Stand For?</H2>
        <P>
          The SIEM meaning is simple once you strip away the marketing language.
          The name traces back to a 2005 merger of two older tools.
        </P>
        <Bullets
          items={[
            <>
              <Strong>SIM (security information management):</Strong> stored
              logs and built reports
            </>,
            <>
              <Strong>SEM (security event management):</Strong> watched events
              in real time
            </>,
          ]}
        />
        <P>
          SIEM combines both jobs into a single platform, keeping long-term
          records the way SIM did while watching events live the way SEM did.
          You can read the full history on{" "}
          <ExtRef href={SOURCES.wikipedia}>
            Wikipedia&apos;s entry on the topic
          </ExtRef>{" "}
          if you are curious, but what matters more here is what SIEM actually
          does today.
        </P>

        <H2 id="how-siem-works">How Does SIEM Work?</H2>
        <P>
          SIEM explained simply: it follows four steps. Every vendor runs some
          version of these same four steps, regardless of what they call it.
        </P>

        <H3>Step 1: Log collection and ingestion</H3>
        <P>
          First, it needs data. A SIEM pulls logs from every source that
          matters.
        </P>
        <Bullets
          items={[
            "Firewalls and VPNs",
            "Endpoint agents (laptops, servers)",
            "Cloud infrastructure (AWS, Azure, GCP)",
            "Identity systems (who logged in, from where, with what permissions)",
            "SaaS applications",
            "Network devices",
          ]}
        />
        <P>
          The more sources it connects to, the more useful it becomes. A SIEM
          that sees only half your systems can protect only half your systems.
        </P>

        <H3>Step 2: Normalization and correlation</H3>
        <P>
          Raw logs do not match each other. A firewall log looks nothing like an
          identity log, so the SIEM turns everything into one shared format
          first. This step is called normalization.
        </P>
        <P>
          Once the data lines up, the SIEM connects the dots across every
          source, finding patterns that a single log line would never reveal on
          its own.
        </P>
        <P>
          Here is a simple example. A user fails to log in three times. Ten
          minutes later, that same account gets admin access on a different
          system. Neither event looks dangerous by itself, but together they are
          worth an alert.
        </P>
        <P>
          Older SIEMs relied almost entirely on fixed rules: if X happens, then
          Y, flag it. Rules still work, but they miss attack patterns nobody
          thought to write a rule for. Newer platforms add machine learning to
          catch what static rules miss, and some of that comes from UEBA (User
          and Entity Behavior Analytics). UEBA learns what normal behavior looks
          like for a specific user or system, then flags anything that drifts
          from it, even without a written rule. It does not replace rules so
          much as add a second layer that catches what the first layer misses.
        </P>

        <H3>Step 3: Alerting and detection</H3>
        <P>
          Once events are connected, the SIEM scores them and turns the
          important ones into alerts. This step really decides whether a SIEM is
          worth having. A badly tuned SIEM floods your team with low-value
          alerts until analysts start tuning them out, which defeats the whole
          purpose. A well-tuned SIEM does the opposite: it surfaces only what
          genuinely needs a human, and stays quiet the rest of the time.
        </P>

        <H3>Step 4: Reporting and compliance</H3>
        <P>
          Last, the SIEM keeps a record, storing logs for a set period and
          building reports on demand. This matters for three reasons. It proves
          your team can see and control its own systems during an internal
          audit. It lets you rebuild exactly what happened after a breach. And
          it gives a regulator proof quickly, without a scramble. That last
          reason is why SIEM stopped being optional for a lot of businesses.
        </P>

        <H2 id="what-it-does">
          What Does SIEM Actually Do for a Security Team?
        </H2>
        <P>
          So what does a SIEM actually change for the team using it? Here are
          the outcomes that matter.
        </P>
        <Bullets
          items={[
            <>
              <Strong>You see everything in one place.</Strong> Instead of
              logging into ten different tools, you get one dashboard, one
              search, and one timeline.
            </>,
            <>
              <Strong>You catch threats faster.</Strong> A connected alert beats
              digging through raw logs by hand, every time.
            </>,
            <>
              <Strong>You investigate faster.</Strong> You have the history to
              trace what happened, when, and how far it spread.
            </>,
            <>
              <Strong>You walk into an audit ready.</Strong> The logs already
              exist and are searchable, so nothing needs to be rebuilt in a
              panic.
            </>,
          ]}
        />
        <P>
          Dashboards, integrations, and AI features sit on top of these four
          outcomes. They are not the outcomes themselves.
        </P>

        <H2 id="vs-related-tools">SIEM vs. Related Tools</H2>
        <P>
          SIEM often gets grouped with other tools, so here is a clear
          breakdown.
        </P>
        <P>
          SOAR (Security Orchestration, Automation, and Response) picks up where
          SIEM leaves off. SIEM tells you something happened. SOAR can act on it
          automatically, isolating a compromised laptop or disabling a stolen
          account without waiting for a human to click a button. See the full
          breakdown in <Ref to="what-is-soar">What Is SOAR?</Ref>
        </P>
        <P>
          EDR and XDR focus on endpoints, or on a broader set of layers, going
          deeper into a single laptop or server than a SIEM typically does on
          its own. Most modern setups feed EDR and XDR data into the SIEM as one
          more input rather than a replacement for it. SIEM provides the wide
          view. EDR and XDR provide the close-up. Most security teams run both.
        </P>
        <P>Here is the same comparison at a glance:</P>
        <DataTable
          caption="How SIEM, SOAR and EDR/XDR differ in scope, output and best fit"
          head={TOOL_COMPARISON.head}
          rows={TOOL_COMPARISON.rows}
          highlightCol={1}
        />
        <P>
          For the full comparison between SIEM and SOAR, see{" "}
          <Ref to="siem-vs-soar">
            SIEM vs. SOAR: What&apos;s the Difference?
          </Ref>
        </P>
        <P>Two more terms worth clarifying while we are here.</P>
        <P>
          <Strong>Log management</Strong> is not the same as SIEM, even though
          the two get confused. A log management tool stores and searches logs.
          It does not correlate events across sources or generate alerts on its
          own. SIEM includes log management as one function, then adds
          correlation, scoring, and reporting on top of it.
        </P>
        <P>
          <Strong>Threat intelligence feeds</Strong> are another common addition
          to a SIEM. These feeds are outside data about known malicious IP
          addresses, domains, and attack patterns. A SIEM that ingests threat
          intelligence can match your own logs against that outside data, which
          catches threats a purely internal rule set would miss on its own.
        </P>

        <H2 id="who-uses-siem">Who Actually Uses SIEM?</H2>
        <P>
          Three groups use SIEM, and the right setup looks different for each
          one.
        </P>
        <P>
          <Strong>Enterprise security teams.</Strong> One company runs SIEM as
          the core of its security operations center (SOC): one environment, one
          platform, one team. The buying decision mostly comes down to coverage:
          does it see everything you run, and does it work with the tools you
          already use?
        </P>
        <P>
          <Strong>MSSPs.</Strong> This is where things get harder. An MSSP does
          not watch one environment. It watches dozens of client environments at
          once, often through a single SIEM for MSSP setup. Each client&apos;s
          data has to stay separate from every other client&apos;s. Pricing has
          to scale fairly per client instead of spiking with every new signup.
          And support has to hold up as well for client twenty as it did for
          client one. That is a different engineering problem than the
          single-company case, and most off-the-shelf SIEM tools were not built
          for it. They were built for one buyer and one environment. Learn more
          in{" "}
          <Ref to="multi-tenant-siem-architecture">
            multi-tenant SIEM architecture for MSSPs
          </Ref>
          .
        </P>
        <P>
          <Strong>Regulated industries.</Strong> Finance, healthcare, and
          critical infrastructure fall into this group. For these teams, SIEM is
          not optional — it is written into the law. Log retention, report
          deadlines, and audit trails are legal requirements, not best
          practices. Skipping them is not just a security gap. It is a
          compliance failure with its own consequences.
        </P>
        <P>
          If you fall into the second or third group, the rest of this page is
          written for you. It is not written for a generic enterprise buyer with
          one environment and an unlimited budget.
        </P>

        <H2 id="cost-reality">
          The Cost Reality: Vendor SIEM vs. Owning Your Platform
        </H2>
        <P>
          Most vendor SIEM pricing scales with data volume. The more data you
          send, the more you pay, usually billed per gigabyte or per client.
        </P>
        <P>
          For one company, that is a cost worth watching. For an MSSP running
          the same SIEM across dozens of clients, it becomes a bigger problem,
          since every new contract cuts further into the margin. MSSPs and
          regulated companies that move away from per-GB vendor pricing
          typically see total SIEM costs drop 40 to 70 percent once they own the
          platform instead of renting it. The cost stops scaling with data
          volume. One operator we have worked with was paying &euro;45,000 a
          month in vendor licensing before making that switch. These figures
          come from completed WhyCrew engagements with MSSPs and enterprise
          clients.
        </P>
        <P>Here is how the two models compare:</P>
        <DataTable
          caption="Licensed vendor SIEM compared with a custom-built platform you own"
          head={COST_COMPARISON.head}
          rows={COST_COMPARISON.rows}
          highlightCol={2}
        />
        <P>
          That is the real case for building instead of renting. See the full
          breakdown in{" "}
          <Ref to="siem-cost-licensing">
            how SIEM licensing costs scale against you
          </Ref>
          .
        </P>

        <H2 id="compliance">SIEM and Compliance: NIS2, DORA, and GDPR</H2>
        <P>
          If your business operates in the EU, SIEM has become a legal
          requirement, not just a security tool. That scope is broader than it
          sounds, too. NIS2 and DORA also apply to companies based outside the
          EU if they provide essential or financial services to EU customers.
          The real question is who you serve, not just where you are registered.
        </P>
        <P>
          <ExtRef href={SOURCES.nis2}>NIS2</ExtRef> sets a strict deadline:
          certain incidents must be reported within 24 hours of detection. That
          is hard to pull off without a system already connecting events in real
          time, since manual investigation simply cannot move that fast. NIS2
          entered into force in January 2023, with EU member states required to
          apply it from October 2024 onward.
        </P>
        <P>
          <ExtRef href={SOURCES.dora}>DORA</ExtRef> adds further pressure,
          mainly for financial firms, and has been in force since January 2025.
          It layers its own reporting rules on top of NIS2 and requires firms to
          prove they can keep running, not just claim it.{" "}
          <ExtRef href={SOURCES.gdpr}>GDPR</ExtRef> adds its own requirement, in
          force since 2018: report a breach quickly, once you know what data was
          affected. The clock starts the moment you become aware, not once the
          investigation wraps up. A SIEM&apos;s audit trail is usually the only
          thing that makes that timeline achievable. Without one, &ldquo;we are
          still investigating&rdquo; is often the honest answer well past the
          deadline.
        </P>
        <P>
          None of this means every EU business needs an enterprise-grade SIEM
          immediately. It means log visibility has quietly become a legal
          requirement rather than a nice-to-have, and that should shape how the
          buying decision gets made.
        </P>
        <P>
          See how your SIEM platform can support NIS2 and DORA compliance.
          Explore the key requirements, controls, and reporting capabilities in
          our{" "}
          <Ref to="nis2-dora-compliance-guide">
            complete guide to what your SIEM platform must deliver for NIS2 and
            DORA
          </Ref>
          .
        </P>

        <H2 id="faq">Frequently Asked Questions</H2>
        <div className="mt-6">
          <FaqAccordion faqs={FAQS} columns={1} />
        </div>
      </ArticleShell>
    </>
  );
}
