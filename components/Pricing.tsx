"use client";

import { Check } from "lucide-react";
import { Reveal } from "./Reveal";

const TIERS = [
  {
    band: "Up to ~10 clients",
    build: "from $120k",
    retainer: "$50k / yr",
    points: ["One-time build, 25% on signing", "Flat retainer, no yearly % hikes", "Perpetual license + data ownership"],
  },
  {
    band: "Around ~25 clients",
    build: "from $180k",
    retainer: "$85k / yr",
    points: ["Heavier scope, more tenants", "Migrate biggest-cost first", "Source code in escrow"],
    featured: true,
  },
  {
    band: "Around ~50 clients",
    build: "from $250k",
    retainer: "$130k / yr",
    points: ["Full multi-tenant platform", "Steps up only by client band", "AI triage native to the core"],
  },
];

export function Pricing() {
  return (
    <>
      <div className="grid gap-5 md:grid-cols-3">
        {TIERS.map((t, i) => (
          <Reveal key={t.band} delay={i * 0.06}>
            <div
              className={`card flex h-full flex-col p-7 ${
                t.featured ? "border-own/50 bg-own/[0.05]" : ""
              }`}
            >
              {t.featured && (
                <span className="mb-3 inline-block w-fit rounded-full border border-own/40 bg-own/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-own">
                  Most common
                </span>
              )}
              <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted">{t.band}</div>
              <div className="mt-3 font-display text-[30px] font-extrabold tracking-[-0.02em] gold-gradient">
                {t.build}
              </div>
              <div className="mt-1 text-[14px] text-muted">
                build · then <span className="font-semibold text-text">{t.retainer}</span> maintenance
              </div>
              <ul className="mt-5 space-y-2.5">
                {t.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[14px] text-muted">
                    <Check size={15} className="mt-0.5 shrink-0 text-own" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}>
        <p className="mx-auto mt-8 max-w-[64ch] text-center text-[14.5px] leading-relaxed text-muted-2">
          Priced on the value of what you keep, never on hourly labor. The whole build is typically
          lower than one year of what you&apos;d keep paying your vendor — and unlike the vendor, it
          never climbs automatically. New features sit outside maintenance and are quoted separately,
          in plain words, in the contract.
        </p>
      </Reveal>
    </>
  );
}
