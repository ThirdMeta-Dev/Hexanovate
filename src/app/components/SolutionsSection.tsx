import { motion } from "motion/react";
import { useId, useState, useEffect, useRef } from "react";
import svgPaths from "../../imports/svg-29dk7258jb";
import { TextRevealParagraph } from "./TextRevealParagraph";
import { useCmsSectionContent } from "../context/CmsSectionContext";

/* ─── VIDEO URLS ─────────────────────────────────────────────────────────── */
const DEFAULT_VIDEO_FMCG     = "https://sienna-pelican-786032.hostingersite.com/wp-content/uploads/2026/03/FMCG.mp4";
const DEFAULT_VIDEO_NATIVE   = "https://sienna-pelican-786032.hostingersite.com/wp-content/uploads/2026/03/B2B.mp4";
const DEFAULT_VIDEO_CONSUMER = "https://sienna-pelican-786032.hostingersite.com/wp-content/uploads/2026/03/Education.mp4";

/* ─── DIAGONAL ARROW ICON ─────────────────────────────────────────────────── */
function DiagonalArrow() {
  return (
    <div style={{ width: 16, height: 16, overflow: "clip", position: "relative", flexShrink: 0 }}>
      <div style={{ position: "absolute", inset: "5%" }}>
        <div style={{ position: "absolute", inset: "-9.8% -9.8% -8.88% -8.88%" }}>
          <svg fill="none" viewBox="0 0 17.09 17.0901" style={{ display: "block", width: "100%", height: "100%" }}>
            <path d={svgPaths.pe61a680} fill="white" stroke="white" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── CTA BUTTON GROUP ───────────────────────────────────────────────────── */
function CtaGroup({ label, semibold = false, compact = false, href }: { label: string; semibold?: boolean; compact?: boolean; href?: string }) {
  const inner = (
    <motion.div
      style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      <div style={{ background: "#1b61db", padding: compact ? "8px 14px" : "12px 24px", borderRadius: 30, flexShrink: 0 }}>
        <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: semibold ? 600 : 500, fontSize: compact ? 12 : 16, color: "white", whiteSpace: "nowrap", lineHeight: "normal" }}>
          {label}
        </span>
      </div>
      <div style={{ background: "#1b61db", padding: compact ? 10 : 16, borderRadius: 30, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <div style={{ width: compact ? 12 : 16, height: compact ? 12 : 16, transform: "rotate(90deg) scaleY(-1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <DiagonalArrow />
        </div>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "inline-flex" }}>
        {inner}
      </a>
    );
  }
  return inner;
}

/* ─── BADGES ─────────────────────────────────────────────────────────────── */
function SolutionsBadge() {
  return (
    <div style={{ background: "#111", border: "1px solid #414141", borderRadius: 40, padding: "6px 20px", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 13, color: "#FFA600", lineHeight: "normal", whiteSpace: "nowrap" }}>Solutions</span>
    </div>
  );
}
function FmcgBadge() {
  return (
    <div style={{ background: "#111", border: "1px solid #414141", borderRadius: 40, padding: "6px 20px", display: "inline-flex", alignItems: "center", flexShrink: 0 }}>
      <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 13, color: "#FFA600", whiteSpace: "nowrap" }}>B2B · ThirdMeta</span>
    </div>
  );
}
function B2bBadge() {
  return (
    <div style={{ background: "#111", border: "1px solid #414141", borderRadius: 40, padding: "6px 20px", display: "inline-flex", alignItems: "center", flexShrink: 0 }}>
      <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 13, color: "#FFA600", whiteSpace: "nowrap" }}>FMCG/D2C/Consumer · NativeUnit</span>
    </div>
  );
}
function EduHexaBadge() {
  return (
    <div style={{ background: "#111", border: "1px solid #414141", borderRadius: 40, padding: "6px 20px", display: "inline-flex", alignItems: "center", flexShrink: 0 }}>
      <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 13, color: "#FFA600", whiteSpace: "nowrap" }}>EdTech · EduHexa</span>
    </div>
  );
}

