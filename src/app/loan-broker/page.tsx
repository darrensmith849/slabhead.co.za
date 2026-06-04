import type { Metadata } from "next";
import ServicePage from "@/components/sections/ServicePage";

export const metadata: Metadata = {
  title: "Loan Broker",
  description:
    "Use your high-value graded cards as collateral for asset-backed loans. South Africa's first card-secured lending service.",
};

export default function LoanBrokerPage() {
  return (
    <ServicePage
      title="Loan Broker"
      tagline="Leverage your collection without selling it."
      description="Got high-value graded cards but need short-term capital? Our asset-backed lending service lets you borrow against your collection at competitive rates, with your cards held in secure storage until the loan is repaid. Built for serious collectors who don't want to sell."
      missionLabel="// ASSET_UNDERWRITING_DESK"
      roomTheme="underwriting"
      protocol={[
        {
          phase: "PHASE_1: ASSESSMENT",
          title: "Cards Assessed",
          description:
            "Submit your collection for valuation. We work with certified appraisers to determine the loan-to-value ratio.",
        },
        {
          phase: "PHASE_2: LOAN_TERMS",
          title: "Receive Loan Terms",
          description:
            "Get a transparent offer: principal amount, interest rate, repayment schedule, storage terms. No hidden fees.",
        },
        {
          phase: "PHASE_3: SECURE_&_STORE",
          title: "Cards Secured · You Get Funds",
          description:
            "Cards travel to insured storage. Funds disburse via EFT. Repay on schedule, get your cards back unchanged.",
        },
      ]}
      ctaText="ENQUIRE_ABOUT_LOAN"
      ctaHref="/contact-us"
      disclosure="Asset-backed lending arranged through licensed lending partners under the National Credit Act (South Africa). All loans subject to credit approval and collateral verification. Cards held under insured storage agreement. Final terms confirmed in writing before loan disbursement. This is not financial advice — please consult a financial advisor."
    />
  );
}
