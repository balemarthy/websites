import Button from "@/components/ui/Button";

const NAV_ITEMS = ["The Program", "Sessions", "Results", "About"];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-dt-100 bg-esc-paper">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-4 lg:px-16">
        <span className="font-display text-sm uppercase tracking-tight text-esc-dark-teal sm:text-base">
          ESC <span className="text-esc-teal">·</span> Embedded System Coach
        </span>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href="#"
              className="font-body text-sm text-esc-dark-teal transition-colors duration-base ease-standard hover:text-esc-orange"
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
