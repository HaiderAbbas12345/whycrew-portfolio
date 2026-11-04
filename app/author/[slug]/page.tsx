import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Backdrop } from "@/components/ui/backdrop";
import { Breadcrumb } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { formatDate } from "@/components/blog/article-layout";
import {
  AUTHORS,
  authorBySlug,
  authorLd,
  authorPath,
  itemsByAuthor,
} from "@/lib/authors";
import { breadcrumbLd } from "@/lib/jsonld";
import { ogImage } from "@/lib/og";
import { EXTERNAL_REL, ROBOTS, SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return AUTHORS.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = AUTHORS.find((x) => x.slug === slug);
  if (!a) return {};
  const path = authorPath(a.slug);
  const title = `${a.name}, Author at WhyCrew`;
  const description = `Articles, guides and case studies by ${a.name}, the ${a.role} at WhyCrew.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: ROBOTS,
    openGraph: {
      type: "profile",
      title,
      description,
      url: `${SITE.url}${path}`,
      images: ogImage(path),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage(path),
    },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  if (!AUTHORS.some((a) => a.slug === slug)) notFound();
  const a = authorBySlug(slug);
  const path = authorPath(a.slug);
  const items = itemsByAuthor(a.slug);

  const profileLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${SITE.url}${path}`,
    mainEntity: {
      ...authorLd(a.slug),
      description: a.bio,
      image: `${SITE.url}${a.avatar}`,
      sameAs: [a.linkedin],
      parentOrganization: { "@id": `${SITE.url}/#organization` },
    },
    hasPart: items.map((i) => ({
      "@type": i.kind === "Case Study" ? "Article" : "BlogPosting",
      headline: i.title,
      url: `${SITE.url}${i.path}`,
      datePublished: i.datePublished,
    })),
  };
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: a.name, path },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(crumbs)) }}
      />

      {/* ============================================ PROFILE */}
      <section className="relative overflow-hidden pt-32 pb-14 sm:pt-40">
        <Backdrop />
        <div className="container-page">
          <Breadcrumb trail={crumbs} />

          <Reveal mount>
            <div className="flex flex-col gap-8 rounded-3xl border border-line/70 bg-surface/60 p-7 sm:flex-row sm:items-start sm:gap-10 sm:p-10">
              <Image
                src={a.avatar}
                alt={a.name}
                width={144}
                height={144}
                priority
                className="size-28 shrink-0 rounded-full object-cover ring-2 ring-line sm:size-36"
              />
              <div className="min-w-0 max-w-3xl">
                <h1 className="text-3xl font-semibold leading-tight text-bright sm:text-[2.6rem]">
                  {a.name}
                </h1>
                <p className="mt-2 text-[15px] font-semibold text-accent">
                  {a.role}
                </p>
                <p className="mt-5 text-[15px] leading-[1.8] text-body">
                  {a.bio}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href={a.linkedin}
                    target="_blank"
                    rel={EXTERNAL_REL}
                    className="inline-flex items-center gap-2 rounded-md bg-[#0a66c2] px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors duration-300 hover:bg-[#0b74dc]"
                  >
                    <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="currentColor">
                      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                    </svg>
                    Connect on LinkedIn
                  </a>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
                    {items.length} {items.length === 1 ? "article" : "articles"}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================ ARTICLES */}
      <section className="relative pb-24">
        <div className="container-page">
          <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
            Articles by {a.name}
          </h2>

          <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((i) => (
              <StaggerItem key={i.path}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line/70 bg-surface/75 transition-colors duration-500 hover:border-accent/40">
                  <div className="overflow-hidden border-b border-line/60">
                    <Image
                      src={`/og${i.path}.png`}
                      alt=""
                      width={1200}
                      height={630}
                      sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                      className="aspect-[1200/630] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">
                      <span className="text-accent">{i.kind}</span>
                      <span aria-hidden className="text-line">/</span>
                      <span className="text-faint">{i.topic}</span>
                    </p>
                    <h3 className="mt-4 text-[16px] font-semibold leading-snug text-bright transition-colors duration-400 group-hover:text-accent-hi">
                      <Link href={i.path} className="after:absolute after:inset-0">
                        {i.title}
                      </Link>
                    </h3>
                    <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-muted">
                      {i.summary}
                    </p>
                    <div className="mt-6 flex items-center gap-3 border-t border-line-soft pt-4">
                      <Image
                        src={a.avatar}
                        alt=""
                        width={32}
                        height={32}
                        className="size-8 shrink-0 rounded-full object-cover ring-1 ring-line"
                      />
                      <span className="min-w-0 text-[12.5px] leading-tight">
                        <span className="block font-semibold text-bright">{a.name}</span>
                        <span className="mt-0.5 block text-muted">
                          <time dateTime={i.datePublished}>{formatDate(i.datePublished)}</time>
                          {" · "}
                          {i.readTime}
                        </span>
                      </span>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
