"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { LogIn } from "lucide-react";
import { loginAction, type LoginState } from "@/lib/actions/auth";

const field =
  "w-full rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3 text-cream placeholder:text-cream/35 transition-colors focus:border-clay-soft/50 focus:outline-none focus:ring-4 focus:ring-clay/15";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-cream font-medium text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60"
    >
      {pending ? "Signing in…" : "Sign in"}
      {!pending && <LogIn className="size-4" />}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState<LoginState, FormData>(
    loginAction,
    {}
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm text-cream/70" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          placeholder="you@oharagercke.com"
          className={field}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm text-cream/70" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          className={field}
        />
      </div>
      {state.error && (
        <p className="rounded-xl border border-clay/40 bg-clay/15 px-4 py-2.5 text-sm text-clay-soft">
          {state.error}
        </p>
      )}
      <SubmitButton />
    </form>
  );
}
