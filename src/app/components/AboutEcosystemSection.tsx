/* ─────────────────────────────────────────────────────────────────────────────
   AboutEcosystemSection — Between Section 8 (Contact) and Section 9 (Team)
   Figma: node 11456-5096

   Layout:
   ┌──────────────────────────────────────────────────────────────────────────┐
   │               [Ecosystem]  tag centered                                  │
   │   Lorem Ipsum Is  Simply Dummy Is  Text Lorem Typesetting  (48px center) │
   │                                                                          │
   │  [icon] Item 1 ← indented 96px →     ← indented 96px → Item 1 [icon]   │
   │  [icon] Item 2 ← indented 32px →     ← indented 32px → Item 2 [icon]   │
   │  [icon] Item 3  (flush left)           (flush right) Item 3 [icon]      │
   │                    ┌───────────────┐                                     │
   │                    │  center image │  (absolutely positioned, centered)  │
   │                    └───────────────┘                                     │
   └──────────────────────────────────────────────────────────────────────────┘

   Items cascade inward: top items are closest to center (large indent),
   bottom items are furthest (no indent) — creating a funnel shape.
   ───────────────────────────────────────────────────────────────────────────── */
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import imgCenterSrc from "@/assets/ecosystem-center.jpg";
import { useCmsSectionContent } from "../context/CmsSectionContext";

const IMG_CENTER = imgCenterSrc;

const EASE = [0.22, 1, 0.36, 1] as const;
const VP = { once: true, margin: "-80px" } as const;

/* ── Atom/network icon (blue outlined circle) ────────────────────────────── */
function EcoIcon() {
  return (
    <div
      style={{
        width: 29,
        height: 30,
        borderRadius: "50%",
        border: "1px solid #1b61db",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
        <circle cx="8.5" cy="8.5" r="2" stroke="#1b61db" strokeWidth="1.1" />
        <ellipse cx="8.5" cy="8.5" rx="6.5" ry="2.8" stroke="#1b61db" strokeWidth="1.1" />
        <ellipse
          cx="8.5"
          cy="8.5"
          rx="6.5"
          ry="2.8"
          stroke="#1b61db"
          strokeWidth="1.1"
          transform="rotate(60 8.5 8.5)"
        />
        <ellipse
          cx="8.5"
          cy="8.5"
          rx="6.5"
          ry="2.8"
          stroke="#1b61db"
          strokeWidth="1.1"
          transform="rotate(120 8.5 8.5)"
        />
      </svg>
    </div>
  );
}

/* ── Single feature item ─────────────────────────────────────────────────── */
function FeatureItem({
  title,
  body,
  align,
  indent,
  delay,
}: {
  title: string;
  body: string;
  align: "left" | "right";
  indent: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VP}
      transition={{ duration: 0.65, ease: EASE, delay }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        paddingLeft: align === "left" ? indent : 0,
        paddingRight: align === "right" ? indent : 0,
        textAlign: align,
      }}
    >
      {/* Icon + title row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          justifyContent: align === "right" ? "flex-end" : "flex-start",
        }}
      >
        {align === "left" && <EcoIcon />}
        <p
          style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 500,
            fontSize: 15,
            lineHeight: "24px",
            color: "#ffffff",
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </p>
        {align === "right" && <EcoIcon />}
      </div>
      {/* Body */}
      <p
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 300,
          fontSize: 15,
          lineHeight: "22px",
          color: "#747474",
          margin: 0,
        }}
      >
        {body}
      </p>
    </motion.div>
  );
}

/* ── Data ────────────────────────────────────────────────────────────────── */
const DEFAULT_LEFT_ITEMS = [
  { title: "Everything Talks To Everything", body: "No siloed strategies. Every function, signal and system connects so nothing compounds in isolation." },
  { title: "Human Wit. Machine Scale.", body: "Human intelligence sets the direction. AI and automation handle the volume. Neither works without the other." },
  { title: "Strategy That Actually Executes", body: "A plan without ownership is just a document. We stay until the strategy shows up in the number." },
];

