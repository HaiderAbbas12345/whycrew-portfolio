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
  path: "/ai-workflows",
  title: "AI & Agentic Workflows",
  description:
    "WhyCrew builds AI and agentic workflows into your product or operations, with the data controls that make them safe to ship in production.",
  keywords: [
    "agentic AI workflows",
    "AI agents in production",
    "secure AI integration",
    "AI triage for SOC",
  ],
});

export default function Page() {
  return (
    <>
      <ServiceHero
        kicker="AI & Agentic Workflows"
        title="Put AI to work inside your product, safely."
        schema={{
          path: "/ai-workflows",
          name: "AI & agentic workflows",
          serviceType: "AI engineering",
          description:
            "AI and agentic workflows built into your product or operations, with the data boundaries and audit trails that make them safe to ship in production.",
        }}
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

      <Section>
        <SectionHead
          eyebrow="In practice"
          title="What this looks like on a real system."
          lead="Four shapes this work usually takes. Each one is a place where an AI demo would fall over and a production agent has to hold."
        />
        <UseCases
          cases={[
            {
              tag: "SOC · Triage",
              title: "Agentic alert triage that leaves an audit trail",
              body: "An agent enriches an alert from your own telemetry, reasons about whether it matters, and writes its evidence and conclusion into the ticket. The analyst reviews a decision instead of assembling one — and every step is recorded for the auditor.",
            },
            {
              tag: "Product",
              title: "A copilot inside your own application",
              body: "Natural-language querying and summarization over your customers' data, scoped per tenant so one customer's context can never leak into another's answer. The boundary is designed before the prompt is.",
            },
            {
              tag: "Operations",
              title: "Multi-step tasks that used to need a person",
              body: "Onboarding, reporting, enrichment, handoffs — an agent that plans across several systems, takes real actions through their APIs, and knows when to stop and ask a human.",
            },
            {
              tag: "Governance",
              title: "AI you can put in front of a regulator",
              body: "Model calls, inputs, and actions logged; sensitive fields redacted before they leave the boundary; deterministic fallbacks when confidence is low. This is what makes AI usable where data residency and the EU AI Act apply.",
            },
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

      <Section id="faq">
        <SectionHead
          eyebrow="Straight answers"
          title="What teams ask before they ship AI."
          lead="The questions that decide whether an AI feature makes it into production or stays a demo."
        />
        <FaqList
          items={[
            {
              q: "How do you stop an AI agent leaking sensitive data?",
              a: "The data boundary is designed before the workflow is. We scope exactly which fields the agent can see, redact or tokenize anything sensitive before it reaches a model, and where the data cannot leave a jurisdiction at all we run inference inside that boundary. The agent gets the context it needs to be useful and nothing more.",
            },
            {
              q: "What is the difference between an AI workflow and workflow automation?",
              a: "Workflow automation is deterministic: you define the steps and it runs them identically every time. An AI workflow reasons — it handles input that does not fit a fixed rule, like judging whether an alert is a real threat. Most production systems want both, with automation handling the routine path and the AI handling the cases a rule cannot express. We build them to hand off to each other.",
            },
            {
              q: "Can an AI agent's decisions be audited?",
              a: "Yes, and for regulated work it has to be. Every action an agent takes is recorded with the inputs it saw and the reasoning it produced, so an auditor can reconstruct why a decision was made. We do not ship agentic systems into security operations without this.",
            },
            {
              q: "What if the model gets it wrong?",
              a: "You design for it rather than hope against it. High-impact actions require human confirmation, low-confidence outputs fall back to a deterministic path, and the agent's scope of action is bounded by what it is permitted to call. The failure mode should be that it stops and asks, not that it acts wrongly at scale.",
            },
            {
              q: "Do we have to send our data to OpenAI or Anthropic?",
              a: "Not necessarily. Where a hosted model is fine, we use one. Where data residency, client contracts, or regulation say otherwise, we build against models that run inside your boundary. That choice is an architecture decision we make with you at scoping, not a default we impose.",
            },
          ]}
        />
      </Section>

      <Section>
        <SectionHead eyebrow="Related" title="Where this fits with the rest." />
        <RelatedLinks
          links={[
            {
              href: "/for-mssps",
              label: "Owned SOC platforms",
              note: "The flagship: AI-native triage built into a platform you own, not bolted onto one you rent.",
            },
            {
              href: "/workflow-automation",
              label: "Workflow automation",
              note: "The deterministic half. Rule-based work that should never need a model to decide it.",
            },
            {
              href: "/integrations",
              label: "Integrations",
              note: "Agents are only as useful as the systems they can reach. This is how they reach them.",
            },
          ]}
        />
      </Section>

      <CTABand
        eyebrow="Have something in mind"
        title="What would you automate first?"
        body="Tell us the workflow. We will tell you how to build it so it is safe to ship."
      />
    </>
  );
}
