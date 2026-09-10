import type { Metadata } from "next";
import { ArticleShell, type TocEntry } from "@/components/blog/article-shell";
import {
  Bullets,
  DataTable,
  H2,
  KeyTakeaways,
  P,
  Ref,
  Strong,
} from "@/components/blog/prose";
import { FaqAccordion } from "@/components/ui/faq";
import { breadcrumbLd, faqLd, type Faq } from "@/lib/jsonld";
import { breadcrumbLabel, postBySlug } from "@/lib/blog";
import { CTA_HREF, OG_IMAGE, SITE } from "@/lib/site";

const post = postBySlug("what-is-soar")!;
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
  { id: "what-soar-stands-for", label: "What SOAR stands for" },
  { id: "what-it-changes", label: "What it changes for a team" },
  { id: "practical-applications", label: "Where SOAR gets used" },
  { id: "soar-vs-siem", label: "SOAR vs. SIEM" },
  { id: "limitations", label: "What SOAR doesn't do" },
  { id: "faq", label: "Frequently asked questions" },
];

const USE_CASE_TABLE = {
  head: ["Use case", "Without SOAR", "With SOAR"],
  rows: [
    [
      "Phishing response",
      "Analyst manually pulls the email, checks the sender, and blocks it by hand",
      "A playbook extracts indicators, checks them against threat feeds, and blocks or quarantines automatically",
    ],
    [
      "Alert triage & enrichment",
      "Analyst opens five tools to gather context before deciding whether an alert matters",
      "Context is pulled and attached to the alert automatically, before an analyst ever opens it",
    ],
    [
      "Account compromise",
      "Analyst manually disables the account, resets credentials, and notifies the user",
      "A playbook isolates the account and starts the reset process the moment compromise is confirmed",
    ],
    [
      "Vulnerability management",
      "Findings sit in a spreadsheet until someone manually opens tickets and chases owners",
      "Findings are triaged, ticketed, and routed to the right owner automatically",
    ],
    [
      "Threat hunting support",
      "Analyst manually queries multiple tools to test a hypothesis across sources",
      "A playbook queries every connected tool at once and returns results in one place",
    ],
  ],
};

