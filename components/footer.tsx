import Image from "next/image";
import Link from "next/link";
import { CookiePreferencesButton } from "@/components/cookie-consent";
import { Button } from "@/components/ui/button";
import { LEGAL_PAGES } from "@/lib/legal";
import { ADDRESS, CTA_HREF, EXTERNAL_REL, SERVICES, SITE } from "@/lib/site";

/**
 * Same profile URLs as the Organization JSON-LD's `sameAs` (lib/jsonld.ts) —
 * one canonical pair, not a second copy that can drift out of sync.
 */
const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/whycrew",
    icon: (
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5zM.24 8.25h4.5V23h-4.5V8.25zM8.5 8.25h4.31v2.01h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V23h-4.5v-6.53c0-1.56-.03-3.57-2.18-3.57-2.18 0-2.51 1.7-2.51 3.46V23H8.5V8.25z" />
    ),
  },
  {
    label: "X",
    href: "https://twitter.com/whycrew",
    icon: (
      <path d="M18.244 2h3.256l-7.51 8.59L23 22h-6.938l-5.435-7.11L4.36 22H1.1l8.034-9.19L1 2h7.113l4.915 6.5L18.244 2Zm-1.143 18h1.804L7.02 4H5.08l12.02 16Z" />
    ),
  },
];

const columns = [
  {
    title: "Services",
    links: SERVICES.map((s) => ({ label: s.name, href: s.href })),
  },
  {
    title: "Resources",
    links: [
      { label: "Resource Library", href: "/resources" },
      { label: "Blogs", href: "/blog" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About WhyCrew", href: "/" },
      { label: "Contact Us", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    title: "Trust & Security",
    links: [
      {
        label: "Report a Security Incident",
        href: `mailto:${SITE.incidentEmail}`,
      },
      { label: "Press & Media", href: `mailto:${SITE.pressEmail}` },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line/60 bg-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent"
      />
      <div
        aria-hidden
        className="wc-orb pointer-events-none absolute -bottom-52 left-1/2 size-[38rem] -translate-x-1/2 bg-brand/10"
      />

      <div className="container-page relative py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(300px,380px)_1fr]">
          <div className="rounded-2xl border border-line/60 bg-surface/40 p-7">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/WhyCrew.jpeg"
                alt="whycrew"
                width={34}
                height={34}
                className="rounded-md ring-1 ring-brand/40"
              />
              <span className="text-base font-semibold tracking-tight text-bright">
                Why<span className="text-brand-hi">Crew</span>
              </span>
            </Link>
            <p className="mt-5 text-[13.5px] leading-relaxed text-muted">
              We build custom security platforms, AI agents, and compliance
              automation for MSSPs and regulated operators — then hand you the
              keys.
            </p>

            <div className="mt-6">
              <Button
                href={CTA_HREF}
                className="!px-5 !py-2.5 !text-[13px]"
                magnetic={false}
              >
                Book a Call
              </Button>
            </div>

            <ul className="mt-6 flex items-center gap-2.5">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel={EXTERNAL_REL}
                    aria-label={s.label}
                    className="grid size-8 place-items-center rounded-full border border-line/70 bg-surface text-muted transition-colors duration-300 hover:border-accent/50 hover:text-bright"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden
                      className="size-3.5 fill-current"
                    >
                      {s.icon}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>

            {/*
              Marked up as an <address> so the phone and postal address are the
              machine-readable contact block for the page, matching the
              PostalAddress in the Organization JSON-LD. `not-italic` because
              the element defaults to italic.
            */}
            <address className="mt-7 space-y-5 text-[13px] not-italic leading-relaxed text-muted">
              <div>
                <p className="text-[12.5px] font-semibold text-bright">
                  Phone
                </p>
                <a
                  href={`tel:${SITE.phone}`}
                  className="mt-1 inline-block underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-bright"
                >
                  {SITE.phoneDisplay}
                </a>
              </div>
              <div>
                <p className="text-[12.5px] font-semibold text-bright">
                  Address
                </p>
                <p className="mt-1">
                  {ADDRESS.street},
                  <br />
                  {ADDRESS.locality}, {ADDRESS.region} {ADDRESS.postalCode},
                  <br />
                  {ADDRESS.countryName}
                </p>
              </div>
            </address>

            {/*
              Prose, not the three uppercase badges this replaced — a sentence
              set in mono caps at 0.2em tracking is a wall to read. Sized and
              coloured to sit below the address without competing with it.
            */}
            <p className="mt-6 border-t border-line-soft pt-5 text-[12.5px] leading-relaxed text-faint">
              Headquartered in Canada. Delivering NIS2, DORA, and
              GDPR-compliant engineering to clients across Europe, North
              America, and beyond.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                {/*
                  A styled <p>, not a heading — these are nav-group labels
                  inside the footer's own <nav>, not document section
                  headings, so h2/h3 would misrepresent the page outline.
                */}
                <p className="mb-4 font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-accent">
                  {col.title}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    /*
                      Key on the label alone, never on the href.
                      React keys are serialised into the RSC flight payload in
                      the page source, and `href + label` produced URL-shaped
                      strings there ("/careersCareers", "/supportSupport").
                      Googlebot extracted those as links and reported them as
                      404s. Labels are unique within a column, so this is still
                      a stable key.
                    */
                    <li key={l.label}>
                      {/*
                        next/link is for routes. mailto: goes to the OS and
                        needs a plain <a> with no target="_blank" — handing
                        the mail client a new tab strands the visitor on an
                        empty one.
                      */}
                      {/^mailto:/i.test(l.href) ? (
                        <a
                          href={l.href}
                          className="group inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors duration-300 hover:text-bright"
                        >
                          <span className="h-px w-0 bg-accent transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-3" />
                          {l.label}
                        </a>
                      ) : (
                        <Link
                          href={l.href}
                          className="group inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors duration-300 hover:text-bright"
                        >
                          <span className="h-px w-0 bg-accent transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-3" />
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line-soft pt-7 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-[12px] text-faint">
            © {new Date().getFullYear()} {SITE.legalName}. Engineering-led. No
            sales team — you talk to engineers. Built for MSSPs running
            Splunk, Sentinel &amp; QRadar.
          </p>

          {/*
            The Cookie Policy tells the reader the preference centre is reached
            "from the link in the site footer", so this row is where that
            promise is kept. The control is a button because it opens a panel
            on the current page rather than navigating anywhere.
          */}
          <nav
            aria-label="Legal"
            className="flex flex-wrap items-center gap-x-5 gap-y-2.5"
          >
            {LEGAL_PAGES.map((l) => (
              <Link
                key={l.slug}
                href={`/${l.slug}`}
                className="text-[12.5px] text-muted transition-colors duration-300 hover:text-bright"
              >
                {l.navLabel}
              </Link>
            ))}
            <CookiePreferencesButton className="text-[12.5px] text-muted transition-colors duration-300 hover:text-bright">
              Cookie preferences
            </CookiePreferencesButton>
          </nav>
        </div>
      </div>
    </footer>
  );
}
