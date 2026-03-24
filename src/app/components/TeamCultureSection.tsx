import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, type MotionValue } from "motion/react";
import { useState, useEffect, useRef, useCallback } from "react";
import svgPaths from "../../imports/svg-9mxiszov0f";
import img1  from "@/assets/393466a8f00e06a6dea5f6fbcd4d2c2de7939ace.png";
import img2  from "@/assets/ea697fd1c8734ef50383a75ad5b573e938d827a7.png";
import img3  from "@/assets/069f59e29dcfa5fdf46d9b87bab576654e88b958.png";
import img4  from "@/assets/eec164b068f12d93431a8bacd150bf580ca70702.png";
import img5  from "@/assets/efd98944bc6f56588be3895179bc887a6f605839.png";
import img6  from "@/assets/3ef0c2306bfbc4191425edd723ba9de0447ca13b.png";
import img7  from "@/assets/41c0422ed85993e6c6e32ab7f0dbec890b778a42.png";
import img8  from "@/assets/848a8f3f3ccf5c02594ef185d8f3c463e8934575.png";
import img9  from "@/assets/7b03408bcffa240a069a479d7048ae964cb0e0cc.png";
import img10 from "@/assets/08ad4b6dca12bdd8a662a5973390d31479223094.png";

/* ─── CONSTANTS ────────────────────────────────────────────────────────── */
const SLIDE_DURATION = 5000;
const NUM_SLIDES = 10;
const CARD_W = 259;
const CARD_H = 300;
const MOBILE_CARD_W = 220;
const MOBILE_CARD_H = 270;

/* ─── SLIDE ANIMATION VARIANTS ───────────────────────────────────────────── */
const activeCardVariants = {
  enter: (dir: "next" | "prev") => ({
    x: dir === "next" ? CARD_W + 48 : -(CARD_W + 48),
    y: 40, scale: 0.78, opacity: 0,
  }),
  center: { x: 0, y: 0, scale: 1, opacity: 1 },
  exit: (dir: "next" | "prev") => ({
    x: dir === "next" ? -(CARD_W + 48) : CARD_W + 48,
    y: 28, scale: 0.82, opacity: 0,
  }),
};

const nextCardVariants = {
  enter: (dir: "next" | "prev") => ({
    x: dir === "next" ? CARD_W + 48 : -(CARD_W + 48),
    y: 20, scale: 0.88, opacity: 0,
  }),
  center: { x: 0, y: 0, scale: 1, opacity: 1 },
  exit: (dir: "next" | "prev") => ({
    x: dir === "next" ? -(CARD_W + 48) : CARD_W + 48,
    y: 14, scale: 0.90, opacity: 0,
  }),
};

const activeSpring = { type: "spring" as const, stiffness: 145, damping: 22, mass: 1.6 };
const nextSpring   = { type: "spring" as const, stiffness: 185, damping: 24, mass: 1.2 };
const mobileSpring = { type: "spring" as const, stiffness: 280, damping: 32, mass: 0.9 };

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

/* ─── SLIDE DATA ─────────────────────────────────���──────────────────────── */
const slides = [
  { img: img1,  label: "Arjun Mehta",       desc: ["Co-Founder & CEO",           "Visionary growth strategist"] },
  { img: img2,  label: "Rohan Sharma",       desc: ["Head of Performance",        "Paid media & funnel expert"] },
  { img: img3,  label: "Priya Nair",         desc: ["Creative Director",          "Brand identity & storytelling"] },
  { img: img4,  label: "Vikram Desai",       desc: ["SEO & Content Lead",         "Organic reach architect"] },
  { img: img5,  label: "Faiz Ansari",        desc: ["Social Media Strategist",    "Community & engagement driver"] },
  { img: img6,  label: "Karan Joshi",        desc: ["B2B Marketing Manager",      "Account-based growth leader"] },
  { img: img7,  label: "Nikhil Patel",       desc: ["Data & Analytics Head",      "Insight-driven decision maker"] },
  { img: img8,  label: "Rahul Verma",        desc: ["Video & Content Producer",   "High-impact visual storyteller"] },
  { img: img9,  label: "Aditya Kapoor",      desc: ["Client Success Manager",     "Long-term retention specialist"] },
  { img: img10, label: "Sneha Rajput",       desc: ["Brand & PR Strategist",      "Media relations & reputation"] },
];

