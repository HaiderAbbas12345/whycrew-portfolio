/**
 * Email delivery for contact submissions.
 *
 * Uses Resend's REST API directly over `fetch` — no SDK dependency, and the
 * same shape works against any provider that takes a JSON POST (see README for
 * swapping in Mailgun EU, Brevo, or Postmark).
 */

export interface Submission {
  name: string;
  email: string;
  company: string;
  companySize?: string;
  interest: string;
  message?: string;
}

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/* ------------------------------------------------------------------ config */

export function emailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  // LEAD_* are the names already configured in Vercel from the previous site,
  // so an existing deployment keeps working untouched. CONTACT_* are accepted
  // as aliases for a clean setup.
  const to = process.env.LEAD_TO_EMAIL ?? process.env.CONTACT_TO_EMAIL;
  // Must be an address on a domain verified with the provider.
  const from =
    process.env.LEAD_FROM_EMAIL ??
    process.env.CONTACT_FROM_EMAIL ??
    "WhyCrew <onboarding@resend.dev>";
  const autoReply = process.env.CONTACT_AUTOREPLY === "true";
  return { apiKey, to, from, autoReply, enabled: Boolean(apiKey && to) };
}

/* ------------------------------------------------------------- notification */

function notificationHtml(s: Submission, receivedAt: string) {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1b2848;color:#7d8cad;font:600 11px/1.4 ui-monospace,Menlo,monospace;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap;vertical-align:top">${esc(label)}</td>
      <td style="padding:10px 16px;border-bottom:1px solid #1b2848;color:#f2f6ff;font:400 14px/1.6 -apple-system,Segoe UI,sans-serif">${esc(value) || "—"}</td>
    </tr>`;

  return `<!doctype html>
<html><body style="margin:0;background:#04060d;padding:32px 16px">
  <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;width:100%;background:#0b1122;border:1px solid #1b2848;border-radius:14px;overflow:hidden">
    <tr>
      <td style="padding:24px 24px 18px;border-bottom:1px solid #1b2848">
        <p style="margin:0 0 6px;color:#2dd4a8;font:600 11px/1.4 ui-monospace,Menlo,monospace;letter-spacing:.2em;text-transform:uppercase">New enquiry — whycrew.com</p>
        <h1 style="margin:0;color:#f2f6ff;font:600 20px/1.3 -apple-system,Segoe UI,sans-serif">${esc(s.interest)}</h1>
      </td>
    </tr>
    <tr><td>
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        ${row("Name", s.name)}
        ${row("Work email", s.email)}
        ${row("Company", s.company)}
        ${row("Company size", s.companySize ?? "")}
        ${row("Looking to build", s.interest)}
        ${row("Received", receivedAt)}
      </table>
    </td></tr>
    ${
      s.message?.trim()
        ? `<tr><td style="padding:18px 24px 24px">
             <p style="margin:0 0 8px;color:#7d8cad;font:600 11px/1.4 ui-monospace,Menlo,monospace;letter-spacing:.12em;text-transform:uppercase">Message</p>
             <p style="margin:0;color:#b9c5de;font:400 14px/1.7 -apple-system,Segoe UI,sans-serif;white-space:pre-wrap">${esc(s.message)}</p>
           </td></tr>`
        : ""
    }
    <tr>
      <td style="padding:16px 24px;background:#070b16;border-top:1px solid #1b2848">
        <p style="margin:0;color:#56648a;font:400 12px/1.6 -apple-system,Segoe UI,sans-serif">Reply directly to this email to reach ${esc(s.name)}.</p>
      </td>
    </tr>
  </table>
</body></html>`;
}

function notificationText(s: Submission, receivedAt: string) {
  return [
    `New enquiry — whycrew.com`,
    ``,
    `Interest:      ${s.interest}`,
    `Name:          ${s.name}`,
    `Work email:    ${s.email}`,
    `Company:       ${s.company}`,
    `Company size:  ${s.companySize || "—"}`,
    `Received:      ${receivedAt}`,
    ``,
    `Message:`,
    s.message?.trim() || "(none)",
    ``,
    `Reply directly to this email to reach ${s.name}.`,
  ].join("\n");
}

/* ---------------------------------------------------------------- auto-reply */

function autoReplyHtml(s: Submission) {
  return `<!doctype html>
<html><body style="margin:0;background:#04060d;padding:32px 16px">
  <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;width:100%;background:#0b1122;border:1px solid #1b2848;border-radius:14px">
    <tr><td style="padding:32px 28px">
      <p style="margin:0 0 18px;color:#2dd4a8;font:600 11px/1.4 ui-monospace,Menlo,monospace;letter-spacing:.2em;text-transform:uppercase">WhyCrew</p>
      <h1 style="margin:0 0 16px;color:#f2f6ff;font:600 22px/1.3 -apple-system,Segoe UI,sans-serif">Thanks ${esc(s.name.split(" ")[0])} — we've got it.</h1>
      <p style="margin:0 0 14px;color:#b9c5de;font:400 15px/1.7 -apple-system,Segoe UI,sans-serif">An engineer will reply within one business day. Technical consultations are usually scheduled within 48 hours of that first reply.</p>
      <p style="margin:0 0 14px;color:#b9c5de;font:400 15px/1.7 -apple-system,Segoe UI,sans-serif">You reached the engineering team directly — we don't have a sales team, so the person who replies is the person who'd scope the work.</p>
      <p style="margin:0 0 24px;color:#b9c5de;font:400 15px/1.7 -apple-system,Segoe UI,sans-serif">For reference, you told us you're looking at: <strong style="color:#f2f6ff">${esc(s.interest)}</strong>.</p>
      <p style="margin:0;padding-top:20px;border-top:1px solid #1b2848;color:#56648a;font:400 13px/1.6 -apple-system,Segoe UI,sans-serif">Active security incident? Don't wait on this thread — email <a href="mailto:incident@whycrew.com" style="color:#2dd4a8">incident@whycrew.com</a>, monitored 24/7 for existing clients.</p>
    </td></tr>
  </table>
</body></html>`;
}

/* ------------------------------------------------------------------- sending */

async function resendSend(
  apiKey: string,
  payload: Record<string, unknown>
): Promise<void> {
  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend responded ${res.status}: ${detail.slice(0, 300)}`);
  }
}

