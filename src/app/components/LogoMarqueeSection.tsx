import imgImage212 from "@/assets/bda2b46a7404e07003bc523edf67001cfd71ce4d.jpg";
import imgImage25 from "@/assets/2d3adea92049711e2578c76b97b58d05fe350d0d.jpg";
import imgImage216 from "@/assets/b5a6ae84ac81f90355801c07a654b4ddeff7a307.jpg";
import imgImage211 from "@/assets/ec9f3ce9d899bf70e2291d8bb5a2449cfbea0db2.jpg";
import imgImage213 from "@/assets/521400233e6074875648780027ba03a58633b4d6.jpg";
import imgPaybooksLogoHorizontalLight1 from "@/assets/a131b6de857eb2c01c3d2bc1476e7f8e39ad15ff.jpg";
import imgElmoNega from "@/assets/9f84aaabf73edf8837949843d52521852059611f.jpg";
import imgImage215 from "@/assets/e770b8f7f0a4c6307225a1f4016b97084db4444e.jpg";
import svgPaths from "../../imports/svg-jl4fqzv8ja";
import { imgVector, imgGroup, imgGroup1 } from "../../imports/svg-tf7hb";
import { useState, useEffect } from "react";

/* ─── CSS keyframes ─────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────────────────────
   EXACT Figma frame logo components — sizes, colors, positioning unchanged
   ───────────────────────────────────────────────────────────────────────────── */

