import { PageLayout } from "../components/PageLayout";
import { useMeta } from "../hooks/useMeta";
import { BookStrategyCallSection } from "../components/BookStrategyCallSection";
import { WhyChooseUsSection } from "../components/WhyChooseUsSection";
import { FaqSection } from "../components/FaqSection";
import { TestimonialsHeaderSection } from "../components/TestimonialsHeaderSection";

export default function ScheduleDemoPage() {
  useMeta(
    "Book a Free Strategy Call — Hexanovate",
    "Get a tailored 90-day growth roadmap in 30 minutes. No pitch, no pressure. Just honest thinking about your business."
  );
  return (
    <PageLayout showTagsCarousel={false}>
      {/* ── Section 1: Book Your Free Strategy Call ── */}
      <div style={{ marginTop: "80px" }}>
        <BookStrategyCallSection />
      </div>

      {/* ── Section 2: Why Choose Us ── */}
      <div style={{ marginTop: "140px" }}>
        <WhyChooseUsSection />
      </div>

      {/* ── Section 3: FAQs ── */}
      <div style={{ marginTop: "140px" }}>
        <FaqSection />
      </div>

      {/* ── Section 4: Final CTA ── */}
      <div style={{ marginTop: "140px" }}>
        <TestimonialsHeaderSection />
      </div>
    </PageLayout>
  );
}
