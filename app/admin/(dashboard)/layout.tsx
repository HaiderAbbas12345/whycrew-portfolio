import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-auth";
import { logout } from "../actions";

export const dynamic = "force-dynamic";

/**
 * Auth gate for everything under /admin except the login page, which sits
 * outside this route group. Each server action re-checks the session too —
 * they're independently reachable, so this guard alone isn't sufficient.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");

  return (
    <>
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line/60 pb-5">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-faint">
            WhyCrew internal
          </p>
          <Link
            href="/admin"
            className="mt-1 block text-xl font-semibold text-bright transition-colors hover:text-accent"
          >
            Lead pipeline
          </Link>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-md border border-line/70 px-3.5 py-2 text-[12.5px] font-semibold text-muted transition-colors hover:border-accent/40 hover:text-accent"
          >
            Sign out
          </button>
        </form>
      </header>

      <main className="pb-24 pt-8">{children}</main>
    </>
  );
}
