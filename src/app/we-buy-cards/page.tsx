import type { Metadata } from "next";
import ServicePage from "@/components/sections/ServicePage";

export const metadata: Metadata = {
  title: "We Buy Cards",
  description: "Want to sell your card collection quickly? Slabhead buys graded and raw Pokémon, Yu-Gi-Oh and MTG cards at fair market prices.",
};

export default function WeBuyCardsPage() {
  return (
    <ServicePage
      title="We Buy Cards"
      tagline="Need cash? We'll buy your collection."
      description="Whether you have a single high-value slab or an entire collection, we buy cards at fair market prices with fast payment. No auction waiting, no lowball offers — just a straightforward deal."
      steps={[
        {
          title: "Send Us Your List",
          description: "Share photos and details of the cards you want to sell — graded or raw, singles or bulk.",
        },
        {
          title: "Get a Quote",
          description: "We'll research current market values and send you a fair offer within 24–48 hours.",
        },
        {
          title: "Ship & Get Paid",
          description: "Accept the offer, ship your cards to us (insured), and receive payment via EFT as soon as we verify the lot.",
        },
      ]}
      ctaText="Get a Quote — Contact Us"
      ctaHref="/contact-us"
    />
  );
}
