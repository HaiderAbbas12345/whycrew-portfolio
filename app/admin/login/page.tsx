import { redirect } from "next/navigation";
import { adminConfigError, isAuthenticated } from "@/lib/admin-auth";
import { LoginForm } from "@/components/admin/login-form";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await isAuthenticated()) redirect("/admin");

  /**
   * A misconfigured deployment has to be diagnosable, but the reason is only
   * shown in development: in production it would tell anyone who finds this
   * page whether the admin user exists yet. There, it goes to the server log.
   */
  const configError = adminConfigError();
  const showReason = configError && process.env.NODE_ENV !== "production";
  if (configError && !showReason) {
    console.error("[admin] sign-in unavailable:", configError);
  }

  return (
    <div className="mx-auto max-w-sm py-16">
      <h1 className="text-lg font-semibold text-bright">Sign in</h1>
      <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
        This area lists inbound leads and is not public.
      </p>

      {showReason ? (
        <div className="mt-6 rounded-lg border border-amber-500/40 bg-amber-500/6 p-4">
          <p className="text-[13px] font-semibold text-amber-300">
            Sign-in is not configured
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-body">{configError}</p>
          <p className="mt-2 font-mono text-[11.5px] text-faint">npm run seed:admin</p>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}
