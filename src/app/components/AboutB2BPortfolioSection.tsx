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
import imgAcumen    from "@/assets/logo-acumen.png";
import imgAppGallop from "@/assets/logo-appgallop.png";
import imgEfax      from "@/assets/logo-efax.png";
import imgSplashtop from "@/assets/logo-splashtop.png";
import imgSenses    from "@/assets/logo-senses.png";
import imgElmo      from "@/assets/logo-elmo.png";
import imgGoldman   from "@/assets/logo-goldman.png";
import imgPaybooks from "@/assets/logo-paybooks.png";
import svgPaths from "../../imports/svg-jl4fqzv8ja";
import { imgVector as pbvMask, imgGroup as pbgMask, imgGroup1 as pbg1Mask } from "../../imports/svg-tf7hb";

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

/* ── Logo strip — pixel-perfect cells from Figma node 11712-25 ───────────── */

/* Shared cell wrapper: 216×80, flex-col center, matches Figma slot */
function CellWrap({ px = 42, py = 22, children }: { px?: number; py?: number; children: React.ReactNode }) {
  return (
    <div style={{ width: 216, height: 80, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: `${py}px ${px}px`, boxSizing: "border-box", borderRadius: 16 }}>
      {children}
    </div>
  );
}

/* CSS-grid stacking container — children at col-1/row-1 sit side-by-side via margin */
function ImgGrid({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "inline-grid", gridTemplateColumns: "max-content", gridTemplateRows: "max-content", placeItems: "start", position: "relative", flexShrink: 0, lineHeight: 0 }}>
      {children}
    </div>
  );
}

/* One clipped image piece inside the grid */
function ImgPiece({ h, w, ml = 0, mt = 0, src, l, t, iw, ih }: { h: number; w: number; ml?: number; mt?: number; src: string; l: string; t: string; iw: string; ih: string }) {
  return (
    <div style={{ gridColumn: 1, gridRow: 1, height: h, width: w, marginLeft: ml, marginTop: mt, position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <img alt="" src={src} style={{ position: "absolute", height: ih, left: l, top: t, width: iw, maxWidth: "none" }} />
      </div>
    </div>
  );
}

/* 1. Acumen CMS */
function LogoCellAcumen() {
  return (
    <CellWrap>
      <ImgGrid>
        <ImgPiece h={49} w={122} ml={56} src={imgAcumen} l="-45.9%"  t="-0.2%"  iw="145.9%"  ih="100.39%" />
        <ImgPiece h={49} w={56}         src={imgAcumen} l="0%"      t="-0.2%"  iw="317.86%" ih="100.39%" />
      </ImgGrid>
    </CellWrap>
  );
}

/* 2. AppGallop */
function LogoCellAppGallop() {
  return (
    <CellWrap>
      <ImgGrid>
        {/* right portion */}
        <ImgPiece h={30.557} w={74.5} ml={81.5} src={imgAppGallop} l="-109.4%" t="-1.05%" iw="209.4%"  ih="102.11%" />
        {/* left + tiny bottom-left piece — nested grid at same col/row */}
        <div style={{ gridColumn: 1, gridRow: 1, display: "inline-grid", gridTemplateColumns: "max-content", gridTemplateRows: "max-content", placeItems: "start", lineHeight: 0 }}>
          <ImgPiece h={30.557} w={81.5}        src={imgAppGallop} l="0%"    t="-1.05%"  iw="191.41%" ih="102.11%" />
          <ImgPiece h={17}     w={15.5}  mt={8} src={imgAppGallop} l="0%"   t="-48.95%" iw="1006.45%" ih="183.53%" />
        </div>
      </ImgGrid>
    </CellWrap>
  );
}

/* 3. eFax */
function LogoCellEfax() {
  return (
    <CellWrap>
      <div style={{ height: 49, width: 108, position: "relative", flexShrink: 0, overflow: "hidden" }}>
        <img alt="eFax" src={imgEfax} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }} />
      </div>
    </CellWrap>
  );
}

