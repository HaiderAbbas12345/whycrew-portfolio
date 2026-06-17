import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight, Home } from "lucide-react";
import { Reveal } from "./Reveal";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-own">
      <span className="h-1.5 w-1.5 rounded-[2px] rotate-45 bg-own" />
      {children}
    </span>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`border-t border-line-soft py-20 md:py-24 ${className}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <Reveal className="mb-12 max-w-[62ch]">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 font-display text-[clamp(28px,4vw,46px)] font-bold leading-[1.05] tracking-[-0.02em] text-gradient">
        {title}
      </h2>
      {lead && <p className="mt-4 text-[clamp(16px,1.6vw,19px)] leading-relaxed text-muted">{lead}</p>}
    </Reveal>
  );
}

/* Service sub-page hero */
export function ServiceHero({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: ReactNode;
  sub: ReactNode;
}) {
  return (
    <section className="pt-20 pb-8 md:pt-24">
      <div className="wrap">
        <div className="flex items-center gap-4 font-mono text-[12px] text-muted">
          <Link href="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-own">
            <Home size={13} /> Home
          </Link>
          <span className="text-line">/</span>
          <Link href="/#services" className="inline-flex items-center gap-1.5 transition-colors hover:text-own">
            <ArrowLeft size={13} /> All services
          </Link>
        </div>
        <Reveal className="mt-6">
          <Eyebrow>{kicker}</Eyebrow>
          <h1 className="mt-5 max-w-[18ch] font-display text-[clamp(34px,5.2vw,60px)] font-bold leading-[1.04] tracking-[-0.02em] text-gradient">
            {title}
          </h1>
          <p className="mt-5 max-w-[52ch] text-[clamp(17px,1.7vw,21px)] leading-relaxed text-muted">
            {sub}
          </p>
          <div className="mt-7 flex flex-wrap gap-3.5">
            <Link href="/#contact" className="btn btn-gold">
              Book a call <ArrowUpRight size={16} />
            </Link>
            <a href="#how" className="btn btn-ghost">
              How we work
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function DeliverList({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3.5 md:grid-cols-2">
      {items.map((it, i) => (
        <Reveal key={it} delay={i * 0.05}>
          <div className="card flex h-full items-start gap-3.5 p-5">
            <span className="mt-0.5 font-mono text-own">→</span>
            <p className="text-[15.5px] text-text">{it}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function Steps({
  steps,
}: {
  steps: { n: string; title: string; body: string }[];
}) {
  return (
    <div className="grid overflow-hidden rounded-2xl border border-line md:grid-cols-3">
      {steps.map((s, i) => (
        <div
          key={s.n}
          className={`p-7 ${i < steps.length - 1 ? "border-b border-line md:border-b-0 md:border-r" : ""}`}
        >
          <div className="font-mono text-[13px] text-own">{s.n}</div>
          <h3 className="mt-3.5 font-display text-[18px] font-bold">{s.title}</h3>
          <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{s.body}</p>
        </div>
      ))}
    </div>
  );
}

export function Assure({ children }: { children: ReactNode }) {
  return (
    <Reveal className="mt-10">
      <p className="max-w-[56ch] border-l-2 border-own pl-5 text-[16px] leading-relaxed text-muted">
        {children}
      </p>
    </Reveal>
  );
}

export function CTABand({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: ReactNode;
  body: ReactNode;
}) {
  return (
    <section id="contact" className="border-t border-line-soft py-24 text-center">
      <div className="wrap">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mx-auto mt-5 max-w-[18ch] font-display text-[clamp(30px,5vw,52px)] font-bold leading-[1.05] tracking-[-0.02em] text-gradient">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-[48ch] text-muted">{body}</p>
          <a href="mailto:hello@whycrew.com" className="btn btn-gold mx-auto mt-7">
            Book a call <ArrowUpRight size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
