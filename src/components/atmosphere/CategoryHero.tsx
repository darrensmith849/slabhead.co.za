import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import NeonBadge from "./NeonBadge";

export type RoomTheme =
  | "pokemon"
  | "yugioh"
  | "mtg"
  | "culture"
  | "collectables"
  | "hunter"
  | "trader"
  | "liquidation"
  | "lab"
  | "underwriting"
  | "neutral";

interface CategoryHeroProps {
  title: string;
  description: string;
  /** Mono badge label, e.g. "// THE_POKEMON_WING" */
  label: string;
  theme: RoomTheme;
  /** Optional right-hand content (sub-category portals, stats) */
  children?: ReactNode;
}

/* ──────────────────────────────────────────────────────────────
   Each scene is a full-bleed code-rendered atmospheric backdrop.
   Designed at hero scale (60vh). Zero images.
   ────────────────────────────────────────────────────────────── */

function PokemonHeroScene() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, rgba(0, 240, 255, 0.25) 0%, transparent 50%), " +
            "radial-gradient(circle at 70% 60%, rgba(168, 85, 247, 0.20) 0%, transparent 55%), " +
            "linear-gradient(135deg, #050811 0%, #0E1525 100%)",
        }}
      />
      {/* Larger lightning bolts */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="pkm-hero-glow">
            <feGaussianBlur stdDeviation="3" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {[
          { d: "M 180 0 L 160 240 L 230 240 L 130 600", w: 2.5, op: 0.6, delay: 0 },
          { d: "M 980 0 L 960 200 L 1030 200 L 880 600", w: 2.5, op: 0.55, delay: 2 },
          { d: "M 560 -10 L 540 180 L 600 180 L 460 400", w: 1.8, op: 0.4, delay: 4 },
          { d: "M 720 -10 L 700 160 L 760 160 L 660 380", w: 1.8, op: 0.35, delay: 1 },
        ].map((p, i) => (
          <path
            key={i}
            d={p.d}
            stroke="#00F0FF"
            strokeWidth={p.w}
            fill="none"
            filter="url(#pkm-hero-glow)"
            opacity={p.op}
            style={{ animation: `neon-flicker ${6 + p.delay}s ease-in-out infinite` }}
          />
        ))}
      </svg>
      {/* Floating energy nodes */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-slab-neon-cyan"
            style={{
              width: `${4 + (i % 3) * 2}px`,
              height: `${4 + (i % 3) * 2}px`,
              left: `${(i * 13 + 7) % 100}%`,
              top: `${(i * 23 + 11) % 90}%`,
              opacity: 0.4,
              boxShadow: "0 0 12px rgba(0, 240, 255, 0.7), 0 0 24px rgba(0, 240, 255, 0.3)",
              animation: `particle-drift ${15 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}

function YugiohHeroScene() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.20) 0%, transparent 60%), " +
            "linear-gradient(135deg, #050405 0%, #1A0F00 100%)",
        }}
      />
      {/* Giant rotating hexagram */}
      <svg
        className="absolute inset-0 mx-auto h-full w-full max-w-[700px]"
        viewBox="-200 -200 400 400"
      >
        <g
          stroke="#D4AF37"
          strokeWidth="0.7"
          fill="none"
          style={{ animation: "holo-rotate 30s linear infinite", transformOrigin: "0 0" }}
        >
          <polygon points="0,-160 138,80 -138,80" opacity="0.5" />
          <polygon points="0,160 138,-80 -138,-80" opacity="0.5" />
          <circle r="160" opacity="0.35" />
          <circle r="120" strokeDasharray="4 8" opacity="0.4" />
          <circle r="80" opacity="0.5" />
          <circle r="40" opacity="0.6" />
        </g>
        <g
          stroke="#D4AF37"
          strokeWidth="0.4"
          fill="none"
          style={{ animation: "holo-rotate 60s linear infinite reverse", transformOrigin: "0 0" }}
        >
          <circle r="180" strokeDasharray="2 16" opacity="0.25" />
        </g>
        <circle r="12" fill="#D4AF37" opacity="0.7" filter="blur(4px)" />
      </svg>
    </>
  );
}

function MtgHeroScene() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(34, 197, 94, 0.18) 0%, transparent 60%), " +
            "radial-gradient(ellipse at 50% 0%, rgba(168, 85, 247, 0.10) 0%, transparent 50%), " +
            "linear-gradient(180deg, #050A07 0%, #0A0A0F 100%)",
        }}
      />
      {/* Floating wisps */}
      <div className="absolute inset-0">
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${3 + (i % 4) * 2}px`,
              height: `${3 + (i % 4) * 2}px`,
              left: `${(i * 11 + 5) % 100}%`,
              top: `${(i * 17 + 13) % 100}%`,
              backgroundColor: i % 3 === 0 ? "#A855F7" : "#22C55E",
              opacity: 0.5,
              boxShadow:
                i % 3 === 0
                  ? "0 0 10px rgba(168, 85, 247, 0.6), 0 0 20px rgba(168, 85, 247, 0.3)"
                  : "0 0 10px rgba(34, 197, 94, 0.6), 0 0 20px rgba(34, 197, 94, 0.3)",
              animation: `particle-drift ${18 + i * 1.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
      {/* Tree silhouettes at bottom */}
      <svg className="absolute bottom-0 left-0 right-0 h-1/3 w-full opacity-30" preserveAspectRatio="none" viewBox="0 0 1200 200">
        <path
          d="M0,200 L0,120 L60,120 L80,80 L120,100 L150,60 L200,90 L250,40 L300,80 L350,50 L400,90 L450,30 L500,70 L550,60 L600,30 L650,70 L700,50 L750,30 L800,80 L850,50 L900,90 L950,60 L1000,40 L1050,80 L1100,60 L1150,90 L1200,70 L1200,200 Z"
          fill="rgba(34, 197, 94, 0.4)"
        />
      </svg>
    </>
  );
}

function CultureHeroScene() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255, 0, 200, 0.13) 0%, transparent 60%), " +
            "radial-gradient(ellipse at 30% 30%, rgba(168, 85, 247, 0.08) 0%, transparent 50%), " +
            "linear-gradient(135deg, #0F0518 0%, #0A0A0F 100%)",
        }}
      />
      {/* Cherry blossom petals — varied trajectories */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${(i * 7 + 3) % 100}%`,
              top: `-6%`,
              width: "8px",
              height: "8px",
              borderRadius: "50% 0 50% 0",
              backgroundColor:
                i % 4 === 0
                  ? "rgba(255, 195, 220, 0.85)"
                  : i % 4 === 1
                    ? "rgba(255, 220, 235, 0.75)"
                    : i % 4 === 2
                      ? "rgba(255, 170, 205, 0.7)"
                      : "rgba(245, 210, 230, 0.8)",
              boxShadow: "0 0 4px rgba(255, 195, 220, 0.4)",
              transform: `rotate(${i * 20}deg)`,
              animation: `petal-fall-hero-${i % 6} ${14 + (i % 7) * 2}s linear infinite`,
              animationDelay: `${i * 1.2}s`,
            }}
          />
        ))}
      </div>
      {/* Vertical washi-paper character strokes */}
      <div className="absolute inset-y-0 right-0 hidden w-2/5 opacity-15 lg:block">
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(90deg, transparent, transparent 24px, rgba(255, 195, 220, 0.10) 24px, rgba(255, 195, 220, 0.10) 25px)",
          }}
        />
      </div>
      <style>{`
        @keyframes petal-fall-hero-0 { to { transform: translate(20px, 80vh) rotate(360deg); opacity: 0; } }
        @keyframes petal-fall-hero-1 { to { transform: translate(-30px, 80vh) rotate(-360deg); opacity: 0; } }
        @keyframes petal-fall-hero-2 { to { transform: translate(10px, 80vh) rotate(540deg); opacity: 0; } }
        @keyframes petal-fall-hero-3 { to { transform: translate(-15px, 80vh) rotate(-540deg); opacity: 0; } }
        @keyframes petal-fall-hero-4 { to { transform: translate(25px, 80vh) rotate(720deg); opacity: 0; } }
        @keyframes petal-fall-hero-5 { to { transform: translate(-25px, 80vh) rotate(-720deg); opacity: 0; } }
      `}</style>
    </>
  );
}

