function Frame() {
  return (
    <div className="bg-[#111] content-stretch flex items-center justify-center px-[20px] py-[6px] relative rounded-[40px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#414141] border-solid inset-0 pointer-events-none rounded-[40px]" />
      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#ffa600] text-[13px] whitespace-nowrap">Education Domain Portfolio</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame />
    </div>
  );
}

function Frame3() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start ml-0 mt-0 pt-[20px] relative row-1 w-[274px]">
      <Frame2 />
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 w-full">
      <Frame3 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col h-[548px] items-start justify-between relative shrink-0 w-[274px]">
      <Group />
      <p className="capitalize font-['Manrope:Bold',sans-serif] font-bold leading-[0] min-w-full relative shrink-0 text-[0px] text-[44px] text-white w-[min-content]">
        <span className="leading-[1.44]">Education portfolio</span>
        <span className="leading-[1.44]">{` `}</span>
        <span className="font-['Manrope:Light',sans-serif] font-light leading-[1.44] text-[#8e8e8e]">dum</span>
      </p>
      <div className="absolute flex h-[245px] items-center justify-center left-[20px] top-[66.75px] w-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "22" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[245px]">
            <div className="absolute inset-[-0.5px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 245 1">
                <path d="M0 0.5H245" id="Vector 236" stroke="url(#paint0_linear_1_1337)" />
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_1337" x1="0" x2="245" y1="1" y2="1">
                    <stop stopColor="#414141" />
                    <stop offset="1" stopColor="#0A0A0A" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex font-['Manrope:SemiBold',sans-serif] font-semibold items-start justify-between leading-[32px] relative shrink-0 text-[20px] w-full whitespace-nowrap">
      <p className="relative shrink-0 text-white">Lorem ipsum is simply dummy</p>
      <p className="relative shrink-0 text-[#414141]">01</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <Frame16 />
      <p className="font-['Poppins:Light',sans-serif] leading-[23px] not-italic relative shrink-0 text-[#868686] text-[15px] w-full">We power discovery, engagement, and recall—where most purchase decisions</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-center relative shrink-0 w-[529.912px]">
      <div className="flex h-[308px] items-center justify-center relative shrink-0 w-[530px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="bg-[#585858] h-[530px] rounded-[12px] w-[308px]" />
        </div>
      </div>
      <Frame1 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0">
      <div className="flex h-[217px] items-center justify-center relative shrink-0 w-[347px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="bg-[#585858] h-[347px] rounded-[12px] w-[217px]" />
        </div>
      </div>
      <div className="flex h-[273px] items-center justify-center relative shrink-0 w-[436px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="bg-[#585858] h-[436px] rounded-[12px] w-[273px]" />
        </div>
      </div>
      <Frame15 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
      <p className="flex-[1_0_0] font-['Manrope:Medium',sans-serif] font-medium leading-[26px] min-h-px min-w-px relative text-[#414141] text-[15px]">{`Cracked Market Fit, But `}</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame8 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
      <ul className="block flex-[1_0_0] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[0] min-h-px min-w-px relative text-[16px] text-white">
        <li className="list-disc ms-[24px] whitespace-pre-wrap">
          <span className="leading-[26px]">Cracked Market Fit</span>
        </li>
      </ul>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame9 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
      <p className="flex-[1_0_0] font-['Manrope:Medium',sans-serif] font-medium leading-[26px] min-h-px min-w-px relative text-[#414141] text-[15px]">{`Cracked Market Fit, But `}</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame10 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
      <p className="flex-[1_0_0] font-['Manrope:Medium',sans-serif] font-medium leading-[26px] min-h-px min-w-px relative text-[#414141] text-[15px]">{`Cracked Market Fit, But `}</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame11 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[14px] items-start justify-center pb-[216px] relative size-full">
          <Frame5 />
          <div className="h-0 relative shrink-0 w-[115px]">
            <div className="absolute inset-[-0.5px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 115 1">
                <path d="M0 0.5H115" id="Vector 233" stroke="url(#paint0_linear_1_1390)" />
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_1390" x1="0" x2="115" y1="1" y2="1">
                    <stop stopColor="#414141" />
                    <stop offset="1" stopColor="#0A0A0A" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <Frame4 />
          <div className="h-0 relative shrink-0 w-[115px]">
            <div className="absolute inset-[-0.5px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 115 1">
                <path d="M0 0.5H115" id="Vector 233" stroke="url(#paint0_linear_1_1390)" />
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_1390" x1="0" x2="115" y1="1" y2="1">
                    <stop stopColor="#414141" />
                    <stop offset="1" stopColor="#0A0A0A" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <Frame6 />
          <div className="h-0 relative shrink-0 w-[115px]">
            <div className="absolute inset-[-0.5px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 115 1">
                <path d="M0 0.5H115" id="Vector 233" stroke="url(#paint0_linear_1_1390)" />
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_1390" x1="0" x2="115" y1="1" y2="1">
                    <stop stopColor="#414141" />
                    <stop offset="1" stopColor="#0A0A0A" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <Frame7 />
        </div>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex gap-[48px] items-end relative shrink-0 w-full">
      <Frame20 />
      <Frame18 />
      <div className="flex flex-[1_0_0] flex-row items-end self-stretch">
        <Frame12 />
      </div>
      <div className="absolute bg-gradient-to-b from-[#0a0a0a] h-[144px] left-[322px] to-[rgba(10,10,10,0)] top-[385.75px] w-[529px]" />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col items-end justify-end relative shrink-0 w-[1099.824px]">
      <Frame19 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col items-start justify-end overflow-clip relative shrink-0">
      <Frame14 />
    </div>
  );
}

export default function Frame13() {
  return (
    <div className="content-stretch flex flex-col items-start justify-end relative size-full">
      <Frame17 />
    </div>
  );
}