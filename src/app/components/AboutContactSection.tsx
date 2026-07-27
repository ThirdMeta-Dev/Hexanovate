/* ─────────────────────────────────────────────────────────────────────────────
   AboutContactSection — Section 8 of About Us page
   Figma: node 11479-733

   Layout:
   • Section: full-width, padding 0 24px (no maxWidth constraint)
   • Card: 100% width, padding 60px 96px, rounded 30px, dark gradient
   • LEFT (540px fixed): tag + heading + 3 bullets
   • RIGHT (flex-1): form fields + submit
   • Submit: two separate fully-rounded blue elements (pill + circle) per Figma

   Submit: POST to Supabase edge fn /contact (source:"about-us") → /thank-you
   ───────────────────────────────────────────────────────────────────────────── */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import { CtaButton } from "./CtaButton";

const SERVICE_OPTIONS = [
  "Growth partnership enquiry",
  "Media or press",
  "Strategic partnership",
  "Careers or collaboration",
  "General query",
];

interface FormValues {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  notes: string;
}

/* ── Arrow icon ──────────────────────────────────────────────────────────── */
function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Bullet point ────────────────────────────────────────────────────────── */
function Bullet({ bold, muted }: { bold: string; muted: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#1b61db",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <ArrowIcon size={10} />
      </div>
      <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontSize: 16, lineHeight: "26px" }}>
        <span style={{ fontWeight: 600, color: "#ffffff" }}>{bold} </span>
        <span style={{ fontWeight: 400, color: "#727272" }}>{muted}</span>
      </p>
    </div>
  );
}

/* ── Glass input — matches Figma rgba(255,255,255,0.32) ─────────────────── */
const glass: React.CSSProperties = {
  backdropFilter: "blur(2px)",
  WebkitBackdropFilter: "blur(2px)",
  background: "rgba(255,255,255,0.12)",
  border: "1px solid rgba(255,255,255,0.18)",
  borderRadius: 12,
  color: "#ffffff",
  fontFamily: "Poppins, sans-serif",
  fontSize: 15,
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};
const glassErr: React.CSSProperties = { borderColor: "#ef4444" };
const errText: React.CSSProperties = {
  fontFamily: "Poppins, sans-serif",
  fontSize: 11,
  color: "#ef4444",
  position: "absolute",
  top: "calc(100% + 1px)",
  left: 0,
  lineHeight: 1,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%",
  pointerEvents: "none",
};
const fieldWrap: React.CSSProperties = { position: "relative", width: "100%" };

/* ── Contact form ────────────────────────────────────────────────────────── */
function ContactForm() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

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
          body: JSON.stringify({ ...data, source: "about-us" }),
        }
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed.");
      navigate("/thank-you");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setServerError(msg);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}
    >
      {/* Name — full width */}
      <div style={fieldWrap}>
        <input
          placeholder="Your name"
          style={{ ...glass, ...(errors.name ? glassErr : {}), height: 48, padding: "0 16px", width: "100%" }}
          {...register("name", {
            required: "Name is required.",
            minLength: { value: 2, message: "At least 2 characters." },
            maxLength: { value: 60, message: "Name cannot exceed 60 characters." },
            pattern: { value: /^[A-Za-z][A-Za-z\s.'-]*$/, message: "Name can only contain letters." },
          })}
        />
        {errors.name && <span style={errText}>{errors.name.message}</span>}
      </div>

      {/* Email + Phone row — side by side on desktop, stacked on mobile */}
      <div className="cf-phone-email-row" style={{ display: "flex", gap: 12 }}>
        <div style={{ ...fieldWrap, flex: 1, minWidth: 0 }}>
          <input
            placeholder="Where should we write back?"
            className="cf-email-input"
            style={{ ...glass, ...(errors.email ? glassErr : {}), height: 48, padding: "0 16px", width: "100%" }}
            {...register("email", {
              required: "Email is required.",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email." },
            })}
          />
          {errors.email && <span style={errText}>{errors.email.message}</span>}
        </div>
        <div style={{ ...fieldWrap, flex: 1, minWidth: 0 }}>
          <input
            placeholder="A number for a quick call if needed"
            className="cf-phone-input"
            style={{ ...glass, ...(errors.phone ? glassErr : {}), height: 48, padding: "0 16px", width: "100%" }}
            {...register("phone", {
              required: "Phone is required.",
              pattern: { value: /^[0-9+\s\-()]{7,15}$/, message: "Enter a valid phone number." },
            })}
          />
          {errors.phone && <span style={errText}>{errors.phone.message}</span>}
        </div>
      </div>

      {/* Company + Designation — single field */}
      <div style={fieldWrap}>
        <input
          placeholder="Your company and what you do there"
          style={{ ...glass, ...(errors.company ? glassErr : {}), height: 48, padding: "0 16px", width: "100%" }}
          {...register("company", {
            required: "Company is required.",
            minLength: { value: 2, message: "At least 2 characters." },
            maxLength: { value: 120, message: "Cannot exceed 120 characters." },
          })}
        />
        {errors.company && <span style={errText}>{errors.company.message}</span>}
      </div>

      {/* Service dropdown */}
      <div style={{ position: "relative" }}>
        <select
          defaultValue=""
          style={{
            ...glass,
            ...(errors.service ? glassErr : {}),
            height: 48,
            padding: "0 40px 0 16px",
            width: "100%",
            appearance: "none",
            WebkitAppearance: "none",
            cursor: "pointer",
            color: "rgba(255,255,255,0.7)",
          }}
          {...register("service", { required: "Please select a service." })}
        >
          <option value="" disabled style={{ background: "#1a1a1a" }}>
            What brings you here today?
          </option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt} style={{ background: "#1a1a1a", color: "#fff" }}>
              {opt}
            </option>
          ))}
        </select>
        <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M5 7L9 11L13 7" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {errors.service && <span style={errText}>{errors.service.message}</span>}
      </div>

      {/* Notes textarea */}
      <div style={fieldWrap}>
        <textarea
          placeholder="The more context you give, the better we can help"
          style={{
            ...glass,
            ...(errors.notes ? glassErr : {}),
            padding: "14px 16px",
            resize: "none",
            height: 123,
            width: "100%",
            lineHeight: "22px",
            display: "block",
          }}
          {...register("notes", {
            required: "Please describe what you're looking for.",
            minLength: { value: 10, message: "Please add more detail (min 10 characters)." },
            maxLength: { value: 1000, message: "Message cannot exceed 1000 characters." },
          })}
        />
        {errors.notes && <span style={errText}>{errors.notes.message}</span>}
      </div>

      {serverError && (
        <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#ef4444", margin: 0 }}>
          {serverError}
        </p>
      )}

      {/* Submit — shared pill + ringed arrow circle (Figma 10904:134) */}
      <div style={{ display: "flex", alignItems: "center", gap: 0, marginTop: 4 }}>
        <CtaButton
          type="submit"
          label={isSubmitting ? "Sending…" : "Start The Conversation"}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}

