import type { Metadata } from "next";
import ServiceCard from "@/components/ui/ServiceCard";
import CategoryHero from "@/components/atmosphere/CategoryHero";
import RevealOnScroll from "@/components/atmosphere/RevealOnScroll";
import NeonDivider from "@/components/atmosphere/NeonDivider";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Slabhead offers card sourcing, trading, buying, professional grading and asset-based loans for collectors in South Africa.",
};

export default function ServicesCategoriesPage() {
  return (
    <>
      <CategoryHero
        title="The Network Hub"
        description="Five modules. All online. Every service Slabhead offers — from sourcing rare slabs to lending against your collection — in one command center."
        label="// NETWORK_HUB"
        theme="collectables"
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <NeonDivider label="// 5_MODULES // ONLINE" accent="cyan" className="mb-8" />

        <RevealOnScroll
          variant="fade-up"
          stagger={0.08}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <ServiceCard
            title="SlabHunter"
            description="Can't find it locally? We'll source graded cards from anywhere in the world."
            href="/slabhunter"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
          <ServiceCard
            title="SlabTrader"
            description="List what you have and what you want. We'll match you with another collector."
            href="/slabtrader"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            }
          />
          <ServiceCard
            title="We Buy Cards"
            description="Sell your collection for cash — fair prices, fast payment via EFT."
            href="/we-buy-cards"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            }
          />
          <ServiceCard
            title="Slabbing"
            description="Get your cards professionally graded by PSA, CGC or BGS through us."
            href="/slabbing"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <ServiceCard
            title="Loan Broker"
            description="Use your graded cards as collateral for competitive-rate loans."
            href="/loan-broker"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            }
          />
        </RevealOnScroll>
      </div>
    </>
  );
}
