import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from "motion/react";
import svgPaths from "../../imports/svg-fbumpdre7a";

/* ─── REVEAL-WORD (scroll-linked opacity illumination) ───────────────────── */
interface RevealWordProps {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}
function RevealWord({ children, progress, range }: RevealWordProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

/* ─── DIAGONAL ARROW ICON ────────────────────────────────────────────────── */
/*
 * Mirrors Figma Arrow component exactly:
 *   overflow-clip, size-24
 *   └── absolute inset-[33.72%_18.03%_8.03%_23.72%], flex, items-center, justify-center
 *       └── flex-none, h-9.885px, w-9.886px, rotate-135
 *           └── DiagonalLeft: relative size-full
 *               └── absolute inset-[-5.06%]
 *                   └── SVG viewBox 0 0 10.8856 10.8853, path p2620c700
 *
 * Collapsed state: outer wrapper applies rotate-180  → total 135+180 = 315° (∨)
 * Expanded state : no outer rotation                 → 135° only             (∧)
 */
function FaqArrow({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        position: "relative",
      }}
    >
      {/* Outer: spring-animated rotate-180 for closed, 0 for open */}
      <motion.div
        animate={{ rotate: isOpen ? 0 : 180 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        style={{ flexShrink: 0 }}
      >
        {/* Arrow: overflow-clip, 24×24 */}
        <div
          style={{ overflow: "clip", position: "relative", width: 24, height: 24 }}
        >
          {/*
           * Inner container: inset top 33.72%, right 18.03%, bottom 8.03%, left 23.72%
           * Result: ~5.7px from left, 4.3px from right, 8.1px from top, 1.9px from bottom
           */}
          <div
            style={{
              position: "absolute",
              display: "flex",
              top: "33.72%",
              right: "18.03%",
              bottom: "8.03%",
              left: "23.72%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Diagonal: 9.885×9.886, rotate-135 */}
            <div
              style={{
                flexShrink: 0,
                height: 9.885,
                width: 9.886,
                transform: "rotate(135deg)",
              }}
            >
              {/* DiagonalLeft: relative size-full */}
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                {/* inset-[-5.06%] = slightly overflows its box */}
                <div style={{ position: "absolute", inset: "-5.06%" }}>
                  <svg
                    style={{ display: "block", width: "100%", height: "100%" }}
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 10.8856 10.8853"
                  >
                    <path
                      d={svgPaths.p2620c700}
                      fill="white"
                      stroke="white"
                      strokeWidth="0.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── WORD-BY-WORD REVEAL ────────────────────────────────────────────────── */
/*
 * Splits answer text into words and stagger-animates each one in with
 * a spring so they cascade in from below when the accordion opens,
 * and instantly hide when it closes.
 */
function WordReveal({
  text,
  isVisible,
}: {
  text: string;
  isVisible: boolean;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 7 }}
          animate={
            isVisible
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 0 }
          }
          transition={
            isVisible
              ? {
                  type: "spring",
                  stiffness: 340,
                  damping: 28,
                  delay: 0.08 + i * 0.028,
                }
              : { duration: 0.08 }
          }
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

/* ─── UNIFIED FAQ ACCORDION ITEM ─────────────────────────────────────────── */
/*
 * Replaces the old CollapsedItem / ExpandedItem two-component swap.
 * One component handles both states so the card expands in-place
 * rather than unmounting/remounting — enabling true accordion animation.
 *
 * Open  → card grows downward with spring bounce, answer reveals word-by-word
 * Close → card contracts upward, answer disappears instantly
 *
 * Animations:
 *   • Container borderRadius: spring 20 → 25
 *   • Glassmorphism bg + border: AnimatePresence opacity overlay
 *   • Answer height: spring stiffness:260 damping:18 mass:1.15 → bouncy
 *   • Answer text: WordReveal (staggered word cascade, spring per-word)
 *   • Arrow: spring rotate 180 ↔ 0  (handled in FaqArrow)
 *   • Question fontSize: CSS transition 16px → 18px
 */
function FaqItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout="size"
      animate={{ borderRadius: isOpen ? 25 : 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      style={{
        position: "relative",
        flexShrink: 0,
        width: "100%",
        cursor: "pointer",
      }}
    >
      {/* ── Glassmorphism background — fades in on open ── */}
      {/*
       * Opacity-animated overlay because backdropFilter + gradient
       * cannot be CSS-transitioned from "none". Lives behind all content.
       */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="glass-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              backgroundImage:
                "linear-gradient(169.779deg, rgba(27,97,219,0.15) 0%, rgba(19,69,155,0.15) 96.471%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Border overlay — fades in on open ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="glass-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              border: "1px solid rgba(0,0,0,0.2)",
              borderRadius: "inherit",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Hover bg — only while closed ── */}
      {!isOpen && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            background: hovered ? "rgba(255,255,255,0.03)" : "transparent",
            transition: "background 0.2s ease",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}

      {/* All content sits above overlays */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column" }}>

        {/*
         * ═══════════════════════════════════════════════════════
         * SELECTED ELEMENT — question row
         * Figma: flex, gap-16, items-start, px-28 py-20 (closed) / py-24 (open)
         * Question: Manrope Medium 16px→18px, white, leading-30
         * Arrow: FaqArrow isOpen drives spring rotate 0↔180
         * ═══════════════════════════════════════════════════════
         */}
        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "flex-start",
            padding: isOpen ? "24px 28px 0 28px" : "20px 28px",
            width: "100%",
            boxSizing: "border-box",
            position: "relative",
            transition: "padding 0.25s ease",
          }}
        >
          {/* Question text — Manrope Medium, size CSS-transitioned */}
          <div
            style={{
              flex: "1 0 0",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <p
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 500,
                fontSize: isOpen ? 18 : 16,
                color: "white",
                lineHeight: "30px",
                width: "100%",
                marginTop: 0,
                marginBottom: 0,
                transition: "font-size 0.22s ease",
              }}
            >
              {question}
            </p>
          </div>

          {/* Arrow — spring rotates 180° (closed ∨) ↔ 0° (open ∧) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <FaqArrow isOpen={isOpen} />
          </div>
        </div>

        {/*
         * ═══════════════════════════════════════════════════════
         * EXPANDABLE ANSWER — added below the question row
         *
         * height 0 → "auto" via spring for bouncy open effect.
         * stiffness:260 / damping:18 / mass:1.15 → overshoot bounce.
         * overflow:hidden on this div keeps collapse clean.
         * WordReveal staggers each word from y:7 with spring delay cascade.
         * ═══════════════════════════════════════════════════════
         */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="answer-body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: {
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                  mass: 1.15,
                },
                opacity: { duration: 0.18 },
              }}
              style={{ overflow: "hidden" }}
            >
              {/* pt-12 pb-24 px-28 — space between question + answer */}
              <div
                style={{
                  padding: "12px 28px 24px",
                  boxSizing: "border-box",
                }}
              >
                {/*
                 * Poppins Regular 15px #9d9d9d leading-26
                 * Each word is a motion.span cascading in with spring stagger.
                 */}
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 400,
                    fontSize: 15,
                    color: "#9d9d9d",
                    lineHeight: "26px",
                    width: "100%",
                    marginTop: 0,
                    marginBottom: 0,
                  }}
                >
                  <WordReveal text={answer} isVisible={isOpen} />
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const TABS = ["General", "Team & culture", "Pricing", "Process"];

const FAQS = [
  {
    question:
      "We're an established FMCG brand—are we too traditional to work with you?",
    answer:
      "Not at all. Our Growth OS is modular. It adapts to legacy brand structures while modernizing execution, analytics, and decision flow. Not at all.",
  },
  {
    question: "We already have multiple agencies. How does that affect fit?",
    answer:
      "Not at all. Our Growth OS is modular. It adapts to legacy brand structures while modernizing execution, analytics, and decision flow. Not at all.",
  },
  {
    question:
      "We're an established FMCG brand—are we too traditional to work with you?",
    answer:
      "Not at all. Our Growth OS is modular. It adapts to legacy brand structures while modernizing execution, analytics, and decision flow. Not at all.",
  },
  {
    question:
      "We're an established FMCG brand—are we too traditional to work with you?",
    answer:
      "Not at all. Our Growth OS is modular. It adapts to legacy brand structures while modernizing execution, analytics, and decision flow. Not at all.",
  },
];

/* ─── PER-TAB FAQ DATA ───────────────────────────────────────────────────── */
const FAQS_BY_TAB: Record<number, typeof FAQS> = {
  0: [
    {
      question: "Is Hexanovate an agency?",
      answer:
        "No. Hexanovate is a connected growth ecosystem. Think of us as the infrastructure your business needs to scale. We house specialized brands like ThirdMeta (B2B), The Native Unit (FMCG), and native.academy (Education), all working under one unified vision.",
    },
    {
      question: "What industries do you typically work with?",
      answer:
        "We work across B2B SaaS, FMCG, D2C, and enterprise brands. Our specialized brands adapt to your industry's specific GTM motions and compliance requirements.",
    },
    {
      question: "How long before we see results?",
      answer:
        "Most clients see measurable pipeline impact within 60–90 days. Full integration with our ecosystem typically reaches peak velocity by month 4–6.",
    },
    {
      question: "Do you work with early-stage startups?",
      answer:
        "We partner with growth-stage and scale-up companies that have product-market fit. If you're pre-revenue, our advisory retainer may be a better starting point.",
    },
  ],
  1: [
    {
      question:
        "We're an established FMCG brand—are we too traditional to work with you?",
      answer:
        "Not at all. Our Growth OS is modular. It adapts to legacy brand structures while modernizing execution, analytics, and decision flow.",
    },
    {
      question: "We already have multiple agencies. How does that affect fit?",
      answer:
        "We integrate with your existing agency stack. Our role is orchestration and accountability — ensuring all partners move toward the same north-star metric.",
    },
    {
      question: "How embedded does your team get in our operations?",
      answer:
        "As embedded as you need. We can operate as a silent layer or attend leadership stand-ups, depending on your pace and growth stage.",
    },
    {
      question: "What does day-to-day collaboration look like?",
      answer:
        "Dedicated Slack channel, weekly sprint reviews, monthly board-level reports, and async loom updates. You're never left wondering what's shipping.",
    },
  ],
  2: [
    {
      question: "What does pricing look like?",
      answer:
        "We offer tiered retainer models starting from a strategy-only advisory up to full Growth OS deployment. Pricing is scoped after an initial discovery call.",
    },
    {
      question: "Is there a minimum commitment period?",
      answer:
        "Our standard engagement is a 6-month minimum to allow the Growth OS to reach full operating velocity. Month-to-month arrangements are available for advisory.",
    },
    {
      question: "Do you charge performance fees?",
      answer:
        "Select engagements include a performance component tied to agreed KPIs. This aligns our incentives with your outcomes and keeps us fully accountable.",
    },
    {
      question: "Can we start with a smaller scope and scale up?",
      answer:
        "Absolutely. Many clients start with our Growth Audit, which then informs a phased rollout. You scale investment as you see results.",
    },
  ],
  3: [
    {
      question: "What does onboarding look like?",
      answer:
        "Week 1–2 is a deep-dive discovery sprint covering your GTM stack, team structure, and historic performance data. We deliver a full Growth Blueprint by week 3.",
    },
    {
      question: "How do you handle knowledge transfer?",
      answer:
        "Every process, playbook, and decision log lives in a shared workspace. Our goal is to make your team more capable, not dependent on us.",
    },
    {
      question: "What happens if we want to pause the engagement?",
      answer:
        "We build a 30-day wind-down period into all contracts. All assets, data, and documentation remain yours — no lock-in.",
    },
    {
      question: "How do you measure success?",
      answer:
        "We co-define 3–5 north-star metrics at kick-off and report against them weekly. If we're not moving the needle, you'll know before we do.",
    },
  ],
};

/* ─── MAIN SECTION ───────────────────────────────────────────────────────── */
/*
 * Figma FAQs root: flex, gap-80, items-start, size-full
 *
 * Frame4 (left col):  w-316, pt-32, overflow-clip, flex-col items-center
 *   Frame11: p leading-0 text-60px
 *     "Frequently" → Manrope Light 300, #8e8e8e, leading-1.12
 *     " "          → Manrope Regular 400, leading-1.12
 *     "Asked questions" → Manrope Bold 700, white, leading-1.12
 *
 * Frame15 (right col): flex-1, flex-col, gap-40, items-start, justify-center
 *   Frame16 (tabs): flex, gap-10, w-full
 *   Frame9 (FAQ list): flex-col, gap-10, w-full
 *
 * Responsive:
 *   Tablet (≤1023px): narrower left col, smaller gap
 *   Mobile (≤767px): stack left col above right col, tabs wrap
 */
export function FaqSection() {
  const [activeTab, setActiveTab] = useState(1); // index 1 = "Team & culture" active
  const [openIndex, setOpenIndex] = useState(0); // index 0 = first FAQ open by default

  const titleRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ["start 0.85", "end 0.3"],
  });
  /* 3 words: "Frequently", "Asked", "questions" */
  const WORD_COUNT = 3;
  const range = (i: number): [number, number] => [
    i / WORD_COUNT,
    (i + 1) / WORD_COUNT,
  ];

  const handleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section
      style={{ width: "100%", background: "#0a0a0a", padding: 0, overflow: "hidden" }}
    >
      {/* ── Container: max 1148px centered ── */}
      <div
        className="faq-container"
        style={{
          maxWidth: 1148,
          margin: "0 auto",
          display: "flex",
          gap: 80,
          alignItems: "flex-start",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* ═══════════════════════════════════════════════════════════════
         * LEFT COL — Frame4: w-316, pt-32, overflow-clip, flex-col items-center
         * ═══════════════════════════════════════════════════════════════ */}
        <div
          className="faq-left"
          style={{
            width: 316,
            flexShrink: 0,
            paddingTop: 32,
            overflow: "clip",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/*
           * Frame11: "Frequently Asked questions"
           * Outer p: leading-0 (= 0 line-height), text-60px, capitalize, w-full
           * Spans each carry their own leading-1.12 to establish line-height
           *
           * Typography hierarchy:
           *   "Frequently"      → Manrope Light (300), #8e8e8e, 60px
           *   " "               → Manrope Regular (400), white, 60px (space)
           *   "Asked questions" → Manrope Bold (700), white, 60px
           */}
          <div
            ref={titleRef}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <p
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: 60,
                lineHeight: 0,
                color: "white",
                textTransform: "capitalize",
                width: "100%",
                marginTop: 0,
                marginBottom: 0,
                position: "relative",
                flexShrink: 0,
              }}
            >
              {/* "Frequently" — Light 300, #8e8e8e */}
              <span
                style={{
                  fontWeight: 300,
                  lineHeight: 1.12,
                  color: "#8e8e8e",
                }}
              >
                <RevealWord progress={scrollYProgress} range={range(0)}>Frequently</RevealWord>
              </span>
              {/* space separator */}
              <span style={{ fontWeight: 400, lineHeight: 1.12 }}>{" "}</span>
              {/* "Asked questions" — Bold 700, white */}
              <span
                style={{
                  fontWeight: 700,
                  lineHeight: 1.12,
                  color: "white",
                }}
              >
                <RevealWord progress={scrollYProgress} range={range(1)}>Asked</RevealWord>
                {" "}
                <RevealWord progress={scrollYProgress} range={range(2)}>questions</RevealWord>
              </span>
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
         * RIGHT COL — Frame15: flex-1, flex-col, gap-40, items-start, justify-center
         * ═══════════════════════════════════════════════════════════════ */}
        <div
          className="faq-right"
          style={{
            flex: "1 0 0",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 40,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          {/* ── Frame16: Category tabs — layout-animated pill ── */}
          <div
            className="faq-tabs"
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            {TABS.map((tab, idx) => {
              const isActive = idx === activeTab;
              return (
                <motion.div
                  key={tab}
                  layout
                  onClick={() => {
                    setActiveTab(idx);
                    setOpenIndex(0); // always open first FAQ on tab switch
                  }}
                  style={{
                    flex: isActive ? "none" : "1 0 0",
                    minWidth: 1,
                    height: 43,
                    position: "relative",
                    borderRadius: 40,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: isActive ? "10px 24px" : 0,
                    boxSizing: "border-box",
                  }}
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                >
                  {/* Blue pill — morphs between tabs via layoutId */}
                  {isActive && (
                    <motion.div
                      layoutId="faq-tab-pill"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "#1b61db",
                        borderRadius: 40,
                      }}
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  {/* Border for inactive tabs */}
                  {!isActive && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        border: "1px solid #0b295c",
                        borderRadius: 40,
                        pointerEvents: "none",
                      }}
                    />
                  )}
                  <p
                    style={{
                      position: "relative",
                      zIndex: 1,
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: isActive ? 600 : 300,
                      fontSize: isActive ? 15 : 13,
                      color: "white",
                      whiteSpace: "nowrap",
                      lineHeight: "normal",
                      marginTop: 0,
                      marginBottom: 0,
                      transition: "font-size 0.22s ease",
                    }}
                  >
                    {tab}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* ── Frame9: FAQ accordion — entrance animation on tab switch ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  width: "100%",
                }}
              >
                {(FAQS_BY_TAB[activeTab] ?? FAQS).map((faq, idx) => (
                  <motion.div
                    key={`faq-${activeTab}-${idx}`}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 340,
                      damping: 26,
                      delay: idx * 0.07,
                    }}
                  >
                    <FaqItem
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={idx === openIndex}
                      onClick={() => handleAccordion(idx)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Responsive overrides ── */}
      <style>{`
        /* Add horizontal padding when viewport < 1148 */
        @media (max-width: 1147px) {
          .faq-container {
            padding: 0 24px !important;
          }
        }
        /* Tablet: narrow left col + reduce gap */
        @media (max-width: 1023px) {
          .faq-container {
            gap: 48px !important;
          }
          .faq-left {
            width: 240px !important;
            padding-top: 20px !important;
          }
        }
        /* Small tablet: 600–767px */
        @media (max-width: 767px) {
          .faq-container {
            flex-direction: column !important;
            gap: 32px !important;
            padding: 0 20px !important;
          }
          .faq-left {
            width: 100% !important;
            padding-top: 0 !important;
            overflow: visible !important;
          }
          /* Title smaller on mobile */
          .faq-left p {
            font-size: 44px !important;
          }
          /* Tabs wrap into 2 columns */
          .faq-tabs {
            flex-wrap: wrap !important;
            gap: 8px !important;
          }
          .faq-tabs > div {
            flex: 1 1 calc(50% - 4px) !important;
            min-width: 120px !important;
          }
        }
      `}</style>
    </section>
  );
}