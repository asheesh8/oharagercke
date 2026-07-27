import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectView } from "@/lib/content";

export function ProjectCard({
  project,
  className,
  sizes = "(max-width: 768px) 100vw, 45vw",
  priority = false,
}: {
  project: ProjectView;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-3xl bg-sand ring-1 ring-line/60 transition-shadow duration-500 hover:shadow-[0_40px_80px_-40px_rgba(27,25,22,0.6)]",
        className
      )}
    >
      <Image
        src={project.coverImage}
        alt={project.title}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/90 via-charcoal-deep/15 to-transparent" />

      <div className="absolute left-4 top-4 flex gap-2">
        <span className="rounded-full bg-white/15 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-cream backdrop-blur-md">
          {project.category}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <div className="flex items-end justify-between gap-4">
          <div className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5">
            <div className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-cream/70">
              {project.location}
            </div>
            <h3 className="mt-1.5 font-display text-xl leading-tight text-cream sm:text-2xl">
              {project.title}
            </h3>
          </div>
          <span className="grid size-10 shrink-0 translate-y-2 place-items-center rounded-full bg-cream text-ink opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
