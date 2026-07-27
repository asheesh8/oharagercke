"use client";

import { Quote } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import type { TestimonialView } from "@/lib/content";
import { cn } from "@/lib/utils";

function Card({ t, dark }: { t: TestimonialView; dark?: boolean }) {
  return (
    <figure
      className={cn(
        "mx-3 flex w-[340px] shrink-0 flex-col justify-between rounded-3xl border p-6 sm:w-[400px]",
        dark
          ? "border-white/10 bg-white/[0.04]"
          : "border-line bg-cream shadow-[0_20px_50px_-40px_rgba(27,25,22,0.5)]"
      )}
    >
      <Quote
        className={cn("size-7", dark ? "text-clay-soft" : "text-clay")}
        strokeWidth={1.5}
      />
      <blockquote
        className={cn(
          "mt-4 line-clamp-5 text-[0.975rem] leading-relaxed",
          dark ? "text-cream/85" : "text-graphite"
        )}
      >
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption
        className={cn(
          "mt-5 text-xs font-semibold uppercase tracking-[0.16em]",
          dark ? "text-cream/50" : "text-stone"
        )}
      >
        {t.town}
      </figcaption>
    </figure>
  );
}

export function TestimonialMarquee({
  testimonials,
  dark = false,
}: {
  testimonials: TestimonialView[];
  dark?: boolean;
}) {
  const half = Math.ceil(testimonials.length / 2);
  const rowA = testimonials.slice(0, half);
  const rowB = testimonials.slice(half);

  return (
    <div className="flex flex-col gap-5">
      <Marquee>
        {rowA.map((t) => (
          <Card key={t.id} t={t} dark={dark} />
        ))}
      </Marquee>
      <Marquee reverse>
        {rowB.map((t) => (
          <Card key={t.id} t={t} dark={dark} />
        ))}
      </Marquee>
    </div>
  );
}
