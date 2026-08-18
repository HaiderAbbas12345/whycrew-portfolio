import Link from "next/link";
import { Linkedin } from "lucide-react";
import { Logo } from "./Logo";
import { BookCall } from "./Primitives";
import { SERVICES, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap py-14">
        <div className="flex flex-wrap justify-between gap-12">
          <div className="max-w-[34ch]">
            <Logo />
            <p className="mt-4 text-[14px] leading-relaxed text-muted">
              Owned, multi-tenant, AI-native security platforms for MSSPs. Stop renting. Start owning.
            </p>
            <BookCall className="btn btn-gold mt-6">Book a call</BookCall>
            {SITE.linkedin && (
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${SITE.name} on LinkedIn`}
                className="mt-6 ml-3 inline-grid h-10 w-10 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-own hover:text-own"
              >
                <Linkedin size={17} />
              </a>
            )}
          </div>

          <div className="flex gap-16">
            <div>
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2">
                Services
              </div>
              {SERVICES.map((s) => (
                <Link
                  key={s.slug}
                  href={s.href}
                  className="mb-2.5 block text-[14px] text-muted transition-colors hover:text-own"
                >
                  {s.title}
                </Link>
              ))}
            </div>
            <div>
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2">
                Company
              </div>
              <Link href="/about" className="mb-2.5 block text-[14px] text-muted hover:text-own">
                About
              </Link>
              <Link href="/case-studies" className="mb-2.5 block text-[14px] text-muted hover:text-own">
                Case studies
              </Link>
              <Link
                href="/best-soc-platform-builders-mssps-2025"
                className="mb-2.5 block text-[14px] text-muted hover:text-own"
              >
                SOC platform builders 2025
              </Link>
              <Link href="/contact" className="mb-2.5 block text-[14px] text-muted hover:text-own">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 font-mono text-[12px] text-muted-2">
          © 2026 {SITE.name}. Built for MSSPs leaving Splunk, Sentinel, and QRadar.
        </div>
      </div>
    </footer>
  );
}
