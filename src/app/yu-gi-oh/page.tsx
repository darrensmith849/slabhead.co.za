import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/products";
import CategoryPage from "@/components/sections/CategoryPage";

export const metadata: Metadata = {
  title: "Yu-Gi-Oh",
  description:
    "Browse Yu-Gi-Oh sealed boxes, structure decks and collector sets. Shipped from Cape Town, South Africa.",
};

export default async function YuGiOhPage() {
  const products = await getProductsByCategory("Yu-Gi-Oh");

  return (
    <CategoryPage
      title="The Duel Archives"
      description="Sealed boxes, structure decks and collector sets. The Pendulum, Synchro, Xyz, Link Summoning timeline preserved."
      heroLabel="// THE_DUEL_ARCHIVES"
      roomTheme="yugioh"
      products={products}
      subPortals={[
        { label: "SLABBED", href: "/yu-gi-oh?type=slabbed" },
        { label: "SEALED", href: "/yu-gi-oh?type=sealed" },
        { label: "SINGLES", href: "/yu-gi-oh?type=singles" },
      ]}
    />
  );
}
