/**
 * Lead store.
 *
 * SQLite, with two interchangeable backends chosen by LEADS_DB_URL:
 *
 *   unset / "file:..."   → node:sqlite, a real local .db file. Built into
 *                          Node 22+, so no dependency. Right for local dev
 *                          and for any self-hosted (VPS/Docker) deployment.
 *   "https://" | "libsql://" → Turso over its HTTP API, via plain fetch.
 *
 * The second backend exists because Vercel's filesystem is ephemeral: a file
 * database there is wiped on every deploy and is not shared between lambda
 * instances. Turso is libSQL — the same SQLite, the same SQL — just reachable
 * over the network, so nothing above this file changes between the two.
 */

import { isStage, type Stage } from "./lead-stages";

export { STAGES, isStage, type Stage } from "./lead-stages";

export interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  companySize: string | null;
  interest: string;
  message: string | null;
  stage: Stage;
  source: string;
  createdAt: string;
  updatedAt: string;
  noteCount: number;
}

export interface Note {
  id: number;
  leadId: number;
  body: string;
  createdAt: string;
}

export interface NewLead {
  name: string;
  email: string;
  company: string;
  companySize?: string;
  interest: string;
  message?: string;
  source?: string;
}

type Arg = string | number | null;
type Row = Record<string, string | number | null>;

/* ------------------------------------------------------------------ config */

const RAW_URL = process.env.LEADS_DB_URL?.trim() ?? "";
const TOKEN = process.env.LEADS_DB_TOKEN?.trim() ?? "";
const REMOTE = /^(https|libsql):\/\//i.test(RAW_URL);
const FILE = RAW_URL.replace(/^file:/, "") || ".data/leads.db";

/**
 * On a serverless host a file database silently loses every lead, so it is
 * treated as unconfigured rather than quietly accepted. Locally, a file is
 * always fine.
 */
const ON_SERVERLESS = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

export function leadsConfigured(): boolean {
  if (REMOTE) return Boolean(TOKEN);
  return !ON_SERVERLESS;
}

export function leadsConfigError(): string | null {
  if (REMOTE && !TOKEN) return "LEADS_DB_URL is set but LEADS_DB_TOKEN is missing.";
  if (!REMOTE && ON_SERVERLESS)
    return "A file-backed SQLite database cannot persist on a serverless host. Set LEADS_DB_URL + LEADS_DB_TOKEN to a Turso database.";
  return null;
}

/* -------------------------------------------------------------- Turso HTTP */

const endpoint = () =>
  `${RAW_URL.replace(/^libsql:\/\//i, "https://").replace(/\/+$/, "")}/v2/pipeline`;

const encodeArg = (v: Arg) => {
  if (v === null || v === undefined) return { type: "null", value: null };
  if (typeof v === "number")
    return Number.isInteger(v)
      ? { type: "integer", value: String(v) }
      : { type: "float", value: v };
  return { type: "text", value: v };
};

const decodeVal = (c: { type: string; value: unknown } | null) => {
  if (!c || c.type === "null") return null;
  if (c.type === "integer" || c.type === "float") return Number(c.value);
  return c.value as string;
};

