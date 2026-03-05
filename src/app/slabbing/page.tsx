import type { Metadata } from "next";
import ServicePage from "@/components/sections/ServicePage";

export const metadata: Metadata = {
  title: "Card Grading (Slabbing)",
  description: "Get your Pokémon, Yu-Gi-Oh or MTG cards professionally graded by PSA, CGC or BGS through Slabhead's grading service in South Africa.",
};

export default function SlabbingPage() {
  return (
    <ServicePage
      title="Slabbing"
      tagline="Protect. Authenticate. Grade."
      description="Our professional grading service handles the entire process — from card submission to receiving your slabbed card back. We work with PSA, CGC and BGS to get your cards graded at competitive rates, without the hassle of dealing with international submissions yourself."
      steps={[
        {
          title: "Submit Your Cards",
          description: "Bring or ship your raw cards to us. We'll assess condition and recommend the best grading company for each card.",
        },
        {
          title: "We Handle Submission",
          description: "We batch your cards with others to get the best rates, handle all paperwork, customs and shipping to the grading company.",
        },
        {
          title: "Graded & Returned",
          description: "Once graded, we notify you with the results and ship your freshly slabbed cards back — insured and tracked.",
        },
      ]}
      ctaText="Submit Cards for Grading"
      ctaHref="/contact-us"
    />
  );
}
