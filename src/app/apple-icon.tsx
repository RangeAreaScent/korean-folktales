import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage:
            "linear-gradient(180deg, #fffaf1 0%, #fdf0e0 55%, #fbe7d4 100%)",
          color: "#1f2937",
          fontFamily: "ui-serif, Georgia, serif",
          fontWeight: 700,
          flexDirection: "column",
          padding: 18,
        }}
      >
        <div
          style={{
            fontFamily: "ui-monospace, Menlo, monospace",
            fontSize: 12,
            letterSpacing: "0.32em",
            color: "#b76d2a",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Korean
        </div>
        <div
          style={{
            fontSize: 86,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: "#1f2937",
          }}
        >
          K
        </div>
        <div
          style={{
            fontFamily: "ui-monospace, Menlo, monospace",
            fontSize: 12,
            letterSpacing: "0.32em",
            color: "#b76d2a",
            textTransform: "uppercase",
            marginTop: 8,
          }}
        >
          Folktales
        </div>
      </div>
    ),
    { ...size },
  )
}
