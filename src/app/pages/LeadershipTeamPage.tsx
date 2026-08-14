/* ─────────────────────────────────────────────────────────────────────────────
   LeadershipTeamPage — /leadership-and-team

   Section order:
    1.  Hero Banner                  LeadershipHeroSection
    2.  What Defines Us              WhatDefinesUsSection
    3.  Logo Marquee                 LogoMarqueeSection
    4.  Why We Started               WhyWeStartedSection (transparent — no bg box)
    5.  Team & Culture               TeamCultureSection
    6.  Why Choose Us                LeadershipWhyChooseUsSection (new Figma layout)
    7.  Why Trust (Testimonial)      LeadershipTestimonialSection
    8.  B2B Portfolio                B2bSection (ThirdMeta from home)
    9.  Values & Approach            ValuesApproachSection
   10.  Image Gallery                LeadershipGallerySection (sticky horizontal scroll)
   11.  Contact Form                 AboutContactSection
   12.  Growth Systems CTA           LeadershipGrowthSystemsSection (Figma 11420-495)
        Footer                       FooterSection
   ───────────────────────────────────────────────────────────────────────────── */
import { useState, useEffect } from "react";
import { motion } from "motion/react";

import { GlobalHeader }                   from "../components/GlobalHeader";
import { LeadershipHeroSection }          from "../components/LeadershipHeroSection";
import { WhatDefinesUsSection }           from "../components/WhatDefinesUsSection";
import { LogoMarqueeSection }             from "../components/LogoMarqueeSection";
import { WhyWeStartedSection }            from "../components/WhyWeStartedSection";
import { TeamCultureSection }             from "../components/TeamCultureSection";
import { LeadershipWhyChooseUsSection }   from "../components/LeadershipWhyChooseUsSection";
import { LeadershipTestimonialSection }   from "../components/LeadershipTestimonialSection";
import { B2bSection }                     from "../components/B2bSection";
import { ValuesApproachSection }          from "../components/ValuesApproachSection";
import { LeadershipGallerySection }       from "../components/LeadershipGallerySection";
import { AboutContactSection }            from "../components/AboutContactSection";
import { LeadershipGrowthSystemsSection } from "../components/LeadershipGrowthSystemsSection";
import { FooterSection }                  from "../components/FooterSection";
import { CmsSection }                     from "../components/CmsSection";
import { useMeta } from "../hooks/useMeta";

const EASE = [0.22, 1, 0.36, 1] as const;
const VP   = { once: true, margin: "-80px" } as const;

export default function LeadershipTeamPage() {
  useMeta(
    "Leadership & Team — Hexanovate",
    "Meet the strategists and builders behind Hexanovate's growth ecosystem — outcome-obsessed thinkers driving real results."
  );
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1440);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = vw <= 1024;
  const mt = isMobile ? 60 : 140;

  const P = "leadership-and-team";
  const wrap = (component: string, children: React.ReactNode, extraStyle?: React.CSSProperties) => (
    <CmsSection component={component} page={P}>
      <motion.div style={{ marginTop: mt, ...extraStyle }} initial={{ y: 60, opacity: 0, scale: 0.97 }} whileInView={{ y: 0, opacity: 1, scale: 1 }} viewport={VP} transition={{ duration: 0.85, ease: EASE }}>
        {children}
      </motion.div>
    </CmsSection>
  );

  return (
    <div className="min-h-screen w-full" style={{ background: "#0a0a0a", position: "relative" }}>

      <CmsSection component="GlobalHeader" page={P}><GlobalHeader /></CmsSection>
      <CmsSection component="LeadershipHeroSection" page={P}><LeadershipHeroSection /></CmsSection>

      <CmsSection component="WhatDefinesUsSection" page={P}>
        <div style={{ marginTop: mt, marginBottom: isMobile ? 0 : 120, position: "relative", zIndex: 1 }}>
          <WhatDefinesUsSection />
        </div>
      </CmsSection>

      {wrap("LogoMarqueeSection", <LogoMarqueeSection />)}
      {wrap("WhyWeStartedSection", <WhyWeStartedSection transparent />)}
      {wrap("TeamCultureSection", <TeamCultureSection />)}
      {wrap("LeadershipWhyChooseUsSection", <LeadershipWhyChooseUsSection />)}
      {wrap("LeadershipTestimonialSection", <LeadershipTestimonialSection />)}

      <CmsSection component="B2bSection" page={P}>
        <div style={{ marginTop: mt }}><B2bSection /></div>
      </CmsSection>

      {wrap("ValuesApproachSection", <ValuesApproachSection />)}

      <CmsSection component="LeadershipGallerySection" page={P}>
        <div style={{ marginTop: mt }}><LeadershipGallerySection /></div>
      </CmsSection>

      {wrap("AboutContactSection", <AboutContactSection />, { paddingLeft: 0, paddingRight: 0 })}
      {wrap("LeadershipGrowthSystemsSection", <LeadershipGrowthSystemsSection />)}

      <CmsSection component="FooterSection" page={P}>
        <div style={{ marginTop: mt }}><FooterSection /></div>
      </CmsSection>

    </div>
  );
}
