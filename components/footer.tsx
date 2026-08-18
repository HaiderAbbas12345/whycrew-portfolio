import Image from "next/image";
import Link from "next/link";
import { CTA_HREF, SERVICES, SITE } from "@/lib/site";

const columns = [
  {
    title: "Services",
    links: SERVICES.map((s) => ({ label: s.navLabel, href: s.href })),
  },
  {
    title: "Company",
    links: [
      { label: "Results", href: "/#results" },
      { label: "How it Works", href: "/#how-it-works" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Talk to us",
    links: [
      { label: "Book a technical consultation", href: CTA_HREF },
      { label: "Report a security incident", href: `mailto:${SITE.incidentEmail}` },
      { label: "Press & media", href: `mailto:${SITE.pressEmail}` },
      { label: "Engineering roles", href: "/contact?topic=careers" },
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
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/logo.jpeg"
                alt=""
                width={34}
                height={34}
                className="rounded-md ring-1 ring-brand/40"
              />
              <span className="text-base font-semibold tracking-tight text-bright">
                Why<span className="text-brand-hi">Crew</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-muted">
              We build custom security platforms, AI agents, and compliance
              automation for MSSPs and regulated operators — then hand you the
              keys.
            </p>
            <p className="mt-6 font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.2em] text-faint">
              Engineering-led team
              <br />
              GDPR-aligned deployment options
              <br />
              NIS2 reporting built in
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="mb-4 font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-accent">
                  {col.title}
                </h2>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link
                        href={l.href}
                        className="group inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors duration-300 hover:text-bright"
                      >
                        <span className="h-px w-0 bg-accent transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-3" />
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line-soft pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-faint">
            © {new Date().getFullYear()} {SITE.legalName}. Engineering-led. No
            sales team — you talk to engineers.
          </p>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint">
            Built for MSSPs running Splunk, Sentinel &amp; QRadar
          </p>
        </div>
      </div>
    </footer>
  );
}
