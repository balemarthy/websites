"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

const FRAME_COUNT = 148;
const FRAME_PATH = (n: number) => `/frames/frame_${String(n).padStart(4, "0")}.jpg`;

// Placeholder thresholds — confirm exact frame numbers once the scrub has
// been reviewed in-browser. progress is 0..1 across the full scroll
// section; index i is "active" once progress >= CAPTION_THRESHOLDS[i].
const CAPTION_THRESHOLDS = [0, 0.33, 0.66];

const CHARACTERS = [
  {
    id: "guru",
    caption: "Stable. Responsible. Quietly worried it's not enough.",
    mobileImage: "/hero-mobile/guru.png",
  },
  {
    id: "gowri",
    caption: "Capable. Educated. Never given the chance.",
    mobileImage: "/hero-mobile/gowri.png",
  },
  {
    id: "gaurav",
    caption: "Ambitious. No business background. All in on learning.",
    mobileImage: "/hero-mobile/gaurav.png",
  },
] as const;

function clamp01(n: number) {
  return Math.min(Math.max(n, 0), 1);
}

function characterIndexForProgress(progress: number) {
  for (let i = CAPTION_THRESHOLDS.length - 1; i >= 0; i--) {
    if (progress >= CAPTION_THRESHOLDS[i]) return i;
  }
  return 0;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(-1);
  const tickingRef = useRef(false);
  const isDesktopRef = useRef(false);
  const preloadStartedRef = useRef(false);
  const activeCharRef = useRef(0);

  const desktopCaptionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mobileCaptionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mobileImageRefs = useRef<Array<HTMLImageElement | null>>([]);

  // null = breakpoint not resolved yet (avoids fetching the wrong asset set
  // before we know which one is needed)
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  // Only piece of scroll-driven state — updates once per actual character
  // change, not per scroll tick. Canvas draw and caption/image opacity are
  // applied directly to the DOM via refs below, bypassing re-renders.
  const [, setActiveChar] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    isDesktopRef.current = mq.matches;
    const onChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      isDesktopRef.current = e.matches;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Preload the frame sequence on desktop, or the three static images on
  // mobile — gated on isDesktop being resolved, and only ever fires once,
  // so a phone never fetches 148 desktop frames.
  useEffect(() => {
    if (isDesktop === null || preloadStartedRef.current) return;
    preloadStartedRef.current = true;
    let cancelled = false;

    if (isDesktop) {
      let loadedCount = 0;
      const frames: HTMLImageElement[] = new Array(FRAME_COUNT);

      function bump() {
        loadedCount += 1;
        if (cancelled) return;
        setLoadProgress(loadedCount / FRAME_COUNT);
        if (loadedCount === FRAME_COUNT) {
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
    } else {
      let loadedCount = 0;
      const total = CHARACTERS.length;

      function bump() {
        loadedCount += 1;
        if (cancelled) return;
        setLoadProgress(loadedCount / total);
        if (loadedCount === total) setLoaded(true);
      }

      CHARACTERS.forEach((c) => {
        const img = new window.Image();
        img.onload = bump;
        img.onerror = bump;
        img.src = c.mobileImage;
      });
    }

    return () => {
      cancelled = true;
    };
  }, [isDesktop]);

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

    // Cover-fit, anchored toward the top rather than dead-centered. On wide,
    // short viewports this crops top/bottom to fill the canvas — a center
    // anchor put subjects' heads close enough to the top to collide with
    // the fixed nav pill in several frames across the sequence. Biasing
    // toward 0 keeps more headroom above the subject (crops more off the
    // bottom instead), pushing them down and away from the nav.
    const VERTICAL_ANCHOR = 0.25;
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
    const offY = (ch - drawH) * VERTICAL_ANCHOR;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, offX, offY, drawW, drawH);
  }, []);

  const applyCaptionOpacity = useCallback((charIdx: number) => {
    const captionRefs = isDesktopRef.current ? desktopCaptionRefs.current : mobileCaptionRefs.current;
    captionRefs.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = i === charIdx ? "1" : "0";
    });
    if (!isDesktopRef.current) {
      mobileImageRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.opacity = i === charIdx ? "1" : "0";
      });
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;

    function update() {
      tickingRef.current = false;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const progress = scrollable > 0 ? clamp01(-rect.top / scrollable) : 0;

      if (isDesktopRef.current) {
        const frameIdx = Math.min(Math.floor(progress * FRAME_COUNT), FRAME_COUNT - 1);
        if (frameIdx !== frameIndexRef.current) {
          frameIndexRef.current = frameIdx;
          drawFrame(frameIdx);
        }
      }

      const charIdx = characterIndexForProgress(progress);
      applyCaptionOpacity(charIdx);
      if (charIdx !== activeCharRef.current) {
        activeCharRef.current = charIdx;
        setActiveChar(charIdx);
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
  }, [loaded, drawFrame, applyCaptionOpacity]);

  return (
    <>
      <section ref={sectionRef} className={styles.scrollSection}>
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

          {/* Desktop: canvas frame-sequence + overlay captions */}
          <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
          <div aria-hidden className={styles.scrim} />
          <div className={styles.captionLayer}>
            {CHARACTERS.map((c, i) => (
              <div
                key={c.id}
                ref={(el) => {
                  desktopCaptionRefs.current[i] = el;
                }}
                className={`font-display ${styles.caption}`}
              >
                {c.caption}
              </div>
            ))}
          </div>

          {/* Mobile: static image crossfade + overlay captions */}
          <div className={styles.mobileStack}>
            {CHARACTERS.map((c, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={c.id}
                ref={(el) => {
                  mobileImageRefs.current[i] = el;
                }}
                src={c.mobileImage}
                alt=""
                className={styles.mobileImage}
              />
            ))}
            <div aria-hidden className={styles.mobileScrim} />
            <div className={styles.mobileCaptionLayer}>
              {CHARACTERS.map((c, i) => (
                <div
                  key={c.id}
                  ref={(el) => {
                    mobileCaptionRefs.current[i] = el;
                  }}
                  className={`font-display ${styles.mobileCaption}`}
                >
                  {c.caption}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HeroClose />
    </>
  );
}

// Static closing section — not part of the scroll rig above. Reached once
// the frame sequence / mobile image swap finishes.
function HeroClose() {
  return (
    <section className={styles.close}>
      <div aria-hidden className={styles.closeGlow} />

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`font-display ${styles.closeHeading}`}
      >
        Not motivation. A system.
      </motion.h2>

      {/* Wordmark colors follow spec exactly (Network in orange, rest
          near-black) — set on a light plate so the near-black text stays
          legible against this section's dark-teal background. */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={styles.closeWordmarkPlate}
      >
        <p className={`font-display ${styles.closeWordmark}`}>
          Digital<span className={styles.closeWordmarkAccent}>Network</span>Marketer
        </p>
      </motion.div>

      <motion.a
        href="#register"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`font-body ${styles.closeCta}`}
      >
        Join Free Webinar
      </motion.a>
    </section>
  );
}
