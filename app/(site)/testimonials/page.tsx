import type { Metadata } from "next";
import Link from "next/link";
import { Quote, ArrowUpRight } from "lucide-react";
import { getTestimonials } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Kind words from O'Hara & Gercke clients across Vermont and New Hampshire.",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  const [featured, ...rest] = testimonials;

  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        title={<>Kind words from the people we&rsquo;ve built for.</>}
        description="An exceptional process and job experience matter as much as the finished home. Here's what our clients say about both."
        image="/projects/natatorium-central-vermont/01.jpg"
        imageAlt="A natatorium built by O'Hara & Gercke"
      />

      <section className="bg-bone py-16 sm:py-24">
        <Container>
          {featured && (
            <Reveal>
              <figure className="mb-6 rounded-4xl border border-line bg-forest-deep p-8 text-cream grain sm:p-12">
                <Quote className="size-9 text-clay-soft" strokeWidth={1.5} />
                <blockquote className="relative mt-5 font-display text-2xl leading-[1.4] tracking-tight sm:text-[2rem]">
                  &ldquo;{featured.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-cream/50">
                  {featured.town}
                </figcaption>
              </figure>
            </Reveal>
          )}

          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {rest.map((t) => (
              <figure
                key={t.id}
                className="mb-6 break-inside-avoid rounded-3xl border border-line bg-cream p-7 shadow-[0_24px_50px_-45px_rgba(27,25,22,0.5)]"
              >
                <Quote className="size-6 text-clay" strokeWidth={1.5} />
                <blockquote className="mt-4 text-[1.02rem] leading-relaxed text-graphite">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-stone">
                  {t.town}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center gap-5 text-center">
            <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
              We&rsquo;d be honored to build yours.
            </h2>
            <Link
              href="/contact"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Start a project
              <ArrowUpRight className="size-4.5" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
