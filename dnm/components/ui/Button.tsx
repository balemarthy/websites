import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonOwnProps = {
  children: ReactNode;
  variant?: "primary" | "outline";
};

type ButtonAsButton = ButtonOwnProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = ButtonOwnProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

// Ported from esc/components/ui/Button.tsx (bve-dnm-component-port-brief.md
// Group 2) — same outline/primary variant system, repainted to DNM tokens.
export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md px-6 py-3 font-display text-xs uppercase tracking-wide transition-colors duration-base ease-standard sm:text-sm";
  const styles =
    variant === "primary"
      ? "bg-dnm-accent text-white shadow-[0_2px_14px_rgba(240,120,57,0.38)] hover:opacity-90"
      : "border-2 border-dnm-ink text-dnm-ink hover:bg-dnm-ink/5";

  if ("href" in props && props.href !== undefined) {
    return (
      <a className={`${base} ${styles} ${className}`} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={`${base} ${styles} ${className}`}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
