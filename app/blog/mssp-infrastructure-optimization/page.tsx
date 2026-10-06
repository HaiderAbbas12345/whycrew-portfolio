import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArticleShell, type TocEntry } from "@/components/blog/article-shell";
import {
  Bullets,
  DataTable,
  H2,
  H3,
  Numbered,
  P,
  QuickAnswer,
  Ref,
  Strong,
} from "@/components/blog/prose";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/ui/faq";
import { breadcrumbLd, faqLd, type Faq } from "@/lib/jsonld";
import { breadcrumbLabel, postBySlug, postPath } from "@/lib/blog";
import { CTA_HREF, OG_IMAGE, SITE } from "@/lib/site";

const post = postBySlug("mssp-infrastructure-optimization")!;
const PATH = postPath(post);

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
  {
    id: "what-is-mssp-infrastructure-optimization",
    label: "What Is MSSP Infrastructure Optimization?",
  },
  { id: "why-costs-rise", label: "Why Do MSSP Costs Rise as Clients Grow?" },
  {
    id: "what-is-infrastructure-optimization",
    label: "What Is Infrastructure Optimization?",
  },
  {
    id: "client-infrastructure",
    label: "How Does an MSSP Optimize a Client's Infrastructure?",
  },
  {
    id: "four-pillars",
    label: "What Are the 4 Pillars of MSSP Infrastructure Optimization?",
  },
  {
    id: "msp-vs-mssp",
    label: "How Does MSP Optimization Differ From MSSP Optimization?",
  },
  {
    id: "six-step-playbook",
    label: "How Do You Optimize MSSP Infrastructure? A 6-Step Playbook",
  },
  {
    id: "metrics",
    label: "Which Metrics Show MSSP Optimization Is Working?",
  },
  {
    id: "common-mistakes",
    label: "What Are the Most Common MSSP Optimization Mistakes?",
  },
  {
    id: "licensed-siem-or-own-platform",
    label: "Should You Keep a Licensed SIEM or Build Your Own Platform?",
  },
  {
    id: "nis2-and-dora",
    label: "How Does Optimization Affect NIS2 and DORA Compliance?",
  },
  {
    id: "results",
    label: "What Results Have MSSPs Seen From Optimization?",
  },
  { id: "faq", label: "Frequently Asked Questions" },
];

