"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

// Desktop dropdowns and mobile accordions render the same two groups —
// drive both from one config instead of two near-identical JSX blocks each.
const NAV_GROUPS = [
  {
    key: "program" as const,
    label: "The Program",
    links: [
      { label: "Embedded Software Design", href: "/programs/embedded-software-design" },
      { label: "Embedded Software Architecture", href: "/programs/embedded-software-architecture" },
    ],
  },
  {
    key: "sessions" as const,
    label: "Weekend Sessions",
    links: [
      { label: "Bytes to Sockets", href: "/weekend-sessions/bytes-to-sockets" },
      { label: "BLE In Weekend", href: "/weekend-sessions/ble-in-weekend" },
      { label: "LM75 Driver Architecture", href: "/weekend-sessions/lm75-driver-architecture" },
    ],
  },
];

type NavGroupKey = (typeof NAV_GROUPS)[number]["key"];

export default function Nav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const mobileWrapRef = useRef<HTMLDivElement>(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<NavGroupKey | null>(null);
  const [mobileGroup, setMobileGroup] = useState<NavGroupKey | null>(null);
  const [overHero, setOverHero] = useState(false);

  const isHome = pathname === "/";
  const isDownloadsActive = pathname === "/downloads";
  const isAboutActive = pathname === "/about";
  const isBlogActive = pathname === "/blog";

  // Close any open dropdown/panel on route change — a same-nav link click
  // (Downloads, About Me, Blog, or a dropdown item itself) fires inside
  // navRef, so the outside-click handler below never sees it, and browser
  // back/forward don't fire a click at all.
  useEffect(() => {
    setDesktopMenu(null);
    setMobileOpen(false);
    setMobileGroup(null);
  }, [pathname]);

  // Desktop pill goes fully transparent (paper text floating directly over
  // the photo, no fill/blur/shadow) while the dark hero photo is behind it,
  // and solid Paper everywhere else — it can't stay transparent once
  // paper-background content (rest of the homepage, or any child page)
  // scrolls underneath it, there'd be nothing to read the text against. The
  // hero's pinned canvas fills the viewport for the entire height of its
  // scroll track, so "hero track still intersecting the viewport" is exactly
  // the same window as "dark photo is behind the pill."
  useEffect(() => {
    if (!isHome) {
      setOverHero(false);
      return;
    }
    const track = document.querySelector("[data-hero-scroll-track]");
    if (!track) {
      setOverHero(false);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setOverHero(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(track);
    return () => observer.disconnect();
  }, [isHome]);

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

  function toggleDesktopMenu(menu: NavGroupKey) {
    setDesktopMenu((current) => (current === menu ? null : menu));
  }

  function toggleMobileGroup(group: NavGroupKey) {
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
      <nav
        ref={navRef}
        className={`font-body ${styles.pill} ${overHero ? styles.pillGlass : ""}`}
        aria-label="Primary"
      >
        <div className={styles.desktopItems}>
          {NAV_GROUPS.map((group) => {
            const isGroupActive = group.links.some((link) => pathname === link.href);
            return (
              <div key={group.key} className={styles.dropdownWrap}>
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={desktopMenu === group.key}
                  onClick={() => toggleDesktopMenu(group.key)}
                  className={`${styles.navItem} ${isGroupActive ? styles.navItemActive : ""}`}
                >
                  {group.label}
                </button>
                <div
                  className={`${styles.desktopDropdown} ${
                    desktopMenu === group.key ? styles.desktopDropdownOpen : ""
                  }`}
                >
                  {group.links.map((link) => (
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
            );
          })}

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
          {NAV_GROUPS.map((group) => {
            const isGroupActive = group.links.some((link) => pathname === link.href);
            return (
              <div key={group.key}>
                <button
                  type="button"
                  aria-expanded={mobileGroup === group.key}
                  onClick={() => toggleMobileGroup(group.key)}
                  className={`${styles.mobilePanelItem} ${styles.mobilePanelGroupTrigger} ${
                    isGroupActive ? styles.mobilePanelItemActive : ""
                  }`}
                >
                  {group.label}
                </button>
                <div
                  className={`${styles.mobileAccordion} ${
                    mobileGroup === group.key ? styles.mobileAccordionOpen : ""
                  }`}
                >
                  {group.links.map((link) => (
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
              </div>
            );
          })}

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
