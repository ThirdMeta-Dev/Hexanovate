import { useState } from "react";
import svgPaths from "../../imports/svg-6g0d8ismyr";
import imgPersonImage from "@/assets/footer-person.png";
import { useCmsSectionContent } from "../context/CmsSectionContext";

/* ─────────────────────────────────────────────────────────────────────────────
 * HEXANOVATE ICON
 * ───────────────────────────────────────────────────────────────────────────── */
function HexanovateIcon() {
  return (
    <div style={{ width: 46, height: 54, position: "relative", flexShrink: 0 }}>
      <div style={{ transform: "scaleY(-1) rotate(180deg)", width: "100%", height: "100%" }}>
        <svg
          style={{ display: "block", width: "100%", height: "100%" }}
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 46 54"
        >
          <g clipPath="url(#footer-hexanv-clip)">
            <path d={svgPaths.p2351b980} fill="white" stroke="white" strokeWidth="0.3" />
            <path d={svgPaths.p1f2cbd00} fill="white" stroke="white" strokeWidth="0.3" />
            <path d={svgPaths.p2ee25d40} fill="#FFA600" stroke="white" strokeWidth="0.3" />
          </g>
          <defs>
            <clipPath id="footer-hexanv-clip">
              <rect fill="white" height="54" width="46" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * SOCIAL ICON BUTTON  — now wrapped in <a> with real href
 * ───────────────────────────────────────────────────────────────────────────── */
function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 36, height: 36, borderRadius: 8,
        background: hovered ? "#4981e2" : "transparent",
        border: "1.5px solid #4981e2",
        boxSizing: "border-box",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", flexShrink: 0,
        transition: "background 0.2s ease",
        textDecoration: "none",
      }}
    >
      {children}
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * NAV ITEM — internal anchors use smooth scroll; external open in new tab
 * ───────────────────────────────────────────────────────────────────────────── */
function NavItem({ label, href }: { label: string; href?: string }) {
  const [hovered, setHovered] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const inner = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", gap: 8, alignItems: "center",
        padding: "6px 16px", borderRadius: 8,
        background: hovered ? "#4981e2" : "transparent",
        cursor: "pointer",
        transition: "background 0.2s ease",
        flexShrink: 0,
      }}
    >
      <p style={{
        fontFamily: "Poppins, sans-serif",
        fontWeight: hovered ? 500 : 300,
        fontSize: 14, color: "white",
        lineHeight: "20px", margin: 0, whiteSpace: "nowrap",
        transition: "font-weight 0s",
      }}>
        {label}
      </p>
    </div>
  );

  if (href) {
    const isExternal = !href.startsWith("#");
    return (
      <a
        href={href}
        onClick={isExternal ? undefined : handleClick}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        style={{ textDecoration: "none" }}
      >
        {inner}
      </a>
    );
  }
  return inner;
}

