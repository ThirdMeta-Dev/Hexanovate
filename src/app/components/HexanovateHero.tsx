import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import imgUnion from "@/assets/42b45ba16e2708dd4fd8e9709aa3f776578cfdf4.png";
import svgPaths from "../../imports/svg-3w13tdh6kp";

/* ─────────────────────────────────────────────
   LOGO ICON
───────────────────────────────────────────── */
function HexanovateLogo() {
  return (
    <div className="h-[41px] relative w-[35px]">
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 35 41"
      >
        <defs>
          <clipPath id="clip0_logo">
            <rect fill="white" height="41" width="35" />
          </clipPath>
        </defs>
        <g clipPath="url(#clip0_logo)">
          <g>
            <path d={svgPaths.p2acdb700} fill="white" />
            <path d={svgPaths.p2acdb700} stroke="white" strokeWidth="0.3" />
          </g>
          <g>
            <path d={svgPaths.p1ba90200} fill="white" />
            <path d={svgPaths.p1ba90200} stroke="white" strokeWidth="0.3" />
          </g>
          <g>
            <path d={svgPaths.p337f8780} fill="#FFA600" />
            <path d={svgPaths.p337f8780} stroke="white" strokeWidth="0.3" />
          </g>
        </g>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CHEVRON DOWN ICON
───────────────────────────────────────────── */
function ChevronDown({ color = "white" }: { color?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="flex-shrink-0"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   DIAGONAL ARROW ICON  (↗)
───────────────────────────────────────────── */
function ArrowDiagonal({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 17.09 17.09"
      fill="none"
    >
      <path
        d={svgPaths.pe61a680}
        fill="white"
        stroke="white"
        strokeWidth="0.3"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   SCROLL DOWN ICON
───────────────────────────────────────────── */
function ScrollArrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="flex-shrink-0"
    >
      <path
        d="M8 2L8 14M4 10L8 14L12 10"
        stroke="#FFA600"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   NAV ITEMS CONFIG
───────────────────────────────────────────── */
const navItems = [
  { label: "Services", hasDropdown: true, active: false },
  { label: "Solutions", hasDropdown: true, active: false },
  { label: "Case Studies", hasDropdown: false, active: false },
  { label: "Company", hasDropdown: true, active: true },
];

/* ─────────────────────────────────────────────
   GLASSMORPHISM NAVBAR
───────────────────────────────────────────── */
function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [ctaHovered, setCtaHovered] = useState(false);
  const [arrowHovered, setArrowHovered] = useState(false);

  return (
    <div className="flex items-center justify-between w-full px-0">
      {/* Logo */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <HexanovateLogo />
        <span
          className="text-white"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "22px",
            fontWeight: 600,
            lineHeight: 1.4,
          }}
        >
          Hexanovate
        </span>
      </div>

      {/* Glassmorphism pill nav */}
      <div
        className="flex items-center"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          backgroundColor: "rgba(255,255,255,0.10)",
          borderRadius: "60px",
          height: "50px",
          paddingLeft: "32px",
          paddingRight: "5px",
        }}
      >
        {/* Nav items */}
        <div className="flex items-center gap-4 pr-6">
          {navItems.map((item) => (
            <button
              key={item.label}
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
              className="flex items-center gap-0.5 cursor-pointer transition-opacity duration-150 outline-none border-none bg-transparent p-0"
              style={{ opacity: hoveredItem === item.label ? 0.75 : 1 }}
            >
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "13px",
                  fontWeight: item.active ? 600 : 400,
                  lineHeight: 1.6,
                  color: item.active ? "#1b61db" : "white",
                }}
              >
                {item.label}
              </span>
              {item.hasDropdown && (
                <ChevronDown color={item.active ? "#1b61db" : "white"} />
              )}
            </button>
          ))}
        </div>

        {/* CTA Group */}
        <div className="flex items-center">
          {/* Book a Demo button */}
          <motion.button
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
            animate={{ scale: ctaHovered ? 1.03 : 1 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="flex items-center cursor-pointer outline-none border-none"
            style={{
              backgroundColor: "#1b61db",
              borderRadius: "30px",
              padding: "5px 12px",
              boxShadow: ctaHovered
                ? "0 4px 20px rgba(27,97,219,0.45)"
                : "none",
              transition: "box-shadow 0.18s ease",
            }}
          >
            <span
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                color: "white",
              }}
            >
              Book a Demo
            </span>
          </motion.button>

          {/* Arrow circle button */}
          <motion.button
            onMouseEnter={() => setArrowHovered(true)}
            onMouseLeave={() => setArrowHovered(false)}
            animate={{
              scale: arrowHovered ? 1.08 : 1,
              rotate: arrowHovered ? 45 : 0,
            }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="flex items-center justify-center cursor-pointer outline-none border-none ml-0"
            style={{
              backgroundColor: "#1b61db",
              borderRadius: "30px",
              width: "34px",
              height: "34px",
              flexShrink: 0,
            }}
          >
            <ArrowDiagonal size={12} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO BADGE
───────────────────────────────────────────── */
function HeroBadge() {
  return (
    <div
      className="flex items-center justify-center relative"
      style={{
        backgroundColor: "#111",
        borderRadius: "40px",
        padding: "6px 20px",
        border: "1px solid #414141",
        display: "inline-flex",
        width: "fit-content",
      }}
    >
      <span
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "12px",
          fontWeight: 400,
          color: "#FFA600",
        }}
      >
        Hero Section
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CTA BUTTON PAIR  (label + arrow)
───────────────────────────────────────────── */
interface CTAButtonProps {
  label: string;
  variant: "primary" | "secondary";
}

function CTAButton({ label, variant }: CTAButtonProps) {
  const [hovered, setHovered] = useState(false);
  const isPrimary = variant === "primary";

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ y: hovered ? -2 : 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="flex items-center cursor-pointer"
      style={{
        boxShadow: hovered
          ? isPrimary
            ? "0 8px 24px rgba(27,97,219,0.40)"
            : "0 6px 20px rgba(27,97,219,0.25)"
          : isPrimary
          ? "0 4px 4px rgba(0,0,0,0.30)"
          : "0 4px 4px rgba(0,0,0,0.29)",
        transition: "box-shadow 0.18s ease",
        borderRadius: "30px",
      }}
    >
      {/* Label */}
      <div
        style={{
          backgroundColor: isPrimary ? "#1b61db" : "#0e1f3d",
          borderRadius: "30px",
          padding: "12px 24px",
          border: isPrimary ? "none" : "1px solid #1b61db",
          position: "relative",
        }}
      >
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "16px",
            fontWeight: 500,
            color: "white",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      </div>

      {/* Arrow button */}
      <div
        className="flex items-center justify-center"
        style={{
          backgroundColor: isPrimary ? "#1b61db" : "#0e1f3d",
          borderRadius: "30px",
          width: "48px",
          height: "48px",
          border: isPrimary ? "none" : "1px solid #1b61db",
          flexShrink: 0,
          marginLeft: "-1px",
        }}
      >
        <motion.div
          animate={{ rotate: hovered ? 0 : 0, x: hovered ? 1 : 0, y: hovered ? -1 : 0 }}
          transition={{ duration: 0.18 }}
        >
          <ArrowDiagonal size={16} />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SCROLL INDICATOR
───────────────────────────────────────────── */
function ScrollIndicator() {
  return (
    <motion.div
      className="flex items-center gap-0.5 cursor-pointer select-none"
      animate={{ y: [0, 5, 0] }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.05 }}
    >
      <span
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "15px",
          fontWeight: 500,
          color: "#FFA600",
          letterSpacing: "0.01em",
        }}
      >
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 3, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.1,
        }}
      >
        <ScrollArrow />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN HERO SECTION
───────────────────────────────────────────── */
export function HexanovateHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div
      className="relative w-full flex items-center justify-center"
      style={{ backgroundColor: "#000", minHeight: "100vh", padding: "0" }}
    >
      {/* ── HERO CONTAINER ─────────────────────── */}
      <div
        ref={ref}
        className="relative overflow-hidden"
        style={{
          width: "1200px",
          maxWidth: "100vw",
          height: "655px",
          borderRadius: "24px",
          backgroundColor: "#0a0a0a",
        }}
      >
        {/* ── BACKGROUND: imgUnion (composite hero PNG from Figma) */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={imgUnion}
            alt=""
            className="absolute block"
            style={{
              top: "-5.5%",
              left: "-3.33%",
              width: "106.67%",
              height: "112.22%",
              maxWidth: "none",
              objectFit: "cover",
            }}
          />
        </div>

        {/* ── LEFT GRADIENT OVERLAY (fades cables photo into dark) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, #0a0a0a 28%, rgba(10,10,10,0.85) 46%, rgba(10,10,10,0.30) 68%, transparent 100%)",
            zIndex: 2,
          }}
        />

        {/* ── BOTTOM GRADIENT (subtle vignette at bottom) */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,0.60) 0%, transparent 100%)",
            zIndex: 2,
          }}
        />

        {/* ── BORDER OVERLAY (subtle outline) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "24px",
            zIndex: 5,
          }}
        />

        {/* ── CONTENT LAYER ─────────────────────── */}
        <div
          className="absolute inset-0 flex flex-col"
          style={{ zIndex: 10, padding: "0" }}
        >
          {/* ── HEADER ─────────────────────── */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex items-center"
            style={{
              padding: "0",
              paddingTop: "40px",
              paddingLeft: "0",
              paddingRight: "0",
              width: "100%",
              paddingInline: "0",
            }}
          >
            {/* Match figma: Frame183 - gap 134px, centered w-1200px */}
            <div
              className="flex items-center justify-between w-full"
              style={{ paddingLeft: "0", paddingRight: "0" }}
            >
              <Navbar />
            </div>
          </motion.div>

          {/* ── HERO CONTENT ─────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col"
            style={{
              marginTop: "44px",
              paddingLeft: "0",
              gap: "60px",
            }}
          >
            {/* Badge + Heading + Subtitle */}
            <div className="flex flex-col" style={{ gap: "24px" }}>
              {/* Badge */}
              <motion.div variants={itemVariants}>
                <HeroBadge />
              </motion.div>

              {/* Heading + Subtitle */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col"
                style={{ gap: "8px" }}
              >
                {/* Main Heading */}
                <div
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "52px",
                    fontWeight: 700,
                    lineHeight: 1.22,
                    color: "white",
                    textTransform: "capitalize",
                    width: "628px",
                    maxWidth: "100%",
                  }}
                >
                  <p style={{ margin: 0 }}>We Unlock Scale</p>
                  <p style={{ margin: 0 }}>Fixing What's Leaking</p>
                  <p style={{ margin: 0 }}>Conversion Lorem</p>
                </div>

                {/* Subtitle */}
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "25px",
                    color: "#727272",
                    margin: 0,
                    marginTop: "4px",
                  }}
                >
                  Short explanation that Hexanovate powers two specialized domains.
                </p>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex items-center"
              style={{ gap: "16px" }}
            >
              <CTAButton label="B2B ThirdMeta" variant="primary" />
              <CTAButton label="FMCG/D2C" variant="secondary" />
            </motion.div>
          </motion.div>
        </div>

        {/* ── SCROLL INDICATOR ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
          className="absolute flex items-center justify-center"
          style={{
            bottom: "58px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
          }}
        >
          <ScrollIndicator />
        </motion.div>
      </div>
    </div>
  );
}