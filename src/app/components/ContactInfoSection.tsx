/* ─────────────────────────────────────────────────────────────────────────────
   ContactInfoSection
   "Get in Touch" info panel — matches Figma Frame1618876270 pixel-perfectly.
   Left: Location / Email / Call cards  |  Right: Google Maps embed
   Social icons reuse the same SVG paths & hover styles as FooterSection.
   ───────────────────────────────────────────────────────────────────────────── */
import { useState, useEffect } from "react";
import svgPaths from "../../imports/svg-6g0d8ismyr";   // same file as FooterSection
import { useCmsSectionContent } from "../context/CmsSectionContext";

/* ── helpers ─────────────────────────────────────────────────────────────── */

/* Contact-card icon — the "atom / radar" icon from the Figma frame           */
/* svg-9i7w41wn7f paths rendered inline so we don't need an extra import      */
function ContactIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" style={{ display: "block", flexShrink: 0 }}>
      <g clipPath="url(#ci-clip)">
        {/* two lines (crosshairs) */}
        <path d="M4.69537 5.491L5.70475 8.85479M10.1436 13.2953L13.509 14.3046"
          stroke="#1B61DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.24904 9.75096L13.8083 5.19175"
          stroke="#1B61DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* small top-left circle */}
        <path d="M3.16667 4.35417C3.16667 4.51011 3.19738 4.66453 3.25706 4.8086C3.31674 4.95268 3.40421 5.08359 3.51448 5.19386C3.62475 5.30413 3.75566 5.3916 3.89973 5.45127C4.0438 5.51095 4.19822 5.54167 4.35417 5.54167C4.51011 5.54167 4.66453 5.51095 4.8086 5.45127C4.95268 5.3916 5.08359 5.30413 5.19386 5.19386C5.30413 5.08359 5.3916 4.95268 5.45127 4.8086C5.51095 4.66453 5.54167 4.51011 5.54167 4.35417C5.54167 4.19822 5.51095 4.0438 5.45127 3.89973C5.3916 3.75566 5.30413 3.62475 5.19386 3.51448C5.08359 3.40421 4.95268 3.31674 4.8086 3.25706C4.66453 3.19738 4.51011 3.16667 4.35417 3.16667C4.19822 3.16667 4.0438 3.19738 3.89973 3.25706C3.75566 3.31674 3.62475 3.40421 3.51448 3.51448C3.40421 3.62475 3.31674 3.75566 3.25706 3.89973C3.19738 4.0438 3.16667 4.19822 3.16667 4.35417Z"
          stroke="#1B61DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* small top-right circle */}
        <path d="M13.4583 4.35417C13.4583 4.66911 13.5834 4.97116 13.8061 5.19386C14.0288 5.41655 14.3309 5.54167 14.6458 5.54167C14.9608 5.54167 15.2628 5.41655 15.4855 5.19386C15.7082 4.97116 15.8333 4.66911 15.8333 4.35417C15.8333 4.03922 15.7082 3.73718 15.4855 3.51448C15.2628 3.29178 14.9608 3.16667 14.6458 3.16667C14.3309 3.16667 14.0288 3.29178 13.8061 3.51448C13.5834 3.73718 13.4583 4.03922 13.4583 4.35417Z"
          stroke="#1B61DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* small bottom-right circle */}
        <path d="M13.4583 14.6458C13.4583 14.9608 13.5834 15.2628 13.8061 15.4855C14.0288 15.7082 14.3309 15.8333 14.6458 15.8333C14.9608 15.8333 15.2628 15.7082 15.4855 15.4855C15.7082 15.2628 15.8333 14.9608 15.8333 14.6458C15.8333 14.3309 15.7082 14.0288 15.4855 13.8061C15.2628 13.5834 14.9608 13.4583 14.6458 13.4583C14.3309 13.4583 14.0288 13.5834 13.8061 13.8061C13.5834 14.0288 13.4583 14.3309 13.4583 14.6458Z"
          stroke="#1B61DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* large bottom circle */}
        <path d="M3.16667 12.2708C3.16667 13.2157 3.542 14.1218 4.2101 14.7899C4.8782 15.458 5.78433 15.8333 6.72917 15.8333C7.674 15.8333 8.58014 15.458 9.24823 14.7899C9.91633 14.1218 10.2917 13.2157 10.2917 12.2708C10.2917 11.326 9.91633 10.4199 9.24823 9.75177C8.58014 9.08367 7.674 8.70834 6.72917 8.70834C5.78433 8.70834 4.8782 9.08367 4.2101 9.75177C3.542 10.4199 3.16667 11.326 3.16667 12.2708Z"
          stroke="#1B61DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="ci-clip">
          <rect width="19" height="19" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