function CollectablesHeroScene() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(0, 240, 255, 0.12) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 80% 70%, rgba(212, 175, 55, 0.10) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 50% 50%, rgba(255, 0, 200, 0.06) 0%, transparent 60%), " +
            "linear-gradient(135deg, #050811 0%, #0A0A0F 100%)",
        }}
      />
      <div className="absolute inset-0">
        {Array.from({ length: 24 }).map((_, i) => {
          const colors = ["#00F0FF", "#D4AF37", "#A855F7", "#FF00C8"];
          const color = colors[i % 4];
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${2 + (i % 3) * 2}px`,
                height: `${2 + (i % 3) * 2}px`,
                left: `${(i * 13 + 7) % 100}%`,
                top: `${(i * 17 + 11) % 100}%`,
                backgroundColor: color,
                opacity: 0.5,
                boxShadow: `0 0 10px ${color}`,
                animation: `particle-drift ${15 + i * 1.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          );
        })}
      </div>
    </>
  );
}

function HunterHeroScene() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.10) 0%, transparent 50%), " +
            "linear-gradient(135deg, #04060A 0%, #0A0F18 100%)",
        }}
      />
      {/* Radar sweep — rotating arc */}
      <svg className="absolute inset-0 m-auto h-[600px] w-[600px]" viewBox="-300 -300 600 600">
        <defs>
          <radialGradient id="radar-sweep" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0, 240, 255, 0.4)" />
            <stop offset="100%" stopColor="rgba(0, 240, 255, 0)" />
          </radialGradient>
        </defs>
        {/* Concentric circles */}
        {[260, 200, 140, 80, 30].map((r) => (
          <circle key={r} r={r} stroke="rgba(0, 240, 255, 0.2)" strokeWidth="0.5" fill="none" />
        ))}
        {/* Crosshairs */}
        <line x1="-280" y1="0" x2="280" y2="0" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="0.5" />
        <line x1="0" y1="-280" x2="0" y2="280" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="0.5" />
        {/* Sweep beam */}
        <g style={{ animation: "holo-rotate 8s linear infinite", transformOrigin: "0 0" }}>
          <path
            d="M 0,0 L 260,-150 A 300,300 0 0,1 260,150 Z"
            fill="url(#radar-sweep)"
          />
        </g>
        {/* Target dots */}
        <circle cx="120" cy="-80" r="3" fill="#00F0FF" opacity="0.7" style={{ animation: "neon-flicker 4s ease-in-out infinite" }} />
        <circle cx="-180" cy="60" r="3" fill="#00F0FF" opacity="0.7" style={{ animation: "neon-flicker 5s ease-in-out infinite" }} />
        <circle cx="80" cy="180" r="3" fill="#00F0FF" opacity="0.7" style={{ animation: "neon-flicker 6s ease-in-out infinite" }} />
      </svg>
    </>
  );
}

