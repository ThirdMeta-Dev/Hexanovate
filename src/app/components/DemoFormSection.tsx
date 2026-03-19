import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import svgPaths from "../../imports/svg-76w8se6282";
import imgEllipse285 from "@/assets/888794a8a38cb265c4cec55883c54f36a6123b33.png";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import { BRAND_LOGOS } from "./BrandLogos";

/* ─── DATA ────────────────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    text: "The KlearStack SaaS solution has proven to be reliable and robust, and has met our expectations in terms of the performance.",
    avatar: imgEllipse285,
    name: "Mr. Rajesh Kumar",
    role: "CEO, Sunrise FMCG",
  },
  {
    text: "An incredible solution that transformed our document processing workflow. The AI accuracy is outstanding and truly reliable.",
    avatar: imgEllipse285,
    name: "Ms. Jane Doe",
    role: "COO Tech Solutions",
  },
  {
    text: "Implementation was seamless and the support team was exceptional throughout the entire onboarding process.",
    avatar: imgEllipse285,
    name: "Mr. John Smith",
    role: "CTO Enterprise Corp",
  },
  {
    text: "The ROI we have seen since implementing this solution has been remarkable. Highly recommend to any FMCG brand.",
    avatar: imgEllipse285,
    name: "Ms. Sarah Lee",
    role: "VP Operations",
  },
];

const SERVICE_OPTIONS = [
  "FMCG Brand Marketing",
  "B2B Lead Generation",
  "Digital Strategy & Consulting",
  "Social Media Marketing",
  "Content Marketing",
  "SEO & Performance Marketing",
  "Other / Not Sure",
];

/* ─── FORM VALUES ─────────────────────────────────────────────────────────── */
interface FormValues {
  name: string;
  email: string;
  phone: string;
  service: string;
  notes: string;
}

/* ─── BLUE BADGE ARROW ────────────────────────────────────────────────────── */
function BlueBadgeArrow() {
  return (
    <div
      style={{
        background: "#1b61db",
        width: 20,
        height: 20,
        borderRadius: 49,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 6,
        position: "relative",
        flexShrink: 0,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 4,
          top: 4,
          width: 11.314,
          height: 11.314,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ transform: "scaleY(-1) rotate(135deg)", flexShrink: 0 }}>
          <div style={{ overflow: "clip", width: 8, height: 8, position: "relative" }}>
            <div style={{ position: "absolute", inset: "5%" }}>
              <div
                style={{
                  position: "absolute",
                  top: "-19.61%",
                  right: "-19.61%",
                  bottom: "-25.56%",
                  left: "-25.56%",
                }}
              >
                <svg
                  style={{ display: "block", width: "100%", height: "100%" }}
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 10.4525 10.4525"
                >
                  <path
                    d={svgPaths.p1a2ffa00}
                    fill="white"
                    stroke="white"
                    strokeWidth="0.3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─��─ FEATURE BULLET ─────────────────────────────────────────────────────── */
function FeatureBullet({ bold, light }: { bold: string; light: string }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        alignItems: "center",
        flexShrink: 0,
      }}
    >
      <BlueBadgeArrow />
      <p
        className="demo-bullet-text"
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: 16,
          lineHeight: 0,
          margin: 0,
        }}
      >
        <span style={{ fontWeight: 600, lineHeight: "1.618", color: "white" }}>
          {bold}
        </span>
        <span style={{ fontWeight: 400, lineHeight: "1.618", color: "#727272" }}>
          {" "}{light}
        </span>
      </p>
    </div>
  );
}

