/**
 * Stylized PSA grading slab — code-rendered cyberpunk reinterpretation
 * of the iconic graded-card case. Used as the hero's right-side anchor
 * on the homepage.
 *
 * Pure CSS + SVG, no images, no canvas. Tilted in 3D space with a
 * vertical scan-line sweeping the card window and a holographic
 * security strip cycling at the base.
 */
export default function PsaSlab() {
  return (
    <div className="relative">
      <div
        className="relative h-[560px] w-[360px]"
        style={{
          transform: "perspective(1400px) rotateY(-10deg) rotateX(3deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Slab body — translucent dark with cyan halo */}
        <div
          className="absolute inset-0 rounded-[18px] border-2 border-slab-neon-cyan/70"
          style={{
            background:
              "linear-gradient(135deg, rgba(26,15,46,0.7) 0%, rgba(10,10,15,0.92) 100%)",
            boxShadow:
              "0 0 40px rgba(0,240,255,0.35), 0 0 80px rgba(0,240,255,0.18), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        />

        {/* Bracketed corners — the cyberpunk frame motif */}
        <div className="absolute -top-1.5 -left-1.5 h-6 w-6 border-t-2 border-l-2 border-slab-neon-cyan" />
        <div className="absolute -top-1.5 -right-1.5 h-6 w-6 border-t-2 border-r-2 border-slab-neon-cyan" />
        <div className="absolute -bottom-1.5 -left-1.5 h-6 w-6 border-b-2 border-l-2 border-slab-neon-cyan" />
        <div className="absolute -bottom-1.5 -right-1.5 h-6 w-6 border-b-2 border-r-2 border-slab-neon-cyan" />

        {/* Red PSA grade label */}
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

          {/* Vertical scan line sweeping the card window */}
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
            animation: "slab-holo-strip 5s linear infinite",
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
        @keyframes slab-holo-strip {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
      `}</style>
    </div>
  );
}
