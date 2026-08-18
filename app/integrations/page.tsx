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
  path: "/integrations",
  title: "Integrations",
  description:
    "WhyCrew connects your tools, systems, and APIs into one clean flow. Built as a security surface, not just plumbing.",
  keywords: ["security tool integration", "SIEM integration", "API integration", "SOC tooling"],
});

export default function Page() {
  return (
    <>
      <ServiceHero
        kicker="Integrations"
        title="Make your tools talk to each other."
        schema={{
          path: "/integrations",
          name: "Integrations",
          serviceType: "Systems integration",
          description:
            "Connecting tools, systems, and APIs into one clean flow, treated as a security surface rather than plumbing.",
        }}
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

      <Section>
        <SectionHead
          eyebrow="In practice"
          title="The connections teams actually ask for."
          lead="Four patterns that come up again and again, and what makes each one harder than it looks."
        />
        <UseCases
          cases={[
            {
              tag: "SIEM · Ticketing",
              title: "Alerts that arrive as work, not noise",
              body: "Detections flow from the SIEM into the ticketing system already enriched with asset owner, tenant, and prior history — so the analyst opens a ticket with context instead of five tabs.",
            },
            {
              tag: "Multi-tenant",
              title: "One pipeline, many clients, no bleed",
              body: "For providers running dozens of tenants, the hard part is not the connection — it is guaranteeing tenant isolation through every hop. We build the mapping so one client's data structurally cannot surface in another's view.",
            },
            {
              tag: "Legacy · API",
              title: "The system with no real API",
              body: "Every stack has one: an old platform holding critical data behind an export button. We build the adapter that turns it into a dependable interface instead of a weekly manual export.",
            },
            {
              tag: "Product",
              title: "Customer-facing integrations you can sell",
              body: "The connectors your own customers keep asking for, built to a standard you can put your name on — with the auth, rate limiting, and error handling that decide whether they trust it.",
            },
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

      <Section id="faq">
        <SectionHead
          eyebrow="Straight answers"
          title="The questions that come up mid-project."
          lead="What teams actually want to know before they let anyone touch the connections between their systems."
        />
        <FaqList
          items={[
            {
              q: "Why not just use Zapier or a native connector?",
              a: "For simple, low-volume, non-sensitive flows, do. Off-the-shelf connectors break down in three places: when the data needs real normalization rather than field-to-field copying, when volume makes per-task pricing absurd, and when the data is sensitive enough that routing it through a third-party SaaS is a compliance problem. Those are the cases we get called for.",
            },
            {
              q: "What happens when a vendor changes their API?",
              a: "It is a question of when, not if. We build connections with explicit schema handling and monitoring, so a breaking change surfaces as an alert rather than as silently missing data weeks later. Where we maintain the integration, fixing that is part of the arrangement.",
            },
            {
              q: "How do you handle data that cannot leave a jurisdiction?",
              a: "The integration is designed around that constraint from the start — processing stays inside the boundary, and only what is permitted to cross does. This is the same discipline behind our sovereign platform work, where in-country residency is a legal requirement rather than a preference.",
            },
            {
              q: "Do you replace our tools or connect the ones we have?",
              a: "Connect, in this engagement. The point is to make the stack you already pay for work as one flow. If the honest answer turns out to be that a tool should be replaced rather than integrated, we will say so — but that is a different conversation, and usually a bigger one.",
            },
            {
              q: "Who owns the integration when the project ends?",
              a: "You do. The code, the mappings, and the documentation are yours, in your repositories. Ongoing maintenance is something you can keep with us or take in-house, and that decision should never be forced by not having access to your own work.",
            },
          ]}
        />
      </Section>

      <Section>
        <SectionHead eyebrow="Related" title="Where this fits with the rest." />
        <RelatedLinks
          links={[
            {
              href: "/workflow-automation",
              label: "Workflow automation",
              note: "Once data moves cleanly, the process on top of it is the next thing worth automating.",
            },
            {
              href: "/ai-workflows",
              label: "AI & agentic workflows",
              note: "Agents act through integrations. Clean connections are the prerequisite, not an extra.",
            },
            {
              href: "/for-mssps",
              label: "Owned SOC platforms",
              note: "For MSSPs, the end state is not better glue between rented tools — it is a platform you own.",
            },
          ]}
        />
      </Section>

      <CTABand
        eyebrow="Tangled stack?"
        title="Which tools won't talk?"
        body="Tell us your stack. We will show you how to make it one clean flow."
      />
    </>
  );
}
