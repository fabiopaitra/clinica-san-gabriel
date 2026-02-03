import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";
const SHARE_TAGLINE = "Oftalmologia em Colombo, PR - Exames e consultas";

export const alt = `Clínica San Gabriel - ${SHARE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          background: "linear-gradient(135deg, #f7efe6 0%, #f0e7dc 45%, #e9dfd3 100%)",
        }}
      >
        <div
          style={{
            width: 980,
            height: 430,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
            background: "#fffaf3",
            borderRadius: 56,
            boxShadow: "0 28px 70px rgba(94, 52, 25, 0.18)",
            border: "1px solid rgba(137, 57, 26, 0.08)",
          }}
        >
          <div
            style={{
              width: 220,
              height: 220,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f4e7d7",
              borderRadius: 56,
            }}
          >
            <img src={dataUri} width={180} height={180} alt="" />
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 600,
              color: "#6d2c13",
              letterSpacing: "0.3px",
              textAlign: "center",
              padding: "0 80px",
            }}
          >
            {SHARE_TAGLINE}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
