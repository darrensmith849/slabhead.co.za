"use client";

import { ReactNode, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

interface HoloCardProps {
  children: ReactNode;
  /** Disable the 3D tilt — useful for already-large cards (grails) */
  noTilt?: boolean;
  className?: string;
}

// Tilt + framer-motion only load on pointer:fine devices. ssr:false so the
// framer chunk never ends up on the initial mobile payload.
const HoloCardTilted = dynamic(() => import("./HoloCardTilted"), { ssr: false });

/**
 * Wraps a card in a holographic shimmer surface (CSS) and — on devices
 * with a fine pointer (mouse / trackpad / pen) — a Framer Motion 3D tilt.
 *
 * On touch devices, save-data, or noTilt, returns a plain shimmer wrapper.
 * The framer-motion bundle is dynamic-imported, so touch devices never
 * pay the JS cost for an effect they can't see.
 */
export default function HoloCard({ children, noTilt = false, className }: HoloCardProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (noTilt) return;

    // Respect data-saver / reduced motion / coarse pointer (touch only)
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean };
      }
    ).connection;
    if (conn?.saveData) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const pointerFine = window.matchMedia("(pointer: fine)");
    const initialFrame = requestAnimationFrame(() => setEnabled(pointerFine.matches));

    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    pointerFine.addEventListener("change", onChange);
    return () => {
      cancelAnimationFrame(initialFrame);
      pointerFine.removeEventListener("change", onChange);
    };
  }, [noTilt]);

  if (enabled && !noTilt) {
    return <HoloCardTilted className={className}>{children}</HoloCardTilted>;
  }

  // Static shimmer — no framer, no JS handlers, no listeners
  return (
    <div className={cn("holo-shimmer rounded-xl", className)}>{children}</div>
  );
}
