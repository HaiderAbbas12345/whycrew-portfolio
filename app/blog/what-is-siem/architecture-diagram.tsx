import s from "./architecture-diagram.module.css";

const TITLE = "Every log passes five layers before an analyst sees an alert";

const CHIPS = [
  [40, "Identity"],
  [154, "Endpoints"],
  [268, "Firewall / VPN"],
  [382, "Cloud"],
  [496, "Email"],
  [610, "SaaS apps"],
] as const;

const EDGES = [
  { d: "M132 126V158" },
  { d: "M240 186H272" },
  { d: "M488 186H520" },
  { d: "M628 214V230H194V246" },
  { d: "M566 230V246" },
  { d: "M366 282H394", both: true },
  { d: "M566 318V350" },
  { d: "M396 386H366" },
];

/**
 * One pulse per connector, in the design's order and timing. `t` is the
 * keyTimes string for the dot's travel; both pulses leaving Enrichment run
 * together, as do the two leaving Storage and Analytics.
 */
const PULSES = [
  ["M132 126V158", "0;0.0005;0.001;0.1556;0.1606;1"],
  ["M240 186H272", "0;0.1506;0.1556;0.3111;0.3161;1"],
  ["M488 186H520", "0;0.3061;0.3111;0.4667;0.4717;1"],
  ["M628 214V230H194V246", "0;0.4617;0.4667;0.6222;0.6272;1"],
  ["M628 214V230H566V246", "0;0.4617;0.4667;0.6222;0.6272;1"],
  ["M366 282H394", "0;0.6172;0.6222;0.7778;0.7828;1"],
  ["M566 318V350", "0;0.6172;0.6222;0.7778;0.7828;1"],
  ["M396 386H366", "0;0.7728;0.7778;0.9333;0.9383;1"],
] as const;

/** Each box lights up as a pulse arrives in it. */
const HITS = [
  [24, 158, 216, 56, "0;0.1556;0.1756;0.2556;1"],
  [272, 158, 216, 56, "0;0.3111;0.3311;0.4111;1"],
  [520, 158, 216, 56, "0;0.4667;0.4867;0.5667;1"],
  [24, 246, 340, 72, "0;0.6222;0.6422;0.7222;1"],
  [396, 246, 340, 72, "0;0.6222;0.6422;0.7222;1"],
  [396, 350, 340, 72, "0;0.7778;0.7978;0.8778;1"],
  [24, 350, 340, 72, "0;0.9333;0.9533;0.999;1"],
] as const;

const DUR = "9.0s";

function Layer({
  x,
  y,
  w,
  h,
  num,
  name,
  lines,
  main = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  num?: string;
  name: string;
  lines: string[];
  main?: boolean;
}) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx="10" className={main ? s.main : s.box} />
      <text x={x + 16} y={y + 24} className={s.name}>
        {num && <tspan className={s.num}>{`${num} `}</tspan>}
        {name}
      </text>
      {lines.map((l, i) => (
        <text key={l} x={x + 16} y={y + 42 + i * 16} className={s.body}>
          {l}
        </text>
      ))}
    </>
  );
}

export function ArchitectureDiagram() {
  return (
    <figure className={s.frame}>
      <div className={s.scroll}>
        <svg viewBox="0 0 760 446" role="img" aria-labelledby="arch-t arch-d">
          <title id="arch-t">{TITLE}</title>
          <desc id="arch-d">
            Log sources (identity, endpoints, firewall and VPN, cloud, email,
            SaaS apps) flow into collection, then parsing and normalizing, then
            enrichment, then storage and the analytics engine, which feeds the
            analyst workspace used by SOC analysts and SOAR.
          </desc>
          <defs>
            <marker
              id="arch-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0L10 5L0 10z" className={s.head} />
            </marker>
          </defs>

          <text x="24" y="30" className={s.title}>
            {TITLE}
          </text>

          <rect x="24" y="50" width="712" height="76" rx="10" className={s.box} />
          <text x="40" y="72" className={s.name}>
            Log sources
          </text>
          {CHIPS.map(([x, label]) => (
            <g key={label}>
              <rect x={x} y="84" width="102" height="30" rx="6" className={s.chip} />
              <text x={x + 51} y="103" textAnchor="middle" className={s.chipText}>
                {label}
              </text>
            </g>
          ))}

          <g className={s.edge}>
            {EDGES.map((e) => (
              <path
                key={e.d}
                d={e.d}
                markerStart={e.both ? "url(#arch-arrow)" : undefined}
                markerEnd="url(#arch-arrow)"
              />
            ))}
          </g>

          <Layer x={24} y={158} w={216} h={56} num="01" name="Collection" lines={["Agents, syslog, APIs"]} />
          <Layer x={272} y={158} w={216} h={56} num="02" name="Parse and normalize" lines={["Maps logs to common fields"]} />
          <Layer x={520} y={158} w={216} h={56} num="03" name="Enrichment" lines={["Assets, users, threat intel"]} />
          <Layer
            x={24}
            y={246}
            w={340}
            h={72}
            num="04"
            name="Storage"
            lines={["Hot index for fast search", "Long-term retention for audits and forensics"]}
          />
          <Layer
            x={396}
            y={246}
            w={340}
            h={72}
            num="05"
            name="Analytics engine"
            lines={["Correlation rules, UEBA baselines,", "threat intel (IOC) matching"]}
          />
          <Layer
            x={396}
            y={350}
            w={340}
            h={72}
            name="Analyst workspace"
            lines={["Alerts, investigations, dashboards,", "compliance reports"]}
            main
          />
          <Layer
            x={24}
            y={350}
            w={340}
            h={72}
            name="SOC analysts and SOAR"
            lines={["Triage alerts, investigate incidents,", "run response playbooks"]}
          />

          <g className={s.pulse} aria-hidden="true">
            {PULSES.map(([d, t]) => (
              <g key={d}>
                <path d={d} pathLength={100} opacity="0">
                  <animate
                    attributeName="stroke-dashoffset"
                    values="22;22;22;-100;-100;-100"
                    keyTimes={t}
                    dur={DUR}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0;1;1;0;0"
                    keyTimes={t}
                    dur={DUR}
                    repeatCount="indefinite"
                  />
                </path>
                <circle r="4.5" opacity="0">
                  <animateMotion
                    path={d}
                    keyPoints="0;0;0;1;1;1"
                    keyTimes={t}
                    calcMode="linear"
                    dur={DUR}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0;1;1;0;0"
                    keyTimes={t}
                    dur={DUR}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            ))}
          </g>

          <g className={s.hit} aria-hidden="true">
            {HITS.map(([x, y, w, h, t]) => (
              <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="10" opacity="0">
                <animate
                  attributeName="opacity"
                  values="0;0;1;0;0"
                  keyTimes={t}
                  dur={DUR}
                  repeatCount="indefinite"
                />
              </rect>
            ))}
          </g>
        </svg>
      </div>
      <figcaption className={s.caption}>
        Logs enter at the top. Collection, parsing, and enrichment prepare them;
        storage keeps them searchable; the analytics engine finds threats;
        analysts work the alerts in one workspace.
      </figcaption>
    </figure>
  );
}
