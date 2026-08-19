import type { Metadata } from "next";
import { ServiceCta, ServiceHero } from "@/components/sections/service-shell";
import { FaqAccordion } from "@/components/ui/faq";
import {
  ArrowList,
  Card,
  CheckList,
  CompareTable,
  Eyebrow,
  Heading,
  ProcessSteps,
  Section,
} from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { breadcrumbLd, faqLd, serviceLd, type Faq } from "@/lib/jsonld";
import { CTA_HREF, serviceBySlug } from "@/lib/site";

const svc = serviceBySlug("mssp-engineering-partner");

export const metadata: Metadata = {
  title: "MSSP Engineering Partner | Build a White-Label SOC Platform",
  description: svc.metaDescription,
  alternates: { canonical: svc.href },
  openGraph: {
    title: svc.metaTitle,
    description: svc.metaDescription,
    url: svc.href,
  },
};

const STATS = [
  { value: "100%", label: "Platform & Code Ownership" },
  { value: "12 wks", label: "Typical Time to Launch" },
  { value: "0", label: "Ongoing Licensing Fees" },
  { value: "40–70%", label: "Typical Margin Improvement" },
];

const MARGIN_BREAKERS = [
  {
    title: "Your tenth client costs the same cut as your first.",
    body: "There's no economy of scale, because you never owned the platform to tune it. Every vendor prices access the same way, no matter how much volume you bring.",
  },
  {
    title: "You're building someone else's brand.",
    body: "Every hour you spend onboarding a client makes the vendor's product stickier — not yours. End the relationship, and your client-facing brand walks out with it.",
  },
  {
    title: "You don't set the roadmap.",
    body: "The vendor builds for their biggest direct accounts first. So you wait for the features your clients are asking you for today.",
  },
];

const PARTNERSHIP_TABLE = {
  head: ["", "Typical MSSP Vendor Partnership", "WhyCrew Engineering Partnership"],
  rows: [
    [
      "Platform Ownership",
      "You license access. The vendor owns the code.",
      "You own the platform and source code outright",
    ],
    [
      "Pricing Model",
      "Per-seat or per-GB fees that climb with growth",
      "Fixed-price build, zero ongoing platform fees",
    ],
    [
      "Roadmap Control",
      "The vendor prioritizes their own accounts",
      "You decide what gets built next",
    ],
    [
      "Differentiation",
      "You run the same platform as every other partner",
      "You run a platform engineered to your operations",
    ],
    [
      "Exit Path",
      "Migrate off the vendor's platform if things end",
      "Nothing to migrate. You already own it.",
    ],
  ],
};

const BUILT_FOR = [
  "MSSPs growing out of reseller economics and ready to own their platform",
  "VARs and IT providers launching a managed SOC service for the first time",
  "Operators migrating off a shared vendor platform and done paying per-tenant fees",
];

const BUILD_INCLUDES = [
  "White-label SOC portal — your brand, your UX, from day one",
  "Multi-tenant backend — every client's data stays isolated and yours to control",
  "Source code ownership — full transfer at handover, no escrow, no conditions",
  "Migration support — if you're moving off a current platform, we build alongside it with zero downtime",
  "Documentation and handover — runbooks, API docs, and hands-on training so your team runs it without us",
];

const GLOBAL_INCLUDES = [
  "EU data residency and regional hosting: on-premise or in-region by default, not a special request",
  "Source code handed directly to you at handover. No escrow, no waiting on a vendor failure condition. You hold the code from day one.",
  "Audit-ready compliance documentation, built into the platform from the start",
  "Full API docs and runbooks, so your team can extend the platform without calling us back",
];

