"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";

type Img = { url: string; alt: string };

export function Gallery({ images }: { images: Img[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, prev, next]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={img.url}
            onClick={() => setIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand ring-1 ring-line/60"
            aria-label={`View ${img.alt}`}
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              sizes="(max-width:640px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-charcoal-deep/0 transition-colors duration-300 group-hover:bg-charcoal-deep/25" />
            <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-cream/90 text-ink opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
              <Expand className="size-4" />
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal-deep/95 p-4 backdrop-blur-sm sm:p-8"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-cream transition-colors hover:bg-white/20"
              aria-label="Close"
            >
              <X className="size-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 grid size-12 place-items-center rounded-full bg-white/10 text-cream transition-colors hover:bg-white/20 sm:left-6"
              aria-label="Previous"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 grid size-12 place-items-center rounded-full bg-white/10 text-cream transition-colors hover:bg-white/20 sm:right-6"
              aria-label="Next"
            >
              <ChevronRight className="size-6" />
            </button>

            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex max-h-full max-w-5xl flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[index].url}
                alt={images[index].alt}
                className="max-h-[82vh] w-auto rounded-xl object-contain"
              />
              <div className="mt-4 text-sm text-cream/60">
                {index + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
