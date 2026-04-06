/* ─────────────────────────────────────────────────────────────────────────────
   AboutIntroSection — Section 2 of About Us page
   Figma: node 11387-1037 (Frame 1618876095, 1008×756)

   Layout (desktop):
   ┌─────────────────────────────────────────────────────────────────┐
   │  TOP ROW (1008×398)                                              │
   │  ┌──────────────┐   ┌─────────────────────────────────────────┐ │
   │  │ "About us"   │   │ Paragraph 1 — Manrope 24px w400 #fff    │ │
   │  │ amber tag    │   │ Paragraph 2 — Manrope 24px w300 #8e8e8e │ │
   │  │ + h-rule     │   │ Paragraph 3 — Manrope 24px w300 #8e8e8e │ │
   │  └──────────────┘   └─────────────────────────────────────────┘ │
   ├─────────────────────────────────────────────────────────────────┤
   │  BOTTOM ROW (1008×418)                                           │
   │  ┌──────────────────────┐  ┌──────────────────────────────────┐ │
   │  │ Stat: 98% + label    │  │ Blue accent block (#1b61db)      │ │
   │  │ Stat: 123+ + label   │  │ 712×300                          │ │
   │  │ Stat: 123+ + label   │  │                                  │ │
   │  └──────────────────────┘  └──────────────────────────────────┘ │
   └─────────────────────────────────────────────────────────────────┘

   Fonts:
   - "About us" tag  → Poppins Regular 13px amber #FFA600
   - Para 1          → Manrope Regular 24px white, text-align: RIGHT
   - Para 2/3        → Manrope Light 24px #8e8e8e, text-align: RIGHT
   - Stat numbers    → Bricolage Grotesque SemiBold 60px #b5b5b5
   - Stat labels     → Poppins Light 15px #747474
   ───────────────────────────────────────────────────────────────────────────── */
import { motion, useInView, useScroll, useTransform, MotionValue } from "motion/react";
import { useRef } from "react";

/* ── entrance animation config ──────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;
const VP = { once: true, margin: "-80px" } as const;

/* ── Stats data ──────────────────────────────────────────────────────────── */
const STATS = [
  { value: "98%",  label: "We power discovery, lorem engagement" },
  { value: "123+", label: "We power discover lorem engagement" },
  { value: "123+", label: "We power discover engagement" },
];

/* ── Amber Tag + horizontal rule ─────────────────────────────────────────── */
function AboutTag() {
  return (
    /* Figma: Frame 1618876105 [236×32] = tag chip + Vector line */
    <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
      {/* chip: Frame 1618876110 [98×32], border #FFA600, rounded */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "6px 14px",
          borderRadius: 999,
          border: "1px solid #FFA600",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontSize: 13,
            color: "#FFA600",
            lineHeight: "normal",
            whiteSpace: "nowrap",
          }}
        >
          About us
        </span>
      </div>
      {/* horizontal rule — Vector 235, width ~126px */}
      <div
        style={{
          width: 126,
          height: 1,
          background: "rgba(255,255,255,0.15)",
          flexShrink: 0,
        }}
      />
    </div>
  );
}

/* ── Scroll-driven word reveal ───────────────────────────────────────────── */
function RevealWord({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity }}>{children}{" "}</motion.span>;
}

/* Paragraph data — para 1 is white/400, paras 2–3 are gray/300 */
const PARA_SEGMENTS = [
  {
    text: "We unlock scale by fixing lorem ipsum what's leaking conversion, retention, repeation growth lorem compounds. We unlock scale by fixing lorem We unlock scale by fixing lorem ipsum what's leaking conversion, retention, repeation growth lorem compounds.",
    color: "#ffffff" as const,
    weight: 400,
  },
  {
    text: "We unlock scale by fixing lorem We unlock scale by fixing lorem ipsum what's leaking conversion, retention, repeation growth lorem compounds. Lorem ipsum is simply dummy",
    color: "#8e8e8e" as const,
    weight: 300,
  },
  {
    text: "Repeation growth lorem compounds. Lorem ipsum is simply dummy text if the typesetting.",
    color: "#8e8e8e" as const,
    weight: 300,
  },
];

function ParagraphReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.82", "start 0.08"],
  });

  // Build flat word count so we can assign per-word scroll ranges
  const segWordCounts = PARA_SEGMENTS.map((s) => s.text.split(" ").length);
  const total = segWordCounts.reduce((a, b) => a + b, 0);
  const segOffsets = segWordCounts.reduce<number[]>((acc, _count, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + segWordCounts[i - 1]);
    return acc;
  }, []);

  return (
    <div ref={containerRef} style={{ textAlign: "right" }}>
      {PARA_SEGMENTS.map((seg, si) => {
        const words = seg.text.split(" ");
        const offset = segOffsets[si];
        return (
          <p
            key={si}
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: seg.weight,
              fontSize: 24,
              lineHeight: 1.58,
              color: seg.color,
              margin: si === 0 ? 0 : "24px 0 0",
            }}
          >
            {words.map((word, wi) => {
              const idx = offset + wi;
              const rangeStart = idx / total;
              const rangeEnd = Math.min((idx + 3) / total, 1);
              return (
                <RevealWord
                  key={wi}
                  progress={scrollYProgress}
                  range={[rangeStart, rangeEnd]}
                >
                  {word}
                </RevealWord>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}

/* ── Single stat block ───────────────────────────────────────────────────── */
function StatBlock({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      style={{ display: "flex", flexDirection: "column", gap: 6, width: 200 }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      <span
        style={{
          fontFamily: "'Bricolage Grotesque', Manrope, sans-serif",
          fontWeight: 600,
          fontSize: 60,
          lineHeight: 1,
          color: "#b5b5b5",
          letterSpacing: "-1px",
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 300,
          fontSize: 15,
          lineHeight: "1.5",
          color: "#747474",
          maxWidth: 200,
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

/* ── Main export ─────────────────────────────────────────────────────────── */
export function AboutIntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      style={{
        width: "100%",
        maxWidth: 1008,
        margin: "0 auto",
        padding: "0 24px",
        boxSizing: "border-box",
      }}
    >
      {/* ── TOP ROW: tag + text paragraphs ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 60,
        }}
      >
        {/* LEFT: "About us" tag (236px) */}
        <motion.div
          style={{ flexShrink: 0, paddingTop: 6 }}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <AboutTag />
        </motion.div>

        {/* RIGHT: 3 paragraphs — scroll-driven word reveal */}
        <motion.div
          style={{ flex: 1 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
        >
          <ParagraphReveal />
        </motion.div>
      </div>

      {/* ── BOTTOM ROW: stats (left) + blue accent block (right) ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          gap: 60,
          marginTop: 60,
        }}
      >
        {/* LEFT: 3 stacked stats — width ~200px */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            flexShrink: 0,
            width: 200,
          }}
        >
          {STATS.map((s, i) => (
            <StatBlock key={i} value={s.value} label={s.label} delay={0.1 + i * 0.12} />
          ))}
        </div>

        {/* RIGHT: blue accent rectangle — Figma: 712×300 fill #1b61db */}
        <motion.div
          style={{
            flex: 1,
            height: 300,
            borderRadius: 20,
            background: "linear-gradient(135deg, #1b61db 0%, #0e3fa8 100%)",
            overflow: "hidden",
            position: "relative",
          }}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VP}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          {/* Inner glow */}
          <div
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 240,
              height: 240,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -40,
              left: -40,
              width: 180,
              height: 180,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
              pointerEvents: "none",
            }}
          />
        </motion.div>
      </div>

      {/* Mobile responsive adjustments */}
      <style>{`
        @media (max-width: 1024px) {
          .about-intro-top { flex-direction: column !important; gap: 32px !important; }
          .about-intro-bottom { flex-direction: column !important; }
          .about-intro-text { text-align: left !important; font-size: 18px !important; }
          .about-intro-stats { width: 100% !important; flex-direction: row !important; flex-wrap: wrap !important; gap: 24px !important; }
          .about-intro-blue { height: 200px !important; }
        }
      `}</style>
    </section>
  );
}