/* ─── MOBILE GRADIENT BORDER WRAPPER ─────────────────────────────────────── */
function GradientBorderCard({ borderGradient, glowStyle, children }: { borderGradient: string; glowStyle?: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div style={{ background: borderGradient, borderRadius: 20, padding: "1.5px", width: "100%", boxSizing: "border-box" }}>
      <div style={{ background: "#0f1117", borderRadius: "18.5px", overflow: "hidden", position: "relative", width: "100%", boxSizing: "border-box" }}>
        {glowStyle && <div style={{ position: "absolute", inset: 0, pointerEvents: "none", ...glowStyle }} />}
        {children}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   FMCG LEFT CARD  (520 × 442)
   ─────────────────────────────────────────────────────────────────────────── */
function FmcgLeftCard({ isMobile, videoSrc }: { isMobile: boolean; videoSrc: string }) {
  const uid    = useId().replace(/:/g, "");
  const g0     = `fl-g0-${uid}`;
  const g1     = `fl-g1-${uid}`;
  const mk     = `fl-mk-${uid}`;
  const clipId = `fl-clip-${uid}`;

  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const enter = () => { setHovered(true);  videoRef.current?.play(); };
  const leave = () => {
    setHovered(false);
    const v = videoRef.current;
    if (v) { v.pause(); v.currentTime = 0; }
  };

  /* ── Mobile ── */
  if (isMobile) {
    return (
      <GradientBorderCard
        borderGradient="linear-gradient(135deg, rgba(255,166,0,0.75) 0%, rgba(27,97,219,0.5) 60%, rgba(27,97,219,0.15) 100%)"
        glowStyle={{ background: "radial-gradient(ellipse 70% 60% at 10% 10%, rgba(255,166,0,0.13) 0%, transparent 70%)" }}
      >
        <div style={{ padding: "24px 20px 20px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12, position: "relative", zIndex: 1 }}>
          <FmcgBadge />
          <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: 18, lineHeight: "1.4", color: "white", margin: 0, width: "100%" }}>The B2B Growth Engine</p>
          <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 300, fontSize: 13, lineHeight: "1.7", color: "#888", margin: 0, width: "100%" }}>
            B2B SaaS and tech companies come here to build real, compounding pipeline. Intent turned into revenue. No noise.
          </p>
          <div style={{ marginTop: 4 }}><CtaGroup label="Explore ThirdMeta ↗" compact href="https://thirdmeta.in/" /></div>
        </div>
      </GradientBorderCard>
    );
  }

  /* ── Desktop ── */
  return (
    <div style={{ position: "relative", width: "100%" }} onMouseEnter={enter} onMouseLeave={leave}>
      <div style={{ position: "relative", width: "100%", aspectRatio: "520 / 442" }}>

        {/* ── Main SVG: shape + video clipped inside ── */}
        <svg
          style={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%", overflow: "hidden" }}
          fill="none" preserveAspectRatio="none" viewBox="0 0 520 442"
        >
          <defs>
            {/* Clip path — exact card shape */}
            <clipPath id={clipId}>
              <path d={svgPaths.pb1d3b00} />
            </clipPath>
            <linearGradient id={g0} gradientUnits="userSpaceOnUse" x1="26.1036" x2="523.076" y1="26" y2="403.595">
              <stop stopColor="#0A0A0A" /><stop offset="1" />
            </linearGradient>
            <linearGradient id={g1} gradientUnits="userSpaceOnUse" x1="868.5" x2="780.5" y1="221.5" y2="152">
              <stop stopColor="#1B61DB" /><stop offset="1" stopColor="#0A0A0A" />
            </linearGradient>
            <mask id={mk} fill="white"><path d={svgPaths.pb1d3b00} /></mask>
          </defs>

          {/* Card background fills */}
          <path d={svgPaths.pb1d3b00} fill={`url(#${g0})`} fillOpacity="0.8" />
          <path d={svgPaths.p2a0c73f2} fill={`url(#${g1})`} fillOpacity="0.2" mask={`url(#${mk})`} />

          {/* Video — clipped to exact card shape via foreignObject */}
          <foreignObject
            x="0" y="0" width="520" height="442"
            clipPath={`url(#${clipId})`}
            style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.4s ease", pointerEvents: "none" }}
          >
            <video
              ref={videoRef}
              src={videoSrc}
              muted loop playsInline preload="metadata"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </foreignObject>
        </svg>

        {/* Golden radial glow — fades on hover */}
        <div style={{
          position: "absolute", left: 0, top: 0, width: "100%", height: "55%", pointerEvents: "none",
          background: "radial-gradient(ellipse 55% 90% at 5% 15%, rgba(255,166,0,0.22) 0%, transparent 65%)",
          borderTopLeftRadius: 30,
          opacity: hovered ? 0 : 1, transition: "opacity 0.3s ease", zIndex: 1,
        }} />

        {/* Top-right decorative vector — fades on hover */}
        <div style={{ position: "absolute", left: "44.6%", top: "6.1%", width: "55.2%", height: "37.6%", pointerEvents: "none", opacity: hovered ? 0 : 1, transition: "opacity 0.3s ease", zIndex: 1 }}>
          <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 287 159.605">
            <path d={svgPaths.p22f70e80} fill="#252525" />
          </svg>
        </div>
        <div style={{ position: "absolute", left: "44.6%", top: "-0.2%", width: "55.2%", height: "37.6%", pointerEvents: "none", opacity: hovered ? 0 : 1, transition: "opacity 0.3s ease", zIndex: 1 }}>
          <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 287 159.605">
            <path d={svgPaths.p22f70e80} fill="#252525" />
          </svg>
        </div>

        {/* Badge — fades on hover */}
        <div style={{ position: "absolute", left: "6.5%", top: "19.7%", opacity: hovered ? 0 : 1, transition: "opacity 0.3s ease", zIndex: 3 }}>
          <FmcgBadge />
        </div>

        {/* Title + description — fades on hover */}
        <div style={{
          position: "absolute", left: "6.5%", right: "6.5%", bottom: "14%",
          display: "flex", flexDirection: "column", gap: 8,
          opacity: hovered ? 0 : 1, transition: "opacity 0.3s ease", zIndex: 3,
        }}>
          <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: 24, lineHeight: "34px", color: "white", margin: 0 }}>The B2B Growth Engine</p>
          <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 300, fontSize: 15, lineHeight: "26px", color: "#727272", margin: 0, marginBottom: 28 }}>
            B2B SaaS and tech companies come here to build real, compounding pipeline. Intent turned into revenue. No noise.
          </p>
        </div>

        {/* CTA — always visible */}
        <div style={{ position: "absolute", left: 0, bottom: 0, paddingTop: 8, paddingRight: 8, zIndex: 4 }}>
          <CtaGroup label="Explore ThirdMeta ↗" href="https://thirdmeta.in/" />
        </div>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   B2B / NATIVE UNIT RIGHT CARD  (520 × 500)
   Style: FMCG golden tint + top-right vector (same as FmcgLeftCard)
   ─────────────────────────────────────────────────────────────────────────── */
