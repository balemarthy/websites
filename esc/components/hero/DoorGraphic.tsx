import { Cpu, PenTool } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Static two-track door treatment. The "stage" div below is the only
 * part that needs to change when an animated frame-sequence door
 * replaces this static graphic later — the outer sizing, labels, and
 * layout in BeatCertainty stay put.
 */
export default function DoorGraphic({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex h-[220px] w-[170px] shrink-0 overflow-hidden rounded-lg border-2 border-esc-dark-teal bg-esc-paper shadow-esc-lg sm:h-[280px] sm:w-[220px] lg:h-[340px] lg:w-[260px] ${className}`}
    >
      {/* door stage */}
      <div className="flex h-full w-full">
        <DoorPanel label="DESIGN" icon={<PenTool size={22} strokeWidth={2} />} />
        <div className="w-[2px] shrink-0 bg-esc-dark-teal" />
        <DoorPanel label="ARCHITECTURE" icon={<Cpu size={22} strokeWidth={2} />} />
      </div>
    </div>
  );
}

function DoorPanel({ label, icon }: { label: string; icon: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-2 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-esc-dark-teal text-esc-dark-teal sm:h-12 sm:w-12">
        {icon}
      </span>
      <span className="font-display text-[10px] uppercase tracking-wide text-esc-dark-teal sm:text-xs">
        {label}
      </span>
    </div>
  );
}
