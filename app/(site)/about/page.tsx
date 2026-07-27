import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, Award, Leaf } from "lucide-react";
import { getTeam } from "@/lib/content";
import {
  aboutStory,
  sustainability,
  sustainabilityTechniques,
} from "@/lib/seed-data";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "O'Hara & Gercke was established in 2002. Meet the principals and learn our approach to building an optimal experience.",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default async function AboutPage() {
  const team = await getTeam();

  return (
    <>
      {/* Story */}
      <section className="relative overflow-hidden bg-charcoal pb-16 pt-36 text-cream grain sm:pb-24 sm:pt-44">
        <Container className="relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-clay-soft">
                  <span className="h-px w-6 bg-clay-soft/60" />
                  About the firm
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                  {aboutStory.heading}
                </h1>
              </Reveal>
              <div className="mt-7 space-y-5">
                {aboutStory.paragraphs.map((p, i) => (
                  <Reveal key={i} delay={0.1 + i * 0.05}>
                    <p className="text-[1.05rem] leading-relaxed text-cream/75">
                      {p}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal delay={0.15}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-4xl ring-1 ring-white/10">
                <Image
                  src="/brand/home.webp"
                  alt="Interior of an O'Hara & Gercke home"
                  fill
                  sizes="(max-width:1024px) 100vw, 45vw"
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Principals */}
      <section className="bg-bone py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Leadership"
            title="Three principals, one standard."
            description="Established in 2002 by Kevin O'Hara and James Gercke, and joined in 2022 by Zach Mitchell."
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-3">
            {team.map((m) => (
              <RevealItem key={m.id}>
                <div className="flex h-full flex-col rounded-3xl border border-line bg-cream p-7 transition-shadow duration-500 hover:shadow-[0_30px_60px_-45px_rgba(27,25,22,0.5)]">
                  <div className="flex items-center gap-4">
                    {m.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="size-14 rounded-2xl object-cover"
                      />
                    ) : (
                      <div className="grid size-14 place-items-center rounded-2xl bg-clay/12 font-display text-lg text-clay">
                        {initials(m.name)}
                      </div>
                    )}
                    <div>
                      <h3 className="font-display text-xl text-ink">{m.name}</h3>
                      <p className="text-sm text-stone">{m.role}</p>
                    </div>
                  </div>
                  <p className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-stone">
                    {m.bio}
                  </p>
                  {m.email && (
                    <a
                      href={`mailto:${m.email}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-clay transition-colors hover:text-clay-deep"
                    >
                      <Mail className="size-4" />
                      {m.email}
                    </a>
                  )}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Sustainability */}
      <section className="relative overflow-hidden bg-forest-deep py-20 text-cream grain sm:py-28">
        <Container className="relative z-10">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-clay-soft">
                  <span className="h-px w-6 bg-clay-soft/60" />
                  Sustainable construction
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-4xl leading-[1.06] tracking-tight sm:text-5xl">
                  Homes that perform as beautifully as they look.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 text-lg leading-relaxed text-cream/70">
                  We&rsquo;ve built to Passive House and Net Zero standards and
                  earned recognition for energy-efficient construction. A few of
                  the techniques we bring to a project:
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-6 flex flex-wrap gap-2">
                  {sustainabilityTechniques.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-1.5 text-sm text-cream/80"
                    >
                      <Leaf className="size-3.5 text-clay-soft" />
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            <RevealGroup className="grid gap-4 sm:grid-cols-2">
              {sustainability.map((s) => (
                <RevealItem key={s.title}>
                  <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                    <Award className="size-6 text-clay-soft" strokeWidth={1.5} />
                    <h3 className="mt-4 font-display text-xl">{s.title}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-cream/60">
                      {s.detail}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal>
            <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-4xl border border-white/10 bg-white/[0.03] p-8 sm:flex-row sm:items-center sm:p-10">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl">
                  Ready to define, budget and build?
                </h3>
                <p className="mt-2 text-cream/60">
                  We&rsquo;d love to hear about your project.
                </p>
              </div>
              <Link
                href="/contact"
                className={buttonVariants({ variant: "light", size: "lg" })}
              >
                Get in touch
                <ArrowUpRight className="size-4.5" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
