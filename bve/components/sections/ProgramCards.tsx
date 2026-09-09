import { Compass, Megaphone, Building2 } from "lucide-react";
import styles from "./ProgramCards.module.css";

const PILLARS = [
  {
    Icon: Compass,
    eyebrow: "Pillar One",
    title: "Career Fluency",
    desc: "Resume writing, career clarity, negotiation, salary. For individuals — and for universities and colleges, together.",
  },
  {
    Icon: Megaphone,
    eyebrow: "Pillar Two",
    title: "Technical Branding Fluency",
    desc: "Personal brand building. LinkedIn and networking authority. The visibility work most engineers skip.",
  },
  {
    Icon: Building2,
    eyebrow: "Pillar Three",
    title: "BVE Consulting",
    desc: "Companies. University groups. Engineering-college internship consulting — embedded, career, and interview topics, brought to the room.",
  },
];

export default function ProgramCards() {
  return (
    <section id="programs" className={styles.section}>
      <div className={styles.grid}>
        {PILLARS.map(({ Icon, eyebrow, title, desc }) => (
          <div key={title} className={styles.card}>
            <div className={styles.iconWrap}>
              <Icon size={24} strokeWidth={2} aria-hidden />
            </div>
            <span className={`font-mono ${styles.eyebrow}`}>{eyebrow}</span>
            <h3 className={`font-display ${styles.title}`}>{title}</h3>
            <p className={`font-body ${styles.desc}`}>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
