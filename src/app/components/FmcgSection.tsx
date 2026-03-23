import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useInView,
  type MotionValue,
} from "motion/react";
import {
  useRef,
  useState,
  useCallback,
  useId,
  useEffect,
  type RefObject,
} from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

/* ─── FIGMA ASSET IMAGES ─────────────────────────────────────────────────── */
import imgMangolicious from "@/assets/0689329b6a406383b42f36cc7b10f6cd406be03a.png";
import imgAbkGrooming from "@/assets/992616aa3d1169004f509036de7973baac842487.png";
import imgFoodriteBbq from "@/assets/4f069c8843666a15fcb4413192db994cb8b747c0.png";
import imgFoodriteRedChilly from "@/assets/62101aad23ca30f4d7b0f2d1557823af3e2ed284.png";
import imgCreditCard from "@/assets/d11b72bafb73375ebedb3c8ed6fe8452fb412a33.png";
import imgFoodriteKetchup from "@/assets/3e7e50869b3f586ec239e79e0714db484b037067.png";
import imgEyeRis from "@/assets/b0015ce0a5a601ba8e77012c9ad259ee7e4cbd0f.png";
import imgPlaceholder1 from "@/assets/393466a8f00e06a6dea5f6fbcd4d2c2de7939ace.png";
import imgPlaceholder2 from "@/assets/ea697fd1c8734ef50383a75ad5b573e938d827a7.png";
import imgPlaceholder3 from "@/assets/069f59e29dcfa5fdf46d9b87bab576654e88b958.png";
import imgPlaceholder4 from "@/assets/eec164b068f12d93431a8bacd150bf580ca70702.png";
import imgPlaceholder5 from "@/assets/efd98944bc6f56588be3895179bc887a6f605839.png";
import imgPlaceholder6 from "@/assets/3ef0c2306bfbc4191425edd723ba9de0447ca13b.png";
import imgPlaceholder7 from "@/assets/41c0422ed85993e6c6e32ab7f0dbec890b778a42.png";

/* ─── IMAGE CONSTANTS ────────────────────────────────────────────────────── */
const IMG_HERO = imgFoodriteRedChilly;
const IMG_C1_TOP  = imgMangolicious;
const IMG_C1_BTM  = imgAbkGrooming;
const IMG_C2_TOP  = imgFoodriteBbq;
const IMG_C2_HERO = imgFoodriteRedChilly;
const IMG_C2_BTM  = imgCreditCard;
const IMG_C3_TOP  = imgFoodriteKetchup;
const IMG_C3_MID  = imgEyeRis;

/* ─── UTILITIES ──────────────────────────────────────────────────────────── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}
function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/* ─── GRADIENT DIVIDER LINE ─────────────────────────────────────────────── */
function GradientLine({
  width = 115,
  reversed = false,
}: {
  width?: number;
  reversed?: boolean;
}) {
  const uid = useId();
  const gradId = `gl-${uid.replace(/:/g, "")}`;
  return (
    <svg
      width={width}
      height="1"
      viewBox={`0 0 ${width} 1`}
      fill="none"
      style={{ display: "block", flexShrink: 0 }}
    >
      <defs>
        <linearGradient
          id={gradId}
          x1="0"
          x2={width}
          y1="0"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={reversed ? "#0A0A0A" : "#414141"} />
          <stop offset="1" stopColor={reversed ? "#414141" : "#0A0A0A"} />
        </linearGradient>
      </defs>
      <path d={`M0 0.5H${width}`} stroke={`url(#${gradId})`} />
    </svg>
  );
}

/* ─── FMCG BADGE ─────────────────────────────────────────────────────────── */
function FmcgBadge() {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        background: "#111",
        border: "1px solid #414141",
        borderRadius: "40px",
        padding: "6px 20px",
        display: "inline-flex",
      }}
    >
      <span
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          fontSize: "13px",
          color: "#FFA600",
          lineHeight: "normal",
        }}
      >
        The Native Unit
      </span>
    </div>
  );
}

