import Link from "next/link";
import { Logo } from "./Logo";
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
            <Link href="/#contact" className="btn btn-gold mt-6">
              Book a call
            </Link>
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
              <Link href="/#why" className="mb-2.5 block text-[14px] text-muted hover:text-own">
                Why us
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
              <a
                href={`mailto:${SITE.email}`}
                className="mb-2.5 block text-[14px] text-muted hover:text-own"
              >
                Contact
              </a>
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