const PROCESS = [
  {
    title: "We scope it, then price it.",
    body: "We map your target clients, your current platform if you have one, and the shortest route to production. You get a fixed-price proposal with a defined scope, no hourly clock, no budget surprises halfway through. If the scope doesn't fit, we say so before you sign anything.",
  },
  {
    title: "You approve the blueprint before we build.",
    body: "We design the data model, the white-label portal, and the detection logic, then put it in front of you. Nothing gets built until you've signed off on the architecture. Changes at the design stage cost nothing — changes mid-build do.",
  },
  {
    title: "We prove it on a real client before you bet the business on it.",
    body: "We build in two-week sprints and pilot against one live client account. Your first paying customer isn't your test run. By the time you cut over, your team has already seen it work.",
  },
  {
    title: "You own it outright, and we hand over the keys.",
    body: "Source code, documentation, and hands-on engineering training all transfer to your team. From that day forward, every client you add is margin, not another licensing tier. There's no support contract you're required to sign and no ongoing dependency on us.",
  },
];

const CASE_ROWS = [
  ["Client profile", "German MSSP running 40+ enterprise clients"],
  ["Action taken", "Replaced vendor-licensed SIEM with a WhyCrew-built platform"],
  ["Migration downtime", "Zero"],
  ["Time to launch", "Live in 6 weeks"],
  ["Annual savings", "€340K in eliminated per-tenant licensing fees"],
  ["Ownership status", "Platform owned outright. No ongoing fees, no vendor contract to renew."],
];

const FAQS: Faq[] = [
  {
    q: "Do we need existing security engineering expertise to run this?",
    a: "No. We build the platform for your team to operate, with full documentation and training included. You can launch with limited in-house security engineering and grow into it.",
  },
  {
    q: "Can we white-label this under multiple client-facing brands?",
    a: "Yes. One architecture powers every branded front end, no separate license per brand.",
  },
  {
    q: "How is this different from becoming a reseller of an existing SOC platform?",
    a: "Reselling means someone else's product, pricing, and roadmap. We build the platform for you. You own the code, set your price, and never pay a per-tenant fee.",
  },
  {
    q: "What happens to our existing client data if we're migrating off a current platform?",
    a: "We build the new platform alongside your current one, migrate your data with zero downtime, and cut over only after your team signs off.",
  },
  {
    q: "How long does it take to launch?",
    a: "Most builds run 12 weeks from kickoff to production. Allow extra time if you're migrating existing client data.",
  },
  {
    q: "What is an MSSP engineering partner?",
    a: "An MSSP engineering partner builds the SOC platform your managed security business runs on and hands you the source code outright. Unlike a vendor partnership, where you resell someone else's platform at their price, WhyCrew designs, builds, and transfers the platform to you for a fixed price. No ongoing licensing fees. No per-tenant charges. No dependency on us after handover.",
  },
  {
    q: "Can WhyCrew replace our current reseller platform?",
    a: "Yes. We build your new platform alongside your existing one, migrate your client data, and cut over only after your team signs off, with zero client-facing downtime. Once complete, the per-tenant fees stop, the vendor contract ends, and you own a platform built to your specs.",
  },
  {
    q: "How much can an MSSP save by owning its platform?",
    a: "Typically 40–70% in year one. One German MSSP running 40+ enterprise clients cut €340K in annual licensing fees — a 62% reduction — after switching to a WhyCrew-built platform. Your platform costs stay flat as you grow. A reseller's fees don't.",
  },
];

