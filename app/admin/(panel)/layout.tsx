import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { hasDatabase } from "@/lib/db";
import { getAdminCounts } from "@/lib/admin-data";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  const counts = await getAdminCounts();

  return (
    <AdminShell
      adminEmail={admin.email}
      hasDatabase={hasDatabase}
      unhandled={counts.unhandled}
    >
      {children}
    </AdminShell>
  );
}
