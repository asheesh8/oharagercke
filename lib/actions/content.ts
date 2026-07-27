"use server";

import { revalidatePath } from "next/cache";
import type { PrismaClient } from "@prisma/client";
import { hasDatabase, prisma } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import type { Credit } from "@/lib/content";

async function assertAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("Not authorized. Please sign in again.");
}

/** Returns the connected Prisma client, or throws a friendly error. */
function requireDb(): PrismaClient {
  if (!hasDatabase || !prisma) {
    throw new Error(
      "No database connected. Add your Supabase DATABASE_URL to .env and run `pnpm db:seed` to enable saving."
    );
  }
  return prisma;
}

function refresh() {
  revalidatePath("/", "layout");
}

/* ------------------------------ Projects ------------------------------ */

export type ProjectInput = {
  id?: string;
  slug?: string;
  title: string;
  location: string;
  region: string;
  category: string;
  excerpt: string;
  description: string;
  credits: Credit[];
  coverImage: string;
  images: { url: string; alt: string }[];
  featured: boolean;
  published: boolean;
};

export async function saveProject(input: ProjectInput) {
  await assertAdmin();
  const db = requireDb();

  const slug = (input.slug?.trim() || slugify(input.title)).slice(0, 120);
  const cover = input.coverImage || input.images[0]?.url || "";
  const data = {
    slug,
    title: input.title.trim(),
    location: input.location.trim(),
    region: input.region,
    category: input.category,
    excerpt: input.excerpt.trim(),
    description: input.description.trim(),
    credits: input.credits.filter((c) => c.role && c.name),
    coverImage: cover,
    featured: input.featured,
    published: input.published,
  };
  const imageCreate = input.images
    .filter((i) => i.url)
    .map((i, idx) => ({ url: i.url, alt: i.alt || data.title, order: idx }));

  if (input.id) {
    await db.project.update({
      where: { id: input.id },
      data: { ...data, images: { deleteMany: {}, create: imageCreate } },
    });
  } else {
    const max = await db.project.aggregate({ _max: { order: true } });
    await db.project.create({
      data: {
        ...data,
        order: (max._max.order ?? 0) + 1,
        images: { create: imageCreate },
      },
    });
  }
  refresh();
  return { ok: true, slug };
}

export async function deleteProject(id: string) {
  await assertAdmin();
  const db = requireDb();
  await db.project.delete({ where: { id } });
  refresh();
  return { ok: true };
}

export async function reorderProjects(ids: string[]) {
  await assertAdmin();
  const db = requireDb();
  await db.$transaction(
    ids.map((id, index) =>
      db.project.update({ where: { id }, data: { order: index + 1 } })
    )
  );
  refresh();
  return { ok: true };
}

/* ---------------------------- Testimonials ---------------------------- */

export type TestimonialInput = {
  id?: string;
  quote: string;
  town: string;
  published: boolean;
};

export async function saveTestimonial(input: TestimonialInput) {
  await assertAdmin();
  const db = requireDb();
  const data = {
    quote: input.quote.trim(),
    town: input.town.trim(),
    published: input.published,
  };
  if (input.id) {
    await db.testimonial.update({ where: { id: input.id }, data });
  } else {
    const max = await db.testimonial.aggregate({ _max: { order: true } });
    await db.testimonial.create({
      data: { ...data, order: (max._max.order ?? 0) + 1 },
    });
  }
  refresh();
  return { ok: true };
}

export async function deleteTestimonial(id: string) {
  await assertAdmin();
  const db = requireDb();
  await db.testimonial.delete({ where: { id } });
  refresh();
  return { ok: true };
}

export async function reorderTestimonials(ids: string[]) {
  await assertAdmin();
  const db = requireDb();
  await db.$transaction(
    ids.map((id, index) =>
      db.testimonial.update({ where: { id }, data: { order: index + 1 } })
    )
  );
  refresh();
  return { ok: true };
}

/* ------------------------------- Team -------------------------------- */

export type TeamInput = {
  id?: string;
  name: string;
  role: string;
  email: string;
  bio: string;
  photo: string | null;
  published: boolean;
};

export async function saveTeam(input: TeamInput) {
  await assertAdmin();
  const db = requireDb();
  const data = {
    name: input.name.trim(),
    role: input.role.trim(),
    email: input.email.trim(),
    bio: input.bio.trim(),
    photo: input.photo || null,
    published: input.published,
  };
  if (input.id) {
    await db.teamMember.update({ where: { id: input.id }, data });
  } else {
    const max = await db.teamMember.aggregate({ _max: { order: true } });
    await db.teamMember.create({
      data: { ...data, order: (max._max.order ?? 0) + 1 },
    });
  }
  refresh();
  return { ok: true };
}

export async function deleteTeam(id: string) {
  await assertAdmin();
  const db = requireDb();
  await db.teamMember.delete({ where: { id } });
  refresh();
  return { ok: true };
}

/* ----------------------------- Settings ------------------------------ */

export type SettingsInput = {
  companyName: string;
  tagline: string;
  heroHeadline: string;
  heroSubhead: string;
  address: string;
  phone: string;
  email: string;
  heroVideo: string;
  heroPoster: string;
};

export async function saveSettings(input: SettingsInput) {
  await assertAdmin();
  const db = requireDb();
  await db.siteSetting.upsert({
    where: { id: "singleton" },
    update: { ...input },
    create: { id: "singleton", ...input },
  });
  refresh();
  return { ok: true };
}

/* ---------------------------- Submissions ---------------------------- */

export async function setSubmissionHandled(id: string, handled: boolean) {
  await assertAdmin();
  const db = requireDb();
  await db.contactSubmission.update({ where: { id }, data: { handled } });
  revalidatePath("/admin/submissions");
  return { ok: true };
}

export async function deleteSubmission(id: string) {
  await assertAdmin();
  const db = requireDb();
  await db.contactSubmission.delete({ where: { id } });
  revalidatePath("/admin/submissions");
  return { ok: true };
}
