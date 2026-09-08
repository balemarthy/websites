import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Bricolage_Grotesque, Lato, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import StickyCtaBar from "@/components/layout/StickyCtaBar";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-bricolage",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Embedded System Coach",
  description: "Coaching for early-career embedded engineers.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${lato.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-esc-paper pb-14 font-body text-esc-dark-teal sm:pb-16">
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
        <StickyCtaBar />
      </body>
    </html>
  );
}
