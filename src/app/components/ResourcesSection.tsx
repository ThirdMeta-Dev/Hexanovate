import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import svgPaths from "../../imports/svg-ovg5m3az7t";
import imgShape from "@/assets/b89318efbab82d469b49381f4cc6c0514cdbdf45.png";
import imgImage271 from "@/assets/18b0d12fe3d53b9b2e05886f4cb0e938bd6b31f6.png";
import imgImage272 from "@/assets/780ac0b6ef7927d9d4ac36f35f8dd4632ae487a6.png";

/* ─── DIAGONAL ARROW ICON (amber badge) ─────────────────────────────────── */
function ArrowIcon() {
  return (
    <div style={{ width: 16, height: 16, overflow: "hidden", position: "relative", flexShrink: 0 }}>
      <div style={{ position: "absolute", inset: "5%" }}>
        <div style={{ position: "absolute", inset: "-9.8% -9.8% -8.88% -8.88%" }}>
          <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 17.09 17.0901">
            <path d={svgPaths.pe61a680} fill="white" stroke="white" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── SECTION HEADER BADGE ───────────────────────────────────────────────── */
function ResourcesBadge() {
  return (
    <div
      style={{
        background: "#111",
        borderRadius: 40,
        padding: "6px 20px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          border: "1px solid #414141",
          borderRadius: 40,
          pointerEvents: "none",
        }}
      />
      <p
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          fontSize: 13,
          color: "#ffa600",
          lineHeight: "normal",
          whiteSpace: "nowrap",
          position: "relative",
          marginTop: 0,
          marginBottom: 0,
        }}
      >
        Resources
      </p>
    </div>
  );
}

/* ─── RESOURCE CARD ──────────────────────────────────────────────────────── */
interface ResourceCardData {
  image: string;
  date: string;
  readTime: string;
  title: string;
  link: string;
}

const CARDS: ResourceCardData[] = [
  {
    image: imgImage271,
    date: "February 23, 2026",
    readTime: "06 Mins read",
    title: "Organic vs Paid Marketing: What B2B Companies Need to Know in 2025",
    link: "https://thirdmeta.in/blog/organic-vs-paid-marketing",
  },
  {
    image: imgImage272,
    date: "February 14, 2026",
    readTime: "06 Mins read",
    title: "SaaS SEO Strategy 2026: How to Drive Qualified Demos and Revenue Growth",
    link: "https://thirdmeta.in/blog/saas-seo-strategy-qualified-demos-revenue-growth",
  },
];

function ResourceCard({ data }: { data: ResourceCardData }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={data.link}
      target="_blank"
      rel="noopener noreferrer"
      className="res-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: "1 0 0",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        gap: 28,
        cursor: "pointer",
        textDecoration: "none",
      }}
    >
      {/* ── IMAGE + ARROW BADGE ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
        }}
      >
        {/* Subtract shape mask — blog image is clipped into the Figma shape */}
        <motion.div
          animate={{ scale: hovered ? 1.03 : 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: "100%",
            aspectRatio: "518 / 336",
            maskImage: `url('${imgShape}')`,
            maskSize: "100% 100%",
            maskRepeat: "no-repeat",
            maskPosition: "0px 0px",
            WebkitMaskImage: `url('${imgShape}')`,
            WebkitMaskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "0px 0px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={data.image}
            alt={data.title}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              inset: 0,
            }}
          />
        </motion.div>

        {/* Amber arrow badge — bottom-right corner of the shape */}
        <motion.div
          animate={{ scale: hovered ? 1.12 : 1 }}
          transition={{ type: "spring", stiffness: 360, damping: 20, mass: 0.8 }}
          style={{
            position: "absolute",
            right: 2,
            bottom: 0,
            width: 48,
            height: 48,
            borderRadius: 49,
            background: "#ffa600",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 6,
            boxSizing: "border-box",
            boxShadow: hovered
              ? "0 4px 24px rgba(255,166,0,0.6), 0 2px 8px rgba(0,0,0,0.4)"
              : "0 2px 10px rgba(255,166,0,0.35), 0 1px 4px rgba(0,0,0,0.3)",
            transition: "box-shadow 0.3s ease",
          }}
        >
          <div style={{ transform: "rotate(-90deg) scaleY(-1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ArrowIcon />
          </div>
        </motion.div>
      </div>

      {/* ── META + TITLE ── */}
      <div
        style={{
          paddingLeft: 24,
          paddingRight: 24,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "flex-start",
            lineHeight: 1.6,
            whiteSpace: "nowrap",
          }}
        >
          <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 15, color: "#727272", marginTop: 0, marginBottom: 0 }}>
            {data.date}
          </p>
          <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 14, color: "#727272", marginTop: 0, marginBottom: 0 }}>
            |
          </p>
          <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 15, color: "#727272", marginTop: 0, marginBottom: 0 }}>
            {data.readTime}
          </p>
        </div>

        <p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            color: "white",
            textTransform: "capitalize",
            letterSpacing: "0.2px",
            lineHeight: "28px",
            marginTop: 0,
            marginBottom: 0,
            width: "100%",
          }}
        >
          {data.title}
        </p>
      </div>
    </a>
  );
}

