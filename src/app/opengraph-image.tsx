import { ImageResponse } from "next/og"

export const alt =
  "Korean Folktales — Color real Korean folktales, bilingual & printable"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
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
          backgroundImage:
            "linear-gradient(180deg, #fffaf1 0%, #fdf0e0 55%, #fbe7d4 100%)",
          padding: "70px 80px",
          fontFamily: "ui-serif, Georgia, serif",
          color: "#1f2937",
          position: "relative",
        }}
      >
        <div
          style={{
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 26,
            letterSpacing: "0.34em",
            color: "#b76d2a",
            textTransform: "uppercase",
            marginBottom: 32,
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <span style={{ width: 50, height: 2, background: "#b76d2a" }} />
          <span>Korean Folktales</span>
          <span style={{ width: 50, height: 2, background: "#b76d2a" }} />
        </div>

        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            textAlign: "center",
            margin: 0,
            color: "#1f2937",
          }}
        >
          Color real
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            textAlign: "center",
            margin: 0,
            marginBottom: 32,
            color: "#1f2937",
          }}
        >
          Korean folktales.
        </div>

        <div
          style={{
            fontStyle: "italic",
            fontSize: 32,
            color: "#6b5d4a",
            marginBottom: 40,
            textAlign: "center",
          }}
        >
          8 stories · bilingual · printable · free
        </div>

        <div
          style={{
            display: "flex",
            gap: 26,
            fontSize: 52,
            marginBottom: 36,
          }}
        >
          <span>🐯</span>
          <span>🌊</span>
          <span>🦌</span>
          <span>👺</span>
          <span>👟</span>
          <span>🐢</span>
          <span>🪺</span>
          <span>🪓</span>
        </div>

        <div
          style={{
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 22,
            letterSpacing: "0.18em",
            color: "#9c8866",
          }}
        >
          koreanfolktales.ink
        </div>
      </div>
    ),
    { ...size },
  )
}
