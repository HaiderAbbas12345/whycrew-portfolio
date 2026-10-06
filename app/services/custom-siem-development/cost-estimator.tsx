"use client";

import { useState } from "react";

export interface CostTier {
  key: string;
  label: string;
  buildCost: string;
  buildNote: string;
  licensedCost: string;
  licensedNote: string;
}

export function CostEstimator({ tiers }: { tiers: CostTier[] }) {
  const [active, setActive] = useState(tiers[0].key);
  const tier = tiers.find((t) => t.key === active) ?? tiers[0];

  return (
    <div className="rounded-lg border border-line/70 bg-surface/75 p-6 sm:p-8">
      <div className="flex flex-wrap gap-3 border-b border-line-soft pb-6">
        {tiers.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setActive(t.key)}
            aria-pressed={active === t.key}
            className={`rounded-md border px-4 py-2.5 text-[13.5px] font-semibold transition-colors duration-300 ${
              active === t.key
                ? "border-transparent bg-brand text-white"
                : "border-line/60 text-muted hover:border-line hover:text-body"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <div>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint">
            WhyCrew Build Cost · One-Time
          </p>
          <div className="mt-3 text-2xl font-semibold text-bright sm:text-3xl">
            {tier.buildCost}
          </div>
          <p className="mt-1.5 text-[12.5px] text-faint">{tier.buildNote}</p>
        </div>
        <div>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint">
            Typical Licensed SIEM · 3-Yr Estimate
          </p>
          <div className="mt-3 text-2xl font-semibold text-danger sm:text-3xl">
            {tier.licensedCost}
          </div>
          <p className="mt-1.5 text-[12.5px] text-faint">{tier.licensedNote}</p>
        </div>
      </div>

      <p className="mt-8 border-t border-line-soft pt-6 text-[12.5px] leading-relaxed text-faint">
        Derived from the 40–70% average savings WhyCrew clients report
        against licensed SIEM platforms. For an exact number scoped to your
        environment, book a free architecture audit.
      </p>
    </div>
  );
}
