import { SmokeCardDemo } from "../components/SmokeCardDemo";
import { WhyWeStartedSection } from "../components/WhyWeStartedSection";
import { SolutionsSection } from "../components/SolutionsSection";
import { WhyChooseUsSection } from "../components/WhyChooseUsSection";
import { TeamCultureSection } from "../components/TeamCultureSection";
import { TestimonialSection } from "../components/TestimonialSection";
import { ValuesApproachSection } from "../components/ValuesApproachSection";
import { AwardsLogoWallSection } from "../components/AwardsLogoWallSection";
import { ResourcesSection } from "../components/ResourcesSection";
import { TestimonialsHeaderSection } from "../components/TestimonialsHeaderSection";
import { FaqSection } from "../components/FaqSection";
import { DemoFormSection } from "../components/DemoFormSection";
import { TagsCarouselSection } from "../components/TagsCarouselSection";
import { FooterSection } from "../components/FooterSection";
import { WhatDefinesUsSection } from "../components/WhatDefinesUsSection";
import { motion } from "motion/react";
import { FmcgSection } from "../components/FmcgSection";
import { B2bSection } from "../components/B2bSection";
import { EducationSection } from "../components/EducationSection";
import { LogoMarqueeSection } from "../components/LogoMarqueeSection";
import { BannerSection } from "../components/BannerSection";
import { SectionsBgWrapper } from "../components/SectionsBgWrapper";
import { CmsSection } from "../components/CmsSection";
import { useState, useEffect } from "react";
import { useMeta } from "../hooks/useMeta";

export default function HomePage() {
  useMeta(
    "Hexanovate — Growth Systems for B2B, FMCG & Education",
    "Hexanovate builds intelligent growth systems that drive predictable revenue for B2B, consumer brands, and education businesses."
  );
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1440);
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = vw <= 1024;

  const P = "home";
  return (
    <div className="min-h-screen w-full" style={{ background: "#0a0a0a", position: "relative" }}>
      <CmsSection component="BannerSection" page={P}><BannerSection /></CmsSection>

      <CmsSection component="FmcgSection" page={P}>
        <motion.div
          id="fmcg-portfolio"
          style={{ marginTop: isMobile ? "0px" : "0px", position: "relative", zIndex: 1 }}
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <FmcgSection />
        </motion.div>
      </CmsSection>

      <CmsSection component="B2bSection" page={P}><div style={{ marginTop: "80px" }}><B2bSection /></div></CmsSection>
      <CmsSection component="EducationSection" page={P}><div style={{ marginTop: "80px" }}><EducationSection /></div></CmsSection>
      <CmsSection component="WhatDefinesUsSection" page={P}><div id="what-defines-us" style={{ marginTop: "80px", marginBottom: isMobile ? "0px" : "120px" }}><WhatDefinesUsSection /></div></CmsSection>
      <CmsSection component="LogoMarqueeSection" page={P}><div style={{ marginTop: isMobile ? "40px" : "240px" }}><LogoMarqueeSection /></div></CmsSection>
      <CmsSection component="WhyWeStartedSection" page={P}><div style={{ marginTop: isMobile ? "48px" : "140px" }}><WhyWeStartedSection /></div></CmsSection>
      <CmsSection component="SolutionsSection" page={P}><div style={{ marginTop: "140px" }}><SolutionsSection /></div></CmsSection>
      <CmsSection component="WhyChooseUsSection" page={P}><div style={{ marginTop: "140px" }}><WhyChooseUsSection /></div></CmsSection>
      <CmsSection component="TeamCultureSection" page={P}><div id="team-culture" style={{ marginTop: "140px" }}><TeamCultureSection /></div></CmsSection>
      <CmsSection component="TestimonialSection" page={P}><div style={{ marginTop: "140px" }}><TestimonialSection /></div></CmsSection>

      <SectionsBgWrapper>
        <CmsSection component="ValuesApproachSection" page={P}><div style={{ marginTop: "140px" }}><ValuesApproachSection /></div></CmsSection>
        <CmsSection component="AwardsLogoWallSection" page={P}><div style={{ marginTop: "140px" }}><AwardsLogoWallSection /></div></CmsSection>
        <CmsSection component="ResourcesSection" page={P}><div style={{ marginTop: "140px" }}><ResourcesSection /></div></CmsSection>
      </SectionsBgWrapper>

      <CmsSection component="TestimonialsHeaderSection" page={P}><div style={{ marginTop: "140px" }}><TestimonialsHeaderSection /></div></CmsSection>
      <CmsSection component="FaqSection" page={P}><div style={{ marginTop: "140px" }}><FaqSection /></div></CmsSection>
      <CmsSection component="DemoFormSection" page={P}><div id="get-in-touch" style={{ marginTop: "140px" }}><DemoFormSection /></div></CmsSection>
      <CmsSection component="TagsCarouselSection" page={P}><div style={{ marginTop: "140px" }}><TagsCarouselSection /></div></CmsSection>
      <CmsSection component="FooterSection" page={P}><div style={{ marginTop: "140px" }}><FooterSection /></div></CmsSection>
    </div>
  );
}
