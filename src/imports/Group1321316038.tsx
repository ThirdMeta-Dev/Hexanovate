import svgPaths from "./svg-0ilocjz4jv";

function Frame2() {
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

function Frame() {
  return (
    <div className="bg-[#1b61db] content-stretch flex items-center p-[16px] relative rounded-[30px] shrink-0">
      <div className="flex items-center justify-center relative shrink-0 size-[16px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "22" } as React.CSSProperties}>
        <div className="-scale-y-100 flex-none rotate-90">
          <Arrow />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute content-stretch flex items-center left-0 top-[394px] w-[223.008px]">
      <Frame2 />
      <Frame />
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#111] content-stretch flex items-center justify-center px-[20px] py-[6px] relative rounded-[40px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#414141] border-solid inset-0 pointer-events-none rounded-[40px]" />
      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#ffa600] text-[13px] whitespace-pre">{`FMCG  lorem`}</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[34px] relative shrink-0 text-[24px] text-white w-full">FMCG Lorem Ipsum</p>
      <p className="font-['Poppins:Light',sans-serif] leading-[26px] not-italic relative shrink-0 text-[#727272] text-[15px] w-full">We unlock scale by fixing what’s leaking: conversion, retention, repeat; so growth We power discovery</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[255px] items-start justify-between left-[33.88px] top-[87px] w-[452.357px]">
      <div className="absolute flex h-[199px] items-center justify-center left-[-33.88px] top-[-88px] w-[519px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="blur-[0px] h-[519px] rounded-bl-[30px] rounded-tl-[30px] w-[199px]" style={{ backgroundImage: "linear-gradient(83.3527deg, rgba(255, 166, 0, 0.25) 0%, rgba(255, 166, 0, 0) 70.187%)" }} />
        </div>
      </div>
      <Frame5 />
      <Frame4 />
      <div className="absolute h-[166px] left-[198.13px] top-[-60px] w-[287px]">
        <div className="absolute inset-[0_0_3.85%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 287 159.605">
            <path d={svgPaths.p22f70e80} fill="var(--fill-0, #252525)" id="Vector 227" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[166px] left-[198.13px] top-[-88px] w-[287px]">
        <div className="absolute inset-[0_0_3.85%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 287 159.605">
            <path d={svgPaths.p22f70e80} fill="var(--fill-0, #252525)" id="Vector 227" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <Frame3 />
      <div className="absolute h-[442px] left-0 top-0 w-[520px]" data-name="Subtract">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 520 442">
          <g data-figma-bg-blur-radius="50" id="Subtract">
            <mask fill="white" id="path-1-inside-1_108_196">
              <path d={svgPaths.pb1d3b00} />
            </mask>
            <path d={svgPaths.pb1d3b00} fill="url(#paint0_linear_108_196)" fillOpacity="0.8" />
            <path d={svgPaths.p2a0c73f2} fill="url(#paint1_linear_108_196)" fillOpacity="0.2" mask="url(#path-1-inside-1_108_196)" />
          </g>
          <defs>
            <clipPath id="bgblur_0_108_196_clip_path" transform="translate(50 50)">
              <path d={svgPaths.pb1d3b00} />
            </clipPath>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_108_196" x1="26.1036" x2="523.076" y1="26" y2="403.595">
              <stop stopColor="#0A0A0A" />
              <stop offset="1" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_108_196" x1="183.5" x2="308.5" y1="401" y2="272.5">
              <stop stopColor="#1B61DB" />
              <stop offset="1" stopColor="#0A0A0A" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <Frame1 />
    </div>
  );
}