/* ─── DIAGONAL ARROW SVG ─────────────────────────────────────────────────── */
function DiagonalArrowSvg({ color }: { color: string }) {
  return (
    <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 13.7713 13.7713">
      <path d={svgPaths.p39950e00} fill={color} stroke={color} />
    </svg>
  );
}

function ArrowIcon({ color }: { color: string }) {
  return (
    <div style={{ width: 12, height: 12, overflow: "hidden", position: "relative", flexShrink: 0 }}>
      <div style={{ position: "absolute", inset: "5%" }}>
        <div style={{ position: "absolute", inset: "-13.07% -13.07% -14.44% -14.44%" }}>
          <DiagonalArrowSvg color={color} />
        </div>
      </div>
    </div>
  );
}

/* ─── PREV / NEXT NAV BUTTONS ────────────────────────────────────────────── */
function PrevArrowBtn({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      style={{
        width: 36, height: 36, borderRadius: 30,
        border: "1px solid #1b61db",
        background: hov ? "rgba(27,97,219,0.12)" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", flexShrink: 0, position: "relative",
        transition: "background 0.2s",
      }}
    >
      <div style={{ width: 16.971, height: 16.971, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: "rotate(45deg)" }}><ArrowIcon color="#1B61DB" /></div>
      </div>
    </motion.button>
  );
}

function NextArrowBtn({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      style={{
        width: 36, height: 36, borderRadius: 30,
        background: hov ? "#2470f0" : "#1b61db",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", flexShrink: 0,
        transition: "background 0.2s",
      }}
    >
      <div style={{ width: 16.971, height: 16.971, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: "rotate(135deg) scaleY(-1)" }}><ArrowIcon color="white" /></div>
      </div>
    </motion.button>
  );
}

/* ─── PROGRESS BAR ───────────────────────────────────────────────────────── */
function ProgressBar({ slideKey }: { slideKey: number }) {
  return (
    <div style={{ flex: "1 0 0", position: "relative", height: 3, minWidth: 0 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: "50%", transform: "translateY(-50%)", height: 2, background: "#111", borderRadius: 2 }} />
      <motion.div
        key={slideKey}
        style={{ position: "absolute", left: 20, top: 0, bottom: 0, background: "#1B61DB", borderRadius: 99, transformOrigin: "left center" }}
        initial={{ width: 0 }}
        animate={{ width: "calc(100% - 20px)" }}
        transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
      />
    </div>
  );
}

