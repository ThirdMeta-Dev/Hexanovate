/* ─────────────────────────────────────────────────────────────────────────────
   LeadershipWhyChooseUsSection — Section 6 of Leadership & Team page
   Figma: node 11420-150

   Layout:
   • TOP ROW: large mixed-weight 44px Manrope heading (left) + line + "Why Choose Us" tag (right)
   • BOTTOM: elephant AI image absolute-left + 3 stacked feature items cascading right
     Each item: blue-bordered icon circle + Manrope Medium title + Poppins Light description
     Cascade: item1 pl=30, item2 pl=80, item3 pl=130
   ───────────────────────────────────────────────────────────────────────────── */
import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;
const VP   = { once: true, margin: "-80px" } as const;

/* Figma CDN assets — valid 7 days */
const IMG_ELEPHANT = "https://www.figma.com/api/mcp/asset/efac769e-dc02-4a44-af47-66996e48b102";
const IMG_ICON     = "https://www.figma.com/api/mcp/asset/a83586e0-99b4-48b5-80a8-727c09600c7e";

const FEATURES = [
  { title: "Cracked Market Fit, But", desc: "what's leaking conversion, retention,  lorem repeation growth", indent: 30 },
  { title: "Cracked Market Fit, But", desc: "what's leaking conversion, retention,  lorem repeation growth", indent: 80 },
  { title: "Cracked Market Fit, But", desc: "what's leaking conversion, retention,  lorem repeation growth", indent: 130 },
];

function FeatureItem({ title, desc, indent }: { title: string; desc: string; indent: number }) {
  return (
    <div style={{ paddingLeft: indent, width: 333, boxSizing: "border-box" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {/* Icon + title row */}
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
        {/* Description */}
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
  return (
    <motion.section
      style={{ width: "100%", position: "relative", overflow: "hidden" }}
      initial={{ opacity: 0, y: 60, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VP}
      transition={{ duration: 0.85, ease: EASE }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 96px", boxSizing: "border-box" }}>

        {/* ── TOP ROW: heading + line + tag ── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 48 }}>
          {/* Heading */}
          <div style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "clamp(28px, 3.5vw, 44px)",
            lineHeight: 1.36,
            maxWidth: 698,
          }}>
            <span style={{ fontWeight: 600, color: "#ffffff" }}>Lorem ipsum is</span>
            <span style={{ fontWeight: 400, color: "#8e8e8e" }}> simply dummy is </span>
            <span style={{ fontWeight: 300, color: "#8e8e8e" }}>text lorem typesetting</span>
          </div>

          {/* Line + tag */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, flexShrink: 0 }}>
            <div style={{ width: 80, height: 1, background: "#414141" }} />
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

        {/* ── BOTTOM: image (absolute) + features (right) ── */}
        <div style={{ position: "relative", minHeight: 380 }}>

          {/* Elephant image — left side, behind features */}
          <div style={{
            position: "absolute",
            left: -96, /* extend beyond padding to reach edge */
            top: 0,
            width: 568,
            height: 328,
            pointerEvents: "none",
          }}>
            <img
              src={IMG_ELEPHANT}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            {/* Fade gradient to blend into page bg */}
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 72,
              background: "linear-gradient(to bottom, transparent, #0a0a0a)",
              pointerEvents: "none",
            }} />
          </div>

          {/* 3 feature items — right side, stacked with cascade */}
          <div style={{
            marginLeft: "auto",
            width: 500,
            display: "flex",
            flexDirection: "column",
            gap: 44,
            paddingTop: 0,
          }}>
            {FEATURES.map((f, i) => (
              <FeatureItem key={i} title={f.title} desc={f.desc} indent={f.indent} />
            ))}
          </div>

        </div>
      </div>
    </motion.section>
  );
}
