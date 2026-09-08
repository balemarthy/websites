import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import "./globals.css";

// PLACEHOLDER fonts (Inter + JetBrains Mono) — swap for real brand fonts
// once decided, following the same next/font self-hosting pattern as ESC.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "DNM",
  description: "Placeholder description — replace once brand copy is locked.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-dnm-canvas font-body text-dnm-ink">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
