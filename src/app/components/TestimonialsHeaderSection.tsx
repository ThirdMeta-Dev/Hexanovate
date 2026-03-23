import { useState, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import svgPaths from "../../imports/svg-arxttmd309";

/* ─── ARROW ICON (↗) ─────────────────────────────────────────────────────── */
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
          margin: 0,
          whiteSpace: "nowrap",
        }}
      >
        Testimonials
      </p>
    </div>
  );
}

/* ─── CTA BUTTON ─────────────────────────────────────────────────────────── */
interface CtaBtnProps {
  label: string;
  color: string;
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
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
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
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </p>
      </div>
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
          transition: "background 0.25s ease",
        }}
      >
        <ArrowTransformed />
      </div>
    </motion.div>
  );
}

/* ─── HORIZONTAL DIVIDER ─────────────────────────────────────────────────── */
function HorizontalDivider() {
  return (
    <div style={{ flex: "1 0 0", height: 1, background: "#414141" }} />
  );
}

/* ─── REVEAL WORD ────────────────────────────────────────────────────────── */
interface RevealWordProps {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}
function RevealWord({ children, progress, range }: RevealWordProps) {
  const opacity = useTransform(progress, range, [0.08, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */
export function TestimonialsHeaderSection() {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ["start 0.9", "start 0.2"],
  });

  const range = (i: number): [number, number] => [
    Math.min(i * 0.08, 0.9),
    Math.min(i * 0.08 + 0.1, 1),
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
      <video
        src="https://sienna-pelican-786032.hostingersite.com/wp-content/uploads/2026/03/CTA-Background-video.mp4"
        autoPlay loop muted playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.68)",
          zIndex: 1,
        }}
      />

      <div style={{ position: "relative", zIndex: 2, width: "100%" }}>
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 52,
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            {/* Badge */}
            <div className="ths-badge-row" style={{ paddingLeft: 264 }}>
              <div style={{ width: 298, display: "flex", alignItems: "center" }}>
                <TestimonialsBadge />
              </div>
            </div>

            {/* Desktop Title */}
            <div
              className="ths-title-desktop"
              style={{
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
              <div
                ref={titleRef}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
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
                  <p style={{ fontWeight: 400, fontSize: 40, color: "white", margin: 0 }}>
                    <RevealWord progress={scrollYProgress} range={range(0)}>We</RevealWord>{" "}
                    <RevealWord progress={scrollYProgress} range={range(1)}>Told</RevealWord>{" "}
                    <RevealWord progress={scrollYProgress} range={range(2)}>You</RevealWord>
                  </p>
                  <p style={{ fontWeight: 600, fontSize: 80, color: "white", margin: 0 }}>
                    <RevealWord progress={scrollYProgress} range={range(3)}>We</RevealWord>{" "}
                    <RevealWord progress={scrollYProgress} range={range(4)}>Were</RevealWord>{" "}
                    <RevealWord progress={scrollYProgress} range={range(5)}>Good.</RevealWord>
                  </p>
                </div>
                <p
                  className="ths-predictable"
                  style={{
                    fontWeight: 600,
                    fontSize: 80,
                    color: "#1b61db",
                    margin: 0,
                  }}
                >
                  <RevealWord progress={scrollYProgress} range={range(6)}>Turns</RevealWord>{" "}
                  <RevealWord progress={scrollYProgress} range={range(7)}>Out</RevealWord>{" "}
                  <RevealWord progress={scrollYProgress} range={range(8)}>They</RevealWord>{" "}
                  <RevealWord progress={scrollYProgress} range={range(9)}>Agree.</RevealWord>
                </p>
              </div>
            </div>

            {/* Mobile Title */}
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
              <p style={{ fontWeight: 400, fontSize: 32, color: "white", margin: 0 }}>We Told You</p>
              <p style={{ fontWeight: 600, fontSize: 44, color: "white", margin: 0 }}>We Were Good.</p>
              <p style={{ fontWeight: 400, fontSize: 32, color: "white", margin: 0 }}>Turns Out</p>
              <p style={{ fontWeight: 600, fontSize: 44, color: "#1b61db", margin: 0 }}>They Agree.</p>
            </div>

            {/* CTA Row */}
            <div
              className="ths-bottom-row"
              style={{
                display: "flex",
                gap: 24,
                alignItems: "center",
                marginLeft: 148,
                width: "calc(100% - 148px)",
              }}
            >
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexShrink: 0 }}>
                <CtaBtn label="B2B ThirdMeta" color="#1b61db" hoverColor="#2470f0" />
                <CtaBtn label="FMCG/D2C" color="#ffa600" hoverColor="#ffb833" />
              </div>
              <HorizontalDivider />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .ths-section { min-height: unset !important; border-radius: 0 !important; }
        }
        @media (max-width: 1147px) {
          .ths-container { padding: 0 24px !important; }
          .ths-badge-row { padding-left: 200px !important; }
          .ths-row1 p:nth-child(2) { font-size: 64px !important; }
          .ths-row1 p:first-child { font-size: 32px !important; }
          .ths-predictable { font-size: 64px !important; width: 100% !important; max-width: 680px !important; }
          .ths-bottom-row { margin-left: 60px !important; width: calc(100% - 60px) !important; }
        }
        @media (max-width: 900px) {
          .ths-badge-row { padding-left: 140px !important; }
          .ths-row1 p:nth-child(2) { font-size: 52px !important; }
          .ths-row1 p:first-child { font-size: 26px !important; }
          .ths-predictable { font-size: 52px !important; max-width: 560px !important; }
          .ths-bottom-row { margin-left: 0 !important; width: 100% !important; }
        }
        @media (max-width: 767px) {
          .ths-container { padding: 0 20px !important; }
          .ths-badge-row { padding-left: 0 !important; }
          .ths-title-desktop { display: none !important; }
          .ths-title-mobile { display: flex !important; }
          .ths-bottom-row { width: 100% !important; margin-left: 0 !important; flex-wrap: wrap !important; gap: 16px !important; }
          .ths-cta-group { flex-direction: column !important; gap: 12px !important; }
        }
      `}</style>
    </section>
  );
}