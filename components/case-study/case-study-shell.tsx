import Link from "next/link";
import type { ReactNode } from "react";
import { Backdrop } from "@/components/ui/backdrop";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion";
import type { CaseStudy } from "@/lib/case-studies";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * Same string-based formatting as ArticleShell, and for the same reason: a
 * date-only ISO string parsed through `new Date()` renders in the runtime's
 * timezone, so a UTC build machine and a visitor west of UTC disagree by a day
 * — a hydration mismatch that swaps the date under the reader.
 */
function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export function CaseStudyShell({
  study,
  children,
  cta,
}: {
  study: CaseStudy;
  children: ReactNode;
  cta: { heading: string; body: string; label: string; href: string };
}) {
  return (
    <>
      {/* ============================================ HERO */}
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
        <Backdrop />
        <div className="container-page">
          <Breadcrumb
            trail={[
              { name: "Home", path: "/" },
              { name: "Case Studies", path: "/case-studies" },
              { name: study.number, path: `/case-studies/${study.slug}` },
            ]}
          />

          <div className="max-w-3xl">
            <Reveal mount>
              <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-accent">
                {study.number}
              </p>
              <h1 className="mt-4 text-3xl font-semibold leading-[1.12] sm:text-4xl lg:text-[2.9rem]">
                {study.title}
              </h1>
            </Reveal>

            <Reveal delay={0.18} mount>
              <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
                <time dateTime={study.datePublished}>
                  {formatDate(study.datePublished)}
                </time>
                <span aria-hidden className="text-line">
                  /
                </span>
                <span>{study.readTime}</span>
                <span aria-hidden className="text-line">
                  /
                </span>
                <span className="text-accent">WhyCrew Engineering</span>
              </div>
            </Reveal>
          </div>

          {/* -------------------------------------- headline figures */}
          <Reveal delay={0.26} mount>
            <dl className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
              {study.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg border border-line/70 bg-surface/60 p-6"
                >
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <span className="block text-3xl font-semibold text-accent-hi">
                      {m.value}
                    </span>
                    <span className="mt-2 block text-[12.5px] leading-snug text-muted">
                      {m.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ============================================ BODY */}
      <div className="container-page pb-24">
        <article className="min-w-0 max-w-3xl">{children}</article>

        {/* ---------------------------------------- closing CTA */}
        <div className="mt-16 max-w-3xl">
          <div className="relative overflow-hidden rounded-lg border border-line/70 bg-gradient-to-br from-surface/85 via-surface/45 to-brand/10 p-8 sm:p-10">
            <h2 className="text-xl font-semibold leading-snug sm:text-2xl">
              {cta.heading}
            </h2>
            <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-body">
              {cta.body}
            </p>
            <div className="mt-7">
              <Button href={cta.href}>{cta.label}</Button>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/case-studies"
              className="group inline-flex items-center gap-2 text-[13px] font-semibold text-muted transition-colors hover:text-accent"
            >
              <span
                aria-hidden
                className="transition-transform duration-400 group-hover:-translate-x-1"
              >
                ←
              </span>
              All case studies
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
