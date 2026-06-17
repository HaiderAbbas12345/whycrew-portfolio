"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type Vendor = "Sentinel" | "Splunk" | "QRadar" | "Other";

const VENDORS: { id: Vendor; label: string; mult: number; note: string }[] = [
  { id: "Sentinel", label: "Microsoft Sentinel", mult: 1, note: "per-GB, ~9%/yr hikes" },
  { id: "Splunk", label: "Splunk", mult: 2.3, note: "2–3× Sentinel, climbs fastest" },
  { id: "QRadar", label: "IBM QRadar", mult: 1.9, note: "SaaS end-of-life forcing a move" },
  { id: "Other", label: "Other / not sure", mult: 1.6, note: "we'll refine on a call" },
];

// Anchor points from the playbook: 10 clients ≈ $120k, 25 ≈ $280k, 50 ≈ $430k (cheaper vendor).
function estimateSentinelSpend(tenants: number): number {
  const pts: [number, number][] = [
    [10, 120],
    [25, 280],
    [50, 430],
  ];
  if (tenants <= pts[0][0]) return Math.round((pts[0][1] / pts[0][0]) * tenants);
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    if (tenants <= x1) return Math.round(y0 + ((y1 - y0) * (tenants - x0)) / (x1 - x0));
  }
  const [x0, y0] = pts[1];
  const [x1, y1] = pts[2];
  const slope = (y1 - y0) / (x1 - x0);
  return Math.round(y1 + slope * (tenants - x1));
}

function retainerFor(tenants: number): number {
  if (tenants <= 10) return 50;
  if (tenants <= 25) return 85;
  if (tenants <= 50) return 130;
  return 130 + Math.ceil((tenants - 50) / 25) * 65;
}
function buildFor(tenants: number): number {
  if (tenants <= 10) return 120;
  if (tenants <= 25) return 180;
  if (tenants <= 50) return 250;
  return 250 + Math.ceil((tenants - 50) / 25) * 90;
}

const fmt = (k: number) =>
  k >= 1000 ? `$${(k / 1000).toFixed(2)}M` : `$${Math.round(k)}k`;

