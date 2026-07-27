import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";
import { getSettings } from "@/lib/content";
import { Container } from "@/components/ui/container";

const nav = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export async function Footer() {
  const s = await getSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-charcoal text-cream grain">
      <Container className="relative z-10 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="font-display text-3xl tracking-tight">
              O&rsquo;Hara <span className="text-clay-soft">&amp;</span> Gercke
            </div>
            <p className="mt-5 text-[0.975rem] leading-relaxed text-cream/60">
              Fine homebuilding across the Upper Valley of Vermont and New
              Hampshire since 2002 — defined, budgeted and built alongside our
              clients and their architects.
            </p>
            <Link
              href="/contact"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              Start a conversation
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.2em] text-cream/40">
              Explore
            </h4>
            <ul className="mt-5 space-y-3">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-cream/75 transition-colors hover:text-cream"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.2em] text-cream/40">
              Visit &amp; contact
            </h4>
            <ul className="mt-5 space-y-4 text-[0.975rem] text-cream/75">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-clay-soft" />
                <span>{s.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-clay-soft" />
                <a href={`tel:${s.phone.replace(/[^0-9]/g, "")}`} className="hover:text-cream">
                  {s.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-clay-soft" />
                <a href={`mailto:${s.email}`} className="hover:text-cream">
                  {s.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-8 text-sm text-cream/45 sm:flex-row sm:items-center">
          <p>
            &copy; {year} O&rsquo;Hara &amp; Gercke, Inc. All rights reserved.
          </p>
          <p>Vermont &amp; New Hampshire · Est. 2002</p>
        </div>
      </Container>
    </footer>
  );
}
