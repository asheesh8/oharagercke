"use client";

import { useRef, useState } from "react";
import { Upload, X, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { uploadFile } from "@/components/admin/image-input";
import { adminField } from "@/components/admin/ui";

export type GalleryImage = { url: string; alt: string };

export function GalleryEditor({
  value,
  onChange,
}: {
  value: GalleryImage[];
  onChange: (imgs: GalleryImage[]) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function addFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const uploaded: GalleryImage[] = [];
      for (const f of Array.from(files)) {
        const url = await uploadFile(f);
        uploaded.push({ url, alt: "" });
      }
      onChange([...value, ...uploaded]);
      toast.success(`${uploaded.length} image(s) added`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const setAlt = (i: number, alt: string) =>
    onChange(value.map((img, idx) => (idx === i ? { ...img, alt } : img)));

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {value.map((img, i) => (
          <div
            key={img.url + i}
            className="overflow-hidden rounded-xl border border-line bg-bone"
          >
            <div className="relative aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt="" className="size-full object-cover" />
              {i === 0 && (
                <span className="absolute left-1.5 top-1.5 rounded-full bg-clay px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-cream">
                  Cover
                </span>
              )}
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute right-1.5 top-1.5 grid size-7 place-items-center rounded-full bg-charcoal/70 text-cream hover:bg-charcoal"
              >
                <X className="size-3.5" />
              </button>
            </div>
            <div className="flex items-center gap-1 p-1.5">
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="grid size-7 place-items-center rounded-lg text-stone hover:bg-sand disabled:opacity-30"
              >
                <ArrowLeft className="size-3.5" />
              </button>
              <input
                value={img.alt}
                onChange={(e) => setAlt(i, e.target.value)}
                placeholder="Alt text"
                className="min-w-0 flex-1 rounded-lg border border-line bg-paper px-2 py-1 text-xs text-ink focus:outline-none"
              />
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === value.length - 1}
                className="grid size-7 place-items-center rounded-lg text-stone hover:bg-sand disabled:opacity-30"
              >
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line-strong text-stone transition-colors hover:border-clay/50 hover:bg-sand/40"
        >
          {uploading ? (
            <Loader2 className="size-6 animate-spin" />
          ) : (
            <Upload className="size-6" />
          )}
          <span className="text-xs">{uploading ? "Uploading…" : "Add images"}</span>
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => addFiles(e.target.files)}
      />
      <p className="text-xs text-mist">
        The first image is used as the cover. Reorder with the arrows.
      </p>
    </div>
  );
}
