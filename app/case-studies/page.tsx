import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, CTABand } from "@/components/Primitives";

export const metadata: Metadata = {
  title: "Case studies — MSSPs that stopped renting their SIEM",
  description:
    "Real stories of MSSPs moving from rented SIEMs like Splunk, Sentinel, and QRadar to an owned, multi-tenant, AI-native platform built by WhyCrew.",
};

const POSTS = [
  {
    cat: "Migration · QRadar",
    title: "Leaving QRadar before the 2026 cutoff",
    body: "QRadar's SaaS end of life forced a decision. Here is how one provider used the deadline to stop renting entirely instead of just switching vendors.",
    cta: "Read the story",
  },
  {
    cat: "Teardown · Pricing",
    title: "What MSSPs really pay for a rented SIEM",
    body: "A plain breakdown of per-gigabyte pricing across the top five SIEMs, and why the bill climbs faster than revenue.",
    cta: "Read the teardown",
  },
  {
    cat: "Sovereignty · Middle East",
    title: "On-prem and in-country, by law",
    body: "Why GCC data rules rule out cloud-only SIEMs for regulated work, and what an owned, in-country platform unlocks.",
    cta: "Read the brief",
  },
];

const DRAFTS = [
  {
    title: "Migrating tenant by tenant without downtime",
    body: "The parallel-run playbook: how we move clients one at a time so nothing breaks and savings start in month two.",
  },
  {
    title: "AI triage that auditors accept",
    body: "Keeping agentic investigation auditable and data inside the boundary, so AI is safe to run in a real SOC.",
  },
  {
    title: "Own vs build vs rent, the honest math",
    body: "When owning wins, when it does not, and how to read your own SIEM invoice before you decide.",
  },
];

export default function Page() {
  return (
    <>
      <section className="border-b border-line-soft pt-20 pb-12">
        <div className="wrap">
          <Reveal>
            <Eyebrow>Case studies</Eyebrow>
            <h1 className="mt-5 max-w-[18ch] font-display text-[clamp(36px,5.5vw,60px)] font-bold leading-[1.05] tracking-[-0.02em] text-gradient">
              What happens when an MSSP stops renting.
            </h1>
            <p className="mt-4 max-w-[54ch] text-[clamp(17px,1.7vw,20px)] leading-relaxed text-muted">
              Real migrations from rented SIEMs to owned platforms, and what they did to cost, control,
              and the bottom line. Names anonymized where clients ask.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FEATURED */}
      <section className="border-b border-line-soft py-16">
        <div className="wrap">
          <Reveal>
            <article className="card overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-6 border-b border-line bg-gradient-to-b from-surface to-ink-2 p-8">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-own">
                    Featured · Identity SIEM
                  </span>
                  <h2 className="mt-2.5 max-w-[24ch] font-display text-[clamp(24px,3vw,34px)] font-bold tracking-[-0.02em]">
                    A regional MSSP built its own platform and turned growth back into margin.
                  </h2>
                </div>
                <div className="flex flex-wrap gap-8">
                  {[
                    { v: "Owned", k: "Platform & data" },
                    { v: "Flat", k: "Cost as it grows" },
                    { v: "Live", k: "In production" },
                  ].map((m) => (
                    <div key={m.k}>
                      <div className="font-display text-[28px] font-extrabold tracking-[-0.02em] gold-gradient">
                        {m.v}
                      </div>
                      <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
                        {m.k}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-8 p-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-2.5 font-mono text-[14px] uppercase tracking-[0.08em] text-muted">
                    The problem
                  </h3>
                  <p className="mb-5 text-[15.5px] leading-relaxed text-text">
                    The MSSP was growing, and every new client pushed more data into a rented SIEM
                    priced by the gigabyte. The tooling bill climbed with each win, and the vendor
                    raised rates on top. Growth was quietly eating margin.
                  </p>
                  <h3 className="mb-2.5 font-mono text-[14px] uppercase tracking-[0.08em] text-muted">
                    What we built
                  </h3>
                  <p className="text-[15.5px] leading-relaxed text-text">
                    An owned, multi-tenant identity SIEM with AI-assisted triage built into the core.
                    We started narrow with the identity layer, proved it on the highest-cost data
                    first, and ran it alongside the existing tool until each tenant was solid.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2.5 font-mono text-[14px] uppercase tracking-[0.08em] text-muted">
                    The result
                  </h3>
                  <p className="mb-5 text-[15.5px] leading-relaxed text-text">
                    The MSSP now owns the platform and the data outright. The climbing per-gigabyte
                    bill became a flat, predictable cost they control, and adding a new client no
                    longer adds a license fee.
                  </p>
                  <div className="rounded-xl border border-dashed border-line bg-white/[0.02] p-4 text-[14px] italic leading-relaxed text-muted">
                    Replace this block with the real client&apos;s numbers once approved: prior vendor
                    spend, tenant count, and the specific saving. A real figure here is the strongest
                    sentence on the whole site.
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* MORE */}
      <section className="py-16">
        <div className="wrap">
          <Reveal>
            <h2 className="font-display text-[clamp(24px,3vw,34px)] font-bold tracking-[-0.02em]">
              More stories and field notes
            </h2>
            <p className="mt-2 text-muted">
              Migrations, teardowns of SIEM pricing, and what we learn building security platforms for
              MSSPs.
            </p>
          </Reveal>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {POSTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <Link href="#" className="card group flex h-full min-h-[230px] flex-col gap-3 p-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-rent">
                    {p.cat}
                  </span>
                  <h3 className="font-display text-[20px] font-bold leading-[1.15]">{p.title}</h3>
                  <p className="flex-grow text-[14.5px] leading-relaxed text-muted">{p.body}</p>
                  <span className="flex items-center gap-1.5 font-mono text-[12px] text-own transition-transform group-hover:translate-x-1">
                    {p.cta} <ArrowUpRight size={13} />
                  </span>
                </Link>
              </Reveal>
            ))}

            {DRAFTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="card flex h-full min-h-[230px] flex-col gap-3 p-6 opacity-60">
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-2">
                    Coming soon
                  </span>
                  <h3 className="font-display text-[20px] font-bold leading-[1.15]">{p.title}</h3>
                  <p className="flex-grow text-[14.5px] leading-relaxed text-muted">{p.body}</p>
                  <span className="font-mono text-[12px] text-muted-2">In progress</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Your turn"
        title="Could your platform be one of these?"
        body="Bring your vendor, tenant count, and data volume. We will show you your own savings curve."
      />
    </>
  );
}
