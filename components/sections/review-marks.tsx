/** Small marks shared by every review layout. */

export function Stars({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`text-accent ${className}`}>
      ★★★★★
    </span>
  );
}

export function QuoteMark({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 28 22" className={className}>
      <path
        d="M0 22V12.6C0 5.6 3.6 1.4 10.8 0l1.4 3C8.3 4.2 6.4 6.6 6.2 10H11v12H0zm16 0V12.6C16 5.6 19.6 1.4 26.8 0l1.4 3c-3.9 1.2-5.8 3.6-6 7H27v12H16z"
        className="fill-accent"
      />
    </svg>
  );
}

export function ShieldBadge() {
  return (
    <span
      aria-hidden
      className="grid size-10 shrink-0 place-items-center rounded-full border border-accent/35 bg-accent/8 lg:size-11"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-4 text-accent lg:size-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    </span>
  );
}
