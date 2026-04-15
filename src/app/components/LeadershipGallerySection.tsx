/* ─────────────────────────────────────────────────────────────────────────────
   LeadershipGallerySection — Section 10 of Leadership & Team page
   Figma: node 11456-5743

   Sticky horizontal scroll gallery:
   • Outer container is very tall (provides scroll distance)
   • Inner strip is sticky at top, full viewport height
   • As user scrolls down through the outer container, images slide LEFT
   • useScroll on outer ref → useTransform → translateX on image strip

   Image strip layout (from Figma):
   • 581px tall strip of masked images arranged horizontally
   • Mixed portrait, landscape and paired columns
   • Images sourced from Figma CDN (7-day URLs) — replace with local assets

   NOTE: Figma CDN asset URLs expire in 7 days. Replace with local assets.
   ───────────────────────────────────────────────────────────────────────────── */
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;
const VP   = { once: true, margin: "-80px" } as const;

/* ── Local gallery assets (public/gallery/) ─────────────────────────────── */
const IMGS = {
  team1:  "/gallery/team-01.png",
  team2:  "/gallery/team-02.png",
  team3:  "/gallery/team-03.png",
  team4:  "/gallery/team-04.png",
  team5:  "/gallery/team-05.png",
  team6:  "/gallery/team-06.png",
  team7:  "/gallery/team-07.png",
  team8:  "/gallery/team-08.png",
  team9:  "/gallery/team-09.png",
  team10: "/gallery/team-10.png",
  team11: "/gallery/team-11.png",
  team12: "/gallery/team-12.png",
  team13: "/gallery/team-13.png",
  team14: "/gallery/team-14.png",
  team15: "/gallery/team-15.png",
  team16: "/gallery/team-16.png",
  team17: "/gallery/team-17.png",
  team18: "/gallery/team-18.png",
  team19: "/gallery/team-19.png",
  team20: "/gallery/team-20.png",
  team21: "/gallery/team-21.png",
  team22: "/gallery/team-22.png",
  team23: "/gallery/team-23.png",
  team24: "/gallery/team-24.png",
  team25: "/gallery/team-25.png",
  team26: "/gallery/team-26.png",
  team27: "/gallery/team-27.png",
  team28: "/gallery/team-28.png",
  team29: "/gallery/team-29.png",
  team30: "/gallery/team-30.png",
  team31: "/gallery/team-31.png",
  team32: "/gallery/team-32.png",
  team33: "/gallery/team-33.png",
};

/* ── Image tile helpers ─────────────────────────────────────────────────── */

/** Single image tile with rounded corners */
function ImgTile({
  src, width, height, borderRadius = 20,
}: {
  src: string; width: number; height: number; borderRadius?: number;
}) {
  return (
    <div style={{
      width, height, borderRadius, flexShrink: 0, overflow: "hidden",
      background: "#1a1a1a",
    }}>
      <img
        src={src}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}

/** Two tiles stacked vertically */
function TileStack({
  top, bottom, width, topH, bottomH, gap = 20,
}: {
  top: string; bottom: string; width: number; topH: number; bottomH: number; gap?: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap, flexShrink: 0, width }}>
      <ImgTile src={top}    width={width} height={topH} />
      <ImgTile src={bottom} width={width} height={bottomH} />
    </div>
  );
}

/** Two tiles side by side */
function TilePair({
  left, right, width, height, gap = 19,
}: {
  left: string; right: string; width: number; height: number; gap?: number;
}) {
  const half = Math.floor((width - gap) / 2);
  return (
    <div style={{ display: "flex", gap, flexShrink: 0, width }}>
      <ImgTile src={left}  width={half} height={height} borderRadius={16} />
      <ImgTile src={right} width={half} height={height} borderRadius={16} />
    </div>
  );
}

/* ── Gallery strip: array of column groups exactly matching Figma ─────── */
/* Strip height = 581px (Figma). Each group's width is measured from Figma. */

const STRIP_H = 581;

