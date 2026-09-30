import type { Metadata } from "next";
import { ArticleShell, type TocEntry } from "@/components/blog/article-shell";
import {
  Bullets,
  DataTable,
  Figure,
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
import { breadcrumbLabel, postBySlug, postPath } from "@/lib/blog";
import { CTA_HREF, OG_IMAGE, SITE } from "@/lib/site";

const post = postBySlug("what-is-ai-soc")!;
const PATH = postPath(post);
const IMG = "/blog/what-is-ai-soc";

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
  { id: "what-is-an-ai-soc", label: "What Is an AI SOC?" },
  {
    id: "tool-vs-platform",
    label: "AI SOC Tool vs. Platform vs. \"AI in the SOC\"",
  },
  { id: "ai-soc-agents", label: "How AI SOC Agents Handle an Alert" },
  {
    id: "key-capabilities",
    label: "Key Capabilities of an AI SOC Platform",
  },
  {
    id: "types-of-ai",
    label: "Types of AI in an AI SOC and What Each Term Actually Means",
  },
  { id: "ai-soc-vs-traditional-soc", label: "AI SOC vs. Traditional SOC" },
  {
    id: "autonomy-levels",
    label: "Autonomy Levels: How Much Control You Hand Over to the AI",
  },
  {
    id: "will-ai-replace-analysts",
    label: "Will AI Replace Human Analysts in the SOC?",
  },
  {
    id: "architecture",
    label: "AI SOC Architecture: The Five Layers That Make It Work",
  },
  {
    id: "soar-vs-ai-soc",
    label:
      "SOAR vs. AI SOC: What Separates Playbook Automation from AI Reasoning",
  },
  { id: "benefits", label: "Benefits of an AI SOC" },
  { id: "limitations-and-risks", label: "Limitations and Risks of an AI SOC" },
  {
    id: "compliance-and-audit-trails",
    label: "Compliance and Audit Trails: What Regulators Need to See",
  },
  {
    id: "evaluate-a-vendor",
    label: "How to Evaluate an AI SOC Vendor Before You Sign",
  },
  {
    id: "maturity-model",
    label: "The AI SOC Maturity Model: Four Stages of Adoption",
  },
  { id: "use-cases", label: "Common Use Cases for an AI SOC" },
  {
    id: "how-whycrew-builds",
    label: "How WhyCrew Builds an AI SOC You Own and Control",
  },
  {
    id: "is-your-soc-ready",
    label: "Is Your SOC Ready for AI Automation?",
  },
  { id: "faq", label: "Frequently Asked Questions" },
];

const TOOL_VS_PLATFORM_TABLE = {
  head: ["Term", "AI in the SOC", "AI SOC Tool", "AI SOC Platform"],
  rows: [
    [
      "What it is",
      "A single AI feature added to an existing product",
      "A purpose-built AI capability for one task",
      "Multiple capabilities connected in one workflow",
    ],
    [
      "Who initiates the work?",
      "A person, every time",
      "A person, for that specific task",
      "No one — it runs automatically on every alert",
    ],
    [
      "Scope",
      "One feature within a larger tool",
      "One task, executed well",
      "The full alert lifecycle",
    ],
    [
      "Typical example",
      "AI-assisted search or on-demand summarization",
      "Automatic alert enrichment with context",
      "End-to-end investigation, resolution, or escalation",
    ],
    [
      "When no one logs in",
      "The alert sits untouched.",
      "That one task runs; everything else waits",
      "The alert is already investigated, closed, or escalated",
    ],
  ],
};

