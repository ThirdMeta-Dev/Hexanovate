import { useRef, CSSProperties } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

/* ─── Single word with scroll-driven opacity ───────────────────────────────── */
interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  style?: CSSProperties;
}

function Word({ children, progress, range, style }: WordProps) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity, ...style }}>
      {children}{" "}
    </motion.span>
  );
}

/* ─── TextRevealParagraph ─────────────────────────────────────────────────── */
export function TextRevealParagraph() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.15"],
  });

  // Segment 1 — bold white: "We unlock scale by fixing what's"
  const boldWords = "We unlock scale by fixing what's".split(" ");

  // Segment 2 — light white: ":"
  // Segment 3 — light gray: "lorem conversion, retention, repeat; so growth We lorem is"
  const grayWords = "lorem conversion, retention, repeat; so growth We lorem is".split(" ");

  const totalWords = boldWords.length + 1 + grayWords.length; // +1 for ":"

  const getRange = (index: number): [number, number] => {
    const start = index / totalWords;
    const end = start + 1.2 / totalWords;
    return [Math.min(start, 1), Math.min(end, 1)];
  };

  let wordIndex = 0;

  return (
    <div ref={containerRef}>
      <p
        style={{
          fontFamily: "Manrope, sans-serif",
          fontSize: "clamp(28px, 4vw, 44px)",
          lineHeight: 1.4,
          textAlign: "center",
          color: "white",
          maxWidth: 816,
          width: "100%",
          margin: 0,
        }}
      >
        {/* Bold white words */}
        {boldWords.map((word) => {
          const idx = wordIndex++;
          return (
            <Word
              key={`bold-${idx}`}
              progress={scrollYProgress}
              range={getRange(idx)}
              style={{ fontWeight: 700, color: "white" }}
            >
              {word}
            </Word>
          );
        })}

        {/* Colon — light weight */}
        <Word
          progress={scrollYProgress}
          range={getRange(wordIndex++)}
          style={{ fontWeight: 300, color: "white" }}
        >
          {":"}
        </Word>

        {/* Gray light words */}
        {grayWords.map((word) => {
          const idx = wordIndex++;
          return (
            <Word
              key={`gray-${idx}`}
              progress={scrollYProgress}
              range={getRange(idx)}
              style={{ fontWeight: 300, color: "#8e8e8e" }}
            >
              {word}
            </Word>
          );
        })}
      </p>
    </div>
  );
}