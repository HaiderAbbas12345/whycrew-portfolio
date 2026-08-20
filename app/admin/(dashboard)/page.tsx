import Link from "next/link";
import {
  STAGES,
  isStage,
  leadsConfigError,
  listLeads,
  stageCounts,
  type Stage,
} from "@/lib/leads";

export const dynamic = "force-dynamic";

const relative = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  return days < 30 ? `${days}d ago` : new Date(iso).toLocaleDateString("en-GB");
};

const STAGE_TONE: Record<Stage, string> = {
  new: "border-accent/40 bg-accent/10 text-accent",
  contacted: "border-brand/40 bg-brand/10 text-brand-hi",
  qualified: "border-brand/40 bg-brand/10 text-brand-hi",
  proposal: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  won: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  lost: "border-line/70 bg-surface/60 text-faint",
};

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ stage?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const stage = isStage(sp.stage) ? (sp.stage as Stage) : undefined;
  const q = sp.q?.trim() || undefined;

  const configError = leadsConfigError();
  if (configError) {
    return (
      <div className="rounded-lg border border-amber-500/40 bg-amber-500/6 p-6">
        <p className="text-[14px] font-semibold text-amber-300">
          Lead database not configured
        </p>
        <p className="mt-2 text-[13.5px] leading-relaxed text-body">{configError}</p>
      </div>
    );
  }

  const [leads, counts] = await Promise.all([
    listLeads({ stage, q }),
    stageCounts(),
  ]);

  const tab = (key: string, label: string, n: number) => {
    const active = (key === "all" && !stage) || key === stage;
    const href = key === "all" ? "/admin" : `/admin?stage=${key}`;
    return (
      <Link
        key={key}
        href={href}
        className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors ${
          active
            ? "border-accent/50 bg-accent/10 text-accent"
            : "border-line/70 text-muted hover:border-accent/30 hover:text-bright"
        }`}
      >
        {label} <span className="text-faint">{n}</span>
      </Link>
    );
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tab("all", "All", counts.all ?? 0)}
        {STAGES.map((s) => tab(s.key, s.label, counts[s.key] ?? 0))}
      </div>

      <form className="mt-5 flex gap-2" action="/admin">
        {stage && <input type="hidden" name="stage" value={stage} />}
        <input
          name="q"
          defaultValue={q ?? ""}
          placeholder="Search name, email, company, interest…"
          className="w-full max-w-md rounded-md border border-line/70 bg-void/60 px-4 py-2.5 text-[13.5px] text-bright placeholder:text-faint outline-none transition-colors focus:border-accent/60"
        />
        <button
          type="submit"
          className="rounded-md border border-line/70 px-4 py-2.5 text-[13px] font-semibold text-muted transition-colors hover:border-accent/40 hover:text-accent"
        >
          Search
        </button>
        {(q || stage) && (
          <Link
            href="/admin"
            className="self-center text-[12.5px] font-semibold text-faint hover:text-accent"
          >
            Clear
          </Link>
        )}
      </form>

      {leads.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-line/60 bg-surface/30 px-6 py-16 text-center">
          <p className="text-[15px] font-semibold text-bright">
            {counts.all ? "Nothing matches that filter" : "No leads yet"}
          </p>
          <p className="mx-auto mt-2 max-w-md text-[13.5px] leading-relaxed text-muted">
            {counts.all
              ? "Try another stage, or clear the filters."
              : "Submissions from the contact form will appear here as soon as they arrive."}
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-lg border border-line/70 bg-surface/40">
          <table className="w-full min-w-[720px] border-collapse text-left text-[13.5px]">
            <thead>
              <tr className="border-b border-line/70 bg-surface-2/50">
                {["Lead", "Interest", "Stage", "Notes", "Received"].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-faint"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr
                  key={l.id}
                  className="border-b border-line-soft/70 transition-colors last:border-0 hover:bg-brand/5"
                >
                  <td className="px-5 py-4 align-top">
                    <Link
                      href={`/admin/${l.id}`}
                      className="font-medium text-bright hover:text-accent"
                    >
                      {l.name}
                    </Link>
                    <div className="mt-0.5 text-[12.5px] text-muted">{l.company}</div>
                    <div className="text-[12px] text-faint">{l.email}</div>
                  </td>
                  <td className="px-5 py-4 align-top text-muted">{l.interest}</td>
                  <td className="px-5 py-4 align-top">
                    <span
                      className={`inline-block rounded-full border px-2.5 py-1 text-[11px] font-semibold ${STAGE_TONE[l.stage]}`}
                    >
                      {STAGES.find((s) => s.key === l.stage)?.label ?? l.stage}
                    </span>
                  </td>
                  <td className="px-5 py-4 align-top text-muted">
                    {l.noteCount || "—"}
                  </td>
                  <td className="px-5 py-4 align-top whitespace-nowrap text-faint">
                    {relative(l.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
