import type { Metadata } from "next";
import ServiceCard from "@/components/ui/ServiceCard";
import CategoryHero from "@/components/atmosphere/CategoryHero";
import RevealOnScroll from "@/components/atmosphere/RevealOnScroll";
import NeonDivider from "@/components/atmosphere/NeonDivider";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Sell a collection, source a rare card or arrange a collector-to-collector trade with Slabhead.",
};

const iconClass = "h-5 w-5";

export default function ServicesCategoriesPage() {
  return (
    <>
      <CategoryHero
        title="Collector Services"
        description="Sell, source or trade cards through the Slabhead collector network."
        label="// COLLECTOR_SERVICES"
        theme="collectables"
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <NeonDivider label="// 3_SERVICES // ONLINE" accent="cyan" className="mb-8" />

        <RevealOnScroll
          variant="fade-up"
          stagger={0.08}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <ServiceCard
            title="We Buy Cards"
            description="Sell slabs, raw cards, sealed product or a full collection at fair, market-related pricing."
            href="/we-buy-cards"
            icon={
              <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            }
          />
          <ServiceCard
            title="SlabHunter"
            description="Can&apos;t find it locally? We&apos;ll source graded cards through our worldwide network."
            href="/slabhunter"
            icon={
              <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
          <ServiceCard
            title="SlabTrader"
            description="List what you have and what you want. We&apos;ll help match you with another collector."
            href="/slabtrader"
            icon={
              <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            }
          />
        </RevealOnScroll>
      </div>
    </>
  );
}
