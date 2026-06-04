"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeStripProps {
  /** Items to render in the marquee. Each becomes a separator-divided cell. */
  items: ReactNode[];
  /** Separator between items. Default: " // ". */
  separator?: string;
  /** Loop speed in seconds (full cycle). Default: 40. */
  duration?: number;
  /** Color tone of the items. Default: cyan. */
  tone?: "cyan" | "magenta" | "gold" | "crimson" | "muted";
  className?: string;
}

const TONE: Record<NonNullable<MarqueeStripProps["tone"]>, string> = {
  cyan: "text-slab-neon-cyan/80 neon-glow-cyan",
  magenta: "text-slab-neon-magenta/80 neon-glow-magenta",
  gold: "text-slab-gold/80 neon-glow-gold",
  crimson: "text-slab-crimson-light/80 neon-glow-crimson",
  muted: "text-slab-muted/80",
};

/**
 * Infinite horizontally-scrolling ticker. Used for trust signals on homepage,
 * fake live trades on /slabtrader, recent acquisitions on /grails, etc.
 *
 * CSS-only animation. Renders the items twice back-to-back for seamless loop.
 * Pauses on hover. Respects prefers-reduced-motion.
 */
export default function MarqueeStrip({
  items,
  separator = " // ",
  duration = 40,
  tone = "cyan",
  className,
}: MarqueeStripProps) {
  return (
    <div
      className={cn(
        "group/marquee relative w-full overflow-hidden border-y border-white/5 bg-slab-charcoal/30 py-2 backdrop-blur-sm",
        className,
      )}
    >
      <div
        className="flex w-max gap-0 whitespace-nowrap font-mono text-xs uppercase tracking-widest group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none"
        style={{
          animation: `marquee-scroll ${duration}s linear infinite`,
        }}
      >
        {/* Render twice for seamless loop */}
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center gap-0">
            {items.map((item, i) => (
              <span key={i} className={cn("flex items-center", TONE[tone])}>
                <span className="px-6">{item}</span>
                {i < items.length - 1 && (
                  <span className="text-slab-muted/40">{separator}</span>
                )}
                {i === items.length - 1 && (
                  <span className="text-slab-muted/40 pr-6">{separator}</span>
                )}
              </span>
            ))}
          </div>
        ))}
      </div>
      {/* Inline keyframes — keeps it self-contained */}
      <style jsx>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
