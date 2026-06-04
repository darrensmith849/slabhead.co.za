import type { Metadata } from "next";
import ServicePage from "@/components/sections/ServicePage";

export const metadata: Metadata = {
  title: "We Buy Cards",
  description:
    "Need cash? Slabhead will buy your card collection at a fair, transparent price. South Africa's trusted card buyback service.",
};

export default function WeBuyCardsPage() {
  return (
    <ServicePage
      title="We Buy Cards"
      tagline="Need cash? We'll buy your collection."
      description="Time to liquidate? We buy graded and ungraded cards at fair, transparent prices. Send us a list with photos, get a no-obligation quote within 48 hours, ship the cards, get paid. No haggling, no surprises."
      missionLabel="// LIQUIDATION_DESK"
      roomTheme="liquidation"
      protocol={[
        {
          phase: "PHASE_1: SUBMIT_INVENTORY",
          title: "Send Us Your List",
          description:
            "Email a list with photos, grades and any context. The more we know upfront, the faster the valuation.",
        },
        {
          phase: "PHASE_2: VALUATION",
          title: "Get a Quote",
          description:
            "We research current market values, account for grade and condition, and send you a no-obligation offer within 48 hours.",
        },
        {
          phase: "PHASE_3: PAYMENT & COLLECTION",
          title: "Ship & Get Paid",
          description:
            "If you accept, we arrange insured collection. EFT lands in your account once cards are received and verified.",
        },
      ]}
      ctaText="GET_QUOTE"
      ctaHref="/contact-us"
    />
  );
}
