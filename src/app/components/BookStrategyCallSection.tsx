import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import svgPaths from "../../imports/svg-76w8se6282";
import imgAvatar from "@/assets/testimonial-avatar.jpg";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import { BRAND_LOGOS } from "./BrandLogos";

/* ─── FORM VALUES ─────────────────────────────────────────────────────────── */
interface FormValues {
  fullName: string;
  workEmail: string;
  phone: string;
  company: string;
  designation: string;
  domain: string[];
  message: string;
}

const DOMAIN_OPTIONS = [
  { label: "ThirdMeta B2B",     value: "thirdinmeta_b2b" },
  { label: "NativeUnit FMCG",   value: "nativeunit_fmcg" },
  { label: "EduHexa Education", value: "eduhexa_education" },
  { label: "Other",             value: "other" },
];

/* ─── BLUE BADGE ARROW ────────────────────────────────────────────────────── */
function BlueBadgeArrow() {
  return (
    <div style={{ background: "#1b61db", width: 20, height: 20, borderRadius: 49, display: "flex", alignItems: "center", justifyContent: "center", padding: 6, position: "relative", flexShrink: 0, boxSizing: "border-box" }}>
      <div style={{ position: "absolute", left: 4, top: 4, width: 11.314, height: 11.314, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: "scaleY(-1) rotate(135deg)", flexShrink: 0 }}>
          <div style={{ overflow: "clip", width: 8, height: 8, position: "relative" }}>
            <div style={{ position: "absolute", inset: "5%" }}>
              <div style={{ position: "absolute", top: "-19.61%", right: "-19.61%", bottom: "-25.56%", left: "-25.56%" }}>
                <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 10.4525 10.4525">
                  <path d={svgPaths.p1a2ffa00} fill="white" stroke="white" strokeWidth="0.3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── FEATURE BULLET ──────────────────────────────────────────────────────── */
function FeatureBullet({ bold, light }: { bold: string; light: string }) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start", flexShrink: 0 }}>
      <BlueBadgeArrow />
      <p className="bsc-bullet-text" style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, lineHeight: 0, margin: 0 }}>
        <span style={{ fontWeight: 600, lineHeight: "1.618", color: "white" }}>{bold}</span>
        <span style={{ fontWeight: 400, lineHeight: "1.618", color: "#727272" }}>{" "}{light}</span>
      </p>
    </div>
  );
}

/* ─── TESTIMONIAL CARD ────────────────────────────────────────────────────── */
function TestimonialCard() {
  return (
    <div style={{ position: "relative", border: "1px solid #1b1b1b", borderRadius: 24, width: "100%", display: "flex", flexDirection: "column", gap: 16, padding: "32px 20px 20px", boxSizing: "border-box" }}>
      {/* Quote mark */}
      <div style={{ position: "absolute", top: 0, left: 0, width: 48, height: 26, pointerEvents: "none" }}>
        <svg fill="none" viewBox="0 0 48 26" width="48" height="26" style={{ display: "block" }}>
          <defs>
            <linearGradient id="bscQuoteGrad" x1="23.9592" x2="23.9592" y1="0.00178794" y2="25.5667" gradientUnits="userSpaceOnUse">
              <stop stopColor="#191919" />
              <stop offset="1" stopColor="#FFC354" />
            </linearGradient>
          </defs>
          <path d={svgPaths.p26e2d200} fill="url(#bscQuoteGrad)" />
        </svg>
      </div>

      <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 14, color: "#727272", lineHeight: "22px", margin: 0 }}>
        "Hexanovate scaled our monthly inbound leads from 10 to 55 and MQLs by 3x."
      </p>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", flexShrink: 0, background: "#1b61db", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 16, color: "white" }}>A</span>
        </div>
        <div style={{ width: 3, height: 24, background: "#ffa600", flexShrink: 0 }} />
        <div style={{ minWidth: 0 }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 0, lineHeight: 0, margin: 0 }}>
            <span style={{ fontWeight: 500, fontSize: 15, lineHeight: "20px", color: "white" }}>Ashutosh Saitwal{"  "}</span>
            <span style={{ fontWeight: 500, fontSize: 10, lineHeight: "20px", color: "#727272" }}>|</span>
            <span style={{ fontWeight: 300, fontSize: 14, lineHeight: "20px", color: "#727272" }}>{"  "}CEO & Founder, KlearStack Inc.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── DRUSHTI AVATAR BUBBLE ───────────────────────────────────────────────── */
