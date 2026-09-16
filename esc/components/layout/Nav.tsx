"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import styles from "./Nav.module.css";

// Desktop dropdowns and mobile accordions render the same two groups —
// drive both from one config instead of two near-identical JSX blocks each.
// "program" carries an `href` to the homepage's Programs section — there's
// no dedicated hub page, so the label itself is a real destination, not just
// a menu trigger. "sessions" has no equivalent hub, so it stays toggle-only.
const NAV_GROUPS = [
  {
    key: "program" as const,
    label: "The Program",
    href: "/#programs",
    links: [
      { label: "Embedded Software Design", href: "/programs/embedded-software-design" },
      { label: "Embedded Software Architecture", href: "/programs/embedded-software-architecture" },
    ],
  },
  {
    key: "sessions" as const,
    label: "Weekend Sessions",
    href: undefined as string | undefined,
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
  // whatever's behind it, no fill/blur/shadow) and the fixed top-left logo
  // switches to its light mark whenever a dark section — a photo hero, the
  // DoubtCloudHero canvas, or the site-wide --teal-800 Footer — sits behind
  // that fixed top-left corner; both go solid/navy the moment that corner is
  // over the light --paper background instead. A single tracked "hero"
  // element isn't enough: program pages go straight from DoubtCloudHero into
  // Footer with no paper in between, so dark-on-dark (or light-on-light) can
  // happen at either end, not just at the top. Every dark section instead
  // carries `data-dark-bg`, and on each scroll/resize tick we sample what's
  // actually stacked under the logo's fixed position (elementsFromPoint,
  // since the logo/pill sit on top of it in z-order) and check whether any
  // of it sits inside a `data-dark-bg` ancestor.
  useEffect(() => {
    function sampleOverDarkBg() {
      const stack = document.elementsFromPoint(30, 30);
      setOverHero(stack.some((el) => el.closest("[data-dark-bg]")));
    }

    sampleOverDarkBg();

    // No rAF throttle here on purpose — elementsFromPoint + a couple of
    // closest() walks is cheap, and rAF callbacks get starved in a
    // backgrounded/inactive tab, which would leave the logo/pill stuck on a
    // stale read until the tab regains focus.
    window.addEventListener("scroll", sampleOverDarkBg, { passive: true });
    window.addEventListener("resize", sampleOverDarkBg);
    return () => {
      window.removeEventListener("scroll", sampleOverDarkBg);
      window.removeEventListener("resize", sampleOverDarkBg);
    };
  }, [pathname]);

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
          is the backlink. Its color follows the same `overHero` signal as the
          pill: the light (cream-on-transparent) mark whenever a dark hero
          photo/canvas is behind the top-left corner (home's hero, or a
          program page's DoubtCloudHero — both while unscrolled), the navy
          mark once the page has scrolled onto its solid --paper background.
          Driving this off actual intersection rather than "is this the
          homepage" is what keeps the mark legible on every page and at every
          scroll position, not just home. */}
      <Link href="/" className={styles.logoLink} aria-label="Embedded System Coach — Home">
        <Image
          src={overHero ? "/images/logo/esc-logo-navbar-light.png" : "/images/logo/esc-logo-navbar.png"}
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
                {group.href ? (
                  <div className={`${styles.navItemSplit} ${isGroupActive ? styles.navItemActive : ""}`}>
                    <Link
                      href={group.href}
                      onClick={() => setDesktopMenu(null)}
                      className={styles.navItemSplitLabel}
                    >
                      {group.label}
                    </Link>
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={desktopMenu === group.key}
                      aria-label={`Toggle ${group.label} submenu`}
                      onClick={() => toggleDesktopMenu(group.key)}
                      className={`${styles.navItemSplitCaret} ${
                        desktopMenu === group.key ? styles.navItemSplitCaretOpen : ""
                      }`}
                    >
                      <ChevronDown size={14} strokeWidth={2.5} aria-hidden />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={desktopMenu === group.key}
                    onClick={() => toggleDesktopMenu(group.key)}
                    className={`${styles.navItem} ${isGroupActive ? styles.navItemActive : ""}`}
                  >
                    {group.label}
                  </button>
                )}
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
                {group.href ? (
                  <div
                    className={`${styles.mobilePanelItem} ${styles.mobilePanelGroupRow} ${
                      isGroupActive ? styles.mobilePanelItemActive : ""
                    }`}
                  >
                    <Link
                      href={group.href}
                      onClick={closeMobileMenu}
                      className={styles.mobilePanelGroupLabel}
                    >
                      {group.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={mobileGroup === group.key}
                      aria-label={`Toggle ${group.label} submenu`}
                      onClick={() => toggleMobileGroup(group.key)}
                      className={`${styles.mobilePanelGroupCaret} ${
                        mobileGroup === group.key ? styles.mobilePanelGroupCaretOpen : ""
                      }`}
                    >
                      <ChevronDown size={16} strokeWidth={2.5} aria-hidden />
                    </button>
                  </div>
                ) : (
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
                )}
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
