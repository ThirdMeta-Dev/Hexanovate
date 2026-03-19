/* ─────────────────────────────────────────────────────────────────────────────
   Thank You Page
   Sections: GlobalHeader → Why Choose Us → Testimonials →
             We Build Growth Systems → FAQ → Footer
   ───────────────────────────────────────────────────────────────────────────── */
import { PageLayout } from "../components/PageLayout";
import { WhyChooseUsSection } from "../components/WhyChooseUsSection";
import { TestimonialSection } from "../components/TestimonialSection";
import { TestimonialsHeaderSection } from "../components/TestimonialsHeaderSection";
import { TagsCarouselSection } from "../components/TagsCarouselSection";
import { FaqSection } from "../components/FaqSection";
import { ThankYouBanner } from "../components/ThankYouBanner";

export default function ThankYouPage() {
  return (
    <PageLayout showTagsCarousel={false}>
      {/* ── Thank You Banner (Figma frame) ── */}
      <ThankYouBanner />

      {/* ── Why Choose Us ── */}
      <div style={{ marginTop: "180px" }}>
        <WhyChooseUsSection />
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

      {/* ── FAQ ── */}
      <div style={{ marginTop: "140px" }}>
        <FaqSection />
      </div>
    </PageLayout>
  );
}