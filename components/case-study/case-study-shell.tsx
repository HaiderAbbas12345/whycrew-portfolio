import type { ReactNode } from "react";
import { HelpfulPrompt, ShareArticle } from "@/components/blog/article-engagement";
import {
  ArticleLayout,
  AuthorBio,
  type TocEntry,
} from "@/components/blog/article-layout";
import { BackLink } from "@/components/blog/article-shell";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { breadcrumbLabel, type CaseStudy } from "@/lib/case-studies";
import { SITE } from "@/lib/site";

/**
 * Case studies use the same article template as the blog (ArticleLayout),
 * with the study's headline figures as a band under the byline.
 */
export function CaseStudyShell({
  study,
  toc,
  children,
  cta,
}: {
  study: CaseStudy;
  /** One entry per H2, in order: ids must match the headings' own ids. */
  toc: TocEntry[];
  children: ReactNode;
  cta: { heading: string; body: string; label: string; href: string };
}) {
  const path = `/case-studies/${study.slug}`;

  return (
    <ArticleLayout
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Case Studies", path: "/case-studies" },
        // The last crumb is the slug, not the title — the same rule the blog
        // follows, and the JSON-LD on the page carries the same string
        // because structured breadcrumbs have to match visible ones.
        { name: breadcrumbLabel(study.slug), path },
      ]}
      title={study.title}
      path={path}
      datePublished={study.datePublished}
      dateModified={study.dateModified}
      readTime={study.readTime}
      toc={toc}
      author={study.author}
      hero={
        <Reveal delay={0.26} mount>
          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
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
      }
      footer={
        <>
          <div className="mt-16 space-y-10 border-t border-line-soft pt-10">
            <ShareArticle url={`${SITE.url}${path}`} title={study.title} />
            <HelpfulPrompt slug={study.slug} />
            <AuthorBio author={study.author} />
          </div>

          {/* -------------------------------- closing CTA */}
          <div className="mt-10">
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

            <BackLink href="/case-studies">All case studies</BackLink>
          </div>
        </>
      }
    >
      {children}
    </ArticleLayout>
  );
}
