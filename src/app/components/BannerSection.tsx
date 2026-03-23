/* ─────────────────────────────────────────────────────────────────────────
   BannerSection — pixel-perfect Figma recreation
   Source: Group1321316214-302-97.tsx (frame 302×97)
   Design tokens: blue #1b61db · navy #0e1f3d · amber #FFA600 · Manrope/Poppins
   Responsive: ≥768px scale-based card | <768px mobile stack + hamburger
   ───────────────────────────────────────────────────────────────────────── */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router";
import svgPaths from "../../imports/svg-icprnzbobl";

const VIDEO_SRC =
  "https://sienna-pelican-786032.hostingersite.com/wp-content/uploads/2026/03/social_SEO_Continuation_from_previous_scene._On_the_RIGHT_side_of_th_275c5974-1f7e-49bb-9f8a-647eb3ffd219_0.mp4";

/* ── Smooth-scroll helper ─────────────────────────────────────────────────── */
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
  else window.location.href = `/#${id}`;
}

const CARD_W = 1200;
const CARD_H = 655;

/* ── Hexanovate Logo Icon (35×41, 3-path composite) ─────────────────────── */
// Figma: outer hex shell (p2acdb700) + H-bar bottom (p1ba90200) + H-bar top amber (p337f8780)
// Container is -scale-y-100 rotate-180 in Figma → flip both axes
function HexaLogo() {
  return (
    <svg
      width="35"
      height="41"
      viewBox="0 0 35 41"
      fill="none"
      style={{ display: "block", flexShrink: 0 }}
    >
      <g clipPath="url(#hs-hex-clip)">
        <path d={svgPaths.p2acdb700} fill="white" />
        <path d={svgPaths.p1ba90200} fill="white" />
        <path d={svgPaths.p337f8780} fill="#FFA600" />
      </g>
      <defs>
        <clipPath id="hs-hex-clip">
          <rect width="35" height="41" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

/* ── Chevron Down (16×16) ─────────────────────────────────────────────────── */
function ChevronIcon({ color = "white" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: "block", flexShrink: 0 }}>
      <g clipPath="url(#hs-chev-clip)">
        <path d="M4 6L8 10L12 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="hs-chev-clip">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

/* ── Diagonal Arrow ↗ (pe61a680) ─────────────────────────────────────────── */
// Figma: rotate-90 scaleY(-1) on the icon wrapper → points ↗
function ArrowDiag({ size = 16, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 17.09 17.09"
      fill="none"
      style={{ display: "block" }}
    >
      <path d={svgPaths.pe61a680} fill={color} stroke={color} strokeWidth="0.3" />
    </svg>
  );
}

/* ── Scroll Down Arrow ↓ (p1b1a50a0 + p7e17900) ──────────────────────────── */
// Figma Frame34: outer -rotate-90 -scale-y-100 · inner Group -rotate-45
// Net transform: diagonal SVG lines rotate into a ↓ pointer
function ScrollArrowSvg() {
  return (
    <div
      style={{
        width: 20,
        height: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transform: "rotate(-90deg) scaleY(-1)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 8.751,
          height: 8.84,
          transform: "rotate(-45deg)",
        }}
      >
        <svg
          style={{
            position: "absolute",
            inset: "-8.48% -8.57%",
            display: "block",
            width: "calc(100% + 17.14%)",
            height: "calc(100% + 16.96%)",
          }}
          fill="none"
          viewBox="0 0 10.2513 10.3397"
          preserveAspectRatio="none"
        >
          <path
            d={svgPaths.p1b1a50a0}
            stroke="#FFA600"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={svgPaths.p7e17900}
            stroke="#FFA600"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

/* ── Nav Item ─────────────────────────────────────────────────────────────── */
const NAV_DROPDOWNS: Record<string, { label: string; sub?: string; href?: string; anchor?: string }[]> = {
  Solutions: [
    { label: "ThirdMeta", sub: "B2B Growth & Revenue", href: "https://thirdmeta.in/" },
    { label: "The Native Unit", sub: "FMCG & D2C Acceleration", href: "https://thenativeunit.com/" },
    { label: "EduHexa", sub: "Education Growth Solutions" },
  ],
  Company: [
    { label: "About Hexanovate", sub: "Our story & mission", anchor: "what-defines-us" },
    { label: "Our Team", sub: "The people behind the work", anchor: "team-culture" },
  ],
};

interface NavItemProps {
  label: string;
  hasDropdown?: boolean;
  isActive?: boolean;
}
function NavItem({ label, hasDropdown = false, isActive = false }: NavItemProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const items = NAV_DROPDOWNS[label] ?? [];

  /* Case Studies scrolls directly to the FMCG portfolio section */
  const handleClick = () => {
    if (label === "Case Studies") scrollToSection("fmcg-portfolio");
    if (label === "Contact Us") navigate("/contact-us");
  };

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger button */}
      <button
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          background: "transparent",
          border: "none",
          outline: "none",
          cursor: "pointer",
          padding: "0 0 4px 0",
        }}
      >
        <span
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontSize: 14,
            lineHeight: "1.6",
            color: open ? "#e0e0e0" : "white",
            transition: "color 0.2s ease",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
        {hasDropdown && (
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{ display: "flex" }}
          >
            <ChevronIcon color={open ? "#e0e0e0" : "white"} />
          </motion.div>
        )}
      </button>

      {/* Active/hover indicator — shows on hover OR when page is active */}
      {(isActive || open) && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "#1b61db",
            borderRadius: 999,
          }}
        />
      )}

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && hasDropdown && items.length > 0 && (
          <motion.div
            style={{
              position: "absolute",
              top: "calc(100% + 14px)",
              left: "50%",
              x: "-50%",
              background: "rgba(8,8,12,0.96)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 16,
              padding: "8px 0",
              minWidth: 220,
              zIndex: 200,
              boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
            }}
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {/* Arrow notch */}
            <div
              style={{
                position: "absolute",
                top: -5,
                left: "50%",
                transform: "translateX(-50%) rotate(45deg)",
                width: 10,
                height: 10,
                background: "rgba(8,8,12,0.96)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderBottom: "none",
                borderRight: "none",
              }}
            />
            {items.map((item, i) => (
              <DropdownItem key={i} label={item.label} sub={item.sub} href={item.href} anchor={item.anchor} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DropdownItem({ label, sub, href, anchor }: { label: string; sub?: string; href?: string; anchor?: string }) {
  const [hov, setHov] = useState(false);
  const handleClick = () => {
    if (href) window.open(href, "_blank", "noopener,noreferrer");
    else if (anchor) scrollToSection(anchor);
  };
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={handleClick}
      style={{
        padding: "10px 18px",
        cursor: "pointer",
        background: hov ? "rgba(27,97,219,0.12)" : "transparent",
        transition: "background 0.15s ease",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <span
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 500,
          fontSize: 13,
          color: hov ? "white" : "rgba(255,255,255,0.85)",
          transition: "color 0.15s ease",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      {sub && (
        <span
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontSize: 11,
            color: hov ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.35)",
            transition: "color 0.15s ease",
            whiteSpace: "nowrap",
          }}
        >
          {sub}
        </span>
      )}
    </div>
  );
}

/* ── Glassmorphism Nav Pill ───────────────────────────────────────────────── */
// Figma Frame10: backdrop-blur-[10px] bg-rgba(255,255,255,0.1) h-[59px] pl-[40px] pr-[6px] rounded-[60px]
// CTA pair (Book a Demo + arrow) now animates identically to the primary CtaBtn
function GlassNavPill() {
  const [ctaHov, setCtaHov] = useState(false);

  return (
    <div
      style={{
        height: 59,
        paddingLeft: 40,
        paddingRight: 6,
        borderRadius: 60,
        background: "rgba(255,255,255,0.10)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Frame4 — nav links: gap-[20px] h-[26px] pl-[8px] */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, height: 26, paddingLeft: 8 }}>
        <NavItem label="Solutions" hasDropdown />
        <NavItem label="Case Studies" />
        <NavItem label="Company" hasDropdown />
        <NavItem label="Contact Us" />
      </div>

      {/* Frame32 — CTA pair: gradient + arrow rotate on hover, no scale zoom */}
      <motion.div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: 28,
          cursor: "pointer",
          borderRadius: 30,
          boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.30)",
          flexShrink: 0,
        }}
        onHoverStart={() => setCtaHov(true)}
        onHoverEnd={() => setCtaHov(false)}
        onClick={() => window.location.href = "/schedule-demo"}
      >
        {/* Label — Book a Demo */}
        <div
          style={{
            background: ctaHov
              ? "linear-gradient(135deg, #2470f0 0%, #1b61db 100%)"
              : "#1b61db",
            borderRadius: 30,
            padding: "12px 24px",
            transition: "background 0.22s ease",
          }}
        >
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              fontSize: 16,
              color: "white",
              lineHeight: "normal",
              whiteSpace: "nowrap",
            }}
          >
            Book a Demo
          </span>
        </div>

        {/* Arrow circle — same 48px as CtaBtn arrow */}
        <motion.div
          style={{
            width: 48,
            height: 48,
            borderRadius: 30,
            background: ctaHov ? "#2470f0" : "#1b61db",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginLeft: -1,
            transition: "background 0.22s ease",
          }}
          animate={{ rotate: ctaHov ? 8 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <div style={{ transform: "rotate(90deg) scaleY(-1)", display: "flex" }}>
            <ArrowDiag size={16} color="white" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}


/* ── CTA Button (label + arrow pill pair) ─────────────────────────────────── */
// Primary   (Frame33=Frame29+Frame25): bg-#1b61db · shadow rgba(0,0,0,0.30)
// Outlined  (Frame35=Frame30+Frame26): bg-#0e1f3d · border-#1b61db · shadow rgba(0,0,0,0.29)
interface CtaBtnProps {
  label: string;
  variant: "primary" | "outlined";
  delay?: number;
  small?: boolean;
  href?: string;
}
function CtaBtn({ label, variant, delay = 0, small = false, href }: CtaBtnProps) {
  const [hov, setHov] = useState(false);
  const isPrimary = variant === "primary";
  const handleClick = () => {
    if (href) window.open(href, "_blank", "noopener,noreferrer");
  };
  return (
    <motion.div
      onClick={handleClick}
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        flexShrink: 0,
        borderRadius: 30,
        boxShadow: isPrimary
          ? "0px 4px 4px 0px rgba(0,0,0,0.30)"
          : "0px 4px 4px 0px rgba(0,0,0,0.29)",
      }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Label pill */}
      <div
        style={{
          background:
            hov && isPrimary
              ? "linear-gradient(135deg, #2470f0 0%, #1b61db 100%)"
              : isPrimary
              ? "#1b61db"
              : "#0e1f3d",
          borderRadius: 30,
          padding: small ? "8px 16px" : "12px 24px",
          position: "relative",
          transition: "background 0.22s ease",
        }}
      >
        {!isPrimary && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              border: "1px solid #1b61db",
              borderRadius: 30,
              pointerEvents: "none",
            }}
          />
        )}
        <span
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            fontSize: small ? 13 : 16,
            color: "white",
            lineHeight: "normal",
            whiteSpace: "nowrap",
            position: "relative",
          }}
        >
          {label}
        </span>
      </div>

      {/* Arrow circle: p-16 rounded-30 → 32px padding + 16px icon = 48px total */}
      <motion.div
        style={{
          width: small ? 36 : 48,
          height: small ? 36 : 48,
          borderRadius: 30,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          marginLeft: -1,
          background:
            hov && isPrimary ? "#2470f0" : isPrimary ? "#1b61db" : "#0e1f3d",
          transition: "background 0.22s ease",
        }}
        animate={{ rotate: hov ? 8 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {!isPrimary && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              border: "1px solid #1b61db",
              borderRadius: 30,
              pointerEvents: "none",
            }}
          />
        )}
        {/* rotate-90 scaleY(-1) → arrow points ↗ */}
        <div style={{ transform: "rotate(90deg) scaleY(-1)", display: "flex" }}>
          <ArrowDiag size={16} color="white" />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Scroll Indicator ─────────────────────────────────────────────────────── */
