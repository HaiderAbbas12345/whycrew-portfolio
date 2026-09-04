import Link from "next/link";
import { Backdrop } from "@/components/ui/backdrop";
import { Breadcrumb } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion";
import { breadcrumbLd } from "@/lib/jsonld";
import type { LegalPage } from "@/lib/legal";
import { ADDRESS, SITE } from "@/lib/site";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Formatted from the ISO parts by hand rather than through Intl, for the same
 * reason ArticleShell does it: toLocaleDateString reads the *server's* locale
 * during prerender and the *reader's* on hydration, so the two disagree and
 * React swaps the date out from under whoever is looking at it.
 */
function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso; // unparseable — show it rather than "NaN"
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

/**
 * Shared chrome for the three policy pages: hero, breadcrumb, "Last updated",
 * and the prose column. Each page supplies its own numbered sections, because
 * the numbering differs between the documents.
 */
export function LegalShell({
  page,
  intro,
  children,
}: {
  page: LegalPage;
  /** The un-numbered paragraph(s) above section 1. */
  intro: React.ReactNode;
  children: React.ReactNode;
}) {
  const path = `/${page.slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: page.title, path },
            ])
          ),
        }}
      />

      <section className="relative overflow-hidden pt-32 pb-10 sm:pt-40">
        <Backdrop />
        <div className="container-page">
          <Breadcrumb
            trail={[
              { name: "Home", path: "/" },
              { name: page.title, path },
            ]}
          />

          <div className="max-w-3xl">
            <Reveal mount>
              <h1 className="text-3xl font-semibold leading-[1.12] sm:text-4xl lg:text-[2.9rem]">
                {page.title}
              </h1>
            </Reveal>

            <Reveal delay={0.18} mount>
              <p className="mt-7 font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
                <span>Last updated</span>
                <span aria-hidden className="mx-2 text-line">
                  /
                </span>
                <time dateTime={page.lastUpdated}>
                  {formatDate(page.lastUpdated)}
                </time>
              </p>
            </Reveal>

            <Reveal delay={0.24} mount>
              <div className="mt-8 border-l-2 border-brand/40 pl-5 text-[16.5px] leading-[1.7] text-body sm:text-[17px]">
                {intro}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="container-page pb-24">
        <div className="max-w-3xl">{children}</div>

        <div className="mt-16 max-w-3xl border-t border-line-soft pt-8">
          <p className="text-[13px] text-faint">
            This page covers whycrew.com. The other policies are{" "}
            <LegalCrossLinks currentSlug={page.slug} />.
          </p>
        </div>
      </div>
    </>
  );
}

/**
 * The two sibling policies, as inline links. The documents refer to each other
 * in prose ("read alongside our Privacy Policy"), so every policy page needs a
 * route to the other two without the reader going back to the footer.
 */
function LegalCrossLinks({ currentSlug }: { currentSlug: string }) {
  const others = [
    { slug: "privacy-policy", label: "the Privacy Policy" },
    { slug: "terms-of-use", label: "the Terms of Use" },
    { slug: "cookie-policy", label: "the Cookie Policy" },
  ].filter((p) => p.slug !== currentSlug);

  return (
    <>
      {others.map((p, i) => (
        <span key={p.slug}>
          {i > 0 && " and "}
          <Link
            href={`/${p.slug}`}
            className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
          >
            {p.label}
          </Link>
        </span>
      ))}
    </>
  );
}

/**
 * The contact block that closes all three documents, identical in each.
 */
export function LegalContact() {
  return (
    <address className="mt-6 space-y-2 text-[15px] not-italic leading-[1.75] text-body">
      <p>
        <span className="text-faint">Email: </span>
        <a
          href={`mailto:${SITE.legalEmail}`}
          className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
        >
          {SITE.legalEmail}
        </a>
      </p>
      <p>
        <span className="text-faint">Phone: </span>
        <a
          href={`tel:${SITE.phone}`}
          className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
        >
          {SITE.phoneDisplay}
        </a>
      </p>
      <p>
        <span className="text-faint">Address: </span>
        {ADDRESS.street}, {ADDRESS.locality}, {ADDRESS.region}{" "}
        {ADDRESS.postalCode}, {ADDRESS.countryName}
      </p>
    </address>
  );
}
