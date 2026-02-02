import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const svgPath = join(process.cwd(), "public", "clinica-san-gabriel-icon.svg");
  const svg = readFileSync(svgPath, "utf-8");
  const dataUri = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F9F1E6",
          borderRadius: 24,
        }}
      >
        <img src={dataUri} width={160} height={160} alt="" />
      </div>
    ),
    { ...size }
  );
}
