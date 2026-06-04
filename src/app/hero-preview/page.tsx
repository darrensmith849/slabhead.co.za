import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/ui/Button";
import NeonFrame from "@/components/atmosphere/NeonFrame";
import { getGrailProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Hero Preview — pick one",
  robots: { index: false, follow: false },
};

export default async function HeroPreview() {
  const grails = await getGrailProducts(1);
  const specimen = grails[0] ?? null;

  return (
    <>
      {/* Sticky comparison header */}
      <div className="sticky top-16 z-30 border-y border-slab-neon-cyan/30 bg-slab-black/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <span className="font-mono text-[11px] uppercase tracking-widest text-slab-neon-cyan/80 neon-glow-cyan">
            // HERO_PREVIEW
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-slab-muted sm:inline">
            Scroll · compare · pick B / C / D
          </span>
        </div>
      </div>

      <OptionB />
      <OptionC specimen={specimen} />
      <OptionD />

      {/* Footer hint */}
      <div className="border-t border-slab-neon-cyan/20 bg-slab-black/80 py-8 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-slab-muted">
            {">"} TELL ME WHICH ONE — B / C / D — AND I&apos;LL WIRE IT INTO THE HOMEPAGE
          </p>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Shared left side — identical on every option so the comparison is fair
// ─────────────────────────────────────────────────────────────────────

function HeroLeft() {
  return (
    <div className="flex flex-col justify-center">
      <span className="inline-flex items-center gap-2 self-start rounded border border-slab-neon-cyan/40 bg-slab-neon-cyan/[0.05] px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-slab-neon-cyan/90 neon-glow-cyan">
        // PSA · CGC · BGS // AUTHENTICATED
      </span>
      <h1 className="mt-6 font-display text-5xl leading-[0.95] text-slab-white sm:text-6xl md:text-7xl">
        <span>SOUTH AFRICA&apos;S</span>{" "}
        <span className="text-slab-neon-cyan neon-glow-cyan">HOME FOR</span>{" "}
        <span className="text-slab-crimson neon-glow-crimson">GRADED CARDS</span>
      </h1>
      <p className="mt-6 max-w-lg font-mono text-sm leading-relaxed text-slab-muted">
        {">"} Rare Pokémon, Yu-Gi-Oh &amp; Magic: The Gathering cards —
        professionally graded, securely shipped from Cape Town. Plus Japanese
        culture collectables, books &amp; art.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button href="/shop" variant="neon" size="lg" terminalPrefix block>
          BROWSE_INVENTORY
        </Button>
        <Button href="/slabhunter" variant="secondary" size="lg" block>
          CAN&apos;T FIND IT? WE HUNT IT
        </Button>
      </div>
    </div>
  );
}

function OptionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute top-6 left-6 z-30">
      <span className="rounded border border-slab-neon-cyan/60 bg-slab-black/85 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-slab-neon-cyan neon-glow-cyan backdrop-blur-sm">
        {children}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// OPTION B — Stylized PSA slab replica
// ─────────────────────────────────────────────────────────────────────

function OptionB() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden border-b-2 border-slab-neon-cyan/20 md:min-h-[100vh]">
      <OptionLabel>// OPTION B · STYLIZED PSA SLAB</OptionLabel>
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8">
        <HeroLeft />
        <div className="hidden items-center justify-center lg:flex">
          <PsaSlab />
        </div>
      </div>
    </section>
  );
}

