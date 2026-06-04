import Button from "@/components/ui/Button";
import CategoryHero, { type RoomTheme } from "@/components/atmosphere/CategoryHero";
import NeonBadge from "@/components/atmosphere/NeonBadge";
import NeonDivider from "@/components/atmosphere/NeonDivider";
import RevealOnScroll from "@/components/atmosphere/RevealOnScroll";

interface ProtocolStep {
  /** Mono header, e.g. "PHASE_1: TARGET_ACQUISITION" */
  phase: string;
  title: string;
  description: string;
}

interface ServicePageProps {
  title: string;
  tagline: string;
  description: string;
  protocol: ProtocolStep[];
  ctaText: string;
  ctaHref: string;
  /** Mission badge, e.g. "// SLABHUNTER // GLOBAL_OPERATIONS" */
  missionLabel: string;
  /** Visual theme — controls the hero scene */
  roomTheme: Extract<
    RoomTheme,
    "hunter" | "trader" | "liquidation" | "lab" | "underwriting"
  >;
  /** Optional regulatory disclosure (for loan broker / financial services) */
  disclosure?: string;
}

/**
 * Cyberpunk-mission template for service pages.
 *  • Top: full-bleed code-rendered hero scene
 *  • Below: protocol steps as terminal data cards
 *  • CTA: electric border action button
 */
export default function ServicePage({
  title,
  tagline,
  description,
  protocol,
  ctaText,
  ctaHref,
  missionLabel,
  roomTheme,
  disclosure,
}: ServicePageProps) {
  const accent =
    roomTheme === "liquidation" || roomTheme === "underwriting"
      ? "gold"
      : roomTheme === "trader"
        ? "electric"
        : "cyan";

  return (
    <>
      <CategoryHero
        title={title}
        description={tagline}
        label={missionLabel}
        theme={roomTheme}
      />

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Long description */}
        <RevealOnScroll variant="fade-up">
          <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-slab-muted sm:text-lg">
            {description}
          </p>
        </RevealOnScroll>

        {/* Protocol steps */}
        <div className="mt-16">
          <NeonDivider
            label={`// ${roomTheme.toUpperCase()}_PROTOCOL`}
            accent={accent}
            className="mb-8"
          />
          <RevealOnScroll
            variant="fade-up"
            stagger={0.1}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {protocol.map((step, i) => (
              <div
                key={i}
                className="bracketed group relative rounded-xl border border-white/[0.06] bg-slab-charcoal/60 p-5 backdrop-blur-sm transition-all hover:border-slab-neon-cyan/40"
              >
                {/* Phase label header */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slab-neon-cyan/80 neon-glow-cyan">
                    {step.phase}
                  </span>
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-slab-success"
                    style={{ boxShadow: "0 0 6px rgba(34, 197, 94, 0.7)" }}
                  />
                </div>
                <h3 className="mt-4 font-display text-lg text-slab-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slab-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </RevealOnScroll>
        </div>

        {/* Optional disclosure */}
        {disclosure && (
          <div className="mt-12 rounded-xl border border-slab-gold/20 bg-slab-gold/[0.04] p-5">
            <NeonBadge tone="gold" intensity="low" className="mb-3">
              // REGULATORY_DISCLOSURE
            </NeonBadge>
            <p className="text-xs leading-relaxed text-slab-muted">{disclosure}</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 sm:text-center">
          <Button href={ctaHref} variant="neon" size="lg" terminalPrefix block>
            {ctaText}
          </Button>
        </div>
      </div>
    </>
  );
}
