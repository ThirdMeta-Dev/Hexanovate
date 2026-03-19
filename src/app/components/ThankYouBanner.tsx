/* ─────────────────────────────────────────────────────────────────────────────
   ThankYouBanner — pixel-faithful to Figma "Frame1618876272"
   • Outer card: rgba(27,97,219,0.15) glass, h-[426px] on desktop, overflow visible
   • Right card: rgba(0,0,0,0.6) glass, fixed w-406px, overflows outer on desktop
   • Buttons: identical to HexanovateHero CTAButton (label pill + arrow circle)
   • Responsive: stacks to column on ≤1024px
   ───────────────────────────────────────────────────────────────────────────── */
import { useState } from "react";
import { motion } from "motion/react";
import svgPaths from "../../imports/svg-xvssryphbj";

/* ── Arrow diagonal SVG ─────────────────────────────────────────────────────── */
function ArrowDiagonal({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 17.09 17.0901" fill="none">
      <path d={svgPaths.pe61a680} fill="white" stroke="white" strokeWidth="0.3" />
    </svg>
  );
}

/* ── CTA Button — label pill + arrow circle, identical to home page ─────────── */
function CTAButton({ label, variant }: { label: string; variant: "primary" | "secondary" }) {
  const [hovered, setHovered] = useState(false);
  const isPrimary = variant === "primary";

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ y: hovered ? -2 : 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="flex items-center cursor-pointer"
      style={{
        boxShadow: hovered
          ? isPrimary
            ? "0 8px 24px rgba(27,97,219,0.40)"
            : "0 6px 20px rgba(27,97,219,0.25)"
          : isPrimary
          ? "0px 4px 4px rgba(0,0,0,0.30)"
          : "0px 4px 4px rgba(0,0,0,0.29)",
        transition: "box-shadow 0.18s ease",
        borderRadius: "30px",
      }}
    >
      {/* Label pill */}
      <div
        style={{
          backgroundColor: isPrimary ? "#1b61db" : "#0e1f3d",
          borderRadius: "30px",
          padding: "12px 24px",
          border: isPrimary ? "none" : "1px solid #1b61db",
          position: "relative",
        }}
      >
        <span
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: 16,
            fontWeight: 500,
            color: "white",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      </div>

      {/* Arrow circle */}
      <div
        className="flex items-center justify-center"
        style={{
          backgroundColor: isPrimary ? "#1b61db" : "#0e1f3d",
          borderRadius: "30px",
          width: 48,
          height: 48,
          border: isPrimary ? "none" : "1px solid #1b61db",
          flexShrink: 0,
          marginLeft: -1,
        }}
      >
        <motion.div
          animate={{ x: hovered ? 1 : 0, y: hovered ? -1 : 0 }}
          transition={{ duration: 0.18 }}
          style={{ display: "flex", transform: "rotate(90deg) scaleY(-1)" }}
        >
          <ArrowDiagonal size={16} />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ── Numbered step ──────────────────────────────────────────────────────────── */
function Step({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 29,
            height: 30,
            borderRadius: 49,
            border: "1px solid #1b61db",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 500,
              fontSize: 15,
              color: "#ffa600",
              lineHeight: "24px",
            }}
          >
            {num}
          </span>
        </div>
        <span
          style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 500,
            fontSize: 15,
            color: "white",
            lineHeight: "24px",
          }}
        >
          {title}
        </span>
      </div>
      <p
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 300,
          fontSize: 15,
          color: "#747474",
          lineHeight: "22px",
          margin: 0,
          paddingLeft: 45,
        }}
      >
        {desc}
      </p>
    </div>
  );
}