function GalleryStrip() {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 20,
      height: STRIP_H, padding: "0 20px", boxSizing: "border-box",
    }}>

      {/* Group 1 — two stacked (502w) */}
      <TileStack top={IMGS.team1}  bottom={IMGS.team2}  width={502} topH={429} bottomH={133} />

      {/* Group 2 — portrait single (402w) */}
      <ImgTile src={IMGS.team3} width={402} height={STRIP_H} />

      {/* Group 3 — landscape single (599w) */}
      <ImgTile src={IMGS.team4} width={599} height={STRIP_H} />

      {/* Group 4 — two stacked (502w) */}
      <TileStack top={IMGS.team5}  bottom={IMGS.team6}  width={502} topH={340} bottomH={221} />

      {/* Group 5 — portrait single (328w) */}
      <ImgTile src={IMGS.team7} width={328} height={STRIP_H} />

      {/* Group 6 — stacked + pair (502w) */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20, flexShrink: 0, width: 502 }}>
        <ImgTile src={IMGS.team8}  width={502} height={280} />
        <TilePair left={IMGS.team9} right={IMGS.team10} width={502} height={281} />
      </div>

      {/* Group 7 — portrait + stacked pair (308+502) */}
      <div style={{ display: "flex", gap: 20, flexShrink: 0 }}>
        <ImgTile src={IMGS.team11} width={308} height={STRIP_H} />
        <div style={{ display: "flex", flexDirection: "column", gap: 20, flexShrink: 0, width: 502 }}>
          <ImgTile src={IMGS.team12} width={502} height={320} />
          <ImgTile src={IMGS.team13} width={502} height={241} />
        </div>
      </div>

      {/* Group 8 — portrait single (445w) */}
      <ImgTile src={IMGS.team14} width={445} height={STRIP_H} />

      {/* Group 9 — pair top + single bottom (502w) */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20, flexShrink: 0, width: 502 }}>
        <TilePair left={IMGS.team15} right={IMGS.team16} width={502} height={260} />
        <ImgTile src={IMGS.team17} width={502} height={301} />
      </div>

      {/* Group 10 — portrait single (487w) */}
      <ImgTile src={IMGS.team18} width={487} height={STRIP_H} />

      {/* Group 11 — pair top + single bottom (502w) */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20, flexShrink: 0, width: 502 }}>
        <TilePair left={IMGS.team19} right={IMGS.team20} width={502} height={260} />
        <ImgTile src={IMGS.team21} width={502} height={301} />
      </div>

      {/* Group 12 — portrait single (274w) */}
      <ImgTile src={IMGS.team22} width={274} height={STRIP_H} />

      {/* Group 13 — single top + pair bottom (502w) */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20, flexShrink: 0, width: 502 }}>
        <ImgTile src={IMGS.team23} width={502} height={340} />
        <TilePair left={IMGS.team24} right={IMGS.team25} width={502} height={221} />
      </div>

      {/* Group 14 — portrait single (356w) */}
      <ImgTile src={IMGS.team26} width={356} height={STRIP_H} />

      {/* Group 15 — stacked two (502w) */}
      <TileStack top={IMGS.team27} bottom={IMGS.team28} width={502} topH={292} bottomH={269} />

      {/* Group 16 — portrait single (266w) */}
      <ImgTile src={IMGS.team29} width={266} height={STRIP_H} />

      {/* Group 17 — pair top + single bottom (502w) */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20, flexShrink: 0, width: 502 }}>
        <TilePair left={IMGS.team30} right={IMGS.team31} width={502} height={260} />
        <ImgTile src={IMGS.team32} width={502} height={301} />
      </div>

      {/* Group 18 — portrait single (356w) */}
      <ImgTile src={IMGS.team33} width={356} height={STRIP_H} />

    </div>
  );
}

/* ── Main export ─────────────────────────────────────────────────────────── */
export function LeadershipGallerySection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [vw, setVw]   = useState(() => typeof window !== "undefined" ? window.innerWidth : 1440);
  const [vh, setVh]   = useState(() => typeof window !== "undefined" ? window.innerHeight : 800);
  const isMobile = vw <= 1024;

  useEffect(() => {
    const onResize = () => { setVw(window.innerWidth); setVh(window.innerHeight); };
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Estimate strip total width so outer container is tall enough */
  const STRIP_WIDTH = 9200; // px — generous estimate from Figma column measurements
  const HEADER_H    = 81;
  const stickyH     = vh - HEADER_H;

  /* scrollYProgress 0→1 maps to translateX 0 → -(STRIP_WIDTH - vw) */
  const { scrollYProgress } = useScroll({ target: outerRef });
  const x = useTransform(scrollYProgress, [0, 1], [0, -(STRIP_WIDTH - vw + 40)]);

  return (
    <section style={{ width: "100%" }}>

      {/* ── Header (always visible, not sticky) ── */}
      <motion.div
        style={{
          maxWidth: 1008, margin: "0 auto 48px", padding: isMobile ? "0 24px" : "0 96px",
          display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 20 : 60, alignItems: "flex-start",
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP}
        transition={{ duration: 0.75, ease: EASE }}
      >
        {/* Tag */}
        <div style={{ paddingTop: 20, flexShrink: 0 }}>
          <div style={{
            background: "#111", border: "1px solid #414141", borderRadius: 40,
            padding: "6px 20px", display: "inline-flex", alignItems: "center",
          }}>
            <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 13, color: "#FFA600", whiteSpace: "nowrap" }}>
              Gallery
            </span>
          </div>
        </div>

        {/* Heading + description */}
        <div style={{ display: "flex", flex: 1, alignItems: "flex-start", justifyContent: "space-between", gap: 32 }}>
          <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.28, maxWidth: 499 }}>
            <span style={{ fontWeight: 700, color: "#ffffff" }}>Resources lorem</span>
            <span style={{ fontWeight: 400, color: "#8e8e8e" }}> are ipsum is simply</span>
          </div>
          <p style={{
            fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 14,
            lineHeight: "24px", color: "#727272", margin: 0, maxWidth: 192, paddingTop: 20,
          }}>
            We unlock scale by fixing what's leaking conversion, retention, repeat
          </p>
        </div>
      </motion.div>

      {/* ── Sticky gallery container ── */}
      <div
        ref={outerRef}
        style={{
          position: "relative",
          /* outer height = sticky viewport + strip travel distance */
          height: stickyH + (STRIP_WIDTH - vw),
        }}
      >
        <div style={{
          position: "sticky",
          top: 0,
          height: stickyH,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}>
          <motion.div
            style={{ x, display: "flex", alignItems: "center", willChange: "transform" }}
          >
            <GalleryStrip />
          </motion.div>
        </div>
      </div>

    </section>
  );
}
