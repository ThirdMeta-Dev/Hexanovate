/* ─────────────────────────────────────────────────────────────────────────────
   LeadershipGrowthSystemsSection — Figma node 11420-495
   • "Testimonials" amber tag — centered
   • Heading with scroll-based word-reveal animation
   • CTA buttons — centered
   ───────────────────────────────────────────────────────────────────────────── */
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useCmsSectionContent } from "../context/CmsSectionContext";
import { CtaButton } from "./CtaButton";

const EASE = [0.22, 1, 0.36, 1] as const;
const VP   = { once: true, margin: "-80px" } as const;

/* ── Word-reveal helper (opacity driven by scroll progress) ─────────────── */
function RevealWord({
  children,
  progress,
  range,
  color,
  weight,
  size,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  color?: string;
  weight?: number;
  size?: string;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span
      style={{
        opacity,
        color: color ?? "#ffffff",
        fontFamily: "Manrope, sans-serif",
        fontWeight: weight ?? 600,
        fontSize: size ?? "clamp(44px, 6.5vw, 80px)",
        lineHeight: 1.12,
        display: "inline",
      }}
    >
      {children}{" "}
    </motion.span>
  );
}

/* ── Pill CTA button — shared pill (Figma 10904:134) ────────────────────── */
function CtaBtn({ label, bg, href }: { label: string; bg: string; href?: string }) {
  const isAmber = bg.toLowerCase() === "#ffa600";
  return (
    <CtaButton
      label={label}
      href={href}
      fillColor={bg}
      hoverFillColor={
        isAmber
          ? "linear-gradient(135deg, #e69400 0%, #ffa600 100%)"
          : undefined
      }
    />
  );
}

/* ── Main export ─────────────────────────────────────────────────────────── */
export function LeadershipGrowthSystemsSection() {
  const { content } = useCmsSectionContent();
  const cta1Text = String(content.cta1Text ?? "B2B ThirdMeta");
  const cta1Link = String(content.cta1Link ?? "https://thirdmeta.in/");
  const cta2Text = String(content.cta2Text ?? "FMCG/D2C");
  const cta2Link = String(content.cta2Link ?? "https://thenativeunit.com/");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.1"],
  });

  /* Each word gets a staggered opacity range */
  const words: { text: string; color: string; weight: number; size: string }[] = [
    { text: "We",           color: "#ffffff", weight: 400, size: "clamp(24px, 3.5vw, 40px)" },
    { text: "Build",        color: "#ffffff", weight: 400, size: "clamp(24px, 3.5vw, 40px)" },
    { text: "Growth",       color: "#ffffff", weight: 600, size: "clamp(44px, 6.5vw, 80px)" },
    { text: "Systems",      color: "#ffffff", weight: 600, size: "clamp(44px, 6.5vw, 80px)" },
    { text: "For",          color: "#ffffff", weight: 400, size: "clamp(24px, 3.5vw, 40px)" },
    { text: "Predictable",  color: "#1b61db", weight: 600, size: "clamp(44px, 6.5vw, 80px)" },
    { text: "Outcomes",     color: "#1b61db", weight: 600, size: "clamp(44px, 6.5vw, 80px)" },
  ];

  const total = words.length;

  return (
    <section
      ref={containerRef}
      style={{ width: "100%", display: "flex", flexDirection: "column", gap: 52, alignItems: "center" }}
    >
      {/* ── Heading block ── */}
      <motion.div
        style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {/* "Testimonials" tag */}
        <div style={{
          background: "#111", border: "1px solid #414141", borderRadius: 40,
          padding: "6px 16px", display: "inline-flex", alignItems: "center",
        }}>
          <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 13, color: "#FFA600", whiteSpace: "nowrap" }}>
            Testimonials
          </span>
        </div>

        {/* Heading with scroll-driven word reveal */}
        <div style={{
          width: "100%",
          textAlign: "center",
          textTransform: "capitalize",
          lineHeight: 1.12,
        }}>
          {/* Line 1: We Build [big]Growth Systems[/big] For */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", flexWrap: "wrap", gap: "0 4px" }}>
            {words.slice(0, 5).map((w, i) => (
              <RevealWord
                key={i}
                progress={scrollYProgress}
                range={[i / total, Math.min((i + 2) / total, 1)]}
                color={w.color}
                weight={w.weight}
                size={w.size}
              >
                {w.text}
              </RevealWord>
            ))}
          </div>

          {/* Line 2: Predictable Outcomes (blue) */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", flexWrap: "wrap", gap: "0 4px" }}>
            {words.slice(5).map((w, i) => (
              <RevealWord
                key={i + 5}
                progress={scrollYProgress}
                range={[(i + 5) / total, Math.min((i + 7) / total, 1)]}
                color={w.color}
                weight={w.weight}
                size={w.size}
              >
                {w.text}
              </RevealWord>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── CTA buttons — centered ── */}
      <motion.div
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP}
        transition={{ duration: 0.55, delay: 0.3, ease: EASE }}
      >
        <CtaBtn label={cta1Text} bg="#1b61db" href={cta1Link} />
        <CtaBtn label={cta2Text} bg="#FFA600" href={cta2Link} />
      </motion.div>

    </section>
  );
}
