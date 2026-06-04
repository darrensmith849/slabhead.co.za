import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/products";
import CategoryPage from "@/components/sections/CategoryPage";

export const metadata: Metadata = {
  title: "Magic: The Gathering",
  description:
    "Browse Magic: The Gathering collector boosters, theme boosters and commander decks. Shipped from Cape Town.",
};

export default async function MTGPage() {
  const products = await getProductsByCategory("Magic the Gathering");

  return (
    <CategoryPage
      title="The Plane Crossing"
      description="Collector boosters, theme boosters and commander decks. From Alpha & Beta to the latest releases — every plane catalogued."
      heroLabel="// THE_PLANE_CROSSING"
      roomTheme="mtg"
      products={products}
      subPortals={[
        { label: "SINGLES", href: "/mtg?type=singles" },
        { label: "VINTAGE", href: "/mtg?type=vintage" },
        { label: "SEALED", href: "/mtg?type=sealed" },
      ]}
    />
  );
}
