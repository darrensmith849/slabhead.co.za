import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/products";
import CategoryPage from "@/components/sections/CategoryPage";

export const metadata: Metadata = {
  title: "Pokémon Cards",
  description: "Browse graded Pokémon cards — PSA, CGC & BGS authenticated slabs, sealed product and TCG accessories. Shipped from Cape Town.",
};

export default async function PokemonPage() {
  const [pokemon, accessories] = await Promise.all([
    getProductsByCategory("Pokemon"),
    getProductsByCategory("TCG Accessories"),
  ]);
  return (
    <CategoryPage
      title="Pokémon"
      description="Graded slabs, sealed product & TCG accessories — PSA, CGC & BGS authenticated"
      products={[...pokemon, ...accessories]}
      heroImage="/wp-uploads/2025/01/ash_ketchum___pokemon____ai__by_anastassia027_dhxhjh5-pre-e1737031249745.jpg"
      featuredImages={[
        { src: "/wp-uploads/2025/02/Pokemon-Slabbed.jpg", label: "Slabbed" },
        { src: "/wp-uploads/2025/02/Pokemon-Sealed.jpg", label: "Sealed" },
        { src: "/wp-uploads/2025/02/Pokemon-Single.jpg", label: "Singles" },
      ]}
    />
  );
}
