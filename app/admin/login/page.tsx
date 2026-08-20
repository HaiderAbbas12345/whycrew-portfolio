import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-auth";
import { LoginForm } from "@/components/admin/login-form";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await isAuthenticated()) redirect("/admin");

  return (
    <div className="mx-auto max-w-sm py-16">
      <h1 className="text-lg font-semibold text-bright">Sign in</h1>
      <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
        This area lists inbound leads and is not public.
      </p>
      <LoginForm />
    </div>
  );
}
