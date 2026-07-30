import type { Metadata } from "next";
import { getAllProducts, getCategoryCounts } from "@/lib/products";
import CategoryPage from "@/components/sections/CategoryPage";

export const metadata: Metadata = {
  title: "Collectables",
  description:
    "Browse Pokémon, Dragon Ball Z and One Piece collectables at Slabhead.",
};

export default async function CollectablesPage() {
  const [products, counts] = await Promise.all([getAllProducts(), getCategoryCounts()]);

  return (
    <CategoryPage
      title="The Full Inventory Hall"
      description="Everything we carry — Pokémon, Dragon Ball Z and One Piece. The whole vault in one room."
      heroLabel="// FULL_INVENTORY_HALL"
      roomTheme="collectables"
      products={products}
      subPortals={[
        { label: "POKÉMON", href: "/pokemon", count: counts["Pokemon"] || 0 },
        { label: "DRAGON BALL Z", href: "/dragon-ball-z", count: counts["Dragon Ball Z"] || 0 },
        { label: "ONE PIECE", href: "/one-piece", count: counts["One Piece"] || 0 },
      ]}
    />
  );
}
