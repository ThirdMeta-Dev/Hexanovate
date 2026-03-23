import { useRef, useState, useEffect, useLayoutEffect, useCallback } from "react";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import svgPaths from "../../imports/svg-rg8pb9vz1u";
import imgSubtract from "@/assets/cd0090f4b0e9f407395ffead182a114269dccc7c.png";

/* ─── HEXAGON CLUSTER (bottom-left of column 1) ───────────────────────────── */
function HexCluster() {
  return (
    <div
      style={{ width: "173.329px", height: "145.581px", position: "relative" }}
    >
      <svg
        className="absolute block"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 173.329 145.581"
        style={{ width: "100%", height: "100%" }}
      >
        <g>
          <path d={svgPaths.p7ed3dc0} fill="#0D1A2E" />
          <path d={svgPaths.p5cf6500} fill="#0D1A2E" />
          <path d={svgPaths.p13b8ff00} fill="#0D1A2E" />
        </g>
      </svg>
    </div>
  );
}

/* ─── BADGE "Why We Started" ─────────────────────────────────────────────── */
function WhyBadge() {
  return (
    <div
      style={{
        background: "#0d1729",
        borderRadius: "40px",
        padding: "6px 20px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        flexShrink: 0,
        width: "169px",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          border: "1px solid #0f3578",
          borderRadius: "40px",
          pointerEvents: "none",
        }}
      />
      <span
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          fontSize: "13px",
          color: "#ffa600",
          lineHeight: "normal",
          whiteSpace: "nowrap",
          position: "relative",
        }}
      >
        Why We Started
      </span>
    </div>
  );
}

/* ─── PLAY BUTTON (amber circle, white triangle) ─────────────────────────── */
function PlayButton() {
  return (
    <div style={{ width: "40px", height: "40px", position: "relative" }}>
      <svg
        style={{ position: "absolute", width: "100%", height: "100%" }}
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 40 40"
      >
        {/* White quarter circle – top-right shadow/depth */}
        <path d={svgPaths.p3085cc30} fill="white" />
        {/* Amber filled circle */}
        <rect
          fill="#FFA600"
          height="36.3636"
          rx="18.1818"
          transform="matrix(-1 0 0 1 38.1842 1.81322)"
          width="36.3636"
        />
        {/* White play triangle */}
        <path d={svgPaths.p102a5c00} fill="white" />
      </svg>
    </div>
  );
}

/* ─── VIDEO CARD ─────────────────────────────────────────────────────────── */
/*
 * Renders the founder video clipped into the Subtract shape, with:
 *   • autoplay muted loop
 *   • circular progress ring around the play/pause button (top-right)
 *   • mute/unmute toggle (bottom-left, outside the mask so it's always visible)
 */
const VIDEO_URL =
  "https://sienna-pelican-786032.hostingersite.com/wp-content/uploads/2026/03/I-DID-NOT-LISTEN-founder-founderlife-agencyowner-personalbrand-femalefounders.mp4";

const RING = 52;          // outer progress-ring container px
const RING_R = 22;        // circle radius inside 52×52 SVG
const BTN_INSET = (RING - 40) / 2; // 6px — centers 40px button within ring
const CIRCUMFERENCE = 2 * Math.PI * RING_R;

