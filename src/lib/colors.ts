export type Hsl = { h: number; s: number; l: number }

const wrap = (h: number) => ((h % 360) + 360) % 360
const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v))

export function hslToCss({ h, s, l }: Hsl): string {
  return `hsl(${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%)`
}

export function hexToHsl(hex: string): Hsl {
  const m = hex.replace("#", "")
  const r = parseInt(m.slice(0, 2), 16) / 255
  const g = parseInt(m.slice(2, 4), 16) / 255
  const b = parseInt(m.slice(4, 6), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return { h: 0, s: 0, l: l * 100 }
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
  else if (max === g) h = (b - r) / d + 2
  else h = (r - g) / d + 4
  return { h: h * 60, s: s * 100, l: l * 100 }
}

export function hslToHex(hsl: Hsl): string {
  const [r, g, b] = hslToRgb(hsl)
  return (
    "#" +
    [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")
  )
}

export function hslToRgb({ h, s, l }: Hsl): [number, number, number] {
  const sN = s / 100
  const lN = l / 100
  const c = (1 - Math.abs(2 * lN - 1)) * sN
  const hp = h / 60
  const x = c * (1 - Math.abs((hp % 2) - 1))
  let r = 0
  let g = 0
  let b = 0
  if (hp >= 0 && hp < 1) [r, g, b] = [c, x, 0]
  else if (hp < 2) [r, g, b] = [x, c, 0]
  else if (hp < 3) [r, g, b] = [0, c, x]
  else if (hp < 4) [r, g, b] = [0, x, c]
  else if (hp < 5) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]
  const m = lN - c / 2
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ]
}

export function harmony(base: Hsl): Hsl[] {
  return [
    { h: wrap(base.h + 30), s: base.s, l: base.l },
    { h: wrap(base.h - 30), s: base.s, l: base.l },
    { h: base.h, s: base.s, l: clamp(base.l + 18, 15, 92) },
    { h: base.h, s: base.s, l: clamp(base.l - 18, 12, 88) },
    {
      h: wrap(base.h + 120),
      s: clamp(base.s - 15, 25, 95),
      l: base.l,
    },
  ]
}

export function contrast(base: Hsl): Hsl[] {
  return [
    { h: wrap(base.h + 180), s: base.s, l: base.l },
    { h: wrap(base.h + 150), s: base.s, l: base.l },
    { h: wrap(base.h + 210), s: base.s, l: base.l },
    { h: wrap(base.h + 90), s: base.s, l: base.l },
    {
      h: base.h,
      s: base.s,
      l: clamp(100 - base.l, 15, 88),
    },
  ]
}

export type ThemeId =
  | "traditional1"
  | "traditional2"
  | "totoro"
  | "spirited"
  | "howl"
  | "mononoke"
  | "vivid"
  | "muted"

export type PaletteTheme = {
  id: ThemeId
  hexColors: string[]
}