function B2bRightCard({ isMobile, videoSrc }: { isMobile: boolean; videoSrc: string }) {
  const uid    = useId().replace(/:/g, "");
  const g0     = `br-g0-${uid}`;
  const g1     = `br-g1-${uid}`;
  const mk     = `br-mk-${uid}`;
  const clipId = `br-clip-${uid}`;

  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const enter = () => { setHovered(true);  videoRef.current?.play(); };
  const leave = () => {
    setHovered(false);
    const v = videoRef.current;
    if (v) { v.pause(); v.currentTime = 0; }
  };

  /* ── Mobile ── */
  if (isMobile) {
    return (
      <GradientBorderCard
        borderGradient="linear-gradient(135deg, rgba(255,166,0,0.75) 0%, rgba(27,97,219,0.5) 60%, rgba(27,97,219,0.15) 100%)"
        glowStyle={{ background: "radial-gradient(ellipse 70% 60% at 10% 10%, rgba(255,166,0,0.13) 0%, transparent 70%)" }}
      >
        <div style={{ padding: "24px 20px 20px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12, position: "relative", zIndex: 1 }}>
          <B2bBadge />
          <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: 18, lineHeight: "1.4", color: "white", margin: 0, width: "100%" }}>Consumer Growth, Engineered</p>
          <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 300, fontSize: 13, lineHeight: "1.7", color: "#888", margin: 0, width: "100%" }}>
            Built for consumer brands ready to grow beyond word of mouth. Discovery, trust, purchase, repeat. All of it.
          </p>
          <div style={{ marginTop: 4 }}><CtaGroup label="Explore NativeUnit ↗" semibold compact href="https://thenativeunit.com/" /></div>
        </div>
      </GradientBorderCard>
    );
  }

  /* ── Desktop ── */
  return (
    <div style={{ position: "relative", width: "100%" }} onMouseEnter={enter} onMouseLeave={leave}>
      <div style={{ position: "relative", width: "100%", aspectRatio: "520 / 500" }}>

        {/* ── Main SVG: FMCG-style dark fill + video clipped inside ── */}
        <svg
          style={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%", overflow: "hidden" }}
          fill="none" preserveAspectRatio="none" viewBox="0 0 520 500"
        >
          <defs>
            <clipPath id={clipId}>
              <path d={svgPaths.p8c91100} />
            </clipPath>
            <linearGradient id={g0} gradientUnits="userSpaceOnUse" x1="26.1036" x2="523.076" y1="26" y2="500">
              <stop stopColor="#0A0A0A" /><stop offset="1" />
            </linearGradient>
            <linearGradient id={g1} gradientUnits="userSpaceOnUse" x1="868.5" x2="780.5" y1="280" y2="180">
              <stop stopColor="#1B61DB" /><stop offset="1" stopColor="#0A0A0A" />
            </linearGradient>
            <mask id={mk} fill="white"><path d={svgPaths.p8c91100} /></mask>
          </defs>

          {/* FMCG-style dark background fills */}
          <path d={svgPaths.p8c91100} fill={`url(#${g0})`} fillOpacity="0.85" />
          <path d={svgPaths.p3a7caa00} fill={`url(#${g1})`} fillOpacity="0.2" mask={`url(#${mk})`} />

          {/* Video — clipped to exact card shape */}
          <foreignObject
            x="0" y="0" width="520" height="500"
            clipPath={`url(#${clipId})`}
            style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.4s ease", pointerEvents: "none" }}
          >
            <video
              ref={videoRef}
              src={videoSrc}
              muted loop playsInline preload="metadata"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </foreignObject>
        </svg>

        {/* Golden radial glow (top-left) — FMCG style, fades on hover */}
        <div style={{
          position: "absolute", left: 0, top: 0, width: "100%", height: "55%", pointerEvents: "none",
          background: "radial-gradient(ellipse 55% 90% at 5% 15%, rgba(255,166,0,0.22) 0%, transparent 65%)",
          borderTopLeftRadius: 30,
          opacity: hovered ? 0 : 1, transition: "opacity 0.3s ease", zIndex: 1,
        }} />

        {/* Top-right decorative vector — FMCG style, fades on hover */}
        <div style={{ position: "absolute", left: "44.6%", top: "6.1%", width: "55.2%", height: "33%", pointerEvents: "none", opacity: hovered ? 0 : 1, transition: "opacity 0.3s ease", zIndex: 1 }}>
          <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 287 159.605">
            <path d={svgPaths.p22f70e80} fill="#252525" />
          </svg>
        </div>
        <div style={{ position: "absolute", left: "44.6%", top: "-0.2%", width: "55.2%", height: "33%", pointerEvents: "none", opacity: hovered ? 0 : 1, transition: "opacity 0.3s ease", zIndex: 1 }}>
          <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 287 159.605">
            <path d={svgPaths.p22f70e80} fill="#252525" />
          </svg>
        </div>

        {/* Badge — fades on hover */}
        <div style={{ position: "absolute", left: "6.5%", top: "15.6%", opacity: hovered ? 0 : 1, transition: "opacity 0.3s ease", zIndex: 3 }}>
          <B2bBadge />
        </div>

        {/* Title + description — fades on hover */}
        <div style={{
          position: "absolute", left: "6.5%", right: "6.5%", bottom: "12%",
          display: "flex", flexDirection: "column", gap: 8,
          opacity: hovered ? 0 : 1, transition: "opacity 0.3s ease", zIndex: 3,
        }}>
          <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: 24, lineHeight: "34px", color: "white", margin: 0 }}>Consumer Growth, Engineered</p>
          <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 300, fontSize: 15, lineHeight: "25px", color: "white", margin: 0, marginBottom: 28 }}>
            Built for consumer brands ready to grow beyond word of mouth. Discovery, trust, purchase, repeat. All of it.
          </p>
        </div>

        {/* CTA — always visible */}
        <div style={{ position: "absolute", left: 0, bottom: 0, paddingTop: 8, paddingRight: 8, zIndex: 4 }}>
          <CtaGroup label="Explore NativeUnit ↗" semibold href="https://thenativeunit.com/" />
        </div>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   BOTTOM WIDE CARD  — Scale Your Consumer Brand  (1064 × 274)
   ─────────────────────────────────────────────────────────────────────────── */