function TraderHeroScene() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(201, 22, 90, 0.15) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 80% 50%, rgba(0, 240, 255, 0.15) 0%, transparent 50%), " +
            "linear-gradient(135deg, #050811 0%, #0A0A0F 100%)",
        }}
      />
      {/* Exchange arrows */}
      <svg className="absolute inset-0 m-auto h-[400px] w-[700px] max-w-full" viewBox="0 0 700 400">
        <defs>
          <filter id="trader-glow">
            <feGaussianBlur stdDeviation="2" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Left card outline */}
        <g stroke="#C9165A" strokeWidth="1" fill="none" opacity="0.5" filter="url(#trader-glow)">
          <rect x="80" y="100" width="160" height="220" rx="8" />
        </g>
        {/* Right card outline */}
        <g stroke="#00F0FF" strokeWidth="1" fill="none" opacity="0.5" filter="url(#trader-glow)">
          <rect x="460" y="100" width="160" height="220" rx="8" />
        </g>
        {/* Exchange arrows */}
        <g stroke="#A855F7" strokeWidth="2" fill="none" filter="url(#trader-glow)" opacity="0.7">
          <path d="M 250 180 L 450 180" />
          <path d="M 440 170 L 450 180 L 440 190" />
          <path d="M 450 240 L 250 240" />
          <path d="M 260 230 L 250 240 L 260 250" />
        </g>
      </svg>
    </>
  );
}