export function SavingsCalculator() {
  const [vendor, setVendor] = useState<Vendor>("Sentinel");
  const [tenants, setTenants] = useState(25);
  const [spend, setSpend] = useState<number | null>(null); // k/yr, null = auto-estimate
  const [edited, setEdited] = useState(false);

  const vendorMult = VENDORS.find((v) => v.id === vendor)!.mult;
  const autoSpend = Math.round(estimateSentinelSpend(tenants) * vendorMult);
  const currentSpend = edited && spend !== null ? spend : autoSpend;

  const model = useMemo(() => {
    const retainer = retainerFor(tenants);
    const build = buildFor(tenants);
    const ESCALATE = 1.09; // vendor auto-hike, conservative (vendor-driven only)

    const rent: number[] = [];
    let r = currentSpend;
    for (let y = 1; y <= 5; y++) {
      r = y === 1 ? currentSpend * ESCALATE : r * ESCALATE;
      rent.push(r);
    }
    const rentCum: number[] = [];
    const ownCum: number[] = [];
    let rc = 0;
    let oc = build;
    for (let y = 0; y < 5; y++) {
      rc += rent[y];
      rentCum.push(rc);
      oc += retainer;
      ownCum.push(oc);
    }
    const saved5 = rentCum[4] - ownCum[4];
    const annualNow = currentSpend - retainer;
    let payback = 6;
    for (let y = 0; y < 5; y++) {
      if (rentCum[y] >= ownCum[y]) {
        payback = y + 1;
        break;
      }
    }
    return { retainer, build, rent, rentCum, ownCum, saved5, annualNow, payback };
  }, [tenants, currentSpend]);

  // chart geometry
  const W = 460;
  const H = 200;
  const pad = { l: 8, r: 8, t: 14, b: 22 };
  const maxV = Math.max(model.rentCum[4], model.ownCum[4]) * 1.05;
  const x = (i: number) => pad.l + ((W - pad.l - pad.r) * i) / 5;
  const y = (v: number) => H - pad.b - ((H - pad.t - pad.b) * v) / maxV;
  const rentPath = [0, ...model.rentCum].map((v, i) => `${x(i)},${y(v)}`).join(" ");
  const ownStart = model.build;
  const ownPath = [ownStart, ...model.ownCum].map((v, i) => `${x(i)},${y(v)}`).join(" ");

  return (
    <div className="card overflow-hidden">
      <div className="grid md:grid-cols-[0.95fr_1.05fr]">
        {/* INPUTS */}
        <div className="border-b border-line p-7 md:border-b-0 md:border-r">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-own">
            Your numbers
          </span>
          <h3 className="mt-2 font-display text-[22px] font-bold tracking-[-0.01em]">
            See your own savings curve.
          </h3>

          {/* vendor */}
          <div className="mt-6">
            <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
              Current SIEM
            </label>
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              {VENDORS.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVendor(v.id)}
                  className={`rounded-lg border px-3 py-2.5 text-left text-[13px] transition-colors ${
                    vendor === v.id
                      ? "border-own bg-own/10 text-text"
                      : "border-line text-muted hover:border-line/80 hover:text-text"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
            <p className="mt-2 font-mono text-[11px] text-muted-2">
              {VENDORS.find((v) => v.id === vendor)!.note}
            </p>
          </div>

          {/* tenants */}
          <div className="mt-6">
            <div className="flex items-baseline justify-between">
              <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                Clients / tenants
              </label>
              <span className="font-display text-[18px] font-bold text-text">{tenants}</span>
            </div>
            <input
              type="range"
              min={3}
              max={80}
              value={tenants}
              onChange={(e) => setTenants(Number(e.target.value))}
              className="mt-3 w-full accent-own"
            />
          </div>

          {/* spend */}
          <div className="mt-6">
            <div className="flex items-baseline justify-between">
              <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                Current SIEM spend / yr
              </label>
              {edited && (
                <button
                  onClick={() => {
                    setEdited(false);
                    setSpend(null);
                  }}
                  className="font-mono text-[10.5px] text-own hover:underline"
                >
                  reset estimate
                </button>
              )}
            </div>
            <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-line bg-white/[0.02] px-3 focus-within:border-own">
              <span className="font-mono text-muted">$</span>
              <input
                type="number"
                value={Math.round(currentSpend)}
                onChange={(e) => {
                  setEdited(true);
                  setSpend(Number(e.target.value));
                }}
                className="w-full bg-transparent py-2.5 font-display text-[18px] font-bold text-text outline-none"
              />
              <span className="font-mono text-[12px] text-muted-2">k</span>
            </div>
            {!edited && (
              <p className="mt-2 font-mono text-[11px] text-muted-2">
                Auto-estimated from your size — type your real figure to sharpen it.
              </p>
            )}
          </div>
        </div>

        {/* RESULTS */}
        <div className="p-7">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                Kept over 5 years
              </div>
              <motion.div
                key={Math.round(model.saved5)}
                initial={{ opacity: 0.4, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-1 font-display text-[clamp(34px,5vw,52px)] font-extrabold tracking-[-0.02em] gold-gradient"
              >
                {fmt(model.saved5)}
              </motion.div>
            </div>
            <div className="flex gap-5">
              <div>
                <div className="font-display text-[22px] font-extrabold text-text">
                  {fmt(model.annualNow)}
                  <span className="text-[13px] font-medium text-muted-2">/yr</span>
                </div>
                <div className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-muted">
                  Saving year one
                </div>
              </div>
              <div>
                <div className="font-display text-[22px] font-extrabold text-text">
                  {model.payback <= 5 ? `Yr ${model.payback}` : "—"}
                </div>
                <div className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-muted">
                  Payback
                </div>
              </div>
            </div>
          </div>

          {/* chart */}
          <svg viewBox={`0 0 ${W} ${H}`} className="mt-5 w-full" role="img" aria-label="Cumulative cost: rented SIEM versus owned platform over five years">
            <defs>
              <linearGradient id="calcGap" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e6b54a" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#e6b54a" stopOpacity="0.01" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={i} x1={x(i)} y1={pad.t} x2={x(i)} y2={H - pad.b} stroke="#16202b" />
            ))}
            <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#1f2a36" />

            <motion.polygon
              points={`${rentPath} ${x(5)},${y(0)} ${x(0)},${y(0)}`}
              fill="url(#calcGap)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <polyline points={ownPath} fill="none" stroke="#e6b54a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points={rentPath} fill="none" stroke="#5aa6be" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />

            {[0, 5].map((i) => (
              <text key={i} x={x(i)} y={H - 6} className="font-mono" fontSize="10" fill="#647284" textAnchor={i === 0 ? "start" : "end"}>
                {i === 0 ? "Today" : "Year 5"}
              </text>
            ))}
          </svg>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-5 font-mono text-[12px] text-muted">
              <span className="flex items-center gap-2">
                <i className="inline-block h-[3px] w-3.5 rounded bg-rent" /> Keep renting
              </span>
              <span className="flex items-center gap-2">
                <i className="inline-block h-[3px] w-3.5 rounded bg-own" /> Own it (build + flat retainer)
              </span>
            </div>
            <a href="#contact" className="btn btn-gold !py-2.5 !text-[13px]">
              Pressure-test these numbers
            </a>
          </div>

          <p className="mt-4 text-[12.5px] leading-relaxed text-muted-2">
            Conservative model: vendor bill escalates ~9%/yr; your owned cost is a one-time build plus
            a flat retainer that only steps up by client band. Growth widens the gap further — on a
            rented SIEM every new client adds cost forever; on your own it&apos;s near zero. Figures
            are illustrative until we run your real invoice.
          </p>
        </div>
      </div>
    </div>
  );
}
