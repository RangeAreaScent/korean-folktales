import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16 blocks cross-origin requests to dev resources (HMR socket,
  // RSC payload streams, etc.) by default. When testing the dev server from
  // a phone/iPad on the same Wi-Fi we hit it by LAN IP, not localhost — the
  // request looks cross-origin and HMR/RSC get silently blocked, which makes
  // clicks register visually but state updates fail to hydrate. Allow common
  // LAN IP ranges + the explicit host the dev:lan script publishes.
  allowedDevOrigins: [
    "10.0.0.117",
    "10.0.0.*",
    "192.168.*.*",
    "172.16.*.*",
    "localhost",
    "*.local",
  ],

  // www has no canonical purpose here — redirect it to the apex domain so
  // Google indexes one URL instead of two identical copies (§7.1 HANDOFF).
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.koreanfolktales.ink" }],
        destination: "https://koreanfolktales.ink/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
