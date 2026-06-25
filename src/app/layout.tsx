import type { Metadata } from "next";
import { Geist, Geist_Mono, Gowun_Batang } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { LocaleProvider } from "@/lib/i18n";
import { SoundProvider } from "@/lib/sound-provider";
import { LocaleToggle } from "@/components/LocaleToggle";
import { SoundToggle } from "@/components/SoundToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gowunBatang = Gowun_Batang({
  variable: "--font-gowun",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const SITE_URL = "https://koreanfolktales.ink"
const SITE_NAME = "Korean Folktales"
const SITE_TITLE = "Korean Folktales — Coloring Storybook for Kids"
const SITE_DESC =
  "Color real Korean folktales — eight stories, bilingual (한/EN), branching endings, free and printable. For kids, parents, and K-content lovers."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · Korean Folktales",
  },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  keywords: [
    "Korean folktales",
    "coloring book",
    "한국 전래동화",
    "색칠공부",
    "bilingual storybook",
    "kids activity",
    "K-content for kids",
    "printable coloring pages",
  ],
  authors: [{ name: SITE_NAME }],
  category: "education",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESC,
    locale: "en_US",
    alternateLocale: ["ko_KR"],
    // image auto-injected by src/app/opengraph-image.tsx (Next.js convention)
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
    // image auto-injected by Next.js convention
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "FN2UIhpj0nlnXmj4IgbOJQE6J1e6VvHxt0WhHlo83Cg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${gowunBatang.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocaleProvider>
          <SoundProvider>
            {children}
            <div className="pointer-events-none fixed top-3 right-3 z-50 flex items-center gap-2 lg:bottom-4 lg:right-4 lg:top-auto">
              <SoundToggle className="pointer-events-auto" />
              <LocaleToggle className="pointer-events-auto" />
            </div>
          </SoundProvider>
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
