import type { Metadata } from "next";
import { ArticleShell, type TocEntry } from "@/components/blog/article-shell";
import {
  Bullets,
  Checklist,
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

const post = postBySlug("siem-migration-guide-zero-downtime")!;
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
  { id: "journey", label: "The whole journey in one table" },
  { id: "why-teams-leave", label: "Why teams walk away from old systems" },
  { id: "risks", label: "The risks you must plan for" },
  { id: "how-to-plan", label: "How to plan the switch, step by step" },
  { id: "checklist", label: "Your pre-switch checklist" },
  { id: "old-data", label: "Handling old data and storage rules" },
  { id: "moving-rules", label: "Moving rules without losing ground" },
  { id: "example", label: "A real example: one client at a time" },
  { id: "bottom-line", label: "The bottom line" },
  { id: "faq", label: "Questions people ask" },
];

const JOURNEY = {
  head: ["Step", "What You Do", "Risk", "Time"],
  rows: [
    ["Look and List", "Write down all sources, rules, and links", "Low", "1–2 weeks"],
    ["Plan the New Setup", "Set data shape, storage, and client model", "Low–Medium", "1–2 weeks"],
    ["Run Both at Once", "Feed live traffic to both systems", "Medium", "4–8 weeks"],
    ["Move Old Data", "Transfer and check saved logs", "Medium–High", "2–4 weeks"],
    ["Rebuild the Rules", "Rewrite, match, and test each rule", "High", "3–6 weeks"],
    ["Flip the Switch", "Send data to the new system", "High", "1–2 weeks"],
    ["Settle In", "Watch, tune, and confirm full coverage", "Medium", "2–4 weeks"],
  ],
};

