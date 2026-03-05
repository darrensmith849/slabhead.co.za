import type { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet the Slabhead team — a group of South African collectors building a trusted marketplace for graded cards and collectables.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slab-white">About Slabhead</h1>

      <div className="mt-8 space-y-6 leading-relaxed text-slab-muted">
        <p>
          Slabhead was born from a simple idea: South African collectors deserve
          a safe, trusted place to find the graded cards they love — without the
          risk and hassle of importing on their own.
        </p>
        <p>
          We&apos;re a group of passionate collectors based in Cape Town who got tired
          of seeing our local market underserved. Whether it&apos;s a 1st Edition
          Dark Houndoom PSA 10 or a Base Set Charizard CGC 8, we believe every
          collector should have access to properly authenticated cards at fair
          prices.
        </p>
        <p>
          Beyond cards, we curate Japanese culture collectables — books, art,
          stationery — because the collecting spirit goes beyond TCGs. Our
          &ldquo;Culture&rdquo; section brings hand-picked items you won&apos;t find at
          your local bookshop.
        </p>

        <h2 className="pt-4 text-xl font-bold text-slab-white">What We Stand For</h2>
        <ul className="list-inside list-disc space-y-2">
          <li>
            <span className="font-medium text-slab-white">Authenticity first.</span>{" "}
            Every graded card is verified. We only stock PSA, CGC, BGS and PCG
            slabs with legitimate certification.
          </li>
          <li>
            <span className="font-medium text-slab-white">Fair pricing.</span>{" "}
            We research global markets daily to ensure our prices reflect real
            value — not hype markups.
          </li>
          <li>
            <span className="font-medium text-slab-white">Community over competition.</span>{" "}
            We want to grow South Africa&apos;s collector scene, not just make
            sales. That&apos;s why we offer trading, sourcing and grading services
            alongside our shop.
          </li>
          <li>
            <span className="font-medium text-slab-white">Careful handling.</span>{" "}
            Every shipment is insured and packed with the care these cards
            deserve.
          </li>
        </ul>

        <h2 className="pt-4 text-xl font-bold text-slab-white">The Team</h2>
        <p>
          Founded by Darren, Slabhead is run by a small team of collectors who
          eat, sleep and breathe TCGs. We&apos;re always happy to chat about
          cards — whether you&apos;re a seasoned collector or just pulled your first
          Charizard.
        </p>
      </div>

      <div className="mt-10 flex gap-3">
        <Button href="/contact-us">Get in Touch</Button>
        <Button href="/shop" variant="secondary">Browse the Shop</Button>
      </div>
    </div>
  );
}
