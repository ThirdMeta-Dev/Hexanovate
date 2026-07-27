/* ─────────────────────────────────────────────────────────────────────────────
   ThankYouBanner — pixel-faithful to Figma "Frame1618876272"
   • Outer card: rgba(27,97,219,0.15) glass, h-[426px] on desktop, overflow visible
   • Right card: rgba(0,0,0,0.6) glass, fixed w-406px, overflows outer on desktop
   • Buttons: identical to HexanovateHero CTAButton (label pill + arrow circle)
   • Responsive: stacks to column on ≤1024px
   ───────────────────────────────────────────────────────────────────────────── */
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import svgPaths from "../../imports/svg-xvssryphbj";
import { useCmsSectionContent } from "../context/CmsSectionContext";
import { CtaButton } from "./CtaButton";

/* ── Scroll-linked word reveal ──────────────────────────────────────────────── */
function RevealWord({ children, progress, range }: { children: React.ReactNode; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.08, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

/* ── CTA Button — shared pill (Figma 10904:134 / 10904:141) ─────────────────── */
function CTAButton({ label, variant }: { label: string; variant: "primary" | "secondary" }) {
  return (
    <CtaButton
      label={label}
      variant={variant === "primary" ? "filled" : "outline"}
    />
  );
}

/* ── Numbered step ──────────────────────────────────────────────────────────── */
function Step({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 29,
            height: 30,
            borderRadius: 49,
            border: "1px solid #1b61db",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 500,
              fontSize: 15,
              color: "#ffa600",
              lineHeight: "24px",
            }}
          >
            {num}
          </span>
        </div>
        <span
          style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 500,
            fontSize: 15,
            color: "white",
            lineHeight: "24px",
          }}
        >
          {title}
        </span>
      </div>
      <p
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 300,
          fontSize: 15,
          color: "#747474",
          lineHeight: "22px",
          margin: 0,
          paddingLeft: 45,
        }}
      >
        {desc}
      </p>
    </div>
  );
}

type TyStep = { num: string; title: string; desc: string };

const DEFAULT_STEPS: TyStep[] = [
  { num: "1", title: "Bring The Problem", desc: "Walk us through what is not working and why. The more honest you are, the more useful this call becomes." },
  { num: "2", title: "We Solve It Live", desc: "No follow-up deck required. We think through a solution on the call and share it with you then and there." },
  { num: "3", title: "Your Call. Literally.", desc: "If it feels right, we start. If it does not, you leave with a free growth roadmap. Either way you win." },
];

/* ── Right card: "What are the next steps?" ────────────────────────────────── */
function NextStepsCard({ steps }: { steps: TyStep[] }) {
  return (
    <div
      style={{
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        background: "rgba(0,0,0,0.6)",
        borderRadius: 20,
        border: "1px solid #0d1c35",
        paddingTop: 40,
        paddingBottom: 44,
        paddingLeft: 44,
        paddingRight: 44,
        display: "flex",
        flexDirection: "column",
        gap: 36,
        position: "relative",
        width: 406,
        flexShrink: 0,
        boxSizing: "border-box",
      }}
    >
      {/* Decorative squiggle arrow — positioned like Figma: left:238 top:43 */}
      <div
        style={{
          position: "absolute",
          left: 238,
          top: 43,
          width: 36.63,
          height: 42.76,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "rotate(-30deg)",
          pointerEvents: "none",
        }}
      >
        <svg
          style={{ display: "block", width: "100%", height: "100%" }}
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 20.6904 37.4252"
        >
          <path
            clipRule="evenodd"
            d={svgPaths.pb78800}
            fill="url(#paint0_linear_ty_banner)"
            fillRule="evenodd"
          />
          <defs>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint0_linear_ty_banner"
              x1="-0.6591"
              x2="14.2723"
              y1="0.612256"
              y2="35.7567"
            >
              <stop stopColor="#050911" />
              <stop offset="1" stopColor="#1B61DB" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Amber label */}
      <p
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          fontSize: 15,
          color: "#ffa600",
          margin: 0,
          lineHeight: "normal",
          whiteSpace: "nowrap",
        }}
      >
        What Are The Next Steps?
      </p>

      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: 32, width: "100%" }}>
        {steps.map((s) => (
          <Step key={s.num} num={s.num} title={s.title} desc={s.desc} />
        ))}
      </div>
    </div>
  );
}

