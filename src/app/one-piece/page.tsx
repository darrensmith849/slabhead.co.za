import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/products";
import CategoryPage from "@/components/sections/CategoryPage";

export const metadata: Metadata = {
  title: "One Piece Cards",
  description:
    "Browse One Piece graded cards, singles and sealed products from Slabhead in Cape Town.",
};

export default async function OnePiecePage() {
  const products = await getProductsByCategory("One Piece");

  return (
    <CategoryPage
      title="One Piece"
      description="Graded cards, raw singles and sealed products for pirates chasing their next grail."
      heroLabel="// ONE_PIECE_VAULT"
      roomTheme="onepiece"
      products={products}
      subPortals={[
        { label: "SLABBED", href: "/one-piece?type=slabbed" },
        { label: "SINGLES", href: "/one-piece?type=singles" },
        { label: "SEALED", href: "/one-piece?type=sealed" },
      ]}
    />
  );
}
