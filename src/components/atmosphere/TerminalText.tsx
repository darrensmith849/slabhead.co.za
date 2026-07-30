"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TerminalTextProps {
  /** Text to type out. */
  text: string;
  /** ms per character. Default: 35. */
  speed?: number;
  /** Delay before typing starts (ms). Default: 0. */
  startDelay?: number;
  /** Show the blinking cursor at the end. Default: true. */
  cursor?: boolean;
  /** Render as which tag? Default: span. */
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
}

/**
 * Typewriter text that animates character-by-character on mount.
 * Used for hero headlines, log entries, terminal-style affordances.
 *
 * Respects prefers-reduced-motion: renders the full text immediately, no animation.
 */
export default function TerminalText({
  text,
  speed = 35,
  startDelay = 0,
  cursor = true,
  as: Tag = "span",
  className,
}: TerminalTextProps) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);
  const tRef = useRef<number | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      tRef.current = requestAnimationFrame(() => {
        setShown(text);
        setDone(true);
      });
      return () => {
        if (tRef.current != null) cancelAnimationFrame(tRef.current);
      };
    }

    let i = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const elapsed = now - start;
      if (elapsed < startDelay) {
        tRef.current = requestAnimationFrame(tick);
        return;
      }
      const target = Math.floor((elapsed - startDelay) / speed);
      if (target >= text.length) {
        setShown(text);
        setDone(true);
        return;
      }
      if (target !== i) {
        i = target;
        setShown(text.slice(0, i + 1));
      }
      tRef.current = requestAnimationFrame(tick);
    };

    tRef.current = requestAnimationFrame(tick);
    return () => {
      if (tRef.current != null) cancelAnimationFrame(tRef.current);
    };
  }, [text, speed, startDelay]);

  const showCursor = cursor && (!done || cursor);

  return (
    <Tag className={cn(showCursor ? "terminal-cursor" : "", className)}>
      {shown}
    </Tag>
  );
}
