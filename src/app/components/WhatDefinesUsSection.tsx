import { motion, useInView } from "motion/react";
import { useRef, useId, useState, useEffect } from "react";
import { useCmsSectionContent } from "../context/CmsSectionContext";

/* ─── VIDEO — cosmos / meditating figure ─────────────────────────────────── */
const DEFAULT_VIDEO_URL =
  "https://sienna-pelican-786032.hostingersite.com/wp-content/uploads/2026/03/social_SEO_cinematic_inspirational_mountain_scene_during_sunrise_the_3b26e672-23ad-48f4-91df-447957cfc7bd_0.mp4";

function WduVideo({ src, style }: { src: string; style?: React.CSSProperties }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", borderRadius: "16px", ...style }}>
      {/* Video */}
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      {/* Left fade → #0a0a0a */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to right, #0a0a0a 0%, #0a0a0a 12%, transparent 50%)",
        pointerEvents: "none",
      }} />
      {/* Right fade → #0a0a0a */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to left, #0a0a0a 0%, #0a0a0a 8%, transparent 45%)",
        pointerEvents: "none",
      }} />
      {/* Top fade → #0a0a0a */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, #0a0a0a 0%, transparent 40%)",
        pointerEvents: "none",
      }} />
      {/* Bottom fade → #0a0a0a */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, #0a0a0a 0%, transparent 40%)",
        pointerEvents: "none",
      }} />
    </div>
  );
}

/* ─── SVG PATHS ──────────────────────────────────────────────────────────── */
const ARROW_PATH =
  "M11.406 1.64725L11.0545 2.00077L3.60429 9.49979H6.31913V10.9119H1.19999V5.79276H2.6121V8.50663L10.1111 1.05741L10.4646 0.705846L11.406 1.64725Z";

/* ─── GRADIENT DIVIDER (w-729) ───────────────────────────────────────────── */
function GradientDivider() {
  const uid = useId();
  const id = `wdu-div-${uid.replace(/:/g, "")}`;
  return (
    <div style={{ height: 0, width: "729px", flexShrink: 0, position: "relative" }}>
      <div style={{ position: "absolute", inset: "-0.5px 0" }}>
        <svg
          width="729" height="1" viewBox="0 0 729 1" fill="none"
          style={{ display: "block", width: "100%", height: "100%" }}
        >
          <defs>
            <linearGradient id={id} x1="0" x2="729" y1="0" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#414141" />
              <stop offset="1" stopColor="#0A0A0A" />
            </linearGradient>
          </defs>
          <path d="M0 0.5H729" stroke={`url(#${id})`} />
        </svg>
      </div>
    </div>
  );
}

/* ─── MOBILE GRADIENT DIVIDER (full width) ───────────────────────────────── */
function GradientDividerFluid() {
  const uid = useId();
  const id = `wdu-divf-${uid.replace(/:/g, "")}`;
  return (
    <div style={{ width: "100%", height: "1px", position: "relative", flexShrink: 0 }}>
      <svg
        width="100%" height="1" viewBox="0 0 320 1" preserveAspectRatio="none"
        fill="none" style={{ display: "block", width: "100%", height: "1px" }}
      >
        <defs>
          <linearGradient id={id} x1="0" x2="320" y1="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#414141" />
            <stop offset="1" stopColor="#0A0A0A" />
          </linearGradient>
        </defs>
        <path d="M0 0.5H320" stroke={`url(#${id})`} />
      </svg>
    </div>
  );
}

/* ─── SHORT LINE (after badge, Frame9) ───────────────────────────────────── */
function ShortLine() {
  return (
    <div style={{ flex: "1 0 0", height: 0, minHeight: "1px", minWidth: 0, position: "relative" }}>
      <div style={{ position: "absolute", inset: "-0.5px 0" }}>
        <svg
          width="100%" height="1" viewBox="0 0 23 1" fill="none"
          preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "100%" }}
        >
          <path d="M0 0.5H23" stroke="#414141" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}

