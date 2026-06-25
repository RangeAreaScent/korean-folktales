#!/usr/bin/env node
/**
 * dev:lan — launch Next.js dev bound to 0.0.0.0 so phones on the
 * same Wi-Fi can hit it. Prints the LAN URL + a scannable QR code
 * before handing control off to `next dev`.
 */
const os = require("os")
const { spawn } = require("child_process")
const qr = require("qrcode-terminal")

function getLanIp() {
  const ifaces = os.networkInterfaces()
  // Prefer en0 (Wi-Fi on macOS) when present; fall back to first non-internal IPv4.
  const order = ["en0", "en1", "eth0", "wlan0"]
  for (const name of order) {
    const list = ifaces[name]
    if (!list) continue
    for (const iface of list) {
      if (iface.family === "IPv4" && !iface.internal) return iface.address
    }
  }
  for (const name of Object.keys(ifaces)) {
    for (const iface of ifaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) return iface.address
    }
  }
  return null
}

const ip = getLanIp()
const port = process.env.PORT || "3000"

if (!ip) {
  console.error(
    "\n❌ Could not detect a LAN IP. Connect to Wi-Fi and try again.\n",
  )
  process.exit(1)
}

const lanUrl = `http://${ip}:${port}`

const dim = (s) => `\x1b[2m${s}\x1b[0m`
const bold = (s) => `\x1b[1m${s}\x1b[0m`
const amber = (s) => `\x1b[33m${s}\x1b[0m`

console.log("")
console.log(amber("📱 Mobile / iPad — scan this QR or open the URL:"))
console.log("")
qr.generate(lanUrl, { small: true })
console.log(`   ${bold(lanUrl)}`)
console.log("")
console.log(dim(`💻 Desktop → http://localhost:${port}`))
console.log(dim("   (Same Wi-Fi network required. macOS may prompt to allow Node.)"))
console.log("")

const child = spawn("next", ["dev", "-H", "0.0.0.0"], {
  stdio: "inherit",
  shell: true,
})
child.on("exit", (code) => process.exit(code ?? 0))
