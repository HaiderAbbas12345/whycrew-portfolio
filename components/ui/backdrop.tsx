/**
 * Atmospheric layer for hero sections: drifting grid, blurred brand orbs,
 * a slow scanline, and a vignette. Purely decorative and CSS-driven so it
 * costs nothing on the main thread; all of it disappears under
 * prefers-reduced-motion (see globals.css).
 */
export function Backdrop({
  variant = "hero",
}: {
  variant?: "hero" | "section";
}) {
  const isHero = variant === "hero";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* drifting grid */}
      <div
        className={`wc-grid absolute inset-0 ${
          isHero ? "opacity-100" : "opacity-40"
        } [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,#000_25%,transparent_78%)]`}
      />

      {/* brand orbs */}
      <div
        className="wc-orb absolute -top-40 left-[8%] size-[34rem] bg-brand/22"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="wc-orb absolute -top-24 right-[4%] size-[28rem] bg-accent/12"
        style={{ animationDelay: "-6s" }}
      />
      {isHero && (
        <div
          className="wc-orb absolute top-[42%] left-[38%] size-[24rem] bg-brand-deep/28"
          style={{ animationDelay: "-11s" }}
        />
      )}

      {/* scanline */}
      {isHero && (
        <div className="wc-scanline absolute inset-x-0 top-0 h-[2px]" />
      )}

      {/* horizon glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />

      {/* vignette into the page ground */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-void" />
    </div>
  );
}
