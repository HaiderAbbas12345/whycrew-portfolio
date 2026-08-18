import { Backdrop } from "@/components/ui/backdrop";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[75vh] items-center overflow-hidden py-32">
      <Backdrop />
      <div className="container-page text-center">
        <Reveal>
          <Pill tone="brand">404 — Not found</Pill>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mx-auto mt-8 max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
            This page isn&apos;t part of the{" "}
            <span className="text-gradient">architecture</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-body">
            The link is broken or the page moved. Start from the services
            overview, or talk to an engineer directly.
          </p>
        </Reveal>
        <Reveal delay={0.26}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="/services">See All Services</Button>
            <Button href="/" variant="ghost">
              Back to Homepage
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
