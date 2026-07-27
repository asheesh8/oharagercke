"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Plus, Trash2, ArrowLeft, Save } from "lucide-react";
import {
  saveProject,
  deleteProject,
  type ProjectInput,
} from "@/lib/actions/content";
import type { AdminProject } from "@/lib/admin-data";
import type { Credit } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Card, adminField, adminLabel } from "@/components/admin/ui";
import { GalleryEditor, type GalleryImage } from "@/components/admin/gallery-editor";
import { Toggle } from "@/components/admin/toggle";
import { slugify } from "@/lib/utils";

const REGIONS = ["Vermont", "New Hampshire"];
const CATEGORIES = ["New Home", "Renovation", "Specialty"];

export function ProjectEditor({ project }: { project?: AdminProject }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const isEdit = Boolean(project?.id);

  const [title, setTitle] = useState(project?.title ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [location, setLocation] = useState(project?.location ?? "");
  const [region, setRegion] = useState(project?.region ?? REGIONS[0]);
  const [category, setCategory] = useState(project?.category ?? CATEGORIES[0]);
  const [excerpt, setExcerpt] = useState(project?.excerpt ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [credits, setCredits] = useState<Credit[]>(project?.credits ?? []);
  const [images, setImages] = useState<GalleryImage[]>(
    project?.images.map((i) => ({ url: i.url, alt: i.alt })) ?? []
  );
  const [featured, setFeatured] = useState(project?.featured ?? false);
  const [published, setPublished] = useState(project?.published ?? true);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return toast.error("A title is required.");
    const input: ProjectInput = {
      id: project?.id,
      slug: slug || slugify(title),
      title,
      location,
      region,
      category,
      excerpt,
      description,
      credits,
      coverImage: images[0]?.url ?? "",
      images,
      featured,
      published,
    };
    start(async () => {
      try {
        await saveProject(input);
        toast.success(isEdit ? "Project updated" : "Project created");
        router.push("/admin/projects");
        router.refresh();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Could not save");
      }
    });
  }

  function onDelete() {
    if (!project?.id) return;
    if (!confirm(`Delete “${project.title}”? This cannot be undone.`)) return;
    start(async () => {
      try {
        await deleteProject(project.id);
        toast.success("Project deleted");
        router.push("/admin/projects");
        router.refresh();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Could not delete");
      }
    });
  }

  return (
    <form onSubmit={submit}>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-stone hover:text-ink"
        >
          <ArrowLeft className="size-4" />
          Projects
        </Link>
        <div className="flex items-center gap-2">
          {isEdit && (
            <button
              type="button"
              onClick={onDelete}
              disabled={pending}
              className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-medium text-clay transition-colors hover:bg-clay/10"
            >
              <Trash2 className="size-4" />
              Delete
            </button>
          )}
          <Button type="submit" disabled={pending}>
            <Save className="size-4" />
            {pending ? "Saving…" : "Save project"}
          </Button>
        </div>
      </div>

      <h1 className="mb-8 font-display text-3xl tracking-tight text-ink sm:text-4xl">
        {isEdit ? title || "Edit project" : "New project"}
      </h1>

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <div className="space-y-6">
          <Card className="space-y-4">
            <div>
              <label className={adminLabel}>Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={adminField}
                placeholder="Vermont Lake House"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={adminLabel}>Slug</label>
                <input
                  value={slug}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                  className={adminField}
                  placeholder={title ? slugify(title) : "auto-from-title"}
                />
              </div>
              <div>
                <label className={adminLabel}>Location</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={adminField}
                  placeholder="Norwich, VT"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={adminLabel}>Region</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className={adminField}
                >
                  {REGIONS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={adminLabel}>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={adminField}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className={adminLabel}>Excerpt (portfolio teaser)</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                className={`${adminField} resize-none`}
                placeholder="A one-line summary for cards and listings."
              />
            </div>
            <div>
              <label className={adminLabel}>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className={`${adminField} resize-none`}
                placeholder="The full project description shown on the detail page."
              />
            </div>
          </Card>

          <Card>
            <label className={adminLabel}>Gallery</label>
            <GalleryEditor value={images} onChange={setImages} />
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="space-y-4">
            <h3 className="font-display text-lg text-ink">Visibility</h3>
            <Toggle
              label="Published"
              description="Show on the public site"
              checked={published}
              onChange={setPublished}
            />
            <Toggle
              label="Featured"
              description="Highlight on the homepage"
              checked={featured}
              onChange={setFeatured}
            />
          </Card>

          <Card>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-lg text-ink">Credits</h3>
              <button
                type="button"
                onClick={() => setCredits([...credits, { role: "", name: "" }])}
                className="inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-3 py-1.5 text-xs font-medium text-graphite hover:bg-ink/10"
              >
                <Plus className="size-3.5" />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {credits.length === 0 && (
                <p className="text-sm text-mist">
                  Architect, photographer, landscape architect…
                </p>
              )}
              {credits.map((c, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={c.role}
                    onChange={(e) =>
                      setCredits(
                        credits.map((x, idx) =>
                          idx === i ? { ...x, role: e.target.value } : x
                        )
                      )
                    }
                    placeholder="Role"
                    className={`${adminField} w-2/5`}
                  />
                  <input
                    value={c.name}
                    onChange={(e) =>
                      setCredits(
                        credits.map((x, idx) =>
                          idx === i ? { ...x, name: e.target.value } : x
                        )
                      )
                    }
                    placeholder="Name"
                    className={adminField}
                  />
                  <button
                    type="button"
                    onClick={() => setCredits(credits.filter((_, idx) => idx !== i))}
                    className="grid size-10 shrink-0 place-items-center rounded-xl text-stone hover:bg-clay/10 hover:text-clay"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </form>
  );
}
