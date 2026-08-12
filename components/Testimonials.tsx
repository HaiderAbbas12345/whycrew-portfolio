"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { TESTIMONIALS, type Testimonial } from "@/lib/site";

/**
 * Client references, as a slider.
 *
 * Embla drives it — ~5 KB gzipped, no dependencies, headless, so the markup and
 * Tailwind classes below are ours. `duration: 0` snaps between slides with no
 * animation; the only motion left is the CSS hover on the card and controls.
 *
 * Embla transforms a track of real DOM children, so every slide stays in the
 * served HTML. That matters: the same array is marked up as schema.org Review
 * nodes (see lib/schema.ts), and that markup only holds up if each quote is
 * actually in the HTML rather than injected when you click through.
 *
 * With a single reference the controls are omitted and it renders as a plain card.
 */
export function Testimonials() {
  const count = TESTIMONIALS.length;
  const isSlider = count > 1;

  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    duration: 0, // instant — no slide animation
    align: "start",
    watchDrag: isSlider,
  });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    onSelect();
    embla.on("select", onSelect).on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect).off("reInit", onSelect);
    };
  }, [embla]);

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

  return (
    <div
      role={isSlider ? "group" : undefined}
      aria-roledescription={isSlider ? "carousel" : undefined}
      aria-label={isSlider ? "Client references" : undefined}
      tabIndex={isSlider ? 0 : undefined}
      onKeyDown={
        isSlider
          ? (e) => {
              if (e.key === "ArrowRight") scrollNext();
              if (e.key === "ArrowLeft") scrollPrev();
            }
          : undefined
      }
      className="rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-own/50"
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex items-stretch">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.author}
              className="min-w-0 flex-[0_0_100%] px-0.5"
              role={isSlider ? "group" : undefined}
              aria-roledescription={isSlider ? "slide" : undefined}
              aria-label={isSlider ? `${i + 1} of ${count}` : undefined}
              aria-hidden={isSlider && i !== selected}
            >
              <Card testimonial={t} />
            </div>
          ))}
        </div>
      </div>

      {isSlider && (
        <div className="mt-7 flex items-center justify-between gap-6">
          <div className="flex gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.author}
                type="button"
                aria-label={`Reference from ${t.author}`}
                aria-current={i === selected}
                onClick={() => embla?.scrollTo(i)}
                className={`h-1.5 rounded-full ${
                  i === selected ? "w-7 bg-own" : "w-1.5 bg-line hover:bg-muted"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2.5">
            <SliderButton label="Previous reference" onClick={scrollPrev}>
              <ArrowLeft size={16} />
            </SliderButton>
            <SliderButton label="Next reference" onClick={scrollNext}>
              <ArrowRight size={16} />
            </SliderButton>
          </div>
        </div>
      )}
    </div>
  );
}

function SliderButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-own/40 hover:text-own"
    >
      {children}
    </button>
  );
}

function Card({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <figure
      className="card card-glow flex h-full flex-col gap-6 p-8 md:p-10"
      style={{
        background: "linear-gradient(120deg, rgba(230,181,74,0.06), rgba(18,26,35,0.7) 45%)",
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <Quote size={22} className="shrink-0 text-own" aria-hidden />
        <div className="flex gap-1" aria-label={`${t.rating} out of 5`}>
          {Array.from({ length: t.rating }, (_, s) => (
            <Star key={s} size={14} className="fill-own text-own" aria-hidden />
          ))}
        </div>
      </div>

      <blockquote className="max-w-[46ch] font-display text-[clamp(20px,2.4vw,28px)] font-semibold leading-[1.35] tracking-[-0.01em] text-text">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      <figcaption className="mt-auto flex flex-wrap items-center gap-3 border-t border-line pt-5 font-mono text-[12.5px]">
        <span className="font-semibold text-text">{t.author}</span>
        <span className="text-line">/</span>
        <span className="text-muted">
          {t.role}, {t.company}
        </span>
      </figcaption>
    </figure>
  );
}
