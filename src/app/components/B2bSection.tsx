import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from "motion/react";
import { useRef, useId, useState, useCallback, useEffect } from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";

import klearStackImg from "@/assets/17570441db00c0be198ad56f30ef77fc9de689a2.png";
import eFaxImg       from "@/assets/49cdf6d45c8d08683c9745eac1631fd5935906e1.png";
import sensesImg     from "@/assets/84cadb9eba77f747c6bf62976d9e966fe6856c90.png";
import trueinImg     from "@/assets/78f367c8a6929e371020c903ab0f7d6155adb476.png";

/* ─── REAL PORTFOLIO DATA ────────────────────────────────────────────────── */
const PORTFOLIO = [
  {
    id: "01",
    number: "01",
    title: "KlearStack – 5x Inbound Leads",
    description: "Scaled organic traffic and AI search visibility by 5x, driving 3x growth in MQLs and lifting conversion rate from 1% to 3% through SEO-led demand generation.",
    image: klearStackImg,
  },
  {
    id: "02",
    number: "02",
    title: "eFax – 3X Signup Growth",
    description: "Redesigned the signup funnel to achieve 3X new signups with 50% lower drop-off rates, optimising the user journey for stronger retention and funnel conversion.",
    image: eFaxImg,
  },
  {
    id: "03",
    number: "03",
    title: "Senses – Scaling Organic Visibility",
    description: "Delivered 5X organic traffic growth, 50+ product keyword rankings, and 750+ keywords in AIO & SERP features via strategic SEO & keyword-growth campaigns.",
    image: sensesImg,
  },
  {
    id: "04",
    number: "04",
    title: "Truein – 5.4x High-Intent Conversions",
    description: "Achieved 5.4x increase in high-intent conversions within 60 days, doubling user engagement, boosting scroll depth by 30%, and tripling CTA click-through rates.",
    image: trueinImg,
  },
];

/* ─── SCROLL REVEAL UTILITY ──────────────────────────────────────────────── */
function computeReveal(
  sy: number,
  topRef: React.MutableRefObject<number>,
  offset: number,
  fromVal: number,
  toVal: number
): number {
  const t = topRef.current;
  const vh = window.innerHeight;
  const start = t - vh + offset;
  const end   = t - vh * 0.45 + offset;
  const raw   = (sy - start) / (end - start);
  const p     = Math.max(0, Math.min(1, raw));
  const eased = 1 - Math.pow(1 - p, 3);
  return fromVal + (toVal - fromVal) * eased;
}

/* ─── GRADIENT LINE ─────────────────────────────────────────────────────── */
function GradientLine({ width = 215 }: { width?: number }) {
  const uid = useId();
  const gradId = `b2b-gl-${uid.replace(/:/g, "")}`;
  return (
    <svg
      width={width}
      height="1"
      viewBox={`0 0 ${width} 1`}
      fill="none"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={gradId} x1="0" x2={width} y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#414141" />
          <stop offset="1" stopColor="#0A0A0A" />
        </linearGradient>
      </defs>
      <path d={`M0 0.5H${width}`} stroke={`url(#${gradId})`} />
    </svg>
  );
}

/* ─── B2B BADGE ──────────────────────────────────────────────────────────── */
function B2bBadge() {
  return (
    <div style={{ position: "relative", flexShrink: 0, display: "inline-block" }}>
      <div style={{ paddingTop: "20px" }}>
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
            }}
          >
            ThirdMeta
          </span>
        </div>
      </div>
      <div style={{ position: "absolute", top: "36.11px", left: "179px" }}>
        <GradientLine width={215} />
      </div>
    </div>
  );
}

/* ─── CARD TEXT BLOCK ────────────────────────────────────────────────────── */
interface CardTextProps {
  number: string;
  title: string;
  description: string;
}

