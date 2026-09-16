"use client";

import { useEffect, useRef } from "react";
import styles from "./ScrollStatement.module.css";

type ScrollStatementProps = {
  phrases: string[];
};

// Must match .sticky's `height: 64vh` in ScrollStatement.module.css — used
// both to size the track (sticky box height + scrub distance) and to work
// out how much of the track is actually "stuck" scroll room, since sticky
// no longer fills the full viewport.
const STICKY_HEIGHT_VH = 64;

// Workflow D (cinematic-hero-workflow.md) — a single statement, split into
// per-phrase spans, pinned via `position: sticky` while a taller track
// scrolls underneath. One phrase is "lit" (resolved ink) at a time, tied 1:1
// to scroll progress through the track; the rest sit at a muted ink. Direct
// ref/classList writes per RAF tick (not React state) and the
// IntersectionObserver visibility gate mirror HeroTextTiming.tsx's existing
// pattern, rather than introducing a second scroll-progress convention.
export default function ScrollStatement({ phrases }: ScrollStatementProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const phraseRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // Static fallback — every phrase shown resolved, no scrub at all.
      phraseRefs.current.forEach((el) => {
        if (el) el.classList.add(styles.phraseActive);
      });
      return;
    }

    function getProgress() {
      const track = trackRef.current;
      if (!track) return 0;
      const rect = track.getBoundingClientRect();
      const stickyHeightPx = (STICKY_HEIGHT_VH / 100) * window.innerHeight;
      const scrollable = track.offsetHeight - stickyHeightPx;
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
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [phrases.length]);

  // Track height = the sticky box's own height plus a modest scrub distance
  // per phrase — tall enough for a readable scrub, not so tall it leaves a
  // dead gap of blank paper once the last phrase lights up and the section
  // un-pins.
  const trackHeightVh = STICKY_HEIGHT_VH + phrases.length * 26;

  return (
    <div ref={trackRef} className={styles.track} style={{ height: `${trackHeightVh}vh` }}>
      <div className={styles.sticky}>
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