/* ─── TESTIMONIAL CAROUSEL ────────────────────────────────────────────────── */
function TestimonialCarousel({
  active,
  onDotClick,
}: {
  active: number;
  onDotClick: (i: number) => void;
}) {
  const t = TESTIMONIALS[active];

  return (
    <div
      style={{
        position: "relative",
        border: "1px solid #1b1b1b",
        borderRadius: 24,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        paddingTop: 36,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        boxSizing: "border-box",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      {/* Quote SVG */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 48,
          height: 26,
          pointerEvents: "none",
        }}
      >
        <svg fill="none" viewBox="0 0 48 26" width="48" height="26" style={{ display: "block" }}>
          <defs>
            <linearGradient id="quoteGrad2" x1="23.9592" x2="23.9592" y1="0.00178794" y2="25.5667" gradientUnits="userSpaceOnUse">
              <stop stopColor="#191919" />
              <stop offset="1" stopColor="#FFC354" />
            </linearGradient>
          </defs>
          <path d={svgPaths.p26e2d200} fill="url(#quoteGrad2)" />
        </svg>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}
        >
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 14, color: "#727272", lineHeight: "22px", width: "100%", margin: 0 }}>
            {t.text}
          </p>
          <div style={{ display: "flex", gap: 12, alignItems: "center", width: "100%" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
              <img src={t.avatar} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ width: 3, height: 24, background: "#ffa600", flexShrink: 0 }} />
            <div style={{ minWidth: 0 }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 0, lineHeight: 0, margin: 0 }}>
                <span style={{ fontWeight: 500, fontSize: 15, lineHeight: "20px", color: "white" }}>{t.name}{"  "}</span>
                <span style={{ fontWeight: 500, fontSize: 10, lineHeight: "20px", color: "#727272" }}>|</span>
                <span style={{ fontWeight: 300, fontSize: 14, lineHeight: "20px", color: "#727272" }}>{"  "}{t.role}</span>
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, alignSelf: "center", background: "#131313", borderRadius: 3, padding: "0 6px", height: 6 }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            onClick={() => onDotClick(i)}
            style={{
              width: i === active ? 6 : 4,
              height: i === active ? 6 : 4,
              borderRadius: "50%",
              background: i === active ? "#ffa600" : "#414141",
              cursor: "pointer",
              flexShrink: 0,
              transition: "all 0.2s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── CONTACT FORM ────────────────────────────────────────────────────────── */
function ContactForm({ onSuccess }: { onSuccess: () => void }) {
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ mode: "onBlur" });

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    try {
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-c15aa933/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(data),
        }
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed.");
      navigate("/thank-you");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      console.error("Contact form error:", msg);
      setServerError(msg);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      style={{ display: "flex", flexDirection: "column", gap: 18, width: "100%" }}
    >
      {/* Name */}
      <div className="demo-field">
        <label className="demo-label">Full Name <span style={{ color: "#ef4444" }}>*</span></label>
        <input
          className={`demo-input${errors.name ? " demo-input-error" : ""}`}
          placeholder="e.g. Rahul Sharma"
          {...register("name", {
            required: "Full name is required.",
            minLength: { value: 2, message: "Name must be at least 2 characters." },
          })}
        />
        {errors.name && <span className="demo-error">{errors.name.message}</span>}
      </div>

      {/* Email */}
      <div className="demo-field">
        <label className="demo-label">Email Address <span style={{ color: "#ef4444" }}>*</span></label>
        <input
          className={`demo-input${errors.email ? " demo-input-error" : ""}`}
          type="email"
          placeholder="e.g. rahul@company.com"
          {...register("email", {
            required: "Email address is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address.",
            },
          })}
        />
        {errors.email && <span className="demo-error">{errors.email.message}</span>}
      </div>

      {/* Phone */}
      <div className="demo-field">
        <label className="demo-label">Phone Number <span style={{ color: "#ef4444" }}>*</span></label>
        <input
          className={`demo-input${errors.phone ? " demo-input-error" : ""}`}
          type="tel"
          placeholder="e.g. +91 98765 43210"
          {...register("phone", {
            required: "Phone number is required.",
            pattern: {
              value: /^[\+]?[\d\s\-\(\)]{7,15}$/,
              message: "Please enter a valid phone number.",
            },
          })}
        />
        {errors.phone && <span className="demo-error">{errors.phone.message}</span>}
      </div>

      {/* Service */}
      <div className="demo-field">
        <label className="demo-label">What Service Are You Looking For? <span style={{ color: "#ef4444" }}>*</span></label>
        <select
          className={`demo-input demo-select${errors.service ? " demo-input-error" : ""}`}
          {...register("service", { required: "Please select a service." })}
          defaultValue=""
        >
          <option value="" disabled style={{ color: "#505050", background: "#1a1a1a" }}>
            Select a service…
          </option>
          {SERVICE_OPTIONS.map((s) => (
            <option key={s} value={s} style={{ background: "#1a1a1a", color: "white" }}>
              {s}
            </option>
          ))}
        </select>
        {errors.service && <span className="demo-error">{errors.service.message}</span>}
      </div>

      {/* Notes */}
      <div className="demo-field">
        <label className="demo-label">Additional Notes <span style={{ color: "#555" }}>(optional)</span></label>
        <textarea
          className="demo-input demo-textarea"
          placeholder="Tell us more about your goals or requirements…"
          rows={3}
          {...register("notes", {
            maxLength: { value: 500, message: "Notes cannot exceed 500 characters." },
          })}
        />
        {errors.notes && <span className="demo-error">{errors.notes.message}</span>}
      </div>

      {/* Server error */}
      {serverError && (
        <div
          style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.35)",
            borderRadius: 8,
            padding: "10px 14px",
            fontFamily: "Poppins, sans-serif",
            fontSize: 13,
            color: "#ef4444",
          }}
        >
          {serverError}
        </div>
      )}

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={!isSubmitting ? { scale: 1.02, background: "#e69400" } : {}}
        whileTap={!isSubmitting ? { scale: 0.97 } : {}}
        transition={{ duration: 0.18 }}
        style={{
          background: isSubmitting ? "#9a6800" : "#ffa600",
          border: "none",
          borderRadius: 30,
          padding: "14px 32px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          fontSize: 15,
          color: "white",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          transition: "background 0.18s",
          marginTop: 4,
        }}
      >
        {isSubmitting ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ animation: "demoSpin 0.8s linear infinite", flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Submitting…
          </>
        ) : (
          "Send Message"
        )}
      </motion.button>

      {/* Privacy */}
      <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#4a4a4a", textAlign: "center", margin: 0, lineHeight: "16px" }}>
        By submitting, you agree to our{" "}
        <span style={{ color: "#727272", textDecoration: "underline", cursor: "pointer" }}>Privacy Policy</span>.
        {" "}We'll never share your information.
      </p>
    </form>
  );
}

