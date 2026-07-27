"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "border-b border-line/70 bg-cream/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-18 max-w-[82rem] items-center justify-between gap-4 px-5 py-4 sm:px-8">
          {/* Wordmark */}
          <Link
            href="/"
            className="group flex shrink-0 items-baseline gap-2"
            aria-label="O'Hara & Gercke — home"
          >
            <span
              className={cn(
                "font-display text-[1.35rem] leading-none tracking-tight transition-colors sm:text-[1.5rem]",
                scrolled ? "text-ink" : "text-cream"
              )}
            >
              O&rsquo;Hara <span className="text-clay">&amp;</span> Gercke
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  scrolled
                    ? "text-graphite hover:text-ink"
                    : "text-cream/80 hover:text-cream",
                  isActive(l.href) && (scrolled ? "text-ink" : "text-cream")
                )}
              >
                {isActive(l.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className={cn(
                      "absolute inset-0 rounded-full ring-1",
                      scrolled
                        ? "bg-clay/10 ring-clay/20"
                        : "bg-white/10 ring-white/15"
                    )}
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </Link>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({
                  variant: scrolled ? "primary" : "light",
                  size: "sm",
                }),
                "hidden sm:inline-flex"
              )}
            >
              Start a project
              <ArrowUpRight className="size-4" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full transition-colors lg:hidden",
                scrolled
                  ? "text-ink hover:bg-ink/5"
                  : "text-cream hover:bg-white/10"
              )}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mx-4 mt-2 rounded-3xl border border-line bg-cream/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-medium text-graphite transition-colors hover:bg-ink/[0.04]",
                  isActive(l.href) && "bg-clay/10 text-ink"
                )}
              >
                {l.label}
                <ArrowUpRight className="size-4 text-mist" />
              </Link>
            ))}
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "primary" }), "mt-2 w-full")}
            >
              Start a project
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
