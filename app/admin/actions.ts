"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  addNote,
  deleteLead,
  isStage,
  setStage,
  type Stage,
} from "@/lib/leads";
import {
  credentialsMatch,
  endSession,
  isAuthenticated,
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

/**
 * Failed sign-ins per IP. There is exactly one account, so an unthrottled login
 * is a single-target guessing game — scrypt makes each attempt costly, this
 * caps how many are allowed at all.
 *
 * In-memory, so it is per-instance: it blunts casual guessing, not a
 * distributed attack. Move it to Redis or the CDN edge if this ever runs on
 * more than one node.
 */
const ATTEMPTS = new Map<string, number[]>();
const LOCKOUT_WINDOW_MS = 10 * 60_000;
const MAX_ATTEMPTS = 8;

async function clientIp(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0].trim() ??
    h.get("x-real-ip") ??
    "unknown"
  );
}

function recentFailures(ip: string): number {
  const now = Date.now();
  const recent = (ATTEMPTS.get(ip) ?? []).filter((t) => now - t < LOCKOUT_WINDOW_MS);
  ATTEMPTS.set(ip, recent);

  if (ATTEMPTS.size > 5000) {
    for (const [k, v] of ATTEMPTS) {
      if (!v.some((t) => now - t < LOCKOUT_WINDOW_MS)) ATTEMPTS.delete(k);
    }
  }
  return recent.length;
}

export async function login(_prev: string | null, form: FormData): Promise<string | null> {
  const username = String(form.get("username") ?? "").trim();
  const password = String(form.get("password") ?? "");
  const ip = await clientIp();

  if (recentFailures(ip) >= MAX_ATTEMPTS) {
    return "Too many failed attempts. Try again in a few minutes.";
  }

  if (!(await credentialsMatch(username, password))) {
    // recentFailures() above always leaves an entry in place for this ip.
    ATTEMPTS.get(ip)!.push(Date.now());
    // Deliberately vague — naming which half was wrong, or saying the
    // deployment has no user seeded, both tell an attacker something.
    return "Incorrect username or password.";
  }

  ATTEMPTS.delete(ip);
  await startSession(username);
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
