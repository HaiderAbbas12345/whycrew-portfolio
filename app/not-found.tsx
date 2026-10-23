import type { Metadata } from "next";
import { Backdrop } from "@/components/ui/backdrop";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";

/**
 * "Page Not Found | WhyCrew" via the root title template. The root layout no
 * longer sets a canonical, og:url or robots, so all an unknown URL carries is
 * this title and "noindex, follow" — and the 404 status, which Next sets.
 */
export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[75vh] items-center overflow-hidden py-32">
      <Backdrop />
      <div className="container-page text-center">
        <Reveal mount>
          <h1 className="mx-auto max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
            This page isn&apos;t part of the{" "}
            <span className="text-gradient">architecture</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.18} mount>
          <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-body">
            The link is broken or the page moved. Start from the services
            overview, or talk to an engineer directly.
          </p>
        </Reveal>
        <Reveal delay={0.26} mount>
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
