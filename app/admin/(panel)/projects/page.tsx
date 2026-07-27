import Link from "next/link";
import { Plus } from "lucide-react";
import { getAdminProjects } from "@/lib/admin-data";
import { AdminHeader } from "@/components/admin/ui";
import { buttonVariants } from "@/components/ui/button";
import { ProjectsList } from "@/components/admin/projects-list";

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects();

  return (
    <>
      <AdminHeader
        title="Projects"
        description="Drag to reorder how projects appear across the site. Click a project to edit its details, gallery and visibility."
      >
        <Link
          href="/admin/projects/new"
          className={buttonVariants({ variant: "primary", size: "md" })}
        >
          <Plus className="size-4" />
          New project
        </Link>
      </AdminHeader>
      <ProjectsList projects={projects} />
    </>
  );
}
