import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact-form";
import { Backdrop } from "@/components/ui/backdrop";
import { FaqAccordion } from "@/components/ui/faq";
import {
  Card,
  Eyebrow,
  Heading,
  Section,
} from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem, WordsUp } from "@/components/motion";
import { breadcrumbLd, faqLd, type Faq } from "@/lib/jsonld";
import { SERVICES, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact WhyCrew — Talk to an Engineer, Not a Salesperson",
  description:
    "Every WhyCrew conversation starts with an engineer who can answer the technical question. Book a technical consultation, become an MSSP partner, or report a security incident.",
  alternates: { canonical: "/contact" },
};

const ROUTES = [
  {
    icon: "wrench",
    title: "Book a Technical Consultation",
    body: "Evaluating a custom SIEM build, AI SOC automation, or a white-label MSSP platform. 20 minutes with an engineer, no pitch deck.",
    cta: "Book a Call",
    href: "#form",
    tone: "default" as const,
  },
  {
    icon: "handshake",
    title: "Become an MSSP Partner",
    body: "Building your own MSSP or leaving a reseller platform behind. Talk through the build-vs-buy math for your business.",
    cta: "Start the Conversation",
    href: "/services/mssp-engineering-partner",
    tone: "default" as const,
  },
  {
    icon: "siren",
    title: "Report a Security Incident",
    body: "Active breach or urgent incident, for existing WhyCrew clients. Monitored 24/7 — do not use the general form.",
    cta: SITE.incidentEmail,
    href: `mailto:${SITE.incidentEmail}`,
    tone: "danger" as const,
  },
  {
    icon: "tools",
    title: "Existing Client Support",
    body: "Already running a WhyCrew-built platform and need help, an upgrade, or a runbook question.",
    cta: "Open a Support Request",
    href: "/contact?topic=support#form",
    tone: "default" as const,
  },
  {
    icon: "press",
    title: "Press & Media",
    body: "Press inquiries, briefings, or requests to speak with WhyCrew's engineering leadership.",
    cta: SITE.pressEmail,
    href: `mailto:${SITE.pressEmail}`,
    tone: "default" as const,
  },
  {
    icon: "briefcase",
    title: "Careers",
    body: "Engineering roles, not sales roles — we don't have a sales team to hire for.",
    cta: "See Open Roles",
    href: "/contact?topic=careers#form",
    tone: "default" as const,
  },
];

const REGIONS = [
  {
    title: "EU Delivery",
    body: "Primary EU engineering hub. On-premise and in-region hosting by default for NIS2, DORA, and GDPR-regulated clients. Deployment experience across Germany, the Netherlands, and France.",
  },
  {
    title: "Global Delivery",
    body: "Remote-first engineering delivery for clients outside the EU, on the same fixed-price, fixed-timeline model as every other engagement.",
  },
];

const FAQS: Faq[] = [
  {
    q: "How fast does WhyCrew respond to a general inquiry?",
    a: "Within one business day. Technical consultations are usually scheduled within 48 hours of the initial reply.",
  },
  {
    q: "Do you offer emergency incident response?",
    a: "Yes, for existing clients running a WhyCrew-built platform, through the 24/7 incident line above. Not offered as a first-time, standalone engagement.",
  },
  {
    q: "Can I request a demo before committing to a build?",
    a: "WhyCrew doesn't sell a pre-built product to demo — every platform is engineered to the client's environment. A technical consultation is the equivalent step.",
  },
  {
    q: "Does WhyCrew have a sales team I should ask to speak with?",
    a: "No. Every inquiry reaches an engineer. That's a deliberate choice, not a staffing gap.",
  },
];

function Icon({ name }: { name: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "wrench":
      return (
        <svg viewBox="0 0 24 24" className="size-5" {...common}>
          <path d="M15.5 3.5a5 5 0 00-6.1 6.3L3 16.2 5.8 19l6.4-6.4a5 5 0 006.3-6.1L15.6 9 13 8.4 12.4 5.8z" />
        </svg>
      );
    case "handshake":
      return (
        <svg viewBox="0 0 24 24" className="size-5" {...common}>
          <path d="M8 11l3-3 3 3 2.5 2.5M3 9l4-4h4M21 9l-4-4h-4M6 13l3 3 2-2 2 2 2-2 3 3" />
        </svg>
      );
    case "siren":
      return (
        <svg viewBox="0 0 24 24" className="size-5" {...common}>
          <path d="M6 17v-4a6 6 0 1112 0v4M4 17h16v3H4zM12 3V1M20 6l1.5-1.5M4 6L2.5 4.5" />
        </svg>
      );
    case "tools":
      return (
        <svg viewBox="0 0 24 24" className="size-5" {...common}>
          <path d="M4 20l6-6M14 4l3 3-2 2-3-3zM17 13l3 3-2 2-3-3zM7 4l3 3-3 3-3-3z" />
        </svg>
      );
    case "press":
      return (
        <svg viewBox="0 0 24 24" className="size-5" {...common}>
          <path d="M4 5h13v14H4zM17 9h3v8a2 2 0 01-3 1.7M7 9h7M7 13h7M7 16h4" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="size-5" {...common}>
          <path d="M3 8h18v12H3zM9 8V5h6v3M3 13h18" />
        </svg>
      );
  }
}

