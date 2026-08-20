"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  addNote,
  deleteLead,
  isStage,
  setStage,
  type Stage,
} from "@/lib/leads";
import {
  endSession,
  isAuthenticated,
  passwordMatches,
  startSession,
} from "@/lib/admin-auth";

/**
 * Every mutation re-checks the session itself. Server actions are reachable as
 * POST endpoints independently of the page that renders them, so guarding only
 * the layout would leave them open.
 */
async function requireSession() {
  if (!(await isAuthenticated())) redirect("/admin/login");
}

export async function login(_prev: string | null, form: FormData): Promise<string | null> {
  const password = String(form.get("password") ?? "");
  if (!passwordMatches(password)) {
    // Deliberately vague: a distinct "not configured" message would tell an
    // attacker whether the deployment has an admin password set at all.
    return "Incorrect password.";
  }
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

export async function updateStage(form: FormData) {
  await requireSession();
  const id = Number(form.get("id"));
  const stage = form.get("stage");
  if (!Number.isInteger(id) || !isStage(stage)) return;
  await setStage(id, stage as Stage);
  revalidatePath("/admin");
  revalidatePath(`/admin/${id}`);
}

export async function createNote(form: FormData) {
  await requireSession();
  const id = Number(form.get("id"));
  const body = String(form.get("body") ?? "").trim().slice(0, 4000);
  if (!Number.isInteger(id) || !body) return;
  await addNote(id, body);
  revalidatePath("/admin");
  revalidatePath(`/admin/${id}`);
}

export async function removeLead(form: FormData) {
  await requireSession();
  const id = Number(form.get("id"));
  if (!Number.isInteger(id)) return;
  await deleteLead(id);
  revalidatePath("/admin");
  redirect("/admin");
}
