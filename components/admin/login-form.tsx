"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "@/app/admin/actions";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-4 w-full rounded-md bg-brand px-4 py-3 text-[13.5px] font-semibold text-white transition-opacity disabled:opacity-60"
    >
      {pending ? "Checking…" : "Sign in"}
    </button>
  );
}

const labelClass =
  "mb-2 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted";

const inputClass =
  "w-full rounded-md border border-line/70 bg-void/60 px-4 py-3 text-[14px] text-bright outline-none transition-all duration-300 focus:border-accent/60 focus:bg-void";

export function LoginForm() {
  const [error, action] = useActionState(login, null);

  return (
    <form action={action} className="mt-7">
      <label htmlFor="username" className={labelClass}>
        Username
      </label>
      <input
        id="username"
        name="username"
        type="text"
        autoComplete="username"
        autoCapitalize="none"
        spellCheck={false}
        required
        autoFocus
        className={inputClass}
      />

      <div className="mt-5">
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </div>

      {error && (
        <p role="alert" className="mt-3 text-[13px] text-red-400">
          {error}
        </p>
      )}
      <Submit />
    </form>
  );
}
