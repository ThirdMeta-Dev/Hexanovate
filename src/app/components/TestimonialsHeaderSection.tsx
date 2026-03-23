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
export function TestimonialsHeaderSection() {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: titleRef,
    // Start tracking the moment the section top enters at 90% from viewport top;
    // complete the full reveal by the time the section top reaches 20% — a tight
    // window so all words illuminate quickly as the section scrolls into view.
    offset: ["start 0.9", "start 0.2"],
  });

  // 7 words total; stagger ranges compressed so all reveal within the first 70%
  // of progress (words finish illuminating before user is halfway through the section).
  const N = 7;
  // Each word's range spans 0.12 of progress, staggered by 0.09 so they overlap
  // slightly for a smooth cascade rather than one-at-a-time flicker.
  const range = (i: number): [number, number] => [
    Math.min(i * 0.09, 0.88),
    Math.min(i * 0.09 + 0.12, 1),
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

      {/* ── All original content — sits above video + tint ── */}
      <div style={{ position: "relative", zIndex: 2, width: "100%" }}>

      {/* ── Desktop container — max 1148px, centered, no horizontal padding ── */}
      <div
        className="ths-container"
        style={{
          maxWidth: 1148,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Frame14: gap-52 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 52,
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          {/* ── Frame2 → Frame4: badge + title ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              width: "100%",
            }}
          >
            {/*
             * Frame13: pl-264 (badge indented 264px from left)
             * Frame11: w-298, items-center (centers badge within 298px box)
             */}
            <div
              className="ths-badge-row"
              style={{ paddingLeft: 264 }}
            >
              <div
                style={{
                  width: 298,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TestimonialsBadge />
              </div>
            </div>

            {/*
             * Frame3: Title layout
             *   position: relative for the two absolutely placed words
             *   flex-col, gap-8, items-center, text-center
             *   capitalize, leading-1.12
             *
             * Frame12 (centered, flex-col):
             *   "Growth Systems"     80px SemiBold white,  w-647
             *   "Predictable Outcomes"  80px SemiBold blue, w-851
             *
             * Absolute overlays (sit on top of line 1 at top: 35px):
             *   "We Build"  center-x = 84.47px   40px Regular white
             *   "for"       center-x = 872.47px  40px Regular white
             */}
            <div
              className="ths-title-desktop"
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                alignItems: "center",
                textAlign: "center",
                width: "100%",
                textTransform: "capitalize",
                lineHeight: 1.12,
              }}
            >
              {/*
               * Frame12 — "We Build" + "Growth Systems" + "for" on one inline row,
               * then "Predictable Outcomes" on the second row.
               * Font weights / sizes / colors preserved exactly.
               */}
              <div
                ref={titleRef}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  alignContent: "stretch",
                  width: "100%",
                  position: "relative",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 600,
                  fontSize: 80,
                  lineHeight: 1.12,
                  textAlign: "center",
                  textTransform: "capitalize",
                }}
              >
                {/* Row 1: "We Build" (40px regular) + "Growth Systems" (80px semibold) + "for" (40px regular) */}
                <div
                  className="ths-row1"
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "center",
                    gap: 24,
                    width: "100%",
                  }}
                >
                  {/* "We Build" — 40px regular white */}
                  <p
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontWeight: 400,
                      fontSize: 40,
                      color: "white",
                      whiteSpace: "nowrap",
                      lineHeight: 1.12,
                      marginTop: 0,
                      marginBottom: 0,
                      textTransform: "capitalize",
                    }}
                  >
                    <RevealWord progress={scrollYProgress} range={range(0)}>We</RevealWord>
                    {" "}
                    <RevealWord progress={scrollYProgress} range={range(1)}>Build</RevealWord>
                  </p>

                  {/* "Growth Systems" — 80px semibold white */}
                  <p
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontWeight: 600,
                      fontSize: 80,
                      color: "white",
                      whiteSpace: "nowrap",
                      lineHeight: 1.12,
                      marginTop: 0,
                      marginBottom: 0,
                    }}
                  >
                    <RevealWord progress={scrollYProgress} range={range(2)}>Growth</RevealWord>
                    {" "}
                    <RevealWord progress={scrollYProgress} range={range(3)}>Systems</RevealWord>
                  </p>

                  {/* "for" — 40px regular white */}
                  <p
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontWeight: 400,
                      fontSize: 40,
                      color: "white",
                      whiteSpace: "nowrap",
                      lineHeight: 1.12,
                      marginTop: 0,
                      marginBottom: 0,
                      textTransform: "capitalize",
                    }}
                  >
                    <RevealWord progress={scrollYProgress} range={range(4)}>for</RevealWord>
                  </p>
                </div>

                {/* Row 2: "Predictable Outcomes" — #1b61db, 80px SemiBold, w-851 */}
                <p
                  className="ths-predictable"
                  style={{
                    color: "#1b61db",
                    width: 851,
                    flexShrink: 0,
                    position: "relative",
                    marginTop: 0,
                    marginBottom: 0,
                  }}
                >
                  <RevealWord progress={scrollYProgress} range={range(5)}>Predictable</RevealWord>
                  {" "}
                  <RevealWord progress={scrollYProgress} range={range(6)}>Outcomes</RevealWord>
                </p>
              </div>
            </div>

            {/* Mobile title fallback — shown only on small screens */}
            <div
              className="ths-title-mobile"
              style={{
                display: "none",
                flexDirection: "column",
                gap: 4,
                textAlign: "center",
                width: "100%",
                textTransform: "capitalize",
              }}
            >
              <p
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 400,
                  fontSize: 32,
                  color: "white",
                  lineHeight: 1.12,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                We Build
              </p>
              <p
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 600,
                  fontSize: 44,
                  color: "white",
                  lineHeight: 1.12,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                Growth Systems
              </p>
              <p
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 400,
                  fontSize: 32,
                  color: "white",
                  lineHeight: 1.12,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                for
              </p>
              <p
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 600,
                  fontSize: 44,
                  color: "#1b61db",
                  lineHeight: 1.12,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                Predictable Outcomes
              </p>
            </div>
          </div>

          {/*
           * ── Frame15: CTA buttons + horizontal divider ──
           * Left-aligned under the "Predictable" word (starts at ~148px from
           * container left, matching the left edge of the 851px centered line).
           */}
          <div
            className="ths-bottom-row"
            style={{
              display: "flex",
              gap: 24,
              alignItems: "center",
              marginLeft: 148,
              width: "calc(100% - 148px)",
              flexShrink: 0,
            }}
          >
            {/* Frame1: CTA pair, gap-16, items-start */}
            <div
              className="ths-cta-group"
              style={{
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
                flexShrink: 0,
              }}
            >
              {/* B2B ThirdMeta — blue */}
              <CtaBtn
                label="B2B ThirdMeta"
                color="#1b61db"
                hoverColor="#2470f0"
              />
              {/* FMCG/D2C — amber */}
              <CtaBtn
                label="FMCG/D2C"
                color="#ffa600"
                hoverColor="#ffb833"
              />
            </div>

            {/* Divider — grows to fill remaining space */}
            <HorizontalDivider />
          </div>
        </div>
      </div>

      </div>{/* end content wrapper */}

      {/* ── Responsive overrides ── */}
      <style>{`
        /* Reset height / radius on tablet + mobile — desktop-only effect */
        @media (max-width: 1024px) {
          .ths-section {
            min-height: unset !important;
            border-radius: 0 !important;
          }
        }
        /* Tablet: 768–1147px — add horizontal padding, scale positions */
        @media (max-width: 1147px) {
          .ths-container {
            padding: 0 24px !important;
          }
          .ths-badge-row {
            padding-left: 200px !important;
          }
          .ths-row1 p:nth-child(2) {
            font-size: 64px !important;
          }
          .ths-row1 p:first-child,
          .ths-row1 p:last-child {
            font-size: 32px !important;
          }
          .ths-predictable {
            font-size: 64px !important;
            width: 100% !important;
            max-width: 680px !important;
          }
          .ths-bottom-row {
            margin-left: 60px !important;
            width: calc(100% - 60px) !important;
          }
        }
        /* Small tablet: 768–900px */
        @media (max-width: 900px) {
          .ths-badge-row {
            padding-left: 140px !important;
          }
          .ths-row1 p:nth-child(2) {
            font-size: 52px !important;
          }
          .ths-row1 p:first-child,
          .ths-row1 p:last-child {
            font-size: 26px !important;
          }
          .ths-predictable {
            font-size: 52px !important;
            max-width: 560px !important;
          }
          .ths-bottom-row {
            margin-left: 0 !important;
            width: 100% !important;
          }
        }
        /* Mobile: <768px — switch to stacked layout */
        @media (max-width: 767px) {
          .ths-container {
            padding: 0 20px !important;
          }
          .ths-badge-row {
            padding-left: 0 !important;
          }
          .ths-badge-row > div {
            width: auto !important;
          }
          .ths-title-desktop {
            display: none !important;
          }
          .ths-title-mobile {
            display: flex !important;
          }
          .ths-bottom-row {
            width: 100% !important;
            margin-left: 0 !important;
            flex-wrap: wrap !important;
            gap: 16px !important;
          }
          .ths-cta-group {
            flex-direction: column !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}