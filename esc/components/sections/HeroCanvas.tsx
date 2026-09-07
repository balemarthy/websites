"use client";

import { useEffect, useRef, useState } from "react";

const MOBILE_BREAKPOINT = 768;
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

  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Preload the active frame set. Below the md (768px) breakpoint, sample every
  // 2nd frame from the same 64-file folder (1, 3, 5 ... 63 — 32 frames) to cut
  // mobile data/decode cost; decided once at mount rather than reacting live to
  // resize, since crossing this breakpoint mid-session is a rare edge case not
  // worth the added complexity of hot-swapping the loaded frame set.
  useEffect(() => {
    let cancelled = false;

    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const frameNumbers = isMobile
      ? Array.from({ length: 32 }, (_, i) => i * 2 + 1)
      : Array.from({ length: 64 }, (_, i) => i + 1);
    const total = frameNumbers.length;

    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (const n of frameNumbers) {
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
      const target = targetFrame();
      const current = currentFrameRef.current;
      const eased = current + (target - current) * LERP_FACTOR;
      currentFrameRef.current = Math.abs(eased - target) < SNAP_EPSILON ? target : eased;
      drawFrame(Math.round(currentFrameRef.current));
      rafRef.current = requestAnimationFrame(tick);
    };

    resize();
    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
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
