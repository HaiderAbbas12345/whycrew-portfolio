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
  UseCases,
  RelatedLinks,
} from "@/components/Primitives";
import { FaqList } from "@/components/FaqList";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/workflow-automation",
  title: "Workflow Automation",
  description:
    "WhyCrew automates the repetitive, rule-based work with deterministic playbooks, so your team's time goes to the work that needs a human.",
  keywords: ["SOC automation", "security playbooks", "SOAR alternative", "workflow automation"],
});

export default function Page() {
  return (
    <>
      <ServiceHero
        kicker="Workflow Automation"
        title="Stop doing by hand what software should do."
        schema={{
          path: "/workflow-automation",
          name: "Workflow automation",
          serviceType: "Process automation",
          description:
            "Deterministic playbooks that automate repetitive, rule-based work so a team's time goes to what actually needs a human.",
        }}
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

      <Section>
        <SectionHead
          eyebrow="In practice"
          title="The work that should have been automated already."
          lead="Four processes we are asked to take off people's hands, and the reason each one survives manually for so long."
        />
        <UseCases
          cases={[
            {
              tag: "SOC · Enrichment",
              title: "The first ten minutes of every alert",
              body: "Pulling asset owner, recent activity, threat-intel reputation, and prior tickets — the same lookups, in the same order, on every single alert. It is pure rule-following, and it is where analyst hours quietly go.",
            },
            {
              tag: "Reporting",
              title: "The monthly client report nobody wants to build",
              body: "For a provider with dozens of tenants, this is days of assembly every month. The inputs are already in your systems; what is missing is the pipeline that collects, formats, and delivers them on schedule.",
            },
            {
              tag: "Onboarding",
              title: "Standing up a new tenant the same way every time",
              body: "Provisioning, log source configuration, baseline detections, access. Done by hand it drifts between clients, and the drift is what causes the incident nobody can explain six months later.",
            },
            {
              tag: "Handoffs",
              title: "The steps between two teams",
              body: "Escalations, approvals, ticket routing. Automation here rarely saves the most hours, but it removes the delay where work sits waiting for someone to notice it exists.",
            },
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

      <Section id="faq">
        <SectionHead
          eyebrow="Straight answers"
          title="Before you automate anything."
          lead="The questions worth settling first, because automating the wrong process well is worse than leaving it alone."
        />
        <FaqList
          items={[
            {
              q: "How do we know which work is actually worth automating?",
              a: "Frequency times duration times error cost. A task that runs a hundred times a week and takes four minutes is worth more than one that takes an hour and runs monthly — and anything where a human slip has real consequences moves up the list regardless of time saved. We start by finding those, not by automating whatever is easiest to script.",
            },
            {
              q: "Is this the same as SOAR?",
              a: "It overlaps. SOAR is a product category built around security playbooks; what we build is the automation your process actually needs, which may sit inside a SOAR tool you already own, alongside it, or entirely outside it. If a platform you are paying for can do the job, we would rather configure that than sell you a build.",
            },
            {
              q: "What happens when the process changes?",
              a: "Processes always change, so playbooks are built to be readable and edited rather than as opaque scripts only their author understands. Where we maintain them, changes are part of the arrangement; where you take them in-house, they are documented well enough for your team to change them safely.",
            },
            {
              q: "Will this replace people on our team?",
              a: "It replaces the part of their week that is mechanical. Every provider we talk to has more work queued than people to do it — the constraint is capacity, not headcount cost. Automating the routine path means the same team covers more without the quality falling over.",
            },
            {
              q: "Should this be AI instead?",
              a: "Only where the decision genuinely cannot be expressed as a rule. Deterministic automation is cheaper, faster, and auditable in a way a model is not, so it should handle everything it can. Use AI for the judgment calls that remain — that boundary is the whole design question, and we take it seriously in both directions.",
            },
          ]}
        />
      </Section>

      <Section>
        <SectionHead eyebrow="Related" title="Where this fits with the rest." />
        <RelatedLinks
          links={[
            {
              href: "/ai-workflows",
              label: "AI & agentic workflows",
              note: "For the cases a fixed rule cannot express. The two are designed to hand off to each other.",
            },
            {
              href: "/integrations",
              label: "Integrations",
              note: "Automation needs the systems to be reachable first. This is usually the prerequisite step.",
            },
            {
              href: "/for-mssps",
              label: "Owned SOC platforms",
              note: "For MSSPs, the biggest automation win sits inside a platform you own rather than rent.",
            },
          ]}
        />
      </Section>

      <CTABand
        eyebrow="Drowning in routine?"
        title="What eats your team's day?"
        body="Tell us the repetitive work. We will tell you what is worth automating."
      />
    </>
  );
}
