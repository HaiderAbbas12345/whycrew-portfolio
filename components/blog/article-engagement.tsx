"use client";

import { useState, type ReactNode } from "react";
import { EXTERNAL_REL } from "@/lib/site";

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

const enc = encodeURIComponent;

/**
 * Brand colours are the networks' own, so each button reads at a glance the
 * way readers already know it from every other site.
 */
const NETWORKS: {
  label: string;
  className: string;
  href: (url: string, title: string) => string;
  icon: ReactNode;
}[] = [
  {
    label: "LinkedIn",
    className: "bg-[#0a66c2] hover:bg-[#0b74dc]",
    href: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
    icon: (
      <path
        fill="currentColor"
        d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5zM.24 8.25h4.5V23h-4.5V8.25zM8.5 8.25h4.31v2.01h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V23h-4.5v-6.53c0-1.56-.03-3.57-2.18-3.57-2.18 0-2.51 1.7-2.51 3.46V23H8.5V8.25z"
        transform="translate(2.2 1) scale(0.85)"
      />
    ),
  },
  {
    label: "X",
    className: "border border-line bg-black hover:border-faint",
    href: (url, title) =>
      `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`,
    icon: (
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
        transform="translate(2 2) scale(0.833)"
      />
    ),
  },
  {
    label: "Facebook",
    className: "bg-[#1877f2] hover:bg-[#2d86f5]",
    href: (url) => `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
    icon: (
      <path
        fill="currentColor"
        d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.33-.04-1.56-.14-2.86-.14C11.93 2 10 3.66 10 6.7v2.8H7v4h3V22h4v-8.5z"
      />
    ),
  },
  {
    label: "Reddit",
    className: "bg-[#ff4500] hover:bg-[#ff5a1f]",
    href: (url, title) =>
      `https://www.reddit.com/submit?url=${enc(url)}&title=${enc(title)}`,
    icon: (
      <g>
        <ellipse cx="12" cy="14.2" rx="7.2" ry="5.2" fill="currentColor" />
        <circle cx="5.4" cy="11.2" r="1.7" fill="currentColor" />
        <circle cx="18.6" cy="11.2" r="1.7" fill="currentColor" />
        <circle cx="17.4" cy="5" r="1.6" fill="currentColor" />
        <path
          d="M12 9l1.3-4.6 4.1.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9.3" cy="13.4" r="1.25" fill="#ff4500" />
        <circle cx="14.7" cy="13.4" r="1.25" fill="#ff4500" />
        <path
          d="M9.4 16.3c1.5 1 3.7 1 5.2 0"
          fill="none"
          stroke="#ff4500"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    label: "WhatsApp",
    className: "bg-[#25d366] hover:bg-[#3be077]",
    href: (url, title) => `https://wa.me/?text=${enc(`${title} ${url}`)}`,
    icon: (
      <g>
        <path
          d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          fill="currentColor"
          d="M9.2 7.8c.2-.4.5-.4.7-.4h.5c.2 0 .4 0 .6.5l.7 1.7c.1.2.1.4 0 .6l-.5.7c-.1.2-.1.4 0 .6.6 1 1.4 1.8 2.4 2.4.2.1.4.1.6 0l.7-.6c.2-.2.4-.2.6-.1l1.7.8c.2.1.4.2.4.4v.5c0 .4-.2.9-.6 1.2-.5.4-1.3.6-2.1.4-2.6-.7-4.9-3-5.6-5.6-.2-.8-.1-1.7.3-2.3z"
        />
      </g>
    ),
  },
];

const circle =
  "inline-flex h-12 w-12 items-center justify-center rounded-full text-white transition-[transform,background-color,border-color] duration-300 hover:-translate-y-0.5";

export function ShareArticle({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context, permissions) — nothing to undo.
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold sm:text-2xl">Share this article</h2>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {NETWORKS.map((n) => (
          <a
            key={n.label}
            href={n.href(url, title)}
            target="_blank"
            rel={EXTERNAL_REL}
            aria-label={`Share on ${n.label}`}
            className={`${circle} ${n.className}`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
              {n.icon}
            </svg>
          </a>
        ))}
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Link copied" : "Copy link"}
          className={`${circle} border border-line bg-surface hover:border-faint`}
        >
          {copied ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-accent" aria-hidden>
              <path
                d="M5 12.5l4.5 4.5L19 7.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
              <g
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
                <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
              </g>
            </svg>
          )}
        </button>
        <span role="status" className="sr-only">
          {copied ? "Link copied to clipboard" : ""}
        </span>
      </div>
    </div>
  );
}

/**
 * The vote goes to the analytics already on the site (Clarity custom event,
 * plus a dataLayer push for GTM) — no backend of its own. Either is a no-op
 * when the visitor hasn't consented and the script never loaded.
 */
export function HelpfulPrompt({ slug }: { slug: string }) {
  const [vote, setVote] = useState<"yes" | "no" | null>(null);

  const send = (v: "yes" | "no") => {
    setVote(v);
    try {
      window.clarity?.("event", `article_helpful_${v}`);
      window.dataLayer?.push({
        event: "article_helpful",
        article: slug,
        helpful: v,
      });
    } catch {
      // Analytics failing must never break the page.
    }
  };

  const btn =
    "rounded-lg border border-line px-5 py-2 text-[14px] font-semibold text-bright transition-colors duration-300 hover:border-accent hover:text-accent";

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line/70 bg-surface/50 px-6 py-5 sm:px-8">
      {vote ? (
        <p role="status" className="text-[15px] font-medium text-bright">
          Thanks for your feedback.
        </p>
      ) : (
        <>
          <p className="text-[15px] font-medium text-bright">
            Was this article helpful?
          </p>
          <div className="flex gap-3">
            <button type="button" onClick={() => send("yes")} className={btn}>
              Yes
            </button>
            <button type="button" onClick={() => send("no")} className={btn}>
              No
            </button>
          </div>
        </>
      )}
    </div>
  );
}
