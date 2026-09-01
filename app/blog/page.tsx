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
import { POSTS } from "@/lib/blog";
import { CTA_HREF, OG_IMAGE, SITE } from "@/lib/site";

const TITLE = "Blog — SIEM, SOAR & SOC Engineering | WhyCrew";
const DESCRIPTION =
  "Engineering write-ups on SIEM and SOAR development, AI SOC automation, multi-tenant architecture, and NIS2/DORA compliance for MSSPs.";

export const metadata: Metadata = {
  // `absolute` bypasses the root layout's "%s | WhyCrew" template — the brand
  // is already in the string.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE.url}/blog`,
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
 * Newest first. POSTS is maintained in publication order, so this sorts a copy
 * rather than mutating the exported array — the sitemap and the Resources hub
 * read the same object.
 */
const ORDERED = [...POSTS].sort((a, b) =>
  b.datePublished.localeCompare(a.datePublished)
);

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * Same string-based formatting as ArticleShell, and for the same reason: a
 * date-only ISO string parsed through `new Date()` renders in the runtime's
 * timezone, so a UTC build machine and a visitor west of UTC disagree by a
 * day — a hydration mismatch that swaps the date under the reader.
 */
function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

function blogLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE.url}/blog#blog`,
    name: "WhyCrew Blog",
    description: DESCRIPTION,
    url: `${SITE.url}/blog`,
    isPartOf: { "@id": `${SITE.url}/#website` },
    publisher: { "@id": `${SITE.url}/#organization` },
    blogPost: ORDERED.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${SITE.url}/blog/${p.slug}#article`,
      headline: p.title,
      description: p.metaDescription,
      url: `${SITE.url}/blog/${p.slug}`,
      datePublished: p.datePublished,
      dateModified: p.dateModified ?? p.datePublished,
      author: { "@id": `${SITE.url}/#organization` },
    })),
  };
}

export default function BlogIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
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
              { name: "Blog", path: "/blog" },
            ]}
          />
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.07] sm:text-5xl lg:text-[3.4rem]">
            <WordsUp text="Engineering notes" delay={0.12} />{" "}
            <WordsUp text="from the build." delay={0.34} gradient />
          </h1>

          <Reveal delay={0.55} mount>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-body">
              Long-form write-ups on SIEM and SOAR development, SOC automation,
              multi-tenant architecture, and EU compliance &mdash; written by
              the engineers who ship the platforms, not a content team.
            </p>
          </Reveal>

          <Reveal delay={0.66} mount>
            <p className="mt-7 font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
              {ORDERED.length} {ORDERED.length === 1 ? "article" : "articles"}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================ POSTS */}
      <Section id="posts" className="!pt-4">
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ORDERED.map((p) => (
            <StaggerItem key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="group flex h-full flex-col rounded-lg border border-line/70 bg-surface/75 p-6 transition-colors duration-500 hover:border-accent/40"
              >
                <p className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">
                  <time dateTime={p.datePublished} className="text-accent">
                    {formatDate(p.datePublished)}
                  </time>
                  <span className="text-line" aria-hidden>
                    /
                  </span>
                  <span className="text-faint">{p.readTime}</span>
                </p>

                {/*
                  h2, not h3. These cards are the first headings under the
                  page's h1, so an h3 here skips a level — the same heading
                  hierarchy rule the Resources cards follow.
                */}
                <h2 className="mt-4 text-[15px] font-semibold leading-snug text-bright transition-colors duration-400 group-hover:text-accent-hi">
                  {p.title}
                </h2>

                <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-muted">
                  {p.summary}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-1.5">
                  {p.topics.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line/60 px-2.5 py-1 text-[10.5px] text-faint"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 border-t border-line-soft pt-4">
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent">
                    Read more
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
          <Eyebrow>Beyond the writing</Eyebrow>
          <Heading
            align="center"
            sub="These articles cover the decisions in the abstract. An architecture review covers them against your actual environment, your client count, and your compliance obligations."
          >
            Put this against your own stack
          </Heading>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href={CTA_HREF}>Book an Architecture Audit</Button>
            <Button href="/resources" variant="ghost">
              Browse All Resources
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