function FmcgBottomCard({ isMobile, videoSrc }: { isMobile: boolean; videoSrc: string }) {
  const uid    = useId().replace(/:/g, "");
  const g0     = `fb-g0-${uid}`;
  const g1     = `fb-g1-${uid}`;
  const mk     = `fb-mk-${uid}`;
  const clipId = `fb-clip-${uid}`;

  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const enter = () => { setHovered(true);  videoRef.current?.play(); };
  const leave = () => {
    setHovered(false);
    const v = videoRef.current;
    if (v) { v.pause(); v.currentTime = 0; }
  };

  /* ── Mobile ── */
  if (isMobile) {
    return (
      <GradientBorderCard
        borderGradient="linear-gradient(120deg, rgba(255,166,0,0.65) 0%, rgba(27,97,219,0.6) 50%, rgba(255,166,0,0.3) 100%)"
        glowStyle={{ background: "radial-gradient(ellipse 65% 55% at 5% 50%, rgba(255,166,0,0.12) 0%, transparent 65%)" }}
      >
        <div style={{ padding: "24px 20px 20px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12, position: "relative", zIndex: 1 }}>
          <EduHexaBadge />
          <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: 18, lineHeight: "1.4", color: "white", margin: 0, width: "100%" }}>The Unbiased Classroom Expert</p>
          <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 300, fontSize: 13, lineHeight: "1.7", color: "#888", margin: 0, width: "100%" }}>
            Schools get one consultant, five brands compared, zero bias. The right technology matched to the right institution.
          </p>
          <div style={{ marginTop: 4 }}><CtaGroup label="Explore EduHexa ↗" compact href="https://eduhexa.in/" /></div>
        </div>
      </GradientBorderCard>
    );
  }

  /* ── Desktop ── */
  return (
    <div style={{ position: "relative", width: "100%" }} onMouseEnter={enter} onMouseLeave={leave}>
      <div style={{ position: "relative", width: "100%", aspectRatio: "1064 / 274" }}>

        {/* ── Main SVG: shape + video clipped inside ── */}
        <svg
          style={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%", overflow: "hidden" }}
          fill="none" preserveAspectRatio="none" viewBox="0 0 1064 274"
        >
          <defs>
            <clipPath id={clipId}>
              <path d={svgPaths.p2f925180} />
            </clipPath>
            <linearGradient id={g0} gradientUnits="userSpaceOnUse" x1="53.412" x2="522.813" y1="0" y2="729.753">
              <stop stopColor="#0A0A0A" /><stop offset="1" />
            </linearGradient>
            <linearGradient id={g1} gradientUnits="userSpaceOnUse" x1="868.5" x2="780.5" y1="221.5" y2="152">
              <stop stopColor="#1B61DB" /><stop offset="1" stopColor="#0A0A0A" />
            </linearGradient>
            <mask id={mk} fill="white"><path d={svgPaths.p2f925180} /></mask>
          </defs>

          {/* Card background fills */}
          <path d={svgPaths.p2f925180} fill={`url(#${g0})`} fillOpacity="0.8" />
          <path d={svgPaths.p23610880} fill={`url(#${g1})`} fillOpacity="0.2" mask={`url(#${mk})`} />

          {/* Video — clipped to exact card shape */}
          <foreignObject
            x="0" y="0" width="1064" height="274"
            clipPath={`url(#${clipId})`}
            style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.4s ease", pointerEvents: "none" }}
          >
            <video
              ref={videoRef}
              src={videoSrc}
              muted loop playsInline preload="metadata"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </foreignObject>
        </svg>

        {/* Golden radial glow — fades on hover */}
        <div style={{
          position: "absolute", left: 0, top: 0, width: "100%", height: "100%", pointerEvents: "none",
          background: "radial-gradient(ellipse 55% 80% at 65% 50%, rgba(255,166,0,0.20) 0%, transparent 65%)",
          opacity: hovered ? 0 : 1, transition: "opacity 0.3s ease", zIndex: 1,
        }} />

        {/* Top-right decorative vector — fades on hover */}
        <div style={{ position: "absolute", left: "49.7%", top: 0, width: "50.3%", height: "47%", pointerEvents: "none", opacity: hovered ? 0 : 1, transition: "opacity 0.3s ease", zIndex: 1 }}>
          <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 535.5 124.766">
            <path d={svgPaths.pbd6a180} fill="#252525" />
          </svg>
        </div>

        {/* Badge — fades on hover */}
        <div style={{ position: "absolute", left: "4.98%", top: "22.3%", opacity: hovered ? 0 : 1, transition: "opacity 0.3s ease", zIndex: 3 }}>
          <EduHexaBadge />
        </div>

        {/* Title + description — fades on hover */}
        <div style={{
          position: "absolute", left: "24.1%", top: "22.3%", width: "44.9%",
          display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "60%", gap: 8,
          opacity: hovered ? 0 : 1, transition: "opacity 0.3s ease", zIndex: 3,
        }}>
          <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: 24, lineHeight: "34px", color: "white", margin: 0 }}>The Unbiased Classroom Expert</p>
          <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 300, fontSize: 15, lineHeight: "26px", color: "#727272", margin: 0, marginBottom: 28 }}>
            Schools get one consultant, five brands compared, zero bias. The right technology matched to the right institution.
          </p>
        </div>

        {/* CTA — always visible */}
        <div style={{ position: "absolute", left: "80.2%", bottom: 0, paddingTop: 8, paddingRight: 8, zIndex: 4 }}>
          <CtaGroup label="Explore EduHexa ↗" href="https://eduhexa.in/" />
        </div>

      </div>
    </div>
  );
}

