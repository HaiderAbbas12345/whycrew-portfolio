"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

const SIEMS = ["Splunk", "Microsoft Sentinel", "IBM QRadar", "Other / not sure"];

export function ContactForm() {
  const [f, setF] = useState({ name: "", company: "", siem: "", tenants: "", spend: "", note: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [
      `Name: ${f.name}`,
      `MSSP / company: ${f.company}`,
      `Current SIEM: ${f.siem}`,
      `Clients / tenants: ${f.tenants}`,
      `Rough annual SIEM spend: ${f.spend}`,
      "",
      f.note,
    ].join("\n");
    window.location.href = `mailto:hello@whycrew.com?subject=${encodeURIComponent(
      `Discovery call — ${f.company || "MSSP"}`
    )}&body=${encodeURIComponent(body)}`;
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
        <p className="mt-6 border-l-2 border-own pl-4 text-[14.5px] leading-relaxed text-muted">
          Prefer email? Write us directly at{" "}
          <a href="mailto:hello@whycrew.com" className="text-own hover:underline">
            hello@whycrew.com
          </a>
          .
        </p>
      </div>

      {/* form */}
      <form onSubmit={submit} className="card p-7">
        <div className="grid gap-4 sm:grid-cols-2">
          <input className={input} placeholder="Your name" value={f.name} onChange={set("name")} required />
          <input className={input} placeholder="MSSP / company" value={f.company} onChange={set("company")} required />
        </div>
        <div className="mt-4">
          <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">Current SIEM</div>
          <div className="flex flex-wrap gap-2">
            {SIEMS.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setF({ ...f, siem: s })}
                className={`rounded-lg border px-3 py-2 text-[13px] transition-colors ${
                  f.siem === s ? "border-own bg-own/10 text-text" : "border-line text-muted hover:text-text"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <input className={input} placeholder="Clients / tenants (e.g. 25)" value={f.tenants} onChange={set("tenants")} />
          <input className={input} placeholder="Annual SIEM spend (e.g. $280k)" value={f.spend} onChange={set("spend")} />
        </div>
        <textarea
          className={`${input} mt-4 min-h-[90px] resize-y`}
          placeholder="Anything else? (optional)"
          value={f.note}
          onChange={set("note")}
        />
        <button type="submit" className="btn btn-gold mt-5 w-full justify-center">
          Book my discovery call <ArrowUpRight size={16} />
        </button>
        <p className="mt-3 text-center font-mono text-[11px] text-muted-2">
          Opens your email client, pre-filled. Nothing is sent until you hit send.
        </p>
      </form>
    </div>
  );
}