const FAQS: Faq[] = [
  {
    q: "Is SOAR the same as SIEM?",
    a: "No. SIEM finds and connects events across your systems. SOAR automates what happens after — running a playbook against what SIEM (or another detection source) has already flagged. They're built to work together, not to replace each other.",
  },
  {
    q: "Does SOAR replace analysts?",
    a: "No. SOAR removes repetitive, well-defined work so analysts spend their time on judgment calls a playbook can't make. It functions as a force multiplier, not a replacement for human expertise.",
  },
  {
    q: "What is a SOAR playbook?",
    a: "A predefined, step-by-step procedure that runs automatically once a condition is met — for example, isolating a laptop the moment malware is confirmed on it, instead of waiting for an analyst to do it manually.",
  },
  {
    q: "Is SOAR hard to set up?",
    a: "It takes real effort. SOAR is only as good as the playbooks behind it, and those need to be designed deliberately, tested, and maintained as the tools they connect to change. Most teams also build trust in a playbook gradually, running it in a supervised mode before letting it act on its own.",
  },
  {
    q: "Can a small security team use SOAR?",
    a: "Yes — that's often where it matters most. SOAR lets a small team hold its own against an alert volume that would otherwise require hiring several more analysts just to keep up.",
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
          heading: "See what SOAR would actually automate in your SOC",
          body: "We'll map your current alert volume against the manual steps your team repeats most often, and show you which of them a playbook could take over first.",
          label: "Book an Architecture Audit",
          href: CTA_HREF,
        }}
      >
        <P>
          SOAR is security software that connects your existing tools into
          one system and follows predetermined procedures to handle
          repetitive work automatically, so a threat gets acted on the moment
          it&apos;s confirmed instead of whenever an analyst gets to it.
        </P>
        <P>
          This guide covers what SOAR stands for, what it actually changes
          for a security team, where it delivers the most value, and where
          its limits are.
        </P>

        <div className="mt-10">
          <KeyTakeaways
            items={[
              "SOAR (Security Orchestration, Automation, and Response) connects your security tools and runs predefined playbooks against confirmed threats, cutting response time from minutes to seconds.",
              "It breaks down into three jobs: orchestration connects your tools, automation runs the playbook, and response takes the action — either on its own or by guiding an analyst.",
              "It's a force multiplier, not a replacement. SOAR still depends on well-designed playbooks, real setup effort, and a human who signs off before it runs unsupervised.",
              "Smaller teams get the most visible benefit: SOAR lets a lean SOC manage an alert volume that would otherwise require hiring several more analysts.",
            ]}
          />
        </div>

        <H2 id="what-soar-stands-for">What Does SOAR Stand For?</H2>
        <P>
          SOAR stands for Security Orchestration, Automation, and Response.
          Each word describes a distinct job the platform does:
        </P>
        <Bullets
          items={[
            <>
              <Strong>Orchestration:</Strong> connecting security tools —
              firewalls, SIEM, EDR, threat feeds — so they work together
              instead of sitting in isolation, each with its own console and
              its own login.
            </>,
            <>
              <Strong>Automation:</Strong> running playbooks, which are
              predefined, step-by-step procedures, to carry out routine work
              without a person clicking through it manually.
            </>,
            <>
              <Strong>Response:</Strong> taking action once a threat is
              confirmed — either autonomously, or by walking an analyst
              through the correct procedure instead of leaving them to
              improvise one.
            </>,
          ]}
        />
        <P>
          Put together, SOAR is what turns &ldquo;we detected something&rdquo;
          into &ldquo;we already acted on it, and here&apos;s the record.&rdquo;
          See{" "}
          <Ref to="what-is-siem">What Is SIEM?</Ref> for how detection works
          upstream of it, and{" "}
          <Ref to="soar-playbooks-guide">
            what a SOAR playbook actually looks like
          </Ref>{" "}
          for a closer look at automation in practice.
        </P>

        <H2 id="what-it-changes">
          What Does SOAR Actually Change for a Security Team?
        </H2>
        <P>
          Organizations running SOAR typically see the same handful of
          changes, regardless of which platform they use:
        </P>
        <Bullets
          items={[
            <>
              <Strong>Response times drop from minutes to seconds.</Strong> A
              playbook doesn&apos;t wait for someone to be available.
            </>,
            <>
              <Strong>The same procedure runs the same way every time.</Strong>{" "}
              A tired analyst at 3 a.m. and a sharp one at 10 a.m. produce
              identical results, because the playbook doesn&apos;t vary.
            </>,
            <>
              <Strong>Analysts stop burning out on repetition.</Strong>{" "}
              Removing the manual, repetitive share of the workload leaves
              analysts with the judgment calls that actually need a person.
            </>,
            <>
              <Strong>Smaller teams can carry a bigger alert volume.</Strong>{" "}
              A lean SOC can hold its own against a volume that would
              otherwise demand several more hires.
            </>,
            <>
              <Strong>Audit trails get better, not just faster.</Strong> Every
              automated action is logged the same way every time, which is
              exactly what an auditor or a regulator wants to see.
            </>,
          ]}
        />

        <H2 id="practical-applications">Where SOAR Gets Used</H2>
        <P>
          SOAR shows up most often in a handful of recurring use cases —
          phishing response, alert triage and enrichment, account compromise
          handling, vulnerability management, and threat hunting support.
          Here&apos;s the shift each one makes:
        </P>
        <DataTable
          caption="Common SOAR use cases, before and after automation"
          head={USE_CASE_TABLE.head}
          rows={USE_CASE_TABLE.rows}
          highlightCol={2}
        />
        <P>
          The scale these use cases operate at can be significant. In one
          widely cited deployment, SOAR automation cut Tier-1 analyst
          workload by 78% while the SOC was processing roughly 12,000 alerts
          a day — the kind of volume that makes fully manual triage
          impossible to sustain.
        </P>

        <H2 id="soar-vs-siem">SOAR vs. SIEM</H2>
        <P>
          SOAR and SIEM get grouped together constantly, and for good reason
          — most SOCs run both. But they do different jobs.{" "}
          <Ref to="what-is-siem">SIEM</Ref> collects and connects events
          across your systems and tells you something happened. SOAR picks up
          from there and acts on it: isolating a compromised laptop or
          disabling a stolen account without waiting for a human to click a
          button.
        </P>
        <P>
          Neither replaces the other. A SIEM with no SOAR behind it still
          requires a person to act on every alert by hand. A SOAR with no
          SIEM (or other detection source) feeding it has nothing to
          orchestrate a response to.
        </P>

        <H2 id="limitations">What SOAR Doesn&apos;t Do</H2>
        <P>
          SOAR is a force multiplier, not a complete replacement for human
          expertise, and it comes with real constraints worth knowing before
          you commit to it.
        </P>
        <Bullets
          items={[
            "It's only as good as the playbooks behind it — a poorly designed playbook automates a bad decision just as fast as a good one.",
            "It takes significant setup effort up front, and connecting every tool correctly is real engineering work, not a checkbox.",
            "It demands ongoing maintenance, since a playbook built against one vendor's API breaks quietly the day that vendor changes it.",
            "It requires earned analyst trust — most teams run a new playbook in a supervised mode before letting it act unsupervised.",
          ]}
        />
        <P>
          None of that makes SOAR not worth it. It means the platform is a
          multiplier on top of a team that already knows what it&apos;s
          doing, not a substitute for one that doesn&apos;t.
        </P>

        <H2 id="faq">Frequently Asked Questions</H2>
        <div className="mt-6">
          <FaqAccordion faqs={FAQS} columns={1} />
        </div>
      </ArticleShell>
    </>
  );
}
