"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Home, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { NAV, SITE } from "@/lib/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    const route = href.split("#")[0] || "/";
    if (route === "/") return pathname === "/" && !href.includes("#");
    return pathname === route || pathname.startsWith(route + "/");
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-line-soft bg-ink/80 backdrop-blur-xl" : "border-transparent bg-transparent"
      }`}
    >
      <div className="wrap flex h-[70px] items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 text-[14px] md:flex">
          {NAV.map((n) => {
            const active = isActive(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`relative rounded-lg px-3 py-2 transition-colors ${
                  active ? "text-text" : "text-muted hover:text-text"
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  {n.label === "Home" && <Home size={14} className={active ? "text-own" : ""} />}
                  {n.label}
                </span>
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-transparent via-own to-transparent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            );
          })}
          <Link href="mailto:hello@whycrew.com" className="btn btn-gold ml-3 !px-[17px] !py-[10px]">
            Book a call <ArrowUpRight size={15} />
          </Link>
        </nav>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg border border-line text-text md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line-soft bg-ink/95 backdrop-blur-xl md:hidden">
          <div className="wrap flex flex-col gap-1 py-4">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-2 py-3 hover:bg-white/5 ${
                  isActive(n.href) ? "text-own" : "text-muted hover:text-text"
                }`}
              >
                {n.label === "Home" && <Home size={15} />}
                {n.label}
              </Link>
            ))}
            <Link
              href="mailto:hello@whycrew.com"
              onClick={() => setOpen(false)}
              className="btn btn-gold mt-2 justify-center"
            >
              Book a call <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      )}

      <motion.div
        style={{ scaleX: progress }}
        className="h-px origin-left bg-gradient-to-r from-own via-own-hi to-transparent"
      />
      <span className="sr-only">{SITE.name}</span>
    </header>
  );
}
