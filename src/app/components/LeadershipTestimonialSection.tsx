/* ─────────────────────────────────────────────────────────────────────────────
   LeadershipTestimonialSection — Section 7 of Leadership & Team page
   Figma: node 11422-1254

   Layout:
   1. "Why Trust" tag (left col) + heading (right) — original constrained style
      Heading has word-by-word scroll reveal
   2. Photo placeholder (left) + quote block (right)
      Quote icon is INLINE with text (flex row), body text is full width (no cap)
   ───────────────────────────────────────────────────────────────────────────── */
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;
const VP   = { once: true, margin: "-80px" } as const;

const IMG_AVATAR = "https://www.figma.com/api/mcp/asset/273bca9a-7574-48f9-a941-69148543dfc8";
const IMG_QUOTE  = "https://www.figma.com/api/mcp/asset/b3416753-52b7-4849-aa14-76a688801807";

/* ── Word-by-word scroll reveal ─────────────────────────────────────────── */
function RevealWord({
  children, progress, range, style,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  style?: React.CSSProperties;
}) {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <motion.span style={{ opacity, display: "inline", ...style }}>
      {children}{" "}
    </motion.span>
  );
}

const HEADING_WORDS: { text: string; weight: number; color: string }[] = [
  { text: "Lorem",  weight: 300, color: "#8e8e8e" },
  { text: "ipsum",  weight: 700, color: "#ffffff" },
  { text: "is",     weight: 700, color: "#ffffff" },
  { text: "lorem",  weight: 700, color: "#ffffff" },
  { text: "is",     weight: 700, color: "#ffffff" },
  { text: "simply", weight: 300, color: "#8e8e8e" },
  { text: "dummy",  weight: 300, color: "#8e8e8e" },
  { text: "text",   weight: 300, color: "#8e8e8e" },
  { text: "the",    weight: 300, color: "#8e8e8e" },
  { text: "lorem",  weight: 300, color: "#8e8e8e" },
];

export function LeadershipTestimonialSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.88", "start 0.15"],
  });

  const total = HEADING_WORDS.length;

  return (
    <motion.section
      ref={sectionRef}
      style={{ width: "100%", padding: "0 96px", boxSizing: "border-box" }}
      initial={{ opacity: 0, y: 60, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VP}
      transition={{ duration: 0.85, ease: EASE }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 48 }}>

        {/* ── Row 1: Tag + Heading (original constrained style + scroll reveal) ── */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 32 }}>
          <div style={{ flexShrink: 0, paddingTop: 8 }}>
            <div style={{
              background: "#111", border: "1px solid #414141", borderRadius: 40,
              padding: "6px 20px", display: "inline-flex", alignItems: "center",
            }}>
              <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 13, color: "#FFA600", whiteSpace: "nowrap" }}>
                Why Trust
              </span>
            </div>
          </div>

          {/* Heading — original font size, scroll-driven word reveal */}
          <div style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "clamp(36px, 5vw, 60px)",
            lineHeight: 1.36,
            flex: 1,
            textTransform: "capitalize",
          }}>
            {HEADING_WORDS.map((w, i) => (
              <RevealWord
                key={i}
                progress={scrollYProgress}
                range={[i / total, Math.min((i + 2) / total, 1)]}
                style={{ fontWeight: w.weight, color: w.color }}
              >
                {w.text}
              </RevealWord>
            ))}
          </div>
        </div>

        {/* ── Row 2: Photo + Quote block ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 44 }}>

          {/* Gray photo placeholder */}
          <div style={{
            width: 200, height: 260, borderRadius: 20,
            background: "#d9d9d9", flexShrink: 0,
          }} />

          {/* Quote block */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 28 }}>

            {/* Quote icon + text — Figma exact pattern:
                Icon stacked above text with negative margin overlap.
                Text uses textIndent to push line 1 past the icon.
                Line 2+ wraps back to left edge (textIndent = first line only). */}
            <div style={{ paddingBottom: 20, position: "relative" }}>
              {/* Icon: 102×56px, sits at top-left, pulls text up via negative margin */}
              <img
                src={IMG_QUOTE}
                alt=""
                style={{
                  display: "block",
                  height: 56,
                  width: 102,
                  marginBottom: -20,
                  position: "relative",
                  zIndex: 1,
                }}
              />
              {/* Text: textIndent pushes first line past icon width, wrap lines flush-left */}
              <p style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 300,
                fontSize: 18,
                lineHeight: "32px",
                color: "#ffffff",
                margin: 0,
                textIndent: "110px",
              }}>
                We unlock scale by fixing lorem ipsum what's leaking conversion,
                retention, repeation growth lorem compounds. We unlock scale by fixing lorem
              </p>
            </div>

            {/* Person attribution */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                border: "1px solid #FFA600", overflow: "hidden", flexShrink: 0,
              }}>
                <img src={IMG_AVATAR} alt="Mr Saket Lorem" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 15, color: "#FFA600", letterSpacing: "0.2px", textTransform: "capitalize", whiteSpace: "nowrap" }}>
                Mr Saket Lorem
              </span>
              <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 13, color: "#414141" }}>|</span>
              <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 14, color: "#7d7d7d", letterSpacing: "0.2px", textTransform: "capitalize", whiteSpace: "nowrap" }}>
                Supply Chain Head
              </span>
            </div>

          </div>
        </div>

      </div>
    </motion.section>
  );
}
