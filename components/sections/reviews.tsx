import Link from "next/link";
import { Reveal } from "@/components/motion";
import { Stars } from "@/components/sections/review-marks";
import { CASE_STUDIES } from "@/lib/case-studies";
import { RATING_LABEL, reviewById, type Review } from "@/lib/reviews";

export { ReviewSlider } from "@/components/sections/review-slider";

/* ------------------------------------------------ contact page panel */

/**
 * Sits beside the contact form: two short quotes from teams who booked the
 * same call. The second uses the excerpt, the design's shorter cut of the
 * same review.
 */
export function ReviewPanel() {
  const quotes = [reviewById("research"), reviewById("essome")];

  return (
    <aside
      aria-labelledby="review-panel-title"
      className="flex flex-col gap-6 rounded-3xl border border-line/60 bg-void p-7 sm:p-10"
    >
      <div className="flex flex-col gap-2.5">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.26em] text-accent">
          Before you send
        </span>
        <h3
          id="review-panel-title"
          className="text-2xl font-semibold leading-[1.2] tracking-[-0.015em] text-bright"
        >
          Teams Who Booked the Same Call
        </h3>
        <div className="flex items-center gap-2 text-[13.5px] text-bright">
          <Stars className="tracking-[1px]" />
          <span>{RATING_LABEL}</span>
        </div>
      </div>

      {quotes.map((r) => (
        <figure
          key={r.id}
          className="flex flex-col gap-3.5 rounded-[18px] border border-line bg-surface/75 p-6"
        >
          <span className="text-xs tracking-[1px] text-accent">
            <span aria-hidden>★★★★★</span>{" "}
            <span className="tracking-normal text-bright">5.0</span>
          </span>
          <blockquote className="text-[15px] leading-[1.6] text-[#dbe3f5]">
            &ldquo;{r.excerpt ?? r.quote}&rdquo;
          </blockquote>
          <figcaption className="flex flex-col gap-[3px]">
            <span className="text-[13.5px] font-semibold text-bright">
              {r.name}
            </span>
            <span className="text-[12.5px] text-[#8b9ac0]">{r.role}</span>
          </figcaption>
        </figure>
      ))}

      <p className="text-[12.5px] leading-normal text-[#8b9ac0]">
        Quoted word for word from our Upwork reviews.
      </p>
    </aside>
  );
}

/* ------------------------------------------------ service page block */

/**
 * One review beside the case study closest to the service, placed after the
 * page's results. `metric` names a label from the study's own `metrics`, so
 * the figure is read from the registry and a typo fails the build instead of
 * showing a wrong number (the same rule as the homepage case-study cards).
 */
export function ServiceReview({
  review,
  study: slug,
  metric,
}: {
  review: Review["id"];
  study: string;
  metric: string;
}) {
  const r = reviewById(review);
  const study = CASE_STUDIES.find((c) => c.slug === slug);
  if (!study) throw new Error(`Unknown case study slug: ${slug}`);
  const lead = study.metrics.find((m) => m.label === metric);
  if (!lead) throw new Error(`${slug} has no metric labelled "${metric}"`);

  return (
    <section
      aria-label="Client review"
      className="relative py-16 sm:py-20"
    >
      <Reveal className="container-page grid gap-6 lg:grid-cols-3">
        <figure className="flex flex-col justify-between gap-7 rounded-[20px] border border-line bg-surface/75 p-7 sm:p-10 lg:col-span-2">
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.26em] text-accent">
                {r.context}
              </span>
              <span className="flex items-center gap-2 text-[13px] text-bright">
                <Stars className="tracking-[2px]" /> {RATING_LABEL}
              </span>
            </div>
            <blockquote className="text-lg font-medium leading-[1.5] tracking-[-0.01em] text-bright sm:text-xl">
              &ldquo;{r.quote}&rdquo;
            </blockquote>
          </div>
          <figcaption className="flex flex-col gap-1 border-t border-line pt-5">
            <span className="text-[15px] font-semibold text-bright">
              {r.name}
            </span>
            <span className="text-[13.5px] text-[#8b9ac0]">{r.role}</span>
          </figcaption>
        </figure>

        <Link
          href={`/case-studies/${study.slug}`}
          className="group flex flex-col justify-between gap-5 rounded-[20px] border border-line bg-surface/75 p-8 text-body transition-colors duration-500 hover:border-accent/40"
        >
          <span className="flex flex-col gap-3.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8b9ac0]">
              Related case study
            </span>
            <span className="text-[17px] font-semibold leading-[1.35] text-bright transition-colors duration-400 group-hover:text-accent-hi">
              {study.title}
            </span>
          </span>
          <span className="flex flex-col gap-1">
            <span className="text-[34px] font-semibold tracking-[-0.02em] text-accent">
              {lead.value}
            </span>
            <span className="text-[13.5px] text-[#8b9ac0]">{lead.label}</span>
          </span>
          <span className="text-[13.5px] font-semibold text-accent">
            Read the case study{" "}
            <span
              aria-hidden
              className="inline-block transition-transform duration-400 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
