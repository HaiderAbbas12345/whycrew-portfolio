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
  title: "AI & Agentic Workflows",
  description:
    "WhyCrew builds AI and agentic workflows into your product or operations, with the data controls that make them safe to ship in production.",
};

export default function Page() {
  return (
    <>
      <ServiceHero
        kicker="AI & Agentic Workflows"
        title="Put AI to work inside your product, safely."
        sub={
          <>
            We build AI and agentic workflows into your application or operations, with the data
            controls that make them <b className="font-semibold text-text">safe to ship, not a liability.</b>
          </>
        }
      />

      <Section>
        <Reveal className="max-w-[60ch] space-y-4 text-[17px] leading-relaxed text-muted">
          <p>There is a wide gap between an AI demo and an AI feature you can put in front of customers. We close it.</p>
          <p>
            We design agentic workflows that{" "}
            <b className="font-semibold text-text">reason and take real actions,</b> wire them into
            your live systems, and put guardrails around the data so nothing leaks or goes off the
            rails. Whether it is a copilot inside your app, an automation that handles a multi-step
            task, or an agent that investigates and decides, we build the version that holds up in
            production.
          </p>
          <p>
            And because we come from security, the boundary is designed first. The AI works where the
            data is sensitive, because keeping that data safe is the part we know best.
          </p>
        </Reveal>
      </Section>

      <Section>
        <SectionHead eyebrow="What you get" title="From demo to dependable." />
        <DeliverList
          items={[
            "Agentic workflows that reason over your data and take real actions, not just chat.",
            "Guardrails and data boundaries so the AI never leaks or corrupts sensitive data.",
            "Auditable actions — every step the AI takes is recorded and explainable.",
            "Built into your stack, integrated with your existing tools and APIs.",
          ]}
        />
      </Section>

      <Section id="how">
        <SectionHead eyebrow="How we work" title="Boundary first, always." />
        <Steps
          steps={[
            { n: "01", title: "Scope", body: "We map the workflow and exactly what data it will touch." },
            { n: "02", title: "Build", body: "We build it with the data boundary and guardrails designed in from the start." },
            { n: "03", title: "Harden", body: "We test, harden, and hand it over running inside your systems." },
          ]}
        />
        <Assure>
          <b className="font-semibold text-text">Real security depth behind every line,</b> so the AI
          is safe where it actually matters.
        </Assure>
      </Section>

      <CTABand
        eyebrow="Have something in mind"
        title="What would you automate first?"
        body="Tell us the workflow. We will tell you how to build it so it is safe to ship."
      />
    </>
  );
}
