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
  title: "BVE",
  description: "Balemarthy Vamsi — career fluency, technical branding, and consulting for mid-career engineers.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${lato.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bve-canvas font-body text-bve-ink">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
