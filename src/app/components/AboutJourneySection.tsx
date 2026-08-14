/* ─────────────────────────────────────────────────────────────────────────────
   AboutJourneySection — Section 7 of About Us page
   Figma: node 11418-1723

   Layout:
   ┌──────────────────────────────────────────────────────┐
   │  Get in Touch  dummy text is          [Journey tag]  │
   │                                                      │
   │  [Col 1 active]  [Col 2 faded]  [Col 3 very faded] ▓▓│ ← gradient fade
   │  body text       body text      body text            │
   │  Title           Title          Title                 │
   │  ─── (blue)      ─── (gray)     ─── (gray)           │
   │  ────────────────────────────── ← / → arrows right   │
   │  [Active card 624px] [card] [card] [card]  overflow ▓▓│
   └──────────────────────────────────────────────────────┘

   Animation:
   • Nav window: shows activeIndex, +1, +2 items. On prev/next, content
     slides out in direction of travel (x ±30), new content slides in.
   • Cards: layoutId per card — framer-motion transitions 624px ↔ flex-1
   • Entrance: y 60→0 applied by parent in AboutUsPage
   ───────────────────────────────────────────────────────────────────────────── */
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { useCmsSectionContent } from "../context/CmsSectionContext";

const EASE = [0.22, 1, 0.36, 1] as const;

const DEFAULT_ITEMS = [
  {
    id: "journey-1",
    date: "Sept 2020",
    label: "The Beginning",
    title: "Two Products. One Big Dream.",
    detail: "Built Vegigo, a hyperlocal ecommerce platform. Built an all-in-one restaurant management solution. Building was our profession. Zero marketing knowledge. Maximum optimism.",
  },
  {
    id: "journey-2",
    date: "Dec 2021",
    label: "The Hard Truth",
    title: "Great Product. Terrible Growth. Classic Failure.",
    detail: "Went to market with 2 products. Got ignored. Hired agencies. Got reports, decks, and invoices. Numbers never moved. Finance shook. Started learning marketing from scratch, out of necessity.",
  },
  {
    id: "journey-3",
    date: "June 2022",
    label: "The Gap Found",
    title: "Effort vs Outcome. Nobody Was Talking About This.",
    detail: "Tasks were completed. Budgets were spent. Results did not show up. Named the real problem: nobody owned the outcome. That one insight became the founding principle of Hexanovate.",
  },
  {
    id: "journey-4",
    date: "Dec 2022 – Dec 2023",
    label: "Proof Found",
    title: "What Worked For Us, Worked For Them Too.",
    detail: "Onboarded clients. Applied everything learned the hard way. Worked with 40+ businesses across 12 domains. Became the primary growth driver for several of them. Combined revenue influenced: INR 12Cr+ across active partnerships.",
  },
  {
    id: "journey-5",
    date: "May – Nov 2024",
    label: "Going Deep",
    title: "Twelve Domains Was Ambition. Three Is Mastery.",
    detail: "Niched down to 3 domains with proven, significant impact. Sept 2024: ThirdMeta launched for B2B businesses. Nov 2024: NativeUnit launched for D2C and FMCG brands. Client retention after niching down: 91%",
  },
  {
    id: "journey-6",
    date: "April 2025",
    label: "New Category",
    title: "Ed-Tech Needed This. We Built It.",
    detail: "EduHexa launched as India's first independent AI Smart Classroom consultancy. Not a reseller. Not an agency. A neutral expert. 35+ institutions audited within the first 6 months of launch.",
  },
  {
    id: "journey-7",
    date: "Oct 2025 – April 2026",
    label: "Full Ownership",
    title: "Marketing And Sales. Owned End To End.",
    detail: "Expanded into complete sales ownership for select partner businesses. 30+ active partnerships across all 3 verticals right now. 140+ businesses impacted since day one. INR 50Cr+ in revenue influenced across all client businesses.",
  },
];

