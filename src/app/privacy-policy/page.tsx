import type { Metadata } from "next";
import NeonBadge from "@/components/atmosphere/NeonBadge";
import NeonDivider from "@/components/atmosphere/NeonDivider";

export const metadata: Metadata = {
  title: "Data Protocols",
  description:
    "Slabhead privacy policy — how we collect, use and protect your personal information.",
};

const SECTIONS = [
  {
    title: "Information We Collect",
    body: (
      <>
        We collect information you give us directly: name, email, shipping address, phone, and payment details when you make a purchase. We also collect basic analytics about how you use the site (page views, referrers, anonymised device info) to improve the experience.
      </>
    ),
  },
  {
    title: "How We Use Your Information",
    body: (
      <>
        Your information helps us fulfil orders, respond to enquiries, deliver services (SlabHunter, SlabTrader, grading, loans), and improve the site. We send transactional emails (order confirmations, shipping updates) and occasional service updates if you&apos;ve opted in.
      </>
    ),
  },
  {
    title: "Data Protection (POPIA)",
    body: (
      <>
        We comply with the Protection of Personal Information Act (POPIA). Your data is stored securely on servers in Germany (EU) with industry-standard encryption. We never sell your information to third parties. Payment processing is handled by PayFast under their own privacy policy.
      </>
    ),
  },
  {
    title: "Cookies",
    body: (
      <>
        We use essential cookies (cart session, login state) and basic analytics cookies. You can disable non-essential cookies through your browser settings without affecting core site functionality.
      </>
    ),
  },
  {
    title: "Your Rights",
    body: (
      <>
        Under POPIA you have the right to access, correct, or delete your personal information. Email <a href="mailto:info@slabhead.co.za" className="text-slab-neon-cyan hover:neon-glow-cyan">info@slabhead.co.za</a> to exercise any of these rights.
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <NeonBadge tone="cyan" intensity="high">
        // DATA_PROTOCOLS
      </NeonBadge>
      <h1 className="mt-6 font-display text-4xl text-slab-white sm:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-3 font-mono text-xs uppercase tracking-widest text-slab-muted">
        {">"} LAST_UPDATED: 2026-03 · COMPLIANT_WITH: POPIA · POPI_ACT
      </p>

      <NeonDivider label="// PROTOCOL_SECTIONS" accent="cyan" className="mt-12 mb-8" />

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
