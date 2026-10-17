import { promises as fs } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const SUPA_URL =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPA_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "media";

/** Uploads go to Supabase Storage in production, local /public/uploads in dev. */
// Local writes only make sense in development: on Vercel the filesystem is
// read-only and per-instance, so production must have the Supabase vars set.
export const usingSupabaseStorage = Boolean(SUPA_URL && SUPA_KEY);

export async function saveUpload(
  bytes: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  // Timestamp prefix keeps names unique, so two uploads of "photo.jpg" never
  // overwrite each other; the character filter keeps the key URL-safe.
  const safe = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

  if (usingSupabaseStorage) {
    const supabase = createClient(SUPA_URL!, SUPA_KEY!);
    const key = `uploads/${safe}`;
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(key, bytes, { contentType, upsert: false });
    if (error) throw new Error(`Supabase upload failed: ${error.message}`);
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(key);
    return data.publicUrl;
  }

  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, safe), bytes);
  return `/uploads/${safe}`;
}
