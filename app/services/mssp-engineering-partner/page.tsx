import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { breadcrumbLd, faqLd, serviceLd, type Faq } from "@/lib/jsonld";
import { CTA_HREF, EXTERNAL_REL, ROBOTS, serviceBySlug } from "@/lib/site";
import { REVIEW_PROFILES, reviewById } from "@/lib/reviews";
import { ogImage } from "@/lib/og";

const svc = serviceBySlug("mssp-engineering-partner");

export const metadata: Metadata = {
  // `absolute` bypasses the root layout's "%s | WhyCrew" template so the title
  // renders exactly as specified.
  title: { absolute: svc.metaTitle },
  description: svc.metaDescription,
  alternates: { canonical: svc.href },
  robots: ROBOTS,
  openGraph: {
    title: svc.metaTitle,
    description: svc.metaDescription,
    url: svc.href,
    type: "website",
    images: ogImage(svc.href),
  },
  // Without this the page inherits the root layout's site-wide Twitter card.
  twitter: {
    card: "summary_large_image",
    title: svc.metaTitle,
    description: svc.metaDescription,
    images: ogImage(svc.href),
  },
};

/* ------------------------------------------------------------ content */

const REPO_TREE: { branch: string; name: string; note?: string; owner?: boolean }[] = [
  { branch: "├──", name: "portal/", note: "your logo, your domain" },
  { branch: "├──", name: "siem/", note: "multi-tenant, isolated tenants" },
  { branch: "├──", name: "soar/", note: "your escalation paths" },
  { branch: "├──", name: "detections/", note: "mapped to MITRE ATT&CK" },
  { branch: "├──", name: "ai-triage/", note: "private models, your infra" },
  { branch: "├──", name: "compliance/", note: "NIS2, DORA, NCA ECC, SAMA CSF" },
  { branch: "├──", name: "runbooks/" },
  { branch: "└──", name: "OWNER", note: "you", owner: true },
];

const RENT_PROBLEMS = [
  "Your brand sits on a product you don't control.",
  "Every partner resells the same portal, detections and reports.",
  "The vendor's biggest accounts set the roadmap.",
  "Leaving means migrating every client, so you stay.",
];

const COMPARE_ROWS = [
  ["Platform", "The vendor's", "Yours, with the source code"],
  ["Cost as you grow", "Rises with every client", "Fixed build, no platform fees after"],
  ["Branding", "White label, co-branded or “powered by”", "Your brand only"],
  ["Roadmap", "Set by the vendor", "Set by you"],
  ["Leaving", "Migrate every client", "Nothing to leave"],
];

const INSIDE: { title: string; body: string; href?: string }[] = [
  {
    title: "A Branded Client Portal",
    body: "Your logo and domain. Several brands can run on one architecture.",
  },
  {
    title: "Multi-Tenant SIEM",
    body: "One backend, each tenant isolated. A new client is configuration, not a project.",
    href: "/services/custom-siem-development",
  },
  {
    title: "Detections You Control",
    body: "Mapped to MITRE ATT&CK. Your team writes a new rule the same afternoon.",
  },
  {
    title: "Response Playbooks",
    body: "Escalation, ticketing and chat built around how your desk already works.",
    href: "/services/custom-soar-development",
  },
  {
    title: "AI Triage In Your Environment",
    body: "Private open-weight models cut Tier-1 handling time by 70 to 80% in our engagements.",
    href: "/services/ai-powered-soc-automation",
  },
  {
    title: "Audit-Ready Reporting",
    body: "NIS2, DORA, NCA ECC and SAMA CSF, with data kept in-region by default.",
  },
];

const PROOF: { value: string; body: string; href?: string; signal?: boolean }[] = [
  {
    value: "$110,000",
    body: "Saved in year one by an MSSP that left an ingestion-billed SIEM.",
    href: "/case-studies/siem-rent-to-owned-platform",
    signal: true,
  },
  {
    value: "40–70%",
    body: "Lower platform costs in year one, flat as clients grow.",
  },
  {
    value: "8x",
    body: "The engineering output of one hire, at a similar cost.",
    href: "/case-studies/mssp-engineering-capacity-pod",
  },
];