function CardText({ number, title, description }: CardTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-40px" });

  const titleWords = title.split(" ");
  const descWords  = description.split(" ");

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        width: "100%",
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          fontFamily: "Manrope, sans-serif",
          fontWeight: 600,
          fontSize: "clamp(14px, 1.4vw, 20px)",
          lineHeight: "1.6",
          width: "100%",
          minWidth: 0,
          gap: "6px",
        }}
      >
        <span
          style={{
            color: "white",
            flexShrink: 1,
            minWidth: 0,
            overflow: "hidden",
            wordBreak: "break-word",
          }}
        >
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              animate={{ opacity: isInView ? 1 : 0.15 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.07 }}
              style={{ marginRight: i < titleWords.length - 1 ? "0.28em" : 0 }}
            >
              {word}
            </motion.span>
          ))}
        </span>
        <span style={{ color: "#414141", flexShrink: 0 }}>{number}</span>
      </div>
      <p
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 300,
          fontSize: "clamp(11px, 1.05vw, 15px)",
          lineHeight: "1.6",
          color: "#868686",
          width: "100%",
          minWidth: 0,
          margin: 0,
          overflowWrap: "break-word",
          wordBreak: "break-word",
        }}
      >
        {descWords.map((word, i) => (
          <motion.span
            key={i}
            animate={{ opacity: isInView ? 1 : 0.15 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: (titleWords.length + i) * 0.07 }}
          >
            {word}{i < descWords.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </p>
    </div>
  );
}

/* ─── CUSTOM CURSOR ──────────────────────────────────────────────────────── */
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
      animate={isHovering ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 16, mass: 0.8 }}
      style={{
        position: "fixed",
        left: cursorX,
        top: cursorY,
        x: "-50%",
        y: "-50%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "32px",
          padding: "12px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 24px rgba(0,0,0,0.22)",
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            fontSize: "15px",
            color: "#1b61db",
            lineHeight: "normal",
          }}
        >
          View
        </span>
      </div>
    </motion.div>
  );
}

/* ─── LIGHTBOX ───────────────────────────────────────────────────────────── */
function Lightbox({ image, title, onClose }: { image: string; title: string; onClose: () => void }) {
  const [zoomed, setZoomed] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Image wrapper — stop click propagation so clicking the image itself doesn't close */}
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: zoomed ? "95vw" : "min(860px, 90vw)",
          maxHeight: "90vh",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
          transition: "max-width 0.35s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <img
          src={image}
          alt={title}
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            maxHeight: "88vh",
            objectFit: "contain",
            cursor: zoomed ? "zoom-out" : "zoom-in",
          }}
          onClick={() => setZoomed((z) => !z)}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            border: "none",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.28)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.15)"; }}
        >
          <X size={18} />
        </button>

        {/* Zoom toggle button */}
        <button
          onClick={() => setZoomed((z) => !z)}
          style={{
            position: "absolute",
            top: "14px",
            right: "62px",
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            border: "none",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.28)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.15)"; }}
        >
          {zoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
        </button>

        {/* Caption */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "16px 20px",
            background: "linear-gradient(transparent, rgba(0,0,0,0.72))",
            fontFamily: "Manrope, sans-serif",
            fontWeight: 600,
            fontSize: "15px",
            color: "white",
          }}
        >
          {title}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── CARD PLACEHOLDER → REAL IMAGE CARD ────────────────────────────────── */
function CardImage({
  image,
  title,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  image: string;
  title: string;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{
        borderRadius: "16px",
        flexShrink: 0,
        width: "100%",
        cursor: isHovered ? "none" : "auto",
        overflow: "hidden",
        position: "relative",
        lineHeight: 0,
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
          transform: isHovered ? "scale(1.04)" : "scale(1)",
        }}
      />
    </div>
  );
}