const FAQS: Faq[] = [
  {
    q: "How long does a SIEM switch take?",
    a: "Most mid-sized setups finish in 8 to 16 weeks. Regulated setups, big data sets, and many-client setups take longer.",
  },
  {
    q: "What is the biggest risk?",
    a: "Quiet failures. Rules that break from bad name-matching give no errors. They just give no alerts. Running both systems and comparing alerts is the fix.",
  },
  {
    q: "Can you switch with zero downtime?",
    a: "Yes. Run both systems on live traffic at once. Confirm they catch the same threats. Keep the old one live until the new one proves itself.",
  },
  {
    q: "When should you shut off the old system?",
    a: "After two to four weeks with no gaps, no failures, and no broken data. Keep it ready to undo the whole time.",
  },
  {
    q: "How do you stay compliant during the switch?",
    a: "Move must-keep data first, with checks and a record of who touched it. Bring legal and rules people in before data moves. Note which system holds the main copy at each step.",
  },
  {
    q: "Should MSSPs move one client at a time?",
    a: "Yes, for setups with more than five or six clients. Going in order limits risk, helps you learn, and keeps the workload sane. Smaller setups can move all at once, but the testing stays the same.",
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
          heading: "Still deciding what to move to?",
          body: "Book an Architecture Audit and we will map your sources, rules, and storage needs against a platform you own outright — before anything moves.",
          label: "Book an Architecture Audit",
          href: "/contact",
        }}
      >
        <QuickAnswer>
          A zero-downtime SIEM switch means you run both systems at the same
          time. You check that the new one catches the same threats on real
          traffic. Only then do you turn off the old one. Most switches take 8
          to 16 weeks. The exact time depends on how complex your setup is and
          what rules you must follow.
        </QuickAnswer>

        <P>
          (A SIEM is a tool that collects security data and helps spot threats.)
        </P>

        <div className="mt-10">
          <KeyTakeaways
            items={[
              "Keep the old system on until the new one catches the same threats on real traffic.",
              "Run both at once. This keeps your team covered during the switch. (Your team here is the SOC — the group that watches for threats.)",
              "Plan how to move your old data first, not later.",
              "Rules do not just copy over. Test each one.",
              "Make the switch easy to undo. Set your undo rules before you start.",
              "MSSPs should move one client at a time. This lowers risk. (An MSSP runs security for many clients.)",
            ]}
          />
        </div>

        <H2 id="journey">The Whole Journey in One Table</H2>
        <DataTable
          caption="The seven phases of a zero-downtime SIEM migration, with risk level and typical duration"
          head={JOURNEY.head}
          rows={JOURNEY.rows}
          highlightCol={2}
        />

        <H2 id="why-teams-leave">Why Teams Walk Away From Old Systems</H2>
        <P>
          Cost usually starts the talk. Say a team takes in 200 GB of data each
          day at €2 to €4 per GB. That team can spend up to €292,000 a year on
          data alone. And that is before servers, support, or extras.
        </P>
        <P>But cost is not the only reason. Teams also switch because of:</P>
        <Bullets
          items={[
            <>
              <Strong>Missed threats.</Strong> Old rule engines cannot keep up
              with smarter, newer detection.
            </>,
            <>
              <Strong>Growth pain.</Strong> Old systems were not built for many
              clients. Each new client adds work.
            </>,
            <>
              <Strong>Rule pressure.</Strong> Old storage struggles when an
              audit asks for 13 months of logs.
            </>,
            <>
              <Strong>Being stuck.</Strong> Teams that want full control move to
              systems they own. Our{" "}
              <Ref to="custom-siem-soar-services">
                custom SOAR development
              </Ref>{" "}
              service is built for this.
            </>,
          ]}
        />

        <H2 id="risks">The Risks You Must Plan For</H2>
        <P>
          <Strong>Missed alerts.</Strong> A rule that worked on the old system
          may quietly fail on the new one. This happens when data names do not
          match. No error pops up. You just stop getting alerts.
        </P>
        <P>
          <Strong>Broken data.</Strong> Old logs moved without checks can arrive
          damaged. You might see wrong dates, missing fields, or a broken record
          of who touched what. In regulated settings, that breaks the rules.
        </P>
        <P>
          <Strong>Team overload.</Strong> Running two systems while your team
          keeps working adds stress. Without clear roles, the switch itself
          becomes a risk.
        </P>
        <P>Plan for all three before you start.</P>

        <H2 id="how-to-plan">How to Plan the Switch, Step by Step</H2>

        <H3>Step 1: Look at Everything First</H3>
        <P>
          Write down all your old system does. List every data source. List
          every rule, plus how often it fires and how often it is wrong. List
          every link to other tools. List every storage rule. Teams that rush
          this find out mid-switch that they missed a key source. Those fixes
          cost a lot under pressure.
        </P>

        <H3>Step 2: Plan the New Home</H3>
        <P>
          Build the new system around your real needs, not your guesses. Key
          choices:
        </P>
        <Bullets
          items={[
            <>
              <Strong>Data name matching.</Strong> Bad matching is the top cause
              of failed alerts after the switch.
            </>,
            <>
              <Strong>Storage layers.</Strong> Set fast, medium, and slow
              storage for each source. This is hard to change later.
            </>,
            <>
              <Strong>Client model.</Strong> For MSSPs, decide how you keep each
              client&apos;s data apart. This shapes everything else.
            </>,
            <>
              <Strong>Data flow.</Strong> Decide how data moves while both
              systems run and after the switch.
            </>,
          ]}
        />

        <H3>Step 3: Run Both at the Same Time</H3>
        <P>
          Both systems get the same live traffic. Your team keeps working in the
          old one. The new one runs quietly in the background. You review its
          alerts and compare them. But you have not acted on them yet. You wait
          until both catch the same threats.
        </P>
        <P>
          Set a clear finish line before you start. &ldquo;Four weeks in a row
          of the same alerts, with no gaps&rdquo; is a real goal. &ldquo;When
          the team feels ready&rdquo; is not.
        </P>

        <H3>Step 4: Move Old Data the Safe Way</H3>
        <P>
          Start this while both systems run, not after the switch. Move
          must-keep data first. Verify it is complete, and track who touched it.
          Then move recent data you still study. Then move older stored logs in
          small batches. Spot-check each batch for the right dates and full
          records.
        </P>

        <H3>Step 5: Rebuild the Rules</H3>
        <P>Follow this order for every rule:</P>
        <Numbered
          items={[
            "Write down what the rule is meant to catch.",
            "Match its data names to the new system.",
            "Rewrite it in the new system's language.",
            "Test it against old data with known threats.",
            "Run it live and compare it to the old one.",
            "Mark it done only when both match.",
          ]}
        />
        <P>
          Handle your most serious rules first. Do not skip testing on smaller
          ones. Those gaps are the hardest to spot later.
        </P>

        <H3>Step 6: Flip the Switch With Care</H3>
        <P>
          Pick a quiet time. Tell your team ahead. Point the data to the new
          system, check that logs arrive, turn on alerts, and watch closely with
          extra staff for the first day or two. Keep the old system fully set up
          for two to four weeks. If something breaks, the undo should be a quick
          data redirect, not a rescue job.
        </P>

        <H2 id="checklist">Your Pre-Switch Checklist</H2>
        <P>Run through this list before you flip the switch:</P>
        <Checklist
          items={[
            "All data sources are active and feeding the new system",
            "Data names are matched for every source type",
            "Rules are rewritten, tested, and checked side by side",
            "Alerts match the old system for at least four weeks in a row",
            "Old data is moved with checks written down",
            "Storage rules are on and correct for all must-keep sources",
            "All links (SOAR, ticketing, dashboards, alerts) are connected and tested",
            "Your team is trained on the new system",
            "Undo rules and steps are written down and understood",
            "The old system is ready to take data again if you need to undo",
          ]}
        />

        <H2 id="old-data">Handling Old Data and Storage Rules</H2>
        <P>
          Storage is a rules duty first and a tech task second. Before any data
          moves, confirm what you must keep, for how long, and what counts as
          proof. Bring your legal and rules people in early, not mid-switch.
        </P>
        <P>
          Use storage layers. Keep fast storage for the last 30 to 90 days. Keep
          medium storage for 90 days to 12 months. Keep slow storage for older
          data. Each layer needs access controls and tamper-proof logs in
          regulated settings.
        </P>
        <P>
          Also write down which system holds the main copy of each dataset
          during the switch. Auditors will ask.
        </P>

        <H2 id="moving-rules">Moving Rules Without Losing Ground</H2>
        <P>
          Rules do not copy cleanly between systems. Each system uses its own
          language. A rule written for one cannot be dropped into another by
          machine. You have to know what it actually catches.
        </P>
        <P>
          Bad data names cause the quietest failures. A rule may look for a
          field named one way on the old system and another way on the new one.
          If the match is wrong, the rule runs but finds nothing. No errors. No
          alerts. No warning.
        </P>
        <P>
          The fix: do not shut off the old system until every rule is checked.
          That is what keeps a smooth switch from turning into a gap you find
          during a real attack.
        </P>

        <H2 id="example">A Real Example: One Client at a Time</H2>
        <P>
          An MSSP ran security for 22 clients. Its old system was never built
          for so many, so costs kept climbing. Instead of moving all clients at
          once, the team went in order:
        </P>
        <Bullets
          items={[
            <>
              <Strong>Test run.</Strong> They picked two clients — one easy, one
              hard. They fixed name-matching gaps and alert errors before those
              problems could hit everyone.
            </>,
            <>
              <Strong>Small groups.</Strong> They moved clients in groups of
              three to five, starting with the easiest. Each group ran side by
              side for at least four weeks. Only one group ran at a time.
            </>,
            <>
              <Strong>One switch at a time.</Strong> Each switch was its own
              planned event. The old setup stayed live for two weeks before
              shutdown.
            </>,
          ]}
        />
        <P>
          The full move took about 14 months. No client lost coverage. Costs
          dropped at shutdown. And the MSSP ended with a system built for many
          clients from day one.
        </P>

        <H2 id="bottom-line">The Bottom Line</H2>
        <P>
          A switch goes wrong when teams set random deadlines. It goes wrong
          when they skip running both systems to save money. And it goes wrong
          when they treat rules as a quick copy instead of a test.
        </P>
        <P>
          It goes right when testing sets the pace, not the calendar. Once the
          new system proves itself on live traffic — with data moved, rules
          checked, and links working — the switch is the right move. Not before.
        </P>
        <P>
          Still deciding what to move to? Review how{" "}
          <Ref to="open-source-vs-custom-siem">this compares to open-source</Ref>{" "}
          and the full{" "}
          <Ref to="siem-cost-licensing">SIEM licensing cost breakdown</Ref>{" "}
          before you pick.
        </P>

        <H2 id="faq">Questions People Ask</H2>
        <div className="mt-6">
          <FaqAccordion faqs={FAQS} columns={1} />
        </div>
      </ArticleShell>
    </>
  );
}
