import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/products";
import CategoryPage from "@/components/sections/CategoryPage";

export const metadata: Metadata = {
  title: "Yu-Gi-Oh",
  description: "Browse Yu-Gi-Oh sealed boxes, structure decks and collector sets. Shipped from Cape Town, South Africa.",
};

export default function YuGiOhPage() {
  return (
    <CategoryPage
      title="Yu-Gi-Oh"
      description="Sealed boxes, structure decks and collector sets"
      products={getProductsByCategory("Yu-Gi-Oh")}
    />
  );
}
