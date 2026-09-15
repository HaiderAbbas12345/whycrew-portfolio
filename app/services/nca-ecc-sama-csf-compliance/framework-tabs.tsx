"use client";

import { useState } from "react";

export interface FrameworkPanel {
  key: string;
  label: string;
  heading: string;
  paragraphs: string[];
}

export function FrameworkTabs({ panels }: { panels: FrameworkPanel[] }) {
  const [active, setActive] = useState(panels[0].key);
  const panel = panels.find((p) => p.key === active) ?? panels[0];

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {panels.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => setActive(p.key)}
            aria-pressed={active === p.key}
            className={`rounded-md border px-4 py-2.5 text-[13.5px] font-semibold transition-colors duration-300 ${
              active === p.key
                ? "border-accent/50 bg-accent/10 text-accent"
                : "border-line/60 text-muted hover:border-line hover:text-body"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-semibold leading-tight sm:text-[1.75rem]">
          {panel.heading}
        </h3>
        <div className="mt-5 max-w-3xl space-y-4 text-[14px] leading-relaxed text-body">
          {panel.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
