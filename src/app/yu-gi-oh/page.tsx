import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/products";
import CategoryPage from "@/components/sections/CategoryPage";

export const metadata: Metadata = {
  title: "Yu-Gi-Oh",
  description: "Browse Yu-Gi-Oh sealed boxes, structure decks and collector sets. Shipped from Cape Town, South Africa.",
};

export default async function YuGiOhPage() {
  const products = await getProductsByCategory("Yu-Gi-Oh");
  return (
    <CategoryPage
      title="Yu-Gi-Oh"
      description="Sealed boxes, structure decks and collector sets"
      products={products}
      heroImage="/wp-uploads/2025/01/Screenshot-2025-01-16-at-14.34.54.jpg"
      featuredImages={[
        { src: "/wp-uploads/2025/03/Yu-Gi-Oh-Slabbed.jpg", label: "Slabbed" },
        { src: "/wp-uploads/2025/03/yugioh-Sealed.jpg", label: "Sealed" },
        { src: "/wp-uploads/2025/03/Yu-Gi-Oh-Single.jpg", label: "Singles" },
      ]}
    />
  );
}