/* ── Main export ─────────────────────────────────────────────────────────── */
export function AboutContactSection() {
  return (
    /* Full-width card — no side padding, borderRadius only on desktop */
    <div
      style={{
        position: "relative",
        width: "100%",
        borderRadius: 30,
        border: "1px solid #212121",
        background: "linear-gradient(-42.66deg, #0a0a0a 0%, #222222 100%)",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Blue top-left corner glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -1,
          left: -1,
          width: 510,
          height: 147,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: "rotate(90deg)",
            backgroundImage: "linear-gradient(71.22deg, rgba(27,97,219,0.25) 0.16%, rgba(27,97,219,0) 48.91%)",
          }}
        />
      </div>

      {/* Inner box — max-width centered, two columns */}
      <div
        className="ac-inner"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "60px 96px",
          display: "flex",
          alignItems: "center",
          gap: 44,
          boxSizing: "border-box",
        }}
      >
        {/* ── LEFT column (540px fixed) ── */}
        <div
          className="ac-left"
          style={{
            width: 540,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          {/* Tag + line */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, maxWidth: 308 }}>
            <div
              style={{
                background: "#111",
                border: "1px solid #414141",
                borderRadius: 40,
                padding: "6px 20px",
                flexShrink: 0,
              }}
            >
              <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#FFA600", whiteSpace: "nowrap" }}>
                Open A Conversation
              </span>
            </div>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.15)" }} />
          </div>

          {/* Heading */}
          <p className="ac-heading" style={{ fontFamily: "Manrope, sans-serif", fontSize: 48, lineHeight: 1.32, margin: 0, textTransform: "capitalize" }}>
            <span style={{ fontWeight: 300, color: "#ffffff" }}>Something Brought </span>
            <span style={{ fontWeight: 700, color: "#ffffff" }}>You Here.</span>
            <br />
            <span style={{ fontWeight: 700, color: "#ffffff" }}>Let Us Find Out What.</span>
          </p>

          {/* Bullet points */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Bullet bold="No commitment —" muted="A conversation costs nothing and might change everything" />
            <Bullet bold="Right person —" muted="Your message goes directly to someone who can actually help" />
            <Bullet bold="Any reason —" muted="Leads, partnerships, press, questions, or just curiosity. All welcome." />
          </div>
        </div>

        {/* ── RIGHT column (flex-1, form) ── */}
        <div
          className="ac-right"
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ContactForm />
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 1024px) {
          .ac-inner {
            flex-direction: column !important;
            padding: 36px 20px !important;
            gap: 32px !important;
          }
          .ac-left {
            width: 100% !important;
          }
          .ac-heading {
            font-size: clamp(24px, 7vw, 36px) !important;
          }
          .cf-phone-email-row {
            flex-direction: column !important;
          }
          .cf-phone-input, .cf-email-input {
            width: 100% !important;
            flex: none !important;
          }
          .cf-phone-email-errors {
            flex-direction: column !important;
            gap: 4px !important;
          }
        }
      `}</style>
    </div>
  );
}
