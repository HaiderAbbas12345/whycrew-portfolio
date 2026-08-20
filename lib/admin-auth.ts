/**
 * Admin session.
 *
 * A single shared password (ADMIN_PASSWORD) exchanged for a signed, httpOnly
 * cookie. Deliberately small: this guards an internal lead list for one team,
 * not a multi-user product, so there are no accounts to manage.
 *
 * The cookie carries only an expiry plus an HMAC of it, keyed by
 * ADMIN_SESSION_SECRET. Nothing sensitive is stored client-side and the value
 * can't be forged or extended without the secret.
 */

import { createHmac, timingSafeEqual, randomBytes } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "wc_admin";
const MAX_AGE_SECONDS = 60 * 60 * 12; // 12h

const password = () => process.env.ADMIN_PASSWORD?.trim() ?? "";

/**
 * Falls back to the password itself so a working setup needs one variable, not
 * two. Setting ADMIN_SESSION_SECRET separately is better — it lets you rotate
 * the password without it also being the signing key.
 */
const secret = () => process.env.ADMIN_SESSION_SECRET?.trim() || password();

export const adminConfigured = () => password().length > 0;

const sign = (value: string) =>
  createHmac("sha256", secret()).update(value).digest("hex");

/** Constant-time compare that tolerates unequal lengths. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) {
    // Still burn a comparison so the failure isn't distinguishable by timing.
    timingSafeEqual(ab, ab);
    return false;
  }
  return timingSafeEqual(ab, bb);
}

export const passwordMatches = (candidate: string): boolean =>
  adminConfigured() && safeEqual(candidate, password());

function mint(): string {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  // The nonce makes each session token distinct, so one can't be recognised
  // as a replay of another issued in the same millisecond.
  const payload = `${expires}.${randomBytes(8).toString("hex")}`;
  return `${payload}.${sign(payload)}`;
}

function valid(token: string | undefined): boolean {
  if (!token || !adminConfigured()) return false;
  const idx = token.lastIndexOf(".");
  if (idx < 0) return false;

  const payload = token.slice(0, idx);
  if (!safeEqual(token.slice(idx + 1), sign(payload))) return false;

  const expires = Number(payload.split(".")[0]);
  return Number.isFinite(expires) && expires > Date.now();
}

export async function startSession(): Promise<void> {
  (await cookies()).set(SESSION_COOKIE, mint(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function endSession(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  return valid((await cookies()).get(SESSION_COOKIE)?.value);
}
