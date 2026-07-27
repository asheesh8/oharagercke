import { notFound } from "next/navigation";
import { getAdminProject } from "@/lib/admin-data";
import { ProjectEditor } from "@/components/admin/project-editor";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getAdminProject(id);
  if (!project) notFound();
  return <ProjectEditor project={project} />;
}
