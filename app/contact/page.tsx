import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { Eyebrow } from "@/components/Primitives";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a discovery call",
  description:
    "Fifteen minutes, no deck. Bring your SIEM, tenant count, and annual spend and we'll put your own savings curve on the table.",
  alternates: { canonical: "/contact" },
  openGraph: {
    url: `${SITE.url}/contact`,
    title: "Book a discovery call — WhyCrew",
    description:
      "Fifteen minutes, no deck. Bring your SIEM, tenant count, and annual spend and we'll put your own savings curve on the table.",
  },
};

export default function Page() {
  return (
    <>
      <section className="border-b border-line-soft pt-20 pb-12">
        <div className="wrap">
          <Reveal>
            <Eyebrow>Talk to us</Eyebrow>
            <h1 className="mt-5 max-w-[20ch] font-display text-[clamp(36px,5.5vw,60px)] font-bold leading-[1.05] tracking-[-0.02em] text-gradient">
              Find out what you would actually save.
            </h1>
            <p className="mt-4 max-w-[54ch] text-[clamp(17px,1.7vw,20px)] leading-relaxed text-muted">
              A fifteen-minute call with the people who would build it — not a sales team. We will
              tell you straight whether owning your platform makes sense for your size, and if it
              does not, we will say so.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="wrap">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
