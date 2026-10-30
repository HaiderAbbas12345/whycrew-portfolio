import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArticleShell, type TocEntry } from "@/components/blog/article-shell";
import { Bullets, DataTable, H2, P, QuickAnswer } from "@/components/blog/prose";
import { Button } from "@/components/ui/button";
import { FaqAccordion, type FaqItem } from "@/components/ui/faq";
import { breadcrumbLd, faqLd } from "@/lib/jsonld";
import { breadcrumbLabel, postBySlug, postPath } from "@/lib/blog";
import { CTA_HREF, ROBOTS, SITE } from "@/lib/site";
import { ogImage, ogImageLd } from "@/lib/og";

const post = postBySlug("msp-vs-mssp")!;
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
  { id: "key-differences", label: "What Are The Key Differences Between An MSP And An MSSP?" },
  { id: "what-does-an-msp-do", label: "What Does An MSP Do?" },
  { id: "what-does-an-mssp-do", label: "What Does An MSSP Do?" },
  { id: "how-they-work", label: "How Do MSPs And MSSPs Work Day To Day?" },
  { id: "which-model", label: "Should You Use An MSP, An MSSP, Or Both?" },
  { id: "startups-small-business", label: "MSP Vs MSSP For Startups And Small Businesses" },
  { id: "can-an-msp-be-an-mssp", label: "Can An MSP Also Be An MSSP?" },
  { id: "msp-vs-mssp-vs-mdr", label: "MSP Vs MSSP Vs MDR: Where Does MDR Fit?" },
  { id: "tools", label: "What Tools Do MSPs And MSSPs Use?" },
  { id: "why-add-an-mssp", label: "Why Do Businesses Add An MSSP On Top Of Their MSP?" },
  { id: "limitations", label: "What Are The Limitations Of MSPs And MSSPs?" },
  { id: "compliance", label: "How Do MSPs And MSSPs Share Compliance Duties?" },
  { id: "cost", label: "How Much Does An MSP Cost Compared With An MSSP?" },
  { id: "how-to-choose", label: "How Do You Choose The Right MSP Or MSSP?" },
  { id: "changes-2026", label: "What Is Changing For MSPs And MSSPs In 2026?" },
  { id: "final-thoughts", label: "Final Thoughts" },
  { id: "faq", label: "FAQs" },
];

const FAQS: FaqItem[] = [
  {
    q: "What Is The Difference Between An MSP And An MSSP?",
    a: "The difference is the job each one is paid to do. An MSP is judged on uptime and solved IT tickets, while an MSSP is judged on how fast it detects and stops attacks. MSPs employ IT generalists who work from a NOC, and MSSPs employ security analysts who staff a SOC around the clock.",
  },
  {
    q: "Is An MSSP More Expensive Than An MSP?",
    a: "Usually not per head. US MSPs commonly charge $150 to $250 per user a month for standard managed IT, while MSSP Alert's benchmark puts basic MSSP services at about $45 per endpoint a month. They cover different work, so most businesses budget for IT management and security separately.",
  },
  {
    q: "Is An MSSP Better Than An MSP?",
    a: "Neither is better, because they do different jobs. An MSP keeps IT running and an MSSP detects and stops attacks. A business with no IT staff usually needs an MSP first, while a business with IT covered but no security team gets more value from an MSSP.",
  },
  {
    q: "Do I Need Both An MSP And An MSSP?",
    a: "Many mid-size and regulated businesses use both: the MSP manages IT and fixes problems, and the MSSP watches for threats and leads the response. If you use both, put the handoffs in writing so each provider knows who detects, who contains and who fixes.",
  },
  {
    q: "Is An MSP Responsible If I Get Hacked?",
    a: "It depends on what your contract says. An MSP is usually responsible only for the security tasks written into its agreement, such as patching or endpoint protection. If 24/7 monitoring and incident response aren't listed, they're probably not covered, so get security duties in writing.",
  },
  {
    q: "Does An MSP Provide Cybersecurity?",
    a: "Most MSPs provide baseline cybersecurity, such as endpoint protection, email filtering, patching, firewalls and MFA setup. Few provide 24/7 monitoring by security analysts, threat hunting or incident response from their own SOC, which is the work an MSSP is built to do.",
  },
  {
    q: "Which Is Better For A Startup, An MSP Or An MSSP?",
    a: "Most startups should begin with an MSP to run IT and basic security. Add an MSSP, or an MSP with a strong MDR service, once you handle sensitive data, face SOC 2 or customer security reviews, or need 24/7 monitoring for cyber insurance.",
  },
  {
    q: "What Is The Difference Between A NOC And A SOC?",
    a: "A NOC (network operations center) monitors IT systems for uptime, performance and outages, and it is where MSPs work. A SOC (security operations center) monitors those systems for signs of attack and responds to threats, and it is where MSSPs work.",
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
    author: { "@id": `${SITE.url}/#organization` },
    publisher: { "@id": `${SITE.url}/#organization` },
    about: [
      { "@type": "Thing", name: "Managed service provider" },
      { "@type": "Thing", name: "Managed security service provider" },
    ],
    image: ogImageLd(PATH),
    articleSection: post.cluster,
    keywords: post.topics.join(", "),
  };
}

