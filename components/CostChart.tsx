"use client";

import { motion } from "framer-motion";

/**
 * Signature "rent climbs vs own stays flat" chart.
 * Gold = the asset you own (flat). Cool blue = the meter you rent (climbs).
 */
export function CostChart() {
  const rentPts = "40,150 130,138 230,118 330,94 420,66";
  const ownPts = "40,150 130,150 230,150 330,150 420,150";

  return (
    <div className="card card-glow p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          Cost over time — rent vs own
        </span>
        <span className="flex items-center gap-1.5 rounded-full border border-line bg-white/5 px-2.5 py-1 font-mono text-[10px] text-own">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-own" /> live model
        </span>
      </div>

      <svg viewBox="0 0 440 250" className="w-full" role="img" aria-label="Rented SIEM cost climbs every year while an owned platform stays flat. The shaded area is the saving.">
        <defs>
          <linearGradient id="gapFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e6b54a" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#e6b54a" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* grid */}
        {[40, 90, 140, 190].map((y) => (
          <line key={y} x1="40" y1={y} x2="420" y2={y} stroke="#16202b" strokeWidth="1" />
        ))}
        <line x1="40" y1="22" x2="40" y2="214" stroke="#1f2a36" />
        <line x1="40" y1="214" x2="420" y2="214" stroke="#1f2a36" />

        {/* savings gap */}
        <motion.path
          d="M40,150 L130,138 L230,118 L330,94 L420,66 L420,150 L330,150 L230,150 L130,150 Z"
          fill="url(#gapFill)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.7 }}
        />

        {/* owned — flat */}
        <motion.polyline
          points={ownPts}
          fill="none"
          stroke="#e6b54a"
          strokeWidth="2.6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, delay: 0.2, ease: "easeInOut" }}
        />
        {/* rented — climbs */}
        <motion.polyline
          points={rentPts}
          fill="none"
          stroke="#5aa6be"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, delay: 0.7, ease: "easeInOut" }}
        />

        <circle cx="40" cy="150" r="3.4" fill="#e6b54a" />
        <text x="288" y="58" className="font-mono" fontSize="11" fill="#5aa6be">
          You rent (climbs ~9%/yr)
        </text>
        <text x="268" y="168" className="font-mono" fontSize="11" fill="#e6b54a">
          You own (flat)
        </text>
        <text x="40" y="232" className="font-mono" fontSize="11" fill="#647284">
          Year 1
        </text>
        <text x="392" y="232" className="font-mono" fontSize="11" fill="#647284">
          Year 5
        </text>
      </svg>

      <div className="mt-3 flex gap-6 font-mono text-[12px] text-muted">
        <span className="flex items-center gap-2">
          <i className="inline-block h-[3px] w-3.5 rounded bg-rent" /> Rented SIEM
        </span>
        <span className="flex items-center gap-2">
          <i className="inline-block h-[3px] w-3.5 rounded bg-own" /> Owned platform
        </span>
      </div>
    </div>
  );
}
