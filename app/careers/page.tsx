import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact-form";
import { Backdrop } from "@/components/ui/backdrop";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/ui/faq";
import {
  Breadcrumb,
  Card,
  CheckList,
  Eyebrow,
  Heading,
  Section,
} from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem, WordsUp } from "@/components/motion";
import { breadcrumbLd, faqLd, type Faq } from "@/lib/jsonld";
import { OG_IMAGE, SITE } from "@/lib/site";

const TITLE = "Careers at WhyCrew — Engineering Roles, No Sales Team";
const DESCRIPTION =
  "Build custom SIEM platforms, AI SOC agents, and compliance automation that clients own outright. Remote-first engineering roles at WhyCrew — apply directly to an engineer.";

export const metadata: Metadata = {
  // `absolute` bypasses the root layout's "%s | WhyCrew" template — the brand
  // is already in the string.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/careers" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE.url}/careers`,
    type: "website",
    images: OG_IMAGE,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

/**
 * Open roles.
 * ---------------------------------------------------------------------------
 * Empty on purpose — there is no signed-off listing to publish yet, and an
 * invented one would be worse than none. Add an entry and the listings section
 * replaces the open-application state automatically:
 *
 *   { title: "Senior Detection Engineer", location: "Remote — EU",
 *     type: "Full-time", summary: "..." }
 *
 * Deliberately NOT emitting JobPosting JSON-LD until a real listing exists:
 * Google requires a genuine title, description, hiringOrganization, location
 * and posting date, and penalises listings whose markup does not match the
 * page.
 */
interface Role {
  title: string;
  location: string;
  type: string;
  summary: string;
}

const OPEN_ROLES: Role[] = [];

const DISCIPLINES = [
  {
    title: "Platform Engineering",
    body: "Multi-tenant data lake architecture on Elasticsearch, OpenSearch, and Wazuh. Detection engines, ingestion pipelines, and zero-downtime migrations off Splunk, Sentinel, and QRadar.",
  },
  {
    title: "Detection & SOAR",
    body: "Detection content mapped to MITRE ATT&CK, SOAR playbook development, and alert triage automation built around how analysts actually work.",
  },
  {
    title: "Applied AI",
    body: "Private LLM agents — Llama 3, Mistral — deployed inside a client's perimeter. Fine-tuning, evaluation, and the human-review gates that keep high-severity cases with a person.",
  },
  {
    title: "Compliance Engineering",
    body: "Turning NIS2 and DORA obligations into running systems: incident reporting windows, ICT risk workflows, third-party risk, and audit evidence that survives supervisory review.",
  },
];

const WHAT_WE_LOOK_FOR = [
  "You have shipped something to production that other people depend on",
  "You can explain a technical trade-off to someone who is not an engineer",
  "You are comfortable writing the documentation and the runbook, not just the code",
  "You would rather hand a client something they own than something they rent",
];

const HOW_WE_WORK = [
  {
    title: "Remote-first, EU-anchored",
    body: "Primary engineering hub in the EU with global delivery. Where a client's data residency requires in-region work, that is planned into the engagement rather than improvised.",
  },
  {
    title: "Fixed scope, fixed timeline",
    body: "Engagements are scoped and priced up front. That discipline runs inward too — projects have an end, and handover is the goal rather than a renewal.",
  },
  {
    title: "You talk to clients",
    body: "There is no sales layer between engineering and the people using what you build. Every inquiry reaches an engineer, which means engineers hear the requirements first-hand.",
  },
];

const FAQS: Faq[] = [
  {
    q: "Does WhyCrew hire for sales roles?",
    a: "No. We don't have a sales team, so there is nothing to hire for. Every inquiry that reaches WhyCrew is answered by an engineer, and that is a deliberate choice rather than a staffing gap.",
  },
  {
    q: "Are roles remote?",
    a: "Delivery is remote-first, anchored on an EU engineering hub with global delivery for clients outside the EU. Some client engagements carry data-residency requirements that shape where specific work happens; that is scoped per engagement.",
  },
  {
    q: "What happens after I apply?",
    a: "The form on this page reaches the same inbox as every other WhyCrew inquiry, and it is read by an engineer rather than screened by an applicant tracking system. General inquiries get a reply within one business day.",
  },
  {
    q: "Can I apply without a specific role being listed?",
    a: "Yes — that is what this page is for when no listing is open. Tell us which of the four disciplines below matches what you do and what you have shipped, and it goes to the engineering team directly.",
  },
];

export default function CareersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Careers", path: "/careers" },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(FAQS)) }}
      />

      {/* ============================================ HERO */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
        <Backdrop />
        <div className="container-page">
          <Breadcrumb
            trail={[
              { name: "Home", path: "/" },
              { name: "Careers", path: "/careers" },
            ]}
          />
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
            <WordsUp text="Engineering roles." delay={0.12} />{" "}
            <WordsUp text="No sales roles." delay={0.38} gradient />
          </h1>
          <Reveal delay={0.6} mount>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-body">
              We build security platforms that clients own outright — source
              code, infrastructure, and roadmap all transfer at handover. That
              only works if the people building them can scope a system, ship
              it, document it, and explain it. If that is the work you want,
              this is the page.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================ OPEN ROLES */}
      <Section id="open-roles">
        <Eyebrow>Open roles</Eyebrow>
        {OPEN_ROLES.length > 0 ? (
          <>
            <Heading sub="Every listing below is a role we are actively hiring into.">
              Currently hiring
            </Heading>
            <Stagger className="mt-12 grid gap-5">
              {OPEN_ROLES.map((r) => (
                <StaggerItem key={r.title}>
                  <Card className="group p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <h3 className="text-xl font-semibold leading-snug transition-colors duration-400 group-hover:text-accent-hi">
                        {r.title}
                      </h3>
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                        {r.location} / {r.type}
                      </p>
                    </div>
                    <p className="mt-5 max-w-3xl text-[13.5px] leading-relaxed text-muted">
                      {r.summary}
                    </p>
                    <div className="mt-7">
                      <Button href="#apply" variant="quiet">
                        Apply for this role
                      </Button>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </>
        ) : (
          <>
            <Heading sub="We're not advertising a specific listing at the moment. Applications are still read — by an engineer, not an applicant tracking system.">
              Open application
            </Heading>
            <Reveal className="mt-10">
              <Card className="p-8 sm:p-10" interactive={false}>
                <p className="max-w-2xl text-[14.5px] leading-relaxed text-body">
                  Tell us which of the four disciplines below matches what you
                  do, and what you have actually shipped. Skip the cover
                  letter. A link to something you built is worth more than a
                  page describing it.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="#apply">Send an Open Application</Button>
                  <Button href="/services" variant="ghost">
                    See What We Build
                  </Button>
                </div>
              </Card>
            </Reveal>
          </>
        )}
      </Section>

      {/* ============================================ DISCIPLINES */}
      <Section className="border-y border-line/40 bg-ink/40">
        <Eyebrow>What you&apos;d work on</Eyebrow>
        <Heading sub="Four disciplines, mapped to the four things WhyCrew builds. Most engineers here work across two of them rather than staying inside one.">
          The work itself
        </Heading>
        <Stagger className="mt-12 grid gap-5 lg:grid-cols-2">
          {DISCIPLINES.map((d) => (
            <StaggerItem key={d.title}>
              <Card className="group h-full p-8">
                <h3 className="text-lg font-semibold leading-snug transition-colors duration-400 group-hover:text-accent-hi">
                  {d.title}
                </h3>
                <p className="mt-4 text-[13.5px] leading-relaxed text-muted">
                  {d.body}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ============================================ HOW WE WORK */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <Eyebrow>How we work</Eyebrow>
            <Heading sub="The same things that make the client engagements work make the job work.">
              No pitch, no pipeline
            </Heading>
          </div>
          <Stagger className="space-y-5">
            {HOW_WE_WORK.map((h) => (
              <StaggerItem key={h.title}>
                <Card className="p-7">
                  <h3 className="text-[15px] font-semibold leading-snug">
                    {h.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                    {h.body}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal className="mt-16">
          <Card className="p-8 sm:p-10" interactive={false}>
            <h3 className="text-lg font-semibold">What we look for</h3>
            <div className="mt-6">
              <CheckList items={WHAT_WE_LOOK_FOR} />
            </div>
          </Card>
        </Reveal>
      </Section>

      {/* ============================================ APPLY */}
      <Section id="apply" className="border-y border-line/40 bg-ink/40">
        <Backdrop variant="section" />
        <Eyebrow>Apply</Eyebrow>
        <Heading sub="This is the same form the rest of the site uses, pre-routed to the engineering team. Put your portfolio, repo, or writing in the message field.">
          Send it to an engineer
        </Heading>
        <Reveal className="mt-10">
          <Suspense
            fallback={
              <div className="h-[32rem] animate-pulse rounded-lg border border-line/70 bg-surface/40" />
            }
          >
            <ContactForm defaultInterest="Careers" />
          </Suspense>
        </Reveal>
      </Section>

      {/* ============================================ FAQ */}
      <Section id="faq">
        <Eyebrow>Frequently asked questions</Eyebrow>
        <Heading>Before you apply</Heading>
        <div className="mt-10">
          <FaqAccordion faqs={FAQS} columns={1} />
        </div>
      </Section>
    </>
  );
}
