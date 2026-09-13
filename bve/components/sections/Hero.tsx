"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

const FRAME_COUNT = 340;
const FRAME_PATH = (n: number) => `/frames/frame_${String(n).padStart(4, "0")}.jpg`;

const STATES = [
  {
    key: "career",
    headline: "Your career needs clarity.",
    portrait: "/portraits/portrait-career.png",
  },
  {
    key: "branding",
    headline: "You need visibility.",
    portrait: "/portraits/portrait-branding.png",
  },
  {
    key: "consulting",
    headline: "Your people need this too.",
    portrait: "/portraits/portrait-consulting.png",
  },
] as const;

function stateIndexForProgress(progress: number) {
  if (progress < 0.33) return 0;
  if (progress < 0.66) return 1;
  return 2;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const tickingRef = useRef(false);
  const frameIndexRef = useRef(-1);
  const activeStateRef = useRef(0);

  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [activeState, setActiveState] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Preload every frame + portrait before first render of real content.
  useEffect(() => {
    let cancelled = false;
    const totalAssets = FRAME_COUNT + STATES.length;
    let loadedCount = 0;
    const frames: HTMLImageElement[] = new Array(FRAME_COUNT);

    function bump() {
      loadedCount += 1;
      if (cancelled) return;
      setLoadProgress(loadedCount / totalAssets);
      if (loadedCount === totalAssets) {
        framesRef.current = frames;
        setLoaded(true);
      }
    }

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.onload = bump;
      img.onerror = bump;
      img.src = FRAME_PATH(i + 1);
      frames[i] = img;
    }
    STATES.forEach((s) => {
      const img = new window.Image();
      img.onload = bump;
      img.onerror = bump;
      img.src = s.portrait;
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = framesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    if (cw === 0 || ch === 0) return;

    const targetW = Math.round(cw * dpr);
    const targetH = Math.round(ch * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;
    let drawW: number;
    let drawH: number;
    if (imgRatio > canvasRatio) {
      drawH = ch;
      drawW = ch * imgRatio;
    } else {
      drawW = cw;
      drawH = cw / imgRatio;
    }
    const offX = (cw - drawW) / 2;
    const offY = (ch - drawH) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, offX, offY, drawW, drawH);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    function update() {
      tickingRef.current = false;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0;

      const frameIndex = Math.min(Math.floor(progress * FRAME_COUNT), FRAME_COUNT - 1);
      if (frameIndex !== frameIndexRef.current) {
        frameIndexRef.current = frameIndex;
        drawFrame(frameIndex);
      }

      const nextState = stateIndexForProgress(progress);
      if (nextState !== activeStateRef.current) {
        activeStateRef.current = nextState;
        setActiveState(nextState);
      }
    }

    function onScroll() {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [loaded, drawFrame]);

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.sticky}>
        {!loaded && (
          <div className={styles.loader} role="status" aria-live="polite">
            <div className={styles.loaderTrack}>
              <div
                className={styles.loaderBar}
                style={{ width: `${Math.round(loadProgress * 100)}%` }}
              />
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
        <div className={styles.scrim} aria-hidden="true" />
        <div className={styles.mobileBackdrop} aria-hidden="true">
          {isMobile && (
            <Image
              src="/portraits/mobile-bg.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className={styles.mobileBackdropImage}
            />
          )}
        </div>

        <div className={styles.frame}>
          <div className={styles.portraitWrap}>
            {STATES.map((s, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={s.key}
                src={s.portrait}
                alt={i === activeState ? "Vamsi Balemarthy" : ""}
                aria-hidden={i !== activeState}
                className={`${styles.portrait} ${i === activeState ? styles.portraitActive : ""}`}
              />
            ))}
          </div>

          <div className={styles.textBlock}>
            {STATES.map((s, i) => (
              <h1
                key={s.key}
                aria-hidden={i !== activeState}
                className={`font-display ${styles.headline} ${styles[`headline${i}` as "headline0"]} ${
                  i === activeState ? styles.headlineActive : ""
                }`}
              >
                {s.headline}
              </h1>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
