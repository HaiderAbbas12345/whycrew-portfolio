import type { Metadata } from "next";
import { ArticleShell, type TocEntry } from "@/components/blog/article-shell";
import {
  Bullets,
  DataTable,
  H2,
  H3,
  KeyTakeaways,
  Numbered,
  P,
  QuickAnswer,
  Ref,
  Strong,
} from "@/components/blog/prose";
import { FaqAccordion } from "@/components/ui/faq";
import { breadcrumbLd, faqLd, type Faq } from "@/lib/jsonld";
import { postBySlug } from "@/lib/blog";
import { OG_IMAGE, SITE } from "@/lib/site";

const post = postBySlug("siem-nis2-dora-compliance")!;
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
  { id: "what-is-nis2", label: "What is NIS2?" },
  { id: "what-is-dora", label: "What is DORA?" },
  { id: "how-siem-helps", label: "What a SIEM helps with" },
  { id: "compliant-siem", label: "What a compliant SIEM must do" },
  { id: "nis2-vs-dora", label: "NIS2 vs. DORA" },
  { id: "compliant-vs-not", label: "Compliant vs. non-compliant" },
  { id: "vendor-limits", label: "Where bought SIEMs hit limits" },
  { id: "when-custom", label: "When a custom build makes sense" },
  { id: "faq", label: "Frequently asked questions" },
];

const NIS2_VS_DORA = {
  head: ["Requirement", "NIS2", "DORA"],
  rows: [
    ["Who it covers", "18 key sectors", "Financial firms + ICT partners"],
    ["Watch systems always", "Yes", "Yes"],
    ["First alert", "Within 24 hours", "Within 4 hours (major)"],
    ["Full report", "Within 72 hours", "Within 1 month"],
    ["Keep logs", "About 12 months", "Per your risk framework"],
    ["Attack testing", "Based on risk", "TLPT every 3 years"],
    ["Watch suppliers", "Yes", "Yes + partner register"],
    ["Leaders liable", "Yes", "Yes"],
    ["EU data storage", "Often needed", "Often needed"],
  ],
};

const COMPLIANT_VS_NOT = {
  head: ["Capability", "Compliant SIEM", "Non-Compliant SIEM"],
  rows: [
    ["Detection tied to NIS2/DORA", "Yes", "Generic only"],
    ["Automatic reporting", "Yes, with records", "Manual, no record"],
    ["Tamper-proof storage", "WORM + checks", "Can be deleted"],
    ["EU data storage", "Per unit, at intake", "Not controlled"],
    ["Incident sorting", "Clear system", "Loose and messy"],
    ["Test evidence", "Built in", "Not supported"],
    ["Retention lock", "Cannot be bypassed", "Can be bypassed"],
    ["Supplier monitoring", "Tied to risk records", "Perimeter only"],
  ],
};

