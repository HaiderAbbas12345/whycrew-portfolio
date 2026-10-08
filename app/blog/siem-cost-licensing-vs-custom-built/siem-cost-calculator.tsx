"use client";

import { useState } from "react";

/**
 * List-price rates behind the estimate, as published in the content doc.
 *
 * sP/s100: Sentinel-style per-GB rate, pay-as-you-go and at the 100 GB/day
 * commitment tier. sInc: days of retention included in the analytics tier;
 * anything beyond is priced as data-lake storage at sLake per GB-month after
 * sComp:1 compression. eIn/eRet: serverless per-GB ingest and per GB-month
 * retention. pe: per-employee monthly rate. mL/mH: managed SIEM per-endpoint
 * monthly range, with fL/fH as the monthly floor. sal/ws: BLS median analyst
 * wage and wages' share of total compensation.
 */
const R = {
  sP: 4.3,
  s100: 2.96,
  sInc: 90,
  sLake: 0.026,
  sComp: 6,
  eIn: 0.11,
  eRet: 0.019,
  pe: 16,
  mL: 8,
  mH: 50,
  fL: 3000,
  fH: 5000,
  sal: 129180,
  ws: 0.7,
};

/** Fully loaded cost of one analyst. */
const LOADED = R.sal / R.ws;

const usd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

/** Blank, negative or non-numeric input counts as zero. */
const num = (s: string) => {
  const x = Number(s);
  return Number.isFinite(x) && x > 0 ? x : 0;
};

const FIELD =
  "w-full rounded-md border border-line bg-void px-3 py-2.5 font-mono text-[15px] text-bright focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/40";
const LABEL =
  "font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-faint";
const SUFFIX =
  "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[11px] text-faint";