/* ─── "WHAT DEFINES US" BADGE ────────────────────────────────────────────── */
function WduBadge() {
  return (
    <div
      style={{
        background: "#111",
        border: "1px solid #414141",
        borderRadius: "40px",
        padding: "6px 20px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        position: "relative",
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
        What defines us
      </span>
    </div>
  );
}

/* ─── REVEAL WORD ───────────────────────────────────────────────────────── */
function RevealWord({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0.15 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
    >
      {children}
    </motion.span>
  );
}

/* ─── TITLE ROW — desktop ────────────────────────────────────────────────── */
function TitleRow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        gap: "48px",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        width: "100%",
        flexShrink: 0,
      }}
    >
      <motion.div
        style={{
          flex: "1 0 0",
          display: "flex",
          gap: "12px",
          alignItems: "center",
          paddingTop: "28px",
          minWidth: 0,
          minHeight: 0,
        }}
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <WduBadge />
        <ShortLine />
      </motion.div>

      <motion.div
        style={{ width: "780px", flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-start" }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="capitalize" style={{ fontFamily: "Manrope, sans-serif", fontSize: "40px", fontWeight: 700, lineHeight: "1.25", margin: 0, width: "100%", color: "white" }}>
          You Have Seen Agencies. You Have Not Seen Anything Quite Like This Yet.
        </p>
      </motion.div>
    </div>
  );
}

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const DEFAULT_WDU_ITEMS = [
  {
    title: "Systems Run It. Humans Own It.",
    desc: "Behind every framework is a person who treats your outcome as their own problem.",
  },
  {
    title: "The Rules Are Yours.",
    desc: "We do not fit you into a model. We build the model entirely around you.",
  },
  {
    title: "The Long Game Is The Only Game.",
    desc: "We measure success in years, not campaigns. That changes every decision we make.",
  },
];

type WduItem = { title: string; desc: string };

/* ─── LIST ROW — desktop ─────────────────────────────────────────────────── */
function ListRow({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{ display: "flex", gap: "60px", alignItems: "flex-start", width: "100%", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <ul
          style={{
            display: "block",
            fontFamily: "Manrope, sans-serif",
            fontWeight: 500,
            fontSize: "15px",
            lineHeight: "26px",
            color: "white",
            width: "217px",
            margin: 0,
            padding: 0,
            listStyle: "disc",
            paddingLeft: "22.5px",
          }}
        >
          <li style={{ whiteSpace: "pre-wrap" }}>{title}</li>
        </ul>
      </div>
      <p
        style={{
          flex: "1 0 0",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 300,
          fontSize: "15px",
          lineHeight: "28px",
          color: "#727272",
          margin: 0,
          minWidth: 0,
          minHeight: 0,
        }}
      >
        {desc}
      </p>
    </div>
  );
}

/* ─── ARROW BUTTON ──────────────────────────────────────────────────────── */
interface ArrowBtnProps {
  left: number;
  delay?: number;
}
function ArrowBtn({ left, delay = 0 }: ArrowBtnProps) {
  return (
    <motion.button
      style={{
        position: "absolute",
        left: `${left}px`,
        top: "0",
        width: "28px",
        height: "28px",
        borderRadius: "49px",
        background: "#051838",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        cursor: "pointer",
        padding: "6px",
        flexShrink: 0,
        zIndex: 3,
      }}
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay, type: "spring", stiffness: 350, damping: 20 }}
      whileHover={{ scale: 1.12, background: "#0a2d6b" }}
      whileTap={{ scale: 0.92 }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "10px", height: "10px", overflow: "hidden", position: "relative", flexShrink: 0 }}>
        <div style={{ transform: "rotate(90deg) scaleY(-1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "absolute" }}>
          <svg width="12.1119" height="12.1119" viewBox="0 0 12.1119 12.1119" fill="none" style={{ display: "block" }}>
            <path d={ARROW_PATH} fill="#1B61DB" stroke="#1B61DB" strokeWidth="0.3" />
          </svg>
        </div>
      </div>
    </motion.button>
  );
}

