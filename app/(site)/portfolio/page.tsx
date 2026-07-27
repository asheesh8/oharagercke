import type { Metadata } from "next";
import { getProjects } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/site/page-header";
import { PortfolioGrid } from "@/components/site/portfolio-grid";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Custom homes, renovations and specialty structures built by O'Hara & Gercke across Vermont and New Hampshire.",
};

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title={<>Homes built to be lived in for generations.</>}
        description="A selection of the custom homes, renovations and specialty structures we've built across the Upper Valley — each shaped in close collaboration with our clients and their architects."
        image="/projects/new-hampshire-net-zero-lake-house/01.jpg"
        imageAlt="A modern Net Zero lake house in New Hampshire"
      />
      <section className="bg-bone py-14 sm:py-20">
        <Container>
          <PortfolioGrid projects={projects} />
        </Container>
      </section>
    </>
  );
}
