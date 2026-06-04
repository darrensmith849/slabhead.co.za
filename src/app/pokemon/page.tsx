import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/products";
import CategoryPage from "@/components/sections/CategoryPage";

export const metadata: Metadata = {
  title: "Pokémon Cards",
  description:
    "Browse graded Pokémon cards — PSA, CGC & BGS authenticated slabs, sealed product and TCG accessories. Shipped from Cape Town.",
};

export default async function PokemonPage() {
  const [pokemon, accessories] = await Promise.all([
    getProductsByCategory("Pokemon"),
    getProductsByCategory("TCG Accessories"),
  ]);

  const slabbed = pokemon.filter((p) => p.subcategory === "Pokemon Slabbed");
  const sealed = pokemon.filter((p) => p.subcategory === "Pokemon Sealed");
  const singles = pokemon.filter(
    (p) => !p.subcategory || (p.subcategory !== "Pokemon Slabbed" && p.subcategory !== "Pokemon Sealed"),
  );

  return (
    <CategoryPage
      title="The Pokémon Wing"
      description="Graded slabs, sealed product & TCG accessories — PSA, CGC & BGS authenticated. From base set legends to modern grails."
      heroLabel="// THE_POKEMON_WING"
      roomTheme="pokemon"
      products={[...pokemon, ...accessories]}
      subPortals={[
        { label: "SLABBED", href: "/pokemon?type=slabbed", count: slabbed.length },
        { label: "SEALED", href: "/pokemon?type=sealed", count: sealed.length },
        { label: "SINGLES", href: "/pokemon?type=singles", count: singles.length },
        { label: "ACCESSORIES", href: "/pokemon?type=accessories", count: accessories.length },
      ]}
    />
  );
}
