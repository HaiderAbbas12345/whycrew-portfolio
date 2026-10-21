"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Rates behind the estimate, as published in the design.
 *
 * Managed tools: Huntress rates per endpoint (EDR), identity (ITDR), data
 * source (SIEM, 50-source minimum) and learner (awareness training), volume
 * price at the low end and list price at the high end. The other three levels
 * are the per-endpoint and per-user ranges quoted in the article. IN_HOUSE is
 * five analysts at the BLS median of $129,180.
 */
const IN_HOUSE = 645900;
const SIEM_MIN_SOURCES = 50;

type Level = "tools" | "mdr" | "mssp" | "it";

const LEVEL_KEYS: Level[] = ["tools", "mdr", "mssp", "it"];

const LEVELS: Record<Level, { name: string; hint: string; note: string }> = {
  tools: {
    name: "Managed tools",
    hint: "Tools + vendor SOC",
    note: "Software plus a vendor SOC watching alerts. Deployment and day-to-day management are extra.",
  },
  mdr: {
    name: "MDR",
    hint: "$8–$30 / endpoint",
    note: "A team that investigates and contains threats on your endpoints.",
  },
  mssp: {
    name: "Full MSSP",
    hint: "$50–$200 / user",
    note: "24/7 monitoring and response across endpoints, identity, network and cloud, plus reporting.",
  },
  it: {
    name: "MSSP + managed IT",
    hint: "$100–$350 / user",
    note: "Full managed security plus help desk, patching and device management.",
  },
};

const COVERAGE = { full: "Fully managed, 24/7", co: "Co-managed" } as const;
const INDUSTRY = {
  general: "General business",
  health: "Healthcare (HIPAA)",
  finance: "Financial services",
  defense: "Defense (CMMC, DFARS)",
  retail: "Retail (PCI DSS)",
} as const;
const CONTRACT = {
  monthly: "12 months, monthly",
  prepaid: "Prepaid or multi-year",
} as const;

interface Inputs {
  users: string;
  laptops: string;
  servers: string;
  sources: string;
  level: Level;
  coverage: keyof typeof COVERAGE;
  industry: keyof typeof INDUSTRY;
  contract: keyof typeof CONTRACT;
  ir: boolean;
  irhours: string;
}

/** The worked example from the article: 100 users, 150 endpoints. */
const DEF: Inputs = {
  users: "100",
  laptops: "120",
  servers: "30",
  sources: "20",
  level: "mssp",
  coverage: "full",
  industry: "general",
  contract: "monthly",
  ir: true,
  irhours: "40",
};

const STORAGE_KEY = "mc-calc";

/** Blank, non-numeric or below-minimum input counts as the minimum. */
function num(s: string, min: number) {
  const v = parseFloat(s);
  return Math.round(Number.isFinite(v) && v >= min ? v : min);
}

const usd = (v: number) => "$" + Math.round(v).toLocaleString("en-US");
const usd2 = (v: number) =>
  "$" +
  v.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

interface Scenario {
  users: number;
  laptops: number;
  servers: number;
  sources: number;
  coverage: Inputs["coverage"];
  industry: Inputs["industry"];
  contract: Inputs["contract"];
  ir: boolean;
  irhours: number;
}

function base(level: Level, s: Scenario): [number, number] {
  const e = Math.max(s.laptops + s.servers, 1);
  const u = s.users;
  const src = Math.max(s.sources, SIEM_MIN_SOURCES);
  if (level === "tools")
    return [
      e * 7.99 + u * 3.6 + src * 3.5 + u * 1.75,
      e * 8.99 + u * 4.8 + src * 4.0 + u * 2.08,
    ];
  if (level === "mdr") return [e * 8, e * 30];
  if (level === "mssp") return [u * 50, u * 200];
  return [u * 100, u * 350];
}

function estimate(level: Level, s: Scenario) {
  let [lo, hi] = base(level, s);
  const steps: [string, number, number][] = [
    [`${LEVELS[level].name} base rate`, lo, hi],
  ];
  if (s.coverage === "co" && level !== "tools") {
    hi = (lo + hi) / 2;
    steps.push(["Co-managed: lower half of range", lo, hi]);
  }
  if (
    (s.industry === "health" || s.industry === "finance") &&
    (level === "mssp" || level === "it")
  ) {
    lo *= 1.2;
    hi *= 1.4;
    steps.push(["Compliance premium (20% to 40%)", lo, hi]);
  }
  if (s.contract === "prepaid") {
    lo *= 0.8;
    hi *= 0.9;
    steps.push(["Prepaid or multi-year discount (10% to 20%)", lo, hi]);
  }
  let irLo = 0;
  let irHi = 0;
  if (!s.ir) {
    irLo = (s.irhours * 150) / 12;
    irHi = (s.irhours * 400) / 12;
    lo += irLo;
    hi += irHi;
  }
  return { lo, hi, steps, irLo, irHi };
}

