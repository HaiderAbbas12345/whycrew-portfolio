"use client";

import { useEffect, useRef, useState } from "react";
import s from "./interactives.module.css";

/*
 * The article's three interactive blocks, with the copy, timings and formulas
 * taken from the design: a five-stage pipeline tour, a three-event
 * correlation replay and a storage estimator.
 */

const EYEBROW =
  "m-0 font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-accent";
const CHIP =
  "rounded-lg border border-[#26345c] px-[9px] py-[7px] font-mono text-[12.5px] font-medium leading-none";

const on = (base: string, active: boolean) => (active ? `${base} ${s.on}` : base);

/* ------------------------------------------------------- pipeline tour */

const STAGES = [
  { name: "Collect", sub: "Agents, syslog, APIs", title: "Collect", body: "Agents on servers and laptops, syslog from network devices and API connections to cloud services bring security events into the SIEM.", chips: ["Agents", "Syslog", "Cloud APIs"] },
  { name: "Normalize", sub: "One schema, more context", title: "Normalize and enrich", body: "Every product writes logs its own way. The SIEM maps fields like user, host and IP address into one shared format, then adds context such as who owns a server or whether an IP is known to be malicious.", chips: ["OCSF", "ECS", "Enrichment"] },
  { name: "Store", sub: "Index for fast search", title: "Store and index", body: "Events are indexed in a search engine or analytics database so analysts can search them quickly, with hot, warm and cold tiers to control storage cost.", chips: ["OpenSearch", "ClickHouse", "Hot / warm / cold"] },
  { name: "Detect", sub: "Rules and correlation", title: "Detect and correlate", body: "Simple rules flag single risky events. Correlation rules link related events from different sources into one alert. This is the step that turns logs into a security tool.", chips: ["Sigma", "MITRE ATT&CK", "Correlation"] },
  { name: "Respond", sub: "Investigate and act", title: "Investigate and respond", body: "Analysts review the evidence and work out what happened. SOAR playbooks handle repeat steps, with a human sign-off for big actions like disabling an account.", chips: ["SOAR", "Case management", "Analyst review"] },
];

const LOOP = {
  eyebrow: "Tuning loop",
  title: "Feed lessons back into detection",
  body: "Analyst feedback goes back into the detection rules. Tuning cuts false alarms and closes gaps, which is what keeps a SIEM useful over time.",
  chips: ["Analyst feedback", "Rule tuning", "Fewer false alarms"],
};

/** Index 5 is the tuning loop, which sits outside the five-stage cycle. */
const LOOP_INDEX = 5;

