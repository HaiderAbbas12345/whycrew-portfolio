"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/motion";

type Variant = "primary" | "ghost" | "quiet" | "danger";

const styles: Record<Variant, string> = {
  primary:
    "relative overflow-hidden bg-gradient-to-r from-brand via-brand to-brand-hi text-white shadow-[0_0_0_1px_rgba(91,131,255,0.35),0_12px_34px_-12px_rgba(47,92,255,0.75)] hover:shadow-[0_0_0_1px_rgba(109,240,204,0.45),0_16px_44px_-10px_rgba(47,92,255,0.9)]",
  ghost:
    "border border-line bg-surface/60 text-bright hover:border-accent/45 hover:bg-surface-2/70 hover:text-white",
  quiet:
    "text-accent hover:text-accent-hi underline-offset-4 decoration-accent/40 hover:decoration-accent",
  danger:
    "border border-danger/40 bg-danger/10 text-danger hover:bg-danger/16 hover:border-danger/60",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
  magnetic = true,
  onClick,
  type,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  magnetic?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const isQuiet = variant === "quiet";
  const base = isQuiet
    ? "group inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-300"
    : "group inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-[13.5px] font-semibold tracking-tight transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]";

  const inner = (
    <>
      {variant === "primary" && (
        <span
          aria-hidden
          className="wc-shimmer pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}
      <span className="relative">{children}</span>
      <span
        aria-hidden
        className="relative inline-block transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
      >
        →
      </span>
    </>
  );

  const cls = `${base} ${styles[variant]} ${className}`;

  // An absolute URL (e.g. NEXT_PUBLIC_BOOKING_URL pointing at Cal.com) always
  // opens in a new tab, without every call site having to pass `external`.
  const isAbsolute = Boolean(href && /^https?:\/\//i.test(href));
  const opensNewTab = external || isAbsolute;

  const node = href ? (
    opensNewTab ? (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    ) : (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    )
  ) : (
    <button type={type ?? "button"} onClick={onClick} className={cls}>
      {inner}
    </button>
  );

  if (!magnetic || isQuiet) return node;
  return <Magnetic strength={0.22}>{node}</Magnetic>;
}
