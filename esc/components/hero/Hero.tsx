"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import PinnedHero from "./PinnedHero";
import StackedHero from "./StackedHero";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Beat 1's split composition needs real width to breathe, so the
    // pinned sequence only kicks in at desktop widths — tablets and
    // phones get the stacked, non-pinned fallback.
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const usePinned = isDesktop && !prefersReducedMotion;

  return (
    <section aria-label="Meet Pagla and Pagli" className="bg-esc-paper">
      {usePinned ? <PinnedHero /> : <StackedHero />}
    </section>
  );
}
