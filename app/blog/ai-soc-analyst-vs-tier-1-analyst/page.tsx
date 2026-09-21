import type { Metadata } from "next";
import { ArticleShell, type TocEntry } from "@/components/blog/article-shell";
import {
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

const post = postBySlug("ai-soc-analyst-vs-tier-1-analyst")!;
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
  { id: "what-ai-soc-analyst-means", label: "What AI SOC Analyst Actually Means" },
  { id: "at-a-glance", label: "AI SOC Analyst Vs Tier-1 Analyst: At A Glance" },
  { id: "will-ai-replace", label: "Will AI Replace SOC Analysts?" },
  { id: "where-differences-show-up", label: "Where The Differences Actually Show Up" },
  {
    id: "l1-automation-ceiling",
    label: "The L1 Automation Ceiling: Classification Isn't Investigation",
  },
  { id: "what-this-means", label: "What This Means For Your SOC" },
  { id: "faq", label: "FAQ" },
];

const GLANCE_TABLE = {
  head: ["Dimension", "Traditional Tier-1 Analyst", "AI SOC Analyst"],
  rows: [
    [
      "Alert volume handled",
      "Limited by shift hours and tiredness",
      "Full volume, all day and night, no tired spells",
    ],
    [
      "Consistency",
      "Changes by analyst, time of day, workload",
      "Same logic, every time",
    ],
    [
      "Speed to first triage",
      "Minutes to tens of minutes per alert",
      "Seconds",
    ],
    [
      "Context and unclear cases",
      "Strong: reads tone and unwritten context",
      "Weak outside what it was trained on",
    ],
    [
      "Learning new attack patterns",
      "Slow, but the skill carries to other systems",
      "Fast within its scope, weak outside it",
    ],
    [
      "Accountability",
      "One named person, clear reasoning",
      "Needs a human to sign off on anything serious",
    ],
    [
      "Cost as you grow",
      "Rises roughly in a straight line with alert volume",
      "Stays fairly flat after the first build cost",
    ],
  ],
};

