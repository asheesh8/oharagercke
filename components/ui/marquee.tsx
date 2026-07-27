"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Seamless marquee. Pass already-spaced children (e.g. each item with its
 * own horizontal padding/margin). Two identical tracks translate by -50%.
 */
export function Marquee({
  children,
  reverse = false,
  className,
}: {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden mask-fade-x",
        className
      )}
    >
      <div
        className={cn(
          "flex w-max shrink-0 will-change-transform group-hover:[animation-play-state:paused] motion-reduce:animate-none",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
