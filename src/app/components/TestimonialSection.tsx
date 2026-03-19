import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, MotionValue } from "motion/react";
import svgPaths from "../../imports/svg-acv45xgh00";
import imgAvatar from "@/assets/afff7ef028d184ff017e3aeb8b7773dc4f4ffaef.png";

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote:
      "Hexanovate redefined how we approach revenue growth. Their data-driven FMCG strategy fixed our funnel leaks and compounded results month over month without extra spend.",
    name: "Mr Vikram Mehta",
    role: "Supply Chain Head",
    metrics: [
      {
        value: 98,
        suffix: "%",
        suffixSize: 32,
        suffixWeight: 400,
        label: "On-time delivery rate achieved",
        labelWidth: "auto" as const,
      },
      {
        value: 123,
        suffix: "+",
        suffixSize: 48,
        suffixWeight: 200,
        label: "Markets successfully activated",
        labelWidth: 156,
      },
    ],
  },
  {
    quote:
      "Hexanovate transformed our brand visibility entirely. Their FMCG marketing expertise brought measurable growth across all channels and target demographics.",
    name: "Ms Priya Sharma",
    role: "Marketing Director",
    metrics: [
      {
        value: 87,
        suffix: "%",
        suffixSize: 32,
        suffixWeight: 400,
        label: "Customer retention rate improved",
        labelWidth: "auto" as const,
      },
      {
        value: 245,
        suffix: "+",
        suffixSize: 48,
        suffixWeight: 200,
        label: "Campaigns successfully launched",
        labelWidth: 156,
      },
    ],
  },
  {
    quote:
      "Our B2B pipeline tripled in just six months. The team's account-based marketing approach exceeded all of our revenue and lead generation targets.",
    name: "Mr Rahul Kapoor",
    role: "VP Sales, TechCorp",
    metrics: [
      {
        value: 312,
        suffix: "%",
        suffixSize: 32,
        suffixWeight: 400,
        label: "ROI on marketing investment",
        labelWidth: "auto" as const,
      },
      {
        value: 89,
        suffix: "+",
        suffixSize: 48,
        suffixWeight: 200,
        label: "Enterprise clients acquired",
        labelWidth: 156,
      },
    ],
  },
];

/* ─── COUNTER HOOK ──────────────────────────────────────────────────────── */
function useAnimatedCounter(target: number, animKey: number, ready: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!ready) { setCount(0); return; }
    setCount(0);
    const duration = 900;
    const totalSteps = 45;
    const stepDuration = duration / totalSteps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / totalSteps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (step >= totalSteps) { clearInterval(timer); setCount(target); }
    }, stepDuration);
    return () => clearInterval(timer);
  }, [target, animKey, ready]);

  return count;
}

/* ─── QUOTE MARKS SVG ────────────────────────────────────────────────────── */
function QuoteMarksSvg() {
  return (
    <div style={{ width: 102, height: 56, flexShrink: 0, position: "relative", marginBottom: -20 }}>
      <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 102 56">
        <g clipPath="url(#tq-clip-0)">
          <path d={svgPaths.p29f35580} fill="url(#tq-grad-0)" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="tq-grad-0" x1="50.9133" x2="50.9133" y1="55.0667" y2="0.00385153">
            <stop stopColor="#E39504" />
            <stop offset="1" stopColor="#303030" stopOpacity="0" />
          </linearGradient>
          <clipPath id="tq-clip-0"><rect fill="white" height="56" width="102" /></clipPath>
        </defs>
      </svg>
    </div>
  );
}

/* ─── DIAGONAL ARROW ─────────────────────────────────────────────────────── */
function DiagonalArrowSvg({ color }: { color: string }) {
  return (
    <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 17.09 17.0901">
      <path d={svgPaths.pe61a680} fill={color} stroke={color} />
    </svg>
  );
}

function ArrowIcon({ color }: { color: string }) {
  return (
    <div style={{ width: 16, height: 16, overflow: "hidden", position: "relative", flexShrink: 0 }}>
      <div style={{ position: "absolute", inset: "5%" }}>
        <div style={{ position: "absolute", inset: "-9.8% -9.8% -8.88% -8.88%" }}>
          <DiagonalArrowSvg color={color} />
        </div>
      </div>
    </div>
  );
}

