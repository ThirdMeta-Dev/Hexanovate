import imgFrame1618876110 from "@/assets/b2c2a05ac379979ca68fe1d5fde4df76497203c5.jpg";

function Frame1() {
  return <div className="h-[48px] shrink-0 w-full" />;
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
      <Frame1 />
    </div>
  );
}

export default function Frame2() {
  return (
    <div className="relative rounded-[20px] size-full">
      <div className="absolute backdrop-blur-[40px] inset-0 overflow-hidden pointer-events-none rounded-[20px]">
        <img alt="" className="absolute h-[113.8%] left-0 max-w-none top-[0.01%] w-full" src={imgFrame1618876110} />
      </div>
      <div className="content-stretch flex items-start justify-between overflow-clip pb-[36px] pt-[32px] px-[32px] relative rounded-[inherit] size-full">
        <div className="-translate-x-1/2 absolute bg-gradient-to-b from-[#090a0a] h-[171px] left-[calc(50%-0.17px)] to-[rgba(9,10,10,0)] top-0 w-[234px]" />
        <Frame />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}