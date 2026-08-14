/* ─────────────────────────────────────────────────────────────────────────────
   AboutHeroSection — Section 1 of About Us page
   Figma: node 11387-577

   Pixel-perfect recreation:
   • Pure #0a0a0a dark background
   • Full-viewport rounded rectangle border (all 4 sides, bright blue line)
   • Bottom centre: smooth elliptical arch pocket
   • Blue gradient: bottom-right to centre, contained within border
   • Content: upper-area positioned (paddingTop ~88px), centred horizontally
   • Scroll ↓: bounces inside the arch pocket, below the border line
   ───────────────────────────────────────────────────────────────────────────── */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../imports/svg-icprnzbobl";

const EASE      = [0.22, 1, 0.36, 1] as const;
const HEADER_H  = 81;   // GlobalHeader px
const ARCH_RX   = 88;   // arch ellipse half-width  (viewBox units / 1200)
const ARCH_RY   = 44;   // arch depth px (upward concave pocket)
const CORNER_R  = 20;   // border corner radius (viewBox units)
const VB_W      = 1200; // SVG viewBox width

/* ── Arrow ↗ ─────────────────────────────────────────────────────────────── */
function ArrowDiag({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 17.09 17.09" fill="none" style={{ display: "block" }}>
      <path d={svgPaths.pe61a680} fill="white" stroke="white" strokeWidth="0.3" />
    </svg>
  );
}

