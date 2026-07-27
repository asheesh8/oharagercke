"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Images,
  Quote,
  Users,
  Inbox,
  Settings,
  ExternalLink,
  LogOut,
  TriangleAlert,
} from "lucide-react";
import { logoutAction } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/projects", label: "Projects", icon: Images },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/submissions", label: "Submissions", icon: Inbox },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({
  children,
  adminEmail,
  hasDatabase,
  unhandled = 0,
}: {
  children: React.ReactNode;
  adminEmail: string;
  hasDatabase: boolean;
  unhandled?: number;
}) {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const navItems = (
    <>
      {links.map((l) => {
        const active = isActive(l.href, l.exact);
        return (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "group flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-cream/10 text-cream"
                : "text-cream/60 hover:bg-cream/[0.06] hover:text-cream"
            )}
          >
            <l.icon
              className={cn(
                "size-4.5 shrink-0",
                active ? "text-clay-soft" : "text-cream/45"
              )}
            />
            <span className="flex-1">{l.label}</span>
            {l.href === "/admin/submissions" && unhandled > 0 && (
              <span className="grid min-w-5 place-items-center rounded-full bg-clay px-1.5 text-[0.65rem] font-semibold text-cream">
                {unhandled}
              </span>
            )}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="lg:pl-64">
      {/* Sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/5 bg-charcoal px-4 py-6 text-cream lg:flex">
        <Link href="/admin" className="px-3.5 font-display text-2xl tracking-tight">
          O&rsquo;Hara <span className="text-clay-soft">&amp;</span> Gercke
        </Link>
        <p className="mb-6 mt-1 px-3.5 text-[0.7rem] uppercase tracking-[0.2em] text-cream/35">
          Studio Admin
        </p>
        <nav className="flex flex-1 flex-col gap-1">{navItems}</nav>
        <div className="mt-4 border-t border-white/5 pt-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm text-cream/60 transition-colors hover:bg-cream/[0.06] hover:text-cream"
          >
            <ExternalLink className="size-4.5 text-cream/45" />
            View live site
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm text-cream/60 transition-colors hover:bg-cream/[0.06] hover:text-cream"
            >
              <LogOut className="size-4.5 text-cream/45" />
              Sign out
            </button>
          </form>
          <p className="mt-3 truncate px-3.5 text-xs text-cream/30">{adminEmail}</p>
        </div>
      </aside>

      {/* Top bar (mobile) */}
      <div className="sticky top-0 z-40 flex items-center gap-3 border-b border-line bg-charcoal px-4 py-3 text-cream lg:hidden">
        <Link href="/admin" className="font-display text-xl tracking-tight">
          O&rsquo;Hara <span className="text-clay-soft">&amp;</span> Gercke
        </Link>
        <form action={logoutAction} className="ml-auto">
          <button className="rounded-full p-2 text-cream/70 hover:text-cream">
            <LogOut className="size-5" />
          </button>
        </form>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-b border-line bg-charcoal px-3 pb-3 text-cream lg:hidden">
        {links.map((l) => {
          const active = isActive(l.href, l.exact);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-sm",
                active ? "bg-cream/15 text-cream" : "text-cream/55"
              )}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>

      {/* Content */}
      <main className="min-h-screen px-5 py-8 sm:px-8 lg:py-10">
        {!hasDatabase && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-oak/40 bg-oak/10 px-4 py-3 text-sm text-graphite">
            <TriangleAlert className="mt-0.5 size-4.5 shrink-0 text-oak" />
            <p>
              <strong className="font-semibold">Preview mode.</strong> No
              database is connected, so content shows from seed data and edits
              won&rsquo;t save. Add your Supabase{" "}
              <code className="rounded bg-ink/5 px-1">DATABASE_URL</code> and run{" "}
              <code className="rounded bg-ink/5 px-1">pnpm db:seed</code> to
              enable saving.
            </p>
          </div>
        )}
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
