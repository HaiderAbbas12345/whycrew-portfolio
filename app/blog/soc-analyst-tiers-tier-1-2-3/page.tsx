import type { Metadata } from "next";
import { ArticleShell, type TocEntry } from "@/components/blog/article-shell";
import {
  Bullets,
  DataTable,
  Figure,
  H2,
  H3,
  P,
  QuickAnswer,
  Ref,
  Strong,
} from "@/components/blog/prose";
import { FaqAccordion } from "@/components/ui/faq";
import { breadcrumbLd, faqLd, type Faq } from "@/lib/jsonld";
import { breadcrumbLabel, postBySlug } from "@/lib/blog";
import { CTA_HREF, OG_IMAGE, SITE } from "@/lib/site";

const post = postBySlug("soc-analyst-tiers-tier-1-2-3")!;
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
  { id: "soc-meaning", label: "What Does SOC Stand for in Cyber Security?" },
  { id: "tier-structure", label: "What Is the SOC Tier Structure?" },
  { id: "tier-1", label: "What Does a Tier 1 SOC Analyst Do?" },
  { id: "tier-2", label: "What Does a Tier 2 SOC Analyst Do?" },
  { id: "tier-3", label: "What Does a Tier 3 SOC Analyst Do?" },
  { id: "compare", label: "How Do Tier 1, Tier 2, and Tier 3 Compare?" },
  { id: "where-ai-fits", label: "Where Does AI Actually Fit in the SOC Tiers?" },
  { id: "faq", label: "Frequently Asked Questions" },
];

const SUMMARY_TABLE = {
  head: ["Tier", "Role", "Experience"],
  rows: [
    ["Tier 1", "Alert triage", "0-2 years"],
    ["Tier 2", "Incident response", "1-4 years"],
    ["Tier 3", "Threat hunting & forensics", "4+ years"],
  ],
};

const STRUCTURE_TABLE = {
  head: ["Tier", "Nickname", "Main job", "Skill level"],
  rows: [
    [
      "Tier 1",
      "Alert Triage",
      "Watch alerts, sort real threats from noise, send on what matters",
      "Entry level",
    ],
    [
      "Tier 2",
      "Incident Responder",
      "Look into alerts sent up, prove the threat, stop it",
      "Mid-level",
    ],
    [
      "Tier 3",
      "Threat Hunter",
      "Hunt hidden threats, run big incidents, fix defenses",
      "Senior/expert",
    ],
  ],
};

/**
 * The comparison table is transposed relative to the others — the tiers are
 * the columns and the attributes are the rows — so its first header cell is
 * deliberately blank, exactly as in the content doc.
 */
const COMPARISON_TABLE = {
  head: ["", "Tier 1", "Tier 2", "Tier 3"],
  rows: [
    ["Role", "Alert triage", "Incident response", "Threat hunting & forensics"],
    [
      "Handoff",
      "Sends real threats to Tier 2",
      "Sends unsolved attacks to Tier 3",
      "Leads the fix; no tier above",
    ],
    [
      "Main question",
      "Is this alert real?",
      "How bad is it, and how do we stop it?",
      "What did we miss?",
    ],
    ["Typical experience", "0-2 years", "1-4 years", "4+ years"],
    ["Typical pay (US)", "~$55K-$85K", "~$85K-$130K", "~$130K-$180K+"],
    [
      "Works from",
      "A fixed playbook",
      "Playbook plus judgment",
      "Deep digging, few fixed rules",
    ],
    [
      "Volume of work",
      "Very high (hundreds a day)",
      "Medium (proven cases only)",
      "Low volume, high depth",
    ],
    [
      "Best fit for AI today",
      "High, most repeat work",
      "Medium, some steps work well",
      "Low, needs human judgment",
    ],
  ],
};

