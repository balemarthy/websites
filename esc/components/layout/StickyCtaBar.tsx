"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";

export default function StickyCtaBar() {
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const update = () => {
      const shouldShow = window.scrollY > window.innerHeight;
      if (shouldShow !== visibleRef.current) {
        visibleRef.current = shouldShow;
        setVisible(shouldShow);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-30 h-14 w-full border-t border-esc-dark-teal/15 bg-esc-paper transition-transform duration-base ease-standard sm:h-16 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
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