/* ─── MAIN SECTION ───────────────────────────────────────────────────────── */
/*
 * Figma Frame17 (root): flex-col, gap-60, size-full
 *
 * ── Frame9 (header row): flex, gap-60, items-start, w-full ──────────────
 *   Frame12 (w-145, pt-20): badge column
 *   Frame13 (flex-1, justify-between): title (w-499) + description (w-192)
 *
 * ── Frame15 (cards row): flex, gap-28, items-end ─────────────────────────
 *   Frame11 (flex-1): Card 1
 *   Frame14 (flex-1): Card 2
 *
 * Desktop: 1148px container, two-column cards
 * Tablet:  two-column cards, smaller type, horizontal padding
 * Mobile:  single-column cards, full width
 */
export function ResourcesSection() {
  /* ── title word-by-word scroll reveal ── */
  const titleRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress: titleP } = useScroll({
    target: titleRef,
    offset: ["start 0.85", "end 0.35"],
  });
  // 5 words — each illuminates across its 1/5 slice of the scroll range
  const tw0 = useTransform(titleP, [0 / 5, 1 / 5], [0.2, 1]);
  const tw1 = useTransform(titleP, [1 / 5, 2 / 5], [0.2, 1]);
  const tw2 = useTransform(titleP, [2 / 5, 3 / 5], [0.2, 1]);
  const tw3 = useTransform(titleP, [3 / 5, 4 / 5], [0.2, 1]);
  const tw4 = useTransform(titleP, [4 / 5, 1],     [0.2, 1]);

  return (
    <section
      style={{
        width: "100%",
        background: "transparent",
        padding: 0,
        overflowX: "hidden",
      }}
    >
      {/* ── Inner container — max 1148px, centered ── */}
      <div
        style={{
          maxWidth: 1148,
          margin: "0 auto",
          padding: "0 0",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 60,
        }}
      >
        <div
          className="res-header"
          style={{
            display: "flex",
            gap: 60,
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          {/* Badge column (Frame12): w-145, pt-20 */}
          <div
            className="res-badge-col"
            style={{
              width: 145,
              flexShrink: 0,
              paddingTop: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
              <ResourcesBadge />
            </div>
          </div>

          <div
            className="res-title-row"
            style={{
              flex: "1 0 0",
              minWidth: 0,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            {/* Title — Good Reads For Growing Businesses. */}
            <p
              ref={titleRef}
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: 48,
                lineHeight: 1.28,
                textTransform: "capitalize",
                color: "white",
                width: 499,
                flexShrink: 0,
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              <motion.span style={{ fontWeight: 700, opacity: tw0 }}>Good</motion.span>
              {" "}
              <motion.span style={{ fontWeight: 700, opacity: tw1 }}>Reads</motion.span>
              {" "}
              <motion.span style={{ fontWeight: 400, color: "#8e8e8e", opacity: tw2 }}>For</motion.span>
              {" "}
              <motion.span style={{ fontWeight: 400, color: "#8e8e8e", opacity: tw3 }}>Growing</motion.span>
              {" "}
              <motion.span style={{ fontWeight: 400, color: "#8e8e8e", opacity: tw4 }}>Businesses.</motion.span>
            </p>

            <div
              className="res-desc"
              style={{
                paddingTop: 20,
                flexShrink: 0,
              }}
            >
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  color: "#727272",
                  lineHeight: "24px",
                  width: 192,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                Perspectives on growth, strategy, and building brands that actually last.
              </p>
            </div>
          </div>
        </div>

        {/*
         * ── CARDS ROW (Frame15) ──────────────────────────────────────────
         * flex, gap-28, items-end
         * Two flex-1 cards side by side
         */}
        <div
          className="res-cards"
          style={{
            display: "flex",
            gap: 28,
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <ResourceCard data={CARDS[0]} />
          <ResourceCard data={CARDS[1]} />
        </div>
      </div>

      {/* ── Responsive overrides ── */}
      <style>{`
        /* Tablet: 768–1147px */
        @media (max-width: 1147px) {
          section > div[style*="max-width: 1148"] {
            padding: 0 24px !important;
          }
          .res-title-row {
            flex-wrap: wrap !important;
            gap: 24px !important;
          }
          .res-title-row > p {
            width: auto !important;
            max-width: 100% !important;
          }
          .res-desc {
            padding-top: 0 !important;
          }
          .res-desc p {
            width: auto !important;
          }
        }
        /* Tablet: 768–1023px — shrink header font */
        @media (max-width: 1023px) {
          .res-header {
            gap: 32px !important;
          }
          .res-badge-col {
            width: auto !important;
          }
          .res-title-row > p {
            font-size: 36px !important;
          }
          .res-cards {
            gap: 20px !important;
          }
        }
        /* Mobile: <768px — single column */
        @media (max-width: 767px) {
          .res-header {
            flex-direction: column !important;
            gap: 20px !important;
          }
          .res-badge-col {
            padding-top: 0 !important;
            width: 100% !important;
          }
          .res-title-row {
            flex-direction: column !important;
            gap: 16px !important;
          }
          .res-title-row > p {
            font-size: 28px !important;
            width: 100% !important;
          }
          .res-desc p {
            width: 100% !important;
          }
          .res-cards {
            flex-direction: column !important;
            gap: 40px !important;
          }
          .res-card {
            flex: none !important;
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}