import Link from "next/link";
import type { ReactNode } from "react";
import { HelpfulPrompt, ShareArticle } from "@/components/blog/article-engagement";
import {
  ArticleLayout,
  AuthorBio,
  type TocEntry,
} from "@/components/blog/article-layout";
import { Button } from "@/components/ui/button";
import { breadcrumbLabel, postPath, type BlogPost } from "@/lib/blog";
import { SITE } from "@/lib/site";

export type { TocEntry };

/**
 * Blog posts and resources. The page chrome (byline, contents, side rails)
 * comes from ArticleLayout and is the same for every post; a post supplies
 * only its own words: the body, an optional standfirst and byline notes, and
 * the closing CTA its content doc asks for.
 */
export function ArticleShell({
  post,
  toc,
  children,
  cta,
  dek,
  notes = [],
}: {
  post: BlogPost;
  /** One entry per H2, in order: ids must match the headings' own ids. */
  toc: TocEntry[];
  children: ReactNode;
  /** Standfirst under the <h1>, when the content doc has one. */
  dek?: string;
  /** Extra byline items from the content doc, e.g. "Prices checked October 2026". */
  notes?: string[];
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
  const path = postPath(post);

  return (
    <ArticleLayout
      crumbs={[
        // The last crumb is the slug, not post.title: a full article
        // headline wrapped onto a second line and crowded the hero on
        // mobile. The JSON-LD on each post carries the same string,
        // because structured breadcrumbs have to match the visible ones.
        { name: "Home", path: "/" },
        post.section === "resources"
          ? { name: "Resources", path: "/resources" }
          : { name: "Blog", path: "/blog" },
        { name: breadcrumbLabel(post.slug), path },
      ]}
      title={post.title}
      dek={dek}
      path={path}
      datePublished={post.datePublished}
      dateModified={post.dateModified}
      readTime={post.readTime}
      notes={notes}
      toc={toc}
      footer={
        <>
          {/* -------------------------------- share / feedback / byline */}
          <div className="mt-16 space-y-10 border-t border-line-soft pt-10">
            <ShareArticle url={`${SITE.url}${path}`} title={post.title} />
            <HelpfulPrompt slug={post.slug} />
            <AuthorBio />
          </div>

          {/* -------------------------------- closing CTA */}
          <div className="mt-10">
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

            <BackLink href="/resources">All resources</BackLink>
          </div>
        </>
      }
    >
      {children}
    </ArticleLayout>
  );
}

export function BackLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
      <Link
        href={href}
        className="group inline-flex items-center gap-2 text-[13px] font-semibold text-muted transition-colors hover:text-accent"
      >
        <span
          aria-hidden
          className="transition-transform duration-400 group-hover:-translate-x-1"
        >
          ←
        </span>
        {children}
      </Link>
    </div>
  );
}
