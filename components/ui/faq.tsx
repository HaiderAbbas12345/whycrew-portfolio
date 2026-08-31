"use client";

import { useId, useState } from "react";
import type { Faq } from "@/lib/jsonld";

export function FaqAccordion({
  faqs,
  columns = 2,
}: {
  faqs: Faq[];
  columns?: 1 | 2;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  const item = (f: Faq, i: number) => {
    const isOpen = open === i;
    const panelId = `${uid}-panel-${i}`;

    return (
      <div key={f.q} className="border-b border-line-soft">
        <h3>
          <button
            type="button"
            onClick={() => setOpen(isOpen ? null : i)}
            aria-expanded={isOpen}
            aria-controls={panelId}
            className="group flex w-full items-start justify-between gap-6 py-5 text-left"
          >
            <span
              className={`text-[14.5px] font-semibold leading-snug transition-colors duration-300 ${
                isOpen
                  ? "text-accent"
                  : "text-bright group-hover:text-accent-hi"
              }`}
            >
              {f.q}
            </span>
            <span
              aria-hidden
              className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen
                  ? "rotate-45 border-accent/60 bg-accent/12 text-accent"
                  : "border-line text-muted group-hover:border-accent/40"
              }`}
            >
              <svg viewBox="0 0 12 12" className="size-3" fill="none">
                <path
                  d="M6 1v10M1 6h10"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </button>
        </h3>
        {/*
          Collapsed with CSS, never unmounted.

          The answer used to be mounted only while its item was open, so on a
          seven-question page six answers existed nowhere in the served HTML.
          Googlebot runs JavaScript but it does not click, which put that copy
          permanently out of reach — and left the FAQPage JSON-LD declaring
          answers the page did not visibly carry, which Google's structured
          data policy treats as a mismatch.

          The 0fr → 1fr grid row collapses the panel to nothing while leaving
          the text in the document, and animates as smoothly as the height
          tween it replaces. A browser too old to interpolate
          grid-template-rows snaps open instead of easing; nothing is hidden
          or revealed incorrectly either way.
        */}
        <div
          id={panelId}
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <p className="pb-6 pr-10 text-[13.5px] leading-relaxed text-muted">
              {f.a}
            </p>
          </div>
        </div>
      </div>
    );
  };

  if (columns === 1) {
    return <div className="max-w-5xl">{faqs.map(item)}</div>;
  }

  /**
   * Two independent column stacks, not a two-column grid.
   *
   * In a grid the side-by-side items share a row, so expanding one stretches
   * the other's cell and pushes its bottom rule down — which reads as if the
   * opposite question had opened too, just with no answer in it. Separate
   * stacks let each column size itself, so an expansion only moves the items
   * below it in its own column.
   *
   * Indices alternate (0,2,4… | 1,3,5…) to preserve the original grid's
   * left-to-right reading order, and `open` stays a single index across both
   * columns so only one answer is ever expanded.
   */
  const indices = faqs.map((_, i) => i);

  return (
    <div className="grid gap-x-12 md:grid-cols-2 md:items-start">
      <div>
        {indices.filter((i) => i % 2 === 0).map((i) => item(faqs[i], i))}
      </div>
      <div>
        {indices.filter((i) => i % 2 === 1).map((i) => item(faqs[i], i))}
      </div>
    </div>
  );
}
