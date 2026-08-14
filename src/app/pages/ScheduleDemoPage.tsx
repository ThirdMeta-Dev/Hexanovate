import { PageLayout } from "../components/PageLayout";
import { useMeta } from "../hooks/useMeta";
import { BookStrategyCallSection } from "../components/BookStrategyCallSection";
import { WhyChooseUsSection } from "../components/WhyChooseUsSection";
import { FaqSection } from "../components/FaqSection";
import { TestimonialsHeaderSection } from "../components/TestimonialsHeaderSection";
import { CmsSection } from "../components/CmsSection";

export default function ScheduleDemoPage() {
  useMeta(
    "Book a Free Strategy Call — ThirdMeta",
    "Get a tailored 90-day growth roadmap in 30 minutes. No pitch, no pressure. Just honest thinking about your business."
  );
  const P = "schedule-demo";
  return (
    <PageLayout showTagsCarousel={false}>
      <CmsSection component="BookStrategyCallSection" page={P}>
        <div style={{ marginTop: "80px" }}><BookStrategyCallSection /></div>
      </CmsSection>
      <CmsSection component="WhyChooseUsSection" page={P}>
        <div style={{ marginTop: "140px" }}><WhyChooseUsSection /></div>
      </CmsSection>
      <CmsSection component="FaqSection" page={P}>
        <div style={{ marginTop: "140px" }}><FaqSection /></div>
      </CmsSection>
      <CmsSection component="TestimonialsHeaderSection" page={P}>
        <div style={{ marginTop: "140px" }}><TestimonialsHeaderSection /></div>
      </CmsSection>
    </PageLayout>
  );
}
