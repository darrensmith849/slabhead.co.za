import type { Metadata } from "next";
import ServicePage from "@/components/sections/ServicePage";

export const metadata: Metadata = {
  title: "SlabHunter",
  description:
    "Can't find a specific card locally? Our SlabHunter service sources graded cards from anywhere in the world and delivers them to your door in South Africa.",
};

export default function SlabHunterPage() {
  return (
    <ServicePage
      title="SlabHunter"
      tagline="Can't find it? We'll hunt it down."
      description="Looking for a specific graded card you just can't find locally? Don't risk importing it yourself — our network spans PSA, CGC and BGS dealers across the US, Japan and Europe. We negotiate the best price on your behalf, authenticate it, and ship safely to your door in South Africa."
      missionLabel="// SLABHUNTER // GLOBAL_OPERATIONS"
      roomTheme="hunter"
      protocol={[
        {
          phase: "PHASE_1: TARGET_ACQUISITION",
          title: "Tell Us What You Want",
          description:
            "Send the card name, set, grade and any other details. The more specific, the faster we find it.",
        },
        {
          phase: "PHASE_2: GLOBAL_SEARCH",
          title: "We Search Worldwide",
          description:
            "Our network spans PSA, CGC and BGS dealers across the US, Japan and Europe. We negotiate the best price on your behalf.",
        },
        {
          phase: "PHASE_3: AUTHENTICATION & DELIVERY",
          title: "Verified & Delivered",
          description:
            "Once sourced, we verify authenticity, handle customs and insurance, and ship to you in South Africa with full tracking.",
        },
      ]}
      ctaText="INITIATE_HUNT"
      ctaHref="/contact-us"
    />
  );
}
