import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";
import { CLINIC } from "@/lib/clinic-data";

export const alt = "Clínica San Gabriel - Oftalmologia em Colombo, PR";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const svgPath = join(process.cwd(), "public", "clinica-san-gabriel-logo.svg");
  const svg = readFileSync(svgPath, "utf-8");
  const dataUri = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #F9F1E6 0%, #f5ebe0 50%, #ede5da 100%)",
        }}
      >
        <img
          src={dataUri}
          width={500}
          height={135}
          alt=""
          style={{ objectFit: "contain" }}
        />
        <div
          style={{
            fontSize: 28,
            color: "#89391A",
            opacity: 0.9,
            marginTop: 24,
          }}
        >
          Oftalmologia em Colombo, PR
        </div>
      </div>
    ),
    { ...size }
  );
}
