/**
 * Admin session.
 *
 * Credentials are checked against the single user seeded into MongoDB (see
 * lib/admin-users.ts), whose password is stored only as a salted scrypt hash.
 * A correct pair is exchanged for a signed, httpOnly cookie.
 *
 * The cookie carries the username and an expiry plus an HMAC over both, keyed
 * by ADMIN_SESSION_SECRET. Nothing sensitive is stored client-side and the
 * value can't be forged or extended without the secret.
 *
 * Deliberately small: this guards an internal lead list for one team, not a
 * multi-user product, so there are no accounts to manage.
 */

import { createHmac, timingSafeEqual, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { mongoConfigured } from "./mongo-client";
import { recordLogin, verifyAdminCredentials } from "./admin-users";

export const SESSION_COOKIE = "wc_admin";
const MAX_AGE_SECONDS = 60 * 60 * 12; // 12h

/**
 * Signing key for the session cookie.
 *
 * Falls back to ADMIN_PASSWORD so an existing single-variable setup keeps
 * working, but that variable is now only a seed input: once `npm run
 * seed:admin` has run it can be deleted from the environment, and at that
 * point ADMIN_SESSION_SECRET is what keeps sessions valid.
 */
const secret = () =>
  process.env.ADMIN_SESSION_SECRET?.trim() ||
  process.env.ADMIN_PASSWORD?.trim() ||
  "";

/**
 * Auth needs both a signing key and the database holding the user. Without
 * either, /admin reports that it is not configured rather than falling back to
 * something weaker.
 */
export const adminConfigured = () => secret().length > 0 && mongoConfigured();

export function adminConfigError(): string | null {
  if (!mongoConfigured())
    return "MONGODB_URI is not set — the admin user lives in the database.";
  if (!secret())
    return "ADMIN_SESSION_SECRET is not set, so sessions cannot be signed.";
  return null;
}

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

/**
 * Checks a username/password pair against the seeded user.
 *
 * Returns only a boolean: the caller cannot tell a wrong username from a wrong
 * password, and both paths cost the same scrypt work.
 */
export async function credentialsMatch(
  username: string,
  password: string
): Promise<boolean> {
  if (!adminConfigured()) return false;

  const user = await verifyAdminCredentials(username, password);
  if (!user) return false;

  // Best-effort: a failed timestamp write must not block a valid sign-in.
  await recordLogin().catch(() => {});
  return true;
}

function mint(username: string): string {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  // The nonce makes each session token distinct, so one can't be recognised
  // as a replay of another issued in the same millisecond.
  const payload = `${expires}.${encodeURIComponent(username)}.${randomBytes(8).toString("hex")}`;
  return `${payload}.${sign(payload)}`;
}

/** Returns the signed-in username, or null if the token is absent or invalid. */
function read(token: string | undefined): string | null {
  if (!token || !adminConfigured()) return null;

  const idx = token.lastIndexOf(".");
  if (idx < 0) return null;

  const payload = token.slice(0, idx);
  if (!safeEqual(token.slice(idx + 1), sign(payload))) return null;

  const [expiresRaw, username] = payload.split(".");
  const expires = Number(expiresRaw);
  if (!Number.isFinite(expires) || expires <= Date.now()) return null;

  return username ? decodeURIComponent(username) : null;
}

export async function startSession(username: string): Promise<void> {
  (await cookies()).set(SESSION_COOKIE, mint(username), {
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
  return (await currentUser()) !== null;
}

export async function currentUser(): Promise<string | null> {
  return read((await cookies()).get(SESSION_COOKIE)?.value);
}
