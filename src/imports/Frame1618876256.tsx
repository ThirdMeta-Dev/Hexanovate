import svgPaths from "./svg-l3pheqbs3d";

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="capitalize font-['Manrope:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[0px] text-[48px] text-white w-full whitespace-pre-wrap">
        <p className="leading-[1.22] mb-0">{`We unlock scale `}</p>
        <p>
          <span className="leading-[1.22]">{`We’ve Got Your Ambition. `}</span>
          <span className="font-['Manrope:Regular',sans-serif] font-normal leading-[1.22] text-[#8e8e8e]">Now it’s Ours</span>
        </p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame2 />
    </div>
  );
}

function Frame9() {
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

function Frame7() {
  return (
    <div className="bg-[#1b61db] content-stretch flex items-center p-[16px] relative rounded-[30px] shrink-0">
      <div className="flex items-center justify-center relative shrink-0 size-[16px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-scale-y-100 flex-none rotate-90">
          <Arrow />
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex items-center relative shadow-[0px_4px_4px_0px_rgba(0,0,0,0.3)] shrink-0">
      <Frame9 />
      <Frame7 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-[#0e1f3d] content-stretch flex items-center px-[24px] py-[12px] relative rounded-[30px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#1b61db] border-solid inset-0 pointer-events-none rounded-[30px]" />
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

function Frame8() {
  return (
    <div className="bg-[#0e1f3d] content-stretch flex items-center p-[16px] relative rounded-[30px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#1b61db] border-solid inset-0 pointer-events-none rounded-[30px]" />
      <div className="flex items-center justify-center relative shrink-0 size-[16px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-scale-y-100 flex-none rotate-90">
          <Arrow1 />
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex items-center relative shadow-[0px_4px_4px_0px_rgba(0,0,0,0.29)] shrink-0">
      <Frame10 />
      <Frame8 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0">
      <Frame11 />
      <Frame12 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <Frame />
      <p className="font-['Poppins:Italic',sans-serif] italic leading-[0] min-w-full relative shrink-0 text-[#727272] text-[16px] w-[min-content]">
        <span className="leading-[25px] text-white">Same-week openings are limited.</span>
        <span className="leading-[25px]">{` Claim a slot today.`}</span>
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[60px] items-start min-h-px min-w-px relative">
      <Frame3 />
      <Frame27 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex h-[30px] items-center justify-center p-[6px] relative rounded-[49px] shrink-0 w-[29px]">
      <div aria-hidden="true" className="absolute border border-[#1b61db] border-solid inset-0 pointer-events-none rounded-[49px]" />
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#ffa600] text-[15px] text-right whitespace-nowrap">1</p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <Frame4 />
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[15px] text-right text-white whitespace-nowrap">Cracked Market Fit, But</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px min-w-px relative">
      <Frame20 />
      <p className="font-['Poppins:Light',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#747474] text-[15px] w-full whitespace-pre-wrap">{`what’s leaking conversion, retention,  lorem repeation growth`}</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-h-px min-w-px relative">
      <Frame13 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame16 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex h-[30px] items-center justify-center p-[6px] relative rounded-[49px] shrink-0 w-[29px]">
      <div aria-hidden="true" className="absolute border border-[#1b61db] border-solid inset-0 pointer-events-none rounded-[49px]" />
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#ffa600] text-[15px] text-right whitespace-nowrap">2</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <Frame5 />
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[15px] text-right text-white whitespace-nowrap">Cracked Market Fit, But</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px min-w-px relative">
      <Frame21 />
      <p className="font-['Poppins:Light',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#747474] text-[15px] w-full whitespace-pre-wrap">{`what’s leaking conversion, retention,  lorem repeation growth`}</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-h-px min-w-px relative">
      <Frame14 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame17 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex h-[30px] items-center justify-center p-[6px] relative rounded-[49px] shrink-0 w-[29px]">
      <div aria-hidden="true" className="absolute border border-[#1b61db] border-solid inset-0 pointer-events-none rounded-[49px]" />
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#ffa600] text-[15px] text-right whitespace-nowrap">3</p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <Frame6 />
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[15px] text-right text-white whitespace-nowrap">Cracked Market Fit, But</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px min-w-px relative">
      <Frame22 />
      <p className="font-['Poppins:Light',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#747474] text-[15px] w-full whitespace-pre-wrap">{`what’s leaking conversion, retention,  lorem repeation growth`}</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-h-px min-w-px relative">
      <Frame15 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame18 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <Frame23 />
      <Frame24 />
      <Frame25 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="backdrop-blur-[40px] bg-[rgba(0,0,0,0.6)] content-stretch flex flex-col gap-[36px] items-start pb-[44px] pt-[40px] px-[44px] relative rounded-[20px] shrink-0 w-[406px]">
      <div aria-hidden="true" className="absolute border border-[#0d1c35] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#ffa600] text-[15px] whitespace-nowrap">What are the next steps?</p>
      <div className="absolute flex h-[42.756px] items-center justify-center left-[238px] top-[43px] w-[36.631px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none">
          <div className="h-[37.425px] relative w-[20.69px]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.6904 37.4252">
              <path clipRule="evenodd" d={svgPaths.pb78800} fill="url(#paint0_linear_2104_224)" fillRule="evenodd" id="Vector" />
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2104_224" x1="-0.6591" x2="14.2723" y1="0.612256" y2="35.7567">
                  <stop stopColor="#050911" />
                  <stop offset="1" stopColor="#1B61DB" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <Frame28 />
    </div>
  );
}

export default function Frame26() {
  return (
    <div className="backdrop-blur-[50px] bg-[rgba(27,97,219,0.15)] content-stretch flex gap-[68px] items-start p-[48px] relative rounded-[30px] size-full">
      <div aria-hidden="true" className="absolute border border-[#0d1729] border-solid inset-0 pointer-events-none rounded-[30px]" />
      <div className="absolute flex h-[275px] items-center justify-center left-0 top-0 w-[1104px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="blur-[0px] h-[1104px] rounded-bl-[30px] rounded-tl-[30px] w-[275px]" style={{ backgroundImage: "linear-gradient(76.9202deg, rgba(27, 97, 219, 0.25) 0.14447%, rgba(27, 97, 219, 0) 53.962%)" }} />
        </div>
      </div>
      <div className="absolute flex h-[78px] items-center justify-center left-[793px] top-[347px] w-[311px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="blur-[0px] h-[311px] rounded-bl-[30px] w-[78px]" style={{ backgroundImage: "linear-gradient(76.8336deg, rgba(255, 166, 0, 0.2) 0.14447%, rgba(255, 166, 0, 0) 53.962%)" }} />
        </div>
      </div>
      <Frame1 />
      <Frame19 />
    </div>
  );
}