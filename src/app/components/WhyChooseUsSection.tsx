import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { useId, useRef } from "react";
import svgPaths from "../../imports/svg-w6xbq20mqf";
import imgWhyChooseUs1 from "@/assets/087ffb858e8be63789e9a7cde72a9eeee8a5fe6e.jpg";
import { useCmsSectionContent } from "../context/CmsSectionContext";

/* ─── FEATURE ICON (blue circle, 30×30, with SVG inside) ──────────────── */
function FeatureIcon({ clipId }: { clipId: string }) {
  return (
    <div
      style={{
        width: 30,
        height: 30,
        borderRadius: 49,
        border: "1px solid #1b61db",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        position: "relative",
      }}
    >
      <div style={{ width: 19, height: 19, position: "relative", flexShrink: 0 }}>
        <svg
          style={{ display: "block", width: "100%", height: "100%" }}
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 19 19"
        >
          <g clipPath={`url(#${clipId})`}>
            <g />
            <path d={svgPaths.p2aae1aa0} stroke="#1B61DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p11b1cf80} stroke="#1B61DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p3754c080} stroke="#1B61DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pc0e7100}  stroke="#1B61DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p36ec2080} stroke="#1B61DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pfd7d000}  stroke="#1B61DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
          <defs>
            <clipPath id={clipId}>
              <rect fill="white" height="19" width="19" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

/* ─── SINGLE FEATURE ITEM ────────────────────────────────────────────────── */
interface FeatureItemProps {
  title: string;
  description: string;
  align?: "left" | "right";
  delay?: number;
}

function FeatureItem({ title, description, align = "left", delay = 0 }: FeatureItemProps) {
  const uid = useId().replace(/:/g, "");
  const clipId = `wcu-clip-${uid}`;
  const isRight = align === "right";

  return (
    <motion.div
      style={{ width: "100%", display: "flex", flexDirection: "column", gap: 6, minWidth: 0, flexShrink: 0 }}
      className="wcu-feature-item"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        width: "100%",
        justifyContent: isRight ? "flex-end" : "flex-start",
      }}>
        <FeatureIcon clipId={clipId} />
        <p style={{
          fontFamily: "Manrope, sans-serif",
          fontWeight: 500,
          fontSize: 15,
          lineHeight: "24px",
          color: "white",
          whiteSpace: "nowrap",
          flexShrink: 0,
          margin: 0,
        }}>
          {title}
        </p>
      </div>
      <p style={{
        fontFamily: "Poppins, sans-serif",
        fontWeight: 300,
        fontSize: 15,
        lineHeight: "22px",
        color: "#747474",
        width: "100%",
        margin: 0,
        whiteSpace: "pre-wrap",
        textAlign: isRight ? "right" : "left",
      }}>
        {description}
      </p>
    </motion.div>
  );
}

