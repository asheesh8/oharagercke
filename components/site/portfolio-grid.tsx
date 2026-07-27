"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ProjectCard } from "@/components/site/project-card";
import type { ProjectView } from "@/lib/content";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "New Home", "Renovation", "Specialty"] as const;
type Filter = (typeof FILTERS)[number];

export function PortfolioGrid({ projects }: { projects: ProjectView[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  const counts = FILTERS.reduce((acc, f) => {
    acc[f] =
      f === "All"
        ? projects.length
        : projects.filter((p) => p.category === f).length;
    return acc;
  }, {} as Record<Filter, number>);

  const visible =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
              filter === f ? "text-cream" : "text-stone hover:text-ink"
            )}
          >
            {filter === f && (
              <motion.span
                layoutId="portfolio-filter"
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            <span className="relative z-10">
              {f}
              <span
                className={cn(
                  "ml-1.5 text-xs",
                  filter === f ? "text-cream/60" : "text-mist"
                )}
              >
                {counts[f]}
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard
                project={p}
                priority={i < 3}
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                className="h-[360px]"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
