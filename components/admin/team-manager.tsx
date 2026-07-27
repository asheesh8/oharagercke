"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Trash2, Save } from "lucide-react";
import { saveTeam, deleteTeam } from "@/lib/actions/content";
import type { AdminTeamMember } from "@/lib/admin-data";
import { Card, adminField, adminLabel } from "@/components/admin/ui";
import { Toggle } from "@/components/admin/toggle";
import { ImageInput } from "@/components/admin/image-input";

type Item = AdminTeamMember & { _new?: boolean };

export function TeamManager({ team }: { team: AdminTeamMember[] }) {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>(team);
  const [, start] = useTransition();

  const update = (i: number, patch: Partial<Item>) =>
    setItems(items.map((x, idx) => (idx === i ? { ...x, ...patch } : x)));

  const addNew = () =>
    setItems([
      ...items,
      {
        id: `new-${Date.now()}`,
        name: "",
        role: "",
        email: "",
        bio: "",
        photo: null,
        order: items.length + 1,
        published: true,
        _new: true,
      },
    ]);

  const save = (i: number) => {
    const it = items[i];
    if (!it.name.trim()) return toast.error("Add a name first.");
    start(async () => {
      try {
        await saveTeam({
          id: it._new ? undefined : it.id,
          name: it.name,
          role: it.role,
          email: it.email,
          bio: it.bio,
          photo: it.photo,
          published: it.published,
        });
        toast.success("Team member saved");
        router.refresh();
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Could not save");
      }
    });
  };

  const del = (i: number) => {
    const it = items[i];
    if (it._new) return setItems(items.filter((_, idx) => idx !== i));
    if (!confirm(`Remove ${it.name}?`)) return;
    start(async () => {
      try {
        await deleteTeam(it.id);
        setItems(items.filter((_, idx) => idx !== i));
        toast.success("Removed");
        router.refresh();
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Could not delete");
      }
    });
  };

  return (
    <div className="space-y-4">
      {items.map((m, i) => (
        <Card key={m.id} className="grid gap-5 sm:grid-cols-[200px_1fr]">
          <div>
            <label className={adminLabel}>Photo</label>
            <ImageInput
              value={m.photo ?? ""}
              onChange={(url) => update(i, { photo: url || null })}
            />
          </div>
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className={adminLabel}>Name</label>
                <input
                  value={m.name}
                  onChange={(e) => update(i, { name: e.target.value })}
                  className={adminField}
                />
              </div>
              <div>
                <label className={adminLabel}>Role</label>
                <input
                  value={m.role}
                  onChange={(e) => update(i, { role: e.target.value })}
                  className={adminField}
                  placeholder="Principal"
                />
              </div>
            </div>
            <div>
              <label className={adminLabel}>Email</label>
              <input
                value={m.email}
                onChange={(e) => update(i, { email: e.target.value })}
                className={adminField}
              />
            </div>
            <div>
              <label className={adminLabel}>Bio</label>
              <textarea
                value={m.bio}
                onChange={(e) => update(i, { bio: e.target.value })}
                rows={3}
                className={`${adminField} resize-none`}
              />
            </div>
            <div className="flex items-center justify-between border-t border-line pt-3">
              <Toggle
                label="Published"
                checked={m.published}
                onChange={(v) => update(i, { published: v })}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => del(i)}
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium text-clay hover:bg-clay/10"
                >
                  <Trash2 className="size-4" />
                  Remove
                </button>
                <button
                  onClick={() => save(i)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-cream hover:bg-graphite"
                >
                  <Save className="size-4" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </Card>
      ))}

      <button
        onClick={addNew}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-line-strong py-4 text-sm font-medium text-stone transition-colors hover:border-clay/50 hover:text-ink"
      >
        <Plus className="size-4" />
        Add team member
      </button>
    </div>
  );
}
