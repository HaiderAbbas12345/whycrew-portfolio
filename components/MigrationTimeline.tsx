"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const PHASES = [
  { when: "Week 0", title: "Map & sign", body: "We map your tenants, data volume, and current bill. Narrow first slice agreed.", live: false },
  { when: "Weeks 1–4", title: "Build the core", body: "We build your platform around a proven first slice — the identity layer.", live: false },
  { when: "Month 2", title: "First tenant live", body: "Highest-cost tenant runs in parallel. You cancel that slice of the vendor bill.", live: true },
  { when: "Months 3+", title: "Migrate in order", body: "Tenant by tenant, biggest cost first. Each move funds the next.", live: false },
  { when: "You own it", title: "Full handover", body: "Platform and data are yours. Flat retainer you control, source in escrow.", live: false },
];

export function MigrationTimeline() {
  return (
    <Reveal>
      <div className="relative">
        {/* connecting line */}
        <div className="absolute left-0 right-0 top-[14px] hidden h-px bg-line md:block" />
        <motion.div
          className="absolute left-0 top-[14px] hidden h-px origin-left bg-gradient-to-r from-own to-own/0 md:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          style={{ width: "100%" }}
        />
        <div className="grid gap-8 md:grid-cols-5 md:gap-4">
          {PHASES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="relative">
                <span
                  className={`relative z-10 block h-[30px] w-[30px] rounded-full border-2 ${
                    p.live ? "border-own bg-own/20" : "border-line bg-ink"
                  } grid place-items-center`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      p.live ? "animate-pulse-dot bg-own" : "bg-muted-2"
                    }`}
                  />
                </span>
                <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-own">
                  {p.when}
                </div>
                <h4 className="mt-1.5 font-display text-[16px] font-bold">{p.title}</h4>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{p.body}</p>
                {p.live && (
                  <span className="mt-2 inline-block rounded-full border border-own/40 bg-own/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-own">
                    Savings start
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
