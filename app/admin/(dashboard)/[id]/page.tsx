import Link from "next/link";
import { notFound } from "next/navigation";
import { getLead, getNotes, STAGES } from "@/lib/leads";
import { DeleteLead, NoteForm, StageSelect } from "@/components/admin/controls";

export const dynamic = "force-dynamic";

const stamp = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: raw } = await params;
  const id = Number(raw);
  if (!Number.isInteger(id) || id < 1) notFound();

  const lead = await getLead(id);
  if (!lead) notFound();

  const notes = await getNotes(id);

  const field = (label: string, value: string | null) => (
    <div className="border-b border-line-soft/70 py-3 last:border-0">
      <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-faint">
        {label}
      </dt>
      <dd className="mt-1 text-[14px] leading-relaxed text-bright">{value || "—"}</dd>
    </div>
  );

  return (
    <div>
      <Link
        href="/admin"
        className="group inline-flex items-center gap-2 text-[12.5px] font-semibold text-muted transition-colors hover:text-accent"
      >
        <span aria-hidden className="transition-transform group-hover:-translate-x-1">
          ←
        </span>
        All leads
      </Link>

      <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-bright">{lead.name}</h1>
          <p className="mt-1 text-[14px] text-muted">
            {lead.company}
            {lead.companySize ? ` · ${lead.companySize}` : ""}
          </p>
          <a
            href={`mailto:${lead.email}?subject=${encodeURIComponent(
              `Re: ${lead.interest} — WhyCrew`
            )}`}
            className="mt-1 inline-block text-[13.5px] text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
          >
            {lead.email}
          </a>
        </div>
        <StageSelect id={lead.id} stage={lead.stage} />
      </div>

      <p className="mt-2 text-[12px] text-faint">
        {STAGES.find((s) => s.key === lead.stage)?.hint}
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
        {/* -------------------------------------------------- notes */}
        <section>
          <h2 className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-brand-hi">
            Notes
          </h2>

          <div className="mt-4">
            <NoteForm id={lead.id} />
          </div>

          {notes.length === 0 ? (
            <p className="mt-8 text-[13.5px] text-faint">
              No notes yet. Anything logged here stays with the lead.
            </p>
          ) : (
            <ul className="mt-8 space-y-4">
              {notes.map((n) => (
                <li
                  key={n.id}
                  className="rounded-lg border border-line/70 bg-surface/50 p-4"
                >
                  <p className="whitespace-pre-wrap text-[13.5px] leading-relaxed text-body">
                    {n.body}
                  </p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                    {stamp(n.createdAt)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* -------------------------------------------------- submission */}
        <aside>
          <h2 className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-brand-hi">
            Submission
          </h2>
          <dl className="mt-3">
            {field("Looking to build", lead.interest)}
            {field("Company size", lead.companySize)}
            {field("Message", lead.message)}
            {field("Source", lead.source)}
            {field("Received", stamp(lead.createdAt))}
            {field("Last activity", stamp(lead.updatedAt))}
          </dl>

          <div className="mt-8 border-t border-line-soft/70 pt-5">
            <DeleteLead id={lead.id} />
          </div>
        </aside>
      </div>
    </div>
  );
}
