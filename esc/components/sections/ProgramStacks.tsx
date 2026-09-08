"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  ArrowDown,
  CheckCircle,
  CircuitBoard,
  Cpu,
  FileText,
  Layers,
  Route,
  Terminal,
  type LucideIcon,
} from "lucide-react";

// ===== Micro-diagrams — one per Type A card, each specific to its own content ===== //

function DesignDiagram1() {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="88" height="88" viewBox="0 0 88 88" fill="none" aria-hidden>
        <rect x="4" y="4" width="80" height="80" stroke="rgba(251,247,241,0.35)" strokeWidth="1.5" />
        <rect x="20" y="20" width="48" height="48" stroke="rgba(251,247,241,0.55)" strokeWidth="1.5" />
        <rect x="34" y="34" width="20" height="20" stroke="rgba(251,247,241,0.85)" strokeWidth="1.5" />
      </svg>
      <span
        className="font-mono text-[10px] uppercase tracking-[0.04em]"
        style={{ color: "rgba(251,247,241,0.6)" }}
      >
        DISCRETE → IC → SOC
      </span>
    </div>
  );
}

function DesignDiagram2() {
  return (
    <svg width="120" height="70" viewBox="0 0 120 70" fill="none" aria-hidden>
      <path d="M20 10 H12 V60 H20" stroke="rgba(251,247,241,0.5)" strokeWidth="1.5" />
      <path d="M100 10 H108 V60 H100" stroke="rgba(251,247,241,0.5)" strokeWidth="1.5" />
      <rect x="34" y="18" width="52" height="6" fill="rgba(251,247,241,0.75)" />
      <rect x="34" y="32" width="38" height="6" fill="rgba(251,247,241,0.55)" />
      <rect x="34" y="46" width="24" height="6" fill="rgba(251,247,241,0.35)" />
    </svg>
  );
}

function DesignDiagram3() {
  const positions = [8, 20, 32, 44, 56, 68];
  return (
    <svg width="24" height="76" viewBox="0 0 24 76" fill="none" aria-hidden>
      <line x1="12" y1="4" x2="12" y2="72" stroke="rgba(251,247,241,0.3)" strokeWidth="1.5" />
      {positions.map((y) => (
        <circle key={y} cx="12" cy={y} r="4" fill="rgba(251,247,241,0.8)" />
      ))}
    </svg>
  );
}

function DesignDiagram4() {
  const pinX = [16, 30, 44, 58, 72, 86];
  return (
    <svg width="102" height="56" viewBox="0 0 102 56" fill="none" aria-hidden>
      <rect x="8" y="12" width="86" height="32" stroke="rgba(251,247,241,0.6)" strokeWidth="1.5" />
      {pinX.map((x) => (
        <g key={x}>
          <line x1={x} y1="4" x2={x} y2="12" stroke="rgba(251,247,241,0.5)" strokeWidth="1.5" />
          <line x1={x} y1="44" x2={x} y2="52" stroke="rgba(251,247,241,0.5)" strokeWidth="1.5" />
        </g>
      ))}
    </svg>
  );
}

function ArchDiagram1() {
  return (
    <svg width="110" height="76" viewBox="0 0 110 76" fill="none" aria-hidden>
      <rect x="8" y="8" width="64" height="44" rx="2" stroke="rgba(251,247,241,0.45)" strokeWidth="1.5" />
      <line x1="16" y1="22" x2="52" y2="22" stroke="rgba(251,247,241,0.5)" strokeWidth="1.5" />
      <line x1="16" y1="32" x2="44" y2="32" stroke="rgba(251,247,241,0.5)" strokeWidth="1.5" />
      <rect x="38" y="24" width="64" height="44" rx="2" stroke="rgba(251,247,241,0.75)" strokeWidth="1.5" />
      <line x1="46" y1="38" x2="82" y2="38" stroke="rgba(251,247,241,0.8)" strokeWidth="1.5" />
      <line x1="46" y1="48" x2="74" y2="48" stroke="rgba(251,247,241,0.8)" strokeWidth="1.5" />
    </svg>
  );
}

