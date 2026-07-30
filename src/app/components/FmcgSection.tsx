import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import { useCmsSectionContent } from "../context/CmsSectionContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const ACCENT = "#FFA600";
const INTRO_END = 0.16;

interface PortfolioMetric {
  value: string;
  label: string;
}

interface NativeUnitPortfolio {
  id: string;
  name: string;
  metrics: [PortfolioMetric, PortfolioMetric];
  images: string[];
}

const NATIVE_UNIT_PORTFOLIOS: NativeUnitPortfolio[] = [
  {
    id: "ajmal",
    name: "Ajmal",
    metrics: [
      { value: "18X", label: "ROAS" },
      { value: "388k", label: "Website clicks" },
    ],
    images: [
      "/portfolio/native-unit/ajmal/ajmal-01.png",
      "/portfolio/native-unit/ajmal/ajmal-02.png",
      "/portfolio/native-unit/ajmal/ajmal-03.png",
      "/portfolio/native-unit/ajmal/ajmal-04.png",
    ],
  },
  {
    id: "abk-grooming",
    name: "ABK Grooming",
    metrics: [
      { value: "22 Lacs+", label: "Sales in 3 months" },
      { value: "30%", label: "Returning customer rate" },
    ],
    images: [
      "/portfolio/native-unit/abk-grooming/abk-01.jpg",
      "/portfolio/native-unit/abk-grooming/abk-02.png",
      "/portfolio/native-unit/abk-grooming/abk-03.png",
      "/portfolio/native-unit/abk-grooming/abk-04.jpg",
      "/portfolio/native-unit/abk-grooming/abk-05.jpg",
      "/portfolio/native-unit/abk-grooming/abk-06.png",
    ],
  },
  {
    id: "mrs-foodrite",
    name: "Mrs. Foodrite",
    metrics: [
      { value: "400k", label: "Content Views in 1 month" },
      { value: "101%", label: "Audience growth" },
    ],
    images: [
      "/portfolio/native-unit/mrs-foodrite/foodrite-01.png",
      "/portfolio/native-unit/mrs-foodrite/foodrite-02.png",
      "/portfolio/native-unit/mrs-foodrite/foodrite-03.png",
      "/portfolio/native-unit/mrs-foodrite/foodrite-04.png",
      "/portfolio/native-unit/mrs-foodrite/foodrite-05.png",
      "/portfolio/native-unit/mrs-foodrite/foodrite-06.png",
    ],
  },
  {
    id: "warana",
    name: "Warana",
    metrics: [
      { value: "200%+", label: "Content interactions in 3 months" },
      { value: "233%+", label: "Profile visits" },
    ],
    images: [
      "/portfolio/native-unit/warana/warana-01.jpg",
      "/portfolio/native-unit/warana/warana-02.jpg",
      "/portfolio/native-unit/warana/warana-03.jpg",
      "/portfolio/native-unit/warana/warana-04.jpg",
      "/portfolio/native-unit/warana/warana-05.png",
      "/portfolio/native-unit/warana/warana-06.png",
      "/portfolio/native-unit/warana/warana-07.png",
    ],
  },
  {
    id: "indovill",
    name: "Indovill",
    metrics: [
      { value: "5.5X", label: "ROAS in 4 months" },
      { value: "1.1M", label: "Revenue Generated" },
    ],
    images: [
      "/portfolio/native-unit/indovill/indovill-02.png",
      "/portfolio/native-unit/indovill/indovill-03.png",
      "/portfolio/native-unit/indovill/indovill-04.jpg",
      "/portfolio/native-unit/indovill/indovill-05.png",
      "/portfolio/native-unit/indovill/indovill-06.png",
      "/portfolio/native-unit/indovill/indovill-07.jpg",
      "/portfolio/native-unit/indovill/indovill-08.jpg",
      "/portfolio/native-unit/indovill/indovill-09.jpg",
    ],
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function lerp(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

function easeInOut(progress: number) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

const IMAGE_HEIGHT_RATIOS: Record<string, number> = {
  "foodrite-01.png": 2099 / 1080,
  "foodrite-02.png": 1361 / 1080,
  "foodrite-03.png": 1105 / 1080,
  "foodrite-04.png": 1361 / 1080,
  "foodrite-05.png": 335 / 268,
  "foodrite-06.png": 643 / 513,
  "warana-01.jpg": 1350 / 1080,
  "warana-02.jpg": 1350 / 1080,
  "warana-03.jpg": 1350 / 1080,
  "warana-04.jpg": 1350 / 1082,
  "warana-06.png": 2099 / 1080,
  "warana-07.png": 2099 / 1080,
  "indovill-04.jpg": 628 / 1200,
};

function estimatedImageHeight(src: string) {
  const filename = src.split("/").pop() || "";
  return IMAGE_HEIGHT_RATIOS[filename] || 1;
}

function resolvePortfolios(items: Record<string, unknown>[]) {
  if (!items.length) return NATIVE_UNIT_PORTFOLIOS;

  return NATIVE_UNIT_PORTFOLIOS.map((portfolio) => {
    const item = items.find(
      (candidate) =>
        String(candidate.clientName || "").trim().toLowerCase() ===
        portfolio.name.toLowerCase(),
    );
    if (!item) return portfolio;

    const metric1Value = String(item.metric1Value || "").trim();
    const metric1Label = String(item.metric1Label || "").trim();
    const metric2Value = String(item.metric2Value || "").trim();
    const metric2Label = String(item.metric2Label || "").trim();

    return {
      ...portfolio,
      metrics: [
        {
          value: metric1Value || portfolio.metrics[0].value,
          label: metric1Label || portfolio.metrics[0].label,
        },
        {
          value: metric2Value || portfolio.metrics[1].value,
          label: metric2Label || portfolio.metrics[1].label,
        },
      ] as [PortfolioMetric, PortfolioMetric],
    };
  });
}

interface LightboxSelection {
  portfolioIndex: number;
  imageIndex: number;
}

function PortfolioLightbox({
  portfolios,
  selection,
  onClose,
  onChange,
}: {
  portfolios: NativeUnitPortfolio[];
  selection: LightboxSelection | null;
  onClose: () => void;
  onChange: (selection: LightboxSelection) => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selection) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      const portfolio = portfolios[selection.portfolioIndex];
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") {
        onChange({
          ...selection,
          imageIndex: (selection.imageIndex + 1) % portfolio.images.length,
        });
      }
      if (event.key === "ArrowLeft") {
        onChange({
          ...selection,
          imageIndex:
            (selection.imageIndex - 1 + portfolio.images.length) %
            portfolio.images.length,
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onChange, onClose, portfolios, selection]);

  if (!selection) return null;

  const portfolio = portfolios[selection.portfolioIndex];
  const image = portfolio.images[selection.imageIndex];
  const changeImage = (direction: -1 | 1) => {
    onChange({
      ...selection,
      imageIndex:
        (selection.imageIndex + direction + portfolio.images.length) %
        portfolio.images.length,
    });
  };

  const iconButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    padding: 0,
    border: "1px solid #3a3a3a",
    borderRadius: "50%",
    background: "rgba(10,10,10,.78)",
    color: "#fff",
    cursor: "pointer",
    fontFamily: "system-ui, sans-serif",
    fontSize: 25,
    lineHeight: 1,
  } as const;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${portfolio.name} portfolio image`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "72px 86px",
        background: "rgba(0,0,0,.92)",
      }}
    >
      <button
        ref={closeButtonRef}
        type="button"
        aria-label="Close image viewer"
        onClick={onClose}
        style={{
          ...iconButtonStyle,
          position: "absolute",
          top: 22,
          right: 24,
        }}
      >
        ×
      </button>

      <button
        type="button"
        aria-label="Previous portfolio image"
        onClick={() => changeImage(-1)}
        style={{
          ...iconButtonStyle,
          position: "absolute",
          left: 24,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        ‹
      </button>

      <ImageWithFallback
        src={image}
        alt={`${portfolio.name} portfolio creative ${selection.imageIndex + 1}`}
        style={{
          display: "block",
          maxWidth: "100%",
          maxHeight: "calc(100vh - 144px)",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          borderRadius: 12,
          boxShadow: "0 24px 80px rgba(0,0,0,.5)",
        }}
      />

      <button
        type="button"
        aria-label="Next portfolio image"
        onClick={() => changeImage(1)}
        style={{
          ...iconButtonStyle,
          position: "absolute",
          right: 24,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        ›
      </button>

      <div
        style={{
          position: "absolute",
          bottom: 22,
          left: "50%",
          transform: "translateX(-50%)",
          color: "#aaa",
          fontFamily: "Poppins, sans-serif",
          fontSize: 12,
          whiteSpace: "nowrap",
        }}
      >
        {portfolio.name} · {selection.imageIndex + 1} /{" "}
        {portfolio.images.length}
      </div>
    </div>
  );
}

function NativeUnitBadge() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        minHeight: 38,
        padding: "7px 18px",
        border: "1px solid #343434",
        borderRadius: 999,
        background: "#111",
        color: ACCENT,
        fontFamily: "Poppins, sans-serif",
        fontSize: 13,
        lineHeight: 1,
      }}
    >
      The Native Unit
    </span>
  );
}

function SectionHeading({
  heading,
  subheading,
  compact = false,
}: {
  heading: string;
  subheading: string;
  compact?: boolean;
}) {
  return (
    <div>
      <p
        style={{
          margin: 0,
          color: "#fff",
          fontFamily: "Manrope, sans-serif",
          fontSize: compact ? "clamp(30px, 7vw, 44px)" : "clamp(44px, 4vw, 62px)",
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: "-0.035em",
        }}
      >
        {heading}
      </p>
      <p
        style={{
          maxWidth: compact ? 620 : 760,
          margin: compact ? "10px 0 0" : "12px 0 0",
          color: "#777",
          fontFamily: "Manrope, sans-serif",
          fontSize: compact ? "clamp(22px, 5vw, 34px)" : "clamp(30px, 3vw, 46px)",
          fontWeight: 300,
          lineHeight: 1.2,
          letterSpacing: "-0.035em",
        }}
      >
        {subheading}
      </p>
    </div>
  );
}

function Metrics({
  metrics,
  compact = false,
}: {
  metrics: [PortfolioMetric, PortfolioMetric];
  compact?: boolean;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: compact ? "repeat(2, minmax(0, 1fr))" : "1fr",
        gap: compact ? 18 : 26,
      }}
    >
      {metrics.map((metric) => (
        <div key={`${metric.value}-${metric.label}`}>
          <p
            style={{
              margin: 0,
              color: ACCENT,
              fontFamily: "Manrope, sans-serif",
              fontSize: compact ? "clamp(29px, 7vw, 42px)" : "clamp(27px, 2.2vw, 38px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
            }}
          >
            {metric.value}
          </p>
          <p
            style={{
              margin: "7px 0 0",
              color: "#858585",
              fontFamily: "Poppins, sans-serif",
              fontSize: compact ? 12 : 13,
              fontWeight: 300,
              lineHeight: 1.5,
            }}
          >
            {metric.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function PortfolioNavigation({
  portfolios,
  activeIndex,
  onSelect,
}: {
  portfolios: NativeUnitPortfolio[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <nav aria-label="Native Unit portfolio clients">
      <div style={{ display: "flex", flexDirection: "column" }}>
        {portfolios.map((portfolio, index) => {
          const active = index === activeIndex;
          return (
            <button
              key={portfolio.id}
              type="button"
              aria-current={active ? "true" : undefined}
              onClick={() => onSelect(index)}
              style={{
                position: "relative",
                width: "100%",
                padding: "14px 8px 14px 24px",
                border: 0,
                borderBottom: "1px solid #222",
                background: "transparent",
                color: active ? "#fff" : "#555",
                cursor: "pointer",
                fontFamily: "Manrope, sans-serif",
                fontSize: 15,
                fontWeight: active ? 650 : 500,
                lineHeight: 1.35,
                textAlign: "left",
                transition: "color 180ms ease",
              }}
            >
              <motion.span
                aria-hidden="true"
                animate={{
                  scale: active ? 1 : 0,
                  opacity: active ? 1 : 0,
                }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 4,
                  width: 7,
                  height: 7,
                  marginTop: -3.5,
                  borderRadius: "50%",
                  background: ACCENT,
                }}
              />
              {portfolio.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function ContinuousPortfolioTrack({
  portfolios,
  galleryY,
  galleryRef,
  firstCardRef,
  onMarkerRef,
  onImageClick,
}: {
  portfolios: NativeUnitPortfolio[];
  galleryY: MotionValue<number>;
  galleryRef: RefObject<HTMLDivElement | null>;
  firstCardRef?: RefObject<HTMLElement | null>;
  onMarkerRef: (index: number, element: HTMLDivElement | null) => void;
  onImageClick: (portfolioIndex: number, imageIndex: number) => void;
}) {
  const columns = useMemo(() => {
    const nextColumns: {
      portfolio: NativeUnitPortfolio;
      portfolioIndex: number;
      imageIndex: number;
      src: string;
    }[][] = [[], [], []];
    const estimatedColumnHeights = [0.25, 0, 0.12];

    portfolios.forEach((portfolio, portfolioIndex) => {
      portfolio.images.forEach((src, imageIndex) => {
        const isFirstCard = portfolioIndex === 0 && imageIndex === 0;
        const columnIndex = isFirstCard
          ? 0
          : estimatedColumnHeights.indexOf(
              Math.min(...estimatedColumnHeights),
            );

        nextColumns[columnIndex].push({
          portfolio,
          portfolioIndex,
          imageIndex,
          src,
        });
        estimatedColumnHeights[columnIndex] += estimatedImageHeight(src) + 0.05;
      });
    });

    return nextColumns;
  }, [portfolios]);

  return (
    <motion.div
      ref={galleryRef}
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        alignItems: "start",
        gap: 18,
        y: galleryY,
        padding: "8px 0 40px",
        transformOrigin: "center top",
      }}
    >
      {columns.map((items, columnIndex) => (
        <div
          key={`continuous-column-${columnIndex}`}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            paddingTop: columnIndex === 0 ? 88 : columnIndex === 2 ? 42 : 0,
          }}
        >
          {items.map(({ portfolio, portfolioIndex, imageIndex, src }) => (
            <div
              key={`${portfolio.id}-${src}`}
              ref={
                portfolioIndex === 0 && imageIndex === 0
                  ? firstCardRef
                  : undefined
              }
              style={{ position: "relative", width: "100%" }}
            >
              {imageIndex === 0 && (
                <div
                  ref={(element) => onMarkerRef(portfolioIndex, element)}
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: -9,
                    left: 0,
                    width: 1,
                    height: 1,
                    pointerEvents: "none",
                  }}
                />
              )}
              <figure
                style={{
                  width: "100%",
                  margin: 0,
                  overflow: "hidden",
                  border: "1px solid #202020",
                  borderRadius: 14,
                  background: "#111",
                }}
              >
                <button
                  type="button"
                  aria-label={`Open ${portfolio.name} portfolio creative ${imageIndex + 1}`}
                  onClick={() => onImageClick(portfolioIndex, imageIndex)}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: 0,
                    border: 0,
                    background: "transparent",
                    cursor: "zoom-in",
                  }}
                >
                  <ImageWithFallback
                    src={src}
                    alt={`${portfolio.name} portfolio creative ${imageIndex + 1}`}
                    loading={portfolioIndex === 0 ? "eager" : "lazy"}
                    decoding="async"
                    style={{
                      display: "block",
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </button>
              </figure>
            </div>
          ))}
        </div>
      ))}
    </motion.div>
  );
}

function FullscreenIntro({
  progress,
  image,
  targetRef,
}: {
  progress: MotionValue<number>;
  image: string;
  targetRef: RefObject<HTMLElement | null>;
}) {
  const bounds = useRef({ top: 220, left: 660, width: 260, height: 300 });
  const left = useMotionValue(0);
  const top = useMotionValue(0);
  const width = useMotionValue(
    typeof window === "undefined" ? 1440 : window.innerWidth,
  );
  const height = useMotionValue(
    typeof window === "undefined" ? 900 : window.innerHeight,
  );
  const radius = useMotionValue(0);
  const opacity = useTransform(progress, [0.105, 0.14], [1, 0]);
  const display = useTransform(progress, (value) =>
    value >= 0.145 ? "none" : "block",
  );

  const measure = useCallback(() => {
    const target = targetRef.current;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    bounds.current = {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
  }, [targetRef]);

  useEffect(() => {
    const frame = requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    if (targetRef.current) observer.observe(targetRef.current);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useMotionValueEvent(progress, "change", (value) => {
    const transitionProgress = easeInOut(clamp(value / INTRO_END, 0, 1));
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const target = bounds.current;
    left.set(lerp(0, target.left, transitionProgress));
    top.set(lerp(0, target.top, transitionProgress));
    width.set(lerp(viewportWidth, target.width, transitionProgress));
    height.set(lerp(viewportHeight, target.height, transitionProgress));
    radius.set(lerp(0, 14, transitionProgress));
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        borderRadius: radius,
        overflow: "hidden",
        opacity,
        display,
        zIndex: 20,
        background: "#111",
        pointerEvents: "none",
      }}
    >
      <ImageWithFallback
        src={image}
        alt=""
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </motion.div>
  );
}

function DesktopPortfolio({
  portfolios,
  heading,
  subheading,
}: {
  portfolios: NativeUnitPortfolio[];
  heading: string;
  subheading: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryViewportRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLElement>(null);
  const clientMarkerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const clientMarkerOffsets = useRef<number[]>([]);
  const galleryOverflow = useRef(0);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] =
    useState<LightboxSelection | null>(null);
  const galleryTargetY = useMotionValue(0);
  const galleryY = useSpring(galleryTargetY, {
    stiffness: 150,
    damping: 28,
    mass: 0.35,
  });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const measureGallery = useCallback(() => {
    const gallery = galleryRef.current;
    galleryOverflow.current = Math.max(
      0,
      (gallery?.scrollHeight || 0) -
        (galleryViewportRef.current?.clientHeight || 0),
    );

    if (gallery) {
      const galleryTop = gallery.getBoundingClientRect().top;
      clientMarkerOffsets.current = clientMarkerRefs.current.map((marker) =>
        marker ? marker.getBoundingClientRect().top - galleryTop : 0,
      );
    }
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(measureGallery);
    const observer = new ResizeObserver(measureGallery);
    if (galleryRef.current) observer.observe(galleryRef.current);
    if (galleryViewportRef.current) observer.observe(galleryViewportRef.current);
    window.addEventListener("resize", measureGallery);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", measureGallery);
    };
  }, [activeIndex, measureGallery]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const portfolioProgress = clamp(
      (progress - INTRO_END) / (1 - INTRO_END),
      0,
      1,
    );
    const travelProgress = clamp(
      (portfolioProgress - 0.02) / 0.96,
      0,
      1,
    );
    const nextGalleryY = -galleryOverflow.current * travelProgress;
    galleryTargetY.set(nextGalleryY);

    const focusOffset =
      -nextGalleryY +
      (galleryViewportRef.current?.clientHeight || window.innerHeight) * 0.28;
    let nextIndex = 0;
    clientMarkerOffsets.current.forEach((offset, index) => {
      if (offset <= focusOffset) nextIndex = index;
    });

    if (nextIndex !== activeIndexRef.current) {
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    }
  });

  const selectPortfolio = useCallback(
    (index: number) => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = window.scrollY + section.getBoundingClientRect().top;
      const scrollableDistance = section.offsetHeight - window.innerHeight;
      const viewportLead =
        (galleryViewportRef.current?.clientHeight || window.innerHeight) * 0.18;
      const markerOffset =
        clientMarkerOffsets.current[index] ??
        (galleryOverflow.current * index) / portfolios.length;
      const travelProgress =
        galleryOverflow.current > 0
          ? clamp(
              (markerOffset - viewportLead) / galleryOverflow.current,
              0,
              1,
            )
          : 0;
      const portfolioProgress = 0.02 + travelProgress * 0.96;
      const targetProgress =
        INTRO_END + portfolioProgress * (1 - INTRO_END);
      window.scrollTo({
        top: sectionTop + scrollableDistance * targetProgress,
        behavior: "smooth",
      });
    },
    [portfolios.length],
  );

  const activePortfolio = portfolios[activeIndex];

  return (
    <section
      ref={sectionRef}
      aria-label="The Native Unit client portfolio"
      style={{
        position: "relative",
        width: "100%",
        height: "760vh",
        background: "#0a0a0a",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          background: "#0a0a0a",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            padding: "34px 36px 28px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateRows: "auto minmax(0, 1fr)",
              width: "min(1220px, 100%)",
              minHeight: 0,
              gap: 26,
            }}
          >
            <header
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 40,
              }}
            >
              <SectionHeading heading={heading} subheading={subheading} />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  paddingTop: 8,
                  flexShrink: 0,
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    width: 112,
                    height: 1,
                    background:
                      "linear-gradient(90deg, transparent, #353535)",
                  }}
                />
                <NativeUnitBadge />
              </div>
            </header>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "230px minmax(0, 1fr)",
                minHeight: 0,
                gap: 44,
              }}
            >
              <aside
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 0,
                  paddingBottom: 70,
                }}
              >
                <div>
                  <p
                    style={{
                      margin: "0 0 10px",
                      color: "#555",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: 11,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    Client portfolios
                  </p>
                  <PortfolioNavigation
                    portfolios={portfolios}
                    activeIndex={activeIndex}
                    onSelect={selectPortfolio}
                  />
                </div>
                <div
                  key={`${activePortfolio.id}-metrics`}
                >
                  <Metrics metrics={activePortfolio.metrics} />
                </div>
              </aside>

              <div
                ref={galleryViewportRef}
                style={{
                  position: "relative",
                  minWidth: 0,
                  minHeight: 0,
                  overflow: "hidden",
                  borderTop: "1px solid #222",
                }}
              >
                <ContinuousPortfolioTrack
                  portfolios={portfolios}
                  galleryY={galleryY}
                  galleryRef={galleryRef}
                  firstCardRef={firstCardRef}
                  onMarkerRef={(index, element) => {
                    clientMarkerRefs.current[index] = element;
                  }}
                  onImageClick={(portfolioIndex, imageIndex) =>
                    setSelectedImage({ portfolioIndex, imageIndex })
                  }
                />
                <div
                  style={{
                    position: "absolute",
                    right: 12,
                    bottom: 12,
                    zIndex: 6,
                    padding: "7px 10px",
                    border: "1px solid #2d2d2d",
                    borderRadius: 999,
                    background: "rgba(10,10,10,.8)",
                    color: "#858585",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: 11,
                  }}
                >
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(portfolios.length).padStart(2, "0")} ·{" "}
                  {activePortfolio.images.length} creatives
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <FullscreenIntro
          progress={scrollYProgress}
          image={portfolios[0].images[0]}
          targetRef={firstCardRef}
        />
      </div>
      <PortfolioLightbox
        portfolios={portfolios}
        selection={selectedImage}
        onClose={() => setSelectedImage(null)}
        onChange={setSelectedImage}
      />
    </section>
  );
}

function MobilePortfolio({
  portfolios,
  heading,
  subheading,
}: {
  portfolios: NativeUnitPortfolio[];
  heading: string;
  subheading: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] =
    useState<LightboxSelection | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const centerTab = useCallback((index: number) => {
    const tab = tabRefs.current[index];
    const container = tabsRef.current;
    if (!tab || !container) return;
    container.scrollTo({
      left: tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number(
          (visible.target as HTMLElement).dataset.portfolioIndex,
        );
        setActiveIndex(index);
        centerTab(index);
      },
      { rootMargin: "-24% 0px -55% 0px", threshold: [0.1, 0.35] },
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [centerTab]);

  const selectPortfolio = (index: number) => {
    setActiveIndex(index);
    centerTab(index);
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      aria-label="The Native Unit client portfolio"
      style={{
        width: "100%",
        padding: "56px 0 72px",
        background: "#0a0a0a",
      }}
    >
      <header style={{ padding: "0 20px 28px" }}>
        <NativeUnitBadge />
        <div style={{ marginTop: 22 }}>
          <SectionHeading
            heading={heading}
            subheading={subheading}
            compact
          />
        </div>
      </header>

      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          padding: "10px 0",
          borderBlock: "1px solid #202020",
          background: "rgba(10,10,10,.96)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          ref={tabsRef}
          className="native-unit-tabs"
          style={{
            display: "flex",
            gap: 9,
            overflowX: "auto",
            padding: "0 20px",
            scrollbarWidth: "none",
          }}
        >
          {portfolios.map((portfolio, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={portfolio.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                onClick={() => selectPortfolio(index)}
                style={{
                  flexShrink: 0,
                  padding: "9px 15px",
                  border: `1px solid ${active ? ACCENT : "#343434"}`,
                  borderRadius: 999,
                  background: active ? "rgba(255,166,0,.08)" : "#111",
                  color: active ? ACCENT : "#777",
                  cursor: "pointer",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: 12,
                  transition: "all 180ms ease",
                }}
              >
                {portfolio.name}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: "0 20px" }}>
        {portfolios.map((portfolio, portfolioIndex) => (
          <motion.article
            key={portfolio.id}
            ref={(element) => {
              sectionRefs.current[portfolioIndex] = element;
            }}
            data-portfolio-index={portfolioIndex}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              scrollMarginTop: 72,
              padding: "44px 0 54px",
              borderBottom:
                portfolioIndex < portfolios.length - 1
                  ? "1px solid #222"
                  : 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 20,
                marginBottom: 22,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  color: "#fff",
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "clamp(25px, 6vw, 34px)",
                  fontWeight: 650,
                  letterSpacing: "-0.025em",
                }}
              >
                {portfolio.name}
              </h3>
              <span
                style={{
                  color: "#5f5f5f",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: 11,
                  whiteSpace: "nowrap",
                }}
              >
                {portfolio.images.length} creatives
              </span>
            </div>

            <div style={{ marginBottom: 26 }}>
              <Metrics metrics={portfolio.metrics} compact />
            </div>

            <div
              className="native-unit-mobile-grid"
              style={{
                columnCount: 2,
                columnGap: 10,
              }}
            >
              {portfolio.images.map((src, imageIndex) => (
                <figure
                  key={src}
                  style={{
                    width: "100%",
                    margin: "0 0 10px",
                    breakInside: "avoid",
                    overflow: "hidden",
                    border: "1px solid #202020",
                    borderRadius: 10,
                    background: "#111",
                  }}
                >
                  <button
                    type="button"
                    aria-label={`Open ${portfolio.name} portfolio creative ${imageIndex + 1}`}
                    onClick={() =>
                      setSelectedImage({ portfolioIndex, imageIndex })
                    }
                    style={{
                      display: "block",
                      width: "100%",
                      padding: 0,
                      border: 0,
                      background: "transparent",
                      cursor: "zoom-in",
                    }}
                  >
                    <ImageWithFallback
                      src={src}
                      alt={`${portfolio.name} portfolio creative ${imageIndex + 1}`}
                      loading="lazy"
                      decoding="async"
                      style={{
                        display: "block",
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                      }}
                    />
                  </button>
                </figure>
              ))}
            </div>
          </motion.article>
        ))}
      </div>

      <PortfolioLightbox
        portfolios={portfolios}
        selection={selectedImage}
        onClose={() => setSelectedImage(null)}
        onChange={setSelectedImage}
      />

      <style>{`
        .native-unit-tabs::-webkit-scrollbar { display: none; }
        @media (max-width: 420px) {
          .native-unit-mobile-grid { column-count: 1; }
        }
      `}</style>
    </section>
  );
}

export function FmcgSection() {
  const { content, items } = useCmsSectionContent();
  const reduceMotion = useReducedMotion();
  const [isMobileTablet, setIsMobileTablet] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= 1024,
  );
  const portfolios = useMemo(() => resolvePortfolios(items), [items]);
  const heading = String(content.heading || "The Native Unit");
  const subheading = String(
    content.subheading || "Scale That Converts. From Shelf to Cart.",
  );

  useEffect(() => {
    const checkViewport = () => setIsMobileTablet(window.innerWidth <= 1024);
    window.addEventListener("resize", checkViewport, { passive: true });
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  if (isMobileTablet || reduceMotion) {
    return (
      <MobilePortfolio
        portfolios={portfolios}
        heading={heading}
        subheading={subheading}
      />
    );
  }

  return (
    <DesktopPortfolio
      portfolios={portfolios}
      heading={heading}
      subheading={subheading}
    />
  );
}
