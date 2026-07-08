import type { CapacitorConfig } from "@capacitor/cli"

// Points the WKWebView at the live production site instead of a bundled
// static export. Trade-off: requires network access, but content updates
// (new stories, copy fixes, bug fixes) ship instantly without an App Store
// resubmission — the right call for a content-driven app like this one.
const config: CapacitorConfig = {
  appId: "com.koreanfolktales.app",
  appName: "Korean Folktales",
  webDir: "capacitor-www",
  server: {
    url: "https://koreanfolktales.ink",
    cleartext: false,
  },
  ios: {
    contentInset: "automatic",
  },
}

export default config
