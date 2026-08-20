/**
 * Admin user store.
 *
 * Exactly one user, seeded into MongoDB by `npm run seed:admin` and held at a
 * fixed `_id`, so a second account cannot be created by accident.
 *
 * The password is never stored — only a salted scrypt hash of it. Anyone who
 * reads the database (a leaked backup, an over-broad Atlas role, a misplaced
 * connection string) still cannot sign in, and cannot learn a password the
 * account holder may have reused elsewhere.
 *
 * scrypt is memory-hard and built into Node, so this needs no dependency and
 * no native build step — the same reasoning behind node:sqlite and the plain
 * `fetch` mailer elsewhere in this codebase.
 */

import {
  createHash,
  randomBytes,
  scrypt as scryptCb,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";
import type { Collection, Document } from "mongodb";
import { mongoDb, once } from "./mongo-client";

const scrypt = promisify(scryptCb) as (
  password: string | Buffer,
  salt: string | Buffer,
  keylen: number,
  options: { N: number; r: number; p: number }
) => Promise<Buffer>;

/**
 * Cost parameters. N=16384 needs ~16MB and a few hundred milliseconds — slow
 * enough to make offline cracking expensive, fast enough for a login.
 *
 * They are stored in the hash string rather than hard-coded at the comparison
 * site, so raising them later still verifies passwords hashed under the old
 * ones.
 */
const PARAMS = { N: 16384, r: 8, p: 1 };
const KEYLEN = 64;
const SALT_BYTES = 16;

/** The single user's fixed key — there is deliberately no way to add another. */
const SINGLETON_ID = 1;

export interface AdminUser {
  username: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
}

interface UserDoc extends Document {
  _id: number;
  username: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
}

const users = { p: null as Promise<void> | null };

async function collection(): Promise<Collection<UserDoc>> {
  const db = await mongoDb();
  await once(users, async () => {
    // Unique on username as a second guard beyond the fixed _id.
    await db.collection("admin_users").createIndex({ username: 1 }, { unique: true });
  });
  return db.collection<UserDoc>("admin_users");
}

/* --------------------------------------------------------------- hashing */

/** `scrypt$N$r$p$salt$hash`, all base64 — self-describing, so it can be re-tuned. */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_BYTES);
  const hash = await scrypt(password.normalize("NFKC"), salt, KEYLEN, PARAMS);
  const { N, r, p } = PARAMS;
  return `scrypt$${N}$${r}$${p}$${salt.toString("base64")}$${hash.toString("base64")}`;
}

export async function verifyPassword(
  password: string,
  stored: string
): Promise<boolean> {
  const parts = stored.split("$");
  if (parts.length !== 6 || parts[0] !== "scrypt") return false;

  const [, N, r, p, saltB64, hashB64] = parts;
  const salt = Buffer.from(saltB64, "base64");
  const expected = Buffer.from(hashB64, "base64");
  if (!salt.length || !expected.length) return false;

  const actual = await scrypt(password.normalize("NFKC"), salt, expected.length, {
    N: Number(N),
    r: Number(r),
    p: Number(p),
  });

  // Lengths match by construction above, so this is a straight constant-time
  // compare — no early return on the first differing byte.
  return timingSafeEqual(actual, expected);
}

/**
 * A hash of a value nobody knows, verified against when the username does not
 * exist. Without it, a missing user would return in microseconds while a real
 * one takes the full scrypt cost, and that gap tells an attacker which
 * usernames exist.
 */
let decoyHash: Promise<string> | null = null;
const decoy = () => (decoyHash ??= hashPassword(randomBytes(32).toString("hex")));

/* ----------------------------------------------------------------- store */

export async function adminUserExists(): Promise<boolean> {
  return (await (await collection()).countDocuments({ _id: SINGLETON_ID })) > 0;
}

export async function getAdminUser(): Promise<AdminUser | null> {
  const doc = await (await collection()).findOne({ _id: SINGLETON_ID });
  if (!doc) return null;
  return {
    username: doc.username,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    lastLoginAt: doc.lastLoginAt ?? null,
  };
}

/**
 * Creates or replaces the single admin user. Idempotent, so the seed script is
 * safe to re-run — re-running it is how the password gets rotated.
 */
export async function seedAdminUser(
  username: string,
  password: string
): Promise<{ created: boolean; username: string }> {
  const col = await collection();
  const now = new Date().toISOString();
  const existing = await col.findOne({ _id: SINGLETON_ID });

  // A stale row under a different username would keep its unique index entry
  // and collide, so clear anything that is not the singleton.
  await col.deleteMany({ _id: { $ne: SINGLETON_ID } });

  await col.updateOne(
    { _id: SINGLETON_ID },
    {
      $set: {
        username,
        passwordHash: await hashPassword(password),
        updatedAt: now,
      },
      $setOnInsert: { createdAt: now, lastLoginAt: null },
    },
    { upsert: true }
  );

  return { created: !existing, username };
}

/**
 * Returns the user on a correct username *and* password, null otherwise.
 *
 * Both failures cost the same scrypt work and the caller is given no way to
 * tell them apart, so this cannot be used to discover the username.
 */
export async function verifyAdminCredentials(
  username: string,
  password: string
): Promise<AdminUser | null> {
  const doc = await (await collection()).findOne({ _id: SINGLETON_ID });

  if (!doc) {
    await verifyPassword(password, await decoy());
    return null;
  }

  const nameOk = timingSafeEqual(
    Buffer.from(hashKey(username)),
    Buffer.from(hashKey(doc.username))
  );
  const passOk = await verifyPassword(password, doc.passwordHash);
  if (!nameOk || !passOk) return null;

  return {
    username: doc.username,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    lastLoginAt: doc.lastLoginAt ?? null,
  };
}

/**
 * Fixed-width key for the username comparison. timingSafeEqual throws on
 * unequal lengths, which would itself leak the stored username's length.
 */
function hashKey(v: string): string {
  return createHash("sha256").update(v.trim().toLowerCase()).digest("hex");
}

export async function recordLogin(): Promise<void> {
  await (await collection()).updateOne(
    { _id: SINGLETON_ID },
    { $set: { lastLoginAt: new Date().toISOString() } }
  );
}
