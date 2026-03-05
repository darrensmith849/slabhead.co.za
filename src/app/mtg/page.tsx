import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/products";
import CategoryPage from "@/components/sections/CategoryPage";

export const metadata: Metadata = {
  title: "Magic: The Gathering",
  description: "Browse Magic: The Gathering collector boosters, theme boosters and commander decks. Shipped from Cape Town.",
};

export default function MTGPage() {
  return (
    <CategoryPage
      title="Magic: The Gathering"
      description="Collector boosters, theme boosters and commander decks"
      products={getProductsByCategory("Magic the Gathering")}
    />
  );
}
