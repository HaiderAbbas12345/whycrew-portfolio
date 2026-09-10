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
import { breadcrumbLabel, postBySlug } from "@/lib/blog";
import { CTA_HREF, EXTERNAL_REL, OG_IMAGE, SITE } from "@/lib/site";

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
  { id: "why-it-matters", label: "Why SOAR matters" },
  { id: "how-soar-works", label: "How SOAR works" },
  { id: "capabilities", label: "Common SOAR capabilities" },
  { id: "use-cases", label: "What SOAR can automate" },
  { id: "phishing-example", label: "A real-world example" },
  { id: "benefits", label: "Benefits of SOAR" },
  { id: "limitations", label: "Limitations of SOAR" },
  { id: "why-rollouts-stall", label: "Why most rollouts stall" },
  { id: "who-uses-soar", label: "Who actually uses SOAR" },
  { id: "compliance", label: "SOAR and compliance" },
  { id: "buying-checklist", label: "What to look for in a platform" },
  { id: "soar-vs-siem-vs-xdr", label: "SOAR vs. SIEM vs. XDR" },
  { id: "whycrew-approach", label: "How WhyCrew approaches SOAR" },
  { id: "faq", label: "Frequently asked questions" },
];

const CAPABILITIES_TABLE = {
  head: ["Capability", "What It Does"],
  rows: [
    ["Playbook automation", "Runs ready-made or custom steps on its own"],
    [
      "Case management",
      "Tracks each incident, its timeline, and its notes in one place",
    ],
    ["Tool integrations", "Connects SOAR to the tools you already use"],
    ["Alert enrichment", "Adds threat context to alerts automatically"],
    [
      "Dashboards and reporting",
      "Shows live data on speed, alert counts, and playbook results",
    ],
    [
      "Threat intelligence integration",
      "Checks alerts against known threat data to speed up review",
    ],
  ],
};

const TOOL_TABLE = {
  head: ["Tool", "Primary Function", "Automates Response?"],
  rows: [
    ["SIEM", "Collects and studies security data; sends alerts", "No"],
    ["SOAR", "Takes alerts, runs playbooks, and acts on threats", "Yes"],
    [
      "XDR",
      "Links data across devices, networks, and the cloud",
      "Yes (deeper)",
    ],
  ],
};

