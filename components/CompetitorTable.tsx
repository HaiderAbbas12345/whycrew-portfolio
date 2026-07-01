"use client";

import { Check, X, Minus } from "lucide-react";
import { Reveal } from "./Reveal";

type Cell = { v: string; t: "good" | "bad" | "mid" };
const rows: { label: string; mdr: Cell; suite: Cell; whycrew: Cell }[] = [
  {
    label: "What you actually get",
    mdr: { v: "A managed service", t: "mid" },
    suite: { v: "A licensed product", t: "mid" },
    whycrew: { v: "A platform you own outright", t: "good" },
  },
  {
    label: "Multi-tenant, MSSP-native",
    mdr: { v: "Built for one org", t: "bad" },
    suite: { v: "Bolt-on tenancy", t: "mid" },
    whycrew: { v: "Multi-tenant at the core", t: "good" },
  },
  {
    label: "Who holds your client data",
    mdr: { v: "The provider", t: "bad" },
    suite: { v: "Vendor cloud", t: "bad" },
    whycrew: { v: "Inside your boundary", t: "good" },
  },
  {
    label: "Cost as you add clients",
    mdr: { v: "Per-seat, climbs", t: "bad" },
    suite: { v: "Per-GB, climbs", t: "bad" },
    whycrew: { v: "Near zero per client", t: "good" },
  },
  {
    label: "AI investigation built in",
    mdr: { v: "Analyst-driven", t: "mid" },
    suite: { v: "Metered add-on", t: "mid" },
    whycrew: { v: "Native, auditable", t: "good" },
  },
  {
    label: "On-prem / sovereign deploy",
    mdr: { v: "Rarely", t: "bad" },
    suite: { v: "Limited tiers", t: "mid" },
    whycrew: { v: "In-country capable", t: "good" },
  },
  {
    label: "If the provider disappears",
    mdr: { v: "Service ends", t: "bad" },
    suite: { v: "Locked out", t: "bad" },
    whycrew: { v: "Source code in escrow", t: "good" },
  },
];

function Mark({ c }: { c: Cell }) {
  const Icon = c.t === "good" ? Check : c.t === "bad" ? X : Minus;
  const color = c.t === "good" ? "text-own" : c.t === "bad" ? "text-rent" : "text-muted-2";
  return (
    <div className="flex items-start gap-2">
      <Icon size={15} className={`mt-0.5 shrink-0 ${color}`} />
      <span className="text-[14px] text-text">{c.v}</span>
    </div>
  );
}

export function CompetitorTable() {
  return (
    <Reveal>
      <div className="card overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_1.15fr]">
          {/* header */}
          <div className="hidden border-b border-line p-5 md:block" />
          <div className="hidden border-b border-l border-line p-5 text-center md:block">
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-rent">MDR / SOC-as-a-service</div>
            <div className="mt-1 text-[13px] text-muted">e.g. UnderDefense</div>
          </div>
          <div className="hidden border-b border-l border-line p-5 text-center md:block">
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">SIEM suite</div>
            <div className="mt-1 text-[13px] text-muted">Splunk · Sentinel</div>
          </div>
          <div className="hidden border-b border-l border-own/40 bg-own/[0.06] p-5 text-center md:block">
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-own">Custom-built & owned</div>
            <div className="mt-1 text-[13px] font-semibold text-text">WhyCrew</div>
          </div>

          {/* rows */}
          {rows.map((r, i) => (
            <div key={r.label} className="contents">
              <div
                className={`p-5 font-display text-[15px] font-semibold text-muted ${
                  i > 0 ? "border-t border-line" : ""
                } md:border-t`}
              >
                {r.label}
              </div>
              <div className="border-t border-line p-5 md:border-l">
                <span className="mb-1 block font-mono text-[10px] uppercase text-rent md:hidden">MDR</span>
                <Mark c={r.mdr} />
              </div>
              <div className="border-t border-line p-5 md:border-l">
                <span className="mb-1 block font-mono text-[10px] uppercase text-muted md:hidden">SIEM suite</span>
                <Mark c={r.suite} />
              </div>
              <div className="border-t border-own/30 bg-own/[0.06] p-5 md:border-l md:border-own/40">
                <span className="mb-1 block font-mono text-[10px] uppercase text-own md:hidden">WhyCrew</span>
                <Mark c={r.whycrew} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
