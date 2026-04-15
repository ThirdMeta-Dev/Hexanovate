/* ─────────────────────────────────────────────────────────────────────────────
   AboutB2BPortfolioSection — Below TeamCultureSection
   Figma: node 11401-6234  ("Why Choose Hexanovate")

   Layout:
   • Outer: full-width, #171717 bg, borderRadius 30 (with 0 24px padding on section)
   • Inner: maxWidth 1150px, centered, padding 60px 96px
   • Header row: "B2B Portfolio" tag + line (left) | 44px heading (right)
   • Carousel: Left big card (Problem/Solution) + Right side (Testimonial + Stats)
   • 3-dot navigation below carousel
   • Logo strip: "We Feel In-House..." text + auto-scrolling brand logos
   ───────────────────────────────────────────────────────────────────────────── */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import imgAcumen    from "@/assets/bda2b46a7404e07003bc523edf67001cfd71ce4d.jpg";
import imgAppGallop from "@/assets/2d3adea92049711e2578c76b97b58d05fe350d0d.jpg";
import imgEfax      from "@/assets/b5a6ae84ac81f90355801c07a654b4ddeff7a307.jpg";
import imgSplashtop from "@/assets/ec9f3ce9d899bf70e2291d8bb5a2449cfbea0db2.jpg";
import imgColdman   from "@/assets/521400233e6074875648780027ba03a58633b4d6.jpg";
import imgPaybooks  from "@/assets/a131b6de857eb2c01c3d2bc1476e7f8e39ad15ff.jpg";
import imgElmo      from "@/assets/9f84aaabf73edf8837949843d52521852059611f.jpg";
import imgWarehouse from "@/assets/e770b8f7f0a4c6307225a1f4016b97084db4444e.jpg";

const EASE = [0.22, 1, 0.36, 1] as const;

import imgAvatarLocal from "@/assets/b2b-avatar.jpg";
const IMG_AVATAR = imgAvatarLocal;

/* ── Slide data (3 slides — same structure, ready for real content) ──────── */
interface Slide {
  problem: string;
  solution: string;
  brandLogo: string;
  brandAlt: string;
  personName: string;
  personRole: string;
  quote: string;
  avatarSrc: string;
  testimonialName: string;
  testimonialRole: string;
  stat1Value: string;
  stat1Suffix: string;
  stat1Desc: string;
  stat2Value: string;
  stat2Suffix: string;
  stat2Desc: string;
}

const SLIDES: Slide[] = [
  {
    problem:         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard.",
    solution:        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsu has been the industry's standard Lorem Ipsum is simply dummy text of the printing.",
    brandLogo:       imgAcumen,
    brandAlt:        "Fincent",
    personName:      "Mr Lorem Ipsum",
    personRole:      "lorem ipsum is simply dum",
    quote:           "We unlock scale by fixing lorem ipsum what's leaking conversion, retention, repeation growth lorem compounds. We unlock scale",
    avatarSrc:       IMG_AVATAR,
    testimonialName: "Mr Saket Lorem",
    testimonialRole: "Supply Chain Head",
    stat1Value: "123", stat1Suffix: "+", stat1Desc: "We power discover lorem engage",
    stat2Value: "98",  stat2Suffix: "%", stat2Desc: "We power discovery, lorem engage",
  },
  {
    problem:         "Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard since the 1500s.",
    solution:        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
    brandLogo:       imgEfax,
    brandAlt:        "eFax",
    personName:      "Ms Jane Doe",
    personRole:      "Head of Marketing",
    quote:           "Our growth accelerated 3× in 12 months. The team feels truly in-house — fully invested in our outcomes.",
    avatarSrc:       IMG_AVATAR,
    testimonialName: "Ms Priya Shah",
    testimonialRole: "VP of Growth",
    stat1Value: "3x",  stat1Suffix: "",  stat1Desc: "Average revenue growth achieved",
    stat2Value: "500", stat2Suffix: "+", stat2Desc: "Campaigns delivered successfully",
  },
  {
    problem:         "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
    solution:        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    brandLogo:       imgElmo,
    brandAlt:        "Elmo",
    personName:      "Mr Rahul Verma",
    personRole:      "Founder & CEO",
    quote:           "They transformed our B2B pipeline completely. From 0 to 80 qualified leads in just 6 weeks of working together.",
    avatarSrc:       IMG_AVATAR,
    testimonialName: "Mr Arjun Mehta",
    testimonialRole: "Director of Sales",
    stat1Value: "80",  stat1Suffix: "+", stat1Desc: "Qualified leads in 6 weeks",
    stat2Value: "40",  stat2Suffix: "%", stat2Desc: "Reduction in cost per lead",
  },
];

