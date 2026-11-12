import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArticleShell, type TocEntry } from "@/components/blog/article-shell";
import { Bullets, DataTable, H2, H3, Numbered, P } from "@/components/blog/prose";
import { Button } from "@/components/ui/button";
import { FaqAccordion, type FaqItem } from "@/components/ui/faq";
import { breadcrumbLd, faqLd } from "@/lib/jsonld";
import { breadcrumbLabel, postBySlug, postPath } from "@/lib/blog";
import { ROBOTS, SITE } from "@/lib/site";
import { ogImage, ogImageLd } from "@/lib/og";
import { authorLd } from "@/lib/authors";

const post = postBySlug("mssp-vs-soar")!;
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
  { id: "what-is-an-mssp", label: "What Is An MSSP?" },
  { id: "what-is-soar", label: "What Is SOAR?" },
  { id: "key-difference", label: "SOAR Vs MSSP: What Is The Key Difference?" },
  { id: "how-it-works", label: "How Does SOAR Work Compared With An MSSP?" },
  { id: "how-mssps-use-soar", label: "How Do MSSPs Use SOAR?" },
  { id: "when-soar", label: "When Does SOAR Make More Sense?" },
  { id: "when-mssp", label: "When Does An MSSP Make More Sense?" },
  { id: "limits", label: "What Are The Limits Of SOAR And MSSPs?" },
  { id: "cost", label: "How Much Do SOAR And An MSSP Cost?" },
  { id: "final-thoughts", label: "Final Thoughts" },
  { id: "faq", label: "Frequently Asked Questions" },
];

