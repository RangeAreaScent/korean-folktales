#!/usr/bin/env node
/**
 * upscale-2x — batch upscale every PNG in a folder from N → 2N pixels.
 *
 * Usage:
 *   node scripts/upscale-2x.js "From Gemini/something"
 *   node scripts/upscale-2x.js "From Gemini/something" --inplace
 *
 * By default the upscaled files are written to a sibling "_2x" folder
 * so the originals are preserved. Pass --inplace to overwrite originals.
 *
 * Uses sharp's Lanczos3 resampling — sharper than bicubic and very good
 * at preserving black line-art on a white background. Adds a tiny final
 * sharpen pass so the line edges read crisply at 2048×2048.
 */
const fs = require("fs/promises")
const path = require("path")
const sharp = require("sharp")

async function main() {
  const args = process.argv.slice(2)
  const inplace = args.includes("--inplace")
  const folder = args.find((a) => !a.startsWith("--"))
  if (!folder) {
    console.error("Usage: node scripts/upscale-2x.js <folder> [--inplace]")
    process.exit(1)
  }

  const abs = path.resolve(folder)
  let entries
  try {
    entries = await fs.readdir(abs)
  } catch (err) {
    console.error(`Cannot read folder: ${abs}`)
    console.error(err.message)
    process.exit(1)
  }

  const pngs = entries.filter((e) => /\.png$/i.test(e))
  if (pngs.length === 0) {
    console.log(`No PNG files found in ${abs}`)
    return
  }

  const outDir = inplace ? abs : path.join(abs, "_2x")
  if (!inplace) await fs.mkdir(outDir, { recursive: true })

  console.log(`Found ${pngs.length} PNG${pngs.length > 1 ? "s" : ""} in ${abs}`)
  console.log(`Output → ${outDir}${inplace ? "  (overwriting)" : ""}\n`)

  for (const name of pngs) {
    const srcPath = path.join(abs, name)
    const dstPath = path.join(outDir, name)
    const buf = await fs.readFile(srcPath)
    const meta = await sharp(buf).metadata()
    const targetW = (meta.width ?? 0) * 2
    const targetH = (meta.height ?? 0) * 2
    if (!targetW || !targetH) {
      console.warn(`  skip ${name} (no dimensions)`)
      continue
    }
    await sharp(buf)
      .resize(targetW, targetH, {
        kernel: sharp.kernel.lanczos3,
        fit: "fill",
      })
      // Slight sharpen to crisp the upscaled line edges.
      .sharpen({ sigma: 0.6, m1: 0.5, m2: 1.5 })
      .png({ quality: 95, compressionLevel: 9 })
      .toFile(dstPath)
    console.log(
      `  ✓ ${name}  ${meta.width}×${meta.height} → ${targetW}×${targetH}`,
    )
  }

  console.log(`\nDone.`)
  if (!inplace) {
    console.log(`Upscaled files in: ${outDir}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
