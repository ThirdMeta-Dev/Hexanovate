import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import svgPaths from "../../imports/svg-d60poec32a";

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const CARDS = [
  { title: "Recognized for B2B Innovation Excellence" },
  { title: "Top FMCG Growth Partner of the Year" },
  { title: "Best EdTech Marketing Solution" },
  { title: "Digital Marketing Agency of the Year" },
];

/* ─── NETWORK ICON ───────────────────────────────────────────────────────── */
// Exactly matches Figma — 32×32 viewBox, paths from svg-d60poec32a
// clipId is unique per instance to avoid duplicate ID issues in the DOM
function NetworkIcon({ stroke, clipId }: { stroke: string; clipId: string }) {
  return (
    <svg
      style={{ display: "block", width: 32, height: 32, flexShrink: 0 }}
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 32 32"
    >
      <g clipPath={`url(#${clipId})`}>
        <path d={svgPaths.p2c57a7e0} stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <path d={svgPaths.pc29f100}  stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <path d={svgPaths.pdaef000}  stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <path d={svgPaths.p33346480} stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <path d={svgPaths.pfc20900}  stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <path d={svgPaths.p30d679f0} stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect fill="white" height="32" width="32" />
        </clipPath>
      </defs>
    </svg>
  );
}

/* ─── ICON BADGE — INACTIVE ──────────────────────────────────────────────── */
// Figma: size-48, p-6, rounded-49px, border 1px #1b61db, icon stroke #1B61DB
function InactiveIconBadge({ idx }: { idx: number }) {
  return (
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: 49,
        border: "1px solid #1b61db",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 6,
        flexShrink: 0,
        boxSizing: "border-box",
      }}
    >
      <NetworkIcon stroke="#1B61DB" clipId={`alw-inactive-${idx}`} />
    </div>
  );
}

/* ─── ICON BADGE — ACTIVE ────────────────────────────────────────────────── */
// Figma: size-48, p-6, rounded-49px, bg-#ffa600 (NO border), icon stroke white
function ActiveIconBadge({ idx }: { idx: number }) {
  return (
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: 49,
        background: "#ffa600",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 6,
        flexShrink: 0,
        boxSizing: "border-box",
      }}
    >
      <NetworkIcon stroke="white" clipId={`alw-active-${idx}`} />
    </div>
  );
}

/* ─── GRADIENT BLOB ──────────────────────────────────────────────────────── */
// Figma: absolute w-254 h-208 left-0 top-0.12px
// inner: rotate-90, child: h-254 w-208 rounded-20, gradient 52.6274deg
function GradientBlob() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: 0,
        top: 0.12,
        width: 254,
        height: 208,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <div style={{ transform: "rotate(90deg)", flexShrink: 0 }}>
        <div
          style={{
            width: 208,
            height: 254,
            borderRadius: 20,
            backgroundImage:
              "linear-gradient(52.6274deg, rgba(27,97,219,0.25) 0.14447%, rgba(27,97,219,0) 53.962%)",
          }}
        />
      </div>
    </div>
  );
}

/* ─── SINGLE CARD ────────────────────────────────────────────────────────── */
interface CardProps {
  idx: number;
  title: string;
  isActive: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function Card({
  idx,
  title,
  isActive,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: CardProps) {
  // Background: active = blue glass | hover-inactive = subtle blue tint | default = black
  const bgColor = isActive
    ? "rgba(27,97,219,0.15)"
    : isHovered
    ? "rgba(27,97,219,0.06)"
    : "rgba(0,0,0,1)";

  // Border: active = blue border | hovered = dim blue | default = very dim border
  const borderColor = isActive
    ? "rgba(27,97,219,0.45)"
    : isHovered
    ? "rgba(27,97,219,0.3)"
    : "rgba(255,255,255,0.06)";

  // Box shadow: active = blue glow | hovered = subtle glow | default = none
  const boxShadow = isActive
    ? "0 0 32px rgba(27,97,219,0.18)"
    : isHovered
    ? "0 0 18px rgba(27,97,219,0.1)"
    : "none";

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      animate={{
        scale: isHovered && !isActive ? 1.025 : 1,
        y: isHovered && !isActive ? -4 : 0,
      }}
      transition={{ type: "spring", stiffness: 380, damping: 26, mass: 0.8 }}
      style={{
        flex: "1 0 0",
        minWidth: 0,
        minHeight: 1,
        borderRadius: 20,
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        background: bgColor,
        border: `1px solid ${borderColor}`,
        boxShadow,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Blue gradient blob — only on active card */}
      {isActive && <GradientBlob />}

      {/* Card content: flex-col, items-center, gap-24, pt-60 pb-28 px-28 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          paddingTop: 60,
          paddingBottom: 28,
          paddingLeft: 28,
          paddingRight: 28,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Icon badge */}
        {isActive ? (
          <ActiveIconBadge idx={idx} />
        ) : (
          <InactiveIconBadge idx={idx} />
        )}

        {/* Title */}
        <p
          style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: isActive ? 700 : 500,
            fontSize: 15,
            lineHeight: "24px",
            color: "white",
            textAlign: "center",
            marginTop: 0,
            marginBottom: 0,
            width: "100%",
          }}
        >
          {title}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── SECTION BADGE ──────────────────────────────────────────────────────── */
// Figma: bg-#111, px-20 py-6, rounded-40, border 1px #414141, text Poppins 13px #ffa600
function SectionBadge() {
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
      <span
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          fontSize: 13,
          color: "#ffa600",
          lineHeight: "normal",
          whiteSpace: "nowrap",
          position: "relative",
        }}
      >
        Awards Logo Wall
      </span>
    </div>
  );
}

