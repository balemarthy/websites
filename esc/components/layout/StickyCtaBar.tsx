import Button from "@/components/ui/Button";

export default function StickyCtaBar() {
  return (
    <div className="h-14 w-full border-t border-esc-dark-teal/15 bg-esc-paper sm:h-16">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-center px-0 sm:justify-end sm:px-6 lg:px-16">
        <Button
          variant="primary"
          href="#programs"
          className="w-full text-esc-paper sm:w-auto"
        >
          Explore Programs
        </Button>
      </div>
    </div>
  );
}
