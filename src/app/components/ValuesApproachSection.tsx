import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, MotionValue, useScroll, useTransform } from "motion/react";
import svgPaths from "../../imports/svg-z7psrjnrcc";
import imgSlide0 from "@/assets/cd0d3c71464504d6e4fd1662e5128b67cbe4dfdc.jpg";
import imgSlide1 from "@/assets/455b6c3830e6c866d6b397b00c2dcdf87ae3df2d.jpg";
import imgSlide2 from "@/assets/a9faff04fbb40b4297efb717f05795a3e749ebf7.jpg";

/* ─── SLIDES DATA ────────────────────────────────────────────────────────── */
const SLIDES = [
  {
    title: "Empathy First, Always",
    description:
      "We understand businesses because we listen before we prescribe. Every strategy begins with genuine curiosity about where you are, what you need, and what you are truly trying to become.",
    cardTitle: "Empathy First",
    image: imgSlide0,
  },
  {
    title: "Obsessed With Outcomes",
    description:
      "Deliverables are the minimum. What we actually care about is the number that moves, the market that shifts, and the business that looks completely different six months from now.",
    cardTitle: "Outcome Obsessed",
    image: imgSlide1,
  },
  {
    title: "Always Start With Why",
    description:
      "Before a single strategy is written, we ask the question underneath the question. What is this business truly trying to achieve? That answer changes everything that follows.",
    cardTitle: "Start With Why",
    image: imgSlide2,
  },
];

const N = SLIDES.length;
function mod(n: number, m: number) { return ((n % m) + m) % m; }

/* ─── NETWORK ICON SVG ───────────────────────────────────────────────────── */
function NetworkIcon() {
  return (
    <div style={{ width: 32, height: 32, position: "relative", flexShrink: 0 }}>
      <svg
        style={{ position: "absolute", display: "block", width: "100%", height: "100%" }}
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g clipPath="url(#va-icon-clip)">
          <path d={svgPaths.p2c57a7e0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.pc29f100}  stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.pdaef000}  stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p33346480} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.pfc20900}  stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p30d679f0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="va-icon-clip">
            <rect fill="white" height="32" width="32" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

/* ─── ICON BADGE ─────────────────────────────────────────────────────────── */
function IconBadge() {
  return (
    <div
      style={{
        background: "#ffa600",
        borderRadius: 49,
        width: 48,
        height: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 6,
        flexShrink: 0,
      }}
    >
      <NetworkIcon />
    </div>
  );
}

/* ─── DIAGONAL ARROW ─────────────────────────────────────────────────────── */
function DiagonalArrowSvg({ color }: { color: string }) {
  return (
    <svg
      style={{ display: "block", width: "100%", height: "100%" }}
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 13.7713 13.7713"
    >
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

/* ─── PREV / NEXT BUTTONS ────────────────────────────────────────────────── */
function PrevBtn({ onClick }: { onClick: () => void }) {
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
        cursor: "pointer", flexShrink: 0, transition: "background 0.2s",
      }}
    >
      <div style={{ width: 16.971, height: 16.971, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: "rotate(45deg)" }}>
          <ArrowIcon color="#1B61DB" />
        </div>
      </div>
    </motion.button>
  );
}

function NextBtn({ onClick }: { onClick: () => void }) {
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
        cursor: "pointer", flexShrink: 0, transition: "background 0.2s",
      }}
    >
      <div style={{ width: 16.971, height: 16.971, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: "rotate(135deg) scaleY(-1)" }}>
          <ArrowIcon color="white" />
        </div>
      </div>
    </motion.button>
  );
}

/* ─── PROGRESS BAR ───────────────────────────────────────────────────────── */
function ProgressBar({ active }: { active: number }) {
  const fillPct = ((active + 1) / N) * 100;
  return (
    <div style={{ flex: "1 0 0", position: "relative", height: 3, minWidth: 0 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: "50%", transform: "translateY(-50%)", height: 2, background: "#111", borderRadius: 99 }} />
      <motion.div
        style={{ position: "absolute", left: 0, top: 0, bottom: 0, background: "#1B61DB", borderRadius: 99 }}
        animate={{ width: `${fillPct}%` }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  );
}

/* ─── SECTION BADGE ──────────────────────────────────────────────────────── */
function SectionBadge() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", width: "100%" }}>
      <div style={{ background: "#111", borderRadius: 40, padding: "6px 20px", display: "inline-flex", alignItems: "center", justifyContent: "center", position: "relative", flexShrink: 0 }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, border: "1px solid #414141", borderRadius: 40, pointerEvents: "none" }} />
        <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 13, color: "#ffa600", lineHeight: "normal", whiteSpace: "nowrap", position: "relative" }}>
          Values & Approach
        </span>
      </div>
      <div style={{ flex: "1 0 0", height: 1, background: "#111111", minWidth: 0 }} />
    </div>
  );
}

