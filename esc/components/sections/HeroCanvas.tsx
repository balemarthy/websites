"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 64;
const LERP_FACTOR = 0.08;
const SNAP_EPSILON = 0.02;

function framePath(i: number) {
  return `/frames/hero-sequence/frame-${String(i).padStart(3, "0")}.png`;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isVisibleRef = useRef(true);

  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Preload all 64 frames. This component only mounts at md+ (Hero.tsx renders a
  // static hero with a dedicated portrait image below that) — no mobile-specific
  // sampling needed here anymore.
  useEffect(() => {
    let cancelled = false;

    const total = FRAME_COUNT;
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let n = 1; n <= FRAME_COUNT; n++) {
      const img = new Image();
      img.src = framePath(n);
      img.onload = () => {
        if (cancelled) return;
        loadedCount++;
        setLoadProgress(loadedCount / total);
        if (loadedCount === total) setLoaded(true);
      };
      img.onerror = () => {
        if (cancelled) return;
        loadedCount++;
        if (loadedCount === total) setLoaded(true);
      };
      imgs.push(img);
    }
    framesRef.current = imgs;

    return () => {
      cancelled = true;
    };
  }, []);

  // Drive the canvas from scroll progress once frames are ready.
  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // The tall scroll track is the nearest ancestor with this data attribute
    // (the outer <section> in Hero.tsx) — its height above one viewport is
    // the scroll distance that maps to 0-100% of the sequence.
    const track = canvas.closest("[data-hero-scroll-track]") as HTMLElement | null;

    const drawFrame = (index: number) => {
      const img = framesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const rect = canvas.getBoundingClientRect();
      const cw = rect.width;
      const ch = rect.height;
      if (cw === 0 || ch === 0) return;

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cw / ch;
      let drawW: number;
      let drawH: number;
      if (canvasRatio > imgRatio) {
        drawW = cw;
        drawH = cw / imgRatio;
      } else {
        drawH = ch;
        drawW = ch * imgRatio;
      }
      const drawX = (cw - drawW) / 2;
      const drawY = (ch - drawH) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(Math.round(currentFrameRef.current));
    };

    const targetFrame = () => {
      const total = framesRef.current.length;
      if (!track || total === 0) return 0;
      const rect = track.getBoundingClientRect();
      const scrollable = track.offsetHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      return Math.min(total - 1, Math.floor(progress * total));
    };

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      currentFrameRef.current = 0;
      resize();
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }

    const tick = () => {
      if (!isVisibleRef.current) {
        // Sticky releases once the tall scroll track scrolls past — the canvas then
        // sits permanently off-screen for the rest of the page. Stop ticking rather
        // than redrawing an invisible canvas forever; the observer below restarts
        // the loop if the user scrolls back up into it.
        rafRef.current = null;
        return;
      }
      const target = targetFrame();
      const current = currentFrameRef.current;
      const eased = current + (target - current) * LERP_FACTOR;
      currentFrameRef.current = Math.abs(eased - target) < SNAP_EPSILON ? target : eased;
      drawFrame(Math.round(currentFrameRef.current));
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
    observer.observe(canvas);

    resize();
    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [loaded]);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      {!loaded && (
        // Dark backdrop (not paper) — it stands in for the eventual dark photo, so the
        // paper-colored headline sitting on top of this stays legible during preload instead
        // of vanishing against a light background.
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-dt-900">
          <div className="flex w-48 flex-col items-center gap-3">
            <div className="h-1 w-full overflow-hidden rounded-xs bg-white/20">
              <div
                className="h-full bg-esc-orange transition-[width] duration-fast ease-standard"
                style={{ width: `${Math.round(loadProgress * 100)}%` }}
              />
            </div>
            <span className="font-mono text-xs text-esc-paper/80">
              {Math.round(loadProgress * 100)}%
            </span>
          </div>
        </div>
      )}
    </>
  );
}
