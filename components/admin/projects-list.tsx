"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil, Star, EyeOff } from "lucide-react";
import { reorderProjects } from "@/lib/actions/content";
import type { AdminProject } from "@/lib/admin-data";
import { cn } from "@/lib/utils";

function Row({ project }: { project: AdminProject }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: project.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-line bg-cream p-3 sm:gap-4",
        isDragging && "z-10 shadow-xl"
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none rounded-lg p-1.5 text-mist hover:bg-ink/5 hover:text-stone active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <GripVertical className="size-5" />
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.coverImage}
        alt=""
        className="size-14 shrink-0 rounded-xl object-cover sm:size-16"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-medium text-ink">{project.title}</span>
          {project.featured && (
            <Star className="size-3.5 shrink-0 fill-oak text-oak" />
          )}
          {!project.published && (
            <span className="inline-flex items-center gap-1 rounded-full bg-ink/5 px-2 py-0.5 text-[0.65rem] font-medium text-stone">
              <EyeOff className="size-3" />
              Draft
            </span>
          )}
        </div>
        <div className="mt-0.5 truncate text-sm text-stone">
          {project.category} · {project.location}
        </div>
      </div>
      <Link
        href={`/admin/projects/${project.id}`}
        className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-sm font-medium text-graphite transition-colors hover:border-line-strong hover:text-ink"
      >
        <Pencil className="size-3.5" />
        <span className="hidden sm:inline">Edit</span>
      </Link>
    </div>
  );
}

export function ProjectsList({ projects }: { projects: AdminProject[] }) {
  const router = useRouter();
  const [items, setItems] = useState(projects);
  const [, start] = useTransition();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldI = items.findIndex((i) => i.id === active.id);
    const newI = items.findIndex((i) => i.id === over.id);
    const prev = items;
    const next = arrayMove(items, oldI, newI);
    setItems(next);
    start(async () => {
      try {
        await reorderProjects(next.map((i) => i.id));
        toast.success("Order updated");
        router.refresh();
      } catch (err) {
        setItems(prev);
        toast.error(err instanceof Error ? err.message : "Could not reorder");
      }
    });
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line-strong p-12 text-center text-stone">
        No projects yet. Create your first one.
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2.5">
          {items.map((p) => (
            <Row key={p.id} project={p} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
