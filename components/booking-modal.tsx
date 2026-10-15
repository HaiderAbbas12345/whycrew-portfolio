"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { COMPANY_SIZES, INTERESTS, field, label } from "@/components/contact-form";
import { BOOKING_PAGE_URL, CTA_HREF, EXTERNAL_REL } from "@/lib/site";
import { submitLead, type LeadStatus } from "@/lib/submit-lead";

const EASE = [0.16, 1, 0.3, 1] as const;

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

const DEFAULT_TITLE = "Book a call";

/**
 * Preselects "What are you looking to build?" from the page the popup was
 * opened on, so most visitors only type their name, email and company.
 */
const INTEREST_BY_PATH: [string, string][] = [
  ["/services/custom-siem-development", "Custom SIEM & SOAR Development"],
  ["/services/custom-soar-development", "Custom SIEM & SOAR Development"],
  ["/services/ai-powered-soc-automation", "AI SOC Automation"],
  ["/services/mssp-engineering-partner", "White-Label MSSP Platform"],
  ["/services/nis2-dora-compliance-automation", "NIS2 & DORA Compliance"],
];

/** GTM picks these up from the dataLayer; a no-op when it isn't loaded. */
function track(event: string, params: Record<string, string> = {}) {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer?.push({ event, ...params });
}

/**
 * Turns every booking CTA on the site into a popup form.
 *
 * Mounted once in the root layout. Rather than threading an onClick through
 * every Button, CtaCard and plain <a>, it listens for clicks on any link whose
 * href is exactly CTA_HREF and opens the popup instead of navigating. That
 * covers server-rendered markup too, and leaves the link's real href as the
 * no-JS fallback (the contact form).
 *
 * Modified clicks (Ctrl/Cmd/Shift, middle button) are left alone so "open in
 * new tab" still works.
 */
export function BookingModalProvider() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const pathname = usePathname();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const link = (e.target as Element | null)?.closest?.("a");
      if (!link || link.getAttribute("href") !== CTA_HREF) return;

      e.preventDefault();
      // Stop next/link from also client-navigating to /contact.
      e.stopPropagation();

      // The clicked button's own wording becomes the popup heading, so
      // "Book a Free Architecture Audit" opens a popup that says the same.
      const text = link.textContent?.replace(/→/g, "").replace(/\s+/g, " ").trim();
      setTitle(text || DEFAULT_TITLE);
      setOpen(true);
      track("booking_popup_open", { cta: text || "", page: location.pathname });
    }

    // Capture phase on document runs before React's root listener and
    // next/link's handler.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Navigating away (e.g. a link inside the popup) shouldn't leave it open.
  useEffect(() => setOpen(false), [pathname]);

  const close = useCallback(() => setOpen(false), []);

  const interest =
    INTEREST_BY_PATH.find(([p]) => pathname?.startsWith(p))?.[1] ?? "";

  return (
    <BookingModal
      open={open}
      onClose={close}
      title={title}
      defaultInterest={interest}
    />
  );
}

