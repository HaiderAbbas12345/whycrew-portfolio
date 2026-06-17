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
  title: "Cybersecurity Product Development",
  description:
    "WhyCrew designs and builds security tooling and products, from detection engines to dashboards and data pipelines, with real malware research and threat intelligence depth behind the code.",
};

export default function Page() {
  return (
    <>
      <ServiceHero
        kicker="Cybersecurity Product Development"
        title="Security tools, built by security people."
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

      <CTABand
        eyebrow="Got a build in mind"
        title="What do you need built?"
        body="Tell us the tool or product. We will tell you straight if we are the right team."
      />
    </>
  );
}
