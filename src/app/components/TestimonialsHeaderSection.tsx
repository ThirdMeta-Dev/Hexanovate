import { useState, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import svgPaths from "../../imports/svg-arxttmd309";

/* ─── ARROW ICON (↗) ─────────────────────────────────────────────────────── */
/*
 * Exactly mirrors Figma Frame5/Frame6 inner structure:
 *   overflow-clip, size-16
 *   └── absolute inset-[5%]
 *       └── absolute inset-[-9.8%_-9.8%_-8.88%_-8.88%]
 *           └── SVG 17.09×17.09, pe61a680 path
 * Parent applies -scale-y-100 rotate-90 → points ↗
 */
function ArrowIcon() {
  return (
    <div
      style={{ overflow: "clip", position: "relative", width: 16, height: 16 }}
    >
      <div style={{ position: "absolute", inset: "5%" }}>
        <div
          style={{
            position: "absolute",
            top: "-9.8%",
            left: "-9.8%",
            right: "-8.88%",
            bottom: "-8.88%",
          }}
        >
          <svg
            style={{ display: "block", width: "100%", height: "100%" }}
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 17.09 17.0901"
          >
            <path d={svgPaths.pe61a680} fill="white" stroke="white" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* The rotate+flip wrapper Figma applies inside each arrow circle */
function ArrowTransformed() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        width: 16,
        height: 16,
      }}
    >
      <div style={{ transform: "rotate(90deg) scaleY(-1)", flexShrink: 0 }}>
        <ArrowIcon />
      </div>
    </div>
  );
}

/* ─── TESTIMONIALS BADGE ──────────────────────────────────────────────────── */
/*
 * Figma Frame (inside Frame11):
 *   bg-#111, px-16 py-6, rounded-40, border 1px #414141
 *   Poppins Regular 13px #ffa600 "Testimonials"
 */
function TestimonialsBadge() {
  return (
    <div
      style={{
        background: "#111",
        borderRadius: 40,
        padding: "6px 16px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          border: "1px solid #414141",
          borderRadius: 40,
          pointerEvents: "none",
        }}
      />
      <p
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          fontSize: 13,
          color: "#ffa600",
          lineHeight: "normal",
          whiteSpace: "nowrap",
          position: "relative",
          marginTop: 0,
          marginBottom: 0,
        }}
      >
        Testimonials
      </p>
    </div>
  );
}

/* ─── CTA BUTTON (label pill + arrow circle, no gap) ─────────────────────── */
/*
 * Frame9 (B2B): Frame7 (label, bg-#1b61db) + Frame5 (circle, bg-#1b61db)
 * Frame10 (FMCG): Frame8 (label, bg-#ffa600) + Frame6 (circle, bg-#ffa600)
 * Both are standard: px-24 py-12 rounded-30, Poppins Medium 16px white label
 *                    + size-48 p-12 rounded-30 circle with arrow
 */
interface CtaBtnProps {
  label: string;
  color: string; // "#1b61db" | "#ffa600"
  hoverColor: string;
}

function CtaBtn({ label, color, hoverColor }: CtaBtnProps) {
  const [hovered, setHovered] = useState(false);
  const bg = hovered ? hoverColor : color;

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        flexShrink: 0,
        boxShadow: hovered
          ? `0 4px 20px ${color}55`
          : "0 2px 8px rgba(0,0,0,0.2)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Label pill */}
      <div
        style={{
          background: bg,
          borderRadius: 30,
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          transition: "background 0.25s ease",
        }}
      >
        <p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            fontSize: 16,
            color: "white",
            lineHeight: "normal",
            whiteSpace: "nowrap",
            marginTop: 0,
            marginBottom: 0,
          }}
        >
          {label}
        </p>
      </div>

      {/* Arrow circle */}
      <div
        style={{
          background: bg,
          borderRadius: 30,
          width: 48,
          height: 48,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 12,
          boxSizing: "border-box",
          transition: "background 0.25s ease",
        }}
      >
        <ArrowTransformed />
      </div>
    </motion.div>
  );
}

/* ─── HORIZONTAL DIVIDER ─────────────────────────────────────────────────── */
/*
 * Figma: flex-[1_0_0] h-0 min-h-px min-w-px, inner SVG path "M0 0.5H223"
 * stroke #414141
 */
function HorizontalDivider() {
  return (
    <div
      style={{
        flex: "1 0 0",
        height: 0,
        minHeight: 1,
        minWidth: 0,
        position: "relative",
      }}
    >
      <div
        style={{ position: "absolute", top: "-0.5px", bottom: "-0.5px", left: 0, right: 0 }}
      >
        <svg
          style={{ display: "block", width: "100%", height: "100%" }}
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 223 1"
        >
          <path d="M0 0.5H223" stroke="#414141" />
        </svg>
      </div>
    </div>
  );
}

