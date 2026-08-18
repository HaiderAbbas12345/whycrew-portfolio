import Link from "next/link";
import type { ReactNode } from "react";
import { Backdrop } from "@/components/ui/backdrop";
import { Button } from "@/components/ui/button";
import { Breadcrumb, Pill } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion";
import type { BlogPost } from "@/lib/blog";

export interface TocEntry {
  id: string;
  label: string;
}

export function ArticleShell({
  post,
  toc,
  children,
  cta,
}: {
  post: BlogPost;
  toc: TocEntry[];
  children: ReactNode;
  cta: { heading: string; body: string; label: string; href: string };
}) {
  const published = new Date(post.datePublished).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* ============================================ HERO */}
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
        <Backdrop />
        <div className="container-page">
          <Breadcrumb
            trail={[
              { name: "Home", path: "/" },
              { name: "Resources", path: "/resources" },
              { name: "Blog", path: "/resources" },
            ]}
          />

          <div className="max-w-3xl">
            <Reveal>
              <Pill tone="brand">{post.cluster}</Pill>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mt-7 text-3xl font-semibold leading-[1.12] sm:text-4xl lg:text-[2.9rem]">
                {post.title}
              </h1>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
                <time dateTime={post.datePublished}>{published}</time>
                <span aria-hidden className="text-line">
                  /
                </span>
                <span>{post.readTime}</span>
                <span aria-hidden className="text-line">
                  /
                </span>
                <span className="text-accent">WhyCrew Engineering</span>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {post.topics.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line/60 px-2.5 py-1 text-[10.5px] text-faint"
                  >
                    {t}
                  </span>
                ))}
              </div>
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
                On this page
              </p>
              <ul className="space-y-2.5">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className="block text-[12.5px] leading-snug text-muted transition-colors duration-300 hover:text-accent"
                    >
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-9">
                <p className="text-[12.5px] leading-relaxed text-muted">
                  Want this modelled against your own numbers?
                </p>
                <Link
                  href="/contact"
                  className="group mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-accent hover:text-accent-hi"
                >
                  Book an Architecture Audit
                  <span
                    aria-hidden
                    className="transition-transform duration-400 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </nav>
          </aside>
        </div>

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
            <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
              {post.cluster}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