function ArchDiagram2() {
  return (
    <svg width="80" height="88" viewBox="0 0 80 88" fill="none" aria-hidden>
      <path d="M8 8 H56 L72 24 V80 H8 Z" stroke="rgba(251,247,241,0.6)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M56 8 V24 H72" stroke="rgba(251,247,241,0.6)" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function ArchDiagram3() {
  const positions = [8, 22, 36, 50, 64];
  return (
    <svg width="24" height="72" viewBox="0 0 24 72" fill="none" aria-hidden>
      <line x1="12" y1="4" x2="12" y2="68" stroke="rgba(251,247,241,0.3)" strokeWidth="1.5" />
      {positions.map((y) => (
        <circle key={y} cx="12" cy={y} r="4" fill="rgba(251,247,241,0.8)" />
      ))}
    </svg>
  );
}

function ArchDiagram4() {
  return (
    <svg width="88" height="70" viewBox="0 0 88 70" fill="none" aria-hidden>
      <rect x="6" y="6" width="76" height="58" stroke="rgba(251,247,241,0.5)" strokeWidth="1.5" />
      <path
        d="M32 36 L42 46 L58 26"
        stroke="rgba(251,247,241,0.85)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

// ===== Content ===== //

type TypeACard = {
  type: "A";
  Icon: LucideIcon;
  tag: string;
  title: string;
  desc: string;
  Diagram: () => JSX.Element;
};

type TypeBCard = {
  type: "B";
  title: string;
  day1: string;
  day15: string;
};

type CardData = TypeACard | TypeBCard;

const DESIGN_CARDS: CardData[] = [
  {
    type: "A",
    Icon: Cpu,
    tag: "Hardware Reasoning",
    title: "THE REASONING FRAMEWORK",
    desc: "Hardware in three stages, software in four questions asked before a line gets written — what the chip needs, the core logic, what connectivity requires, what the customer-facing layer shows.",
    Diagram: DesignDiagram1,
  },
  {
    type: "A",
    Icon: Terminal,
    tag: "Build Infrastructure",
    title: "REAL-WORLD PROJECT",
    desc: "Modular design, Makefiles, and the same build infrastructure real production firmware runs on — not a toy demo.",
    Diagram: DesignDiagram2,
  },
  {
    type: "A",
    Icon: Route,
    tag: "Six Stages",
    title: "THE PATH",
    desc: "First real program on real hardware, the build-and-debug toolchain, datasheets and memory, peripherals and device drivers, a real RTOS, then a complete optimized application.",
    Diagram: DesignDiagram3,
  },
  {
    type: "A",
    Icon: CircuitBoard,
    tag: "ARM Hardware",
    title: "THE HARDWARE",
    desc: "Popular ARM-based boards. You're never stuck waiting on a part nobody stocks.",
    Diagram: DesignDiagram4,
  },
  {
    type: "B",
    title: "DAY 1 → DAY 15",
    day1: "You can make code work, but you can't always say why it's built that way.",
    day15: "You design systems you can explain line by line, not just make work.",
  },
];

const ARCHITECTURE_CARDS: CardData[] = [
  {
    type: "A",
    Icon: Layers,
    tag: "Design Discipline",
    title: "THE DISCIPLINE",
    desc: "CRC cards instead of guesswork. Event modelling instead of 'I think this triggers that.' A module catalog instead of a folder of files nobody can explain six months later.",
    Diagram: ArchDiagram1,
  },
  {
    type: "A",
    Icon: FileText,
    tag: "One Real Project",
    title: "ONE REAL PROJECT",
    desc: "Derived from a genuine use case, not a toy demo. Built from scratch across five live sessions, spaced three days apart on purpose.",
    Diagram: ArchDiagram2,
  },
  {
    type: "A",
    Icon: Route,
    tag: "Five Sessions",
    title: "THE ROADMAP",
    desc: "Problem definition and object model, CRC cards and event modelling, runtime model and module catalog, TDD and interface design, implementation and design review.",
    Diagram: ArchDiagram3,
  },
  {
    type: "A",
    Icon: CheckCircle,
    tag: "Interview-Ready",
    title: "WHAT YOU WALK AWAY WITH",
    desc: "A project you can explain decision by decision in an interview, not just show.",
    Diagram: ArchDiagram4,
  },
  {
    type: "B",
    title: "DAY 1 → DAY 15",
    day1: "You've shipped something real, but the reasoning behind it was mostly instinct.",
    day15: "You have a project you can walk anyone through, decision by decision — a habit of thinking that doesn't switch off.",
  },
];

// ===== Card shell styles (glass treatment) ===== //

const decoyBase: CSSProperties = {
  backgroundColor: "rgba(251,247,241,0.06)",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  border: "1px solid rgba(251,247,241,0.08)",
  borderRadius: "var(--radius-card)",
};

const activeCardStyle: CSSProperties = {
  backgroundColor: "rgba(251,247,241,0.09)",
  backdropFilter: "blur(24px) saturate(140%)",
  WebkitBackdropFilter: "blur(24px) saturate(140%)",
  border: "1px solid rgba(251,247,241,0.16)",
  borderRadius: "var(--radius-card)",
  boxShadow: "var(--shadow-glass)",
  padding: "28px",
  color: "var(--paper)",
};

function CardBody({ card }: { card: CardData }) {
  if (card.type === "B") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
        <div>
          <span
            className="block font-mono text-[11px] uppercase tracking-[0.04em]"
            style={{ color: "var(--orange-400)" }}
          >
            DAY 1
          </span>
          <p className="mt-2 font-body text-sm leading-relaxed" style={{ color: "rgba(251,247,241,0.9)" }}>
            {card.day1}
          </p>
        </div>
        <ArrowDown size={20} strokeWidth={1.5} style={{ color: "rgba(251,247,241,0.5)" }} />
        <div>
          <span
            className="block font-mono text-[11px] uppercase tracking-[0.04em]"
            style={{ color: "var(--orange-400)" }}
          >
            DAY 15
          </span>
          <p className="mt-2 font-body text-sm leading-relaxed" style={{ color: "rgba(251,247,241,0.9)" }}>
            {card.day15}
          </p>
        </div>
      </div>
    );
  }

  const { Icon, tag, title, desc, Diagram } = card;

  return (
    <>
      <Icon size={24} strokeWidth={1.5} style={{ color: "var(--paper)" }} />

      <h3
        className="font-display uppercase text-[20px] lg:text-[26px]"
        style={{ fontWeight: 700, letterSpacing: "0.02em", lineHeight: 1.15, marginTop: "16px" }}
      >
        {title}
      </h3>

      <div
        className="mt-4 flex flex-1 flex-col items-center justify-center"
        style={{
          backgroundColor: "rgba(251,247,241,0.05)",
          border: "1px solid rgba(251,247,241,0.08)",
          borderRadius: "var(--radius-panel)",
          padding: "20px",
        }}
      >
        <Diagram />
      </div>

      <span
        className="mt-4 inline-block self-start font-mono uppercase"
        style={{
          fontSize: "11px",
          letterSpacing: "0.04em",
          padding: "4px 12px",
          borderRadius: "var(--radius-pill)",
          backgroundColor: "var(--orange-500)",
          color: "var(--teal-800)",
        }}
      >
        {tag}
      </span>

      <p
        className="mt-3 font-body"
        style={{
          fontSize: "14px",
          lineHeight: 1.5,
          color: "rgba(251,247,241,0.85)",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {desc}
      </p>
    </>
  );
}

// ===== Self-cycling stack ===== //

function ProgramStack({ label, cards }: { label: string; cards: CardData[] }) {
  const [index, setIndex] = useState(0);
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);
  const outgoingTimeoutRef = useRef<number | null>(null);
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const start = () => {
      if (intervalRef.current !== null) return;
      intervalRef.current = window.setInterval(() => {
        setIndex((current) => {
          const next = (current + 1) % cards.length;
          if (!reducedMotion) {
            setOutgoingIndex(current);
            if (outgoingTimeoutRef.current !== null) window.clearTimeout(outgoingTimeoutRef.current);
            outgoingTimeoutRef.current = window.setTimeout(() => setOutgoingIndex(null), 500);
          }
          return next;
        });
      }, 5000);
    };
    const stop = () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      stop();
      if (outgoingTimeoutRef.current !== null) window.clearTimeout(outgoingTimeoutRef.current);
      observer.disconnect();
    };
  }, [cards.length, reducedMotion]);

  return (
    <div className="flex flex-col items-center" aria-label={label}>
      <div ref={containerRef} className="relative h-[400px] w-[280px] lg:h-[460px] lg:w-[340px]">
        <div aria-hidden className="absolute inset-0" style={{ ...decoyBase, transform: "translate(-16px,-12px) rotate(-6deg) scale(0.96)" }} />
        <div aria-hidden className="absolute inset-0" style={{ ...decoyBase, transform: "translate(16px,-12px) rotate(6deg) scale(0.96)" }} />

        {outgoingIndex !== null && (
          <div
            key={`out-${outgoingIndex}`}
            aria-hidden
            className="absolute inset-0 flex flex-col"
            style={{ ...activeCardStyle, animation: "stack-card-out 450ms var(--ease-premium) forwards", zIndex: 1 }}
          >
            <CardBody card={cards[outgoingIndex]} />
          </div>
        )}

        <div
          key={`in-${index}`}
          className="absolute inset-0 flex flex-col"
          style={{
            ...activeCardStyle,
            zIndex: 2,
            animation: reducedMotion ? undefined : "stack-card-in 450ms var(--ease-premium) forwards",
          }}
        >
          <CardBody card={cards[index]} />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-[6px]" aria-hidden>
        {cards.map((_, i) => (
          <span
            key={i}
            className="block h-[6px] w-[6px] rounded-full"
            style={{
              backgroundColor: i === index ? "var(--orange-500)" : "rgba(251,247,241,0.2)",
              transform: i === index ? "scale(1.3)" : "scale(1)",
              transitionProperty: "background-color, transform",
              transitionDuration: "300ms",
              transitionTimingFunction: "var(--ease-premium)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProgramStacks() {
  return (
    <section className="relative w-full overflow-hidden px-6 py-20" style={{ backgroundColor: "var(--teal-800)" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundImage: "radial-gradient(circle, rgba(238,126,68,0.35) 0%, rgba(238,126,68,0) 70%)" }}
      />

      <div className="relative mx-auto flex max-w-[1400px] flex-col items-center gap-16 lg:flex-row lg:items-start lg:justify-center lg:gap-24">
        <ProgramStack label="Embedded Software Design" cards={DESIGN_CARDS} />
        <ProgramStack label="Embedded Software Architecture" cards={ARCHITECTURE_CARDS} />
      </div>
    </section>
  );
}
