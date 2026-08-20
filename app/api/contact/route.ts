import { NextResponse } from "next/server";
import { emailConfig, sendContactEmail, type Submission } from "@/lib/email";
import { createLead, leadsConfigured } from "@/lib/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Payload extends Partial<Submission> {
  /** honeypot — real users never fill this */
  website?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 120, email: 200, company: 160, interest: 120, message: 5000 };

/* --------------------------------------------------------- rate limiting */

/**
 * In-memory sliding window. Good enough for a single instance and stops the
 * obvious abuse; if this ever runs on more than one node, move it to Redis or
 * put the rate limit at the edge/CDN instead.
 */
const HITS = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 10;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (HITS.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  HITS.set(ip, recent);

  if (HITS.size > 5000) {
    for (const [k, v] of HITS) {
      if (!v.some((t) => now - t < WINDOW_MS)) HITS.delete(k);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

/* ------------------------------------------------------------------ route */

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again in a minute." },
      { status: 429 }
    );
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Bot caught by the honeypot — accept silently so it doesn't retry.
  if (body.website) return NextResponse.json({ ok: true });

  const missing: string[] = [];
  if (!body.name?.trim()) missing.push("name");
  if (!body.email?.trim()) missing.push("email");
  if (!body.company?.trim()) missing.push("company");
  if (!body.interest?.trim()) missing.push("interest");

  if (missing.length) {
    return NextResponse.json(
      { error: `Missing required field(s): ${missing.join(", ")}.` },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(body.email!.trim())) {
    return NextResponse.json(
      { error: "Please enter a valid work email address." },
      { status: 400 }
    );
  }

  const submission: Submission = {
    name: body.name!.trim().slice(0, MAX.name),
    email: body.email!.trim().slice(0, MAX.email),
    company: body.company!.trim().slice(0, MAX.company),
    companySize: body.companySize?.trim().slice(0, 32),
    interest: body.interest!.trim().slice(0, MAX.interest),
    message: body.message?.trim().slice(0, MAX.message),
  };

  const { enabled: emailEnabled } = emailConfig();
  const dbEnabled = leadsConfigured();
  // LEAD_WEBHOOK_URL is the name already set in Vercel from the previous site.
  const webhook =
    process.env.LEAD_WEBHOOK_URL ?? process.env.CONTACT_WEBHOOK_URL;

  /**
   * Nothing configured to capture the lead anywhere. Tell the client explicitly
   * rather than pretending it was received — the form falls back to a prefilled
   * mailto so nothing is lost. See README for setup.
   */
  if (!dbEnabled && !emailEnabled && !webhook) {
    console.warn(
      "[contact] no capture target configured (set ADMIN_PASSWORD + LEADS_DB_*, or RESEND_API_KEY + LEAD_TO_EMAIL) — submission not stored:",
      { ...submission, message: submission.message?.slice(0, 120) }
    );
    return NextResponse.json({ configured: false }, { status: 503 });
  }

  /**
   * Three independent channels, run concurrently: the lead database (the
   * durable record, readable at /admin), email, and an optional webhook
   * mirror. One failing never blocks the others; the request only errors if
   * every configured channel failed.
   */
  const results = await Promise.allSettled([
    dbEnabled ? createLead(submission) : Promise.reject(new Error("skip")),
    emailEnabled ? sendContactEmail(submission) : Promise.reject(new Error("skip")),
    webhook
      ? fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "whycrew.com/contact",
            receivedAt: new Date().toISOString(),
            ...submission,
          }),
        }).then((r) => {
          if (!r.ok) throw new Error(`Webhook responded ${r.status}`);
        })
      : Promise.reject(new Error("skip")),
  ]);

  const attempted = [dbEnabled, emailEnabled, Boolean(webhook)];
  const failures = results.filter(
    (r, i) => attempted[i] && r.status === "rejected"
  );

  for (const f of failures) {
    console.error("[contact] delivery failed:", (f as PromiseRejectedResult).reason);
  }

  const anyDelivered = results.some(
    (r, i) => attempted[i] && r.status === "fulfilled"
  );

  if (!anyDelivered) {
    return NextResponse.json(
      { error: "We couldn't deliver your message. Please email us directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
