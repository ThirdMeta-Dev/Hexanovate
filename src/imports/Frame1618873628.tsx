import svgPaths from "./svg-cy6d1ssxbk";
import imgPaybooksLogoHorizontalLight1 from "@/assets/a131b6de857eb2c01c3d2bc1476e7f8e39ad15ff.png";
import { imgVector, imgGroup, imgGroup1 } from "./svg-ysekj";

function Group3() {
  return (
    <div className="col-1 h-[29.538px] mask-position-[-5.461px_3.258px,_0px_-0.758px,_0px_0px] ml-0 mt-0 relative row-1 w-[20.545px]" data-name="Group" style={{ maskImage: `url('${imgVector}'), url('${imgGroup}'), url('${imgGroup1}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.5446 29.5381">
        <g id="Group">
          <path d={svgPaths.pc661a00} fill="url(#paint0_linear_2006_603)" id="Vector" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2006_603" x1="15.2701" x2="-3.84433" y1="15.4324" y2="15.4324">
            <stop stopColor="white" />
            <stop offset="1" stopColor="#89C341" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function ClipPathGroup2() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Clip path group">
      <Group3 />
    </div>
  );
}

function Group2() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-[2.5%] place-items-start relative row-1" data-name="Group">
      <ClipPathGroup2 />
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Clip path group">
      <Group2 />
    </div>
  );
}

function Group1() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid mix-blend-multiply ml-0 mt-0 place-items-start relative row-1" data-name="Group">
      <ClipPathGroup1 />
    </div>
  );
}

function Group() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[14.5%] mt-[-11.28%] place-items-start relative row-1" data-name="Group">
      <div className="col-1 h-[29.538px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.461px_3.258px] mask-size-[37.668px_35.578px] ml-0 mt-[0.76px] relative row-1 w-[20.545px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.5446 29.538">
          <path d={svgPaths.p37e87180} fill="var(--fill-0, #9ABD3B)" id="Vector" />
        </svg>
      </div>
      <Group1 />
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[20.89%] mt-[35.04%] place-items-start relative row-1" data-name="Clip path group">
      <Group />
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 ml-0 mt-0 relative row-1 size-[54.773px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54.7734 54.7734">
          <path d={svgPaths.p31be54f0} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <ClipPathGroup />
      <div className="col-1 h-[28.861px] ml-[16.91px] mt-[8.67px] relative row-1 w-[17.821px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.821 28.8613">
          <path d={svgPaths.p26857e80} fill="var(--fill-0, #B7D232)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[10px] h-[70px] items-center relative shrink-0">
      <Group4 />
      <div className="h-[60px] relative shrink-0 w-[105px]" data-name="Paybooks logo_Horizontal_light (1)">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-full left-[-67.66%] max-w-none top-0 w-[167.06%]" src={imgPaybooksLogoHorizontalLight1} />
        </div>
      </div>
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[39px] size-full">
      <Frame />
    </div>
  );
}