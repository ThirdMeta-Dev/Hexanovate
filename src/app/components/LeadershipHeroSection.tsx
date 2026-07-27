/* ─────────────────────────────────────────────────────────────────────────────
   LeadershipHeroSection — Section 1 of Leadership & Team page
   Figma: node 11420-31

   Pixel-perfect recreation identical to AboutHeroSection visual design:
   • Pure #0a0a0a dark background
   • Blue gradient: bottom-right corner glow, contained within border
   • Bottom centre: smooth elliptical arch pocket (concave notch)
   • Scroll ↓: bounces inside the arch pocket
   ───────────────────────────────────────────────────────────────────────────── */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCmsSectionContent } from "../context/CmsSectionContext";
import { CtaButton } from "./CtaButton";

const EASE     = [0.22, 1, 0.36, 1] as const;
const HEADER_H = 81;
const ARCH_RX  = 88;
const ARCH_RY  = 44;
const VB_W     = 1200;

/* ── CTA Button — shared pill (Figma 10904:134 / 10904:141) ──────────────── */
function CtaBtn({ label, variant, delay = 0, href }: {
  label: string; variant: "primary" | "outlined"; delay?: number; href?: string;
}) {
  return (
    <CtaButton
      label={label}
      variant={variant === "primary" ? "filled" : "outline"}
      animateIn
      delay={delay}
      onClick={() => {
        if (!href) return;
        if (href.startsWith("/")) window.location.href = href;
        else window.open(href, "_blank", "noopener,noreferrer");
      }}
    />
  );
}

/* ── Bottom border with concave arch pocket ──────────────────────────────── */
function HeroBorder({ height }: { height: number }) {
  const W  = VB_W;
  const H  = height;
  const cx = W / 2;
  const s  = 1;
  const CR = 40; // bottom corner radius in viewBox units
  const svgH = H + 4;
  /* The border line sits ARCH_RY above the hero bottom so the arch pocket's
     deepest point lands exactly on the hero (= viewport) bottom edge — the
     whole notch stays visible without scrolling. */
  const lineY = H - ARCH_RY - s;

  /* Bottom border with rounded bottom-left and bottom-right corners:
     - Start on left edge, CR px above the line → Q curve to bottom-left corner
     - Flat right → arch notch (dips to hero bottom) → flat right
     - Q curve at bottom-right → up CR px on right edge */
  const d = [
    `M 0 ${lineY - CR}`,
    `Q 0 ${lineY} ${CR} ${lineY}`,
    `L ${cx - ARCH_RX} ${lineY}`,
    `A ${ARCH_RX} ${ARCH_RY} 0 0 0 ${cx + ARCH_RX} ${lineY}`,
    `L ${W - CR} ${lineY}`,
    `Q ${W} ${lineY} ${W} ${lineY - CR}`,
  ].join(" ");

  return (
    <svg
      viewBox={`0 0 ${W} ${svgH}`}
      preserveAspectRatio="none"
      style={{
        position: "absolute", top: 0, left: 0,
        width: "100%", height: `${svgH}px`,
        pointerEvents: "none", zIndex: 20, display: "block",
      }}
    >
      <path d={d} fill="none" stroke="rgba(27,97,219,0.85)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
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
            top: heroHeight - ARCH_RY - 26,
            left: "50%",
            transform: "translateX(-50%)",
            display: "inline-flex", alignItems: "center", gap: 5,
            cursor: "pointer", userSelect: "none", zIndex: 20, whiteSpace: "nowrap",
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
export function LeadershipHeroSection() {
  const { content } = useCmsSectionContent();
  const tag      = String(content.tag      ?? "Built With Purpose");
  const heading  = String(content.heading  ?? "We Enter Your Universe and Just Care About Whether Your Business Makes It.");
  const subtext  = String(content.subtext  ?? "One company, three focused verticals, a passionate team and a single operating principle. Your growth is the only outcome that counts.");
  const cta1Text = String(content.cta1Text ?? "Meet the team");
  const cta1Link = String(content.cta1Link ?? "/leadership-and-team");
  const cta2Text = String(content.cta2Text ?? "See our work");
  const cta2Link = String(content.cta2Link ?? "");
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
    <div
      ref={heroRef}
      style={{
        position: "relative",
        width: "100%",
        height: isMobile ? `calc(100svh - ${HEADER_H}px)` : `calc(100vh - ${HEADER_H}px)`,
        /* Sit above the section below so the notch SVG is never hidden */
        zIndex: 2,
      }}
    >
      {/* ── Black bg + blue gradient — stops at the border line (ARCH_RY above
             the hero bottom) so the notch area below the line stays clear ── */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: ARCH_RY, background: "#0a0a0a", overflow: "hidden", zIndex: 0, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }}>
        <div
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            background: [
              "radial-gradient(ellipse 52% 56% at 100% 108%, rgba(27,97,219,0.72) 0%, rgba(27,97,219,0.28) 42%, transparent 62%)",
              "radial-gradient(ellipse 28% 32% at 80% 100%, rgba(27,97,219,0.32) 0%, transparent 60%)",
            ].join(", "),
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ── Bottom border with arch notch ── */}
      <HeroBorder height={heroH} />

      {/* ── Content ── */}
      <div
        style={{
          position: "relative", zIndex: 10, height: "100%",
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: isMobile ? "8%" : "9%",
          paddingLeft: 24,
          paddingRight: 24,
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
              {tag}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            style={{
              fontFamily: "Manrope, sans-serif", fontWeight: 700,
              fontSize: isMobile ? "clamp(30px, 7vw, 48px)" : 52,
              lineHeight: 1.22, color: "white",
              maxWidth: 780,
            }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: EASE }}
          >
            {heading}
          </motion.div>

          {/* Subtitle */}
          <motion.p
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: isMobile ? 14 : 16, lineHeight: "25px", color: "#727272", margin: 0, maxWidth: 580 }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.5, ease: EASE }}
          >
            {subtext}
          </motion.p>
        </motion.div>

        {/* CTA buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: isMobile ? "wrap" : "nowrap", justifyContent: "center" }}>
          <CtaBtn label={cta1Text} variant="primary"  delay={0.65} href={cta1Link || "/leadership-and-team"} />
          <CtaBtn label={cta2Text} variant="outlined" delay={0.75} href={cta2Link || undefined} />
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <ScrollIndicator heroHeight={heroH} />
    </div>
  );
}