/* ── CTA Button ──────────────────────────────────────────────────────────── */
function CtaBtn({ label, variant, delay = 0, href }: {
  label: string; variant: "primary" | "outlined"; delay?: number; href?: string;
}) {
  const [hov, setHov] = useState(false);
  const isPrimary = variant === "primary";
  return (
    <motion.div
      onClick={() => href && window.open(href, "_blank", "noopener,noreferrer")}
      style={{
        display: "flex", alignItems: "center", cursor: "pointer", flexShrink: 0,
        borderRadius: 30,
        boxShadow: isPrimary ? "0px 4px 4px rgba(0,0,0,0.30)" : "0px 4px 4px rgba(0,0,0,0.29)",
      }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
    >
      <div style={{
        background: hov && isPrimary ? "linear-gradient(135deg,#2470f0 0%,#1b61db 100%)" : isPrimary ? "#1b61db" : "#0e1f3d",
        borderRadius: 30, padding: "12px 24px", position: "relative", transition: "background 0.22s ease",
      }}>
        {!isPrimary && <div aria-hidden="true" style={{ position: "absolute", inset: 0, border: "1px solid #1b61db", borderRadius: 30, pointerEvents: "none" }} />}
        <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 16, color: "white", lineHeight: "normal", whiteSpace: "nowrap", position: "relative" }}>
          {label}
        </span>
      </div>
      <motion.div
        style={{
          width: 48, height: 48, borderRadius: 30, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", marginLeft: -1,
          background: hov && isPrimary ? "#2470f0" : isPrimary ? "#1b61db" : "#0e1f3d",
          transition: "background 0.22s ease",
        }}
        animate={{ rotate: hov ? 8 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {!isPrimary && <div aria-hidden="true" style={{ position: "absolute", inset: 0, border: "1px solid #1b61db", borderRadius: 30, pointerEvents: "none" }} />}
        <div style={{ transform: "rotate(90deg) scaleY(-1)", display: "flex" }}>
          <ArrowDiag size={16} />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Full perimeter border SVG ───────────────────────────────────────────── */
function HeroBorder({ height }: { height: number }) {
  const W   = VB_W;
  const H   = height;
  const cx  = W / 2;       // 600
  const s   = 1;            // stroke-offset (half of stroke width)
  /* Arch goes UP so no extra height needed below — just a few px clearance */
  const svgH = H + 8;

  /*
   * Clockwise rounded-rectangle path.
   * Top-left → top-right → right-side → bottom-right corner
   * → flat bottom-right → arch pocket (elliptical A downward) → flat bottom-left
   * → bottom-left corner → left-side → back to start.
   *
   * Arch: ellipse A rx=ARCH_RX ry=ARCH_RY sweep-flag=0 (goes downward/outward)
   */
  /* Bottom border only: flat left → arch pocket (upward concave) → flat right */
  const d = [
    `M 0 ${H - s}`,
    `L ${cx - ARCH_RX} ${H - s}`,
    /* sweep-flag=0 → CCW → arc bulges UPWARD (concave pocket into hero) */
    `A ${ARCH_RX} ${ARCH_RY} 0 0 0 ${cx + ARCH_RX} ${H - s}`,
    `L ${W} ${H - s}`,
  ].join(" ");

  return (
    <svg
      viewBox={`0 0 ${W} ${svgH}`}
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: `${svgH}px`,
        pointerEvents: "none",
        zIndex: 6,
        display: "block",
      }}
    >
      <path
        d={d}
        fill="none"
        stroke="rgba(27,97,219,0.85)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* ── Scroll indicator — inside the arch pocket ───────────────────────────── */
function ScrollIndicator({ heroHeight }: { heroHeight: number }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <AnimatePresence>
      {!scrolled && heroHeight > 0 && (
        <motion.div
          key="scroll-ind"
          style={{
            position: "absolute",
            /*
             * Arch is concave (upward) — pocket sits ABOVE the border line.
             * heroHeight = bottom border Y; arch peak = heroHeight - ARCH_RY.
             * Place Scroll at ~55% of arch depth above the border line.
             */
            top: heroHeight - Math.round(ARCH_RY * 0.55),
            left: "50%",
            transform: "translateX(-50%)",
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            cursor: "pointer",
            userSelect: "none",
            zIndex: 20,
            whiteSpace: "nowrap",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.65, behavior: "smooth" })}
        >
          <motion.span
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 15, color: "#FFA600" }}
            animate={{ opacity: [1, 0.55, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            Scroll
          </motion.span>
          <motion.svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M8 3v10M4 9l4 4 4-4" stroke="#FFA600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Main export ─────────────────────────────────────────────────────────── */
export function AboutHeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [vw, setVw] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1440);
  const [heroH, setHeroH] = useState(() =>
    typeof window !== "undefined" ? window.innerHeight - HEADER_H : 640
  );
  const isMobile = vw <= 1024;

  useEffect(() => {
    const measure = () => {
      setVw(window.innerWidth);
      if (heroRef.current) setHeroH(heroRef.current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    /*
     * Outer wrapper: overflow visible so the arch SVG can extend below.
     * The background + gradient inner div is overflow:hidden to clip the gradient.
     */
    <div
      ref={heroRef}
      style={{
        position: "relative",
        width: "100%",
        height: isMobile ? `calc(100svh - ${HEADER_H}px)` : `calc(100vh - ${HEADER_H}px)`,
      }}
    >
      {/* ── Black bg + blue gradient (clipped within hero) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#0a0a0a",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        {/*
         * Blue gradient: bottom-right → centre-bottom, stays inside hero.
         * Two layered radials for depth:
         *  1. Large ellipse from bottom-right corner
         *  2. Smaller spot at bottom-centre-right for extra intensity
         */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: [
              /* Primary glow: tight ellipse anchored at bottom-right corner */
              "radial-gradient(ellipse 52% 56% at 100% 108%, rgba(27,97,219,0.72) 0%, rgba(27,97,219,0.28) 42%, transparent 62%)",
              /* Secondary soft bloom: slightly left of right edge */
              "radial-gradient(ellipse 28% 32% at 80% 100%, rgba(27,97,219,0.32) 0%, transparent 60%)",
            ].join(", "),
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ── Full-perimeter border with arch pocket ── */}
      <HeroBorder height={heroH} />

      {/* ── Centred content (upper-biased: paddingTop shifts content toward top) ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          /* Upper-area bias: content sits in top ~60% of hero, leaving bottom for gradient */
          justifyContent: "flex-start",
          paddingTop: isMobile ? "8%" : "11%",
          paddingBottom: 0,
          paddingLeft: isMobile ? 24 : 48,
          paddingRight: isMobile ? 24 : 48,
          textAlign: "center",
          gap: isMobile ? 36 : 60,
        }}
      >
        {/* Badge + heading + subtitle */}
        <motion.div
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, maxWidth: 1008, width: "100%" }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          {/* Tag */}
          <motion.div
            style={{ background: "#111", borderRadius: 40, padding: "6px 20px", display: "inline-flex", alignItems: "center", position: "relative" }}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.2, ease: EASE }}
          >
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, border: "1px solid #414141", borderRadius: 40, pointerEvents: "none" }} />
            <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 12, color: "#FFA600", lineHeight: "normal", whiteSpace: "nowrap", position: "relative" }}>
              Hero Section
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            style={{
              fontFamily: "Manrope, sans-serif", fontWeight: 700,
              fontSize: isMobile ? "clamp(30px, 7vw, 48px)" : 52,
              lineHeight: 1.28, color: "white", textTransform: "capitalize",
              maxWidth: 899,
            }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: EASE }}
          >
            We Unlock Scale Lorem Ipsum Is Fixing What's Leaking Type
          </motion.div>

          {/* Subtitle */}
          <motion.p
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: isMobile ? 14 : 16, lineHeight: "25px", color: "#727272", margin: 0, maxWidth: 600 }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.5, ease: EASE }}
          >
            short We unlock scale fixing what's leaking explanation that ThirdMeta powers two
          </motion.p>
        </motion.div>

        {/* CTA buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: isMobile ? "wrap" : "nowrap", justifyContent: "center" }}>
          <CtaBtn label="B2B ThirdMeta" variant="primary"  delay={0.65} href="https://thirdmeta.in/" />
          <CtaBtn label="FMCG/D2C"      variant="outlined" delay={0.75} href="https://thenativeunit.com/" />
        </div>
      </div>

      {/* ── Scroll indicator — inside the arch pocket ── */}
      <ScrollIndicator heroHeight={heroH} />
    </div>
  );
}