/* ── Arrow button — muted default, blue on hover ─────────────────────────── */
function ArrowBtn({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 36,
        height: 36,
        borderRadius: 30,
        border: `1px solid ${hovered ? "#1b61db" : "#414141"}`,
        background: hovered ? "rgba(27,97,219,0.12)" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        flexShrink: 0,
        transition: "border-color 0.2s, background 0.2s",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        {direction === "left" ? (
          <path
            d="M9 11L5 7L9 3"
            stroke={hovered ? "#1b61db" : "#5a5a5a"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: "stroke 0.2s" }}
          />
        ) : (
          <path
            d="M5 3L9 7L5 11"
            stroke={hovered ? "#1b61db" : "#5a5a5a"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: "stroke 0.2s" }}
          />
        )}
      </svg>
    </button>
  );
}

/* ── Nav column (animated on slide) ─────────────────────────────────────── */
function NavColumn({
  item,
  isActive,
  direction,
  animKey,
  onClick,
}: {
  item: (typeof ITEMS)[0];
  isActive: boolean;
  direction: "left" | "right";
  animKey: string;
  onClick: () => void;
}) {
  return (
    <div
      style={{ flex: 1, minWidth: 0, cursor: "pointer" }}
      onClick={onClick}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={animKey}
          initial={{ opacity: 0, x: direction === "right" ? 24 : -24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction === "right" ? -24 : 24 }}
          transition={{ duration: 0.35, ease: EASE }}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 200,
              fontSize: 13,
              lineHeight: "20px",
              color: isActive ? "#FFA600" : "#363636",
              margin: 0,
              transition: "color 0.3s",
              whiteSpace: "nowrap",
            }}
          >
            {item.date} · {item.label}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <p
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 600,
                fontSize: 16,
                lineHeight: "22px",
                color: isActive ? "#ffffff" : "#555555",
                margin: 0,
              }}
            >
              {item.title}
            </p>
            <div
              style={{
                width: 24,
                height: 2,
                borderRadius: 1,
                background: isActive ? "#1b61db" : "#363636",
                transition: "background 0.3s",
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ── Main export ─────────────────────────────────────────────────────────── */
export function AboutJourneySection() {
  const { items: cmsItems } = useCmsSectionContent();
  const ITEMS = cmsItems.length > 0
    ? cmsItems.map((item, i) => ({
        id:     `journey-${i + 1}`,
        date:   String(item.date   ?? ""),
        label:  String(item.label  ?? ""),
        title:  String(item.title  ?? ""),
        detail: String(item.detail ?? ""),
      }))
    : DEFAULT_ITEMS;
  const TOTAL = ITEMS.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth <= 1024 : false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const go = (delta: 1 | -1) => {
    setDirection(delta === 1 ? "right" : "left");
    setActiveIndex((i) => (i + delta + TOTAL) % TOTAL);
  };

  /* Nav shows a window of 3: activeIndex, +1, +2 */
  const navWindow = [0, 1, 2].map((offset) => ({
    item: ITEMS[(activeIndex + offset) % TOTAL],
    isActive: offset === 0,
    animKey: `nav-${offset}-${(activeIndex + offset) % TOTAL}`,
  }));

  /* Cards: active first, rest in original order */
  const orderedCards = [
    ITEMS[activeIndex],
    ...ITEMS.filter((_, i) => i !== activeIndex),
  ];

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
      {/* ── Header row ── */}
      <div
        style={{
          display: "flex",
          alignItems: isMobile ? "flex-start" : "center",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          gap: isMobile ? 12 : 0,
          marginBottom: isMobile ? 32 : 48,
        }}
      >
        <p
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: isMobile ? "clamp(24px, 6vw, 36px)" : 40,
            lineHeight: 1.44,
            margin: 0,
            textTransform: "capitalize",
          }}
        >
          <span style={{ fontWeight: 700, color: "#ffffff" }}>Honestly, </span>
          <span style={{ fontWeight: 300, color: "#8e8e8e" }}>It Was Not A Straight Line.</span>
        </p>
        {/* Journey tag */}
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
            Built From The Trenches
          </span>
        </div>
      </div>

      {/* ── Nav area ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: isMobile ? 24 : 36 }}>
        {/* Nav columns — 3 on desktop, 1 (active only) on mobile */}
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", gap: isMobile ? 0 : 48, alignItems: "flex-start" }}>
            {(isMobile ? navWindow.slice(0, 1) : navWindow).map(({ item, isActive, animKey }, idx) => (
              <NavColumn
                key={`col-${idx}`}
                item={item}
                isActive={isActive}
                direction={direction}
                animKey={animKey}
                onClick={() => {
                  if (!isActive) {
                    setDirection("right");
                    setActiveIndex((activeIndex + idx) % TOTAL);
                  }
                }}
              />
            ))}
          </div>
          {/* Right fade gradient — desktop only */}
          {!isMobile && (
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                height: "100%",
                width: 320,
                background: "linear-gradient(to right, rgba(10,10,10,0), #0a0a0a)",
                pointerEvents: "none",
              }}
            />
          )}
        </div>

        {/* Divider + progress line + arrows */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* Lines area */}
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
            {/* Full width thin line */}
            <div
              style={{ height: 1, background: "rgba(255,255,255,0.12)", width: "100%" }}
            />
            {/* Blue progress indicator — advances each step: 1/4, 2/4, 3/4, 4/4 */}
            <motion.div
              style={{ height: 2, background: "#1b61db", borderRadius: 1 }}
              animate={{ width: `${((activeIndex + 1) / TOTAL) * 100}%` }}
              transition={{ duration: 0.4, ease: EASE }}
            />
          </div>
          {/* Arrows */}
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
            <ArrowBtn direction="left" onClick={() => go(-1)} />
            <ArrowBtn direction="right" onClick={() => go(1)} />
          </div>
        </div>
      </div>

      {/* ── Cards row ── */}
      <div style={{ overflow: "hidden" }}>
        {isMobile ? (
          /* Mobile: only show active card, full width */
          <motion.div
            key={orderedCards[0].id}
            initial={{ opacity: 0, x: direction === "right" ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            style={{
              height: 260,
              borderRadius: 20,
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              background: "rgba(210, 210, 210, 0.2)",
              overflow: "hidden",
              position: "relative",
              width: "100%",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: 24,
                right: 24,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 200, fontSize: 12, color: "#FFA600", margin: 0 }}>
                {orderedCards[0].date} · {orderedCards[0].label}
              </p>
              <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 18, color: "#ffffff", margin: 0 }}>
                {orderedCards[0].title}
              </p>
              <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 200, fontSize: 13, lineHeight: "20px", color: "rgba(255,255,255,0.7)", margin: 0 }}>
                {orderedCards[0].detail}
              </p>
            </div>
          </motion.div>
        ) : (
          <LayoutGroup id="journey-cards">
            <motion.div style={{ display: "flex", gap: 20, alignItems: "stretch" }}>
              {orderedCards.map((item, idx) => {
                const isActive = idx === 0;
                return (
                  <motion.div
                    key={item.id}
                    layoutId={item.id}
                    layout
                    onClick={() => {
                      if (!isActive) {
                        setDirection("right");
                        setActiveIndex(ITEMS.findIndex((it) => it.id === item.id));
                      }
                    }}
                    style={{
                      height: 340,
                      borderRadius: 20,
                      backdropFilter: "blur(40px)",
                      WebkitBackdropFilter: "blur(40px)",
                      background: "rgba(210, 210, 210, 0.2)",
                      flexShrink: isActive ? 0 : 1,
                      width: isActive ? 624 : undefined,
                      flex: isActive ? undefined : "1 0 0",
                      minWidth: isActive ? undefined : 0,
                      cursor: isActive ? "default" : "pointer",
                      overflow: "hidden",
                      position: "relative",
                    }}
                    transition={{ duration: 0.55, ease: EASE }}
                  >
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        style={{ position: "absolute", bottom: 28, left: 28, display: "flex", flexDirection: "column", gap: 4 }}
                      >
                        <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 200, fontSize: 12, color: "#FFA600", margin: 0 }}>
                          {item.date} · {item.label}
                        </p>
                        <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 20, color: "#ffffff", margin: 0 }}>
                          {item.title}
                        </p>
                        <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 200, fontSize: 13, lineHeight: "20px", color: "rgba(255,255,255,0.7)", margin: 0, maxWidth: 280 }}>
                          {item.detail}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </LayoutGroup>
        )}
      </div>
    </section>
  );
}
