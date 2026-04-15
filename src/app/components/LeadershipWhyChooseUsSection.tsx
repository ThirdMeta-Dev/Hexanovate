/* ─────────────────────────────────────────────────────────────────────────────
   LeadershipWhyChooseUsSection — Section 6 of Leadership & Team page
   Figma: node 11420-150

   Layout:
   • TOP ROW: large mixed-weight 44px Manrope heading (left) + line + "Why Choose Us" tag (right)
   • BOTTOM: elephant AI image absolute-left + 3 stacked feature items cascading right
     Each item: blue-bordered icon circle + Manrope Medium title + Poppins Light description
     Cascade: item1 pl=30, item2 pl=80, item3 pl=130
   ───────────────────────────────────────────────────────────────────────────── */
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import imgElephant from "@/assets/leadership-elephant.jpg";
import imgIcon     from "@/assets/leadership-icon-arrow.svg";

const EASE = [0.22, 1, 0.36, 1] as const;
const VP   = { once: true, margin: "-80px" } as const;

const IMG_ELEPHANT = imgElephant;
const IMG_ICON     = imgIcon;

const FEATURES = [
  { title: "Cracked Market Fit, But", desc: "what's leaking conversion, retention,  lorem repeation growth", indent: 30 },
  { title: "Cracked Market Fit, But", desc: "what's leaking conversion, retention,  lorem repeation growth", indent: 80 },
  { title: "Cracked Market Fit, But", desc: "what's leaking conversion, retention,  lorem repeation growth", indent: 130 },
];

function FeatureItem({ title, desc, indent, isMobile }: { title: string; desc: string; indent: number; isMobile: boolean }) {
  return (
    <div style={{ paddingLeft: isMobile ? 0 : indent, width: isMobile ? "100%" : 333, boxSizing: "border-box" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 29, height: 30, borderRadius: 49,
            border: "1px solid #1b61db",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <img src={IMG_ICON} alt="" style={{ width: 19, height: 19, display: "block" }} />
          </div>
          <span style={{
            fontFamily: "Manrope, sans-serif", fontWeight: 500,
            fontSize: 15, lineHeight: "24px", color: "#ffffff", whiteSpace: "nowrap",
          }}>
            {title}
          </span>
        </div>
        <p style={{
          fontFamily: "Poppins, sans-serif", fontWeight: 300,
          fontSize: 15, lineHeight: "22px", color: "#747474",
          margin: 0,
        }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

export function LeadershipWhyChooseUsSection() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth <= 1024 : false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <motion.section
      style={{ width: "100%", position: "relative", overflow: "hidden" }}
      initial={{ opacity: 0, y: 60, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VP}
      transition={{ duration: 0.85, ease: EASE }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 24px" : "0 96px", boxSizing: "border-box" }}>

        {/* ── TOP ROW: heading + tag ── */}
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: isMobile ? "flex-start" : "space-between",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 16 : 0,
          marginBottom: 48,
        }}>
          <div style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: isMobile ? "clamp(22px, 6vw, 36px)" : "clamp(28px, 3.5vw, 44px)",
            lineHeight: 1.36,
            maxWidth: isMobile ? "100%" : 698,
          }}>
            <span style={{ fontWeight: 600, color: "#ffffff" }}>Lorem ipsum is</span>
            <span style={{ fontWeight: 400, color: "#8e8e8e" }}> simply dummy is </span>
            <span style={{ fontWeight: 300, color: "#8e8e8e" }}>text lorem typesetting</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: isMobile ? 0 : 16, flexShrink: 0 }}>
            {!isMobile && <div style={{ width: 80, height: 1, background: "#414141" }} />}
            <div style={{
              background: "#111", border: "1px solid #414141", borderRadius: 40,
              padding: "6px 20px", display: "inline-flex", alignItems: "center",
            }}>
              <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 13, color: "#FFA600", whiteSpace: "nowrap" }}>
                Why Choose Us
              </span>
            </div>
          </div>
        </div>

        {/* ── BOTTOM: image + features ── */}
        <div style={{ position: "relative", minHeight: isMobile ? "auto" : 380 }}>

          {/* Elephant image — desktop only */}
          {!isMobile && (
            <div style={{
              position: "absolute",
              left: -96,
              top: 0,
              width: 568,
              height: 328,
              pointerEvents: "none",
            }}>
              <img src={IMG_ELEPHANT} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 72,
                background: "linear-gradient(to bottom, transparent, #0a0a0a)",
                pointerEvents: "none",
              }} />
            </div>
          )}

          {/* Feature items */}
          <div style={{
            marginLeft: isMobile ? 0 : "auto",
            width: isMobile ? "100%" : 500,
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? 32 : 44,
          }}>
            {FEATURES.map((f, i) => (
              <FeatureItem key={i} title={f.title} desc={f.desc} indent={f.indent} isMobile={isMobile} />
            ))}
          </div>

        </div>
      </div>
    </motion.section>
  );
}
