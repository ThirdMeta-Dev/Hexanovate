/* ─────────────────────────────────────────────────────────────────────────────
   PageLayout — shared layout for inner pages
   GlobalHeader (sticky) + page content + FooterSection
   ───────────────────────────────────────────────────────────────────────────── */
import { ReactNode, useEffect } from "react";
import { GlobalHeader } from "./GlobalHeader";
import { FooterSection } from "./FooterSection";
import { TagsCarouselSection } from "./TagsCarouselSection";

interface PageLayoutProps {
  children: ReactNode;
  /** Show the tags carousel / "We Build Growth Systems" strip before footer */
  showTagsCarousel?: boolean;
  /** Override the root background colour (default: #0a0a0a) */
  background?: string;
}

export function PageLayout({
  children,
  showTagsCarousel = true,
  background = "#0a0a0a",
}: PageLayoutProps) {
  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen w-full" style={{ background, position: "relative" }}>
      <GlobalHeader />
      <main>{children}</main>
      {showTagsCarousel && (
        <div style={{ marginTop: "140px" }}>
          <TagsCarouselSection />
        </div>
      )}
      <div style={{ marginTop: "140px" }}>
        <FooterSection />
      </div>
    </div>
  );
}