// Figma Frame34: absolute -translate-x-1/2 left-1/2 top-[597px]
// "Scroll" Poppins Medium 15px #ffa600 · bouncing ↓ arrow (scroll text animation)
function ScrollIndicator() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {!scrolled && (
        <motion.div
          key="scroll-ind"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 2,
            cursor: "pointer",
            userSelect: "none",
            padding: "10px 6px",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.5, delay: 1.4, ease: "easeOut" }}
          onClick={() =>
            window.scrollBy({ top: window.innerHeight * 0.65, behavior: "smooth" })
          }
          whileHover={{ scale: 1.06 }}
        >
          {/* "Scroll" text — subtle opacity pulse */}
          <motion.span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              fontSize: 15,
              color: "#FFA600",
              lineHeight: "normal",
              whiteSpace: "nowrap",
            }}
            animate={{ opacity: [1, 0.75, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            Scroll
          </motion.span>

          {/* Arrow bounces independently with slight delay */}
          <motion.div
            style={{ display: "flex" }}
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
          >
            <ScrollArrowSvg />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Mobile Hamburger Nav ─────────────────────────────────────────────────── */
function MobileNav() {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const navItems = [
    { label: "Solutions", hasDropdown: true },
    { label: "Case Studies", hasDropdown: false },
    { label: "Company", hasDropdown: true, active: false },
    { label: "Contact Us", hasDropdown: false },
  ];

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const closeAll = () => { setOpen(false); setOpenDropdown(null); };

  return (
    <div style={{ position: "relative", zIndex: 50 }}>
      {/* Top bar: logo + hamburger */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <div style={{ transform: "rotate(180deg) scaleY(-1)", flexShrink: 0 }}>
            <HexaLogo />
          </div>
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: 20,
              lineHeight: "1.4",
              color: "white",
              whiteSpace: "nowrap",
            }}
          >
            Hexanovate
          </span>
        </div>

        {/* Hamburger / Close */}
        <motion.button
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            cursor: "pointer",
            padding: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => { setOpen(!open); setOpenDropdown(null); }}
          whileTap={{ scale: 0.9 }}
        >
          {open ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
        </motion.button>
      </div>

      {/* Dropdown menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "100%",
              background: "rgba(10,10,10,0.97)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              paddingBottom: 20,
              zIndex: 100,
            }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {navItems.map((item) => {
              const subItems = NAV_DROPDOWNS[item.label] ?? [];
              const isOpen = openDropdown === item.label;
              return (
                <div key={item.label}>
                  {/* Row */}
                  <div
                    onClick={() => {
                      if (item.hasDropdown) { toggleDropdown(item.label); return; }
                      if (item.label === "Case Studies") { scrollToSection("fmcg-portfolio"); closeAll(); }
                      if (item.label === "Contact Us") { navigate("/contact-us"); closeAll(); }
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 20px",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 400,
                        fontSize: 15,
                        color: isOpen ? "#1b61db" : "white",
                        transition: "color 0.2s ease",
                      }}
                    >
                      {item.label}
                    </span>
                    {item.hasDropdown && (
                      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.22 }} style={{ display: "flex" }}>
                        <ChevronIcon color={isOpen ? "#1b61db" : "white"} />
                      </motion.div>
                    )}
                  </div>
                  {/* Accordion sub-items */}
                  <AnimatePresence>
                    {item.hasDropdown && isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        style={{ overflow: "hidden", background: "rgba(27,97,219,0.06)" }}
                      >
                        {subItems.map((sub, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              if (sub.href) window.open(sub.href, "_blank", "noopener,noreferrer");
                              else if (sub.anchor) { scrollToSection(sub.anchor); closeAll(); }
                            }}
                            style={{ padding: "10px 20px 10px 32px", borderBottom: "1px solid rgba(255,255,255,0.03)", cursor: "pointer", display: "flex", flexDirection: "column", gap: 2 }}
                          >
                            <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 13, color: "rgba(255,255,255,0.85)" }}>{sub.label}</span>
                            {sub.sub && <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 11, color: "rgba(255,255,255,0.38)" }}>{sub.sub}</span>}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Book a Demo in mobile menu */}
            <div style={{ padding: "16px 20px 0" }}>
              <button
                onClick={() => { scrollToSection("get-in-touch"); closeAll(); }}
                style={{
                  width: "100%",
                  background: "#1b61db",
                  borderRadius: 30,
                  padding: "12px 24px",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: 15,
                    color: "white",
                  }}
                >
                  Book a Demo
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Mobile Hero Content ──────────────────────────────────────────────────── */
function MobileHeroContent() {
  return (
    /* Outer shell: centers the inner content block horizontally */
    <div
      style={{
        position: "relative",
        zIndex: 10,
        padding: "60px 24px 60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Inner block: left-aligned content, capped width, centered on page */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
          maxWidth: "680px",
        }}
      >
        {/* Headline */}
        <div
          style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 5.5vw, 48px)",
            lineHeight: 1.22,
            color: "white",
            textTransform: "capitalize",
            marginTop: 20,
            width: "100%",
          }}
        >
          <motion.div
            style={{ display: "block", margin: 0 }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            The Future of Business Deserves
          </motion.div>
          <motion.div
            style={{ display: "block", margin: 0 }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.63, ease: [0.22, 1, 0.36, 1] }}
          >
            a Better World. We're Building It.
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontSize: "clamp(13px, 2vw, 16px)",
            lineHeight: "22px",
            color: "#727272",
            margin: "14px 0 0",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
        >
          A connected business ecosystem built around your vision. Bringing together systems, growth engines, teams, and capabilities so you can focus on what you do best.
        </motion.p>

        {/* CTAs — left-aligned row */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "flex-start",
            gap: 14,
            marginTop: 36,
            paddingBottom: 40,
          }}
        >
          <CtaBtn label="B2B ThirdMeta" variant="primary" delay={0.9} small href="https://thirdmeta.in/" />
          <CtaBtn label="FMCG/D2C" variant="outlined" delay={1.0} small href="https://thenativeunit.com/" />
        </div>
      </div>
    </div>
  );
}