/* ─── ANIMATED COUNTER ───────────────────────────────────────────────────── */
// `start` prop: when provided, the counter waits for it to become true instead
// of relying on its own IntersectionObserver (which fires too early inside the
// sticky scroll architecture because opacity:0 ancestors are ignored by IO).
function AnimatedCounter({
  target,
  suffix = "",
  start,
}: {
  target: number;
  suffix?: string;
  start?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Fallback to internal viewport check when no external trigger is provided
  const internalInView = useInView(ref, { once: true, margin: "-40px" });
  const shouldStart = start !== undefined ? start : internalInView;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    setCount(0); // reset so it always counts from 0 when triggered
    let startTime: number | null = null;
    const duration = 1800;
    const step = (now: number) => {
      if (!startTime) startTime = now;
      const t = clamp((now - startTime) / duration, 0, 1);
      const eased = easeInOut(t);
      setCount(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [shouldStart, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ─── DYNAMIC STAT BLOCK (client-specific) ──────────────────────────────── */
function DynamicStatBlock({ 
  value, 
  suffix, 
  label, 
  delay = 0,
  scrollYProgress 
}: { 
  value: number;
  suffix: string;
  label: string;
  delay?: number;
  scrollYProgress?: MotionValue<number>;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const [phaseActive, setPhaseActive] = useState(false);
  useEffect(() => {
    if (!scrollYProgress) return;
    return scrollYProgress.on("change", (p: number) => {
      if (p >= 0.40) setPhaseActive(true);
    });
  }, [scrollYProgress]);

  const triggered = scrollYProgress ? phaseActive : inView;

  return (
    <div
      ref={ref}
      className="flex flex-col"
      style={{ gap: "6px", height: "110px", width: "100%" }}
    >
      <motion.p
        style={{ lineHeight: 0, margin: 0 }}
        initial={{ opacity: 0, y: 12 }}
        animate={triggered ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <span
          style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 400,
            fontSize: "44px",
            lineHeight: "60px",
            color: "#FFA600",
          }}
        >
          <AnimatedCounter target={value} start={triggered} />
        </span>
        <span
          style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 400,
            fontSize: "32px",
            lineHeight: "60px",
            color: "#FFA600",
          }}
        >
          {suffix}
        </span>
      </motion.p>
      <p
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 300,
          fontSize: "15px",
          lineHeight: "22px",
          color: "#747474",
          width: "100%",
          whiteSpace: "pre-wrap",
          margin: 0,
          minWidth: "100%",
        }}
      >
        {label}
      </p>
    </div>
  );
}

/* ─── IMAGE CARD ─────────────────────────────────────────────────────────── */
function ImageCard({
  height,
  src,
  innerRef,
  onMouseEnter,
  onMouseLeave,
  isHovered,
}: {
  height: number;
  src: string;
  innerRef?: RefObject<HTMLDivElement>;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isHovered?: boolean;
}) {
  return (
    <div
      ref={innerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        height: `${height}px`,
        borderRadius: "16px",
        flexShrink: 0,
        width: "100%",
        overflow: "hidden",
        position: "relative",
        cursor: isHovered ? "none" : "auto",
      }}
    >
      <ImageWithFallback
        src={src}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}

/* ─── VIEW ICON ──────────────────────────────────────────────────────────── */
function ViewIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* corner brackets → "expand / view" */}
      <path d="M9 3H3v6"   stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 3h6v6"  stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 19H3v-6" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 19h6v-6" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── CUSTOM CURSOR ──────────────────────────────────────────────────────── */
// Rendered at position:fixed so it floats above everything regardless of
// overflow:hidden parents. bounceKey remounts the div on each new card hover,
// re-running the spring from scale:0 → overshoot → 1 every time.
function CustomCursor({
  cursorX,
  cursorY,
  isHovering,
  bounceKey,
}: {
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
  isHovering: boolean;
  bounceKey: number;
}) {
  return (
    <motion.div
      key={bounceKey}
      initial={{ scale: 0, opacity: 0 }}
      animate={
        isHovering
          ? { scale: 1, opacity: 1 }
          : { scale: 0, opacity: 0 }
      }
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 16,
        mass: 0.8,
      }}
      style={{
        position: "fixed",
        left: cursorX,
        top: cursorY,
        x: "-50%",
        y: "-50%",
        width: 64,
        height: 64,
        borderRadius: "50%",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 9999,
        boxShadow: "0 4px 24px rgba(0,0,0,0.22)",
      }}
    >
      <ViewIcon />
    </motion.div>
  );
}

