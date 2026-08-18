import type { ReactNode } from "react";
import { Backdrop } from "@/components/ui/backdrop";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  Pill,
  Section,
  StatBar,
  type Stat,
} from "@/components/ui/primitives";
import { Parallax, Reveal, WordsUp } from "@/components/motion";

export function ServiceHero({
  eyebrow,
  title,
  highlight,
  lead,
  intro,
  primaryCta,
  secondaryCta,
  stats,
  breadcrumbName,
  breadcrumbPath,
}: {
  eyebrow: string;
  title: string;
  highlight?: string[];
  lead: string;
  intro: ReactNode;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  stats: Stat[];
  breadcrumbName: string;
  breadcrumbPath: string;
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
      <Backdrop />
      <div className="container-page">
        <Breadcrumb
          trail={[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: breadcrumbName, path: breadcrumbPath },
          ]}
        />

        <Reveal>
          <Pill tone="brand">{eyebrow}</Pill>
        </Reveal>

        <h1 className="mt-7 max-w-4xl text-4xl font-semibold leading-[1.07] sm:text-5xl lg:text-[3.4rem]">
          <WordsUp text={title} delay={0.12} highlight={highlight} />
        </h1>

        <Reveal delay={0.5} distance={16}>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-snug text-accent-hi sm:text-xl">
            {lead}
          </p>
        </Reveal>

        <Reveal delay={0.6} distance={14}>
          <div className="mt-6 max-w-3xl space-y-4 text-[15px] leading-relaxed text-body">
            {intro}
          </div>
        </Reveal>

        <Reveal delay={0.72} distance={12}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href={primaryCta.href}>{primaryCta.label}</Button>
            {secondaryCta && (
              <Button href={secondaryCta.href} variant="ghost">
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.85} className="mt-14">
          <StatBar stats={stats} />
        </Reveal>
      </div>
    </section>
  );
}

export function ServiceCta({
  title,
  highlight,
  body,
  primary,
  secondary,
  footnote,
}: {
  title: string;
  highlight?: string;
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  footnote?: string;
}) {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Backdrop />
      <Parallax amount={34} className="container-page relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.8rem]">
            {title}{" "}
            {highlight && <span className="text-gradient">{highlight}</span>}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-body">
            {body}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href={primary.href}>{primary.label}</Button>
            {secondary && (
              <Button href={secondary.href} variant="ghost">
                {secondary.label}
              </Button>
            )}
          </div>
        </Reveal>
        {footnote && (
          <Reveal delay={0.28}>
            <p className="mt-8 font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">
              {footnote}
            </p>
          </Reveal>
        )}
      </Parallax>
    </section>
  );
}

export { Section };