/* ─── THANK YOU SCREEN ────────────────────────────────────────────────────── */
function ThankYouScreen({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        textAlign: "center",
        padding: "32px 0",
        width: "100%",
      }}
    >
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #1b61db, #0e3a8a)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: "0 0 40px rgba(27,97,219,0.4)",
        }}
      >
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <motion.path
            d="M7 17L13.5 24L27 10"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          />
        </svg>
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(22px, 4vw, 28px)",
            color: "white",
            margin: 0,
          }}
        >
          Thank You!
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 300,
            fontSize: 15,
            color: "#8e8e8e",
            margin: 0,
            lineHeight: "24px",
            maxWidth: 320,
          }}
        >
          Your message has been received. Our team will get back to you within{" "}
          <span style={{ color: "#ffa600", fontWeight: 500 }}>24 hours</span>.
        </motion.p>
      </div>

      {/* Divider */}
      <div style={{ width: "60%", height: 1, background: "rgba(255,255,255,0.08)" }} />

      <motion.button
        onClick={onReset}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ color: "#ffa600" }}
        style={{
          background: "transparent",
          border: "none",
          fontFamily: "Poppins, sans-serif",
          fontSize: 13,
          color: "#555",
          cursor: "pointer",
          padding: 0,
          textDecoration: "underline",
          transition: "color 0.2s",
        }}
      >
        Submit another enquiry
      </motion.button>
    </motion.div>
  );
}

