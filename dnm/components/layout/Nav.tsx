import styles from "./Nav.module.css";

// PLACEHOLDER nav — a minimal fixed bar so the layout has structure.
// Replace with the real nav once IA/pages are decided (see ESC's Nav.tsx
// for the locked pill-desktop / hamburger-mobile pattern to reuse).
export default function Nav() {
  return (
    <nav className={styles.nav}>
      <span className={`font-display ${styles.wordmark}`}>DNM</span>
    </nav>
  );
}