/* ─── PREV / NEXT ARROWS ─────────────────────────────────────────────────── */
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
        width: 40, height: 40, borderRadius: 30,
        border: "1px solid #1b61db",
        background: hov ? "rgba(27,97,219,0.12)" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", flexShrink: 0, position: "relative", transition: "background 0.2s",
      }}
    >
      <div style={{ width: 22.627, height: 22.627, display: "flex", alignItems: "center", justifyContent: "center" }}>
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
        width: 40, height: 40, borderRadius: 30,
        background: hov ? "#2470f0" : "#1b61db",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", flexShrink: 0, transition: "background 0.2s",
      }}
    >
      <div style={{ width: 22.627, height: 22.627, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: "rotate(135deg) scaleY(-1)" }}><ArrowIcon color="white" /></div>
      </div>
    </motion.button>
  );
}

/* ─── SUBTRACT CARD SHAPE ────────────────────────────────────────────────── */
function SubtractShape() {
  return (
    <svg style={{ position: "absolute", display: "block", width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 292 332">
      <g>
        <mask fill="white" id="ts-inside-mask"><path d={svgPaths.p189e4000} /></mask>
        <path d={svgPaths.p189e4000} fill="#1B61DB" fillOpacity="0.1" />
        <path d={svgPaths.p32a97c80} fill="url(#ts-border-gradient)" mask="url(#ts-inside-mask)" />
      </g>
      <defs>
        <linearGradient gradientUnits="userSpaceOnUse" id="ts-border-gradient" x1="292" x2="227.5" y1="330.759" y2="204.617">
          <stop stopColor="#1B61DB" />
          <stop offset="1" stopColor="#0A0A0A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── SINGLE METRIC COUNTER ──────────────────────────────────────────────── */
interface MetricProps {
  value: number;
  suffix: string;
  suffixSize: number;
  suffixWeight: number;
  label: string;
  labelWidth: number | "auto";
  animKey: number;
  ready: boolean;
}

function MetricCounter({ value, suffix, suffixSize, suffixWeight, label, labelWidth, animKey, ready }: MetricProps) {
  const count = useAnimatedCounter(value, animKey, ready);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
      <p className="ts-metric-row" style={{ fontFamily: "Manrope, sans-serif", color: "#b5b5b5", lineHeight: "60px", margin: 0 }}>
        <span className="ts-metric-num" style={{ fontWeight: 400, fontSize: 52, lineHeight: "60px" }}>{count}</span>
        <span className="ts-metric-sfx" style={{ fontWeight: suffixWeight, fontSize: suffixSize, lineHeight: "60px" }}>{suffix}</span>
      </p>
      <motion.p
        key={`label-${animKey}-${ready}`}
        initial={{ y: 14, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : { y: 14, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="ts-metric-label"
        style={{ fontFamily: "Poppins, sans-serif", fontWeight: 300, fontSize: 15, lineHeight: "22px", color: "#747474", margin: 0, width: labelWidth === "auto" ? "100%" : labelWidth }}
      >
        {label}
      </motion.p>
    </div>
  );
}

/* ─── AVATAR ─────────────────────────────────────────────────────────────── */
function Avatar() {
  return (
    <div style={{ width: 36, height: 36, borderRadius: 120, flexShrink: 0, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "#ffeccc", borderRadius: 120 }} />
      <img alt="" src={imgAvatar} style={{ position: "absolute", left: "2.6%", top: "4.73%", width: "115.79%", height: "115.79%", maxWidth: "none", objectFit: "cover", borderRadius: "inherit" }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, border: "1px solid #ffa600", borderRadius: 120, pointerEvents: "none" }} />
    </div>
  );
}

/* ─── TESTIMONIAL BADGE ──────────────────────────────────────────────────── */
function TestimonialBadge() {
  return (
    <div style={{ background: "#111", borderRadius: 40, padding: "6px 20px", display: "inline-flex", alignItems: "center", justifyContent: "center", position: "relative", flexShrink: 0 }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, border: "1px solid #414141", borderRadius: 40, pointerEvents: "none" }} />
      <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 13, color: "#ffa600", lineHeight: "normal", whiteSpace: "nowrap", position: "relative" }}>
        Testimonial
      </span>
    </div>
  );
}

/* ─── SECTION TITLE ──────────────────────────────────────────────────────── */
function WordReveal({ children, progress, range, fontWeight, color }: { children: string; progress: MotionValue<number>; range: [number, number]; fontWeight: number; color: string; }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ fontWeight, color, opacity }}>{children}{" "}</motion.span>;
}

