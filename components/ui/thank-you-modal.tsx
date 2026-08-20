"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { BOOKING_URL } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Everything inside the dialog that can hold focus, in tab order. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Confirmation shown after the contact form is accepted.
 *
 * Rendered through a portal on document.body rather than inside the form: the
 * form sits in a section with its own stacking context, so an overlay nested
 * there would be clipped by it.
 */
export function ThankYouModal({
  open,
  onClose,
  reference,
}: {
  open: boolean;
  onClose: () => void;
  /** Lead number from the API, shown so a follow-up email can quote it. */
  reference?: number | null;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    // Remember what was focused (the Submit button) to put it back on close.
    restoreFocus.current = document.activeElement as HTMLElement | null;

    // The page behind must not scroll under the overlay.
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    // Move focus into the dialog so a screen reader announces it and Tab stays
    // inside; rAF waits for the mounted panel to be focusable.
    const raf = requestAnimationFrame(() => {
      panel.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    });

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;

      // Focus trap: wrap at both ends rather than letting Tab escape to the
      // page behind, which is inert to a sighted user but not to a keyboard.
      const items = Array.from(
        panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      );
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

  // document is undefined during the server render, so the portal target only
  // exists once mounted in the browser.
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
            aria-labelledby="thanks-title"
            aria-describedby="thanks-body"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.97 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative w-full max-w-lg overflow-hidden rounded-xl border border-accent/30 bg-surface p-8 text-center shadow-[0_30px_90px_-20px_rgba(0,0,0,0.75)] sm:p-10"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
            />

            <motion.span
              initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
              animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
              transition={{ delay: 0.12, duration: 0.5, ease: EASE }}
              className="mx-auto grid size-14 place-items-center rounded-full border border-accent/50 bg-accent/12 text-accent"
            >
              <svg viewBox="0 0 20 20" className="size-6" fill="none">
                <motion.path
                  d="M4 10.5l3.6 3.5L16 6"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={reduceMotion ? false : { pathLength: 0 }}
                  animate={reduceMotion ? undefined : { pathLength: 1 }}
                  transition={{ delay: 0.24, duration: 0.5, ease: "easeOut" }}
                />
              </svg>
            </motion.span>

            <h2 id="thanks-title" className="mt-6 text-2xl font-semibold text-bright">
              Thank you for contacting WhyCrew
            </h2>

            <p
              id="thanks-body"
              className="mx-auto mt-4 max-w-sm text-[14px] leading-relaxed text-muted"
            >
              Your enquiry has been received. An engineer will reply within one
              business day — inside 24 hours. Technical consultations are usually
              scheduled within 48 hours of that first reply.
            </p>

            {reference ? (
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                Reference #{String(reference).padStart(4, "0")}
              </p>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {BOOKING_URL && (
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-brand via-brand to-brand-hi px-6 py-3 text-[13.5px] font-semibold text-white shadow-[0_0_0_1px_rgba(91,131,255,0.35),0_12px_34px_-12px_rgba(47,92,255,0.75)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  Book a call now
                  <span aria-hidden>→</span>
                </a>
              )}
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-md border border-line bg-surface-2/60 px-6 py-3 text-[13.5px] font-semibold text-bright transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent/45 hover:text-white"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
