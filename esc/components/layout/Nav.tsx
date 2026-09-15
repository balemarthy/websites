"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

const PROGRAM_LINKS = [
  { label: "Embedded Software Design", href: "/programs/embedded-software-design" },
  { label: "Embedded Software Architecture", href: "/programs/embedded-software-architecture" },
];

const SESSION_LINKS = [
  { label: "Bytes to Sockets", href: "/weekend-sessions/bytes-to-sockets" },
  { label: "BLE In Weekend", href: "/weekend-sessions/ble-in-weekend" },
  { label: "LM75 Driver Architecture", href: "/weekend-sessions/lm75-driver-architecture" },
];

type DesktopMenu = "program" | "sessions" | null;
type MobileGroup = "program" | "sessions" | null;

export default function Nav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const mobileWrapRef = useRef<HTMLDivElement>(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<DesktopMenu>(null);
  const [mobileGroup, setMobileGroup] = useState<MobileGroup>(null);

  const isHome = pathname === "/";
  const isDownloadsActive = pathname === "/downloads";
  const isAboutActive = pathname === "/about";
  const isBlogActive = pathname === "/blog";
  const isProgramActive = PROGRAM_LINKS.some((link) => pathname === link.href);
  const isSessionsActive = SESSION_LINKS.some((link) => pathname === link.href);

  // Close the mobile panel and any open desktop dropdown on outside click / Escape.
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (mobileWrapRef.current && !mobileWrapRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setDesktopMenu(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setDesktopMenu(null);
      }
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
    setMobileGroup(null);
  }

  function toggleDesktopMenu(menu: Exclude<DesktopMenu, null>) {
    setDesktopMenu((current) => (current === menu ? null : menu));
  }

  function toggleMobileGroup(group: Exclude<MobileGroup, null>) {
    setMobileGroup((current) => (current === group ? null : group));
  }

  return (
    <>
      {/* Home logo link — fixed top-left, visible at every breakpoint, on every
          page (Nav renders globally via app/layout.tsx). This is the fix for
          "no way back to the homepage from a child page": the wordmark itself
          is the backlink. Homepage keeps the light (cream-on-transparent)
          mark since its hero sits on a dark photo; every child page has a
          solid --paper background, so it gets the navy mark instead. */}
      <Link href="/" className={styles.logoLink} aria-label="Embedded System Coach — Home">
        <Image
          src={isHome ? "/images/logo/esc-logo-navbar-light.png" : "/images/logo/esc-logo-navbar.png"}
          alt="Embedded System Coach"
          width={224}
          height={80}
          priority
          className={styles.logoImage}
        />
      </Link>

      {/* Desktop: floating Paper pill. "The Program" and "Weekend Sessions"
          are click-toggled dropdowns — ELEVATED-SOLID panels (--teal-800
          fill, --shadow-glass, no backdrop-blur) per the governance note in
          styles/tokens.css, the same treatment the mobile panel already
          uses below. */}
      <nav ref={navRef} className={`font-body ${styles.pill}`} aria-label="Primary">
        <div className={styles.desktopItems}>
          <div className={styles.dropdownWrap}>
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={desktopMenu === "program"}
              onClick={() => toggleDesktopMenu("program")}
              className={`${styles.navItem} ${isProgramActive ? styles.navItemActive : ""}`}
            >
              The Program
            </button>
            <div
              className={`${styles.desktopDropdown} ${
                desktopMenu === "program" ? styles.desktopDropdownOpen : ""
              }`}
            >
              {PROGRAM_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setDesktopMenu(null)}
                  className={`${styles.desktopDropdownItem} ${
                    pathname === link.href ? styles.desktopDropdownItemActive : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.dropdownWrap}>
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={desktopMenu === "sessions"}
              onClick={() => toggleDesktopMenu("sessions")}
              className={`${styles.navItem} ${isSessionsActive ? styles.navItemActive : ""}`}
            >
              Weekend Sessions
            </button>
            <div
              className={`${styles.desktopDropdown} ${
                desktopMenu === "sessions" ? styles.desktopDropdownOpen : ""
              }`}
            >
              {SESSION_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setDesktopMenu(null)}
                  className={`${styles.desktopDropdownItem} ${
                    pathname === link.href ? styles.desktopDropdownItemActive : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
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
          <Link href="/blog" className={`${styles.navItem} ${isBlogActive ? styles.navItemActive : ""}`}>
            Blog
          </Link>
        </div>
      </nav>

      {/* Mobile: no pill/bar — just the hamburger toggle, with a small Paper
          chip behind it so the Dark Teal bars stay legible over the dark hero
          photo (a fully transparent button here would be invisible against
          it). Tapping opens a compact ELEVATED-SOLID panel anchored below it,
          not a full-screen takeover. The Program / Weekend Sessions are
          in-panel accordions rather than a second-level flyout — no room
          for a flyout at mobile widths. */}
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
          <button
            type="button"
            aria-expanded={mobileGroup === "program"}
            onClick={() => toggleMobileGroup("program")}
            className={`${styles.mobilePanelItem} ${styles.mobilePanelGroupTrigger} ${
              isProgramActive ? styles.mobilePanelItemActive : ""
            }`}
          >
            The Program
          </button>
          <div
            className={`${styles.mobileAccordion} ${
              mobileGroup === "program" ? styles.mobileAccordionOpen : ""
            }`}
          >
            {PROGRAM_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={`${styles.mobilePanelItem} ${styles.mobilePanelSubItem} ${
                  pathname === link.href ? styles.mobilePanelItemActive : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            aria-expanded={mobileGroup === "sessions"}
            onClick={() => toggleMobileGroup("sessions")}
            className={`${styles.mobilePanelItem} ${styles.mobilePanelGroupTrigger} ${
              isSessionsActive ? styles.mobilePanelItemActive : ""
            }`}
          >
            Weekend Sessions
          </button>
          <div
            className={`${styles.mobileAccordion} ${
              mobileGroup === "sessions" ? styles.mobileAccordionOpen : ""
            }`}
          >
            {SESSION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={`${styles.mobilePanelItem} ${styles.mobilePanelSubItem} ${
                  pathname === link.href ? styles.mobilePanelItemActive : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

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
          <Link
            href="/blog"
            className={`${styles.mobilePanelItem} ${isBlogActive ? styles.mobilePanelItemActive : ""}`}
            onClick={closeMobileMenu}
          >
            Blog
          </Link>
        </div>
      </div>
    </>
  );
}
