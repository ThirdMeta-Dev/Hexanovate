/**
 * MagnetizedCtaButton
 *
 * Visually IDENTICAL to <CtaButton variant="primary"> — same colours, layout,
 * typography, arrow icon, entrance animation and hover/tap spring.
 *
 * The ONLY addition is the particle-magnetise effect from the spec:
 *   • N dots seeded at random ±90 px offsets around the button
 *   • On mouseEnter  → all dots spring-collapse to centre (x:0, y:0)
 *   • On mouseLeave  → dots spring back to their random positions
 */

import { useEffect, useState, useCallback } from "react";
import { motion, useAnimation } from "motion/react";

/* ── re-use the same arrow SVG as the rest of the hero ─────────────────── */
function ArrowDiagonal({ size = 16, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <path
        d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface Particle {
  id: number;
  x: number;
  y: number;
}

interface MagnetizedCtaButtonProps {
  label: string;
  delay?: number;
  particleCount?: number;
}

export function MagnetizedCtaButton({
  label,
  delay = 0,
  particleCount = 14,
}: MagnetizedCtaButtonProps) {
  /* ── particle state ─────────────────────────────────────────────────── */
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isAttracting, setIsAttracting] = useState(false);
  const [hovered, setHovered] = useState(false);
  const particlesControl = useAnimation();

  useEffect(() => {
    setParticles(
      Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        /* tighter spread (±90 px) so dots orbit the button, not the whole hero */
        x: Math.random() * 180 - 90,
        y: Math.random() * 180 - 90,
      }))
    );
  }, [particleCount]);

  /* attract – collapse all dots to button centre */
  const handleMouseEnter = useCallback(async () => {
    setIsAttracting(true);
    setHovered(true);
    await particlesControl.start({
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 10 },
    });
  }, [particlesControl]);

  /* release – scatter dots back to their seeded positions */
  const handleMouseLeave = useCallback(async () => {
    setIsAttracting(false);
    setHovered(false);
    await particlesControl.start((i: number) => ({
      x: particles[i]?.x ?? 0,
      y: particles[i]?.y ?? 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    }));
  }, [particlesControl, particles]);

  /* ── render ─────────────────────────────────────────────────────────── */
  return (
    <motion.div
      /* ── entrance animation — identical to CtaButton ── */
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      /* ── hover / tap spring — identical to CtaButton ── */
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onHoverStart={handleMouseEnter}
      onHoverEnd={handleMouseLeave}
      /* ── layout — identical to CtaButton primary ── */
      className="flex items-center cursor-pointer relative"
      style={{
        boxShadow: hovered ? "0 4px 16px rgba(0,0,0,0.4)" : "0 4px 4px rgba(0,0,0,0.3)",
        borderRadius: "30px",
        /* overflow visible so particles can float outside the pill */
        overflow: "visible",
      }}
    >
      {/* ── magnetise particles (rendered first so they sit beneath the pill) ── */}
      {particles.map((p, index) => (
        <motion.div
          key={p.id}
          custom={index}
          initial={{ x: p.x, y: p.y }}
          animate={particlesControl}
          className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
          style={{
            /* centred on the button — particles drift from here */
            top: "50%",
            left: "50%",
            marginTop: "-3px",
            marginLeft: "-3px",
            background: "white",
            opacity: isAttracting ? 0.9 : 0.35,
            transition: "opacity 0.3s ease",
            zIndex: 10,
          }}
        />
      ))}

      {/* ── label pill — exact CtaButton primary colours ── */}
      <div
        style={{
          background: hovered
            ? "linear-gradient(135deg, #2470f0 0%, #1b61db 100%)"
            : "#1b61db",
          borderRadius: "30px",
          padding: "12px 24px",
          transition: "background 0.25s ease",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            fontSize: "16px",
            color: "white",
            lineHeight: "normal",
          }}
        >
          {label}
        </span>
      </div>

      {/* ── arrow icon pill — exact CtaButton primary colours ── */}
      <motion.div
        className="flex items-center justify-center"
        style={{
          background: hovered ? "#2470f0" : "#1b61db",
          borderRadius: "30px",
          width: "48px",
          height: "48px",
          flexShrink: 0,
          transition: "background 0.25s ease",
          position: "relative",
          zIndex: 1,
        }}
        animate={{ rotate: hovered ? 10 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <ArrowDiagonal size={16} color="white" />
      </motion.div>
    </motion.div>
  );
}