const FAQS: Faq[] = [
  {
    q: "What is infrastructure optimization in simple terms?",
    a: "It is the ongoing work of making IT systems do the same work, or more, at lower cost and risk. You measure what you run, remove what you don't need, shrink what is too big, and automate manual tasks.",
  },
  {
    q: "What does an MSSP SOC do?",
    a: "An MSSP SOC watches many clients from one security operations center. It collects their logs, finds threats, sorts alerts, and responds for them. Optimizing its infrastructure keeps that shared SOC affordable as the client count grows.",
  },
  {
    q: "Can an MSSP optimize my company's infrastructure?",
    a: "Yes. Most MSSPs monitor your systems 24/7, scan for and patch weak spots, tune your security tools, and clean up costly logs. Ask any provider how it measures results, such as time to detect threats and your cost per month.",
  },
  {
    q: "How is MSSP infrastructure optimization different from IT optimization?",
    a: "General IT optimization targets servers, cloud compute and licenses. MSSP optimization targets the costs that grow with each new client: SIEM ingest and storage, multi-tenant tools, and analyst triage time.",
  },
  {
    q: "How much can filtering reduce SIEM data?",
    a: "In our projects, filtering and routing usually remove 30 to 50% of raw log volume. The exact figure depends on how much duplicate or low-value data each client sends.",
  },
  {
    q: "Is it safe to automate Tier 1 triage?",
    a: "Yes, if you tune detections first and analysts own every escalated alert. Automation should enrich alerts and close false alarms you already understand. Unclear threats should stay with an analyst.",
  },
  {
    q: "How long does MSSP infrastructure optimization take?",
    a: "A first audit and cleanup takes a few weeks. Replacing a licensed SIEM takes longer, often about twelve weeks from kickoff to a live platform. A focused migration can be faster.",
  },
  {
    q: "Does optimization put NIS2 or DORA compliance at risk?",
    a: "Not if it is done right. Move compliance logs to cheaper storage instead of deleting them. Keep each client's data separate in a way you can audit.",
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

/* ------------------------------------------------- page-local design blocks */

const EYEBROW =
  "font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-accent";

function StatTiles({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-3">
      {items.map((s) => (
        <div
          key={s.value}
          className="rounded-lg border border-line/70 bg-surface/60 px-4 py-3.5"
        >
          <p className="text-2xl font-semibold leading-tight text-bright">
            {s.value}
          </p>
          <p className="mt-1 text-[12.5px] text-muted">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

const PILLARS = [
  {
    n: "01",
    name: "Data pipeline",
    body: "Filter and tier logs before they reach the SIEM",
    watch: "Watch: data per client",
  },
  {
    n: "02",
    name: "Platformization",
    body: "One multi-tenant platform, fewer tools",
    watch: "Watch: onboarding time",
  },
  {
    n: "03",
    name: "Automation",
    body: "SOAR handles enrichment and Tier 1 triage",
    watch: "Watch: alerts per analyst",
  },
  {
    n: "04",
    name: "Cloud and FinOps",
    body: "Elastic compute and a cost owner for every client",
    watch: "Watch: cost per client",
  },
];

function PillarsDiagram() {
  return (
    <figure className="mt-8">
      <div className="rounded-lg border border-line/70 bg-surface/50 p-4 sm:p-5">
        <p className="rounded-md border border-accent/40 bg-accent/5 px-4 py-3 text-center text-[14px] font-semibold text-bright">
          Goal: cost per client falls as you add clients
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <div
              key={p.n}
              className="flex flex-col rounded-md border border-line/70 bg-surface-2/40 p-4"
            >
              <p className="font-mono text-[10.5px] text-accent">{p.n}</p>
              <p className="mt-2 text-[14px] font-semibold text-bright">
                {p.name}
              </p>
              <p className="mt-1.5 flex-1 text-[12.5px] leading-relaxed text-muted">
                {p.body}
              </p>
              <p className="mt-4 border-t border-line-soft pt-2.5 text-[11.5px] text-faint">
                {p.watch}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-3 rounded-md bg-surface-2/60 px-4 py-3 text-center text-[13px] text-body">
          Foundation: a multi-tenant platform you own, not rent
        </p>
      </div>
      <figcaption className="mt-3 text-[12.5px] text-faint">
        The four pillars of MSSP infrastructure optimization.
      </figcaption>
    </figure>
  );
}

function StepCards({ steps }: { steps: ReactNode[] }) {
  return (
    <ol className="mt-6 space-y-3">
      {steps.map((s, i) => (
        <li
          key={i}
          className="flex gap-4 rounded-lg border border-line/70 bg-surface/50 p-5 text-[15px] leading-[1.75] text-body"
        >
          <span
            aria-hidden
            className="mt-[3px] shrink-0 font-mono text-[11px] text-accent"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{s}</span>
        </li>
      ))}
    </ol>
  );
}

function TierCards({
  tiers,
}: {
  tiers: { label: string; body: string }[];
}) {
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-3">
      {tiers.map((t) => (
        <div
          key={t.label}
          className="rounded-lg border border-line/70 bg-surface/50 p-4"
        >
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent">
            {t.label}
          </p>
          <p className="mt-2 text-[13.5px] leading-relaxed text-body">
            {t.body}
          </p>
        </div>
      ))}
    </div>
  );
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
        dek="How managed security providers cut SIEM costs, automate Tier 1 triage, and grow margin with every client they add."
      >
        <QuickAnswer block>
          <P>
            MSSP infrastructure optimization cuts the cost of protecting each
            client. It does this without weakening detection or compliance.
            Most of the savings come from four changes. Filter low-value logs
            before they reach the SIEM. Run all clients on one shared platform.
            Automate Tier 1 triage. Run cloud costs under FinOps rules. In our
            projects, these changes have cut log volume by 30 to 50% and SIEM
            costs by 40 to 70%.
          </P>
          <StatTiles
            items={[
              { value: "30–50%", label: "less log volume" },
              { value: "40–70%", label: "lower SIEM costs" },
              { value: "70–80%", label: "less Tier 1 handling time" },
            ]}
          />
          <p
            id="key-takeaways"
            className="mt-7 scroll-mt-28 text-[14px] font-semibold text-bright"
          >
            Key takeaways
          </p>
          <Bullets
            items={[
              "SIEM fees grow with every GB you send in. Dropping logs that no rule uses cuts 30 to 50% of that volume.",
              "Automated triage takes over most repeat Tier 1 work. One Dutch MSSP we supported cut that work by 78%.",
              "Move compliance logs to cheap storage. Do not delete them. NIS2 and DORA both need that proof on hand.",
              "Three numbers show if it works: cost per client, logs per client, and alerts per analyst.",
              "A licensed SIEM is still the better choice if you have few clients or no platform engineers.",
            ]}
          />
        </QuickAnswer>

        <H2 id="what-is-mssp-infrastructure-optimization">
          What Is MSSP Infrastructure Optimization?
        </H2>
        <P>
          <Strong>
            MSSP infrastructure optimization means cutting what it costs to
            protect each client, so your margin grows as you add clients.
          </Strong>
        </P>
        <P>
          People use the term in two ways. Most often, it means the work an
          MSSP does on its own platform so each client costs less to serve. It
          can also mean the work an MSSP does to tune a client&apos;s network
          and security tools. This guide covers both, with most of the focus on
          the provider side.
        </P>
        <P>
          Most IT teams tune servers, cloud and licenses. A managed security
          provider has a different cost model. Log volume, tools and analyst
          hours all go up with each new contract. Without changes, more clients
          just means more cost. The goal is to flip that. Your fortieth client
          should cost less to protect than your tenth.
        </P>
        <P>
          Most of this work happens inside the SOC (security operations
          center). It covers how logs flow, how rules are shared across
          clients, and how many alerts still need a person. For the basics of
          the core platform, see <Ref to="what-is-siem">What Is SIEM</Ref>.
        </P>

        <H2 id="why-costs-rise">Why Do MSSP Costs Rise as Clients Grow?</H2>
        <P>
          MSSP costs rise because three things grow with each client: data,
          tools and staff. If the way you work stays the same, costs grow as
          fast as revenue. Margin stays flat.
        </P>
        <P>
          Data is the cost most providers see first. Most licensed SIEMs (the
          tools that collect and search security logs) charge by the GB. Prices
          often start at $2 to $4 per GB. Log volume also grows 20 to 30% a
          year, even before you add a client. One German MSSP we worked with
          paid €45,000 a month in SIEM fees. That was before it moved to its
          own platform.
        </P>
        <P>
          Tool costs are harder to spot on an invoice. Each client brings its
          own mix of firewall, EDR, cloud and identity tools. Each one needs a
          link into your SOC that your engineers must build and keep working.
          People in the field call this the &quot;silo tax.&quot;
        </P>
        <P>
          Staff costs follow the data. More data means more alerts. Without
          automation, the only answer is to hire more Tier 1 analysts, the
          first line of people who review each alert. Alert fatigue grows with
          them.
        </P>

        <H2 id="what-is-infrastructure-optimization">
          What Is Infrastructure Optimization?
        </H2>
        <P>
          <Strong>
            Infrastructure optimization is the ongoing work of checking,
            resizing and updating your servers, storage, network and software,
            so they stay fast and reliable at the lowest cost you can sustain.
          </Strong>
        </P>
        <P>
          This is not just a security task. Most IT teams pull the same six
          levers:
        </P>
        <Numbered
          items={[
            <>
              <Strong>Inventory.</Strong> List every server, cloud account and
              license, and how much each one is really used. Without this
              baseline, you can&apos;t trust any savings estimate.
            </>,
            <>
              <Strong>Right-sizing.</Strong> Match capacity to real demand, not
              to guesses about peak load. A 2026 industry survey found that 29%
              of cloud spend is wasted.
            </>,
            <>
              <Strong>Network tuning.</Strong> Fix slow links, cut needless
              traffic between regions, and watch data transfer fees.
            </>,
            <>
              <Strong>Infrastructure as code.</Strong> Build systems from
              templates kept in version control, with a tool such as Terraform.
              Every build then comes out the same and can be audited.
            </>,
            <>
              <Strong>Tool consolidation.</Strong> Retire tools that overlap.
              Each one has its own license, patches and upkeep.
            </>,
            <>
              <Strong>Cost ownership (FinOps).</Strong> Tag each resource to an
              owner. Review unit costs every month.
            </>,
          ]}
        />
        <P>
          For an MSSP, each lever maps to one of the four pillars covered later
          in this guide.
        </P>

        <H2 id="client-infrastructure">
          How Does an MSSP Optimize a Client&apos;s Infrastructure?
        </H2>
        <P>
          An MSSP optimizes a client&apos;s infrastructure by watching it
          around the clock, fixing weak spots, tuning security tools, and
          cutting waste in logs and tools.
        </P>
        <P>
          If you are a business buying from an MSSP, this is what the work
          usually includes:
        </P>
        <Bullets
          items={[
            <>
              <Strong>24/7 monitoring.</Strong> The SOC watches logs and alerts
              day and night, so threats are caught fast.
            </>,
            <>
              <Strong>Vulnerability scans and patching.</Strong> Weak spots are
              found and fixed on a set schedule.
            </>,
            <>
              <Strong>Security tool tuning.</Strong> Firewall, EDR and SIEM
              rules are tuned so real threats stand out from the noise.
            </>,
            <>
              <Strong>Network visibility.</Strong> Traffic is mapped so blind
              spots and slow links can be fixed.
            </>,
            <>
              <Strong>Log and tool cleanup.</Strong> Logs that no rule uses are
              dropped, and overlapping tools are retired. This lowers the
              monthly bill.
            </>,
            <>
              <Strong>Backup and recovery checks.</Strong> Backups are tested,
              so the business can get back up after an attack.
            </>,
          ]}
        />
        <P>
          An MSSP can only offer all of this at a fair price if its own
          platform runs lean. That is why the rest of this guide looks at the
          provider side.
        </P>

        <H2 id="four-pillars">
          What Are the 4 Pillars of MSSP Infrastructure Optimization?
        </H2>
        <P>
          The four pillars are data pipeline optimization, platform
          consolidation, automated triage, and cloud-native infrastructure with
          FinOps. You can start any of them on its own. In most projects we
          start with the data pipeline, because its savings show up on the SIEM
          bill first.
        </P>

        <PillarsDiagram />

        <H3>1. Data Pipeline and Log Ingestion Optimization</H3>
        <P>
          A security data pipeline cuts SIEM cost by filtering, routing and
          cleaning up logs before ingest. You then pay top rates only for data
          that helps you find threats.
        </P>
        <P>
          For most MSSPs, SIEM ingest is the biggest single infrastructure
          cost. Every client&apos;s logs are taken in, parsed and stored at
          hot-tier rates, the fastest and most costly kind of storage. A large
          share of those logs never helps detect anything.
        </P>
        <P>A pipeline in front of the SIEM fixes this in three ways:</P>
        <Bullets
          items={[
            "It drops or sums up low-value events, such as allowed firewall traffic and routine health checks.",
            "It routes data by purpose. Detection data stays in hot storage. Compliance logs (GDPR, HIPAA, NIS2, DORA) move to cheap object storage, where you can still search them.",
            "It maps every source to an open schema such as OCSF. A new client then needs no new parsers.",
          ]}
        />
        <P>
          The same pipeline can also enrich data. See how one MSSP built an{" "}
          <Ref to="owned-threat-intel-case-study">
            owned threat intelligence pipeline
          </Ref>
          .
        </P>

        <H3>2. Platformization and Tool Consolidation</H3>
        <P>
          Tool consolidation cuts cost by running every client on one
          multi-tenant platform, not on a separate set of tools for each
          client.
        </P>
        <P>
          Few MSSPs plan their tool stack. It grows one client at a time: an
          endpoint tool for one, a new firewall for the next, a scanner added
          because a client asked. Each one adds a license, a link to maintain,
          and more screens for analysts to switch between.
        </P>
        <P>
          Consolidation means one platform with a shared control plane, not a
          separate copy per client. Adding a client becomes a config task, not
          a project. Co-managed SIEM clients use the same template with limited
          access.
        </P>
        <P>
          A shared platform only works with strict tenant isolation, which
          keeps each client&apos;s data walled off from the rest. That means a
          separate data store for each client, least-privilege access for
          analysts, and network segmentation. Build all of it in from day one.
          Our guide to{" "}
          <Ref to="multi-tenant-siem-architecture">
            multi-tenant SIEM for MSSPs
          </Ref>{" "}
          covers the design in detail.
        </P>
        <P>
          Where client contracts allow, move clients onto unified XDR and SASE
          stacks. That cuts the number of log formats coming into the SOC, and
          the links you have to maintain.
        </P>
        <P>
          If you don&apos;t have the engineers to build this, a{" "}
          <Ref to="mssp-engineering-partner">
            white-label MSSP engineering partner
          </Ref>{" "}
          can fill the gap.
        </P>

        <H3>3. Hyperautomation and Autonomous Triage</H3>
        <P>
          Automated triage, where machines sort and close routine alerts, cuts
          analyst hours. SOAR and AI handle enrichment and known-safe alerts,
          so analysts can focus on real threats.
        </P>
        <P>
          Tier 1 triage is where most SOC hours go. Analysts look up
          indicators, open tickets, and close the same harmless alerts again
          and again. It is also where{" "}
          <Ref to="soc-analyst-burnout">analyst burnout</Ref> tends to start.
        </P>
        <P>
          <Ref to="soar-playbooks-guide">SOAR playbooks</Ref> can handle
          lookups, reputation checks, tickets and first containment steps in
          seconds. AI triage goes further. It closes known-safe alerts on its
          own and sends the rest up with the evidence attached. In our
          projects, this has cut Tier 1 handling time by 70 to 80%. Our{" "}
          <Ref to="ai-soc-automation-services">AI-powered SOC automation</Ref>{" "}
          service shows how we build it.
        </P>
        <P>
          Tune your detection rules before you automate. Automating a noisy
          rule set just makes the noise faster. At worst, it closes real
          threats along with the false alarms.
        </P>

        <H3>4. Cloud-Native Architecture and FinOps</H3>
        <P>
          A cloud-native setup run under FinOps makes spend follow real event
          volume. It also shows the true cost of each client. Fixed on-site
          hardware has to be sized for peak load, so you pay for that peak all
          year.
        </P>
        <Bullets
          items={[
            "Parsing, enrichment and correlation run on serverless or autoscaling compute. You pay for events processed, not for idle servers.",
            "Every resource is tagged to a client and a cost owner. Set budgets and alerts, and review cost per client each month. Without this, multi-cloud spend tends to creep up unseen.",
            "For EU clients, pick storage regions for NIS2, DORA and GDPR from the start. That avoids costly data moves later.",
          ]}
        />

        <H3>Comparing the Four Approaches</H3>
        <P>
          Log filtering pays back fastest. Platform consolidation and automated
          triage change your cost base the most. FinOps stops the savings from
          slipping away. If you can take on only one project, start with log
          filtering. It changes the least about how your SOC works today.
        </P>
        <DataTable
          head={["Approach", "Main benefit", "Cost impact", "Effort to implement"]}
          rows={[
            ["Log filtering and storage tiering", "Smaller SIEM bill", "High", "Low to medium"],
            ["Platform consolidation", "Fewer tools and silos", "Medium to high", "High"],
            ["Automated triage (SOAR and AI)", "Faster response, lower MTTR", "Slows headcount growth", "High"],
            ["Cloud-native architecture and FinOps", "Pay only for what you use", "Moderate and ongoing", "Medium"],
          ]}
        />

        {/* ---------------------------------------- inline CTA: review */}
        <aside className="mt-10 flex flex-col gap-6 rounded-lg border border-line/70 bg-surface/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="max-w-md">
            <p className={EYEBROW}>Free architecture review</p>
            <p className="mt-2 text-xl font-semibold leading-snug text-bright">
              Find out where your margin is leaking
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">
              An engineer reviews your SIEM ingest, tooling and triage load,
              then shows you which of the four pillars will save the most per
              client.
            </p>
          </div>
          <div className="shrink-0">
            <Button href={CTA_HREF}>Book a free review</Button>
            <p className="mt-2 text-[12px] text-faint">
              30 minutes · engineer, not sales
            </p>
          </div>
        </aside>

        <H2 id="msp-vs-mssp">
          How Does MSP Optimization Differ From MSSP Optimization?
        </H2>
        <P>
          MSP optimization cuts the cost of keeping systems running. MSSP
          optimization cuts the cost of finding and stopping threats for each
          client. An MSP is judged mainly on uptime. An MSSP is judged on
          detection quality for the money spent. In co-managed setups, agree
          who owns each system at the start. If you don&apos;t, the two
          providers end up tuning the same systems toward different goals.
        </P>
        <DataTable
          head={["Terms", "MSP", "MSSP"]}
          rows={[
            ["Main goal", "Uptime and user productivity", "Rapid threat detection and response"],
            ["Biggest cost", "Hardware, cloud, licenses", "SIEM data, storage, analyst hours"],
            ["What gets tuned", "Servers, laptops, networks, backups", "SIEM, SOAR, EDR/XDR, log pipelines, rules"],
            ["What gets automated", "Patches, setup, backups", "Alert lookups, triage, response steps"],
            ["Key numbers", "Uptime, ticket fix time", "Time to detect, time to respond, cost per client"],
            ["Scaling risk", "More devices per tech", "More alerts per analyst"],
          ]}
        />

        <H2 id="six-step-playbook">
          How Do You Optimize MSSP Infrastructure? A 6-Step Playbook
        </H2>
        <P>
          To optimize MSSP infrastructure, audit cost per client, sort your log
          sources, filter before ingest, standardize detection rules, automate
          Tier 1 triage, and review unit costs each month. The first three
          steps are a one-time cleanup. The last three become part of how you
          run.
        </P>
        <StepCards
          steps={[
            <>
              <Strong>Run a per-client cost audit.</Strong> For each client,
              record daily log volume, alert counts, false alarm rate, analyst
              hours and revenue. Then rank clients by margin. Your three least
              profitable clients usually point to the core problem.
            </>,
            <>
              <Strong>Sort every log source.</Strong> Mark each source as
              needed for detection, needed for compliance, or unused. Sources
              that never fire a rule or support an audit are pure cost.
              Removing them often cuts log volume by 30 to 50%.
            </>,
            <>
              <Strong>Clean up and filter before ingest.</Strong> Move parsing
              and filtering into a pipeline in front of the SIEM. This is where
              savings show up fastest. If you also plan a SIEM migration, see
              our guide to{" "}
              <Ref to="siem-migration-guide">zero-downtime SIEM migration</Ref>
              .
            </>,
            <>
              <Strong>Standardize detection rules.</Strong> Map each client to
              MITRE ATT&amp;CK. Deploy one shared library of rules and
              playbooks. Keep client-specific exceptions as code.{" "}
              <Ref to="what-is-soar">What Is SOAR</Ref> covers the basics.
            </>,
            <>
              <Strong>Automate Tier 1 triage.</Strong> Enrich each alert before
              an analyst sees it. Auto-close known-safe patterns. Send the rest
              up with evidence attached.{" "}
              <Ref to="what-is-ai-soc">What Is AI SOC</Ref> explains how it
              works.
            </>,
            <>
              <Strong>Review unit costs monthly.</Strong> Track the metrics
              below for each client. Repeat the audit for any client whose
              numbers start to drift.
            </>,
          ]}
        />

        <H2 id="metrics">Which Metrics Show MSSP Optimization Is Working?</H2>
        <P>
          Cost per client, logs per client and alerts per analyst are the three
          main signs. Mean time to detect and mean time to respond act as
          guardrails. They confirm that savings are not hurting security.
        </P>
        <DataTable
          head={["Metric", "What it shows", "You want it to"]}
          rows={[
            ["Cost per client per month", "Whether profit grows as you grow", "Go down"],
            ["Logs per client (GB/day)", "Whether filtering is holding", "Stay flat or drop"],
            ["Alerts per analyst per shift", "Whether automation keeps up", "Go down"],
            ["False alarm rate", "How good your rules are", "Go down"],
            ["Time to detect (MTTD)", "How well you see threats", "Go down"],
            ["Time to respond (MTTR)", "How fast you act", "Go down"],
            ["Time to onboard a client", "How good your template is", "Go down"],
          ]}
        />

        <H2 id="common-mistakes">
          What Are the Most Common MSSP Optimization Mistakes?
        </H2>
        <P>
          The five most common mistakes are deleting compliance logs,
          automating before tuning, weak tenant isolation, keeping all data in
          hot storage, and building a platform too early. In our experience,
          each one comes from cutting cost before checking compliance,
          detection quality or isolation.
        </P>
        <Numbered
          items={[
            <>
              <Strong>Deleting compliance logs.</Strong> You may then be unable
              to support an incident report or an audit. Move the data to
              cheaper storage instead.
            </>,
            <>
              <Strong>Automating before tuning.</Strong> Automation magnifies
              whatever you feed it. With untuned rules, real threats get closed
              and noise gets escalated faster.
            </>,
            <>
              <Strong>Weak tenant isolation.</Strong> Shared indexes, shared
              logins or broad analyst access can turn one client&apos;s
              incident into a breach across many clients.
            </>,
            <>
              <Strong>Keeping everything in hot storage.</Strong> Paying
              hot-tier rates for data no rule ever queries is the most common
              SIEM waste we see.
            </>,
            <>
              <Strong>Building a platform too early.</Strong> An owned platform
              pays off only when your data volume and engineering team can
              justify it.
            </>,
          ]}
        />

        <H2 id="licensed-siem-or-own-platform">
          Should You Keep a Licensed SIEM or Build Your Own Platform?
        </H2>
        <P>
          Keep a licensed SIEM until per-GB fees become one of your biggest
          costs. Build your own platform only when you also have the engineers
          to run it. A licensed SIEM is usually the better fit if you have few
          clients, modest log volume, or no platform team. Our comparison of{" "}
          <Ref to="siem-cost-licensing">
            SIEM licensing vs custom-built costs
          </Ref>{" "}
          sets out the full cost model.
        </P>

        <H2 id="nis2-and-dora">
          How Does Optimization Affect NIS2 and DORA Compliance?
        </H2>
        <P>
          Done right, optimization does not weaken NIS2 or DORA compliance.
          Compliance logs move to cheaper storage instead of being deleted.
          They stay searchable for audits and incident reports. Both laws
          require fast incident reporting and proof on request. So the logs
          behind that proof must be kept and easy to pull up.
        </P>
        <P>A tiered retention model meets both needs:</P>
        <TierCards
          tiers={[
            { label: "Hot", body: "Detection data used for real-time correlation." },
            {
              label: "Warm / cold",
              body: "Compliance and forensic logs kept in a data lake or object storage, searchable when needed.",
            },
            { label: "Discarded", body: "Data with no value for detection or audits." },
          ]}
        />
        <P>
          You should also be able to prove that each client&apos;s data is
          kept apart. Then you can show regulators exactly where each
          client&apos;s data lives. Our guide to{" "}
          <Ref to="nis2-dora-compliance-guide">
            SIEM for NIS2 and DORA compliance
          </Ref>{" "}
          covers the rules in detail.
        </P>

        {/* ---------------------------------------- inline CTA: NIS2 guide */}
        <aside className="mt-10 flex flex-col gap-6 rounded-lg border border-line/70 bg-surface/60 p-6 sm:flex-row sm:items-center sm:p-7">
          <div
            aria-hidden
            className="flex h-24 w-[4.5rem] shrink-0 flex-col justify-end rounded-md border border-line/70 bg-surface-2/60 p-2.5"
          >
            <span className="font-mono text-[8.5px] text-accent">PDF</span>
            <span className="text-[9.5px] font-semibold leading-tight text-bright">
              MSSP Guide to NIS2
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className={EYEBROW}>Free guide</p>
            <p className="mt-2 text-xl font-semibold leading-snug text-bright">
              The MSSP&apos;s Guide to NIS2
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">
              What NIS2 asks of managed security providers, and how to cut log
              costs without losing the evidence regulators expect.
            </p>
          </div>
          <div className="shrink-0">
            <Button href="/whycrew-mssp-guide-to-nis2.pdf" variant="ghost" download>
              Download the guide
            </Button>
          </div>
        </aside>

        <H2 id="results">What Results Have MSSPs Seen From Optimization?</H2>
        <P>
          MSSPs we have worked with cut log volume by 30 to 50% with filtering.
          They cut Tier 1 handling time by 70 to 80% with automation. And they
          lowered SIEM costs by 40 to 70% after moving to their own platforms.
          The table below shows the client results behind those numbers.
        </P>
        <P>
          Most clients asked to stay anonymous. Timelines depend on scope. A
          focused migration can go live in six to eight weeks. A full platform
          build usually takes about twelve.
        </P>
        <DataTable
          head={["Client", "Where they started", "What changed", "How long"]}
          rows={[
            [
              "NordSec GmbH, German MSSP, 40+ enterprise clients",
              "Licensed SIEM at €45,000 a month",
              "62% lower cost, €340K saved a year, no downtime",
              "6 weeks to production",
            ],
            [
              "UK fintech under DORA",
              "Cloud SIEM billed by volume",
              "63% lower SIEM spend, 63% less time on investigations",
              "8 weeks to handover",
            ],
            [
              "Dutch MSSP",
              "Triage done by hand",
              "78% less Tier 1 work, 12-minute response on triaged alerts",
              "7 weeks to full rollout",
            ],
            [
              "Growing MSSP",
              "SIEM fees over $180,000 a year",
              "$110K saved in year one, $270K over two years",
              "24-month view",
            ],
            [
              "Regional SOC",
              "Paid threat-intel feed",
              "$40K a year saved, 80% less hand triage, indicator enrichment in under 3 seconds",
              "Not stated",
            ],
            [
              "Growing MSSP with one security engineer",
              "One person handling detection, data, and onboarding",
              "About 8 times the output of a single new hire",
              "First release in 10 days",
            ],
          ]}
        />
        <P>
          The growing MSSP&apos;s full story is in{" "}
          <Ref to="siem-rent-to-owned-case-study">
            From SIEM rent to an owned platform
          </Ref>
          . If you are short on engineers, see how our{" "}
          <Ref to="mssp-engineering-pod-case-study">
            embedded engineering pods work
          </Ref>
          . You&apos;ll find more examples in our{" "}
          <Ref to="case-studies">case studies</Ref>.
        </P>

        {/* ---------------------------------------- closing CTA */}
        <aside className="mt-12 rounded-lg border border-accent/30 bg-gradient-to-br from-surface/85 via-surface/45 to-brand/10 p-8 text-center sm:p-10">
          <p className={EYEBROW}>Stop renting your SIEM</p>
          <p className="mx-auto mt-3 max-w-md text-2xl font-semibold leading-snug text-bright sm:text-[1.75rem]">
            Own a platform that gets cheaper per client as you grow
          </p>
          <p className="mx-auto mt-3 max-w-lg text-[14.5px] leading-relaxed text-body">
            We design and build your SIEM and SOAR platform, move your clients
            across with zero downtime, and hand you the code.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href={CTA_HREF}>Talk to an engineer</Button>
            <Button href="/case-studies" variant="ghost">
              See case studies
            </Button>
          </div>
        </aside>

        <H2 id="faq">Frequently Asked Questions</H2>
        <div className="mt-6">
          {/*
            One column: the two-column grid splits the questions into odd and
            even columns, which takes them out of the content doc's order.
          */}
          <FaqAccordion faqs={FAQS} columns={1} />
        </div>
      </ArticleShell>
    </>
  );
}
