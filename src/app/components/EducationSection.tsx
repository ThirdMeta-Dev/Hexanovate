import { motion, AnimatePresence, useInView, useScroll, useTransform } from "motion/react";
import { useRef, useId, useState, useEffect, useCallback, createContext, useContext } from "react";
import { useCmsSectionContent } from "../context/CmsSectionContext";

import elmoImg       from "@/assets/d6712a28c4427451654076b57057128fe4979cf4.jpg";
import cybernetyxImg from "@/assets/2bde221ff9288c4d81474060fcb820a6a1113526.jpg";
import eyrisImg      from "@/assets/131456e21cf49af42a068b828a52cbe44337bec0.jpg";

/* ─── SLIDE DATA (5 real education portfolio items) ──────────────────────── */
const SLIDE_CARDS = [
  {
    num: "01",
    title: "ELMO – 3X Revenue Growth",
    desc: "Achieved 3X revenue growth with deeper website engagement — boosting scroll depth by 50% and higher on-site interactions through a full-funnel content and UX strategy.",
    image: elmoImg,
  },
  {
    num: "02",
    title: "cybernetyx – 12.9x Qualified Leads",
    desc: "Scaled qualified leads from 120 to 1,548 — a 12.9x increase — while delivering 21.7x ROI and generating 1,992 ad leads through precision-targeted demand generation campaigns.",
    image: cybernetyxImg,
  },
  {
    num: "03",
    title: "EyRIS – 10X Lead Volume Growth",
    desc: "Lowered cost per lead by 2X while driving 10X growth in lead volume and doubling qualified demo requests through optimised paid media and conversion-rate improvements.",
    image: eyrisImg,
  },
  {
    num: "04",
    title: "EduHexa – 4.2x Engagement Growth",
    desc: "Built a cohesive digital learning ecosystem for EduHexa, achieving 4.2x engagement growth and 60K new enrollments through a refined student acquisition funnel.",
    image: "https://images.unsplash.com/photo-1758272421542-b6bd81729cb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  },
  {
    num: "05",
    title: "Future Skills Funnel – 52% CPL Reduction",
    desc: "Redesigned the full digital funnel for a global skills training platform — from paid demand gen to landing pages — cutting cost-per-lead by 52% while scaling reach.",
    image: "https://images.unsplash.com/photo-1758685848521-ff7e4d136384?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  },
];
const NUM_CARDS = SLIDE_CARDS.length; // 5

type SlideCard = typeof SLIDE_CARDS[0];
const SlideCtx = createContext<SlideCard[]>(SLIDE_CARDS);

/* ─── LAYOUT CONSTANTS (middle column geometry) ─────────────────────────── */
const CARD_W = 530;
const CARD_H = 308;
const CONTAINER_H = 548;
const TEXT_GAP = 12;
const TEXT_H = 84;
const ACTIVE_GROUP_H = CARD_H + TEXT_GAP + TEXT_H;       // 404
const ACTIVE_CARD_TOP = CONTAINER_H - ACTIVE_GROUP_H;    // 144

const GHOST_SCALE = 0.78;
const GHOST_OFFSET = 60;

const GHOST_TOP = -GHOST_OFFSET;
const GHOST_Y_INIT = ACTIVE_CARD_TOP - GHOST_TOP;        // 204

const GHOST_BOTTOM = -GHOST_OFFSET;
const GHOST_Y_INIT_DOWN = ACTIVE_CARD_TOP - (CONTAINER_H + GHOST_OFFSET - CARD_H); // −156

/* ─── HORIZONTAL GRADIENT DIVIDER ────────────────────────────────────────── */
function HGradientLine() {
  const uid = useId();
  const id = `edu-hl-${uid.replace(/:/g, "")}`;
  return (
    <svg width={115} height={1} viewBox="0 0 115 1" fill="none" style={{ display: "block", flexShrink: 0 }}>
      <defs>
        <linearGradient id={id} x1="0" x2="115" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#414141" />
          <stop offset="1" stopColor="#0A0A0A" />
        </linearGradient>
      </defs>
      <path d="M0 0.5H115" stroke={`url(#${id})`} />
    </svg>
  );
}

/* ─── VERTICAL GRADIENT LINE ─────────────────────────────────────────────── */
function VerticalGradientLine() {
  const uid = useId();
  const id = `edu-vl-${uid.replace(/:/g, "")}`;
  return (
    <svg
      width={1} height={245} viewBox="0 0 1 245" fill="none"
      style={{ position: "absolute", left: "20px", top: "66.75px", display: "block" }}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="245" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0A0A0A" />
          <stop offset="1" stopColor="#414141" />
        </linearGradient>
      </defs>
      <line x1="0.5" y1="0" x2="0.5" y2="245" stroke={`url(#${id})`} />
    </svg>
  );
}

/* ─── EDUCATION BADGE ────────────────────────────────────────────────────── */
function EducationBadge() {
  return (
    <div style={{ paddingTop: "20px", flexShrink: 0 }}>
      <div
        style={{
          background: "#111",
          border: "1px solid #414141",
          borderRadius: "40px",
          padding: "6px 20px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontSize: "13px",
            color: "#FFA600",
            lineHeight: "normal",
            whiteSpace: "nowrap",
          }}
        >
          EduHexa
        </span>
      </div>
    </div>
  );
}

/* ─── CARD IMAGE (replaces gray placeholder) ─────────────────────────────── */
function EducCard({ width, height, image, title }: { width: number; height: number; image: string; title: string }) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: "12px",
        flexShrink: 0,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, transparent 55%, rgba(10,10,10,0.4))",
        pointerEvents: "none",
      }} />
    </div>
  );
}

