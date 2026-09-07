"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { getHeroScrollProgress } from "./heroScrollProgress";

// Thought-text is active across [0, THOUGHT_TEXT_END], split into three even windows
// (his/her line 1, then line 2s, then line 3s). By THOUGHT_TEXT_END every line's own
// fade-out has already finished, so it's fully gone well before HEADLINE_REVEAL_START.
const THOUGHT_TEXT_END = 0.65;
const HEADLINE_REVEAL_START = 0.75;
const LOW_OPACITY = 0.18;
const WINDOW_FADE_FRACTION = 0.1;

const HIS_LINES = [
  "When will this bug even get fixed?",
  "Next increment review is Monday…",
  "My manager doesn't care how hard this was…",
];

const HER_LINES = [
  "This concept is actually tough…",
  "Embedded systems is hard…",
  "What's even the roadmap here?",
];

function windowOpacity(progress: number, index: number, totalWindows: number, rangeEnd: number) {
  const windowWidth = rangeEnd / totalWindows;
  const start = index * windowWidth;
  const end = start + windowWidth;
  const fade = windowWidth * WINDOW_FADE_FRACTION;

  if (progress < start || progress > end) return 0;
  if (progress < start + fade) return (progress - start) / fade;
  if (progress > end - fade) return (end - progress) / fade;
  return 1;
}

const thoughtTextShadow = "0 1px 8px rgba(0,0,0,0.65)";

export default function HeroTextTiming({ children }: { children: ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const hisRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const herRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // Final state directly: thought-text gone, headline/CTA fully visible.
      if (contentRef.current) contentRef.current.style.opacity = "1";
      hisRefs.current.forEach((el) => {
        if (el) el.style.opacity = "0";
      });
      herRefs.current.forEach((el) => {
        if (el) el.style.opacity = "0";
      });
      return;
    }

    const tick = () => {
      if (!isVisibleRef.current) {
        // The parent section is `hidden md:block` (CSS-hidden below md, where a static
        // mobile hero renders instead) and, at md+, scrolls off-screen once the pin
        // releases. Either way there's nothing to gain by continuing to tick — the
        // observer below restarts the loop once this becomes visible again.
        rafRef.current = null;
        return;
      }

      const progress = getHeroScrollProgress();

      for (let i = 0; i < 3; i++) {
        const op = windowOpacity(progress, i, 3, THOUGHT_TEXT_END);
        const his = hisRefs.current[i];
        const her = herRefs.current[i];
        if (his) his.style.opacity = String(op);
        if (her) her.style.opacity = String(op);
      }

      let contentOpacity = LOW_OPACITY;
      if (progress >= HEADLINE_REVEAL_START) {
        const t = (progress - HEADLINE_REVEAL_START) / (1 - HEADLINE_REVEAL_START);
        contentOpacity = LOW_OPACITY + (1 - LOW_OPACITY) * Math.min(1, Math.max(0, t));
      }
      if (contentRef.current) contentRef.current.style.opacity = String(contentOpacity);

      rafRef.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisibleRef.current;
        isVisibleRef.current = entry.isIntersecting;
        if (!wasVisible && entry.isIntersecting && rafRef.current === null) {
          rafRef.current = requestAnimationFrame(tick);
        }
      },
      { threshold: 0 }
    );
    if (contentRef.current) observer.observe(contentRef.current);

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* His thought-text — near his head, left side. All three lines share one spot
          (absolute, stacked) since only one is ever above opacity 0 at a time. */}
      <div className="pointer-events-none absolute left-[6%] top-[19%] z-20 w-[230px] sm:w-[260px] lg:left-[9%]">
        {HIS_LINES.map((line, i) => (
          <span
            key={line}
            ref={(el) => {
              hisRefs.current[i] = el;
            }}
            className="absolute left-0 top-0 block font-body text-lg leading-snug text-esc-paper/90 sm:text-xl"
            style={{ opacity: 0, textShadow: thoughtTextShadow }}
          >
            {line}
          </span>
        ))}
      </div>

      {/* Her thought-text — near her head, right side */}
      <div className="pointer-events-none absolute right-[6%] top-[19%] z-20 w-[230px] text-right sm:w-[260px] lg:right-[9%]">
        {HER_LINES.map((line, i) => (
          <span
            key={line}
            ref={(el) => {
              herRefs.current[i] = el;
            }}
            className="absolute right-0 top-0 block font-body text-lg leading-snug text-esc-paper/90 sm:text-xl"
            style={{ opacity: 0, textShadow: thoughtTextShadow }}
          >
            {line}
          </span>
        ))}
      </div>

      {/* Headline/subtext/CTA/trust-line — opacity driven by the same scroll progress */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-10 flex items-start justify-center px-10 pt-[96px] lg:px-16"
        style={{ opacity: LOW_OPACITY }}
      >
        {children}
      </div>
    </>
  );
}