const FAQS: Faq[] = [
  {
    q: "What is a SOC analyst?",
    a: "A SOC analyst watches a company's systems and alerts. They catch and stop threats. The job splits into three tiers, based on skill and depth of work.",
  },
  {
    q: "What's the difference between Tier 1, Tier 2, and Tier 3 SOC analysts?",
    a: "Tier 1 sorts alerts and clears false alarms. Tier 2 checks proven threats and stops them. Tier 3 hunts hidden threats and leads the response to big incidents.",
  },
  {
    q: "Why are multiple tiers needed in a SOC instead of one team?",
    a: "Alert volume and alert difficulty are two different problems. Splitting the work lets each tier focus. Tier 1 handles volume. Tier 2 handles proven cases. Tier 3 handles depth.",
  },
  {
    q: "How long does it take to move from Tier 1 to Tier 3?",
    a: "About one to two years in Tier 1. Then two to three more years of hands-on response work before Tier 3. The exact time depends on team size and how much real incident work an analyst gets.",
  },
  {
    q: "Is Tier 1 or Tier 3 better?",
    a: "Neither. They are different jobs at different skill levels. Tier 1 is where SOC work begins. Tier 3 is where analysts land after years of hands-on response and hunting.",
  },
  {
    q: "Does AI replace Tier 1 SOC analysts?",
    a: "Not fully. AI takes over most of the repeat alert work. It scores alerts and clears noise. But a person still checks anything odd or high-risk before it closes.",
  },
  {
    q: "What is SOC threat intelligence, and which tier uses it most?",
    a: "SOC threat intelligence is data on known attackers and their tricks. It helps spot threats faster. Tier 2 and Tier 3 use it most. Tier 2 uses it to prove and stop threats. Tier 3 uses it to hunt for ones no one has caught yet.",
  },
  {
    q: "What certifications are common at each SOC tier?",
    a: "Tier 1 analysts often hold CompTIA Security+ or CySA+. Tier 2 analysts often hold GCIH or CEH. Tier 3 analysts often hold GCFA, GCIA, or OSCP.",
  },
  {
    q: "What is the typical pay for each SOC tier in the US?",
    a: "Pay varies by city, certifications, and employer, but typical US ranges are about $55K-$85K for Tier 1, $85K-$130K for Tier 2, and $130K-$180K or more for Tier 3, with senior and principal roles going higher still.",
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
          body: "AI takes the repeat Tier-1 work — sorting and scoring alerts — while your analysts keep the judgment calls at Tier 2 and Tier 3. It runs inside your own infrastructure, with no outside API calls.",
          label: "Book a Compliance Architecture Audit",
          href: CTA_HREF,
        }}
      >
        <QuickAnswer>
          A Security Operations Center (SOC) splits its workers into three
          tiers. Tier 1 checks alerts and clears false alarms. Tier 2 digs into
          real threats and stops them. Tier 3 hunts hidden threats and leads the
          response to big attacks. Today, AI does most of Tier 1&apos;s
          repetitive work.
        </QuickAnswer>

        <DataTable
          caption="SOC analyst tiers by role and experience"
          head={SUMMARY_TABLE.head}
          rows={SUMMARY_TABLE.rows}
        />

        <H2 id="soc-meaning">What Does SOC Stand for in Cyber Security?</H2>
        <P>
          SOC stands for Security Operations Center. It&apos;s the team that
          watches your systems for threats all day and all night. Every alert
          goes through the SOC first. So does every login, and every odd file.
        </P>
        <P>
          Most SOC teams are not flat. They split into levels called tiers. Each
          tier deals with a different kind of problem. A simple phishing email
          might stop at Tier 1. A live ransomware attack goes straight to Tier
          3.
        </P>
        <P>
          This guide explains what a Tier 1, Tier 2, and Tier 3 SOC analyst
          does. It also shows how the tiers differ. And it shows where AI fits
          in today.
        </P>
        <P>
          If you want to compare tools instead of jobs, see{" "}
          <Ref to="what-is-soar">what SOAR actually does</Ref> inside a SOC.
        </P>

        <H2 id="tier-structure">What Is the SOC Tier Structure?</H2>
        <P>
          Picture a hospital emergency room. A triage nurse sees you first. A
          doctor sees you next. A surgeon steps in only if things get serious. A
          SOC works the same way. Each tier is one clear step in the path.
        </P>

        <Figure
          src="/blog/soc-analyst-tiers-tier-1-2-3/soc-analyst-tier-pyramid.png"
          alt="SOC analyst tier pyramid showing Tier 1 alert triage, Tier 2 incident response, and Tier 3 threat hunting and forensics"
          width={2048}
          height={1154}
        />

        <DataTable
          caption="SOC tier structure by nickname, main job and skill level"
          head={STRUCTURE_TABLE.head}
          rows={STRUCTURE_TABLE.rows}
        />
        <P>
          <Strong>Takeaway:</Strong> almost every SOC uses this same three-step
          path. It works for a five-person team. It works for a 200-person MSSP
          floor too.
        </P>

        <H2 id="tier-1">What Does a Tier 1 SOC Analyst Do?</H2>
        <P>
          A Tier 1 SOC analyst is the first person to see an alert. This is the
          entry-level job. It&apos;s where most people start in cybersecurity.
        </P>
        <Bullets
          items={[
            <>
              <Strong>Core task:</Strong> Watch for alerts and sort them
            </>,
            <>
              <Strong>Handoff:</Strong> Sends real threats up to Tier 2, with
              notes on what they found
            </>,
            <>
              <Strong>Common certifications:</Strong> CompTIA Security+, CySA+
            </>,
            <>
              <Strong>Typical pay (US):</Strong> about $55K-$85K a year
            </>,
          ]}
        />
        <P>A Tier 1 shift is built around:</P>
        <Bullets
          items={[
            "Watching the alert queue as new alerts come in from the SIEM",
            "Checking each alert: is this normal, or worth a second look?",
            "Closing out false alarms most alerts turn out to be nothing",
            "Writing up real threats and sending them to Tier 2",
            "Following a fixed set of steps, called a playbook, for common alerts",
          ]}
        />
        <P>
          The hard part of this job is not the threats. It&apos;s the sheer
          number of alerts. A mid-size company can get thousands of alerts a
          day. Almost all of them are noise. A Tier 1 analyst must move fast.
          They can&apos;t miss the one alert that matters.
        </P>
        <P>
          This is also the tier with the most burnout. Staring at the same
          alerts for eight hours a day wears people down fast. This &ldquo;alert
          fatigue&rdquo; is a big reason SOC teams turn to automation here
          first.
        </P>
        <P>
          <Strong>Takeaway:</Strong> Tier 1 is high-volume, rule-based work.
          That&apos;s why it&apos;s the easiest tier to help with better tools.
        </P>

        <H2 id="tier-2">What Does a Tier 2 SOC Analyst Do?</H2>
        <P>
          So what&apos;s the difference between Tier 1 and Tier 2? Tier 1 sorts.
          Tier 2 digs in.
        </P>
        <Bullets
          items={[
            <>
              <Strong>Core task:</Strong> Deep digging and stopping the threat
            </>,
            <>
              <Strong>Handoff:</Strong> Sends hard or unsolved attacks up to
              Tier 3
            </>,
            <>
              <Strong>Common certifications:</Strong> GCIH (GIAC Certified
              Incident Handler), CEH (Certified Ethical Hacker)
            </>,
            <>
              <Strong>Typical pay (US):</Strong> about $85K-$130K a year
            </>,
          ]}
        />
        <P>Once an alert is proven real, a Tier 2 SOC analyst takes over:</P>
        <Bullets
          items={[
            "Checking logs to see where the threat came from",
            "Proving whether it's a real incident, and how bad it is",
            "Starting containment: cutting off an infected machine, or shutting a bad account",
            "Leading a full response across every system it touched",
            "Handling alerts that don't fit a known pattern, ones Tier 1's playbook can't solve",
          ]}
        />
        <P>
          In short, Tier 2 answers one question: &ldquo;How bad is this, and how
          do we stop it right now?&rdquo; This role needs more skill than Tier
          1. It usually takes a year or more of hands-on work. It also takes a
          real feel for how attacks unfold, step by step.
        </P>
        <P>
          <Strong>Takeaway:</Strong> Tier 2 turns a proven alert into a closed
          case. It&apos;s the step between &ldquo;this is real&rdquo; and
          &ldquo;this is handled.&rdquo;
        </P>

        <H2 id="tier-3">What Does a Tier 3 SOC Analyst Do?</H2>
        <P>
          A Tier 3 SOC analyst holds the top role in the SOC. They do not wait
          for alerts. They go looking for trouble before it shows up on a
          screen.
        </P>
        <Bullets
          items={[
            <>
              <Strong>Core task:</Strong> Hunt threats and run deep analysis
            </>,
            <>
              <Strong>Handoff:</Strong> Leads the fix-up and hardening work
              after a big incident
            </>,
            <>
              <Strong>Common certifications:</Strong> GCFA (GIAC Certified
              Forensic Analyst), GCIA (GIAC Certified Intrusion Analyst), OSCP
              (Offensive Security Certified Professional)
            </>,
            <>
              <Strong>Typical pay (US):</Strong> about $130K-$180K a year, more
              for senior or principal roles
            </>,
          ]}
        />
        <P>Core Tier 3 work includes:</P>
        <Bullets
          items={[
            <>
              <Strong>Threat hunting:</Strong> searching the network for
              attackers who slipped past every rule and filter
            </>,
            "Leading the response to big incidents: breaches, ransomware, targeted attacks",
            "Digital forensics: figuring out exactly what happened, when, and how",
            "Building the detection rules that Tier 1 and Tier 2 rely on each day",
            "Acting as the top point of contact when no one else can solve it",
          ]}
        />
        <P>
          Tier 3 analysts bring years of hands-on incident work. They also know
          how specific hacker groups and their tricks really work.
        </P>
        <P>
          <Strong>Takeaway:</Strong> Tier 3 is where defense stops reacting and
          starts hunting. It hunts for threats Tier 1 and Tier 2 have not seen
          yet.
        </P>

        <H2 id="compare">How Do Tier 1, Tier 2, and Tier 3 Compare?</H2>
        <P>Here is what Tier 1, Tier 2, and Tier 3 mean, side by side:</P>

        <Figure
          src="/blog/soc-analyst-tiers-tier-1-2-3/soc-alert-escalation-flow.png"
          alt="Diagram showing how a security alert escalates from Tier 1 triage to Tier 2 investigation to Tier 3 threat hunting and response"
          width={2048}
          height={941}
        />

        <DataTable
          caption="Tier 1, Tier 2 and Tier 3 SOC analysts compared"
          head={COMPARISON_TABLE.head}
          rows={COMPARISON_TABLE.rows}
        />

        <H3>Is Tier 1 or Tier 3 Better?</H3>
        <P>
          Neither is &ldquo;better.&rdquo; They are different jobs at different
          skill levels. This is not a ranking. Tier 1 is where most SOC careers
          start. Tier 3 is where that hands-on time leads, years later. If the
          real question is &ldquo;which tier should a growing SOC fund
          first,&rdquo; the answer is usually Tier 1. That&apos;s where alert
          volume piles up fastest. It&apos;s also where better tools pay off the
          most.
        </P>

        <H2 id="where-ai-fits">
          Where Does AI Actually Fit in the SOC Tiers?
        </H2>
        <P>
          AI is not replacing the tier setup. It&apos;s cutting down how much of
          Tier 1&apos;s work a human must do by hand.
        </P>
        <Bullets
          items={[
            <>
              <Strong>Tier 1:</Strong> This is where AI helps the most today.
              Sorting and scoring alerts is repetitive, rule-based work exactly
              what AI is good at. AI steps in first, ahead of any human review.
              Cutting the noise here also eases the alert fatigue behind Tier 1
              burnout.
            </>,
            <>
              <Strong>Tier 2:</Strong> AI helps here too. It pulls logs, links
              events, and drafts a report. But a person still decides on the fix
              and next steps.
            </>,
            <>
              <Strong>Tier 3:</Strong> Still almost fully human. Threat hunting
              and forensics need judgment and gut feel. AI can&apos;t fully
              match that yet.
            </>,
          ]}
        />
        <P>
          In real use, AI-powered SOC automation has cut Tier-1 alert work by
          about 70-80%. The exact number depends on your alert volume and your
          current tools. See how{" "}
          <Ref to="ai-soc-automation-services">AI SOC automation</Ref> works for
          the full picture, or read{" "}
          <Ref to="on-premise-ai-soc-automation">
            why on-premise beats a cloud security copilot
          </Ref>{" "}
          for how this runs fully inside your own infrastructure, with zero
          outside API calls.
        </P>
        <P>
          Should AI fully replace a Tier-1 analyst? That&apos;s a different
          question. We answer it with real numbers in{" "}
          {/*
            The colon closes up against </Ref> deliberately. On its own line
            JSX joins it to the link with a space, which renders "Analyst :
            What Actually Changes" — a space the content doc does not have.
          */}
          <Ref to="ai-soc-analyst-vs-tier-1-analyst">
            AI SOC Analyst vs. Traditional Tier-1 Analyst
          </Ref>: What Actually Changes.
        </P>
        <P>
          <Strong>Takeaway:</Strong> AI does the front-line work today (Tier 1).
          It helps in the middle (Tier 2). It stays hands-off at the back (Tier
          3).
        </P>

        <H2 id="faq">Frequently Asked Questions</H2>
        <div className="mt-6">
          <FaqAccordion faqs={FAQS} />
        </div>
      </ArticleShell>
    </>
  );
}
