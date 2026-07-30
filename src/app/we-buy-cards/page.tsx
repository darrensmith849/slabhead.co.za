import type { Metadata } from "next";
import CategoryHero from "@/components/atmosphere/CategoryHero";
import NeonBadge from "@/components/atmosphere/NeonBadge";
import NeonDivider from "@/components/atmosphere/NeonDivider";
import RevealOnScroll from "@/components/atmosphere/RevealOnScroll";

export const metadata: Metadata = {
  title: "We Buy Cards",
  description:
    "Sell slabs, raw cards, sealed products or a full collection to Slabhead for fair, market-related pricing.",
};

const interests = [
  ["SLABS", "Professionally graded cards from recognised grading companies."],
  ["RAW_CARDS", "Individual ungraded cards, from modern hits to vintage grails."],
  ["SEALED_PRODUCTS", "Booster boxes, packs, decks and other factory-sealed products."],
  ["COLLECTIONS", "Full or partial collections of any size."],
] as const;

const founders = [
  {
    name: "HEINRICH",
    number: "+27 83 454 9253",
    href: "https://wa.me/27834549253?text=Hi%20Heinrich%2C%20I%27d%20like%20a%20confidential%20evaluation%20of%20my%20card%20collection.",
  },
  {
    name: "JOAO",
    number: "+27 83 501 8993",
    href: "https://wa.me/27835018993?text=Hi%20Joao%2C%20I%27d%20like%20a%20confidential%20evaluation%20of%20my%20card%20collection.",
  },
] as const;

export default function WeBuyCardsPage() {
  return (
    <>
      <CategoryHero
        title="We Are Actively Acquiring Collections"
        description="Connect with us for a confidential evaluation and fair, market-related pricing."
        label="// ACQUISITIONS_DESK"
        theme="liquidation"
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <NeonBadge tone="gold" intensity="high">
            // CURRENTLY_BUYING
          </NeonBadge>
          <h2 className="mt-6 font-display text-3xl text-slab-white sm:text-4xl">
            Turn Your Collection Into a Fair Offer
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slab-muted">
            Send clear photos and a few basic details. We&apos;ll review the items privately,
            compare current market values, and come back to you with a no-obligation offer.
          </p>
        </div>

        <NeonDivider label="// WHAT_WE_BUY" accent="gold" className="mt-14 mb-8" />
        <RevealOnScroll
          variant="fade-up"
          stagger={0.08}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {interests.map(([title, description], index) => (
            <div
              key={title}
              className="bracketed rounded-xl border border-slab-gold/20 bg-slab-charcoal/60 p-5 backdrop-blur-sm"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-slab-gold">
                0{index + 1} // {title}
              </span>
              <p className="mt-3 text-sm leading-relaxed text-slab-muted">{description}</p>
            </div>
          ))}
        </RevealOnScroll>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-white/[0.07] bg-slab-charcoal/60 p-6 sm:p-8">
            <NeonDivider label="// EVALUATION_PROCESS" accent="cyan" className="mb-6" />
            <ol className="space-y-6">
              {[
                ["SEND_PHOTOS", "Photograph the front and back of key cards, slabs and sealed products."],
                ["ADD_DETAILS", "Include quantities, grading details, condition and whether this is a full or partial collection."],
                ["RECEIVE_EVALUATION", "We assess the collection confidentially and return with fair, market-related pricing."],
              ].map(([title, description], index) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slab-neon-cyan/40 font-mono text-xs text-slab-neon-cyan">
                    {index + 1}
                  </span>
                  <div>
                    <h2 className="font-mono text-sm uppercase tracking-widest text-slab-white">{title}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-slab-muted">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-slab-neon-magenta/30 bg-slab-neon-magenta/[0.04] p-6 sm:p-8">
            <NeonDivider label="// WHATSAPP_US" accent="magenta" className="mb-6" />
            <p className="text-sm leading-relaxed text-slab-muted">
              Start a private WhatsApp conversation with either founder. Attach your photos and basic details directly in the chat.
            </p>
            <div className="mt-6 space-y-3">
              {founders.map((founder) => (
                <a
                  key={founder.name}
                  href={founder.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-white/10 bg-slab-black/50 px-4 py-4 transition-all hover:border-slab-neon-cyan/50 hover:bg-slab-neon-cyan/[0.05]"
                >
                  <span>
                    <span className="block font-mono text-xs uppercase tracking-widest text-slab-neon-cyan">
                      {founder.name}
                    </span>
                    <span className="mt-1 block text-sm text-slab-white">{founder.number}</span>
                  </span>
                  <span className="font-mono text-xs text-slab-muted transition-colors group-hover:text-slab-neon-cyan">
                    OPEN_CHAT {">"}
                  </span>
                </a>
              ))}
            </div>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-slab-muted">
              // CONFIDENTIAL · NO_OBLIGATION · SOUTH_AFRICA
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