/* ─── MAIN SECTION ───────────────────────────────────────────────────────── */
export function AwardsLogoWallSection() {
  // Default active card = index 1 (second card), matching Figma screenshot
  const [activeIdx, setActiveIdx] = useState(1);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  /* ── title word-by-word scroll reveal ── */
  const titleRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress: titleP } = useScroll({
    target: titleRef,
    offset: ["start 0.85", "end 0.35"],
  });
  // 9 words total — each illuminates across its 1/9 slice of the scroll range
  const tw = (i: number) => [i / 9, (i + 1) / 9];
  const t0 = useTransform(titleP, tw(0), [0.2, 1]);
  const t1 = useTransform(titleP, tw(1), [0.2, 1]);
  const t2 = useTransform(titleP, tw(2), [0.2, 1]);
  const t3 = useTransform(titleP, tw(3), [0.2, 1]);
  const t4 = useTransform(titleP, tw(4), [0.2, 1]);
  const t5 = useTransform(titleP, tw(5), [0.2, 1]);
  const t6 = useTransform(titleP, tw(6), [0.2, 1]);
  const t7 = useTransform(titleP, tw(7), [0.2, 1]);
  const t8 = useTransform(titleP, tw(8), [0.2, 1]);

  return (
    <section
      style={{
        width: "100%",
        background: "transparent",
        padding: 0,
        overflow: "hidden",
      }}
    >
      {/* Inner container — max 1200px, no top/bottom padding */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 60,
          alignItems: "flex-start",
          justifyContent: "center",
          borderRadius: 24,
        }}
      >
        <div
          className="alw-header"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            width: "100%",
          }}
        >
          {/* Badge */}
          <div style={{ width: 155, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div style={{ display: "center", alignItems: "center", width: "100%" }}>
              <SectionBadge />
            </div>
          </div>

          {/* Title */}
          <p
            ref={titleRef}
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: 40,
              color: "white",
              textAlign: "center",
              lineHeight: 1.28,
              textTransform: "capitalize",
              width: "100%",
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            <motion.span style={{ color: "white", fontWeight: 700, opacity: t0 }}>When</motion.span>
            {" "}
            <motion.span style={{ color: "#8e8e8e", fontWeight: 400, opacity: t1 }}>You</motion.span>
            {" "}
            <motion.span style={{ color: "white", fontWeight: 700, opacity: t2 }}>Focus</motion.span>
            {" "}
            <motion.span style={{ color: "#8e8e8e", fontWeight: 400, opacity: t3 }}>on</motion.span>
            {" "}
            <motion.span style={{ color: "white", fontWeight: 700, opacity: t4 }}>Excellence,</motion.span>
            {" "}
            <motion.span style={{ color: "#8e8e8e", fontWeight: 400, opacity: t5 }}>the</motion.span>
            {" "}
            <motion.span style={{ color: "white", fontWeight: 700, opacity: t6 }}>World</motion.span>
            {" "}
            <motion.span style={{ color: "white", fontWeight: 700, opacity: t7 }}>Notices.</motion.span>
          </p>
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              fontSize: 16,
              color: "#727272",
              textAlign: "center",
              lineHeight: 1.6,
              maxWidth: 600,
              margin: 0,
            }}
          >
            Recognition is great, but the real reward is the growth we unlock for our partners every single day.
          </p>
        </div>

        {/* ── CARDS ROW ── */}
        {/*
         * Figma Frame14: flex, gap-16, items-end, w-full
         * 4 equal-width cards (flex-1 each)
         * Active card = second (idx 1), matches Figma screenshot
         */}
        <div
          className="alw-cards"
          style={{
            display: "flex",
            gap: 16,
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{
                duration: 0.65,
                delay: i * 0.11,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{ flex: "1 0 0", minWidth: 0, display: "flex" }}
            >
              <Card
                idx={i}
                title={card.title}
                isActive={activeIdx === i}
                isHovered={hoveredIdx === i}
                onClick={() => setActiveIdx(i)}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Responsive overrides ── */}
      <style>{`
        /* Tablet: 768–1023px — 2×2 grid */
        @media (max-width: 1023px) {
          .alw-cards {
            flex-wrap: wrap !important;
          }
          .alw-cards > * {
            flex: 1 0 calc(50% - 8px) !important;
            max-width: calc(50% - 8px) !important;
          }
        }
        /* Mobile: <768px — single column */
        @media (max-width: 767px) {
          .alw-header p {
            font-size: 28px !important;
          }
          .alw-cards {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .alw-cards > * {
            flex: none !important;
            max-width: 100% !important;
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}