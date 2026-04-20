/* ─────────────────────────────────────────────────────────────────────────────
   AboutIntroSection — Section 2 of About Us page
   Figma: node 11387-1037

   Layout (desktop):
   ┌──────────────────────────────────────────────────────────────────┐
   │  TOP ROW                                                          │
   │  ┌──────────────┐   ┌──────────────────────────────────────────┐ │
   │  │ "About us"   │   │ Paragraphs — Manrope, all white          │ │
   │  │ amber tag    │   │ scroll-driven word reveal                 │ │
   │  │ + h-rule     │   └──────────────────────────────────────────┘ │
   ├──────────────────────────────────────────────────────────────────┤
   │  BOTTOM ROW                                                       │
   │  ┌──────────────────────┐  ┌──────────────────────────────────┐  │
   │  │ 98%  / 123+ / 123+   │  │ Accent block (blur glass)        │  │
   │  │ counter animation    │  │ 712×300                          │  │
   │  └──────────────────────┘  └──────────────────────────────────┘  │
   └──────────────────────────────────────────────────────────────────┘

   Fonts (Figma-exact):
   - Stat numbers  → Manrope Regular 52px #b5b5b5, suffix % = 32px, + = 48px extralight
   - Stat labels   → Poppins Light 15px #747474
   ───────────────────────────────────────────────────────────────────────────── */
import { motion, useInView, useScroll, useTransform, MotionValue } from "motion/react";
import { useRef, useState, useEffect } from "react";

/* ── entrance animation config ──────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;
const VP = { once: true, margin: "-80px" } as const;

/* ── Stats data ──────────────────────────────────────────────────────────── */
const STATS = [
  { value: 94,  suffix: "%",   suffixSize: 32, suffixWeight: 400, label: "Clients stayed beyond two years." },
  { value: 120, suffix: "+",   suffixSize: 48, suffixWeight: 200, label: "Businesses grew inside the ecosystem." },
  { value: 200, suffix: "Cr+", suffixSize: 24, suffixWeight: 400, label: "Revenue influenced across clients." },
];

/* ── Amber Tag + horizontal rule ─────────────────────────────────────────── */
function AboutTag() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
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
          The Planetary System
        </span>
      </div>
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
  return <motion.span style={{ opacity, color: "#ffffff" }}>{children}{" "}</motion.span>;
}

/* Paragraph data — all white, weight varies per Figma */
const PARA_SEGMENTS = [
  {
    text: "Cheers! You built it. You believed in it. You gave it everything.",
    weight: 600,
  },
  {
    text: "So why do the numbers still feel like they are holding your vision hostage? Hexanovate is the Planetary System around YOU, the Sun. Human intelligence, AI systems, automation frameworks, pipelines, marketing and revenue engines. All of it designed and engineered toward a single goal. No tasks. No deliverables. No activities. Just predictable, measurable, consistent and scalable growth of your business.",
    weight: 300,
  },
  {
    text: "Today, marketing and sales. Tomorrow, the full picture. Finance, operations, talent, and every function that makes a business truly unstoppable.",
    weight: 300,
  },
];

function ParagraphReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.82", "start 0.08"],
  });

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
              color: "#ffffff",
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

/* ── Counter hook ────────────────────────────────────────────────────────── */
function useCounter(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return count;
}

/* ── Single stat block ───────────────────────────────────────────────────── */
function StatBlock({
  value, suffix, suffixSize, suffixWeight, label, delay,
}: {
  value: number; suffix: string; suffixSize: number; suffixWeight: number; label: string; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCounter(value, inView);

  return (
    <motion.div
      ref={ref}
      style={{ display: "flex", flexDirection: "column", gap: 6, width: 200 }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {/* Number + suffix — Figma: Manrope Regular 52px + suffix */}
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <span
          style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 400,
            fontSize: 52,
            lineHeight: "60px",
            color: "#b5b5b5",
          }}
        >
          {count}
        </span>
        <span
          style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: suffixWeight,
            fontSize: suffixSize,
            lineHeight: "60px",
            color: "#b5b5b5",
          }}
        >
          {suffix}
        </span>
      </div>
      <span
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 300,
          fontSize: 15,
          lineHeight: "22px",
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
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth <= 1024 : false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
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
          flexDirection: isMobile ? "column" : "row",
          alignItems: "flex-start",
          gap: isMobile ? 24 : 60,
        }}
      >
        {/* LEFT: "About us" tag */}
        <motion.div
          style={{ flexShrink: 0, paddingTop: 6 }}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <AboutTag />
        </motion.div>

        {/* RIGHT: paragraphs — scroll-driven word reveal, all white */}
        <motion.div
          style={{ flex: 1, width: "100%" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
        >
          <ParagraphReveal />
        </motion.div>
      </div>

      {/* ── BOTTOM ROW: stats (left) + accent block (right) ── */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "stretch" : "flex-end",
          gap: isMobile ? 40 : 60,
          marginTop: 60,
        }}
      >
        {/* LEFT: 3 stacked stats */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "row" : "column",
            flexWrap: isMobile ? "wrap" : "nowrap",
            gap: isMobile ? 32 : 44,
            flexShrink: 0,
            width: isMobile ? "100%" : 200,
          }}
        >
          {STATS.map((s, i) => (
            <StatBlock
              key={i}
              value={s.value}
              suffix={s.suffix}
              suffixSize={s.suffixSize}
              suffixWeight={s.suffixWeight}
              label={s.label}
              delay={0.1 + i * 0.12}
            />
          ))}
        </div>

        {/* RIGHT: glass accent block — Figma: 712×300, backdrop blur */}
        <motion.div
          style={{
            flex: 1,
            height: isMobile ? 200 : 300,
            borderRadius: 20,
            background: "rgba(210,210,210,0.20)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
          }}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VP}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        />
      </div>
    </section>
  );
}
