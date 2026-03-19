import svgPaths from "./svg-es780rhwm6";

function KlearStackMonogram() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="KlearStack Monogram">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.0045 26.0007">
        <g id="KlearStack Monogram">
          <path clipRule="evenodd" d={svgPaths.p33a7a328} fill="var(--fill-0, #FABF5A)" fillRule="evenodd" id="K" />
          <path clipRule="evenodd" d={svgPaths.p3440b700} fill="var(--fill-0, #1873DE)" fillRule="evenodd" id="Arrow" />
        </g>
      </svg>
    </div>
  );
}

function MonogramWrapper() {
  return (
    <div className="bg-white content-stretch flex h-[40px] items-center justify-center pb-[9px] pt-[7px] px-[8px] relative rounded-[8px] shrink-0 w-[39px]" data-name="Monogram wrapper">
      <KlearStackMonogram />
    </div>
  );
}

export default function LogoWrapper() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative size-full" data-name="Logo wrapper">
      <MonogramWrapper />
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[0] not-italic relative shrink-0 text-[0px] text-[21px] text-white whitespace-nowrap">
        <span className="leading-[28px]">Klear</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[28px]">Stack</span>
      </p>
    </div>
  );
}
