import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

const styles: Record<Variant, string> = {
  primary:   "bg-brand-green text-white hover:bg-brand-mint hover:text-brand-charcoal",
  secondary: "bg-brand-gold text-brand-charcoal hover:bg-brand-coral hover:text-white",
  ghost:     "bg-transparent border border-brand-green text-brand-green hover:bg-brand-green hover:text-white",
};

export default function Button({
  children,
  variant = "primary",
  onClick,
  className = "",
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-6 py-3 rounded-xl font-body font-medium text-sm
        transition-all duration-200 cursor-pointer
        ${styles[variant]} ${className}
      `}
    >
      {children}
    </button>
  );
}