/* ─── CARD TEXT (below active card) ─────────────────────────────────────── */
function CardText({ card }: { card: (typeof SLIDE_CARDS)[0] | undefined }) {
  if (!card) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%", flexShrink: 0 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          fontFamily: "Manrope, sans-serif",
          fontWeight: 600,
          fontSize: "20px",
          lineHeight: "32px",
          width: "100%",
        }}
      >
        <span style={{ color: "white", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {card.title}
        </span>
        <span style={{ color: "#414141", marginLeft: "8px", flexShrink: 0 }}>{card.num}</span>
      </div>
      <p
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 300,
          fontSize: "15px",
          lineHeight: "23px",
          color: "#868686",
          width: "100%",
          margin: 0,
        }}
      >
        {card.desc}
      </p>
    </div>
  );
}

/* ─── LEFT COLUMN — desktop only ────────────────────────────────────────── */
function LeftColumn() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div
      ref={ref}
      style={{
        width: "274px",
        height: `${CONTAINER_H}px`,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        position: "relative",
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <EducationBadge />
      </motion.div>

      <VerticalGradientLine />

      <p
        style={{
          fontFamily: "Manrope, sans-serif",
          fontSize: "44px",
          lineHeight: "1.44",
          textTransform: "capitalize",
          margin: 0,
          flexShrink: 0,
          width: "min-content",
          minWidth: "100%",
        }}
      >
        <motion.span
          style={{ fontWeight: 700, color: "white" }}
          initial={{ opacity: 0.25 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >Education</motion.span>
        {" "}
        <motion.span
          style={{ fontWeight: 700, color: "white" }}
          initial={{ opacity: 0.25 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >Portfolio</motion.span>
        {" "}
        <motion.span
          style={{ fontWeight: 300, color: "#8e8e8e" }}
          initial={{ opacity: 0.25 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >That Drives Admissions</motion.span>
      </p>
    </div>
  );
}

/* ─── ANIMATED MIDDLE COLUMN — desktop only ──────────────────────────────── */
function AnimatedMiddleColumn({ step, prevStep }: { step: number; prevStep: number | null }) {
  const isDown: boolean = prevStep !== null ? step > prevStep : true;
  const showGhost = prevStep !== null || step === 0;
  const ghostKey  = prevStep !== null ? `ghost-prev-${prevStep}` : `ghost-peek`;

  const ghostPositionStyle = isDown
    ? { top: GHOST_TOP,    bottom: "auto" as const }
    : { bottom: GHOST_BOTTOM, top: "auto" as const };

  const ghostOrigin = isDown ? "top center" : "bottom center";

  const ghostInitial = prevStep !== null
    ? { y: isDown ? GHOST_Y_INIT : GHOST_Y_INIT_DOWN, scale: 1, opacity: 1 }
    : false;

  const ghostAnimate = prevStep !== null
    ? { y: 0, scale: GHOST_SCALE, opacity: 0.55 }
    : { y: 0, scale: GHOST_SCALE, opacity: 0.38 };

  const ghostExit = { opacity: 0, scale: GHOST_SCALE * 0.84 };

  const activeInitial = step === 0
    ? false
    : { y: isDown ? 200 : -200, opacity: 0 };

  const activeExit = { y: isDown ? -30 : 30, opacity: 0 };

  const maskGrad = "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 9%, black 26%, black 100%)";

  const ghostCard = SLIDE_CARDS[prevStep !== null ? prevStep : 0];
  const activeCard = SLIDE_CARDS[Math.min(step, SLIDE_CARDS.length - 1)];

  return (
    <div
      style={{
        position: "relative",
        flexShrink: 0,
        width: `${CARD_W}px`,
        height: `${CONTAINER_H}px`,
        overflow: "hidden",
        WebkitMaskImage: maskGrad,
        maskImage: maskGrad,
      }}
    >
      <AnimatePresence>
        {showGhost && (
          <motion.div
            key={ghostKey}
            style={{ position: "absolute", ...ghostPositionStyle, left: 0, width: CARD_W, transformOrigin: ghostOrigin }}
            initial={ghostInitial}
            animate={ghostAnimate}
            exit={ghostExit}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <EducCard width={CARD_W} height={CARD_H} image={ghostCard.image} title={ghostCard.title} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={`active-${step}`}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: CARD_W,
            display: "flex",
            flexDirection: "column",
            gap: `${TEXT_GAP}px`,
          }}
          initial={activeInitial}
          animate={{ y: 0, opacity: 1 }}
          exit={activeExit}
          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
        >
          <EducCard width={CARD_W} height={CARD_H} image={activeCard.image} title={activeCard.title} />
          <CardText card={activeCard} />
        </motion.div>
      </AnimatePresence>

      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.55) 22%, transparent 42%)",
          pointerEvents: "none",
          zIndex: -1,
        }}
        animate={{ opacity: isDown ? 0 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  );
}

/* ─── RIGHT COLUMN (list panel) — desktop only ───────────────────────────── */
function ListPanel({ step, onStepChange }: { step: number; onStepChange: (targetStep: number) => void }) {
  return (
    <div
      style={{
        flex: "1 0 0",
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        minWidth: 0,
        minHeight: 0,
      }}
    >
      <div
        style={{
          flex: "1 0 0",
          height: "100%",
          minWidth: 0,
          minHeight: 0,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingBottom: "216px",
            height: "100%",
          }}
        >
          {SLIDE_CARDS.map((card, i) => {
            const isActive = step === i;
            const titleWords = card.title.split(" ");
            return (
              <div key={i} style={{ display: "contents" }}>
                <motion.div
                  style={{ width: "100%", cursor: "pointer" }}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  whileHover={!isActive ? { x: 6 } : {}}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => onStepChange(i)}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      style={{
                        position: "absolute",
                        left: -12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 3,
                        height: 20,
                        background: "#FFA600",
                        borderRadius: 2,
                      }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  {isActive ? (
                    <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
                      <ul
                        style={{
                          fontFamily: "Manrope, sans-serif",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "26px",
                          color: "white",
                          listStyle: "disc",
                          paddingLeft: "24px",
                          margin: 0,
                          flex: "1 0 0",
                          minWidth: 0,
                        }}
                      >
                        <li style={{ whiteSpace: "nowrap" }}>
                          {titleWords.map((word, wi) => (
                            <motion.span
                              key={wi}
                              initial={{ opacity: 0.15 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.45, ease: "easeOut", delay: wi * 0.07 }}
                              style={{ marginRight: wi < titleWords.length - 1 ? "0.28em" : 0 }}
                            >
                              {word}
                            </motion.span>
                          ))}
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
                      <p
                        style={{
                          fontFamily: "Manrope, sans-serif",
                          fontWeight: 500,
                          fontSize: "15px",
                          lineHeight: "26px",
                          color: "#414141",
                          flex: "1 0 0",
                          minWidth: 0,
                          margin: 0,
                          transition: "color 0.25s ease",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {card.title}
                      </p>
                    </div>
                  )}
                </motion.div>

                {i < SLIDE_CARDS.length - 1 && (
                  <motion.div
                    style={{ flexShrink: 0 }}
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.3, delay: i * 0.08 + 0.08 }}
                  >
                    <HGradientLine />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── DESKTOP LAYOUT ─────────────────────────────────────────────────────── */
function EducationDesktopLayout() {
  const SLIDE_CARDS = useContext(SlideCtx);
  const sectionRef = useRef<HTMLElement>(null);
  const stepRef    = useRef(0);
  const [step,     setStep]     = useState(0);
  const [prevStep, setPrevStep] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const frameOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const scrolled   = window.scrollY - sectionTop;
    const vh         = window.innerHeight;
    const raw        = Math.floor(scrolled / vh);
    if (!isFinite(raw)) return;
    const newStep = Math.max(0, Math.min(NUM_CARDS - 1, raw));
    if (newStep !== stepRef.current) {
      setPrevStep(stepRef.current);
      setStep(newStep);
      stepRef.current = newStep;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToStep = useCallback((targetStep: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: sectionTop + targetStep * window.innerHeight, behavior: "smooth" });
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        width: "100%",
        background: "#0a0a0a",
        height: `${NUM_CARDS * 100}vh`,
        position: "relative",
        padding: 0,
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          style={{
            width: "1099.824px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            position: "relative",
            flexShrink: 0,
            opacity: frameOpacity,
            transformOrigin: "50% 50%",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "48px",
              alignItems: "flex-end",
              position: "relative",
              flexShrink: 0,
              width: "100%",
            }}
          >
            <LeftColumn />
            <AnimatedMiddleColumn step={step} prevStep={prevStep} />
            <ListPanel step={step} onStepChange={(targetStep) => scrollToStep(targetStep)} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── MOBILE / TABLET LAYOUT ─────────────────────────────────────────────── */
// Structure: label → title → sticky horizontal tabs → vertically stacked card
// sections. Scroll listener activates the matching tab as each section enters
// the viewport. Clicking a tab jumps to that section.
function EducationMobileLayout() {
  const SLIDE_CARDS = useContext(SlideCtx);
  const [activeTab, setActiveTab] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabsRef     = useRef<HTMLDivElement>(null);
  const tabBtnRefs  = useRef<(HTMLButtonElement | null)[]>([]);
  const isClickScrolling = useRef(false);

  /* Centre the active pill in the tab bar */
  const scrollTabIntoView = useCallback((idx: number) => {
    const btn       = tabBtnRefs.current[idx];
    const container = tabsRef.current;
    if (!btn || !container) return;
    container.scrollTo({
      left: btn.offsetLeft - container.offsetWidth / 2 + btn.offsetWidth / 2,
      behavior: "smooth",
    });
  }, []);

  /*
   * IntersectionObserver — fires reliably on iOS Safari & Android even during
   * momentum (inertial) scrolling, unlike window "scroll" events which are
   * throttled / suppressed mid-swipe on real devices.
   *
   * rootMargin "-38% 0px 0% 0px" places the trigger line 38% from the top of
   * the viewport (matching the original scroll-listener threshold). A section
   * is "intersecting" once its top edge has cleared that line. We keep a Set
   * of all currently-intersecting sections and activate the highest-index one
   * — i.e. the deepest section whose top has passed the trigger.
   */
  useEffect(() => {
    const intersecting = new Set<number>();
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        entries.forEach((entry) => {
          const idx = sectionRefs.current.findIndex((r) => r === entry.target);
          if (idx < 0) return;
          if (entry.isIntersecting) intersecting.add(idx);
          else intersecting.delete(idx);
        });
        if (intersecting.size > 0) {
          const active = Math.max(...intersecting);
          setActiveTab((prev) => {
            if (prev !== active) scrollTabIntoView(active);
            return active;
          });
        }
      },
      { rootMargin: "-38% 0px 0% 0px", threshold: 0 }
    );
    sectionRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
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
      <style>{`.edu-tabs::-webkit-scrollbar{display:none}`}</style>

      {/* ── 1. Label (badge) ── */}
      <div style={{ padding: "0 20px", boxSizing: "border-box", marginBottom: "20px" }}>
        <div
          style={{
            background: "#111",
            border: "1px solid #414141",
            borderRadius: "40px",
            padding: "6px 20px",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              fontSize: "13px",
              color: "#FFA600",
              lineHeight: "normal",
              whiteSpace: "nowrap",
            }}
          >
            Education Domain Portfolio
          </span>
        </div>
      </div>

      {/* ── 2. Title ── */}
      <div style={{ padding: "0 20px", boxSizing: "border-box", marginBottom: "32px" }}>
        <div style={{ fontFamily: "Manrope, sans-serif", lineHeight: "1.35" }}>
          <p style={{ margin: 0, fontSize: "clamp(26px, 7vw, 38px)" }}>
            <span style={{ fontWeight: 700, color: "white" }}>Education Portfolio </span>
            <span style={{ fontWeight: 300, color: "#8e8e8e" }}>That Drives Admissions</span>
          </p>
        </div>
      </div>

      {/* ── 3. Sticky horizontal tab bar ── */}
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
          className="edu-tabs"
          style={{
            display: "flex",
            gap: "10px",
            overflowX: "auto",
            scrollbarWidth: "none",
            padding: "12px 20px 10px",
          }}
        >
          {SLIDE_CARDS.map((card, i) => (
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
              {card.num} · {card.title.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>
      </div>

      {/* ── 4. Vertically stacked card sections ── */}
      <div style={{ padding: "0 20px", boxSizing: "border-box" }}>
        {SLIDE_CARDS.map((card, i) => (
          <div
            key={i}
            ref={(el) => { sectionRefs.current[i] = el; }}
            style={{
              paddingTop: "32px",
              paddingBottom: "44px",
              borderBottom: i < SLIDE_CARDS.length - 1 ? "1px solid #1a1a1a" : "none",
            }}
          >
            {/* Card placeholder → real image */}
            <div
              style={{
                width: "100%",
                height: "clamp(200px, 52vw, 300px)",
                borderRadius: "16px",
                marginBottom: "16px",
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              <img
                src={card.image}
                alt={card.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            {/* Card text */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
              <span
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 600,
                  fontSize: "18px",
                  lineHeight: "28px",
                  color: "white",
                  flex: 1,
                }}
              >
                {card.title}
              </span>
              <span
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 500,
                  fontSize: "15px",
                  color: "#414141",
                  marginLeft: "12px",
                  flexShrink: 0,
                }}
              >
                {card.num}
              </span>
            </div>
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 300,
                fontSize: "14px",
                lineHeight: "22px",
                color: "#868686",
                margin: 0,
              }}
            >
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── EDUCATION DOMAIN PORTFOLIO SECTION ────────────────────────────────── */
export function EducationSection() {
  const { items } = useCmsSectionContent();
  const [isMobileTablet, setIsMobileTablet] = useState(() => window.innerWidth <= 1024);

  const slides: SlideCard[] = items.length > 0
    ? items.map((item, i) => ({
        num: String(item.num ?? String(i + 1).padStart(2, "0")),
        title: String(item.title ?? ""),
        desc: String(item.desc ?? ""),
        image: String(item.imageUrl || SLIDE_CARDS[i]?.image || ""),
      }))
    : SLIDE_CARDS;

  useEffect(() => {
    const check = () => setIsMobileTablet(window.innerWidth <= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <SlideCtx.Provider value={slides}>
      {isMobileTablet ? <EducationMobileLayout /> : <EducationDesktopLayout />}
    </SlideCtx.Provider>
  );
}