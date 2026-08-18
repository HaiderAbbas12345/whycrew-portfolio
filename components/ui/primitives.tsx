import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal, Scramble, Spotlight } from "@/components/motion";

/* ---------------------------------------------- Section shell */

export function Section({
  id,
  children,
  className = "",
  bleed = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  bleed?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-28 py-20 sm:py-28 ${className}`}
    >
      {!bleed ? <div className="container-page">{children}</div> : children}
    </section>
  );
}

/* ---------------------------------------------- Eyebrow label */

export function Eyebrow({
  children,
  tone = "accent",
}: {
  children: string;
  tone?: "accent" | "brand" | "danger";
}) {
  const color =
    tone === "brand"
      ? "text-brand-hi"
      : tone === "danger"
        ? "text-danger"
        : "text-accent";
  return (
    <p
      className={`mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.26em] ${color}`}
    >
      <Scramble text={children} />
    </p>
  );
}

/* ---------------------------------------------- Section heading */

export function Heading({
  children,
  sub,
  align = "left",
  as: Tag = "h2",
}: {
  children: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
}) {
  const a = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-3xl ${a}`}>
      <Tag className="text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-[2.75rem]">
        {children}
      </Tag>
      {sub ? (
        <p className="mt-5 text-[15px] leading-relaxed text-body sm:text-base">
          {sub}
        </p>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------- Pill badge */

export function Pill({
  children,
  tone = "accent",
}: {
  children: ReactNode;
  tone?: "accent" | "brand";
}) {
  const ring =
    tone === "brand"
      ? "border-brand/35 text-brand-hi bg-brand/10"
      : "border-accent/30 text-accent bg-accent/8";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border ${ring} px-4 py-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em]`}
    >
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-60" />
        <span className="relative inline-flex size-1.5 rounded-full bg-current" />
      </span>
      {children}
    </span>
  );
}

/* ---------------------------------------------- Card */

export function Card({
  children,
  className = "",
  interactive = true,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  // No backdrop-blur here: with dozens of cards on a page, every one of them
  // re-blurs whatever is behind it on each scroll frame. A slightly more
  // opaque fill reads the same and costs nothing.
  const base =
    "rounded-lg border border-line/70 bg-surface/75 transition-colors duration-500";
  if (!interactive) {
    return <div className={`${base} ${className}`}>{children}</div>;
  }
  return (
    <Spotlight className={`${base} hover:border-line ${className}`}>
      {children}
    </Spotlight>
  );
}

/* ---------------------------------------------- Stat bar */

export interface Stat {
  value: string;
  label: string;
}

export function StatBar({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 divide-line/60 overflow-hidden rounded-lg border border-line/70 bg-surface/70 sm:grid-cols-4 sm:divide-x">
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.08} className="group">
          <div className="relative px-5 py-7 text-center transition-colors duration-500 hover:bg-brand/6">
            <div className="text-2xl font-semibold tracking-tight text-gradient sm:text-3xl">
              {s.value}
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
              {s.label}
            </div>
            <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-700 group-hover:scale-x-100" />
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------------------------------------------- Check / arrow list */

export function CheckList({
  items,
  tone = "accent",
}: {
  items: string[];
  tone?: "accent" | "brand";
}) {
  const c = tone === "brand" ? "text-brand-hi" : "text-accent";
  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <li key={it} className="flex gap-3 text-sm leading-relaxed text-body">
          <svg
            viewBox="0 0 20 20"
            className={`mt-0.5 size-4 shrink-0 ${c}`}
            fill="none"
            aria-hidden
          >
            <path
              d="M4 10.5l3.6 3.5L16 6"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function ArrowList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it) => (
        <li
          key={it}
          className="flex gap-3 text-[13.5px] leading-relaxed text-muted"
        >
          <span className="mt-[2px] font-mono text-accent" aria-hidden>
            →
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------------------------------------------- Comparison table */

export function CompareTable({
  head,
  rows,
  highlightCol = -1,
}: {
  head: string[];
  rows: string[][];
  /** zero-based index of the WhyCrew column to emphasise */
  highlightCol?: number;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line/70 bg-surface/40">
      <table className="w-full min-w-[680px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line/70 bg-surface-2/50">
            {head.map((h, i) => (
              <th
                key={h}
                scope="col"
                className={`px-5 py-4 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] ${
                  i === highlightCol ? "text-accent" : "text-faint"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr
              key={r[0] + ri}
              className="border-b border-line-soft/70 transition-colors last:border-0 hover:bg-brand/5"
            >
              {r.map((cell, ci) => (
                <td
                  key={ci}
                  className={`px-5 py-4 align-top leading-relaxed ${
                    ci === 0
                      ? "font-medium text-bright"
                      : ci === highlightCol
                        ? "text-accent-hi"
                        : "text-muted"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------------------------------------- Numbered process */

export interface Step {
  title: string;
  body: string;
}

export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <Reveal key={s.title} delay={i * 0.09} as="li">
          <Card className="group h-full p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-md border border-brand/35 bg-brand/12 font-mono text-xs font-bold text-brand-hi transition-all duration-500 group-hover:border-accent/50 group-hover:bg-accent/12 group-hover:text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-line to-transparent" />
            </div>
            <h3 className="text-[15px] font-semibold leading-snug">{s.title}</h3>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
              {s.body}
            </p>
          </Card>
        </Reveal>
      ))}
    </ol>
  );
}

/* ---------------------------------------------- Quote */

export function Quote({
  children,
  author,
  role,
}: {
  children: ReactNode;
  author: string;
  role: string;
}) {
  return (
    <figure className="relative overflow-hidden rounded-lg border border-line/70 bg-gradient-to-br from-surface/80 via-surface/40 to-brand/8 p-8 sm:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-14 select-none font-serif text-[9rem] leading-none text-brand/12"
      >
        &ldquo;
      </div>
      <blockquote className="relative max-w-3xl text-[15px] leading-relaxed text-bright sm:text-lg sm:leading-relaxed">
        {children}
      </blockquote>
      <figcaption className="relative mt-6 flex items-center gap-3">
        <span className="h-px w-8 bg-accent" />
        <span className="text-sm font-medium text-bright">{author}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
          {role}
        </span>
      </figcaption>
    </figure>
  );
}

/* ---------------------------------------------- Divider */

export function Hairline() {
  return <div className="hairline w-full" aria-hidden />;
}

/* ---------------------------------------------- Breadcrumb */

export function Breadcrumb({
  trail,
}: {
  trail: { name: string; path: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
        {trail.map((t, i) => (
          <li key={t.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {i === trail.length - 1 ? (
              <span className="text-muted">{t.name}</span>
            ) : (
              <Link
                href={t.path}
                className="transition-colors hover:text-accent"
              >
                {t.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