function LiquidationHeroScene() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(212, 175, 55, 0.18) 0%, transparent 55%), " +
            "linear-gradient(135deg, #0A0805 0%, #1A0F00 100%)",
        }}
      />
      {/* Vault door */}
      <svg className="absolute inset-0 m-auto h-[500px] w-[500px]" viewBox="-200 -200 400 400">
        <defs>
          <filter id="vault-glow">
            <feGaussianBlur stdDeviation="2" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Outer ring */}
        <circle r="180" stroke="rgba(212, 175, 55, 0.4)" strokeWidth="2" fill="none" filter="url(#vault-glow)" />
        {/* Inner ring with rivets */}
        <g style={{ animation: "holo-rotate 40s linear infinite", transformOrigin: "0 0" }}>
          <circle r="150" stroke="rgba(212, 175, 55, 0.3)" strokeWidth="0.5" fill="none" strokeDasharray="3 6" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const x = Math.cos(angle) * 150;
            const y = Math.sin(angle) * 150;
            return <circle key={i} cx={x} cy={y} r="3" fill="rgba(212, 175, 55, 0.5)" />;
          })}
        </g>
        {/* Center wheel */}
        <g style={{ animation: "holo-rotate 25s linear infinite reverse", transformOrigin: "0 0" }}>
          <circle r="80" stroke="rgba(212, 175, 55, 0.5)" strokeWidth="1" fill="none" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <line
              key={deg}
              x1="0"
              y1="0"
              x2={Math.cos((deg * Math.PI) / 180) * 80}
              y2={Math.sin((deg * Math.PI) / 180) * 80}
              stroke="rgba(212, 175, 55, 0.3)"
              strokeWidth="1"
            />
          ))}
          <circle r="20" stroke="rgba(212, 175, 55, 0.8)" strokeWidth="1" fill="none" />
          <circle r="6" fill="#D4AF37" opacity="0.8" filter="blur(2px)" />
        </g>
      </svg>
    </>
  );
}

function LabHeroScene() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0, 240, 255, 0.18) 0%, transparent 55%), " +
            "linear-gradient(135deg, #050811 0%, #081020 100%)",
        }}
      />
      {/* Lab grid + microscope view */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 240, 255, 0.06) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(0, 240, 255, 0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <svg className="absolute inset-0 m-auto h-[500px] w-[500px]" viewBox="-200 -200 400 400">
        <defs>
          <radialGradient id="lab-lens" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0, 240, 255, 0.20)" />
            <stop offset="60%" stopColor="rgba(0, 240, 255, 0.10)" />
            <stop offset="100%" stopColor="rgba(0, 240, 255, 0)" />
          </radialGradient>
        </defs>
        <circle r="140" fill="url(#lab-lens)" />
        <circle r="140" stroke="rgba(0, 240, 255, 0.5)" strokeWidth="1" fill="none" />
        <circle r="100" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="0.5" strokeDasharray="3 4" fill="none" />
        {/* Crosshair */}
        <line x1="-140" y1="0" x2="140" y2="0" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="0.5" />
        <line x1="0" y1="-140" x2="0" y2="140" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="0.5" />
        {/* DNA-like specimen */}
        <g opacity="0.7">
          {Array.from({ length: 12 }).map((_, i) => (
            <circle
              key={i}
              cx={Math.cos(i * 0.5) * 50}
              cy={i * 10 - 60}
              r="2"
              fill="#00F0FF"
              style={{ animation: `neon-flicker ${4 + i * 0.3}s ease-in-out infinite` }}
            />
          ))}
        </g>
      </svg>
    </>
  );
}

