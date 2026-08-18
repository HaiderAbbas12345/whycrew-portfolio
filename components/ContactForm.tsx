"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Check, CalendarClock, Loader2 } from "lucide-react";
import { SITE, BOOKING_URL } from "@/lib/site";

const SIEMS = ["Splunk", "Microsoft Sentinel", "IBM QRadar", "Other / not sure"];

const EMPTY = {
  name: "",
  company: "",
  email: "",
  siem: "",
  tenants: "",
  spend: "",
  note: "",
  website: "", // honeypot
};

type Status = "idle" | "sending" | "sent" | "error";

/** Fire a conversion event for GA4 / GTM if either is present on the page. */
function trackLead() {
  if (typeof window === "undefined") return;
  const w = window as typeof window & {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  w.dataLayer?.push({ event: "generate_lead", form: "discovery_call" });
  w.gtag?.("event", "generate_lead", { form: "discovery_call" });
}

export function ContactForm() {
  const [f, setF] = useState(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const pathname = usePathname();

  const set =
    (k: keyof typeof f) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setF((prev) => ({ ...prev, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, page: pathname }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        setError(data.error || "We couldn't submit that just now.");
        setStatus("error");
        return;
      }

      trackLead();
      setF(EMPTY);
      setStatus("sent");
    } catch {
      setError("Network problem — check your connection and try again.");
      setStatus("error");
    }
  };

  const input =
    "w-full rounded-lg border border-line bg-white/[0.02] px-3.5 py-2.5 text-[14.5px] text-text placeholder:text-muted-2 outline-none focus:border-own transition-colors";

  return (
    <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr]">
      {/* what to bring */}
      <div>
        <h3 className="font-display text-[22px] font-bold tracking-[-0.01em]">
          Bring four numbers. We&apos;ll show you the fifth.
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          A fifteen-minute discovery call. No deck, no pressure. With these four, we put your own
          savings curve on the table:
        </p>
        <ul className="mt-5 space-y-3">
          {[
            "Which SIEM you run today",
            "How many clients / tenants you have",
            "Roughly what you pay the vendor each year",
            "How fast you're adding clients",
          ].map((t) => (
            <li key={t} className="flex items-start gap-3 text-[15px] text-text">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-own/15 text-own">
                <Check size={12} />
              </span>
              {t}
            </li>
          ))}
        </ul>

        {BOOKING_URL && (
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackLead}
            className="btn btn-ghost mt-6"
          >
            <CalendarClock size={16} /> Or pick a slot directly
          </a>
        )}

        <p className="mt-6 border-l-2 border-own pl-4 text-[14.5px] leading-relaxed text-muted">
          Prefer email? Write us directly at{" "}
          <a href={`mailto:${SITE.email}`} className="text-own hover:underline">
            {SITE.email}
          </a>
          .
        </p>
      </div>

      {/* form */}
      {status === "sent" ? (
        <div className="card flex flex-col items-start justify-center gap-4 p-8">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-own/15 text-own">
            <Check size={22} />
          </span>
          <h3 className="font-display text-[22px] font-bold tracking-[-0.01em]">
            Got it — we&apos;ll be in touch.
          </h3>
          <p className="max-w-[46ch] text-[15px] leading-relaxed text-muted">
            One of us reads every one of these personally. Expect a reply within one business day,
            usually with a first read on your numbers already attached.
          </p>
          {BOOKING_URL && (
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold mt-1"
            >
              <CalendarClock size={16} /> Skip the wait, book a slot
            </a>
          )}
        </div>
      ) : (
        <form onSubmit={submit} className="card p-7" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              className={input}
              placeholder="Your name"
              autoComplete="name"
              value={f.name}
              onChange={set("name")}
              required
            />
            <input
              className={input}
              placeholder="MSSP / company"
              autoComplete="organization"
              value={f.company}
              onChange={set("company")}
              required
            />
          </div>
          <div className="mt-4">
            <input
              className={input}
              type="email"
              placeholder="Work email"
              autoComplete="email"
              value={f.email}
              onChange={set("email")}
              required
            />
          </div>

          {/* honeypot — hidden from humans, catnip for bots */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute h-0 w-0 opacity-0"
            value={f.website}
            onChange={set("website")}
          />

          <div className="mt-4">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
              Current SIEM
            </div>
            <div className="flex flex-wrap gap-2">
              {SIEMS.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setF((prev) => ({ ...prev, siem: s }))}
                  aria-pressed={f.siem === s}
                  className={`rounded-lg border px-3 py-2 text-[13px] transition-colors ${
                    f.siem === s
                      ? "border-own bg-own/10 text-text"
                      : "border-line text-muted hover:text-text"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <input
              className={input}
              placeholder="Clients / tenants (e.g. 25)"
              value={f.tenants}
              onChange={set("tenants")}
            />
            <input
              className={input}
              placeholder="Annual SIEM spend (e.g. $280k)"
              value={f.spend}
              onChange={set("spend")}
            />
          </div>
          <textarea
            className={`${input} mt-4 min-h-[90px] resize-y`}
            placeholder="Anything else? (optional)"
            value={f.note}
            onChange={set("note")}
          />

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn btn-gold mt-5 w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "sending" ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Sending…
              </>
            ) : (
              <>
                Book my discovery call <ArrowUpRight size={16} />
              </>
            )}
          </button>

          {status === "error" ? (
            <p role="alert" className="mt-3 text-center text-[13px] text-rent">
              {error}{" "}
              <a href={`mailto:${SITE.email}`} className="underline hover:text-own">
                Email us instead
              </a>
              .
            </p>
          ) : (
            <p className="mt-3 text-center font-mono text-[11px] text-muted-2">
              Goes straight to the team. No newsletter, no sequence you didn&apos;t ask for.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
