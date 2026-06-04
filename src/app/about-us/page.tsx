import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import NeonBadge from "@/components/atmosphere/NeonBadge";
import NeonDivider from "@/components/atmosphere/NeonDivider";
import RevealOnScroll from "@/components/atmosphere/RevealOnScroll";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the Slabhead team — a group of South African collectors building a trusted marketplace for graded cards and collectables.",
};

const LOG_ENTRIES = [
  {
    id: "ENTRY_001",
    date: "2025_07_01",
    title: "ORIGIN",
    body: (
      <>
        <p>
          Slabhead was born from a simple idea: South African collectors deserve a safe, trusted place to find the graded cards they love — without the risk and hassle of importing on their own.
        </p>
        <p className="mt-3">
          We&apos;re a group of passionate collectors based in Cape Town who got tired of seeing our local market underserved. Whether it&apos;s a 1st Edition Dark Houndoom PSA 10 or a Base Set Charizard CGC 8, we believe every collector should have access to properly authenticated cards at fair prices.
        </p>
      </>
    ),
  },
  {
    id: "ENTRY_002",
    date: "2025_07_15",
    title: "BEYOND_THE_CARDS",
    body: (
      <p>
        We curate Japanese culture collectables — books, art, stationery — because the collecting spirit goes beyond TCGs. Our &ldquo;Culture&rdquo; section brings hand-picked items you won&apos;t find at your local bookshop.
      </p>
    ),
  },
  {
    id: "ENTRY_003",
    date: "2025_08_01",
    title: "OPERATING_PRINCIPLES",
    body: (
      <ul className="space-y-3">
        {[
          ["AUTHENTICITY_FIRST", "Every graded card is verified. We only stock PSA, CGC, BGS and PCG slabs with legitimate certification."],
          ["FAIR_PRICING", "We research global markets daily to ensure our prices reflect real value — not hype markups."],
          ["COMMUNITY_OVER_COMPETITION", "We want to grow South Africa's collector scene, not just make sales. That's why we offer trading, sourcing and grading services alongside our shop."],
          ["CAREFUL_HANDLING", "Every shipment is insured and packed with the care these cards deserve."],
        ].map(([key, val]) => (
          <li key={key} className="flex flex-col gap-1">
            <span className="font-mono text-xs uppercase tracking-widest text-slab-neon-cyan/80 neon-glow-cyan">
              {">"} {key}
            </span>
            <span className="text-slab-muted">{val}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "ENTRY_004",
    date: "2026_01_01",
    title: "THE_TEAM",
    body: (
      <>
        <p>
          Founded by Darren, Slabhead is run by a small team of collectors who eat, sleep and breathe TCGs. We&apos;re always happy to chat about cards — whether you&apos;re a seasoned collector or just pulled your first Charizard.
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-slab-muted">
          // FOUNDER_AVATAR_PENDING · TEAM_BIOS_PENDING · PLACEHOLDER_FOR_CLIENT
        </p>
      </>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <NeonBadge tone="cyan" intensity="high">
        // FOUNDERS_LOG // COMPLETE_ARCHIVE
      </NeonBadge>
      <h1 className="mt-6 font-display text-4xl text-slab-white sm:text-5xl">
        About Slabhead
      </h1>
      <p className="mt-3 font-mono text-xs uppercase tracking-widest text-slab-muted">
        {">"} 4 LOG_ENTRIES · 2025-07_01 → 2026-01_01
      </p>

      <NeonDivider label="// ARCHIVE" accent="cyan" className="mt-12 mb-8" />

      <div className="space-y-12">
        {LOG_ENTRIES.map((entry, i) => (
          <RevealOnScroll key={entry.id} variant="fade-up" delay={i * 0.05}>
            <div className="bracketed rounded-xl border border-white/[0.06] bg-slab-charcoal/40 p-6 backdrop-blur-sm">
              {/* Entry header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.05] pb-4">
                <div className="flex items-center gap-3">
                  <span
                    className="h-2 w-2 rounded-full bg-slab-success"
                    style={{ boxShadow: "0 0 6px rgba(34, 197, 94, 0.7)" }}
                  />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-slab-neon-cyan/80 neon-glow-cyan">
                    {entry.id} · {entry.date}
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-slab-muted">
                  [ARCHIVED]
                </span>
              </div>

              <h2 className="mt-5 font-display text-2xl text-slab-white">
                {entry.title}
              </h2>
              <div className="mt-4 leading-relaxed text-slab-muted">
                {entry.body}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Button href="/contact-us" variant="neon" terminalPrefix>
          OPEN_TRANSMISSION
        </Button>
        <Button href="/shop" variant="secondary">
          BROWSE_INVENTORY
        </Button>
      </div>
    </div>
  );
}
