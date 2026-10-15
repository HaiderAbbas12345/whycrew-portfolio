import { SITE } from "@/lib/site";

export type LeadStatus =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; reference: number | null }
  | { kind: "unconfigured"; mailto: string }
  | { kind: "error"; message: string };

/**
 * Posts a lead to /api/contact and maps the response to a UI status.
 *
 * Shared by the contact page form and the booking popup so both land in the
 * same inbox and admin pipeline, and both fall back to a prefilled mailto:
 * when delivery isn't configured rather than silently dropping the lead.
 */
export async function submitLead(
  data: Record<string, string>
): Promise<Exclude<LeadStatus, { kind: "idle" } | { kind: "sending" }>> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const ok = (await res.json().catch(() => ({}))) as {
        reference?: number | null;
      };
      return { kind: "sent", reference: ok.reference ?? null };
    }

    const body = (await res.json().catch(() => ({}))) as {
      configured?: boolean;
      error?: string;
    };

    if (body.configured === false) {
      const subject = encodeURIComponent(
        `[${data.interest || "Enquiry"}] ${data.company || ""} — ${data.name || ""}`
      );
      const lines = [
        `Name: ${data.name ?? ""}`,
        `Work email: ${data.email ?? ""}`,
        `Company: ${data.company ?? ""}`,
        `Company size: ${data.companySize ?? ""}`,
        `Looking to build: ${data.interest ?? ""}`,
        "",
        data.message ?? "",
      ];
      return {
        kind: "unconfigured",
        mailto: `mailto:${SITE.email}?subject=${subject}&body=${encodeURIComponent(
          lines.join("\n")
        )}`,
      };
    }

    return {
      kind: "error",
      message: body.error ?? "Something went wrong. Please try again.",
    };
  } catch {
    return {
      kind: "error",
      message: "Network error. Please try again or email us directly.",
    };
  }
}
