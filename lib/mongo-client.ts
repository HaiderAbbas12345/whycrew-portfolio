/**
 * Shared MongoDB connection.
 *
 * Both the lead store (lib/leads-mongo.ts) and the admin user store
 * (lib/admin-users.ts) go through this, so one process opens one pool no
 * matter how many collections it touches.
 */

import type { Db, MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI?.trim() ?? "";
const DB_NAME = process.env.MONGODB_DB?.trim() || "whycrew";

export const mongoConfigured = (): boolean => URI.length > 0;

/**
 * One client per process, cached on globalThis.
 *
 * A dev-server hot reload re-evaluates this module and a warm serverless
 * instance reuses it across invocations; without the cache each would open a
 * fresh connection pool and burn through the cluster's connection limit. The
 * promise is what gets cached, so concurrent callers share one handshake.
 */
const g = globalThis as unknown as { __whycrewMongo?: Promise<MongoClient> };

export async function mongoClient(): Promise<MongoClient> {
  if (!URI) {
    throw new Error("MONGODB_URI is not set — no MongoDB connection to make.");
  }

  g.__whycrewMongo ??= (async () => {
    const { MongoClient } = await import("mongodb");
    return new MongoClient(URI, {
      // Fail fast rather than holding a page render open for the 30s default.
      serverSelectionTimeoutMS: 8000,
      // A serverless instance serves one request at a time; a large pool only
      // eats into the cluster's connection cap.
      maxPoolSize: 10,
    }).connect();
  })().catch((err) => {
    g.__whycrewMongo = undefined; // let the next call retry a failed connect
    throw err;
  });

  return g.__whycrewMongo;
}

export async function mongoDb(): Promise<Db> {
  return (await mongoClient()).db(DB_NAME);
}

/**
 * Runs a one-off setup step (index creation) once per process rather than on
 * every call. Callers keep their own latch via the `state` object so one
 * collection's setup failure doesn't suppress another's.
 */
export async function once(
  state: { p: Promise<void> | null },
  fn: () => Promise<void>
): Promise<void> {
  state.p ??= fn().catch((err) => {
    state.p = null; // let the next call retry rather than caching the failure
    throw err;
  });
  await state.p;
}
