import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArticleShell, type TocEntry } from "@/components/blog/article-shell";
import { Bullets, DataTable, H2, H3, P, Strong } from "@/components/blog/prose";
import { Button } from "@/components/ui/button";
import { FaqAccordion, type FaqItem } from "@/components/ui/faq";
import { breadcrumbLd, faqLd } from "@/lib/jsonld";
import { breadcrumbLabel, postBySlug, postPath } from "@/lib/blog";
import { ROBOTS, SITE } from "@/lib/site";
import { ogImage, ogImageLd } from "@/lib/og";
import { authorLd } from "@/lib/authors";

const post = postBySlug("mssp-vs-soc")!;
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
  { id: "in-practice", label: "MSSP Vs SOC In Practice: What The Choice Looks Like" },
  { id: "how-they-run", label: "How An MSSP SOC And An In-House SOC Actually Run" },
  { id: "what-a-soc-covers", label: "What A SOC Covers, And What MSSPs Bolt On" },
  { id: "comparison", label: "In-House SOC Vs MSSP: Side-By-Side Comparison" },
  { id: "socaas-vs-mssp", label: "SOC As A Service Vs MSSP" },
  { id: "soc-vs-mdr-vs-mssp", label: "SOC Vs MDR Vs MSSP" },
  { id: "siem-vs-soc", label: "SIEM Vs SOC: The Tools Behind Both Models" },
  { id: "why-choose", label: "Why Choose An MSSP Or An In-House SOC?" },
  { id: "limitations", label: "Limitations Of Each Model" },
  { id: "co-managed", label: "Co-Managed And Hybrid SOCs" },
  { id: "small-businesses", label: "MSSP Vs SOC For Small Businesses" },
  { id: "compliance", label: "US Compliance Rules That Shape The Decision" },
  { id: "cost", label: "What An MSSP Costs Next To Your Own SOC" },
  { id: "how-to-choose", label: "How To Choose Between An MSSP And An In-House SOC" },
  { id: "changes-2026", label: "What Changed, And What Is Shifting In 2026" },
  { id: "final-thoughts", label: "Final Thoughts" },
  { id: "faq", label: "Frequently Asked Questions" },
];