const PROCESS = [
  ["Scope and price.", "We map your clients and platform, then send a fixed proposal."],
  ["Blueprint.", "Nothing gets built until you sign off."],
  ["Two-week sprints.", "Piloted on one live client before cutover."],
  ["Handover.", "Code, runbooks and training move to your team."],
];

const FAQS: Faq[] = [
  {
    q: "What Is A White Label SOC Platform?",
    a: "A security operations platform an MSP or MSSP delivers to clients under its own brand. With most providers you rent access. With WhyCrew you own the platform and its source code.",
  },
  {
    q: "Can An MSP Offer SOC Services Without Building A SOC From Scratch?",
    a: "It can. We build the platform and its detections, then train your team to run it. AI triage takes on much of the Tier-1 load, so a small team can cover more clients.",
  },
  {
    q: "Do I Need In-House Security Engineers To Run It?",
    a: "You don't need them on day one. Documentation and training come with every handover, and day-to-day operation doesn't depend on us.",
  },
  {
    q: "How Long Does It Take To Launch?",
    a: "About 12 weeks from kickoff to production. Migrating client data off an existing platform adds time, depending on volume and the number of tenants.",
  },
  {
    q: "Will You Ever Contact My Clients?",
    a: "We don't. Your client relationships stay yours. After handover we have no access to the platform unless you buy optional support.",
  },
  {
    q: "Can I Run More Than One Brand On The Platform?",
    a: "One architecture can serve several white label brands, each with its own portal, and none needs its own license.",
  },
];

/* ------------------------------------------------------------ styles */

const WRAP = "mx-auto w-full max-w-[1200px] px-4 sm:px-8";
const SPLIT =
  "grid gap-12 lg:grid-cols-2 lg:gap-16";
const H2 =
  "text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.03em] text-bright";
const LEAD = "text-[17px] leading-[1.6] text-body";

