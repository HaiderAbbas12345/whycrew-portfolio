import Image from "next/image";
import Link from "next/link";

export function Logo({ size = 34 }: { size?: number }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3"
      aria-label="WhyCrew home"
    >
      <span
        className="relative grid place-items-center overflow-hidden rounded-[10px] ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        <Image
          src="/logo.jpeg"
          alt="WhyCrew"
          width={size}
          height={size}
          className="h-full w-full object-cover"
          priority
        />
      </span>
      <span className="font-display text-[19px] font-extrabold tracking-tight text-text">
        WhyCrew
      </span>
    </Link>
  );
}
