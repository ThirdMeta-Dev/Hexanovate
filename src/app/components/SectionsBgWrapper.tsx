import React from "react";
import imgBg from "@/assets/734bb0434a91dc4c997f6ae2036ae4185f349f92.jpg";

/**
 * Background wrapper for Values & Approach, Awards Logo Wall, Resources.
 *
 * Uses the attached Figma frame image directly — no stretching, no percentage
 * offsets. The image is pinned right:0, covers the full wrapper height, and
 * is already pre-composited (dark left side, blue/amber shape on right).
 * A subtle left-edge gradient blends it into the #0a0a0a page background.
 */
export function SectionsBgWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>

      {/* ── Background layer ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {/* Image — full width, anchored right so the graphic stays on the right
             while the dark left side stretches to fill whatever gap remains     */}
        <img
          alt=""
          src={imgBg}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
            maxWidth: "none",
            display: "block",
            objectFit: "cover",
            objectPosition: "right top",
          }}
        />

        {/* Left-edge blend — fades the already-dark image into #0a0a0a */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.6) 40%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Bottom blend — fades into page background */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 300,
            background:
              "linear-gradient(to bottom, transparent 0%, #0a0a0a 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ── Section content — sits above background ── */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}