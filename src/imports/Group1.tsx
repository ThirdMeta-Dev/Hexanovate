import imgImage25 from "@/assets/2d3adea92049711e2578c76b97b58d05fe350d0d.jpg";

function Group2() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute h-[30.557px] left-0 top-0 w-[81.5px]" data-name="image 25">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[102.11%] left-0 max-w-none top-[-1.05%] w-[191.41%]" src={imgImage25} />
        </div>
      </div>
      <div className="absolute h-[17px] left-0 top-[8px] w-[15.5px]" data-name="image 95">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[183.53%] left-0 max-w-none top-[-48.95%] w-[1006.45%]" src={imgImage25} />
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute h-[30.557px] left-[81.5px] top-0 w-[74.5px]" data-name="image 25">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[102.11%] left-[-109.4%] max-w-none top-[-1.05%] w-[209.4%]" src={imgImage25} />
        </div>
      </div>
      <Group2 />
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <Group1 />
    </div>
  );
}