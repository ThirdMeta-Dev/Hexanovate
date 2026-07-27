import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import svgPaths from "../../imports/svg-4dyynmyd9a";
import { useCmsSectionContent } from "../context/CmsSectionContext";
import { CtaButton } from "./CtaButton";

/* ─── TAG DATA ────────────────────────────────────────────────────────────────
 * Figma Frame15 (row 1) — 5 tags, scrolls LEFT
 * Figma Frame16 (row 2) — 4 tags, scrolls RIGHT (reverse)
 * Each set is duplicated (×2) so translateX(-50%) gives a seamless infinite loop.
 * ──────────────────────────────────────────────────────────────────────────── */
const DEFAULT_ROW1_TAGS = [
  "B2B Pipeline That Converts",
  "Consumer Brands That Scale",
  "Smart Classroom Consulting",
  "Inbound Lead Generation",
  "Revenue Growth Systems",
  "Not an Agency. A System.",
  "The Planetary Growth Ecosystem",
  "Outcome Obsessed. Always.",
  "One Partner. Every Function.",
  "Built Around You. Not For You.",
];

const DEFAULT_ROW2_TAGS = [
  "Effort vs Outcome. We Pick Outcome.",
  "Data Over Instincts. Every Time.",
  "Humans Behind Every System",
  "Long Game Thinkers",
  "Creativity Meets Technology",
  "Zero Gaps. Zero Guesswork.",
  "Growth That Compounds",
  "We Own The Number",
  "Your Vision. Our Obsession.",
  "Predictable. Measurable. Permanent.",
];

/* ─── SINGLE TAG ──────────────────────────────────────────────────────────────
 * Figma: bg-#111, border #414141, px-16 py-6, rounded-40
 *   Poppins Regular 13px, amber #ffa600, whitespace-nowrap, leading-normal
 * ──────────────────────────────────────────────────────────────────────────── */
function Tag({ label }: { label: string }) {
  return (
    <div
      style={{
        background: "#111",
        borderRadius: 40,
        padding: "6px 16px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {/* border overlay — matches Figma's absolute border trick */}
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
          margin: 0,
          whiteSpace: "nowrap",
          position: "relative", // above border overlay
        }}
      >
        {label}
      </p>
    </div>
  );
}

/* ─── TAG ROW CAROUSEL ────────────────────────────────────────────────────────
 * direction: "left"  → translateX(0→-50%)  — Row 1 (Frame15)
 * direction: "right" → translateX(-50%→0%) — Row 2 (Frame16)
 * The track is duplicated (tags × 2) so scrolling -50% lands on the start
 * of the second copy, creating a perfectly seamless infinite loop regardless
 * of individual tag widths.
 * ──────────────────────────────────────────────────────────────────────────── */
