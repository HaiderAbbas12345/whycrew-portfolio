import Link from "next/link";
import type { ReactNode } from "react";
import { resolveLink } from "@/lib/blog";

/* ---------------------------------------------------------------- headings */

/**
 * Section heading. There are no dividers between sections, so this top padding
 * is what separates them — hence a larger gap than a rule-separated layout
 * would need.
 */
export function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="group scroll-mt-28 pt-16 text-2xl font-semibold leading-tight text-bright first:pt-0 sm:text-[1.75rem]"
    >
      <a href={`#${id}`} className="no-underline">
        {children}
        <span
          aria-hidden
          className="ml-2 select-none text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-60"
        >
          #
        </span>
      </a>
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="pt-8 text-[17px] font-semibold leading-snug text-bright">
      {children}
    </h3>
  );
}

/* ------------------------------------------------------------------- text */

export function P({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 text-[15px] leading-[1.75] text-body">{children}</p>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="text-[16.5px] leading-[1.7] text-body sm:text-[17px]">
      {children}
    </p>
  );
}

export function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-bright">{children}</strong>;
}

/**
 * Internal cross-link. Unresolved targets (articles not yet published) render
 * as plain emphasised text rather than a link to a page that doesn't exist.
 */
export function Ref({ to, children }: { to: string; children: ReactNode }) {
  const href = resolveLink(to);
  if (!href) {
    return <span className="text-bright">{children}</span>;
  }
  return (
    <Link
      href={href}
      className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
    >
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------- lists */

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-[15px] leading-[1.7] text-body">
          <span
            aria-hidden
            className="mt-[10px] size-1.5 shrink-0 rounded-full bg-accent/80"
          />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/* --------------------------------------------------------------- callouts */

export function QuickAnswer({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-accent/25 bg-accent/6 p-6 sm:p-7">
      <p className="mb-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-accent">
        Quick answer
      </p>
      <p className="text-[15px] leading-[1.7] text-body">{children}</p>
    </div>
  );
}

export function KeyTakeaways({ items }: { items: ReactNode[] }) {
  return (
    <aside className="rounded-lg border border-line/70 bg-surface/60 p-6 sm:p-7">
      <h2
        id="key-takeaways"
        className="mb-5 scroll-mt-28 font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-brand-hi"
      >
        Key takeaways
      </h2>
      <ul className="space-y-3.5">
        {items.map((it, i) => (
          <li
            key={i}
            className="flex gap-3 text-[14px] leading-[1.7] text-body"
          >
            <svg
              viewBox="0 0 20 20"
              className="mt-1 size-3.5 shrink-0 text-accent"
              fill="none"
              aria-hidden
            >
              <path
                d="M4 10.5l3.6 3.5L16 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/* ------------------------------------------------------------------ tables */

export function DataTable({
  caption,
  head,
  rows,
  highlightCol = -1,
}: {
  caption?: string;
  head: string[];
  rows: ReactNode[][];
  highlightCol?: number;
}) {
  return (
    <figure className="mt-6">
      <div className="overflow-x-auto rounded-lg border border-line/70 bg-surface/50">
        <table className="w-full min-w-[560px] border-collapse text-left text-[14px]">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            <tr className="border-b border-line/70 bg-surface-2/50">
              {head.map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  className={`px-5 py-3.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] ${
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
                key={ri}
                className="border-b border-line-soft/70 transition-colors last:border-0 hover:bg-brand/5"
              >
                {r.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`px-5 py-3.5 align-top leading-relaxed ${
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
    </figure>
  );
}

