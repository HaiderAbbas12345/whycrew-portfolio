"use client";

import { motion } from "framer-motion";

export function KillerLine() {
  return (
    <section className="relative overflow-hidden border-y border-line-soft py-20 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(600px 300px at 50% 0%, rgba(230,181,74,0.10), transparent 70%)",
        }}
      />
      <div className="wrap text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="mx-auto max-w-[20ch] font-display text-[clamp(28px,4.6vw,52px)] font-bold leading-[1.1] tracking-[-0.02em]"
        >
          <span className="text-rent">Today, every new client raises your costs.</span>{" "}
          <span className="gold-gradient">After WhyCrew, every new client is profit.</span>
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-5 max-w-[52ch] text-[15.5px] leading-relaxed text-muted"
        >
          For a business whose whole purpose is adding clients, that is the only sentence that matters.
          Owning doesn&apos;t just lower your bill — it flips your economics.
        </motion.p>
      </div>
    </section>
  );
}