export const PALETTE_THEMES: PaletteTheme[] = [
  // Traditional 1 — warm Korean traditional palette (red · yellow · earth)
  {
    id: "traditional1",
    hexColors: [
      // deep reds
      "#4C1E26", "#A52A48", "#C42C2E", "#DC4A55", "#D54A38", "#E64E5C",
      // pinks · rouge · earth red
      "#8B3D2E", "#6E3A33", "#BC4660", "#B0707C", "#C44D7B", "#E89BAE",
      // yellows · gold
      "#F5C236", "#F0C12C", "#C99932", "#D9CC78", "#B5763D", "#DDB046",
      // earth · cream
      "#8B5736", "#A07744", "#B58D5C", "#C0793A", "#F2C2CE", "#E8DDC2",
    ],
  },
  // Traditional 2 — cool Korean traditional palette (blue-green · purple · neutral)
  {
    id: "traditional2",
    hexColors: [
      // indigo · navy · sky
      "#2A3978", "#2C5DA0", "#1F2D52", "#2A4675", "#5E92B5", "#A6C9D0",
      // greens
      "#2B7A6E", "#2E6B3F", "#428953", "#44953F", "#88B055", "#9CAB45",
      // jade · moss · dark green
      "#95C0AB", "#3A8576", "#38734A", "#4E7A4C", "#1F3F2E", "#1A2840",
      // purples · neutrals
      "#5E2870", "#7B4A95", "#4D2950", "#524880", "#888888", "#1B1B1B",
    ],
  },
  {
    id: "totoro",
    hexColors: [
      "#BBDEFB", "#90CAF9", "#64B5F6", "#4FC3F7", "#B2DFDB", "#80CBC4",
      "#DCEDC8", "#AED581", "#9CCC65", "#689F38", "#558B2F", "#33691E",
      "#FFF3E0", "#FFE0B2", "#FFB74D", "#A1887F", "#6D4C41", "#4E342E",
      "#FFF9C4", "#FFEE58", "#FBC02D", "#E1BEE7", "#455A64", "#263238",
    ],
  },
  {
    id: "spirited",
    hexColors: [
      "#FFCDD2", "#EF9A9A", "#E57373", "#D84315", "#BF360C", "#8E2A0F",
      "#FFF8E1", "#FFE082", "#FFB300", "#F9A825", "#C99C3C", "#5D4037",
      "#C8E6C9", "#A5D6A7", "#66BB6A", "#2E7D32", "#1B5E20", "#004D40",
      "#E8D8C0", "#BCAAA4", "#6E3B23", "#4B2E1E", "#2E2E2E", "#1A1A1A",
    ],
  },
  {
    id: "howl",
    hexColors: [
      "#FCE4EC", "#F8BBD0", "#F48FB1", "#EC407A", "#C2185B", "#880E4F",
      "#F3E5F5", "#E1BEE7", "#CE93D8", "#AB47BC", "#7B1FA2", "#4A148C",
      "#E1F5FE", "#B3E5FC", "#81D4FA", "#80DEEA", "#4DD0E1", "#00ACC1",
      "#FBF1D9", "#FFF9C4", "#C5E1A5", "#DCEDC8", "#BDBDBD", "#5D4037",
    ],
  },
  {
    id: "mononoke",
    hexColors: [
      "#1B5E20", "#2E7D32", "#33691E", "#4E342E", "#3E2723", "#1A1A1A",
      "#689F38", "#8BC34A", "#AED581", "#C5E1A5", "#DCEDC8", "#F1F8E9",
      "#5D4037", "#6D4C41", "#8D6E63", "#BF360C", "#B71C1C", "#7F0000",
      "#607D8B", "#455A64", "#37474F", "#263238", "#9E9E9E", "#E0E0E0",
    ],
  },
  {
    id: "vivid",
    hexColors: [
      "#FF1744", "#FF5722", "#FF9100", "#FFC400", "#FFEB3B", "#CDDC39",
      "#76FF03", "#00E676", "#00E5FF", "#00B0FF", "#2979FF", "#3D5AFE",
      "#651FFF", "#D500F9", "#F50057", "#FF4081", "#FF6E40", "#FFAB00",
      "#00C853", "#00BCD4", "#FFD740", "#FFFFFF", "#424242", "#000000",
    ],
  },
  {
    id: "muted",
    hexColors: [
      "#B6A8A1", "#C7B9A8", "#D4C5AC", "#DDC9A5", "#C2B891", "#A09F88",
      "#A4B59C", "#8FA888", "#7E9B7D", "#5F8074", "#4F7B7A", "#4F6E70",
      "#88A0AE", "#9BA9BC", "#B0AABF", "#C8B4C4", "#C9A6BB", "#B58AA0",
      "#6B5D55", "#B8AB9F", "#E8E2DA", "#BFB8AF", "#95918D", "#2C2725",
    ],
  },
]

export const DEFAULT_THEME_ID: ThemeId = "traditional1"

export function themeColors(theme: PaletteTheme): Hsl[] {
  return theme.hexColors.map(hexToHsl)
}

export const DEFAULT_PALETTE: Hsl[] = themeColors(PALETTE_THEMES[0])
