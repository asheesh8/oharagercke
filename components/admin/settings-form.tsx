"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { saveSettings, type SettingsInput } from "@/lib/actions/content";
import type { SettingsView } from "@/lib/content";
import { Card, adminField, adminLabel } from "@/components/admin/ui";
import { ImageInput } from "@/components/admin/image-input";
import { Button } from "@/components/ui/button";

export function SettingsForm({ settings }: { settings: SettingsView }) {
  const router = useRouter();
  const [s, setS] = useState<SettingsInput>(settings);
  const [, start] = useTransition();

  const set = (patch: Partial<SettingsInput>) => setS({ ...s, ...patch });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    start(async () => {
      try {
        await saveSettings(s);
        toast.success("Settings saved");
        router.refresh();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Could not save");
      }
    });
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-4">
          <h3 className="font-display text-lg text-ink">Identity</h3>
          <div>
            <label className={adminLabel}>Company name</label>
            <input
              value={s.companyName}
              onChange={(e) => set({ companyName: e.target.value })}
              className={adminField}
            />
          </div>
          <div>
            <label className={adminLabel}>Hero headline</label>
            <input
              value={s.heroHeadline}
              onChange={(e) => set({ heroHeadline: e.target.value })}
              className={adminField}
            />
          </div>
          <div>
            <label className={adminLabel}>Hero subheadline</label>
            <textarea
              value={s.heroSubhead}
              onChange={(e) => set({ heroSubhead: e.target.value })}
              rows={3}
              className={`${adminField} resize-none`}
            />
          </div>
          <div>
            <label className={adminLabel}>Tagline</label>
            <textarea
              value={s.tagline}
              onChange={(e) => set({ tagline: e.target.value })}
              rows={3}
              className={`${adminField} resize-none`}
            />
          </div>
        </Card>

        <Card className="space-y-4">
          <h3 className="font-display text-lg text-ink">Contact</h3>
          <div>
            <label className={adminLabel}>Address</label>
            <input
              value={s.address}
              onChange={(e) => set({ address: e.target.value })}
              className={adminField}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={adminLabel}>Phone</label>
              <input
                value={s.phone}
                onChange={(e) => set({ phone: e.target.value })}
                className={adminField}
              />
            </div>
            <div>
              <label className={adminLabel}>Email</label>
              <input
                value={s.email}
                onChange={(e) => set({ email: e.target.value })}
                className={adminField}
              />
            </div>
          </div>
          <div>
            <label className={adminLabel}>Hero video URL</label>
            <input
              value={s.heroVideo}
              onChange={(e) => set({ heroVideo: e.target.value })}
              className={adminField}
              placeholder="/hero.mp4"
            />
          </div>
        </Card>
      </div>

      <Card>
        <label className={adminLabel}>Hero poster image</label>
        <p className="mb-3 text-sm text-stone">
          Shown before the hero video loads (and as a fallback on slow
          connections).
        </p>
        <div className="max-w-md">
          <ImageInput
            value={s.heroPoster}
            onChange={(url) => set({ heroPoster: url })}
          />
        </div>
      </Card>

      <div className="flex justify-end">
        <Button type="submit">
          <Save className="size-4" />
          Save settings
        </Button>
      </div>
    </form>
  );
}
