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

const post = postBySlug("nca-ecc-vs-sama-csf")!;
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
  { id: "two-rules", label: "Two rules, two regulators" },
  { id: "quick-comparison", label: "Quick comparison" },
  { id: "nca-ecc", label: "What is NCA ECC?" },
  { id: "sama-csf", label: "What is SAMA CSF?" },
  { id: "who-needs-which", label: "Who needs which rule" },
  { id: "both-rules", label: "When you need both" },
  { id: "three-step-check", label: "The 3-step check" },
  { id: "key-differences", label: "Key differences" },
  { id: "common-mistakes", label: "Common mistakes to dodge" },
  { id: "security-tools", label: "What both rules need from your tools" },
  { id: "faq", label: "Frequently asked questions" },
  { id: "summary", label: "Final summary" },
];

const COMPARISON_TABLE = {
  head: ["Category", "NCA ECC", "SAMA CSF"],
  rows: [
    ["Who made it", "National Cybersecurity Authority", "Saudi Central Bank"],
    [
      "Who must follow it",
      "Government, key infrastructure, many businesses",
      "Banks, insurers, fintechs, payment firms",
    ],
    ["Number of controls", "108 main controls + 92 sub-controls", "32 subdomains"],
    [
      "Watch-your-systems rule",
      "Control 2-12: SIEM plus steady log checks",
      "Subdomain 3.14: SIEM plus a 24/7 SOC",
    ],
    [
      "How long to keep logs",
      "12 months (18 for key systems)",
      "Based on your risk class, no fixed number",
    ],
    ["How you get graded", "Pass or fail", "6-level scale, 0 to 5"],
    [
      "Need a special license?",
      "Yes — Tier 1 or Tier 2 MSOC license",
      "No, the firm carries the duty itself",
    ],
    ["Do the two rules link up?", "No", "No"],
    ["One check for both?", "No", "No"],
  ],
};

const MATURITY_TABLE = {
  head: ["Level", "Name", "What It Means"],
  rows: [
    ["0", "Non-existent", "No controls at all"],
    ["1", "Initial", "Random, with no plan"],
    ["2", "Developing", "Some controls, not steady"],
    ["3", "Defined", "Written down and steady. This is SAMA's lowest pass."],
    ["4", "Managed", "Tracked and checked often"],
    ["5", "Optimizing", "Always getting better"],
  ],
};

const FAQS: Faq[] = [
  {
    q: "Can both NCA ECC and SAMA CSF apply to the same firm?",
    a: "Yes. This is most common for money firms marked as key infrastructure, and for MSSPs that serve SAMA-watched clients. Each regulator checks on its own — there is no single combined check.",
  },
  {
    q: "Is SAMA CSF just NCA ECC, but for banks?",
    a: "No. Two different regulators built these rules. They have different parts and different grading systems. Treat them as the same thing, and you'll leave real gaps.",
  },
  {
    q: "Does passing NCA ECC mean you pass SAMA CSF too?",
    a: "No. There is no shared pass and no shared certificate. If you need both, you prove you meet both, one at a time.",
  },
  {
    q: "Does NCA ECC have 108 controls or 114 controls?",
    a: "114 controls belonged to the old version, ECC-1:2018. The current version, ECC-2:2024, has 108 main controls plus 92 smaller sub-controls. Always use the current version for audits.",
  },
  {
    q: "Which rule has stricter log storage rules?",
    a: "NCA ECC is more exact: 12 months, or 18 for key systems. SAMA CSF gives no fixed number — it depends on your risk class. Neither one wins on \"stricter\" every time.",
  },
  {
    q: "Is NCNICC the same thing as NCA ECC?",
    a: "No. NCNICC is a lighter, separate NCA rule for private firms not marked as key infrastructure. It covers a different group, using a different set of controls.",
  },
  {
    q: "I run an MSSP with SAMA clients. Which rule applies to me?",
    a: "Both. Your NCA MSOC license covers your own firm, but your platform must also meet your clients' SAMA CSF rules — Subdomain 3.14 matters most here. That duty applies even if SAMA does not watch you directly.",
  },
  {
    q: "Where do I check which rule officially applies to me?",
    a: "For NCA ECC, check NCA's own published papers. For SAMA CSF, check SAMA's own framework notice. Always go to the primary source before you build a compliance plan.",
  },
];