export default function Page() {
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
              serviceType: "White-label MSSP SOC platform engineering",
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

      <ServiceHero
        title="MSSP Engineering Partner"
        highlight={["Partner"]}
        lead="Stop Reselling a Platform. Start Owning One."
        intro={
          <>
            <p>
              WhyCrew is an MSSP engineering partner that builds white-label SOC
              platforms for MSSPs, VARs, and managed security operators who want
              to own their stack outright, not rent it from a vendor. Most MSSP
              partnership programs turn you into a reseller. You sell someone
              else&apos;s platform, at their price, on their roadmap, for the
              margin they leave you.
            </p>
            <p>
              WhyCrew builds your platform instead. We hand you the source code
              and walk away. You set the price. You set the roadmap. You own the
              business.
            </p>
            <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">
              20 minutes with an engineer, not a channel rep. No pitch deck.
            </p>
          </>
        }
        primaryCta={{
          label: "Book a Technical Consultation",
          href: CTA_HREF,
        }}
        secondaryCta={{ label: "See the Numbers", href: "#proof" }}
        stats={STATS}
        breadcrumbName={svc.navLabel}
        breadcrumbPath={svc.href}
      />

      {/* ------------------------------------------------ margin */}
      <Section>
        <Eyebrow tone="danger">The reseller trap</Eyebrow>
        <Heading sub="You didn't come here to learn what a reseller fee is. You're paying one right now, and it's climbing faster than your revenue per client.">
          You Already Know What&apos;s Breaking Your Margin
        </Heading>

        <Stagger className="mt-12 grid gap-5 lg:grid-cols-3">
          {MARGIN_BREAKERS.map((m, i) => (
            <StaggerItem key={m.title}>
              <Card className="h-full p-7">
                <span className="font-mono text-[11px] font-bold tracking-[0.14em] text-danger">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[15px] font-semibold leading-snug">
                  {m.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                  {m.body}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-8">
          <p className="text-[15px] font-semibold text-bright">
            WhyCrew removes all three. Fixed price, your source code, your
            roadmap.
          </p>
        </Reveal>
      </Section>

      {/* ------------------------------------------------ comparison */}
      <Section className="border-y border-line/40 bg-ink/40">
        <Eyebrow tone="brand">Vendor partnership vs. engineering partnership</Eyebrow>
        <Heading>
          MSSP Vendor Partnership vs. WhyCrew Engineering Partnership
        </Heading>
        <Reveal className="mt-10">
          <CompareTable
            head={PARTNERSHIP_TABLE.head}
            rows={PARTNERSHIP_TABLE.rows}
            highlightCol={2}
          />
        </Reveal>
      </Section>

      {/* ------------------------------------------------ paths */}
      <Section id="paths">
        <Eyebrow>Which path fits your business?</Eyebrow>
        <Heading sub="Two routes to platform ownership. Both end with your name on the code.">
          Build from scratch, or migrate off a reseller
        </Heading>

        <Reveal className="mt-10">
          <Card className="p-7" interactive={false}>
            <h3 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              Built for
            </h3>
            <ArrowList items={BUILT_FOR} />
          </Card>
        </Reveal>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full p-8">
              <h3 className="text-lg font-semibold">
                Build Your Own MSSP From Scratch
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-body">
                Bring the client relationships. We handle everything else. Every
                build includes:
              </p>
              <div className="mt-6">
                <CheckList items={BUILD_INCLUDES} />
              </div>
              <p className="mt-6 border-t border-line-soft pt-5 text-[13px] leading-relaxed text-muted">
                <strong className="font-semibold text-bright">Best fit:</strong>{" "}
                IT service providers expanding into security, consultancies and
                VARs done reselling someone else&apos;s product, and teams that
                want to offer a managed SOC without staffing a 24×7 desk on day
                one.
              </p>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="h-full p-8">
              <h3 className="text-lg font-semibold">
                Migrate Off a Reseller Platform
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-body">
                Your current platform keeps running while we build the new one
                alongside it. We migrate your client data with zero downtime and
                cut over only once your team signs off. You never run two
                platforms on a client&apos;s dime.
              </p>
              <p className="mt-6 border-t border-line-soft pt-5 text-[13px] leading-relaxed text-muted">
                <strong className="font-semibold text-bright">Best fit:</strong>{" "}
                MSSPs paying recurring per-tenant fees to a platform vendor,
                operators who&apos;ve hit the customization ceiling on a shared
                platform, and any private-label provider ready to own the stack
                they&apos;ve been renting.
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------ proof */}
      <Section id="proof" className="border-y border-line/40 bg-ink/40">
        <Eyebrow>Proof of ownership</Eyebrow>
        <Heading sub="Numbers from completed engagements, not projections.">
          Annual Savings, Margin Improvement, and Time to Launch
        </Heading>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <Card className="h-full p-8" interactive={false}>
              <h3 className="text-lg font-semibold">
                €340K Saved Per Year: German MSSP
              </h3>
              <dl className="mt-6 divide-y divide-line-soft">
                {CASE_ROWS.map(([k, v]) => (
                  <div
                    key={k}
                    className="grid gap-1 py-3.5 sm:grid-cols-[10rem_1fr] sm:gap-6"
                  >
                    <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
                      {k}
                    </dt>
                    <dd className="text-[13.5px] leading-relaxed text-body">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
          </Reveal>

          <div className="grid gap-5">
            <Reveal delay={0.08}>
              <Card className="p-7">
                <div className="text-3xl font-semibold text-gradient">
                  40–70%
                </div>
                <h3 className="mt-2 text-[14px] font-semibold">
                  Typical margin improvement
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted">
                  Across completed MSSP Engineering engagements, clients moving
                  from reseller licensing to an owned platform typically cut
                  platform costs by 40–70% in year one — and the gap keeps
                  widening as their client count grows, because their costs stay
                  flat while a reseller&apos;s fees keep rising.
                </p>
              </Card>
            </Reveal>
            <Reveal delay={0.16}>
              <Card className="p-7">
                <div className="text-3xl font-semibold text-gradient">
                  12 wks
                </div>
                <h3 className="mt-2 text-[14px] font-semibold">
                  Time to launch
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted">
                  That&apos;s the typical build window, kickoff to production.
                  Most clients are running live client accounts before their old
                  vendor contract even expires.
                </p>
              </Card>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------ global */}
      <Section>
        <Eyebrow tone="brand">Global track record</Eyebrow>
        <Heading sub="WhyCrew works with MSSPs and regulated operators globally, but our deepest client concentration sits across the EU, where “our data runs on a US vendor's shared platform” kills deals before they start. Wherever you operate, every engagement includes:">
          Strong Global Track Record. Particularly Deep in Europe.
        </Heading>
        <Reveal className="mt-10">
          <Card className="p-8">
            <CheckList items={GLOBAL_INCLUDES} />
            <p className="mt-7 border-t border-line-soft pt-6 text-[13.5px] leading-relaxed text-muted">
              Operators who need to prove platform control keep choosing this
              model, from regulated financial infrastructure in Frankfurt and
              healthcare networks in the Netherlands, to multi-tenant security
              practices across the US, Canada, and APAC.
            </p>
          </Card>
        </Reveal>
      </Section>

      {/* ------------------------------------------------ process */}
      <Section id="process" className="border-y border-line/40 bg-ink/40">
        <Eyebrow>How we actually build it</Eyebrow>
        <Heading sub="One fixed price. Four stages. You approve every decision, and you walk away owning everything.">
          How We Actually Build It
        </Heading>
        <div className="mt-12">
          <ProcessSteps steps={PROCESS} />
        </div>
      </Section>

      {/* ------------------------------------------------ faq */}
      <Section id="faq">
        <Eyebrow>Frequently asked questions</Eyebrow>
        <Heading>MSSP engineering, answered</Heading>
        <div className="mt-10">
          <FaqAccordion faqs={FAQS} />
        </div>
      </Section>

      <ServiceCta
        title="Stop Reselling a Platform."
        highlight="Start Owning One."
        body="Twenty minutes with an engineer, not a channel rep. We map your target clients, your current platform, and the shortest route to production — then give you a fixed-price proposal."
        primary={{ label: "Book a Technical Consultation", href: CTA_HREF }}
        secondary={{
          label: "Explore Custom SIEM & SOAR",
          href: "/services/custom-siem-soar-development",
        }}
        footnote="Fixed price · Your source code · Your roadmap · No pitch deck"
      />
    </>
  );
}
