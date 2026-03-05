import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import CategoryPage from "@/components/sections/CategoryPage";

export const metadata: Metadata = {
  title: "Collectables",
  description: "From Pokémon cards to Yu-Gi-Oh, Magic: The Gathering, and Japanese culture — browse all collectables at Slabhead.",
};

export default function CollectablesPage() {
  return (
    <CategoryPage
      title="All Collectables"
      description="From Pokémon cards to Yu-Gi-Oh, MTG, books, art and stationery — everything we carry"
      products={getAllProducts()}
    />
  );
}
