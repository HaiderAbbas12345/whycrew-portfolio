"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Portrait with an initials fallback. The fallback renders whenever no photo is
 * set *or* the file isn't there yet, so dropping the image into /public/team
 * later is the only change needed — no code edit, no broken image in between.
 */
export function Avatar({
  src,
  name,
  size = 128,
}: {
  src?: string;
  name: string;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const shell =
    "relative shrink-0 overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-surface to-ink-2";

  if (!src || failed) {
    return (
      <div
        className={`${shell} grid place-items-center`}
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <span
          className="font-display font-extrabold tracking-[-0.02em] gold-gradient"
          style={{ fontSize: size * 0.34 }}
        >
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div className={shell} style={{ width: size, height: size }}>
      <Image
        src={src}
        alt={name}
        width={size}
        height={size}
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
        sizes={`${size}px`}
      />
    </div>
  );
}