/* ─── SOLUTIONS SECTION ──────────────────────────────────────────────────── */
export function SolutionsSection() {
  const { content } = useCmsSectionContent();
  const videoFmcg   = String(content.videoFmcg   ?? DEFAULT_VIDEO_FMCG);
  const videoNative = String(content.videoNative ?? DEFAULT_VIDEO_NATIVE);
  const videoEdu    = String(content.videoEdu    ?? DEFAULT_VIDEO_CONSUMER);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section style={{ width: "100%", background: "#0a0a0a", display: "flex", flexDirection: "column", alignItems: "center", padding: 0, overflow: "hidden" }}>
      <div style={{ width: "100%", maxWidth: 1200, display: "flex", flexDirection: "column", alignItems: "center", gap: 0, padding: "0 24px", boxSizing: "border-box" }}>

        {/* ── Header ── */}
        <motion.div
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, width: "100%", marginBottom: isMobile ? 36 : 68 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <SolutionsBadge />
          <TextRevealParagraph />
          <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 300, fontSize: isMobile ? 14 : 16, lineHeight: "26px", color: "#727272", margin: 0, textAlign: "center", maxWidth: 600 }}>
            Big vision means knowing exactly where to focus. Here is where Hexanovate actually lives right now.
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: isMobile ? 16 : 24 }}>
          {/* Top row */}
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 16 : 24, alignItems: isMobile ? "stretch" : "flex-end", width: "100%" }}>
            <motion.div style={{ flex: "1 0 0", minWidth: 0 }} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0 }}>
              <FmcgLeftCard isMobile={isMobile} videoSrc={videoFmcg} />
            </motion.div>
            <motion.div style={{ flex: "1 0 0", minWidth: 0 }} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: isMobile ? 0 : 0.15 }}>
              <B2bRightCard isMobile={isMobile} videoSrc={videoNative} />
            </motion.div>
          </div>

          {/* Bottom wide */}
          <motion.div style={{ width: "100%" }} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: isMobile ? 0 : 0.3 }}>
            <FmcgBottomCard isMobile={isMobile} videoSrc={videoEdu} />
          </motion.div>
        </div>

      </div>
    </section>
  );
}