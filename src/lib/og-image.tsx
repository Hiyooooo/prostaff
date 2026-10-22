import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";
import { BRAND } from "@/lib/brand";

export async function renderOg() {
  const fontRegular = await fs.readFile(
    path.join(process.cwd(), "src/assets/fonts/geist-mono-latin-400-normal.woff")
  );
  const fontMedium = await fs.readFile(
    path.join(process.cwd(), "src/assets/fonts/geist-mono-latin-500-normal.woff")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          backgroundColor: BRAND.black,
          color: BRAND.white,
          display: "flex",
          position: "relative",
          fontFamily: '"Geist Mono"',
          padding: "72px",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        {/* Frame inset 24px */}
        <div
          style={{
            position: "absolute",
            top: "24px",
            left: "24px",
            right: "24px",
            bottom: "24px",
            border: `1px solid ${BRAND.line}`,
            display: "flex",
          }}
        />

        {/* 4 Corner Crosshairs */}
        <div style={{ position: "absolute", top: "16px", left: "16px", display: "flex", color: BRAND.white, fontSize: "16px", lineHeight: "16px" }}>+</div>
        <div style={{ position: "absolute", top: "16px", right: "16px", display: "flex", color: BRAND.white, fontSize: "16px", lineHeight: "16px" }}>+</div>
        <div style={{ position: "absolute", bottom: "16px", left: "16px", display: "flex", color: BRAND.white, fontSize: "16px", lineHeight: "16px" }}>+</div>
        <div style={{ position: "absolute", bottom: "16px", right: "16px", display: "flex", color: BRAND.white, fontSize: "16px", lineHeight: "16px" }}>+</div>

        {/* Top: Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: BRAND.white,
              marginRight: "12px",
            }}
          />
          <div
            style={{
              fontSize: "28px",
              fontWeight: 500,
              color: BRAND.white,
              letterSpacing: "-0.02em",
            }}
          >
            ProStaff
          </div>
        </div>

        {/* Center: Headline (3 lines) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "16px",
          }}
        >
          <div style={{ fontSize: "80px", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            Navigasi cepat.
          </div>
          <div style={{ fontSize: "80px", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            Layar bersih.
          </div>
          <div style={{ fontSize: "80px", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            Nol bloatware.
          </div>
        </div>

        {/* Bottom: Module bar & Domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex" }}>
            {["Library", "Perizinan", "Absensi", "Gaji", "Exam"].map((mod) => (
              <div
                key={mod}
                style={{
                  display: "flex",
                  border: `1px solid ${BRAND.line}`,
                  padding: "10px 18px",
                  fontSize: "22px",
                  fontWeight: 400,
                  color: BRAND.grayLight,
                  marginRight: "-1px",
                }}
              >
                {mod}
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 400,
              color: BRAND.grayLight,
              display: "flex",
            }}
          >
            prostaff.example
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Geist Mono",
          data: fontRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Geist Mono",
          data: fontMedium,
          weight: 500,
          style: "normal",
        },
      ],
    }
  );
}
