import { LoginForm } from "@/components/admin/login-form";
import { hasDatabase } from "@/lib/db";

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-charcoal px-5 text-cream grain">
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center">
          <div className="font-display text-3xl tracking-tight">
            O&rsquo;Hara <span className="text-clay-soft">&amp;</span> Gercke
          </div>
          <p className="mt-2 text-sm uppercase tracking-[0.22em] text-cream/40">
            Studio Admin
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur">
          <LoginForm />
        </div>

        {!hasDatabase && (
          <p className="mt-6 text-center text-xs leading-relaxed text-cream/40">
            Preview mode — sign in with your dev credentials from{" "}
            <code className="text-cream/60">.env.local</code>.
          </p>
        )}
      </div>
    </div>
  );
}
