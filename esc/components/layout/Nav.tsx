"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

export default function Nav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const mobileWrapRef = useRef<HTMLDivElement>(null);

  const [mobileOpen, setMobileOpen] = useState(false);

  const isDownloadsActive = pathname === "/downloads";
  const isAboutActive = pathname === "/about";

  // Close the mobile panel on outside click / Escape.
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (mobileWrapRef.current && !mobileWrapRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <>
      {/* Desktop: floating Paper pill, four items. "The Program" and "Weekend
          Sessions" are plain (non-interactive) for now — their dropdown content
          comes back once /programs/* and /sessions/* actually exist. */}
      <nav ref={navRef} className={`font-body ${styles.pill}`} aria-label="Primary">
        <div className={styles.desktopItems}>
          <span className={styles.navItem}>The Program</span>
          <span className={styles.navItem}>Weekend Sessions</span>
          <Link
            href="/downloads"
            className={`${styles.navItem} ${isDownloadsActive ? styles.navItemActive : ""}`}
          >
            Downloads
          </Link>
          <Link href="/about" className={`${styles.navItem} ${isAboutActive ? styles.navItemActive : ""}`}>
            About Me
          </Link>
        </div>
      </nav>

      {/* Mobile: no pill/bar — just the hamburger toggle, with a small Paper
          chip behind it so the Dark Teal bars stay legible over the dark hero
          photo (a fully transparent button here would be invisible against
          it). Tapping opens a compact ELEVATED-SOLID panel anchored below it,
          not a full-screen takeover. */}
      <div ref={mobileWrapRef} className={styles.mobileWrap}>
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ""}`}
        >
          <span className={`${styles.hamburgerBar} ${styles.bar1}`} />
          <span className={`${styles.hamburgerBar} ${styles.bar2}`} />
          <span className={`${styles.hamburgerBar} ${styles.bar3}`} />
        </button>

        <div className={`font-body ${styles.mobilePanel} ${mobileOpen ? styles.mobilePanelOpen : ""}`}>
          <span className={styles.mobilePanelItem}>The Program</span>
          <span className={styles.mobilePanelItem}>Weekend Sessions</span>
          <Link
            href="/downloads"
            className={`${styles.mobilePanelItem} ${isDownloadsActive ? styles.mobilePanelItemActive : ""}`}
            onClick={closeMobileMenu}
          >
            Downloads
          </Link>
          <Link
            href="/about"
            className={`${styles.mobilePanelItem} ${isAboutActive ? styles.mobilePanelItemActive : ""}`}
            onClick={closeMobileMenu}
          >
            About Me
          </Link>
        </div>
      </div>
    </>
  );
}