function TagRowCarousel({
  tags,
  direction,
  duration,
  className,
}: {
  tags: string[];
  direction: "left" | "right";
  duration: number;
  className: string;
}) {
  const doubled = [...tags, ...tags]; // duplicate for seamless loop

  return (
    <div style={{ overflow: "hidden", width: "100%", flexShrink: 0 }}>
      <div
        className={className}
        style={{
          display: "flex",
          gap: 10, // Figma gap-10 between tags
          width: "max-content",
        }}
      >
        {doubled.map((label, i) => (
          <Tag key={i} label={label} />
        ))}
      </div>
      {/* Keyframe styles injected alongside the row */}
      <style>{`
        .${className} {
          animation: ${direction === "left" ? "tagScrollLeft" : "tagScrollRight"} ${duration}s linear infinite;
        }
        .${className}:hover {
          animation-play-state: paused;
        }
        @keyframes tagScrollLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes tagScrollRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

/* ─── REVEAL WORD — scroll-linked opacity illumination ────────────────────────
 * Single motion.span animating from dim (0.15) → full (1) opacity.
 * No ghost spans. Color / weight are passed through via style prop.
 * ──────────────────────────────────────────────────────────────────────────── */
function RevealWord({
  children,
  progress,
  range,
  style,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  style?: React.CSSProperties;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ ...style, opacity }}>
      {children}
    </motion.span>
  );
}

/* ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
 * Figma Frame13: flex-col gap-52, items-center, size-full
 *
 * Frame14 (title + tags + fade overlays):
 *   flex-col gap-36, items-center, relative, w-full
 *   Title: Manrope Regular/Bold, 36px, capitalize, text-center
 *     Line 1: "Hi I'm Ashutosh, Lorem Ipsum" → gray #8e8e8e
 *     Line 2: "is" gray + " " + "simply dummy text of the" white BOLD + " printing lorem" gray
 *   Frame17 (tags frame): flex-col gap-10, items-center
 *     Frame15: Row 1 — 5 tags scroll LEFT
 *     Frame16: Row 2 — 4 tags scroll RIGHT
 *   Fade overlays: Figma uses absolute divs with bg gradient from #0a0a0a.
 *     Replicated here with CSS mask-image on the Frame17 wrapper (same visual,
 *     responsive-friendly). Fade zones: 0→30% and 70%→100% matching Figma
 *     proportions (left-0 w-390 and left-810 w-390 out of 1200px total = 32.5%).
 *
 * Frame (CTA):
 *   Frame12: Frame11 (blue pill "B2B ThirdMeta") + Frame10 (blue circle arrow)
 * ──────────────────────────────────────────────────────────────────────────── */
export function TagsCarouselSection({ transparent = false }: { transparent?: boolean }) {
  const { items } = useCmsSectionContent();
  const ROW1_TAGS = items.length
    ? items.filter(i => String(i.row ?? "1") === "1").map(i => String(i.label ?? "")).filter(Boolean)
    : DEFAULT_ROW1_TAGS;
  const ROW2_TAGS = items.length
    ? items.filter(i => String(i.row ?? "") === "2").map(i => String(i.label ?? "")).filter(Boolean)
    : DEFAULT_ROW2_TAGS;
  const row1 = ROW1_TAGS.length ? ROW1_TAGS : DEFAULT_ROW1_TAGS;
  const row2 = ROW2_TAGS.length ? ROW2_TAGS : DEFAULT_ROW2_TAGS;

  /* ── Title scroll-reveal ── */
  const titleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: titleProgress } = useScroll({
    target: titleRef,
    offset: ["start 0.85", "end 0.4"],
  });

  /* Word list — order matches reading order; breakAfter inserts a <br/> */
  const titleWords: { text: string; color: string; weight: number; breakAfter?: boolean }[] = [
    { text: "Does",         color: "#8e8e8e", weight: 400 },
    { text: "your",         color: "#8e8e8e", weight: 400 },
    { text: "revenue",      color: "#8e8e8e", weight: 400 },
    { text: "align",        color: "#8e8e8e", weight: 400 },
    { text: "with",         color: "#8e8e8e", weight: 400 },
    { text: "the",          color: "#8e8e8e", weight: 400 },
    { text: "vision?",      color: "#8e8e8e", weight: 400, breakAfter: true },
    { text: "Your",         color: "white",   weight: 700 },
    { text: "Numbers",      color: "white",   weight: 700 },
    { text: "Could",        color: "white",   weight: 700 },
    { text: "Look",         color: "white",   weight: 700 },
    { text: "Very",         color: "white",   weight: 700 },
    { text: "Different",    color: "white",   weight: 700 },
    { text: "Six",          color: "white",   weight: 700 },
    { text: "Months",       color: "white",   weight: 700 },
    { text: "From",         color: "white",   weight: 700 },
    { text: "Now.",         color: "white",   weight: 700, breakAfter: true },
    { text: "Seriously.",   color: "#8e8e8e", weight: 400 },
  ];
  const n = titleWords.length;

  return (
    <section
      style={{
        width: "100%",
        background: transparent ? "transparent" : "#0a0a0a",
        padding: 0,
        overflow: "hidden",
      }}
    >
      {/* ── Centered container — max 1148px ── */}
      <div
        className="tags-section-container"
        style={{
          maxWidth: 1148,
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/*
         * Frame13: flex-col gap-52, items-center
         * Outer wrapper for title+tags block + CTA block
         */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 52,
            alignItems: "center",
            width: "100%",
          }}
        >
          {/*
           * ─────────────────────────────────────────────────────────────────
           * FRAME14 — title + tags section
           * flex-col gap-36, items-center, relative, w-full
           * ─────────────────────────────────────────────────────────────────
           */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 36,
              alignItems: "center",
              position: "relative",
              width: "100%",
              flexShrink: 0,
            }}
          >
            {/*
             * Title block
             * Manrope, 36px, capitalize, text-center, lineHeight-0 outer, leading-1.32 spans
             * Line 1: "Hi I'm Ashutosh, Lorem Ipsum" — color #8e8e8e
             * Line 2: "is" #8e8e8e + " " + "simply dummy text of the" white Bold
             *       + " printing lorem" #8e8e8e
             */}
            <div
              ref={titleRef}
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 400,
                fontSize: 36,
                lineHeight: 0,
                textTransform: "capitalize",
                textAlign: "center",
                width: "100%",
                flexShrink: 0,
              }}
            >
              <p style={{ lineHeight: 1.32, margin: 0 }}>
                {titleWords.map((word, i) => (
                  <span key={i}>
                    <RevealWord
                      progress={titleProgress}
                      range={[i / n, (i + 1) / n]}
                      style={{ fontWeight: word.weight, color: word.color }}
                    >
                      {word.text}
                    </RevealWord>
                    {/* space after every word except the last; line break where flagged */}
                    {word.breakAfter ? <br /> : i < n - 1 ? " " : null}
                  </span>
                ))}
              </p>
            </div>

            {/*
             * Frame17 wrapper — tag rows with left/right fade
             * mask-image gradient replicates the Figma's absolute gradient overlays:
             *   Figma: left-fade w-390 + right-fade w-390 out of 1200 total ≈ 32.5% each
             *   Here:  transparent 0%→30%, opaque 30%→70%, transparent 70%→100%
             * overflow:hidden on the tag-rows wrapper clips the scrolling tracks at edges.
             */}
            <div
              style={{
                width: "100%",
                flexShrink: 0,
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)",
              }}
            >
              {/*
               * Frame17: flex-col gap-10, items-center
               * Frame15 (row 1) + Frame16 (row 2)
               */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {/* Frame15: Row 1 — scrolls LEFT */}
                <TagRowCarousel
                  tags={row1}
                  direction="left"
                  duration={22}
                  className="tag-row-1-track"
                />

                {/* Frame16: Row 2 — scrolls RIGHT (opposite direction) */}
                <TagRowCarousel
                  tags={row2}
                  direction="right"
                  duration={18}
                  className="tag-row-2-track"
                />
              </div>
            </div>
          </div>

          {/*
           * ─────────────────────────────────────────────────────────────────
           * FRAME (CTA section) — pr-px
           * Frame12: Frame11 (blue pill button) + Frame10 (blue circle arrow)
           *   Frame11: bg-#1b61db, px-24 py-12, rounded-30, Poppins Medium 16px white
           *   Frame10: bg-#1b61db, size-48, p-12, rounded-30, arrow icon (-scale-y-100 rotate-90)
           * ─────────────────────────────────────────────────────────────────
           */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              paddingRight: 1, // pr-px
              flexShrink: 0,
            }}
          >
            {/* Frame12: shared pill + ringed arrow circle (Figma 10904:134) */}
            <CtaButton label="Show Me How" />
          </div>
        </div>
      </div>

      {/* ── Responsive overrides ── */}
      <style>{`
        @media (max-width: 1147px) {
          .tags-section-container {
            padding: 0 20px;
          }
        }
        @media (max-width: 767px) {
          .tags-section-container {
            padding: 0 16px;
          }
        }
      `}</style>
    </section>
  );
}