import type { Metadata } from "next";
import Link from "next/link";
import { ServiceCta } from "@/components/sections/service-shell";
import { Backdrop } from "@/components/ui/backdrop";
import { FaqAccordion } from "@/components/ui/faq";
import {
  Breadcrumb,
  Card,
  Eyebrow,
  Heading,
  Section,
  StatBar,
} from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem, WordsUp } from "@/components/motion";
import { breadcrumbLd, faqLd, type Faq } from "@/lib/jsonld";
import { CASE_STUDIES } from "@/lib/case-studies";
import { ADDRESS, CTA_HREF, OG_IMAGE, SITE } from "@/lib/site";

const TITLE =
  "About WhyCrew — The Engineering Partner Behind Independent Security Teams";
const DESCRIPTION =
  "WhyCrew designs, builds, and migrates custom SIEM, SOAR, and compliance automation platforms for MSSPs and regulated enterprises, then transfers full ownership to the client.";

export const metadata: Metadata = {
  // `absolute` bypasses the root layout's "%s | WhyCrew" template — the brand
  // is already in the string.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE.url}/about`,
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

const STATS = [
  { value: "40–70%", label: "Typical SIEM cost reduction" },
  { value: "12 wks", label: "Standard deployment timeline" },
  { value: "100%", label: "Ownership transferred at handover" },
  { value: "0", label: "Salespeople in the process" },
];

const PRINCIPLES = [
  {
    title: "Engineering-led, not sales-led",
    body: "Conversations happen directly with the engineers who will build the platform, starting with a 20-minute technical consultation, not a sales cycle.",
  },
  {
    title: "Full ownership, not a license",
    body: "Every engagement ends the same way: source code, infrastructure, documentation, and roadmap transfer to your team. No per-GB fees, no per-tenant fees, no dependency on WhyCrew after handover.",
  },
  {
    title: "Zero-downtime migrations",
    body: "New platforms run in parallel with legacy systems during migration, so there's no forced cutover and no gap in coverage while the switch happens.",
  },
  {
    title: "AI SOC automation that stays on-premise",
    body: "We deploy private LLM agents — Llama 3, Mistral — inside your own environment. Inference stays within your perimeter; no alert data leaves to a third-party API.",
  },
  {
    title: "Built for regulated operators, not retrofitted",
    body: "Platforms are engineered with NIS2 and DORA incident-reporting, risk-management, and audit-evidence requirements in mind from the start.",
  },
];

/**
 * Pulls straight from the case-study registry (lib/case-studies.ts) rather
 * than a hardcoded list. There is one published study today, so this section
 * shows one card; the next one added there appears here automatically, newest
 * first — same ordering as the /case-studies index.
 */
const FEATURED_CASE_STUDIES = [...CASE_STUDIES].sort((a, b) =>
  b.datePublished.localeCompare(a.datePublished)
);

const FAQS: Faq[] = [
  {
    q: "What does WhyCrew do?",
    a: "WhyCrew designs, builds, and migrates custom SIEM, SOAR, and compliance automation platforms for MSSPs and regulated enterprises, then transfers full ownership, including source code, to the client.",
  },
  {
    q: "Is WhyCrew an MSSP, or does it build platforms for MSSPs?",
    a: "WhyCrew is not an MSSP. It is an engineering partner: it builds and hands over owned SIEM, SOAR, and white-label SOC platforms that MSSPs and regulated enterprises then run themselves.",
  },
  {
    q: "How is WhyCrew different from a typical SIEM vendor?",
    a: "A typical SIEM vendor licenses a platform whose cost scales with the client's own growth, usually billed per gigabyte of ingested data or per tenant. WhyCrew builds a platform the client owns outright, with no recurring licensing tax as the business grows.",
  },
  {
    q: "Does a WhyCrew platform replace an MSSP's existing SIEM, or run alongside it?",
    a: "Both, depending on the engagement. Migrations typically run the new owned platform in parallel with the legacy SIEM, moving the highest-cost, highest-volume workloads first, so there's no forced, high-risk cutover.",
  },
  {
    q: "How long does a migration or new build take?",
    a: "WhyCrew's standard deployment timeline is 12 weeks, with a zero-downtime cutover from the legacy platform.",
  },
  {
    q: "Does WhyCrew support NIS2 and DORA compliance?",
    a: "Yes. Platforms are engineered with NIS2 and DORA incident-reporting, ICT risk-management, and audit-evidence requirements built in for EU-regulated clients and the operators serving them.",
  },
  {
    q: "Who is WhyCrew's ideal client?",
    a: "Growing, founder- or operator-led MSSPs with multiple customer tenants and rising security-software spend, and regulated enterprises that need detection and response infrastructure built around specific compliance requirements like NIS2 or DORA.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "About WhyCrew", path: "/about" },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(FAQS)) }}
      />

      {/* ============================================ HERO */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <Backdrop />
        <div className="container-page">
          <Breadcrumb
            trail={[
              { name: "Home", path: "/" },
              { name: "About WhyCrew", path: "/about" },
            ]}
          />
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.07] sm:text-5xl lg:text-[3.4rem]">
            <WordsUp text="A Cybersecurity Engineering Firm" delay={0.12} />{" "}
            <WordsUp
              text="That Hands You The Keys, Not A Bill."
              delay={0.34}
              gradient
            />
          </h1>

          <Reveal delay={0.55} mount>
            <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-body">
              WhyCrew designs, builds, and migrates custom SIEM, SOAR, and
              compliance automation platforms for MSSPs and regulated
              enterprises. We then transfer full ownership of the source code,
              infrastructure, and documentation to the client. There is no
              sales team in the process and no per-gigabyte licensing after
              handover: clients work directly with the engineers building
              their platform, from the first call through delivery and
              beyond.
            </p>
          </Reveal>

          <Reveal delay={0.75} className="mt-12" mount>
            <StatBar stats={STATS} />
          </Reveal>
        </div>
      </section>

      {/* ============================================ WHY WE EXIST */}
      <Section id="why">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Eyebrow>Why WhyCrew Exists</Eyebrow>
            <p className="max-w-sm border-l-2 border-brand/40 pl-6 text-xl font-semibold leading-snug text-bright sm:text-2xl">
              Growth should increase an MSSP&apos;s revenue, not permanently
              increase the cost of the security platform underneath it.
            </p>
          </div>
          <div className="space-y-4 text-[15px] leading-relaxed text-body">
            <p>
              Rented security platforms get more expensive exactly when a
              business succeeds. A growing MSSP adds customers, log ingestion
              climbs, and its SIEM bill climbs right alongside it, on a
              pricing model the MSSP never controls.
            </p>
            <p>
              WhyCrew was built on the opposite premise. Own it, don&apos;t
              rent it, is the thesis behind everything we build. Instead of
              licensing capacity that scales against a client&apos;s growth,
              we engineer platforms MSSPs and regulated enterprises own
              outright, built around how their business actually runs.
            </p>
          </div>
        </div>
      </Section>

      {/* ============================================ DIFFERENT */}
      <Section id="different" className="border-y border-line/40 bg-ink/40">
        <Eyebrow tone="brand">What Makes WhyCrew Different</Eyebrow>
        <Heading>
          Five Things That Don&apos;t Change From One Engagement To The Next
        </Heading>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <StaggerItem key={p.title}>
              <Card className="h-full p-7">
                <h3 className="flex items-baseline gap-2.5 text-[15px] font-semibold leading-snug">
                  <span className="text-accent" aria-hidden>
                    —
                  </span>
                  {p.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                  {p.body}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ============================================ REAL RESULTS */}
      <Section id="results">
        <Eyebrow>Real Results</Eyebrow>
        <Heading
          sub={
            FEATURED_CASE_STUDIES.length > 1
              ? "Completed engagements, with the numbers the client measured afterwards — not projections."
              : "One completed engagement so far, with the numbers the client measured afterwards. More publish here as they wrap."
          }
        >
          What We Actually Remove From A Client&apos;s Cost Structure And
          Workload
        </Heading>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2">
          {FEATURED_CASE_STUDIES.map((c) => (
            <StaggerItem key={c.slug}>
              <Link
                href={`/case-studies/${c.slug}`}
                className="group flex h-full flex-col rounded-lg border border-line/70 bg-surface/75 p-7 transition-colors duration-500 hover:border-accent/40"
              >
                <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-accent">
                  {c.topics.slice(0, 2).join(" · ")}
                </p>
                <h3 className="mt-4 max-w-md text-[16px] font-semibold leading-snug text-bright transition-colors duration-400 group-hover:text-accent-hi">
                  {c.title}
                </h3>
                <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                  {c.metrics.slice(0, 2).map((m) => (
                    <div key={m.label}>
                      <dt className="sr-only">{m.label}</dt>
                      <dd>
                        <span className="block text-xl font-semibold text-accent-hi">
                          {m.value}
                        </span>
                        <span className="mt-0.5 block text-[11px] leading-snug text-faint">
                          {m.label}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 flex-1 text-[13.5px] leading-relaxed text-muted">
                  {c.summary}
                </p>
                <div className="mt-6 border-t border-line-soft pt-4">
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent">
                    Read the case study
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

      {/* ============================================ WHO / HOW */}
      <Section id="who-how" className="border-y border-line/40 bg-ink/40">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>Who We Work With</Eyebrow>
            <Heading as="h3">Growing MSSPs And Regulated Enterprises</Heading>
            <div className="mt-6 space-y-4 text-[14.5px] leading-relaxed text-body">
              <p>
                WhyCrew works best with growing MSSPs — typically founder-,
                owner-, or operator-led, running multiple customer tenants,
                facing rising SIEM or security-software spend, and looking to
                protect gross margin without taking on a large in-house
                platform-engineering burden.
              </p>
              <p>
                We also work with regulated enterprises across Europe, North
                America, the Middle East, and Asia-Pacific that need detection
                and response infrastructure engineered around specific
                compliance obligations, including NIS2 and DORA, rather than
                adapted from a generic template.
              </p>
            </div>
          </div>
          <div>
            <Eyebrow tone="brand">How We Operate</Eyebrow>
            <Heading as="h3">
              Engineering Capacity Is The Mechanism, Not The Product
            </Heading>
            <div className="mt-6 space-y-4 text-[14.5px] leading-relaxed text-body">
              <p>
                The commercial conversation stays centered on ownership and
                economics: what a client&apos;s platform actually costs to
                run today on Splunk, Microsoft Sentinel, IBM QRadar, or a
                similar licensed platform, what owning it outright on
                infrastructure like Elasticsearch, OpenSearch, or Wazuh would
                look like instead, and what engineering work needs to happen
                to get there safely.
              </p>
              <p>
                AI-assisted workflows are embedded into telemetry and triage
                where they measurably cut repetitive analyst work, and run
                entirely within the client&apos;s own environment.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================ CONTACT INFO */}
      <Section id="contact-info">
        <Eyebrow>Where To Find Us</Eyebrow>
        <Heading sub="Working with MSSPs and regulated operators internationally.">
          Headquartered In Whitby, Ontario, Canada
        </Heading>
        <Reveal className="mt-10">
          <Card className="grid gap-8 p-8 sm:grid-cols-2 lg:grid-cols-4" interactive={false}>
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                Address
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-bright">
                {ADDRESS.street},
                <br />
                {ADDRESS.locality}, {ADDRESS.region} {ADDRESS.postalCode},
                <br />
                {ADDRESS.countryName}
              </p>
            </div>
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                Phone
              </h3>
              <a
                href={`tel:${SITE.phone}`}
                className="mt-2 inline-block text-[14px] text-bright transition-colors duration-300 hover:text-accent"
              >
                {SITE.phoneDisplay}
              </a>
            </div>
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                Security incidents
              </h3>
              <a
                href={`mailto:${SITE.incidentEmail}`}
                className="mt-2 inline-block text-[14px] text-bright transition-colors duration-300 hover:text-accent"
              >
                {SITE.incidentEmail}
              </a>
            </div>
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                Press &amp; media
              </h3>
              <a
                href={`mailto:${SITE.pressEmail}`}
                className="mt-2 inline-block text-[14px] text-bright transition-colors duration-300 hover:text-accent"
              >
                {SITE.pressEmail}
              </a>
            </div>
          </Card>
        </Reveal>
      </Section>

      {/* ============================================ FAQ */}
      <Section id="faq" className="border-t border-line/40 bg-ink/40">
        <Eyebrow>Frequently Asked Questions</Eyebrow>
        <Heading>Questions We Hear On The First Call</Heading>
        <div className="mt-10">
          <FaqAccordion faqs={FAQS} />
        </div>
      </Section>

      <ServiceCta
        title="Bring Your Vendor Bill."
        highlight="We'll Show You What Owning It Looks Like."
        body="Twenty minutes with an engineer, not a channel rep. We'll map what your current platform costs against what owning one outright would look like."
        primary={{ label: "Book a 20-Min Strategy Call", href: CTA_HREF }}
        secondary={{ label: "Explore Our Services", href: "/services" }}
      />
    </>
  );
}