/* ── Brand logos for the scroll strip ───────────────────────────────────── */
const LOGOS = [
  { src: imgAcumen,    alt: "Acumen CMS",  bg: "#fff6e6",    h: 22 },
  { src: imgAppGallop, alt: "App Gallop",  bg: "transparent", h: 36 },
  { src: imgEfax,      alt: "eFax",        bg: "transparent", h: 36 },
  { src: imgElmo,      alt: "Elmo",        bg: "transparent", h: 32 },
  { src: imgColdman,   alt: "Coldman",     bg: "transparent", h: 36 },
  { src: imgPaybooks,  alt: "Paybooks",    bg: "transparent", h: 38 },
  { src: imgSplashtop, alt: "Splashtop",   bg: "transparent", h: 36 },
  { src: imgWarehouse, alt: "Warehouse",   bg: "transparent", h: 36 },
];

/* ── Glass card shell ────────────────────────────────────────────────────── */
function GlassCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        background: "rgba(0,0,0,0.6)",
        border: "1px solid #0a0a0a",
        borderRadius: 20,
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Left card: Problem / Solution / Brand ───────────────────────────────── */
function LeftCard({ slide }: { slide: Slide }) {
  return (
    <GlassCard
      style={{
        width: 480,
        flexShrink: 0,
        height: 469,
        padding: "36px 48px 48px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
        {/* Problem + Solution blocks */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, color: "#FFA600" }}>Problem</span>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, lineHeight: "26px", color: "#ffffff", margin: 0 }}>
              {slide.problem}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, color: "#FFA600" }}>Solution/Impact</span>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, lineHeight: "26px", color: "#747474", margin: 0 }}>
              {slide.solution}
            </p>
          </div>
        </div>
        {/* Brand + person */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            background: "#fff6e6",
            borderRadius: 6,
            width: 110,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            overflow: "hidden",
            padding: 6,
          }}>
            <img src={slide.brandLogo} alt={slide.brandAlt} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, color: "#ffffff", textTransform: "capitalize" }}>
              {slide.personName}
            </span>
            <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 300, fontSize: 13, color: "#3b3b3b" }}>
              {slide.personRole}
            </span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

/* ── Testimonial card ────────────────────────────────────────────────────── */
function TestimonialCard({ slide }: { slide: Slide }) {
  return (
    <GlassCard style={{ padding: 36, display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {/* Quote marks */}
        <svg width="102" height="56" viewBox="0 0 102 56" fill="none" style={{ marginBottom: -16, flexShrink: 0 }}>
          <text x="0" y="52" fontFamily="Georgia, serif" fontSize="80" fill="rgba(27,97,219,0.5)">"</text>
        </svg>
        <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, fontSize: 18, lineHeight: "32px", color: "#ffffff", margin: 0 }}>
          {slide.quote}
        </p>
      </div>
      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          border: "1px solid #FFA600",
          overflow: "hidden", flexShrink: 0,
        }}>
          <img src={slide.avatarSrc} alt={slide.testimonialName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, color: "#ffffff", textTransform: "capitalize" }}>
          {slide.testimonialName}
        </span>
        <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#414141" }}>|</span>
        <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, color: "#7d7d7d", textTransform: "capitalize" }}>
          {slide.testimonialRole}
        </span>
      </div>
    </GlassCard>
  );
}

/* ── Stat card ───────────────────────────────────────────────────────────── */
function StatCard({ value, suffix, desc }: { value: string; suffix: string; desc: string }) {
  return (
    <GlassCard style={{ flex: 1, minWidth: 0, height: 177, padding: "16px 28px 28px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 52, lineHeight: "60px", color: "#ffffff", margin: 0 }}>
          {value}<span style={{ fontSize: 32 }}>{suffix}</span>
        </p>
        <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 300, fontSize: 15, lineHeight: "22px", color: "#747474", margin: 0 }}>
          {desc}
        </p>
      </div>
    </GlassCard>
  );
}

