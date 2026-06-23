import { ImageResponse } from "next/og";

export const alt = "Royal Wealth Heritage LLC";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          background: "linear-gradient(135deg, #6e0f40 0%, #9b1459 50%, #c45c26 100%)",
          color: "white",
          padding: 60,
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#dfc156",
            marginBottom: 20,
          }}
        >
          Texas Registered
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            fontFamily: "serif",
            textAlign: "center",
            lineHeight: 1.15,
            marginBottom: 24,
          }}
        >
          Royal Wealth Heritage LLC
        </div>
        <div
          style={{
            fontSize: 28,
            textAlign: "center",
            opacity: 0.9,
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Empowering Growth · Building Independence · Creating Opportunity
        </div>
      </div>
    ),
    { ...size }
  );
}
