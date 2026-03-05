import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/products";
import CategoryPage from "@/components/sections/CategoryPage";

export const metadata: Metadata = {
  title: "Culture",
  description: "Explore Japanese-inspired culture: art books, literature, zen philosophy, manga guides, stationery and fine art.",
};

export default function CulturePage() {
  const books = getProductsByCategory("Books");
  const stationery = getProductsByCategory("Stationery");
  const art = getProductsByCategory("Art");
  return (
    <CategoryPage
      title="Culture"
      description="Japanese-inspired art, books, stationery & fine art — beyond the cards"
      products={[...books, ...stationery, ...art]}
    />
  );
}