const FAQS: Faq[] = [
  {
    q: "AI SOC analyst vs Tier-1 analyst: what's the real difference?",
    a: "An AI SOC analyst handles alerts at machine speed, with no tired spells. A Tier-1 human brings context, business judgment, and accountability that a model can't yet supply.",
  },
  {
    q: "Can AI replace Tier-1 SOC analysts?",
    a: "No, not fully. AI takes over the repeat triage work. But a person still has to own accountability, escalation calls, and investigation.",
  },
  {
    q: "Will AI replace SOC analysts entirely?",
    a: "No. Even the most advanced SOCs keep humans for escalation calls and anything that must be explained to a regulator or customer.",
  },
  {
    q: "Is AI accurate enough for Tier-1 alert triage?",
    a: "For common, high-volume alerts, yes, often as good as a tired human analyst. For new or unclear alerts, no.",
  },
  {
    q: "Does an AI SOC analyst reduce false positives?",
    a: "Usually, yes, but it changes the type. Human mistakes tend to come from tiredness. AI mistakes tend to come from close matches that only look real.",
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
          body: "AI takes the repeat first pass — sorting alerts, matching logs, closing the noise — while your analysts keep the escalation calls and the accountability. It runs inside your own infrastructure, with no outside API calls.",
          label: "Book an Architecture Audit",
          href: CTA_HREF,
        }}
      >
        {/*
          The content doc heads this section "Quick Answer" and runs five
          paragraphs under it, so the callout takes `block` and the paragraphs
          stay separate rather than being run together into one.
        */}
        <QuickAnswer block>
          <P>
            Is your Tier-1 team out of date? SOC leaders ask this question a lot
            this year.
          </P>
          <P>
            No. Not yet. And not in the way most headlines say. In most SOCs, an
            AI SOC analyst sorts and cleans up alerts. It does not replace human
            investigation. It handles alert triage, log matching, and the first
            pass of sorting. It works faster than any human team.
          </P>
          <P>
            A Tier-1 human still makes the hard calls. These are things like
            unclear situations, business risk, and anything that needs a phone
            call, not just a rulebook. In many SOCs, AI now handles about
            70&ndash;80% of first-pass triage. The exact number depends on alert
            volume and tools. The human job is shifting too. Humans now watch
            and check the system, instead of touching every alert by hand.
          </P>
          <P>
            Some vendors tell two different stories. One says, &quot;AI is
            replacing SOC analysts.&quot; The other says, &quot;AI can&apos;t be
            trusted with security decisions.&quot; Neither one is true for most
            SOCs. This isn&apos;t about replacing people. It&apos;s about
            splitting up the work. Which parts of Tier-1 work now go to a
            machine? Which parts still need a person?
          </P>
          <P>
            Want the basics on SOC tiers first? Read our{" "}
            <Ref to="soc-analyst-tiers">SOC tiers</Ref> guide. This article
            picks up from there. It looks closely at the Tier-1 layer.
            That&apos;s where AI is showing up first.
          </P>
        </QuickAnswer>

        <H2 id="what-ai-soc-analyst-means">
          What AI SOC Analyst Actually Means
        </H2>
        <P>
          An AI SOC analyst isn&apos;t just one thing. In real life, it&apos;s
          usually one of four setups. A copilot suggests actions to a human. An
          autonomous agent acts on its own, within set limits. A
          workflow-automation layer sorts and adds info to alerts. A triage
          engine sorts alerts and closes the easy ones. Most SOCs today use the
          last two.
        </P>
        <P>
          A traditional Tier-1 analyst owns three jobs: sorting alerts,
          filtering out false alarms, and sending real threats up to Tier 2.
        </P>
        <P>
          So the real question isn&apos;t AI versus human. It&apos;s about who
          does what. Which of those three jobs can a machine handle today? Which
          ones still need a person?
        </P>

        <H2 id="at-a-glance">AI SOC Analyst Vs Tier-1 Analyst: At A Glance</H2>

        <Figure
          src="/blog/ai-soc-analyst-vs-tier-1-analyst/ai-vs-tier-1-analyst-comparison.png"
          alt="Comparison of what an AI analyst handles versus what a Tier-1 analyst handles in a SOC"
          width={2048}
          height={1154}
        />

        <DataTable
          caption="AI SOC analyst and traditional Tier-1 analyst compared across seven dimensions"
          head={GLANCE_TABLE.head}
          rows={GLANCE_TABLE.rows}
        />
        <P>
          This table doesn&apos;t pick a winner. It shows that AI and a Tier-1
          analyst do different jobs, even when people call both &quot;Tier
          1.&quot;
        </P>

        <H2 id="will-ai-replace">Will AI Replace SOC Analysts?</H2>
        <P>
          No. Not the whole SOC, and not any time soon. AI takes over the
          repetitive, high-volume part of the job. That means sorting alerts,
          matching logs, and closing the false alarms that fill up most of a
          Tier-1 queue. AI does not take over accountability, escalation
          judgment, or investigation work that spans systems that were never
          built to talk to each other.
        </P>
        <P>
          This matters for how you staff your team, not just how you sell it. If
          a SOC removes its human Tier-1 layer completely, that isn&apos;t
          automation. That&apos;s a gamble. Someone still has to own the call
          when a model&apos;s &quot;high confidence&quot; turns out to be wrong.
          You can add AI on top of your current tools, or build it into an owned{" "}
          <Ref to="custom-soc-platform">custom SOC platform</Ref>. Either way
          changes the cost. It doesn&apos;t change that answer.
        </P>

        <H2 id="where-differences-show-up">
          Where The Differences Actually Show Up
        </H2>

        <Figure
          src="/blog/ai-soc-analyst-vs-tier-1-analyst/ai-triage-to-human-escalation-flow.png"
          alt="Flow diagram of a security alert moving from AI triage to human escalation"
          width={2048}
          height={941}
        />

        <H3>AI SOC Analyst Alert Triage Vs Human Analyst</H3>
        <P>
          A human Tier-1 analyst can sort a few hundred alerts in an eight-hour
          shift before quality starts to slip. And it does slip, especially by
          hour six of a night shift. An AI system doesn&apos;t have an hour six.
          Its accuracy stays the same all shift long. It uses the same logic on
          alert one and alert ten thousand.
        </P>
        <P>
          That&apos;s the real gap: a SOC that only checks part of its alert
          queue, versus one that checks all of it. In practice, this kind of
          change often cuts manual triage work by up to 80%. It doesn&apos;t
          replace the analysts. It lets the system soak up the repeat first
          pass, so people stop drowning in duplicate, low-value alerts.
        </P>

        <H3>AI SOC Analyst False Positives</H3>
        <P>
          Does an AI SOC analyst cut down false positives? Usually yes, on the
          overall rate. But it changes what causes them, not just how many show
          up.
        </P>
        <P>
          A human false alarm usually comes from tiredness, a distraction, or a
          log format they don&apos;t know well. An AI false alarm usually comes
          from a pattern that looks close to something in its training data. But
          it isn&apos;t the same thing at all.
        </P>
        <P>
          Here&apos;s the catch: rates drop, but the false positives that slip
          through are harder to spot on a quick look. They don&apos;t look
          obviously wrong. They look like a normal alert that got sorted into
          the wrong bucket. That&apos;s why a human still needs to check the
          work. It can&apos;t just be a rubber stamp on whatever the model says.
        </P>

        <H3>AI Vs Human SOC Analyst Investigation</H3>
        <P>
          Triage is pattern matching. Does this look like something we&apos;ve
          seen before? Investigation is a different job. It means following
          clues across systems that don&apos;t talk to each other. It means
          filling in gaps with judgment. It means knowing when a
          &quot;clean&quot; log isn&apos;t actually clean. Most AI SOC marketing
          skips over this difference.
        </P>
        <P>
          AI is getting better at linking clues from a few sources. But
          it&apos;s not yet good at gut instinct, like when a Tier-2 analyst
          says, &quot;this looks fine, but the timing bothers me,&quot; and
          turns out to be right. That instinct comes from years of hands-on
          work. No training set fully captures it.
        </P>

        <H3>Learning And Adaptation</H3>
        <P>
          A human analyst who sees a brand-new attack can reason it out from
          scratch, even with zero past examples. An AI system learns from
          patterns it has already seen. That makes it strong on things close to
          its training and weaker on truly new tricks.
        </P>
        <P>
          This cuts both ways. Humans are slow to update as a group. What one
          analyst learns doesn&apos;t always reach the other eleven people on
          the team. Once an AI system&apos;s new skill is checked and approved,
          it spreads everywhere at once. So: slower learning for one person,
          faster learning for the whole team.
        </P>

        <H3>Escalation Judgment</H3>
        <P>
          Deciding when to escalate is often harder than deciding what to
          escalate. It takes a read on how much risk the business can handle,
          not just how bad the alert looks on paper. That&apos;s why this part
          of the job survives almost every wave of automation.
        </P>

        <H3>Cost And Scale Economics</H3>
        <P>
          A human-only Tier-1 team grows costs in a fairly straight line. Double
          your alert volume, and you&apos;re hiring roughly double the staff,
          plus training time, plus the burnout that comes with a really hard
          job.{" "}
          <Ref to="ai-soc-automation-services">AI-powered SOC automation</Ref>{" "}
          works on a different cost curve. It costs more to build up front, but
          the cost per extra alert flattens out fast. For an MSSP running many
          client accounts, that difference is the whole business case.
        </P>

        <H3>What Stays Human</H3>
        <P>
          Mostly, it&apos;s accountability. Someone has to explain, in a
          boardroom or to a regulator, why a call was made. &quot;The model
          flagged it&quot; isn&apos;t an answer anyone accepts once an incident
          hits the news. Most SOCs further along with AI still name one person
          in charge. That person owns anything that leaves the building: a
          customer notice, a regulator filing, a public statement. That&apos;s
          not a gap waiting to be automated away. It&apos;s a fixed part of the
          job.
        </P>

        <H2 id="l1-automation-ceiling">
          The L1 Automation Ceiling: Classification Isn&apos;t Investigation
        </H2>
        <P>
          Classification is not investigation. Many &quot;self-running
          SOC&quot; vendors blur that line on purpose. It&apos;s the limit that
          matters most right now.
        </P>
        <P>
          Classification asks one question: does this match a pattern we already
          know? That&apos;s a solved problem for most alert volume, which is why
          AI triage tools got good so fast. Investigation asks something harder.
          What actually happened? You have to look across systems that were
          never built to work together. Some evidence is missing. Some of it
          doesn&apos;t add up. That&apos;s not pattern matching. It&apos;s
          reasoning without all the facts. It&apos;s the part of the job that
          resists automation the most.
        </P>
        <P>
          Trouble starts when teams expect AI to investigate the same way it
          triages. Treat AI as a triage layer. Give it a clear handoff to human
          judgment. Put that handoff at the same point where Tier 1 already
          hands off to Tier 2. Do that, and the automation ceiling stops causing
          problems.
        </P>

        <H2 id="what-this-means">What This Means For Your SOC</H2>
        <P>
          <Strong>MSSP juggling client accounts on thin margins:</Strong> the
          triage layer pays for itself the fastest. Your analysts are likely
          spending more time re-checking duplicate, low-value alerts across
          clients than doing real investigation. Fix that part first.
        </P>
        <P>
          <Strong>Regulated operator with audit needs:</Strong> you need the
          accountability layer more than raw speed. Build or buy AI help that
          leaves a clear trail a regulator can follow. Avoid a black box that
          just says &quot;high confidence&quot; with no reason behind it.
        </P>
        <P>
          <Strong>
            Tier-1 team burning out and quitting every 9 to 12 months:
          </Strong>{" "}
          that&apos;s usually an alert-volume problem, not a people problem.
          Automating the repeat work frees your remaining analysts for the
          judgment calls that make the job worth keeping.
        </P>

        <H2 id="faq">FAQ</H2>
        <div className="mt-6">
          <FaqAccordion faqs={FAQS} />
        </div>
      </ArticleShell>
    </>
  );
}
