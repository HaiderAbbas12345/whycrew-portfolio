import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { HelpfulPrompt, ShareArticle } from "@/components/blog/article-engagement";
import { Backdrop } from "@/components/ui/backdrop";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion";
import { breadcrumbLabel, postPath, type BlogPost } from "@/lib/blog";
import { CTA_HREF, EXTERNAL_REL, SITE } from "@/lib/site";

/** Same profile as the footer and the Organization JSON-LD `sameAs`. */
const COMPANY_LINKEDIN = "https://www.linkedin.com/company/whycrew";

export interface TocEntry {
  id: string;
  label: string;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * Formats "2026-08-18" as "18 August 2026" from the string itself.
 *
 * Deliberately avoids `new Date(iso).toLocaleDateString()`: a date-only ISO
 * string parses as UTC midnight, and toLocaleDateString then renders it in the
 * *runtime's* timezone. The page is prerendered on a UTC build machine, so any
 * visitor west of UTC would format it as the previous day — the server HTML
 * and the client render would disagree, which is a hydration mismatch
 * (React #418) and swaps the date under the reader.
 */
function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso; // unparseable — show it rather than "NaN"
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export function ArticleShell({
  post,
  toc,
  children,
  cta,
  dek,
  showUpdated = false,
  notes = [],
  byline,
  tocLabel = "On this page",
  tocNumbered = false,
  tocCta = true,
}: {
  post: BlogPost;
  toc: TocEntry[];
  children: ReactNode;
  /** Standfirst under the <h1>, when the content doc has one. */
  dek?: string;
  /**
   * Show "Updated <dateModified>" in place of the publish date, for a post
   * whose content doc carries its revision date in the byline.
   */
  showUpdated?: boolean;
  /** Extra byline items from the content doc, e.g. "Prices checked October 2026". */
  notes?: string[];
  /**
   * Replaces the whole byline row, for a design that spells it out exactly
   * (author, date format, extra notes). Items are separated by a middle dot.
   */
  byline?: ReactNode[];
  /** Heading above the sticky contents list. */
  tocLabel?: string;
  /** Prefix contents entries with 01, 02, … as some designs do. */
  tocNumbered?: boolean;
  /** Show the audit link under the contents list. */
  tocCta?: boolean;
  /**
   * Closing CTA card. Omitted when the content doc places its own CTA inside
   * the article body, so the page doesn't end on a second, invented one.
   */
  cta?: {
    heading: string;
    body: string;
    label: string;
    href: string;
    /** Optional ghost button beside the primary one. */
    secondary?: { label: string; href: string };
  };
}) {
  const published = formatDate(post.datePublished);
  const updated =
    showUpdated && post.dateModified ? post.dateModified : null;

  return (
    <>
      {/* ============================================ HERO */}
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
        <Backdrop />
        <div className="container-page">
          <Breadcrumb
            trail={[
              // The last crumb is the slug, not post.title: a full article
              // headline wrapped onto a second line and crowded the hero on
              // mobile. The JSON-LD on each post carries the same string,
              // because structured breadcrumbs have to match the visible ones.
              { name: "Home", path: "/" },
              post.section === "resources"
                ? { name: "Resources", path: "/resources" }
                : { name: "Blog", path: "/blog" },
              { name: breadcrumbLabel(post.slug), path: postPath(post) },
            ]}
          />

          <div className="max-w-3xl">
            <Reveal mount>
              <h1 className="text-3xl font-semibold leading-[1.12] sm:text-4xl lg:text-[2.9rem]">
                {post.title}
              </h1>
            </Reveal>

            {dek && (
              <Reveal delay={0.1} mount>
                <p className="mt-5 max-w-2xl text-[16.5px] leading-[1.7] text-body sm:text-[17px]">
                  {dek}
                </p>
              </Reveal>
            )}

            <Reveal delay={0.18} mount>
              {byline ? (
                <p className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[12.5px] text-faint">
                  {byline.map((item, i) => (
                    <span key={i} className="contents">
                      {i > 0 && (
                        <span aria-hidden className="text-line">
                          ·
                        </span>
                      )}
                      <span>{item}</span>
                    </span>
                  ))}
                </p>
              ) : (
              <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
                {updated ? (
                  <time dateTime={updated}>Updated {formatDate(updated)}</time>
                ) : (
                  <time dateTime={post.datePublished}>{published}</time>
                )}
                {notes.map((n) => (
                  <span key={n} className="contents">
                    <span aria-hidden className="text-line">
                      /
                    </span>
                    <span>{n}</span>
                  </span>
                ))}
                <span aria-hidden className="text-line">
                  /
                </span>
                <span>{post.readTime}</span>
                <span aria-hidden className="text-line">
                  /
                </span>
                <span className="text-accent">WhyCrew Engineering</span>
              </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================ BODY */}
      <div className="container-page pb-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
          <article className="min-w-0 max-w-3xl">{children}</article>

          {/* ---------------------------------------- sticky TOC */}
          <aside className="hidden lg:block">
            <nav
              aria-label="On this page"
              className="sticky top-28"
            >
              <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-faint">
                {tocLabel}
              </p>
              <ul className="space-y-2.5">
                {toc.map((t, i) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className="flex gap-2.5 text-[12.5px] leading-snug text-muted transition-colors duration-300 hover:text-accent"
                    >
                      {tocNumbered && (
                        <span
                          aria-hidden
                          className="shrink-0 font-mono text-[10.5px] leading-[1.7] text-faint"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      )}
                      <span>{t.label}</span>
                    </a>
                  </li>
                ))}
              </ul>

              {tocCta && (
              <div className="mt-9">
                <p className="text-[12.5px] leading-relaxed text-muted">
                  Want this modelled against your own numbers?
                </p>
                {/*
                  Plain <a>: CTA_HREF is an external booking page, not a route,
                  so next/link has nothing to do here. Opened in a new tab to
                  leave the article the visitor was reading behind them.
                */}
                <a
                  href={CTA_HREF}
                  target="_blank"
                  rel={EXTERNAL_REL}
                  className="group mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-accent hover:text-accent-hi"
                >
                  Book an Architecture Audit
                  <span
                    aria-hidden
                    className="transition-transform duration-400 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </div>
              )}
            </nav>
          </aside>
        </div>

        {/* ---------------------------------------- share / feedback / byline */}
        <div className="mt-16 max-w-3xl space-y-10 border-t border-line-soft pt-10">
          <ShareArticle url={`${SITE.url}${postPath(post)}`} title={post.title} />

          <HelpfulPrompt slug={post.slug} />

          <section
            aria-label="About the author"
            className="flex flex-col gap-7 rounded-3xl border border-line/70 bg-surface/60 p-7 sm:flex-row sm:gap-10 sm:p-10"
          >
            <Image
              src="/WhyCrew.jpeg"
              alt="WhyCrew Engineers"
              width={112}
              height={112}
              className="h-24 w-24 shrink-0 rounded-full object-cover ring-2 ring-line sm:h-28 sm:w-28"
            />
            <div className="min-w-0">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-faint">
                Written by
              </p>
              <p className="mt-3 text-2xl font-semibold text-bright sm:text-[1.75rem]">
                WhyCrew Engineers
              </p>
              <p className="mt-2 text-[15px] font-semibold text-accent">
                SIEM, SOAR &amp; AI SOC Engineering Team
              </p>
              <p className="mt-4 text-[14.5px] leading-[1.8] text-muted">
                WhyCrew is an engineering firm that builds custom SIEM, SOAR, and
                AI-powered SOC platforms, then hands full ownership over to the
                client instead of renting it back as a subscription. The team
                works with MSSPs and regulated operators across Europe, Saudi
                Arabia, and North America, building in compliance for NIS2, DORA,
                and NCA ECC/SAMA CSF from day one, with deployments typically
                live in 12 weeks. This article was researched and written by the
                WhyCrew engineering team.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-[14.5px] font-semibold">
                <a
                  href={COMPANY_LINKEDIN}
                  target="_blank"
                  rel={EXTERNAL_REL}
                  className="group inline-flex items-center gap-1.5 text-accent hover:text-accent-hi"
                >
                  LinkedIn
                  <span
                    aria-hidden
                    className="transition-transform duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </a>
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-1.5 text-accent hover:text-accent-hi"
                >
                  More from our engineers
                  <span
                    aria-hidden
                    className="transition-transform duration-400 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* ---------------------------------------- closing CTA */}
        <div className="mt-10 max-w-3xl">
          {cta && (
          <div className="relative overflow-hidden rounded-lg border border-line/70 bg-gradient-to-br from-surface/85 via-surface/45 to-brand/10 p-8 sm:p-10">
            <h2 className="text-xl font-semibold leading-snug sm:text-2xl">
              {cta.heading}
            </h2>
            <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-body">
              {cta.body}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={cta.href}>{cta.label}</Button>
              {cta.secondary && (
                <Button href={cta.secondary.href} variant="ghost">
                  {cta.secondary.label}
                </Button>
              )}
            </div>
          </div>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/resources"
              className="group inline-flex items-center gap-2 text-[13px] font-semibold text-muted transition-colors hover:text-accent"
            >
              <span
                aria-hidden
                className="transition-transform duration-400 group-hover:-translate-x-1"
              >
                ←
              </span>
              All resources
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
