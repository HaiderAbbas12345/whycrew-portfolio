import type { Metadata } from "next";
import { ShieldCheck, Cpu, Lock, Scale, Linkedin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Avatar } from "@/components/Avatar";
import { FaqList } from "@/components/FaqList";
import {
  Eyebrow,
  Section,
  SectionHead,
  CTABand,
  RelatedLinks,
} from "@/components/Primitives";
import { breadcrumbSchema, personSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  path: "/about",
  title: "About WhyCrew",
  description:
    "WhyCrew is a security and AI engineering team building owned, multi-tenant security platforms for MSSPs. Who we are, what we have built, and how we work.",
  keywords: ["about WhyCrew", "security engineering team", "MSSP platform builder"],
});

/**
 * Named people are the strongest E-E-A-T signal on the site — this is what turns
 * "built by malware-research & threat-intel engineers" from an unverifiable
 * claim into something a reader (and an AI answer engine) can corroborate.
 *
 * Photos: drop the file into /public/team/ at the path named below. Until it
 * exists, Avatar renders initials rather than a broken image, so adding it is a
 * file copy with no code change.
 *
 * TODO: set NEXT_PUBLIC_FOUNDER_LINKEDIN to the public profile URL. It becomes a
 * `sameAs` in the Person schema, which is exactly the cross-source corroboration
 * AI engines weight most heavily.
 */
type Leader = {
  name: string;
  role: string;
  photo?: string;
  lede: string;
  bio: string[];
  /** Prior work, described by what it was rather than by who it was for. */
  background: string[];
  focus: string[];
  linkedin?: string;
};

const LEADERSHIP: Leader[] = [
  {
    name: "Yasir Abbas",
    role: "Founder",
    photo: "/team/yasir-abbas.jpg",
    lede: "Six years building the threat intelligence and security automation systems that WhyCrew now builds for other people.",
    bio: [
      "I hit that gap from the inside before I did anything about it. I spent years building threat intelligence pipelines, malware research systems, and IOC enrichment platforms — the machinery a security operation actually runs on — for organisations across the US, Europe, and the Middle East. Then I spent a stretch building AI systems that had to survive contact with production rather than impress in a demo.",
      "What I kept seeing was the same pattern, and it was never a lack of skill on the security team. Their stack was fragmented, their analysts spent their days on repetitive investigation, and the tools they depended on most were the ones they would never own. None of that is a security problem. It is an engineering problem, and it is the one WhyCrew exists to solve.",
    ],
    background: [
      "Threat intelligence platforms — collecting, storing, and enriching indicators of compromise at volume, with the data modelling and standardization underneath.",
      "Enrichment and whitelisting engines that attribute threat context automatically and strip false positives before they reach an analyst.",
      "Malware research and detection R&D — the work of turning raw signal into something a SOC can act on.",
      "Production AI systems, including agents that compose reasoning, retrieval, and action across live services rather than demoing well in isolation.",
    ],
    focus: [
      "Threat intelligence engineering",
      "Malware research",
      "IOC enrichment at scale",
      "SOC automation",
      "AI agents for security operations",
      "Multi-tenant security platforms",
      "SIEM & EDR integration",
      "Secure LLM applications",
    ],
    linkedin: process.env.NEXT_PUBLIC_FOUNDER_LINKEDIN || undefined,
  },
];

