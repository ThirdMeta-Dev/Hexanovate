import { useState } from "react";
import { motion } from "motion/react";

/* ── Shared CTA Button (Figma 10904:134 filled · 10904:141 outline) ────────
   Structure: label pill + 48px arrow circle sitting flush together.
   Filled : #1b61db pill + arrow circle, no border
   Outline: #0e1f3d pill + arrow circle, both with 1px #1b61db border
   Hover  : filled bg lifts to gradient, arrow rotates slightly            */

const ARROW_PATH =
  "M1.17871 15.9033L1.53223 15.5518L14.042 3.12305L14.042 7.8877L15.7012 7.8877L15.7012 0.296876L8.11035 0.296875L8.11035 1.95606L12.873 1.95606L0.446289 14.4658L0.0947266 14.8193L1.17871 15.9033Z";

export function CtaArrow({ size = 16, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      style={{ display: "block" }}
    >
      <path d={ARROW_PATH} fill={color} stroke={color} />
    </svg>
  );
}

export interface CtaButtonProps {
  label: string;
  variant?: "filled" | "outline";
  size?: "default" | "small" | "compact";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  fullWidth?: boolean;
  /* entrance animation */
  animateIn?: boolean;
  delay?: number;
  /* color overrides (e.g. amber siblings) */
  fillColor?: string;
  hoverFillColor?: string;
}

const SIZES = {
  default: { padding: "12px 24px", font: 16, circle: 48, icon: 16 },
  small: { padding: "8px 16px", font: 13, circle: 36, icon: 14 },
  compact: { padding: "8px 14px", font: 12, circle: 36, icon: 12 },
} as const;

export function CtaButton({
  label,
  variant = "filled",
  size = "default",
  href,
  onClick,
  type,
  disabled = false,
  fullWidth = false,
  animateIn = false,
  delay = 0,
  fillColor = "#1b61db",
  hoverFillColor,
}: CtaButtonProps) {
  const [hov, setHov] = useState(false);
  const s = SIZES[size];
  const isFilled = variant === "filled";
  // The arrow circle already provides the ↗ — strip any trailing arrow char
  // from the label (hardcoded or CMS-supplied) so it never shows twice.
  const cleanLabel = label.replace(/\s*[↗→]\s*$/, "");
  const hoverFill =
    hoverFillColor ?? `linear-gradient(135deg, #2470f0 0%, ${fillColor} 100%)`;

  const handleClick = () => {
    if (disabled) return;
    if (onClick) onClick();
    else if (href) window.open(href, "_blank", "noopener,noreferrer");
  };

  const pillBg = isFilled ? (hov ? hoverFill : fillColor) : "#0e1f3d";
  const circleBg = isFilled ? fillColor : "#0e1f3d";
  const outlineBorder = "1px solid #1b61db";

  const Root: any = type ? motion.button : motion.div;

  return (
    <Root
      type={type}
      disabled={type ? disabled : undefined}
      onClick={type === "submit" ? undefined : handleClick}
      style={{
        display: "flex",
        alignItems: "center",
        cursor: disabled ? "default" : "pointer",
        flexShrink: 0,
        borderRadius: 30,
        border: "none",
        background: "transparent",
        padding: 0,
        width: fullWidth ? "100%" : undefined,
        boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.30)",
        opacity: disabled ? 0.7 : 1,
      }}
      initial={animateIn ? { opacity: 0, y: 18 } : undefined}
      animate={animateIn ? { opacity: 1, y: 0 } : undefined}
      transition={
        animateIn
          ? { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }
          : undefined
      }
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={disabled ? undefined : { scale: 1.02, y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
    >
      {/* Label pill */}
      <div
        style={{
          background: pillBg,
          borderRadius: 30,
          padding: s.padding,
          position: "relative",
          transition: "background 0.22s ease",
          flex: fullWidth ? 1 : undefined,
          textAlign: fullWidth ? "center" : undefined,
        }}
      >
        {!isFilled && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              border: outlineBorder,
              borderRadius: 30,
              pointerEvents: "none",
            }}
          />
        )}
        <span
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            fontSize: s.font,
            color: "white",
            lineHeight: "24px",
            whiteSpace: "nowrap",
            position: "relative",
          }}
        >
          {cleanLabel}
        </span>
      </div>

      {/* Arrow circle — flush against pill */}
      <div
        style={{
          width: s.circle,
          height: s.circle,
          borderRadius: 30,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          marginLeft: -1,
          background: circleBg,
          boxSizing: "border-box",
          border: isFilled ? "none" : outlineBorder,
          transition: "background 0.22s ease",
        }}
      >
        <motion.div
          style={{ display: "flex" }}
          animate={{ rotate: hov ? 18 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <CtaArrow size={s.icon} color="white" />
        </motion.div>
      </div>
    </Root>
  );
}

export default CtaButton;