/* ─── CARD LABEL ─────────────────────────────────────────────────────────── */
function CardLabel({ text, isActive, textColor, compact = false }: { text: string; isActive: boolean; textColor: string; compact?: boolean }) {
  return (
    <div
      style={{
        flex: "1 0 0", borderRadius: 44,
        background: isActive ? "white" : "#111",
        backdropFilter: isActive ? "blur(25px)" : undefined,
        WebkitBackdropFilter: isActive ? "blur(25px)" : undefined,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: compact ? "5px 14px" : "7px 24px",
        position: "relative",
      }}
    >
      <span
        style={{
          fontFamily: "Manrope, sans-serif",
          fontWeight: isActive ? 600 : 400,
          fontSize: compact ? 13 : 16,
          lineHeight: compact ? "20px" : "26px",
          color: textColor,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </span>
    </div>
  );
}

/* ─── CAROUSEL CARD ──────────────────────────────────────────────────────── */
type CardSlot = "prev" | "active" | "next1" | "next2" | "next3";

interface CardConfig {
  overlayBg?: string;
  blurAmount: number;
  border?: string;
  textColor: string;
  isActive: boolean;
}

function getCardConfig(slot: CardSlot): CardConfig {
  switch (slot) {
    case "prev":   return { overlayBg: "rgba(0,0,0,0.55)", blurAmount: 0, textColor: "#b0b0b0", isActive: false };
    case "active": return { blurAmount: 0, textColor: "black", isActive: true };
    case "next1":  return { overlayBg: "rgba(0,0,0,0.30)", blurAmount: 0, border: "#4c4c4c", textColor: "#b0b0b0", isActive: false };
    case "next2":  return { overlayBg: "rgba(0,0,0,0.45)", blurAmount: 0, textColor: "#707070", isActive: false };
    case "next3":  return { overlayBg: "rgba(0,0,0,0.60)", blurAmount: 0, textColor: "#707070", isActive: false };
  }
}

interface CarouselCardProps {
  img: string;
  label: string;
  slot: CardSlot;
  onClick?: () => void;
  raised?: boolean;
  cardW?: number;
  cardH?: number;
  compact?: boolean;
}

function CarouselCard({ img, label, slot, onClick, raised, cardW = CARD_W, cardH = CARD_H, compact = false }: CarouselCardProps) {
  const cfg = getCardConfig(slot);
  return (
    <motion.div
      onClick={onClick}
      whileHover={!cfg.isActive ? { scale: 1.02 } : undefined}
      style={{
        width: cardW, height: cardH, borderRadius: 16, flexShrink: 0,
        position: "relative", display: "flex", flexDirection: "column",
        justifyContent: "flex-end", padding: "32px 12px 12px 12px",
        cursor: !cfg.isActive && onClick ? "pointer" : "default",
        marginBottom: raised ? 28 : 0,
      }}
    >
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, borderRadius: 16, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 0, background: "#e5e5e5", borderRadius: 16 }} />
        <img alt="" src={img} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: 16, maxWidth: "none" }} />
        {cfg.overlayBg && (
          <div style={{ position: "absolute", inset: 0, background: cfg.overlayBg, backdropFilter: `blur(${cfg.blurAmount}px)`, WebkitBackdropFilter: `blur(${cfg.blurAmount}px)`, borderRadius: 16 }} />
        )}
        {cfg.border && (
          <div style={{ position: "absolute", inset: 0, border: `1px solid ${cfg.border}`, borderRadius: 16, pointerEvents: "none" }} />
        )}
      </div>
      <div style={{ display: "flex", position: "relative" }}>
        <CardLabel text={label} isActive={cfg.isActive} textColor={cfg.textColor} compact={compact} />
      </div>
    </motion.div>
  );
}

/* ─── TEAM & CULTURE BADGE ───────────────────────────────────────────────── */
function TeamCultureBadge() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", width: 245, flexShrink: 0 }}>
      <div style={{ flex: "1 0 0", height: 1, background: "#111111", minWidth: 0 }} />
      <div style={{ background: "#111", borderRadius: 40, padding: "6px 20px", display: "inline-flex", alignItems: "center", justifyContent: "center", position: "relative", flexShrink: 0 }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, border: "1px solid #414141", borderRadius: 40, pointerEvents: "none" }} />
        <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 13, color: "#ffa600", lineHeight: "normal", whiteSpace: "nowrap", position: "relative" }}>
          Team &amp; Culture
        </span>
      </div>
    </div>
  );
}

/* ─── SECTION TITLE ──────────────────────────────────────────────────────── */
function RevealWord({ text, weight, color, progress, range }: { text: string; weight: number; color: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity, fontWeight: weight, color }}>{text}</motion.span>;
}

