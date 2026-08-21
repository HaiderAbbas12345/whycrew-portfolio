"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------
   Reveal — rise + fade on scroll into view
   ------------------------------------------------------------------ */

type Direction = "up" | "down" | "left" | "right" | "none";

const offsetFor = (d: Direction, dist: number) => {
  switch (d) {
    case "up":
      return { y: dist, x: 0 };
    case "down":
      return { y: -dist, x: 0 };
    case "left":
      return { x: dist, y: 0 };
    case "right":
      return { x: -dist, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
};

/**
 * Opacity + transform only. Animating `filter: blur()` forces the browser to
 * re-rasterise the whole subtree every frame, which is what made staggered
 * card grids stutter — the GPU can composite opacity/transform for free but
 * not a changing blur radius.
 */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
  distance = 26,
  duration = 0.8,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  distance?: number;
  duration?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span" | "header";
}) {
  const reduced = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  const off = offsetFor(direction, distance);

  if (reduced) {
    const Plain = as as React.ElementType;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, ...off }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------------
   Stagger — parent/child orchestration
   ------------------------------------------------------------------ */

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.085, delayChildren: 0.06 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Stagger({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "section";
}) {
  const reduced = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;

  if (reduced) {
    const Plain = as as React.ElementType;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Comp
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduced = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;

  if (reduced) {
    const Plain = as as React.ElementType;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Comp className={className} variants={staggerChild}>
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------------
   WordsUp — headline reveal, word by word
   ------------------------------------------------------------------ */

export function WordsUp({
  text,
  className,
  delay = 0,
  highlight,
  gradient = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  /** individual words to lift in accent colour */
  highlight?: string[];
  /** paint one continuous gradient across the whole phrase */
  gradient?: boolean;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const hl = new Set((highlight ?? []).map((w) => w.toLowerCase()));
  const wrap = `${gradient ? "text-gradient " : ""}${className ?? ""}`;

  if (reduced) return <span className={wrap}>{text}</span>;

  return (
    <span className={wrap}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={
              hl.has(w.toLowerCase().replace(/[.,]/g, ""))
                ? "inline-block text-accent-hi"
                : "inline-block"
            }
            initial={{ y: "108%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.055,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------
   CountUp — animates a numeric stat when scrolled into view
   ------------------------------------------------------------------ */

export function CountUp({
  to,
  from = 0,
  duration = 1.6,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const out = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = out.current;
    if (!node) return;
    if (reduced) {
      node.textContent = to.toFixed(decimals);
      return;
    }
    if (!inView) return;

    let raf = 0;
    let last = "";
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      // ease-out-expo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      // Write straight to the DOM node. Calling setState here would push a
      // React re-render through every frame of the count.
      const next = (from + (to - from) * eased).toFixed(decimals);
      if (next !== last) {
        node.textContent = next;
        last = next;
      }
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, from, to, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {/*
        Always the `from` value, never `reduced ? to : from`.

        useReducedMotion() reads null on the server but the real preference
        synchronously on the client's first render, so branching on it here
        made the server emit "0" while a reduced-motion visitor's browser
        emitted the final number — a hydration text mismatch (React #418).

        The effect above writes `to` immediately when reduced is set, so that
        visitor still lands on the final figure; it is just applied a tick
        after mount instead of during hydration.
      */}
      <span ref={out}>{from.toFixed(decimals)}</span>
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------
   Spotlight — mouse-tracked radial glow on a card
   ------------------------------------------------------------------ */

export function Spotlight({
  children,
  className = "",
  as: Comp = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  // Coalesce pointer events into one write per frame — mousemove fires far
  // faster than the display refreshes, and each write repaints the gradient.
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || raf.current) return;
    const { clientX, clientY } = e;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--wc-x", `${clientX - r.left}px`);
      el.style.setProperty("--wc-y", `${clientY - r.top}px`);
    });
  }, []);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <Comp
      ref={ref}
      onMouseMove={onMove}
      className={`wc-spot wc-ring ${className}`}
    >
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------------
   Magnetic — button that leans toward the cursor
   ------------------------------------------------------------------ */

export function Magnetic({
  children,
  strength = 0.32,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.span>
  );
}

/* ------------------------------------------------------------------
   Scramble — decrypt-style text, fits the security register
   ------------------------------------------------------------------ */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#@$%&*";

export function Scramble({
  text,
  className,
  speed = 34,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || reduced) return;
    let frame = 0;
    let raf = 0;
    const total = text.length;

    const run = () => {
      const settled = Math.floor(frame / 2);
      let s = "";
      for (let i = 0; i < total; i++) {
        if (i < settled) s += text[i];
        else if (text[i] === " ") s += " ";
        else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      // Direct DOM write — this ticks ~30x/sec and every section eyebrow runs
      // one, so routing it through React state re-rendered the page constantly.
      node.textContent = s;
      frame++;
      if (settled <= total) raf = window.setTimeout(run, speed);
      else node.textContent = text;
    };
    run();
    return () => window.clearTimeout(raf);
  }, [inView, reduced, text, speed]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}

/* ------------------------------------------------------------------
   ScrollProgress — thin bar under the sticky nav
   ------------------------------------------------------------------ */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: width }}
      className="fixed left-0 top-0 z-[70] h-[2px] w-full origin-left bg-gradient-to-r from-brand via-brand-hi to-accent"
    />
  );
}

/* ------------------------------------------------------------------
   Parallax — subtle depth on decorative layers
   ------------------------------------------------------------------ */

export function Parallax({
  children,
  amount = 70,
  className,
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  /**
   * useReducedMotion() reads null on the server but the real preference on the
   * client's first render, so branching on it directly made the two disagree
   * about the transform — the same hydration mismatch CountUp had. Deferring
   * to after mount keeps the first render identical on both sides; the CSS
   * media query can't cover this because the offset is scroll-driven, not an
   * animation or transition.
   */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const still = mounted && reduced;

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: still ? 0 : y }}>{children}</motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Marquee — infinite trust strip
   ------------------------------------------------------------------ */

export function Marquee({ items }: { items: readonly string[] }) {
  const doubled = [...items, ...items];
  return (
    <div
      className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
      aria-hidden
    >
      <div className="wc-marquee-track flex shrink-0 items-center gap-10 pr-10">
        {doubled.map((it, i) => (
          <span
            key={`${it}-${i}`}
            className="flex items-center gap-3 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.22em] text-faint"
          >
            <span className="size-1 rounded-full bg-brand/70" />
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
