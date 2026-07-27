"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Mail, Phone, Check, Trash2, Circle } from "lucide-react";
import {
  setSubmissionHandled,
  deleteSubmission,
} from "@/lib/actions/content";
import type { Submission } from "@/lib/admin-data";
import { Card } from "@/components/admin/ui";
import { formatDate, cn } from "@/lib/utils";

export function SubmissionsList({
  submissions,
}: {
  submissions: Submission[];
}) {
  const router = useRouter();
  const [items, setItems] = useState(submissions);
  const [, start] = useTransition();

  const toggle = (s: Submission) => {
    setItems(items.map((x) => (x.id === s.id ? { ...x, handled: !x.handled } : x)));
    start(async () => {
      try {
        await setSubmissionHandled(s.id, !s.handled);
        router.refresh();
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Could not update");
      }
    });
  };

  const del = (s: Submission) => {
    if (!confirm(`Delete the message from ${s.name}?`)) return;
    start(async () => {
      try {
        await deleteSubmission(s.id);
        setItems(items.filter((x) => x.id !== s.id));
        toast.success("Message deleted");
        router.refresh();
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Could not delete");
      }
    });
  };

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line-strong p-14 text-center text-stone">
        No enquiries yet. Messages submitted through the contact form will appear
        here.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((s) => (
        <Card
          key={s.id}
          className={cn("p-5", s.handled && "opacity-70")}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                {!s.handled && <Circle className="size-2 fill-clay text-clay" />}
                <span className="font-medium text-ink">{s.name}</span>
              </div>
              <div className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-stone">
                <a
                  href={`mailto:${s.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-clay"
                >
                  <Mail className="size-3.5" />
                  {s.email}
                </a>
                {s.phone && (
                  <a
                    href={`tel:${s.phone.replace(/[^0-9]/g, "")}`}
                    className="inline-flex items-center gap-1.5 hover:text-clay"
                  >
                    <Phone className="size-3.5" />
                    {s.phone}
                  </a>
                )}
              </div>
            </div>
            <span className="shrink-0 text-xs text-mist">
              {formatDate(s.createdAt)}
            </span>
          </div>

          <p className="mt-4 whitespace-pre-wrap rounded-xl bg-bone/70 p-4 text-[0.95rem] leading-relaxed text-graphite">
            {s.message}
          </p>

          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => del(s)}
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium text-clay hover:bg-clay/10"
            >
              <Trash2 className="size-4" />
              Delete
            </button>
            <button
              onClick={() => toggle(s)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                s.handled
                  ? "border border-line text-stone hover:bg-ink/5"
                  : "bg-ink text-cream hover:bg-graphite"
              )}
            >
              <Check className="size-4" />
              {s.handled ? "Handled" : "Mark handled"}
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}
