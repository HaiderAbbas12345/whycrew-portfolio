"use client";

import { useFormStatus } from "react-dom";
import { STAGES, type Stage } from "@/lib/lead-stages";
import { createNote, removeLead, updateStage } from "@/app/admin/actions";

/** Submits the surrounding form as soon as the stage changes — no Save button. */
function AutoSubmitOnChange() {
  const { pending } = useFormStatus();
  return (
    <span
      aria-live="polite"
      className={`font-mono text-[10px] uppercase tracking-[0.18em] text-faint transition-opacity ${
        pending ? "opacity-100" : "opacity-0"
      }`}
    >
      Saving…
    </span>
  );
}

export function StageSelect({ id, stage }: { id: number; stage: Stage }) {
  return (
    <form action={updateStage} className="flex items-center gap-3">
      <input type="hidden" name="id" value={id} />
      <select
        name="stage"
        defaultValue={stage}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="rounded-md border border-line/70 bg-void/60 px-3 py-2 text-[13px] text-bright outline-none transition-colors focus:border-accent/60"
      >
        {STAGES.map((s) => (
          <option key={s.key} value={s.key}>
            {s.label}
          </option>
        ))}
      </select>
      {/* Fallback for users without JS, hidden once the change handler works. */}
      <noscript>
        <button type="submit" className="text-[12.5px] font-semibold text-accent">
          Save
        </button>
      </noscript>
      <AutoSubmitOnChange />
    </form>
  );
}

function NoteSubmit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-3 rounded-md bg-brand px-4 py-2.5 text-[13px] font-semibold text-white transition-opacity disabled:opacity-60"
    >
      {pending ? "Adding…" : "Add note"}
    </button>
  );
}

export function NoteForm({ id }: { id: number }) {
  return (
    <form
      action={async (fd) => {
        await createNote(fd);
        // Clearing here rather than with state keeps the textarea uncontrolled,
        // so typing never re-renders the form.
        (document.getElementById(`note-${id}`) as HTMLTextAreaElement | null)?.form?.reset();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <textarea
        id={`note-${id}`}
        name="body"
        required
        rows={3}
        placeholder="What happened on this lead?"
        className="w-full resize-y rounded-md border border-line/70 bg-void/60 px-4 py-3 text-[14px] leading-relaxed text-bright placeholder:text-faint outline-none transition-colors focus:border-accent/60"
      />
      <NoteSubmit />
    </form>
  );
}

export function DeleteLead({ id }: { id: number }) {
  return (
    <form
      action={removeLead}
      onSubmit={(e) => {
        if (!confirm("Delete this lead and all its notes? This cannot be undone.")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-[12.5px] font-semibold text-muted transition-colors hover:text-red-400"
      >
        Delete lead
      </button>
    </form>
  );
}
