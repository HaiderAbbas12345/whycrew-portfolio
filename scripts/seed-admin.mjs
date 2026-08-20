/**
 * Seeds the single admin user into MongoDB.
 *
 *   npm run seed:admin
 *   npm run seed:admin -- --username admin --password 'correct horse battery'
 *
 * Reads .env.local when present, so it works locally with no arguments. Against
 * a deployed database, pass the same MONGODB_URI in the environment.
 *
 * Re-running it is how the password is rotated — it replaces the existing user
 * rather than adding a second one.
 *
 * The scrypt parameters and the `scrypt$N$r$p$salt$hash` encoding here must
 * match lib/admin-users.ts, which is what verifies the hash at sign-in. This
 * file deliberately imports nothing from lib/: it runs as plain Node, outside
 * the Next.js/TypeScript build.
 */

import { randomBytes, scrypt as scryptCb } from "node:crypto";
import { promisify } from "node:util";
import { createInterface } from "node:readline/promises";
import { MongoClient } from "mongodb";

const scrypt = promisify(scryptCb);

const PARAMS = { N: 16384, r: 8, p: 1 };
const KEYLEN = 64;
const SINGLETON_ID = 1;
const MIN_PASSWORD = 12;

async function hashPassword(password) {
  const salt = randomBytes(16);
  const hash = await scrypt(password.normalize("NFKC"), salt, KEYLEN, PARAMS);
  const { N, r, p } = PARAMS;
  return `scrypt$${N}$${r}$${p}$${salt.toString("base64")}$${hash.toString("base64")}`;
}

/** Round-trips the hash so a broken encoding fails here, not at sign-in. */
async function verify(password, stored) {
  const [tag, N, r, p, saltB64, hashB64] = stored.split("$");
  if (tag !== "scrypt") return false;
  const expected = Buffer.from(hashB64, "base64");
  const actual = await scrypt(password.normalize("NFKC"), Buffer.from(saltB64, "base64"), expected.length, {
    N: Number(N),
    r: Number(r),
    p: Number(p),
  });
  return actual.equals(expected);
}

function flag(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : undefined;
}

function fail(message) {
  console.error(`\n  ✗ ${message}\n`);
  process.exit(1);
}

const uri = process.env.MONGODB_URI?.trim();
if (!uri) {
  fail(
    "MONGODB_URI is not set.\n    Add it to .env.local, or pass it in the environment for a deployed database."
  );
}

const username = (flag("username") ?? process.env.ADMIN_USERNAME ?? "admin").trim();
let password = flag("password") ?? process.env.ADMIN_PASSWORD ?? "";

// Nothing supplied — ask, rather than inventing a password or seeding a blank.
if (!password) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  password = (await rl.question(`  Password for "${username}": `)).trim();
  rl.close();
}

if (!username) fail("Username cannot be empty.");
if (password.length < MIN_PASSWORD) {
  fail(
    `Password must be at least ${MIN_PASSWORD} characters (got ${password.length}).\n    This is the only credential guarding every lead in the database.`
  );
}

const client = await new MongoClient(uri, { serverSelectionTimeoutMS: 15000 }).connect();

try {
  const db = client.db(process.env.MONGODB_DB?.trim() || "whycrew");
  const col = db.collection("admin_users");

  await col.createIndex({ username: 1 }, { unique: true });

  const passwordHash = await hashPassword(password);
  if (!(await verify(password, passwordHash))) {
    fail("Hash failed to verify against its own password — refusing to write it.");
  }

  const existing = await col.findOne({ _id: SINGLETON_ID });
  const now = new Date().toISOString();

  // A leftover row under another _id would keep its unique-index entry on
  // username and collide with the upsert below.
  const { deletedCount } = await col.deleteMany({ _id: { $ne: SINGLETON_ID } });

  await col.updateOne(
    { _id: SINGLETON_ID },
    {
      $set: { username, passwordHash, updatedAt: now },
      $setOnInsert: { createdAt: now, lastLoginAt: null },
    },
    { upsert: true }
  );

  console.log(`
  ✓ Admin user ${existing ? "updated" : "created"}

    username    ${username}
    database    ${db.databaseName}.admin_users
    stored as   salted scrypt hash (N=${PARAMS.N}, r=${PARAMS.r}, p=${PARAMS.p})${
      deletedCount ? `\n    removed     ${deletedCount} stale user row(s)` : ""
    }

  The password itself is not stored anywhere and cannot be recovered —
  re-run this command to set a new one.

  ADMIN_PASSWORD is only a seed input. Once you have signed in, remove it
  from the environment and keep ADMIN_SESSION_SECRET, which signs sessions.
`);
} finally {
  await client.close();
}
