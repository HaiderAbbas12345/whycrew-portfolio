import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Cpu, Lock, BadgeCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { BoundaryMotif } from "@/components/BoundaryMotif";
import { Eyebrow, Section, SectionHead, CTABand } from "@/components/Primitives";
import { FaqList, type FaqItem } from "@/components/FaqList";
import { Testimonials } from "@/components/Testimonials";
import { SERVICES } from "@/lib/site";

const WHY = [
  {
    icon: ShieldCheck,
    title: "Real security depth",
    body: "A team out of malware research and threat intelligence. We have been on the other side of the threats we build against.",
  },
  {
    icon: Cpu,
    title: "AI native",
    body: "We build agentic and AI workflows that work in production, not demos, and wire them into your real systems.",
  },
  {
    icon: Lock,
    title: "Data integrity preserved",
    body: "Sensitive data stays inside its boundary, and every automated action is auditable. Safe where it matters.",
  },
];

/** Rendered by <FaqList>, which also emits the matching FAQPage JSON-LD. */
const FAQS: FaqItem[] = [
  {
    q: "What is the difference between WhyCrew and a subscription SIEM vendor?",
    a: "Subscription vendors sell access to their platform under per-GB licensing. WhyCrew builds a custom platform and transfers full ownership to you. You control the roadmap, the data, and the economics. We're an engineering partner, not a SaaS provider.",
  },
  {
    q: "Do you only work with European MSSPs?",
    a: "No. Our strongest track record is in Europe, across NIS2, DORA, and GDPR, but the same architecture and ownership model applies to MSSPs and regulated operators everywhere.",
  },
  {
    q: "How much does a typical SIEM migration cost?",
    a: "Projects are scoped and priced individually based on log volume, retention requirements, and integration complexity. Most clients see a 40 to 70 percent reduction in total SIEM cost within the first 12 months. You receive a fixed-price proposal after the initial architecture audit.",
  },
  {
    q: "Do you own the platform WhyCrew builds for you?",
    a: "Yes. Everything we build is yours — the platform, the source code, and all underlying components. We provide the engineering, you own the output outright. That means you control the infrastructure, the roadmap, and the data, with no ongoing licensing and no vendor dependency. Every engagement includes API documentation, deployment runbooks, and hands-on engineering training so your team can run and evolve it independently.",
  },
  {
    q: "Is the AI SOC automation truly on-premise?",
    a: "Yes. We deploy open-weight LLMs directly on your infrastructure or your own cloud tenant. No external AI services. No data leaves your perimeter — ever.",
  },
  {
    q: "Can you help us meet NIS2 Article 21 requirements?",
    a: "Yes. We implement NIS2 Article 21 as a structured engineering service — covering incident detection, 24-hour reporting, evidence collection, and supervisory notification. One French financial services client was fully audit-ready in three weeks.",
  },
  {
    q: "How long does implementation take?",
    a: "Standard SIEM migration and platform builds take 8 to 12 weeks from kickoff to production. White-label MSSP platforms deploy in 8 weeks. NIS2 compliance automation typically takes 4 to 6 weeks depending on integration depth.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO — broad engineering-partner positioning */}
      <section className="pt-16 pb-10 md:pt-20">
        <div className="wrap grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
          <div>
            <Reveal>
              <Eyebrow>Security · AI · Integrations · Platforms</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 max-w-[15ch] font-display text-[clamp(40px,6.2vw,72px)] font-bold leading-[1.02] tracking-[-0.03em]">
                <span className="text-gradient">Engineering for systems you can&apos;t</span>{" "}
                <span className="gold-gradient">get wrong.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[48ch] text-[clamp(17px,1.7vw,21px)] leading-relaxed text-muted">
                WhyCrew is a security and AI engineering partner for MSSPs and teams where{" "}
                <b className="font-semibold text-text">sensitive data is the whole problem,</b> not an
                afterthought. We automate SOC operations, integrate tooling, deploy AI agents, and
                build owned security platforms.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-own/30 bg-own/[0.06] px-4 py-2 text-[13.5px] text-muted">
                <BadgeCheck size={16} className="text-own" />
                <span>
                  <b className="font-semibold text-text">Built by malware-research &amp; threat-intel
                  engineers.</b>{" "}
                  Already live for a regional MSSP.
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-7 flex flex-wrap gap-3.5">
                <Link href="#services" className="btn btn-gold">
                  What we build <ArrowUpRight size={16} />
                </Link>
                <Link href="/for-mssps" className="btn btn-ghost">
                  For MSSPs
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <BoundaryMotif />
          </Reveal>
        </div>
      </section>

      {/* INTRO LINE */}
      <section className="py-12">
        <div className="wrap">
          <Reveal>
            <p className="max-w-[28ch] font-display text-[clamp(22px,3vw,34px)] font-bold leading-[1.2] tracking-[-0.02em] text-gradient">
              Most shops can build security, <span className="gold-gradient">or</span> build AI. We
              do both — which is the whole point when the data is sensitive.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <Section id="services">
        <SectionHead
          eyebrow="What we do"
          title="From one workflow to a whole platform."
          lead="Pick where you are. A single AI workflow inside your app, a stack of integrations, automated SOC work — or our flagship, an entire owned security platform for MSSPs."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {/* Flagship */}
          {SERVICES.filter((s) => s.flagship).map((s) => (
            <Reveal key={s.slug} className="md:col-span-2">
              <Link
                href={s.href}
                className="card card-glow group flex flex-col gap-4 p-8 md:flex-row md:items-end md:justify-between"
                style={{
                  background:
                    "linear-gradient(120deg, rgba(230,181,74,0.06), rgba(18,26,35,0.7) 45%)",
                }}
              >
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-own">
                    {s.cat}
                  </span>
                  <h3 className="mt-2 max-w-[22ch] font-display text-[clamp(24px,3vw,34px)] font-bold tracking-[-0.02em]">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-[62ch] text-[16.5px] leading-relaxed text-muted">
                    {s.blurb}
                  </p>
                </div>
                <span className="flex shrink-0 items-center gap-1.5 font-mono text-[12.5px] text-own transition-transform group-hover:translate-x-1">
                  Explore the flagship <ArrowUpRight size={15} />
                </span>
              </Link>
            </Reveal>
          ))}

          {/* Others */}
          {SERVICES.filter((s) => !s.flagship).map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <Link href={s.href} className="card group flex h-full flex-col gap-3 p-7">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                  {s.cat}
                </span>
                <h3 className="font-display text-[23px] font-bold tracking-[-0.01em]">{s.title}</h3>
                <p className="flex-grow text-[15px] leading-relaxed text-muted">{s.blurb}</p>
                <span className="flex items-center gap-1.5 font-mono text-[12.5px] text-own transition-transform group-hover:translate-x-1">
                  Learn more <ArrowUpRight size={14} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WHY */}
      <Section id="why">
        <SectionHead eyebrow="Why WhyCrew" title="Built by security people, not AI tourists." />
        <div className="grid gap-5 md:grid-cols-3">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.06}>
              <div className="card h-full p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-own/10 text-own">
                  <w.icon size={20} />
                </span>
                <h3 className="mt-5 font-display text-[19px] font-bold">{w.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PROOF */}
      <Section id="proof">
        <SectionHead
          eyebrow="Client reference"
          title="What it looks like when the bill stops climbing."
        />
        <Testimonials />
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <SectionHead
          eyebrow="Questions"
          title="What people ask before they engage us."
          lead="Ownership, cost, timelines, and compliance — the four things that decide whether this is the right fit."
        />
        <FaqList items={FAQS} />
      </Section>

      <CTABand
        eyebrow="Start a conversation"
        title="Tell us what you're building."
        body="One workflow or a whole platform — we will tell you straight whether we are the right team for it."
      />
    </>
  );
}