const FIELD =
  "w-full rounded-md border border-line bg-void px-3 py-2.5 font-mono text-[15px] text-bright focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/40";
const SELECT =
  "w-full rounded-md border border-line bg-void px-3 py-2.5 text-[14px] text-bright focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/40";
const LABEL =
  "font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-faint";
const BTN =
  "inline-flex cursor-pointer items-center rounded-md px-[18px] py-3 text-[14px] font-semibold transition-colors";

export function MsspPricingCalculator() {
  const [v, setV] = useState<Inputs>(DEF);
  const [toast, setToast] = useState("");
  const [fallback, setFallback] = useState<string | null>(null);
  const fallbackRef = useRef<HTMLTextAreaElement>(null);
  const loaded = useRef(false);

  // Restore the last scenario after hydration, so the server HTML (the worked
  // example) and the first client render agree.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (saved && saved.level in LEVELS) {
        const next = { ...DEF };
        for (const k of Object.keys(DEF) as (keyof Inputs)[]) {
          if (saved[k] !== undefined && saved[k] !== null) {
            (next as Record<string, unknown>)[k] =
              typeof DEF[k] === "string" ? String(saved[k]) : saved[k];
          }
        }
        setV(next);
      }
    } catch {
      /* storage blocked or corrupt — keep the example */
    }
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
    } catch {
      /* storage blocked — the estimate still works */
    }
  }, [v]);

  useEffect(() => {
    if (fallback !== null) {
      fallbackRef.current?.focus();
      fallbackRef.current?.select();
    }
  }, [fallback]);

  const set = <K extends keyof Inputs>(k: K, val: Inputs[K]) =>
    setV((p) => ({ ...p, [k]: val }));

  const s: Scenario = {
    users: num(v.users, 1),
    laptops: num(v.laptops, 0),
    servers: num(v.servers, 0),
    sources: num(v.sources, 0),
    coverage: v.coverage,
    industry: v.industry,
    contract: v.contract,
    ir: v.ir,
    irhours: num(v.irhours, 0),
  };
  const e = Math.max(s.laptops + s.servers, 1);
  const est = estimate(v.level, s);

  const all = LEVEL_KEYS.map((k) => ({ k, ...estimate(k, s) }));
  const max = Math.max(...all.map((a) => a.hi)) || 1;

  const rows: [string, string][] = est.steps.map((st) => [
    st[0],
    `${usd(st[1])} to ${usd(st[2])}`,
  ]);
  if (!s.ir)
    rows.push([
      `Incident response, ${s.irhours} hrs a year`,
      `${usd(est.irLo)} to ${usd(est.irHi)}`,
    ]);
  if (s.industry === "defense" || s.industry === "retail")
    rows.push(["Compliance retention and reporting", "Quoted separately"]);
  rows.push([
    `MSSP Alert benchmark, ${e} endpoints × $45 to $73`,
    `${usd(e * 45)} to ${usd(e * 73)}`,
  ]);

  const copy = () => {
    const text = [
      "MSSP cost estimate (WhyCrew MSSP Pricing Calculator)",
      `Service level: ${LEVELS[v.level].name} | Coverage: ${COVERAGE[v.coverage]}`,
      `Users: ${s.users} | Endpoints: ${e} | Log sources: ${s.sources}`,
      `Industry: ${INDUSTRY[v.industry]} | Contract: ${CONTRACT[v.contract]}`,
      `Monthly: ${usd(est.lo)} to ${usd(est.hi)}`,
      `Annual: ${usd(est.lo * 12)} to ${usd(est.hi * 12)}`,
      "One-time onboarding: $0 to $5,000+",
      "Planning estimate from public 2026 pricing data, not a quote.",
    ].join("\n");
    const ok = () => {
      setToast("Estimate copied");
      setFallback(null);
    };
    const no = () => {
      setFallback(text);
      setToast("Select and copy the text below");
    };
    try {
      navigator.clipboard.writeText(text).then(ok, no);
    } catch {
      no();
    }
  };

  const reset = () => {
    setV(DEF);
    setToast("Example restored");
  };

  const numField = (
    id: string,
    k: "users" | "laptops" | "servers" | "sources" | "irhours",
    label: string,
    min: number,
    maxVal: number
  ) => (
    <label htmlFor={id} className="flex min-w-0 flex-col gap-1.5">
      <span className={LABEL}>{label}</span>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={min}
        max={maxVal}
        value={v[k]}
        onChange={(ev) => set(k, ev.target.value)}
        className={FIELD}
      />
    </label>
  );

  return (
    <section
      aria-label="MSSP pricing calculator"
      className="mt-6 rounded-lg border border-line bg-surface/70 p-5 sm:p-[26px]"
    >
      <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-accent">
        Free tool · MSSP Pricing Calculator
      </p>
      <p className="mt-3 text-[15px] leading-[1.7] text-body">
        Estimate your monthly managed security cost. All figures are 2026 US
        prices in USD.
      </p>

      <div className="mt-5 grid gap-[22px]">
        <form
          className="grid min-w-0 gap-3.5"
          noValidate
          onSubmit={(ev) => ev.preventDefault()}
        >
          <div className="grid grid-cols-1 items-end gap-3 min-[560px]:grid-cols-2 min-[700px]:grid-cols-4">
            {numField("mc-users", "users", "Employees or users", 1, 100000)}
            {numField("mc-laptops", "laptops", "Laptops and workstations", 0, 200000)}
            {numField("mc-servers", "servers", "Servers and cloud workloads", 0, 100000)}
            {numField("mc-sources", "sources", "Log sources", 0, 10000)}
          </div>

          <div role="radiogroup" aria-label="Service level">
            <p className={LABEL}>Service level</p>
            <div className="mt-2 grid grid-cols-2 gap-2 min-[700px]:grid-cols-4">
              {LEVEL_KEYS.map((k) => (
                <label key={k} className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="mc-level"
                    id={`mc-lv-${k}`}
                    value={k}
                    checked={v.level === k}
                    onChange={() => set("level", k)}
                    className="peer absolute inset-0 opacity-0"
                  />
                  <span className="flex h-full flex-col gap-0.5 rounded-lg border border-line bg-void px-3 py-2.5 transition-colors peer-checked:border-accent peer-checked:bg-accent/10 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                    <b className="text-[14px] font-semibold text-bright">
                      {LEVELS[k].name}
                    </b>
                    <small className="font-mono text-[11px] leading-snug text-faint">
                      {LEVELS[k].hint}
                    </small>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 items-end gap-3 min-[560px]:grid-cols-3">
            <label htmlFor="mc-coverage" className="flex min-w-0 flex-col gap-1.5">
              <span className={LABEL}>Coverage</span>
              <select
                id="mc-coverage"
                value={v.coverage}
                onChange={(ev) =>
                  set("coverage", ev.target.value as Inputs["coverage"])
                }
                className={SELECT}
              >
                {Object.entries(COVERAGE).map(([k, t]) => (
                  <option key={k} value={k}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="mc-industry" className="flex min-w-0 flex-col gap-1.5">
              <span className={LABEL}>Industry</span>
              <select
                id="mc-industry"
                value={v.industry}
                onChange={(ev) =>
                  set("industry", ev.target.value as Inputs["industry"])
                }
                className={SELECT}
              >
                {Object.entries(INDUSTRY).map(([k, t]) => (
                  <option key={k} value={k}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="mc-contract" className="flex min-w-0 flex-col gap-1.5">
              <span className={LABEL}>Contract</span>
              <select
                id="mc-contract"
                value={v.contract}
                onChange={(ev) =>
                  set("contract", ev.target.value as Inputs["contract"])
                }
                className={SELECT}
              >
                {Object.entries(CONTRACT).map(([k, t]) => (
                  <option key={k} value={k}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label
            htmlFor="mc-ir"
            className="flex items-start gap-2.5 text-[14.5px] text-bright"
          >
            <input
              id="mc-ir"
              type="checkbox"
              checked={v.ir}
              onChange={(ev) => set("ir", ev.target.checked)}
              className="mt-1 size-4 accent-accent"
            />
            <span>Plan includes hands-on incident response</span>
          </label>
          {!v.ir &&
            numField(
              "mc-irhours",
              "irhours",
              "Expected response hours a year ($150–$400 an hour)",
              0,
              5000
            )}
        </form>

        <div
          aria-live="polite"
          className="min-w-0 rounded-lg border border-line/70 bg-surface-2/50 p-[18px]"
        >
          <p className={LABEL}>Estimated monthly cost</p>
          <p className="mt-1.5 mb-1 text-[clamp(1.6rem,4vw,2.2rem)] font-bold leading-[1.15] tabular-nums tracking-tight text-warn">
            {usd(est.lo)}
            <span className="px-[0.3em] text-[0.55em] font-medium text-faint">
              to
            </span>
            {usd(est.hi)}
          </p>
          <p className="mb-3.5 text-[13.5px] leading-relaxed text-body">
            {LEVELS[v.level].note}
          </p>

          <dl className="mb-4 grid grid-cols-2 gap-2.5">
            {[
              ["Per year", `${usd(est.lo * 12)} to ${usd(est.hi * 12)}`],
              ["Per user / month", `${usd2(est.lo / s.users)} to ${usd2(est.hi / s.users)}`],
              ["Per endpoint / month", `${usd2(est.lo / e)} to ${usd2(est.hi / e)}`],
              ["One-time onboarding", "$0 to $5,000+"],
            ].map(([k, val]) => (
              <div key={k} className="min-w-0 border-t border-line/70 pt-2">
                <dt className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-faint">
                  {k}
                </dt>
                <dd className="mt-0.5 break-words font-mono text-[14px] font-semibold tabular-nums text-bright">
                  {val}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-1 mb-[22px] grid gap-4">
            {all.map((a) => {
              const on = a.k === v.level;
              const left = (a.lo / max) * 100;
              const width = Math.max(((a.hi - a.lo) / max) * 100, 1.2);
              return (
                <div
                  key={a.k}
                  className="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-2.5 text-[12.5px]"
                >
                  <span className={on ? "font-semibold text-bright" : "text-faint"}>
                    {LEVELS[a.k].name}
                  </span>
                  <div className="relative h-[18px] rounded bg-void">
                    <div
                      className={`absolute inset-y-0 rounded transition-[left,width] duration-250 ease-out motion-reduce:transition-none ${
                        on ? "bg-accent" : "bg-[#0d9488] opacity-55"
                      }`}
                      style={{ left: `${left.toFixed(2)}%`, width: `${width.toFixed(2)}%` }}
                    />
                    <span className="absolute top-[21px] left-0 whitespace-nowrap font-mono text-[10.5px] leading-none text-faint">
                      {usd(a.lo)} to {usd(a.hi)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <table className="w-full min-w-0 border-collapse text-[13px]">
            <tbody>
              {rows.map(([k, val]) => (
                <tr key={k}>
                  <td className="border-b border-line/70 py-[7px] align-top text-body">
                    {k}
                  </td>
                  <td className="border-b border-line/70 py-[7px] pl-2.5 text-right align-top font-mono whitespace-nowrap text-bright">
                    {val}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={copy}
              className={`${BTN} bg-accent text-void hover:bg-accent-hi`}
            >
              Copy estimate
            </button>
            <button
              type="button"
              onClick={reset}
              className={`${BTN} border border-line text-bright hover:bg-surface-2`}
            >
              Reset example
            </button>
            <span role="status" className="font-mono text-[12px] text-faint">
              {toast}
            </span>
          </div>
          {fallback !== null && (
            <textarea
              ref={fallbackRef}
              readOnly
              aria-label="Estimate text"
              value={fallback}
              className="mt-2.5 min-h-[110px] w-full rounded-md border border-line/70 bg-void p-2 font-mono text-[12px] leading-normal text-body"
            />
          )}
        </div>
      </div>

      <p className="mt-[18px] mb-2.5 rounded-r-md border-l-[3px] border-warn bg-warn/10 px-4 py-3.5 text-[14.5px] leading-relaxed text-body">
        Staffing one 24/7 security seat in-house takes about five analysts,
        roughly <strong className="font-semibold text-bright">{usd(IN_HOUSE)}</strong>{" "}
        a year in base pay alone. The top of this estimate is about{" "}
        <strong className="font-semibold text-bright">
          {Math.round(((est.hi * 12) / IN_HOUSE) * 100)}%
        </strong>{" "}
        of that.
      </p>
      <p className="text-[12.5px] leading-[1.55] text-faint">
        How it works: managed tools use Huntress list rates (EDR, identity, SIEM
        with a 50-source minimum, awareness training). MDR uses $8 to $30 per
        endpoint, a full MSSP $50 to $200 per user and MSSP with managed IT $100
        to $350 per user; the MSSP Alert benchmark of $45 to $73 per endpoint is
        shown as a cross-check. Co-managed coverage uses the lower half of each
        range, healthcare and financial services add a 20% to 40% compliance
        premium, and prepaid or multi-year contracts take 10% to 20% off.
        Planning estimates from public 2026 data, not quotes.
      </p>
    </section>
  );
}