/* ------------------------------------------------- page-local design blocks */

const EYEBROW =
  "font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-accent";

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

/** Inline CTA card, same frame as the other MSSP posts. */
function CtaCard({
  label,
  eyebrow,
  title,
  body,
  children,
}: {
  label: string;
  eyebrow: string;
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
      <p className={EYEBROW}>{eyebrow}</p>
      <h3 className="mt-3 text-[1.4rem] font-semibold leading-tight tracking-tight text-bright">
        {title}
      </h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-body">{body}</p>
      <div className="mt-5 flex flex-wrap gap-2.5">{children}</div>
    </aside>
  );
}

/** The design's two CTA buttons: booking popup, then the SIEM service page. */
function CtaButtons({ primary }: { primary: string }) {
  return (
    <>
      <Button href={CTA_HREF}>{primary}</Button>
      <Button href="/services/custom-siem-development" variant="ghost">
        Custom SIEM Development
      </Button>
    </>
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

      <ArticleShell
        post={post}
        toc={TOC}
        tocLabel="Contents"
        tocNumbered
        tocCta={false}
        // One item, so the shell adds no "·" separators between byline items.
        byline={[
          <span key="b" className="flex flex-wrap gap-x-4 gap-y-2">
            <span>
              By <span className="font-semibold text-body">WhyCrew Engineers</span>
            </span>
            <time dateTime={post.datePublished}>Published October 28, 2026</time>
            <span>{post.readTime}</span>
          </span>,
        ]}
      >
        <div id="msp-vs-mssp-difference" className="scroll-mt-28">
          <QuickAnswer label="Quick Overview">
            An MSP (Managed Service Provider) manages a business&apos;s
            day-to-day IT, such as the help desk, devices, networks, backup and
            patching, from a network operations center (NOC). An MSSP (Managed
            Security Service Provider) focuses only on cybersecurity, monitoring
            for threats 24/7 from a security operations center (SOC) and
            investigating and stopping attacks. In short, an MSP keeps systems
            running and an MSSP keeps them secure.
          </QuickAnswer>
          <P>
            At WhyCrew, we build SIEM (security information and event
            management) and SOC platforms that MSSPs own outright, so our work
            sits right on the line where IT operations stop and security
            operations start.
          </P>
        </div>

        <H2 id="key-differences">
          What Are The Key Differences Between An MSP And An MSSP?
        </H2>
        <P>
          MSPs and MSSPs differ on almost every practical point a buyer checks,
          from staff and tools to coverage hours, contracts and pricing. The
          table below lines them up side by side.
        </P>
        <DataTable
          head={[
            "Feature",
            "MSP (Managed Service Provider)",
            "MSSP (Managed Security Service Provider)",
          ]}
          rows={[
            ["Primary goal", "Uptime, productivity and efficient IT", "Detecting and stopping threats, reducing risk"],
            ["Operations center", "NOC (network operations center)", "SOC (security operations center)"],
            ["Question it answers", "Is everything working?", "Is someone attacking us, and how fast can we stop them?"],
            ["Typical services", "Help desk, devices, patching, backup, cloud administration", "24/7 monitoring, SIEM, threat hunting, incident response, vulnerability management"],
            ["Core tools", "Remote monitoring and management (RMM), ticketing and billing (PSA), backup, endpoint protection", "SIEM, automation (SOAR), endpoint detection and response (EDR or XDR), threat intelligence, vulnerability scanners"],
            ["Security depth", "Baseline hygiene and prevention", "Continuous detection, investigation and response"],
            ["Staff", "IT generalists and system administrators", "Security analysts, threat hunters and incident responders"],
            ["Coverage hours", "Business-hours help desk, often with after-hours on-call", "Monitoring 24 hours a day, 365 days a year"],
            ["Contract focus", "Uptime and ticket response SLAs", "Detection and response SLAs, plus security-specific liability terms"],
            ["Key metrics", "Uptime, ticket response and resolution times", "Mean time to detect (MTTD), mean time to respond (MTTR) and false-positive rate"],
            ["Compliance role", "Implements controls and gathers some evidence", "Monitoring evidence, log retention, incident records and audit reports"],
            ["Pricing basis", "Per user or per device, monthly", "Per endpoint, per user or by log volume, monthly"],
            ["Best fit", "Businesses without in-house IT staff", "Businesses with IT covered but no 24/7 security team"],
          ]}
        />

        <H2 id="what-does-an-msp-do">What Does An MSP Do?</H2>
        <P>
          An MSP runs the everyday IT that a business would otherwise need its
          own IT department for. Most MSPs work on a monthly contract priced per
          user or per device, and they operate from a NOC, a team and toolset
          that tracks uptime, performance and capacity across all of their
          clients at once.
        </P>
        <P>
          The model replaced break-fix IT, where a small business called a
          technician and paid by the hour when something failed. With an MSP,
          the business pays a flat fee and the provider tries to catch problems
          before users notice them. A typical MSP contract covers:
        </P>
        <Bullets
          items={[
            "Help desk and end-user support",
            "Laptop, desktop and mobile device setup, management and patching",
            "Network, server, firewall and Wi-Fi administration",
            "Microsoft 365 or Google Workspace administration",
            "Backup and disaster recovery",
            "Cloud migration and hosting",
            "Software licensing and vendor management",
            "Baseline security, such as endpoint protection, email filtering and MFA (multi-factor authentication) setup",
          ]}
        />
        <P>
          That last item is where most of the confusion starts. Plenty of MSPs
          sell security, but it&apos;s usually security hygiene: the right tools
          installed, updated and switched on. It rarely means a trained analyst
          reviewing suspicious activity at 3 a.m. An MSP is judged on uptime and
          how quickly tickets get closed, and its staff are mostly IT
          generalists and system administrators.
        </P>

        <H2 id="what-does-an-mssp-do">What Does An MSSP Do?</H2>
        <P>
          An MSSP runs security operations for its clients: it collects security
          data, looks for signs of an attack, investigates what it finds, and
          then either contains the threat or tells the client exactly what to do
          next. That work happens in a SOC, which is staffed in shifts so
          someone is watching 24 hours a day, every day of the year.
        </P>
        <P>
          The core tool is a{" "}
          <A href="/blog/what-is-siem">
            SIEM (security information and event management) platform
          </A>
          , which pulls logs from firewalls, endpoints, cloud services and
          identity systems into one place and correlates them, so analysts can
          spot an attack that no single alert would reveal. Around the SIEM, an
          MSSP usually adds threat hunting, vulnerability management, incident
          response and compliance reporting, and many also offer penetration
          testing and a vCISO (virtual chief information security officer) for
          strategy and audits. Scope varies a lot between providers: one
          MSSP&apos;s penetration test is a hands-on attack by skilled testers,
          while another&apos;s is an automated scan, so check what each service
          actually includes. The{" "}
          <A href="/blog/what-is-an-mssp">full range of MSSP services</A> is
          wider than this comparison needs, but the common thread is detection
          and response.
        </P>
        <P>
          MSSP staff are security specialists, such as SOC analysts, threat
          hunters and incident responders, and many hold security credentials
          like CompTIA Security+, GIAC certifications or CISSP. An MSSP is
          measured on MTTD (mean time to detect) and MTTR (mean time to
          respond), not on how fast a password reset gets done.
        </P>

        <H2 id="how-they-work">How Do MSPs And MSSPs Work Day To Day?</H2>
        <P>
          MSPs work from tickets and maintenance schedules, while MSSPs work
          from alerts and investigations, and the easiest way to see the gap is
          to follow one event through both.
        </P>
        <P>
          Picture this: at 2:40 a.m. on a Sunday, an employee&apos;s Microsoft
          365 account signs in from a country the company has never done
          business in, and a few minutes later a new rule starts forwarding the
          CEO&apos;s emails to an outside address.
        </P>
        <P>
          With an MSP only, that sign-in may never reach anyone. Remote
          monitoring tools watch devices and servers, not identity logs, so the
          activity sits in a Microsoft audit log until someone looks. If the MSP
          has set up an alert, it usually lands in a ticket queue that gets
          worked on Monday morning. By then the attacker has had a full day
          inside the mailbox.
        </P>
        <P>
          With an MSSP, the SIEM links the unusual sign-in to the new forwarding
          rule and raises one high-priority incident. An analyst checks it
          within minutes. Depending on the contract, they disable the
          account&apos;s sessions and force a password reset themselves, or they
          phone the client&apos;s named contact with clear steps. The MSSP then
          writes up what happened, which matters later for insurers and
          auditors.
        </P>
        <P>
          Neither provider is failing here. Each one is doing the job it&apos;s
          paid for. The risk appears when a business assumes its MSP is also
          doing the second job. When a business has both, the MSP handles the
          cleanup after the MSSP contains the threat, such as rebuilding a
          laptop, patching a server or restoring files from backup.
        </P>

        <CtaCard
          label="For MSSPs: own your platform"
          eyebrow="Running an MSSP?"
          title="Run Your SOC On A Platform You Own."
          body="Your SIEM is the engine behind every response described above. WhyCrew builds MSSPs their own SIEM and SOC platform for a one-time, fixed price. Then we hand you full ownership, so your margins aren't tied to per-GB licensing."
        >
          <CtaButtons primary="Get a fixed-price platform estimate" />
        </CtaCard>

        <H2 id="which-model">Should You Use An MSP, An MSSP, Or Both?</H2>
        <P>
          Most growing businesses end up using both an MSP and an MSSP, but the
          right setup depends on whether you already have IT staff and how much
          risk your data carries.
        </P>
        <P>
          An MSP on its own suits a small business with no in-house IT, little
          sensitive data and no regulator asking about security monitoring. It
          gets you reliable IT and good security hygiene. It doesn&apos;t get
          you 24/7 detection, and that&apos;s a risk you accept consciously.
        </P>
        <P>
          An MSSP on its own suits a business that already runs IT internally
          but has no security team. Your IT staff handle fixes, and the MSSP
          handles watching, investigating and guiding the response.
        </P>
        <P>
          Using an MSP and an MSSP together is the most common setup for
          regulated mid-size firms. It works well when the contracts spell out
          the handoffs, and badly when they don&apos;t.
        </P>
        <P>
          An MSP that partners with an MSSP gives you one contract and one
          invoice, with the MSSP working behind the scenes, often under the
          MSP&apos;s brand. That&apos;s convenient, but ask who actually staffs
          the SOC and whether you can see its reports directly.
        </P>
        <P>
          Co-managed security suits larger firms with a few security people of
          their own. The internal team and the MSSP share the same SIEM, with
          the MSSP covering nights, weekends and overflow.
        </P>

        <H2 id="startups-small-business">
          MSP Vs MSSP For Startups And Small Businesses
        </H2>
        <P>
          Most startups and small businesses should start with an MSP, then add
          MSSP-level monitoring once they hold sensitive data, sell to larger
          customers or apply for cyber insurance.
        </P>
        <P>
          Those triggers tend to arrive together. An enterprise buyer sends a
          security questionnaire or asks for a SOC 2 report. A cyber insurance
          application asks whether you have EDR on every endpoint and someone
          monitoring it around the clock. A healthcare or fintech client asks
          you to sign a contract with security clauses. At that point, an
          MSP&apos;s baseline security usually isn&apos;t enough to answer
          &quot;yes&quot; honestly.
        </P>
        <P>
          The threat mix also favors having both jobs covered. Verizon&apos;s
          2026 Data Breach Investigations Report found that exploiting software
          vulnerabilities, at 31% of breaches, has overtaken stolen credentials
          as the top way attackers get in. Patching those vulnerabilities is MSP
          work. Noticing when one is being exploited before the patch lands is
          MSSP work.
        </P>
        <P>
          For a very small team, an MSP that bundles a reputable MDR (managed
          detection and response) service is often a sensible middle step, as
          long as the contract says who responds to an alert and how fast.
        </P>

        <H2 id="can-an-msp-be-an-mssp">Can An MSP Also Be An MSSP?</H2>
        <P>
          Yes, an MSP can also be an MSSP, but only if it runs a real security
          operation: a staffed SOC with analysts who monitor, investigate and
          respond around the clock. Selling security tools on top of an IT
          contract doesn&apos;t make an MSP an MSSP.
        </P>
        <P>
          The labels get mixed up because MSPs already sell some security tools,
          and more of them are moving deeper into security. Kaseya&apos;s 2026
          Cybersecurity Outlook found that 74% of MSPs plan to expand their
          security services to meet client demands. Some build their own SOC,
          some buy an MSSP, and many take a middle path: they add security
          assessments, a vCISO service and resold EDR or MDR without rebuilding
          the business around security operations. That middle path is where
          most of the confusion lives.
        </P>
        <P>
          To tell which kind you&apos;re dealing with, ask three questions.
          Whose analysts watch your alerts? Does that team work nights and
          weekends? Can it contain a threat, or can it only email you about one?
          An MSP with clear answers and its own staffed SOC is working as an
          MSSP too. One that points to a tool dashboard is not.
        </P>

        <H2 id="msp-vs-mssp-vs-mdr">MSP Vs MSSP Vs MDR: Where Does MDR Fit?</H2>
        <P>
          MDR (managed detection and response) is a security service, not a
          type of provider, and it focuses narrowly on finding and stopping
          active threats on endpoints, identities and cloud workloads. Both MSPs
          and MSSPs can deliver it, usually by pairing a detection platform with
          a team of analysts who can take action, such as isolating an infected
          laptop.
        </P>
        <P>
          The difference is breadth. An MSP that resells MDR adds threat
          response to an IT contract, while an MSSP typically wraps MDR inside
          wider security operations, including SIEM log collection and
          retention, firewall and network monitoring, vulnerability management
          and compliance reporting. MDR is now standard in that wider bundle:
          MSSP Alert&apos;s MSSP Benchmark Pricing Report, published in January
          2025, found that all surveyed MSSPs offer SOC services and 98% provide
          MDR.
        </P>
        <P>
          MDR on its own is strongest when the main need is stopping active
          attacks on devices and accounts. Where audit duties, many log sources
          or regulators are involved, the broader MSSP scope usually fits
          better, and the{" "}
          <A href="/blog/mdr-vs-mssp">
            technical differences between MDR and an MSSP
          </A>{" "}
          decide which one covers your gaps.
        </P>

        <H2 id="tools">What Tools Do MSPs And MSSPs Use?</H2>
        <P>
          MSPs run on tools built to manage many client environments
          efficiently, while MSSPs run on tools built to collect security data
          and find attacks in it.
        </P>
        <P>
          An MSP&apos;s core stack is an RMM (remote monitoring and management)
          platform, which lets technicians monitor, patch and script changes
          across thousands of devices, and a PSA (professional services
          automation) platform, which handles tickets, contracts and billing.
          Around those sit backup software, documentation tools and endpoint
          protection.
        </P>
        <P>
          An MSSP&apos;s core stack starts with the SIEM. Next to it usually sit{" "}
          <A href="/blog/what-is-soar">
            SOAR (security orchestration, automation and response)
          </A>{" "}
          for automated playbooks, EDR or XDR (endpoint or extended detection
          and response) for visibility and containment on devices,
          vulnerability scanners, threat intelligence feeds and a case
          management system for investigations.
        </P>

        <H2 id="why-add-an-mssp">
          Why Do Businesses Add An MSSP On Top Of Their MSP?
        </H2>
        <P>
          Businesses add an MSSP because attackers now aim at the gaps between
          IT and security, and most MSPs aren&apos;t staffed to watch those gaps
          every hour of every day.
        </P>
        <P>
          Service providers are part of the attack surface. Verizon&apos;s 2026
          Data Breach Investigations Report found that breaches involving a
          third party rose 60% in a year and now make up 48% of all breaches. In
          May 2022, CISA, the NSA, the FBI and cyber agencies in the UK,
          Australia, Canada and New Zealand issued a joint advisory (AA22-131A)
          warning that they expected malicious activity against MSPs to
          increase, because one MSP breach can spread to all of its customers.
        </P>
        <P>
          That warning wasn&apos;t theoretical. In July 2021, attackers used
          Kaseya&apos;s VSA remote management software to push ransomware
          through MSPs to their clients. Kaseya said fewer than 60 of its own
          customers were directly compromised, but the attack reached fewer than
          1,500 downstream businesses, most of which had never heard of Kaseya.
          An MSP&apos;s remote management tool can reach every client it
          manages, which is why it pays to have a separate security team
          watching what happens through it.
        </P>
        <P>
          An MSSP spreads specialist analysts and tooling across many clients.
          That&apos;s how a mid-size business gets round-the-clock security
          coverage it could never staff on its own.
        </P>

        <H2 id="limitations">What Are The Limitations Of MSPs And MSSPs?</H2>
        <P>
          Each model has a blind spot: MSPs tend to let security slip when the
          IT workload grows, and MSSPs tend to find problems they can&apos;t fix
          themselves. The table below shows where each one usually falls short
          and how to cover the gap.
        </P>
        <DataTable
          head={["Limitation", "Applies To", "What Goes Wrong", "How To Avoid It"]}
          rows={[
            ["Security loses to tickets", "MSP", "Security tasks wait behind urgent IT tickets, and alerts go to an inbox nobody owns.", "Separate security SLAs or a dedicated security provider"],
            ["Restore-first instinct", "MSP", "The help desk wipes an infected laptop to get the user working, erasing traces of how the attacker got in.", "An incident playbook that says contain and preserve evidence first"],
            ["No real overnight cover", "MSP", "Longer help desk hours or an on-call phone aren't the same as a staffed security shift.", "A staffed 24/7 rotation with authority to act"],
            ["Vague security scope", "MSP", "Security duties are never written down, which leads to disputes after a breach.", "A written list of the security work the MSP owns"],
            ["Alert-only service", "MSSP", "The MSSP spots an intrusion, then waits for your team to act.", "Contract terms that allow containment, such as disabling accounts"],
            ["Can't fix what it finds", "MSSP", "Without admin rights, the MSSP can't rebuild machines or change settings.", "A defined handoff to your MSP or IT team with response times"],
            ["Missing log sources", "MSSP", "Onboarding can take weeks, and any source never connected is invisible to the SOC.", "An agreed log source list, checked at onboarding"],
            ["Gaps between providers", "Both", "Each provider assumes the other owns a task, so incidents fall between them.", "A responsibility matrix naming the owner of each step"],
          ]}
        />
        <P>
          Vague scope can end up in court. In 2024, MSSP Alert reported that a
          California law firm had sued its MSP for more than $1 million after a
          ransomware attack, and the complaint said the two sides had only a
          verbal agreement about what the MSP would do.
        </P>

        <H2 id="compliance">How Do MSPs And MSSPs Share Compliance Duties?</H2>
        <P>
          US regulators hold the business itself responsible for security, but
          most frameworks also pull its MSP and MSSP into scope, so your
          contracts need to say which provider owns which control.
        </P>
        <Bullets
          items={[
            "HIPAA treats any MSP or MSSP that handles electronic protected health information as a business associate, which must sign a business associate agreement (BAA).",
            "The FTC Safeguards Rule requires covered financial firms to choose capable service providers, bind them to safeguards by contract and assess them periodically (16 CFR 314.4(f)).",
            "PCI DSS v4.0.1 requirement 12.8.5 asks merchants to record which requirements each service provider manages, which they manage and which are shared.",
            "The CMMC program rule treats an MSP or MSSP that holds controlled unclassified information or security logs as an external service provider inside the assessment scope.",
          ]}
        />
        <P>
          All four point to the same document: one written responsibility
          matrix covering you, your MSP and your MSSP.
        </P>

        <H2 id="cost">How Much Does An MSP Cost Compared With An MSSP?</H2>
        <P>
          An MSP usually costs more per user than an MSSP because it covers far
          more day-to-day work, but the two prices buy different things, so one
          can&apos;t stand in for the other.
        </P>
        <P>
          For managed IT, Infiterra&apos;s October 2026 review of price lists
          published by US MSPs puts standard plans at $150 to $250 per user a
          month, with plans that add advanced security or hosting reaching $400.
          For managed security, MSSP Alert&apos;s MSSP Benchmark Pricing Report
          found an average of $45 per endpoint a month for basic services and
          $73 for premium services, though real{" "}
          <A href="/blog/mssp-pricing">MSSP pricing</A> swings widely with log
          volume, coverage hours and whether response is included.
        </P>
        <P>
          A big share of an MSSP&apos;s cost sits in its SIEM, and many SIEM
          vendors charge by how much log data you send in. That&apos;s why MSSP
          quotes can jump when you add cloud or firewall logs, and it&apos;s
          worth understanding{" "}
          <A href="/blog/siem-cost-licensing-vs-custom-built">
            how SIEM licensing shapes those prices
          </A>{" "}
          before you compare quotes.
        </P>

        <CtaCard
          label="For MSSPs: SIEM licensing"
          eyebrow="For MSSPs"
          title="Stop Renting The SIEM Your Margins Depend On."
          body="If SIEM licensing eats into what you charge per endpoint, you can own the platform instead. WhyCrew builds it for a fixed, one-time fee and hands it over to your team."
        >
          <CtaButtons primary="Talk to an engineer" />
        </CtaCard>

        <H2 id="how-to-choose">How Do You Choose The Right MSP Or MSSP?</H2>
        <P>
          Once you know which model you need, choose the provider by testing
          what it actually does, not what it calls itself.
        </P>
        <P>
          When you compare providers, ask questions that labels can&apos;t
          dodge. Start with who staffs the SOC and where. MSSP Alert&apos;s 2025
          Top 250 research found that 78% of participating MSSPs ran their SOCs
          entirely in-house, so a provider that outsources its own monitoring
          should be able to explain why. Get response times in writing for each
          severity level, along with what the provider may do without calling
          you first.
        </P>
        <P>
          Don&apos;t rely on the label. No license or certification legally
          defines an MSSP in the US, so ask for evidence about the
          provider&apos;s own security instead, such as a SOC 2 Type II report
          or ISO 27001 certification, and read the contract for what it commits
          to and what liability it accepts.
        </P>
        <P>
          Then look at the data and the handoffs. Ask who owns your logs, how
          long they&apos;re kept, and how you get them back if you leave. Ask
          for the responsibility matrix described above, filled in for your
          environment. Finally, check that both providers carry cyber liability
          insurance and that your own insurer accepts their setup.
        </P>
        <P>
          A provider that answers these clearly, in writing, is usually a safer
          choice than one with a longer service list.
        </P>

        <H2 id="changes-2026">What Is Changing For MSPs And MSSPs In 2026?</H2>
        <P>
          In 2026, faster attacks and shifting US rules are the two biggest
          changes for anyone buying from an MSP or MSSP.
        </P>
        <P>
          Attacks are getting faster: IBM&apos;s 2026 Cost of a Data Breach
          Report found that AI-driven attacks rose 56% year over year. US rules
          are also moving. The Department of War suspended CMMC Phase 2, which
          would have required third-party Level 2 assessments from November 10,
          2026, and no new date had been announced as of late October 2026.
          HHS&apos;s overhaul of the HIPAA Security Rule, proposed in January
          2025, now has a July 2027 target for final action. Neither change
          removes the duty to protect data or to keep track of what your
          providers do.
        </P>

        <H2 id="final-thoughts">Final Thoughts</H2>
        <P>
          An MSP keeps your technology running, and an MSSP keeps it from being
          turned against you. If you have no IT team, an MSP comes first. If you
          hold sensitive data, answer to a regulator or need 24/7 detection, you
          need MSSP-level security as well, whether it comes from a separate
          MSSP, a co-managed setup or an MSP with a real SOC behind it.
        </P>
        <P>
          Whatever you choose, get the split in writing: who detects, who
          contains, who fixes, how fast, and who owns the logs. That one
          document prevents most of the gaps described above.
        </P>

        <CtaCard
          label="Build with WhyCrew"
          eyebrow="Build with WhyCrew"
          title="Own Your SIEM And SOC Platform Outright."
          body="Tell us how many clients and how much log data you handle. We'll scope a custom SIEM and SOC build with one fixed price and full ownership at handover."
        >
          <CtaButtons primary="Book a Call" />
        </CtaCard>

        <H2 id="faq">FAQs</H2>
        <div className="mt-6">
          <FaqAccordion faqs={FAQS} columns={1} />
        </div>
      </ArticleShell>
    </>
  );
}
