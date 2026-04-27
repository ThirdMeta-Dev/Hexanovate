const ALL_LOGOS = [
  "/logos/Frame-1618876056.svg",
  "/logos/Frame-1618876056-1.svg",
  "/logos/Frame-1618876057.svg",
  "/logos/Frame-1618876058.svg",
  "/logos/Frame-1618876058-1.svg",
  "/logos/Frame-1618876059.svg",
  "/logos/Frame-1618876060.svg",
  "/logos/Frame-1618876060-1.svg",
  "/logos/Frame-1618876061.svg",
  "/logos/Frame-1618876061-1.svg",
  "/logos/Frame-1618876062.svg",
  "/logos/Frame-1618876062-1.svg",
  "/logos/Frame-1618874328.svg",
  "/logos/Frame-1618874330.svg",
  "/logos/Frame-1618874331.svg",
  "/logos/Frame-1618874333.svg",
  "/logos/Frame-1618874333-1.svg",
  "/logos/Frame-1618874335.svg",
  "/logos/Frame-1618874336.svg",
  "/logos/Frame-1618874338.svg",
  "/logos/Frame-1618874339.svg",
  "/logos/Frame-1618874339-1.svg",
  "/logos/Frame-1618874340.svg",
  "/logos/Frame-1618874340-1.svg",
  "/logos/Frame-1618874341.svg",
];

function LogoBrand({ src }: { src: string }) {
  return (
    <div
      style={{
        width: 140,
        height: 56,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        alt=""
        src={src}
        style={{ width: 140, height: 56, objectFit: "contain", display: "block" }}
      />
    </div>
  );
}

export const BRAND_LOGOS = ALL_LOGOS.map(src => function BrandLogoItem() {
  return <LogoBrand src={src} />;
});