function SectionTitle() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.3"] });
  return (
    <div ref={ref}>
      <p
        className="wcu-section-title"
        style={{ fontFamily: "Manrope, sans-serif", fontSize: "clamp(24px, 3.2vw, 38px)", lineHeight: 1.3, color: "white", width: 670, maxWidth: "90vw", margin: 0, textTransform: "capitalize" }}
      >
        <RevealWord text="Brilliant"  weight={700} color="white"   progress={scrollYProgress} range={[0, 0.12]} />{" "}
        <RevealWord text="People"  weight={700} color="white"   progress={scrollYProgress} range={[0.08, 0.2]} />{" "}
        <RevealWord text="Do"     weight={300} color="#8e8e8e"   progress={scrollYProgress} range={[0.16, 0.28]} />{" "}
        <RevealWord text="Brilliant" weight={700} color="white" progress={scrollYProgress} range={[0.24, 0.36]} />{" "}
        <RevealWord text="Things." weight={700} color="white" progress={scrollYProgress} range={[0.32, 0.44]} />{" "}
        <RevealWord text="We" weight={300} color="#8e8e8e" progress={scrollYProgress} range={[0.40, 0.52]} />{" "}
        <RevealWord text="Just" weight={300} color="#8e8e8e" progress={scrollYProgress} range={[0.48, 0.60]} />{" "}
        <RevealWord text="Made" weight={300} color="#8e8e8e" progress={scrollYProgress} range={[0.56, 0.68]} />{" "}
        <RevealWord text="Sure" weight={300} color="#8e8e8e" progress={scrollYProgress} range={[0.64, 0.76]} />{" "}
        <RevealWord text="to" weight={300} color="#8e8e8e" progress={scrollYProgress} range={[0.72, 0.84]} />{" "}
        <RevealWord text="Hire" weight={700} color="white" progress={scrollYProgress} range={[0.80, 0.92]} />{" "}
        <RevealWord text="Them" weight={700} color="white" progress={scrollYProgress} range={[0.84, 0.96]} />{" "}
        <RevealWord text="First." weight={700} color="white" progress={scrollYProgress} range={[0.88, 1]} />
      </p>
    </div>
  );
}

/* ─── MOBILE CENTERED PEEK CAROUSEL ─────────────────────────────────────── */
/*
 * Active card is always centered.
 * peek = clamp(40, cw × 0.13, 90) — scales up with screen width so the
 * side-card offset DECREASES as the viewport grows (more card visible).
 * gap = cw/2 − CARD_W/2 − peek — adjusts so the peek amount stays correct.
 * Direction-aware AnimatePresence: new cards spring in from the correct side,
 * old cards fade out instantly to avoid z-fight.
 * Touch-swipe support via onTouchStart/onTouchEnd.
 */
