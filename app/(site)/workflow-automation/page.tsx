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
  title: "Workflow Automation",
  description:
    "WhyCrew automates the repetitive, rule-based work with deterministic playbooks, so your team's time goes to the work that needs a human.",
};

export default function Page() {
  return (
    <>
      <ServiceHero
        kicker="Workflow Automation"
        title="Stop doing by hand what software should do."
        sub={
          <>
            We automate the repetitive, rule-based work with deterministic playbooks, so your team&apos;s
            time goes to <b className="font-semibold text-text">the work that needs a human.</b>
          </>
        }
      />

      <Section>
        <Reveal className="max-w-[60ch] space-y-4 text-[17px] leading-relaxed text-muted">
          <p>A lot of what your team does every day is repetitive and rule-based: triage, enrichment, reporting, onboarding, handoffs. We automate it.</p>
          <p>
            Unlike AI workflows, this is <b className="font-semibold text-text">deterministic.</b> You
            define the steps, and it runs them the same way every time, predictable and safe. No
            surprises, no drift. For a security team that means less alert grind. For any team it
            means hours back every week.
          </p>
          <p>
            And we know exactly where automation should end and human judgment should begin. We
            automate the routine, and we leave the decisions that need a person to a person.
          </p>
        </Reveal>
      </Section>

      <Section>
        <SectionHead eyebrow="What you get" title="Hours back, predictably." />
        <DeliverList
          items={[
            "Repetitive processes automated end to end.",
            "Predictable, deterministic playbooks — the same result every time.",
            "Fewer errors and faster turnaround on routine work.",
            "Your team freed for the work that actually needs judgment.",
          ]}
        />
      </Section>

      <Section id="how">
        <SectionHead eyebrow="How we work" title="Find it, build it, measure it." />
        <Steps
          steps={[
            { n: "01", title: "Find", body: "We find the repetitive work that is actually worth automating." },
            { n: "02", title: "Build", body: "We build the playbooks and pipelines that run it reliably." },
            { n: "03", title: "Measure", body: "We deploy, measure the time saved, and refine from there." },
          ]}
        />
        <Assure>
          <b className="font-semibold text-text">We know where automation ends and judgment begins,</b>{" "}
          and we don&apos;t cross it.
        </Assure>
      </Section>

      <CTABand
        eyebrow="Drowning in routine?"
        title="What eats your team's day?"
        body="Tell us the repetitive work. We will tell you what is worth automating."
      />
    </>
  );
}
