import { useState, useEffect } from "react";
import { ALL_LOGO_SOURCES, isConsumerLogoSource } from "./BrandLogos";

const CSS = `
@keyframes marquee-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes marquee-right {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}
`;

const ROW1 = ALL_LOGO_SOURCES.filter((_, index) => index % 2 === 0);
const ROW2 = ALL_LOGO_SOURCES.filter((_, index) => index % 2 === 1);

function MarqueeRow({
  logos,
  dir,
  speed = 40,
  mobile = false,
}: {
  logos: string[];
  dir: "left" | "right";
  speed?: number;
  mobile?: boolean;
}) {
  const copies = [0, 1];
  const logoW = mobile ? 120 : 200;
  const logoH = mobile ? 56 : 72;
  const gap = mobile ? 16 : 32;

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap,
          width: "max-content",
          animation: `${dir === "left" ? "marquee-left" : "marquee-right"} ${speed}s linear infinite`,
        }}
      >
        {copies.map(copyIdx =>
          logos.map((src, logoIdx) => (
            <div
              key={`${copyIdx}-${logoIdx}`}
              style={{
                width: logoW,
                height: logoH,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                alt=""
                src={src}
                style={{
                  width: logoW,
                  height: logoH,
                  objectFit: "contain",
                  display: "block",
                  transform: isConsumerLogoSource(src)
                    ? "scale(1.65)"
                    : undefined,
                  transformOrigin: "center",
                }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function LogoMarqueeSection() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 1024);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section aria-label="Client logo marquee" style={{
      width: "100%",
      background: "#0a0a0a",
      overflow: "hidden",
      position: "relative",
      padding: isMobile ? "6px 0" : "8px 0",
    }}>
      <style>{CSS}</style>

      <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 20 : 40 }}>
        <MarqueeRow logos={ROW1} dir="left"  speed={ROW1.length * 3.75} mobile={isMobile} />
        <MarqueeRow logos={ROW2} dir="right" speed={ROW2.length * 3.75} mobile={isMobile} />
      </div>

      {/* left fade */}
      <div style={{
        position: "absolute", top: 0, left: 0, bottom: 0, width: isMobile ? 60 : 180,
        background: "linear-gradient(to right, #0a0a0a 40%, transparent)",
        pointerEvents: "none", zIndex: 2,
      }} />
      {/* right fade */}
      <div style={{
        position: "absolute", top: 0, right: 0, bottom: 0, width: isMobile ? 60 : 180,
        background: "linear-gradient(to left, #0a0a0a 40%, transparent)",
        pointerEvents: "none", zIndex: 2,
      }} />
    </section>
  );
}
