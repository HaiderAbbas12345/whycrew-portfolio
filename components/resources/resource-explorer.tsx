"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  RESOURCE_TOPICS,
  RESOURCE_TYPES,
  type Resource,
  type ResourceTopic,
  type ResourceType,
} from "@/lib/resources";

const PAGE_SIZE = 9;

/* ------------------------------------------------------------------ card */

function TypeBadge({ type, format }: { type: ResourceType; format: string }) {
  return (
    <p className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">
      <span className="text-accent">{type}</span>
      <span className="text-line" aria-hidden>
        /
      </span>
      <span className="text-faint">{format}</span>
    </p>
  );
}

function ResourceCard({ r }: { r: Resource }) {
  const planned = r.status === "planned";

  const inner = (
    <>
      <div className="flex items-start justify-between gap-4">
        <TypeBadge type={r.type} format={r.format} />
        {r.gated && (
          <span
            title="Requires an email to download"
            className="shrink-0 font-mono text-[9.5px] uppercase tracking-[0.16em] text-faint"
          >
            Gated
          </span>
        )}
      </div>

      <h3
        className={`mt-4 text-[15px] font-semibold leading-snug transition-colors duration-400 ${
          planned ? "text-body" : "text-bright group-hover:text-accent-hi"
        }`}
      >
        {r.title}
      </h3>

      <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-muted">
        {r.summary}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-1.5">
        {r.topics.map((t) => (
          <span
            key={t}
            className="rounded-full border border-line/60 px-2.5 py-1 text-[10.5px] text-faint"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-6 border-t border-line-soft pt-4">
        {planned ? (
          <span className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
            <span className="size-1.5 rounded-full bg-warn/70" />
            Coming soon
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent">
            {r.gated ? "Download" : "Read more"}
            <span
              aria-hidden
              className="transition-transform duration-400 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        )}
      </div>
    </>
  );

  const base =
    "flex h-full flex-col rounded-lg border p-6 transition-colors duration-500";

  if (planned) {
    return (
      <div
        className={`${base} border-dashed border-line/60 bg-surface/35`}
        aria-label={`${r.title} — coming soon`}
      >
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={r.href ?? "#"}
      className={`group ${base} border-line/70 bg-surface/75 hover:border-accent/40`}
    >
      {inner}
    </Link>
  );
}

/* -------------------------------------------------------------- explorer */

export function ResourceExplorer({ resources }: { resources: Resource[] }) {
  const [type, setType] = useState<ResourceType | "All">("All");
  const [topic, setTopic] = useState<ResourceTopic | null>(null);
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE_SIZE);
  const reduced = useReducedMotion();

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const r of resources) m.set(r.type, (m.get(r.type) ?? 0) + 1);
    return m;
  }, [resources]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((r) => {
      if (type !== "All" && r.type !== type) return false;
      if (topic && !r.topics.includes(topic)) return false;
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.topics.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [resources, type, topic, query]);

  const visible = filtered.slice(0, shown);
  const reset = () => setShown(PAGE_SIZE);

  return (
    <div>
      {/* ---------------------------------------------- type tabs */}
      <div
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Resource type"
      >
        {(["All", ...RESOURCE_TYPES] as const).map((t) => {
          const active = type === t;
          const n = t === "All" ? resources.length : (counts.get(t) ?? 0);
          return (
            <button
              key={t}
              role="tab"
              aria-selected={active}
              onClick={() => {
                setType(t);
                reset();
              }}
              className={`relative shrink-0 rounded-full border px-4 py-2 text-[12.5px] font-medium transition-colors duration-300 ${
                active
                  ? "border-accent/50 bg-accent/12 text-accent"
                  : "border-line/70 text-muted hover:border-line hover:text-bright"
              }`}
            >
              {t}
              <span
                className={`ml-2 font-mono text-[10px] ${
                  active ? "text-accent/70" : "text-faint"
                }`}
              >
                {n}
              </span>
            </button>
          );
        })}
      </div>

      {/* ---------------------------------------------- topic + search */}
      <div className="mt-6 flex flex-col gap-5 border-t border-line-soft pt-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
            Topic
          </span>
          {RESOURCE_TOPICS.map((t) => {
            const active = topic === t;
            return (
              <button
                key={t}
                aria-pressed={active}
                onClick={() => {
                  setTopic(active ? null : t);
                  reset();
                }}
                className={`rounded-full border px-3 py-1.5 text-[11.5px] transition-colors duration-300 ${
                  active
                    ? "border-brand/60 bg-brand/15 text-brand-hi"
                    : "border-line/60 text-muted hover:border-line hover:text-bright"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        <div className="relative shrink-0 lg:w-72">
          <label htmlFor="resource-search" className="sr-only">
            Search resources
          </label>
          <svg
            viewBox="0 0 20 20"
            aria-hidden
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-faint"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <circle cx="9" cy="9" r="6" />
            <path d="M13.5 13.5L17 17" strokeLinecap="round" />
          </svg>
          <input
            id="resource-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              reset();
            }}
            placeholder="Search resources"
            className="w-full rounded-md border border-line/70 bg-void/60 py-2.5 pl-10 pr-3 text-[13.5px] text-bright outline-none transition-all duration-400 placeholder:text-faint focus:border-accent/60 focus:shadow-[0_0_0_3px_rgba(45,212,168,0.12)]"
          />
        </div>
      </div>

      {/* ---------------------------------------------- result count */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
          {filtered.length} {filtered.length === 1 ? "resource" : "resources"}
        </p>
        {(type !== "All" || topic || query) && (
          <button
            onClick={() => {
              setType("All");
              setTopic(null);
              setQuery("");
              reset();
            }}
            className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent transition-colors hover:text-accent-hi"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* ---------------------------------------------- grid */}
      {filtered.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-line/60 bg-surface/30 px-6 py-16 text-center">
          <p className="text-[15px] font-semibold text-bright">
            Nothing matches that yet
          </p>
          <p className="mx-auto mt-2 max-w-md text-[13.5px] leading-relaxed text-muted">
            This library is still being filled in. Tell us what would actually
            be useful and we&apos;ll prioritise it.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:text-accent-hi"
          >
            Request a resource
            <span aria-hidden>→</span>
          </Link>
        </div>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((r, i) => (
              <motion.li
                key={r.id}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(i, 8) * 0.035,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <ResourceCard r={r} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}

      {shown < filtered.length && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setShown((s) => s + PAGE_SIZE)}
            className="rounded-md border border-line bg-surface/60 px-6 py-3 text-[13px] font-semibold text-bright transition-colors duration-400 hover:border-accent/50 hover:text-white"
          >
            Load more
            <span className="ml-2 font-mono text-[11px] text-faint">
              {filtered.length - shown} left
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
