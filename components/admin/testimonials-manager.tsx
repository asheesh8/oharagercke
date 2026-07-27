"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Trash2, Save, ChevronUp, ChevronDown } from "lucide-react";
import {
  saveTestimonial,
  deleteTestimonial,
  reorderTestimonials,
} from "@/lib/actions/content";
import type { AdminTestimonial } from "@/lib/admin-data";
import { Card, adminField, adminLabel } from "@/components/admin/ui";
import { Toggle } from "@/components/admin/toggle";

type Item = AdminTestimonial & { _new?: boolean };

export function TestimonialsManager({
  testimonials,
}: {
  testimonials: AdminTestimonial[];
}) {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>(testimonials);
  const [, start] = useTransition();

  const update = (i: number, patch: Partial<Item>) =>
    setItems(items.map((x, idx) => (idx === i ? { ...x, ...patch } : x)));

  const addNew = () =>
    setItems([
      {
        id: `new-${Date.now()}`,
        quote: "",
        town: "",
        order: 0,
        published: true,
        _new: true,
      },
      ...items,
    ]);

  const save = (i: number) => {
    const it = items[i];
    if (!it.quote.trim()) return toast.error("Add a quote first.");
    start(async () => {
      try {
        await saveTestimonial({
          id: it._new ? undefined : it.id,
          quote: it.quote,
          town: it.town,
          published: it.published,
        });
        toast.success("Testimonial saved");
        router.refresh();
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Could not save");
      }
    });
  };

  const del = (i: number) => {
    const it = items[i];
    if (it._new) return setItems(items.filter((_, idx) => idx !== i));
    if (!confirm("Delete this testimonial?")) return;
    start(async () => {
      try {
        await deleteTestimonial(it.id);
        setItems(items.filter((_, idx) => idx !== i));
        toast.success("Deleted");
        router.refresh();
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Could not delete");
      }
    });
  };

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    setItems(next);
    const ids = next.filter((x) => !x._new).map((x) => x.id);
    start(async () => {
      try {
        await reorderTestimonials(ids);
        router.refresh();
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Could not reorder");
      }
    });
  };

  return (
    <div className="space-y-4">
      <button
        onClick={addNew}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-line-strong py-4 text-sm font-medium text-stone transition-colors hover:border-clay/50 hover:text-ink"
      >
        <Plus className="size-4" />
        Add testimonial
      </button>

      {items.map((t, i) => (
        <Card key={t.id} className="space-y-3">
          <div>
            <label className={adminLabel}>Quote</label>
            <textarea
              value={t.quote}
              onChange={(e) => update(i, { quote: e.target.value })}
              rows={3}
              className={`${adminField} resize-none`}
              placeholder="What the client said…"
            />
          </div>
          <div className="flex flex-wrap items-end gap-4">
            <div className="min-w-[180px] flex-1">
              <label className={adminLabel}>Attribution (town)</label>
              <input
                value={t.town}
                onChange={(e) => update(i, { town: e.target.value })}
                className={adminField}
                placeholder="Norwich, VT"
              />
            </div>
            <div className="pb-1">
              <Toggle
                label="Published"
                checked={t.published}
                onChange={(v) => update(i, { published: v })}
              />
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-line pt-3">
            <div className="flex gap-1">
              <button
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="grid size-9 place-items-center rounded-lg text-stone hover:bg-ink/5 disabled:opacity-30"
              >
                <ChevronUp className="size-4" />
              </button>
              <button
                onClick={() => move(i, 1)}
                disabled={i === items.length - 1}
                className="grid size-9 place-items-center rounded-lg text-stone hover:bg-ink/5 disabled:opacity-30"
              >
                <ChevronDown className="size-4" />
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => del(i)}
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium text-clay hover:bg-clay/10"
              >
                <Trash2 className="size-4" />
                Delete
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
        </Card>
      ))}
    </div>
  );
}
