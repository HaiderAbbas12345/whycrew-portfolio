import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

type Lead = {
  name: string;
  company: string;
  email: string;
  siem: string;
  tenants: string;
  spend: string;
  note: string;
  page: string;
};

const MAX = { short: 120, long: 2000 };

function clean(v: unknown, limit: number) {
  return typeof v === "string" ? v.trim().slice(0, limit) : "";
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

function asText(lead: Lead) {
  return [
    `Name:            ${lead.name}`,
    `Email:           ${lead.email}`,
    `MSSP / company:  ${lead.company}`,
    `Current SIEM:    ${lead.siem || "—"}`,
    `Clients/tenants: ${lead.tenants || "—"}`,
    `Annual spend:    ${lead.spend || "—"}`,
    `Submitted from:  ${lead.page}`,
    "",
    lead.note || "(no additional notes)",
  ].join("\n");
}

/** Forward to a CRM/automation webhook (Zoho, Make, n8n, Zapier). */
async function toWebhook(lead: Lead): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, source: SITE.domain, receivedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
    return true;
  } catch (err) {
    console.error("[contact] webhook delivery failed:", err);
    return false;
  }
}

/** Send the lead as email via Resend. */
async function toEmail(lead: Lead): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL || SITE.email;
  const from = process.env.LEAD_FROM_EMAIL;
  if (!key || !from) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email,
        subject: `Discovery call — ${lead.company || lead.name}`,
        text: asText(lead),
      }),
    });
    if (!res.ok) throw new Error(`resend responded ${res.status}: ${await res.text()}`);
    return true;
  } catch (err) {
    console.error("[contact] email delivery failed:", err);
    return false;
  }
}

export async function POST(req: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  // Bots fill hidden fields; humans never see this one.
  if (clean(raw.website, MAX.short)) {
    return NextResponse.json({ ok: true });
  }

  const lead: Lead = {
    name: clean(raw.name, MAX.short),
    company: clean(raw.company, MAX.short),
    email: clean(raw.email, MAX.short),
    siem: clean(raw.siem, MAX.short),
    tenants: clean(raw.tenants, MAX.short),
    spend: clean(raw.spend, MAX.short),
    note: clean(raw.note, MAX.long),
    page: clean(raw.page, MAX.short) || "/",
  };

  if (!lead.name || !lead.company) {
    return NextResponse.json(
      { ok: false, error: "Please include your name and company." },
      { status: 422 }
    );
  }
  if (!isEmail(lead.email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid work email so we can reply." },
      { status: 422 }
    );
  }

  const results = await Promise.all([toWebhook(lead), toEmail(lead)]);
  if (results.some(Boolean)) {
    return NextResponse.json({ ok: true });
  }

  // Nothing configured. In development that's expected — log it and let the UI
  // flow be testable. In production it means a real lead would be dropped, so
  // fail loudly and let the form show its email fallback.
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "[contact] no delivery channel configured (LEAD_WEBHOOK_URL / RESEND_API_KEY).\n" +
        "Lead captured in dev only:\n" +
        asText(lead)
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  console.error("[contact] LEAD DROPPED — no delivery channel configured.", asText(lead));
  return NextResponse.json(
    { ok: false, error: "We couldn't submit that just now." },
    { status: 503 }
  );
}