export function SiemCostCalculator() {
  const [gbIn, setGb] = useState("50");
  const [retIn, setRet] = useState("90");
  const [empIn, setEmp] = useState("300");
  const [epIn, setEp] = useState("400");
  const [anIn, setAn] = useState("2");

  const gb = Math.max(num(gbIn), 1);
  const ret = num(retIn);
  const emp = num(empIn);
  const ep = num(epIn);
  const an = Math.round(num(anIn));
  const staff = an * LOADED;

  const rate = gb >= 100 ? R.s100 : R.sP;
  const sentinel =
    gb * 365 * rate +
    ((gb * Math.max(ret - R.sInc, 0)) / R.sComp) * R.sLake * 12;
  const serverless = gb * 365 * R.eIn + gb * ret * R.eRet * 12;
  const perEmployee = emp * R.pe * 12;
  const managedLow = Math.max(ep * R.mL, R.fL) * 12;
  const managedHigh = Math.max(ep * R.mH, R.fH) * 12;

  const cards: {
    title: string;
    model: string;
    platform: string;
    withStaff: string | null;
    note: string;
  }[] = [
    {
      title: "Cloud SIEM, per GB",
      model: `Microsoft Sentinel-style at $${rate.toFixed(2)}/GB`,
      platform: usd(sentinel),
      withStaff: usd(sentinel + staff),
      note:
        gb >= 100
          ? "100 GB/day commitment-tier rate. Includes data lake storage beyond 90 days."
          : "Pay-as-you-go rate. Commitment tiers start at 100 GB/day.",
    },
    {
      title: "Low-Cost SIEM, per GB",
      model: "Serverless SIEM (lowest published per-GB rates)",
      platform: usd(serverless),
      withStaff: usd(serverless + staff),
      note: "Cheapest rate card, but you do more of the detection engineering.",
    },
    {
      title: "Per-Employee SIEM",
      model: "$16/employee/month, unlimited data",
      platform: usd(perEmployee),
      withStaff: usd(perEmployee + staff),
      note: "Predictable when log volume is high and headcount is modest.",
    },
    {
      title: "Managed SIEM",
      model: "$8–$50/endpoint/month",
      platform: `${usd(managedLow)} – ${usd(managedHigh)}`,
      withStaff: null,
      note: "Analysts included. Check what retention and response hours are covered.",
    },
  ];

  return (
    <section
      aria-label="SIEM cost calculator"
      className="mt-6 rounded-lg border border-line bg-surface/70 p-5 sm:p-7"
    >
      <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-accent">
        Free tool
      </p>
      <p className="mt-3 text-[15px] leading-[1.7] text-body">
        Estimate your annual SIEM cost across four pricing models. All figures
        are list prices in USD.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3.5 sm:grid-cols-6">
        <label htmlFor="c-gb" className="flex min-w-0 flex-col gap-1.5 sm:col-span-3">
          <span className={LABEL}>Daily log volume</span>
          <span className="relative flex">
            <input
              id="c-gb"
              type="number"
              inputMode="numeric"
              min={1}
              max={2000}
              value={gbIn}
              onChange={(e) => setGb(e.target.value)}
              className={`${FIELD} pr-16`}
            />
            <span className={SUFFIX}>GB/day</span>
          </span>
        </label>
        <label htmlFor="c-ret" className="flex min-w-0 flex-col gap-1.5 sm:col-span-3">
          <span className={LABEL}>Searchable retention</span>
          <select
            id="c-ret"
            value={retIn}
            onChange={(e) => setRet(e.target.value)}
            className={FIELD}
          >
            <option value="30">30 days</option>
            <option value="90">90 days</option>
            <option value="180">180 days</option>
            <option value="365">12 months</option>
          </select>
        </label>
        <label htmlFor="c-emp" className="flex min-w-0 flex-col gap-1.5 sm:col-span-2">
          <span className={LABEL}>Employees</span>
          <input
            id="c-emp"
            type="number"
            inputMode="numeric"
            min={1}
            max={100000}
            value={empIn}
            onChange={(e) => setEmp(e.target.value)}
            className={FIELD}
          />
        </label>
        <label htmlFor="c-ep" className="flex min-w-0 flex-col gap-1.5 sm:col-span-2">
          <span className={LABEL}>Endpoints and servers</span>
          <input
            id="c-ep"
            type="number"
            inputMode="numeric"
            min={1}
            max={100000}
            value={epIn}
            onChange={(e) => setEp(e.target.value)}
            className={FIELD}
          />
        </label>
        <label
          htmlFor="c-an"
          className="col-span-2 flex min-w-0 flex-col gap-1.5 sm:col-span-2"
        >
          <span className={LABEL}>Your security analysts</span>
          <span className="relative flex">
            <input
              id="c-an"
              type="number"
              inputMode="numeric"
              min={0}
              max={50}
              value={anIn}
              onChange={(e) => setAn(e.target.value)}
              className={`${FIELD} pr-12`}
            />
            <span className={SUFFIX}>FTE</span>
          </span>
        </label>
      </div>

      <div aria-live="polite" className="mt-6 grid gap-3 sm:grid-cols-2">
        {cards.map((c) => (
          <div
            key={c.title}
            className="flex min-w-0 flex-col rounded-lg border border-line/70 bg-surface-2/50 p-4"
          >
            <h4 className="text-[15px] font-semibold text-bright">{c.title}</h4>
            <p className="mt-0.5 font-mono text-[11.5px] leading-snug text-faint">
              {c.model}
            </p>
            <dl className="mt-3.5 mb-3 grid gap-2">
              <div>
                <dt className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-faint">
                  {c.withStaff === null ? "Service fee / year" : "Platform / year"}
                </dt>
                <dd className="mt-0.5 text-[1.4rem] font-bold tabular-nums tracking-tight text-warn">
                  {c.platform}
                </dd>
              </div>
              {c.withStaff !== null && (
                <div>
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-faint">
                    With your {an} analyst{an === 1 ? "" : "s"}
                  </dt>
                  <dd className="mt-0.5 font-semibold tabular-nums text-bright">
                    {c.withStaff}
                  </dd>
                </div>
              )}
            </dl>
            <p className="mt-auto text-[13px] leading-relaxed text-body">
              {c.note}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-5 rounded-r-md border-l-[3px] border-warn bg-warn/10 px-4 py-3.5 text-[14px] leading-relaxed text-body">
        Covering one analyst seat 24/7 takes about 5 full-time analysts, roughly{" "}
        <strong className="font-semibold text-bright">{usd(5 * LOADED)}</strong>{" "}
        a year at US median pay. That is why many teams buy managed SIEM.
      </p>
      <p className="mt-3 text-[12px] leading-relaxed text-faint">
        Assumptions: analysts at the BLS median of {usd(R.sal)} plus benefits
        (wages are 70% of total compensation), so {usd(LOADED)} each. Excludes
        deployment, integrations, add-on modules, taxes and negotiated
        discounts, which are often 20–40% off list. Estimates only, not quotes.
      </p>
    </section>
  );
}
