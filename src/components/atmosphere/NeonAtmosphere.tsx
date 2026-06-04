"use client";

import { useEffect, useRef } from "react";

/**
 * Global cyberpunk atmosphere — fixed-position canvas behind everything.
 * Layers (top → bottom):
 *   1. Base radial gradient (CSS) — slab-haze fading to slab-black
 *   2. Drifting neon particles with lifespan (Canvas 2D)
 *   3. Slow drifting fog overlay (CSS gradient)
 *   4. SVG Cape Town silhouette (bottom 28%)
 *   5. Static vignette
 *
 * Particle lifecycle is deliberate: each particle fades in, drifts for a
 * fixed lifespan, then fades out and respawns at a fresh random position.
 * No edge-wrap → no zigzag artefacts when particles teleport across the
 * screen. Combined with a per-frame trail decay this keeps the field
 * looking like a quiet starfield even after long browsing sessions.
 *
 * Performance: paused when tab is hidden. Mobile uses ~half the particles.
 * Respects prefers-reduced-motion: stops animation but keeps static gradient.
 */
export default function NeonAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // static gradient only

    // Honour Save-Data + reduced-data — disable the canvas entirely so
    // we don't burn battery / CPU / cellular budget on atmosphere.
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn?.saveData) return;
    // Skip the field on 2G / slow-2g — atmosphere isn't worth the cost.
    if (conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g") return;

    const reducedData = window.matchMedia("(prefers-reduced-data: reduce)");
    if (reducedData.matches) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    // Quieter starfield on small screens. Touch devices use the same
    // count as mobile because they're typically battery-powered too.
    const particleCount = isMobile || isCoarsePointer ? 12 : 32;

    // Throttle to 30fps on mobile / touch — saves ~half the per-frame
    // CPU work. Desktop pointer-fine devices get 60fps for smoothness.
    const targetFrameMs = isMobile || isCoarsePointer ? 1000 / 30 : 0;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      // Reset to identity before scaling — prevents compound scaling
      // across multiple resizes, which would leave parts of the canvas
      // unfaded and baked-in trails accumulating.
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const COLORS = [
      "rgba(0, 240, 255, 0.65)", // cyan
      "rgba(255, 0, 200, 0.55)", // magenta
      "rgba(201, 22, 90, 0.55)", // crimson
      "rgba(168, 85, 247, 0.55)", // electric
      "rgba(212, 175, 55, 0.45)", // gold (rare)
    ];

    const spawn = (): Particle => {
      // Lifespan in frames assuming ~60fps → ~6s minimum, ~12s maximum
      const lifespan = 360 + Math.random() * 360;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.08 - 0.015, // slight upward drift
        r: 0.8 + Math.random() * 2.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.005 + Math.random() * 0.01,
        age: 0,
        lifespan,
        fadeFrames: 60, // frames at start + end where opacity ramps
      };
    };

    const seedParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, () => {
        const p = spawn();
        // Stagger ages so they don't all fade out together at the start
        p.age = Math.random() * p.lifespan * 0.8;
        return p;
      });
    };

    resize();
    seedParticles();

    let isVisible = true;
    const onVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => {
      resize();
      // Don't re-seed on resize — keeps existing particles, just adjusts
      // canvas size. Avoids a visible "blink" on window resize.
    };
    window.addEventListener("resize", onResize);

    let lastTime = performance.now();
    let lastFrameTime = lastTime;

    const render = (now: number) => {
      if (!isVisible) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }
      // 30fps throttle on mobile/touch: skip frame if not enough time elapsed
      if (targetFrameMs > 0 && now - lastFrameTime < targetFrameMs) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }
      lastFrameTime = now;
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;

      // Clear the canvas every frame on every device. The alpha-overpaint
      // "soft motion blur" trail looked good in theory but in practice the
      // canvas alpha compounds frame-over-frame — after a minute of sitting
      // on a page, the residue reads as smudges / fingerprints across the
      // viewport. Crisp particles with no trail is the correct call;
      // motion comes from the particle movement itself, not from blur.
      ctx.clearRect(0, 0, width, height);

      // Particles
      ctx.globalCompositeOperation = "lighter";
      const list = particlesRef.current;
      for (let i = 0; i < list.length; i++) {
        const p = list[i];
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);
        p.pulsePhase += p.pulseSpeed * dt;
        p.age += dt / 16;

        // Lifespan-based fade: 0 → 1 over first fadeFrames, hold,
        // 1 → 0 over last fadeFrames. Beyond lifespan, respawn.
        let lifeAlpha = 1;
        if (p.age < p.fadeFrames) {
          lifeAlpha = p.age / p.fadeFrames;
        } else if (p.age > p.lifespan - p.fadeFrames) {
          lifeAlpha = Math.max(0, (p.lifespan - p.age) / p.fadeFrames);
        }
        if (p.age >= p.lifespan) {
          // Respawn instead of wrap. No edge-jumps → no zigzag trails.
          list[i] = spawn();
          continue;
        }

        // Off-screen particles can still be killed early — saves drawing
        // cost and prevents trails leaving the viewport boundary.
        if (p.x < -20 || p.x > width + 20 || p.y < -20 || p.y > height + 20) {
          list[i] = spawn();
          continue;
        }

        const pulse = 0.55 + 0.45 * Math.sin(p.pulsePhase);
        const radius = p.r * (0.8 + pulse * 0.4);

        // Apply the lifespan alpha by tweaking the color's alpha channel
        const baseAlpha = parseFloat(p.color.match(/[\d.]+\)$/)?.[0] ?? "0.5");
        const adjustedColor = p.color.replace(
          /[\d.]+\)$/,
          `${(baseAlpha * lifeAlpha).toFixed(3)})`,
        );

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 5);
        gradient.addColorStop(0, adjustedColor);
        gradient.addColorStop(
          0.4,
          adjustedColor.replace(/[\d.]+\)$/, `${(0.15 * lifeAlpha).toFixed(3)})`),
        );
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      // No background here — the layered radial gradients now live on <html>
      // in globals.css. Duplicating them here was stacking two copies, which
      // combined with the canvas trails (now fixed) produced the mottled
      // "smudge" pattern across the viewport.
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Bottom city silhouette — abstract Cape Town skyline rendered as SVG */}
      <svg
        className="absolute bottom-0 left-0 h-[28%] w-full opacity-50"
        preserveAspectRatio="none"
        viewBox="0 0 1440 240"
        fill="currentColor"
      >
        <defs>
          <linearGradient id="city-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(10, 10, 15, 0)" />
            <stop offset="40%" stopColor="rgba(10, 10, 15, 0.5)" />
            <stop offset="100%" stopColor="rgba(10, 10, 15, 1)" />
          </linearGradient>
        </defs>
        <path
          d="M0,240 L0,180 L40,180 L40,150 L90,150 L90,170 L140,170 L140,130 L200,130 L200,110 L240,110 L240,140 L290,140 L290,160 L340,160 L340,100 L380,100 L380,80 L430,80 L430,120 L490,120 L490,150 L540,150 L540,90 L590,90 L590,70 L640,70 L640,110 L690,110 L690,140 L740,140 L740,100 L790,100 L790,80 L840,80 L840,130 L890,130 L890,160 L940,160 L940,110 L1000,110 L1000,90 L1050,90 L1050,130 L1100,130 L1100,150 L1160,150 L1160,120 L1220,120 L1220,170 L1280,170 L1280,140 L1340,140 L1340,170 L1400,170 L1400,150 L1440,150 L1440,240 Z"
          fill="rgba(168, 85, 247, 0.25)"
        />
        <rect width="1440" height="240" fill="url(#city-gradient)" />
      </svg>

      {/* Static vignette on top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(10, 10, 15, 0.45) 100%)",
        }}
      />
    </div>
  );
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  pulsePhase: number;
  pulseSpeed: number;
  age: number;
  lifespan: number;
  fadeFrames: number;
};