/* ── Right card: "What are the next steps?" ────────────────────────────────── */
function NextStepsCard() {
  return (
    <div
      style={{
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        background: "rgba(0,0,0,0.6)",
        borderRadius: 20,
        border: "1px solid #0d1c35",
        paddingTop: 40,
        paddingBottom: 44,
        paddingLeft: 44,
        paddingRight: 44,
        display: "flex",
        flexDirection: "column",
        gap: 36,
        position: "relative",
        width: 406,
        flexShrink: 0,
        boxSizing: "border-box",
      }}
    >
      {/* Decorative squiggle arrow — positioned like Figma: left:238 top:43 */}
      <div
        style={{
          position: "absolute",
          left: 238,
          top: 43,
          width: 36.63,
          height: 42.76,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "rotate(-30deg)",
          pointerEvents: "none",
        }}
      >
        <svg
          style={{ display: "block", width: "100%", height: "100%" }}
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 20.6904 37.4252"
        >
          <path
            clipRule="evenodd"
            d={svgPaths.pb78800}
            fill="url(#paint0_linear_ty_banner)"
            fillRule="evenodd"
          />
          <defs>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint0_linear_ty_banner"
              x1="-0.6591"
              x2="14.2723"
              y1="0.612256"
              y2="35.7567"
            >
              <stop stopColor="#050911" />
              <stop offset="1" stopColor="#1B61DB" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Amber label */}
      <p
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          fontSize: 15,
          color: "#ffa600",
          margin: 0,
          lineHeight: "normal",
          whiteSpace: "nowrap",
        }}
      >
        What are the next steps?
      </p>

      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: 32, width: "100%" }}>
        <Step
          num="1"
          title="Review & Strategy Call"
          desc="Our team reviews your submission and prepares a tailored strategy brief before we connect."
        />
        <Step
          num="2"
          title="Personalised Growth Audit"
          desc="We'll map what's leaking — conversion, retention, and growth blockers specific to your brand."
        />
        <Step
          num="3"
          title="Your Roadmap, Delivered"
          desc="You receive a clear, actionable roadmap for scaling — no fluff, just priorities that move revenue."
        />
      </div>
    </div>
  );
}

/* ── Main export ────────────────────────────────────────────────────────────── */
export function ThankYouBanner() {
  return (
    <>
      <style>{`
        /* Responsive overrides for ≤1024px */
        @media (max-width: 1024px) {
          .ty-outer-card {
            height: auto !important;
            padding: 32px 24px !important;
          }
          .ty-inner-row {
            flex-direction: column !important;
            gap: 36px !important;
          }
          .ty-right-card {
            width: 100% !important;
            max-width: 100% !important;
          }
          .ty-headline {
            font-size: clamp(26px, 5vw, 40px) !important;
          }
        }
        @media (max-width: 640px) {
          .ty-outer-card {
            padding: 28px 20px !important;
            border-radius: 20px !important;
          }
          .ty-right-card {
            padding: 28px 24px !important;
          }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "100%",
          maxWidth: 1148,
          margin: "0 auto",
          padding: "80px 24px 0",
          boxSizing: "border-box",
        }}
      >
        {/* ── Outer card — single merged background gradient ── */}
        <div
          className="ty-outer-card"
          style={{
            background: [
              "radial-gradient(ellipse 55% 70% at 0% 0%, rgba(27,97,219,0.45) 0%, transparent 70%)",
              "radial-gradient(ellipse 40% 50% at 100% 100%, rgba(255,166,0,0.18) 0%, transparent 65%)",
              "#0d1c35",
            ].join(", "),
            borderRadius: 30,
            border: "1px solid #0d1729",
            height: 426,
            padding: 48,
            position: "relative",
            overflow: "visible",
            boxSizing: "border-box",
          }}
        >
          {/* ── Inner row: left + right ── */}
          <div
            className="ty-inner-row"
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 68,
              alignItems: "flex-start",
              position: "relative",
              zIndex: 1,
              height: "100%",
            }}
          >
            {/* ── LEFT COLUMN ── */}
            <div
              style={{
                flex: "1 0 0",
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                gap: 60,
                height: "100%",
              }}
            >
              {/* Headline */}
              <div>
                <h1
                  className="ty-headline"
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: 700,
                    fontSize: 48,
                    lineHeight: 1.22,
                    color: "white",
                    margin: 0,
                    textTransform: "capitalize",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  <span style={{ display: "block" }}>We Unlock Scale</span>
                  <span style={{ display: "block" }}>
                    We've Got Your Ambition.{" "}
                    <span
                      style={{
                        fontWeight: 400,
                        color: "#8e8e8e",
                        fontFamily: "Manrope, sans-serif",
                      }}
                    >
                      Now It's Ours
                    </span>
                  </span>
                </h1>
              </div>

              {/* Buttons + tagline */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {/* CTA buttons — same style as home page */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
                  <CTAButton label="B2B ThirdMeta" variant="primary" />
                  <CTAButton label="FMCG/D2C" variant="secondary" />
                </div>

                {/* Italic tagline */}
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontStyle: "italic",
                    fontSize: 16,
                    lineHeight: "25px",
                    margin: 0,
                  }}
                >
                  <span style={{ color: "white" }}>Same-week openings are limited.</span>
                  <span style={{ color: "#727272" }}> Claim a slot today.</span>
                </p>
              </div>
            </div>

            {/* ── RIGHT CARD — overflows outer card intentionally ── */}
            <div className="ty-right-card">
              <NextStepsCard />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}