import Link from "next/link";
import {
  Images,
  Quote,
  Users,
  Inbox,
  Star,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { getAdminCounts, getSubmissions } from "@/lib/admin-data";
import { getCurrentAdmin } from "@/lib/auth";
import { AdminHeader, Card } from "@/components/admin/ui";
import { buttonVariants } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const [counts, submissions, admin] = await Promise.all([
    getAdminCounts(),
    getSubmissions(),
    getCurrentAdmin(),
  ]);

  const stats = [
    { label: "Projects", value: counts.projects, icon: Images, href: "/admin/projects" },
    { label: "Featured", value: counts.featured, icon: Star, href: "/admin/projects" },
    { label: "Testimonials", value: counts.testimonials, icon: Quote, href: "/admin/testimonials" },
    { label: "Team", value: counts.team, icon: Users, href: "/admin/team" },
    { label: "New messages", value: counts.unhandled, icon: Inbox, href: "/admin/submissions" },
  ];

  const firstName = admin?.name?.split(" ")[0] || "there";

  return (
    <>
      <AdminHeader
        title={`Welcome back, ${firstName}.`}
        description="Manage your portfolio, testimonials, team and enquiries — all in one place."
      >
        <Link
          href="/admin/projects/new"
          className={buttonVariants({ variant: "primary", size: "md" })}
        >
          <Plus className="size-4" />
          New project
        </Link>
      </AdminHeader>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <Card className="group h-full p-5 transition-all hover:-translate-y-0.5 hover:border-line-strong">
              <div className="flex items-center justify-between">
                <s.icon className="size-5 text-clay" />
                <ArrowUpRight className="size-4 text-mist opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="mt-6 font-display text-4xl tracking-tight text-ink">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-stone">{s.label}</div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl text-ink">Recent enquiries</h2>
            <Link
              href="/admin/submissions"
              className="text-sm font-medium text-clay hover:text-clay-deep"
            >
              View all
            </Link>
          </div>
          {submissions.length === 0 ? (
            <p className="py-8 text-center text-sm text-stone">
              No enquiries yet. Messages from the contact form appear here.
            </p>
          ) : (
            <ul className="divide-y divide-line">
              {submissions.slice(0, 5).map((s) => (
                <li key={s.id} className="flex items-center gap-3 py-3">
                  <span
                    className={
                      "size-2 shrink-0 rounded-full " +
                      (s.handled ? "bg-line-strong" : "bg-clay")
                    }
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-ink">
                      {s.name}
                    </div>
                    <div className="truncate text-xs text-stone">{s.email}</div>
                  </div>
                  <span className="shrink-0 text-xs text-mist">
                    {formatDate(s.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <h2 className="mb-4 font-display text-xl text-ink">Quick actions</h2>
          <div className="flex flex-col gap-2">
            {[
              { href: "/admin/projects/new", label: "Add a new project" },
              { href: "/admin/testimonials", label: "Add a testimonial" },
              { href: "/admin/settings", label: "Edit site settings" },
              { href: "/admin/team", label: "Manage the team" },
            ].map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="flex items-center justify-between rounded-xl border border-line bg-paper px-4 py-3 text-sm font-medium text-graphite transition-colors hover:border-line-strong hover:text-ink"
              >
                {a.label}
                <ArrowUpRight className="size-4 text-mist" />
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
