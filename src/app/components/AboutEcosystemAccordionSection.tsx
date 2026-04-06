/* ─────────────────────────────────────────────────────────────────────────────
   AboutEcosystemAccordionSection — Section 12 of About Us page
   Figma: node 11456-5647

   Layout:
   ┌──────────────────────────────────────────────────────────────────────────┐
   │  [48px heading — left 698px]            [line ──── Ecosystem tag]        │
   │                                                                          │
   │  ┌──────────────────────────────────────────────────────────────┐        │
   │  │  [icon]  Row Title              (inactive — dark bg, inset)  │        │
   │  └──────────────────────────────────────────────────────────────┘        │
   │  ┌────────────────────────────────────────────────────────────────────┐  │
   │  │  [icon]  Row Title    │  Description text (active — blue glass)   │  │
   │  └────────────────────────────────────────────────────────────────────┘  │
   └──────────────────────────────────────────────────────────────────────────┘

   Hover a row to activate it. One row active at a time.
   Active: full-width, rgba(27,97,219,0.15) bg, description text visible on right
   Inactive: inset 28px each side, dark bg, border rgba(255,255,255,0.1)
   ───────────────────────────────────────────────────────────────────────────── */
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;
const VP = { once: true, margin: "-80px" } as const;

/* ── Row data ────────────────────────────────────────────────────────────── */
const ROWS = [
  {
    title: "We Hear Problems",
    description:
      "We listen first. Context, constraints, and deadlines before recommending a single move.",
  },
  {
    title: "We Map the System",
    description:
      "Full-funnel visibility from acquisition to retention. No blind spots, no guesswork.",
  },
  {
    title: "We Build Engines",
    description:
      "Repeatable growth systems that compound — not one-off campaigns that fade.",
  },
  {
    title: "We Measure Everything",
    description:
      "Every initiative tied to a KPI. We live and breathe outcomes, not outputs.",
  },
];

/* ── Amber person + soundwave icon ──────────────────────────────────────── */
function RowIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" style={{ flexShrink: 0 }}>
      {/* Head */}
      <circle cx="22" cy="18" r="7.5" stroke="#FFA600" strokeWidth="1.8" />
      {/* Body arc */}
      <path
        d="M8 46c0-7.732 6.268-14 14-14s14 6.268 14 14"
        stroke="#FFA600"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Sound waves */}
      <path
        d="M36 20c1.6 1.9 2.4 4.1 2 6.5"
        stroke="#FFA600"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M39.5 16.5c3 3.5 4 7.8 2.5 12"
        stroke="#FFA600"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Single accordion row ────────────────────────────────────────────────── */
function AccordionRow({
  row,
  isActive,
  onHover,
  delay,
}: {
  row: (typeof ROWS)[number];
  isActive: boolean;
  onHover: () => void;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.55, ease: EASE, delay }}
      onMouseEnter={onHover}
      style={{
        position: "relative",
        borderRadius: 20,
        padding: 28,
        cursor: "default",
        overflow: "hidden",
        boxSizing: "border-box",
        /* Active: full width. Inactive: inset 28px each side */
        width: isActive ? "100%" : "calc(100% - 56px)",
        alignSelf: "center",
        /* Background */
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        background: isActive ? "rgba(27,97,219,0.15)" : "rgba(0,0,0,0.8)",
        border: isActive ? "none" : "1px solid rgba(255,255,255,0.1)",
        transition: "width 0.45s cubic-bezier(0.22,1,0.36,1), background 0.35s ease",
      }}
    >
      {/* Blue corner glow — active only */}
      {isActive && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 254,
            height: 108,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: "rotate(90deg)",
              backgroundImage:
                "linear-gradient(68.37deg, rgba(27,97,219,0.25) 0.14%, rgba(27,97,219,0) 53.96%)",
            }}
          />
        </div>
      )}

      {/* Row content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left: icon + title */}
        <div style={{ display: "flex", alignItems: "center", gap: 40, flex: "1 0 0", minWidth: 0 }}>
          <RowIcon />
          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 700,
              fontSize: 22,
              lineHeight: "36px",
              color: "#ffffff",
              letterSpacing: "-0.44px",
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            {row.title}
          </p>
        </div>

        {/* Right: description (active only) */}
        <AnimatePresence>
          {isActive && (
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.35, ease: EASE, delay: 0.1 }}
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 400,
                fontSize: 15,
                lineHeight: "26px",
                color: "#ffffff",
                letterSpacing: "-0.3px",
                margin: 0,
                width: 466,
                flexShrink: 0,
              }}
            >
              {row.description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ── Main export ─────────────────────────────────────────────────────────── */
export function AboutEcosystemAccordionSection() {
  const [activeIndex, setActiveIndex] = useState(1); // row 2 active by default (matches Figma)

  return (
    <section
      style={{
        width: "100%",
        maxWidth: 1180,
        margin: "0 auto",
        padding: "0 24px",
        boxSizing: "border-box",
      }}
    >
      {/* ── Header: heading (left) + line + tag (right) ── */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 60,
        }}
      >
        {/* Heading */}
        <p
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: 48,
            lineHeight: 1.36,
            margin: 0,
            textTransform: "capitalize",
            maxWidth: 698,
          }}
        >
          <span style={{ fontWeight: 600, color: "#ffffff" }}>Lorem Ipsum Is </span>
          <span style={{ fontWeight: 600, color: "#8e8e8e" }}>Simply Dummy Is </span>
          <span style={{ fontWeight: 300, color: "#8e8e8e" }}>Text Lorem Typesetting</span>
        </p>

        {/* Line + tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            paddingTop: 16,
            width: 245,
            flexShrink: 0,
          }}
        >
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.2)" }} />
          <div
            style={{
              background: "#111",
              border: "1px solid #414141",
              borderRadius: 40,
              padding: "6px 20px",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: 13,
                color: "#FFA600",
                whiteSpace: "nowrap",
              }}
            >
              Ecosystem
            </span>
          </div>
        </div>
      </div>

      {/* ── Accordion rows ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "stretch",
        }}
      >
        {ROWS.map((row, i) => (
          <AccordionRow
            key={i}
            row={row}
            isActive={activeIndex === i}
            onHover={() => setActiveIndex(i)}
            delay={i * 0.08}
          />
        ))}
      </div>
    </section>
  );
}
