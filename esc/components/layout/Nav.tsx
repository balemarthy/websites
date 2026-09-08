"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";

const NAV_ITEMS = ["The Program", "Weekend Sessions", "Downloads", "About Me"];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-20 w-full">
      {/* Transparent header + gradient scrim at every breakpoint now — the hero canvas/photo
          sits behind the nav everywhere, not just on desktop. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-transparent"
      />
      <div className="relative mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-4 px-6 lg:px-16">
        <a href="#" className="relative h-11 w-[190px] shrink-0 overflow-hidden lg:h-12 lg:w-[210px]">
          <Image
            src="/images/logo/esc-logo-light.png"
            alt="ESC · Embedded System Coach"
            fill
            className="object-cover object-left"
            sizes="210px"
            priority
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href="#"
              className="font-body text-sm text-esc-paper transition-colors duration-base ease-standard hover:text-esc-orange"
            >
              {item}
            </a>
          ))}
        </nav>

        <Button
          variant="primary"
          href="#programs"
          className="hidden whitespace-nowrap md:inline-flex md:px-6 md:py-2.5 md:text-xs"
        >
          See The Programs
        </Button>

        {/* Mobile/tablet menu toggle — the CTA lives in the fixed bottom bar already, so
            the top nav only needs room for the logo and this on narrow screens. */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-esc-paper transition-colors duration-base ease-standard hover:text-esc-orange md:hidden"
        >
          {menuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
        </button>
      </div>

      {menuOpen && (
        <div className="relative flex flex-col gap-1 bg-esc-paper px-6 pb-6 pt-2 shadow-esc-lg md:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href="#"
              onClick={() => setMenuOpen(false)}
              className="font-body text-base text-esc-dark-teal transition-colors duration-base ease-standard hover:text-esc-orange"
              style={{ padding: "12px 0" }}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
