import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Backdrop } from "@/components/ui/backdrop";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion";
import { RATING_LABEL } from "@/lib/reviews";
import { CTA_HREF, EXTERNAL_REL, SITE } from "@/lib/site";

/**
 * The one template every blog post, resource and case study renders through.
 *
 *   header   breadcrumb · h1 · standfirst · author row ("By WhyCrew
 *            Engineers", "Let's connect!", published / updated / read time)
 *            · "Summarize with" AI links
 *   left     sticky table of contents (xl and up)
 *   centre   the article, then the shell's own footer (share, bio, CTA)
 *   right    sticky call card + "Add as a preferred source on Google"
 *
 * Between lg and xl the contents list moves into the right rail, and below
 * lg it becomes a collapsible list under the header. There are deliberately
 * no per-post switches for the byline, the rails or the contents label:
 * every article, including future ones, comes out the same.
 */

/** Same profile as the footer and the Organization JSON-LD `sameAs`. */
export const COMPANY_LINKEDIN = "https://www.linkedin.com/company/whycrew";

const AUTHOR = "WhyCrew Engineers";

/** Google's "preferred sources" page, pre-filled with our domain. */
const PREFERRED_SOURCE_URL = `https://www.google.com/preferences/source?q=${
  new URL(SITE.url).hostname.replace(/^www\./, "")
}`;

export interface TocEntry {
  id: string;
  label: string;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * Formats "2026-08-18" as "August 18, 2026" from the string itself.
 *
 * Deliberately avoids `new Date(iso).toLocaleDateString()`: a date-only ISO
 * string parses as UTC midnight, and toLocaleDateString then renders it in the
 * *runtime's* timezone. The page is prerendered on a UTC build machine, so any
 * visitor west of UTC would format it as the previous day — the server HTML
 * and the client render would disagree, which is a hydration mismatch
 * (React #418) and swaps the date under the reader.
 */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso; // unparseable — show it rather than "NaN"
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

export function ArticleLayout({
  crumbs,
  title,
  dek,
  path,
  datePublished,
  dateModified,
  readTime,
  notes = [],
  toc,
  hero,
  children,
  footer,
}: {
  crumbs: { name: string; path: string }[];
  title: string;
  /** Standfirst under the <h1>, when the content doc has one. */
  dek?: string;
  /** Site-relative URL of the page, for the "Summarize with" links. */
  path: string;
  datePublished: string;
  /** Shown as "Updated on" when it differs from the publish date. */
  dateModified?: string;
  readTime: string;
  /** Extra byline items from the content doc, e.g. "Prices checked October 2026". */
  notes?: string[];
  toc: TocEntry[];
  /** Extra header content under the byline (a case study's figures). */
  hero?: ReactNode;
  /** The article body. */
  children: ReactNode;
  /** Everything after the article: share, feedback, author bio, CTA. */
  footer: ReactNode;
}) {
  const updated =
    dateModified && dateModified !== datePublished ? dateModified : null;
  const url = `${SITE.url}${path}`;

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] overflow-hidden">
        <Backdrop />
      </div>

      <div className="mx-auto w-full max-w-[84rem] px-5 pt-32 pb-24 sm:pt-40">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] xl:grid-cols-[13rem_minmax(0,1fr)_16.5rem] xl:gap-10">
          {/* ---------------------------------------- left rail */}
          <aside className="hidden xl:block">
            <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1 [scrollbar-width:thin]">
              <TableOfContents toc={toc} />
            </div>
          </aside>

          {/* ---------------------------------------- main column */}
          <div className="min-w-0 max-w-3xl">
            <Breadcrumb trail={crumbs} />

            <Reveal mount>
              <h1 className="text-3xl font-semibold leading-[1.12] sm:text-4xl lg:text-[2.9rem]">
                {title}
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
              <div className="mt-8 flex flex-col gap-5 border-y border-line-soft py-5 md:flex-row md:items-center md:justify-between">
                {/* author */}
                <div className="flex items-center gap-3.5">
                  <Image
                    src="/WhyCrew.jpeg"
                    alt=""
                    width={44}
                    height={44}
                    className="size-11 shrink-0 rounded-full object-cover ring-2 ring-line"
                  />
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[14px] text-body">
                      <span>
                        By{" "}
                        <span className="font-semibold text-bright">
                          {AUTHOR}
                        </span>
                      </span>
                      <a
                        href={COMPANY_LINKEDIN}
                        target="_blank"
                        rel={EXTERNAL_REL}
                        className="inline-flex items-center rounded-full border border-accent/35 bg-accent/10 px-2.5 py-0.5 text-[12px] font-semibold text-accent transition-colors duration-300 hover:border-accent/60 hover:text-accent-hi"
                      >
                        Let&rsquo;s connect! 👋
                      </a>
                    </p>
                    <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-muted">
                      <span>
                        Published on:{" "}
                        <time dateTime={datePublished}>
                          {formatDate(datePublished)}
                        </time>
                      </span>
                      {updated && (
                        <>
                          <Dot />
                          <span>
                            Updated on:{" "}
                            <time dateTime={updated}>{formatDate(updated)}</time>
                          </span>
                        </>
                      )}
                      {notes.map((n) => (
                        <span key={n} className="contents">
                          <Dot />
                          <span>{n}</span>
                        </span>
                      ))}
                      <Dot />
                      <span>{readTime}</span>
                    </p>
                  </div>
                </div>

