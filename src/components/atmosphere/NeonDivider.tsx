import { cn } from "@/lib/utils";

interface NeonDividerProps {
  /** Optional mono label rendered above the divider line, e.g. "// LATEST_ACQUISITIONS" */
  label?: string;
  /** Color accent for the divider line. Default: cyan. */
  accent?: "cyan" | "magenta" | "gold" | "crimson" | "electric";
  className?: string;
}

const ACCENT: Record<
  NonNullable<NeonDividerProps["accent"]>,
  { line: string; tick: string; glow: string }
> = {
  cyan: {
    line: "from-transparent via-slab-neon-cyan to-transparent",
    tick: "bg-slab-neon-cyan",
    glow: "neon-glow-cyan",
  },
  magenta: {
    line: "from-transparent via-slab-neon-magenta to-transparent",
    tick: "bg-slab-neon-magenta",
    glow: "neon-glow-magenta",
  },
  gold: {
    line: "from-transparent via-slab-gold to-transparent",
    tick: "bg-slab-gold",
    glow: "neon-glow-gold",
  },
  crimson: {
    line: "from-transparent via-slab-crimson to-transparent",
    tick: "bg-slab-crimson",
    glow: "neon-glow-crimson",
  },
  electric: {
    line: "from-transparent via-slab-electric to-transparent",
    tick: "bg-slab-electric",
    glow: "neon-glow-cyan",
  },
};

export default function NeonDivider({
  label,
  accent = "cyan",
  className,
}: NeonDividerProps) {
  const a = ACCENT[accent];
  return (
    <div className={cn("my-8 flex flex-col items-start gap-3", className)}>
      {label && (
        <span
          className={cn(
            "font-mono text-xs uppercase tracking-widest text-slab-muted",
            a.glow,
          )}
        >
          {label}
        </span>
      )}
      <div className="flex w-full items-center gap-2">
        <div className={cn("h-3 w-px opacity-60", a.tick)} />
        <div className={cn("h-px flex-1 bg-gradient-to-r animate-pulse", a.line)} />
        <div className={cn("h-3 w-px opacity-60", a.tick)} />
      </div>
    </div>
  );
}