const AI_TYPES_TABLE = {
  head: ["Term", "What it means", "Where it shows up in an AI SOC"],
  rows: [
    [
      "Supervised / unsupervised ML",
      "Identifies patterns from historical data",
      "Anomaly detection",
    ],
    [
      "UEBA",
      "Builds behavioral baselines; flags deviations",
      "Insider threat, compromised credentials",
    ],
    [
      "Natural language processing (NLP)",
      "Reads and interprets unstructured text",
      "Phishing email parsing, case notes",
    ],
    [
      "Generative AI (GenAI)",
      "Produces text, summaries, or code from a prompt",
      "Case summaries, incident write-ups",
    ],
    [
      "AI agent",
      "Independently executes one specialized task",
      "Alert enrichment, endpoint isolation, account lockout",
    ],
    [
      "Agentic AI",
      "Plans and adapts a multi-step action sequence as evidence evolves",
      "Investigation, triage, remediation",
    ],
    [
      "Multi-agent system (MAS)",
      "Multiple specialized agents coordinating on a single case",
      "Incidents spanning triage, investigation, and containment",
    ],
    [
      "Orchestrator agent",
      "Directs which agent acts next and in what order",
      "Sequencing multi-agent responses on complex cases",
    ],
  ],
};

const TRADITIONAL_TABLE = {
  head: ["Term", "Traditional SOC", "AI SOC"],
  rows: [
    [
      "Alert handling",
      "An analyst opens each alert and checks several tools by hand.",
      "The alert is scored, enriched, and correlated before anyone opens it",
    ],
    [
      "Context gathering",
      "Pulled manually, console by console",
      "Already attached: asset owner, history, threat intel",
    ],
    [
      "Where analyst time goes",
      "Mostly collecting information",
      "Mostly making the judgment call on flagged cases",
    ],
    [
      "Escalation path",
      "Tier 1 to Tier 2 to Tier 3, each re-checking some of the same ground",
      "Tier-1 work is largely pre-resolved; escalations arrive with a case file, not a raw alert",
    ],
    [
      "MTTD / MTTR",
      "Typically hours",
      "Typically minutes, for common alert types",
    ],
  ],
};

const SOAR_TABLE = {
  head: ["Term", "SOAR", "AI SOC"],
  rows: [
    [
      "Core method",
      "Pre-built playbooks",
      "AI reasoning plus automation",
    ],
    [
      "New situations",
      "Needs a new script or a human",
      "Adapts and generates a next step",
    ],
    ["Setup effort", "Heavy upfront scripting", "Lower ongoing effort"],
    [
      "Triage",
      "Executes fixed actions",
      "Reads, investigates, recommends",
    ],
    ["Best fit", "Repeatable workflows", "Novel, evolving alerts"],
  ],
};