function MobileCarousel({
  active,
  slideKey,
  direction,
  goNext,
  goPrev,
}: {
  active: number;
  slideKey: number;
  direction: "next" | "prev";
  goNext: () => void;
  goPrev: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cw, setCw] = useState(360);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setCw(containerRef.current.offsetWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Peek increases with screen width → side-card offset decreases ✓
  const peek = Math.max(40, Math.min(cw * 0.13, 90));
  const gap  = Math.max(10, cw / 2 - MOBILE_CARD_W / 2 - peek);

  // Slot x positions (left edge of each card)
  const xA  = cw / 2 - MOBILE_CARD_W / 2;       // active — centered
  const xP  = xA - gap - MOBILE_CARD_W;          // prev   — left side
  const xN  = xA + MOBILE_CARD_W + gap;          // next   — right side
  const xOL = xP - MOBILE_CARD_W - 40;           // off-screen left
  const xOR = xN + MOBILE_CARD_W + 40;           // off-screen right

  const prevIdx = mod(active - 1, NUM_SLIDES);
  const nextIdx = mod(active + 1, NUM_SLIDES);

  // Entry positions — captured from direction at mount time
  const initPrev   = direction === "next" ? xA  : xOL;
  const initActive = direction === "next" ? xN  : xP;
  const initNext   = direction === "next" ? xOR : xA;

  const touchStartX = useRef(0);
  const fadeOut = { opacity: 0, transition: { duration: 0.15 } };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 24 }}>

      {/* ── Card viewport ── */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          overflow: "hidden",
          height: MOBILE_CARD_H,
          width: "100%",
          userSelect: "none",
          touchAction: "pan-y",
        }}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const dx = touchStartX.current - e.changedTouches[0].clientX;
          if (dx > 50) goNext();
          else if (dx < -50) goPrev();
        }}
      >
        {/* Prev card */}
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={`p-${slideKey}`}
            style={{ position: "absolute", top: 0, width: MOBILE_CARD_W, height: MOBILE_CARD_H, borderRadius: 16, overflow: "hidden", cursor: "pointer", zIndex: 1 }}
            initial={{ x: initPrev }}
            animate={{ x: xP }}
            exit={fadeOut}
            transition={mobileSpring}
            onClick={goPrev}
          >
            <CarouselCard img={slides[prevIdx].img} label={slides[prevIdx].label} slot="prev" cardW={MOBILE_CARD_W} cardH={MOBILE_CARD_H} compact />
          </motion.div>
        </AnimatePresence>

        {/* Active card */}
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={`a-${slideKey}`}
            style={{ position: "absolute", top: 0, width: MOBILE_CARD_W, height: MOBILE_CARD_H, borderRadius: 16, overflow: "hidden", zIndex: 2 }}
            initial={{ x: initActive }}
            animate={{ x: xA }}
            exit={fadeOut}
            transition={mobileSpring}
          >
            <CarouselCard img={slides[active].img} label={slides[active].label} slot="active" cardW={MOBILE_CARD_W} cardH={MOBILE_CARD_H} compact />
          </motion.div>
        </AnimatePresence>

        {/* Next card */}
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={`n-${slideKey}`}
            style={{ position: "absolute", top: 0, width: MOBILE_CARD_W, height: MOBILE_CARD_H, borderRadius: 16, overflow: "hidden", cursor: "pointer", zIndex: 1 }}
            initial={{ x: initNext }}
            animate={{ x: xN }}
            exit={fadeOut}
            transition={mobileSpring}
            onClick={goNext}
          >
            <CarouselCard img={slides[nextIdx].img} label={slides[nextIdx].label} slot="next1" cardW={MOBILE_CARD_W} cardH={MOBILE_CARD_H} compact />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Progress bar + nav buttons ── */}
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <ProgressBar slideKey={slideKey} />
        <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
          <PrevArrowBtn onClick={goPrev} />
          <NextArrowBtn onClick={goNext} />
        </div>
      </div>

      {/* ── Active card description ── */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`desc-${slideKey}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          style={{ textAlign: "center" }}
        >
          {slides[active].desc.map((line, i) => (
            <p key={i} style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "22px", color: "#727272", margin: 0 }}>
              {line}
            </p>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─── DESKTOP LAYOUT (owns tcStripRef + useScroll — only mounts on desktop) ── */
function DesktopTeamCulture({
  active,
  slideKey,
  direction,
  goNext,
  goPrev,
  goTo,
  setCarouselReady,
}: {
  active: number;
  slideKey: number;
  direction: "next" | "prev";
  goNext: () => void;
  goPrev: () => void;
  goTo: (idx: number, dir: "next" | "prev") => void;
  setCarouselReady: (v: boolean) => void;
}) {
  const prevIdx  = mod(active - 1, NUM_SLIDES);
  const next1Idx = mod(active + 1, NUM_SLIDES);
  const next2Idx = mod(active + 2, NUM_SLIDES);
  const next3Idx = mod(active + 3, NUM_SLIDES);

  const tcStripRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: tcScrollProgress } = useScroll({
    target: tcStripRef,
    offset: ["start end", "end start"],
  });

  const xPrev    = useTransform(tcScrollProgress, [0,    0.18, 0.75, 1], [100, 0, 0, 100]);
  const opPrev   = useTransform(tcScrollProgress, [0,    0.18, 0.75, 1], [0, 1, 1, 0]);
  const xActive  = useTransform(tcScrollProgress, [0.07, 0.25, 0.75, 1], [100, 0, 0, 100]);
  const opActive = useTransform(tcScrollProgress, [0.07, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const xBar     = useTransform(tcScrollProgress, [0.14, 0.32, 0.75, 1], [100, 0, 0, 100]);
  const opBar    = useTransform(tcScrollProgress, [0.14, 0.32, 0.75, 1], [0, 1, 1, 0]);
  const xNext1   = useTransform(tcScrollProgress, [0.21, 0.39, 0.75, 1], [100, 0, 0, 100]);
  const opNext1  = useTransform(tcScrollProgress, [0.21, 0.39, 0.75, 1], [0, 1, 1, 0]);
  const xNext2   = useTransform(tcScrollProgress, [0.28, 0.46, 0.75, 1], [100, 0, 0, 100]);
  const opNext2  = useTransform(tcScrollProgress, [0.28, 0.46, 0.75, 1], [0, 1, 1, 0]);
  const xNext3   = useTransform(tcScrollProgress, [0.35, 0.53, 0.75, 1], [100, 0, 0, 100]);
  const opNext3  = useTransform(tcScrollProgress, [0.35, 0.53, 0.75, 1], [0, 1, 1, 0]);

  useMotionValueEvent(tcScrollProgress, "change", (v) => {
    if (v >= 0.53) setCarouselReady(true);
  });

  return (
    <div
      ref={tcStripRef}
      style={{ display: "flex", gap: 80, height: 540, alignItems: "flex-end", position: "relative" }}
    >
      {/* LEFT COLUMN */}
      <div style={{ width: 92, flexShrink: 0, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start" }}>
        <SectionTitle />
        <div style={{ height: 60 }} />
      </div>

      {/* RIGHT COLUMN */}
      <div style={{ flex: "1 0 0", minWidth: 0, height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between", position: "relative" }}>
        {/* Badge */}
        <div style={{ paddingTop: 20, width: 145, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <TeamCultureBadge />
        </div>

        {/* Left gradient mask */}
        <div aria-hidden="true" style={{ position: "absolute", left: -240, top: 210, width: 240, height: 330, background: "linear-gradient(to right, #0a0a0a 30%, transparent 100%)", pointerEvents: "none", zIndex: 3 }} />
        {/* Right gradient mask */}
        <div aria-hidden="true" style={{ position: "absolute", right: "min(calc(576px - 50vw), -24px)", top: 210, width: 300, height: 330, background: "linear-gradient(to left, #0a0a0a 20%, transparent 100%)", pointerEvents: "none", zIndex: 3 }} />

        {/* CARD STRIP */}
        <div style={{ width: 1195, flexShrink: 0, display: "flex", gap: 44, alignItems: "flex-end", position: "relative" }}>

          {/* PREV card */}
          <motion.div style={{ flexShrink: 0, x: xPrev, opacity: opPrev }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={`${slideKey}-prev`} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} style={{ flexShrink: 0 }}>
                <CarouselCard img={slides[prevIdx].img} label={slides[prevIdx].label} slot="prev" raised onClick={goPrev} />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ACTIVE + NEXT group */}
          <div style={{ flex: "1 0 0", minWidth: 0, display: "flex", gap: 60, alignItems: "flex-end", position: "relative" }}>
            {/* Blue accent rect */}
            <div style={{ position: "absolute", left: 20, top: 15, width: 249, height: 295, background: "#1b61db", borderRadius: 20, pointerEvents: "none", zIndex: 0 }} />

            {/* ACTIVE card + description */}
            <motion.div style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: 32, alignItems: "flex-start", justifyContent: "center", position: "relative", zIndex: 1, x: xActive, opacity: opActive }}>
              <div style={{ width: CARD_W, height: CARD_H, borderRadius: 16, overflow: "hidden", flexShrink: 0, position: "relative" }}>
                <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                  <motion.div key={`${slideKey}-active`} custom={direction} variants={activeCardVariants} initial="enter" animate="center" exit="exit" transition={activeSpring} style={{ width: CARD_W, height: CARD_H, flexShrink: 0, willChange: "transform, opacity" }}>
                    <CarouselCard img={slides[active].img} label={slides[active].label} slot="active" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={`${slideKey}-desc`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1], delay: 0.22 }} style={{ textAlign: "center", width: CARD_W }}>
                  {slides[active].desc.map((line, i) => (
                    <p key={i} style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 15, lineHeight: "24px", color: "#727272", margin: 0 }}>{line}</p>
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* NEXT cards group */}
            <div style={{ flexShrink: 0, marginBottom: 28, display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start", justifyContent: "center", position: "relative", zIndex: 1 }}>
              <motion.div style={{ display: "flex", gap: 20, alignItems: "center", width: 538, x: xBar, opacity: opBar }}>
                <ProgressBar slideKey={slideKey} />
                <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
                  <PrevArrowBtn onClick={goPrev} />
                  <NextArrowBtn onClick={goNext} />
                </div>
              </motion.div>

              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <motion.div style={{ overflow: "hidden", width: CARD_W, height: CARD_H, borderRadius: 16, flexShrink: 0, position: "relative", x: xNext1, opacity: opNext1 }}>
                  <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                    <motion.div key={`${slideKey}-next1`} custom={direction} variants={nextCardVariants} initial="enter" animate="center" exit="exit" transition={{ ...nextSpring, delay: 0.04 }} style={{ width: CARD_W, height: CARD_H, flexShrink: 0, willChange: "transform, opacity" }}>
                      <CarouselCard img={slides[next1Idx].img} label={slides[next1Idx].label} slot="next1" onClick={() => goTo(next1Idx, "next")} />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
                <motion.div style={{ overflow: "hidden", width: CARD_W, height: CARD_H, borderRadius: 16, flexShrink: 0, position: "relative", x: xNext2, opacity: opNext2 }}>
                  <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                    <motion.div key={`${slideKey}-next2`} custom={direction} variants={nextCardVariants} initial="enter" animate="center" exit="exit" transition={{ ...nextSpring, delay: 0.09 }} style={{ width: CARD_W, height: CARD_H, flexShrink: 0, willChange: "transform, opacity" }}>
                      <CarouselCard img={slides[next2Idx].img} label={slides[next2Idx].label} slot="next2" onClick={() => goTo(next2Idx, "next")} />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
                <motion.div style={{ overflow: "hidden", width: CARD_W, height: CARD_H, borderRadius: 16, flexShrink: 0, position: "relative", x: xNext3, opacity: opNext3 }}>
                  <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                    <motion.div key={`${slideKey}-next3`} custom={direction} variants={nextCardVariants} initial="enter" animate="center" exit="exit" transition={{ ...nextSpring, delay: 0.14 }} style={{ width: CARD_W, height: CARD_H, flexShrink: 0, willChange: "transform, opacity" }}>
                      <CarouselCard img={slides[next3Idx].img} label={slides[next3Idx].label} slot="next3" onClick={() => goTo(next3Idx, "next")} />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN SECTION ───────────────────────────────────────────────────────── */
export function TeamCultureSection() {
  const [active, setActive]       = useState(0);
  const [slideKey, setSlideKey]   = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [carouselReady, setCarouselReady] = useState(false);
  const [isMobile, setIsMobile]   = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const goTo = useCallback((idx: number, dir: "next" | "prev" = "next") => {
    setDirection(dir);
    setActive(mod(idx, NUM_SLIDES));
    setSlideKey((k) => k + 1);
  }, []);

  const goNext = useCallback(() => goTo(active + 1, "next"), [active, goTo]);
  const goPrev = useCallback(() => goTo(active - 1, "prev"), [active, goTo]);

  useEffect(() => {
    if (!isMobile && !carouselReady) return;
    timerRef.current = setTimeout(goNext, SLIDE_DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active, goNext, carouselReady, isMobile]);

  return (
    <section style={{ width: "100%", background: "#0a0a0a", padding: 0, overflowX: "hidden", overflowY: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", boxSizing: "border-box" }}>
        {isMobile ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 40, paddingTop: 8, paddingBottom: 8 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <TeamCultureBadge />
              <SectionTitle />
            </div>
            <MobileCarousel
              active={active}
              slideKey={slideKey}
              direction={direction}
              goNext={goNext}
              goPrev={goPrev}
            />
          </div>
        ) : (
          <DesktopTeamCulture
            active={active}
            slideKey={slideKey}
            direction={direction}
            goNext={goNext}
            goPrev={goPrev}
            goTo={goTo}
            setCarouselReady={setCarouselReady}
          />
        )}
      </div>
    </section>
  );
}