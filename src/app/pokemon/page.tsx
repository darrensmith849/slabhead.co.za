import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/products";
import CategoryPage from "@/components/sections/CategoryPage";

export const metadata: Metadata = {
  title: "Pokémon Cards",
  description: "Browse graded Pokémon cards — PSA, CGC & BGS authenticated slabs, sealed product and TCG accessories. Shipped from Cape Town.",
};

export default function PokemonPage() {
  const pokemon = getProductsByCategory("Pokemon");
  const accessories = getProductsByCategory("TCG Accessories");
  return (
    <CategoryPage
      title="Pokémon"
      description="Graded slabs, sealed product & TCG accessories — PSA, CGC & BGS authenticated"
      products={[...pokemon, ...accessories]}
    />
  );
}
