"use client";

import { useEffect, useRef } from "react";

/**
 * Global cyberpunk atmosphere — fixed-position WebGL canvas behind everything.
 * Layers (top → bottom):
 *   1. Base radial gradient (CSS) — slab-haze fading to slab-black
 *   2. Drifting neon particles (Canvas 2D — keeps bundle small; matches OGL feel without WebGL plumbing)
 *   3. Fog noise (canvas)
 *   4. SVG Cape Town silhouette (bottom 25%)
 *
 * Performance: paused when tab is hidden. Mobile uses ~half the particles.
 * Respects prefers-reduced-motion: stops animation but keeps static gradient + silhouette.
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

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const particleCount = isMobile ? 30 : 55;

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
      ctx.scale(dpr, dpr);
    };

    // Seed particles
    const COLORS = [
      "rgba(0, 240, 255, 0.65)",   // cyan
      "rgba(255, 0, 200, 0.55)",   // magenta
      "rgba(201, 22, 90, 0.55)",   // crimson
      "rgba(168, 85, 247, 0.55)",  // electric
      "rgba(212, 175, 55, 0.45)",  // gold (rare)
    ];

    const seedParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.10 - 0.02, // slight upward drift
        r: 0.8 + Math.random() * 2.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.005 + Math.random() * 0.01,
      }));
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
      seedParticles();
    };
    window.addEventListener("resize", onResize);

    let lastTime = performance.now();

    const render = (now: number) => {
      if (!isVisible) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;

      // Trail-fade: low-alpha black overpaint for soft motion blur
      ctx.fillStyle = "rgba(10, 10, 15, 0.18)";
      ctx.fillRect(0, 0, width, height);

      // Particles
      ctx.globalCompositeOperation = "lighter";
      for (const p of particlesRef.current) {
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);
        p.pulsePhase += p.pulseSpeed * dt;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const pulse = 0.55 + 0.45 * Math.sin(p.pulsePhase);
        const radius = p.r * (0.8 + pulse * 0.4);

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 5);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(0.4, p.color.replace(/[\d.]+\)$/, "0.15)"));
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
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 30%, var(--color-slab-haze) 0%, transparent 60%), " +
          "radial-gradient(ellipse 60% 40% at 10% 90%, rgba(168, 85, 247, 0.08) 0%, transparent 60%), " +
          "radial-gradient(ellipse 60% 40% at 90% 10%, rgba(0, 240, 255, 0.06) 0%, transparent 60%), " +
          "var(--color-slab-black)",
      }}
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Slow drifting fog overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 30% 40%, rgba(168, 85, 247, 0.10) 0%, transparent 50%), " +
            "radial-gradient(ellipse 50% 70% at 70% 60%, rgba(0, 240, 255, 0.08) 0%, transparent 50%)",
          animation: "fog-drift 60s ease-in-out infinite",
        }}
      />

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
};