function UnderwritingHeroScene() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 30% 70%, rgba(168, 85, 247, 0.08) 0%, transparent 50%), " +
            "linear-gradient(135deg, #050405 0%, #0F0A05 100%)",
        }}
      />
      {/* Asset eval chart */}
      <svg className="absolute inset-0 mx-auto h-full w-full max-w-[800px]" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(212, 175, 55, 0.3)" />
            <stop offset="100%" stopColor="rgba(212, 175, 55, 0)" />
          </linearGradient>
        </defs>
        {/* Grid */}
        {[100, 150, 200, 250, 300].map((y) => (
          <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="rgba(212, 175, 55, 0.08)" strokeWidth="0.5" />
        ))}
        {/* Chart line — upward trend */}
        <path
          d="M 0,300 L 80,280 L 160,260 L 240,210 L 320,230 L 400,180 L 480,160 L 560,140 L 640,100 L 720,80 L 800,60"
          stroke="#D4AF37"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M 0,300 L 80,280 L 160,260 L 240,210 L 320,230 L 400,180 L 480,160 L 560,140 L 640,100 L 720,80 L 800,60 L 800,400 L 0,400 Z"
          fill="url(#chart-fill)"
        />
        {/* Data points */}
        {[
          [240, 210],
          [400, 180],
          [560, 140],
          [720, 80],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" fill="#D4AF37" style={{ animation: `neon-flicker ${5 + i}s ease-in-out infinite` }} />
        ))}
      </svg>
    </>
  );
}

function NeutralHeroScene() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(168, 85, 247, 0.10) 0%, transparent 55%), " +
          "linear-gradient(135deg, #0A0A0F 0%, #1A0F2E 100%)",
      }}
    />
  );
}

const SCENES: Record<RoomTheme, () => ReactNode> = {
  pokemon: PokemonHeroScene,
  yugioh: YugiohHeroScene,
  mtg: MtgHeroScene,
  culture: CultureHeroScene,
  collectables: CollectablesHeroScene,
  hunter: HunterHeroScene,
  trader: TraderHeroScene,
  liquidation: LiquidationHeroScene,
  lab: LabHeroScene,
  underwriting: UnderwritingHeroScene,
  neutral: NeutralHeroScene,
};

const THEME_ACCENT: Record<RoomTheme, "cyan" | "magenta" | "gold" | "crimson" | "electric"> = {
  pokemon: "cyan",
  yugioh: "gold",
  mtg: "electric",
  culture: "magenta",
  collectables: "cyan",
  hunter: "cyan",
  trader: "electric",
  liquidation: "gold",
  lab: "cyan",
  underwriting: "gold",
  neutral: "cyan",
};

/**
 * Full-bleed cyberpunk page hero. ZERO images — entirely code-rendered.
 * Each `theme` produces a distinct scene. Pair with CategoryPage or ServicePage
 * (or use standalone on bespoke pages).
 *
 * Accepts children for the right column — typically sub-category portals or
 * stats grid. Title + description occupy left column.
 */
export default function CategoryHero({
  title,
  description,
  label,
  theme,
  children,
}: CategoryHeroProps) {
  const Scene = SCENES[theme];
  const accent = THEME_ACCENT[theme];

  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden">
      <Scene />
      {/* Top + bottom fade for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-slab-black/40 via-transparent to-slab-black/80" />
      <div className="absolute inset-0 scanlines opacity-20" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8">
        <div className="flex flex-col justify-center">
          <NeonBadge tone={accent} intensity="high" className="w-fit">
            {label}
          </NeonBadge>
          <h1
            className={cn(
              "mt-6 font-display text-4xl leading-[1.05] tracking-tight text-slab-white sm:text-5xl lg:text-6xl",
            )}
          >
            {title}
          </h1>
          <p className="mt-4 max-w-xl font-mono text-sm leading-relaxed text-slab-muted sm:text-base">
            {">"} {description}
          </p>
        </div>
        {children && <div className="flex items-center">{children}</div>}
      </div>
    </section>
  );
}
