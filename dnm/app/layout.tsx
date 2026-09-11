import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Bricolage_Grotesque, Lato, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
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
  title: "Digital Network Marketer",
  description:
    "A digital income system for working professionals — build a second income stream without quitting the day job.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${lato.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-dnm-canvas font-body text-dnm-ink-body">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
