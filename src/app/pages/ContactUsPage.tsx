/* ─────────────────────────────────────────────────────────────────────────────
   Contact Us Page
   ───────────────────────────────────────────────────────────────────────────── */
import { PageLayout } from "../components/PageLayout";
import { useMeta } from "../hooks/useMeta";
import { DemoFormSection } from "../components/DemoFormSection";
import { ContactInfoSection } from "../components/ContactInfoSection";
import { LogoMarqueeSection } from "../components/LogoMarqueeSection";
import { TestimonialSection } from "../components/TestimonialSection";
import { TestimonialsHeaderSection } from "../components/TestimonialsHeaderSection";
import { TagsCarouselSection } from "../components/TagsCarouselSection";
import { CmsSection } from "../components/CmsSection";

export default function ContactUsPage() {
  useMeta(
    "Contact Us — Hexanovate",
    "Reach out to Hexanovate for growth partnerships, press, careers, or any general enquiries. We respond within 48 hours."
  );
  const P = "contact-us";
  return (
    <PageLayout showTagsCarousel={false}>
      <CmsSection component="DemoFormSection" page={P}>
        <div style={{ marginTop: "80px" }}><DemoFormSection /></div>
      </CmsSection>
      <CmsSection component="ContactInfoSection" page={P}>
        <div style={{ marginTop: "120px" }}><ContactInfoSection /></div>
      </CmsSection>
      <CmsSection component="LogoMarqueeSection" page={P}>
        <div style={{ marginTop: "140px" }}><LogoMarqueeSection /></div>
      </CmsSection>
      <CmsSection component="TestimonialsHeaderSection" page={P}>
        <div style={{ marginTop: "140px" }}><TestimonialsHeaderSection variant="contact" /></div>
      </CmsSection>
      <CmsSection component="TestimonialSection" page={P}>
        <div style={{ marginTop: "140px" }}><TestimonialSection /></div>
      </CmsSection>
      <CmsSection component="TagsCarouselSection" page={P}>
        <div style={{ marginTop: "140px" }}><TagsCarouselSection /></div>
      </CmsSection>
    </PageLayout>
  );
}