const FAQS: FaqItem[] = [
  {
    q: "What Is The Difference Between SOC And MSSP?",
    a: "A SOC is the team and tooling that detects and responds to threats, and an MSSP is a company that sells security services, often by running a SOC for many customers. You can have a SOC without an MSSP, and an MSSP can provide your SOC.",
  },
  {
    q: "Are SOC Analysts Being Replaced By AI?",
    a: "Not at present. AI tools mostly handle first-pass triage and enrichment, while analysts make decisions and write detections. The US Bureau of Labor Statistics projects 21% employment growth for information security analysts from 2025 to 2035, compared with 3% across all occupations.",
  },
  {
    q: "What Is MSSP In Cybersecurity?",
    a: "MSSP stands for Managed Security Service Provider, a company that runs some or all of another organization's security operations under contract, commonly including 24/7 monitoring and incident response.",
  },
  {
    q: "Is A SIEM A SOC?",
    a: "No. A SIEM is a software platform for collecting and analyzing logs, while a SOC is the team that uses it. Owning a SIEM without staff to monitor it doesn't give you SOC coverage.",
  },
  {
    q: "Can You Switch From An MSSP To An In-House SOC Later?",
    a: "Yes, provided the contract allows you to export logs, detection rules and case history. Many organizations make the move in stages, starting with a co-managed arrangement.",
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
      { "@type": "Thing", name: "Managed security service provider" },
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

/** Inline CTA card, same frame as the other MSSP posts, without an eyebrow. */
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

      <ArticleShell post={post} toc={TOC}>
        <P>
          An <Strong>MSSP (Managed Security Service Provider)</Strong> is an
          outside company that delivers security services such as monitoring,
          threat detection, incident response and firewall management under
          contract. A <Strong>SOC (Security Operations Center)</Strong> is the
          team, processes and tools that watch an organization&apos;s systems
          and respond to threats around the clock. An MSSP usually runs a SOC,
          so it&apos;s one way to get SOC coverage.
        </P>
        <P>
          At WhyCrew we build the SIEM and SOC platforms MSSPs use to serve
          their clients, so we look at this question from the provider&apos;s
          end.
        </P>
        <P>
          In practice an MSSP is often where your SOC lives, so the real
          decision is who staffs it: your employees, a provider, or both.
        </P>

        <H2 id="in-practice">
          MSSP Vs SOC In Practice: What The Choice Looks Like
        </H2>
        <P>
          Day to day, the choice is between hiring security analysts, paying a
          provider for theirs, or splitting the work.
        </P>
        <P>
          Vendors use the phrase &quot;MSSP SOC&quot; for the operations center
          a provider runs for its whole customer base. That shared model is how
          a{" "}
          <A href="/blog/what-is-an-mssp">managed security service provider</A>{" "}
          operates: analysts work across many clients on one platform, with
          each client&apos;s data kept in its own tenant.
        </P>
        <P>
          A lot of organizations start with neither. Security sits with the IT
          team, alerts go to a shared mailbox, and nothing gets looked at
          overnight or on weekends. That traditional model is usually what an
          MSSP or an in-house SOC ends up replacing.
        </P>

        <H2 id="how-they-run">
          How An MSSP SOC And An In-House SOC Actually Run
        </H2>
        <P>
          Either way, somebody ends up staring at alerts generated from your
          logs. The differences are where those logs end up and whether that
          somebody can act on an alert without asking you first.
        </P>

        <H3>How An In-House SOC Works</H3>
        <P>
          In an in-house setup, logs from endpoints, firewalls, Microsoft 365 or
          Google Workspace, cloud accounts and the identity provider feed a SIEM
          your company licenses and operates. Analysts typically work in tiers,
          with Tier 1 handling the alert queue, Tier 2 taking anything that
          needs investigation and Tier 3 (in larger teams) hunting for threats
          and writing detection rules. Because they&apos;re employees with admin
          access, they can quarantine a laptop or lock an account themselves.
        </P>

        <H3>How An MSSP SOC Works</H3>
        <P>
          With an MSSP, a collector or agent installed on your network sends
          logs to the provider&apos;s platform, which is normally a multi-tenant
          SIEM. The provider&apos;s analysts review your alerts alongside other
          clients&apos; and contact you within the response times your contract
          sets for each severity level.
        </P>
        <P>
          What they&apos;re allowed to do next depends on the service tier. Some
          contracts let the provider isolate a device or disable an account
          immediately. Others stop at a notification, which means a 3 a.m.
          alert waits until someone on your side sees it.
        </P>
        <P>
          So the onboarding paperwork deserves more attention than it usually
          gets. A responsibility matrix should list the systems in scope, the
          actions the provider can take without approval and the response times
          on both sides. Gaps in that document tend to surface later as alerts
          nobody acted on. On the platform side it also means permissions set
          client by client, since no two contracts allow the same actions, and
          that&apos;s one of the first things we design for when we build for
          an MSSP.
        </P>

        <CtaCard
          label="Build with WhyCrew"
          title="Run Your Clients' SOC On A Platform You Own."
          body="WhyCrew builds the multi-tenant SIEM and SOC platform behind your service. You pay once, at a fixed price. Then we hand over the code and the infrastructure."
        >
          <Button href="/contact">Talk to an engineer</Button>
        </CtaCard>

        <H2 id="what-a-soc-covers">What A SOC Covers, And What MSSPs Bolt On</H2>
        <P>
          A full SOC covers seven areas of work, and MSSPs usually package extra
          operational services with some or all of them.
        </P>
        <Bullets
          items={[
            "Continuous log collection and monitoring",
            "Alert triage and investigation",
            "Incident response and containment",
            "Threat hunting",
            "Detection engineering and rule tuning",
            "Threat intelligence",
            "Log retention and compliance reporting",
          ]}
        />
        <P>
          Internal teams tend to cover the first three well, because the alerts
          force the issue. Threat hunting and detection engineering need
          protected time, and small teams rarely have it.
        </P>
        <P>
          Alongside SOC work, MSSPs commonly manage firewalls and VPNs, run
          vulnerability scans, patch security appliances and prepare audit
          reports. What gets sold as an &quot;MSSP contract&quot; varies widely,
          from full detection and response to little more than alert
          forwarding. We&apos;d treat alert-only tiers with caution, since they
          leave the investigation, which is the hard part, with the internal
          team that went looking for help in the first place.
        </P>

        <H2 id="comparison">In-House SOC Vs MSSP: Side-By-Side Comparison</H2>
        <P>
          The table compares the two models across ten factors that usually
          drive the decision.
        </P>
        <DataTable
          head={["Factor", "MSSP (Managed SOC)", "In-House SOC"]}
          rows={[
            ["What it is", "A provider you contract with", "A team and function you build"],
            ["Who staffs it", "Shared analysts serving many clients", "Your own employees"],
            ["Time to coverage", "Fast once log sources are connected", "Slow: hiring, tooling and tuning take months"],
            ["Cost structure", "Recurring fee, often per user, device or data volume", "Salaries, tool licenses and training, mostly fixed"],
            ["24/7 coverage", "Standard in most contracts", "Needs several analysts per seat across shifts"],
            ["Knowledge of your business", "General, built up over time", "Deep, including what \"normal\" looks like"],
            ["Control over tools and rules", "Limited to what the provider supports", "Full"],
            ["Threat visibility", "Patterns seen across many clients", "Your environment only"],
            ["Where your logs live", "The provider's platform", "Systems you control"],
            ["Best fit", "Small and mid-sized teams that need coverage now", "Large or highly regulated organizations with budget and staff"],
          ]}
        />
        <P>
          For most buyers the 24/7 row carries the most weight. An in-house SOC
          that isn&apos;t staffed overnight still has the coverage gap the old
          shared-mailbox setup had.
        </P>

        <H2 id="socaas-vs-mssp">SOC As A Service Vs MSSP</H2>
        <P>
          SOC as a Service (SOCaaS), which some vendors call managed SOC, sells
          the SOC functions by themselves: monitoring, detection, investigation
          and response, generally on the vendor&apos;s own SIEM. An MSSP
          normally offers those along with management of devices and networks.
        </P>
        <P>
          The terms overlap heavily in practice. Many MSSPs offer a SOCaaS
          package, and many SOCaaS vendors include vulnerability scanning. When
          comparing quotes, it&apos;s more useful to ask what the provider does
          after confirming a real attack at 2 a.m. than to compare product
          names.
        </P>

        <H2 id="soc-vs-mdr-vs-mssp">SOC Vs MDR Vs MSSP</H2>
        <P>
          MDR (Managed Detection and Response) is an outsourced service where
          the provider is expected to step in and contain an attack, usually on
          your laptops and servers, instead of just reporting it. MSSP
          monitoring has historically covered a wider range of devices and
          stopped at alerting, although many MSSPs now sell MDR tiers. An
          in-house SOC can do either job if it has the staff.
        </P>

        <H2 id="siem-vs-soc">SIEM Vs SOC: The Tools Behind Both Models</H2>
        <P>
          A{" "}
          <A href="/blog/what-is-siem">
            SIEM (Security Information and Event Management)
          </A>{" "}
          platform collects and correlates logs, and on its own it isn&apos;t a
          SOC. The SOC is the team working in it.
        </P>
        <P>
          Around the SIEM sit the usual extras, mostly endpoint agents and some
          automation for routine responses. In-house, your company licenses and
          maintains those tools. With an MSSP the provider owns them, and its
          platform holds your logs and detection history, so export terms
          belong in the contract from day one.
        </P>

        <H2 id="why-choose">Why Choose An MSSP Or An In-House SOC?</H2>
        <P>
          Most mid-sized companies end up with an MSSP because nobody wants the
          night shift and the budget won&apos;t stretch to five more hires.
          Building in-house is nearly always about control.
        </P>

        <H3>Why Companies Pick An MSSP</H3>
        <P>
          Covering one analyst seat 24 hours a day, 7 days a week takes 168
          hours of work every week. At 40 hours per person that&apos;s 4.2
          analysts before leave, sickness and training, and five is the figure
          most staffing plans use.
        </P>
        <P>
          The Bureau of Labor Statistics puts the median salary for information
          security analysts at $129,180 (May 2025 data). Five of them come to
          roughly $646,000 a year. For one seat.
        </P>
        <P>
          Hiring isn&apos;t simply a numbers problem, either. ISC2&apos;s 2025
          workforce research found that a lot of security teams aren&apos;t
          short of bodies so much as skills. About a third said they had enough
          staff, yet 88% said a skills gap had caused at least one significant
          problem. For buyers, that suggests the expertise an MSSP brings may
          matter as much as the headcount it replaces.
        </P>
        <P>
          Providers also see activity across many client networks, so
          detections built after an incident at one customer can be applied to
          all of them.
        </P>

        <H3>Why Companies Build An In-House SOC</H3>
        <P>
          Internal analysts build up knowledge an outside team takes a long time
          to match, such as which executives travel at quarter-end or which
          servers run heavy jobs overnight. That familiarity reduces false
          positives and helps them judge business impact quickly. Organizations
          with data residency requirements or classified work also tend to need
          the tools and logs kept on systems they control.
        </P>

        <H2 id="limitations">Limitations Of Each Model</H2>
        <P>
          With an MSSP, the trouble usually comes from distance, because the
          analysts don&apos;t know your business. In-house, it&apos;s the
          payroll, plus keeping people once you&apos;ve trained them.
        </P>
        <P>
          Provider analysts divide their time across tenants and follow standard
          playbooks, which can mean more low-value escalations and missed
          context. Moving to another provider later takes work, because logs and
          case history sit on the current provider&apos;s platform.
          Accountability for an incident also stays with your organization.
        </P>
        <P>
          In-house teams carry high fixed costs, and overnight shifts make
          retention harder. When experienced analysts leave, their knowledge of
          the environment goes with them. An internal team also only sees
          attacks against its own organization.
        </P>

        <H2 id="co-managed">Co-Managed And Hybrid SOCs</H2>
        <P>
          A co-managed SOC divides the work between internal staff and a
          provider, and it&apos;s a common choice for mid-sized organizations.
          In a typical setup the provider handles 24/7 monitoring and
          first-level triage, while the internal team takes investigations that
          need business context and leads incident response.
        </P>
        <P>
          Other arrangements include keeping daytime coverage internal and
          outsourcing nights and weekends, running internal analysts on a
          provider-managed SIEM, or adding MDR to an internal team for endpoint
          containment. Whatever the split, both sides need access to the same
          platform and case records, and the agreement should state who can
          take action without approval.
        </P>

        <H2 id="small-businesses">MSSP Vs SOC For Small Businesses</H2>
        <P>
          Small businesses are usually better served by an MSSP or MDR provider,
          since a team of a few IT staff can&apos;t cover overnight shifts. When
          comparing providers, check that response is included, that Microsoft
          365 or Google Workspace and the identity provider are in scope, and
          that a named internal contact can approve actions such as disabling an
          account outside business hours.
        </P>

        <H2 id="compliance">US Compliance Rules That Shape The Decision</H2>
        <P>
          Either model can satisfy US requirements, which specify controls and
          evidence rather than who employs the analysts. Each industry has its
          own{" "}
          <A href="/blog/what-is-an-mssp#compliance">
            monitoring and reporting rules for MSSP clients
          </A>
          , but four of them bear most directly on this choice in 2026.
        </P>
        <P>
          Since March 2025, PCI DSS 4.0.1 has required anyone handling card data
          to review audit logs with automated tools, which in practice means a
          SIEM with tuned alerting under either model.
        </P>
        <P>
          Public companies must file an SEC Form 8-K under Item 1.05 within four
          business days of determining that a cybersecurity incident is
          material. How quickly the SOC escalates, and how much useful detail it
          provides, affects how much of that window is left for the materiality
          decision.
        </P>
        <P>
          For healthcare, HHS has moved its proposed overhaul of the HIPAA
          Security Rule to its long-term agenda, with final action targeted for
          July 2027. The existing Security Rule remains in force.
        </P>
        <P>
          On July 13, 2026, the Defense Department suspended Phase 2 of CMMC,
          which would have required third-party Level 2 certification from
          November 10, 2026. Defense contractors still need to meet DFARS
          252.204-7012 and complete CMMC self-assessments.
        </P>

        <H2 id="cost">What An MSSP Costs Next To Your Own SOC</H2>
        <P>
          For most organizations below enterprise size, an MSSP costs less than
          an equivalent in-house SOC because the provider shares staff and tool
          costs across its clients. MSSP fees are usually based on users,
          devices or log volume. An in-house SOC adds SIEM licensing and the
          rest of the tool stack to the salary figures above, and{" "}
          <A href="/blog/siem-cost-licensing-vs-custom-built">SIEM pricing</A>{" "}
          in particular often rises with data volume.
        </P>
        <P>
          Detection speed belongs in the comparison as well. IBM&apos;s 2026
          Cost of a Data Breach Report puts the average US breach at $11.5
          million, compared with a global average of $4.99 million. A few very
          large incidents skew averages upward, so treat them as a rough guide
          rather than a forecast.
        </P>
        <P>
          Providers face a version of the same issue. An MSSP&apos;s SOC also
          runs on a SIEM, and under per-GB licensing the platform bill grows
          with each new client, which is one reason some MSSPs have moved to
          owning their platform.
        </P>

        <CtaCard
          label="Custom SIEM development"
          title="Stop Paying More Every Time A Client Logs More."
          body="Per-GB licensing grows with each tenant you add. WhyCrew builds your SIEM once, for a fixed payment. After handover, the platform is yours."
        >
          <Button href="/services/custom-siem-development">
            See custom SIEM development
          </Button>
        </CtaCard>

        <H2 id="how-to-choose">
          How To Choose Between An MSSP And An In-House SOC
        </H2>
        <P>
          The deciding factors are the hours you need covered and the staff you
          can hire and keep, followed by how much control your environment and
          obligations require. If you need 24/7 coverage and can&apos;t fund
          around five analysts per seat, the realistic options are a full MSSP
          or a co-managed model.
        </P>
        <P>
          Complex environments with on-premises systems, multiple clouds or
          operational technology benefit from analysts who know them well, which
          favors in-house or co-managed setups. Standard Microsoft 365 and cloud
          environments are routine for most MSSPs. Requirements to keep data on
          your own systems, or contract terms requiring named US-based staff,
          will narrow the list of suitable providers.
        </P>
        <P>
          During evaluations, ask each provider who handles alerts overnight and
          what they can do without approval, what response times apply at each
          severity level and what happens when they&apos;re missed, which of
          your systems fall outside their monitoring, and how you would get logs
          and detection rules back at the end of the contract.
        </P>

        <H2 id="changes-2026">What Changed, And What Is Shifting In 2026</H2>
        <P>
          Early MSSPs mainly managed firewalls and VPNs, and only big
          enterprises and government agencies tended to build dedicated SOCs.
          SIEM-based monitoring made outsourced SOC services workable, MDR added
          hands-on response, and co-managed arrangements developed between the
          two.
        </P>
        <P>
          The biggest change in 2026 is the use of AI in triage and
          investigation, though adoption is uneven. The SANS 2026 SOC Survey
          found that 79% of SOCs use AI tools and 36% have integrated them into
          defined workflows.
        </P>
        <P>
          AI SOC platforms, which automate triage for internal teams, are a
          newer option alongside MDR and MSSP services, with the difference that
          your own staff operate them. Rising log volumes are also leading some
          MSSPs to reconsider renting per-GB SIEM platforms.
        </P>

        <H2 id="final-thoughts">Final Thoughts</H2>
        <P>
          Before talking to providers, it helps to write down the hours you need
          covered and the number of analysts you could realistically hire and
          retain. If those don&apos;t line up, an MSSP or co-managed service is
          the practical route, and the contract&apos;s response terms become the
          main thing to compare. If they do line up and you need close control,
          an in-house SOC is worth the cost. In either case, agree the
          responsibility split in writing before the service goes live.
        </P>

        <CtaCard
          label="Build with WhyCrew"
          title="Own The SOC Platform Your Clients Depend On."
          body="Tell us about your tenants and log volume. We'll scope a SIEM and SOC platform built for your MSSP, at one fixed price, with full ownership at handover."
        >
          <Button href="/contact">Book a strategy call</Button>
          <Button href="/services/custom-siem-development" variant="ghost">
            How the build works
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
