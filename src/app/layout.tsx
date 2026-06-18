import type { Metadata } from "next";
import { Geist, Geist_Mono, Gowun_Batang } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Korean Folktales — A Coloring Storybook",
  description:
    "A bilingual coloring storybook of Korean folktales. Color each page, choose your path, and build your own picture book.",
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
      </body>
    </html>
  );
}