/* 4. Splashtop */
function LogoCellSplashtop() {
  return (
    <CellWrap>
      <ImgGrid>
        <ImgPiece h={30} w={118} ml={35} src={imgSplashtop} l="-29.66%" t="-0.73%" iw="129.66%" ih="101.47%" />
        <ImgPiece h={30} w={35}          src={imgSplashtop} l="0%"      t="-0.73%" iw="437.14%" ih="101.47%" />
      </ImgGrid>
    </CellWrap>
  );
}

/* 5. ••senses */
function LogoCellSenses() {
  return (
    <CellWrap>
      <ImgGrid>
        <ImgPiece h={13.212} w={42.887}        src={imgSenses} l="0%"      t="0%" iw="340.43%" ih="100%" />
        <ImgPiece h={13.212} w={104}    ml={41.89} src={imgSenses} l="-40.38%" t="0%" iw="140.38%" ih="100%" />
      </ImgGrid>
    </CellWrap>
  );
}

/* 6. truein — SVG paths match Figma viewBoxes exactly */
function LogoCellTruein() {
  return (
    <CellWrap px={34} py={21}>
      <div style={{ height: 22, width: 104, position: "relative", flexShrink: 0, overflow: "hidden" }}>
        {/* text "truein" — right 77.75×21.43 of the 104×22 box */}
        <div style={{ position: "absolute", top: 0, right: 0, bottom: "2.57%", left: "25.24%" }}>
          <svg width="100%" height="100%" fill="none" viewBox="0 0 77.75 21.43" preserveAspectRatio="none" style={{ display: "block" }}>
            <path d={svgPaths.p8fce100}  fill="white" />
            <path d={svgPaths.p3812f00}  fill="white" />
            <path d={svgPaths.p1b36aec0} fill="white" />
            <path d={svgPaths.p3c59b580} fill="white" />
            <path d={svgPaths.p219f2ca0} fill="#0086D3" />
            <path d={svgPaths.p27d06700} fill="#0086D3" />
          </svg>
        </div>
        {/* icon — left 21.28×21.09 */}
        <div style={{ position: "absolute", top: "4.13%", right: "79.54%", bottom: 0, left: 0 }}>
          <svg width="100%" height="100%" fill="none" viewBox="0 0 21.28 21.09" preserveAspectRatio="none" style={{ display: "block" }}>
            <path d={svgPaths.p17a13700} fill="#1531A9" />
            <path d={svgPaths.p3fa5de00} fill="white" />
            <path d={svgPaths.p3d9ce300} fill="white" />
            <path d={svgPaths.p1cc6be00} fill="#0086D3" />
          </svg>
        </div>
      </div>
    </CellWrap>
  );
}

/* 7. KlearStack — white rounded box + SVG monogram + Inter text */
function LogoCellKlearStack() {
  return (
    <CellWrap px={30}>
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
        <div style={{ position: "relative", flexShrink: 0, width: 26, height: 26 }}>
          <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" viewBox="0 0 26 26">
            <path clipRule="evenodd" d={svgPaths.p33a7a328} fill="#FABF5A" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p3440b700} fill="#1873DE" fillRule="evenodd" />
          </svg>
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 21, lineHeight: "28px", color: "white", whiteSpace: "nowrap", margin: 0 }}>
          Klear<span style={{ fontWeight: 400 }}>Stack</span>
        </p>
      </div>
    </CellWrap>
  );
}

