import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal text-cream grain">
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            sizes="100vw"
            className="object-cover opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/50" />
        </>
      )}
      <Container className="relative z-10 pb-16 pt-36 sm:pb-20 sm:pt-44">
        {eyebrow && (
          <Reveal>
            <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-clay-soft">
              <span className="h-px w-6 bg-clay-soft/60" />
              {eyebrow}
            </span>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight text-cream sm:text-6xl md:text-7xl">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/70">
              {description}
            </p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
