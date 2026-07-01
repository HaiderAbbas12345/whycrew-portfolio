import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ShieldCheck, Cpu, Lock, Building2, Scale } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CompetitorTable } from "@/components/CompetitorTable";
import { FaqList, type FaqItem } from "@/components/FaqList";
import { Eyebrow, Section, SectionHead, CTABand } from "@/components/Primitives";

const PATH = "/best-soc-platform-builders-mssps-2025";
const TITLE = "Best Custom SOC Platform Builders for MSSPs in 2025";

export const metadata: Metadata = {
  title: TITLE,
  description:
    "A 2025 guide to the best custom SOC platform builders for MSSPs. How to evaluate partners who build owned, multi-tenant, AI-native security platforms — and why owning your SOC platform beats renting Splunk, Sentinel, or QRadar.",
  keywords: [
    "custom SOC platform builders",
    "SOC platform for MSSPs",
    "best SOC platform 2025",
    "owned SIEM",
    "multi-tenant security platform",
    "AI-native SOC",
    "MSSP platform development",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    type: "article",
    url: `https://whycrew.com${PATH}`,
    title: TITLE,
    description:
      "How MSSPs should evaluate custom SOC platform builders in 2025 — ownership, multi-tenancy, AI-native triage, and data sovereignty.",
    images: ["/logo.jpeg"],
  },
};

const CRITERIA = [
  {
    icon: Building2,
    tag: "Ownership",
    title: "You own the platform, not a subscription",
    body: "The best builders hand you a perpetual, owned asset — code, data, and infrastructure inside your boundary — instead of renting you access. Ask who holds the IP and whether source is placed in escrow.",
  },
  {
    icon: ShieldCheck,
    tag: "Multi-tenancy",
    title: "Multi-tenant at the core, not bolted on",
    body: "An MSSP platform has to isolate dozens of clients cleanly. Tenancy, RBAC, and per-tenant data boundaries should be foundational, not a feature retrofitted onto a single-org product.",
  },
  {
    icon: Cpu,
    tag: "AI-native",
    title: "Agentic triage built into the core",
    body: "In 2025 the differentiator is AI investigation that is native and auditable — cutting analyst grind without sending sensitive client data to a third-party model. Bolt-on, metered AI is the old way.",
  },
  {
    icon: Lock,
    tag: "Data control",
    title: "Sensitive data never leaves your boundary",
    body: "For regulated and sovereign work, the platform must run where the data legally has to live — on-prem or in-country — with every automated action recorded and auditable.",
  },
  {
    icon: Scale,
    tag: "Economics",
    title: "Cost that doesn't climb with every client",
    body: "Rented SIEMs charge per gigabyte and raise rates yearly. A custom-built platform should make each new tenant margin, not another license fee. Model the five-year cost, not month one.",
  },
  {
    icon: CheckCircle2,
    tag: "Track record",
    title: "Built by security engineers, already in production",
    body: "The right builder comes out of real security engineering — malware research, threat intel — and has a live platform running for a real MSSP, not a slide deck and a roadmap.",
  },
];

