import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/products";
import CategoryPage from "@/components/sections/CategoryPage";

export const metadata: Metadata = {
  title: "Magic: The Gathering",
  description: "Browse Magic: The Gathering collector boosters, theme boosters and commander decks. Shipped from Cape Town.",
};

export default async function MTGPage() {
  const products = await getProductsByCategory("Magic the Gathering");
  return (
    <CategoryPage
      title="Magic: The Gathering"
      description="Collector boosters, theme boosters and commander decks"
      products={products}
      heroImage="/wp-uploads/2025/01/Screenshot-2025-01-16-at-14.34.44.jpg"
      featuredImages={[
        { src: "/wp-uploads/2025/03/magic-the-gathering-card-swords-to-plowshares3.jpg", label: "Singles" },
        { src: "/wp-uploads/2025/03/magic-the-gathering-card-swords-to-plowshares4.jpg", label: "Vintage" },
      ]}
    />
  );
}
