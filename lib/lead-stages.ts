/**
 * Pipeline stages — deliberately free of any Node import.
 *
 * The admin controls are client components, so anything they import ends up in
 * the browser bundle. Keeping these constants out of lib/leads.ts stops
 * `node:sqlite` being dragged along with them.
 */

export type Stage = "new" | "contacted" | "qualified" | "proposal" | "won" | "lost";

export const STAGES: { key: Stage; label: string; hint: string }[] = [
  { key: "new", label: "New", hint: "Not yet contacted" },
  { key: "contacted", label: "Contacted", hint: "First reply sent" },
  { key: "qualified", label: "Qualified", hint: "Fit confirmed, scoping" },
  { key: "proposal", label: "Proposal", hint: "Scope and pricing sent" },
  { key: "won", label: "Won", hint: "Engagement agreed" },
  { key: "lost", label: "Lost", hint: "Closed, no engagement" },
];

export const isStage = (v: unknown): v is Stage =>
  typeof v === "string" && STAGES.some((s) => s.key === v);
