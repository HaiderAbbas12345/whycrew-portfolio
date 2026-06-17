"use client";

import { motion } from "framer-motion";

/**
 * Brand-neutral hero visual: external data flows in and stays inside a
 * protected gold boundary. Conveys WhyCrew's core idea (sensitive data
 * stays inside its boundary) without any MSSP/SIEM-specific framing.
 */
export function BoundaryMotif() {
  const inNodes = [
    { cx: 232, cy: 96 },
    { cx: 292, cy: 78 },
    { cx: 318, cy: 132 },
    { cx: 252, cy: 150 },
    { cx: 300, cy: 168 },
  ];
  const feeders = [
    { y1: 84, y2: 96 },
    { y1: 124, y2: 120 },
    { y1: 168, y2: 150 },
  ];

  return (
    <div className="card card-glow p-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          Data stays inside the boundary
        </span>
        <span className="flex items-center gap-1.5 rounded-full border border-line bg-white/5 px-2.5 py-1 font-mono text-[10px] text-own">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-own" /> secured
        </span>
      </div>

      <svg viewBox="0 0 380 240" className="w-full" role="img" aria-label="Diagram: external data flows into a protected boundary and stays inside.">
        <defs>
          <linearGradient id="boundFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e6b54a" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#e6b54a" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {/* the boundary */}
        <rect x="150" y="40" width="200" height="160" rx="14" fill="url(#boundFill)" />
        <motion.rect
          x="150"
          y="40"
          width="200"
          height="160"
          rx="14"
          fill="none"
          stroke="#e6b54a"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0.4 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        <text x="166" y="64" className="font-mono" fontSize="11" fill="#8B98A8">
          your systems
        </text>

        {/* external sources */}
        {feeders.map((f, i) => (
          <g key={i}>
            <circle cx="20" cy={f.y1} r="4" fill="#5aa6be" />
            <line x1="28" y1={f.y1} x2="150" y2={f.y2} stroke="#243140" strokeWidth="1" />
            {/* flowing packet */}
            <motion.circle
              r="2.6"
              fill="#5aa6be"
              initial={{ opacity: 0 }}
              animate={{
                cx: [28, 150],
                cy: [f.y1, f.y2],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeInOut",
              }}
            />
          </g>
        ))}

        {/* internal secured mesh */}
        <line x1="232" y1="96" x2="292" y2="78" stroke="#e6b54a" strokeWidth="1" opacity="0.4" />
        <line x1="292" y1="78" x2="318" y2="132" stroke="#e6b54a" strokeWidth="1" opacity="0.4" />
        <line x1="232" y1="96" x2="252" y2="150" stroke="#e6b54a" strokeWidth="1" opacity="0.4" />
        <line x1="318" y1="132" x2="300" y2="168" stroke="#e6b54a" strokeWidth="1" opacity="0.4" />
        {inNodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.cx}
            cy={n.cy}
            r="5"
            fill="#e6b54a"
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          />
        ))}
      </svg>

      <div className="mt-3 flex gap-6 font-mono text-[12px] text-muted">
        <span className="flex items-center gap-2">
          <i className="inline-block h-2 w-2 rounded-full bg-rent" /> Incoming data
        </span>
        <span className="flex items-center gap-2">
          <i className="inline-block h-2 w-2 rounded-full bg-own" /> Inside your boundary
        </span>
      </div>
    </div>
  );
}