const PROOF = [
  {
    stat: "70%+",
    label: "IOC enrichment gain",
    note: "Improvement in indicator enrichment delivered on a production threat intelligence platform.",
  },
  {
    stat: "3 regions",
    label: "US, Europe, Middle East",
    note: "Where the threat intelligence and automation systems behind this work are in use.",
  },
  {
    stat: "6+ years",
    label: "In security engineering",
    note: "Threat intel R&D and security automation before WhyCrew, not a pivot into the category.",
  },
];

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "We have been on the other side",
    body: "The team comes out of malware research and threat intelligence, not out of general software work that later picked up a security label. When we decide what a detection has to catch, or where an attacker would go first, that judgement is the product of having watched it happen.",
  },
  {
    icon: Lock,
    title: "The boundary is designed first",
    body: "On every engagement, the question of where sensitive data may and may not travel is settled before the architecture is, not patched on once something works. It is the constraint most projects discover too late, and the one that decides whether the result is usable in a regulated environment.",
  },
  {
    icon: Cpu,
    title: "AI where it earns its place",
    body: "Agentic triage removes the repetitive investigation grind, which is real and worth having. It does not replace analysts, and it does not belong anywhere the decision can be expressed as a rule. We are specific about that line in both directions.",
  },
  {
    icon: Scale,
    title: "You own the result",
    body: "Platforms, products, and integrations we build are yours outright — code, data, and IP — with source held in escrow where you want the extra protection. A client who cannot leave is not a client who stayed by choice.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <section className="border-b border-line-soft pt-20 pb-12">
        <div className="wrap">
          <Reveal>
            <Eyebrow>About</Eyebrow>
            <h1 className="mt-5 max-w-[20ch] font-display text-[clamp(36px,5.5vw,60px)] font-bold leading-[1.05] tracking-[-0.02em] text-gradient">
              A small team that builds what it would trust.
            </h1>
            <p className="mt-4 max-w-[58ch] text-[clamp(17px,1.7vw,20px)] leading-relaxed text-muted">
              WhyCrew is a security and AI engineering team working with MSSPs and with organisations
              where sensitive data is the whole problem rather than an afterthought. We are small
              deliberately, and we would rather tell you we are the wrong team than take a build we
              cannot do properly.
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        <Reveal className="max-w-[64ch] space-y-5 text-[17px] leading-relaxed text-muted">
          <p>
            The company exists because of a gap we kept running into. Plenty of firms can build
            security software. Plenty more can build AI. Very few can do both in the same system —
            and when the data is sensitive, that combination is the entire job. An AI feature built
            by people who do not think about data boundaries becomes a liability; a security tool
            built by people who do not understand modern AI gets outpaced.
          </p>
          <p>
            Our flagship work is building MSSPs their own multi-tenant, AI-native security platform:
            the thing they currently rent from Splunk, Microsoft Sentinel, or IBM QRadar, except they
            own it. That platform is live in production for a regional provider today, which is why
            we talk about it as something we have done rather than something we propose.
          </p>
          <p>
            Around that flagship sits the rest of what we do — AI and agentic workflows, integrations,
            workflow automation, and security product development — because most engagements start
            somewhere narrower than a whole platform, and should.
          </p>
        </Reveal>
      </Section>

      <Section>
        <SectionHead
          eyebrow="How we work"
          title="Four things we will not compromise on."
          lead="These are not values on a wall. Each one has cost us work, which is how you know they are real."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="card h-full p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-own/10 text-own">
                  <p.icon size={20} />
                </span>
                <h3 className="mt-5 font-display text-[19px] font-bold">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {LEADERSHIP.length > 0 && (
        <Section id="leadership">
          <SectionHead
            eyebrow="Leadership"
            title="Who you would actually be working with."
            lead="Not an account manager relaying messages to a delivery team you never meet."
          />

          {LEADERSHIP.map((m) => (
            <div key={m.name}>
              <Reveal>
                <div className="card overflow-hidden">
                  <div className="flex flex-col gap-7 border-b border-line bg-gradient-to-b from-surface to-ink-2 p-8 sm:flex-row sm:items-center">
                    <Avatar src={m.photo} name={m.name} size={140} />
                    <div>
                      <h3 className="font-display text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em]">
                        {m.name}
                      </h3>
                      <div className="mt-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-own">
                        {m.role} · {SITE.name}
                      </div>
                      <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-muted">
                        {m.lede}
                      </p>
                      {m.linkedin && (
                        <a
                          href={m.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-1.5 font-mono text-[12.5px] text-own hover:underline"
                        >
                          <Linkedin size={14} /> LinkedIn
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 p-8 text-[16px] leading-relaxed text-muted">
                    {m.bio.map((para) => (
                      <p key={para.slice(0, 40)} className="max-w-[68ch]">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* PROOF */}
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {PROOF.map((p, i) => (
                  <Reveal key={p.label} delay={i * 0.06}>
                    <div className="border-t-2 border-own pt-5">
                      <div className="font-display text-[clamp(26px,3vw,36px)] font-extrabold tracking-[-0.02em] gold-gradient">
                        {p.stat}
                      </div>
                      <div className="mt-1.5 font-mono text-[12px] uppercase tracking-[0.06em] text-muted">
                        {p.label}
                      </div>
                      <p className="mt-2.5 text-[13px] leading-relaxed text-muted-2">{p.note}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* BACKGROUND */}
              <h3 className="mt-14 font-display text-[clamp(22px,2.6vw,28px)] font-bold tracking-[-0.02em]">
                Before WhyCrew
              </h3>
              <div className="mt-6 grid gap-3.5 md:grid-cols-2">
                {m.background.map((b, i) => (
                  <Reveal key={b.slice(0, 40)} delay={i * 0.05}>
                    <div className="card flex h-full items-start gap-3.5 p-5">
                      <span className="mt-0.5 font-mono text-own">→</span>
                      <p className="text-[15px] leading-relaxed text-muted">{b}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* FOCUS AREAS */}
              <Reveal>
                <div className="mt-12">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2">
                    Works on
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {m.focus.map((f) => (
                      <span
                        key={f}
                        className="rounded-lg border border-line bg-white/[0.02] px-3 py-2 text-[13.5px] text-muted"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          ))}

          <JsonLd data={LEADERSHIP.map(personSchema)} />
        </Section>
      )}

      <Section>
        <SectionHead
          eyebrow="Where we work"
          title="Three regions, three different reasons."
          lead="The same platform, but the argument for it changes depending on where you operate."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              place: "Europe",
              body: "Data residency and auditable AI are the starting requirements, not the closing objections. GDPR and the EU AI Act shape the architecture from day one rather than being retrofitted before an audit.",
            },
            {
              place: "United States",
              body: "Usually a pure economics conversation. The rented platform is the fastest-growing line on the books, and the question is simply whether owning it comes out ahead over the horizon you care about.",
            },
            {
              place: "Middle East",
              body: "In-country residency is frequently a legal requirement, which rules out cloud-only SIEMs entirely for government, banking, and telecom work. An owned, on-prem-capable platform is what makes that work reachable at all.",
            },
          ].map((r, i) => (
            <Reveal key={r.place} delay={i * 0.06}>
              <div className="card h-full p-7">
                <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-own">
                  {r.place}
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="faq">
        <SectionHead eyebrow="Straight answers" title="What people ask about us." />
        <FaqList
          items={[
            {
              q: "How big is WhyCrew?",
              a: "Small, and deliberately so. You work with the people who build the thing rather than with an account manager relaying messages to a delivery team you never meet. The trade-off is honest: we take on fewer engagements at once, and we will tell you if the queue means we are not the right timing for you.",
            },
            {
              q: "Have you actually built this before, or is it a pitch?",
              a: "Built and running. A regional MSSP is in production today on a multi-tenant, AI-native platform we built for them, which is the basis for everything we claim about migrations, parallel running, and tenant-by-tenant cutover. It is also why the flagship can be priced from reuse of a proven core rather than as a research project.",
            },
            {
              q: "What do you not do?",
              a: "We are not a managed security service — we do not run your SOC, and we do not compete with our own clients for their customers. We also do not take on general application development that has no security or AI dimension; there are cheaper teams for that, and you should use one.",
            },
            {
              q: "What happens to us if WhyCrew stops existing?",
              a: "You keep the platform and the data outright, and the source code sits in escrow with a neutral third party set to release it to you automatically. Being unable to leave should never be the reason you stay, and we would rather answer this question up front than have you wonder about it.",
            },
          ]}
        />
      </Section>

      <Section>
        <SectionHead eyebrow="Related" title="See the work itself." />
        <RelatedLinks
          links={[
            {
              href: "/for-mssps",
              label: "Owned SOC platforms",
              note: "The flagship, in full — economics, migration path, pricing, and the objections answered.",
            },
            {
              href: "/case-studies",
              label: "Case studies",
              note: "What happened when an MSSP stopped renting, and the field notes behind it.",
            },
            {
              href: "/best-soc-platform-builders-mssps-2025",
              label: "Buyer's guide",
              note: "How to evaluate any SOC platform builder, including us. The criteria we invite you to apply.",
            },
          ]}
        />
      </Section>

      <CTABand
        eyebrow="Start a conversation"
        title="Tell us what you're building."
        body="One workflow or a whole platform — we will tell you straight whether we are the right team for it."
      />
    </>
  );
}
