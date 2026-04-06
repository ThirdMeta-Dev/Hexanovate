/* ─────────────────────────────────────────────────────────────────────────────
   AboutUsPage — /about-us
   16 sections built section-by-section. Background: #0a0a0a throughout.
   Same scroll animation pattern as HomePage.
   ───────────────────────────────────────────────────────────────────────────── */
import { useState, useEffect } from "react";
import { motion } from "motion/react";
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

const EASE = [0.22, 1, 0.36, 1] as const;
const VP = { once: true, margin: "-80px" } as const;

export default function AboutUsPage() {
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1440);
  useEffect(() => {
    window.scrollTo(0, 0);
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = vw <= 1024;

  return (
    <div className="min-h-screen w-full" style={{ background: "#0a0a0a", position: "relative" }}>

      {/* ── Global sticky nav ── */}
      <GlobalHeader />

      {/* ── Section 1: Hero ── */}
      <LeadershipHeroSection />

      {/* ── Section 2: About Intro + Stats ── */}
      <motion.div
        style={{ marginTop: isMobile ? 60 : 140 }}
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={VP}
        transition={{ duration: 0.85, ease: EASE }}
      >
        <AboutIntroSection />
      </motion.div>

      {/* ── Section 3: Solutions ── */}
      <motion.div
        style={{ marginTop: isMobile ? 60 : 140 }}
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={VP}
        transition={{ duration: 0.85, ease: EASE }}
      >
        <SolutionsSection />
      </motion.div>

      {/* ── Section 4: Why We Started ── */}
      <motion.div
        style={{ marginTop: isMobile ? 60 : 140 }}
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={VP}
        transition={{ duration: 0.85, ease: EASE }}
      >
        <WhyWeStartedSection />
      </motion.div>

      {/* ── Section 5: What Defines Us ── */}
      <motion.div
        id="what-defines-us"
        style={{ marginTop: isMobile ? 60 : 140, marginBottom: isMobile ? 0 : 120 }}
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={VP}
        transition={{ duration: 0.85, ease: EASE }}
      >
        <WhatDefinesUsSection />
      </motion.div>

      {/* ── Section 6: Mission / Vision ── */}
      <motion.div
        style={{ marginTop: isMobile ? 60 : 140 }}
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={VP}
        transition={{ duration: 0.85, ease: EASE }}
      >
        <AboutMissionVisionSection />
      </motion.div>

      {/* ── Section 7: Journey Gallery ── */}
      <motion.div
        style={{ marginTop: isMobile ? 60 : 140 }}
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={VP}
        transition={{ duration: 0.85, ease: EASE }}
      >
        <AboutJourneySection />
      </motion.div>

      {/* ── Section 8: Contact Form — full-width card, no side padding ── */}
      <motion.div
        style={{ marginTop: isMobile ? 60 : 140, paddingLeft: 0, paddingRight: 0 }}
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={VP}
        transition={{ duration: 0.85, ease: EASE }}
      >
        <AboutContactSection />
      </motion.div>

      {/* ── Section 8b: Ecosystem ── */}
      <motion.div
        style={{ marginTop: isMobile ? 60 : 140 }}
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={VP}
        transition={{ duration: 0.85, ease: EASE }}
      >
        <AboutEcosystemSection />
      </motion.div>

      {/* ── Section 9: Team Culture ── */}
      <motion.div
        style={{ marginTop: isMobile ? 60 : 140 }}
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={VP}
        transition={{ duration: 0.85, ease: EASE }}
      >
        <TeamCultureSection />
      </motion.div>

      {/* ── Section 9b: B2B Portfolio Carousel ── */}
      <motion.div
        style={{ marginTop: isMobile ? 60 : 140 }}
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={VP}
        transition={{ duration: 0.85, ease: EASE }}
      >
        <AboutB2BPortfolioSection />
      </motion.div>

      {/* ── Section 10: Values & Approach ── */}
      <motion.div
        style={{ marginTop: isMobile ? 60 : 140 }}
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={VP}
        transition={{ duration: 0.85, ease: EASE }}
      >
        <ValuesApproachSection />
      </motion.div>

      {/* ── Section 11: We Build Growth Systems CTA ── */}
      <motion.div
        style={{ marginTop: isMobile ? 60 : 140 }}
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={VP}
        transition={{ duration: 0.85, ease: EASE }}
      >
        <TestimonialsHeaderSection />
      </motion.div>

      {/* ── Section 12: Ecosystem Accordion ── */}
      <motion.div
        style={{ marginTop: isMobile ? 60 : 140 }}
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={VP}
        transition={{ duration: 0.85, ease: EASE }}
      >
        <AboutEcosystemAccordionSection />
      </motion.div>

      {/* ── Section 12: Awards & Logo Wall ── */}
      <motion.div
        style={{ marginTop: isMobile ? 60 : 140 }}
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={VP}
        transition={{ duration: 0.85, ease: EASE }}
      >
        <AwardsLogoWallSection />
      </motion.div>

      {/* ── Section 13: Tags Carousel CTA ("Ready to scale?") ── */}
      <motion.div
        style={{ marginTop: isMobile ? 60 : 140 }}
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={VP}
        transition={{ duration: 0.85, ease: EASE }}
      >
        <TagsCarouselSection />
      </motion.div>

      {/* ── Footer ── */}
      <div style={{ marginTop: 140 }}>
        <FooterSection />
      </div>
    </div>
  );
}
