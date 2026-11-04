"use client";

import { useState, type KeyboardEvent } from "react";
import { Reveal } from "@/components/motion";
import { RATING_LABEL, REVIEWS, REVIEW_PROFILES } from "@/lib/reviews";
import { EXTERNAL_REL } from "@/lib/site";
import { QuoteMark, ShieldBadge, Stars } from "@/components/sections/review-marks";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Homepage "Client reviews" carousel.
 *
 * Every slide is rendered, stacked in one grid cell, and only the current one
 * is shown. That keeps the card at the height of the longest quote, so the
 * controls never jump as you page, and it puts all four quotes in the server
 * HTML rather than only the first. No autoplay: a quote that moves while it is
 * being read is worse than one that waits for a click.
 */
export function ReviewSlider() {
  const [i, setI] = useState(0);
  const n = REVIEWS.length;
  const go = (k: number) => setI((k + n) % n);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(i - 1);
    if (e.key === "ArrowRight") go(i + 1);
  };

  return (
    <section
      id="reviews"
      aria-roledescription="carousel"
      aria-label="Client reviews"
      className="relative scroll-mt-28 border-t border-line-soft bg-ink py-16 sm:py-24"
    >
      <div className="container-page grid gap-y-7 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-8">
        {/* ---------------------------------------- heading */}
        <Reveal className="flex flex-col gap-3.5 lg:col-span-4 lg:gap-[18px]">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.26em] text-accent">
            Client reviews
          </span>
          <h2 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-bright lg:text-[40px] lg:leading-[1.1] lg:tracking-[-0.025em]">
            What Clients Say After the Handover
          </h2>
          <p className="text-[15px] leading-[1.6] text-body lg:leading-[1.65]">
            <span className="hidden lg:inline">
              From CISOs, founders and security teams we&apos;ve engineered
              platforms for.{" "}
            </span>
            Quoted word for word from our Upwork reviews.
          </p>
        </Reveal>

        {/* ---------------------------------------- slider */}
        <div
          onKeyDown={onKey}
          className="flex flex-col gap-7 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:gap-5"
        >
          <div className="grid">
            {REVIEWS.map((r, k) => {
              const active = k === i;
              return (
                <figure
                  key={r.id}
                  aria-roledescription="slide"
                  aria-label={`${pad(k + 1)} / ${pad(n)}`}
                  aria-hidden={!active}
                  inert={!active}
                  className={`relative col-start-1 row-start-1 flex flex-col justify-between gap-6 overflow-hidden rounded-[20px] border border-line bg-gradient-to-b from-surface-2/90 to-surface/90 px-6 py-7 transition-opacity duration-500 lg:gap-8 lg:rounded-3xl lg:p-12 ${
                    active ? "visible opacity-100" : "invisible opacity-0"
                  }`}
                >
                  <div
                    aria-hidden
                    className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-accent/0 via-accent/60 to-accent/0 lg:inset-x-12"
                  />
                  <div className="flex flex-col gap-[18px] lg:gap-6">
                    <div className="flex items-center justify-between">
                      <QuoteMark className="h-6 w-[30px] lg:h-8 lg:w-10" />
                      <span className="flex items-center gap-2 text-xs text-bright lg:text-[13px]">
                        <Stars className="tracking-[1px] lg:tracking-[2px]" />
                        <span>{RATING_LABEL}</span>
                      </span>
                    </div>
                    <blockquote
                      className={`text-[17px] font-medium leading-[1.55] text-bright lg:leading-[1.5] lg:tracking-[-0.012em] ${r.size}`}
                    >
                      &ldquo;{r.quote}&rdquo;
                    </blockquote>
                  </div>
                  <figcaption className="flex items-center gap-3 border-t border-line pt-[18px] lg:gap-3.5 lg:pt-6">
                    <ShieldBadge />
                    <span className="flex flex-col gap-[3px]">
                      <span className="text-sm font-semibold text-bright lg:text-[15px]">
                        {r.name}
                      </span>
                      <span className="text-[13px] text-[#8b9ac0] lg:text-[13.5px]">
                        {r.role}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          {/* -------------------------------------- controls */}
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span
                aria-live="polite"
                className="hidden min-w-14 font-mono text-xs tracking-[0.12em] text-bright lg:inline"
              >
                {pad(i + 1)} / {pad(n)}
              </span>
              <div className="flex gap-0.5 lg:gap-1">
                {REVIEWS.map((r, k) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => go(k)}
                    aria-label={`Show review ${k + 1} of ${n}`}
                    aria-current={k === i}
                    className="flex h-11 w-8 cursor-pointer items-center lg:w-10"
                  >
                    <span
                      className={`block h-[3px] w-full rounded-sm transition-colors duration-300 ${
                        k === i ? "bg-accent" : "bg-line"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2 lg:gap-2.5">
              <button
                type="button"
                onClick={() => go(i - 1)}
                aria-label="Previous review"
                className="grid size-11 cursor-pointer place-items-center rounded-full border border-line bg-surface/75 text-bright transition-colors duration-300 hover:border-accent/50 lg:size-12"
              >
                <Chevron dir="left" />
              </button>
              <button
                type="button"
                onClick={() => go(i + 1)}
                aria-label="Next review"
                className="grid size-11 cursor-pointer place-items-center rounded-full bg-accent text-void transition-colors duration-300 hover:bg-accent-hi lg:size-12"
              >
                <Chevron dir="right" />
              </button>
            </div>
          </div>
        </div>

        {/* ---------------------------------------- profiles */}
        <div className="flex flex-wrap items-center gap-2.5 lg:col-span-4 lg:row-start-2 lg:flex-col lg:items-start lg:gap-3 lg:self-end">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8b9ac0]">
            Find us on
          </span>
          <div className="flex gap-2.5">
            {REVIEW_PROFILES.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel={EXTERNAL_REL}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line bg-surface/75 px-4 text-[13.5px] font-semibold text-bright transition-colors duration-300 hover:border-accent/50 lg:px-[18px]"
              >
                {p.name} <span className="text-accent">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="size-4 lg:size-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={dir === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
    </svg>
  );
}
