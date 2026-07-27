import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
import {
  getProjectBySlug,
  getProjects,
  getRelatedProjects,
} from "@/lib/content";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Gallery } from "@/components/site/gallery";
import { ProjectCard } from "@/components/site/project-card";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.excerpt,
    openGraph: { images: [project.coverImage] },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const related = await getRelatedProjects(slug, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[72vh] items-end overflow-hidden bg-charcoal text-cream">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/95 via-charcoal-deep/30 to-charcoal-deep/40" />
        <Container className="relative z-10 pb-14 pt-32 sm:pb-20">
          <Reveal>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-medium text-cream/70 transition-colors hover:text-cream"
            >
              <ArrowLeft className="size-4" />
              All projects
            </Link>
          </Reveal>
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-cream backdrop-blur">
              {project.category}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-cream/85 backdrop-blur">
              <MapPin className="size-3.5" />
              {project.location}
            </span>
          </div>
          <Reveal delay={0.05}>
            <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.04] tracking-tight text-cream sm:text-6xl md:text-[4.2rem]">
              {project.title}
            </h1>
          </Reveal>
        </Container>
      </section>

      {/* Intro + credits */}
      <section className="bg-bone py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
            <Reveal>
              <p className="text-pretty font-display text-2xl leading-[1.45] tracking-tight text-graphite sm:text-[1.9rem]">
                {project.description}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="rounded-3xl border border-line bg-cream p-7 shadow-[0_30px_60px_-50px_rgba(27,25,22,0.6)]">
                <dl className="divide-y divide-line">
                  <div className="flex items-center justify-between py-3.5">
                    <dt className="text-sm text-stone">Location</dt>
                    <dd className="text-sm font-medium text-ink">
                      {project.location}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-3.5">
                    <dt className="text-sm text-stone">Type</dt>
                    <dd className="text-sm font-medium text-ink">
                      {project.category}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-3.5">
                    <dt className="text-sm text-stone">Region</dt>
                    <dd className="text-sm font-medium text-ink">
                      {project.region}
                    </dd>
                  </div>
                  {project.credits.map((c) => (
                    <div
                      key={c.role + c.name}
                      className="flex items-center justify-between gap-4 py-3.5"
                    >
                      <dt className="text-sm text-stone">{c.role}</dt>
                      <dd className="text-right text-sm font-medium text-ink">
                        {c.name}
                      </dd>
                    </div>
                  ))}
                </dl>
                <Link
                  href="/contact"
                  className={buttonVariants({
                    variant: "primary",
                    size: "md",
                    className: "mt-6 w-full",
                  })}
                >
                  Start a project like this
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Gallery */}
          <div className="mt-14">
            <Gallery images={project.images} />
          </div>
        </Container>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-cream py-16 sm:py-24">
          <Container>
            <div className="mb-10 flex items-end justify-between gap-6">
              <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
                More from our portfolio
              </h2>
              <Link
                href="/portfolio"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard
                  key={p.slug}
                  project={p}
                  sizes="(max-width:640px) 100vw, 33vw"
                  className="h-[340px]"
                />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
