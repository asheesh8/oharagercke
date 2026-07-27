import { getSettings } from "@/lib/content";
import { AdminHeader } from "@/components/admin/ui";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function AdminSettingsPage() {
  const settings = await getSettings();
  return (
    <>
      <AdminHeader
        title="Site settings"
        description="Your firm's identity, hero content and contact details — used across the public site."
      />
      <SettingsForm settings={settings} />
    </>
  );
}