/* Frame3 — Acumen CMS */
function LogoAcumen() {
  return (
    <div style={{ width: 216, height: 80, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <img alt="Acumen CMS" src={imgImage212} style={{ height: 48, width: "auto", maxWidth: 160, objectFit: "contain", display: "block", filter: "brightness(0) invert(1)" }} />
    </div>
  );
}

/* Frame5 — App Gallop */
function LogoAppGallop() {
  return (
    <div style={{ width: 216, height: 80, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <img alt="App Gallop" src={imgImage25} style={{ height: 36, width: "auto", maxWidth: 160, objectFit: "contain", display: "block", filter: "brightness(0) invert(1)" }} />
    </div>
  );
}

/* Frame6 — eFax */
function LogoEfax() {
  return (
    <div style={{ width: 216, height: 80, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <img alt="eFax" src={imgImage216} style={{ height: 36, width: "auto", maxWidth: 160, objectFit: "contain", display: "block", filter: "brightness(0) invert(1)" }} />
    </div>
  );
}

/* Frame2 — Splashtop */
function LogoSplashtop() {
  return (
    <div style={{ width: 216, height: 80, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <img alt="Splashtop" src={imgImage211} style={{ height: 36, width: "auto", maxWidth: 160, objectFit: "contain", display: "block", filter: "brightness(0) invert(1)" }} />
    </div>
  );
}

/* Frame4 — Dots / Coldman */
function LogoDots() {
  return (
    <div style={{ width: 216, height: 80, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <img alt="Coldman" src={imgImage213} style={{ height: 36, width: "auto", maxWidth: 160, objectFit: "contain", display: "block" }} />
    </div>
  );
}

/* Frame8 — Truin */
function LogoTruin() {
  return (
    <div className="content-stretch flex flex-col h-[80px] items-center justify-center px-[34px] py-[21px] relative rounded-[16px] shrink-0 w-[216px]">
      <div className="h-[22px] overflow-clip relative shrink-0 w-[104px]">
        <div className="absolute contents inset-[0_0_0.01%_0]">
          <div className="absolute contents inset-[0_0_0.01%_0]">
            {/* text part */}
            <div className="absolute inset-[0_0_2.57%_25.24%]">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77.7534 21.4314">
                <path d={svgPaths.p8fce100}  fill="white" />
                <path d={svgPaths.p3812f00}  fill="white" />
                <path d={svgPaths.p1b36aec0} fill="white" />
                <path d={svgPaths.p3c59b580} fill="white" />
                <path d={svgPaths.p219f2ca0} fill="#0086D3" />
                <path d={svgPaths.p27d06700} fill="#0086D3" />
              </svg>
            </div>
            {/* icon part */}
            <div className="absolute inset-[4.13%_79.54%_0_0]">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2832 21.0913">
                <path d={svgPaths.p17a13700} fill="#1531A9" />
                <path d={svgPaths.p3fa5de00} fill="white" />
                <path d={svgPaths.p3d9ce300} fill="white" />
                <path d={svgPaths.p1cc6be00} fill="#0086D3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Frame10 — KlearStack */
function LogoKlearStack() {
  return (
    <div className="content-stretch flex flex-col h-[80px] items-center justify-center px-[30px] py-[22px] relative rounded-[16px] shrink-0 w-[216px]">
      <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
        <div className="bg-white content-stretch flex h-[40px] items-center justify-center pb-[9px] pt-[7px] px-[8px] relative rounded-[8px] shrink-0 w-[39px]">
          <div className="relative shrink-0 size-[26px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.0045 26.0007">
              <path clipRule="evenodd" d={svgPaths.p33a7a328} fill="#FABF5A" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p3440b700} fill="#1873DE" fillRule="evenodd" />
            </svg>
          </div>
        </div>
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[0] not-italic relative shrink-0 text-[0px] text-[21px] text-white whitespace-nowrap">
          <span className="leading-[28px]">Klear</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[28px]">Stack</span>
        </p>
      </div>
    </div>
  );
}

/* Frame9 — Paybooks */
function LogoPaybooks() {
  return (
    <div className="content-stretch flex flex-col h-[80px] items-center justify-center px-[42px] py-[22px] relative rounded-[16px] shrink-0 w-[216px]">
      <div className="content-stretch flex gap-[10px] h-[70px] items-center relative shrink-0">
        {/* leaf icon */}
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
          {/* outer circle */}
          <div className="col-1 ml-0 mt-0 relative row-1 size-[54.773px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54.7734 54.7734">
              <path d={svgPaths.p31be54f0} fill="white" />
            </svg>
          </div>
          {/* leaf overlay */}
          <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[20.89%] mt-[35.04%] place-items-start relative row-1">
            <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[14.5%] mt-[-11.28%] place-items-start relative row-1">
              <div
                className="col-1 h-[29.538px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.461px_3.258px] mask-size-[37.668px_35.578px] ml-0 mt-[0.76px] relative row-1 w-[20.545px]"
                style={{ maskImage: `url('${imgVector}')` }}
              >
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.5446 29.538">
                  <path d={svgPaths.p37e87180} fill="#9ABD3B" />
                </svg>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid mix-blend-multiply ml-0 mt-0 place-items-start relative row-1">
                <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
                  <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-[2.5%] place-items-start relative row-1">
                    <div
                      className="col-1 h-[29.538px] mask-position-[-5.461px_3.258px,_0px_-0.758px,_0px_0px] ml-0 mt-0 relative row-1 w-[20.545px]"
                      style={{ maskImage: `url('${imgVector}'), url('${imgGroup}'), url('${imgGroup1}')` }}
                    >
                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.5446 29.5381">
                        <path d={svgPaths.pc661a00} fill="url(#paint0_linear_paybooks)" />
                        <defs>
                          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_paybooks" x1="15.2701" x2="-3.84433" y1="15.4324" y2="15.4324">
                            <stop stopColor="white" />
                            <stop offset="1" stopColor="#89C341" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* stem */}
          <div className="col-1 h-[28.861px] ml-[16.91px] mt-[8.67px] relative row-1 w-[17.821px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.821 28.8613">
              <path d={svgPaths.p26857e80} fill="#B7D232" />
            </svg>
          </div>
        </div>
        {/* text logo */}
        <div className="h-[60px] relative shrink-0 w-[105px]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="Paybooks" className="absolute h-full left-[-67.66%] max-w-none top-0 w-[167.06%]" src={imgPaybooksLogoHorizontalLight1} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Frame11 — Elmo */
function LogoElmo() {
  return (
    <div className="content-stretch flex flex-col h-[80px] items-center justify-center px-[31px] py-[22px] relative rounded-[16px] shrink-0 w-[216px]">
      <div className="h-[42px] relative shrink-0 w-[110px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="Elmo" className="absolute h-[100.27%] left-[-9.04%] max-w-none top-[-0.13%] w-[117.91%]" src={imgElmoNega} />
        </div>
      </div>
    </div>
  );
}

/* Frame7 — Warehouse */
function LogoWarehouse() {
  return (
    <div className="content-stretch flex flex-col h-[80px] items-center justify-center px-[42px] py-[22px] relative rounded-[16px] shrink-0 w-[216px]">
      <div className="h-[58px] relative rounded-[8px] shrink-0 w-[138px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[8px]">
          <img alt="" className="absolute h-[195.65%] left-[2.26%] max-w-none top-[-49.57%] w-[95.65%]" src={imgImage215} />
        </div>
      </div>
    </div>
  );
}

/* ─── logo lists ─────────────────────────────────────────────────────────── */

const ROW1 = [LogoAcumen, LogoAppGallop, LogoEfax, LogoSplashtop, LogoDots];
const ROW2 = [LogoTruin, LogoKlearStack, LogoPaybooks, LogoElmo, LogoWarehouse];

/* ─── marquee row ─────────────────────────────────────────────────────────── */

function MarqueeRow({
  logos,
  dir,
  speed = 40,
  mobile = false,
}: {
  logos: React.ComponentType[];
  dir: "left" | "right";
  speed?: number;
  mobile?: boolean;
}) {
  // 2 copies → animate -50% = exactly 1 copy → seamless, no gap
  const copies = [0, 1];

  /*
   * Mobile: shrink each logo cell so exactly 3 fit in the visible viewport.
   * Each logo component is 216 × 80 px. We scale it down to 120 × 56 px,
   * with a tighter 10 px gap, so 3 tiles + 2 gaps ≈ 380 px (fits any phone).
   */
  const DESKTOP_W = 216;
  const DESKTOP_H = 80;
  const MOBILE_W  = 120;
  const MOBILE_H  = 56;
  const MOBILE_SCALE = MOBILE_W / DESKTOP_W; // ≈ 0.556

  const gap = mobile ? 10 : 24;

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
          logos.map((Logo, logoIdx) =>
            mobile ? (
              /* Scaled wrapper — constrains space to MOBILE_W×MOBILE_H px then
                 centres the full-size logo component inside via CSS transform */
              <div
                key={`${copyIdx}-${logoIdx}`}
                style={{
                  width: MOBILE_W,
                  height: MOBILE_H,
                  flexShrink: 0,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, -50%) scale(${MOBILE_SCALE})`,
                    transformOrigin: "center center",
                    width: DESKTOP_W,
                    height: DESKTOP_H,
                  }}
                >
                  <Logo />
                </div>
              </div>
            ) : (
              <Logo key={`${copyIdx}-${logoIdx}`} />
            )
          )
        )}
      </div>
    </div>
  );
}

/* ─── section ─────────────────────────────────────────────────────────────── */

export function LogoMarqueeSection() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 1024);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section style={{
      width: "100%",
      background: "#0a0a0a",
      overflow: "hidden",
      position: "relative",
      padding: isMobile ? "6px 0" : "8px 0",
    }}>
      <style>{CSS}</style>

      <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 20 : 40 }}>
        <MarqueeRow logos={ROW1} dir="left"  speed={40} mobile={isMobile} />
        <MarqueeRow logos={ROW2} dir="right" speed={40} mobile={isMobile} />
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