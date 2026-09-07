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

  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Preload all frames before the sequence is usable — but only at desktop widths.
  // This component's canvas is CSS-hidden below `lg` (mobile keeps Step 1's static
  // two-portrait layout), so starting 64 image requests there would just waste
  // mobile bandwidth on a background that's never shown. Watches the breakpoint
  // so it starts the preload if the viewport is later resized past it.
  useEffect(() => {
    let cancelled = false;
    let started = false;
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    const startPreload = () => {
      if (started || cancelled) return;
      started = true;
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        img.src = framePath(i);
        img.onload = () => {
          if (cancelled) return;
          loadedCount++;
          setLoadProgress(loadedCount / FRAME_COUNT);
          if (loadedCount === FRAME_COUNT) setLoaded(true);
        };
        img.onerror = () => {
          if (cancelled) return;
          loadedCount++;
          if (loadedCount === FRAME_COUNT) setLoaded(true);
        };
        imgs.push(img);
      }
      framesRef.current = imgs;
    };

    const mq = window.matchMedia("(min-width: 1024px)");
    if (mq.matches) {
      startPreload();
    } else {
      const onChange = () => {
        if (mq.matches) startPreload();
      };
      mq.addEventListener("change", onChange);
      return () => {
        cancelled = true;
        mq.removeEventListener("change", onChange);
      };
    }

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
      if (!track) return 0;
      const rect = track.getBoundingClientRect();
      const scrollable = track.offsetHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      return Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));
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