/* ─── REVEAL-WORD (scroll-linked opacity illumination) ───────────────────── */
interface RevealWordProps {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}
function RevealWord({ children, progress, range }: RevealWordProps) {
  const opacity = useTransform(progress, range, [0.08, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

/* ─── MAIN SECTION ───────────────────────────────────────────────────────── */
/*
 * Figma Frame16 (root): flex-col, items-end, justify-center, size-full
 * Frame14: flex-col, gap-52, items-start, w-full
 *   Frame2 → Frame4 (flex-col gap-16 w-full):
 *     Frame13 (pl-264): badge container (w-298, items-center)
 *     Frame3 (relative, flex-col, gap-8, items-center, text-center, capitalize, leading-1.12):
 *       Frame12 (flex-col, items-center, semibold 80px):
 *         "Growth Systems"   w-647, white
 *         "Predictable Outcomes"  w-851, #1b61db
 *       absolute "We Build"  left-84.47 top-35 40px white regular
 *       absolute "for"       left-872.47 top-35 40px white regular
 *   Frame15 (flex, gap-24, items-center, justify-end, w-659):
 *     Frame1 (gap-16): B2B button + FMCG button
 *     Divider (flex-1 line)
 *
 * Responsive:
 *   Tablet (≤1024px): scale absolute positions proportionally
 *   Mobile (≤767px):  switch to flowing single-column text layout
 */
export function TestimonialsHeaderSection({ variant }: { variant?: "contact" }) {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: titleRef,
    // Start tracking the moment the section top enters at 90% from viewport top;
    // complete the full reveal by the time the section top reaches 20% — a tight
    // window so all words illuminate quickly as the section scrolls into view.
    offset: ["start 0.9", "start 0.2"],
  });

  const N = 11;
  const range = (i: number): [number, number] => [
    Math.min(i * 0.08, 0.88),
    Math.min(i * 0.08 + 0.12, 1),
  ];

  return (
    <section
      className="ths-section"
      style={{
        width: "100%",
        position: "relative",
        minHeight: 680,
        padding: "100px 0",
        overflow: "hidden",
        borderRadius: 30,
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* ── Video background ── */}
      <video
        src="https://sienna-pelican-786032.hostingersite.com/wp-content/uploads/2026/03/CTA-Background-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* ── Dark tint overlay so all text & buttons remain legible ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.68)",
          zIndex: 1,
        }}
      />

      {/* ── Content — centered title + CTA ── */}
      <div style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <div
          className="ths-container"
          style={{
            maxWidth: 1148,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 48,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {variant === "contact" ? (
            /* ── Contact page variant ── */
            <>
              {/* Tag */}
              <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid #414141", borderRadius: 40, padding: "6px 20px" }}>
                <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#ffa600" }}>Let's Go</span>
              </div>

              {/* Title */}
              <div ref={titleRef}>
                <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "clamp(26px, 4vw, 50px)", lineHeight: 1.28, textAlign: "center", margin: 0, maxWidth: 820, textTransform: "capitalize" }}>
                  <RevealWord progress={scrollYProgress} range={range(0)}><span style={{ fontWeight: 700, color: "white" }}>You Have Our Number.</span></RevealWord>
                  {" "}
                  <RevealWord progress={scrollYProgress} range={range(1)}><span style={{ fontWeight: 700, color: "white" }}>You Have Our Email.</span></RevealWord>
                  {" "}
                  <RevealWord progress={scrollYProgress} range={range(2)}><span style={{ fontWeight: 300, color: "#8e8e8e" }}>Now You Have No Excuse.</span></RevealWord>
                </p>
              </div>

              {/* Two buttons */}
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
                <CtaBtn label="B2B ThirdMeta" color="#1b61db" hoverColor="#2470f0" />
                <CtaBtn label="FMCG NativeUnit" color="#ffa600" hoverColor="#e69400" />
              </div>
            </>
          ) : (
            /* ── Default variant (About Us etc.) ── */
            <>
              {/* Title */}
              <div ref={titleRef}>
                <p
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "clamp(28px, 4vw, 56px)",
                    lineHeight: 1.28,
                    textAlign: "center",
                    margin: 0,
                    maxWidth: 780,
                    textTransform: "capitalize",
                  }}
                >
                  <RevealWord progress={scrollYProgress} range={range(0)}><span style={{ fontWeight: 700, color: "white" }}>Thirty</span></RevealWord>
                  {" "}
                  <RevealWord progress={scrollYProgress} range={range(1)}><span style={{ fontWeight: 700, color: "white" }}>Minutes.</span></RevealWord>
                  {" "}
                  <RevealWord progress={scrollYProgress} range={range(2)}><span style={{ fontWeight: 300, color: "#8e8e8e" }}>No</span></RevealWord>
                  {" "}
                  <RevealWord progress={scrollYProgress} range={range(3)}><span style={{ fontWeight: 300, color: "#8e8e8e" }}>Pitch.</span></RevealWord>
                  {" "}
                  <RevealWord progress={scrollYProgress} range={range(4)}><span style={{ fontWeight: 300, color: "#8e8e8e" }}>Just</span></RevealWord>
                  {" "}
                  <RevealWord progress={scrollYProgress} range={range(5)}><span style={{ fontWeight: 700, color: "white" }}>An</span></RevealWord>
                  {" "}
                  <RevealWord progress={scrollYProgress} range={range(6)}><span style={{ fontWeight: 700, color: "white" }}>Honest</span></RevealWord>
                  {" "}
                  <RevealWord progress={scrollYProgress} range={range(7)}><span style={{ fontWeight: 700, color: "white" }}>Conversation</span></RevealWord>
                  {" "}
                  <RevealWord progress={scrollYProgress} range={range(8)}><span style={{ fontWeight: 300, color: "#8e8e8e" }}>About</span></RevealWord>
                  {" "}
                  <RevealWord progress={scrollYProgress} range={range(9)}><span style={{ fontWeight: 300, color: "#8e8e8e" }}>Your</span></RevealWord>
                  {" "}
                  <RevealWord progress={scrollYProgress} range={range(10)}><span style={{ fontWeight: 700, color: "white" }}>Growth.</span></RevealWord>
                </p>
              </div>

              {/* CTA */}
              <CtaBtn label="Book A Call" color="#1b61db" hoverColor="#2470f0" />
            </>
          )}
        </div>
      </div>

      {/* ── Responsive overrides ── */}
      <style>{`
        @media (max-width: 1024px) {
          .ths-section {
            min-height: unset !important;
            border-radius: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}