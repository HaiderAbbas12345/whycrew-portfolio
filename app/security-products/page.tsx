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
  path: "/security-products",
  title: "Cybersecurity Product Development",
  description:
    "WhyCrew designs and builds security tooling and products, from detection engines to dashboards and data pipelines, with real malware research and threat intelligence depth behind the code.",
  keywords: [
    "cybersecurity product development",
    "detection engineering",
    "security product engineering",
    "threat intelligence tooling",
  ],
});

export default function Page() {
  return (
    <>
      <ServiceHero
        kicker="Cybersecurity Product Development"
        title="Security tools, built by security people."
        schema={{
          path: "/security-products",
          name: "Cybersecurity product development",
          serviceType: "Security product engineering",
          description:
            "Security tooling and products, from detection engines to dashboards and data pipelines, built with malware research and threat intelligence depth behind the code.",
        }}
        sub={
          <>
            We design and build security tooling and products, from detection engines to dashboards,{" "}
            <b className="font-semibold text-text">with real depth behind the code.</b>
          </>
        }
      />

      <Section>
        <Reveal className="max-w-[60ch] space-y-4 text-[17px] leading-relaxed text-muted">
          <p>
            We build security products and internal tooling: detection engines, dashboards, attack
            surface tools, data pipelines — the things that need someone who actually understands
            threats, not just someone who can write code.
          </p>
          <p>
            With a background in{" "}
            <b className="font-semibold text-text">malware research and threat intelligence,</b> we
            build security software that works because we have been on the other side of it. We know
            what attackers do, so we know what the tool has to catch.
          </p>
          <p>
            Modern engineering, clean and maintainable, and the result is yours. We have shipped this
            kind of work before, including building an MSSP its own platform. This is our home ground.
          </p>
        </Reveal>
      </Section>

      <Section>
        <SectionHead eyebrow="What you get" title="Tools that hold up." />
        <DeliverList
          items={[
            "Security tooling and products built to your spec.",
            "Real security depth — malware research and threat intel behind the build.",
            "Modern engineering — clean, maintainable, and yours.",
            "From detection engines and dashboards to data pipelines and platforms.",
          ]}
        />
      </Section>

      <Section>
        <SectionHead
          eyebrow="In practice"
          title="What we get asked to build."
          lead="Four kinds of build where knowing the threat model changes the architecture, not just the feature list."
        />
        <UseCases
          cases={[
            {
              tag: "Detection",
              title: "Detection engines and rule pipelines",
              body: "The part where knowing how attackers actually behave decides whether the tool catches anything. Writing the engine is engineering; knowing what it must catch, and what will drown it in false positives, is threat work.",
            },
            {
              tag: "Multi-tenant",
              title: "Platforms that serve many clients at once",
              body: "Tenant isolation, per-client data boundaries, and role models that hold under audit. We have built an MSSP its own multi-tenant platform end to end, and this is the layer that is hardest to retrofit later.",
            },
            {
              tag: "Data",
              title: "Security data pipelines at real volume",
              body: "Ingest, normalization, enrichment, and retention that stay affordable as volume grows. Get the data model wrong early and every downstream detection inherits the problem.",
            },
            {
              tag: "Interface",
              title: "Dashboards analysts will actually use",
              body: "Consoles built around how an investigation actually proceeds rather than around what is easy to chart. The measure is whether an analyst reaches a decision faster, not how much fits on screen.",
            },
          ]}
        />
      </Section>

      <Section id="how">
        <SectionHead eyebrow="How we work" title="Security designed in." />
        <Steps
          steps={[
            { n: "01", title: "Define", body: "We define what you need and why, in real threat terms." },
            { n: "02", title: "Build", body: "We build it with security designed in from the first line." },
            { n: "03", title: "Deliver", body: "We deliver it running, and maintain it if you want us to." },
          ]}
        />
        <Assure>
          <b className="font-semibold text-text">
            We have shipped security tooling and built an MSSP its own platform.
          </b>{" "}
          This is our home ground.
        </Assure>
      </Section>

      <Section id="faq">
        <SectionHead
          eyebrow="Straight answers"
          title="Choosing who builds your security product."
          lead="What to ask any engineering partner before they write the first line of a security tool."
        />
        <FaqList
          items={[
            {
              q: "Why does it matter that the team comes from security rather than general engineering?",
              a: "Because the hard decisions in a security product are threat decisions wearing engineering clothes. What to log and for how long, which signals are worth the storage, where an attacker would go first, what a detection must catch versus what will bury the analyst in noise — a strong generalist team will build exactly what the spec says and still ship something that misses. The spec is the part that needs the security background.",
            },
            {
              q: "Who owns the intellectual property?",
              a: "You do. The product, the code, and the data are yours outright, in your repositories. Where you want the additional protection, source can be placed in escrow with a neutral third party so you are never exposed to us as a dependency.",
            },
            {
              q: "Can you work on a product we have already started?",
              a: "Yes, and it is common. We usually begin with a review of the existing architecture and threat model before touching features, because inheriting a data model or tenancy design without understanding it is how the expensive rewrite happens twelve months later.",
            },
            {
              q: "How is this different from your MSSP platform work?",
              a: "The MSSP platform is a specific product we have already built and can adapt from a proven core, which is why it is priced and delivered as a known quantity. This is the open-ended version: a security product to your specification, in whatever shape your business needs. If what you want is the SOC platform, the flagship is the faster and cheaper path.",
            },
            {
              q: "Do you maintain what you build?",
              a: "If you want us to. Some clients take the codebase in-house with their own team; others keep us on a maintenance arrangement. Either way the handover includes documentation written for an engineer who was not in the room, because a build only you can maintain is not really theirs.",
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
              note: "The productized version of this work, built from a proven core and priced accordingly.",
            },
            {
              href: "/ai-workflows",
              label: "AI & agentic workflows",
              note: "The AI layer that goes inside a security product without becoming its weakest point.",
            },
            {
              href: "/best-soc-platform-builders-mssps-2025",
              label: "How to evaluate a builder",
              note: "The criteria we would want you to hold us to, laid out in full.",
            },
          ]}
        />
      </Section>

      <CTABand
        eyebrow="Got a build in mind"
        title="What do you need built?"
        body="Tell us the tool or product. We will tell you straight if we are the right team."
      />
    </>
  );
}
