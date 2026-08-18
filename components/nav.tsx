"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollProgress } from "@/components/motion";
import { CTA_HREF, PRIMARY_NAV, SERVICES, SITE } from "@/lib/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Close everything on navigation
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Lock scroll behind the mobile sheet
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <ScrollProgress />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "border-b border-line/60 bg-void/78 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          className="container-page flex h-16 items-center justify-between gap-6"
          aria-label="Primary"
        >
          {/* Brand */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label={`${SITE.name} home`}
          >
            <span className="relative block overflow-hidden rounded-md ring-1 ring-brand/40 transition-all duration-500 group-hover:ring-accent/60">
              <Image
                src="/logo.jpeg"
                alt=""
                width={30}
                height={30}
                priority
                className="size-[30px] object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-bright">
              Why<span className="text-brand-hi">Crew</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {PRIMARY_NAV.map((item) => {
              if (!("hasMenu" in item && item.hasMenu)) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group relative px-3.5 py-2 text-[13.5px] font-medium text-body transition-colors duration-300 hover:text-bright"
                    >
                      {item.label}
                      <span className="absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                    </Link>
                  </li>
                );
              }
              return (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href={item.href}
                    className="group relative flex items-center gap-1.5 px-3.5 py-2 text-[13.5px] font-medium text-body transition-colors duration-300 hover:text-bright"
                    aria-expanded={servicesOpen}
                  >
                    {item.label}
                    <svg
                      viewBox="0 0 10 6"
                      className={`size-2.5 transition-transform duration-400 ${
                        servicesOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M1 1l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                  </Link>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-0 top-full w-[27rem] pt-3"
                      >
                        <div className="overflow-hidden rounded-lg border border-line/70 bg-ink/95 p-2 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.9)] backdrop-blur-xl">
                          {SERVICES.map((s) => (
                            <Link
                              key={s.slug}
                              href={s.href}
                              className="group/item block rounded-md px-3.5 py-3 transition-colors duration-300 hover:bg-brand/10"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-[13.5px] font-semibold text-bright transition-colors group-hover/item:text-accent">
                                  {s.name}
                                </span>
                                <span
                                  aria-hidden
                                  className="translate-x-0 font-mono text-xs text-faint opacity-0 transition-all duration-300 group-hover/item:translate-x-0.5 group-hover/item:opacity-100 group-hover/item:text-accent"
                                >
                                  →
                                </span>
                              </div>
                              <p className="mt-1 text-[12px] leading-relaxed text-muted">
                                {s.short}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <Button href={CTA_HREF} className="!px-5 !py-2.5 !text-[13px]">
                Book a Call
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center rounded-md border border-line/70 text-bright transition-colors hover:border-accent/50 lg:hidden"
            >
              <span className="relative block h-3 w-4.5">
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    menuOpen ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-px w-full bg-current transition-opacity duration-200 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    menuOpen ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-void/96 backdrop-blur-xl lg:hidden"
          >
            <div className="container-page flex h-full flex-col pt-24 pb-10">
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
                }}
                className="space-y-1"
              >
                {SERVICES.map((s) => (
                  <motion.li
                    key={s.slug}
                    variants={{
                      hidden: { opacity: 0, x: -18 },
                      show: { opacity: 1, x: 0 },
                    }}
                  >
                    <Link
                      href={s.href}
                      className="flex items-baseline justify-between border-b border-line-soft py-3.5 text-[17px] font-semibold text-bright"
                    >
                      {s.navLabel}
                      <span className="font-mono text-xs text-faint">→</span>
                    </Link>
                  </motion.li>
                ))}
                {PRIMARY_NAV.filter((i) => !("hasMenu" in i && i.hasMenu)).map(
                  (item) => (
                    <motion.li
                      key={item.href}
                      variants={{
                        hidden: { opacity: 0, x: -18 },
                        show: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link
                        href={item.href}
                        className="flex items-baseline justify-between border-b border-line-soft py-3.5 text-[17px] font-medium text-body"
                      >
                        {item.label}
                        <span className="font-mono text-xs text-faint">→</span>
                      </Link>
                    </motion.li>
                  )
                )}
              </motion.ul>

              <div className="mt-auto pt-8">
                <Button href={CTA_HREF} className="w-full" magnetic={false}>
                  Book a 20-Min Strategy Call
                </Button>
                <p className="mt-4 text-center font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">
                  No sales team — you talk to engineers
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
