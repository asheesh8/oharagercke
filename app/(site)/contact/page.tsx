import type { Metadata } from "next";
import { MapPin, Phone, Mail, Briefcase } from "lucide-react";
import { getSettings, getTeam } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/site/page-header";
import { ContactForm } from "@/components/site/contact-form";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with O'Hara & Gercke — 205 Billings Farm Rd, White River Junction, VT · 802.291.9990.",
};

export default async function ContactPage() {
  const [settings, team] = await Promise.all([getSettings(), getTeam()]);
  const mapsHref = `https://maps.google.com/?q=${encodeURIComponent(
    settings.address
  )}`;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={<>Let&rsquo;s start with a conversation.</>}
        description="We invite your enquiries. Tell us about your project and we'll be in touch."
      />

      <section className="bg-bone py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            {/* Info */}
            <div className="flex flex-col gap-4">
              <Reveal>
                <div className="rounded-3xl border border-line bg-cream p-7">
                  <h2 className="font-display text-2xl text-ink">
                    {settings.companyName}
                  </h2>
                  <ul className="mt-6 space-y-5">
                    <li className="flex gap-4">
                      <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-clay/10 text-clay">
                        <MapPin className="size-5" />
                      </span>
                      <div>
                        <div className="text-sm text-stone">Office</div>
                        <a
                          href={mapsHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-ink hover:text-clay"
                        >
                          {settings.address}
                        </a>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-clay/10 text-clay">
                        <Phone className="size-5" />
                      </span>
                      <div>
                        <div className="text-sm text-stone">Phone</div>
                        <a
                          href={`tel:${settings.phone.replace(/[^0-9]/g, "")}`}
                          className="font-medium text-ink hover:text-clay"
                        >
                          {settings.phone}
                        </a>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-clay/10 text-clay">
                        <Mail className="size-5" />
                      </span>
                      <div>
                        <div className="text-sm text-stone">General enquiries</div>
                        <a
                          href={`mailto:${settings.email}`}
                          className="font-medium text-ink hover:text-clay"
                        >
                          {settings.email}
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <div className="rounded-3xl border border-line bg-cream p-7">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-stone">
                    The principals
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {team.map((m) => (
                      <li
                        key={m.id}
                        className="flex items-center justify-between gap-4"
                      >
                        <span className="font-medium text-ink">{m.name}</span>
                        <a
                          href={`mailto:${m.email}`}
                          className="text-sm text-clay hover:text-clay-deep"
                        >
                          {m.email}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="flex items-start gap-4 rounded-3xl border border-line bg-cream p-7">
                  <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-oak/15 text-oak">
                    <Briefcase className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-medium text-ink">Careers</h3>
                    <p className="mt-1 text-sm leading-relaxed text-stone">
                      Interested in joining our team? Write to us at{" "}
                      <a
                        href={`mailto:${settings.email}`}
                        className="text-clay hover:text-clay-deep"
                      >
                        {settings.email}
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Form */}
            <Reveal delay={0.08}>
              <div className="rounded-4xl border border-line bg-cream p-7 shadow-[0_40px_80px_-60px_rgba(27,25,22,0.6)] sm:p-9">
                <h2 className="font-display text-2xl text-ink sm:text-3xl">
                  Tell us about your project
                </h2>
                <p className="mt-2 text-stone">
                  We typically reply within a couple of business days.
                </p>
                <div className="mt-7">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
