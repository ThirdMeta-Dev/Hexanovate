/* ─────────────────────────────────────────────────────────────────────────────
   GlobalHeader — sticky nav bar for inner pages (Schedule Demo, Contact, etc.)
   Matches the BannerSection nav exactly: logo left, glass pill right (desktop),
   hamburger menu (tablet/mobile ≤ 1024px).
   ───────────────────────────────────────────────────────────────────────────── */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import svgPaths from "../../imports/svg-icprnzbobl";

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function navigateTo(anchor: string | undefined, href: string | undefined, navigate: ReturnType<typeof useNavigate>) {
  if (href) { window.open(href, "_blank", "noopener,noreferrer"); return; }
  if (anchor) { window.location.href = `/#${anchor}`; }
}

/* ── Hexanovate Logo ─────────────────────────────────────────────────────── */
function HexaLogo() {
  return (
    <svg width="35" height="41" viewBox="0 0 35 41" fill="none" style={{ display: "block", flexShrink: 0 }}>
      <g clipPath="url(#gh-hex-clip)">
        <path d={svgPaths.p2acdb700} fill="white" />
        <path d={svgPaths.p1ba90200} fill="white" />
        <path d={svgPaths.p337f8780} fill="#FFA600" />
      </g>
      <defs>
        <clipPath id="gh-hex-clip">
          <rect width="35" height="41" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

/* ── Chevron ─────────────────────────────────────────────────────────────── */
function ChevronIcon({ color = "white" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: "block", flexShrink: 0 }}>
      <path d="M4 6L8 10L12 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Arrow diagonal ↗ ───────────────────────────────────────────────────── */
function ArrowDiag({ size = 16, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 17.09 17.09" fill="none" style={{ display: "block" }}>
      <path d={svgPaths.pe61a680} fill={color} stroke={color} strokeWidth="0.3" />
    </svg>
  );
}

/* ── Dropdown data ───────────────────────────────────────────────────────── */
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

/* ── Dropdown item ───────────────────────────────────────────────────────── */
function DropdownItem({ label, sub, href, anchor }: { label: string; sub?: string; href?: string; anchor?: string }) {
  const navigate = useNavigate();
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => navigateTo(anchor, href, navigate)}
      style={{
        padding: "10px 18px", cursor: "pointer",
        background: hov ? "rgba(27,97,219,0.12)" : "transparent",
        transition: "background 0.15s ease",
        display: "flex", flexDirection: "column", gap: 2,
      }}
    >
      <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 13, color: hov ? "white" : "rgba(255,255,255,0.85)", transition: "color 0.15s ease", whiteSpace: "nowrap" }}>{label}</span>
      {sub && <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 11, color: hov ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.35)", whiteSpace: "nowrap" }}>{sub}</span>}
    </div>
  );
}

