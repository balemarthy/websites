import Image from "next/image";
import Button from "@/components/ui/Button";

const NAV_ITEMS = ["The Program", "Sessions", "Results", "About"];

export default function Nav() {
  return (
    <header className="relative z-20 w-full bg-dt-900 lg:absolute lg:inset-x-0 lg:top-0 lg:bg-transparent">
      {/* Mobile/tablet: solid dark-teal bar (no photo behind it, so a gradient wouldn't read as
          anything but a decoration). Desktop: transparent header + this gradient scrim instead,
          since it overlays the photo/canvas directly. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-b from-black/45 via-black/15 to-transparent lg:block"
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
          className="whitespace-nowrap px-3 py-2 text-[10px] sm:px-6 sm:py-2.5 sm:text-xs"
        >
          Enrol Now
        </Button>
      </div>
    </header>
  );
}
