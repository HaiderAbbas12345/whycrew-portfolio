"use client";

import { Check, X, Minus } from "lucide-react";
import { Reveal } from "./Reveal";

type Cell = { v: string; t: "good" | "bad" | "mid" };
const rows: { label: string; rent: Cell; build: Cell; own: Cell }[] = [
  {
    label: "Who owns the platform",
    rent: { v: "The vendor", t: "bad" },
    build: { v: "You", t: "good" },
    own: { v: "You — perpetual", t: "good" },
  },
  {
    label: "Cost as you add clients",
    rent: { v: "Rises forever", t: "bad" },
    build: { v: "Flat-ish", t: "mid" },
    own: { v: "Near zero per client", t: "good" },
  },
  {
    label: "Automatic yearly rate hikes",
    rent: { v: "~9% / yr", t: "bad" },
    build: { v: "None", t: "good" },
    own: { v: "None — steps by band", t: "good" },
  },
  {
    label: "Your client data",
    rent: { v: "In the vendor's cloud", t: "bad" },
    build: { v: "Yours", t: "good" },
    own: { v: "Inside your boundary", t: "good" },
  },
  {
    label: "AI investigation built in",
    rent: { v: "Add-on, metered", t: "mid" },
    build: { v: "You build it", t: "mid" },
    own: { v: "Native to the core", t: "good" },
  },
  {
    label: "Build burden on you",
    rent: { v: "None", t: "good" },
    build: { v: "Rare, costly talent", t: "bad" },
    own: { v: "We carry it", t: "good" },
  },
  {
    label: "If the provider disappears",
    rent: { v: "Locked out", t: "bad" },
    build: { v: "N/A", t: "good" },
    own: { v: "Source code in escrow", t: "good" },
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

export function Comparison() {
  return (
    <Reveal>
      <div className="card overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_1.15fr]">
          {/* header */}
          <div className="hidden border-b border-line p-5 md:block" />
          <div className="hidden border-b border-l border-line p-5 text-center md:block">
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-rent">Rent it</div>
            <div className="mt-1 text-[13px] text-muted">Splunk · Sentinel</div>
          </div>
          <div className="hidden border-b border-l border-line p-5 text-center md:block">
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">Build it</div>
            <div className="mt-1 text-[13px] text-muted">In-house team</div>
          </div>
          <div className="hidden border-b border-l border-own/40 bg-own/[0.06] p-5 text-center md:block">
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-own">Own it</div>
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
                <span className="mb-1 block font-mono text-[10px] uppercase text-rent md:hidden">Rent</span>
                <Mark c={r.rent} />
              </div>
              <div className="border-t border-line p-5 md:border-l">
                <span className="mb-1 block font-mono text-[10px] uppercase text-muted md:hidden">Build</span>
                <Mark c={r.build} />
              </div>
              <div className="border-t border-own/30 bg-own/[0.06] p-5 md:border-l md:border-own/40">
                <span className="mb-1 block font-mono text-[10px] uppercase text-own md:hidden">WhyCrew</span>
                <Mark c={r.own} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