/* ─── NAV COLUMN ─────────────────────────────────────────────────────────── */
function NavColumn({ title, items }: { title: string; items: { label: string; href?: string }[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flexShrink: 0 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
        <p style={{
          fontFamily: "'Satoshi', 'Manrope', sans-serif",
          fontWeight: 700, fontSize: 15, color: "white",
          lineHeight: "22px", margin: 0, whiteSpace: "nowrap",
        }}>
          {title}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
          {items.map((item) => (
            <NavItem key={item.label} label={item.label} href={item.href} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * BLUE PANEL  — 68% width (blue column gets more room for 4-col layout)
 * ───────────────────────────────────────────────────────────────────────────── */
function BluePanel() {
  const { content } = useCmsSectionContent();
  const linkedinUrl = String(content.linkedinUrl ?? "https://www.linkedin.com/company/hexanovate/");
  const twitterUrl = String(content.twitterUrl ?? "https://x.com/hexanovate");
  const instagramUrl = String(content.instagramUrl ?? "https://www.instagram.com/hexanovate/");
  return (
    <div
      className="footer-blue-panel"
      style={{
        flex: "68 68 0",
        minWidth: 0,
        padding: "60px 48px",
        display: "flex",
        alignItems: "flex-start",
        minHeight: 374,
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(to bottom, #1b61db 0%, #13459b 100%)",
        borderRadius: "20px 0 0 0",
      }}
    >
      {/* Inner row: fixed-width left col + nav columns group */}
      <div
        className="footer-blue-inner"
        style={{ display: "flex", gap: 48, alignItems: "flex-start", width: "100%", minWidth: 0 }}
      >
        {/* ── LEFT COL: logo + description + social ───────────────────── */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "flex-start",
          flex: "0 0 260px", width: 260,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-start", width: "100%" }}>
            {/* Logo */}
            <div style={{ display: "flex", gap: 16, alignItems: "center", flexShrink: 0 }}>
              <HexanovateIcon />
              <p style={{
                fontFamily: "Poppins, sans-serif", fontWeight: 600,
                fontSize: 28, color: "white", lineHeight: 1.4, margin: 0, whiteSpace: "nowrap",
              }}>
                ThirdMeta
              </p>
            </div>

            {/* Description + social; gap-48 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 40, alignItems: "flex-start", width: "100%" }}>
              <div style={{
                fontFamily: "Poppins, sans-serif", fontWeight: 400,
                fontSize: 15, color: "white", lineHeight: "24px",
              }}>
                <p style={{ margin: 0 }}>We accelerate brand growth through intelligent digital strategies and performance-driven marketing.</p>
              </div>

              {/* Social icons */}
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                {/* LinkedIn */}
                <SocialIcon href={linkedinUrl} label="LinkedIn">
                  <svg style={{ display: "block", width: 24, height: 24 }} fill="none" viewBox="0 0 24 24">
                    <path d={svgPaths.p2cb34000} fill="white" />
                  </svg>
                </SocialIcon>

                {/* Twitter / X */}
                <SocialIcon href={twitterUrl} label="Twitter/X">
                  <svg style={{ display: "block", width: 24, height: 24 }} fill="none" viewBox="0 0 24 24">
                    <path d={svgPaths.p1e3f70f1} fill="white" />
                  </svg>
                </SocialIcon>

                {/* Behance */}
                <SocialIcon href="https://www.behance.net/urvimandge?tracking_source=search_projects%7Chexanovate" label="Behance">
                  <svg style={{ display: "block", width: 22, height: 22 }} viewBox="0 0 24 24" fill="white">
                    <path d="M9.03 8.175c0-1.607-1.088-1.607-1.088-1.607H4.5v3.323h3.238c.67 0 1.292-.11 1.292-1.716zM7.974 11.147H4.5V14.9h3.3c.407 0 1.576-.14 1.576-1.894 0-1.503-.9-1.86-1.402-1.86zM16.15 10.6c-1.63 0-1.9 1.63-1.9 1.63h3.618s-.09-1.63-1.718-1.63z" />
                    <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM14.3 7.4h4v1.1h-4V7.4zM10.52 13.1c0 3.1-3.22 3-3.22 3H3.5V6h3.8c1.71 0 3.06.97 3.06 2.87 0 1.9-1.62 1.98-1.62 1.98s2.78.1 2.78 2.25zm6.15 1.5h-4.842s.18 1.9 1.9 1.9c1.72 0 1.72-1.1 1.72-1.1h2.12c0 1.9-2.1 2.9-3.84 2.9-1.74 0-4-.9-4-4.1 0-3.2 1.98-4.2 3.96-4.2 2 0 3.9 1.2 3.9 4.3l-.04.3h-.86z" />
                  </svg>
                </SocialIcon>

                {/* Instagram */}
                <SocialIcon href={instagramUrl} label="Instagram">
                  <svg style={{ display: "block", width: 24, height: 24 }} fill="none" viewBox="0 0 24 24">
                    <path d={svgPaths.p2f8cbe00} fill="white" />
                  </svg>
                </SocialIcon>
              </div>
            </div>
          </div>
        </div>

        {/* ── NAV COLUMNS GROUP ─────────────────────────────────────────── */}
        <div style={{
          display: "flex", gap: 32, alignItems: "flex-start",
          flex: "1 1 0", minWidth: 0, flexWrap: "wrap",
        }}>
          <NavColumn
            title="Solutions"
            items={[
              { label: "TheNativeUnit", href: "https://thenativeunit.com/" },
              { label: "EduHexa", href: "https://eduhexa.in/" },
              { label: "ThirdMeta", href: "https://thirdmeta.in/" },
            ]}
          />
          <NavColumn
            title="Portfolio"
            items={[
              { label: "B2B Portfolio", href: "#b2b-portfolio" },
              { label: "FMCG Portfolio", href: "#fmcg-portfolio" },
              { label: "Eduhexa Portfolio", href: "#edu-portfolio" },
            ]}
          />
          <NavColumn
            title="Resources"
            items={[
              { label: "Blogs", href: "#resources" },
              { label: "Team & Culture", href: "#team-culture" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * DARK PANEL  — 32% width (reduced)
 * ───────────────────────────────────────────────────────────────────────────── */
function DarkPanel() {
  return (
    <div
      className="footer-dark-panel"
      style={{
        flex: "32 32 0",
        position: "relative",
        alignSelf: "stretch",
        minHeight: 374,
        overflow: "visible",
      }}
    >
      {/* Union SVG — dark fill with concave corner */}
      <svg
        className="footer-union-svg"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 325 374"
      >
        <path d={svgPaths.p20326c80} fill="black" />
      </svg>

      {/* TV-head person image */}
      <div
        className="footer-person-image"
        style={{
          position: "absolute",
          top: -174,
          left: 40,
          width: 255,
          height: 325,
          zIndex: 10,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <img
          src={imgPersonImage}
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: "-0.06%",
            width: "100.12%",
            height: "117.78%",
            objectFit: "cover",
            objectPosition: "top center",
            display: "block",
          }}
        />
      </div>

      {/* Gradient overlays */}
      <div
        className="footer-person-image"
        style={{
          position: "absolute",
          top: 28, left: 40, width: 255, height: 122,
          background: "linear-gradient(to bottom, rgba(2,2,2,0), #020202)",
          zIndex: 11, pointerEvents: "none",
        }}
      />
      <div
        className="footer-person-image"
        style={{
          position: "absolute",
          top: 53, left: 40, width: 255, height: 98,
          background: "linear-gradient(to bottom, rgba(2,2,2,0), #020202)",
          zIndex: 11, pointerEvents: "none",
        }}
      />

      {/* Address content — bottom-aligned */}
      <div
        style={{
          display: "flex", flexDirection: "column",
          justifyContent: "flex-end",
          height: "100%", width: "100%",
          position: "relative", zIndex: 2,
        }}
      >
        <div
          className="footer-dark-content"
          style={{
            paddingTop: 64, paddingBottom: 40,
            paddingLeft: 44, paddingRight: 44,
            display: "flex", flexDirection: "column",
            gap: 10, alignItems: "flex-start",
            boxSizing: "border-box",
          }}
        >
          <div
            className="footer-dark-frame4"
            style={{
              display: "flex", flexDirection: "column",
              gap: 28, alignItems: "flex-end", width: "100%",
            }}
          >
            {/* Address label */}
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexShrink: 0 }}>
              <div style={{
                width: 24, height: 24, borderRadius: 8, background: "#4981e2",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, overflow: "clip",
              }}>
                <svg style={{ display: "block", width: 16, height: 16 }} fill="none" viewBox="0 0 16 16">
                  <path d={svgPaths.peca1100} fill="white" />
                </svg>
              </div>
              <p style={{
                fontFamily: "'Satoshi', 'Manrope', sans-serif",
                fontWeight: 700, fontSize: 18, color: "white",
                lineHeight: "24px", margin: 0, whiteSpace: "nowrap",
              }}>
                Address
              </p>
            </div>

            {/* Address text + CIN */}
            <div
              className="footer-dark-frame11"
              style={{
                display: "flex", flexDirection: "column",
                gap: 12, width: "100%", textAlign: "right",
              }}
            >
              <p style={{
                fontFamily: "Poppins, sans-serif", fontWeight: 400,
                fontSize: 15, color: "#a8a8a8", lineHeight: "24px",
                margin: 0, width: "100%",
              }}>
                Arcadion Building, North Main Road, Koregoan Park, Pune,
                Maharashtra Pin: 411001
              </p>
              <p style={{
                fontFamily: "Poppins, sans-serif", fontWeight: 300,
                fontSize: 13, color: "#727272", lineHeight: "24px",
                margin: 0, width: "100%",
              }}>
                CIN:U62013PN2023PTC223154
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * FOOTER SECTION
 * Blue panel: 55% — Dark panel: 45%
 * ───────────────────────────────────────────────────────────────────────────── */
export function FooterSection() {
  return (
    <section
      className="footer-section"
      style={{
        width: "100%",
        position: "relative",
        overflow: "visible",
        padding: 0,
        background: "#0a0a0a",
      }}
    >
      {/* ── Content row ── */}
      <div
        className="footer-content-row"
        style={{
          width: "100%",
          margin: 0,
          padding: 0,
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "stretch",
        }}
      >
        <BluePanel />
        <DarkPanel />
      </div>

      {/* ── Responsive overrides ─────────────────────────────────────────── */}
      <style>{`
        /* ── Desktop: align left edge of blue content with form above ─── */
        .footer-blue-panel {
          padding-left: max(60px, min(220px, calc((100vw - 1148px) / 2 + 57px))) !important;
        }

        /* ── Tablet: 768 – 1024px ─────────────────────────────────────── */
        @media (max-width: 1024px) and (min-width: 768px) {
          .footer-blue-inner {
            gap: 28px !important;
            flex-wrap: wrap !important;
          }
          .footer-dark-content {
            padding-top: 40px !important;
            padding-bottom: 32px !important;
            padding-left: 28px !important;
            padding-right: 28px !important;
          }
          .footer-person-image {
            display: none !important;
          }
          .footer-dark-frame4 {
            align-items: flex-start !important;
          }
          .footer-dark-frame11 {
            text-align: left !important;
          }
        }

        /* ── Mobile: < 768px ─────────────────────────────────────────── */
        @media (max-width: 767px) {
          .footer-section {
            background: #0a0a0a !important;
            border-radius: 0 !important;
          }
          .footer-content-row {
            flex-direction: column !important;
          }
          .footer-blue-panel {
            flex: none !important;
            width: 100% !important;
            min-height: unset !important;
            border-radius: 0 !important;
            background: linear-gradient(to bottom, #1b61db 0%, #13459b 100%) !important;
            padding: 40px 24px !important;
          }
          .footer-blue-inner {
            flex-direction: column !important;
            gap: 32px !important;
            align-items: flex-start !important;
          }
          .footer-dark-panel {
            flex: none !important;
            width: 100% !important;
            min-height: unset !important;
            background: #0a0a0a !important;
            overflow: hidden !important;
          }
          .footer-union-svg {
            display: none !important;
          }
          .footer-person-image {
            display: none !important;
          }
          .footer-dark-content {
            padding: 36px 24px !important;
          }
          .footer-dark-frame4 {
            align-items: flex-start !important;
            gap: 20px !important;
          }
          .footer-dark-frame11 {
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  );
}