/* ─── REVEAL WORD — single span, no ghost copy, no double-layer ─────────── */
function RevealWord({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, [range[0], range[1]], [0.25, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

/* ─── SECTION TITLE ─────────────────────────────────────────────────────── */
function SectionTitle() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.2"],
  });

  const stagger = 0.1;
  const dur = 0.14;
  const r = (wi: number): [number, number] => [wi * stagger, wi * stagger + dur];

  return (
    <p
      ref={ref}
      className="wcu-title"
      style={{
        fontFamily: "Manrope, sans-serif",
        fontWeight: 400,
        fontSize: "clamp(22px, 2.8vw, 34px)",
        lineHeight: 1.36,
        color: "#8e8e8e",
        width: "min(698px, 100%)",
        margin: 0,
        textTransform: "capitalize",
      }}
    >
      <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, color: "white" }}>
        <RevealWord progress={scrollYProgress} range={r(0)}>Other</RevealWord>
        {" "}
        <RevealWord progress={scrollYProgress} range={r(1)}>Options</RevealWord>
        {" "}
        <RevealWord progress={scrollYProgress} range={r(2)}>Are</RevealWord>
        {" "}
        <RevealWord progress={scrollYProgress} range={r(3)}>Fine,</RevealWord>
        {" "}
        <RevealWord progress={scrollYProgress} range={r(4)}>Sure.</RevealWord>
      </span>
      {" "}
      <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#8e8e8e" }}>
        <RevealWord progress={scrollYProgress} range={r(5)}>But</RevealWord>
        {" "}
        <RevealWord progress={scrollYProgress} range={r(6)}>Fine</RevealWord>
        {" "}
        <RevealWord progress={scrollYProgress} range={r(7)}>Was</RevealWord>
        {" "}
        <RevealWord progress={scrollYProgress} range={r(8)}>Never</RevealWord>
        {" "}
        <RevealWord progress={scrollYProgress} range={r(9)}>Going</RevealWord>
        {" "}
        <RevealWord progress={scrollYProgress} range={r(10)}>to</RevealWord>
        {" "}
        <RevealWord progress={scrollYProgress} range={r(11)}>Get</RevealWord>
        {" "}
        <RevealWord progress={scrollYProgress} range={r(12)}>You</RevealWord>
        {" "}
        <RevealWord progress={scrollYProgress} range={r(13)}>to</RevealWord>
        {" "}
        <RevealWord progress={scrollYProgress} range={r(14)}>Where</RevealWord>
        {" "}
        <RevealWord progress={scrollYProgress} range={r(15)}>You</RevealWord>
        {" "}
        <RevealWord progress={scrollYProgress} range={r(16)}>Actually</RevealWord>
        {" "}
        <RevealWord progress={scrollYProgress} range={r(17)}>Want</RevealWord>
        {" "}
        <RevealWord progress={scrollYProgress} range={r(18)}>to</RevealWord>
        {" "}
        <RevealWord progress={scrollYProgress} range={r(19)}>Go.</RevealWord>
      </span>
    </p>
  );
}

/* ─── WHY CHOOSE US BADGE ───────────────────────────────────────────────── */
function WhyChooseUsBadge() {
  return (
    <div
      style={{
        background: "#111",
        borderRadius: 40,
        padding: "6px 20px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, border: "1px solid #414141", borderRadius: 40, pointerEvents: "none" }} />
      <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 13, color: "#ffa600", lineHeight: "normal", whiteSpace: "nowrap", position: "relative" }}>
        Why Choose Us
      </span>
    </div>
  );
}

const DEFAULT_FEATURES = [
  { title: "Strategy That Actually Executes.", description: `Vision without execution is just a slide deck. Everything inside ThirdMeta is built to move from thinking to doing without losing momentum.` },
  { title: "Empathy Built Into Everything.", description: `We understand businesses because we spent years watching brilliant ones struggle needlessly.` },
  { title: "Human Intelligence, System Powered.", description: `Technology handles the scale. People handle the thinking. Together they produce outcomes that neither could ever manage alone.` },
  { title: "Built for Every Stage.", description: `Startup or scaling, early or established, the ecosystem was designed to hold every ambition at every stage without asking you to outgrow it.` },
];