const FAQS: FaqItem[] = [
  {
    q: "What is a custom SOC platform builder?",
    a: "A custom SOC platform builder is an engineering partner that designs and builds a security operations platform your MSSP owns outright — multi-tenant SIEM, detection, and AI-assisted investigation — instead of selling you a subscription to their own tool. You keep the platform, the data, and the code.",
  },
  {
    q: "Why would an MSSP build a custom SOC platform instead of using Splunk or Sentinel?",
    a: "Rented SIEMs like Splunk, Sentinel, and QRadar are priced per gigabyte and raise rates every year, so your biggest cost climbs every time you win a client. A custom, owned platform turns that climbing rental into a flat asset you control — every new tenant becomes margin instead of another license fee — while keeping client data inside your own boundary.",
  },
  {
    q: "What should MSSPs look for in a SOC platform builder in 2025?",
    a: "Look for six things: true ownership with source code in escrow, multi-tenancy built into the core, AI-native and auditable investigation, data that stays inside your boundary (on-prem or in-country where required), economics that don't climb per client, and a builder with a real security-engineering background and a platform already live in production.",
  },
  {
    q: "How is WhyCrew different from an MDR provider like UnderDefense?",
    a: "MDR and SOC-as-a-service providers run a managed service on their own stack — you rent their people and their platform. WhyCrew builds you your own multi-tenant, AI-native SOC platform that you own perpetually, with your client data inside your boundary and source code held in escrow. You are buying an asset, not a subscription to someone else's operation.",
  },
  {
    q: "Is switching to a custom-built SOC platform risky?",
    a: "It doesn't have to be. WhyCrew never does a big-bang cutover — your existing SIEM keeps running while we migrate tenant by tenant, highest-cost first, proving each client on the new platform before anything is switched off. Savings start during the migration, not a year after it.",
  },
  {
    q: "How much does a custom SOC platform cost to build?",
    a: "A standard build is priced from reuse of a proven core engine, so it is far less than building from scratch — and typically lower than a single year of what you would keep paying a rented SIEM forever. WhyCrew structures payment against delivery milestones and sizes the number against your real vendor invoice on a call.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://whycrew.com" },
        { "@type": "ListItem", position: 2, name: "For MSSPs", item: "https://whycrew.com/for-mssps" },
        { "@type": "ListItem", position: 3, name: TITLE, item: `https://whycrew.com${PATH}` },
      ],
    },
    {
      "@type": "Article",
      headline: TITLE,
      description:
        "A 2025 guide to evaluating custom SOC platform builders for MSSPs, and why owning your platform beats renting a SIEM.",
      author: { "@type": "Organization", name: "WhyCrew", url: "https://whycrew.com" },
      publisher: {
        "@type": "Organization",
        name: "WhyCrew",
        logo: { "@type": "ImageObject", url: "https://whycrew.com/logo.jpeg" },
      },
      mainEntityOfPage: `https://whycrew.com${PATH}`,
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="border-b border-line-soft pt-20 pb-12">
        <div className="wrap">
          <Reveal>
            <Eyebrow>2025 buyer's guide</Eyebrow>
            <h1 className="mt-5 max-w-[20ch] font-display text-[clamp(34px,5.2vw,60px)] font-bold leading-[1.04] tracking-[-0.02em] text-gradient">
              Best custom SOC platform builders for MSSPs in 2025
            </h1>
            <p className="mt-5 max-w-[60ch] text-[clamp(17px,1.7vw,20px)] leading-relaxed text-muted">
              If you run an MSSP, the SOC platform you rent is your fastest-climbing cost and the one
              asset you never get to keep. This guide covers how to evaluate a{" "}
              <b className="font-semibold text-text">custom SOC platform builder</b> in 2025 — the
              criteria that matter, how builders compare to MDR and rented SIEMs, and where an owned,
              multi-tenant, AI-native platform wins.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link href="/#contact" className="btn btn-gold">
                Talk to a builder <ArrowUpRight size={16} />
              </Link>
              <Link href="/for-mssps" className="btn btn-ghost">
                See the MSSP platform
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <Section id="why">
        <SectionHead
          eyebrow="The shift in 2025"
          title="Renting a SOC platform is the cost that punishes growth."
          lead="Legacy SIEMs are priced by the gigabyte and escalate every year, so every client you win makes the bill bigger. In 2025, AI-native tooling has made building and owning a multi-tenant platform affordable — which is why more MSSPs are choosing a custom builder over another subscription."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { n: "Per GB", p: "Rented SIEMs charge for every gigabyte across every tenant, every day." },
            { n: "+9% / yr", p: "Vendors raise the rate automatically whether you grow or not." },
            { n: "Own it", p: "A custom-built platform is a perpetual asset on your books, not the vendor's." },
          ].map((f, i) => (
            <Reveal key={f.n} delay={i * 0.06}>
              <div className="card h-full p-7">
                <div className="font-display text-[30px] font-extrabold tracking-[-0.02em] gold-gradient">
                  {f.n}
                </div>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{f.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CRITERIA */}
      <Section id="criteria" className="bg-gradient-to-b from-ink-2/60 to-transparent">
        <SectionHead
          eyebrow="How to choose"
          title="Six criteria for evaluating a SOC platform builder."
          lead="Not every partner that says 'SOC platform' builds you something you own. Score any builder — including us — against these before you sign."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CRITERIA.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <div className="card h-full p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-own/10 text-own">
                    <c.icon size={18} />
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-own">
                    {c.tag}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[18px] font-bold leading-[1.2]">{c.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* COMPARISON */}
      <Section id="compare">
        <SectionHead
          eyebrow="Builders vs services vs suites"
          title="Custom-built and owned, vs the alternatives."
          lead="MSSPs weighing an MDR service like UnderDefense, a rented SIEM suite, or a custom-built platform are really choosing between renting someone else's operation and owning your own. Here's how they stack up."
        />
        <CompetitorTable />
        <Reveal className="mt-6">
          <p className="max-w-[70ch] text-[14px] leading-relaxed text-muted-2">
            Categories differ by need: MDR and SOC-as-a-service providers are a strong fit when you want
            to outsource operations entirely. A custom builder like WhyCrew fits when you want to own the
            platform, keep client data inside your boundary, and stop your tooling cost from climbing with
            every client you add.
          </p>
        </Reveal>
      </Section>

      {/* WHY WHYCREW */}
      <Section id="whycrew">
        <SectionHead
          eyebrow="Why WhyCrew"
          title="A builder that has already shipped this."
          lead="WhyCrew builds MSSPs their own multi-tenant, AI-native security platform. We come out of malware research and threat intelligence, and we already have a platform live in production for a regional MSSP."
        />
        <div className="grid gap-4">
          {[
            {
              tag: "Own",
              title: "You own the platform outright",
              body: "Perpetual, under your control, with your data inside your boundary and source code held in escrow so you're never stranded.",
            },
            {
              tag: "AI",
              title: "AI-native, not bolted on",
              body: "Agentic triage and investigation built into the core, cutting the manual grind your analysts do every day — auditable, and without sensitive data leaving the boundary.",
            },
            {
              tag: "Safe",
              title: "Migrate without the risk",
              body: "No big-bang cutover. We run in parallel and move tenant by tenant, highest-cost first, so savings start before the migration is finished.",
            },
          ].map((l, i) => (
            <Reveal key={l.tag} delay={i * 0.06}>
              <div className="card grid items-start gap-6 p-7 md:grid-cols-[72px_1fr]">
                <div className="grid h-12 w-[72px] place-items-center rounded-xl border border-line font-mono text-[13px] text-own">
                  {l.tag}
                </div>
                <div>
                  <h3 className="font-display text-[21px] font-bold">{l.title}</h3>
                  <p className="mt-1.5 text-[15.5px] leading-relaxed text-muted">{l.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <SectionHead
          eyebrow="Straight answers"
          title="Custom SOC platform builders — your questions."
          lead="The questions MSSPs ask when weighing a custom-built platform against a rented SIEM or an MDR service."
        />
        <FaqList items={FAQS} />
      </Section>

      <CTABand
        eyebrow="Find out what you'd save"
        title="Stop renting your SOC platform. Own it."
        body="Bring your vendor, tenant count, and data volume. We'll show you your own savings curve and how a custom-built platform pays for itself."
      />
    </>
  );
}
