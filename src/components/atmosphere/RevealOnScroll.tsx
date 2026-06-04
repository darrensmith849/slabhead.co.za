"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "fade-up" | "fade-in" | "slide-in-x" | "scale";

interface RevealOnScrollProps {
  children: ReactNode;
  /** Animation style. Default: fade-up. */
  variant?: Variant;
  /** Stagger delay between children (s). Only applies when children is a list. */
  stagger?: number;
  /** Delay before this element animates in (s). */
  delay?: number;
  /** Initial animation duration (s). Default: 0.6. */
  duration?: number;
  className?: string;
}

const VARIANTS: Record<Variant, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "slide-in-x": {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
};

/**
 * IntersectionObserver-based entrance animation via Framer Motion's whileInView.
 *
 * If `stagger` is set, children are wrapped in a parent variants chain so each
 * direct child animates in sequence. Otherwise the element animates as one.
 *
 * Respects prefers-reduced-motion via Framer's `useReducedMotion`.
 */
export default function RevealOnScroll({
  children,
  variant = "fade-up",
  stagger,
  delay = 0,
  duration = 0.6,
  className,
}: RevealOnScrollProps) {
  const reduce = useReducedMotion();
  const v = VARIANTS[variant];

  if (reduce) {
    // No motion — render straight through but keep className/structure.
    return <div className={className}>{children}</div>;
  }

  if (stagger) {
    return (
      <motion.div
        className={cn(className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: stagger,
              delayChildren: delay,
            },
          },
        }}
      >
        {Array.isArray(children)
          ? children.map((child, i) => (
              <motion.div
                key={i}
                variants={v}
                transition={{ duration, ease: "easeOut" }}
              >
                {child}
              </motion.div>
            ))
          : children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={v}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
