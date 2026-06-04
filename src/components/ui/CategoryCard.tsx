import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  description: string;
  href: string;
  count: number;
  icon?: ReactNode;
  /**
   * Code-rendered scene preset.
   * No image. Each scene is built from CSS gradients, SVG, and animations.
   */
  scene?: "pokemon" | "yugioh" | "mtg" | "culture" | "default";
}

/* ─────────────────────────────────────────────────────────
   Each "scene" is a self-contained CSS+SVG composition.
   No images. Designed to read as the category's identity.
   ───────────────────────────────────────────────────────── */

function PokemonScene() {
  return (
    <>
      {/* Electric blue field */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(0, 240, 255, 0.25) 0%, transparent 50%), " +
            "radial-gradient(circle at 70% 70%, rgba(168, 85, 247, 0.20) 0%, transparent 50%), " +
            "linear-gradient(135deg, #0A0A0F 0%, #0E1525 100%)",
        }}
      />
      {/* SVG lightning bolts (subtle, animated) */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="pkm-glow">
            <feGaussianBlur stdDeviation="2" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {[
          "M 80 0 L 70 90 L 100 90 L 60 200",
          "M 320 0 L 310 80 L 340 80 L 280 200",
          "M 200 -10 L 190 60 L 215 60 L 175 130",
        ].map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="#00F0FF"
            strokeWidth="1.5"
            fill="none"
            filter="url(#pkm-glow)"
            opacity="0.55"
            style={{ animation: `neon-flicker ${5 + i * 2}s ease-in-out infinite` }}
          />
        ))}
      </svg>
    </>
  );
}

function YugiohScene() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.20) 0%, transparent 60%), " +
            "linear-gradient(135deg, #0A0A0F 0%, #1A0F00 100%)",
        }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="-100 -100 200 200">
        <g
          stroke="#D4AF37"
          strokeWidth="0.7"
          fill="none"
          opacity="0.5"
          style={{ animation: "holo-rotate 14s linear infinite", transformOrigin: "0 0" }}
        >
          {/* Hexagram (two overlapping triangles) */}
          <polygon points="0,-60 52,30 -52,30" />
          <polygon points="0,60 52,-30 -52,-30" />
          <circle r="60" />
          <circle r="40" strokeDasharray="3 3" />
          <circle r="20" />
        </g>
        <circle r="6" fill="#D4AF37" opacity="0.7" style={{ filter: "blur(2px)" }} />
      </svg>
    </>
  );
}

function MtgScene() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 100%, rgba(34, 197, 94, 0.18) 0%, transparent 60%), " +
            "linear-gradient(180deg, #0A0F0A 0%, #0A0A0F 100%)",
        }}
      />
      {/* Floating wisps */}
      <div className="absolute inset-0">
        {[10, 30, 50, 70, 90].map((left, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-slab-success"
            style={{
              left: `${left}%`,
              top: `${20 + (i % 3) * 20}%`,
              opacity: 0.6,
              boxShadow: "0 0 8px rgba(34, 197, 94, 0.7), 0 0 16px rgba(34, 197, 94, 0.3)",
              animation: `particle-drift ${10 + i * 2}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}

function CultureScene() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255, 0, 200, 0.15) 0%, transparent 60%), " +
            "linear-gradient(135deg, #0F0518 0%, #0A0A0F 100%)",
        }}
      />
      {/* Cherry blossom petals */}
      <div className="absolute inset-0">
        {[15, 35, 55, 75, 90, 25].map((left, i) => (
          <div
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full"
            style={{
              left: `${left}%`,
              top: `-5%`,
              backgroundColor: "rgba(255, 195, 220, 0.7)",
              boxShadow: "0 0 4px rgba(255, 195, 220, 0.6)",
              animation: `petal-fall-${i} ${10 + i * 2}s linear infinite`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes petal-fall-0 { to { transform: translate(15px, 250px) rotate(360deg); opacity: 0; } }
        @keyframes petal-fall-1 { to { transform: translate(-20px, 250px) rotate(-360deg); opacity: 0; } }
        @keyframes petal-fall-2 { to { transform: translate(10px, 250px) rotate(360deg); opacity: 0; } }
        @keyframes petal-fall-3 { to { transform: translate(-15px, 250px) rotate(-360deg); opacity: 0; } }
        @keyframes petal-fall-4 { to { transform: translate(20px, 250px) rotate(360deg); opacity: 0; } }
        @keyframes petal-fall-5 { to { transform: translate(-10px, 250px) rotate(-360deg); opacity: 0; } }
      `}</style>
    </>
  );
}

function DefaultScene() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(201, 22, 90, 0.20) 0%, transparent 60%), " +
          "linear-gradient(135deg, #0A0A0F 0%, #1A0F2E 100%)",
      }}
    />
  );
}

const SCENES = {
  pokemon: PokemonScene,
  yugioh: YugiohScene,
  mtg: MtgScene,
  culture: CultureScene,
  default: DefaultScene,
};

export default function CategoryCard({
  title,
  description,
  href,
  count,
  icon,
  scene = "default",
}: CategoryCardProps) {
  const Scene = SCENES[scene];

  return (
    <Link
      href={href}
      className={cn(
        "group bracketed relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-xl border border-white/[0.06] bg-slab-black p-6",
        "transition-all duration-300 hover:border-slab-neon-cyan/40",
      )}
    >
      <Scene />
      {/* Bottom gradient for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-slab-black via-slab-black/60 to-transparent" />

      {/* Optional icon — abstract corner sigil */}
      {icon && (
        <div className="absolute top-4 right-4 text-2xl text-slab-neon-cyan/30 transition-all duration-300 group-hover:text-slab-neon-cyan/70 group-hover:scale-110">
          {icon}
        </div>
      )}

      <div className="relative z-10">
        <span className="font-mono text-[10px] uppercase tracking-widest text-slab-neon-cyan/70 neon-glow-cyan">
          // {count} ITEMS
        </span>
        <h3 className="mt-2 font-display text-2xl text-slab-white transition-colors group-hover:text-slab-neon-cyan">
          {title}
        </h3>
        <p className="mt-1 text-sm leading-snug text-slab-muted">{description}</p>
      </div>
    </Link>
  );
}
