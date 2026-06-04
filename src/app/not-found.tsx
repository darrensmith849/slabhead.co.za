import Button from "@/components/ui/Button";
import NeonBadge from "@/components/atmosphere/NeonBadge";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* Local scanlines overlay for "broken signal" feel */}
      <div className="absolute inset-0 scanlines opacity-50 pointer-events-none" />

      <div className="relative">
        <NeonBadge tone="crimson" intensity="high">
          // SIGNAL_LOST
        </NeonBadge>

        <h1
          className="mt-8 font-display text-[120px] leading-none text-slab-neon-magenta neon-glow-magenta sm:text-[160px] glitch-text"
          style={{ animation: "neon-flicker 4s ease-in-out infinite" }}
        >
          404
        </h1>

        <p className="mt-4 font-display text-3xl text-slab-white">Signal Lost</p>
        <p className="mt-4 max-w-md font-mono text-sm uppercase tracking-widest text-slab-muted">
          {">"} This specimen has slipped through the matrix
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="neon" terminalPrefix>
            RECONNECT
          </Button>
          <Button href="/shop" variant="secondary">
            ← RETURN_TO_VAULT
          </Button>
        </div>
      </div>
    </div>
  );
}
