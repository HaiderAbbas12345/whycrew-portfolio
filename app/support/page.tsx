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
import { OG_IMAGE, SERVICES, SITE } from "@/lib/site";

const TITLE = "Client Support — WhyCrew Platform Support & Incident Line";
const DESCRIPTION =
  "Support for teams running a WhyCrew-built platform. Report a security incident on the 24/7 line, or raise an upgrade, tuning, or runbook request with the engineers who built it.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/support" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE.url}/support`,
    type: "website",
    images: OG_IMAGE,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const CHANNELS = [
  {
    title: "Report a Security Incident",
    body: "Active breach or urgent incident on a WhyCrew-built platform. Monitored 24/7 and answered by an engineer. Do not use the general form below for this.",
    cta: SITE.incidentEmail,
    href: `mailto:${SITE.incidentEmail}`,
    tone: "danger" as const,
  },
  {
    title: "Platform Support Request",
    body: "Upgrades, detection tuning, a runbook question, a new integration, or anything else about a platform we built. Goes to the engineering team, not a ticket queue.",
    cta: "Open a Support Request",
    href: "#request",
    tone: "default" as const,
  },
  {
    title: "General Inquiry",
    body: "Not a client yet, or asking about a new engagement rather than an existing platform. The main contact page routes those.",
    cta: "Go to Contact",
    href: "/contact",
    tone: "default" as const,
  },
];

const INCLUDE = [
  "Which platform or environment the issue affects",
  "What you expected to happen, and what happened instead",
  "When it started, and whether anything changed around that time",
  "Relevant log lines, alert IDs, or playbook names — redacted as your policy requires",
  "How urgent it is for you, in your own words",
];

const SCOPE = [
  {
    title: "Covered by an optional retainer",
    body: "Version upgrades, detection tuning, new SOAR playbooks, additional integrations, and engineering support on a running platform. Optional means optional — the platform, infrastructure, and roadmap are yours from day one, with no mandatory ongoing fees.",
  },
  {
    title: "Yours to run without us",
    body: "Every engagement hands over source code, infrastructure, API documentation, runbooks, and hands-on training. Your team can operate and extend the platform entirely in-house, and plenty do.",
  },
  {
    title: "Not offered standalone",
    body: "Emergency incident response is available to existing clients running a platform we built. It isn't offered as a first-time, standalone engagement — we can't respond well inside an environment we've never seen.",
  },
];

const FAQS: Faq[] = [
  {
    q: "Who can use WhyCrew support?",
    a: "Teams running a platform WhyCrew built. The 24/7 incident line and platform support requests are both for existing clients. If you're evaluating a new engagement, the contact page is the right route.",
  },
  {
    q: "How fast will someone respond?",
    a: "The incident line is monitored 24/7. General inquiries and platform support requests get a reply within one business day, from an engineer rather than a first-line agent.",
  },
  {
    q: "Do I need a support contract to get help?",
    a: "No. An optional retainer covers upgrades, detection tuning, and ongoing engineering support, but there are no mandatory ongoing fees and no contract you're required to sign to keep running the platform.",
  },
  {
    q: "What if we want to take support fully in-house?",
    a: "That's the intended end state. Handover includes source code, infrastructure, API documentation, runbooks, and training specifically so your team can run and extend the platform without us.",
  },
  {
    q: "Can you support a platform WhyCrew didn't build?",
    a: "Not as a support engagement. What we can do is assess it — a migration or architecture review is a normal starting point, and that route runs through the contact page.",
  },
];

export default function SupportPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Support", path: "/support" },
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
              { name: "Support", path: "/support" },
            ]}
          />
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
            <WordsUp text="Support from the people" delay={0.12} />{" "}
            <WordsUp text="who built it." delay={0.42} gradient />
          </h1>
          <Reveal delay={0.65} mount>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-body">
              You own the platform. That doesn&apos;t mean you&apos;re on your
              own with it. Support requests reach the engineers who designed
              your environment — there is no first-line tier reading from a
              script, because there is no first-line tier.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================ CHANNELS */}
      <Section id="channels">
        <Eyebrow>Where to send it</Eyebrow>
        <Heading sub="Three routes. Picking the right one is the fastest way to get an answer.">
          Pick the right channel
        </Heading>
        <Stagger className="mt-12 grid gap-5 lg:grid-cols-3">
          {CHANNELS.map((c) => {
            const danger = c.tone === "danger";
            return (
              <StaggerItem key={c.title}>
                <Card
                  className={`group flex h-full flex-col p-8 ${
                    danger ? "border-danger/35" : ""
                  }`}
                >
                  <h3
                    className={`text-lg font-semibold leading-snug ${
                      danger ? "text-danger" : ""
                    }`}
                  >
                    {c.title}
                  </h3>
                  <p className="mt-4 flex-1 text-[13.5px] leading-relaxed text-muted">
                    {c.body}
                  </p>
                  <a
                    href={c.href}
                    className={`mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors ${
                      danger
                        ? "text-danger hover:text-danger/80"
                        : "text-accent hover:text-accent-hi"
                    }`}
                  >
                    {c.cta}
                    <span
                      aria-hidden
                      className="transition-transform duration-400 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* ============================================ SCOPE */}
      <Section className="border-y border-line/40 bg-ink/40">
        <Eyebrow>What support covers</Eyebrow>
        <Heading sub="Ownership is the whole point of the model, so it's worth being explicit about where support sits relative to it.">
          Optional, not a dependency
        </Heading>
        <Stagger className="mt-12 grid gap-5 lg:grid-cols-3">
          {SCOPE.map((s) => (
            <StaggerItem key={s.title}>
              <Card className="h-full p-8">
                <h3 className="text-[15px] font-semibold leading-snug">
                  {s.title}
                </h3>
                <p className="mt-3.5 text-[13.5px] leading-relaxed text-muted">
                  {s.body}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ============================================ REQUEST */}
      <Section id="request">
        <Backdrop variant="section" />
        <div className="grid gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          <div>
            <Eyebrow>Raise a request</Eyebrow>
            <Heading sub="Pre-routed to platform support. For an active incident, use the 24/7 line above instead — it's monitored, this form is read during business hours.">
              Tell us what&apos;s happening
            </Heading>
            <Reveal className="mt-10">
              <Card className="p-7" interactive={false}>
                <h3 className="text-[15px] font-semibold">
                  What to include
                </h3>
                <div className="mt-5">
                  <CheckList items={INCLUDE} />
                </div>
              </Card>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <Suspense
              fallback={
                <div className="h-[32rem] animate-pulse rounded-lg border border-line/70 bg-surface/40" />
              }
            >
              <ContactForm defaultInterest="Existing client support" />
            </Suspense>
          </Reveal>
        </div>
      </Section>

      {/* ============================================ FAQ */}
      <Section id="faq" className="border-y border-line/40 bg-ink/40">
        <Eyebrow>Frequently asked questions</Eyebrow>
        <Heading>Support questions</Heading>
        <div className="mt-10">
          <FaqAccordion faqs={FAQS} columns={1} />
        </div>
      </Section>

      {/* ============================================ SERVICES */}
      <Section>
        <div className="text-center">
          <Eyebrow>Not a support question</Eyebrow>
          <Heading
            align="center"
            sub="If you're scoping something new rather than running something we built, start here instead."
          >
            Looking at a new build?
          </Heading>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href="/services">See All Services</Button>
            <Button href="/contact" variant="ghost">
              Talk to an Engineer
            </Button>
          </div>
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            {SERVICES.map((s) => s.navLabel).join("  ·  ")}
          </p>
        </div>
      </Section>
    </>
  );
}