/* ── Banner Section ─────────────────────────────────────────────────────────
   Main export. Handles:
   - Scale-based desktop/tablet card (preserves Figma card shape in Union PNG)
   - Separate mobile layout (stacked, hamburger nav)
   - Scroll parallax on the background + content layer
   - Scroll-driven opacity fade as section exits viewport
   ─────────────────────────────────────────────────────────────────────────── */
export function BannerSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  /* Only need vw for isMobile detection — no more scale calc */
  const [vw, setVw] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = vw <= 1024;

  /* Scroll parallax + opacity fade */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 44]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -25]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35, 0.85], [1, 1, 0]);

  /* ── MOBILE / TABLET LAYOUT ───────────────────────────────────────────── */
  if (isMobile) {
    return (
      <div
        ref={heroRef}
        style={{
          position: "relative",
          width: "100%",
          height: "auto",
          overflow: "hidden",
        }}
      >
        {/* Background video layer */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <video
            src={VIDEO_SRC}
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute",
              top: "-5.5%",
              left: "-3.33%",
              width: "106.67%",
              height: "111%",
              maxWidth: "none",
              objectFit: "cover",
            }}
          />
          {/* Dark left-to-right fade */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, #0a0a0a 28%, rgba(10,10,10,0.92) 55%, rgba(10,10,10,0.55) 100%)",
            }}
          />
          {/* Bottom vignette */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 130,
              background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)",
            }}
          />
        </div>

        {/* Mobile nav */}
        <div style={{ position: "relative", zIndex: 30 }}>
          <MobileNav />
        </div>

        {/* Hero content */}
        <MobileHeroContent />

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
            whiteSpace: "nowrap",
          }}
        >
          <ScrollIndicator />
        </div>
      </div>
    );
  }

  /* ── DESKTOP LAYOUT — full-width video + 1145px centred content ───────── */
  return (
    <div
      ref={heroRef}
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        zIndex: 10,
        overflow: "hidden",
      }}
    >
      {/* ── Full-width video background with parallax bleed ──────────────────
       * Extra negative inset gives the parallax room to move without gaps.
       * ──────────────────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          position: "absolute",
          top: -36,
          left: -40,
          right: -40,
          bottom: -44,
          y: bgY,
          zIndex: 0,
        }}
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
      >
        <video
          src={VIDEO_SRC}
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
      </motion.div>

      {/* ── Left amber gradient ──────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left: -104,
          top: -58,
          width: 1366,
          height: 431,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          transform: "rotate(90deg)",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 431,
            height: 1366,
            borderRadius: "0 0 0 50px",
            background:
              "linear-gradient(74.5137deg, rgba(255,166,0,0.1) 0.14%, rgba(255,166,0,0) 51.06%)",
          }}
        />
      </div>

      {/* ── Bottom-right dark gradient ───────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: 362,
          height: 192,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          transform: "rotate(-90deg)",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 192,
            height: 362,
            borderRadius: "0 0 0 50px",
            background:
              "linear-gradient(53.4996deg, rgba(0,0,0,0.48) 0.17%, rgba(0,0,0,0) 47.71%)",
          }}
        />
      </div>

      {/* ── Content layer ─────────────────────────────────────────────────── */}
      <motion.div
        style={{
          opacity: heroOpacity,
          position: "relative",
          width: "100%",
          height: "100%",
          zIndex: 10,
        }}
      >
        <motion.div
          style={{ position: "relative", width: "100%", height: "100%" }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ── Max-width centred content wrapper — 1145px ─────────────── */}
          <div
            style={{
              maxWidth: 1145,
              margin: "0 auto",
              paddingLeft: 48,
              paddingRight: 48,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* ── Navbar row: logo left, glass pill right ──────────────── */}
            <motion.div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 40,
                flexShrink: 0,
              }}
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Logo */}
              <motion.div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  flexShrink: 0,
                  cursor: "pointer",
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >
                <div style={{ transform: "rotate(180deg) scaleY(-1)", flexShrink: 0 }}>
                  <HexaLogo />
                </div>
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: 22,
                    lineHeight: "1.4",
                    color: "white",
                    whiteSpace: "nowrap",
                  }}
                >
                  Hexanovate
                </span>
              </motion.div>

              {/* Glass nav pill */}
              <GlassNavPill />
            </motion.div>

            {/* ── Hero body — vertically centred in remaining space ─────── */}
            {/* flex: 1 fills space below nav; alignItems: center centres   */}
            {/* the block vertically; text stays left-aligned.              */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                paddingBottom: 60,
              }}
            >
              <motion.div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 60,
                  y: contentY,
                }}
              >
                {/* Badge + headline block */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 24,
                  }}
                >

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: 8,
                    }}
                  >
                    {/* Headline — Manrope Bold 52px */}
                    <div
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontWeight: 700,
                        fontSize: 52,
                        lineHeight: 1.22,
                        color: "white",
                        textTransform: "capitalize",
                        width: 628,
                        maxWidth: "100%",
                        overflow: "hidden",
                      }}
                    >
                      {["The Future of Business Deserves", "a Better World. We're Building It."].map(
                        (line, i) => (
                          <motion.div
                            key={i}
                            style={{ display: "block", margin: 0 }}
                            initial={{ opacity: 0, y: 32 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.7,
                              delay: 0.65 + i * 0.13,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
                            {line}
                          </motion.div>
                        )
                      )}
                    </div>

                    {/* Subtitle — Poppins Regular 16px */}
                    <motion.p
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 400,
                        fontSize: 16,
                        lineHeight: "25px",
                        color: "#727272",
                        margin: 0,
                        minWidth: "100%",
                      }}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                    >
                      A connected business ecosystem built around your vision. Bringing together systems, growth engines, teams, and capabilities so you can focus on what you do best.
                    </motion.p>
                  </div>
                </div>

                {/* CTA buttons */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <CtaBtn label="B2B ThirdMeta" variant="primary" delay={1.1} href="https://thirdmeta.in/" />
                  <CtaBtn label="FMCG/D2C" variant="outlined" delay={1.22} href="https://thenativeunit.com/" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── Scroll indicator — centred at viewport bottom ────────────── */}
          <div
            style={{
              position: "absolute",
              bottom: 28,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 20,
              whiteSpace: "nowrap",
            }}
          >
            <ScrollIndicator />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}