const FAQS: Faq[] = [
  {
    q: "Does NIS2 require a SIEM?",
    a: "No exact tool is required. But NIS2 wants always-on monitoring, threat detection, and clear reporting at scale. In practice, that needs a SIEM or a similar platform.",
  },
  {
    q: "What is the NIS2 reporting deadline?",
    a: "Send a first alert within 24 hours of spotting a serious incident. Send a full report within 72 hours. Some countries add extra steps, so check your local version of the rule.",
  },
  {
    q: "How is DORA's timeline different from NIS2?",
    a: "DORA is tighter. It wants a first alert within 4 hours for major incidents, a report at 72 hours, and a final report within one month. That 4-hour window makes automation very important.",
  },
  {
    q: "What does “tamper-proof audit trail” mean?",
    a: "It means no one can change or delete the logs, not even admins. WORM storage and integrity checks are the standard way to do this. Access to those logs should also be logged.",
  },
  {
    q: "Does DORA apply to non-financial companies?",
    a: "It can. If your company provides critical ICT services to financial firms, you may fall in scope as a third-party provider. Check your obligations to be sure.",
  },
  {
    q: "Can a bought SIEM meet NIS2 and DORA?",
    a: "Some can be set up to meet many rules. Common gaps are tamper-proof storage, EU data storage, and automatic reporting. Always check against the real rule text, not vendor claims.",
  },
  {
    q: "How long must logs be kept?",
    a: "NIS2 guidance points to at least 12 months, though this varies by country and sector. DORA ties retention to your ICT risk framework and any recordkeeping rules that apply.",
  },
  {
    q: "What is telemetry?",
    a: "Telemetry is the data your systems send about what they are doing. Logs, events, and metrics are all telemetry. A SIEM collects this data to spot threats and prove what happened.",
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
          heading: "Check your platform before a regulator does",
          body: "Most compliance gaps show up during audits and real incidents, not during vendor demos. That is the worst time to find them. A structured review maps your platform against NIS2 and DORA, finds your biggest gaps, and gives you a clear fix plan.",
          label: "Book an Architecture Audit",
          href: "/contact",
        }}
      >
        <QuickAnswer>
          NIS2 and DORA are two EU rules. They tell companies to watch their
          systems for threats, keep clean records, and report problems fast. A
          SIEM helps you do all of this in one place. It works best when it is
          built for these rules from the start.
        </QuickAnswer>

        <P>
          (New to the term? A SIEM &mdash; Security Information and Event
          Management &mdash; is software that collects logs from your systems
          and warns you when something looks wrong.)
        </P>

        <div className="mt-10">
          <KeyTakeaways
            items={[
              "NIS2 covers 18 important sectors, like energy, health, and transport.",
              "DORA adds extra rules for banks, insurers, and other financial firms.",
              "Both rules want you to watch systems all the time, not just now and then.",
              "Both set tight deadlines to report problems. Manual work rarely meets them.",
              "Records must be tamper-proof. Many off-the-shelf tools do not lock records by default.",
              "Some companies build their own SIEM when a bought one cannot meet these rules.",
            ]}
          />
        </div>

        <H2 id="what-is-nis2">What Is NIS2?</H2>
        <P>
          NIS2 is an EU rule that became active in October 2024. It aims to make
          key services safer from cyberattacks.
        </P>
        <P>
          It covers 18 sectors. These include energy, transport, water, health,
          banking, and digital services. If your company runs one of these
          services, NIS2 likely applies to you.
        </P>
        <P>Here is what NIS2 asks you to do:</P>
        <Bullets
          items={[
            <>
              <Strong>Watch your systems all the time.</Strong> Checking logs
              once a week is not enough. You need near-real-time alerts.
            </>,
            <>
              <Strong>Report serious problems fast.</Strong> Send a first alert
              within 24 hours. Send a full report within 72 hours.
            </>,
            <>
              <Strong>Keep your logs.</Strong> National guidance points to at
              least 12 months.
            </>,
            <>
              <Strong>Check your suppliers too.</Strong> Threats can come
              through third parties, so watch them as well.
            </>,
            <>
              <Strong>Make leaders responsible.</Strong> Senior managers can be
              held personally liable if controls fail.
            </>,
          ]}
        />
        <P>
          In short, NIS2 wants proof that your defenses actually work, not just
          that you bought them.
        </P>

        <H2 id="what-is-dora">What Is DORA?</H2>
        <P>
          DORA is an EU rule that became active in January 2025. It focuses on
          the financial world.
        </P>
        <P>
          DORA covers banks, insurers, payment firms, crypto firms, and the ICT
          partners that serve them. ICT means the tech systems and services a
          company depends on. DORA does not replace NIS2. It sits on top of it
          and adds more.
        </P>
        <P>Here is what DORA adds:</P>
        <Bullets
          items={[
            <>
              <Strong>Sort your incidents.</Strong> DORA uses a clear system to
              rank major problems by size and impact.
            </>,
            <>
              <Strong>Report even faster.</Strong> Send a first alert within 4
              hours for major incidents. Then a report at 72 hours, and a final
              one within one month.
            </>,
            <>
              <Strong>Run attack tests.</Strong> Big firms must run TLPT at
              least every three years. TLPT (Threat-Led Penetration Testing) is
              a safe, planned attack test to check your defenses.
            </>,
            <>
              <Strong>Track your partners.</Strong> Log which ICT partners you
              rely on and tie them to your risk records.
            </>,
            <>
              <Strong>Prove resilience.</Strong> Show real evidence that your
              detection worked during tests.
            </>,
          ]}
        />
        <P>
          DORA cares most about proof. You must show, with data, what happened
          and how you handled it.
        </P>

        <H2 id="how-siem-helps">What Does a SIEM Help With?</H2>
        <P>
          A SIEM pulls data from many systems into one place. Then it looks for
          threats and keeps records. This matches almost everything NIS2 and
          DORA ask for.
        </P>
        <P>Here is how a SIEM supports both rules:</P>
        <Bullets
          items={[
            <>
              <Strong>Central logging.</Strong> It collects logs from servers,
              apps, cloud tools, and more. This is your telemetry. Telemetry
              means the data your systems send about what they are doing.
            </>,
            <>
              <Strong>Live threat detection.</Strong> It watches for odd
              patterns and raises alerts fast.
            </>,
            <>
              <Strong>Incident context.</Strong> It links related events so you
              can judge how serious a problem is.
            </>,
            <>
              <Strong>Faster response.</Strong> Many SIEMs pair with a SOAR
              tool. SOAR (Security Orchestration, Automation and Response)
              automates repeat steps to save time.
            </>,
            <>
              <Strong>Audit-ready records.</Strong> It stores timestamped logs.
              An audit trail is a record of who did what and when.
            </>,
            <>
              <Strong>Test evidence.</Strong> It can record attack tests and
              show which rules fired.
            </>,
          ]}
        />
        <P>
          The bottom line: a SIEM turns messy logs into clear proof that your
          controls work.
        </P>

        <H2 id="compliant-siem">What Must a Compliant SIEM Do?</H2>
        <P>
          Not every SIEM meets these rules out of the box. A compliant one needs
          five things.
        </P>

        <H3>1. Detection tied to the rules</H3>
        <P>
          Generic alerts are not enough. Your rules must match the incident
          types NIS2 and DORA define. Write down why each rule exists.
          Regulators may ask.
        </P>

        <H3>2. Automatic reporting</H3>
        <P>
          A 24-hour or 4-hour deadline leaves no time for manual work. Your SIEM
          should automate:
        </P>
        <Bullets
          items={[
            "Alert sorting by severity",
            "Handoff to your response team",
            "Draft reports in the right format",
            "A timestamped record of every step",
          ]}
        />
        <P>
          This usually runs through a SOAR playbook built into the SIEM.
        </P>

        <H3>3. Tamper-proof records</H3>
        <P>
          Logs that anyone can delete will fail both rules. You need:
        </P>
        <Bullets
          items={[
            "Write-once storage (called WORM, meaning logs cannot be changed once saved)",
            "Checks that prove logs were not altered",
            "Access logs for every analyst action",
            "Retention rules that admins cannot switch off",
          ]}
        />
        <P>This is one of the most common gaps in bought SIEMs.</P>

        <H3>4. EU data storage</H3>
        <P>
          Logs for EU operations often must stay in the EU. This is called data
          residency. Data residency means keeping data inside a set region. For
          firms across many countries, this may mean routing each unit&apos;s
          data on its own. For MSSPs serving multiple EU clients, see how{" "}
          <Ref to="multi-tenant-siem-architecture">
            multi-tenant SIEM architecture
          </Ref>{" "}
          handles per-tenant data routing.
        </P>

        <H3>5. Resilience testing</H3>
        <P>
          DORA wants proof that detection worked during tests. Your SIEM should:
        </P>
        <Bullets
          items={[
            "Record attack tests as events",
            "Confirm the right rules fired",
            "Produce gap reports after each test",
            "Track fixes over time",
          ]}
        />

        <H2 id="nis2-vs-dora">NIS2 vs. DORA: The Key Differences</H2>
        <DataTable
          caption="NIS2 and DORA compared across nine compliance requirements"
          head={NIS2_VS_DORA.head}
          rows={NIS2_VS_DORA.rows}
          highlightCol={2}
        />
        <P>
          For financial firms in the EU, both rules apply at once. When they
          overlap, the stricter one wins.
        </P>

        <H2 id="compliant-vs-not">Compliant vs. Non-Compliant SIEM</H2>
        <DataTable
          caption="Eight capabilities that separate a compliant SIEM from a non-compliant one"
          head={COMPLIANT_VS_NOT.head}
          rows={COMPLIANT_VS_NOT.rows}
          highlightCol={1}
        />

        <H2 id="vendor-limits">Why Many Teams Hit Limits With Bought SIEMs</H2>
        <P>
          Most commercial SIEMs were built to catch threats. They were not built
          for strict compliance at scale. Three gaps show up again and again.
        </P>
        <Numbered
          items={[
            <>
              <Strong>Reporting gaps.</Strong> Most tools send alerts. Few send
              ready-to-file reports with full records. Teams fill the gap by
              hand, and that fails under pressure.
            </>,
            <>
              <Strong>Cost and storage limits.</Strong> Retention is often tied
              to your license tier. Costs climb fast at compliance-grade
              volumes. For a closer look at how ingestion pricing affects your
              budget, see our{" "}
              <Ref to="siem-cost-licensing">SIEM cost analysis</Ref>. EU storage
              may also need a separate setup you did not plan for.
            </>,
            <>
              <Strong>Weak record locks.</Strong> Tools that allow log deletion,
              even with access controls, often struggle to prove records are
              tamper-proof.
            </>,
          ]}
        />
        <P>
          Knowing these gaps early helps you avoid a tool that cannot meet the
          rules.
        </P>

        <H2 id="when-custom">When Does a Custom-Built SIEM Make Sense?</H2>
        <P>
          For many firms, compliance is the trigger to build their own platform.
          But the value goes further.
        </P>
        <P>
          A purpose-built SIEM gives you tuned detection, reporting made for the
          rules, and full ownership. You are not stuck working around a product
          that was never built for this. If you are replacing an existing
          platform rather than starting fresh, our{" "}
          <Ref to="siem-migration-guide">SIEM migration guide</Ref> covers how
          to switch without a coverage gap.
        </P>
        <P>
          The math changes once you add up license costs at large log volumes,
          the work of bolting compliance onto a bought tool, and the risk of
          gaps a regulator could flag. Building rather than patching often wins
          over time, both in cost and control. MSSPs looking to offer this as a
          managed service can also see how our{" "}
          <Ref to="mssp-engineering-partner">MSSP partnership model</Ref> works.
        </P>
        <P>
          Custom is not for everyone. Small teams with simple needs may do fine
          with a well-tuned commercial tool. But once your log volume, sectors,
          or deadlines outgrow what a bought platform can handle, an{" "}
          <Ref to="custom-siem-soar-services">
            engineering-built SIEM and SOAR platform
          </Ref>{" "}
          becomes the practical choice.
        </P>

        <H2 id="faq">Frequently Asked Questions</H2>
        <div className="mt-6">
          <FaqAccordion faqs={FAQS} columns={1} />
        </div>
      </ArticleShell>
    </>
  );
}