const FAQS: Faq[] = [
  {
    q: "What is an AI SOC?",
    a: "A security operations center where AI agents handle alert triage, investigation, and response automatically, so analysts spend their time deciding instead of digging.",
  },
  {
    q: "What is the difference between \"AI in the SOC\" and an actual AI SOC?",
    a: "\"AI in the SOC\" is one feature: a chatbot or search bar bolted onto a tool someone has to query. An AI SOC investigates every alert on its own.",
  },
  {
    q: "What is agentic AI, and how is it different from generative AI?",
    a: "Generative AI produces content in response to a prompt. Agentic AI plans a sequence of actions, executes them, checks the outcome, and adjusts.",
  },
  {
    q: "Does an AI SOC replace human analysts?",
    a: "No. It removes repetitive busywork while keeping a person accountable for anything that carries real risk.",
  },
  {
    q: "What is the difference between SOAR and an AI SOC?",
    a: "SOAR runs playbooks scripted ahead of time. An AI SOC reasons through unfamiliar cases and adapts. Many teams run both together.",
  },
  {
    q: "How does an AI SOC handle compliance and audit requirements?",
    a: "A well-built one logs the evidence and reasoning behind every action, producing an audit trail regulators can review, which matters most under frameworks like NIS2, DORA, or HIPAA.",
  },
  {
    q: "What autonomy level should we start with?",
    a: "Most organizations start on human-in-the-loop, then raise autonomy gradually on specific alert categories as trust builds.",
  },
  {
    q: "How do I know if a vendor is doing real agentic AI or just marketing?",
    a: "Ask for a walkthrough of an actual investigation and specific autonomy limits per action type.",
  },
  {
    q: "Is an AI SOC only for large enterprises?",
    a: "No. MSSPs and mid-sized teams often benefit the most, given their high alert-to-analyst ratio.",
  },
  {
    q: "Do I need to replace my SIEM or SOAR to adopt an AI SOC?",
    a: "Usually not. Most platforms integrate with what's already running rather than requiring a replacement.",
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
          heading: "Explore AI-powered SOC automation",
          body: "AI agents take triage, enrichment, and investigation, while your analysts keep the high-stakes calls and the accountability. It runs inside your own infrastructure, with no outside API calls.",
          label: "Book an Architecture Audit",
          href: CTA_HREF,
          secondary: {
            label: "AI-powered SOC automation",
            href: "/services/ai-powered-soc-automation",
          },
        }}
      >
        <QuickAnswer>
          An AI SOC, sometimes called an agentic SOC, is a security operations
          center where AI agents handle the alert lifecycle end to end. They
          read each alert, gather context, investigate, score risk, and either
          resolve the case or hand it off with the legwork done. It sits on top
          of the tools already in place, the SIEM and the EDR, rather than
          replacing them. One thing doesn&apos;t change: a person still owns
          the decisions that carry real consequences.
        </QuickAnswer>

        <div className="mt-10">
          <KeyTakeaways
            label="Key Takeaways"
            items={[
              "An AI SOC automates triage, investigation, and response to the repetitive work behind most Tier-1 burnout.",
              "AI in the SOC (a chatbot bolted onto a tool) is not the same thing as an AI SOC. One waits to be asked. The other investigates on its own.",
              "Agentic AI is what separates this from SOAR. It plans its own investigation and adapts mid-case, instead of running a fixed script.",
              "Autonomy is set per action type, not for the SOC as a whole. Most teams start an action on a short leash and loosen it only after the AI proves itself on that specific category.",
              "An AI SOC that can't explain a verdict is a liability in a regulated environment, not a convenience feature.",
            ]}
          />
        </div>

        <H2 id="what-is-an-ai-soc">What Is an AI SOC?</H2>
        <P>
          A SOC watches an environment, catches threats, and responds before
          they cause damage. An AI SOC does the same job with AI agents; the
          &quot;agentic AI&quot; vendors talk about handling the repetitive
          front half of it instead of a human working a queue ticket by ticket.
          What that term actually means, and how it differs from generative AI,
          gets its own breakdown further down.
        </P>
        <P>Most SOCs share the same three problems:</P>
        <Bullets
          items={[
            <>
              <Strong>Too many alerts.</Strong> The overwhelming majority are
              noise.
            </>,
            <>
              <Strong>Too much manual work.</Strong> A large share of any shift
              goes to gathering context, not deciding what to do with it.
            </>,
            <>
              <Strong>Not enough time.</Strong> Attackers don&apos;t wait for a
              person to finish that digging.
            </>,
          ]}
        />
        <P>
          An AI SOC is built to close all three gaps at once, not to add
          another layer of tooling that simply shifts the workload to a
          different queue.
        </P>

        <H2 id="tool-vs-platform">
          AI SOC Tool vs. Platform vs. &quot;AI in the SOC&quot;
        </H2>
        <Figure
          src={`${IMG}/ai-soc-tool-vs-platform-diagram.png`}
          alt="AI SOC tool vs. platform vs. 'AI in the SOC,' shown as nested boxes by how much of the alert lifecycle each one covers"
          width={1950}
          height={921}
        />
        <P>
          These three terms get used interchangeably in vendor marketing, which
          makes evaluating a purchase harder than it should be. The difference
          comes down to one question: does it wait to be asked, or does it act
          on its own?
        </P>
        {/*
          No captions on this article's tables: the sr-only caption would add
          words the content doc doesn't have.
        */}
        <DataTable
          head={TOOL_VS_PLATFORM_TABLE.head}
          rows={TOOL_VS_PLATFORM_TABLE.rows}
        />
        <P>
          AI in the SOC is the most common thing sold under this label and the
          most passive. It waits to be asked. Someone has to query it before
          anything happens.
        </P>
        <P>
          An AI SOC tool does one job without being asked, enriching an alert
          with context the moment it fires and nothing more.
        </P>
        <P>
          A platform changes how the team operates. Triage, investigation,
          correlation, case management, and response run as one connected
          workflow on every alert automatically, without prompting. That&apos;s
          the standard the{" "}
          <Ref to="ai-soc-automation-services">WhyCrew AI SOC Platform</Ref> is
          built to.
        </P>
        <P>
          <Strong>A useful evaluation check:</Strong> ask the vendor what
          happens to an alert when no one is actively monitoring the platform.
        </P>

        <H2 id="ai-soc-agents">How AI SOC Agents Handle an Alert</H2>
        <Figure
          src={`${IMG}/ai-soc-agent-workflow-diagram.png`}
          alt="How an AI SOC agent handles an alert, from the alert firing through context gathering, risk scoring, and either auto-resolution or handoff to a human"
          width={1950}
          height={861}
        />
        <P>
          An AI SOC agent handles one security task on its own, using AI
          reasoning instead of a fixed script.
        </P>
        <P>
          When an alert fires, the agent reads it, identifies what it&apos;s
          actually flagging, and pulls related context on its own asset
          ownership, identity signals, prior cases, and threat intel hits. It
          then reaches a verdict and shows the reasoning behind it, so someone
          can check its work later.
        </P>
        <P>
          Some setups allow the agent to act directly: closing a duplicate,
          isolating a device, or revoking access. How far it can go without
          human approval is a configurable setting, covered in the autonomy
          levels section below.
        </P>
        <P>
          When multiple agents operate across detection, investigation, and
          response in sequence, the result is a coordinated, automated workflow
          rather than a collection of isolated tools.
        </P>

        <H2 id="key-capabilities">Key Capabilities of an AI SOC Platform</H2>
        <P>Most AI SOCs are built from the same six moving parts:</P>
        <Bullets
          items={[
            <>
              <Strong>Autonomous triage.</Strong> Reviews and ranks a large
              volume of alerts in seconds, filtering out known-benign patterns
              and duplicates. This is what actually kills alert fatigue.
            </>,
            <>
              <Strong>Autonomous investigation.</Strong> Gathers evidence and
              pulls data across tools that don&apos;t normally talk to each
              other. Reaches a defensible verdict on Tier-1 and Tier-2 alerts
              without a handoff.
            </>,
            <>
              <Strong>Agentic reasoning.</Strong> The part that distinguishes
              this from older automation. Plans its own path and adapts as new
              evidence shows up mid-investigation.
            </>,
            <>
              <Strong>Rapid remediation.</Strong> For clear-cut, low-risk cases:
              blocks traffic, isolates a device, and revokes access to all
              inside guardrails a person defined. Minutes, not hours.
            </>,
            <>
              <Strong>Ecosystem integration.</Strong> Connects to SIEM, EDR,
              identity, and ticketing through existing integrations with no
              rebuild required.
            </>,
            <>
              <Strong>Escalation and human oversight.</Strong> Anything
              ambiguous or high-stakes routes to a person for the final call,
              with the exact threshold set by whichever autonomy level is
              configured for that action type.
            </>,
          ]}
        />

        <H2 id="types-of-ai">
          Types of AI in an AI SOC and What Each Term Actually Means
        </H2>
        <P>
          AI is a catch-all word in security marketing. Vendors stack
          similar-sounding terms on top of it: GenAI, AI agent, agentic AI, and
          multi-agent system until it&apos;s hard to tell what&apos;s actually
          different.
        </P>
        <P>
          A real AI SOC is usually several distinct AI types layered together,
          not one model doing everything.
        </P>
        <DataTable head={AI_TYPES_TABLE.head} rows={AI_TYPES_TABLE.rows} />
        <P>
          These terms are easy to confuse, so here&apos;s a quick distinction
          between each.
        </P>
        <P>
          <Strong>Generative AI</Strong> produces content because you asked it
          to. It doesn&apos;t decide anything on its own.
        </P>
        <P>
          <Strong>An AI agent</Strong> is the smallest unit: one task, executed
          independently, without a person triggering it.
        </P>
        <P>
          <Strong>Agentic AI</Strong> is the reasoning layer on top. It lets an
          agent plan a sequence of steps and adjust mid-task instead of
          following a fixed script.
        </P>
        <P>
          <Strong>A multi-agent system</Strong> is what you get when several
          agents, each built for one job, work the same case together, with an
          orchestrator deciding who acts next.
        </P>
        <P>
          A well-built AI SOC layers all of them: ML and UEBA for detection, AI
          agents and agentic reasoning for investigation and response, an
          orchestrator to coordinate the team, and generative AI for the
          write-up at the end.
        </P>

        <H2 id="ai-soc-vs-traditional-soc">AI SOC vs. Traditional SOC</H2>
        <DataTable head={TRADITIONAL_TABLE.head} rows={TRADITIONAL_TABLE.rows} />
        <P>
          The scaling model is the real difference. A traditional SOC grows by
          hiring more people to do more manual digging. An AI SOC grows by
          automating the digging, so headcount tracks judgment calls instead of
          alert volume.
        </P>

        <H2 id="autonomy-levels">
          Autonomy Levels: How Much Control You Hand Over to the AI
        </H2>
        <P>
          Autonomy isn&apos;t on or off. It&apos;s a dial most organizations
          start low on and turn up as the system proves itself.
        </P>
        <Figure
          src={`${IMG}/autonomy-levels-diagram.png`}
          alt="The three autonomy levels in an AI SOC: human-in-the-loop, human-on-the-loop, and full autonomy, each with its level of AI control"
          width={1950}
          height={921}
        />
        <Bullets
          items={[
            <>
              <Strong>Human-in-the-loop.</Strong> The AI investigates and
              recommends, but a person approves every action first. The safest
              starting point.
            </>,
            <>
              <Strong>Human-on-the-loop.</Strong> The AI acts on its own for
              defined, low-risk categories, isolating a device with a confirmed
              malware signature, for example, while a person supervises and can
              step in at any time.
            </>,
            <>
              <Strong>Full autonomy.</Strong> Reserved for the most confidently
              classified, lowest-stakes actions, with a human reviewing outcomes
              after the fact.
            </>,
          ]}
        />
        <P>
          The right setting depends on the specific action, not the
          organization as a whole. A team might run full autonomy on
          known-benign phishing reports while keeping every account lockout on
          human-in-the-loop. A vendor offering only one autonomy setting for
          everything is worth questioning.
        </P>

        <H2 id="will-ai-replace-analysts">
          Will AI Replace Human Analysts in the SOC?
        </H2>
        <P>
          No, and framing it as a replacement question misses the actual
          problem. Adopting AI in the SOC is about augmenting analysts, not
          eliminating them.
        </P>
        <Bullets
          items={[
            <>
              <Strong>The math doesn&apos;t support replacement.</Strong> The
              industry is still short close to 4 million cybersecurity
              professionals worldwide, according to ISC2&apos;s workforce study.
              That gap is the reason to automate, not a headcount target to
              cut.
            </>,
            <>
              <Strong>AI reduces burnout.</Strong> Offloading{" "}
              <Ref to="soc-analyst-burnout">Tier-1 busywork</Ref> and
              auto-resolving routine cases frees senior analysts for the threats
              and projects that actually need judgment.
            </>,
            <>
              <Strong>Humans stay the final decision-maker.</Strong> A properly
              built AI SOC keeps a person in the loop for high-stakes calls. The
              AI does the evaluation and enrichment; the person still decides.
            </>,
          ]}
        />
        <P>
          Adoption is still early. Gartner&apos;s 2025 Hype Cycle for Security
          Operations places AI SOC agents at the Innovation Trigger stage, with
          roughly 1% to 5% market adoption today exactly the profile of a
          category built to augment a stretched workforce, not one built to
          replace it.
        </P>

        <H2 id="architecture">
          AI SOC Architecture: The Five Layers That Make It Work
        </H2>
        <P>A well-built AI SOC comes down to five layers:</P>
        <Figure
          src={`${IMG}/ai-soc-architecture-diagram.png`}
          alt="The 5-layer AI SOC architecture, from data ingestion through detection, enrichment, decision-making, to response and human oversight"
          width={1800}
          height={1401}
        />
        <Numbered
          items={[
            <>
              <Strong>Data and ingestion.</Strong> Logs, alerts, identity
              signals, and threat intel flow in and get normalized so
              they&apos;re usable.
            </>,
            <>
              <Strong>Detection and correlation.</Strong> AI groups scattered
              alerts into one case instead of dozens of tickets.
            </>,
            <>
              <Strong>Enrichment and context.</Strong> Asset ownership, prior
              history, and risk level attach automatically.
            </>,
            <>
              <Strong>Decision and orchestration.</Strong> Cases get routed and
              scored, and agents coordinate a response.
            </>,
            <>
              <Strong>Response and human oversight.</Strong> Low-risk actions
              run on their own. Anything sensitive reaches a person.
            </>,
          ]}
        />

        <H2 id="soar-vs-ai-soc">
          SOAR vs. AI SOC: What Separates Playbook Automation from AI Reasoning
        </H2>
        <P>
          <Ref to="soar-playbooks-guide">SOAR runs on playbook</Ref> scripts
          written for situations someone already thought through. The moment
          something doesn&apos;t match, SOAR needs a human or a new script.
        </P>
        <P>
          An AI SOC sits above that. It reads an alert nobody scripted for and
          works out a next step in real time, instead of stalling the moment
          reality doesn&apos;t match a pre-built playbook.
        </P>
        <DataTable head={SOAR_TABLE.head} rows={SOAR_TABLE.rows} />
        <P>
          These aren&apos;t rivals. Most mature setups use SOAR for predictable
          actions and an AI SOC for everything else.
        </P>

        <H2 id="benefits">Benefits of an AI SOC</H2>
        <Bullets
          items={[
            <>
              <Strong>Faster detection and response.</Strong> MTTD and MTTR
              commonly drop from hours to minutes, depending on alert type and
              autonomy level.
            </>,
            <>
              <Strong>Less burnout.</Strong> Removing repetitive work is a
              consistently cited reason Tier-1 analysts and Tier-2 staff stick
              around longer.
            </>,
            <>
              <Strong>Better accuracy.</Strong> Consistent enrichment means
              fewer real threats get buried under noise.
            </>,
            <>
              <Strong>Scalability.</Strong> Alert volume can double or triple
              without a matching hiring spree.
            </>,
            <>
              <Strong>Fewer tools open at once.</Strong> One enriched case
              replaces five dashboards.
            </>,
          ]}
        />

        <H2 id="limitations-and-risks">Limitations and Risks of an AI SOC</H2>
        <Bullets
          items={[
            <>
              <Strong>Hallucinations and prompt injection.</Strong> LLMs can be
              manipulated through the data they&apos;re analyzing, like a
              phishing email&apos;s contents, so safeguards matter.
            </>,
            <>
              <Strong>Stale context.</Strong> An agent working off outdated
              asset or identity records reaches confident, wrong conclusions.
            </>,
            <>
              <Strong>Trust and explainability.</Strong> Analysts won&apos;t
              trust a verdict they can&apos;t see the reasoning behind.
            </>,
            <>
              <Strong>Compliance exposure.</Strong> Feeding sensitive data
              through a model raises real questions in regulated industries.
            </>,
            <>
              <Strong>Accountability.</Strong> Decisions with real legal or
              business weight still need someone accountable.
            </>,
          ]}
        />
        <P>
          An AI SOC earns its keep when it&apos;s built around the
          environment&apos;s actual constraints, with someone watching model
          behavior over time.
        </P>

        <H2 id="compliance-and-audit-trails">
          Compliance and Audit Trails: What Regulators Need to See
        </H2>
        <P>
          Most vendor content skips this, and it&apos;s often the deciding
          factor for regulated organizations. An AI SOC needs a defensible
          audit trail: not just what action it took, but why. For organizations
          under NIS2, DORA, HIPAA, NCA ECC, SAMA CSF, or similar frameworks,
          that trail is often what a regulator asks to see. WhyCrew builds this
          into the platform for regulated organizations worldwide, from{" "}
          <Ref to="nis2-dora-compliance-automation">
            NIS2 and DORA compliance automation
          </Ref>{" "}
          in the EU to{" "}
          <Ref to="nca-ecc-sama-csf-compliance">
            NCA ECC and SAMA CSF compliance
          </Ref>{" "}
          in Saudi Arabia.
        </P>
        <P>Questions worth asking a vendor before signing:</P>
        <Bullets
          items={[
            "Can the system explain a verdict in terms a non-technical auditor could follow?",
            "Is there a clean record of every autonomous action, tied to the guardrail that permitted it?",
            "Does behavior on past case types stay consistent when the model updates?",
          ]}
        />

        <H2 id="evaluate-a-vendor">
          How to Evaluate an AI SOC Vendor Before You Sign
        </H2>
        <Bullets
          items={[
            <>
              <Strong>How does it reason?</Strong> Get a walkthrough of a real
              investigation, not a slide. A relabeled rules engine usually
              can&apos;t show its evidence on demand.
            </>,
            <>
              <Strong>Who can take action, under what limits?</Strong> Get
              specific about autonomy levels per action type, not a vague
              &quot;human in the loop&quot; claim.
            </>,
            <>
              <Strong>What&apos;s the integration story?</Strong> A platform
              requiring a full SIEM or EDR rip-out is a bigger commitment than
              one that layers on through APIs.
            </>,
            <>
              <Strong>What&apos;s the pricing model on a bad day?</Strong>{" "}
              Per-alert or per-endpoint pricing can produce a very different
              bill during an incident spike.
            </>,
            <>
              <Strong>What does the audit trail actually contain?</Strong> Ask
              to see a real example.
            </>,
          ]}
        />
        <P>
          If a product can&apos;t show its reasoning on a real case, or
          &quot;autonomous&quot; quietly means &quot;pings a human who does
          everything manually, treat the AI SOC label with skepticism.
        </P>

        <H2 id="maturity-model">
          The AI SOC Maturity Model: Four Stages of Adoption
        </H2>
        <Bullets
          items={[
            <>
              <Strong>Manual.</Strong> Alerts triaged and investigated by hand,
              with SIEM and SOAR providing visibility, but no independent
              reasoning.
            </>,
            <>
              <Strong>Assisted.</Strong> AI features exist inside individual
              tools, but a person initiates every investigation.
            </>,
            <>
              <Strong>Supervised autonomy.</Strong> Agents investigate and act
              independently on defined, lower-risk categories.
            </>,
            <>
              <Strong>Fully agentic.</Strong> Agents handle most of the alert
              lifecycle, and humans focus on strategy and the smaller set of
              high-stakes decisions.
            </>,
          ]}
        />
        <Figure
          src={`${IMG}/ai-soc-maturity-model-diagram.png`}
          alt="The four stages of the AI SOC maturity model, from manual to assisted to supervised autonomy to fully agentic"
          width={1950}
          height={981}
        />
        <P>
          Most organizations today sit around stage two or the early part of
          stage three. This maturity model tracks how far the whole SOC has
          come; the autonomy levels covered earlier are the per-action dial you
          turn as you move through stages three and four.
        </P>

        <H2 id="use-cases">Common Use Cases for an AI SOC</H2>
        <Bullets
          items={[
            <>
              <Strong>Alert storms.</Strong> When a scan, a misconfigured tool,
              or a false-positive rule floods the queue with thousands of
              near-identical alerts, the AI SOC groups and resolves the
              duplicates in minutes instead of a shift.
            </>,
            <>
              <Strong>Phishing investigation.</Strong> The agent checks sender,
              links, and attachments against threat intelligence and reaches a
              verdict in seconds, instead of the ten or fifteen minutes a person
              would spend.
            </>,
            <>
              <Strong>Malware on an endpoint.</Strong> The agent pulls the
              process tree, checks the file hash, and, depending on autonomy,
              isolates the device while packaging the investigation for later
              review.
            </>,
            <>
              <Strong>Threat hunting support.</Strong> Surfaces slow-moving
              threats and lateral movement, spotted through behavioral and
              authentication anomalies, that a busy analyst would otherwise
              miss.
            </>,
            <>
              <Strong>MSSP operations</Strong>, where one team covers dozens of
              client environments at once.
            </>,
          ]}
        />

        <H2 id="how-whycrew-builds">
          How WhyCrew Builds an AI SOC You Own and Control
        </H2>
        <P>
          WhyCrew builds the same core capabilities covered earlier triage,
          investigation, adaptive response, remediation, integration,
          escalation but changes where it runs and who owns it when the build
          is done.
        </P>
        <Bullets
          items={[
            <>
              <Strong>Zero external API calls.</Strong> The models Llama 3,
              Mistral, or another open-weight model of your choice run entirely
              inside your own environment. This is the direct answer to the
              compliance-exposure risk raised earlier: sensitive data never
              reaches a third-party cloud in the first place, which is the
              deciding factor for MSSPs and regulated firms.
            </>,
            <>
              <Strong>You own the platform, not a subscription to it.</Strong>{" "}
              No recurring AI licensing fees. Full source code, documentation,
              and training are handed over at the end of the build.
            </>,
            <>
              <Strong>
                Audit trails built for regulators worldwide, from day one.
              </Strong>{" "}
              Every action is logged automatically in a format built for NIS2,
              DORA, and GDPR in the EU, and frameworks like NCA ECC and SAMA CSF
              elsewhere not retrofitted after a regulator asks a question.
            </>,
            <>
              <Strong>
                Results measured in production, not promised in a demo.
              </Strong>{" "}
              A Netherlands-based MSSP that deployed the platform cut Tier-1
              workload by 78%, hit a 12-minute average MTTR, and went live in
              seven weeks. A UK fintech client cut investigation time by 63% and
              now produces fully DORA-compliant reports automatically. Both case
              studies are covered in full on the{" "}
              <Ref to="ai-soc-automation-services">
                AI-Powered SOC Automation page
              </Ref>
              .
            </>,
          ]}
        />

        <H2 id="is-your-soc-ready">Is Your SOC Ready for AI Automation?</H2>
        <P>
          Wherever your SOC sits on the maturity model above, the rollout
          itself works the same way: start with whichever alert category costs
          the least to get wrong, and expand once it&apos;s proven out.
          WhyCrew&apos;s{" "}
          <Ref to="ai-soc-automation-guide">
            AI SOC automation readiness framework
          </Ref>{" "}
          breaks that same climb into five practical, hands-on steps plus a
          reversibility test for deciding what to automate first. The right
          measure of success is movement in your operational metrics, not
          performance in a controlled demonstration.
        </P>

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