/* Icon pill wrapper — pill with blue border */
function IconPill() {
  return (
    <div style={{
      width: 29, height: 30, borderRadius: 49, display: "flex",
      alignItems: "center", justifyContent: "center", flexShrink: 0,
      position: "relative", padding: 6, boxSizing: "border-box",
    }}>
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        border: "1px solid #1b61db", borderRadius: 49, pointerEvents: "none",
      }} />
      <ContactIcon />
    </div>
  );
}

/* Underline rule */
function Rule() {
  return (
    <div style={{ width: 24, height: 1, background: "white", flexShrink: 0 }} />
  );
}

/* Single info card */
function InfoCard({ title, value, href }: { title: string; value: string; href: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start", width: "100%" }}>
      <IconPill />
      <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
        {/* Title + underline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{
            fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: 16,
            color: "white", lineHeight: "24px", whiteSpace: "nowrap",
          }}>
            {title}
          </span>
          <Rule />
        </div>
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          style={{
            fontFamily: "Poppins, sans-serif", fontWeight: 300,
            fontSize: 15, lineHeight: "22px", margin: 0,
            whiteSpace: "pre-line", textDecoration: "none",
            color: hov ? "#ffa600" : "white",
            transition: "color 0.2s ease",
            cursor: "pointer",
          }}
        >
          {value}
        </a>
      </div>
    </div>
  );
}

/* Social icon button — mirrors FooterSection's SocialIcon */
function SocialBtn({
  href, label, filled = false, children,
}: { href: string; label: string; filled?: boolean; children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: 36, height: 36, borderRadius: 8, boxSizing: "border-box",
        background: filled ? (hov ? "#4981e2" : "#1b61db") : (hov ? "rgba(27,97,219,0.18)" : "transparent"),
        border: "1.5px solid #1b61db",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", flexShrink: 0, transition: "background 0.2s ease",
        textDecoration: "none",
      }}
    >
      {children}
    </a>
  );
}

/* ── Main Section ─────────────────────────────────────────────────────────── */
export function ContactInfoSection() {
  const { content } = useCmsSectionContent();
  const address    = String(content.address    ?? "Maithili F6, Orion Complex, Near Amar Heights, Aundh Road, Bopodi, Pune 411020.");
  const email      = String(content.email      ?? "team@hexanovate.com");
  const phone      = String(content.phone      ?? "+91 7820932512");
  const mapEmbedUrl = String(content.mapEmbedUrl ?? "https://maps.google.com/maps?q=Orion+Complex+Bopodi+Aundh+Road+Pune+411020&t=&z=15&ie=UTF8&iwloc=&output=embed");

  const [vw, setVw] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1440);
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const isMobile = vw <= 1024;

  return (
    <section style={{ width: "100%", background: "transparent", padding: 0 }}>
      <div style={{
        maxWidth: 1148, margin: "0 auto",
        padding: isMobile ? "0 24px" : "0 48px",
        boxSizing: "border-box", width: "100%",
      }}>

        {/* ── Row 1: Title left + Social icons right ── */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", width: "100%",
          flexWrap: "wrap", gap: 24,
          marginBottom: 60,
        }}>
          {/* Heading */}
          <h2 style={{
            fontFamily: "Manrope, sans-serif", fontWeight: 700,
            fontSize: "clamp(26px, 4vw, 40px)", lineHeight: 1.44,
            color: "white", margin: 0,
          }}>
            Find Us.{" "}
            <span style={{ fontWeight: 300, color: "#8e8e8e" }}>
              We Are Not Hard To Reach.
            </span>
          </h2>

          {/* Social icons — reuse footer SVG paths */}
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexShrink: 0 }}>
            {/* LinkedIn */}
            <SocialBtn href="https://www.linkedin.com/company/hexanovate/" label="LinkedIn">
              <svg style={{ display: "block", width: 24, height: 24 }} fill="none" viewBox="0 0 24 24">
                <path d={svgPaths.p2cb34000} fill="#1b61db" />
              </svg>
            </SocialBtn>

            {/* Twitter / X */}
            <SocialBtn href="https://x.com/hexanovate" label="Twitter/X" filled>
              <svg style={{ display: "block", width: 24, height: 24 }} fill="none" viewBox="0 0 24 24">
                <path d={svgPaths.p1e3f70f1} fill="white" />
              </svg>
            </SocialBtn>

            {/* Instagram */}
            <SocialBtn href="https://www.instagram.com/hexanovate/" label="Instagram">
              <svg style={{ display: "block", width: 24, height: 24 }} fill="none" viewBox="0 0 24 24">
                <path d={svgPaths.p2f8cbe00} fill="#1b61db" />
              </svg>
            </SocialBtn>

            {/* Behance */}
            <SocialBtn href="https://www.behance.net/urvimandge" label="Behance">
              <svg style={{ display: "block", width: 22, height: 22 }} viewBox="0 0 24 24" fill="#1b61db">
                <path d="M9.03 8.175c0-1.607-1.088-1.607-1.088-1.607H4.5v3.323h3.238c.67 0 1.292-.11 1.292-1.716zM7.974 11.147H4.5V14.9h3.3c.407 0 1.576-.14 1.576-1.894 0-1.503-.9-1.86-1.402-1.86zM16.15 10.6c-1.63 0-1.9 1.63-1.9 1.63h3.618s-.09-1.63-1.718-1.63z" />
                <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM14.3 7.4h4v1.1h-4V7.4zM10.52 13.1c0 3.1-3.22 3-3.22 3H3.5V6h3.8c1.71 0 3.06.97 3.06 2.87 0 1.9-1.62 1.98-1.62 1.98s2.78.1 2.78 2.25zm6.15 1.5h-4.842s.18 1.9 1.9 1.9c1.72 0 1.72-1.1 1.72-1.1h2.12c0 1.9-2.1 2.9-3.84 2.9-1.74 0-4-.9-4-4.1 0-3.2 1.98-4.2 3.96-4.2 2 0 3.9 1.2 3.9 4.3l-.04.3h-.86z" />
              </svg>
            </SocialBtn>
          </div>
        </div>

        {/* ── Row 2: Info cards left + Map right ── */}
        <div style={{
          display: "flex",
          gap: isMobile ? 40 : 48,
          alignItems: "stretch",
          width: "100%",
          flexDirection: isMobile ? "column" : "row",
        }}>
          {/* ── Left: contact cards ── */}
          <div style={{
            display: "flex", flexDirection: "column", gap: 40,
            justifyContent: "center",
            flex: isMobile ? "unset" : "0 0 300px",
            minWidth: isMobile ? "unset" : 260,
          }}>
            <InfoCard
              title="Find Us Here"
              value={address}
              href={`https://maps.google.com/maps?q=${encodeURIComponent(address)}`}
            />
            <InfoCard
              title="Write To Us"
              value={email}
              href={`mailto:${email}`}
            />
            <InfoCard
              title="Call Us Directly"
              value={phone}
              href={`tel:${phone.replace(/\s+/g, "")}`}
            />
          </div>

          {/* ── Right: Google Maps embed ── */}
          <div style={{
            flex: "1 1 400px",
            minWidth: isMobile ? "unset" : 280,
            width: isMobile ? "100%" : undefined,
            height: isMobile ? 280 : 340,
            borderRadius: 20,
            overflow: "hidden", position: "relative",
            backdropFilter: "blur(40px)",
            background: "rgba(210,210,210,0.2)",
          }}>
            <iframe
              title="Hexanovate Location"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, display: "block", filter: "invert(90%) hue-rotate(180deg) brightness(0.85) contrast(1.1)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* subtle overlay to blend with dark theme */}
            <div style={{
              position: "absolute", inset: 0,
              background: "rgba(10,10,10,0.08)",
              pointerEvents: "none", borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.08)",
            }} />
          </div>
        </div>

      </div>
    </section>
  );
}