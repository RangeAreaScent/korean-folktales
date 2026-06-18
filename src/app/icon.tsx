import { ImageResponse } from "next/og"

export const size = { width: 64, height: 64 }
export const contentType = "image/png"

export default function Icon() {
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
            "radial-gradient(circle at 30% 30%, #fff3d6 0%, #f4a85c 70%, #b76d2a 100%)",
          color: "#fffaf1",
          fontFamily: "ui-serif, Georgia, serif",
          fontWeight: 700,
          fontSize: 44,
          letterSpacing: "-0.04em",
          borderRadius: "50%",
        }}
      >
        K
      </div>
    ),
    { ...size },
  )
}
