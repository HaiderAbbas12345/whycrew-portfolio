import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import {
  ServiceHero,
  Section,
  SectionHead,
  DeliverList,
  Steps,
  Assure,
  CTABand,
} from "@/components/Primitives";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "WhyCrew connects your tools, systems, and APIs into one clean flow. Built as a security surface, not just plumbing.",
};

export default function Page() {
  return (
    <>
      <ServiceHero
        kicker="Integrations"
        title="Make your tools talk to each other."
        sub={
          <>
            We connect your systems, security stacks, SaaS, internal apps, and APIs, so data moves
            cleanly <b className="font-semibold text-text">instead of being copied by hand.</b>
          </>
        }
      />

      <Section>
        <Reveal className="max-w-[60ch] space-y-4 text-[17px] leading-relaxed text-muted">
          <p>Most teams run a dozen tools that do not talk. The glue between them is manual, fragile, and quietly eats hours every week.</p>
          <p>
            We build the integrations that join them into one flow:{" "}
            <b className="font-semibold text-text">SIEM to ticketing, app to CRM, API to API,</b> with
            the data mapped, normalized, and moving reliably. No more exporting from one screen to
            paste into another.
          </p>
          <p>
            And where the data is sensitive, a sloppy integration is a security hole. We treat every
            connection as a security surface, not just plumbing, so the flow is clean and safe.
          </p>
        </Reveal>
      </Section>

      <Section>
        <SectionHead eyebrow="What you get" title="One clean flow." />
        <DeliverList
          items={[
            "Reliable connections between your tools, systems, and APIs.",
            "Data mapped and normalized so it actually lines up across systems.",
            "Secure handling — sensitive data moves without exposure.",
            "Less manual glue — your team stops copying data between screens.",
          ]}
        />
      </Section>

      <Section id="how">
        <SectionHead eyebrow="How we work" title="Map, build, maintain." />
        <Steps
          steps={[
            { n: "01", title: "Map", body: "We map the systems and exactly how data needs to flow between them." },
            { n: "02", title: "Build", body: "We build and test the connections until the data lines up and holds." },
            { n: "03", title: "Maintain", body: "We monitor and maintain so they keep working as your tools change." },
          ]}
        />
        <Assure>
          <b className="font-semibold text-text">We treat integrations as a security surface,</b> not
          an afterthought.
        </Assure>
      </Section>

      <CTABand
        eyebrow="Tangled stack?"
        title="Which tools won't talk?"
        body="Tell us your stack. We will show you how to make it one clean flow."
      />
    </>
  );
}
