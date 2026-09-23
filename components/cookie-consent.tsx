"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ADVERTISING_NOTE,
  CONSENT_KEY,
  CONSENT_VERSION,
  COOKIE_GROUPS,
  type ConsentState,
} from "@/lib/legal";

/* ---------------------------------------------------------------------------
 * Consent store
 *
 * A choice is one localStorage record, and every reader subscribes to the same
 * custom event. That keeps <Analytics> and the banner from holding two copies
 * of the answer and disagreeing about it — the tags have to switch off the
 * moment consent is withdrawn, not on the next navigation.
 * ------------------------------------------------------------------------- */

const CHANGED_EVENT = "wc:consent-changed";
const OPEN_EVENT = "wc:consent-open";

function readConsent(): ConsentState | null {
  // Wrapped because a browser set to block site data throws on access rather
  // than returning null, and an exception here would take the page down.
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    // A stored answer to a different set of categories is not an answer to
    // this one, so bumping CONSENT_VERSION re-asks everybody.
    if (!parsed || parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(next: ConsentState) {
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable: the choice still applies to this page view through
    // the event below, it just will not survive a reload.
  }
  window.dispatchEvent(new Event(CHANGED_EVENT));
}

/**
 * The visitor's current choice.
 *
 * `ready` stays false until after mount. localStorage cannot be read during
 * the server render, so a first client render that consulted it would disagree
 * with the served HTML and React would throw a hydration mismatch (#418) — the
 * same trap CountUp and Parallax document in components/motion.
 */
export function useConsent(): { consent: ConsentState | null; ready: boolean } {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setConsent(readConsent());
    sync();
    setReady(true);
    window.addEventListener(CHANGED_EVENT, sync);
    // Another tab changing the choice should switch the tags off in this one.
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { consent, ready };
}

/**
 * Expire the cookies the analytics tags set.
 *
 * Each one is cleared against both the exact host and the registrable domain
 * with a leading dot, because GA writes to `.whycrew.com` while a cookie set
 * by a script on the page defaults to the host — clearing only one of the two
 * leaves the other in place and the visitor still identified.
 */
function clearAnalyticsCookies() {
  const NAMES = [/^_ga/, /^_gid$/, /^_gat/, /^_clck$/, /^_clsk$/, /^CLID$/];
  const host = window.location.hostname;
  const domains = [host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];

  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name || !NAMES.some((re) => re.test(name))) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`;
    }
    document.cookie = `${name}=; Max-Age=0; path=/`;
  }
}

/** Opens the preference centre from anywhere on the site. */
export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

/**
 * The footer's "Cookie preferences" control, and the same link inside the
 * Cookie Policy. A <button>, not an <a> — it opens a panel on the current page
 * rather than navigating, and a link that goes nowhere is one a keyboard or
 * screen-reader user cannot make sense of.
 */
export function CookiePreferencesButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button type="button" onClick={openCookiePreferences} className={className}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ banner */

const ACCEPT_ALL: Omit<ConsentState, "decidedAt"> = {
  version: CONSENT_VERSION,
  analytics: true,
  functional: true,
};

const REJECT_ALL: Omit<ConsentState, "decidedAt"> = {
  version: CONSENT_VERSION,
  analytics: false,
  functional: false,
};

export function CookieConsent() {
  const { consent, ready } = useConsent();
  const [panelOpen, setPanelOpen] = useState(false);
  const [draft, setDraft] = useState({ analytics: false, functional: false });
  const panelRef = useRef<HTMLDivElement>(null);

  // The footer link can ask for the panel on a page where the banner is long
  // since dismissed, so this listens whether or not a choice has been made.
  useEffect(() => {
    const open = () => {
      const current = readConsent();
      setDraft({
        analytics: current?.analytics ?? false,
        functional: current?.functional ?? false,
      });
      setPanelOpen(true);
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanelOpen(false);
    };
    window.addEventListener("keydown", onKey);
    // Focus moves into the panel so a keyboard user is not left behind on the
    // page underneath it.
    panelRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [panelOpen]);

  const decide = useCallback((choice: Omit<ConsentState, "decidedAt">) => {
    const previous = readConsent();
    writeConsent({ ...choice, decidedAt: new Date().toISOString() });
    setPanelOpen(false);

    /*
      Withdrawing consent has to actually stop the collection, not just stop
      rendering the tags. A script already in the document keeps running and
      keeps its cookies, so drop the cookies and reload — otherwise "you can
      change your choice at any time" only holds going forward.
    */
    if (previous?.analytics && !choice.analytics) {
      clearAnalyticsCookies();
      window.location.reload();
    }
  }, []);

  // Nothing renders until the stored choice has been read. Painting a banner
  // before that would flash it at everyone who already answered.
  if (!ready) return null;

  const bannerVisible = consent === null && !panelOpen;

  return (
    <>
      {bannerVisible && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-[70] border-t border-line/70 bg-ink/95 backdrop-blur-md"
        >
          <div className="container-page flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <p className="max-w-2xl text-[13.5px] leading-relaxed text-muted">
              We use strictly necessary cookies to run this site, and — only
              with your consent — analytics cookies to understand how it is
              used. You can change your choice at any time.{" "}
              <Link
                href="/cookie-policy"
                className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
              >
                Cookie Policy
              </Link>
            </p>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => openCookiePreferences()}
                className="rounded-md px-4 py-2.5 text-[13px] font-semibold text-muted transition-colors duration-300 hover:text-bright"
              >
                Manage preferences
              </button>
              {/*
                Decline sits beside Accept, at the same size and weight. A
                banner where refusing is harder to find than agreeing is not
                consent freely given under GDPR Article 7.
              */}
              <button
                type="button"
                onClick={() => decide(REJECT_ALL)}
                className="rounded-md border border-line px-5 py-2.5 text-[13px] font-semibold text-bright transition-all duration-300 hover:border-accent/45"
              >
                Decline non-essential
              </button>
              <button
                type="button"
                onClick={() => decide(ACCEPT_ALL)}
                className="rounded-md bg-gradient-to-r from-brand to-brand-hi px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_0_0_1px_rgba(91,131,255,0.35)] transition-all duration-300"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}

      {panelOpen && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/80 backdrop-blur-sm sm:items-center">
          <div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-prefs-title"
            className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-xl border border-line/70 bg-surface p-6 outline-none sm:rounded-xl sm:p-8"
          >
            <h2
              id="cookie-prefs-title"
              className="text-xl font-semibold text-bright"
            >
              Cookie preferences
            </h2>
            <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
              The cookies below are the ones actually running on whycrew.com.
              Strictly necessary cookies cannot be switched off. For the full
              explanation, see the{" "}
              <Link
                href="/cookie-policy"
                className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
              >
                Cookie Policy
              </Link>
              .
            </p>

            <div className="mt-7 space-y-4">
              {COOKIE_GROUPS.map((group) => {
                const on = group.required
                  ? true
                  : group.id === "analytics"
                    ? draft.analytics
                    : draft.functional;

                return (
                  <section
                    key={group.id}
                    className="rounded-lg border border-line/70 bg-surface-2/40 p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-[15px] font-semibold text-bright">
                          {group.title}
                        </h3>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                          {group.body}
                        </p>
                      </div>

                      {group.required ? (
                        <span className="shrink-0 rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                          Always on
                        </span>
                      ) : (
                        <button
                          type="button"
                          role="switch"
                          aria-checked={on}
                          aria-label={`${group.title} cookies`}
                          onClick={() =>
                            setDraft((d) =>
                              group.id === "analytics"
                                ? { ...d, analytics: !d.analytics }
                                : { ...d, functional: !d.functional }
                            )
                          }
                          className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors duration-300 ${
                            on
                              ? "border-brand-hi/60 bg-brand"
                              : "border-line bg-surface-2"
                          }`}
                        >
                          <span
                            aria-hidden
                            className={`absolute top-1/2 size-4 -translate-y-1/2 rounded-full bg-white transition-all duration-300 ${
                              on ? "left-[calc(100%-1.25rem)]" : "left-1"
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {group.cookies.length > 0 ? (
                      <div className="mt-4 overflow-x-auto">
                        <table className="w-full min-w-[460px] border-collapse text-left text-[12.5px]">
                          <thead>
                            <tr className="border-b border-line/70">
                              {["Cookie", "Provider", "Purpose", "Expiry"].map(
                                (h) => (
                                  <th
                                    key={h}
                                    scope="col"
                                    className="py-2 pr-4 font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-faint"
                                  >
                                    {h}
                                  </th>
                                )
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {group.cookies.map((c) => (
                              <tr
                                key={c.name}
                                className="border-b border-line-soft/70 last:border-0"
                              >
                                <td className="py-2.5 pr-4 align-top font-mono text-[11.5px] text-bright">
                                  {c.name}
                                </td>
                                <td className="py-2.5 pr-4 align-top text-muted">
                                  {c.provider}
                                </td>
                                <td className="py-2.5 pr-4 align-top text-muted">
                                  {c.purpose}
                                </td>
                                <td className="py-2.5 align-top text-muted">
                                  {c.expiry}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
                        None currently in use
                      </p>
                    )}
                  </section>
                );
              })}

              <p className="text-[12.5px] leading-relaxed text-faint">
                {ADVERTISING_NOTE}
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => decide(REJECT_ALL)}
                className="rounded-md px-4 py-2.5 text-[13px] font-semibold text-muted transition-colors duration-300 hover:text-bright"
              >
                Decline non-essential
              </button>
              <button
                type="button"
                onClick={() => decide({ version: CONSENT_VERSION, ...draft })}
                className="rounded-md border border-line px-5 py-2.5 text-[13px] font-semibold text-bright transition-all duration-300 hover:border-accent/45"
              >
                Save preferences
              </button>
              <button
                type="button"
                onClick={() => decide(ACCEPT_ALL)}
                className="rounded-md bg-gradient-to-r from-brand to-brand-hi px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_0_0_1px_rgba(91,131,255,0.35)] transition-all duration-300"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
