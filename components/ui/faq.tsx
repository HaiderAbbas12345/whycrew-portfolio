"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Faq } from "@/lib/jsonld";

export function FaqAccordion({
  faqs,
  columns = 2,
}: {
  faqs: Faq[];
  columns?: 1 | 2;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div
      className={
        columns === 2 ? "grid gap-x-12 gap-y-0 md:grid-cols-2" : "max-w-5xl"
      }
    >
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b border-line-soft">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
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
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.3 },
                  }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-10 text-[13.5px] leading-relaxed text-muted">
                    {f.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
