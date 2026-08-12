"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "./Reveal";
import { JsonLd } from "./JsonLd";
import { faqPageSchema } from "@/lib/schema";

export type FaqItem = { q: string; a: string };

/**
 * Accessible FAQ accordion that also emits FAQPage JSON-LD structured data,
 * so the same questions are eligible for rich results and cited by AI answers.
 *
 * Collapsed answers stay mounted and are collapsed by height rather than
 * unmounted: the markup only qualifies for rich results if the answer text is
 * actually present in the served HTML, not injected on click.
 */
export function FaqList({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <div className="mx-auto max-w-[820px]">
      <JsonLd schema={faqPageSchema(items)} />
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={f.q} delay={i * 0.04}>
            <div className="border-b border-line">
              <button
                id={`${uid}-q-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`${uid}-a-${i}`}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="font-display text-[17px] font-semibold text-text">{f.q}</span>
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="shrink-0 text-own">
                  <Plus size={18} />
                </motion.span>
              </button>
              <motion.div
                id={`${uid}-a-${i}`}
                role="region"
                aria-labelledby={`${uid}-q-${i}`}
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
                className="overflow-hidden"
              >
                <p className="max-w-[68ch] pb-6 text-[15.5px] leading-relaxed text-muted">{f.a}</p>
              </motion.div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
