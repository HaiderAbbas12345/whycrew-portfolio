/**
 * MongoDB backend for the lead store.
 *
 * Selected by MONGODB_URI. Everything above this file — the contact route and
 * the /admin dashboard — goes through lib/leads.ts and never learns which
 * engine is underneath, so this sits alongside the SQLite/Turso backends
 * rather than replacing them: Mongo in production, a zero-setup local file
 * when MONGODB_URI is unset.
 *
 * Collections
 *   leads       _id is the lead number (see nextId), not an ObjectId
 *   lead_notes  leadId -> leads._id
 *   counters    one doc per sequence, holding the last number handed out
 */

import type { Collection, Db, Document } from "mongodb";
import { isStage, type Stage } from "./lead-stages";
import type { Lead, NewLead, Note } from "./leads";
import { mongoDb, once } from "./mongo-client";

export { mongoConfigured } from "./mongo-client";

interface LeadDoc extends Document {
  _id: number;
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
}

interface NoteDoc extends Document {
  _id: number;
  leadId: number;
  body: string;
  createdAt: string;
}

const indexed = { p: null as Promise<void> | null };

/**
 * Index creation is idempotent, so it runs once per process instead of being a
 * migration step someone has to remember. Mirrors the SQLite schema: stage
 * filter, newest-first list, notes by lead.
 */
async function db(): Promise<Db> {
  const database = await mongoDb();

  await once(indexed, async () => {
    await Promise.all([
      database.collection("leads").createIndex({ stage: 1 }),
      database.collection("leads").createIndex({ createdAt: -1 }),
      database.collection("lead_notes").createIndex({ leadId: 1 }),
    ]);
  });

  return database;
}

const leads = async (): Promise<Collection<LeadDoc>> =>
  (await db()).collection<LeadDoc>("leads");

const notes = async (): Promise<Collection<NoteDoc>> =>
  (await db()).collection<NoteDoc>("lead_notes");

/* -------------------------------------------------------------------- ids */

/**
 * Sequential integer ids instead of ObjectIds.
 *
 * The admin routes are /admin/[id] guarded by Number.isInteger, and the SQLite
 * backends hand out INTEGER PRIMARY KEY values — keeping the same shape here
 * means Lead.id stays a number whichever engine is active, so nothing above
 * this file has to care. It also reads better in a lead list: "Lead #14" over
 * a 24-character hex string.
 *
 * $inc inside findOneAndUpdate is atomic, so two simultaneous submissions
 * cannot be handed the same number.
 */
async function nextId(sequence: "leads" | "lead_notes"): Promise<number> {
  const counters = (await db()).collection<{ _id: string; seq: number }>("counters");
  const doc = await counters.findOneAndUpdate(
    { _id: sequence },
    { $inc: { seq: 1 } },
    { upsert: true, returnDocument: "after" }
  );
  return doc?.seq ?? 1;
}

/* ---------------------------------------------------------------- mapping */

const toLead = (d: LeadDoc & { noteCount?: number }): Lead => ({
  id: Number(d._id),
  name: String(d.name),
  email: String(d.email),
  company: String(d.company),
  companySize: d.companySize ?? null,
  interest: String(d.interest),
  message: d.message ?? null,
  stage: isStage(d.stage) ? d.stage : "new",
  source: String(d.source ?? "contact-form"),
  createdAt: String(d.createdAt),
  updatedAt: String(d.updatedAt),
  noteCount: Number(d.noteCount ?? 0),
});

/** Search text reaches $regex, so metacharacters have to be made literal. */
const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/* -------------------------------------------------------------- mutations */

export async function createLead(input: NewLead): Promise<number> {
  const now = new Date().toISOString();
  const id = await nextId("leads");

  await (await leads()).insertOne({
    _id: id,
    name: input.name,
    email: input.email,
    company: input.company,
    companySize: input.companySize ?? null,
    interest: input.interest,
    message: input.message ?? null,
    stage: "new",
    source: input.source ?? "contact-form",
    createdAt: now,
    updatedAt: now,
  } as LeadDoc);

  return id;
}

export async function setStage(id: number, stage: Stage): Promise<void> {
  await (await leads()).updateOne(
    { _id: id },
    { $set: { stage, updatedAt: new Date().toISOString() } }
  );
}

export async function addNote(leadId: number, body: string): Promise<void> {
  const now = new Date().toISOString();

  await (await notes()).insertOne({
    _id: await nextId("lead_notes"),
    leadId,
    body,
    createdAt: now,
  } as NoteDoc);

  // A note counts as activity on the lead, same as the SQL backend.
  await (await leads()).updateOne({ _id: leadId }, { $set: { updatedAt: now } });
}

export async function deleteLead(id: number): Promise<void> {
  // No cascade in Mongo — the notes have to go explicitly.
  await (await notes()).deleteMany({ leadId: id });
  await (await leads()).deleteOne({ _id: id });
}

/* ---------------------------------------------------------------- queries */

export async function listLeads(
  opts: { stage?: Stage; q?: string } = {}
): Promise<Lead[]> {
  const match: Document = {};
  if (opts.stage) match.stage = opts.stage;

  if (opts.q) {
    const rx = { $regex: escapeRegex(opts.q), $options: "i" };
    match.$or = [{ name: rx }, { email: rx }, { company: rx }, { interest: rx }];
  }

  // $lookup rather than a denormalised counter: the count stays correct
  // without a second write path to keep in sync, in one round trip.
  const docs = await (await leads())
    .aggregate<LeadDoc & { noteCount: number }>([
      { $match: match },
      { $sort: { createdAt: -1 } },
      { $limit: 500 },
      {
        $lookup: {
          from: "lead_notes",
          localField: "_id",
          foreignField: "leadId",
          as: "notes",
        },
      },
      { $addFields: { noteCount: { $size: "$notes" } } },
      { $project: { notes: 0 } },
    ])
    .toArray();

  return docs.map(toLead);
}

export async function getLead(id: number): Promise<Lead | null> {
  const doc = await (await leads()).findOne({ _id: id });
  if (!doc) return null;

  const noteCount = await (await notes()).countDocuments({ leadId: id });
  return toLead({ ...doc, noteCount });
}

export async function getNotes(leadId: number): Promise<Note[]> {
  const docs = await (await notes())
    .find({ leadId })
    .sort({ createdAt: -1 })
    .toArray();

  return docs.map((d) => ({
    id: Number(d._id),
    leadId: Number(d.leadId),
    body: String(d.body),
    createdAt: String(d.createdAt),
  }));
}

export async function stageCounts(): Promise<Record<string, number>> {
  const rows = await (await leads())
    .aggregate<{ _id: string; n: number }>([
      { $group: { _id: "$stage", n: { $sum: 1 } } },
    ])
    .toArray();

  const out: Record<string, number> = { all: 0 };
  for (const r of rows) {
    out[String(r._id)] = Number(r.n);
    out.all += Number(r.n);
  }
  return out;
}
