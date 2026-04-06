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

/* ── Figma CDN image assets (7-day URLs) ────────────────────────────────── */
const IMGS = {
  team1:    "https://www.figma.com/api/mcp/asset/6920fbd6-940c-4fe7-b148-e8fa9861d7bf",
  team2:    "https://www.figma.com/api/mcp/asset/38631e33-0815-4ae3-8f82-8262ce233acd",
  team3:    "https://www.figma.com/api/mcp/asset/370989c4-6288-45e1-8e53-ed18748def16",
  team4:    "https://www.figma.com/api/mcp/asset/f8c31547-a4a5-4532-a879-c29b6b9226f0",
  team5:    "https://www.figma.com/api/mcp/asset/103cc788-781d-43dd-91ca-1cf7527bfcc9",
  team6:    "https://www.figma.com/api/mcp/asset/3ee60f2d-7390-4d56-85ea-b92a13aaad5f",
  team7:    "https://www.figma.com/api/mcp/asset/909a96ee-9f9b-47ce-a70f-a8d35de88beb",
  team8:    "https://www.figma.com/api/mcp/asset/ac51b777-8ed2-41b0-8273-d09286e5502c",
  team9:    "https://www.figma.com/api/mcp/asset/0ca948b1-3c40-407b-a3dc-4e3e59f999bf",
  team10:   "https://www.figma.com/api/mcp/asset/1d1d49b8-ed79-4321-bc9b-27e364b75e00",
  team11:   "https://www.figma.com/api/mcp/asset/525a6ad8-3476-4463-9b27-db91649e5761",
  team12:   "https://www.figma.com/api/mcp/asset/8a0e91dc-ff54-4980-93cd-046076153c02",
  team13:   "https://www.figma.com/api/mcp/asset/71841bfd-7f24-48bd-95bf-7b9fee0fb72a",
  team14:   "https://www.figma.com/api/mcp/asset/02dfa201-bfcf-4456-aa9b-c9c6c786baa1",
  team15:   "https://www.figma.com/api/mcp/asset/dea2faea-242a-4e3f-bac0-3c1482bd6710",
  team16:   "https://www.figma.com/api/mcp/asset/5f39ea0d-13d6-4118-a1b8-8a5387f4e964",
  team17:   "https://www.figma.com/api/mcp/asset/6615f38d-d924-4878-9f6c-4445fbb26c08",
  team18:   "https://www.figma.com/api/mcp/asset/59a54faf-0e1b-4d3e-9546-aff66cd9a521",
  team19:   "https://www.figma.com/api/mcp/asset/7d92c827-b547-492b-bc9f-fed58fcf8485",
  team20:   "https://www.figma.com/api/mcp/asset/b500b37b-a413-4898-975d-e1402dd9cac5",
  team21:   "https://www.figma.com/api/mcp/asset/39526f4a-d1fe-468a-bac7-dce0ebb866e5",
  team22:   "https://www.figma.com/api/mcp/asset/b8ccf26b-c4a0-42ba-82ae-ad6380a9e0ab",
  team23:   "https://www.figma.com/api/mcp/asset/65f37f57-b8cd-4288-8714-7835d338140b",
  team24:   "https://www.figma.com/api/mcp/asset/88ba0e9a-cc74-4335-820b-bd5eb56254ce",
  team25:   "https://www.figma.com/api/mcp/asset/e0447243-c48d-4320-a458-e4c16b5d1fbd",
  team26:   "https://www.figma.com/api/mcp/asset/80a111b1-2829-464d-a290-03f0a7013c57",
  team27:   "https://www.figma.com/api/mcp/asset/681b2cfd-5acd-44de-8452-5ddd244fa034",
  team28:   "https://www.figma.com/api/mcp/asset/4aabe6c6-79d6-4457-85b6-9187983582a5",
  team29:   "https://www.figma.com/api/mcp/asset/89081898-ce3a-4a2b-a00f-ba56667159fb",
  team30:   "https://www.figma.com/api/mcp/asset/796a3843-a589-4ff0-a227-1cd7055a93e5",
  team31:   "https://www.figma.com/api/mcp/asset/ace5f731-4210-4642-b4a4-d6b1cfe063d4",
  team32:   "https://www.figma.com/api/mcp/asset/c9c89503-2669-4ea2-8b3d-f0d475954b2d",
  team33:   "https://www.figma.com/api/mcp/asset/fbc95bf6-514b-4ee7-b8b6-44c40ce9bd51",
  team34:   "https://www.figma.com/api/mcp/asset/1da4a661-8b00-42ae-ae8e-a705cd0abbf5",
  team35:   "https://www.figma.com/api/mcp/asset/6f89d2e1-23f5-4b45-9465-b491554cf00e",
  team36:   "https://www.figma.com/api/mcp/asset/4d8eb8aa-0379-42db-97a8-6bc0f28bac4a",
  team37:   "https://www.figma.com/api/mcp/asset/38610758-ce48-497e-9a05-db83c0eee4b9",
  team38:   "https://www.figma.com/api/mcp/asset/ff235a03-89d5-4db5-9cd1-629ed713065d",
  team39:   "https://www.figma.com/api/mcp/asset/8040488b-a3bf-45d1-b1ce-d666cd1d62f6",
  team40:   "https://www.figma.com/api/mcp/asset/d43e3797-ee64-45b7-b60c-a42fbee62871",
  team41:   "https://www.figma.com/api/mcp/asset/6899e4fb-f439-4620-b7ff-42992a5edeb5",
  team42:   "https://www.figma.com/api/mcp/asset/c453504b-27fb-4217-af69-96f8b1fe1a6f",
  team43:   "https://www.figma.com/api/mcp/asset/d0b2a790-4764-40ed-876a-786ac9f1160c",
  team44:   "https://www.figma.com/api/mcp/asset/237eff02-8d16-45b0-a83c-42c6758a0520",
  team45:   "https://www.figma.com/api/mcp/asset/9875a0c5-115c-42f6-a88a-3851f0c73038",
  team46:   "https://www.figma.com/api/mcp/asset/72fc3fb2-4822-4582-9d54-37a542b1bbcf",
  team47:   "https://www.figma.com/api/mcp/asset/61c86ac4-ac90-4af5-a03e-ec29808192a5",
  team48:   "https://www.figma.com/api/mcp/asset/13b53e60-c185-4bc6-a7a4-12fcfd4ed2e3",
  team49:   "https://www.figma.com/api/mcp/asset/0e97dd6f-2c4f-4ae7-9463-69b10bec2476",
  team50:   "https://www.figma.com/api/mcp/asset/7a1c5346-92e6-4ffa-8149-b1c45e489bd3",
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
          maxWidth: 1008, margin: "0 auto 48px", padding: "0 96px",
          display: "flex", gap: 60, alignItems: "flex-start",
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