export default function ContactPage() {
  return (
    <>
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
              { name: "Contact", path: "/contact" },
            ])
          ),
        }}
      />

      {/* ============================================ HERO */}
      <section className="relative overflow-hidden pt-32 pb-16 text-center sm:pt-40">
        <Backdrop />
        <div className="container-page">
          <h1 className="mx-auto max-w-3xl text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-[3.6rem]">
            <WordsUp text="Talk to an Engineer." delay={0.12} />{" "}
            <WordsUp text="Not a Salesperson." delay={0.4} gradient />
          </h1>

          <Reveal delay={0.75}>
            <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-relaxed text-body">
              Every conversation with WhyCrew starts with someone who can
              actually answer the technical question — not a rep reading from a
              script. Tell us what you&apos;re building, and the right person
              replies directly.
            </p>
          </Reveal>

          <Reveal delay={0.88}>
            <p className="mx-auto mt-8 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-line/70 bg-surface/50 px-5 py-2.5 text-[12.5px] text-muted backdrop-blur-sm">
              <span aria-hidden className="text-accent">
                ⏱
              </span>
              We reply within{" "}
              <strong className="font-semibold text-accent">
                1 business day
              </strong>
              . Active security incident? Skip the form — use the emergency line
              below.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================ ROUTES */}
      <Section id="routes">
        <Eyebrow>How can we help?</Eyebrow>
        <Heading>Pick the one that fits</Heading>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ROUTES.map((r) => {
            const danger = r.tone === "danger";
            return (
              <StaggerItem key={r.title}>
                <Card
                  className={`group flex h-full flex-col p-7 ${
                    danger ? "!border-danger/30 !bg-danger/6" : ""
                  }`}
                >
                  <span
                    className={`mb-5 grid size-10 place-items-center rounded-md border transition-all duration-500 group-hover:scale-105 ${
                      danger
                        ? "border-danger/40 bg-danger/10 text-danger"
                        : "border-brand/30 bg-brand/10 text-brand-hi group-hover:border-accent/50 group-hover:text-accent"
                    }`}
                  >
                    <Icon name={r.icon} />
                  </span>
                  <h3
                    className={`text-[15px] font-semibold leading-snug ${
                      danger ? "text-danger" : ""
                    }`}
                  >
                    {r.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-muted">
                    {r.body}
                  </p>
                  <Link
                    href={r.href}
                    className={`mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors ${
                      danger
                        ? "text-danger hover:text-danger/80"
                        : "text-accent hover:text-accent-hi"
                    }`}
                  >
                    {r.cta}
                    <span
                      aria-hidden
                      className="transition-transform duration-400 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* ============================================ FORM */}
      <Section id="form" className="border-y border-line/40 bg-ink/40">
        <Backdrop variant="section" />
        <Eyebrow>Send us the details</Eyebrow>
        <Heading>Six fields. That&apos;s it.</Heading>
        <Reveal className="mt-10">
          <Suspense
            fallback={
              <div className="h-[32rem] animate-pulse rounded-lg border border-line/70 bg-surface/40" />
            }
          >
            <ContactForm />
          </Suspense>
        </Reveal>
      </Section>

      {/* ============================================ REGIONS */}
      <Section>
        <Eyebrow>Where we work</Eyebrow>
        <Heading>EU delivery, global reach</Heading>
        <Stagger className="mt-12 grid gap-5 lg:grid-cols-2">
          {REGIONS.map((r) => (
            <StaggerItem key={r.title}>
              <Card className="h-full p-8">
                <h3 className="text-[15px] font-semibold">{r.title}</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                  {r.body}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ============================================ FAQ */}
      <Section id="faq" className="border-y border-line/40 bg-ink/40">
        <Eyebrow>Frequently asked questions</Eyebrow>
        <Heading>Before you reach out</Heading>
        <div className="mt-10">
          <FaqAccordion faqs={FAQS} columns={1} />
        </div>
      </Section>

      {/* ============================================ LEARN MORE */}
      <Section>
        <p className="mb-10 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
          Learn more about WhyCrew
        </p>
        <div className="grid gap-px overflow-hidden rounded-lg border border-line/60 bg-line/60 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Services",
              body: "SIEM, AI SOC, MSSP, Compliance",
              href: "/services",
            },
            {
              title: "Results",
              body: "Real deployments, real numbers",
              href: "/#results",
            },
            {
              title: "MSSP Engineering Partner",
              body: "Build or migrate your platform",
              href: SERVICES[2].href,
            },
            {
              title: "How it Works",
              body: "Live in 8 weeks, not 18 months",
              href: "/#how-it-works",
            },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group bg-ink px-6 py-8 text-center transition-colors duration-400 hover:bg-surface-2/70"
            >
              <h3 className="text-[14px] font-semibold text-bright transition-colors group-hover:text-accent">
                {c.title}
              </h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                {c.body}
              </p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