/* 8. Paybooks — leaf icon (55px) + cropped text image */
function LogoCellPaybooks() {
  return (
    <CellWrap>
      <div style={{ display: "flex", gap: 10, height: 70, alignItems: "center", flexShrink: 0 }}>
        {/* Leaf icon */}
        <div style={{ position: "relative", width: 55, height: 55, flexShrink: 0 }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} fill="none" viewBox="0 0 54.77 54.77">
            <path d={svgPaths.p31be54f0} fill="white" />
          </svg>
          <div style={{ position: "absolute", top: "35%", left: "37%", width: "38%", height: "54%", maskImage: `url('${pbvMask}')`, WebkitMaskImage: `url('${pbvMask}')`, maskSize: "contain", maskRepeat: "no-repeat" }}>
            <svg style={{ width: "100%", height: "100%" }} fill="none" viewBox="0 0 20.54 29.54">
              <path d={svgPaths.p37e87180} fill="#9ABD3B" />
            </svg>
          </div>
          <div style={{ position: "absolute", top: "30%", left: "31%", width: "33%", height: "53%", maskImage: `url('${pbvMask}'), url('${pbgMask}'), url('${pbg1Mask}')`, WebkitMaskImage: `url('${pbvMask}'), url('${pbgMask}'), url('${pbg1Mask}')`, maskSize: "contain", maskRepeat: "no-repeat" }}>
            <svg style={{ width: "100%", height: "100%" }} fill="none" viewBox="0 0 20.54 29.54">
              <defs>
                <linearGradient id="pb_grad_strip" x1="15.27" x2="-3.84" y1="15.43" y2="15.43" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="#89C341" />
                </linearGradient>
              </defs>
              <path d={svgPaths.pc661a00} fill="url(#pb_grad_strip)" />
            </svg>
          </div>
        </div>
        {/* Text image — crop matches Figma: left=-67.66%, w=167.06% of 105px */}
        <div style={{ height: 60, width: 105, position: "relative", flexShrink: 0, overflow: "hidden", pointerEvents: "none" }}>
          <img alt="Paybooks" src={imgPaybooks} style={{ position: "absolute", height: "100%", left: "-67.66%", maxWidth: "none", top: 0, width: "167.06%" }} />
        </div>
      </div>
    </CellWrap>
  );
}

/* 9. ELMO */
function LogoCellElmo() {
  return (
    <CellWrap px={31}>
      <div style={{ height: 42, width: 110, position: "relative", flexShrink: 0, overflow: "hidden" }}>
        <img alt="ELMO" src={imgElmo} style={{ position: "absolute", height: "100.27%", left: "-9.04%", maxWidth: "none", top: "-0.13%", width: "117.91%", pointerEvents: "none" }} />
      </div>
    </CellWrap>
  );
}

/* 10. Coldman Warehousing */
function LogoCellGoldman() {
  return (
    <CellWrap>
      <div style={{ height: 58, width: 138, position: "relative", flexShrink: 0, overflow: "hidden" }}>
        <img alt="Coldman" src={imgGoldman} style={{ position: "absolute", height: "195.65%", left: "2.26%", maxWidth: "none", top: "-49.57%", width: "95.65%", pointerEvents: "none" }} />
      </div>
    </CellWrap>
  );
}

const LOGO_CELLS: ReadonlyArray<() => JSX.Element> = [
  LogoCellAcumen, LogoCellAppGallop, LogoCellEfax, LogoCellSplashtop, LogoCellSenses,
  LogoCellTruein, LogoCellKlearStack, LogoCellPaybooks, LogoCellElmo, LogoCellGoldman,
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
  const doubled = [...LOGO_CELLS, ...LOGO_CELLS];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
      <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, lineHeight: "24px", color: "#ffffff", margin: 0, flexShrink: 0, width: 201, textTransform: "capitalize" }}>
        We Feel In-House,{" "}<br />Deliver Like Owners
      </p>
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(to right, #171717, transparent)", zIndex: 1, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(to left, #171717, transparent)", zIndex: 1, pointerEvents: "none" }} />
        <motion.div
          style={{ display: "flex", alignItems: "center" }}
          animate={{ x: [0, -(LOGO_CELLS.length * 216)] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        >
          {doubled.map((Cell, i) => <Cell key={i} />)}
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
                  They Said It. Not Us.
                </span>
              </div>
              {!isMobile && <div style={{ width: 215, height: 1, background: "rgba(255,255,255,0.2)" }} />}
            </div>
          </div>
          {/* Heading */}
          <div style={{ width: isMobile ? "100%" : 632 }}>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: isMobile ? "clamp(24px, 6vw, 36px)" : 44, lineHeight: 1.44, margin: 0 }}>
              <span style={{ fontWeight: 700, color: "#ffffff" }}>Okay Fine. We Will Let </span>
              <span style={{ fontWeight: 300, color: "#8e8e8e" }}>The Work </span>
              <br />
              <span style={{ fontWeight: 700, color: "#ffffff" }}>Do The Talking For Once.</span>
            </p>
            <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 300, fontSize: 15, lineHeight: "24px", color: "#727272", margin: "12px 0 0" }}>
              Real clients, real problems, occasionally uncomfortable truths, and numbers that actually showed up.
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