                <SummarizeWith url={url} />
              </div>
            </Reveal>

            <div className="mt-5 lg:hidden">
              <PreferredSource />
            </div>

            {hero}

            {toc.length > 0 && (
              <details className="group mt-8 rounded-xl border border-line/70 bg-surface/50 lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-[13px] font-semibold text-bright [&::-webkit-details-marker]:hidden">
                  Table of contents
                  <span
                    aria-hidden
                    className="text-accent transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="border-t border-line/60 px-5 py-4">
                  <TocList toc={toc} />
                </div>
              </details>
            )}

            <article className="mt-12 min-w-0">{children}</article>

            {footer}
          </div>

          {/* ---------------------------------------- right rail */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 max-h-[calc(100vh-8rem)] space-y-6 overflow-y-auto [scrollbar-width:thin]">
              <div className="xl:hidden">
                <TableOfContents toc={toc} />
              </div>
              <SideCta />
              <PreferredSource />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Dot() {
  return (
    <span aria-hidden className="text-line">
      •
    </span>
  );
}

/* ------------------------------------------------ table of contents */

function TableOfContents({ toc }: { toc: TocEntry[] }) {
  if (toc.length === 0) return null;
  return (
    <nav aria-label="Table of contents">
      <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-faint">
        Table of contents
      </p>
      <TocList toc={toc} />
    </nav>
  );
}

function TocList({ toc }: { toc: TocEntry[] }) {
  return (
    <ul className="space-y-1">
      {toc.map((t) => (
        <li key={t.id}>
          <a
            href={`#${t.id}`}
            className="block border-l-2 border-line-soft py-1.5 pl-3.5 text-[12.5px] leading-snug text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            {t.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------ right rail */

function SideCta() {
  return (
    <div className="rounded-[20px] border border-accent/30 bg-gradient-to-br from-accent/8 to-surface/60 p-[22px]">
      <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
        For MSSPs
      </p>
      <p className="text-base font-semibold leading-[1.4] text-bright">
        One platform, every client, full source code.
      </p>
      <p className="mt-2 mb-4 text-[13px] leading-relaxed text-muted">
        Custom SIEM, SOAR and AI SOC platforms you own outright, live in 12
        weeks.
      </p>
      <Button href={CTA_HREF} className="w-full" magnetic={false}>
        Book a Strategy Call
      </Button>
      <p className="mt-3.5 flex items-center justify-center gap-2 text-[12px] text-bright">
        <span aria-hidden className="tracking-[1px] text-accent">
          ★★★★★
        </span>
        {RATING_LABEL}
      </p>
    </div>
  );
}

function PreferredSource() {
  return (
    <a
      href={PREFERRED_SOURCE_URL}
      target="_blank"
      rel={EXTERNAL_REL}
      className="flex w-full items-center gap-3 rounded-xl border border-line bg-surface/70 px-4 py-3 text-[13px] font-semibold leading-snug text-bright transition-colors duration-300 hover:border-accent/50 sm:w-auto lg:w-full"
    >
      <GoogleG />
      <span>
        Add as a preferred
        <br className="hidden lg:block" /> source on Google
      </span>
    </a>
  );
}

function GoogleG() {
  return (
    <svg aria-hidden viewBox="0 0 48 48" className="size-6 shrink-0">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  );
}

/* ------------------------------------------------ summarize with */

const enc = encodeURIComponent;

/** Each assistant's own "ask this" URL, pre-filled with the same prompt. */
const ASSISTANTS: { name: string; href: (q: string) => string; icon: ReactNode }[] = [
  {
    name: "ChatGPT",
    href: (q) => `https://chatgpt.com/?q=${enc(q)}`,
    icon: <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />,
  },
  {
    name: "Claude",
    href: (q) => `https://claude.ai/new?q=${enc(q)}`,
    icon: <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />,
  },
  {
    name: "Perplexity",
    href: (q) => `https://www.perplexity.ai/search/new?q=${enc(q)}`,
    icon: <path d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z" />,
  },
  {
    name: "Google AI Mode",
    href: (q) => `https://www.google.com/search?udm=50&aep=11&q=${enc(q)}`,
    icon: <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />,
  },
  {
    name: "Grok",
    href: (q) => `https://grok.com/?q=${enc(q)}`,
    // No published mark to borrow, so a plain slashed ring in its spirit.
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M4.2 20.5 20.5 3.8l1.4 1.4L5.6 21.9z" />
      </>
    ),
  },
];

function SummarizeWith({ url }: { url: string }) {
  const prompt = `Summarize and analyze the key insights from ${url}`;
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="text-[12.5px] font-medium text-muted">Summarize with</span>
      <div className="flex gap-1.5">
        {ASSISTANTS.map((a) => (
          <a
            key={a.name}
            href={a.href(prompt)}
            target="_blank"
            rel={EXTERNAL_REL}
            aria-label={`Summarize this article with ${a.name}`}
            title={a.name}
            className="grid size-9 place-items-center rounded-full border border-line bg-surface/70 text-bright transition-colors duration-300 hover:border-accent/60 hover:text-accent"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="currentColor">
              {a.icon}
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------ author bio */

/** The bio card at the foot of every article — unchanged from the original. */
export function AuthorBio() {
  return (
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
  );
}
