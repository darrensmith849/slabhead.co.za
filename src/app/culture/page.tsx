import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/products";
import CategoryPage from "@/components/sections/CategoryPage";

export const metadata: Metadata = {
  title: "Culture",
  description: "Explore Japanese-inspired culture: art books, literature, zen philosophy, manga guides, stationery and fine art.",
};

export default async function CulturePage() {
  const [books, stationery, art] = await Promise.all([
    getProductsByCategory("Books"),
    getProductsByCategory("Stationery"),
    getProductsByCategory("Art"),
  ]);
  return (
    <CategoryPage
      title="Culture"
      description="Japanese-inspired art, books, stationery & fine art — beyond the cards"
      products={[...books, ...stationery, ...art]}
      heroImage="/wp-uploads/2025/03/DALLE-2025-02-10-04.37.48-A-minimalistic-cyberpunk-inspired-desk-setup-with-a-few-carefully-placed-stationery-items.-The-desk-has-a-sleek-futuristic-design-with-subtle-neon-li.jpg"
    />
  );
}
