"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "./Reveal";

const FAQS = [
  {
    q: "Can a small firm really match Splunk or Sentinel?",
    a: "We're not asking you to trust our SIEM over theirs. We build you your own platform that does the job, you own it, and we've already done exactly this for another MSSP. We compete on ownership, not on being a bigger product — you stop renting a billion-dollar tool you'll never own and start owning one built for your tenants.",
  },
  {
    q: "Isn't switching our core operations a huge risk?",
    a: "That's why we never flip a switch. Your current SIEM keeps running until each tenant is proven on the new platform, in parallel. We migrate client by client, highest-cost first, so nothing breaks and you're never betting the operation on an unproven system.",
  },
  {
    q: "What if WhyCrew disappears?",
    a: "You own the platform and all your data outright, and the source code sits in escrow with a neutral third party. If we ever fail, the code is released to you automatically. You are never dependent on us surviving.",
  },
  {
    q: "Why not just build it in-house ourselves?",
    a: "You can — in theory. In practice the talent that builds secure, multi-tenant AI platforms is expensive and slow to hire, and while you're hiring, the savings aren't happening. We remove that burden and you still own the result, with a standard build priced from reuse of our core engine.",
  },
  {
    q: "The price feels high.",
    a: "It's lower than one year of what you'll keep paying your vendor forever — and unlike that vendor, it doesn't climb every year. We take 25% on signing and the rest against delivery milestones, so our work is protected and so is yours. Bring your real invoice and we'll put the comparison on the table.",
  },
  {
    q: "Do we still need our security analysts?",
    a: "Yes. We replace the rented platform and the part of the bill that climbs forever — not your team. The AI cuts the repetitive investigation grind, but the people who run your SOC stay. We only ever compare our build plus maintenance against your rented-platform cost, never against your whole operation.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-[820px]">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={f.q} delay={i * 0.04}>
            <div className="border-b border-line">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="font-display text-[17px] font-semibold text-text">{f.q}</span>
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="shrink-0 text-own">
                  <Plus size={18} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-[68ch] pb-6 text-[15.5px] leading-relaxed text-muted">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
