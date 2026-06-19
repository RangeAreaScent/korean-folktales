export type Rgb = [number, number, number]

export type FillStyle =
  | { kind: "solid"; color: Rgb }
  | { kind: "linear"; from: Rgb; to: Rgb }
  | { kind: "radial"; center: Rgb; edge: Rgb }

export type FloodFillHandle = {
  done: Promise<"completed" | "cancelled">
  cancel: () => void
}

function isLineLike(data: Uint8ClampedArray, i: number): boolean {
  return data[i] < 110 && data[i + 1] < 110 && data[i + 2] < 110
}

function colorDistanceSq(
  data: Uint8ClampedArray,
  i: number,
  target: Rgb,
): number {
  const dr = data[i] - target[0]
  const dg = data[i + 1] - target[1]
  const db = data[i + 2] - target[2]
  return dr * dr + dg * dg + db * db
}

function lerp(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * t)
}

function lerpRgb(a: Rgb, b: Rgb, t: number): Rgb {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
}

function representativeColor(style: FillStyle): Rgb {
  if (style.kind === "solid") return style.color
  if (style.kind === "linear") return lerpRgb(style.from, style.to, 0.5)
  return style.edge
}

export function floodFill(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  startX: number,
  startY: number,
  style: FillStyle,
  options: {
    tolerance?: number
    animateMs?: number
    maxFillRatio?: number
    onLeak?: (ratio: number) => void
  } = {},
): FloodFillHandle | null {
  const tolerance = options.tolerance ?? 60
  const animateMs = options.animateMs ?? 0
  // If a single fill would cover more than this fraction of the canvas,
  // the line art almost certainly has a gap and the fill is escaping the
  // intended region. Bail out before painting so the user can undo and try
  // a different click.
  const maxFillRatio = options.maxFillRatio ?? 0.55

  const sx = Math.floor(startX)
  const sy = Math.floor(startY)
  if (sx < 0 || sy < 0 || sx >= width || sy >= height) return null

  const img = ctx.getImageData(0, 0, width, height)
  const data = img.data
  const startIdx = (sy * width + sx) * 4
  if (isLineLike(data, startIdx)) return null

  const startColor: Rgb = [
    data[startIdx],
    data[startIdx + 1],
    data[startIdx + 2],
  ]

  if (style.kind === "solid") {
    const f = style.color
    if (
      Math.abs(startColor[0] - f[0]) < 2 &&
      Math.abs(startColor[1] - f[1]) < 2 &&
      Math.abs(startColor[2] - f[2]) < 2
    ) {
      return null
    }
  }

  const isWhiteish =
    startColor[0] > 230 && startColor[1] > 230 && startColor[2] > 230
  const effectiveTolerance = isWhiteish ? tolerance : 220
  const tolSq = effectiveTolerance * effectiveTolerance

  const visited = new Uint8Array(width * height)
  const stack: number[] = [sx, sy]

  let minX = sx
  let minY = sy
  let maxX = sx
  let maxY = sy
  let visitedCount = 0

  while (stack.length) {
    const y = stack.pop()!
    const x = stack.pop()!
    if (x < 0 || y < 0 || x >= width || y >= height) continue
    const pix = y * width + x
    if (visited[pix]) continue
    const i = pix * 4
    if (isLineLike(data, i)) continue
    if (colorDistanceSq(data, i, startColor) > tolSq) continue

    visited[pix] = 1
    visitedCount++
    if (x < minX) minX = x
    if (x > maxX) maxX = x
    if (y < minY) minY = y
    if (y > maxY) maxY = y

    stack.push(x + 1, y)
    stack.push(x - 1, y)
    stack.push(x, y + 1)
    stack.push(x, y - 1)
  }

  // ─── Leak detection: bail if fill engulfed too much of the canvas ───
  const ratio = visitedCount / (width * height)
  if (ratio > maxFillRatio) {
    options.onLeak?.(ratio)
    return null
  }

  // Center for radial / linear gradient eval
  const cx = style.kind === "radial" ? sx : (minX + maxX) / 2
  const cy = style.kind === "radial" ? sy : (minY + maxY) / 2
  const maxRadial = Math.max(
    1,
    Math.hypot(minX - cx, minY - cy),
    Math.hypot(maxX - cx, minY - cy),
    Math.hypot(minX - cx, maxY - cy),
    Math.hypot(maxX - cx, maxY - cy),
  )
  const vRange = Math.max(1, maxY - minY)

  function colorAt(x: number, y: number): Rgb {
    if (style.kind === "solid") return style.color
    if (style.kind === "linear") {
      const t = (y - minY) / vRange
      return lerpRgb(style.from, style.to, t)
    }
    const d = Math.hypot(x - cx, y - cy) / maxRadial
    return lerpRgb(style.center, style.edge, Math.min(1, d))
  }

  const isSolid = style.kind === "solid"
  const solidColor = isSolid ? (style as { color: Rgb }).color : null

  function paintPix(pix: number) {
    const i = pix * 4
    if (isSolid && solidColor) {
      data[i] = solidColor[0]
      data[i + 1] = solidColor[1]
      data[i + 2] = solidColor[2]
    } else {
      const x = pix % width
      const y = (pix / width) | 0
      const c = colorAt(x, y)
      data[i] = c[0]
      data[i + 1] = c[1]
      data[i + 2] = c[2]
    }
    data[i + 3] = 255
  }

  function finalize() {
    blendLineEdges(data, width, height, visited, representativeColor(style))
    ctx.putImageData(img, 0, 0)
  }

  // ─── No animation: paint everything at once ───
  if (animateMs <= 0) {
    let anyPainted = false
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const pix = y * width + x
        if (!visited[pix]) continue
        paintPix(pix)
        anyPainted = true
      }
    }
    if (!anyPainted) return null
    finalize()
    return {
      done: Promise.resolve<"completed" | "cancelled">("completed"),
      cancel: () => {},
    }
  }

  // ─── Bucket pixels into distance rings from (sx, sy) ───
  const rings: number[][] = []
  let totalVisited = 0
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const pix = y * width + x
      if (!visited[pix]) continue
      const d = Math.round(Math.hypot(x - sx, y - sy))
      if (!rings[d]) rings[d] = []
      rings[d].push(pix)
      totalVisited++
    }
  }
  if (totalVisited === 0) return null
  const maxRing = rings.length - 1

  // ─── Animation loop ───
  let cancelled = false
  let lastRingPainted = -1
  let rafId = 0
  let resolveDone: (s: "completed" | "cancelled") => void = () => {}
  const done = new Promise<"completed" | "cancelled">((r) => {
    resolveDone = r
  })

  const startTime = performance.now()

  function tick() {
    if (cancelled) {
      resolveDone("cancelled")
      return
    }
    const elapsed = performance.now() - startTime
    const t = Math.min(1, elapsed / animateMs)
    // Ease out for smoother feel (quadratic)
    const eased = 1 - (1 - t) * (1 - t)
    const ringTarget = Math.ceil(eased * maxRing)

    for (let r = lastRingPainted + 1; r <= ringTarget; r++) {
      const ring = rings[r]
      if (!ring) continue
      for (const pix of ring) paintPix(pix)
    }
    lastRingPainted = ringTarget

    ctx.putImageData(img, 0, 0)

    if (t >= 1) {
      finalize()
      resolveDone("completed")
      return
    }
    rafId = requestAnimationFrame(tick)
  }

  rafId = requestAnimationFrame(tick)

  return {
    done,
    cancel: () => {
      cancelled = true
      if (rafId) cancelAnimationFrame(rafId)
    },
  }
}

function blendLineEdges(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  visited: Uint8Array,
  fill: Rgb,
): void {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pix = y * width + x
      if (visited[pix]) continue
      const i = pix * 4
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      if (r > 220 && g > 220 && b > 220) continue
      if (r < 50 && g < 50 && b < 50) continue
      let touches = false
      if (x > 0 && visited[pix - 1]) touches = true
      else if (x < width - 1 && visited[pix + 1]) touches = true
      else if (y > 0 && visited[pix - width]) touches = true
      else if (y < height - 1 && visited[pix + width]) touches = true
      if (!touches) continue
      const lineWeight = 1 - (r + g + b) / (3 * 255)
      const fillWeight = 1 - lineWeight
      data[i] = Math.round(r * lineWeight + fill[0] * fillWeight)
      data[i + 1] = Math.round(g * lineWeight + fill[1] * fillWeight)
      data[i + 2] = Math.round(b * lineWeight + fill[2] * fillWeight)
    }
  }
}
