/**
 * BrandLogos.tsx — shared compact logo components (148 × 60px slots)
 * Used by LogoMarqueeSection (full size) and DemoFormSection (trusted brands strip).
 */
import imgImage212 from "@/assets/bda2b46a7404e07003bc523edf67001cfd71ce4d.png";
import imgImage25 from "@/assets/2d3adea92049711e2578c76b97b58d05fe350d0d.png";
import imgImage216 from "@/assets/b5a6ae84ac81f90355801c07a654b4ddeff7a307.png";
import imgImage211 from "@/assets/ec9f3ce9d899bf70e2291d8bb5a2449cfbea0db2.png";
import imgImage213 from "@/assets/521400233e6074875648780027ba03a58633b4d6.png";
import imgPaybooksLogoHorizontalLight1 from "@/assets/a131b6de857eb2c01c3d2bc1476e7f8e39ad15ff.png";
import imgElmoNega from "@/assets/9f84aaabf73edf8837949843d52521852059611f.png";
import imgImage215 from "@/assets/e770b8f7f0a4c6307225a1f4016b97084db4444e.png";
import svgPaths from "../../imports/svg-jl4fqzv8ja";
import { imgVector, imgGroup, imgGroup1 } from "../../imports/svg-tf7hb";

/* ── Slot wrapper — consistent 148×60 pill ─────────────────────────────── */
function Slot({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: 148,
        height: 60,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        background: "rgba(255,255,255,0.07)",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

/* ── Image-based logos ─────────────────────────────────────────────────── */
export function LogoBrandAcumen() {
  return (
    <Slot>
      <img alt="Acumen CMS" src={imgImage212} style={{ height: 28, width: "auto", maxWidth: 120, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
    </Slot>
  );
}

export function LogoBrandAppGallop() {
  return (
    <Slot>
      <img alt="App Gallop" src={imgImage25} style={{ height: 24, width: "auto", maxWidth: 120, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
    </Slot>
  );
}

export function LogoBrandEfax() {
  return (
    <Slot>
      <img alt="eFax" src={imgImage216} style={{ height: 24, width: "auto", maxWidth: 120, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
    </Slot>
  );
}

export function LogoBrandSplashtop() {
  return (
    <Slot>
      <img alt="Splashtop" src={imgImage211} style={{ height: 22, width: "auto", maxWidth: 120, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
    </Slot>
  );
}

export function LogoBrandColdman() {
  return (
    <Slot>
      <img alt="Coldman" src={imgImage213} style={{ height: 24, width: "auto", maxWidth: 120, objectFit: "contain" }} />
    </Slot>
  );
}

export function LogoBrandElmo() {
  return (
    <Slot>
      <img alt="Elmo" src={imgElmoNega} style={{ height: 30, width: "auto", maxWidth: 110, objectFit: "contain" }} />
    </Slot>
  );
}

export function LogoBrandWarehouse() {
  return (
    <Slot>
      <img alt="Warehouse" src={imgImage215} style={{ height: 34, width: "auto", maxWidth: 110, objectFit: "contain" }} />
    </Slot>
  );
}

/* ── Truin (SVG-based) ─────────────────────────────────────────────────── */
export function LogoBrandTruin() {
  return (
    <Slot>
      <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
        {/* icon */}
        <svg width="18" height="18" fill="none" viewBox="0 0 21.28 21.09">
          <path d={svgPaths.p17a13700} fill="#1531A9" />
          <path d={svgPaths.p3fa5de00} fill="white" />
          <path d={svgPaths.p3d9ce300} fill="white" />
          <path d={svgPaths.p1cc6be00} fill="#0086D3" />
        </svg>
        {/* text */}
        <svg width="62" height="18" fill="none" viewBox="0 0 77.75 21.43">
          <path d={svgPaths.p8fce100}  fill="white" />
          <path d={svgPaths.p3812f00}  fill="white" />
          <path d={svgPaths.p1b36aec0} fill="white" />
          <path d={svgPaths.p3c59b580} fill="white" />
          <path d={svgPaths.p219f2ca0} fill="#0086D3" />
          <path d={svgPaths.p27d06700} fill="#0086D3" />
        </svg>
      </div>
    </Slot>
  );
}

/* ── KlearStack (SVG-based) ────────────────────────────────────────────── */
export function LogoBrandKlearStack() {
  return (
    <Slot>
      <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
        {/* icon box */}
        <div style={{ background: "white", borderRadius: 6, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 26 26">
            <path clipRule="evenodd" d={svgPaths.p33a7a328} fill="#FABF5A" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p3440b700} fill="#1873DE" fillRule="evenodd" />
          </svg>
        </div>
        {/* text */}
        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14, color: "white", lineHeight: 1, whiteSpace: "nowrap" }}>
          Klear<span style={{ fontWeight: 400 }}>Stack</span>
        </span>
      </div>
    </Slot>
  );
}

/* ── Paybooks (image + icon) ───────────────────────────────────────────── */
export function LogoBrandPaybooks() {
  return (
    <Slot>
      <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
        {/* leaf icon condensed */}
        <div style={{ position: "relative", width: 28, height: 28, flexShrink: 0 }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} fill="none" viewBox="0 0 54.77 54.77">
            <path d={svgPaths.p31be54f0} fill="white" />
          </svg>
          <div
            style={{
              position: "absolute",
              top: "35%", left: "37%",
              width: "38%", height: "54%",
              maskImage: `url('${imgVector}')`,
              WebkitMaskImage: `url('${imgVector}')`,
              maskSize: "contain",
              maskRepeat: "no-repeat",
            }}
          >
            <svg style={{ width: "100%", height: "100%" }} fill="none" viewBox="0 0 20.54 29.54">
              <path d={svgPaths.p37e87180} fill="#9ABD3B" />
            </svg>
          </div>
          <div
            style={{
              position: "absolute",
              top: "30%", left: "31%",
              width: "33%", height: "53%",
              maskImage: `url('${imgVector}'), url('${imgGroup}'), url('${imgGroup1}')`,
              WebkitMaskImage: `url('${imgVector}'), url('${imgGroup}'), url('${imgGroup1}')`,
              maskSize: "contain",
              maskRepeat: "no-repeat",
            }}
          >
            <svg style={{ width: "100%", height: "100%" }} fill="none" viewBox="0 0 20.54 29.54">
              <defs>
                <linearGradient id="pb_grad_mini" x1="15.27" x2="-3.84" y1="15.43" y2="15.43" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="#89C341" />
                </linearGradient>
              </defs>
              <path d={svgPaths.pc661a00} fill="url(#pb_grad_mini)" />
            </svg>
          </div>
        </div>
        {/* Paybooks text image */}
        <div style={{ width: 70, height: 28, overflow: "hidden", position: "relative", flexShrink: 0 }}>
          <img
            alt="Paybooks"
            src={imgPaybooksLogoHorizontalLight1}
            style={{ position: "absolute", height: "100%", left: "-67.66%", width: "167.06%", top: 0 }}
          />
        </div>
      </div>
    </Slot>
  );
}

/* ── Master list — 10 logos for the trusted brands strip ──────────────── */
export const BRAND_LOGOS = [
  LogoBrandAcumen,
  LogoBrandAppGallop,
  LogoBrandEfax,
  LogoBrandSplashtop,
  LogoBrandColdman,
  LogoBrandTruin,
  LogoBrandKlearStack,
  LogoBrandPaybooks,
  LogoBrandElmo,
  LogoBrandWarehouse,
];
