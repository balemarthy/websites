import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "outline";
};

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
      ? "bg-esc-orange text-white shadow-esc-accent hover:opacity-90"
      : "border-2 border-esc-dark-teal text-esc-dark-teal hover:bg-dt-50";

  return (
    <button type="button" className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}
