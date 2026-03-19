/* ─────────────────────────────────────────────────────────────────────────────
   Contact Us Page
   Sections: GlobalHeader → Get in Touch (DemoFormSection) →
             Get in Touch Info (Location / Email / Call + Map) →
             Logo Marquee → Testimonials → We Build Growth Systems → Footer
   ───────────────────────────────────────────────────────────────────────────── */
import { PageLayout } from "../components/PageLayout";
import { DemoFormSection } from "../components/DemoFormSection";
import { ContactInfoSection } from "../components/ContactInfoSection";
import { LogoMarqueeSection } from "../components/LogoMarqueeSection";
import { TestimonialSection } from "../components/TestimonialSection";
import { TestimonialsHeaderSection } from "../components/TestimonialsHeaderSection";
import { TagsCarouselSection } from "../components/TagsCarouselSection";

export default function ContactUsPage() {
  return (
    <PageLayout showTagsCarousel={false}>
      {/* ── Get in Touch ── */}
      <div style={{ marginTop: "80px" }}>
        <DemoFormSection />
      </div>

      {/* ── Get in Touch Info (Location / Email / Call + Map) ── */}
      <div style={{ marginTop: "120px" }}>
        <ContactInfoSection />
      </div>

      {/* ── Logo Marquee / Client Logo Wall ── */}
      <div style={{ marginTop: "140px" }}>
        <LogoMarqueeSection />
      </div>

      {/* ── Testimonials ── */}
      <div style={{ marginTop: "140px" }}>
        <TestimonialsHeaderSection />
      </div>
      <div style={{ marginTop: "140px" }}>
        <TestimonialSection />
      </div>

      {/* ── We Build Growth Systems for Predictable Outcomes ── */}
      <div style={{ marginTop: "140px" }}>
        <TagsCarouselSection />
      </div>
    </PageLayout>
  );
}