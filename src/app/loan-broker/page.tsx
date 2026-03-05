import type { Metadata } from "next";
import ServicePage from "@/components/sections/ServicePage";

export const metadata: Metadata = {
  title: "Loan Broker",
  description: "Use your graded cards as collateral for competitive-rate loans. Slabhead's loan broker service helps collectors access capital without selling.",
};

export default function LoanBrokerPage() {
  return (
    <ServicePage
      title="Loan Broker"
      tagline="Leverage your collection without selling it."
      description="Need capital but don't want to part with your prized slabs? Our asset-based loan service lets you use your graded cards as collateral for competitive-rate loans. Keep your collection growing while accessing the funds you need."
      steps={[
        {
          title: "Assess Your Cards",
          description: "Send us details of the graded cards you'd like to use as collateral. We'll appraise current market value.",
        },
        {
          title: "Receive Loan Terms",
          description: "Based on your collection's value, we connect you with lending partners and present competitive loan options.",
        },
        {
          title: "Secure & Store",
          description: "Your cards are securely stored and insured for the loan duration. Pay off the loan, get your cards back — simple.",
        },
      ]}
      ctaText="Enquire About a Loan"
      ctaHref="/contact-us"
    />
  );
}
