import type { Metadata } from "next";
import { getAllProducts, getCategoryCounts } from "@/lib/products";
import CategoryPage from "@/components/sections/CategoryPage";

export const metadata: Metadata = {
  title: "Collectables",
  description:
    "From Pokémon cards to Yu-Gi-Oh, Magic: The Gathering, and Japanese culture — browse all collectables at Slabhead.",
};

export default async function CollectablesPage() {
  const [products, counts] = await Promise.all([getAllProducts(), getCategoryCounts()]);

  return (
    <CategoryPage
      title="The Full Inventory Hall"
      description="Everything we carry — Pokémon, Yu-Gi-Oh, MTG, books, art, stationery. The whole vault in one room."
      heroLabel="// FULL_INVENTORY_HALL"
      roomTheme="collectables"
      products={products}
      subPortals={[
        { label: "POKÉMON", href: "/pokemon", count: counts["Pokemon"] || 0 },
        { label: "YU-GI-OH", href: "/yu-gi-oh", count: counts["Yu-Gi-Oh"] || 0 },
        { label: "MTG", href: "/mtg", count: counts["Magic the Gathering"] || 0 },
        { label: "CULTURE", href: "/culture", count: (counts["Books"] || 0) + (counts["Stationery"] || 0) + (counts["Art"] || 0) },
      ]}
    />
  );
}
