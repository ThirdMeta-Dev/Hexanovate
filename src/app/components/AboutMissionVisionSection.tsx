/* ─────────────────────────────────────────────────────────────────────────────
   AboutMissionVisionSection — Section 6 of About Us page
   Figma: node 11456-5357

   Layout (desktop 1008px):
   ┌──────────────────────────────────────────────────────────────────────────┐
   │                                         [Category Defination ──────────] │
   │  ┌────────────────────────────┐                                          │
   │  │  Mission card (578×296)    │    We unlock scale                       │
   │  │  (absolute, offset top+60) │    by fixing what                        │
   │  │  amber title + body text   │    leaking conver                        │
   │  └────────────────────────────┘   ┌──────────────────────────────────┐  │
   │                                   │ Vision card (512px)              │  │
   │                                   │ amber title + body text          │  │
   │                                   └──────────────────────────────────┘  │
   └──────────────────────────────────────────────────────────────────────────┘

   Animations:
   • Entrance  : y 60→0, opacity 0→1 (standard, applied by parent)
   • Mission   : x -80→0, opacity 0→1  (slides from LEFT)
   • Vision    : x  80→0, opacity 0→1  (slides from RIGHT)
   • Heading   : word-by-word scroll-driven opacity reveal
   • Tag row   : fade + slide down on enter
   ───────────────────────────────────────────────────────────────────────────── */
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;
const VP   = { once: true, margin: "-80px" } as const;

/* ── Card inner blue corner glow ─────────────────────────────────────────── */
function CardGlow({ width, height }: { width: number; height: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: -1,
        left: -1,
        width,
        height,
        pointerEvents: "none",
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      {/* Rotate 90° so gradient bleeds from the correct corner */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: "rotate(90deg)",
          backgroundImage:
            "linear-gradient(64.47deg, rgba(27,97,219,0.25) 0%, rgba(27,97,219,0) 54%)",
        }}
      />
    </div>
  );
}

/* ── Glassmorphism card shell ─────────────────────────────────────────────── */
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
        background: "rgba(27, 97, 219, 0.15)",
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

/* ── Per-word scroll opacity ─────────────────────────────────────────────── */
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
  return (
    <motion.span style={{ opacity, ...wordStyle }}>
      {children}{" "}
    </motion.span>
  );
}

/* ── Heading definition ──────────────────────────────────────────────────── */
const HEADING_WORDS = [
  { text: "We",      color: "#ffffff", weight: 700 },
  { text: "unlock",  color: "#ffffff", weight: 700 },
  { text: "scale",   color: "#ffffff", weight: 700 },
  { text: "by",      color: "#ffffff", weight: 700 },
  { text: "fixing",  color: "#ffffff", weight: 700 },
  { text: "what",    color: "#8e8e8e", weight: 300 },
  { text: "leaking", color: "#8e8e8e", weight: 300 },
  { text: "conver",  color: "#8e8e8e", weight: 300 },
];

function HeadingReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "start 0.25"],
  });
  const n = HEADING_WORDS.length;

  return (
    <div ref={ref}>
      <p
        style={{
          fontFamily: "Manrope, sans-serif",
          fontSize: 36,
          lineHeight: 1.32,
          margin: 0,
          textTransform: "capitalize",
          width: 381,
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
    </div>
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

const CARD_BODY =
  "We unlock scale by fixing lorem ipsum what's leaking conversion, retention, repeation growth lorem compounds. We unlock scale by fixing lorem ipsum what's leaking conversion, retention, repeation growth";

/* ── Main export ─────────────────────────────────────────────────────────── */
export function AboutMissionVisionSection() {
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
      {/* ─── DESKTOP layout (> 1024px) ─── */}
      <div
        className="mv-desktop"
        style={{ position: "relative", display: "flex", alignItems: "flex-start" }}
      >
        {/* Mission card — absolutely positioned (out of flow), slides from LEFT */}
        <motion.div
          style={{
            position: "absolute",
            left: 0,
            top: 60,
            width: 578,
          }}
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <GlassCard
            style={{
              width: 578,
              height: 296,
              padding: "44px 132px 44px 48px",
            }}
          >
            <CardGlow width={578} height={296} />
            <CardContent title="Mission" body={CARD_BODY} />
          </GlassCard>
        </motion.div>

        {/* Tag row — flex-1, fills space between left edge and right column */}
        {/* Tag pill on LEFT, line extends to RIGHT (matches Figma node 11456:5370) */}
        <motion.div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
        >
          <AmberTag label="Category Defination" />
          <div
            style={{
              flex: 1,
              height: 1,
              background: "rgba(255,255,255,0.15)",
            }}
          />
        </motion.div>

        {/* Right column — heading + Vision card only */}
        <div
          style={{
            width: 512,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 28,
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Heading — text reveal on scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VP}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            style={{ width: "100%" }}
          >
            <HeadingReveal />
          </motion.div>

          {/* Vision card — slides from RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.85, ease: EASE, delay: 0.12 }}
          >
            <GlassCard
              style={{
                width: 512,
                padding: "44px 48px",
              }}
            >
              <CardGlow width={512} height={242} />
              <CardContent title="Vision" body={CARD_BODY} />
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
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.15)" }} />
          <AmberTag label="Category Defination" />
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
          <span style={{ fontWeight: 700, color: "#ffffff" }}>We unlock scale by fixing </span>
          <span style={{ fontWeight: 300, color: "#8e8e8e" }}>what leaking conver</span>
        </motion.p>

        {/* Mission card */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <GlassCard style={{ padding: "36px 32px" }}>
            <CardGlow width={400} height={220} />
            <CardContent title="Mission" body={CARD_BODY} />
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
            <CardGlow width={400} height={220} />
            <CardContent title="Vision" body={CARD_BODY} />
          </GlassCard>
        </motion.div>
      </div>

      {/* Responsive toggle */}
      <style>{`
        .mv-desktop { display: flex; }
        .mv-mobile  { display: none; }
        @media (max-width: 1024px) {
          .mv-desktop { display: none !important; }
          .mv-mobile  { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
