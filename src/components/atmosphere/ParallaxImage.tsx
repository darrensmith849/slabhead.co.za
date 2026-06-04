"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import NeonFrame from "./NeonFrame";

interface ParallaxImageProps {
  src: string;
  alt: string;
  /** Aspect ratio as a CSS value. Default: 16/9. */
  aspect?: string;
  /** Show the rotating neon border frame. Default: true. */
  framed?: boolean;
  /** Show scanlines overlay on hover. Default: true. */
  scanlines?: boolean;
  /** Color accent for the frame. Default: cyan. */
  accent?: "cyan" | "magenta" | "gold" | "crimson" | "electric";
  /** Parallax intensity. Default: 0.2 (20% of viewport scroll). */
  intensity?: number;
  className?: string;
}

/**
 * Framed image with subtle vertical parallax on scroll + optional scanlines.
 * Used for the ~4 real images we keep in the cyberpunk redesign —
 * homepage culture anchor, /pokemon hero, /culture hero, /slabhunter hero.
 *
 * The image moves slightly slower than scroll, giving a depth effect.
 * Respects prefers-reduced-motion.
 */
export default function ParallaxImage({
  src,
  alt,
  aspect = "16/9",
  framed = true,
  scanlines = true,
  accent = "cyan",
  intensity = 0.2,
  className,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : [`${-intensity * 100}%`, `${intensity * 100}%`],
  );

  const inner = (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl",
        scanlines && "scanlines",
      )}
      style={{ aspectRatio: aspect }}
    >
      <motion.div style={{ y }} className="absolute inset-[-15%]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </motion.div>
      {/* Soft vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-slab-black/20 via-transparent to-slab-black/60" />
    </div>
  );

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {framed ? <NeonFrame accent={accent}>{inner}</NeonFrame> : inner}
    </div>
  );
}