function SectionTitle() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "center 0.35"] });
  const words: { text: string; fontWeight: number; color: string }[] = [
    { text: "Real",      fontWeight: 700, color: "white"   },
    { text: "results,",  fontWeight: 300, color: "#8e8e8e" },
    { text: "real",      fontWeight: 700, color: "white"   },
    { text: "voices",    fontWeight: 700, color: "#1b61db" },
    { text: "hear",      fontWeight: 300, color: "#8e8e8e" },
    { text: "directly",  fontWeight: 300, color: "#8e8e8e" },
    { text: "from",      fontWeight: 300, color: "#8e8e8e" },
    { text: "clients",   fontWeight: 700, color: "white"   },
  ];
  return (
    <p ref={ref} className="ts-title" style={{ fontFamily: "Manrope, sans-serif", fontSize: "clamp(32px, 5vw, 60px)", lineHeight: 1.36, color: "white", margin: 0, textTransform: "capitalize", width: "100%", maxWidth: 867 }}>
      {words.map((word, i) => (
        <WordReveal key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} fontWeight={word.fontWeight} color={word.color}>
          {word.text}
        </WordReveal>
      ))}
    </p>
  );
}

/* ─── VIDEO WALL ─────────────────────────────────────────────────────────── */
// Contained video panel — first column in the ts-content row.
// Matches the Figma frame: bounded box with rounded corners, not full-bleed.
// Hidden on tablet & mobile via .ts-video { display: none }
function VideoWall() {
  return (
    <div
      className="ts-video"
      style={{
        width: 240,
        flexShrink: 0,
        alignSelf: "stretch",
        borderRadius: 20,
        overflow: "hidden",
        position: "relative",
        background: "#0a0a0a",
      }}
    >
      <video
        src="https://sienna-pelican-786032.hostingersite.com/wp-content/uploads/2026/03/grok-video-94a8e1ed-8562-4d28-a931-984b76ac51af-1-2.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", display: "block" }}
      />
      {/* Right edge — dissolves into the content beside it */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 40%, rgba(10,10,10,0.7) 75%, #0a0a0a 100%)", pointerEvents: "none" }} />
      {/* Left edge */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, transparent 60%, rgba(10,10,10,0.8) 90%, #0a0a0a 100%)", pointerEvents: "none" }} />
      {/* Top vignette */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #0a0a0a 0%, transparent 35%)", pointerEvents: "none" }} />
      {/* Bottom vignette */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0a0a0a 0%, transparent 35%)", pointerEvents: "none" }} />
    </div>
  );
}

/* ─── MAIN SECTION ───────────────────────────────────────────────────────── */
export function TestimonialSection() {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [contentReady, setContentReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const navigate = useCallback((dir: 1 | -1) => {
    setActive((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
    setAnimKey((k) => k + 1);
  }, []);

  const testimonial = TESTIMONIALS[active];

  const tsContentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: tsScrollProgress } = useScroll({ target: tsContentRef, offset: ["start end", "end start"] });

  const xTest      = useTransform(tsScrollProgress, [0,   0.22, 0.75, 1], [80, 0, 0, 80]);
  const opTest     = useTransform(tsScrollProgress, [0,   0.22, 0.75, 1], [0,  1, 1, 0]);
  const xMetrics   = useTransform(tsScrollProgress, [0.1, 0.32, 0.75, 1], [80, 0, 0, 80]);
  const opMetrics  = useTransform(tsScrollProgress, [0.1, 0.32, 0.75, 1], [0,  1, 1, 0]);

  useMotionValueEvent(tsScrollProgress, "change", (v) => {
    if (isMobile) {
      setContentReady(v >= 0.05 && v <= 0.97);
    } else {
      setContentReady(v >= 0.32 && v <= 0.82);
    }
  });

  return (
    <section
      style={{
        width: "100%",
        background: "#0a0a0a",
        padding: 0,
        paddingBottom: 100,
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* ── Content container — 1200px centred ── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="ts-main-col"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: 580,
          }}
        >
          {/* ── TOP: Badge (w-169) + Title ── */}
          <div
            className="ts-header"
            style={{ display: "flex", gap: 24, alignItems: "flex-start", paddingBottom: 8, position: "relative", zIndex: 1 }}
          >
            <div style={{ width: 169, flexShrink: 0, display: "flex", alignItems: "center" }}>
              <TestimonialBadge />
            </div>
            <div style={{ flex: "1 0 0", minWidth: 0 }}>
              <SectionTitle />
            </div>
          </div>

          {/* ── BOTTOM: Video box + Quote + Metrics card ── */}
          <div
            ref={tsContentRef}
            className="ts-content"
            style={{ display: "flex", gap: 40, alignItems: "stretch", position: "relative", zIndex: 1 }}
          >
            {/* Video box — contained, bounded, first column */}
            <VideoWall />

            {/* Center — testimonial quote + author */}
            <motion.div
              className="ts-testimonial"
              style={{ flex: "1 0 0", minWidth: 0, paddingBottom: 36, display: "flex", flexDirection: "column", justifyContent: "flex-end", x: xTest, opacity: opTest }}
            >
              <AnimatePresence mode="wait">
                {contentReady && (
                  <motion.div
                    key={animKey}
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 80 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start", width: "100%" }}
                  >
                    {/* Quote block */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", paddingBottom: 20, width: "100%" }}>
                      <QuoteMarksSvg />
                      <div style={{ width: "100%", marginBottom: -20 }}>
                        <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 300, fontSize: 20, lineHeight: "32px", color: "white", margin: 0, whiteSpace: "pre-wrap", textIndent: "7em" }}>
                          {testimonial.quote}
                        </p>
                      </div>
                    </div>

                    {/* Author row */}
                    <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
                      <Avatar />
                      <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 15, color: "#ffa600", letterSpacing: "0.2px", textTransform: "capitalize", whiteSpace: "nowrap" }}>
                        {testimonial.name}
                      </span>
                      <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 13, color: "#414141", letterSpacing: "0.2px" }}>|</span>
                      <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 14, color: "#7d7d7d", letterSpacing: "0.2px", textTransform: "capitalize", whiteSpace: "nowrap" }}>
                        {testimonial.role}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right — metrics card */}
            <motion.div
              className="ts-metrics-card"
              style={{ width: 292, minHeight: 332, height: "auto", flexShrink: 0, position: "relative", maxWidth: "100%", x: xMetrics, opacity: opMetrics }}
            >
              <SubtractShape />
              <div style={{ position: "relative", width: "100%", padding: "36px 32px", paddingBottom: 48, display: "flex", flexDirection: "column", gap: 40, boxSizing: "border-box" }}>
                <MetricCounter
                  value={testimonial.metrics[0].value}
                  suffix={testimonial.metrics[0].suffix}
                  suffixSize={testimonial.metrics[0].suffixSize}
                  suffixWeight={testimonial.metrics[0].suffixWeight}
                  label={testimonial.metrics[0].label}
                  labelWidth={testimonial.metrics[0].labelWidth}
                  animKey={animKey}
                  ready={contentReady}
                />
                <MetricCounter
                  value={testimonial.metrics[1].value}
                  suffix={testimonial.metrics[1].suffix}
                  suffixSize={testimonial.metrics[1].suffixSize}
                  suffixWeight={testimonial.metrics[1].suffixWeight}
                  label={testimonial.metrics[1].label}
                  labelWidth={testimonial.metrics[1].labelWidth}
                  animKey={animKey}
                  ready={contentReady}
                />
              </div>

              {/* Nav arrows in the notch */}
              <div style={{ position: "absolute", left: 204, bottom: 0, display: "flex", gap: 8, alignItems: "center", zIndex: 2 }}>
                <PrevArrowBtn onClick={() => navigate(-1)} />
                <NextArrowBtn onClick={() => navigate(1)} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Responsive overrides ── */}
      <style>{`
        /* Hide video + scale metrics on tablet & mobile */
        @media (max-width: 1023px) {
          .ts-video { display: none !important; }
          .ts-metric-row  { line-height: 46px !important; }
          .ts-metric-num  { font-size: 36px !important; line-height: 46px !important; }
          .ts-metric-sfx  { font-size: 22px !important; line-height: 46px !important; }
          .ts-metric-label { font-size: 13px !important; line-height: 19px !important; }
          .ts-main-col { min-height: auto !important; gap: 48px !important; }
          .ts-content {
            flex-wrap: wrap !important;
            gap: 40px !important;
            padding-left: 0 !important;
          }
          .ts-testimonial { flex: unset !important; width: 100% !important; min-width: 100% !important; }
          .ts-metrics-card { margin: 0 auto !important; }
          .ts-title { font-size: clamp(28px, 4vw, 48px) !important; }
        }

        /* Mobile: <768px */
        @media (max-width: 767px) {
          .ts-metric-row  { line-height: 38px !important; }
          .ts-metric-num  { font-size: 28px !important; line-height: 38px !important; }
          .ts-metric-sfx  { font-size: 17px !important; line-height: 38px !important; }
          .ts-metric-label { font-size: 12px !important; line-height: 18px !important; }
          .ts-main-col { min-height: auto !important; gap: 40px !important; }
          .ts-header { flex-direction: column !important; gap: 16px !important; }
          .ts-header > div:first-child { width: auto !important; }
          .ts-content {
            flex-direction: column !important;
            gap: 40px !important;
            align-items: flex-start !important;
            padding-left: 0 !important;
          }
          .ts-testimonial { flex: unset !important; width: 100% !important; padding-bottom: 0 !important; }
          .ts-metrics-card { width: 100% !important; max-width: 292px !important; }
          .ts-title { font-size: clamp(24px, 7vw, 40px) !important; }
        }
      `}</style>
    </section>
  );
}