/* ─────────────────────────────────────────────────────────────────────────────
   AboutMissionVisionSection — Section 6 of About Us page
   Figma: node 11561-45

   Desktop layout (1008px content width):
   ┌──────────────────────────────────────────────────────────────────────────┐
   │ [Category Defination ────────────────────────────] [Heading bold+grey]  │
   │ ┌──────────────────────────────────────┐                                 │
   │ │  Mission card (578×296, top+60)       │          [Heading text]         │
   │ │  amber "Mission" + body white         │  ┌────────────────────────────┐│
   │ │                                       │  │ Vision card (512px)         ││
   │ └──────────────────────────────────────┘  │ amber "Vision" + body white │ │
   │                                           └────────────────────────────┘ │
   └──────────────────────────────────────────────────────────────────────────┘

   Figma pixel-exact specs:
   - Mission card : 578×296 px, padding 44px 132px 44px 48px
   - Vision card  : 512px wide, padding 44px 48px
   - Card bg      : rgba(27,97,219,0.15), backdrop-blur 50px, border #0d1729
   - Card glow    : linear-gradient(64.47°, rgba(27,97,219,0.25)→transparent) rotated 90°
   - Card title   : Poppins Regular 28px #FFA600
   - Card body    : Poppins ExtraLight 15px white, lineHeight 25px
   - Heading      : Manrope Bold 36px white + Manrope Light 36px #8e8e8e, w=381
   - Tag          : Poppins Regular 13px #FFA600, bg #111, border #414141
   ───────────────────────────────────────────────────────────────────────────── */
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { useCmsSectionContent } from "../context/CmsSectionContext";

const EASE = [0.22, 1, 0.36, 1] as const;
const VP   = { once: true, margin: "-80px" } as const;

const DEFAULT_MISSION_BODY =
  "To build a complete growth ecosystem around every visionary and purpose driven business. By combining human intelligence, creativity, data and technology into one unified system we deliver growth that is predictable, scalable and permanent.";

const DEFAULT_VISION_BODY =
  "To make this world the best and happiest place for businesses. Where every founder & team thrive, not just survive.";

/* ── Card inner corner glow (Figma-exact) ────────────────────────────────── */
function CardGlow({ cardW, cardH }: { cardW: number; cardH: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: -1,
        left: -1,
        width: cardW,
        height: cardH,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderRadius: 20,
      }}
    >
      {/* Figma: inner div is cardH × cardW (swapped) then rotated 90° */}
      <div
        style={{
          flexShrink: 0,
          transform: "rotate(90deg)",
          width: cardH,
          height: cardW,
          borderRadius: 20,
          backgroundImage:
            "linear-gradient(64.47deg, rgba(27,97,219,0.25) 0.14%, rgba(27,97,219,0) 53.96%)",
        }}
      />
    </div>
  );
}

/* ── Glassmorphism card ───────────────────────────────────────────────────── */
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
        backdropFilter: "blur(50px)",
        WebkitBackdropFilter: "blur(50px)",
        background: "rgba(27,97,219,0.15)",
        border: "1px solid #0d1729",
        borderRadius: 20,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Card content ────────────────────────────────────────────────────────── */
function CardContent({ title, body }: { title: string; body: string }) {
  return (
    <>
      <span
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          fontSize: 28,
          color: "#FFA600",
          lineHeight: "normal",
          whiteSpace: "nowrap",
          position: "relative",
          zIndex: 1,
        }}
      >
        {title}
      </span>
      <p
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 200,
          fontSize: 15,
          lineHeight: "25px",
          color: "#ffffff",
          margin: 0,
          position: "relative",
          zIndex: 1,
        }}
      >
        {body}
      </p>
    </>
  );
}

