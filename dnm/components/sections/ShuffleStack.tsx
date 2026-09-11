"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./ShuffleStack.module.css";

const ROLE_CLASSES = [styles.roleFront, styles.roleMiddle, styles.roleBack, styles.roleHidden];

// The exact shuffle state machine from ESC/BVE's program stack cards,
// generalized over content: `order` is always a complete permutation of the
// 4 visible card ids — role is array position, by construction, so there's
// no separate "which card has role X" lookup that could fall out of sync.
// Reused as-is (unchanged mechanically) by every stack on the site.
export function ShuffleStack<T>({
  items,
  label,
  renderCard,
}: {
  items: T[];
  label?: string;
  renderCard: (item: T) => ReactNode;
}) {
  const [order, setOrder] = useState([0, 1, 2, 3]);
  const [contentByCard, setContentByCard] = useState<Record<number, number>>({ 0: 0, 1: 1, 2: 2, 3: 3 });
  const [exitingId, setExitingId] = useState<number | null>(null);
  const nextContentRef = useRef(4);
  const [dotIdx, setDotIdx] = useState(0);

  useEffect(() => {
    const id = window.setInterval(shuffle, 3700);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function shuffle() {
    setOrder((prev) => {
      const exiting = prev[0];
      setExitingId(exiting);
      const next = [prev[1], prev[2], prev[3], exiting];
      window.setTimeout(() => {
        setContentByCard((p) => ({ ...p, [exiting]: nextContentRef.current % items.length }));
        nextContentRef.current++;
        setExitingId(null);
      }, 720);
      return next;
    });
    setDotIdx((p) => (p + 1) % items.length);
  }

  function roleClass(cardId: number) {
    if (cardId === exitingId) return styles.roleExit;
    const pos = order.indexOf(cardId);
    return ROLE_CLASSES[pos];
  }

  return (
    <div className={styles.stackOuter}>
      {label && <p className={`font-mono ${styles.stackLabel}`}>{label}</p>}
      <div className={styles.stackWrap}>
        {[0, 1, 2, 3].map((cardId) => {
          const item = items[contentByCard[cardId]];
          return (
            <div key={cardId} className={`${styles.card} ${roleClass(cardId)}`}>
              {renderCard(item)}
            </div>
          );
        })}
      </div>
      <div className={styles.dots} aria-hidden>
        {items.map((_, i) => (
          <span key={i} className={`${styles.dot} ${i === dotIdx ? styles.dotActive : ""}`} />
        ))}
      </div>
    </div>
  );
}