/* ─── MAIN SECTION ────────────────────────────────────────────────────────── */
export function DemoFormSection({ transparent = false }: { transparent?: boolean }) {
  const [activeTestimonial, setActiveTestimonial] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <section
      style={{
        width: "100%",
        background: transparent ? "transparent" : "#0a0a0a",
        padding: 0,
        overflow: "hidden",
      }}
    >
      <div
        className="demo-section-container"
        style={{
          maxWidth: 1148,
          margin: "0 auto",
          position: "relative",
          width: "100%",
          boxSizing: "border-box",
          padding: "0 24px",
        }}
      >
        <motion.div
          className="demo-card-wrapper"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 1048,
            margin: "0 auto",
          }}
        >
          {/* Card background gradient */}
          <div
            className="demo-card-bg"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 30,
              backgroundImage:
                "linear-gradient(-56.2452deg, rgb(10,10,10) 19.097%, rgb(34,34,34) 99.964%)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          {/* Blue overlay top-left */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 300,
              height: 120,
              borderRadius: "30px 0 0 0",
              background:
                "linear-gradient(135deg, rgba(27,97,219,0.18) 0%, transparent 100%)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          {/* ── Content Row ── */}
          <div
            className="demo-content-row"
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "row",
              alignItems: "stretch",
              paddingLeft: 57,
              gap: 39,
            }}
          >
            <style>{`
              /* Spin animation for submit button */
              @keyframes demoSpin {
                to { transform: rotate(360deg); }
              }

              /* Form input base styles */
              .demo-input {
                background: rgba(255,255,255,0.05);
                border: 1px solid rgba(255,255,255,0.12);
                border-radius: 8px;
                padding: 11px 14px;
                font-family: Poppins, sans-serif;
                font-size: 14px;
                font-weight: 400;
                color: white;
                width: 100%;
                box-sizing: border-box;
                outline: none;
                transition: border-color 0.2s, background 0.2s;
                appearance: none;
                -webkit-appearance: none;
              }
              .demo-input::placeholder { color: #4a4a4a; }
              .demo-input:focus {
                border-color: #1b61db;
                background: rgba(27,97,219,0.07);
              }
              .demo-input-error { border-color: rgba(239,68,68,0.7) !important; }
              .demo-select {
                cursor: pointer;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%23666' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
                background-repeat: no-repeat;
                background-position: right 14px center;
                padding-right: 36px;
              }
              .demo-textarea { resize: vertical; min-height: 80px; line-height: 1.6; }
              .demo-label {
                display: block;
                font-family: Poppins, sans-serif;
                font-size: 12px;
                font-weight: 500;
                color: #8e8e8e;
                margin-bottom: 6px;
                letter-spacing: 0.3px;
              }
              .demo-field { display: flex; flex-direction: column; }
              .demo-error {
                font-family: Poppins, sans-serif;
                font-size: 11px;
                font-weight: 400;
                color: #ef4444;
                margin-top: 5px;
              }

              /* Logo scroll */
              .demo-client-scroll-track {
                animation: demoClientScroll 18s linear infinite;
              }
              .demo-client-scroll-track:hover {
                animation-play-state: paused;
              }
              @keyframes demoClientScroll {
                from { transform: translateX(0); }
                to   { transform: translateX(calc(-10 * (148px + 10px))); }
              }

              /* ── RESPONSIVE ─────────────────────────────────── */
              @media (max-width: 1023px) {
                .demo-section-container { padding: 0 20px !important; }
                .demo-content-row {
                  flex-direction: column !important;
                  padding-left: 0 !important;
                  gap: 0 !important;
                }
                .demo-left-col {
                  width: 100% !important;
                  padding: 32px 24px 0 24px !important;
                }
                .demo-right-form {
                  width: 100% !important;
                  margin-top: 32px !important;
                  border-radius: 0 0 24px 24px !important;
                  padding: 32px 24px !important;
                  box-sizing: border-box !important;
                }
                .demo-title {
                  font-size: clamp(28px, 5vw, 40px) !important;
                  width: 100% !important;
                }
                .demo-subtitle { font-size: 16px !important; }
                .demo-bullets-col { width: 100% !important; }
                .demo-client-list {
                  margin-left: 0 !important;
                  width: 100% !important;
                  padding: 0 0 24px 0 !important;
                }
                .demo-bullet-text { white-space: normal !important; }
              }

              @media (max-width: 767px) {
                .demo-section-container { padding: 0 12px !important; }
                .demo-left-col { padding: 24px 16px 0 16px !important; }
                .demo-right-form { padding: 24px 16px !important; }
                .demo-title { font-size: clamp(22px, 7vw, 32px) !important; }
                .demo-subtitle { font-size: 14px !important; }
                .demo-input { font-size: 13px !important; padding: 10px 12px !important; }
                .demo-label { font-size: 11px !important; }
              }
            `}</style>

            {/* ══════════════════════════════════════════
             * LEFT COLUMN
             * ══════════════════════════════════════════ */}
            <div
              className="demo-left-col"
              style={{
                width: 408,
                flexShrink: 0,
                paddingTop: 42,
                paddingBottom: 0,
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              {/* ── Tag + Title + Subtitle ── */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
                {/* Badge + divider */}
                <div style={{ display: "flex", gap: 12, alignItems: "center", width: "100%", flexShrink: 0 }}>
                  <div
                    style={{
                      background: "#111",
                      borderRadius: 40,
                      padding: "6px 20px",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      aria-hidden="true"
                      style={{ position: "absolute", inset: 0, border: "1px solid #414141", borderRadius: 40, pointerEvents: "none" }}
                    />
                    <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 13, color: "#ffa600", lineHeight: "normal", margin: 0, whiteSpace: "nowrap", position: "relative" }}>
                      Get in Touch
                    </p>
                  </div>
                  {/* Divider */}
                  <div style={{ flex: "1 0 0", height: 1, background: "#414141", minWidth: 0 }} />
                </div>

                {/* Title */}
                <p
                  className="demo-title"
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: 48,
                    lineHeight: 0,
                    textTransform: "capitalize",
                    margin: 0,
                    width: 408,
                    color: "white",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontWeight: 300, lineHeight: 1.32, color: "white" }}>Unlock</span>
                  <span style={{ fontWeight: 200, lineHeight: 1.32, color: "white" }}>{" "}</span>
                  <span style={{ fontWeight: 700, lineHeight: 1.32, color: "white" }}>your brand's</span>
                  <span style={{ fontWeight: 200, lineHeight: 1.32, color: "white" }}>{" "}</span>
                  <span style={{ fontWeight: 300, lineHeight: 1.32, color: "white" }}>true growth</span>
                </p>

                {/* Subtitle */}
                <div style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
                  <p
                    className="demo-subtitle"
                    style={{
                      flex: "1 0 0",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: 18,
                      lineHeight: 0,
                      color: "#7b7b7b",
                      margin: 0,
                    }}
                  >
                    <span style={{ fontWeight: 400, lineHeight: "1.608" }}>Let's discuss — only{" "}</span>
                    <span style={{ fontWeight: 600, lineHeight: "1.608", color: "#7b7b7b" }}>30 Seconds</span>
                    <span style={{ fontWeight: 400, lineHeight: "1.608" }}>{" "}to fill this form</span>
                  </p>
                </div>
              </div>

              {/* ── Bullets + Testimonial ── */}
              <div
                className="demo-bullets-col"
                style={{ display: "flex", flexDirection: "column", gap: 28, width: 408, flexShrink: 0 }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
                  <FeatureBullet bold="Expert Strategy" light="tailored to your market" />
                  <FeatureBullet bold="Proven Results" light="across 100+ brand campaigns" />
                  <FeatureBullet bold="Fast Onboarding" light="get started in days, not weeks" />
                </div>
                <TestimonialCarousel
                  active={activeTestimonial}
                  onDotClick={setActiveTestimonial}
                />
              </div>

              {/* ── Logo carousel strip ── */}
              <div
                className="demo-client-list"
                style={{
                  marginTop: "auto",
                  marginLeft: -57,
                  width: 465,
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  flexShrink: 0,
                  paddingBottom: 32,
                }}
              >
                <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 15, color: "#ffa600", lineHeight: "1.488", textAlign: "center", width: "100%", margin: 0 }}>
                  Trusted by leading brands
                </p>
                <div
                  style={{
                    width: "100%",
                    overflow: "hidden",
                    position: "relative",
                    flexShrink: 0,
                    maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
                  }}
                >
                  <div
                    className="demo-client-scroll-track"
                    style={{ display: "flex", gap: 10, width: "max-content" }}
                  >
                    {/* 10 real logos + 10 duplicates for seamless infinite scroll */}
                    {[...BRAND_LOGOS, ...BRAND_LOGOS].map((Logo, i) => (
                      <Logo key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════════
             * RIGHT FORM CARD
             * ══════════════════════════════════════════ */}
            <div
              className="demo-right-form"
              style={{
                flex: "1 1 0",
                minWidth: 0,
                backdropFilter: "blur(25px)",
                WebkitBackdropFilter: "blur(25px)",
                background: "rgba(0,0,0,0.85)",
                padding: 40,
                borderRadius: 24,
                marginTop: 40,
                marginBottom: 40,
                display: "flex",
                flexDirection: "column",
                gap: 24,
                position: "relative",
                boxSizing: "border-box",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Form header */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <h2
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(20px, 3vw, 26px)",
                    color: "white",
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  Let's Start a Conversation
                </h2>
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 300,
                    fontSize: 13,
                    color: "#6a6a6a",
                    margin: 0,
                    lineHeight: "20px",
                  }}
                >
                  Fill in your details and we'll reach out within 24 hours.
                </p>
              </div>

              {/* Thin blue accent line */}
              <div style={{ height: 1, background: "linear-gradient(to right, #1b61db, transparent)", width: "60%" }} />

              {/* Form or Thank You */}
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div key="thanks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <ThankYouScreen onReset={() => setIsSuccess(false)} />
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <ContactForm onSuccess={() => setIsSuccess(true)} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Book now notice */}
              {!isSuccess && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    padding: "10px 16px",
                    background: "rgba(255,166,0,0.07)",
                    borderRadius: 8,
                    border: "1px solid rgba(255,166,0,0.2)",
                  }}
                >
                  <div
                    style={{
                      background: "white",
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1 9L9 1" stroke="#FFA600" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M9 1H3M9 1V7" stroke="#FFA600" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: 12,
                      color: "#c9c9c9",
                      margin: 0,
                      lineHeight: "1.5",
                    }}
                  >
                    <span style={{ fontWeight: 300 }}>Only{" "}</span>
                    <span style={{ fontWeight: 600, color: "#ffa600" }}>8 Demo Slots</span>
                    <span style={{ fontWeight: 300 }}>{" "}left this week!</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}