/* ─── REVEAL CARD IMAGE ──────────────────────────────────────────────────── */
function RevealCardPlaceholder({
  image,
  title,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  image: string;
  title: string;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-60px 0px" });

  return (
    <div ref={ref} style={{ width: "100%", flexShrink: 0, position: "relative" }}>
      <motion.div
        style={{ transformOrigin: "center bottom" }}
        initial={{ scale: 0.84 }}
        animate={inView ? { scale: 1 } : { scale: 0.84 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <CardImage
          image={image}
          title={title}
          isHovered={isHovered}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        />
      </motion.div>
    </div>
  );
}

/* ─── CARD COLUMN ────────────────────────────────────────────────────────── */
interface CardColumnProps {
  number: string;
  title: string;
  description: string;
  image: string;
  paddingTop?: number;
  delay?: number;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

function CardColumn({
  number,
  title,
  description,
  image,
  paddingTop = 0,
  delay = 0,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: CardColumnProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      style={{
        flex: "1 1 0",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        alignItems: "stretch",
        justifyContent: "flex-start",
        paddingTop: paddingTop > 0 ? `${paddingTop}px` : undefined,
        position: "relative",
        overflow: "hidden",
      }}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <RevealCardPlaceholder
        image={image}
        title={title}
        isHovered={isHovered}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      />
      <CardText number={number} title={title} description={description} />
    </motion.div>
  );
}

/* ─── CARDS SECTION (desktop) ────────────────────────────────────────────── */
function CardsSection() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [isHovering, setIsHovering]   = useState(false);
  const [bounceKey, setBounceKey]     = useState(0);
  const [hoveredId, setHoveredId]     = useState<string | null>(null);
  const [lightboxItem, setLightboxItem] = useState<{ image: string; title: string } | null>(null);

  const handleCardEnter = useCallback((id: string) => {
    setIsHovering(true);
    setHoveredId(id);
    setBounceKey((k) => k + 1);
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

  const openLightbox = useCallback((item: { image: string; title: string }) => {
    setLightboxItem(item);
  }, []);

  const p = PORTFOLIO;

  return (
    <>
      <CustomCursor cursorX={cursorX} cursorY={cursorY} isHovering={isHovering} bounceKey={bounceKey} />
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox
            image={lightboxItem.image}
            title={lightboxItem.title}
            onClose={() => setLightboxItem(null)}
          />
        )}
      </AnimatePresence>
      <motion.div
        onMouseMove={handleMouseMove}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          position: "relative",
          flexShrink: 0,
          width: "100%",
          transformOrigin: "50% 50%",
        }}
      >
        {/* ══ Group 1 (items 01–04) ══ */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", paddingBottom: "145px", flexShrink: 0 }}>
          {/* Row 1 */}
          <div style={{ display: "flex", gap: "clamp(16px, 2.5vw, 40px)", alignItems: "flex-start", marginBottom: "-145px", position: "relative", width: "100%", flexShrink: 0 }}>
            <CardColumn number={p[0].number} title={p[0].title} description={p[0].description} image={p[0].image} delay={0.05} isHovered={hoveredId === "g1-01"} onMouseEnter={() => handleCardEnter("g1-01")} onMouseLeave={handleCardLeave} onClick={() => openLightbox(p[0])} />
            <CardColumn number={p[1].number} title={p[1].title} description={p[1].description} image={p[1].image} delay={0.15} isHovered={hoveredId === "g1-02"} onMouseEnter={() => handleCardEnter("g1-02")} onMouseLeave={handleCardLeave} onClick={() => openLightbox(p[1])} />
          </div>
          {/* Row 2 */}
          <div style={{ display: "flex", gap: "clamp(16px, 2.5vw, 40px)", alignItems: "flex-start", marginBottom: "-145px", position: "relative", width: "100%", flexShrink: 0 }}>
            <CardColumn number={p[2].number} title={p[2].title} description={p[2].description} image={p[2].image} paddingTop={204} delay={0.1} isHovered={hoveredId === "g1-03"} onMouseEnter={() => handleCardEnter("g1-03")} onMouseLeave={handleCardLeave} onClick={() => openLightbox(p[2])} />
            <CardColumn number={p[3].number} title={p[3].title} description={p[3].description} image={p[3].image} delay={0.2} isHovered={hoveredId === "g1-04"} onMouseEnter={() => handleCardEnter("g1-04")} onMouseLeave={handleCardLeave} onClick={() => openLightbox(p[3])} />
          </div>
        </div>
      </motion.div>
    </>
  );
}

/* ─── TITLE ROW (desktop) ────────────────────────────────────────────────── */
function TitleRow() {
  const ref    = useRef<HTMLDivElement>(null);
  const topRef = useRef<number>(9999);
  const { scrollY } = useScroll();

  useEffect(() => {
    const measure = () => {
      if (!ref.current) return;
      topRef.current = ref.current.getBoundingClientRect().top + window.scrollY;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const badgeOpacity  = useTransform(scrollY, (sy) => computeReveal(sy, topRef,  0, 0.3, 1));
  const badgeY        = useTransform(scrollY, (sy) => computeReveal(sy, topRef,  0, 16,  0));
  const line1Opacity  = useTransform(scrollY, (sy) => computeReveal(sy, topRef, 40, 0.3, 1));
  const line1Y        = useTransform(scrollY, (sy) => computeReveal(sy, topRef, 40, 16,  0));
  const line2Opacity  = useTransform(scrollY, (sy) => computeReveal(sy, topRef, 80, 0.3, 1));
  const line2Y        = useTransform(scrollY, (sy) => computeReveal(sy, topRef, 80, 16,  0));

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        width: "100%",
        flexShrink: 0,
      }}
    >
      <motion.div style={{ opacity: badgeOpacity, y: badgeY }}>
        <B2bBadge />
      </motion.div>
      <div style={{ width: "632px", flexShrink: 0 }}>
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
          <motion.p style={{ margin: 0, opacity: line1Opacity, y: line1Y }}>
            <span style={{ fontWeight: 700, color: "white" }}>Qualified Leads. Closed Deals. </span>
            <span style={{ fontWeight: 300, color: "#8e8e8e" }}>B2B Growth Done Right.</span>
          </motion.p>
        </div>
      </div>
    </div>
  );
}

/* ─── MOBILE LAYOUT ──────────────────────────────────────────────────────── */
function B2bMobileLayout() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isClickScrolling = useRef(false);
  const [lightboxItem, setLightboxItem] = useState<{ image: string; title: string } | null>(null);

  /* Centre the active pill in the scrollable tab bar */
  const scrollTabIntoView = useCallback((idx: number) => {
    const btn = tabBtnRefs.current[idx];
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
   * throttled or suppressed mid-swipe on real devices.
   *
   * rootMargin "-38% 0px 0% 0px" means the trigger line sits 38% from the
   * top of the viewport (same threshold as the old scroll listener).
   * A section is "intersecting" when its top edge has passed that line.
   * We track all intersecting sections and activate the highest-index one
   * (i.e. the furthest-down section whose top has cleared the trigger).
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
        width: "100%",
        background: "#0a0a0a",
        boxSizing: "border-box",
        padding: "52px 0 60px",
      }}
    >
      {/* hide tab-bar scrollbar cross-browser */}
      <style>{`.b2b-tabs::-webkit-scrollbar{display:none}`}</style>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox
            image={lightboxItem.image}
            title={lightboxItem.title}
            onClose={() => setLightboxItem(null)}
          />
        )}
      </AnimatePresence>

      {/* 1. Label (badge) */}
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
            ThirdMeta
          </span>
        </div>
      </div>

      {/* 2. Title */}
      <div style={{ padding: "0 20px", boxSizing: "border-box", marginBottom: "32px" }}>
        <div style={{ fontFamily: "Manrope, sans-serif", lineHeight: "1.35" }}>
          <p style={{ margin: 0, fontSize: "clamp(26px, 7vw, 38px)" }}>
            <span style={{ fontWeight: 700, color: "white" }}>Qualified Leads. Closed Deals. </span>
            <span style={{ fontWeight: 300, color: "#8e8e8e" }}>B2B Growth Done Right.</span>
          </p>
        </div>
      </div>

      {/* 3. Sticky horizontal tab bar */}
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
          className="b2b-tabs"
          style={{
            display: "flex",
            gap: "10px",
            overflowX: "auto",
            scrollbarWidth: "none",
            padding: "12px 20px 10px",
          }}
        >
          {PORTFOLIO.map((card, i) => (
            <button
              key={card.id}
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
              {card.number} · {card.title.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Vertically stacked card sections */}
      <div style={{ padding: "0 20px", boxSizing: "border-box" }}>
        {PORTFOLIO.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => { sectionRefs.current[i] = el; }}
            style={{
              paddingTop: "32px",
              paddingBottom: "44px",
              borderBottom: i < PORTFOLIO.length - 1 ? "1px solid #1a1a1a" : "none",
            }}
          >
            {/* Image */}
            <div
              onClick={() => setLightboxItem(card)}
              style={{
                width: "100%",
                height: "clamp(200px, 52vw, 300px)",
                borderRadius: "16px",
                marginBottom: "16px",
                flexShrink: 0,
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <img
                src={card.image}
                alt={card.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              {/* View pill overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  right: "12px",
                  background: "white",
                  borderRadius: "32px",
                  padding: "8px 18px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "13px",
                  color: "#1b61db",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
                }}
              >
                View
              </div>
            </div>
            {/* Title + number */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "6px",
              }}
            >
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
                {card.number}
              </span>
            </div>
            {/* Description */}
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
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── B2B PORTFOLIO SECTION ──────────────────────────────────────────────── */
function B2bDesktopLayout() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);

  return (
    <section
      style={{
        width: "100%",
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 0,
      }}
    >
      <motion.div
        ref={sectionRef}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "0 max(20px, min(100px, calc((100vw - 1240px) / 2)))",
          display: "flex",
          flexDirection: "column",
          gap: "60px",
          alignItems: "flex-start",
          position: "relative",
          opacity: sectionOpacity,
          transformOrigin: "50% 50%",
        }}
      >
        <TitleRow />
        <CardsSection />
      </motion.div>
    </section>
  );
}

export function B2bSection() {
  const [isMobileTablet, setIsMobileTablet] = useState(() => window.innerWidth <= 1024);

  useEffect(() => {
    const check = () => setIsMobileTablet(window.innerWidth <= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobileTablet ? <B2bMobileLayout /> : <B2bDesktopLayout />;
}