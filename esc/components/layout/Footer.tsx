import { Linkedin, Youtube } from "lucide-react";
import styles from "./Footer.module.css";

// Placeholder footer — not final, just enough so the page doesn't end
// abruptly. hrefs are "#" until real destinations exist.
const SOCIAL_LINKS: Array<{ label: string; href: string; Icon?: typeof Linkedin }> = [
  { label: "LinkedIn", href: "#", Icon: Linkedin },
  { label: "YouTube", href: "#", Icon: Youtube },
  // lucide-react has no Medium/Substack/Topmate icon — plain text label instead.
  { label: "Medium", href: "#" },
  { label: "Substack", href: "#" },
  { label: "Topmate", href: "#" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={`font-display ${styles.wordmark}`}>Embedded System Coach</p>

      <div className={styles.socialRow}>
        {SOCIAL_LINKS.map(({ label, href, Icon }) => (
          <a key={label} href={href} aria-label={label} className={styles.socialLink}>
            {Icon ? (
              <Icon size={24} strokeWidth={2} aria-hidden />
            ) : (
              <span className={`font-body ${styles.socialText}`}>{label}</span>
            )}
          </a>
        ))}
      </div>

      <p className={`font-mono ${styles.copyright}`}>© 2026 EmbeddedSystemCoach.com</p>
    </footer>
  );
}
