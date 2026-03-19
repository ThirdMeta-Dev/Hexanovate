/* ─────────────────────────────────────────────────────────────────────────────
   Schedule Demo Page
   Full-page looping muted background video at very low opacity,
   with transparent PageLayout so the video shows through.
   ───────────────────────────────────────────────────────────────────────────── */
import { PageLayout } from "../components/PageLayout";
import { DemoFormSection } from "../components/DemoFormSection";
import { ContactInfoSection } from "../components/ContactInfoSection";
import { TagsCarouselSection } from "../components/TagsCarouselSection";

const BG_VIDEO =
  "https://sienna-pelican-786032.hostingersite.com/wp-content/uploads/2026/03/pinsnap-422281212150628-story1.mp4";

export default function ScheduleDemoPage() {
  return (
    <>
      {/* ── Fixed background video — sits behind everything ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
          background: "#0a0a0a",   /* fallback while video loads */
        }}
      >
        <video
          src={BG_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.18,           /* subtle but visible */
          }}
        />
      </div>

      {/* ── Page content — transparent bg so video shows through ── */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <PageLayout showTagsCarousel={false} background="transparent">
          {/* ── Get in Touch form ── */}
          <div style={{ marginTop: "80px" }}>
            <DemoFormSection transparent />
          </div>

          {/* ── Contact Info (Location / Email / Call + Map) ── */}
          <div style={{ marginTop: "120px" }}>
            <ContactInfoSection />
          </div>

          {/* ── We Build Growth Systems for Predictable Outcomes ── */}
          <div style={{ marginTop: "140px" }}>
            <TagsCarouselSection transparent />
          </div>
        </PageLayout>
      </div>
    </>
  );
}