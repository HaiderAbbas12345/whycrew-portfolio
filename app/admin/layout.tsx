import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Leads — WhyCrew Admin" },
  // Internal tooling: keep it out of the index entirely, and out of any
  // referrer sent to a third party.
  robots: { index: false, follow: false, nocache: true },
  referrer: "no-referrer",
};

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </div>
  );
}