function DrushtiAvatarBubble() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 4 }}>
      {/* Avatar */}
      <div style={{ width: 44, height: 44, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2px solid #1b61db" }}>
        <img src={imgAvatar} alt="Drushti" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      {/* Bubble */}
      <div style={{ position: "relative", background: "rgba(27,97,219,0.1)", border: "1px solid rgba(27,97,219,0.25)", borderRadius: "0 16px 16px 16px", padding: "12px 16px", flex: 1 }}>
        <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 13, color: "#c8d8f8", lineHeight: "20px", margin: 0 }}>
          <span style={{ fontWeight: 600, color: "white" }}>Hi, I am Drushti.</span> Before we meet, a few quick questions so we show up fully prepared for your business.
        </p>
        {/* Tail */}
        <div style={{ position: "absolute", left: -8, top: 12, width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderRight: "8px solid rgba(27,97,219,0.25)" }} />
      </div>
    </div>
  );
}

/* ─── CHECKBOX FIELD ──────────────────────────────────────────────────────── */
function CheckboxOption({ label, value, checked, onChange }: { label: string; value: string; checked: boolean; onChange: (v: string) => void }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none" }}>
      <div
        onClick={() => onChange(value)}
        style={{
          width: 18, height: 18, borderRadius: 4, flexShrink: 0,
          border: checked ? "none" : "1.5px solid rgba(255,255,255,0.2)",
          background: checked ? "#1b61db" : "rgba(255,255,255,0.04)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.18s ease", cursor: "pointer",
        }}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 400, color: checked ? "white" : "#8e8e8e", transition: "color 0.18s" }}>
        {label}
      </span>
    </label>
  );
}

