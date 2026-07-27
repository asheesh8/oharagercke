import { hasDatabase, prisma } from "./db";
import {
  projects as seedProjects,
  testimonials as seedTestimonials,
  team as seedTeam,
  siteSettings as seedSettings,
  projectImages,
} from "./seed-data";

/* ---------- View types (shared shape for DB + seed fallback) ---------- */

export type Credit = { role: string; name: string };

export type ProjectView = {
  id: string;
  slug: string;
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
  order: number;
};

export type TestimonialView = {
  id: string;
  quote: string;
  town: string;
  order: number;
};

export type TeamView = {
  id: string;
  name: string;
  role: string;
  email: string;
  bio: string;
  photo: string | null;
};

export type SettingsView = {
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

/* ---------- Seed → View mappers ---------- */

function seedToProjectView(slug: string): ProjectView | null {
  const p = seedProjects.find((x) => x.slug === slug);
  if (!p) return null;
  return {
    id: p.slug,
    slug: p.slug,
    title: p.title,
    location: p.location,
    region: p.region,
    category: p.category,
    excerpt: p.excerpt,
    description: p.description,
    credits: p.credits,
    coverImage: `/projects/${p.slug}/01.jpg`,
    images: projectImages(p.slug, p.imageCount, p.title).map((i) => ({
      url: i.src,
      alt: i.alt,
    })),
    featured: p.featured,
    order: p.order,
  };
}

const allSeedViews = (): ProjectView[] =>
  seedProjects
    .map((p) => seedToProjectView(p.slug)!)
    .sort((a, b) => a.order - b.order);

/* ---------- Public getters ---------- */

export async function getSettings(): Promise<SettingsView> {
  if (hasDatabase && prisma) {
    const s = await prisma.siteSetting.findUnique({ where: { id: "singleton" } });
    if (s) return s;
  }
  return seedSettings;
}

export async function getProjects(opts?: {
  featuredOnly?: boolean;
}): Promise<ProjectView[]> {
  if (hasDatabase && prisma) {
    const rows = await prisma.project.findMany({
      where: { published: true, ...(opts?.featuredOnly ? { featured: true } : {}) },
      orderBy: { order: "asc" },
      include: { images: { orderBy: { order: "asc" } } },
    });
    return rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      location: r.location,
      region: r.region,
      category: r.category,
      excerpt: r.excerpt,
      description: r.description,
      credits: (r.credits as Credit[]) ?? [],
      coverImage: r.coverImage,
      images: r.images.map((i) => ({ url: i.url, alt: i.alt })),
      featured: r.featured,
      order: r.order,
    }));
  }
  const all = allSeedViews();
  return opts?.featuredOnly ? all.filter((p) => p.featured) : all;
}

export async function getProjectBySlug(
  slug: string
): Promise<ProjectView | null> {
  if (hasDatabase && prisma) {
    const r = await prisma.project.findUnique({
      where: { slug },
      include: { images: { orderBy: { order: "asc" } } },
    });
    if (!r || !r.published) return null;
    return {
      id: r.id,
      slug: r.slug,
      title: r.title,
      location: r.location,
      region: r.region,
      category: r.category,
      excerpt: r.excerpt,
      description: r.description,
      credits: (r.credits as Credit[]) ?? [],
      coverImage: r.coverImage,
      images: r.images.map((i) => ({ url: i.url, alt: i.alt })),
      featured: r.featured,
      order: r.order,
    };
  }
  return seedToProjectView(slug);
}

export async function getRelatedProjects(
  slug: string,
  limit = 3
): Promise<ProjectView[]> {
  const all = await getProjects();
  return all.filter((p) => p.slug !== slug).slice(0, limit);
}

export async function getTestimonials(): Promise<TestimonialView[]> {
  if (hasDatabase && prisma) {
    const rows = await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return rows.map((r) => ({
      id: r.id,
      quote: r.quote,
      town: r.town,
      order: r.order,
    }));
  }
  return seedTestimonials.map((t, i) => ({ id: String(i + 1), ...t }));
}

export async function getTeam(): Promise<TeamView[]> {
  if (hasDatabase && prisma) {
    const rows = await prisma.teamMember.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      role: r.role,
      email: r.email,
      bio: r.bio,
      photo: r.photo,
    }));
  }
  return seedTeam.map((t, i) => ({
    id: String(i + 1),
    name: t.name,
    role: t.role,
    email: t.email,
    bio: t.bio,
    photo: t.photo,
  }));
}