function NumberedList({ items }: { items: ReactNode[] }) {
  return (
    <ol className="m-0 list-none p-0">
      {items.map((item, i) => (
        <li
          key={i}
          className={`grid grid-cols-[48px_minmax(0,1fr)] gap-4 border-t py-5 text-[17px] leading-[1.6] text-body ${
            i === 0 ? "border-line" : "border-line-soft"
          } ${i === items.length - 1 ? "border-b border-b-line-soft" : ""}`}
        >
          <span className="font-semibold text-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------ page */

export default function Page() {
  const review = reviewById("ciso");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceLd({
              name: svc.name,
              description: svc.metaDescription,
              path: svc.href,
              serviceType: "White label SOC platform for MSPs and MSSPs",
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: svc.navLabel, path: svc.href },
            ])
          ),
        }}
      />

      {/* ------------------------------------------------ hero */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-[88px]">
        <div className={`${WRAP} grid items-center gap-12 lg:grid-cols-2 lg:gap-16`}>
          <Reveal mount className="flex min-w-0 flex-col gap-6">
            <h1 className="m-0 text-[clamp(40px,5.6vw,72px)] font-semibold leading-[1.02] tracking-[-0.035em] text-bright">
              White Label SOC Platform, Yours To Own
            </h1>
            <p className="m-0 max-w-[30ch] text-xl leading-normal text-body">
              Built for MSPs and MSSPs, handed over with the source code.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Button href={CTA_HREF}>Book a technical consultation</Button>
              <Button href="#proof" variant="ghost">
                See the numbers
              </Button>
            </div>
          </Reveal>

          <Reveal mount delay={0.15} className="min-w-0">
            <figure className="m-0">
              <pre
                aria-label="Repository tree of the platform you receive at handover"
                className="m-0 overflow-x-auto whitespace-pre rounded-xl border border-line bg-surface p-6 font-mono text-[13px] leading-[1.9] text-bright sm:p-8 sm:text-[15px]"
              >
                <span className="text-accent">your-soc-platform/</span>
                {REPO_TREE.map((r) => (
                  <span key={r.name} className="block">
                    {r.branch}{" "}
                    {r.owner ? (
                      <span className="text-accent">{r.name}</span>
                    ) : (
                      r.name
                    )}
                    {r.note && (
                      <>
                        {" ".repeat(Math.max(2, 16 - r.name.length))}
                        <span className="text-[#8b9ac0]">{r.note}</span>
                      </>
                    )}
                  </span>
                ))}
              </pre>
              <figcaption className="mt-3.5 text-[15px] text-body">
                What lands in your repository at handover. No license file to
                renew.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------ problem */}
      <section className="border-y border-line-soft bg-ink">
        <div className={`${WRAP} ${SPLIT} items-start py-20 sm:py-[104px]`}>
          <Reveal className="flex min-w-0 flex-col gap-5">
            <h2 className={H2}>Every New Client Raises Your Rent</h2>
            <p className={`${LEAD} max-w-[42ch]`}>
              A rented white label SOC platform bills per endpoint or per user,
              and the SIEM underneath often bills by data volume too. Your bill
              grows with your revenue, so the margin never improves.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="min-w-0">
            <NumberedList items={RENT_PROBLEMS} />
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------ comparison */}
      <section className={`${WRAP} py-20 sm:py-[104px]`}>
        <Reveal className="mb-10 grid items-end gap-x-16 gap-y-6 lg:grid-cols-2">
          <h2 className={H2}>Rented Vs. Owned White Label SOC Platform</h2>
          <p className={`${LEAD} max-w-[46ch]`}>
            An owned platform is a multi-tenant SOC stack we engineer for you,
            then transfer. Your clients see only your brand, because there is
            no vendor brand in it.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-[17px]">
            <thead>
              <tr className="border-b-2 border-line">
                <th scope="col" className="w-[28%] py-3.5 pr-4 font-medium text-muted">
                  What you compare
                </th>
                <th scope="col" className="px-4 py-3.5 font-medium text-muted">
                  Rented white label SOC
                </th>
                <th scope="col" className="px-4 py-3.5 font-semibold text-accent">
                  Owned, built by WhyCrew
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map(([label, rented, owned]) => (
                <tr key={label} className="border-b border-line-soft">
                  <th scope="row" className="py-[18px] pr-4 font-medium text-bright">
                    {label}
                  </th>
                  <td className="px-4 py-[18px] text-muted">{rented}</td>
                  <td className="px-4 py-[18px] font-medium text-bright">{owned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </section>

      {/* ------------------------------------------------ inside */}
      <section className="border-t border-line-soft">
        <div className={`${WRAP} py-20 sm:py-[104px]`}>
          <Reveal>
            <h2 className={`${H2} mb-12`}>What&apos;s Inside The Platform</h2>
          </Reveal>
          <div className="grid gap-x-16 sm:grid-cols-2 lg:grid-cols-3">
            {INSIDE.map((f, i) => (
              <Reveal
                key={f.title}
                delay={(i % 3) * 0.06}
                className="border-t border-line pt-6 pb-9"
              >
                <h3 className="m-0 mb-2 text-[22px] font-semibold tracking-[-0.01em] text-bright">
                  {f.href ? (
                    <Link href={f.href} className="transition-colors hover:text-accent">
                      {f.title}
                    </Link>
                  ) : (
                    f.title
                  )}
                </h3>
                <p className={LEAD}>{f.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ proof */}
      <section id="proof" className="scroll-mt-24 border-y border-line bg-surface">
        <div className={`${WRAP} flex flex-col gap-[72px] py-20 sm:py-28`}>
          <div className="grid gap-12 md:grid-cols-3">
            {PROOF.map((p, i) => (
              <Reveal key={p.value} delay={i * 0.08} className="border-t border-line pt-6">
                <p
                  className={`m-0 text-[clamp(48px,6vw,80px)] font-semibold leading-none tracking-[-0.04em] ${
                    p.signal ? "text-accent" : "text-bright"
                  }`}
                >
                  {p.value}
                </p>
                <p className="mt-4 max-w-[32ch] text-[17px] leading-[1.6] text-[#8b9ac0]">
                  {p.body}
                </p>
                {p.href && (
                  <Link
                    href={p.href}
                    className="group mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent hover:text-accent-hi"
                  >
                    Read the case study
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                )}
              </Reveal>
            ))}
          </div>

          <Reveal>
            <figure className="m-0 max-w-[900px]">
              <blockquote className="m-0 text-[clamp(22px,2.4vw,30px)] font-medium leading-[1.4] tracking-[-0.015em] text-bright">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-base text-[#8b9ac0]">
                Confidential client, Chief Information Security Officer. Rated
                5.0 on Upwork.
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line pt-8">
            <p className="m-0 text-base text-[#8b9ac0]">Reviewed by clients on</p>
            <ul aria-label="Review platforms" className="m-0 flex list-none flex-wrap gap-2.5 p-0">
              <li>
                <span className="inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-line bg-void px-3.5 py-2 text-[15px] font-semibold text-bright">
                  Upwork
                  <span className="inline-flex items-center gap-1 text-accent">
                    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />
                    </svg>
                    5.0
                  </span>
                </span>
              </li>
              {REVIEW_PROFILES.map((p) => (
                <li key={p.name}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel={EXTERNAL_REL}
                    aria-label={`WhyCrew on ${p.name} (opens in a new tab)`}
                    className="inline-flex min-h-11 items-center rounded-[10px] border border-line bg-void px-3.5 py-2 text-[15px] font-semibold text-bright transition-colors hover:border-brand-hi hover:text-accent"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------ pricing + process */}
      <section id="process" className={`${WRAP} ${SPLIT} scroll-mt-24 items-start py-20 sm:py-[104px]`}>
        <Reveal className="flex min-w-0 flex-col gap-5">
          <h2 className={H2}>One Fixed Price, Then It&apos;s Yours</h2>
          <p className={`${LEAD} max-w-[44ch]`}>
            No hourly billing, per-seat fee or per-GB fee. We quote after one
            call about your client count, data volumes and current spend.
            Support afterwards is optional.
          </p>
          <div>
            <Button href={CTA_HREF}>Get a fixed quote</Button>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="min-w-0">
          <p className="mb-4 text-[15px] text-body">
            About 12 weeks from kickoff to your first live client
          </p>
          <NumberedList
            items={PROCESS.map(([title, body]) => (
              <>
                <strong className="font-semibold text-bright">{title}</strong>{" "}
                {body}
              </>
            ))}
          />
        </Reveal>
      </section>

      {/* ------------------------------------------------ faq */}
      <section id="faq" className="scroll-mt-24 border-t border-line-soft bg-ink">
        <div className={`${WRAP} flex flex-wrap items-start gap-x-16 gap-y-12 py-20 sm:py-[104px]`}>
          <Reveal className="min-w-0 flex-[1_1_280px]">
            <h2 className={H2}>Questions MSPs Ask First</h2>
          </Reveal>
          <Reveal delay={0.1} className="min-w-0 flex-[999_1_560px]">
            {FAQS.map((f, i) => (
              <details
                key={f.q}
                className={`group border-t py-[18px] ${
                  i === 0 ? "border-line" : "border-line-soft"
                } ${i === FAQS.length - 1 ? "border-b border-b-line-soft" : ""}`}
              >
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-brand-hi [&::-webkit-details-marker]:hidden">
                  <h3 className="m-0 text-[19px] font-semibold text-bright">{f.q}</h3>
                  <span
                    aria-hidden
                    className="text-[26px] leading-none text-accent transition-transform duration-150 group-open:rotate-45 motion-reduce:transition-none"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-2.5 max-w-[60ch] text-[17px] leading-[1.6] text-body">
                  {f.a}
                </p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------ final cta */}
      <section id="book" className="scroll-mt-24 border-t border-line">
        <Reveal className={`${WRAP} flex flex-col items-start gap-6 py-24 sm:py-[120px]`}>
          <h2 className="m-0 max-w-[14ch] text-[clamp(40px,5.6vw,72px)] font-semibold leading-[1.02] tracking-[-0.035em] text-bright">
            Bring Your Current Platform Invoice
          </h2>
          <p className="m-0 max-w-[44ch] text-xl text-body">
            In 20 minutes an engineer shows you what owning it would cost
            instead.
          </p>
          <div className="mt-2">
            <Button href={CTA_HREF}>Book a 20 minute strategy call</Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