/* ─── WHY CHOOSE US SECTION ─────────────────────────────────────────────── */
export function WhyChooseUsSection({ transparent = false }: { transparent?: boolean }) {
  const { items: cmsItems } = useCmsSectionContent();
  const featureData = cmsItems.length > 0
    ? cmsItems.map(item => ({
        title:       String(item.title       ?? ""),
        description: String(item.description ?? ""),
      }))
    : DEFAULT_FEATURES;

  return (
    <section style={{ width: "100%", background: transparent ? "transparent" : "#0a0a0a", padding: 0, overflow: "clip" }}>
      <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 24px", boxSizing: "border-box", position: "relative" }}>
        <div style={{ width: "100%", paddingTop: 40, paddingBottom: 40 }}>
          {/* Header row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", width: "100%", marginBottom: 100 }} className="wcu-header">
            <SectionTitle />

            <motion.div
              style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, width: 245, flexShrink: 0 }}
              className="wcu-badge-col"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{ flex: "1 0 0", height: 0, minHeight: "1px", position: "relative" }}>
                <div style={{ position: "absolute", inset: "-0.5px 0" }}>
                  <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 92 1">
                    <path d="M0 0.5H92" stroke="#414141" />
                  </svg>
                </div>
              </div>
              <div style={{ width: 141, flexShrink: 0, display: "flex", alignItems: "center" }}>
                <WhyChooseUsBadge />
              </div>
            </motion.div>
          </div>

          {/* Feature grid */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", width: "100%", position: "relative" }} className="wcu-grid">
            {/* Left column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 68, width: 300, flexShrink: 0 }} className="wcu-col">
              <FeatureItem title={featureData[0].title} description={featureData[0].description} align="left" delay={0.05} />
              <FeatureItem title={featureData[1].title} description={featureData[1].description} align="left" delay={0.12} />
            </div>

            {/* Central video — absolutely centred over the grid */}
            <div style={{
              position: "absolute",
              left: "50%",
              top: "-30px",
              transform: "translateX(-50%)",
              width: 493,
              height: 285,
              pointerEvents: "none",
              zIndex: 0,
              overflow: "hidden",
            }}>
              <video
                src="https://sienna-pelican-786032.hostingersite.com/wp-content/uploads/2026/03/grok-video-a978f241-92f5-4740-bf2c-d5003cd71847.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              {!transparent && <>
              {/* Top fade */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 90, background: "linear-gradient(to bottom, #0a0a0a, rgba(10,10,10,0))", pointerEvents: "none", zIndex: 2 }} />
              {/* Bottom fade */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 90, background: "linear-gradient(to top, #0a0a0a, rgba(10,10,10,0))", pointerEvents: "none", zIndex: 2 }} />
              {/* Left fade */}
              <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 90, background: "linear-gradient(to right, #0a0a0a, rgba(10,10,10,0))", pointerEvents: "none", zIndex: 2 }} />
              {/* Right fade */}
              <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 90, background: "linear-gradient(to left, #0a0a0a, rgba(10,10,10,0))", pointerEvents: "none", zIndex: 2 }} />
              </>}
            </div>

            {/* Right column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 68, width: 300, flexShrink: 0, alignItems: "flex-end" }} className="wcu-col">
              <FeatureItem title={featureData[2].title} description={featureData[2].description} align="right" delay={0.1} />
              <FeatureItem title={featureData[3].title} description={featureData[3].description} align="right" delay={0.18} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .wcu-title { flex: 1 0 0 !important; width: auto !important; min-width: 0 !important; font-size: clamp(24px, 3.5vw, 40px) !important; }
          .wcu-badge-col { width: auto !important; min-width: 170px !important; flex-shrink: 0 !important; }
          .wcu-col { flex: 1 0 0 !important; width: auto !important; min-width: 200px !important; }
          .wcu-grid { gap: 24px !important; }
          .wcu-feature-item { width: 100% !important; }
        }
        @media (max-width: 767px) {
          .wcu-header { flex-direction: column !important; gap: 20px !important; margin-bottom: 48px !important; }
          .wcu-title { width: 100% !important; flex: none !important; min-width: unset !important; font-size: clamp(22px, 6vw, 36px) !important; }
          .wcu-badge-col { width: 100% !important; padding-top: 0 !important; min-width: unset !important; flex-shrink: 1 !important; }
          .wcu-grid { flex-direction: column !important; gap: 40px !important; justify-content: flex-start !important; }
          .wcu-col { width: 100% !important; flex: none !important; min-width: unset !important; }
          .wcu-feature-item { width: 100% !important; }
        }
      `}</style>
    </section>
  );
}