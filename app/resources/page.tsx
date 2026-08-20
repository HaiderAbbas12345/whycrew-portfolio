import type { Metadata } from "next";
import { ResourceExplorer } from "@/components/resources/resource-explorer";
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
import { breadcrumbLd } from "@/lib/jsonld";
import { RESOURCES, RESOURCE_TYPES, liveResources } from "@/lib/resources";
import { OG_IMAGE, SITE } from "@/lib/site";

const TITLE = "Resources — Blog, Case Studies & White Papers | WhyCrew";
const DESCRIPTION =
  "Engineering write-ups, client case studies, and technical papers on SIEM & SOAR, AI SOC automation, and NIS2/DORA compliance for MSSPs.";

export const metadata: Metadata = {
  // `absolute` bypasses the root layout's "%s | WhyCrew" template so the title
  // renders exactly as specified — the brand is already in the string.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/resources" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE.url}/resources`,
    type: "website",
    images: OG_IMAGE,
  },
  // Without this the page inherits the root layout's site-wide Twitter card.
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const HIGHLIGHTS = [
  {
    title: "Built from real engagements",
    body: "Everything here comes out of platforms we've actually shipped — migration runbooks, detection catalogues, and costing models we used on live projects.",
  },
  {
    title: "No gated fluff",
    body: "Blog posts and case studies are open. Only the long-form white papers ask for an email, because we keep them current.",
  },
  {
    title: "Regulator-oriented",
    body: "The NIS2 and DORA writing maps to the obligations directly, not to a generic framework you have to translate first.",
  },
];

/**
 * Only live resources belong in the ItemList — advertising placeholders to
 * crawlers would surface pages that don't exist yet.
 */
function collectionLd() {
  const live = liveResources(RESOURCES);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE.url}/resources#collection`,
    name: "WhyCrew Resources",
    description: metadata.description,
    url: `${SITE.url}/resources`,
    isPartOf: { "@id": `${SITE.url}/#website` },
    publisher: { "@id": `${SITE.url}/#organization` },
    ...(live.length
      ? {
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: live.length,
            itemListElement: live.map((r, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: r.title,
              url: `${SITE.url}${r.href}`,
            })),
          },
        }
      : {}),
  };
}

export default function ResourcesPage() {
  const liveCount = liveResources(RESOURCES).length;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Resources", path: "/resources" },
            ])
          ),
        }}
      />

      {/* ============================================ HERO */}
      <section className="relative overflow-hidden pt-32 pb-14 sm:pt-40">
        <Backdrop />
        <div className="container-page">
          <Breadcrumb
            trail={[
              { name: "Home", path: "/" },
              { name: "Resources", path: "/resources" },
            ]}
          />
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.07] sm:text-5xl lg:text-[3.4rem]">
            <WordsUp text="Everything we know," delay={0.12} />{" "}
            <WordsUp text="in one place." delay={0.34} gradient />
          </h1>

          <Reveal delay={0.55}>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-body">
              Engineering write-ups, client case studies, and in-depth white
              papers for MSSPs and regulated operators — organised by what
              you&apos;re trying to do, not by what department wrote it.
            </p>
          </Reveal>

          {liveCount === 0 && (
            <Reveal delay={0.66}>
              <p className="mt-7 inline-flex flex-wrap items-center gap-2 rounded-full border border-warn/30 bg-warn/8 px-5 py-2.5 text-[12.5px] text-body">
                <span aria-hidden className="text-warn">
                  ◷
                </span>
                We&apos;re publishing this library now — the categories below
                are live, the content lands over the coming weeks.
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* ============================================ LIBRARY */}
      <Section id="library" className="!pt-6">
        <ResourceExplorer resources={RESOURCES} />
      </Section>

      {/* ============================================ WHAT'S HERE */}
      <Section className="border-y border-line/40 bg-ink/40">
        <Eyebrow>What&apos;s in here</Eyebrow>
        <Heading sub="Platform engineering, SOC automation, and EU regulatory work — written up by the people who did it, not a content team.">

          Written by the engineers who build it
        </Heading>

        <Stagger className="mt-12 grid gap-5 lg:grid-cols-3">
          {HIGHLIGHTS.map((h) => (
            <StaggerItem key={h.title}>
              <Card className="h-full p-7">
                <h3 className="text-[15px] font-semibold leading-snug">
                  {h.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                  {h.body}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ============================================ CTA */}
      <Section>
        <div className="text-center">
          <Eyebrow>Can&apos;t find it</Eyebrow>
          <Heading
            align="center"
            sub="Tell us what would actually help. If it's a question we answer often, it becomes the next thing we publish — and in the meantime an engineer will just answer it directly."
          >
            Ask for what you need
          </Heading>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href="/contact">Request a Resource</Button>
            <Button href="/services" variant="ghost">
              See All Services
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
