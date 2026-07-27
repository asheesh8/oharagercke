"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const pills = [
  { k: "Est.", v: "2002" },
  { k: "Award", v: "Efficiency VT — Best of the Best" },
  { k: "Standard", v: "LEED · Net Zero · Passive House" },
];

export function VideoHero({
  headline,
  subhead,
  video,
  poster,
}: {
  headline: string;
  subhead: string;
  video: string;
  poster: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Muted autoplay is allowed, but some browsers need an explicit nudge.
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const tryPlay = () => vid.play().catch(() => {});
    tryPlay();
    vid.addEventListener("canplay", tryPlay, { once: true });
    return () => vid.removeEventListener("canplay", tryPlay);
  }, []);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const overlay = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-charcoal-deep pb-14 pt-28 sm:pb-20"
    >
      {/* Video */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
        >
          <source src={video} type="video/mp4" />
        </video>
      </motion.div>

      {/* Scrims */}
      <motion.div
        style={{ opacity: overlay }}
        className="absolute inset-0 z-10 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/40 to-charcoal-deep/30"
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-charcoal-deep/70 via-transparent to-transparent" />

      <div className="relative z-20 mx-auto w-full max-w-[82rem] px-5 sm:px-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
          className="max-w-3xl"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
            }}
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-cream/85 backdrop-blur">
              <span className="size-1.5 rounded-full bg-clay-soft" />
              General Contractor · Vermont &amp; New Hampshire
            </span>
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
            }}
            className="mt-6 font-display text-[2.75rem] leading-[1.02] tracking-tight text-cream sm:text-6xl md:text-[4.6rem]"
          >
            {headline}
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
            }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-cream/75"
          >
            {subhead}
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
            }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link href="/portfolio" className={buttonVariants({ variant: "light", size: "lg" })}>
              View our work
              <ArrowRight className="size-4.5" />
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "border border-white/25 bg-white/5 text-cream backdrop-blur hover:bg-white/10 shadow-none"
              )}
            >
              Start a project
              <ArrowUpRight className="size-4.5" />
            </Link>
          </motion.div>

          {/* Floating stat pills */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
            }}
            className="mt-12 flex flex-wrap gap-3"
          >
            {pills.map((p, i) => (
              <motion.div
                key={p.k}
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.6,
                }}
                className="rounded-2xl border border-white/12 bg-white/[0.07] px-4 py-3 backdrop-blur-md"
              >
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-clay-soft">
                  {p.k}
                </div>
                <div className="mt-0.5 text-sm font-medium text-cream">{p.v}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="pointer-events-none absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream/50 sm:flex"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.25em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-cream/30 p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="size-1.5 rounded-full bg-cream/70"
          />
        </span>
      </motion.div>
    </section>
  );
}
