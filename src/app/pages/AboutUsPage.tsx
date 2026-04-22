/* ─────────────────────────────────────────────────────────────────────────────
   AboutUsPage — /about-us
   16 sections built section-by-section. Background: #0a0a0a throughout.
   Same scroll animation pattern as HomePage.
   ───────────────────────────────────────────────────────────────────────────── */
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useMeta } from "../hooks/useMeta";
import { GlobalHeader } from "../components/GlobalHeader";
import { LeadershipHeroSection } from "../components/LeadershipHeroSection";
import { AboutIntroSection } from "../components/AboutIntroSection";
import { SolutionsSection } from "../components/SolutionsSection";
import { WhyWeStartedSection } from "../components/WhyWeStartedSection";
import { WhatDefinesUsSection } from "../components/WhatDefinesUsSection";
import { AboutMissionVisionSection } from "../components/AboutMissionVisionSection";
import { AboutJourneySection } from "../components/AboutJourneySection";
import { AboutContactSection } from "../components/AboutContactSection";
import { AboutEcosystemSection } from "../components/AboutEcosystemSection";
import { TeamCultureSection } from "../components/TeamCultureSection";
import { AboutB2BPortfolioSection } from "../components/AboutB2BPortfolioSection";
import { ValuesApproachSection } from "../components/ValuesApproachSection";
import { TagsCarouselSection } from "../components/TagsCarouselSection";
import { AboutEcosystemAccordionSection } from "../components/AboutEcosystemAccordionSection";
import { TestimonialsHeaderSection } from "../components/TestimonialsHeaderSection";
import { AwardsLogoWallSection } from "../components/AwardsLogoWallSection";
import { FooterSection } from "../components/FooterSection";
import { CmsSection } from "../components/CmsSection";

const EASE = [0.22, 1, 0.36, 1] as const;
const VP = { once: true, margin: "-80px" } as const;

export default function AboutUsPage() {
  useMeta(
    "About Us — Hexanovate",
    "Learn how Hexanovate was built to close the gap between ambition and outcome for B2B, FMCG, and education businesses."
  );
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1440);
  useEffect(() => {
    window.scrollTo(0, 0);
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = vw <= 1024;

  const P = "about-us";
  const W = (component: string, children: React.ReactNode, extra?: React.CSSProperties) => (
    <CmsSection component={component} page={P}>
      <motion.div style={{ marginTop: isMobile ? 60 : 140, ...extra }} initial={{ y: 60, opacity: 0, scale: 0.97 }} whileInView={{ y: 0, opacity: 1, scale: 1 }} viewport={VP} transition={{ duration: 0.85, ease: EASE }}>
        {children}
      </motion.div>
    </CmsSection>
  );

  return (
    <div className="min-h-screen w-full" style={{ background: "#0a0a0a", position: "relative" }}>

      <CmsSection component="GlobalHeader" page={P}><GlobalHeader /></CmsSection>
      <CmsSection component="LeadershipHeroSection" page={P}><LeadershipHeroSection /></CmsSection>
      {W("AboutIntroSection", <AboutIntroSection />)}
      {W("SolutionsSection", <SolutionsSection />)}
      {W("WhyWeStartedSection", <WhyWeStartedSection />)}
      {W("WhatDefinesUsSection", <WhatDefinesUsSection />, { marginBottom: isMobile ? 0 : 120 })}
      {W("AboutMissionVisionSection", <AboutMissionVisionSection />)}
      {W("AboutJourneySection", <AboutJourneySection />)}
      {W("AboutContactSection", <AboutContactSection />, { paddingLeft: 0, paddingRight: 0 })}
      {W("AboutEcosystemSection", <AboutEcosystemSection />)}
      {W("AboutEcosystemAccordionSection", <AboutEcosystemAccordionSection />)}
      {W("TeamCultureSection", <TeamCultureSection />)}
      {W("AboutB2BPortfolioSection", <AboutB2BPortfolioSection />)}
      {W("ValuesApproachSection", <ValuesApproachSection />)}
      {W("TestimonialsHeaderSection", <TestimonialsHeaderSection />)}
      {W("AwardsLogoWallSection", <AwardsLogoWallSection />)}
      {W("TagsCarouselSection", <TagsCarouselSection />)}

      <CmsSection component="FooterSection" page={P}><div style={{ marginTop: 140 }}><FooterSection /></div></CmsSection>
    </div>
  );
}
