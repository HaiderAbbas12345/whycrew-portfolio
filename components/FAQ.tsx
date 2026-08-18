import { FaqList, type FaqItem } from "./FaqList";

/**
 * The objection-handling FAQ for /for-mssps. Exported as data so the same
 * questions can feed FAQPage structured data and be reused elsewhere; rendering
 * is delegated to FaqList, which keeps every answer in the server HTML.
 */
export const MSSP_FAQS: FaqItem[] = [
  {
    q: "Can a small firm really match Splunk or Sentinel?",
    a: "We're not asking you to trust our SIEM over theirs. We build you your own platform that does the job, you own it, and we've already done exactly this for another MSSP. We compete on ownership, not on being a bigger product — you stop renting a billion-dollar tool you'll never own and start owning one built for your tenants.",
  },
  {
    q: "Isn't switching our core operations a huge risk?",
    a: "That's why we never flip a switch. Your current SIEM keeps running until each tenant is proven on the new platform, in parallel. We migrate client by client, highest-cost first, so nothing breaks and you're never betting the operation on an unproven system.",
  },
  {
    q: "What if WhyCrew disappears?",
    a: "You own the platform and all your data outright, and the source code sits in escrow with a neutral third party. If we ever fail, the code is released to you automatically. You are never dependent on us surviving.",
  },
  {
    q: "Why not just build it in-house ourselves?",
    a: "You can — in theory. In practice the talent that builds secure, multi-tenant AI platforms is expensive and slow to hire, and while you're hiring, the savings aren't happening. We remove that burden and you still own the result, with a standard build priced from reuse of our core engine.",
  },
  {
    q: "The price feels high.",
    a: "It's lower than one year of what you'll keep paying your vendor forever — and unlike that vendor, it doesn't climb every year. We take 25% on signing and the rest against delivery milestones, so our work is protected and so is yours. Bring your real invoice and we'll put the comparison on the table.",
  },
  {
    q: "Do we still need our security analysts?",
    a: "Yes. We replace the rented platform and the part of the bill that climbs forever — not your team. The AI cuts the repetitive investigation grind, but the people who run your SOC stay. We only ever compare our build plus maintenance against your rented-platform cost, never against your whole operation.",
  },
];

export function FAQ() {
  return <FaqList items={MSSP_FAQS} />;
}