function VideoCard({
  w,
  h,
}: {
  w: number;
  h: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Track the in-flight play() promise to avoid AbortError race condition
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const pendingPauseRef = useRef(false);

  /* Force muted BEFORE any paint — fixes React's muted prop bug */
  useLayoutEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  }, []);

  /* autoplay on mount */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    playPromiseRef.current = v.play();
    playPromiseRef.current
      .then(() => {
        setIsPlaying(true);
        playPromiseRef.current = null;
        // If pause was requested while play was pending, honour it now
        if (pendingPauseRef.current) {
          pendingPauseRef.current = false;
          v.pause();
          setIsPlaying(false);
        }
      })
      .catch(() => {
        playPromiseRef.current = null;
        pendingPauseRef.current = false;
      });
  }, []);

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (v && v.duration) setProgress(v.currentTime / v.duration);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;

    if (isPlaying) {
      // If a play() promise is still pending, defer the pause until it settles
      if (playPromiseRef.current) {
        pendingPauseRef.current = true;
      } else {
        v.pause();
        setIsPlaying(false);
      }
    } else {
      pendingPauseRef.current = false;
      playPromiseRef.current = v.play();
      playPromiseRef.current
        .then(() => {
          setIsPlaying(true);
          playPromiseRef.current = null;
        })
        .catch(() => {
          playPromiseRef.current = null;
        });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (!document.fullscreenElement) {
      v.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  /* sync fullscreen state when user presses Esc */
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <div style={{ position: "relative", width: w, height: h, flexShrink: 0 }}>
      {/* ── Video clipped into the Subtract shape ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          maskImage: `url('${imgSubtract}')`,
          maskSize: "100% 100%",
          maskRepeat: "no-repeat",
          maskPosition: "0px 0px",
          WebkitMaskImage: `url('${imgSubtract}')`,
          WebkitMaskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "0px 0px",
          overflow: "hidden",
        }}
      >
        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          loop
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* ── Circular progress ring + play/pause button (top-right) ── */}
      <div
        onClick={togglePlay}
        style={{
          position: "absolute",
          top: -BTN_INSET,
          right: -BTN_INSET,
          width: RING,
          height: RING,
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        {/* SVG progress ring */}
        <svg
          viewBox={`0 0 ${RING} ${RING}`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            transform: "rotate(-90deg)",
            pointerEvents: "none",
          }}
        >
          {/* Track */}
          <circle
            cx={RING / 2}
            cy={RING / 2}
            r={RING_R}
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2.5"
          />
          {/* Progress arc */}
          <circle
            cx={RING / 2}
            cy={RING / 2}
            r={RING_R}
            fill="none"
            stroke="#FFA600"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />
        </svg>

        {/* Amber button centered within ring */}
        <div style={{ position: "absolute", top: BTN_INSET, left: BTN_INSET }}>
          <svg
            fill="none"
            viewBox="0 0 40 40"
            style={{ width: 40, height: 40, display: "block" }}
          >
            {/* White quarter-circle depth accent */}
            <path d={svgPaths.p3085cc30} fill="white" />
            {/* Amber circle */}
            <rect
              fill="#FFA600"
              height="36.3636"
              rx="18.1818"
              transform="matrix(-1 0 0 1 38.1842 1.81322)"
              width="36.3636"
            />
            {/* Play or Pause icon */}
            {isPlaying ? (
              <g>
                <rect x="13" y="12" width="4.5" height="16" rx="2" fill="white" />
                <rect x="22.5" y="12" width="4.5" height="16" rx="2" fill="white" />
              </g>
            ) : (
              <path d={svgPaths.p102a5c00} fill="white" />
            )}
          </svg>
        </div>
      </div>

      {/* ── Mute / Unmute button (bottom-left, outside mask) ── */}
      <button
        onClick={toggleMute}
        title={isMuted ? "Unmute" : "Mute"}
        style={{
          position: "absolute",
          bottom: 18,
          left: 14,
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.55)",
          border: "1px solid rgba(255,255,255,0.25)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 10,
          padding: 0,
          outline: "none",
          flexShrink: 0,
        }}
      >
        {isMuted ? (
          /* Muted — speaker with X */
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="white" fillOpacity="0.15" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          /* Unmuted — speaker with waves */
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="white" fillOpacity="0.15" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>

      {/* ── Fullscreen button (bottom-right) ── */}
      <button
        onClick={toggleFullscreen}
        title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
        style={{
          position: "absolute",
          bottom: 18,
          right: 14,
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.55)",
          border: "1px solid rgba(255,255,255,0.25)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 10,
          padding: 0,
          outline: "none",
          flexShrink: 0,
        }}
      >
        {isFullscreen ? (
          /* Exit fullscreen icon */
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3v3a2 2 0 0 1-2 2H3" />
            <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
            <path d="M3 16h3a2 2 0 0 1 2 2v3" />
            <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
          </svg>
        ) : (
          /* Enter fullscreen icon */
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7V3h4" />
            <path d="M17 3h4v4" />
            <path d="M21 17v4h-4" />
            <path d="M7 21H3v-4" />
          </svg>
        )}
      </button>
    </div>
  );
}

/* ─── QUOTE MARKS (amber gradient open-quote SVG) ────────────────────────── */
function QuoteMarks() {
  return (
    <div
      style={{
        width: "34px",
        height: "39.831px",
        marginBottom: "-22px",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <svg
        style={{ position: "absolute", width: "100%", height: "100%" }}
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 34.0002 39.8309"
      >
        <g>
          <path
            d={svgPaths.p4b3a780}
            fill="url(#qm_grad_0)"
            fillOpacity="0.5"
          />
          <path
            d={svgPaths.p29bcdbf0}
            fill="url(#qm_grad_1)"
            fillOpacity="0.5"
          />
        </g>
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="qm_grad_0"
            x1="26.4218"
            x2="26.4218"
            y1="39.745"
            y2="-9.91429e-08"
          >
            <stop stopColor="#FFA600" />
            <stop offset="1" stopColor="#0D1B34" />
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="qm_grad_1"
            x1="7.57821"
            x2="7.57821"
            y1="39.8309"
            y2="0.0859393"
          >
            <stop stopColor="#FFA600" />
            <stop offset="1" stopColor="#0D1B34" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ─── QUOTE TEXT COLUMN ───────────────────────────────────────────────────── */
function QuoteText({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  return (
    <div
      style={{
        flex: "1 0 0",
        height: "303px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        minWidth: 0,
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          paddingBottom: "22px",
          width: "100%",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <QuoteMarks />

        {/* Two amber text paragraphs with scroll-reveal */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "flex-start",
            width: "100%",
            fontFamily: "Manrope, sans-serif",
            fontWeight: 300,
            fontSize: "22px",
            lineHeight: "34px",
            color: "#ffa600",
            marginBottom: "-22px",
          }}
        >
          <p style={{ width: "100%", margin: 0 }}>
            {["We", "unlock", "scale", "by", "fixing", "what's", "leaking:", "conversion,", "retention,", "repeat", "—", "so", "growth", "compounds", "naturally."].flatMap((word, wi) => [
              wi > 0 ? " " : null,
              <RevealWord
                key={wi}
                progress={scrollYProgress}
                range={[0.25 + wi * 0.010, 0.25 + wi * 0.010 + 0.09]}
              >
                {word}
              </RevealWord>,
            ])}
          </p>
          <p style={{ width: "100%", margin: 0 }}>
            {["We", "power", "discovery,", "engagement,", "and", "recall", "—", "where", "most", "purchase", "decisions", "begin:", "digitally."].flatMap((word, wi) => [
              wi > 0 ? " " : null,
              <RevealWord
                key={wi}
                progress={scrollYProgress}
                range={[0.50 + wi * 0.010, 0.50 + wi * 0.010 + 0.09]}
              >
                {word}
              </RevealWord>,
            ])}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── LEFT COLUMN ─────────────────────────────────────────────────────────── */
function LeftColumn() {
  return (
    /*
     * Frame1: w-169, h-full (self-stretch), shrink-0
     * Frame8 inside: flex-1, flex-col, justify-between, pt-24 pb-28
     *   - Badge at top
     *   - Hex cluster: absolute left-[-55.33px] top-[300.26px] (overflows card edge)
     *   - Subtitle text at bottom
     */
    <div
      style={{
        height: "100%",
        width: "169px",
        flexShrink: 0,
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          paddingTop: "24px",
          paddingBottom: "28px",
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        {/* Hex cluster — absolutely positioned, overflows card left edge */}
        <div
          style={{
            position: "absolute",
            left: "-55.33px",
            top: "300.26px",
            width: "173.329px",
            height: "145.581px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ transform: "scaleY(-1)", flexShrink: 0 }}>
            <HexCluster />
          </div>
        </div>

        {/* Badge */}
        <WhyBadge />

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontSize: "15px",
            lineHeight: "26px",
            color: "#727272",
            minWidth: "100%",
            width: "min-content",
            margin: 0,
            flexShrink: 0,
            position: "relative",
          }}
        >
          We unlock scale by fixing what&apos;s leaking conversion
        </p>
      </div>
    </div>
  );
}

/* ─── MIDDLE + RIGHT COLUMNS (Frame6) ───────────────────────────────────── */
function ContentColumns({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  return (
    <div
      style={{
        flex: "1 0 0",
        display: "flex",
        flexDirection: "row",
        gap: "56px",
        alignItems: "flex-end",
        minWidth: 0,
        position: "relative",
      }}
    >
      {/* Blue background rectangle behind photo */}
      <div
        style={{
          position: "absolute",
          background: "#1b61db",
          height: "354px",
          left: "26px",
          borderRadius: "34px 20px 20px 34px",
          top: "76px",
          width: "245px",
        }}
      />

      <VideoCard w={259} h={418} />
      <QuoteText scrollYProgress={scrollYProgress} />
    </div>
  );
}

/* ─── MAIN CARD (Frame3) ─────────────────────────────────────────────────── */
function MainCard() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [0.65, 1, 1, 0.65]
  );
  const cardOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        opacity: cardOpacity,
        backdropFilter: "blur(50px)",
        WebkitBackdropFilter: "blur(50px)",
        background: "rgba(27,97,219,0.15)",
        borderRadius: "30px",
        width: "100%",
        maxWidth: "1104px",
        position: "relative",
        flexShrink: 0,
        transformOrigin: "center center",
      }}
    >
      {/* Inner layout wrapper — overflow:clip clips hex cluster overflow cleanly */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "68px",
          alignItems: "center",
          overflow: "clip",
          padding: "44px 48px",
          borderRadius: "30px",
          width: "100%",
          position: "relative",
        }}
      >
        {/* ── Gradient deco 1: top-left blue sweep ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "1104px",
            height: "275px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div style={{ transform: "rotate(90deg)", flexShrink: 0 }}>
            <div
              style={{
                width: "275px",
                height: "1104px",
                borderBottomLeftRadius: "30px",
                borderTopLeftRadius: "30px",
                backgroundImage:
                  "linear-gradient(76.9202deg, rgba(27,97,219,0.25) 0.14447%, rgba(27,97,219,0) 53.962%)",
              }}
            />
          </div>
        </div>

        {/* ── Gradient deco 2: bottom-right amber sweep ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "793px",
            top: "427px",
            width: "311px",
            height: "78px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
            <div
              style={{
                width: "78px",
                height: "311px",
                borderBottomLeftRadius: "30px",
                backgroundImage:
                  "linear-gradient(76.8336deg, rgba(255,166,0,0.2) 0.14447%, rgba(255,166,0,0) 53.962%)",
              }}
            />
          </div>
        </div>

        {/* Column 1: left info */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", alignSelf: "stretch" }}>
          <LeftColumn />
        </div>

        {/* Columns 2+3: photo + quote */}
        <ContentColumns scrollYProgress={scrollYProgress} />
      </div>

      {/* Card border overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          border: "1px solid #0d1729",
          borderRadius: "30px",
          pointerEvents: "none",
        }}
      />
    </motion.div>
  );
}

/* ─── REVEAL WORD (scroll-linked per-word opacity, text-reveal-9 pattern) ── */
function RevealWord({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span style={{ position: "absolute", opacity: 0.3 }}>{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

/* ─── TABLET LAYOUT ───────────────────────────────────────────────────────── */
function TabletLayout() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [0.65, 1, 1, 0.65]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        opacity,
        backdropFilter: "blur(50px)",
        WebkitBackdropFilter: "blur(50px)",
        background: "rgba(27,97,219,0.15)",
        border: "1px solid #0d1729",
        borderRadius: "24px",
        width: "100%",
        maxWidth: "760px",
        padding: "32px 32px 36px",
        position: "relative",
        overflow: "hidden",
        transformOrigin: "center center",
      }}
    >
      {/* Gradient deco 1 */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          height: "180px",
          background:
            "linear-gradient(to right, rgba(27,97,219,0.2) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      {/* Gradient deco 2 */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: "200px",
          height: "80px",
          background:
            "linear-gradient(to left, rgba(255,166,0,0.15) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Badge */}
      <div style={{ marginBottom: "20px" }}>
        <WhyBadge />
      </div>

      {/* Two-column: photo + text */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "32px",
          alignItems: "flex-end",
        }}
      >
        {/* Photo column */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          {/* Blue bg rect */}
          <div
            style={{
              position: "absolute",
              background: "#1b61db",
              width: "180px",
              height: "260px",
              top: "56px",
              left: "20px",
              borderRadius: "24px 14px 14px 24px",
            }}
          />
          {/* Video + progress ring + mute */}
          <VideoCard w={190} h={305} />
        </div>

        {/* Quote text column */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <QuoteMarks />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 300,
              fontSize: "16px",
              lineHeight: "26px",
              color: "#ffa600",
            }}
          >
            <p style={{ margin: 0 }}>
              {["We", "unlock", "scale", "by", "fixing", "what's", "leaking:", "conversion,", "retention,", "repeat", "—", "so", "growth", "compounds", "naturally."].flatMap((word, wi) => [
                wi > 0 ? " " : null,
                <RevealWord
                  key={wi}
                  progress={scrollYProgress}
                  range={[0.25 + wi * 0.010, 0.25 + wi * 0.010 + 0.09]}
                >
                  {word}
                </RevealWord>,
              ])}
            </p>
            <p style={{ margin: 0 }}>
              {["We", "power", "discovery,", "engagement,", "and", "recall", "—", "where", "most", "purchase", "decisions", "begin:", "digitally."].flatMap((word, wi) => [
                wi > 0 ? " " : null,
                <RevealWord
                  key={wi}
                  progress={scrollYProgress}
                  range={[0.50 + wi * 0.010, 0.50 + wi * 0.010 + 0.09]}
                >
                  {word}
                </RevealWord>,
              ])}
            </p>
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          fontSize: "13px",
          lineHeight: "22px",
          color: "#727272",
          marginTop: "20px",
          marginBottom: 0,
        }}
      >
        We unlock scale by fixing what&apos;s leaking conversion
      </p>
    </motion.div>
  );
}

/* ─── MOBILE LAYOUT ──────────────────────────────────────────────────────── */
function MobileLayout() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [0.65, 1, 1, 0.65]
  );
  const mobileOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        opacity: mobileOpacity,
        backdropFilter: "blur(50px)",
        WebkitBackdropFilter: "blur(50px)",
        background: "rgba(27,97,219,0.15)",
        border: "1px solid #0d1729",
        borderRadius: "20px",
        width: "100%",
        padding: "24px 20px 28px",
        position: "relative",
        overflow: "hidden",
        transformOrigin: "center center",
      }}
    >
      {/* Gradient top */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          height: "120px",
          background:
            "linear-gradient(to right, rgba(27,97,219,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Badge */}
      <div style={{ marginBottom: "20px" }}>
        <WhyBadge />
      </div>

      {/* Photo centered with blue bg */}
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          marginBottom: "24px",
        }}
      >
        <div style={{ position: "relative" }}>
          {/* Blue bg rect */}
          <div
            style={{
              position: "absolute",
              background: "#1b61db",
              width: "164px",
              height: "230px",
              top: "46px",
              left: "18px",
              borderRadius: "20px 12px 12px 20px",
            }}
          />
          {/* Video + progress ring + mute */}
          <VideoCard w={172} h={277} />
        </div>
      </div>

      {/* Quote text with scroll-reveal */}
      <div>
        <QuoteMarks />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            fontFamily: "Manrope, sans-serif",
            fontWeight: 300,
            fontSize: "15px",
            lineHeight: "25px",
            color: "#ffa600",
            marginTop: "4px",
          }}
        >
          <p style={{ margin: 0 }}>
            {["We", "unlock", "scale", "by", "fixing", "what's", "leaking:", "conversion,", "retention,", "repeat", "—", "so", "growth", "compounds", "naturally."].flatMap((word, wi) => [
              wi > 0 ? " " : null,
              <RevealWord
                key={wi}
                progress={scrollYProgress}
                range={[0.25 + wi * 0.010, 0.25 + wi * 0.010 + 0.09]}
              >
                {word}
              </RevealWord>,
            ])}
          </p>
          <p style={{ margin: 0 }}>
            {["We", "power", "discovery,", "engagement,", "and", "recall", "—", "where", "most", "purchase", "decisions", "begin:", "digitally."].flatMap((word, wi) => [
              wi > 0 ? " " : null,
              <RevealWord
                key={wi}
                progress={scrollYProgress}
                range={[0.50 + wi * 0.010, 0.50 + wi * 0.010 + 0.09]}
              >
                {word}
              </RevealWord>,
            ])}
          </p>
        </div>
      </div>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          fontSize: "13px",
          lineHeight: "22px",
          color: "#727272",
          marginTop: "18px",
          marginBottom: 0,
        }}
      >
        We unlock scale by fixing what&apos;s leaking conversion
      </p>
    </motion.div>
  );
}

/* ─── WHY WE STARTED SECTION — exported ─────────────────────────────────── */
export function WhyWeStartedSection() {
  return (
    <section
      style={{
        width: "100%",
        paddingTop: 0,
        paddingBottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: "clamp(16px, 4vw, 48px)",
        paddingRight: "clamp(16px, 4vw, 48px)",
        boxSizing: "border-box",
      }}
    >
      {/* ── Desktop card (≥1104px): full Figma spec ── */}
      <div className="w-full hidden xl:flex justify-center">
        <MainCard />
      </div>

      {/* ── Tablet / small desktop (640px–1279px): scaled-down card ── */}
      <div className="w-full hidden sm:flex xl:hidden justify-center">
        <TabletLayout />
      </div>

      {/* ── Mobile (<640px): stacked layout ── */}
      <div className="w-full flex sm:hidden flex-col">
        <MobileLayout />
      </div>
    </section>
  );
}