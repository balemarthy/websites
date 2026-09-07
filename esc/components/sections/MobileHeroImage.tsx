"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// The section this lives in is already `md:hidden`, but a CSS-hidden <Image> still
// triggers Next's image request unless priority is dropped — and this needs priority
// for a correct mobile LCP. Gate the element itself behind a matchMedia check instead,
// so it only ever mounts (and fetches) at genuinely mobile widths.
export default function MobileHeroImage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const update = () => setIsMobile(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!isMobile) return null;

  return (
    <Image
      src="/images/hero/pagla-pagli-divided-world-mobile.png"
      alt="Pagla and Pagli"
      fill
      priority
      className="object-cover object-top"
      sizes="100vw"
    />
  );
}