/* ── Amber pill tag ──────────────────────────────────────────────────────── */
function AmberTag({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6px 20px",
        borderRadius: 40,
        border: "1px solid #414141",
        background: "#111",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          fontSize: 13,
          color: "#FFA600",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ── Scroll-driven word reveal for heading ───────────────────────────────── */
const HEADING_WORDS = [
  { text: "Big?",          color: "#ffffff", weight: 700 },
  { text: "Yes.",          color: "#ffffff", weight: 700 },
  { text: "Unachievable?", color: "#8e8e8e", weight: 300 },
  { text: "Absolutely",    color: "#ffffff", weight: 700 },
  { text: "NOT!",          color: "#ffffff", weight: 700 },
];

function RevealWord({
  children,
  progress,
  range,
  wordStyle,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  wordStyle?: React.CSSProperties;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity, ...wordStyle }}>{children}{" "}</motion.span>;
}

function HeadingReveal({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.82", "start 0.25"],
  });
  const n = HEADING_WORDS.length;

  return (
    <p
      style={{
        fontFamily: "Manrope, sans-serif",
        fontSize: 36,
        lineHeight: 1.32,
        margin: 0,
        textTransform: "capitalize",
      }}
    >
      {HEADING_WORDS.map((w, i) => (
        <RevealWord
          key={i}
          progress={scrollYProgress}
          range={[i / n, Math.min((i + 2) / n, 1)]}
          wordStyle={{ fontWeight: w.weight, color: w.color }}
        >
          {w.text}
        </RevealWord>
      ))}
    </p>
  );
}

/* ── Main export ─────────────────────────────────────────────────────────── */
export function AboutMissionVisionSection() {
  const { content } = useCmsSectionContent();
  const MISSION_BODY = String(content.missionText ?? DEFAULT_MISSION_BODY);
  const VISION_BODY  = String(content.visionText  ?? DEFAULT_VISION_BODY);
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="mv-section"
      style={{
        width: "100%",
        padding: "0 96px",
        boxSizing: "border-box",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {/* ─── DESKTOP layout ─── */}
      <div
        className="mv-desktop"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-end",
        }}
      >
        {/* ── Mission card — absolute, top+60 offset, slides from LEFT ── */}
        <motion.div
          style={{ position: "absolute", left: 0, top: 60, width: 578 }}
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <GlassCard style={{ width: 578, height: 296, padding: "44px 132px 44px 48px" }}>
            <CardGlow cardW={578} cardH={296} />
            <CardContent title="Mission" body={MISSION_BODY} />
          </GlassCard>
        </motion.div>

        {/* ── Tag + line row — flex:1 fills gap between left and right column ── */}
        <motion.div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            gap: 12,
            paddingRight: 12,
          }}
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
        >
          <AmberTag label="Category Defination" />
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.15)" }} />
        </motion.div>

        {/* ── Right column: heading (w=381) + Vision card (w=512) ── */}
        <div
          style={{
            width: 512,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 28,
          }}
        >
          {/* Heading — 381px, right-aligned in the 512px column */}
          <motion.div
            style={{ width: 381 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VP}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          >
            <HeadingReveal containerRef={sectionRef} />
          </motion.div>

          {/* Vision card — slides from RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.85, ease: EASE, delay: 0.12 }}
          >
            <GlassCard style={{ width: 512, padding: "44px 48px" }}>
              <CardGlow cardW={512} cardH={242} />
              <CardContent title="Vision" body={VISION_BODY} />
            </GlassCard>
          </motion.div>
        </div>
      </div>

      {/* ─── MOBILE layout (≤ 1024px) — stacked vertically ─── */}
      <div className="mv-mobile" style={{ flexDirection: "column", gap: 24 }}>
        {/* Tag row */}
        <motion.div
          style={{ display: "flex", alignItems: "center", gap: 12 }}
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <AmberTag label="Category Defination" />
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.15)" }} />
        </motion.div>

        {/* Heading */}
        <motion.p
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: 28,
            lineHeight: 1.35,
            margin: 0,
            textTransform: "capitalize",
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <span style={{ fontWeight: 700, color: "#ffffff" }}>Big? Yes. </span>
          <span style={{ fontWeight: 300, color: "#8e8e8e" }}>Unachievable? </span>
          <span style={{ fontWeight: 700, color: "#ffffff" }}>Absolutely NOT!</span>
        </motion.p>

        {/* Mission card */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <GlassCard style={{ padding: "36px 32px" }}>
            <CardGlow cardW={340} cardH={220} />
            <CardContent title="Mission" body={MISSION_BODY} />
          </GlassCard>
        </motion.div>

        {/* Vision card */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        >
          <GlassCard style={{ padding: "36px 32px" }}>
            <CardGlow cardW={340} cardH={220} />
            <CardContent title="Vision" body={VISION_BODY} />
          </GlassCard>
        </motion.div>
      </div>

      <style>{`
        .mv-desktop { display: flex; }
        .mv-mobile  { display: none; }
        @media (max-width: 1024px) {
          .mv-section  { padding: 0 24px !important; }
          .mv-desktop  { display: none !important; }
          .mv-mobile   { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
