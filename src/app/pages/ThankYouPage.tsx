/* ─────────────────────────────────────────────────────────────────────────────
   Thank You Page
   ───────────────────────────────────────────────────────────────────────────── */
import { PageLayout } from "../components/PageLayout";
import { WhyChooseUsSection } from "../components/WhyChooseUsSection";
import { TestimonialSection } from "../components/TestimonialSection";
import { TestimonialsHeaderSection } from "../components/TestimonialsHeaderSection";
import { TagsCarouselSection } from "../components/TagsCarouselSection";
import { FaqSection } from "../components/FaqSection";
import { ThankYouBanner } from "../components/ThankYouBanner";
import { CmsSection } from "../components/CmsSection";
import { useMeta } from "../hooks/useMeta";

export default function ThankYouPage() {
  useMeta(
    "Thank You — ThirdMeta",
    "Your submission has been received. We will confirm your strategy call slot within 24 hours."
  );
  const P = "thank-you";
  return (
    <PageLayout showTagsCarousel={false}>
      <CmsSection component="ThankYouBanner" page={P}>
        <ThankYouBanner />
      </CmsSection>
      <CmsSection component="WhyChooseUsSection" page={P}>
        <div style={{ marginTop: "180px" }}><WhyChooseUsSection /></div>
      </CmsSection>
      <CmsSection component="TestimonialsHeaderSection" page={P}>
        <div style={{ marginTop: "140px" }}><TestimonialsHeaderSection /></div>
      </CmsSection>
      <CmsSection component="TestimonialSection" page={P}>
        <div style={{ marginTop: "140px" }}><TestimonialSection /></div>
      </CmsSection>
      <CmsSection component="TagsCarouselSection" page={P}>
        <div style={{ marginTop: "140px" }}><TagsCarouselSection /></div>
      </CmsSection>
      <CmsSection component="FaqSection" page={P}>
        <div style={{ marginTop: "140px" }}><FaqSection /></div>
      </CmsSection>
    </PageLayout>
  );
}
