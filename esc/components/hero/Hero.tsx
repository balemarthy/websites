"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import PinnedBeats from "./PinnedBeats";
import StackedBeats from "./StackedBeats";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const usePinned = isDesktop && !prefersReducedMotion;

  return (
    <section aria-label="Meet Pagla and Pagli" className="bg-esc-paper">
      {usePinned ? <PinnedBeats /> : <StackedBeats />}
    </section>
  );
}