/* ─── REVEAL WORD — single span, no ghost, no double-layer ──────────────── */
function RevealWord({
  children,
  weight,
  color,
  progress,
  range,
}: {
  children: React.ReactNode;
  weight: number;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.25, 1]);
  return (
    <motion.span style={{ opacity, fontWeight: weight, color }}>
      {children}
    </motion.span>
  );
}

/* ─── TITLE REVEAL — scroll-linked per-word illumination ────────────────── */
function TitleReveal() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.15"],
  });

  const total = 14;
  const r = (i: number): [number, number] => [i / total, (i + 1) / total];

  return (
    <p
      ref={ref}
      style={{ fontWeight: 700, lineHeight: 1.48, marginTop: 0, marginBottom: 0 }}
    >
      {/* Line 1 */}
      <RevealWord weight={700} color="white"   progress={scrollYProgress} range={r(0)}>Built</RevealWord>
      {" "}
      <RevealWord weight={700} color="white"   progress={scrollYProgress} range={r(1)}>On</RevealWord>
      {" "}
      <RevealWord weight={700} color="white"   progress={scrollYProgress} range={r(2)}>Belief.</RevealWord>
      {" "}
      <RevealWord weight={700} color="white"   progress={scrollYProgress} range={r(3)}>Powered</RevealWord>
      {" "}
      <RevealWord weight={700} color="white"   progress={scrollYProgress} range={r(4)}>By</RevealWord>
      <br />
      {/* Line 2 */}
      <RevealWord weight={300} color="#8e8e8e" progress={scrollYProgress} range={r(5)}>a</RevealWord>
      {" "}
      <RevealWord weight={300} color="#8e8e8e" progress={scrollYProgress} range={r(6)}>Philosophy</RevealWord>
      {" "}
      <RevealWord weight={300} color="#8e8e8e" progress={scrollYProgress} range={r(7)}>Nobody</RevealWord>
      {" "}
      <RevealWord weight={300} color="#8e8e8e" progress={scrollYProgress} range={r(8)}>Talked</RevealWord>
      {" "}
      <RevealWord weight={300} color="#8e8e8e" progress={scrollYProgress} range={r(9)}>Us</RevealWord>
      {" "}
      <RevealWord weight={300} color="#8e8e8e" progress={scrollYProgress} range={r(10)}>Out</RevealWord>
      {" "}
      <RevealWord weight={300} color="#8e8e8e" progress={scrollYProgress} range={r(11)}>Of.</RevealWord>
    </p>
  );
}

/* ─── ACTIVE CARD (open / expanded state) ────────────────────────────────── */
function ActiveCard({ slide }: { slide: (typeof SLIDES)[0] }) {
  return (
    <div
      style={{
        flex: "1 0 0",
        minWidth: 0,
        height: 420,
        borderRadius: 20,
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        background: "rgba(27,97,219,0.18)",
        border: "1px solid rgba(27,97,219,0.55)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gradient blob — top-left */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: 0, top: 0, width: 291, height: 248, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", overflow: "hidden" }}
      >
        <div style={{ transform: "rotate(90deg)", flexShrink: 0 }}>
          <div style={{ width: 248, height: 291, borderRadius: "20px 0 0 20px", background: "linear-gradient(51.519deg, rgba(27,97,219,0.35) 0.14447%, rgba(27,97,219,0) 53.962%)" }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ display: "flex", alignItems: "flex-end", padding: 28, width: "100%", height: "100%", boxSizing: "border-box", position: "relative" }}>
        <motion.div
          key={slide.title}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], opacity: { duration: 0.3 } }}
          style={{ flex: "1 0 0", minWidth: 0, display: "flex", flexDirection: "column", gap: 32, alignItems: "flex-start" }}
        >
          <IconBadge />
          <div style={{ display: "flex", flexDirection: "column", gap: 8, color: "white", width: "100%" }}>
            <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 20, lineHeight: "28px", color: "white", marginTop: 0, marginBottom: 0 }}>
              {slide.title}
            </p>
            <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 300, fontSize: 15, lineHeight: "26px", color: "rgba(255,255,255,0.85)", marginTop: 0, marginBottom: 0 }}>
              {slide.description}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── THUMB CARD (closed / inactive state) ───────────────────────────────── */
function ThumbCard({ slide, onClick }: { slide: (typeof SLIDES)[0]; onClick: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.03, transition: { type: "spring", stiffness: 400, damping: 20 } }}
      style={{ flex: "1 0 0", minWidth: 0, height: 308, borderRadius: 20, position: "relative", overflow: "hidden", cursor: "pointer" }}
    >
      <img
        alt=""
        src={slide.image}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: 20, maxWidth: "none", pointerEvents: "none" }}
      />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", borderRadius: 20, pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 55%)", borderRadius: 20, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "28px 24px 0" }}>
        <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, fontSize: 15, lineHeight: "22px", color: "rgba(255,255,255,0.8)", marginTop: 0, marginBottom: 0 }}>
          {slide.cardTitle}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── MAIN SECTION ───────────────────────────────────────────────────────── */