/* ─── STRATEGY CALL FORM ──────────────────────────────────────────────────── */
function StrategyCallForm({ onSuccess }: { onSuccess: () => void }) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<FormValues>({ mode: "onBlur", defaultValues: { domain: [] } });

  const toggleDomain = (value: string) => {
    const next = selectedDomains.includes(value)
      ? selectedDomains.filter((d) => d !== value)
      : [...selectedDomains, value];
    setSelectedDomains(next);
    setValue("domain", next, { shouldValidate: true });
  };

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    try {
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-c15aa933/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${publicAnonKey}` },
          body: JSON.stringify({
            name: data.fullName,
            email: data.workEmail,
            phone: data.phone,
            company: data.company,
            reason: `${data.designation} — ${data.domain.join(", ")}`,
            message: data.message,
            source: "strategy-call",
          }),
        }
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed.");
      onSuccess();
      navigate("/thank-you");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setServerError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
      {/* Full Name + Work Email — 50/50 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="bsc-name-email-row">
        <div className="bsc-field">
          <label className="bsc-label">Full Name <span style={{ color: "#ef4444" }}>*</span></label>
          <input className={`bsc-input${errors.fullName ? " bsc-input-error" : ""}`} placeholder="Your full name"
            {...register("fullName", {
              required: "Full name is required.",
              minLength: { value: 2, message: "Name must be at least 2 characters." },
              maxLength: { value: 60, message: "Name cannot exceed 60 characters." },
              pattern: { value: /^[A-Za-z][A-Za-z\s.'-]*$/, message: "Name can only contain letters." },
            })} />
          {errors.fullName && <span className="bsc-error">{errors.fullName.message}</span>}
        </div>
        <div className="bsc-field">
          <label className="bsc-label">Work Email <span style={{ color: "#ef4444" }}>*</span></label>
          <input className={`bsc-input${errors.workEmail ? " bsc-input-error" : ""}`} type="email" placeholder="Work email address"
            {...register("workEmail", {
              required: "Work email is required.",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email address." },
            })} />
          {errors.workEmail && <span className="bsc-error">{errors.workEmail.message}</span>}
        </div>
      </div>

      {/* Phone + Company — 50/50 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="bsc-name-email-row">
        <div className="bsc-field">
          <label className="bsc-label">Phone <span style={{ color: "#ef4444" }}>*</span></label>
          <input className={`bsc-input${errors.phone ? " bsc-input-error" : ""}`} type="tel" placeholder="Best number to reach you"
            {...register("phone", {
              required: "Phone number is required.",
              pattern: { value: /^[\+]?[\d\s\-\(\)]{7,15}$/, message: "Please enter a valid phone number." },
            })} />
          {errors.phone && <span className="bsc-error">{errors.phone.message}</span>}
        </div>
        <div className="bsc-field">
          <label className="bsc-label">Company <span style={{ color: "#ef4444" }}>*</span></label>
          <input className={`bsc-input${errors.company ? " bsc-input-error" : ""}`} placeholder="Your company name"
            {...register("company", {
            required: "Company name is required.",
            minLength: { value: 2, message: "Must be at least 2 characters." },
            maxLength: { value: 120, message: "Cannot exceed 120 characters." },
          })} />
          {errors.company && <span className="bsc-error">{errors.company.message}</span>}
        </div>
      </div>

      {/* Designation */}
      <div className="bsc-field">
        <label className="bsc-label">Designation <span style={{ color: "#ef4444" }}>*</span></label>
        <input className={`bsc-input${errors.designation ? " bsc-input-error" : ""}`} placeholder="Your role"
          {...register("designation", {
            required: "Designation is required.",
            minLength: { value: 2, message: "Must be at least 2 characters." },
            maxLength: { value: 80, message: "Cannot exceed 80 characters." },
          })} />
        {errors.designation && <span className="bsc-error">{errors.designation.message}</span>}
      </div>

      {/* Domain (checkboxes) */}
      <div className="bsc-field">
        <label className="bsc-label">Domain <span style={{ color: "#727272", fontWeight: 400 }}>(select all that apply)</span></label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px", marginTop: 4 }}>
          {DOMAIN_OPTIONS.map((opt) => (
            <CheckboxOption
              key={opt.value}
              label={opt.label}
              value={opt.value}
              checked={selectedDomains.includes(opt.value)}
              onChange={toggleDomain}
            />
          ))}
        </div>
      </div>

      {/* Message */}
      <div className="bsc-field">
        <label className="bsc-label">Message <span style={{ color: "#ef4444" }}>*</span></label>
        <textarea className="bsc-input bsc-textarea" placeholder="What are you trying to fix or grow? Be as specific as you like." rows={3}
          {...register("message", {
            required: "Message is required.",
            minLength: { value: 10, message: "Please add more detail (min 10 characters)." },
            maxLength: { value: 1000, message: "Message cannot exceed 1000 characters." },
          })} />
        {errors.message && <span className="bsc-error">{errors.message.message}</span>}
      </div>

      {/* Server error */}
      {serverError && (
        <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.35)", borderRadius: 8, padding: "10px 14px", fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#ef4444" }}>
          {serverError}
        </div>
      )}

      {/* CTA */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={!isSubmitting ? { scale: 1.02, background: "#e69400" } : {}}
        whileTap={!isSubmitting ? { scale: 0.97 } : {}}
        transition={{ duration: 0.18 }}
        style={{
          background: isSubmitting ? "#9a6800" : "#ffa600",
          border: "none", borderRadius: 30, padding: "15px 32px",
          fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 15,
          color: "white", cursor: isSubmitting ? "not-allowed" : "pointer",
          width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
          gap: 10, marginTop: 4,
        }}
      >
        {isSubmitting ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ animation: "bscSpin 0.8s linear infinite", flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Submitting…
          </>
        ) : (
          "Book My Free Strategy Call →"
        )}
      </motion.button>

      {/* Urgency */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", flexShrink: 0, boxShadow: "0 0 6px rgba(239,68,68,0.7)", animation: "bscPulse 1.6s ease-in-out infinite" }} />
        <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, color: "#ef4444", fontWeight: 500, margin: 0, textAlign: "center" }}>
          Only 8 demo slots left this week. Claim yours now.
        </p>
      </div>

      {/* Safety */}
      <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#4a4a4a", textAlign: "center", margin: 0, lineHeight: "16px" }}>
        🔒 Your data is completely safe with us. Always.
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
      style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, textAlign: "center", padding: "32px 0", width: "100%" }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #1b61db, #0e3a8a)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 40px rgba(27,97,219,0.4)" }}
      >
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <motion.path d="M7 17L13.5 24L27 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }} />
        </svg>
      </motion.div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <motion.h3 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }} style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "clamp(22px, 4vw, 28px)", color: "white", margin: 0 }}>
          You're On The List!
        </motion.h3>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }} style={{ fontFamily: "Poppins, sans-serif", fontWeight: 300, fontSize: 15, color: "#8e8e8e", margin: 0, lineHeight: "24px", maxWidth: 320 }}>
          We'll reach out within <span style={{ color: "#ffa600", fontWeight: 500 }}>24 hours</span> to confirm your strategy call slot.
        </motion.p>
      </div>
      <div style={{ width: "60%", height: 1, background: "rgba(255,255,255,0.08)" }} />
      <motion.button
        onClick={onReset} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        whileHover={{ color: "#ffa600" }}
        style={{ background: "transparent", border: "none", fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#555", cursor: "pointer", padding: 0, textDecoration: "underline", transition: "color 0.2s" }}
      >
        Submit another enquiry
      </motion.button>
    </motion.div>
  );
}

/* ─── MAIN SECTION ────────────────────────────────────────────────────────── */
export function BookStrategyCallSection() {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <section style={{ width: "100%", background: "#0a0a0a", padding: 0, overflow: "hidden" }}>
      <div className="bsc-container" style={{ maxWidth: 1148, margin: "0 auto", position: "relative", width: "100%", boxSizing: "border-box", padding: "0 24px" }}>
        <motion.div
          className="bsc-card-wrapper"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "relative", width: "100%", maxWidth: 1048, margin: "0 auto" }}
        >
          {/* Card background */}
          <div className="bsc-card-bg" style={{ position: "absolute", inset: 0, borderRadius: 30, backgroundImage: "linear-gradient(-56.2452deg, rgb(10,10,10) 19.097%, rgb(34,34,34) 99.964%)", zIndex: 0, pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: 300, height: 120, borderRadius: "30px 0 0 0", background: "linear-gradient(135deg, rgba(27,97,219,0.18) 0%, transparent 100%)", zIndex: 0, pointerEvents: "none" }} />

          {/* Content Row */}
          <div className="bsc-content-row" style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "row", alignItems: "stretch", paddingLeft: 57, gap: 39 }}>

            <style>{`
              @keyframes bscSpin { to { transform: rotate(360deg); } }
              @keyframes bscPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

              .bsc-input {
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
              .bsc-input::placeholder { color: #4a4a4a; }
              .bsc-input:focus { border-color: #1b61db; background: rgba(27,97,219,0.07); }
              .bsc-input-error { border-color: rgba(239,68,68,0.7) !important; }
              .bsc-textarea { resize: vertical; min-height: 80px; line-height: 1.6; }
              .bsc-label { display: block; font-family: Poppins, sans-serif; font-size: 12px; font-weight: 500; color: #8e8e8e; margin-bottom: 6px; letter-spacing: 0.3px; }
              .bsc-field { display: flex; flex-direction: column; position: relative; }
              .bsc-error { font-family: Poppins, sans-serif; font-size: 11px; font-weight: 400; color: #ef4444; position: absolute; top: calc(100% + 3px); left: 0; line-height: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; pointer-events: none; }
              .bsc-client-scroll-track { animation: bscClientScroll 18s linear infinite; }
              .bsc-client-scroll-track:hover { animation-play-state: paused; }
              @keyframes bscClientScroll {
                from { transform: translateX(0); }
                to   { transform: translateX(calc(-10 * (148px + 10px))); }
              }

              @media (max-width: 1023px) {
                .bsc-container { padding: 0 20px !important; }
                .bsc-content-row { flex-direction: column !important; padding-left: 0 !important; gap: 0 !important; }
                .bsc-left-col { width: 100% !important; padding: 32px 24px 0 24px !important; }
                .bsc-right-form { width: 100% !important; margin-top: 32px !important; border-radius: 0 0 24px 24px !important; padding: 32px 24px !important; box-sizing: border-box !important; }
                .bsc-title { font-size: clamp(28px, 5vw, 40px) !important; width: 100% !important; }
                .bsc-client-list { margin-left: 0 !important; width: 100% !important; padding: 0 0 24px 0 !important; }
                .bsc-bullet-text { white-space: normal !important; }
              }
              @media (max-width: 767px) {
                .bsc-container { padding: 0 12px !important; }
                .bsc-left-col { padding: 24px 16px 0 16px !important; }
                .bsc-right-form { padding: 24px 16px !important; }
                .bsc-title { font-size: clamp(22px, 7vw, 32px) !important; }
                .bsc-input { font-size: 13px !important; padding: 10px 12px !important; }
                .bsc-label { font-size: 11px !important; }
                .bsc-name-email-row { grid-template-columns: 1fr !important; }
              }
            `}</style>

            {/* ═══════════════════════════
             * LEFT COLUMN
             * ═══════════════════════════ */}
            <div className="bsc-left-col" style={{ width: 408, flexShrink: 0, paddingTop: 42, paddingBottom: 0, display: "flex", flexDirection: "column", gap: 24 }}>

              {/* Tag + Title + Subtitle */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
                {/* Badge */}
                <div style={{ display: "flex", gap: 12, alignItems: "center", width: "100%", flexShrink: 0 }}>
                  <div style={{ background: "#111", borderRadius: 40, padding: "6px 20px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <div aria-hidden="true" style={{ position: "absolute", inset: 0, border: "1px solid #414141", borderRadius: 40, pointerEvents: "none" }} />
                    <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 13, color: "#ffa600", lineHeight: "normal", margin: 0, whiteSpace: "nowrap", position: "relative" }}>
                      Your Growth. Our Obsession.
                    </p>
                  </div>
                  <div style={{ flex: "1 0 0", height: 1, background: "#414141", minWidth: 0 }} />
                </div>

                {/* Title */}
                <p className="bsc-title" style={{ fontFamily: "Manrope, sans-serif", fontSize: 38, lineHeight: 0, textTransform: "capitalize", margin: 0, width: 408, color: "white", flexShrink: 0 }}>
                  <span style={{ fontWeight: 300, lineHeight: 1.28, color: "white" }}>Let Us Show You Exactly</span>
                  <span style={{ fontWeight: 200, lineHeight: 1.28 }}>{" "}</span>
                  <span style={{ fontWeight: 700, lineHeight: 1.28, color: "white" }}>What Your Growth System</span>
                  <span style={{ fontWeight: 200, lineHeight: 1.28 }}>{" "}</span>
                  <span style={{ fontWeight: 300, lineHeight: 1.28, color: "white" }}>Should Look Like.</span>
                </p>

                {/* Subtitle */}
                <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 300, fontSize: 14, color: "#727272", lineHeight: "22px", margin: 0 }}>
                  Thirty minutes. No pitch. Just honest thinking about your growth.
                </p>
              </div>

              {/* Bullets + Testimonial */}
              <div style={{ display: "flex", flexDirection: "column", gap: 28, width: 408, flexShrink: 0 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
                  <FeatureBullet bold="We diagnose for free —" light="A complete analysis of your current approach, gaps, and biggest opportunities." />
                  <FeatureBullet bold="You leave with a plan —" light="A tailored 90-day roadmap with KPIs whether we partner or not." />
                  <FeatureBullet bold="No pressure. Ever. —" light="The call is about your business. The decision is entirely yours to make." />
                </div>
                <TestimonialCard />
              </div>

              {/* Logo carousel strip */}
              <div className="bsc-client-list" style={{ marginTop: "auto", marginLeft: -57, width: 465, display: "flex", flexDirection: "column", gap: 20, flexShrink: 0, paddingBottom: 32 }}>
                <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 15, color: "#ffa600", lineHeight: "1.488", textAlign: "center", width: "100%", margin: 0 }}>
                  They booked the call. Their numbers tell the rest of the story.
                </p>
                <div style={{ width: "100%", overflow: "hidden", position: "relative", flexShrink: 0, maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)" }}>
                  <div className="bsc-client-scroll-track" style={{ display: "flex", gap: 10, width: "max-content" }}>
                    {[...BRAND_LOGOS, ...BRAND_LOGOS].map((Logo, i) => (
                      <Logo key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ═══════════════════════════
             * RIGHT FORM CARD
             * ═══════════════════════════ */}
            <div className="bsc-right-form" style={{ flex: "1 1 0", minWidth: 0, backdropFilter: "blur(25px)", WebkitBackdropFilter: "blur(25px)", background: "rgba(0,0,0,0.85)", padding: 40, borderRadius: 24, marginTop: 40, marginBottom: 40, display: "flex", flexDirection: "column", gap: 20, position: "relative", boxSizing: "border-box", border: "1px solid rgba(255,255,255,0.06)" }}>
              {/* Drushti bubble */}
              <DrushtiAvatarBubble />

              {/* Thin blue accent */}
              <div style={{ height: 1, background: "linear-gradient(to right, #1b61db, transparent)", width: "60%" }} />

              {/* Form or Thanks */}
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div key="thanks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <ThankYouScreen onReset={() => setIsSuccess(false)} />
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <StrategyCallForm onSuccess={() => setIsSuccess(true)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
