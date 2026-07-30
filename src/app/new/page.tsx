import type { Metadata } from "next";
import { getNewDrops } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import CategoryHero from "@/components/atmosphere/CategoryHero";
import NeonDivider from "@/components/atmosphere/NeonDivider";
import RevealOnScroll from "@/components/atmosphere/RevealOnScroll";

export const metadata: Metadata = {
  title: "Latest Acquisitions",
  description:
    "The newest graded slabs and sealed products just landed in the Slabhead vault.",
};

export default async function NewDropsPage() {
  const drops = await getNewDrops(60);

  return (
    <>
      <CategoryHero
        title="Latest Acquisitions"
        description="Fresh specimens just catalogued, indexed and ready for review. Sorted newest first."
        label="// LATEST_ACQUISITIONS"
        theme="collectables"
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <NeonDivider label={`// ${drops.length}_SPECIMENS // NEWEST_FIRST`} accent="cyan" className="mb-10" />

        <RevealOnScroll
          variant="fade-up"
          stagger={0.04}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6"
        >
          {drops.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 2} />
          ))}
        </RevealOnScroll>
      </div>
    </>
  );
}