function BookingModal({
  open,
  onClose,
  title,
  defaultInterest,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  defaultInterest: string;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<LeadStatus>({ kind: "idle" });
  const [interest, setInterest] = useState(defaultInterest);

  // Each opening starts from a clean form, preselected for the current page —
  // except straight after a send, where the confirmation should still show if
  // the visitor reopens it.
  useEffect(() => {
    if (!open) return;
    setInterest(defaultInterest);
    setStatus((s) => (s.kind === "sent" ? s : { kind: "idle" }));
  }, [open, defaultInterest]);

  useEffect(() => {
    if (!open) return;

    restoreFocus.current = document.activeElement as HTMLElement | null;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    // Focus the first field, not the close button, so typing can start at once.
    const raf = requestAnimationFrame(() => {
      const first =
        panel.current?.querySelector<HTMLElement>("input:not([tabindex='-1'])") ??
        panel.current?.querySelector<HTMLElement>(FOCUSABLE);
      first?.focus();
    });

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;

      const items = Array.from(
        panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.tabIndex !== -1);
      if (!items.length) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || !panel.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      restoreFocus.current?.focus?.();
    };
  }, [open, onClose]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    setStatus({ kind: "sending" });
    const result = await submitLead(data);
    setStatus(result);

    if (result.kind === "sent") {
      form.reset();
      track("generate_lead", { method: "booking_popup", page: location.pathname });
    }
  }

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] grid place-items-center p-4 sm:p-6">
          <motion.div
            aria-hidden
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-void/80 backdrop-blur-sm"
          />

          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.97 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative max-h-[calc(100dvh-2rem)] w-full max-w-xl overflow-y-auto rounded-xl border border-accent/30 bg-surface p-6 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.75)] sm:p-8"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
            />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 grid size-9 place-items-center rounded-md text-muted transition-colors hover:bg-surface-2/70 hover:text-bright"
            >
              <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
                <path
                  d="M5 5l10 10M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {status.kind === "sent" ? (
              <div className="py-4 text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-full border border-accent/50 bg-accent/12 text-accent">
                  <svg viewBox="0 0 20 20" className="size-6" fill="none" aria-hidden>
                    <path
                      d="M4 10.5l3.6 3.5L16 6"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h2 id="booking-title" className="mt-6 text-2xl font-semibold text-bright">
                  Request received
                </h2>
                <p className="mx-auto mt-4 max-w-sm text-[14px] leading-relaxed text-muted">
                  An engineer will email you within one business day to confirm a
                  time. Prefer to pick a slot yourself? Grab one on our calendar now.
                </p>
                {status.reference ? (
                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                    Reference #{String(status.reference).padStart(4, "0")}
                  </p>
                ) : null}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <Button href={BOOKING_PAGE_URL} magnetic={false}>
                    Pick a time now
                  </Button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center justify-center rounded-md border border-line bg-surface-2/60 px-6 py-3 text-[13.5px] font-semibold text-bright transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent/45 hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="relative">
                <p className="pr-10 font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-accent">
                  Free · 20 minutes · No obligation
                </p>
                <h2
                  id="booking-title"
                  className="mt-3 pr-10 text-2xl font-semibold leading-tight text-bright"
                >
                  {title}
                </h2>
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                  Tell us who you are and what you&apos;re working on. An engineer
                  replies within one business day to set the time.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={label} htmlFor="bk-name">
                      Name *
                    </label>
                    <input
                      id="bk-name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Jane Doe"
                      className={field}
                    />
                  </div>
                  <div>
                    <label className={label} htmlFor="bk-email">
                      Work Email *
                    </label>
                    <input
                      id="bk-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="jane@company.com"
                      className={field}
                    />
                  </div>
                  <div>
                    <label className={label} htmlFor="bk-company">
                      Company *
                    </label>
                    <input
                      id="bk-company"
                      name="company"
                      required
                      autoComplete="organization"
                      placeholder="Company name"
                      className={field}
                    />
                  </div>
                  <div>
                    <label className={label} htmlFor="bk-size">
                      Company Size
                    </label>
                    <select
                      id="bk-size"
                      name="companySize"
                      defaultValue=""
                      className={`${field} appearance-none`}
                    >
                      <option value="">Select one</option>
                      {COMPANY_SIZES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className={label} htmlFor="bk-interest">
                    What are you looking to build? *
                  </label>
                  <select
                    id="bk-interest"
                    name="interest"
                    required
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className={`${field} appearance-none`}
                  >
                    <option value="">Select one</option>
                    {INTERESTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-4">
                  <label className={label} htmlFor="bk-message">
                    Anything we should know? (optional)
                  </label>
                  <textarea
                    id="bk-message"
                    name="message"
                    rows={3}
                    placeholder="Current SIEM, log volume, timeline…"
                    className={`${field} resize-y`}
                  />
                </div>

                {/* honeypot */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="absolute left-[-9999px] size-0 opacity-0"
                />

                <div className="mt-6">
                  <Button type="submit" magnetic={false} className="w-full">
                    {status.kind === "sending" ? "Sending…" : "Request my call"}
                  </Button>
                </div>

                {status.kind === "unconfigured" && (
                  <div className="mt-5 rounded-md border border-warn/35 bg-warn/8 p-4">
                    <p className="text-[13px] leading-relaxed text-body">
                      Form delivery isn&apos;t connected yet on this deployment.
                      Your details are ready to send — open it in your mail app
                      and hit send.
                    </p>
                    <a
                      href={status.mailto}
                      className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-warn underline-offset-4 hover:underline"
                    >
                      Send via email instead →
                    </a>
                  </div>
                )}
                {status.kind === "error" && (
                  <p className="mt-4 text-[13px] text-danger">{status.message}</p>
                )}

                <p className="mt-5 text-[12px] leading-relaxed text-faint">
                  Rather pick a slot yourself?{" "}
                  <a
                    href={BOOKING_PAGE_URL}
                    target="_blank"
                    rel={EXTERNAL_REL}
                    className="text-accent underline-offset-4 hover:underline"
                  >
                    Open our calendar
                  </a>
                  . No newsletter, no sales sequence.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