async function remoteExec(
  statements: { sql: string; args: Arg[] }[]
): Promise<{ rows: Row[]; lastInsertRowid: number; changes: number }[]> {
  const res = await fetch(endpoint(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      requests: [
        ...statements.map((s) => ({
          type: "execute",
          stmt: { sql: s.sql, args: s.args.map(encodeArg) },
        })),
        { type: "close" },
      ],
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Lead database responded ${res.status}: ${detail.slice(0, 300)}`);
  }

  const body = (await res.json()) as {
    results?: {
      type: string;
      error?: { message?: string };
      response?: {
        result?: {
          cols: { name: string }[];
          rows: { type: string; value: unknown }[][];
          affected_row_count?: number;
          last_insert_rowid?: string | null;
        };
      };
    }[];
  };

  const out = [];
  for (const r of body.results ?? []) {
    if (r.type === "error") throw new Error(r.error?.message ?? "Lead database error");
    const result = r.response?.result;
    if (!result) continue;
    const cols = result.cols.map((c) => c.name);
    out.push({
      rows: result.rows.map((row) =>
        Object.fromEntries(row.map((cell, i) => [cols[i], decodeVal(cell)]))
      ) as Row[],
      lastInsertRowid: Number(result.last_insert_rowid ?? 0),
      changes: result.affected_row_count ?? 0,
    });
  }
  return out;
}

/* ------------------------------------------------------------ node:sqlite */

type LocalDb = {
  exec(sql: string): void;
  prepare(sql: string): {
    all(...a: Arg[]): Row[];
    run(...a: Arg[]): { lastInsertRowid: number | bigint; changes: number | bigint };
  };
};

// Cached on globalThis so a dev-server hot reload reuses one handle instead of
// opening a new one on every module re-evaluation.
const g = globalThis as unknown as { __whycrewLeadsDb?: LocalDb };

async function localDb(): Promise<LocalDb> {
  if (g.__whycrewLeadsDb) return g.__whycrewLeadsDb;

  const { mkdirSync } = await import("node:fs");
  const { dirname } = await import("node:path");
  mkdirSync(dirname(FILE), { recursive: true });

  const { DatabaseSync } = await import("node:sqlite");
  const db = new DatabaseSync(FILE) as unknown as LocalDb;
  db.exec("PRAGMA journal_mode = WAL");
  db.exec("PRAGMA foreign_keys = ON");
  g.__whycrewLeadsDb = db;
  return db;
}

/* ------------------------------------------------------------------ schema */

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS leads (
     id           INTEGER PRIMARY KEY AUTOINCREMENT,
     name         TEXT NOT NULL,
     email        TEXT NOT NULL,
     company      TEXT NOT NULL,
     company_size TEXT,
     interest     TEXT NOT NULL,
     message      TEXT,
     stage        TEXT NOT NULL DEFAULT 'new',
     source       TEXT NOT NULL DEFAULT 'contact-form',
     created_at   TEXT NOT NULL,
     updated_at   TEXT NOT NULL
   )`,
  `CREATE TABLE IF NOT EXISTS lead_notes (
     id         INTEGER PRIMARY KEY AUTOINCREMENT,
     lead_id    INTEGER NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
     body       TEXT NOT NULL,
     created_at TEXT NOT NULL
   )`,
  `CREATE INDEX IF NOT EXISTS idx_leads_stage ON leads(stage)`,
  `CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC)`,
  `CREATE INDEX IF NOT EXISTS idx_notes_lead ON lead_notes(lead_id)`,
];

let ready: Promise<void> | null = null;

/** Runs the schema once per process. CREATE ... IF NOT EXISTS is idempotent. */
function ensureSchema(): Promise<void> {
  ready ??= (async () => {
    if (REMOTE) {
      await remoteExec(SCHEMA.map((sql) => ({ sql, args: [] })));
    } else {
      const db = await localDb();
      for (const sql of SCHEMA) db.exec(sql);
    }
  })().catch((err) => {
    ready = null; // let the next call retry rather than caching the failure
    throw err;
  });
  return ready;
}

/* --------------------------------------------------------------- execution */

async function query(sql: string, args: Arg[] = []): Promise<Row[]> {
  await ensureSchema();
  if (REMOTE) return (await remoteExec([{ sql, args }]))[0]?.rows ?? [];
  const db = await localDb();
  return db.prepare(sql).all(...args);
}

async function run(
  sql: string,
  args: Arg[] = []
): Promise<{ lastInsertRowid: number; changes: number }> {
  await ensureSchema();
  if (REMOTE) {
    const r = (await remoteExec([{ sql, args }]))[0];
    return { lastInsertRowid: r?.lastInsertRowid ?? 0, changes: r?.changes ?? 0 };
  }
  const db = await localDb();
  const r = db.prepare(sql).run(...args);
  return { lastInsertRowid: Number(r.lastInsertRowid), changes: Number(r.changes) };
}

/* ----------------------------------------------------------------- mapping */

const toLead = (r: Row): Lead => ({
  id: Number(r.id),
  name: String(r.name),
  email: String(r.email),
  company: String(r.company),
  companySize: (r.company_size as string) ?? null,
  interest: String(r.interest),
  message: (r.message as string) ?? null,
  stage: (isStage(r.stage) ? r.stage : "new") as Stage,
  source: String(r.source ?? "contact-form"),
  createdAt: String(r.created_at),
  updatedAt: String(r.updated_at),
  noteCount: Number(r.note_count ?? 0),
});

const LEAD_SELECT = `
  SELECT l.*, (SELECT COUNT(*) FROM lead_notes n WHERE n.lead_id = l.id) AS note_count
  FROM leads l`;

/* ---------------------------------------------------------------- mutations */

export async function createLead(input: NewLead): Promise<number> {
  const now = new Date().toISOString();
  const { lastInsertRowid } = await run(
    `INSERT INTO leads
       (name, email, company, company_size, interest, message, stage, source, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, 'new', ?, ?, ?)`,
    [
      input.name,
      input.email,
      input.company,
      input.companySize ?? null,
      input.interest,
      input.message ?? null,
      input.source ?? "contact-form",
      now,
      now,
    ]
  );
  return lastInsertRowid;
}

export async function setStage(id: number, stage: Stage): Promise<void> {
  await run(`UPDATE leads SET stage = ?, updated_at = ? WHERE id = ?`, [
    stage,
    new Date().toISOString(),
    id,
  ]);
}

export async function addNote(leadId: number, body: string): Promise<void> {
  const now = new Date().toISOString();
  await run(`INSERT INTO lead_notes (lead_id, body, created_at) VALUES (?, ?, ?)`, [
    leadId,
    body,
    now,
  ]);
  await run(`UPDATE leads SET updated_at = ? WHERE id = ?`, [now, leadId]);
}

export async function deleteLead(id: number): Promise<void> {
  // Explicit child delete: PRAGMA foreign_keys is per-connection, and Turso's
  // HTTP sessions don't guarantee it, so cascade can't be relied on.
  await run(`DELETE FROM lead_notes WHERE lead_id = ?`, [id]);
  await run(`DELETE FROM leads WHERE id = ?`, [id]);
}

/* ----------------------------------------------------------------- queries */

export async function listLeads(opts: { stage?: Stage; q?: string } = {}): Promise<Lead[]> {
  const where: string[] = [];
  const args: Arg[] = [];

  if (opts.stage) {
    where.push("l.stage = ?");
    args.push(opts.stage);
  }
  if (opts.q) {
    where.push("(l.name LIKE ? OR l.email LIKE ? OR l.company LIKE ? OR l.interest LIKE ?)");
    const like = `%${opts.q}%`;
    args.push(like, like, like, like);
  }

  const rows = await query(
    `${LEAD_SELECT} ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
     ORDER BY l.created_at DESC LIMIT 500`,
    args
  );
  return rows.map(toLead);
}

export async function getLead(id: number): Promise<Lead | null> {
  const rows = await query(`${LEAD_SELECT} WHERE l.id = ?`, [id]);
  return rows[0] ? toLead(rows[0]) : null;
}

export async function getNotes(leadId: number): Promise<Note[]> {
  const rows = await query(
    `SELECT * FROM lead_notes WHERE lead_id = ? ORDER BY created_at DESC`,
    [leadId]
  );
  return rows.map((r) => ({
    id: Number(r.id),
    leadId: Number(r.lead_id),
    body: String(r.body),
    createdAt: String(r.created_at),
  }));
}

export async function stageCounts(): Promise<Record<string, number>> {
  const rows = await query(`SELECT stage, COUNT(*) AS n FROM leads GROUP BY stage`);
  const out: Record<string, number> = { all: 0 };
  for (const r of rows) {
    out[String(r.stage)] = Number(r.n);
    out.all += Number(r.n);
  }
  return out;
}
