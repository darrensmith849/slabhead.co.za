import type { Metadata } from "next";
import ServicePage from "@/components/sections/ServicePage";

export const metadata: Metadata = {
  title: "SlabTrader",
  description: "Want to trade graded cards? SlabTrader connects you with other collectors in South Africa for fair, verified trades.",
};

export default function SlabTraderPage() {
  return (
    <ServicePage
      title="SlabTrader"
      tagline="Trade up. Trade smart."
      description="Got cards you'd swap for something you want more? SlabTrader is our trading service that connects collectors for fair, verified trades. We act as the trusted middleman so both parties walk away happy."
      steps={[
        {
          title: "List Your Cards",
          description: "Tell us what you have to trade — include photos, grades and what you're looking for in return.",
        },
        {
          title: "We Match You",
          description: "We check our network of collectors and find someone with what you want who wants what you have.",
        },
        {
          title: "Verified Exchange",
          description: "Both parties send cards to us. We verify grades, confirm the deal, and ship each card to its new owner.",
        },
      ]}
      ctaText="Start a Trade — Contact Us"
      ctaHref="/contact-us"
    />
  );
}
