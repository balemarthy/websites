"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

type DropdownCard = { tag: string; desc: string; href: string };

const PROGRAM_CARDS: DropdownCard[] = [
  {
    tag: "Embedded Software Design",
    desc: "You can make it work. This is where you learn why it works.",
    href: "/programs/design",
  },
  {
    tag: "Embedded Software Architecture",
    desc: "You've shipped working code. Could you defend every decision in it?",
    href: "/programs/architecture",
  },
];

// Copy here is a placeholder, not finalized positioning — swap once real content exists.
const SESSIONS_CARDS: DropdownCard[] = [
  { tag: "BLE Weekend", desc: "Details coming soon.", href: "/sessions/ble" },
  { tag: "Bytes to Sockets", desc: "Details coming soon.", href: "/sessions/sockets" },
];

export default function Nav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  const [openProgram, setOpenProgram] = useState(false);
  const [openSessions, setOpenSessions] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isProgramActive = PROGRAM_CARDS.some((c) => pathname === c.href);
  const isSessionsActive = SESSIONS_CARDS.some((c) => pathname === c.href);
  const isDownloadsActive = pathname === "/downloads";
  const isAboutActive = pathname === "/about";

  // Close open dropdowns on outside click / Escape.
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenProgram(false);
        setOpenSessions(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenProgram(false);
        setOpenSessions(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Lock page scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function closeMobileMenu() {
    setMenuOpen(false);
    setOpenProgram(false);
    setOpenSessions(false);
  }

  return (
    <>
      <nav ref={navRef} className={`font-body ${styles.pill}`} aria-label="Primary">
        {/* Desktop: logo-less floating pill, four items only */}
        <div className={styles.desktopItems}>
          <div
            className={styles.navItemWrap}
            onMouseEnter={() => setOpenProgram(true)}
            onMouseLeave={() => setOpenProgram(false)}
          >
            <button
              type="button"
              className={`${styles.navItem} ${isProgramActive ? styles.navItemActive : ""}`}
              aria-expanded={openProgram}
              onClick={() => setOpenProgram(true)}
            >
              The Program
            </button>
            <div className={`${styles.dropdownPanel} ${openProgram ? styles.dropdownOpen : ""}`}>
              <div aria-hidden className={styles.dropdownGlow} />
              <div className={styles.dropdownCards}>
                {PROGRAM_CARDS.map((card) => (
                  <Link key={card.href} href={card.href} className={styles.dropdownCard}>
                    <span className={`font-mono ${styles.tagPill}`}>{card.tag}</span>
                    <p className={styles.cardDesc}>{card.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div
            className={styles.navItemWrap}
            onMouseEnter={() => setOpenSessions(true)}
            onMouseLeave={() => setOpenSessions(false)}
          >
            <button
              type="button"
              className={`${styles.navItem} ${isSessionsActive ? styles.navItemActive : ""}`}
              aria-expanded={openSessions}
              onClick={() => setOpenSessions(true)}
            >
              Weekend Sessions
            </button>
            <div className={`${styles.dropdownPanel} ${openSessions ? styles.dropdownOpen : ""}`}>
              <div aria-hidden className={styles.dropdownGlow} />
              <div className={styles.dropdownCards}>
                {SESSIONS_CARDS.map((card) => (
                  <Link key={card.href} href={card.href} className={styles.dropdownCard}>
                    <span className={`font-mono ${styles.tagPill}`}>{card.tag}</span>
                    <p className={styles.cardDesc}>{card.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

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

        {/* Mobile: logo + hamburger. Text wordmark for now — the only logo asset
            (esc-logo-light.png) is light-colored, made for the old dark hero-image
            nav, and would be near-invisible on this Paper pill. Swap for a
            dark/ink-colored logo asset once one exists. */}
        <div className={styles.mobileBar}>
          <Link href="/" className={`font-display ${styles.wordmark}`}>
            Embedded System Coach
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
          >
            <span className={`${styles.hamburgerBar} ${styles.bar1}`} />
            <span className={`${styles.hamburgerBar} ${styles.bar2}`} />
            <span className={`${styles.hamburgerBar} ${styles.bar3}`} />
          </button>
        </div>
      </nav>

      <div className={`font-body ${styles.overlay} ${menuOpen ? styles.overlayOpen : ""}`}>
        <div className={styles.mobileList}>
          <button
            type="button"
            className={`${styles.mobileItem} ${isProgramActive ? styles.mobileItemActive : ""}`}
            aria-expanded={openProgram}
            onClick={() => setOpenProgram((open) => !open)}
          >
            The Program
          </button>
          {openProgram && (
            <div className={styles.mobileAccordion}>
              {PROGRAM_CARDS.map((card) => (
                <Link key={card.href} href={card.href} className={styles.mobileCard} onClick={closeMobileMenu}>
                  <span className={`font-mono ${styles.tagPill}`}>{card.tag}</span>
                  <p className={styles.cardDesc}>{card.desc}</p>
                </Link>
              ))}
            </div>
          )}

          <button
            type="button"
            className={`${styles.mobileItem} ${isSessionsActive ? styles.mobileItemActive : ""}`}
            aria-expanded={openSessions}
            onClick={() => setOpenSessions((open) => !open)}
          >
            Weekend Sessions
          </button>
          {openSessions && (
            <div className={styles.mobileAccordion}>
              {SESSIONS_CARDS.map((card) => (
                <Link key={card.href} href={card.href} className={styles.mobileCard} onClick={closeMobileMenu}>
                  <span className={`font-mono ${styles.tagPill}`}>{card.tag}</span>
                  <p className={styles.cardDesc}>{card.desc}</p>
                </Link>
              ))}
            </div>
          )}

          <Link
            href="/downloads"
            className={`${styles.mobileItem} ${isDownloadsActive ? styles.mobileItemActive : ""}`}
            onClick={closeMobileMenu}
          >
            Downloads
          </Link>
          <Link
            href="/about"
            className={`${styles.mobileItem} ${isAboutActive ? styles.mobileItemActive : ""}`}
            onClick={closeMobileMenu}
          >
            About Me
          </Link>
        </div>
      </div>
    </>
  );
}