function PsaSlab() {
  return (
    <div className="relative">
      <div
        className="relative h-[560px] w-[360px]"
        style={{
          transform: "perspective(1400px) rotateY(-10deg) rotateX(3deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Slab body */}
        <div
          className="absolute inset-0 rounded-[18px] border-2 border-slab-neon-cyan/70"
          style={{
            background:
              "linear-gradient(135deg, rgba(26,15,46,0.7) 0%, rgba(10,10,15,0.92) 100%)",
            boxShadow:
              "0 0 40px rgba(0,240,255,0.35), 0 0 80px rgba(0,240,255,0.18), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        />

        {/* Decorative corner brackets */}
        <div className="absolute -top-1.5 -left-1.5 h-6 w-6 border-t-2 border-l-2 border-slab-neon-cyan" />
        <div className="absolute -top-1.5 -right-1.5 h-6 w-6 border-t-2 border-r-2 border-slab-neon-cyan" />
        <div className="absolute -bottom-1.5 -left-1.5 h-6 w-6 border-b-2 border-l-2 border-slab-neon-cyan" />
        <div className="absolute -bottom-1.5 -right-1.5 h-6 w-6 border-b-2 border-r-2 border-slab-neon-cyan" />

        {/* Red PSA label */}
        <div
          className="absolute top-4 left-4 right-4 h-[72px] overflow-hidden rounded-[10px] border border-slab-crimson/80"
          style={{
            background: "linear-gradient(180deg, #DE1A65 0%, #8B0E3D 100%)",
            boxShadow:
              "0 0 25px rgba(201,22,90,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        >
          <div className="grid h-full grid-cols-[1fr_auto] items-center gap-3 px-4">
            <div>
              <div className="font-display text-2xl leading-none tracking-[0.18em] text-slab-white">
                PSA
              </div>
              <div className="mt-1 font-mono text-[7px] tracking-[0.18em] text-slab-white/90">
                PROFESSIONAL · AUTHENTICATOR
              </div>
              <div className="mt-1.5 font-mono text-[9px] text-slab-white/90">
                CERT # 98472651
              </div>
            </div>
            <div className="border-l border-slab-white/40 pl-3 text-center">
              <div className="font-mono text-[7px] tracking-widest text-slab-white/85">
                GEM_MINT
              </div>
              <div
                className="font-display text-[56px] leading-none text-slab-white"
                style={{ textShadow: "0 0 14px rgba(255,255,255,0.95)" }}
              >
                10
              </div>
            </div>
          </div>
        </div>

        {/* Card window */}
        <div
          className="absolute top-[96px] right-4 bottom-16 left-4 overflow-hidden rounded-[10px] border border-slab-neon-cyan/40"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,240,255,0.05), rgba(168,85,247,0.05))",
          }}
        >
          <div
            className="absolute inset-3 rounded-md"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,140,0,0.22), rgba(220,40,40,0.14), rgba(10,10,15,0.5))",
              boxShadow: "inset 0 0 60px rgba(255,140,0,0.18)",
            }}
          >
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-slab-neon-cyan/40">
                // SPECIMEN_ON_DISPLAY
              </div>
              <div className="mt-3 font-display text-4xl text-slab-white/55">
                CHARIZARD
              </div>
              <div className="mt-2 font-mono text-[9px] uppercase tracking-widest text-slab-muted">
                BASE SET · 1ST EDITION · HOLO
              </div>
              <div className="mt-8 h-px w-16 bg-slab-neon-cyan/30" />
              <div className="mt-3 font-mono text-[8px] uppercase tracking-widest text-slab-muted/60">
                CERTIFIED · ENCASED · INSURED
              </div>
            </div>
          </div>

          {/* Scan line */}
          <div
            className="pointer-events-none absolute inset-x-0 h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,240,255,0.85), transparent)",
              boxShadow: "0 0 14px rgba(0,240,255,0.95)",
              animation: "slab-scan 4.2s ease-in-out infinite",
            }}
          />
        </div>

        {/* Holographic security strip */}
        <div
          className="absolute right-4 bottom-4 left-4 h-9 overflow-hidden rounded-[8px]"
          style={{
            background:
              "linear-gradient(90deg, #FF00C8, #00F0FF, #A855F7, #FFD700, #FF00C8)",
            backgroundSize: "300% 100%",
            animation: "holo-strip 5s linear infinite",
            opacity: 0.78,
          }}
        >
          <div className="flex h-full items-center justify-center">
            <span className="font-mono text-[10px] font-semibold tracking-[0.25em] text-slab-black">
              SLABHEAD · AUTHENTICATED · ZA
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slab-scan {
          0% { top: 0; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes holo-strip {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// OPTION C — Specimen viewer with terminal diagnostics + scan line
// ─────────────────────────────────────────────────────────────────────

type Specimen = Awaited<ReturnType<typeof getGrailProducts>>[number] | null;

function OptionC({ specimen }: { specimen: Specimen }) {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden border-b-2 border-slab-neon-cyan/20 md:min-h-[100vh]">
      <OptionLabel>// OPTION C · SPECIMEN UNDER EXAMINATION</OptionLabel>
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8">
        <HeroLeft />
        <div className="hidden items-center justify-center lg:flex">
          <SpecimenViewer specimen={specimen} />
        </div>
      </div>
    </section>
  );
}

function SpecimenViewer({ specimen }: { specimen: Specimen }) {
  const imageSrc =
    specimen?.images[0]?.localPath ?? "/images/placeholder-specimen.svg";
  return (
    <div className="relative w-[420px]">
      {/* Top diagnostics row */}
      <div className="mb-4 flex justify-between font-mono text-[10px] uppercase tracking-widest">
        <div>
          <div className="text-slab-neon-cyan/85 neon-glow-cyan">
            {">"} AUTHENTICATING
          </div>
          <div className="mt-0.5 text-slab-muted">
            [STATUS:{" "}
            <span className="text-slab-success">VERIFIED</span>]
          </div>
        </div>
        <div className="text-right">
          <div className="text-slab-neon-cyan/85 neon-glow-cyan">
            {">"} EDGES: SHARP
          </div>
          <div className="mt-0.5 text-slab-muted">[100% CHECK]</div>
        </div>
      </div>

      {/* Specimen in NeonFrame */}
      <NeonFrame accent="cyan">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[11px] bg-slab-black scanlines">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image
            src={imageSrc}
            alt={specimen?.name ?? "Specimen"}
            fill
            sizes="420px"
            priority
            className="object-contain p-8"
          />
          {/* Specimen tag */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-2 rounded border border-slab-neon-cyan/30 bg-slab-black/70 px-2 py-1 backdrop-blur-sm">
            <span
              className="h-1.5 w-1.5 rounded-full bg-slab-neon-cyan"
              style={{ boxShadow: "0 0 8px rgba(0, 240, 255, 0.9)" }}
            />
            <span className="font-mono text-[10px] uppercase tracking-widest text-slab-neon-cyan/80">
              SPECIMEN_001
            </span>
          </div>
          {/* Vertical scan line */}
          <div
            className="pointer-events-none absolute inset-x-0 z-10 h-[3px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,240,255,0.95), transparent)",
              boxShadow: "0 0 18px rgba(0,240,255,1)",
              animation: "spec-scan 3.8s ease-in-out infinite",
            }}
          />
        </div>
      </NeonFrame>

      {/* Bottom diagnostics row */}
      <div className="mt-4 flex justify-between font-mono text-[10px] uppercase tracking-widest">
        <div>
          <div className="text-slab-neon-cyan/85 neon-glow-cyan">
            {">"} CENTERING: 60/40
          </div>
          <div className="mt-0.5 text-slab-muted">[ACCEPTABLE]</div>
        </div>
        <div className="text-right">
          <div className="text-slab-neon-cyan/85 neon-glow-cyan">
            {">"} SURFACE: PRISTINE
          </div>
          <div className="mt-0.5 text-slab-muted">[GEM]</div>
        </div>
      </div>

      {/* Grade verdict */}
      <div
        className="mt-5 rounded-md border border-slab-success/60 px-4 py-3"
        style={{
          background:
            "linear-gradient(90deg, rgba(34,197,94,0.06), rgba(34,197,94,0.02))",
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-mono text-[9px] tracking-widest text-slab-muted">
              // FINAL_VERDICT
            </div>
            <div
              className="font-display text-xl text-slab-success"
              style={{ textShadow: "0 0 16px rgba(34,197,94,0.6)" }}
            >
              PSA 10 · GEM MINT
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[9px] tracking-widest text-slab-muted">
              SKU
            </div>
            <div className="font-mono text-sm text-slab-white">
              {specimen?.sku ?? "01"}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spec-scan {
          0% { top: 0%; opacity: 0; }
          12% { opacity: 1; }
          88% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// OPTION D — Card constellation (scattered field of card silhouettes)
// ─────────────────────────────────────────────────────────────────────

// Hand-tuned positions (no Math.random — must be deterministic for SSR)
// x,y in % of container · r = rotate deg · s = scale · c = color
// d = animation-delay seconds for pulse offset
const CARDS: { x: number; y: number; r: number; s: number; c: string; d: number }[] = [
  { x: 8, y: 6, r: -18, s: 0.55, c: "cyan", d: 0.0 },
  { x: 26, y: 14, r: 8, s: 0.75, c: "magenta", d: 0.4 },
  { x: 48, y: 4, r: -6, s: 0.65, c: "gold", d: 0.8 },
  { x: 70, y: 12, r: 14, s: 0.85, c: "electric", d: 1.2 },
  { x: 88, y: 22, r: -10, s: 0.6, c: "cyan", d: 1.6 },

  { x: 4, y: 28, r: 18, s: 0.7, c: "magenta", d: 2.0 },
  { x: 22, y: 36, r: -14, s: 1.0, c: "cyan", d: 2.4 },
  { x: 44, y: 30, r: 6, s: 1.15, c: "crimson", d: 2.8 },
  { x: 64, y: 38, r: -8, s: 0.95, c: "gold", d: 3.2 },
  { x: 86, y: 44, r: 12, s: 0.75, c: "electric", d: 3.6 },

  { x: 12, y: 54, r: -22, s: 0.8, c: "gold", d: 4.0 },
  { x: 32, y: 60, r: 10, s: 1.1, c: "magenta", d: 4.4 },
  { x: 52, y: 56, r: -4, s: 1.3, c: "cyan", d: 4.8 },
  { x: 72, y: 64, r: 16, s: 0.9, c: "crimson", d: 5.2 },
  { x: 90, y: 58, r: -12, s: 0.65, c: "electric", d: 5.6 },

  { x: 6, y: 76, r: 8, s: 0.7, c: "electric", d: 6.0 },
  { x: 24, y: 82, r: -16, s: 0.85, c: "gold", d: 6.4 },
  { x: 46, y: 78, r: 22, s: 0.95, c: "magenta", d: 6.8 },
  { x: 66, y: 86, r: -10, s: 1.0, c: "cyan", d: 7.2 },
  { x: 84, y: 80, r: 14, s: 0.75, c: "crimson", d: 7.6 },

  { x: 16, y: 94, r: -8, s: 0.55, c: "magenta", d: 8.0 },
  { x: 38, y: 92, r: 12, s: 0.65, c: "cyan", d: 8.4 },
  { x: 60, y: 96, r: -18, s: 0.6, c: "gold", d: 8.8 },
  { x: 80, y: 92, r: 6, s: 0.7, c: "electric", d: 9.2 },
];

const CARD_COLOR: Record<
  string,
  { bg: string; border: string; glow: string; tag: string }
> = {
  cyan: {
    bg: "linear-gradient(135deg, rgba(0,240,255,0.22), rgba(0,240,255,0.04))",
    border: "rgba(0,240,255,0.55)",
    glow: "0 0 16px rgba(0,240,255,0.35)",
    tag: "#00F0FF",
  },
  magenta: {
    bg: "linear-gradient(135deg, rgba(255,0,200,0.22), rgba(255,0,200,0.04))",
    border: "rgba(255,0,200,0.55)",
    glow: "0 0 16px rgba(255,0,200,0.35)",
    tag: "#FF00C8",
  },
  gold: {
    bg: "linear-gradient(135deg, rgba(212,175,55,0.24), rgba(212,175,55,0.04))",
    border: "rgba(212,175,55,0.6)",
    glow: "0 0 16px rgba(212,175,55,0.4)",
    tag: "#D4AF37",
  },
  electric: {
    bg: "linear-gradient(135deg, rgba(168,85,247,0.22), rgba(168,85,247,0.04))",
    border: "rgba(168,85,247,0.55)",
    glow: "0 0 16px rgba(168,85,247,0.35)",
    tag: "#A855F7",
  },
  crimson: {
    bg: "linear-gradient(135deg, rgba(201,22,90,0.22), rgba(201,22,90,0.04))",
    border: "rgba(201,22,90,0.55)",
    glow: "0 0 16px rgba(201,22,90,0.35)",
    tag: "#C9165A",
  },
};

function OptionD() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden border-b-2 border-slab-neon-cyan/20 md:min-h-[100vh]">
      <OptionLabel>// OPTION D · CARD CONSTELLATION</OptionLabel>
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        <HeroLeft />
        <div className="relative hidden lg:block">
          <Constellation />
        </div>
      </div>
    </section>
  );
}

function Constellation() {
  return (
    <div className="relative h-[600px] w-full">
      {/* Soft radial glow behind the cards */}
      <div
        className="absolute inset-0 -m-12"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(168,85,247,0.06), transparent 70%)",
        }}
      />
      {CARDS.map((card, i) => {
        const c = CARD_COLOR[card.c];
        const w = 38 * card.s;
        const h = w * 1.4;
        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${card.x}%`,
              top: `${card.y}%`,
              width: `${w}px`,
              height: `${h}px`,
              transform: `translate(-50%, -50%) rotate(${card.r}deg)`,
              animation: "card-pulse 5s ease-in-out infinite",
              animationDelay: `${card.d}s`,
            }}
          >
            <div
              className="relative h-full w-full rounded-[5px] border"
              style={{
                background: c.bg,
                borderColor: c.border,
                boxShadow: c.glow,
              }}
            >
              {/* Tiny grade chip — top right */}
              <div
                className="absolute top-1 right-1 h-1.5 w-2.5 rounded-[1px]"
                style={{ background: c.tag, boxShadow: `0 0 6px ${c.tag}` }}
              />
              {/* Centered diamond — pretend card art */}
              <div
                className="absolute top-1/2 left-1/2 h-1/4 w-1/3 -translate-x-1/2 -translate-y-1/2 rotate-45"
                style={{ background: c.tag, opacity: 0.5 }}
              />
              {/* Inner bottom strip */}
              <div
                className="absolute right-1 bottom-1 left-1 h-px"
                style={{ background: c.tag, opacity: 0.4 }}
              />
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes card-pulse {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