const SUMMARY_POINTS = [
  "NCA ECC covers government offices, infrastructure, and many Saudi firms",
  "SAMA CSF covers banks, insurers, and money firms watched by SAMA",
  "Some firms need both rules — mainly key money firms and MSSPs serving SAMA clients",
  "One rule does not replace the other — each has its own regulator and its own check",
  "Both rules need the same core tools: a real SIEM, an active SOC, and solid log storage",
  "Outsourcing does not remove your duty — you still carry the risk for your vendors",
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
          heading: "Find out which rule applies to you",
          body: "We'll run the three-step check against your organization, map the gap between what you have and what Control 2-12 or Subdomain 3.14 requires, and show you what a platform built to satisfy both would look like.",
          label: "Book a Compliance Architecture Audit",
          href: CTA_HREF,
        }}
      >
        <QuickAnswer>
          Saudi Arabia has two main cybersecurity rules. One is NCA ECC. The
          other is SAMA CSF. Two different groups made these rules. NCA ECC
          covers government bodies, key infrastructure, and many businesses.
          SAMA CSF covers banks and other money firms. Some firms must follow
          both. Following one rule does not mean you follow the other — pick
          the wrong one, and you could waste months building the wrong
          controls.
        </QuickAnswer>

        <div className="mt-10">
          <KeyTakeaways
            items={[
              "What NCA ECC is, and who must follow it",
              "What SAMA CSF is, and who must follow it",
              "When you need to follow both",
              "A simple 3-step check to find your rule",
              "Common mistakes, and how to dodge them",
            ]}
          />
        </div>

        <H2 id="two-rules">Two Rules. Two Regulators. Two Very Different Jobs.</H2>
        <P>Saudi Arabia has two main cybersecurity regulators.</P>
        <Bullets
          items={[
            <>
              The <Strong>National Cybersecurity Authority (NCA)</Strong>{" "}
              watches cybersecurity across the whole country.
            </>,
            <>
              The <Strong>Saudi Central Bank (SAMA)</Strong> watches banks and
              money firms only.
            </>,
          ]}
        />
        <P>
          These two groups work independently. Their rules are not the same.
          Their checks are not the same. Passing one group&apos;s check does
          not satisfy the other.
        </P>

        <H2 id="quick-comparison">Quick Comparison: NCA ECC vs SAMA CSF</H2>
        <P>Here is a simple side-by-side view of the two rulebooks.</P>
        <DataTable
          caption="Quick comparison of NCA ECC and SAMA CSF"
          head={COMPARISON_TABLE.head}
          rows={COMPARISON_TABLE.rows}
        />

        <H2 id="nca-ecc">What Is NCA ECC?</H2>
        <P>
          NCA ECC stands for Essential Cybersecurity Controls. It sets the
          base level of cyber safety for Saudi Arabia. The National
          Cybersecurity Authority built this rule. Government offices must
          follow it. So must key infrastructure sites. Many private firms
          must follow it too.
        </P>
        <P>
          The current version is ECC-2:2024. It covers four main parts:
        </P>
        <Numbered
          items={[
            <>
              <Strong>Cybersecurity Governance</Strong> covers who is in
              charge and how risk gets managed.
            </>,
            <>
              <Strong>Cyber Defense</Strong> covers the tools that guard your
              systems.
            </>,
            <>
              <Strong>Cybersecurity Resilience</Strong> covers staying up
              when something breaks.
            </>,
            <>
              <Strong>Third-Party and Cloud Security</Strong> covers watching
              your vendors and cloud tools.
            </>,
          ]}
        />

        <H3>Other NCA Rules That May Apply</H3>
        <P>
          NCA ECC is just the start. More rules may stack on top, depending on
          what your firm does.
        </P>
        <Bullets
          items={[
            <>
              <Strong>CSCC</Strong> applies to systems marked
              &ldquo;critical.&rdquo; It needs 18 months of logs, plus
              round-the-clock monitoring, file checks, and user-behavior
              checks.
            </>,
            <>
              <Strong>CCC</Strong> applies to cloud services.
            </>,
            <>
              <Strong>OTCC</Strong> applies to factory and plant systems.
            </>,
            <>
              <Strong>DCC</Strong> applies to data protection.
            </>,
            <>
              <Strong>TCC</Strong> applies to staff who work from home.
            </>,
          ]}
        />
        <P>
          Think of ECC as the floor. Other rules stack on top when they fit
          your case.
        </P>

        <H3>What NCA ECC Says About Watching Your Systems</H3>
        <P>Control 2-12 is the big rule for security teams. It says you must:</P>
        <Bullets
          items={[
            "Use a SIEM tool to gather and check your security logs",
            "Watch your logs all the time, not just once a week",
            "Keep logs for at least 12 months — 18 months for a \"critical\" system",
          ]}
        />
        <P>
          Not sure what a SIEM is, or what one should cost?{" "}
          <Ref to="what-is-siem">Our guide breaks it down in plain words.</Ref>
        </P>

        <H3>What If You Run an MSSP?</H3>
        <P>
          An MSSP handles security for other firms. NCA has a special license
          track for this, called MSOC licensing. It splits into Tier 1 and
          Tier 2. NCA ECC is still your main rulebook.
        </P>
        <P>
          Do you run many clients on one SIEM platform?{" "}
          <Ref to="multi-tenant-siem-architecture">
            Multi-Tenant SIEM for MSSPs: A Full Guide
          </Ref>{" "}
          shows you how to keep each client&apos;s data apart, and how to keep
          your costs in check.
        </P>

        <H2 id="sama-csf">What Is SAMA CSF?</H2>
        <P>
          SAMA CSF stands for Cyber Security Framework. The Saudi Central Bank
          built it. It only applies to financial firms that SAMA watches —
          think banks, insurers, and payment firms.
        </P>

        <H3>Who Must Follow SAMA CSF?</H3>
        <P>Your firm must follow SAMA CSF if it is any of these:</P>
        <Bullets
          items={[
            "A regular or Islamic bank",
            "An insurance or reinsurance firm",
            "A financing company",
            "A payment service firm",
            "A money exchange shop",
            "A credit bureau",
            "A fintech firm with a SAMA license",
          ]}
        />
        <P>
          SAMA CSF covers your whole firm — your systems, your staff, your
          steps, and even the outside vendors you use.
        </P>

        <H3>How SAMA CSF Is Built</H3>
        <P>SAMA CSF has 4 main domains, split into 32 smaller subdomains:</P>
        <Numbered
          items={[
            <>
              <Strong>Leadership and Governance</Strong> — 7 subdomains
            </>,
            <>
              <Strong>Risk Management and Rule-Following</Strong> — 5
              subdomains
            </>,
            <>
              <Strong>Operations and Technology</Strong> — 17 subdomains, the
              biggest group
            </>,
            <>
              <Strong>Third-Party Cyber Security</Strong> — 3 subdomains
            </>,
          ]}
        />
        <P>
          Subdomain 3.14, called Cyber Security Event Management, matters most
          for security teams. It asks for:
        </P>
        <Bullets
          items={[
            "A SIEM that gathers every security event in one place",
            "A SOC team (Security Operations Center) that checks alerts and reacts around the clock",
            "Log storage that meets what the regulator expects",
          ]}
        />

        <H3>How SAMA Grades Your Cybersecurity</H3>
        <P>
          SAMA does not use a simple pass-or-fail test. It uses a six-level
          scale:
        </P>
        <DataTable
          caption="SAMA's six-level maturity scale"
          head={MATURITY_TABLE.head}
          rows={MATURITY_TABLE.rows}
        />
        <P>
          Level 3 is the lowest pass. Subdomain 3.14 is a risky area — there,
          SAMA wants Level 4, the highest bar SAMA sets for most areas.
        </P>
        <P>
          <Strong>Note:</Strong> some old sources say SAMA CSF uses four
          levels. That&apos;s out of date — the real scale has six levels now.
          Always check SAMA&apos;s own papers before you use any numbers in an
          audit.
        </P>

        <H2 id="who-needs-which">Who Needs to Follow Which Rule?</H2>
        <P>Here is the short version:</P>
        <Bullets
          items={[
            "NCA ECC applies to government offices, key infrastructure, most private Saudi firms, and licensed MSSPs",
            "SAMA CSF applies to banks, insurers, payment firms, SAMA-licensed fintechs, and their vendors",
          ]}
        />
        <P>
          Run a bank? SAMA CSF is your main rule. Run key national
          infrastructure? NCA ECC is yours. Some firms need both.
        </P>

        <H2 id="both-rules">When Do You Need to Follow Both Rules?</H2>
        <P>Two cases come up most often.</P>
        <H3>Case 1: A Money Firm With Key Infrastructure</H3>
        <P>
          A Saudi bank is still a Saudi firm. Say NCA marks one of its
          systems as &ldquo;key infrastructure.&rdquo; Then NCA ECC rules
          apply too — this sits on top of SAMA CSF.
        </P>
        <H3>Case 2: MSSPs That Serve Money Firms</H3>
        <P>
          Say you hold an NCA MSOC license, but you also serve SAMA-watched
          clients. Your platform must still meet SAMA&apos;s Subdomain 3.14.
          Your clients&apos; duties become your platform&apos;s job too.
        </P>
        <P>Plan for both rules from the start if:</P>
        <Bullets
          items={[
            "You are a money firm marked as key infrastructure",
            "You are an MSSP serving SAMA-watched clients",
          ]}
        />
        <P>
          Starting with one rule and adding the other later costs more. Gaps
          almost always show up at check time.
        </P>

        <H2 id="three-step-check">
          How to Figure Out Which Rule Applies to You
        </H2>
        <P>Work through these three steps.</P>
        <Numbered
          items={[
            <>
              <Strong>
                Step 1: Does SAMA watch your firm?
              </Strong>{" "}
              (Banks, insurers, payment firms, SAMA-licensed fintechs.) Yes →
              SAMA CSF applies, go to Step 2. No → go to Step 3.
            </>,
            <>
              <Strong>
                Step 2: Does NCA mark any of your systems as
                &ldquo;critical&rdquo;?
              </Strong>{" "}
              Yes → both NCA ECC and SAMA CSF apply, plan for both. No → SAMA
              CSF is your main rule.
            </>,
            <>
              <Strong>
                Step 3: Are you an MSSP or a security operations firm?
              </Strong>{" "}
              Yes, with SAMA-watched clients → NCA MSOC licensing covers your
              own firm, but your platform must also meet SAMA&apos;s
              Subdomain 3.14. Yes, running a general MSOC → NCA ECC applies,
              with a Tier 1 or Tier 2 MSOC license. No → NCA ECC likely
              applies if you&apos;re a Saudi firm.
            </>,
          ]}
        />
        <P>
          <Strong>Key point:</Strong> does SAMA watch you, and are you marked
          as key infrastructure too? Then plan for both rules from day one —
          fixing it later costs a lot more.
        </P>

        <H2 id="key-differences">Key Differences Between the Two Rules</H2>
        <P>
          <Strong>Different goals.</Strong> NCA ECC guards Saudi
          Arabia&apos;s national cyber safety, spanning government,
          infrastructure, and business as a whole. SAMA CSF guards the money
          system alone.
        </P>
        <P>
          <Strong>Different grading systems.</Strong> NCA ECC is pass or
          fail — you either meet the control, or you don&apos;t. SAMA CSF
          grades you on a 0-to-5 scale, with Level 3 as the lowest pass.
        </P>
        <P>
          <Strong>Different log storage rules.</Strong> NCA ECC gives you a
          fixed number: 12 months, or 18 for key systems. SAMA CSF says
          storage must &ldquo;meet regulatory expectations,&rdquo; with no
          fixed number — SAMA checks this case by case.
        </P>
        <P>
          <Strong>Vendor duty stays with you.</Strong> Both rules agree here.
          You are on the hook for what your vendors do. Handing your SIEM or
          SOC to a third party does not move that duty — it just adds one
          more relationship to manage.
        </P>

        <H2 id="common-mistakes">Common Mistakes to Dodge</H2>
        <P>
          <Strong>
            Mistake 1: Thinking &ldquo;close to finance&rdquo; means
            SAMA-watched.
          </Strong>{" "}
          Not every firm near money gets watched by SAMA. Payment gateways,
          buy-now-pay-later apps, and some lending platforms may sit outside
          SAMA&apos;s watch, unless they hold a real SAMA license. Always
          check first.
        </P>
        <P>
          <Strong>Mistake 2: Thinking one rule covers both.</Strong> There is
          no shortcut here. Passing NCA ECC does not mean you satisfy SAMA
          CSF. Passing SAMA CSF does not mean you satisfy NCA ECC. Each
          regulator checks its own rule, on its own.
        </P>
        <P>
          <Strong>Mistake 3: Thinking outsourcing removes your duty.</Strong>{" "}
          Say you hand your SIEM or SOC to a vendor. You still carry the duty
          to follow the rule. The vendor just adds one more relationship to
          manage — your duty stays the same.
        </P>

        <H2 id="security-tools">
          What Both Rules Need From Your Security Tools
        </H2>
        <P>
          Both NCA ECC and SAMA CSF need the same core things from your
          setup:
        </P>
        <Bullets
          items={[
            "A SIEM that gathers and watches your logs",
            "A SOC that reacts fast and fixes alerts",
            "Log storage you can show a regulator on request",
          ]}
        />
        <P>
          The fine print differs — NCA gives you a time limit, SAMA gives you
          a maturity score — but the core need is the same for both.
        </P>
        <P>
          The most common cost problem: many firms rent a SIEM tool that
          charges by how much data it stores. Every new client or system
          pushes the bill up. One MSSP fixed this by moving to a platform it
          fully owned. The result:{" "}
          <Ref to="siem-rent-to-owned-case-study">
            $270,000 saved over 24 months
          </Ref>
          . Of that, $110,000 was saved in year one alone.
        </P>
        <P>
          Own your SIEM, and there are no per-gigabyte fees, no vendor
          lock-in, and full control of your log storage. Weighing your
          options?{" "}
          <Ref to="open-source-vs-custom-siem">
            Open-Source vs. Custom-Built SIEM: The Real Trade-off
          </Ref>{" "}
          walks through both paths honestly.
        </P>
        <P>
          When the SIEM and SOC behind either framework are something you
          build, WhyCrew designs{" "}
          <Ref to="nca-ecc-sama-csf-compliance">
            the platform to satisfy Control 2-12 and Subdomain 3.14 directly
          </Ref>
          , owned outright at handover.
        </P>

        <H2 id="faq">Frequently Asked Questions</H2>
        <div className="mt-6">
          <FaqAccordion faqs={FAQS} columns={1} />
        </div>

        <H2 id="summary">Final Summary</H2>
        <P>Here is what matters most:</P>
        <Bullets items={SUMMARY_POINTS} />
        <P>
          Your next step: use the three-step check above to find out which
          rule fits you. Check the official NCA and SAMA papers to be sure.
          Then build your SIEM and SOC around your real needs — do it before
          you build, not after.{" "}
          <a
            href={CTA_HREF}
            target="_blank"
            rel={EXTERNAL_REL}
            className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
          >
            Book a 20-minute call
          </a>{" "}
          if you&apos;d rather run the check with us directly.
        </P>
      </ArticleShell>
    </>
  );
}
