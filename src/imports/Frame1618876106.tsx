import imgFrame1618876106 from "@/assets/cd0d3c71464504d6e4fd1662e5128b67cbe4dfdc.png";

export default function Frame() {
  return (
    <div className="relative rounded-[20px] size-full">
      <div className="absolute backdrop-blur-[40px] inset-0 overflow-hidden pointer-events-none rounded-[20px]">
        <img alt="" className="absolute h-[113.8%] left-0 max-w-none top-[0.07%] w-full" src={imgFrame1618876106} />
      </div>
      <div className="content-stretch flex items-start justify-between overflow-clip pb-[36px] pt-[32px] px-[32px] relative rounded-[inherit] size-full">
        <div className="absolute bg-gradient-to-b from-[#090a0a] h-[171px] left-0 to-[rgba(9,10,10,0)] top-0 w-[234px]" />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}