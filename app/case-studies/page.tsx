import type { Metadata } from "next";
import Link from "next/link";
import { Backdrop } from "@/components/ui/backdrop";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  Eyebrow,
  Heading,
  Section,
} from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem, WordsUp } from "@/components/motion";
import { breadcrumbLd } from "@/lib/jsonld";
import { CASE_STUDIES } from "@/lib/case-studies";
import { CTA_HREF, OG_IMAGE, SITE } from "@/lib/site";

const TITLE = "Case Studies — MSSP & SOC Platform Builds | WhyCrew";
const DESCRIPTION =
  "Measured outcomes from completed WhyCrew engagements: what the platform cost before, what changed, and what it saved.";

export const metadata: Metadata = {
  // `absolute` bypasses the root layout's "%s | WhyCrew" template — the brand
  // is already in the string.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE.url}/case-studies`,
    type: "website",
    images: OG_IMAGE,
  },
  // Without this the page inherits the root layout's site-wide Twitter card.
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

/**
 * Newest first. CASE_STUDIES is maintained in publication order, so this sorts
 * a copy rather than mutating the exported array — the sitemap and the
 * Resources hub read the same object.
 */
const ORDERED = [...CASE_STUDIES].sort((a, b) =>
  b.datePublished.localeCompare(a.datePublished)
);

export default function CaseStudiesIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Case Studies", path: "/case-studies" },
            ])
          ),
        }}
      />

      {/* ============================================ HERO */}
      <section className="relative overflow-hidden pt-32 pb-14 sm:pt-40">
        <Backdrop />
        <div className="container-page">
          <Breadcrumb
            trail={[
              { name: "Home", path: "/" },
              { name: "Case Studies", path: "/case-studies" },
            ]}
          />
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.07] sm:text-5xl lg:text-[3.4rem]">
            <WordsUp text="What the work" delay={0.12} />{" "}
            <WordsUp text="actually returned." delay={0.34} gradient />
          </h1>

          <Reveal delay={0.55} mount>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-body">
              Completed engagements, with the numbers the client measured
              afterwards &mdash; not projections, and not a vendor&apos;s own
              benchmark.
            </p>
          </Reveal>

          <Reveal delay={0.66} mount>
            <p className="mt-7 font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
              {ORDERED.length}{" "}
              {ORDERED.length === 1 ? "case study" : "case studies"}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================ STUDIES */}
      <Section id="studies" className="!pt-4">
        <Stagger className="grid gap-5 sm:grid-cols-2">
          {ORDERED.map((c) => (
            <StaggerItem key={c.slug}>
              <Link
                href={`/case-studies/${c.slug}`}
                className="group flex h-full flex-col rounded-lg border border-line/70 bg-surface/75 p-6 transition-colors duration-500 hover:border-accent/40"
              >
                <p className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">
                  <span className="text-accent">{c.number}</span>
                  <span className="text-line" aria-hidden>
                    /
                  </span>
                  <span className="text-faint">{c.readTime}</span>
                </p>

                {/*
                  h2, not h3. These cards are the first headings under the
                  page's h1, so an h3 here skips a level — the same heading
                  hierarchy rule the blog and Resources cards follow.
                */}
                <h2 className="mt-4 text-[15px] font-semibold leading-snug text-bright transition-colors duration-400 group-hover:text-accent-hi">
                  {c.title}
                </h2>

                <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-muted">
                  {c.summary}
                </p>

                <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                  {c.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="sr-only">{m.label}</dt>
                      <dd>
                        <span className="block text-lg font-semibold text-accent-hi">
                          {m.value}
                        </span>
                        <span className="mt-0.5 block text-[11px] leading-snug text-faint">
                          {m.label}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 border-t border-line-soft pt-4">
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent">
                    Read the case study
                    <span
                      aria-hidden
                      className="transition-transform duration-400 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ============================================ CTA */}
      <Section className="border-t border-line/40">
        <div className="text-center">
          <Eyebrow>Your own numbers</Eyebrow>
          <Heading
            align="center"
            sub="These are other people's environments. An architecture review models the same maths against your ingestion profile, your client count, and your licensing terms."
          >
            Find out what the switch is worth to you
          </Heading>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href={CTA_HREF}>Book an Architecture Audit</Button>
            <Button href="/blog" variant="ghost">
              Read the Engineering Blog
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