const FAQS: FaqItem[] = [
  {
    q: "What Is The Difference Between MSSP And SOAR?",
    a: "An MSSP is an outsourced security team that monitors and responds to threats for you, while SOAR is software your own analysts use to automate security workflows and incident response. Many MSSPs run SOAR inside their service, so the two often work together.",
  },
  {
    q: "What Does MSSP Stand For?",
    a: "MSSP stands for Managed Security Service Provider, a company that monitors and manages security for other organizations under contract. Most run a 24/7 SOC that serves many clients at once.",
  },
  {
    q: "What Does SOAR Stand For?",
    a: "SOAR stands for Security Orchestration, Automation, and Response. It is software that connects security tools and runs playbooks to automate alert handling and incident response.",
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
      { "@type": "Thing", name: "Security orchestration, automation and response" },
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
          An MSSP (Managed Security Service Provider) is an outsourced company
          that provides security monitoring, operations and staffing for your
          business, whereas SOAR (Security Orchestration, Automation, and
          Response) is software that automates security workflows, triages
          alerts and coordinates incident response for your own team. In short,
          an MSSP is a service you hire and SOAR is a tool you run.
        </P>
        <P>
          Plenty of MSSPs run SOAR in their own operations. For most buyers
          weighing MSSP vs SOAR, then, the real decision is whether to build and
          staff automation yourself or pay a team that already has it.
        </P>

        <H2 id="what-is-an-mssp">What Is An MSSP?</H2>
        <P>
          An <A href="/blog/what-is-an-mssp">MSSP</A> is a third-party company
          that takes over an agreed part of your security operations. Its
          analysts watch your environment from the provider&apos;s SOC
          (security operations center), a team that monitors threats around the
          clock for many clients at once.
        </P>
        <P>A typical MSSP contract covers:</P>
        <Bullets
          items={[
            "24/7 monitoring of logs, endpoints and network alerts",
            "Alert triage and investigation by the provider's analysts",
            "Incident response, from a phone call to full containment",
            "Reporting for your team, auditors or leadership",
          ]}
        />
        <P>
          Scope varies a lot. Some providers only monitor and send you a ticket.
          Others will isolate a laptop or block an IP address without asking,
          because the contract gives them that authority.
        </P>

        <H2 id="what-is-soar">What Is SOAR?</H2>
        <P>
          <A href="/blog/what-is-soar">SOAR</A> is security software that pulls
          in alerts from your other tools, adds context and runs prebuilt
          workflows called{" "}
          <A href="/blog/soar-playbooks-explained">SOAR playbooks</A> to handle
          them. It connects to tools you already run, such as your SIEM
          (security information and event management, the system that collects
          logs and raises alerts) and EDR (endpoint detection and response)
          agent.
        </P>
        <P>Each part of the name is a separate job:</P>
        <Bullets
          items={[
            "Orchestration: connecting your security tools through their APIs",
            "Automation: running playbook steps without a person clicking through them",
            "Response: case management and containment actions at the end",
          ]}
        />
        <P>
          A phishing playbook, for example, pulls the email headers, checks the
          links against threat intelligence, searches other mailboxes for copies
          and deletes them if the verdict is malicious.
        </P>

        <H2 id="key-difference">SOAR Vs MSSP: What Is The Key Difference?</H2>
        <P>
          The key difference is that SOAR is a tool your own team operates,
          while an MSSP is a team that operates security for you, often with
          SOAR running behind the scenes. Here&apos;s how the two compare side
          by side.
        </P>
        <DataTable
          head={["Factor", "SOAR", "MSSP"]}
          rows={[
            ["What it is", "Software platform", "Outsourced service and team"],
            ["Who operates it", "Your analysts and engineers", "The provider's analysts"],
            ["Main job", "Speeds up and standardizes response", "Adds people and hours"],
            ["24/7 coverage", "Playbooks run 24/7; humans only if you staff nights", "Included when the contract says so"],
            ["Judgment calls", "Escalated to your team", "Made by the provider within agreed limits"],
            ["Customization", "High, if you can build it", "Limited to the provider's service catalog"],
            ["Cost model", "License plus engineering and analyst time", "Recurring fee by devices, users, data or hours"],
            ["Biggest risk", "Playbooks break and nobody fixes them", "Generic tuning and limited visibility"],
            ["Best fit", "Companies with a working SOC", "Companies without a full security team"],
          ]}
        />
        <P>
          The row that matters most is judgment calls. If a playbook misfires
          and locks out your CFO, that&apos;s your problem to fix. If an MSSP
          misses an alert, it&apos;s the provider&apos;s problem, up to whatever
          the SLA (service level agreement) says. In short, SOAR buys speed and
          control, and an MSSP buys people and hours.
        </P>

        <H2 id="how-it-works">How Does SOAR Work Compared With An MSSP?</H2>
        <P>
          SOAR and an MSSP both start from an alert. They split at the moment
          someone has to decide what the alert means and what to do about it.
          Take a sign-in from an unfamiliar country at 2 a.m.
        </P>

        <H3>How SOAR Handles It</H3>
        <Numbered
          items={[
            "Your SIEM raises the alert.",
            "The playbook checks the IP's reputation and the user's recent sign-ins.",
            "If the rules allow, it forces a password reset and opens a case.",
            "Your analyst reviews it in the morning, or gets paged if the playbook escalates.",
          ]}
        />

        <H3>How An MSSP Handles It</H3>
        <Numbered
          items={[
            "The alert lands in the provider's queue.",
            "An on-shift analyst investigates, often using the provider's own SOAR for lookups.",
            "The analyst follows the contract: call you, contain the account or log it for the monthly report.",
          ]}
        />

        <H3>Who Owns Each Step</H3>
        <P>
          The technical steps barely change. Ownership does, and these questions
          show which model you&apos;re in:
        </P>
        <Bullets
          items={[
            "Who writes and maintains the playbooks",
            "Who is awake when the alert fires",
            "Who decides an alert is a real incident",
            "Who is allowed to contain it without asking",
            "Who answers for an alert that got missed",
          ]}
        />
        <P>
          With SOAR, every answer is your own team. With an MSSP, most move to
          the provider, and the contract and SLA say which ones.
        </P>

        <CtaCard
          label="Build with WhyCrew"
          title="Running A SOC For Many Clients? Own Your SIEM"
          body="WhyCrew builds custom SIEM platforms for MSSPs, with multi-tenant separation and SOAR automation built in. One fixed price, full ownership and no per-GB license."
        >
          <Button href="/contact">Talk to an engineer</Button>
          <Button href="/services/custom-siem-development" variant="ghost">
            Custom SIEM Development
          </Button>
        </CtaCard>

        <H2 id="how-mssps-use-soar">How Do MSSPs Use SOAR?</H2>
        <P>
          MSSPs use SOAR internally to triage and enrich alerts across many
          client environments without hiring one analyst per client. So the two
          often work together, with SOAR running inside the service you hire.
        </P>

        <H3>What The Survey Data Shows</H3>
        <P>
          In D3 Security&apos;s 2024 MSSP Survey, SOAR was the most common
          primary automation tool among providers:
        </P>
        <Bullets
          items={[
            "SOAR: 33%",
            "ITSM (IT service management) platforms: 29%",
            "XDR (extended detection and response): 20%",
          ]}
        />
        <P>
          D3 sells SOAR, so read the ranking with that in mind. The ITSM figure
          shows many providers still automate through their ticketing system.
        </P>

        <H3>Why Multi-Tenant SOAR Is Harder</H3>
        <P>
          An MSSP needs SOAR that runs for many clients at once while keeping
          each client&apos;s tools, credentials and case data separate.
          IBM&apos;s QRadar SOAR, for example, sells this as a separately
          licensed MSSP add-on that gives each client its own child
          organization.
        </P>

        <H2 id="when-soar">When Does SOAR Make More Sense?</H2>
        <P>
          SOAR makes more sense when you already have a security team and the
          problem is volume, not coverage. It&apos;s a good fit if:
        </P>
        <Bullets
          items={[
            "You have analysts, and they spend most of the shift on repeat alerts",
            "Someone on the team can build and maintain integrations",
            "Your top alert types follow the same steps every time, such as phishing triage, IOC (indicator of compromise) lookups and user disables",
            "You need custom response rules, like a set approval chain before any server is isolated",
          ]}
        />
        <P>
          If nobody owns playbook upkeep, skip it. Vendor APIs change,
          connectors quietly stop returning data, and a playbook that worked in
          March can be enriching alerts with nothing by June.
        </P>

        <H2 id="when-mssp">When Does An MSSP Make More Sense?</H2>
        <P>
          An MSSP makes more sense when the problem is coverage, not volume.
          It&apos;s a good fit if:
        </P>
        <Bullets
          items={[
            "You don't have a security team, or it's one or two people",
            "Nobody watches your environment at night or on weekends",
            "You can't hire the skills you need",
            "You want specialist work, such as threat hunting, without building it in-house",
          ]}
        />
        <P>
          Hiring is usually the blocker. In ISC2&apos;s 2025 Cybersecurity
          Workforce Study, 88% of respondents said their organization had at
          least one significant security consequence in the past year because of
          a skills shortage.
        </P>

        <H3>What About Small Businesses?</H3>
        <P>
          For most small businesses, an MSSP is the practical starting point.
          SOAR assumes a SOC, and a 40-person company doesn&apos;t have one.
        </P>

        <H3>Can You Use Both?</H3>
        <P>
          Yes. Larger companies often run their own SOAR during business hours
          and use an MSSP for overnight coverage or specialist work. This
          co-managed model works best when both sides agree in writing who can
          change which playbooks.
        </P>

        <H2 id="limits">What Are The Limits Of SOAR And MSSPs?</H2>
        <P>
          Both models have gaps, and they sit in different places. SOAR is
          limited by what someone predicted. An MSSP is limited by what it knows
          about your business.
        </P>

        <H3>Limits Of SOAR</H3>
        <Bullets
          items={[
            "It only handles what a playbook anticipated; new attack techniques get escalated to a human",
            "Every integration depends on another vendor's API staying stable",
            "It needs an owner, or playbooks go stale",
          ]}
        />

        <H3>Limits Of An MSSP</H3>
        <Bullets
          items={[
            "Less context: the provider doesn't know your finance director travels every quarter",
            "Less visibility if you can't see its playbooks or why an alert was closed",
            "Response authority may be limited to monitoring and notification",
            "Early months tend to be noisy while tuning catches up",
          ]}
        />
        <P>
          Response authority is the limit buyers find out about too late. Get
          containment rights, and the conditions for using them, into the
          contract before you need them.
        </P>

        <H2 id="cost">How Much Do SOAR And An MSSP Cost?</H2>
        <P>
          SOAR costs a license plus the people who build and maintain it, while
          an MSSP costs a recurring fee, with{" "}
          <A href="/blog/mssp-pricing">MSSP pricing</A> usually set by devices,
          users, log volume or coverage hours. Comparing a SOAR license to an
          MSSP invoice is a common budgeting mistake, because the license is the
          small part.
        </P>
        <DataTable
          head={["Cost driver", "SOAR", "MSSP"]}
          rows={[
            ["Main expense", "License plus your own staff", "Monthly or annual service fee"],
            ["Setup work", "Integrations and playbook building", "Onboarding your log sources and tools"],
            ["Ongoing work", "Playbook and connector maintenance", "Contract reviews and tuning requests"],
            ["24/7 coverage", "You staff it", "Included if the contract says so"],
          ]}
        />

        <H3>The Staffing Math</H3>
        <P>
          A 24/7 analyst seat is 168 hours a week. At 40 hours per analyst,
          that&apos;s 4.2 people before vacation, sick days or training. The
          Bureau of Labor Statistics puts the median annual wage for information
          security analysts at $129,180 (May 2025), so one seat costs about
          $542,600 a year in base pay alone.
        </P>
        <P>SOAR can shrink how many seats you need. It doesn&apos;t remove them.</P>

        <H3>What Automation Saves</H3>
        <P>
          IBM&apos;s 2026 Cost of a Data Breach Report found that organizations
          making extensive use of security AI and automation saved $1.93 million
          per breach compared with organizations using none. That saving applies
          whether the automation runs in your SOC or your provider&apos;s.
        </P>

        <CtaCard
          label="Custom SIEM development"
          title="Stop Your SIEM Bill Growing With Every MSSP Client"
          body="Per-GB SIEM licensing rises with every tenant you sign. WhyCrew builds your MSSP its own SIEM for a one-time fixed price, so new clients don't add license fees."
        >
          <Button href="/contact">Get a fixed-price estimate</Button>
          <Button href="/services/custom-siem-development" variant="ghost">
            Custom SIEM Platform
          </Button>
        </CtaCard>

        <H2 id="final-thoughts">Final Thoughts</H2>
        <P>
          Most MSSP vs SOAR decisions come down to who is watching at night. If
          you have no security team, start with an MSSP and ask to see how it
          automates. If you have a SOC that&apos;s drowning in repeat alerts,
          SOAR will help more than another outside contract. If you have a SOC
          that can&apos;t cover nights, a co-managed setup gives you both.
        </P>
        <P>
          If you run an MSSP yourself, the same split applies inside your own
          SOC: SOAR handles the repeat work, and analysts handle the judgment
          calls.
        </P>

        <CtaCard
          label="Build with WhyCrew"
          title="Build The Multi-Tenant SIEM Your MSSP Owns"
          body="Tell us your tenant count and daily log volume. We'll quote a fixed price to build your MSSP's SIEM and hand over the code, infrastructure and documentation."
        >
          <Button href="/contact">Book a call</Button>
          <Button href="/services/custom-siem-development" variant="ghost">
            Custom SIEM development
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
