import { hasDatabase, prisma } from "./db";
import {
  getProjects,
  getTestimonials,
  getTeam,
  type Credit,
} from "./content";

export type AdminProject = {
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
  images: { id?: string; url: string; alt: string }[];
  featured: boolean;
  published: boolean;
  order: number;
};

export type AdminTestimonial = {
  id: string;
  quote: string;
  town: string;
  order: number;
  published: boolean;
};

export type AdminTeamMember = {
  id: string;
  name: string;
  role: string;
  email: string;
  bio: string;
  photo: string | null;
  order: number;
  published: boolean;
};

export type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  handled: boolean;
  createdAt: Date;
};

/* ---------------- Projects ---------------- */

export async function getAdminProjects(): Promise<AdminProject[]> {
  if (hasDatabase && prisma) {
    const rows = await prisma.project.findMany({
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
      images: r.images.map((i) => ({ id: i.id, url: i.url, alt: i.alt })),
      featured: r.featured,
      published: r.published,
      order: r.order,
    }));
  }
  const all = await getProjects();
  return all.map((p) => ({ ...p, published: true }));
}

export async function getAdminProject(id: string): Promise<AdminProject | null> {
  const all = await getAdminProjects();
  return all.find((p) => p.id === id || p.slug === id) ?? null;
}

/* ---------------- Testimonials ---------------- */

export async function getAdminTestimonials(): Promise<AdminTestimonial[]> {
  if (hasDatabase && prisma) {
    const rows = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
    return rows.map((r) => ({
      id: r.id,
      quote: r.quote,
      town: r.town,
      order: r.order,
      published: r.published,
    }));
  }
  const all = await getTestimonials();
  return all.map((t) => ({ ...t, published: true }));
}

/* ---------------- Team ---------------- */

export async function getAdminTeam(): Promise<AdminTeamMember[]> {
  if (hasDatabase && prisma) {
    const rows = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      role: r.role,
      email: r.email,
      bio: r.bio,
      photo: r.photo,
      order: r.order,
      published: r.published,
    }));
  }
  const all = await getTeam();
  return all.map((t, i) => ({
    ...t,
    order: i + 1,
    published: true,
  }));
}

/* ---------------- Submissions ---------------- */

export async function getSubmissions(): Promise<Submission[]> {
  if (hasDatabase && prisma) {
    return prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });
  }
  return [];
}

/* ---------------- Dashboard counts ---------------- */

export async function getAdminCounts() {
  const [projects, testimonials, team, submissions] = await Promise.all([
    getAdminProjects(),
    getAdminTestimonials(),
    getAdminTeam(),
    getSubmissions(),
  ]);
  return {
    projects: projects.length,
    published: projects.filter((p) => p.published).length,
    featured: projects.filter((p) => p.featured).length,
    testimonials: testimonials.length,
    team: team.length,
    submissions: submissions.length,
    unhandled: submissions.filter((s) => !s.handled).length,
  };
}