/**
 * Sends the internal notification. Throws if delivery fails so the caller can
 * surface a real error instead of silently losing the lead.
 */
export async function sendContactEmail(s: Submission): Promise<void> {
  const { apiKey, to, from, autoReply } = emailConfig();
  if (!apiKey || !to) throw new Error("Email is not configured.");

  const receivedAt = new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC";

  await resendSend(apiKey, {
    from,
    to: to.split(",").map((a) => a.trim()),
    // Hitting reply in the inbox goes straight back to the prospect.
    reply_to: s.email,
    subject: `[${s.interest}] ${s.company} — ${s.name}`,
    html: notificationHtml(s, receivedAt),
    text: notificationText(s, receivedAt),
  });

  // Best-effort courtesy reply — never fail the submission over it.
  if (autoReply) {
    try {
      await resendSend(apiKey, {
        from,
        to: [s.email],
        reply_to: to.split(",")[0].trim(),
        subject: "We got your message — WhyCrew",
        html: autoReplyHtml(s),
        text: `Thanks ${s.name.split(" ")[0]} — we've got it.\n\nAn engineer will reply within one business day. Technical consultations are usually scheduled within 48 hours of that first reply.\n\nYou reached the engineering team directly — we don't have a sales team, so the person who replies is the person who'd scope the work.\n\nFor reference, you told us you're looking at: ${s.interest}.\n\nActive security incident? Don't wait on this thread — email incident@whycrew.com, monitored 24/7 for existing clients.`,
      });
    } catch (err) {
      console.error("[contact] auto-reply failed (submission still delivered):", err);
    }
  }
}