/* ── Main export ────────────────────────────────────────────────────────────── */
export function ThankYouBanner() {
  const { content, items: cmsItems } = useCmsSectionContent();
  const headingText = String(content.heading ?? "We Have Got Your Ambition. Now It Is Officially Ours Too.");
  const steps: TyStep[] = cmsItems.length > 0
    ? cmsItems.map((item, i) => ({
        num:   String(item.num   ?? String(i + 1)),
        title: String(item.title ?? ""),
        desc:  String(item.desc  ?? ""),
      }))
    : DEFAULT_STEPS;

  const titleRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: titleRef, offset: ["start 0.9", "start 0.2"] });
  const words = headingText.split(" ");
  const range = (i: number): [number, number] => [Math.min(i * 0.08, 0.88), Math.min(i * 0.08 + 0.12, 1)];

  return (
    <>
      <style>{`
        /* Responsive overrides for ≤1024px */
        @media (max-width: 1024px) {
          .ty-outer-card {
            height: auto !important;
            padding: 32px 24px !important;
          }
          .ty-inner-row {
            flex-direction: column !important;
            gap: 36px !important;
          }
          .ty-right-card {
            width: 100% !important;
            max-width: 100% !important;
          }
          .ty-headline {
            font-size: clamp(26px, 5vw, 40px) !important;
          }
        }
        @media (max-width: 640px) {
          .ty-outer-card {
            padding: 28px 20px !important;
            border-radius: 20px !important;
          }
          .ty-right-card {
            padding: 28px 24px !important;
          }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "100%",
          maxWidth: 1148,
          margin: "0 auto",
          padding: "80px 24px 0",
          boxSizing: "border-box",
        }}
      >
        {/* ── Outer card — single merged background gradient ── */}
        <div
          className="ty-outer-card"
          style={{
            background: [
              "radial-gradient(ellipse 55% 70% at 0% 0%, rgba(27,97,219,0.45) 0%, transparent 70%)",
              "radial-gradient(ellipse 40% 50% at 100% 100%, rgba(255,166,0,0.18) 0%, transparent 65%)",
              "#0d1c35",
            ].join(", "),
            borderRadius: 30,
            border: "1px solid #0d1729",
            height: 426,
            padding: 48,
            position: "relative",
            overflow: "visible",
            boxSizing: "border-box",
          }}
        >
          {/* ── Inner row: left + right ── */}
          <div
            className="ty-inner-row"
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 68,
              alignItems: "flex-start",
              position: "relative",
              zIndex: 1,
              height: "100%",
            }}
          >
            {/* ── LEFT COLUMN ── */}
            <div
              style={{
                flex: "1 0 0",
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                gap: 60,
                height: "100%",
              }}
            >
              {/* Headline */}
              <div>
                <h1
                  ref={titleRef}
                  className="ty-headline"
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: 700,
                    fontSize: 44,
                    lineHeight: 1.22,
                    color: "white",
                    margin: 0,
                    textTransform: "capitalize",
                  }}
                >
                  {words.map((word, i) => (
                    <RevealWord key={i} progress={scrollYProgress} range={range(i)}>
                      <span style={{ fontWeight: i < 5 ? 700 : 400, color: i < 5 ? "white" : "#8e8e8e" }}>
                        {word}
                      </span>
                      {i < words.length - 1 ? " " : ""}
                    </RevealWord>
                  ))}
                </h1>
              </div>

              {/* Buttons + tagline */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {/* CTA buttons — same style as home page */}
                <div style={{ display: "flex", flexWrap: "nowrap", gap: 16, alignItems: "center" }}>
                  <CTAButton label="Let's Talk. Book A Call" variant="primary" />
                  <CTAButton label="Explore Our Solutions" variant="secondary" />
                </div>

                {/* Italic tagline */}
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontStyle: "italic",
                    fontSize: 16,
                    lineHeight: "25px",
                    margin: 0,
                  }}
                >
                  <span style={{ color: "white" }}>Same-week openings are limited.</span>
                  <span style={{ color: "#727272" }}> Claim a slot today.</span>
                </p>
              </div>
            </div>

            {/* ── RIGHT CARD — overflows outer card intentionally ── */}
            <div className="ty-right-card">
              <NextStepsCard steps={steps} />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}