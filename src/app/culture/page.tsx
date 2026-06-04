import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/products";
import CategoryPage from "@/components/sections/CategoryPage";

export const metadata: Metadata = {
  title: "Culture",
  description:
    "Explore Japanese-inspired culture: art books, literature, zen philosophy, manga guides, stationery and fine art.",
};

export default async function CulturePage() {
  const [books, stationery, art] = await Promise.all([
    getProductsByCategory("Books"),
    getProductsByCategory("Stationery"),
    getProductsByCategory("Art"),
  ]);

  return (
    <CategoryPage
      title="The Eastern Wing"
      description="Japanese-inspired art, books, stationery & fine art. Beyond the cards — into the culture that grew them."
      heroLabel="// THE_EASTERN_WING"
      roomTheme="culture"
      products={[...books, ...stationery, ...art]}
      subPortals={[
        { label: "BOOKS", href: "/culture?type=books", count: books.length },
        { label: "STATIONERY", href: "/culture?type=stationery", count: stationery.length },
        { label: "ART", href: "/culture?type=art", count: art.length },
      ]}
    />
  );
}
