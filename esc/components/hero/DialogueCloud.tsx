import type { ReactNode } from "react";

type TailPosition = "left" | "right" | "top" | "none";

const tailClasses: Record<Exclude<TailPosition, "none">, string> = {
  right:
    "absolute top-8 -right-[9px] h-4 w-4 rotate-45 border-r-2 border-t-2 border-esc-dark-teal bg-esc-paper",
  left: "absolute top-8 -left-[9px] h-4 w-4 rotate-45 border-l-2 border-b-2 border-esc-dark-teal bg-esc-paper",
  top: "absolute -top-[9px] left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l-2 border-t-2 border-esc-dark-teal bg-esc-paper",
};

export default function DialogueCloud({
  children,
  tail = "none",
  className = "",
}: {
  children: ReactNode;
  tail?: TailPosition;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-lg border-2 border-esc-dark-teal bg-esc-paper px-6 py-5 shadow-esc-md ${className}`}
    >
      <p className="font-body text-base leading-relaxed text-esc-dark-teal sm:text-lg lg:text-xl">
        {children}
      </p>
      {tail !== "none" && <span className={tailClasses[tail]} aria-hidden="true" />}
    </div>
  );
}
