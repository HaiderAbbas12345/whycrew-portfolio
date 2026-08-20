"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThankYouModal } from "@/components/ui/thank-you-modal";
import { SITE } from "@/lib/site";

const COMPANY_SIZES = ["1–10", "11–50", "51–200", "200+"];

const INTERESTS = [
  "Custom SIEM & SOAR Development",
  "AI SOC Automation",
  "White-Label MSSP Platform",
  "NIS2 & DORA Compliance",
  "Existing client support",
  "Careers",
  "Not sure yet",
];

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; reference: number | null }
  | { kind: "unconfigured"; mailto: string }
  | { kind: "error"; message: string };

const field =
  "w-full rounded-md border border-line/70 bg-void/60 px-4 py-3 text-[14px] text-bright placeholder:text-faint outline-none transition-all duration-400 focus:border-accent/60 focus:bg-void focus:shadow-[0_0_0_3px_rgba(45,212,168,0.12)]";

const label =
  "mb-2 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted";

export function ContactForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [interest, setInterest] = useState("");

  /**
   * Tracked separately from `status` so dismissing the modal leaves the inline
   * confirmation behind — the reassurance stays on the page instead of the
   * submission appearing to vanish.
   */
  const [modalOpen, setModalOpen] = useState(false);

  // Deep links like /contact?topic=careers preselect the routing dropdown
  useEffect(() => {
    const topic = params.get("topic");
    if (topic === "careers") setInterest("Careers");
    if (topic === "support") setInterest("Existing client support");
    if (topic === "mssp") setInterest("White-Label MSSP Platform");
  }, [params]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    setStatus({ kind: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const ok = (await res.json().catch(() => ({}))) as {
          reference?: number | null;
        };
        setStatus({ kind: "sent", reference: ok.reference ?? null });
        setModalOpen(true);
        form.reset();
        setInterest("");
        return;
      }

      const body = (await res.json().catch(() => ({}))) as {
        configured?: boolean;
        error?: string;
      };

      if (body.configured === false) {
        const subject = encodeURIComponent(
          `[${data.interest || "Enquiry"}] ${data.company || ""} — ${data.name || ""}`
        );
        const lines = [
          `Name: ${data.name ?? ""}`,
          `Work email: ${data.email ?? ""}`,
          `Company: ${data.company ?? ""}`,
          `Company size: ${data.companySize ?? ""}`,
          `Looking to build: ${data.interest ?? ""}`,
          "",
          data.message ?? "",
        ];
        setStatus({
          kind: "unconfigured",
          mailto: `mailto:${SITE.email}?subject=${subject}&body=${encodeURIComponent(
            lines.join("\n")
          )}`,
        });
        return;
      }

      setStatus({
        kind: "error",
        message: body.error ?? "Something went wrong. Please try again.",
      });
    } catch {
      setStatus({
        kind: "error",
        message: "Network error. Please try again or email us directly.",
      });
    }
  }

  return (
    <div className="relative">
      <ThankYouModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        reference={status.kind === "sent" ? status.reference : null}
      />

      <AnimatePresence mode="wait">
        {status.kind === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-lg border border-accent/35 bg-accent/6 p-10 text-center"
          >
            <span className="mx-auto grid size-12 place-items-center rounded-full border border-accent/50 bg-accent/12 text-accent">
              <svg viewBox="0 0 20 20" className="size-5" fill="none">
                <path
                  d="M4 10.5l3.6 3.5L16 6"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h3 className="mt-5 text-xl font-semibold">Message received</h3>
            <p className="mx-auto mt-3 max-w-md text-[13.5px] leading-relaxed text-muted">
              An engineer will reply within one business day — inside 24 hours.
              Technical consultations are usually scheduled within 48 hours of
              the initial reply.
            </p>
            {status.reference ? (
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                Reference #{String(status.reference).padStart(4, "0")}
              </p>
            ) : null}
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={false}
            className="rounded-lg border border-line/70 bg-surface/70 p-6 sm:p-8"
            noValidate={false}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="name">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Jane Doe"
                  className={field}
                />
              </div>
              <div>
                <label className={label} htmlFor="email">
                  Work Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="jane@company.com"
                  className={field}
                />
              </div>
              <div>
                <label className={label} htmlFor="company">
                  Company *
                </label>
                <input
                  id="company"
                  name="company"
                  required
                  autoComplete="organization"
                  placeholder="Company name"
                  className={field}
                />
              </div>
              <div>
                <label className={label} htmlFor="companySize">
                  Company Size
                </label>
                <select
                  id="companySize"
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

            <div className="mt-5">
              <label className={label} htmlFor="interest">
                What are you looking to build? *
              </label>
              <select
                id="interest"
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

            <div className="mt-5">
              <label className={label} htmlFor="message">
                Message (optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="The dropdown alone is enough to route this correctly."
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

            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Button type="submit" magnetic={false}>
                {status.kind === "sending" ? "Sending…" : "Submit"}
              </Button>
              <p className="text-[12.5px] italic text-faint">
                No phone number required unless you want a callback.
              </p>
            </div>

            <AnimatePresence>
              {status.kind === "unconfigured" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 rounded-md border border-warn/35 bg-warn/8 p-5">
                    <p className="text-[13px] leading-relaxed text-body">
                      Form delivery isn&apos;t connected yet on this deployment.
                      Your details are ready to send — open it in your mail app
                      and hit send.
                    </p>
                    <a
                      href={status.mailto}
                      className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-warn underline-offset-4 hover:underline"
                    >
                      Send via email instead →
                    </a>
                  </div>
                </motion.div>
              )}
              {status.kind === "error" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-5 text-[13px] text-danger"
                >
                  {status.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