/* ── Nav Item ────────────────────────────────────────────────────────────── */
function NavItem({ label, hasDropdown = false }: { label: string; hasDropdown?: boolean }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const items = NAV_DROPDOWNS[label] ?? [];

  const handleClick = () => {
    if (label === "Case Studies") window.location.href = "/#fmcg-portfolio";
    if (label === "Contact Us") navigate("/contact-us");
  };

  return (
    <div style={{ position: "relative" }} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={handleClick}
        style={{ display: "flex", alignItems: "center", gap: 2, background: "transparent", border: "none", outline: "none", cursor: "pointer", padding: "0 0 4px 0" }}
      >
        <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.6", color: open ? "#e0e0e0" : "white", transition: "color 0.2s ease", whiteSpace: "nowrap" }}>
          {label}
        </span>
        {hasDropdown && (
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22, ease: "easeOut" }} style={{ display: "flex" }}>
            <ChevronIcon color={open ? "#e0e0e0" : "white"} />
          </motion.div>
        )}
      </button>

      {open && (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "#1b61db", borderRadius: 999 }} />
      )}

      <AnimatePresence>
        {open && hasDropdown && items.length > 0 && (
          <motion.div
            style={{ position: "absolute", top: "calc(100% + 14px)", left: "50%", x: "-50%", background: "rgba(8,8,12,0.96)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "8px 0", minWidth: 220, zIndex: 200, boxShadow: "0 16px 48px rgba(0,0,0,0.5)" }}
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div style={{ position: "absolute", top: -5, left: "50%", transform: "translateX(-50%) rotate(45deg)", width: 10, height: 10, background: "rgba(8,8,12,0.96)", border: "1px solid rgba(255,255,255,0.09)", borderBottom: "none", borderRight: "none" }} />
            {items.map((item, i) => (
              <DropdownItem key={i} label={item.label} sub={item.sub} href={item.href} anchor={item.anchor} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Desktop Glass Nav Pill ──────────────────────────────────────────────── */
function GlassNavPill() {
  const navigate = useNavigate();
  const [ctaHov, setCtaHov] = useState(false);

  return (
    <div style={{ height: 59, paddingLeft: 40, paddingRight: 6, borderRadius: 60, background: "rgba(255,255,255,0.10)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20, height: 26, paddingLeft: 8 }}>
        <NavItem label="Solutions" hasDropdown />
        <NavItem label="Case Studies" />
        <NavItem label="Company" hasDropdown />
        <NavItem label="Contact Us" />
      </div>

      <motion.div
        style={{ display: "flex", alignItems: "center", marginLeft: 28, cursor: "pointer", borderRadius: 30, boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.30)", flexShrink: 0 }}
        onHoverStart={() => setCtaHov(true)}
        onHoverEnd={() => setCtaHov(false)}
        onClick={() => navigate("/schedule-demo")}
      >
        <div style={{ background: ctaHov ? "linear-gradient(135deg, #2470f0 0%, #1b61db 100%)" : "#1b61db", borderRadius: 30, padding: "12px 24px", transition: "background 0.22s ease" }}>
          <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 16, color: "white", lineHeight: "normal", whiteSpace: "nowrap" }}>Book a Demo</span>
        </div>
        <motion.div
          style={{ width: 48, height: 48, borderRadius: 30, background: ctaHov ? "#2470f0" : "#1b61db", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginLeft: -1, transition: "background 0.22s ease" }}
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

/* ── Mobile Nav ──────────────────────────────────────────────────────────── */
function MobileNav() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navItems = [
    { label: "Solutions", hasDropdown: true },
    { label: "Case Studies", hasDropdown: false },
    { label: "Company", hasDropdown: true },
    { label: "Contact Us", hasDropdown: false },
  ];

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const closeAll = () => { setOpen(false); setOpenDropdown(null); };

  return (
    <div style={{ position: "relative", zIndex: 50 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px" }}>
        {/* Logo */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <div style={{ transform: "rotate(180deg) scaleY(-1)", flexShrink: 0 }}><HexaLogo /></div>
          <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 20, lineHeight: "1.4", color: "white", whiteSpace: "nowrap" }}>Hexanovate</span>
        </div>

        {/* Hamburger */}
        <motion.button
          style={{ background: "transparent", border: "none", outline: "none", cursor: "pointer", padding: 6, display: "flex", alignItems: "center", justifyContent: "center" }}
          onClick={() => { setOpen(!open); setOpenDropdown(null); }}
          whileTap={{ scale: 0.9 }}
        >
          {open ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            style={{ position: "absolute", left: 0, right: 0, top: "100%", background: "rgba(10,10,10,0.97)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.07)", paddingBottom: 20, zIndex: 100 }}
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
                      if (item.label === "Case Studies") { window.location.href = "/#fmcg-portfolio"; closeAll(); }
                      if (item.label === "Contact Us") { navigate("/contact-us"); closeAll(); }
                    }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)", cursor: "pointer" }}
                  >
                    <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 15, color: isOpen ? "#1b61db" : "white", transition: "color 0.2s ease" }}>{item.label}</span>
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
                              else if (sub.anchor) { window.location.href = `/#${sub.anchor}`; closeAll(); }
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
            <div style={{ padding: "16px 20px 0" }}>
              <button
                onClick={() => { navigate("/schedule-demo"); closeAll(); }}
                style={{ width: "100%", background: "#1b61db", borderRadius: 30, padding: "12px 24px", border: "none", outline: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: 15, color: "white" }}>Book a Demo</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Global Header ───────────────────────────────────────────────────────── */
export function GlobalHeader() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [vw, setVw] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1440);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  const isMobile = vw <= 1024;

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
        background: scrolled ? "rgba(10,10,10,0.97)" : "rgba(10,10,10,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      {isMobile ? (
        <MobileNav />
      ) : (
        <div style={{ maxWidth: 1145, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 20, paddingBottom: 20 }}>
            {/* Logo */}
            <motion.div
              style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0, cursor: "pointer" }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              onClick={() => navigate("/")}
            >
              <div style={{ transform: "rotate(180deg) scaleY(-1)", flexShrink: 0 }}><HexaLogo /></div>
              <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 22, lineHeight: "1.4", color: "white", whiteSpace: "nowrap" }}>Hexanovate</span>
            </motion.div>

            <GlassNavPill />
          </div>
        </div>
      )}
    </header>
  );
}