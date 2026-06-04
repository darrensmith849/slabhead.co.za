import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NeonBadgeProps {
  children: ReactNode;
  /** Color tone. Default: cyan. */
  tone?: "cyan" | "magenta" | "gold" | "crimson" | "electric" | "muted";
  /** Pulse / glow strength. Default: medium. */
  intensity?: "low" | "medium" | "high";
  className?: string;
}

const TONE: Record<
  NonNullable<NeonBadgeProps["tone"]>,
  { bg: string; border: string; text: string; glow: string }
> = {
  cyan: {
    bg: "bg-slab-neon-cyan/10",
    border: "border-slab-neon-cyan/40",
    text: "text-slab-neon-cyan",
    glow: "neon-glow-cyan",
  },
  magenta: {
    bg: "bg-slab-neon-magenta/10",
    border: "border-slab-neon-magenta/40",
    text: "text-slab-neon-magenta",
    glow: "neon-glow-magenta",
  },
  gold: {
    bg: "bg-slab-gold/10",
    border: "border-slab-gold/40",
    text: "text-slab-gold",
    glow: "neon-glow-gold",
  },
  crimson: {
    bg: "bg-slab-crimson/10",
    border: "border-slab-crimson/40",
    text: "text-slab-crimson-light",
    glow: "neon-glow-crimson",
  },
  electric: {
    bg: "bg-slab-electric/10",
    border: "border-slab-electric/40",
    text: "text-slab-electric",
    glow: "neon-glow-cyan",
  },
  muted: {
    bg: "bg-white/5",
    border: "border-white/15",
    text: "text-slab-muted",
    glow: "",
  },
};

const INTENSITY = {
  low: "px-2 py-0.5 text-[10px]",
  medium: "px-2.5 py-1 text-[11px]",
  high: "px-3 py-1.5 text-xs",
};

/**
 * Mono badge with a neon glow halo. Used for "NEW", "GRAIL", "LIMITED",
 * mission badges ("> SLABHUNTER // GLOBAL_OPERATIONS"), grader tags etc.
 */
export default function NeonBadge({
  children,
  tone = "cyan",
  intensity = "medium",
  className,
}: NeonBadgeProps) {
  const t = TONE[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded font-mono uppercase tracking-widest",
        t.bg,
        t.border,
        t.text,
        t.glow,
        "border",
        INTENSITY[intensity],
        className,
      )}
    >
      {children}
    </span>
  );
}
