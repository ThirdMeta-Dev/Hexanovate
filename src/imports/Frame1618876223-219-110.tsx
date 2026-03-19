import svgPaths from "./svg-arxttmd309";

function Frame() {
  return (
    <div className="bg-[#111] content-stretch flex items-center justify-center px-[16px] py-[6px] relative rounded-[40px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#414141] border-solid inset-0 pointer-events-none rounded-[40px]" />
      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#ffa600] text-[13px] whitespace-nowrap">Testimonials</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[298px]">
      <Frame />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[264px] relative shrink-0">
      <Frame11 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold items-center relative shrink-0 text-[80px] w-full">
      <p className="relative shrink-0 text-white w-[647px]">Growth Systems</p>
      <p className="relative shrink-0 text-[#1b61db] w-[851px]">Predictable Outcomes</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="capitalize content-stretch flex flex-col gap-[8px] items-center leading-[1.12] relative shrink-0 text-center w-full">
      <Frame12 />
      <p className="-translate-x-1/2 absolute font-['Manrope:Regular',sans-serif] font-normal left-[84.47px] text-[40px] text-white top-[35px] whitespace-nowrap">We Build</p>
      <p className="-translate-x-1/2 absolute font-['Manrope:Regular',sans-serif] font-normal left-[872.47px] text-[40px] text-white top-[35px] whitespace-nowrap">for</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame13 />
      <Frame3 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame4 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-[#1b61db] content-stretch flex items-center px-[24px] py-[12px] relative rounded-[30px] shrink-0">
      <p className="font-['Poppins:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">B2B ThirdMeta</p>
    </div>
  );
}

function DiagonalLeft() {
  return (
    <div className="absolute inset-[5%]" data-name="Diagonal Left">
      <div className="absolute inset-[-9.8%_-9.8%_-8.88%_-8.88%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.09 17.0901">
          <g id="Diagonal Left">
            <path d={svgPaths.pe61a680} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <div className="overflow-clip relative size-[16px]" data-name="Arrow">
      <DiagonalLeft />
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#1b61db] content-stretch flex items-center justify-center p-[12px] relative rounded-[30px] shrink-0 size-[48px]">
      <div className="flex items-center justify-center relative shrink-0 size-[16px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "22" } as React.CSSProperties}>
        <div className="-scale-y-100 flex-none rotate-90">
          <Arrow />
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame7 />
      <Frame5 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[#ffa600] content-stretch flex items-center px-[24px] py-[12px] relative rounded-[30px] shrink-0">
      <p className="font-['Poppins:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">FMCG/D2C</p>
    </div>
  );
}

function DiagonalLeft1() {
  return (
    <div className="absolute inset-[5%]" data-name="Diagonal Left">
      <div className="absolute inset-[-9.8%_-9.8%_-8.88%_-8.88%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.09 17.0901">
          <g id="Diagonal Left">
            <path d={svgPaths.pe61a680} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Arrow1() {
  return (
    <div className="overflow-clip relative size-[16px]" data-name="Arrow">
      <DiagonalLeft1 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[#ffa600] content-stretch flex items-center justify-center p-[12px] relative rounded-[30px] shrink-0 size-[48px]">
      <div className="flex items-center justify-center relative shrink-0 size-[16px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "22" } as React.CSSProperties}>
        <div className="-scale-y-100 flex-none rotate-90">
          <Arrow1 />
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame8 />
      <Frame6 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0">
      <Frame9 />
      <Frame10 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-end relative shrink-0 w-[659px]">
      <Frame1 />
      <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 223 1">
            <path d="M0 0.5H223" id="Vector 235" stroke="var(--stroke-0, #414141)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[52px] items-start relative shrink-0 w-full">
      <Frame2 />
      <Frame15 />
    </div>
  );
}

export default function Frame16() {
  return (
    <div className="content-stretch flex flex-col items-end justify-center relative size-full">
      <Frame14 />
    </div>
  );
}