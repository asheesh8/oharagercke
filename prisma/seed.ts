import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  projects,
  testimonials,
  team,
  siteSettings,
  projectImages,
} from "../lib/seed-data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding O'Hara & Gercke content…");

  // Site settings (singleton)
  await prisma.siteSetting.upsert({
    where: { id: "singleton" },
    update: { ...siteSettings },
    create: { id: "singleton", ...siteSettings },
  });

  // Projects + images
  for (const p of projects) {
    const imgs = projectImages(p.slug, p.imageCount, p.title);
    const data = {
      title: p.title,
      location: p.location,
      region: p.region,
      category: p.category,
      excerpt: p.excerpt,
      description: p.description,
      credits: p.credits,
      coverImage: `/projects/${p.slug}/01.jpg`,
      order: p.order,
      featured: p.featured,
      published: true,
    };
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {
        ...data,
        images: {
          deleteMany: {},
          create: imgs.map((im, i) => ({ url: im.src, alt: im.alt, order: i })),
        },
      },
      create: {
        slug: p.slug,
        ...data,
        images: {
          create: imgs.map((im, i) => ({ url: im.src, alt: im.alt, order: i })),
        },
      },
    });
  }

  // Testimonials (rebuild)
  await prisma.testimonial.deleteMany({});
  await prisma.testimonial.createMany({
    data: testimonials.map((t) => ({
      quote: t.quote,
      town: t.town,
      order: t.order,
      published: true,
    })),
  });

  // Team (rebuild)
  await prisma.teamMember.deleteMany({});
  await prisma.teamMember.createMany({
    data: team.map((t) => ({
      name: t.name,
      role: t.role,
      email: t.email,
      bio: t.bio,
      photo: t.photo,
      order: t.order,
      published: true,
    })),
  });

  // Admin user
  const email = (process.env.ADMIN_EMAIL || "admin@oharagercke.com")
    .trim()
    .toLowerCase();
  // No default: a fallback password here would be readable by anyone, since
  // this repository is public.
  const password = process.env.ADMIN_PASSWORD;
  if (!password || password.length < 12) {
    throw new Error("Set ADMIN_PASSWORD (12+ characters) before seeding.");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash, name: "Admin" },
  });

  console.log(
    `Done. Projects: ${projects.length}, Testimonials: ${testimonials.length}, Team: ${team.length}. Admin: ${email}`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