const FAQS: Faq[] = [
  {
    q: "What is SOAR in cybersecurity?",
    a: "It's software that connects your security tools. It handles repeat tasks on its own. And it follows set steps, called playbooks, to respond to threats.",
  },
  {
    q: "What does SOAR stand for?",
    a: "SOAR stands for Security Orchestration, Automation, and Response.",
  },
  {
    q: "What is the difference between SOAR and SIEM?",
    a: "SIEM collects and studies security data. It sends alerts when something looks wrong. SOAR goes further. It automates the response through playbooks. SIEM finds problems. SOAR fixes them.",
  },
  {
    q: "Is SOAR the same as XDR?",
    a: "No. XDR stands for Extended Detection and Response. It finds and stops threats across devices, networks, and the cloud. SOAR focuses on linking tools and automating your response across all of them. Many teams use both.",
  },
  {
    q: "What are SOAR playbooks?",
    a: "Playbooks are set, step-by-step plans. They tell SOAR exactly what to do for each type of threat. They are the core of any SOAR system. They keep every response fast and consistent.",
  },
  {
    q: "Does SOAR replace security analysts?",
    a: "No. SOAR handles routine work. This frees analysts to focus on hard cases and big threats. It's a helper, not a replacement.",
  },
  {
    q: "What types of tasks can SOAR automate?",
    a: "SOAR can add threat details to alerts, check threat data, respond to phishing, lock accounts, block bad IPs, isolate infected devices, open tickets, alert your team, and log every action.",
  },
  {
    q: "Who should use SOAR?",
    a: "SOAR works best for teams with lots of alerts and repeat manual tasks. Mid-size and large SOC teams use it most.",
  },
  {
    q: "Is SOAR the same as security automation?",
    a: "Not quite. Automation is one piece of SOAR — the part that runs tasks without a person clicking through them. SOAR also includes orchestration (linking your tools) and response (the case and decision layer). Automation is a piece of SOAR, not a stand-in for the whole thing.",
  },
  {
    q: "Do small security teams actually need SOAR?",
    a: "It depends more on alert volume than team size. A small team drowning in alerts from a dozen disconnected tools often gets more value from SOAR than a larger team with a simpler stack. The trigger isn't headcount — it's whether manual triage has become the bottleneck.",
  },
  {
    q: "What does a SOAR platform actually connect to?",
    a: "Most commonly a SIEM or XDR for detection, an EDR tool for endpoint action, a firewall for containment, a ticketing system for case tracking, and one or more threat feeds for enrichment. The value scales with how many of these are actually wired together — easy to describe, harder to build well.",
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
          body: "We'll map your current alert volume against the manual steps your team repeats most often, and show you which of them a playbook could take over first — and what it would take to own the result instead of renting it.",
          label: "Book an Architecture Audit",
          href: CTA_HREF,
        }}
      >
        <QuickAnswer>
          SOAR is a type of security software. It connects your security
          tools. It handles boring, repeat tasks on its own. And it follows
          set steps to deal with threats.
        </QuickAnswer>

        <div className="mt-10">
          <KeyTakeaways
            items={[
              <>
                <Strong>What it is:</Strong> SOAR software links all your
                security tools into one system.
              </>,
              <>
                <Strong>What it does:</Strong> It handles repeat tasks on its
                own. It uses set steps called playbooks.
              </>,
              <>
                <Strong>Why it matters:</Strong> It cuts response time. It
                eases analyst stress. It helps small teams handle big alert
                loads.
              </>,
              <>
                <Strong>The payoff:</Strong> Faster fixes, fewer mistakes,
                better records, and steadier security work.
              </>,
            ]}
          />
        </div>

        <H2 id="what-soar-stands-for">What Does SOAR Stand For?</H2>
        <P>
          SOAR stands for Security Orchestration, Automation, and Response.
          Each word does its own job:
        </P>
        <Bullets
          items={[
            <>
              <Strong>Orchestration:</Strong> this means linking your tools
              together. Firewalls, SIEM systems, EDR tools, and threat feeds
              all connect. They stop working alone. They start working as
              one team.
            </>,
            <>
              <Strong>Automation:</Strong> this means the software does
              routine work for you. It follows set steps called playbooks.
              No person has to click through each step by hand.
            </>,
            <>
              <Strong>Response:</Strong> this means taking action fast. The
              system can act on its own. Or it can guide an analyst through
              the right steps. Either way, it happens the moment a threat
              shows up.
            </>,
          ]}
        />
        <P>
          Together, these three parts turn slow, manual security work into
          something fast and steady. Gartner gave this category its name in
          2015. At that time, cloud tools and virtual systems were growing
          fast. Security teams could not hire fast enough to keep up. SOAR
          was built to close that gap.
        </P>

        <H2 id="why-it-matters">Why Is SOAR Important in Cybersecurity?</H2>
        <P>
          Security teams face a real problem. Too many alerts come in. Too
          few people can check them. Most alerts turn out to be false alarms
          anyway. Checking each one by hand is slow. It is also costly. And
          it lets real threats slip through the cracks.
        </P>
        <P>
          SOAR fixes this. It takes over the boring, low-level work. This
          frees up analysts. They can focus on threats that truly need a
          human eye.
        </P>
        <P>Teams that use SOAR often see:</P>
        <Bullets
          items={[
            <>
              <Strong>Faster response:</Strong> a task that once took 20 to
              30 minutes can now run in seconds.
            </>,
            <>
              <Strong>Fewer mistakes:</Strong> the same steps run the same
              way, every single time.
            </>,
            <>
              <Strong>Less alert fatigue:</Strong> analysts spend time on
              real threats, not noise.
            </>,
            <>
              <Strong>Better scale:</Strong> small teams can handle huge
              alert loads.
            </>,
            <>
              <Strong>Stronger compliance:</Strong> every action gets
              logged, which makes audits easier.
            </>,
          ]}
        />
        <P>
          Here is a real example. In one deployment along these lines,
          automating alert checks cut Tier-1 analyst workload by 78%. That
          team handled about 12,000 alerts a day. This is the kind of result
          SOAR aims to deliver.
        </P>

        <H2 id="how-soar-works">How Does SOAR Work?</H2>
        <P>
          SOAR connects your tools. It automates repeat tasks. And it guides
          your team through each incident using playbooks. Here is the basic
          flow: an alert comes in. SOAR checks it against threat data. Then
          it takes action either on its own, or with help from an analyst.
        </P>
        <P>Let&apos;s break down each part.</P>

        <H3>Security Orchestration</H3>
        <P>
          Orchestration is the glue. It links your tools — SIEM, EDR
          (endpoint detection and response), threat feeds, email security,
          firewalls, and identity systems. It uses APIs and ready-made
          connections to do this.
        </P>
        <P>
          Without SOAR, analysts jump between many screens. They copy data
          by hand. They piece together the full picture themselves. With
          SOAR, tools talk to each other on their own. Everything flows into
          one clear workflow.
        </P>

        <H3>Security Automation</H3>
        <P>
          Once your tools connect, automation takes over the busywork. SOAR
          uses <Ref to="soar-playbooks-guide">playbooks</Ref> — step-by-step
          plans made in advance. These playbooks can:
        </P>
        <Bullets
          items={[
            "Add threat details to an alert",
            "Block a bad IP address",
            "Isolate an infected computer",
            "Turn off a hacked user account",
            "Open, update, or close a ticket",
            "Alert the right person on your team",
          ]}
        />
        <P>
          These steps run in seconds. They run the same way every time. No
          analyst needs to do them by hand.
        </P>

        <H3>Incident Response</H3>
        <P>
          Orchestration and automation come together in one screen.
          Analysts can handle the whole incident from there. They sort real
          threats from false alarms. They pick what matters most. They
          start the right playbook, all from one place. SOAR also helps
          after an incident ends. Teams can review what happened. They can
          see how the threat got in. They can close that gap for next time.
        </P>

        <H2 id="capabilities">Common SOAR Capabilities</H2>
        <P>Most SOAR tools share these core features:</P>
        <DataTable
          caption="Core SOAR capabilities and what each one does"
          head={CAPABILITIES_TABLE.head}
          rows={CAPABILITIES_TABLE.rows}
        />

        <H2 id="use-cases">SOAR Use Cases: What Can SOAR Automate?</H2>
        <P>
          SOAR works best on tasks you do over and over. Here are the most
          common ones:
        </P>
        <Bullets
          items={[
            <>
              <Strong>Phishing response:</Strong> SOAR checks a reported
              email against threat data. Then it pulls it from every inbox
              it reached.
            </>,
            <>
              <Strong>Alert triage and enrichment:</Strong> SOAR pulls in
              context the moment an alert lands. No analyst has to dig for
              it by hand.
            </>,
            <>
              <Strong>Account compromise response:</Strong> SOAR can check
              the alert, lock the account, log out active sessions, and log
              every step for later review.
            </>,
            <>
              <Strong>Vulnerability management:</Strong> SOAR ranks scan
              results by risk. It opens fix tickets. It tracks progress.
              Security and IT teams stay in sync.
            </>,
            <>
              <Strong>Threat hunting support:</Strong> SOAR gathers and links
              clues (called IOCs) across systems. This makes hunts faster
              and more consistent.
            </>,
          ]}
        />

        <H2 id="phishing-example">
          Real-World Example: How SOAR Handles a Phishing Attack
        </H2>
        <Numbered
          items={[
            <>
              <Strong>Alert received:</Strong> an email tool flags a bad
              message and sends it to SOAR.
            </>,
            <>
              <Strong>Enrichment:</Strong> SOAR checks the sender, the links,
              and any attachments against threat data.
            </>,
            <>
              <Strong>Verdict:</Strong> the playbook confirms the email is a
              threat.
            </>,
            <>
              <Strong>Response:</Strong> SOAR removes the email from every
              inbox. It blocks the sender. It blocks any bad links too.
            </>,
            <>
              <Strong>Documentation:</Strong> SOAR opens a case and logs
              every step. This creates a clear record.
            </>,
          ]}
        />
        <P>
          This whole process often finishes in under a minute. That&apos;s
          usually before anyone even clicks the link. By hand, the same
          check can take 20 to 30 minutes.
        </P>

        <H2 id="benefits">Benefits of SOAR</H2>
        <Bullets
          items={[
            <>
              <Strong>Speed:</Strong> response time (called MTTR) drops from
              minutes to seconds.
            </>,
            <>
              <Strong>Consistency:</Strong> every incident follows the same
              trusted steps.
            </>,
            <>
              <Strong>Efficiency:</Strong> analysts get hours back each
              week.
            </>,
            <>
              <Strong>Scalability:</Strong> small teams can handle large
              alert loads.
            </>,
            <>
              <Strong>Compliance:</Strong> every action gets logged, ready
              for audits.
            </>,
            <>
              <Strong>Collaboration:</Strong> security, IT, and leaders all
              see the same case.
            </>,
          ]}
        />

        <H2 id="limitations">Limitations of SOAR</H2>
        <P>SOAR is powerful. But it has real limits too:</P>
        <Bullets
          items={[
            <>
              <Strong>Playbooks must be good.</Strong> SOAR only does what
              you tell it to do. Weak playbooks give weak results.
            </>,
            <>
              <Strong>Setup takes work.</Strong> Connecting tools and
              building playbooks takes time.
            </>,
            <>
              <Strong>It won&apos;t replace your team.</Strong> SOAR handles
              routine work. People still make the tough calls.
            </>,
            <>
              <Strong>Automation needs limits.</Strong> A bad rule can lock
              out the wrong account or system.
            </>,
            <>
              <Strong>Bad data means bad results.</Strong> Messy alerts lead
              to messy automation.
            </>,
          ]}
        />
        <P>
          Think of SOAR as a helper, not a replacement. Build good playbooks.
          Keep your data clean. Start that way from day one.
        </P>

        <H2 id="why-rollouts-stall">
          The Real Reason Most SOAR Rollouts Stall
        </H2>
        <P>
          Here&apos;s something most vendor pages skip. SOAR platforms are
          genuinely useful. They&apos;re also one of the more commonly
          abandoned tools in a security stack. A few patterns show up again
          and again.
        </P>
        <P>
          <Strong>Playbooks need upkeep, not a one-time build.</Strong> An
          API changes on the vendor&apos;s end. A field gets renamed. A
          playbook that worked fine in the pilot quietly breaks in
          production. Nobody notices until an incident where it was meant to
          fire and didn&apos;t.
        </P>
        <P>
          <Strong>Integration debt piles up fast.</Strong> Connecting five
          tools sounds simple. Connecting fifteen is a different story. Each
          one has its own API quirks, rate limits, and login method.
          That&apos;s a real engineering project. Most security teams
          don&apos;t have a spare engineer to own it long-term.
        </P>
        <P>
          <Strong>
            The team that builds the playbooks usually isn&apos;t the team
            that has to trust them.
          </Strong>{" "}
          Analysts are rightly cautious about letting software take actions
          on their behalf, especially anything that touches production
          systems or user accounts. Without input from the people running
          the SOC day to day, automation gets built that nobody fully
          trusts. So it sits unused.
        </P>
        <P>
          This is the real gap between buying a SOAR license and having a
          SOAR program that actually cuts workload. The platform itself is
          maybe 30 percent of the outcome. The other 70 percent is the
          engineering behind it — playbooks built around how your team
          actually works, integrations that get kept up instead of quietly
          rotting, and analysts who trust the automation enough to lean on it
          during a real incident.
        </P>

        <H2 id="who-uses-soar">Who Actually Uses SOAR</H2>
        <P>SOAR earns its keep fastest in two kinds of teams.</P>
        <P>
          <Strong>MSSPs running detection for multiple clients</Strong> hit
          an alert volume that no manual process can absorb. When
          you&apos;re triaging for ten or fifty customers at once,
          automating the repeat parts of each case isn&apos;t optional —
          it&apos;s what makes the business math work.
        </P>
        <P>
          <Strong>
            Regulated enterprises with lean internal security teams
          </Strong>{" "}
          get a different benefit: consistency. A playbook runs the same
          enrichment and containment steps every time, which matters when
          auditors ask how a specific incident type gets handled. You need a
          documented, repeatable answer, not &ldquo;it depends who was on
          shift.&rdquo;
        </P>
        <P>
          The workload shift is real, not theoretical. In one such
          engagement, a SOC cut Tier-1 analyst workload by 78 percent,
          handling roughly 12,000 alerts a day, by automating the enrichment
          and triage steps that used to eat most of an analyst&apos;s day.
        </P>

        <H2 id="compliance">
          SOAR and Compliance: Where NIS2 and DORA Come In
        </H2>
        <P>
          For EU-regulated firms, SOAR isn&apos;t just about speed. It&apos;s
          a compliance matter too. The NIS2 Directive sets tight
          incident-reporting windows that are hard to hit with manual triage
          alone. DORA puts similar pressure on financial firms around how
          fast they classify and respond to incidents. A documented,
          automated response flow doesn&apos;t just save time — it gives you
          the audit trail regulators want to see.
        </P>

        <H2 id="buying-checklist">What to Look For in a SOAR Platform</H2>
        <P>
          Picking a SOAR platform usually comes down to five practical
          questions:
        </P>
        <Bullets
          items={[
            <>
              <Strong>Does it connect to what you already run?</Strong> Check
              for native integrations with your SIEM or XDR, your EDR tool,
              your firewall, your ticketing system, and your threat feeds —
              not just a generic &ldquo;API available&rdquo; claim.
            </>,
            <>
              <Strong>Can your team actually build and edit playbooks?</Strong>{" "}
              Some platforms need a developer for every change. Others give
              analysts a visual builder. That difference decides whether
              playbooks stay current after launch.
            </>,
            <>
              <Strong>How is it priced?</Strong> Many SOAR tools price by
              alert volume or automation count. That model gets more
              expensive exactly when automation is working hardest during a
              busy month or a growing client base.
            </>,
            <>
              <Strong>What happens when an integration breaks?</Strong> Ask
              who&apos;s responsible for fixing it: you, the vendor, or
              nobody until someone notices during an incident.
            </>,
            <>
              <Strong>Do you own what you build?</Strong> With a licensed
              platform, your playbooks and integrations usually live inside
              someone else&apos;s system. If you ever switch vendors, that
              work doesn&apos;t travel with you.
            </>,
          ]}
        />

        <H2 id="soar-vs-siem-vs-xdr">SOAR vs. SIEM vs. XDR: What&apos;s the Difference?</H2>
        <DataTable
          caption="How SOAR, SIEM, and XDR differ in function and response"
          head={TOOL_TABLE.head}
          rows={TOOL_TABLE.rows}
        />
        <P>
          <Ref to="what-is-siem">SIEM</Ref> finds problems. SOAR fixes them.
          XDR does both, at a deeper level. Many teams use all three
          together. See how they fit an MSSP setup in{" "}
          <Ref to="multi-tenant-siem-architecture">
            Multi-Tenant SIEM for MSSPs
          </Ref>
          .
        </P>

        <H2 id="whycrew-approach">How WhyCrew Approaches SOAR</H2>
        <P>
          Most SOAR tools work like a rental. You pay a fee that grows as
          your alerts grow. WhyCrew builds it differently. We build your
          SOAR system — the playbooks, the connections, the case tracking —
          as something you own. At the end of the project, you get the full
          source code. It&apos;s yours to keep. For a growing MSSP, this
          means automation gets cheaper per alert as you scale. It does not
          get more expensive.
        </P>
        <P>
          Trying to decide whether to rent a SOAR tool or build your own?{" "}
          <a
            href={CTA_HREF}
            target="_blank"
            rel={EXTERNAL_REL}
            className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
          >
            Book a 20-minute call
          </a>{" "}
          with the engineers who would build it.
        </P>

        <H2 id="faq">Frequently Asked Questions About SOAR</H2>
        <div className="mt-6">
          <FaqAccordion faqs={FAQS} columns={1} />
        </div>
      </ArticleShell>
    </>
  );
}
