import type { Metadata } from "next";
import NeonBadge from "@/components/atmosphere/NeonBadge";
import NeonDivider from "@/components/atmosphere/NeonDivider";

export const metadata: Metadata = {
  title: "Terms of Engagement",
  description:
    "Slabhead terms of service — the rules and conditions governing use of our website and services.",
};

const SECTIONS = [
  {
    title: "Overview",
    body: "These terms govern your use of slabhead.co.za and all our services, including the Shop, We Buy Cards, SlabHunter and SlabTrader. Using the site means you accept these terms.",
  },
  {
    title: "Products & Pricing",
    body: "All prices are in South African Rand (ZAR) and subject to change. Product descriptions and images are best-effort representations — slight variations may occur. Grade scores reflect the grading company's certification at time of listing.",
  },
  {
    title: "Orders & Payment",
    body: "Placing an order is an offer to purchase. We reserve the right to decline orders for any reason (suspected fraud, stock errors, etc.). Full payment is required before dispatch. We accept payments via PayFast (cards, EFT, instant EFT, SnapScan and more).",
  },
  {
    title: "Shipping & Returns",
    body: "All orders ship insured and tracked from Cape Town. Delivery times depend on your location (typically 2-5 business days within SA). Returns are accepted within 7 days if the item differs materially from the description. Cards damaged in transit are covered by insurance.",
  },
  {
    title: "Services",
    body: "We Buy Cards, SlabHunter and SlabTrader are best-effort services. Specific terms, including timelines, fees and any collection arrangements, are confirmed in writing before you commit.",
  },
  {
    title: "Limitation of Liability",
    body: "Slabhead is not liable for indirect, incidental, or consequential damages arising from use of the site or services, except where prohibited by South African law. Our maximum liability is limited to the value of the specific transaction in dispute.",
  },
  {
    title: "Contact",
    body: (
      <>
        Questions about these terms? Email <a href="mailto:info@slabhead.co.za" className="text-slab-neon-cyan hover:neon-glow-cyan">info@slabhead.co.za</a>.
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <NeonBadge tone="cyan" intensity="high">
        // TERMS_OF_ENGAGEMENT
      </NeonBadge>
      <h1 className="mt-6 font-display text-4xl text-slab-white sm:text-5xl">
        Terms of Service
      </h1>
      <p className="mt-3 font-mono text-xs uppercase tracking-widest text-slab-muted">
        {">"} LAST_UPDATED: 2026-07 · JURISDICTION: SOUTH_AFRICA
      </p>

      <NeonDivider label="// ENGAGEMENT_TERMS" accent="cyan" className="mt-12 mb-8" />

      <div className="space-y-10 leading-relaxed text-slab-muted">
        {SECTIONS.map((s, i) => (
          <div key={s.title}>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-widest text-slab-neon-cyan/80 neon-glow-cyan">
                {(i + 1).toString().padStart(2, "0")}.
              </span>
              <h2 className="font-display text-xl text-slab-white">{s.title}</h2>
            </div>
            <p className="mt-3 pl-9">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
