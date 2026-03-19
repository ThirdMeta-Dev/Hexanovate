import svgPaths from "./svg-05b6gm70yn";

function Group1() {
  return (
    <div className="absolute inset-[0_0_2.57%_25.24%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77.7534 21.4314">
        <g id="Group">
          <path d={svgPaths.p8fce100} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p3812f00} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p1b36aec0} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p3c59b580} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p219f2ca0} fill="var(--fill-0, #0086D3)" id="Vector_5" />
          <path d={svgPaths.p27d06700} fill="var(--fill-0, #0086D3)" id="Vector_6" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[4.13%_79.54%_0_0]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2832 21.0913">
        <g id="Group">
          <path d={svgPaths.p17a13700} fill="var(--fill-0, #1531A9)" id="Vector" />
          <path d={svgPaths.p3fa5de00} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p3d9ce300} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p1cc6be00} fill="var(--fill-0, #0086D3)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[0_0_0.01%_0]" data-name="Group">
      <Group1 />
      <Group2 />
    </div>
  );
}

function Layer() {
  return (
    <div className="absolute contents inset-[0_0_0.01%_0]" data-name="Layer 1">
      <Group />
    </div>
  );
}

export default function LogoActual() {
  return (
    <div className="relative size-full" data-name="Logo Actual 1">
      <Layer />
    </div>
  );
}
