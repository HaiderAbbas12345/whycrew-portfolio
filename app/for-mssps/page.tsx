import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, TrendingUp, Layers, ShieldCheck, BadgeCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CostChart } from "@/components/CostChart";
import { KillerLine } from "@/components/KillerLine";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { Comparison } from "@/components/Comparison";
import { MigrationTimeline } from "@/components/MigrationTimeline";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { ContactForm } from "@/components/ContactForm";
import { Eyebrow, Section, SectionHead, RelatedLinks } from "@/components/Primitives";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/for-mssps",
  title: "Own your SOC platform. Stop renting your SIEM",
  description:
    "We build MSSPs an owned, multi-tenant, AI-native security platform, so growth stops raising your costs. Built for teams leaving Splunk, Sentinel, or QRadar.",
  keywords: [
    "owned SOC platform",
    "SIEM alternative for MSSPs",
    "multi-tenant SIEM",
    "QRadar alternative",
    "Splunk alternative for MSSPs",
    "MSSP SIEM cost",
  ],
});

const FACTS = [
  { n: "Per GB", p: "You pay for every gigabyte ingested, across every tenant, every day." },
  { n: "+9% / yr", p: "Legacy vendors escalate the rate automatically, whether you grow or not." },
  { n: "+1 tenant", p: "Every new client adds license cost that never goes away. Growth is taxed." },
];

const LAYERS = [
  {
    tag: "Own",
    title: "Own your platform",
    body: "A multi-tenant security platform that is yours. Perpetual, under your control, with your data inside your boundary. The asset sits on your books, not the vendor's.",
  },
  {
    tag: "AI",
    title: "AI native, not bolted on",
    body: "Agentic triage and investigation built into the core, cutting the manual grind your analysts do every day. This is why owning is now affordable to build, and better than the tool you rented.",
  },
  {
    tag: "Safe",
    title: "Data integrity preserved",
    body: "Every automated action is recorded and auditable, and sensitive client data never leaves the boundary it is meant to stay inside. AI you can actually run inside a security operation.",
  },
];

const PROMISES = [
  {
    icon: ShieldCheck,
    tag: "No risky switch",
    title: "Run in parallel",
    body: "Your current SIEM keeps running until each tenant is proven on the new platform. Nothing flips off until it works.",
  },
  {
    icon: Layers,
    tag: "Never stranded",
    title: "You own everything",
    body: "The platform and your data are yours outright, and the source code sits in escrow, released to you if we ever disappear.",
  },
  {
    icon: TrendingUp,
    tag: "Self funding",
    title: "The move pays for itself",
    body: "As each tenant migrates you cancel that slice of your vendor bill, and those savings help fund the rest of the migration.",
  },
];

const REGIONS = [
  {
    place: "Middle East",
    title: "Sovereign by design",
    body: "On-prem capable, with data that never leaves the country. Compete for government, banking, and telecom work that cloud-only SIEMs are simply not allowed to touch.",
    gold: true,
  },
  {
    place: "Europe",
    title: "Compliant and auditable",
    body: "Data stays in region, and the AI is governed and auditable by design, ready for GDPR and the EU AI Act, not retrofitted after the fact.",
  },
  {
    place: "United States",
    title: "The economics, plainly",
    body: "No sovereignty drama. Just the math: turn your largest climbing cost into an asset you own, and make every new client margin.",
  },
];

