import { getSubmissions } from "@/lib/admin-data";
import { hasDatabase } from "@/lib/db";
import { AdminHeader } from "@/components/admin/ui";
import { SubmissionsList } from "@/components/admin/submissions-list";

export default async function AdminSubmissionsPage() {
  const submissions = await getSubmissions();
  return (
    <>
      <AdminHeader
        title="Enquiries"
        description={
          hasDatabase
            ? "Messages submitted through the contact form."
            : "Contact-form messages appear here once a database is connected."
        }
      />
      <SubmissionsList submissions={submissions} />
    </>
  );
}
