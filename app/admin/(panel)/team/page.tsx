import { getAdminTeam } from "@/lib/admin-data";
import { AdminHeader } from "@/components/admin/ui";
import { TeamManager } from "@/components/admin/team-manager";

export default async function AdminTeamPage() {
  const team = await getAdminTeam();
  return (
    <>
      <AdminHeader
        title="Team"
        description="The principals and team members shown on the About and Contact pages."
      />
      <TeamManager team={team} />
    </>
  );
}