/* ── Dot navigation ──────────────────────────────────────────────────────── */
function Dots({ total, active, onSelect }: { total: number; active: number; onSelect: (i: number) => void }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}>
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          style={{
            width: i === active ? 24 : 8,
            height: 8,
            borderRadius: 4,
            border: "none",
            background: i === active ? "#FFA600" : "#414141",
            cursor: "pointer",
            padding: 0,
            transition: "width 0.3s ease, background 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

/* ── Logo scroll strip ───────────────────────────────────────────────────── */
function LogoStrip() {
  const doubled = [...LOGOS, ...LOGOS]; // duplicate for seamless loop
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
      {/* Label */}
      <p style={{
        fontFamily: "Poppins, sans-serif",
        fontSize: 16,
        lineHeight: "24px",
        color: "#ffffff",
        margin: 0,
        flexShrink: 0,
        width: 201,
      }}>
        We Feel In-House,{" "}
        <br />
        Deliver Like Owners
      </p>

      {/* Scrolling logos */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        {/* Left fade */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 60,
          background: "linear-gradient(to right, #171717, transparent)",
          zIndex: 1, pointerEvents: "none",
        }} />
        {/* Right fade */}
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: 60,
          background: "linear-gradient(to left, #171717, transparent)",
          zIndex: 1, pointerEvents: "none",
        }} />

        <motion.div
          style={{ display: "flex", gap: 0, alignItems: "center" }}
          animate={{ x: [0, -(LOGOS.length * 216)] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        >
          {doubled.map((logo, i) => (
            <div
              key={i}
              style={{
                width: 216,
                height: 80,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "22px 42px",
                boxSizing: "border-box",
              }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                style={{ maxHeight: logo.h, maxWidth: "100%", objectFit: "contain", display: "block" }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ── Main export ─────────────────────────────────────────────────────────── */
export function AboutB2BPortfolioSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth <= 1024 : false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const goTo = (idx: number) => {
    setDirection(idx > activeSlide ? 1 : -1);
    setActiveSlide(idx);
  };

  const slide = SLIDES[activeSlide];

  return (
    /* Full-width outer card */
    <div
      style={{
        width: "100%",
        background: "#171717",
        borderRadius: 30,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Inner box — 1150px centered */}
      <div
        style={{
          maxWidth: 1150,
          margin: "0 auto",
          padding: isMobile ? "40px 24px" : "60px 96px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? 32 : 48,
        }}
      >
        {/* ── Header ── */}
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "flex-start", justifyContent: "space-between", gap: isMobile ? 16 : 0 }}>
          {/* Tag + line */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0, paddingTop: isMobile ? 0 : 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                background: "#111", border: "1px solid #414141",
                borderRadius: 40, padding: "6px 20px", flexShrink: 0,
              }}>
                <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#FFA600", whiteSpace: "nowrap" }}>
                  B2B Portfolio
                </span>
              </div>
              {!isMobile && <div style={{ width: 215, height: 1, background: "rgba(255,255,255,0.2)" }} />}
            </div>
          </div>
          {/* Heading */}
          <div style={{ width: isMobile ? "100%" : 632 }}>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: isMobile ? "clamp(24px, 6vw, 36px)" : 44, lineHeight: 1.44, margin: 0 }}>
              <span style={{ fontWeight: 700, color: "#ffffff" }}>B2B Portfolio Is Sim </span>
              <span style={{ fontWeight: 300, color: "#8e8e8e" }}>dummy </span>
              <br />
              <span style={{ fontWeight: 300, color: "#8e8e8e" }}>text of the lorem type</span>
            </p>
          </div>
        </div>

        {/* ── Carousel cards ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28, alignItems: "center" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeSlide}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.45, ease: EASE }}
              style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 16, alignItems: "stretch", width: "100%" }}
            >
              {/* Left card */}
              <GlassCard
                style={{
                  width: isMobile ? "100%" : 480,
                  flexShrink: 0,
                  height: isMobile ? "auto" : 469,
                  padding: isMobile ? "28px 24px" : "36px 48px 48px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, color: "#FFA600" }}>Problem</span>
                      <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, lineHeight: "26px", color: "#ffffff", margin: 0 }}>
                        {slide.problem}
                      </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, color: "#FFA600" }}>Solution/Impact</span>
                      <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, lineHeight: "26px", color: "#747474", margin: 0 }}>
                        {slide.solution}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{
                      background: "#fff6e6", borderRadius: 6, width: 110, height: 44,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, overflow: "hidden", padding: 6,
                    }}>
                      <img src={slide.brandLogo} alt={slide.brandAlt} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, color: "#ffffff", textTransform: "capitalize" }}>
                        {slide.personName}
                      </span>
                      <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 300, fontSize: 13, color: "#3b3b3b" }}>
                        {slide.personRole}
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Right side: testimonial + stats */}
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                <TestimonialCard slide={slide} />
                <div style={{ display: "flex", gap: 16 }}>
                  <StatCard value={slide.stat1Value} suffix={slide.stat1Suffix} desc={slide.stat1Desc} />
                  <StatCard value={slide.stat2Value} suffix={slide.stat2Suffix} desc={slide.stat2Desc} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot navigation */}
          <Dots total={SLIDES.length} active={activeSlide} onSelect={goTo} />
        </div>

        {/* ── Logo strip ── */}
        <LogoStrip />
      </div>
    </div>
  );
}