export function PipelineTour() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setActive((a) => (a >= 4 ? 0 : a + 1)), 3200);
    return () => clearInterval(t);
  }, [playing]);

  const detail =
    active === LOOP_INDEX
      ? LOOP
      : {
          eyebrow: `Stage 0${active + 1} of 05`,
          title: STAGES[active].title,
          body: STAGES[active].body,
          chips: STAGES[active].chips,
        };

  return (
    <figure
      className="mt-7 mb-8"
      aria-label="Interactive diagram: how an open source SIEM works"
    >
      <div className="overflow-hidden rounded-[20px] border border-line bg-[radial-gradient(ellipse_600px_300px_at_20%_0%,rgba(47,92,255,.14),transparent_70%),#070c19] p-[22px] pb-5">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <p className={EYEBROW}>Interactive · select a stage</p>
          <button
            type="button"
            className={on(s.ctl, playing)}
            aria-pressed={playing}
            onClick={() => {
              setPlaying((p) => !p);
              setActive((a) => (a === LOOP_INDEX ? 0 : a));
            }}
          >
            {playing ? "Pause tour" : "Play tour"}
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[10.5px] font-semibold uppercase leading-none tracking-[0.16em] text-faint">
            Sources
          </span>
          {["Endpoints", "Network", "Cloud", "Applications"].map((x) => (
            <span key={x} className={CHIP}>
              {x}
            </span>
          ))}
          <span aria-hidden className="text-lg leading-none text-accent">
            ↓
          </span>
        </div>

        <div className={s.scene}>
          <div className={s.plane}>
            {STAGES.map((d, i) => (
              <button
                key={d.name}
                type="button"
                className={on(s.block, i === active)}
                aria-pressed={i === active}
                onClick={() => {
                  setActive(i);
                  setPlaying(false);
                }}
              >
                <span className={s.num}>0{i + 1}</span>
                <span className={s.name}>{d.name}</span>
                <span className={s.sub}>{d.sub}</span>
              </button>
            ))}
            <div className={s.track} aria-hidden>
              <span className={s.dot} />
              <span className={`${s.dot} ${s.dot2}`} />
              <span className={`${s.dot} ${s.dot3}`} />
            </div>
          </div>
        </div>

        <div className="mt-1 flex justify-end">
          <button
            type="button"
            className={on(s.ctl, active === LOOP_INDEX)}
            aria-pressed={active === LOOP_INDEX}
            onClick={() => {
              setActive(LOOP_INDEX);
              setPlaying(false);
            }}
          >
            ↺ Tuning loop: Respond → Detect
          </button>
        </div>

        <div
          aria-live="polite"
          className="mt-4 rounded-2xl border border-line bg-[rgba(13,20,36,.7)] px-5 py-[18px]"
        >
          <p className="m-0 mb-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-brand-hi">
            {detail.eyebrow}
          </p>
          <p className="m-0 mb-2 text-xl font-semibold leading-[1.3] text-bright">
            {detail.title}
          </p>
          <p className="m-0 mb-3 text-[15px] leading-[1.6] text-body">
            {detail.body}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {detail.chips.map((c) => (
              <span key={c} className={`${CHIP} text-[#dbe3f4]`}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-[13.5px] text-faint">
        Raw logs become alerts in five stages
      </figcaption>
    </figure>
  );
}

/* ---------------------------------------------------- correlation replay */

const EVENTS = [
  { time: "21:04", src: "Identity provider", txt: "Burst of failed sign-ins on one account" },
  { time: "21:09", src: "Endpoint / VPN", txt: "Sign-in from a device never seen before" },
  { time: "21:16", src: "Cloud audit log", txt: "Admin role added to the same account" },
];

/** Signal label and the replay step at which it's satisfied. */
const CHECKS: [string, number][] = [
  ["Same account", 2],
  ["Three different log sources", 3],
  ["All within 15 minutes", 3],
];

export function CorrelationReplay() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  // Ticks spent showing the fired alert before the replay starts over.
  const hold = useRef(0);
  // Read by the timer, so the updater itself stays free of side effects.
  const stepRef = useRef(0);
  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      if (stepRef.current < 3) {
        setStep(stepRef.current + 1);
        return;
      }
      hold.current += 1;
      if (hold.current >= 3) {
        hold.current = 0;
        setStep(0);
      }
    }, 1600);
    return () => clearInterval(t);
  }, [playing]);

  const fired = step >= 3;

  return (
    <figure
      className="mt-7 mb-8"
      aria-label="Interactive diagram: three events correlated into one alert"
    >
      <div className="overflow-hidden rounded-[20px] border border-line bg-[radial-gradient(ellipse_600px_300px_at_85%_100%,rgba(240,169,107,.08),transparent_70%),radial-gradient(ellipse_500px_260px_at_10%_0%,rgba(47,92,255,.12),transparent_70%),#070c19] p-[22px]">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <p className={EYEBROW}>Interactive · select an event</p>
          <button
            type="button"
            className={on(s.ctl, playing)}
            onClick={() => {
              hold.current = 0;
              if (playing) {
                setPlaying(false);
              } else {
                setPlaying(true);
                setStep(0);
              }
            }}
          >
            {playing ? "Pause replay" : "Replay attack"}
          </button>
        </div>

        <div className={s.grid}>
          <div className={s.stackScene}>
            <div className={s.stack}>
              {EVENTS.map((e, i) => (
                <button
                  key={e.time}
                  type="button"
                  className={on(s.ev, i < step)}
                  aria-pressed={i < step}
                  onClick={() => {
                    hold.current = 0;
                    setStep(i + 1);
                    setPlaying(false);
                  }}
                >
                  <span className={s.time}>{e.time}</span>
                  <span>
                    <span className={s.src}>{e.src}</span>
                    <span className={s.txt}>{e.txt}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div aria-live="polite">
            <div className="rounded-2xl border border-dashed border-[#26345c] px-[18px] py-3.5">
              <p className="m-0 mb-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-faint">
                Correlation rule · {step} of 3 signals
              </p>
              {CHECKS.map(([label, at]) => (
                <div key={label} className={on(s.chk, step >= at)}>
                  <span className={s.box} aria-hidden>
                    ✓
                  </span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className={on(s.alert, fired)}>
              <div className="flex items-center justify-between gap-2.5">
                <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#f0a96b]">
                  {fired ? "One alert" : "Waiting for evidence"}
                </span>
                <span className={s.badge}>{fired ? "HIGH" : "NONE"}</span>
              </div>
              <p className="m-0 mt-2.5 mb-1.5 text-xl font-semibold leading-[1.3] text-bright">
                {fired
                  ? "Possible account takeover"
                  : step === 0
                    ? "No events yet"
                    : "Looks harmless on its own"}
              </p>
              <p className="m-0 text-[14.5px] leading-[1.55] text-body">
                {fired
                  ? "Evidence from all three systems in one alert, ready for an analyst to check before anyone acts."
                  : "A single event like this is common. The SIEM keeps watching for related activity on the same account."}
              </p>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-[13.5px] text-faint">
        Three ordinary events add up to one alert
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------ storage estimator */

/** Decimal units, matching the design: 1 TB = 1,000 GB. */
const fmt = (gb: number) =>
  gb >= 1000
    ? `${(gb / 1000).toFixed(gb >= 10000 ? 1 : 2)} TB`
    : `${gb.toFixed(gb >= 100 ? 0 : 1)} GB`;

const n = (v: number) => v.toLocaleString("en-US");

const ROW = "mt-3.5 flex items-center justify-between gap-3";
const LBL = "text-[14.5px] text-body";
const VAL =
  "whitespace-nowrap font-mono text-[15px] font-semibold leading-none tabular-nums text-bright";
const BIG =
  "m-0 text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] tabular-nums text-bright";
const TILE_LBL =
  "m-0 mb-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em]";

export function StorageEstimator() {
  const [eps, setEps] = useState(1000);
  const [size, setSize] = useState(800);
  const [days, setDays] = useState(90);
  const [replica, setReplica] = useState(false);

  const dailyGB = (eps * size * 86400) / 1e9;
  const totalGB = dailyGB * days;
  const storedGB = totalGB * (replica ? 2 : 1);

  return (
    <div
      role="group"
      aria-label="Interactive SIEM storage estimator"
      className="mt-2 mb-6 rounded-[20px] border border-line bg-[radial-gradient(ellipse_520px_240px_at_100%_0%,rgba(45,212,168,.08),transparent_70%),#070c19] px-6 py-[22px]"
    >
      <div className="mb-3.5 flex flex-wrap items-baseline justify-between gap-2">
        <p className="m-0 text-lg font-semibold leading-[1.3] text-bright">
          SIEM storage estimator
        </p>
        <p className={EYEBROW}>Move the sliders</p>
      </div>

      <div className={ROW}>
        <label className={LBL} htmlFor="wcst-eps">
          Average events per second (EPS)
        </label>
        <span className={VAL}>{n(eps)}</span>
      </div>
      <input
        id="wcst-eps"
        className={s.range}
        type="range"
        min={100}
        max={20000}
        step={100}
        value={eps}
        onChange={(e) => setEps(Number(e.target.value))}
      />

      <div className={ROW}>
        <label className={LBL} htmlFor="wcst-size">
          Average event size
        </label>
        <span className={VAL}>{n(size)} bytes</span>
      </div>
      <input
        id="wcst-size"
        className={s.range}
        type="range"
        min={200}
        max={2000}
        step={50}
        value={size}
        onChange={(e) => setSize(Number(e.target.value))}
      />

      <div className={ROW}>
        <label className={LBL} htmlFor="wcst-days">
          Retention period
        </label>
        <span className={VAL}>{days} days</span>
      </div>
      <input
        id="wcst-days"
        className={s.range}
        type="range"
        min={7}
        max={365}
        step={1}
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
      />

      <div className={`${ROW} mt-[18px]`}>
        <span className={LBL}>Safety copies</span>
        <span className="inline-flex gap-1.5">
          <button
            type="button"
            className={on(s.ctl, !replica)}
            aria-pressed={!replica}
            onClick={() => setReplica(false)}
          >
            None
          </button>
          <button
            type="button"
            className={on(s.ctl, replica)}
            aria-pressed={replica}
            onClick={() => setReplica(true)}
          >
            1 replica
          </button>
        </span>
      </div>

      <div
        aria-live="polite"
        className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 border-t border-line pt-[18px]"
      >
        <div className="rounded-2xl border border-line bg-surface/60 px-[18px] py-4">
          <p className={`${TILE_LBL} text-faint`}>Daily raw data</p>
          <p className={BIG}>{fmt(dailyGB)}</p>
        </div>
        <div className="rounded-2xl border border-line bg-surface/60 px-[18px] py-4">
          <p className={`${TILE_LBL} text-faint`}>Raw total for {days} days</p>
          <p className={BIG}>{fmt(totalGB)}</p>
        </div>
        <div className="rounded-2xl border border-accent/40 bg-accent/6 px-[18px] py-4">
          <p className={`${TILE_LBL} text-accent`}>Stored with copies</p>
          <p className={BIG}>{fmt(storedGB)}</p>
        </div>
      </div>
      <p className="m-0 mt-3.5 text-[13px] leading-[1.55] text-faint">
        Decimal units, constant average event rate. Excludes indexing overhead,
        compression and backups, which change the real figure.
      </p>
    </div>
  );
}
