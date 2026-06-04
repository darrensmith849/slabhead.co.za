import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  /**
   * - primary: solid crimson (default CTA)
   * - secondary: bordered surface (alt CTA)
   * - ghost: text-only (subtle)
   * - neon: cyberpunk hero variant — electric border + chase animation + neon glow
   */
  variant?: "primary" | "secondary" | "ghost" | "neon";
  size?: "sm" | "md" | "lg";
  /**
   * Full-width on mobile, natural width on >= sm.
   * Set on PRIMARY CTAs (checkout submit, ACQUIRE, INITIATE_HUNT, hero
   * actions, TRANSMIT_MESSAGE, etc.) — gives thumbs a proper tap surface
   * + the right "this is the action" weight on narrow viewports.
   *
   * Leave OFF for inline / secondary links (back, view-all, INCR/DECR).
   */
  block?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  /** Prepend an "EXECUTE >" terminal prefix (only for neon). */
  terminalPrefix?: boolean;
}

const variants = {
  primary:
    "bg-slab-crimson text-white hover:bg-slab-crimson-light shadow-lg shadow-slab-crimson/30 neon-box-crimson",
  secondary:
    "border border-white/10 bg-slab-surface/80 text-slab-white hover:bg-white/10 hover:border-slab-neon-cyan/40 backdrop-blur-sm",
  ghost:
    "text-slab-muted hover:text-slab-white hover:bg-white/5",
  neon:
    "border border-slab-electric/60 bg-slab-electric/[0.04] text-slab-white hover:text-slab-neon-cyan hover:border-slab-neon-cyan font-mono uppercase tracking-widest electric-border",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  block = false,
  className,
  onClick,
  type = "button",
  terminalPrefix = false,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200",
    variants[variant],
    sizes[size],
    // Full-width on mobile, natural on >=sm. Use flex when block so the
    // button fills its container even inside an inline-flex parent.
    block && "flex w-full sm:inline-flex sm:w-auto",
    className,
  );

  const content = (
    <>
      {terminalPrefix && variant === "neon" && (
        <span className="text-slab-neon-cyan/70">{">"}</span>
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