/* ─── CONTENT ROW — desktop ──────────────────────────────────────────────── */
function ContentRow({ items }: { items: WduItem[] }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        borderRadius: "40px",
        width: "100%",
        flexShrink: 0,
        position: "relative",
      }}
    >
      <motion.div
        style={{
          width: "760px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "flex-start",
          justifyContent: "center",
          position: "relative",
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, staggerDirection: 1 } },
        }}
      >
        {items.map((item, i) => (
          <motion.div
            key={`row-${i}`}
            style={{ width: "100%" }}
            variants={{
              hidden: { x: 320, opacity: 0 },
              visible: { x: 0, opacity: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            <ListRow title={item.title} desc={item.desc} />
          </motion.div>
        )).flatMap((el, i, arr) =>
          i < arr.length - 1
            ? [el, (
                <motion.div
                  key={`div-${i}`}
                  style={{ width: "100%" }}
                  variants={{
                    hidden: { x: 320, opacity: 0 },
                    visible: { x: 0, opacity: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  <GradientDivider />
                </motion.div>
              )]
            : [el] as React.ReactNode[]
        )}
      </motion.div>
    </div>
  );
}

/* ─── MOBILE LIST ITEM ───────────────────────────────────────────────────── */
function MobileListItem({ index, title, desc }: { index: number; title: string; desc: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}
    >
      {/* Bullet title */}
      <ul
        style={{
          fontFamily: "Manrope, sans-serif",
          fontWeight: 500,
          fontSize: "15px",
          lineHeight: "26px",
          color: "white",
          margin: 0,
          padding: 0,
          listStyle: "disc",
          paddingLeft: "22px",
        }}
      >
        <li>{title}</li>
      </ul>
      {/* Description */}
      <p
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 300,
          fontSize: "14px",
          lineHeight: "24px",
          color: "#727272",
          margin: 0,
        }}
      >
        {desc}
      </p>
    </motion.div>
  );
}

/* ─── MOBILE / TABLET LAYOUT ─────────────────────────────────────────────── */
function WhatDefinesUsMobileLayout({ items }: { items: WduItem[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      style={{
        width: "100%",
        background: "#0a0a0a",
        boxSizing: "border-box",
        padding: "52px 20px 60px",
      }}
    >
      {/* ── Badge ── */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: "20px" }}
      >
        <WduBadge />
      </motion.div>

      {/* ── Title ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: "36px" }}
      >
        <p
          className="capitalize"
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "clamp(26px, 7.5vw, 38px)",
            lineHeight: "1.35",
            margin: 0,
            fontWeight: 700,
            color: "white",
          }}
        >
          You Have Seen Agencies. You Have Not Seen Anything Quite Like This Yet.
        </p>
      </motion.div>

      {/* ── Arrow buttons row ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "flex", gap: "10px", marginBottom: "32px" }}
      >
        {[0.05, 0.12, 0.19].map((delay, i) => (
          <motion.button
            key={i}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "49px",
              background: "#051838",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              flexShrink: 0,
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.35, delay, type: "spring", stiffness: 350, damping: 20 }}
            whileHover={{ scale: 1.12, background: "#0a2d6b" }}
            whileTap={{ scale: 0.92 }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "10px", height: "10px", overflow: "hidden", position: "relative", flexShrink: 0 }}>
              <div style={{ transform: "rotate(90deg) scaleY(-1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "absolute" }}>
                <svg width="12.1119" height="12.1119" viewBox="0 0 12.1119 12.1119" fill="none" style={{ display: "block" }}>
                  <path d={ARROW_PATH} fill="#1B61DB" stroke="#1B61DB" strokeWidth="0.3" />
                </svg>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* ── List items with dividers ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {items.map((item, i) => (
          <div key={i}>
            <MobileListItem index={i} title={item.title} desc={item.desc} />
            {i < items.length - 1 && (
              <div style={{ margin: "20px 0" }}>
                <GradientDividerFluid />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── "WHAT DEFINES US" SECTION ──────────────────────────────────────────── */
function WhatDefinesUsDesktopLayout({ items, videoSrc }: { items: WduItem[]; videoSrc: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef as React.RefObject<HTMLElement>, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
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
        style={{
          width: "1200px",
          display: "flex",
          flexDirection: "column",
          gap: "64px",
          alignItems: "flex-end",
          position: "relative",
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <TitleRow />
        <ContentRow items={items} />

        {/* ── Cosmos / meditating-figure image — absolutely positioned left side ── */}
        <motion.div
          data-name="What define us 1"
          style={{
            position: "absolute",
            left: "-72px",
            top: "124px",
            width: "488px",
            height: "397px",
            pointerEvents: "none",
          }}
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <WduVideo src={videoSrc} style={{ width: "488px", height: "397px" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

export function WhatDefinesUsSection() {
  const { content, items: cmsItems } = useCmsSectionContent();
  const videoSrc = String(content.videoUrl ?? DEFAULT_VIDEO_URL);
  const wduItems: WduItem[] = cmsItems.length > 0
    ? cmsItems.map(item => ({
        title: String(item.title ?? ""),
        desc:  String(item.desc  ?? ""),
      }))
    : DEFAULT_WDU_ITEMS;

  const [isMobileTablet, setIsMobileTablet] = useState(() => window.innerWidth <= 1024);

  useEffect(() => {
    const check = () => setIsMobileTablet(window.innerWidth <= 1024);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobileTablet
    ? <WhatDefinesUsMobileLayout items={wduItems} />
    : <WhatDefinesUsDesktopLayout items={wduItems} videoSrc={videoSrc} />;
}