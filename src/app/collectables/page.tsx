import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import CategoryPage from "@/components/sections/CategoryPage";

export const metadata: Metadata = {
  title: "Collectables",
  description: "From Pokémon cards to Yu-Gi-Oh, Magic: The Gathering, and Japanese culture — browse all collectables at Slabhead.",
};

export default async function CollectablesPage() {
  const products = await getAllProducts();
  return (
    <CategoryPage
      title="All Collectables"
      description="From Pokémon cards to Yu-Gi-Oh, MTG, books, art and stationery — everything we carry"
      products={products}
      heroImage="/wp-uploads/2025/01/Screenshot-2025-01-15-at-05.40.54.jpg"
      featuredImages={[
        { src: "/wp-uploads/2025/02/Pokemon-Slabbed.jpg", label: "Pokémon", href: "/pokemon" },
        { src: "/wp-uploads/2025/03/Yu-Gi-Oh-Slabbed.jpg", label: "Yu-Gi-Oh", href: "/yu-gi-oh" },
        { src: "/wp-uploads/2025/03/magic-the-gathering-card-swords-to-plowshares3.jpg", label: "Magic: The Gathering", href: "/mtg" },
      ]}
    />
  );
}
