import { getAdminTestimonials } from "@/lib/admin-data";
import { AdminHeader } from "@/components/admin/ui";
import { TestimonialsManager } from "@/components/admin/testimonials-manager";

export default async function AdminTestimonialsPage() {
  const testimonials = await getAdminTestimonials();
  return (
    <>
      <AdminHeader
        title="Testimonials"
        description="Add, edit and reorder the client quotes shown across the site."
      />
      <TestimonialsManager testimonials={testimonials} />
    </>
  );
}