export function ValuesApproachSection() {
  const [active, setActive] = useState(0);

  const goNext = useCallback(() => setActive((i) => mod(i + 1, N)), []);
  const goPrev = useCallback(() => setActive((i) => mod(i - 1, N)), []);
  const goTo   = useCallback((i: number) => setActive(i), []);

  const thumb0 = mod(active + 1, N);
  const thumb1 = mod(active + 2, N);
  const thumb2 = mod(active + 3, N);

  /* ── scroll-linked entrance for the cards row ── */
  const cardsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: cardsProgress } = useScroll({
    target: cardsRef,
    offset: ["start 0.95", "start 0.38"],
  });
  const cardsX       = useTransform(cardsProgress, [0, 1], ["130px", "0px"]);
  const cardsOpacity = useTransform(cardsProgress, [0, 0.55], [0, 1]);

  return (
    <section style={{ width: "100%", background: "transparent", padding: 0, overflowX: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 40px", boxSizing: "border-box" }}>

        {/* ── ROW 1: Header ── */}
        <div className="va-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", width: "100%" }}>
          <div className="va-badge-col" style={{ width: 254, flexShrink: 0, paddingTop: 20, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <SectionBadge />
          </div>
          <div className="va-title-col" style={{ width: 733, flexShrink: 0, display: "flex", flexDirection: "column", gap: 60 }}>
            <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 40, color: "white", textTransform: "capitalize", width: "100%", whiteSpace: "pre-wrap" }}>
              <TitleReveal />
            </div>
            <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 16, lineHeight: "29px", color: "#727272", marginTop: 0, marginBottom: 0 }}>
              Not a slide deck. Not a poster on the wall. This is genuinely how we operate.
            </p>
          </div>
        </div>

        {/* ── ROW 2: Cards ── */}
        <motion.div
          ref={cardsRef}
          className="va-cards"
          style={{ display: "flex", gap: 40, alignItems: "flex-end", width: "100%", marginTop: -40, x: cardsX, opacity: cardsOpacity }}
        >

          <div style={{ flex: "1 0 0", minWidth: 0, display: "flex", alignSelf: "flex-end" }}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={active}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ flex: "1 0 0", minWidth: 0, display: "flex", transformOrigin: "bottom center" }}
              >
                <ActiveCard slide={SLIDES[active]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── RIGHT: 3 thumb cards + controls ── */}
          <div className="va-right-col" style={{ width: 733, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start", justifyContent: "flex-end" }}>
            <div className="va-thumbs" style={{ display: "flex", gap: 16, alignItems: "center", width: "100%" }}>
              {([thumb0, thumb1, thumb2] as const).map((thumbIdx) => (
                <div key={thumbIdx} style={{ flex: "1 0 0", minWidth: 0, display: "flex" }}>
                  <ThumbCard slide={SLIDES[thumbIdx]} onClick={() => goTo(thumbIdx)} />
                </div>
              ))}
            </div>

            {/* Progress bar + nav arrows */}
            <div style={{ display: "flex", gap: 20, alignItems: "center", width: "100%" }}>
              <ProgressBar active={active} />
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
                <PrevBtn onClick={goPrev} />
                <NextBtn onClick={goNext} />
              </div>
            </div>
          </div>

        </motion.div>
      </div>

      {/* ── Responsive overrides ── */}
      <style>{`
        @media (max-width: 1023px) {
          .va-header { flex-direction: column !important; gap: 32px !important; }
          .va-badge-col { width: 100% !important; }
          .va-title-col { width: 100% !important; gap: 32px !important; }
          .va-cards { flex-direction: column !important; margin-top: 40px !important; gap: 24px !important; align-items: stretch !important; }
          .va-right-col { width: 100% !important; }
          .va-thumbs { overflow-x: auto !important; }
          .va-thumbs > * { min-width: 220px !important; flex: 0 0 220px !important; }
        }
        @media (max-width: 767px) {
          .va-header { flex-direction: column !important; gap: 24px !important; }
          .va-badge-col { width: 100% !important; }
          .va-title-col { width: 100% !important; gap: 24px !important; }
          .va-cards { flex-direction: column !important; margin-top: 32px !important; gap: 20px !important; align-items: stretch !important; }
          .va-right-col { width: 100% !important; }
          .va-thumbs { overflow-x: auto !important; padding-bottom: 4px !important; }
          .va-thumbs > * { min-width: 200px !important; flex: 0 0 200px !important; }
        }
      `}</style>
    </section>
  );
}