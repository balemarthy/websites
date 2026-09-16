"use client";

import { useEffect, useRef } from "react";
import styles from "./ScrollStatement.module.css";

type ScrollStatementProps = {
  phrases: string[];
};

// Workflow D (cinematic-hero-workflow.md) — a single statement, split into
// per-phrase spans, pinned via `position: sticky` while a taller track
// scrolls underneath. One phrase is "lit" (resolved ink) at a time, tied 1:1
// to scroll progress through the track; the rest sit at a muted ink. Direct
// ref/classList writes per RAF tick (not React state) and the
// IntersectionObserver visibility gate mirror HeroTextTiming.tsx's existing
// pattern, rather than introducing a second scroll-progress convention.
//
// The sticky box is sized to its own text content (no forced vh height) —
// an earlier version forced it to a fixed viewport-fraction height with the
// text centered inside, which left a large dead stretch of blank paper both
// around the text and after the section un-pinned. Track height is instead
// measured height + a flat scrub allowance, so the only "extra" space is
// exactly what's needed to drive the scrub, nothing more.
const SCRUB_VH_PER_PHRASE = 18;

export default function ScrollStatement({ phrases }: ScrollStatementProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const phraseRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    function sizeTrack() {
      const track = trackRef.current;
      const sticky = stickyRef.current;
      if (!track || !sticky) return;
      const scrubPx = (SCRUB_VH_PER_PHRASE / 100) * window.innerHeight * phrases.length;
      track.style.height = `${sticky.offsetHeight + scrubPx}px`;
    }
    sizeTrack();
    window.addEventListener("resize", sizeTrack);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // Static fallback — every phrase shown resolved, no scrub at all.
      phraseRefs.current.forEach((el) => {
        if (el) el.classList.add(styles.phraseActive);
      });
      return () => window.removeEventListener("resize", sizeTrack);
    }

    function getProgress() {
      const track = trackRef.current;
      const sticky = stickyRef.current;
      if (!track || !sticky) return 0;
      const rect = track.getBoundingClientRect();
      const scrollable = track.offsetHeight - sticky.offsetHeight;
      return scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
    }

    const tick = () => {
      if (!isVisibleRef.current) {
        rafRef.current = null;
        return;
      }

      const progress = getProgress();
      const activeIndex = Math.min(phrases.length - 1, Math.floor(progress * phrases.length));
      phraseRefs.current.forEach((el, i) => {
        if (!el) return;
        el.classList.toggle(styles.phraseActive, i === activeIndex);
        el.classList.toggle(styles.phraseInactive, i !== activeIndex);
      });

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
    if (trackRef.current) observer.observe(trackRef.current);

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("resize", sizeTrack);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [phrases.length]);

  return (
    <div ref={trackRef} className={styles.track}>
      <div ref={stickyRef} className={styles.sticky}>
        <p className={`font-display ${styles.statement}`}>
          {phrases.map((phrase, i) => (
            <span
              key={phrase}
              ref={(el) => {
                phraseRefs.current[i] = el;
              }}
              className={`${styles.phrase} ${i === 0 ? styles.phraseActive : styles.phraseInactive}`}
            >
              {phrase}{" "}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
