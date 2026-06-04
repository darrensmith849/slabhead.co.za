"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PointerEvent, ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

interface HoloCardProps {
  children: ReactNode;
  /** Disable the 3D tilt — useful for already-large cards (grails) */
  noTilt?: boolean;
  className?: string;
}

/**
 * Wrap a card in this for:
 *  - subtle holographic gradient sweep on hover (via .holo-shimmer)
 *  - mouse-tracked 3D tilt (Framer Motion spring)
 *
 * On reduced-motion, tilt is disabled by Framer's built-in behaviour.
 */
export default function HoloCard({ children, noTilt = false, className }: HoloCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Pointer position normalised to [-0.5, 0.5]
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  // Spring-smoothed rotation (deg)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 18,
  });

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (noTilt) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={
        noTilt
          ? undefined
          : {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              perspective: 800,
            }
      }
      className={cn("holo-shimmer rounded-xl", className)}
    >
      {children}
    </motion.div>
  );
}
