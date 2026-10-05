import type { Metadata } from "next";
import { Backdrop } from "@/components/ui/backdrop";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  Card,
  Eyebrow,
  Heading,
  Section,
} from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem, WordsUp } from "@/components/motion";
import { breadcrumbLd, serviceListLd } from "@/lib/jsonld";
import { CTA_HREF, OG_IMAGE, SERVICES, SITE } from "@/lib/site";

const TITLE = "Security Engineering Services for MSSPs";
const DESCRIPTION =
  "Custom SIEM, SOAR, AI-powered SOC automation, and NIS2/DORA/NCA ECC compliance platforms, built once and fully owned, with no vendor lock-in.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  // Without these the hub inherits the root layout's card wholesale, which
  // names the homepage — so a shared /services link showed the homepage title,
  // description, and og:url.
  openGraph: {
    title: `${TITLE} | ${SITE.name}`,
    description: DESCRIPTION,
    url: `${SITE.url}/services`,
    type: "website",
    images: OG_IMAGE,
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | ${SITE.name}`,
    description: DESCRIPTION,
  },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
            ])
          ),
        }}
      />

      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
        <Backdrop />
        <div className="container-page">
          <Breadcrumb
            trail={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
            ]}
          />
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] sm:text-5xl">
            <WordsUp
              text="Security Engineering Services: Custom SIEM, SOC & Compliance Platforms You Own"
              delay={0.1}
              highlight={["Own"]}
            />
          </h1>
          <Reveal delay={0.5} mount>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-body">
              WhyCrew designs and builds the security platform, you end up
              owning, not renting. That covers custom SIEM and SOAR
              development, AI-powered SOC automation running entirely
              inside your own environment, white-label platforms for
              MSSPs, and compliance automation for NIS2, DORA, NCA ECC,
              and SAMA CSF. Every engagement ends the same way: full
              source code, full documentation, and no recurring license
              tied to us. You talk to the engineers building it, not a
              sales team.
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        <Stagger className="grid gap-5 lg:grid-cols-2">
          {SERVICES.map((s, i) => (
            <StaggerItem key={s.slug}>
              <Card className="group flex h-full flex-col p-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-4 text-xl font-semibold leading-snug transition-colors duration-400 group-hover:text-accent-hi">
                  {s.name}
                </h2>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  {s.short}
                </p>
                <p className="mt-5 flex-1 text-[13.5px] leading-relaxed text-muted">
                  {s.blurb}
                </p>
                <div className="mt-7">
                  <Button href={s.href} variant="quiet">
                    Explore {s.navLabel}
                  </Button>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section className="border-t border-line/40 bg-ink/40">
        <div className="text-center">
          <Eyebrow>Not sure which one</Eyebrow>
          <Heading align="center" sub="Book a 20-minute call. We review your environment, model your costs, and give you a straight answer — including when the right answer is to stay with your current vendor.">
            Talk to an engineer first
          </Heading>
          <div className="mt-9 flex justify-center">
            <Button href={CTA_HREF}>Book a Technical Consultation</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
