import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Leaf } from "lucide-react";
import {
  getSettings,
  getProjects,
  getTestimonials,
  type ProjectView,
} from "@/lib/content";
import { approach as approachSeed } from "@/lib/seed-data";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { VideoHero } from "@/components/site/video-hero";
import { ProjectCard } from "@/components/site/project-card";
import { TestimonialMarquee } from "@/components/site/testimonial-marquee";

const SHOWCASE = [
  "natatorium-central-vermont",
  "new-hampshire-net-zero-lake-house",
  "vermont-lake-house",
  "new-residence-strafford-vt",
  "contemporary-residence-hanover-nh",
];

export default async function HomePage() {
  const [settings, projects, testimonials] = await Promise.all([
    getSettings(),
    getProjects(),
    getTestimonials(),
  ]);

  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const showcase = SHOWCASE.map((s) => bySlug.get(s)).filter(
    Boolean
  ) as ProjectView[];
  const filler = projects.filter((p) => !SHOWCASE.includes(p.slug));
  while (showcase.length < 5 && filler.length) showcase.push(filler.shift()!);

  return (
    <>
      <VideoHero
        headline={settings.heroHeadline}
        subhead={settings.heroSubhead}
        video={settings.heroVideo}
        poster={settings.heroPoster}
      />

      {/* ---------------- Featured work (bento) ---------------- */}
      <section className="bg-bone py-20 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Selected work"
              title={
                <>
                  A portfolio built on
                  <br className="hidden sm:block" /> craft and trust.
                </>
              }
              className="max-w-xl"
            />
            <Reveal delay={0.1}>
              <Link
                href="/portfolio"
                className={buttonVariants({ variant: "outline", size: "md" })}
              >
                View all projects
                <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>

          <RevealGroup
            stagger={0.09}
            className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-12"
          >
            {showcase[0] && (
              <RevealItem className="md:col-span-8">
                <ProjectCard
                  project={showcase[0]}
                  priority
                  sizes="(max-width:768px) 100vw, 66vw"
                  className="h-[320px] md:h-[460px]"
                />
              </RevealItem>
            )}
            {showcase[1] && (
              <RevealItem className="md:col-span-4">
                <ProjectCard
                  project={showcase[1]}
                  sizes="(max-width:768px) 100vw, 34vw"
                  className="h-[320px] md:h-[460px]"
                />
              </RevealItem>
            )}
            {showcase.slice(2, 5).map((p) => (
              <RevealItem key={p.slug} className="md:col-span-4">
                <ProjectCard
                  project={p}
                  sizes="(max-width:768px) 100vw, 34vw"
                  className="h-[300px] md:h-[360px]"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* ---------------- Process + stats (immersive dark) ---------------- */}
      <section className="relative overflow-hidden bg-forest-deep text-cream grain">
        <Container className="relative z-10 py-20 sm:py-28">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-clay-soft">
                  <span className="h-px w-6 bg-clay-soft/60" />
                  Our approach
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-4xl leading-[1.06] tracking-tight sm:text-5xl">
                  An exceptional process is as important as the finished home.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream/70">
                  We join projects early — offering technical input and honest
                  budget guidance — then build with communication, transparency
                  and meticulous care from first sketch to final walkthrough.
                </p>
              </Reveal>

              <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8">
                {[
                  { v: "2002", label: "Established", counter: false },
                  { v: 24, suffix: "+", label: "Years of craft", counter: true },
                  { v: 13, label: "Signature projects", counter: true },
                  { v: 3, label: "Principal builders", counter: true },
                ].map((s) => (
                  <Reveal key={s.label}>
                    <div>
                      <div className="font-display text-5xl tracking-tight text-cream">
                        {s.counter ? (
                          <Counter
                            to={s.v as number}
                            suffix={s.suffix ?? ""}
                          />
                        ) : (
                          s.v
                        )}
                      </div>
                      <div className="mt-2 text-sm text-cream/55">{s.label}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <RevealGroup className="grid gap-4 sm:grid-cols-2">
              {approachSeed.map((a) => (
                <RevealItem key={a.title}>
                  <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:bg-white/[0.07]">
                    <div className="grid size-11 place-items-center rounded-2xl bg-clay/20 text-clay-soft">
                      <Leaf className="size-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="mt-5 font-display text-xl text-cream">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-cream/65">
                      {a.detail}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </section>

      {/* ---------------- Testimonials ---------------- */}
      <section className="bg-bone py-20 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="In their words"
              title="Clients who would build with us again."
              className="max-w-xl"
            />
            <Reveal delay={0.1}>
              <Link
                href="/testimonials"
                className={buttonVariants({ variant: "outline", size: "md" })}
              >
                Read all testimonials
                <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </Container>
        <div className="mt-14">
          <TestimonialMarquee testimonials={testimonials} />
        </div>
      </section>

      {/* ---------------- Contact CTA band ---------------- */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="/projects/vermont-lake-house/04.jpg"
          alt="A lakeside home built by O'Hara & Gercke"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal-deep/75" />
        <Container className="relative z-10 py-24 text-center sm:py-32">
          <Reveal>
            <h2 className="mx-auto max-w-3xl font-display text-4xl leading-[1.08] tracking-tight text-cream sm:text-6xl">
              Let&rsquo;s build something lasting.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-cream/75">
              Tell us about your project. We work directly with you and your
              architect to define, budget and build it right.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className={buttonVariants({ variant: "light", size: "lg" })}>
                Start a project
                <ArrowUpRight className="size-4.5" />
              </Link>
              <a
                href="tel:8022919990"
                className={buttonVariants({
                  size: "lg",
                  className:
                    "border border-white/25 bg-white/5 text-cream backdrop-blur hover:bg-white/10 shadow-none",
                })}
              >
                802.291.9990
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