export default function MsspPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            path: "/for-mssps",
            name: "Owned SOC platforms for MSSPs",
            serviceType: "Security platform engineering",
            description:
              "WhyCrew builds MSSPs their own multi-tenant, AI-native security platform, so growth stops raising their costs. Built for providers leaving Splunk, Microsoft Sentinel, or IBM QRadar.",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "For MSSPs", path: "/for-mssps" },
          ]),
        ]}
      />

      {/* HERO */}
      <section className="pt-16 pb-8 md:pt-20">
        <div className="wrap grid items-center gap-12 md:grid-cols-[1.05fr_1fr] md:gap-14">
          <div>
            <Reveal>
              <Eyebrow>Owned SOC platforms for MSSPs</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 font-display text-[clamp(40px,6.4vw,72px)] font-bold leading-[1.02] tracking-[-0.03em]">
                <span className="text-gradient">Growth should not raise your</span>{" "}
                <span className="gold-gradient">costs.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[34ch] text-[clamp(17px,1.7vw,20px)] leading-relaxed text-muted">
                We build MSSPs their own multi-tenant, AI-native security platform. You stop renting
                your SIEM, and{" "}
                <b className="font-semibold text-text">
                  every new client becomes margin, not another license fee.
                </b>
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-own/30 bg-own/[0.06] px-4 py-2 text-[13.5px] text-muted transition-colors hover:border-own/60 hover:text-text"
              >
                <BadgeCheck size={16} className="text-own" />
                <span>
                  <b className="font-semibold text-text">Already live for a regional MSSP.</b> Built by
                  malware-research &amp; threat-intel engineers.
                </span>
              </Link>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-3.5">
                <Link href="#calculator" className="btn btn-gold">
                  See your savings <ArrowUpRight size={16} />
                </Link>
                <a href="#contact" className="btn btn-ghost">
                  Book a 15-min call
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.26}>
              <p className="mt-9 font-mono text-[12.5px] tracking-wide text-muted-2">
                Built for teams leaving <span className="text-rent">Splunk</span> ·{" "}
                <span className="text-rent">Sentinel</span> · <span className="text-rent">QRadar</span>
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <CostChart />
          </Reveal>
        </div>
      </section>

      {/* KILLER LINE */}
      <KillerLine />

      {/* PROBLEM */}
      <Section id="problem">
        <SectionHead
          eyebrow="The treadmill"
          title="Every client you win makes your SIEM bill bigger."
          lead="Rented SIEMs are priced by the gigabyte. More clients means more data, which means more cost, forever — and the vendor raises the rate every year on top. Your biggest cost rises every single time you succeed."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {FACTS.map((f, i) => (
            <Reveal key={f.n} delay={i * 0.06}>
              <div className="card h-full p-7">
                <div className="font-display text-[30px] font-extrabold tracking-[-0.02em] text-rent">
                  {f.n}
                </div>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{f.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* THE SHIFT */}
      <Section id="shift">
        <SectionHead
          eyebrow="The shift"
          title="Own the platform. Stop renting the meter."
          lead="We build you the thing you currently rent. You keep it, you control the data, and the cost stops climbing with growth."
        />
        <div className="grid gap-4">
          {LAYERS.map((l, i) => (
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

      {/* CALCULATOR */}
      <Section id="calculator" className="bg-gradient-to-b from-ink-2/60 to-transparent">
        <SectionHead
          eyebrow="The economics — your numbers"
          title="Don't take our word for it. Move the sliders."
          lead="Owning doesn't just lower your bill, it flips your economics. Put your size and vendor in and watch the rented line climb away from the flat one you'd own."
        />
        <SavingsCalculator />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { v: "Flat", k: "Maintenance you control", s: "A predictable retainer that steps up only when you grow into a new tier, never an automatic yearly rise." },
            { v: "Month 2", k: "Savings start", s: "We migrate tenant by tenant, biggest cost first, so the bill drops as the move happens, not a year later." },
            { v: "You own it", k: "The asset is yours", s: "The platform and the data are yours, with source code held in escrow so you are never stranded." },
          ].map((st, i) => (
            <Reveal key={st.k} delay={i * 0.06}>
              <div className="border-t-2 border-own pt-5">
                <div className="font-display text-[clamp(26px,3vw,36px)] font-extrabold tracking-[-0.02em] gold-gradient">
                  {st.v}
                </div>
                <div className="mt-1.5 font-mono text-[12px] uppercase tracking-[0.06em] text-muted">
                  {st.k}
                </div>
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted-2">{st.s}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* COMPARISON */}
      <Section id="compare">
        <SectionHead
          eyebrow="Rent vs build vs own"
          title="Three roads. One of them is yours to keep."
          lead="You're really choosing between renting forever, building it yourself, or owning a platform we build with you. Here's how they stack up."
        />
        <Comparison />
      </Section>

      {/* WHY US */}
      <Section id="why">
        <SectionHead
          eyebrow="Why WhyCrew"
          title="A small team that has already done this."
          lead="We are not AI tourists. WhyCrew comes out of real security engineering — malware research and threat intelligence — and we have already built a live MSSP their own platform."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {PROMISES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="card h-full p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-own/10 text-own">
                    <p.icon size={18} />
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-own">
                    {p.tag}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[18px] font-bold">{p.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* MIGRATION TIMELINE */}
      <Section id="how">
        <SectionHead
          eyebrow="How it works"
          title="From rented to owned, without the risk."
          lead="No big-bang cutover. We run both systems in parallel and move you tenant by tenant — so the savings start before the migration is even finished."
        />
        <MigrationTimeline />
      </Section>

      {/* PRICING */}
      <Section id="pricing">
        <SectionHead
          eyebrow="The investment"
          title="Priced on what you keep, not what it costs us."
          lead="Directional figures so you can self-qualify. Your exact number comes off your real invoice on a call."
        />
        <Pricing />
      </Section>

      {/* REGIONS */}
      <Section id="regions">
        <SectionHead eyebrow="Built for your jurisdiction" title="One platform. Your rules." />
        <div className="grid gap-5 md:grid-cols-3">
          {REGIONS.map((r, i) => (
            <Reveal key={r.place} delay={i * 0.06}>
              <div className="card h-full p-7">
                <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted">
                  {r.place}
                </div>
                <h3
                  className={`mt-2.5 font-display text-[22px] font-bold ${r.gold ? "gold-gradient" : ""}`}
                >
                  {r.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <SectionHead
          eyebrow="Straight answers"
          title="The questions every owner asks."
          lead="The doubts you'd raise on the call, answered before you have to."
        />
        <FAQ />
      </Section>

      {/* RELATED */}
      <Section>
        <SectionHead
          eyebrow="Before you decide"
          title="Do the homework on us too."
          lead="Everything here is a claim until you check it against the alternatives. These are the places to do that."
        />
        <RelatedLinks
          links={[
            {
              href: "/best-soc-platform-builders-mssps-2025",
              label: "How to evaluate a SOC platform builder",
              note: "The criteria that separate a real partner from a rebadged dev shop — including the ones we would fail on.",
            },
            {
              href: "/case-studies",
              label: "What the migration looked like",
              note: "The provider already running on their own platform, and how the tenant-by-tenant move actually went.",
            },
            {
              href: "/about",
              label: "Who you'd be working with",
              note: "The team, the background behind the claims, and what we will not take on.",
            },
          ]}
        />
      </Section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-line-soft py-24">
        <div className="wrap">
          <Reveal className="mb-10 text-center">
            <Eyebrow>Find out what you would save</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-[20ch] font-display text-[clamp(30px,4.6vw,52px)] font-bold leading-[1.05] tracking-[-0.02em] text-gradient">
              Stop renting your SIEM. Own it.
            </h2>
          </Reveal>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