const DEFAULT_RIGHT_ITEMS = [
  { title: "We Own The Outcome", body: "Not the tasks. Not the deliverables. The actual result. That shift changes every decision we make." },
  { title: "Agility Is Non-Negotiable", body: "Markets move fast. We move faster. Experiments, pivots and decisions happen at the speed of opportunity." },
  { title: "Your World. Our Blueprint.", body: "We do not fit you into a template. We build the entire system around how your business actually works." },
];

// Indent levels per row: top = most indented (closest to center), bottom = flush
const INDENTS = [96, 32, 0];

/* ── Main export ─────────────────────────────────────────────────────────── */
export function AboutEcosystemSection() {
  const { items: cmsItems } = useCmsSectionContent();
  const leftItems = cmsItems.length >= 6
    ? cmsItems.slice(0, 3).map(item => ({ title: String(item.title ?? ""), body: String(item.body ?? item.description ?? "") }))
    : DEFAULT_LEFT_ITEMS;
  const rightItems = cmsItems.length >= 6
    ? cmsItems.slice(3, 6).map(item => ({ title: String(item.title ?? ""), body: String(item.body ?? item.description ?? "") }))
    : DEFAULT_RIGHT_ITEMS;

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
        maxWidth: 1180,
        margin: "0 auto",
        padding: "0 24px",
        boxSizing: "border-box",
      }}
    >
      {/* ── Header: tag + heading ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          marginBottom: 68,
        }}
      >
        {/* Tag pill */}
        <div
          style={{
            background: "#111",
            border: "1px solid #414141",
            borderRadius: 40,
            padding: "6px 20px",
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
            The Ecosystem Model
          </span>
        </div>

        {/* Heading */}
        <p
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: 48,
            lineHeight: 1.36,
            margin: 0,
            textAlign: "center",
            textTransform: "capitalize",
            maxWidth: 698,
          }}
        >
          <span style={{ fontWeight: 600, color: "#ffffff" }}>Fair Warning. </span>
          <span style={{ fontWeight: 300, color: "#8e8e8e" }}>Once You See How This Works, </span>
          <span style={{ fontWeight: 600, color: "#ffffff" }}>You Will Wonder Why You Did Not Do This Sooner.</span>
        </p>
      </div>

      {/* ── Items + center image ── */}
      {isMobile ? (
        /* Mobile: single column, no center image */
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {[...leftItems, ...rightItems].map((item, i) => (
            <FeatureItem
              key={`mobile-${i}`}
              title={item.title}
              body={item.body}
              align="left"
              indent={0}
              delay={i * 0.1}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* LEFT column */}
          <div
            style={{
              width: 300,
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              gap: 74,
            }}
          >
            {leftItems.map((item, i) => (
              <FeatureItem
                key={`left-${i}`}
                title={item.title}
                body={item.body}
                align="left"
                indent={INDENTS[i]}
                delay={i * 0.1}
              />
            ))}
          </div>

          {/* RIGHT column */}
          <div
            style={{
              width: 300,
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              gap: 74,
              alignItems: "flex-end",
            }}
          >
            {rightItems.map((item, i) => (
              <FeatureItem
                key={`right-${i}`}
                title={item.title}
                body={item.body}
                align="right"
                indent={INDENTS[i]}
                delay={i * 0.1 + 0.05}
              />
            ))}
          </div>

          {/* Center video — absolutely positioned between the columns */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 60,
              transform: "translateX(-50%)",
              width: 514,
              pointerEvents: "none",
            }}
          >
            <video
              src="https://sienna-pelican-786032.hostingersite.com/wp-content/uploads/2026/03/grok-video-a978f241-92f5-4740-bf2c-d5003cd71847.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "cover",
              }}
            />
            {/* Fade all edges into bg */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to bottom, #0a0a0a 0%, transparent 30%, transparent 70%, #0a0a0a 100%)" }} />
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to right, #0a0a0a 0%, transparent 30%, transparent 70%, #0a0a0a 100%)" }} />
          </div>
        </div>
      )}
    </section>
  );
}