/* ─── SCROLL REVEAL CARD ─────────────────────────────────────────────────── */
// Each image card scales up from slightly-below as the scroll progress reaches
// its individual entrance threshold — staggered by the card's y-position in
// the grid so lower cards appear later (one-by-one "maximize from bottom").
function ScrollRevealCard({
  scrollYProgress,
  cardY,
  children,
}: {
  scrollYProgress: MotionValue<number>;
  cardY: number;           // card's top y-position in the grid (px)
  children: React.ReactNode;
}) {
  // Map cardY 0..764 → enterStart within Phase C 0.40..0.70
  const GRID_H   = 764;
  const C_START  = 0.40;
  const C_SPREAD = 0.30; // stagger occupies the first 30% of Phase C

  const enterStart = C_START + (cardY / GRID_H) * C_SPREAD;
  const enterEnd   = enterStart + 0.13;

  const scale   = useTransform(scrollYProgress, [enterStart, enterEnd], [0.82, 1.0]);
  const y       = useTransform(scrollYProgress, [enterStart, enterEnd], [28, 0]);
  const opacity = useTransform(scrollYProgress, [enterStart, Math.min(enterEnd - 0.03, 0.98)], [0, 1]);

  return (
    <motion.div
      style={{
        scale,
        y,
        opacity,
        transformOrigin: "center bottom",
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── MASONRY GRID ───────────────────────────────────────────────────────── */
function MasonryGrid({
  scrollYProgress,
  heroCardRef,
  activeClientIndex,
}: {
  scrollYProgress: MotionValue<number>;
  heroCardRef: RefObject<HTMLDivElement | null>;
  activeClientIndex: number;
}) {
  // Phase C (0.40 → 1.0): grid scrolls up
  const gridY = useTransform(scrollYProgress, [0.4, 1.0], [0, -360]);

  // ── Custom cursor state ──
  const cursorX   = useMotionValue(0);
  const cursorY   = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [bounceKey, setBounceKey]   = useState(0);
  const [hoveredId, setHoveredId]   = useState<string | null>(null);

  const handleCardEnter = useCallback((id: string) => {
    setIsHovering(true);
    setHoveredId(id);
    setBounceKey((k) => k + 1); // remounts cursor → fresh spring bounce
  }, []);

  const handleCardLeave = useCallback(() => {
    setIsHovering(false);
    setHoveredId(null);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [cursorX, cursorY]
  );

  // Get current client's portfolio
  const currentPortfolio = CLIENT_PORTFOLIOS[activeClientIndex];
  const posts = currentPortfolio.posts;
  const metrics = currentPortfolio.metrics;

  return (
    <>
      {/* ── Custom cursor (position:fixed, floats above all overflow clips) ── */}
      <CustomCursor
        cursorX={cursorX}
        cursorY={cursorY}
        isHovering={isHovering}
        bounceKey={bounceKey}
      />

      <motion.div
        onMouseMove={handleMouseMove}
        style={{
          display: "inline-grid",
          gridTemplateColumns: "max-content",
          gridTemplateRows: "max-content",
          placeItems: "start",
          position: "relative",
          flexShrink: 0,
          translateY: gridY,
        }}
      >
        {/* ── Column 1 — ml:0, mt:115.58 — Posts 0, 3, 4 + Metric1 ── */}
        <div
          style={{
            gridColumn: 1,
            gridRow: 1,
            marginLeft: 0,
            marginTop: "115.58px",
            width: "222.145px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <ScrollRevealCard scrollYProgress={scrollYProgress} cardY={115.58} key={`c1-0-${activeClientIndex}`}>
            <ImageCard
              height={302}
              src={posts[0]}
              isHovered={hoveredId === "c1-0"}
              onMouseEnter={() => handleCardEnter("c1-0")}
              onMouseLeave={handleCardLeave}
            />
          </ScrollRevealCard>
          <DynamicStatBlock
            value={metrics.metric1.value}
            suffix={metrics.metric1.suffix}
            label={metrics.metric1.label}
            delay={0}
            scrollYProgress={scrollYProgress}
            key={`metric1-${activeClientIndex}`}
          />
          {/* cardY = 115.58 + 302 + 24 + 110 + 24 = 575.58 */}
          <ScrollRevealCard scrollYProgress={scrollYProgress} cardY={575.58} key={`c1-3-${activeClientIndex}`}>
            <ImageCard
              height={222}
              src={posts[3]}
              isHovered={hoveredId === "c1-3"}
              onMouseEnter={() => handleCardEnter("c1-3")}
              onMouseLeave={handleCardLeave}
            />
          </ScrollRevealCard>
        </div>

        {/* ── Column 2 — ml:260, mt:0 — Posts 1, 5, 6 (hero is post 1) ── */}
        <div
          style={{
            gridColumn: 1,
            gridRow: 1,
            marginLeft: "260px",
            marginTop: 0,
            width: "222.3px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* cardY = 0 */}
          <ScrollRevealCard scrollYProgress={scrollYProgress} cardY={0} key={`c2-1-${activeClientIndex}`}>
            <ImageCard
              height={277}
              src={posts[1]}
              isHovered={hoveredId === "c2-1"}
              onMouseEnter={() => handleCardEnter("c2-1")}
              onMouseLeave={handleCardLeave}
            />
          </ScrollRevealCard>
          {/* Hero card — measured for fullscreen → grid animation; cardY = 0+277+24 = 301 */}
          <div ref={heroCardRef}>
            <ScrollRevealCard scrollYProgress={scrollYProgress} cardY={301} key={`c2-hero-${activeClientIndex}`}>
              <ImageCard
                height={302}
                src={posts[5]}
                isHovered={hoveredId === "c2-hero"}
                onMouseEnter={() => handleCardEnter("c2-hero")}
                onMouseLeave={handleCardLeave}
              />
            </ScrollRevealCard>
          </div>
          {/* cardY = 301 + 302 + 24 = 627 */}
          <ScrollRevealCard scrollYProgress={scrollYProgress} cardY={627} key={`c2-6-${activeClientIndex}`}>
            <ImageCard
              height={253}
              src={posts[6]}
              isHovered={hoveredId === "c2-6"}
              onMouseEnter={() => handleCardEnter("c2-6")}
              onMouseLeave={handleCardLeave}
            />
          </ScrollRevealCard>
        </div>

        {/* ── Column 3 — ml:519.86, mt:43 — Posts 2, 4 + Metric2 ── */}
        <div
          style={{
            gridColumn: 1,
            gridRow: 1,
            marginLeft: "519.86px",
            marginTop: "43px",
            width: "222.144px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* cardY = 43 */}
          <ScrollRevealCard scrollYProgress={scrollYProgress} cardY={43} key={`c3-2-${activeClientIndex}`}>
            <ImageCard
              height={302}
              src={posts[2]}
              isHovered={hoveredId === "c3-2"}
              onMouseEnter={() => handleCardEnter("c3-2")}
              onMouseLeave={handleCardLeave}
            />
          </ScrollRevealCard>
          <DynamicStatBlock
            value={metrics.metric2.value}
            suffix={metrics.metric2.suffix}
            label={metrics.metric2.label}
            delay={0.1}
            scrollYProgress={scrollYProgress}
            key={`metric2-${activeClientIndex}`}
          />
          {/* cardY = 43 + 302 + 24 + 110 + 24 = 503 */}
          <ScrollRevealCard scrollYProgress={scrollYProgress} cardY={503} key={`c3-4-${activeClientIndex}`}>
            <ImageCard
              height={222}
              src={posts[4]}
              isHovered={hoveredId === "c3-4"}
              onMouseEnter={() => handleCardEnter("c3-4")}
              onMouseLeave={handleCardLeave}
            />
          </ScrollRevealCard>
        </div>
      </motion.div>
    </>
  );
}

/* ─── LIST ITEMS DATA ────────────────────────────────────────────────────── */
const LIST_ITEMS = [
  { label: "Foodrite" },
  { label: "NutriBlend" },
  { label: "FreshHarvest" },
  { label: "PureVitality" },
  { label: "GoldenGrain" },
];

/* ─── CLIENT PORTFOLIO DATA ──────────────────────────────────────────────── */
// Each client has 7 creative posts + 2 metrics (9 items total in masonry grid)
const CLIENT_PORTFOLIOS = [
  // Foodrite
  {
    posts: [imgPlaceholder1, imgPlaceholder2, imgPlaceholder3, imgPlaceholder4, imgPlaceholder5, imgPlaceholder6, imgPlaceholder7],
    metrics: {
      metric1: { value: 156, suffix: "+", label: "Products Launched Successfully" },
      metric2: { value: 87, suffix: "%", label: "Market Share Growth Rate" },
    },
  },
  // NutriBlend
  {
    posts: [imgPlaceholder7, imgPlaceholder6, imgPlaceholder5, imgPlaceholder4, imgPlaceholder3, imgPlaceholder2, imgPlaceholder1],
    metrics: {
      metric1: { value: 240, suffix: "+", label: "We power discovery engagement" },
      metric2: { value: 92, suffix: "%", label: "Customer retention rate achieved" },
    },
  },
  // FreshHarvest
  {
    posts: [imgPlaceholder2, imgPlaceholder4, imgPlaceholder6, imgPlaceholder1, imgPlaceholder3, imgPlaceholder5, imgPlaceholder7],
    metrics: {
      metric1: { value: 189, suffix: "+", label: "Brand campaigns delivered" },
      metric2: { value: 95, suffix: "%", label: "Organic reach improvement" },
    },
  },
  // PureVitality
  {
    posts: [imgPlaceholder3, imgPlaceholder5, imgPlaceholder7, imgPlaceholder2, imgPlaceholder4, imgPlaceholder6, imgPlaceholder1],
    metrics: {
      metric1: { value: 310, suffix: "+", label: "Social media posts created" },
      metric2: { value: 88, suffix: "%", label: "Conversion rate uplift" },
    },
  },
  // GoldenGrain
  {
    posts: [imgPlaceholder4, imgPlaceholder6, imgPlaceholder1, imgPlaceholder3, imgPlaceholder5, imgPlaceholder7, imgPlaceholder2],
    metrics: {
      metric1: { value: 275, suffix: "+", label: "Content assets produced" },
      metric2: { value: 91, suffix: "%", label: "Brand awareness increase" },
    },
  },
];

/* ─── LIST PANEL ─────────────────────────────────────────────────────────── */
function ListPanel({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Phase C (0.40 → 1.0): drive active item with scroll
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (p >= 0.4) {
      const phaseC = clamp((p - 0.4) / 0.6, 0, 1);
      const idx = Math.min(LIST_ITEMS.length - 1, Math.floor(phaseC * LIST_ITEMS.length));
      setActiveIndex(idx);
    }
  });

  const handleClick = useCallback((i: number) => {
    setActiveIndex(i);
  }, []);

  return (
    <div
      style={{
        width: "257px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        alignSelf: "flex-start",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          alignItems: "flex-start",
          paddingLeft: "40px",
          paddingTop: "84px",
          width: "100%",
        }}
      >
        {LIST_ITEMS.map((item, i) => {
          const isActive = i === activeIndex;
          const isHovered = i === hoverIndex;
          const labelWords  = item.label.split(" ");

          return (
            <div key={i} style={{ display: "contents" }}>
              {/* List item row */}
              <motion.div
                onClick={() => handleClick(i)}
                onHoverStart={() => setHoverIndex(i)}
                onHoverEnd={() => setHoverIndex(null)}
                animate={{
                  opacity: isActive ? 1 : isHovered ? 0.75 : 0.45,
                  x: isActive ? 0 : isHovered ? 2 : 0,
                }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  width: "100%",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                {isActive ? (
                  /* Active: bullet + white text + detail */
                  <div style={{ width: "100%" }}>
                    <div
                      className="flex flex-row items-center"
                      style={{ paddingLeft: "6px" }}
                    >
                      <ul
                        style={{
                          fontFamily: "Manrope, sans-serif",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "26px",
                          color: "white",
                          width: "217px",
                          margin: 0,
                          padding: 0,
                          listStyle: "disc",
                          paddingLeft: "24px",
                        }}
                      >
                        {/* Active label — word-by-word reveal on mount */}
                        <li style={{ whiteSpace: "pre-wrap" }}>
                          {labelWords.map((word, wi) => (
                            <motion.span
                              key={wi}
                              initial={{ opacity: 0.15 }}
                              animate={{ opacity: 1 }}
                              transition={{
                                duration: 0.45,
                                ease: "easeOut",
                                delay: wi * 0.07,
                              }}
                              style={{
                                marginRight: wi < labelWords.length - 1 ? "0.28em" : 0,
                              }}
                            >
                              {word}
                            </motion.span>
                          ))}
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  /* Inactive: plain gray text (parent motion.div handles opacity) */
                  <div className="flex items-center" style={{ width: "100%" }}>
                    <p
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontWeight: 500,
                        fontSize: "15px",
                        lineHeight: "26px",
                        color: "#414141",
                        width: "217px",
                        whiteSpace: "pre-wrap",
                        margin: 0,
                        transition: "color 0.2s ease",
                      }}
                    >
                      {item.label}
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Gradient divider */}
              {i < LIST_ITEMS.length - 1 && (
                <div style={{ flexShrink: 0 }}>
                  <GradientLine width={115} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── TITLE ROW ──────────────────────────────────────────────────────────── */
function TitleRow() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  // Helper: one motion.span per word with staggered scroll-reveal opacity
  const W = (word: string, i: number, fw: number, color: string) => (
    <motion.span
      style={{ fontWeight: fw, color }}
      animate={{ opacity: isInView ? 1 : 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.07 }}
    >
      {word}
    </motion.span>
  );

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        width: "1061px",
        flexShrink: 0,
      }}
    >
      {/* Left: Title text */}
      <div style={{ width: "680px", flexShrink: 0 }}>
        <div
          className="capitalize"
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "48px",
            lineHeight: "1.44",
            whiteSpace: "pre-wrap",
            width: "100%",
          }}
        >
          <p style={{ margin: 0 }}>
            {W("Built", 0, 700, "white")}{" "}
            {W("For", 1, 700, "white")}{" "}
            {W("Baskets,", 2, 700, "white")}{" "}
            {W("Designed", 3, 700, "white")}{" "}
            {W("For", 4, 300, "#8e8e8e")}
          </p>
          <p style={{ margin: 0, fontWeight: 300, color: "#8e8e8e" }}>
            {W("Loyalty", 5, 300, "#8e8e8e")}{" "}
            {W("And", 6, 300, "#8e8e8e")}{" "}
            {W("Repeat", 7, 300, "#8e8e8e")}
          </p>
        </div>
      </div>

      {/* Right: Badge + Gradient line */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div style={{ paddingTop: "20px", marginLeft: "148.5px" }}>
          <FmcgBadge />
        </div>
        <div
          style={{
            position: "absolute",
            top: "36px",
            left: 0,
            transform: "rotate(180deg)",
          }}
        >
          <GradientLine width={134} />
        </div>
      </div>
    </div>
  );
}

/* ─── CONTENT ROW (selected element) ────────────────────────────────────── */
function ContentRow({
  scrollYProgress,
  heroCardRef,
  activeClientIndex,
}: {
  scrollYProgress: MotionValue<number>;
  heroCardRef: React.RefObject<any>;
  activeClientIndex: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        width: "1100px",
        flexShrink: 0,
        position: "relative",
      }}
    >
      {/* ── Left: Sticky interactive list ── */}
      <ListPanel scrollYProgress={scrollYProgress} />

      {/* ── Right: Scrolling masonry grid with bottom fade ── */}
      <div
        style={{
          flexShrink: 0,
          position: "relative",
          height: "680px",
          overflow: "hidden",
        }}
      >
        <MasonryGrid
          scrollYProgress={scrollYProgress}
          heroCardRef={heroCardRef}
          activeClientIndex={activeClientIndex}
        />

        {/* Bottom fade → infinite scroll illusion */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "220px",
            background:
              "linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.85) 40%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />

        {/* Top fade → smooth entry */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "60px",
            background:
              "linear-gradient(to bottom, #0a0a0a 0%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />
      </div>
    </div>
  );
}

/* ─── MOBILE / TABLET LAYOUT (≤ 1024 px) ────────────────────────────────── */
// Sections stacked vertically. Sticky tab bar auto-activates + auto-scrolls
// as the user scrolls through each content block. Clicking a tab jumps there.
function FmcgMobileLayout() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabsRef    = useRef<HTMLDivElement>(null);
  const tabBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isClickScrolling = useRef(false);

  // 2 images per tab — hero (tall) + secondary (shorter)
  const TAB_IMAGES: [string, string][] = [
    [IMG_C2_TOP,  IMG_C1_TOP ],
    [IMG_C1_TOP,  IMG_C3_TOP ],
    [IMG_C3_TOP,  IMG_C3_MID ],
    [IMG_C2_BTM,  IMG_C1_BTM ],
    [IMG_C3_MID,  IMG_C2_TOP ],
  ];

  // Centre the active tab pill in the scrollable bar
  const scrollTabIntoView = useCallback((idx: number) => {
    const btn       = tabBtnRefs.current[idx];
    const container = tabsRef.current;
    if (!btn || !container) return;
    container.scrollTo({
      left: btn.offsetLeft - container.offsetWidth / 2 + btn.offsetWidth / 2,
      behavior: "smooth",
    });
  }, []);

  // Scroll listener — activate whichever section's top is ≤ 38 % of viewport
  useEffect(() => {
    const onScroll = () => {
      if (isClickScrolling.current) return;
      const trigger = window.scrollY + window.innerHeight * 0.38;
      let active = 0;
      sectionRefs.current.forEach((ref, i) => {
        if (ref && ref.getBoundingClientRect().top + window.scrollY <= trigger) {
          active = i;
        }
      });
      setActiveTab((prev) => {
        if (prev !== active) scrollTabIntoView(active);
        return active;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTabIntoView]);

  const handleTabClick = (i: number) => {
    setActiveTab(i);
    scrollTabIntoView(i);
    isClickScrolling.current = true;
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => { isClickScrolling.current = false; }, 900);
  };

  return (
    <section
      style={{
        background: "#0a0a0a",
        width: "100%",
        boxSizing: "border-box",
        padding: "52px 0 60px",
      }}
    >
      {/* hide scrollbar cross-browser */}
      <style>{`.fmcg-tabs::-webkit-scrollbar{display:none}`}</style>

      {/* Header: badge + title */}
      <div style={{ padding: "0 20px", boxSizing: "border-box" }}>
        <FmcgBadge />
        <div
          style={{
            fontFamily: "Manrope, sans-serif",
            lineHeight: "1.35",
            marginTop: "20px",
            marginBottom: "28px",
          }}
        >
          <p style={{ margin: 0, fontSize: "clamp(26px, 7vw, 38px)" }}>
            <span style={{ fontWeight: 700, color: "white" }}>Built For Baskets, </span>
            <span style={{ fontWeight: 300, color: "#8e8e8e" }}>Designed </span>
          </p>
          <p style={{ margin: 0, fontWeight: 300, color: "#8e8e8e", fontSize: "clamp(26px, 7vw, 38px)" }}>
            For Loyalty And Repeat
          </p>
        </div>
      </div>

      {/* ── Sticky horizontal tab bar ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          background: "#0a0a0a",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        <div
          ref={tabsRef}
          className="fmcg-tabs"
          style={{
            display: "flex",
            gap: "10px",
            overflowX: "auto",
            scrollbarWidth: "none",
            padding: "12px 20px 10px",
          }}
        >
          {LIST_ITEMS.map((item, i) => (
            <button
              key={i}
              ref={(el) => { tabBtnRefs.current[i] = el; }}
              onClick={() => handleTabClick(i)}
              style={{
                flexShrink: 0,
                padding: "8px 18px",
                borderRadius: "40px",
                border: `1px solid ${i === activeTab ? "#FFA600" : "#414141"}`,
                background: i === activeTab ? "rgba(255,166,0,0.08)" : "#111",
                color: i === activeTab ? "#FFA600" : "#747474",
                fontFamily: "Poppins, sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                cursor: "pointer",
                whiteSpace: "nowrap",
                lineHeight: "normal",
                transition: "border-color 0.2s, color 0.2s, background 0.2s",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Vertically stacked tab sections ── */}
      <div style={{ padding: "0 20px", boxSizing: "border-box" }}>
        {LIST_ITEMS.map((item, i) => (
          <div
            key={i}
            ref={(el) => { sectionRefs.current[i] = el; }}
            style={{
              paddingTop: "32px",
              paddingBottom: "44px",
              borderBottom: i < LIST_ITEMS.length - 1 ? "1px solid #1a1a1a" : "none",
            }}
          >
            {/* Images: hero (tall) + secondary (shorter) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {TAB_IMAGES[i].map((src, j) => (
                <div
                  key={j}
                  style={{
                    width: "100%",
                    borderRadius: "16px",
                    overflow: "hidden",
                    height: j === 0 ? "clamp(200px, 55vw, 300px)" : "clamp(140px, 36vw, 200px)",
                    flexShrink: 0,
                  }}
                >
                  <ImageWithFallback
                    src={src}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Stats row ── */}
      <div style={{ padding: "0 20px", boxSizing: "border-box" }}>
        <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "1 1 120px" }}>
            <p style={{ margin: 0, fontFamily: "Manrope, sans-serif", fontWeight: 400, fontSize: "48px", lineHeight: "56px", color: "#FFA600" }}>
              123<span style={{ fontWeight: 200, fontSize: "40px" }}>+</span>
            </p>
            <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontWeight: 300, fontSize: "14px", lineHeight: "22px", color: "#747474" }}>
              We power discover engagement
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "1 1 120px" }}>
            <p style={{ margin: 0, fontFamily: "Manrope, sans-serif", fontWeight: 400, fontSize: "48px", lineHeight: "56px", color: "#FFA600" }}>
              98<span style={{ fontWeight: 400, fontSize: "30px" }}>%</span>
            </p>
            <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontWeight: 300, fontSize: "14px", lineHeight: "22px", color: "#747474" }}>
              We power discovery, lorem engagement
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FMCG PORTFOLIO SECTION ─────────────────────────────────────────────── */
// Desktop logic lives in FmcgDesktopLayout so that FmcgSection can
// conditionally render mobile/desktop without violating the Rules of Hooks.
function FmcgDesktopLayout() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const cardBoundsRef = useRef({ top: 520, left: 788, width: 222, height: 301 });
  const hasMeasured = useRef(false);

  const heroLeft = useMotionValue(0);
  const heroTop = useMotionValue(0);
  const heroW = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const heroH = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight : 900
  );
  const heroBR = useMotionValue(0);

  const { scrollY } = useScroll();

  const sectionTopRef = useRef(0);
  const sectionHeightRef = useRef(
    typeof window !== "undefined" ? window.innerHeight * 5 : 4500
  );

  // Track active client index based on scroll
  const [activeClientIndex, setActiveClientIndex] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        sectionTopRef.current = window.scrollY + rect.top;
        sectionHeightRef.current = rect.height;
      }
    };
    requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const scrollYProgress = useTransform(scrollY, (sy) => {
    const top = sectionTopRef.current;
    const height = sectionHeightRef.current;
    if (height === 0) return 0;
    return clamp((sy - top) / height, 0, 1);
  });

  const heroOpacity = useTransform(scrollYProgress, [0.33, 0.50], [1, 0]);
  const heroTextOpacity = useTransform(scrollYProgress, [0.0, 0.14], [1, 0]);
  const layoutOpacity = useTransform(scrollYProgress, [0.28, 0.46], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (p > 0.005 && !hasMeasured.current) {
      hasMeasured.current = true;
      if (heroCardRef.current) {
        const rect = heroCardRef.current.getBoundingClientRect();
        cardBoundsRef.current = {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        };
      }
    }

    // Update active client index based on scroll progress in Phase C
    if (p >= 0.4) {
      const phaseC = clamp((p - 0.4) / 0.6, 0, 1);
      const idx = Math.min(CLIENT_PORTFOLIOS.length - 1, Math.floor(phaseC * CLIENT_PORTFOLIOS.length));
      setActiveClientIndex(idx);
    }

    const phaseB_t = clamp((p - 0.15) / (0.4 - 0.15), 0, 1);
    const t = easeInOut(phaseB_t);

    const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
    const vh = typeof window !== "undefined" ? window.innerHeight : 900;
    const b = cardBoundsRef.current;

    heroLeft.set(lerp(0, b.left, t));
    heroTop.set(lerp(0, b.top, t));
    heroW.set(lerp(vw, b.width, t));
    heroH.set(lerp(vh, b.height, t));
    heroBR.set(lerp(0, 16, t));
  });

  return (
    <section
      ref={sectionRef}
      style={{ height: "500vh", position: "relative", width: "100%" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* ── Hero image overlay: fullscreen → middle card ── */}
        <motion.div
          style={{
            position: "absolute",
            left: heroLeft,
            top: heroTop,
            width: heroW,
            height: heroH,
            borderRadius: heroBR,
            overflow: "hidden",
            zIndex: 20,
            opacity: heroOpacity,
          }}
        >
          <ImageWithFallback
            src={IMG_HERO}
            alt="FMCG Portfolio"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)",
            }}
          />
          <motion.div
            style={{
              position: "absolute",
              bottom: "12%",
              left: "7%",
              opacity: heroTextOpacity,
            }}
          >
            <div
              style={{
                background: "#111",
                border: "1px solid #414141",
                borderRadius: "40px",
                padding: "6px 20px",
                display: "inline-flex",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 400,
                  fontSize: "13px",
                  color: "#FFA600",
                }}
              >
                The Native Unit
              </span>
            </div>
            <div
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 700,
                fontSize: "52px",
                lineHeight: "1.22",
                color: "white",
              }}
            >
              <div>Scale That Converts.</div>
              <div style={{ fontWeight: 300, color: "#8e8e8e" }}>From Shelf to Cart.</div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Main layout (fades in as hero contracts) ── */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            opacity: layoutOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "52px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "1200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                gap: "28px",
              }}
            >
              <TitleRow />
              <ContentRow
                scrollYProgress={scrollYProgress}
                heroCardRef={heroCardRef}
                activeClientIndex={activeClientIndex}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function FmcgSection() {
  const [isMobileTablet, setIsMobileTablet] = useState(() => window.innerWidth <= 1024);

  useEffect(() => {
    const check = () => setIsMobileTablet(window.innerWidth <= 1024);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobileTablet ? <FmcgMobileLayout /> : <FmcgDesktopLayout />;
}