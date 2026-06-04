import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NeonFrameProps {
  children: ReactNode;
  /** Color of the rotating gradient border. Default: gold (grail). */
  accent?: "gold" | "cyan" | "magenta" | "crimson" | "electric";
  /** Border thickness in pixels. Default: 1. */
  thickness?: number;
  className?: string;
}

const GRADIENT: Record<NonNullable<NeonFrameProps["accent"]>, string> = {
  gold: "conic-gradient(from 0deg, #D4AF37, #FFD56B, #C9165A, #D4AF37)",
  cyan: "conic-gradient(from 0deg, #00F0FF, #A855F7, #00F0FF)",
  magenta: "conic-gradient(from 0deg, #FF00C8, #C9165A, #FF00C8)",
  crimson: "conic-gradient(from 0deg, #C9165A, #FF1F73, #FF00C8, #C9165A)",
  electric: "conic-gradient(from 0deg, #A855F7, #00F0FF, #A855F7)",
};

/**
 * Animated rotating gradient border. Wraps anything that deserves "grail"
 * treatment — featured product cards, hero images, important callouts.
 *
 * Uses a CSS mask trick to hollow out the center so the border looks like
 * a thin glowing frame instead of a filled box.
 */
export default function NeonFrame({
  children,
  accent = "gold",
  thickness = 1,
  className,
}: NeonFrameProps) {
  return (
    <div
      className={cn("relative rounded-xl p-[1px]", className)}
      style={{
        background: GRADIENT[accent],
        animation: "holo-rotate 8s linear infinite",
        backgroundSize: "200% 200%",
        padding: `${thickness}px`,
      }}
    >
      <div className="relative rounded-[11px] bg-slab-black">{children}</div>
    </div>
  );
}
